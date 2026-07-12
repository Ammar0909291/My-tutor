# Teaching Blueprint — phys.mech.angular-momentum

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.angular-momentum
name:               Angular Momentum
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              understand
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.rotational-dynamics, phys.mech.momentum]
cross_links:        [phys.mech.conservation-of-angular-momentum,
                     phys.mech.torque, phys.mech.moment-of-inertia]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a spinning top stays upright against gravity — something
                       is resisting the tipping; before L = Iω; difficulty 5 →
                       C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Angular momentum (L) is the rotational analog of linear momentum (p = mv).
For a rotating rigid body: L = Iω. It is a vector (direction along the rotation axis, right-hand
rule). Net torque is the rate of change of angular momentum: τ_net = dL/dt. This is the most
general form of Newton's 2nd Law for rotation.

**Formal Definitions:**
L = Iω       (rigid rotating body about fixed axis)
L = r × p    (particle; vector cross product)

Units: kg·m²/s.

**Analog table:**

| Linear | Rotational |
|--------|-----------|
| p = mv | L = Iω |
| F = dp/dt | τ = dL/dt |
| Impulse J = Δp | Angular impulse = ΔL = τΔt |

**Direction (right-hand rule):**
Curl the fingers of the right hand in the direction of rotation → thumb points in the direction of L.

**Key properties:**
- L is a vector: direction + magnitude both matter.
- For a system of particles: L_total = Σ Lᵢ = Σ Iᵢωᵢ (about a fixed axis).
- τ_net = ΔL/Δt: a net torque changes L (in magnitude or direction).
- No net torque → L is constant (Conservation of Angular Momentum — next concept).

**Worked Example 1 (Basic):**
A solid disc (M = 3 kg, R = 0.5 m, I = 0.375 kg·m²) spins at ω = 8 rad/s.
L = Iω = 0.375 × 8 = 3 kg·m²/s.

**Worked Example 2 (Angular impulse):**
A torque of 4 N·m acts for 3 s on a flywheel at rest.
ΔL = τΔt = 4×3 = 12 kg·m²/s.
If I = 2 kg·m²: Δω = ΔL/I = 12/2 = 6 rad/s. Final ω = 6 rad/s.

**Worked Example 3 (Particle):**
A 2 kg particle moves at 5 m/s in a circle of radius 0.8 m.
|L| = |r × p| = r × mv = 0.8 × 2 × 5 = 8 kg·m²/s.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.rotational-dynamics  ──►
                                     phys.mech.angular-momentum
phys.mech.momentum             ──►
```

**PD-1 (Rotational dynamics prerequisite):**
"A disc (I = 2 kg·m²) has τ = 6 N·m. Find α."
Expected: α = 3 rad/s².

**PD-2 (Momentum prerequisite):**
"A 3 kg ball moves at 4 m/s east. p?"
Expected: 12 kg·m/s east.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-L-IS-OMEGA (Priority 1)
**Label:** "Angular momentum is the same as angular velocity — faster spinning means more L"

**Trigger signals:**
- Says "both objects have the same L because they have the same ω"
- Equates L = ω without the I factor
- Confused when a slow-spinning flywheel has more L than a fast-spinning top

**Conflict evidence [P28]:**
"Object A: I = 0.1 kg·m², ω = 20 rad/s → L = 0.1×20 = 2 kg·m²/s.
Object B: I = 5 kg·m², ω = 1 rad/s → L = 5×1 = 5 kg·m²/s.
B spins 20× slower but has 2.5× more angular momentum. If L = ω, how is this possible?"

**Bridge [P30]:**
"L = Iω — both the 'rotational mass' (I) and the rotation rate (ω) determine angular momentum.
Just like p = mv (a slow truck can have more momentum than a fast bicycle), a massive flywheel
spinning slowly can have more L than a small top spinning rapidly."

**Replacement [P31]:**
"L = Iω. Compute both I and ω; multiply. A larger I 'stores' more angular momentum at the
same ω. Comparing L values requires knowing both factors."

**Discrimination pairs [P33]:**
- Large I, small ω vs small I, large ω: can have equal L — just like p = mv ✓
- Solid disc vs hollow cylinder, same ω: hollow has larger I → larger L ✓

**s6_path:** Use the linear analogy directly: "just like p = mv, L = Iω. I is like mass."

---

### MC-TORQUE-CHANGES-SPEED (Priority 2)
**Label:** "Torque only changes angular speed — not the direction of the angular momentum vector"

**Trigger signals:**
- Says torque can only speed up or slow down rotation, not change rotation axis
- Confused by gyroscopic precession (top stays up; gravity torque changes L direction)
- Claims L direction is always fixed regardless of torque

**Conflict evidence [P28]:**
"A spinning top has L pointing upward (along its axis). Gravity acts downward through the CM
but the contact point is below — this creates a torque that is horizontal (τ = r × F_gravity).
τ_net = dL/dt: the torque is horizontal, so L changes direction horizontally — the top precesses.
If torque only changed |L|, the top would just slow down. But it doesn't — it precesses sideways.
Why?"

**Bridge [P30]:**
"L is a vector. τ = dL/dt means torque changes L as a vector — magnitude OR direction or both.
A torque perpendicular to L changes only the direction (like centripetal force changing v direction
without changing speed). This is gyroscopic precession — a consequence of L being a vector."

**Replacement [P31]:**
"τ_net = dL/dt. If τ is parallel to L: changes |L| (spins up or slows). If τ is perpendicular
to L: changes direction of L only (precession). In general: changes both. L is a vector — never
forget the directional component."

**Discrimination pairs [P33]:**
- τ parallel to L (torque about same axis): |L| changes, direction fixed ✓
- τ perpendicular to L (gyroscope): direction changes (precession), |L| approximately fixed ✓

**s6_path:** Skip gyroscopic precession entirely in first pass; use only τ parallel to L
(increasing/decreasing rotation speed). Introduce direction-changing torque only if S6 flag
is cleared and student explicitly encounters gyroscope problems.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to angular momentum as the rotational analog of p.
P04: "A spinning top stays upright — something resists the gravitational tipping. A bicycle wheel
is easier to balance when spinning. A gyroscope in a spacecraft holds its orientation. What is
doing all this resisting?"
P06: "Each of these objects has angular momentum — a quantity that resists changes in rotation,
just as linear momentum resists changes in linear motion. We'll define it precisely today."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Analog table (from Component 1). Right-hand rule diagram for L direction.
Arrow showing L vector along rotation axis (upward for CCW viewed from above).

P08 (notation): L = Iω. Units: kg·m²/s.
τ_net = ΔL/Δt (Newton's 2nd for rotation, most general form).
Angular impulse = τΔt = ΔL (angular analog of J = FΔt = Δp).
Walk through Worked Examples 1 and 2.

P05: "Conservation of angular momentum — when τ_net = 0, L is constant. This is why a
figure skater spins faster when pulling her arms in (I decreases, ω increases to keep L constant)."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2. Gap in either → repair before continuing.

P10: "A hollow cylinder (M = 4 kg, R = 0.5 m, I = 1 kg·m²) spins at ω = 6 rad/s.
Find L. A torque of 3 N·m acts for 4 s — what is the new ω?"
P13: "L_i = 1×6 = 6 kg·m²/s. ΔL = τΔt = 12. L_f = 18. ω_f = 18/1 = 18 rad/s."

---

### TA-4 — MC-L-IS-OMEGA Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Object A: I = 0.2 kg·m², ω = 10 rad/s. Object B: I = 4 kg·m², ω = 1 rad/s.
Before computing: which has more angular momentum?"

Listen: if student says "A — it spins faster" → MC-L-IS-OMEGA confirmed.

P28 → P30 → P31 (full Misconception Engine MC-L-IS-OMEGA sequence).

P33: L_A = 2 kg·m²/s; L_B = 4 kg·m²/s. B has 2× more despite spinning 10× slower.

P36: "A figure skater pulls her arms in. I decreases from 4 to 1 kg·m²/s. ω_i = 2 rad/s.
If L is conserved: ω_f = L/I_f = 8/1 = 8 rad/s. (Preview of conservation.)"

---

### TA-5 — MC-TORQUE-CHANGES-SPEED Probe + Angular Impulse [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A gyroscope spins with L pointing straight up. A horizontal torque is applied.
Will the spin axis tip sideways (direction of L changes) or just slow down (|L| changes)?"

Listen: if student says "just slows down" → MC-TORQUE-CHANGES-SPEED confirmed.

P28 → P30 → P31 (full Misconception Engine MC-TORQUE-CHANGES-SPEED sequence).
Note: keep this conceptual only; no precessional calculation required at this level.

P10 (angular impulse practice): "A torque of 6 N·m for 5 s on a flywheel (I = 3 kg·m², ω_i = 2 rad/s).
Find ω_f."
P13: "ΔL = τΔt = 30. L_i = 6. L_f = 36. ω_f = 36/3 = 12 rad/s."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic L:** Solid sphere (I = ²/₅ MR² = 0.4 kg·m²) at ω = 5 rad/s. L?
   [Answer: L = 0.4×5 = 2 kg·m²/s]
2. **Angular impulse:** τ = 8 N·m for 3 s on disc (I = 4 kg·m²) from rest. ω_f?
   [Answer: ΔL = 24; ω = 24/4 = 6 rad/s]
3. **Compare L:** Disc A (I = 6 kg·m², ω = 2 rad/s) vs Disc B (I = 2 kg·m², ω = 5 rad/s).
   Which has more L?
   [Answer: L_A = 12, L_B = 10; A has more L]
4. **Find I from L:** L = 15 kg·m²/s at ω = 3 rad/s. I?
   [Answer: I = 15/3 = 5 kg·m²]
5. **Torque from ΔL:** A flywheel's L changes from 10 to 25 kg·m²/s in 5 s. Average torque?
   [Answer: τ = ΔL/Δt = 15/5 = 3 N·m]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: L = Iω (angular momentum; rotational analog of p = mv). τ = ΔL/Δt (most general
rotational Newton's 2nd). Angular impulse = τΔt = ΔL. L is a vector — torque can change its
direction too (gyroscopic precession)."

P62: "Next session: 'A disc (I = 2 kg·m²) at ω = 5 rad/s. A 3 N·m torque acts for 4 s.
Find new ω. What is the angular impulse?'"

P85: "You identified that I and ω both determine L — just as mass and velocity both determine p.
That parallel thinking will serve you through all of angular momentum and its conservation."

P89: Log MC flags; record accuracy; note direction/vector understanding.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic L):**
"A hollow cylinder (M = 5 kg, R = 0.4 m, I = MR² = 0.8 kg·m²) spins at ω = 10 rad/s. L?"
Expected: L = 0.8×10 = 8 kg·m²/s.
_Discriminates: L = Iω; MC-L-IS-OMEGA resolution._

**MP-2 (Apply — angular impulse):**
"A disc (I = 3 kg·m²) starts at ω = 4 rad/s. Torque 6 N·m acts for 5 s. Final ω?"
Expected: ΔL = 30; L_f = 12+30 = 42; ω_f = 42/3 = 14 rad/s.
_Discriminates: angular impulse τΔt = ΔL; starting from nonzero ω._

**MP-3 (Apply — find torque from ΔL):**
"A flywheel's L changes from 8 to 20 kg·m²/s in 4 s. Average τ?"
Expected: τ = 12/4 = 3 N·m.
_Discriminates: τ = ΔL/Δt._

**MP-4 (Understand — compare L):**
"Object A: I = 3 kg·m², ω = 4 rad/s. Object B: I = 1 kg·m², ω = 10 rad/s.
Which has more angular momentum? By how much?"
Expected: L_A = 12, L_B = 10. A has more by 2 kg·m²/s.
_Discriminates: MC-L-IS-OMEGA resolution; cannot judge by ω alone._

**MP-5 (Understand — vector direction):**
"A disc spins CCW when viewed from above. What direction does L point? If a torque is applied
that points downward (CW tendency viewed from above), what happens to L?"
Expected: L points upward (right-hand rule: CCW → thumb up). Downward torque reduces |L|
(L decreases in upward direction — disc slows down). If torque large enough: L reverses.
_Discriminates: L as vector; directional torque effects._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "L = ? Units? Analog of which linear quantity?"
Threshold: L = Iω; kg·m²/s; analog of p = mv.

**FA-2 (TA-4 exit):** "I = 0.5 kg·m², ω = 12 rad/s. L? vs I = 2 kg·m², ω = 3 rad/s. L?"
Expected: both = 6 kg·m²/s. If student says first object has more L → MC-L-IS-OMEGA not resolved.

**FA-3 (TA-5 exit):** "τ = 5 N·m for 6 s. ΔL?"
Expected: ΔL = 30 kg·m²/s. Basic angular impulse check.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only L = Iω and angular impulse in TA-3 and TA-4.
- Skip gyroscopic precession (MC-TORQUE-CHANGES-SPEED) in first pass; mark for review only.
- Reassure: "L = Iω. Same structure as p = mv. Two numbers multiplied."
- Build angular impulse from the linear analog: "just like J = FΔt = Δp, now τΔt = ΔL."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (vector direction question) at TA-3.
- Challenge: "A spinning bicycle wheel is held by its axle. You try to tilt the axle.
  What direction does the gyroscopic torque resist in? (Requires cross-product reasoning.)"
- Spend TA-6 on Problems 3 and 5 and the vector direction problem.

**S4 (Prereq gap):**
- PD-1 gap (Rotational dynamics) → repair τ = Iα before returning.
- PD-2 gap (Momentum) → repair p = mv, vector direction before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → L = Iω → MC-L-IS-OMEGA repair).
**Session 2 (≥24 h later):** Retrieval: "L formula? Angular impulse?"
  → TA-5 (vector direction, angular impulse practice) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe:
  "A figure skater (I_i = 5 kg·m², ω_i = 3 rad/s) pulls arms in to I_f = 1 kg·m².
  No external torque. Find ω_f. Has KE changed? (KE = ½Iω² — compute before/after.)"
  (Previews conservation of angular momentum + KE change during redistribution.)
**Pre-conservation-of-angular-momentum session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.momentum (p = mv analog), phys.mech.rotational-dynamics
(τ = Iα link), phys.mech.moment-of-inertia (I in L = Iω).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.angular-momentum ✓
V-2   prerequisites listed and exist in KG: phys.mech.rotational-dynamics,
      phys.mech.momentum ✓
V-3   bloom level consistent with difficulty 5/advanced: understand ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: spinning-top anchor ✓
V-8   ≥2 misconceptions engineered: MC-L-IS-OMEGA, MC-TORQUE-CHANGES-SPEED ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: spinning-top/gyroscope/bicycle scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-L-IS-OMEGA ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: momentum, rotational-dynamics, moment-of-inertia ✓
V-19  cross_links match KG edges: conservation-of-angular-momentum, torque,
      moment-of-inertia ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
