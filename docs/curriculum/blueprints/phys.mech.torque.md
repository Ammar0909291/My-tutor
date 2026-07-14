# Teaching Blueprint — phys.mech.torque

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.torque
name:               Torque
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.angular-kinematics, phys.mech.free-body-diagram]
cross_links:        [phys.mech.moment-of-inertia, phys.mech.rotational-dynamics,
                     phys.mech.equilibrium, phys.mech.angular-momentum]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (opening a door — pushing near the hinge vs at the edge;
                       same force, very different effect; before τ = rF sinθ;
                       difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Torque is the rotational analog of force. It quantifies how effectively a force
causes rotation about an axis. The same force produces more torque when applied further from the
axis (larger moment arm) or more perpendicularly (sinθ closer to 1). Torque is a vector — its
direction (clockwise or anticlockwise) determines the sign in rotational problems.

**Formal Definition:**
τ = r × F = rF sinθ

where r is the distance from the pivot (moment arm, m), F is the applied force (N), and θ is
the angle between the position vector r and the force F. Units: N·m.

**Equivalent expression using perpendicular distance:**
τ = F × d⊥    where d⊥ = r sinθ is the perpendicular distance from the axis to the line of action.

**Sign convention (1D):**
Anticlockwise (CCW) = positive. Clockwise (CW) = negative. (State convention explicitly in each problem.)

**Net torque and rotation:**
Σ τ = I α    (Newton's 2nd Law for rotation — covered in rotational dynamics)
For equilibrium: Σ τ = 0 (no angular acceleration)

**Worked Example 1 (Basic):**
A force of 20 N is applied perpendicular to a wrench 0.3 m from the bolt.
τ = rF sinθ = 0.3 × 20 × sin90° = 6 N·m.

**Worked Example 2 (Non-perpendicular force):**
A 15 N force acts at 30° to a 0.4 m lever arm.
τ = 0.4 × 15 × sin30° = 0.4 × 15 × 0.5 = 3 N·m.

**Worked Example 3 (Net torque — two forces):**
A see-saw: 40 N weight at 2 m left (CW); 30 N weight at 3 m right (CCW).
τ_left = −40×2 = −80 N·m (CW). τ_right = +30×3 = +90 N·m (CCW).
Σ τ = +10 N·m (net CCW → see-saw rotates CCW).

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.angular-kinematics  ──►
                                    phys.mech.torque
phys.mech.free-body-diagram   ──►
```

**PD-1 (Angular kinematics):**
"A wheel starts from rest and reaches ω = 6 rad/s in 3 s. Find α."
Expected: α = 2 rad/s².

**PD-2 (Free-body diagram):**
"Draw a FBD for a book on a table. Label all forces."
Expected: Weight down; Normal up (minimum acceptable response).

Both must pass before TA-3. Gap in either → repair before continuing.

---

## Component 3 — Misconception Engine

### MC-TORQUE-IS-FORCE (Priority 1)
**Label:** "Torque is just force — a bigger force always means more torque"

**Trigger signals:**
- Ignores r (moment arm) when computing torque
- Says a force at the hinge produces as much torque as the same force at the door edge
- Computes τ = F only (omits ×r or ×sinθ)

**Conflict evidence [P28]:**
"A door hinge is at the left. You push 10 N at r = 0.8 m from the hinge: τ = 8 N·m.
Now you push 10 N at r = 0.05 m (right at the hinge): τ = 0.5 N·m.
Same force. 16× different torque. How can torque equal force when they give such different results?"

**Bridge [P30]:**
"Torque = force × moment arm. The moment arm (distance from pivot to line of action) is the
multiplier. That's why door handles are at the edge, not the hinge — maximum moment arm for
the same force. Wrenches are long for the same reason."

**Replacement [P31]:**
"τ = rF sinθ. Both r and F (and the angle) determine torque.
To maximise torque: maximise r (push far from hinge) AND make force perpendicular (sinθ = 1).
A large force at a small r can produce less torque than a small force at a large r."

**Discrimination pairs [P33]:**
- 50 N at r = 0.1 m: τ = 5 N·m vs 10 N at r = 1 m: τ = 10 N·m (smaller force, bigger torque) ✓
- Same force, θ = 0° (along lever): τ = 0 (no rotation) vs θ = 90°: τ = rF ✓

**s6_path:** Skip the conflict calculation; use only the door analogy: "push at the edge vs push
at the hinge — which opens the door more easily?" Build intuition before formula.

---

### MC-TORQUE-PERPENDICULAR-ONLY (Priority 2)
**Label:** "Torque only works when the force is perpendicular to the lever arm — sinθ is ignored otherwise"

**Trigger signals:**
- Uses τ = rF even when θ ≠ 90°
- Says "the sinθ only matters at extreme angles"
- Computes torque at θ = 30° as rF (as if sin30° = 1)

**Conflict evidence [P28]:**
"A 10 N force acts along a 0.5 m lever at θ = 0° (parallel to the lever arm — pushing straight
toward the pivot). τ = rF sinθ = 0.5×10×sin0° = 0. No torque at all.
If sinθ didn't matter, you'd expect τ = 5 N·m. Why is the actual torque zero?"

**Bridge [P30]:**
"A force directed through the pivot produces zero torque — it has no 'turning effect.'
Only the component of force perpendicular to r causes rotation.
τ = rF sinθ captures exactly how much of the force is 'perpendicular' — sinθ is not optional."

**Replacement [P31]:**
"τ = rF sinθ always. For θ = 90°: sinθ = 1 → τ = rF (maximum). For θ = 0° or 180°: sinθ = 0
→ τ = 0. For angles in between: intermediate torque. Never drop sinθ unless you know θ = 90°."

**Discrimination pairs [P33]:**
- θ = 90°: τ = rF (maximum) ✓
- θ = 30°: τ = rF × 0.5 (half maximum) ✓
- θ = 0°: τ = 0 (zero torque — force through pivot) ✓

**s6_path:** Use only θ = 90° and θ = 0° as the two extremes; introduce intermediate angles in
TA-5 only after these limiting cases are secure.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to rotation caused by force.
P04: "Push a door open at the edge — easy. Push it at the hinge — nearly impossible.
Same force both times. What is different?" Let student think before answering.
P06 (hands-on anchor): "The distance from the hinge is what matters. We name this turning effect
'torque.' The further from the hinge, the more torque for the same force."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Lever diagram:

```
Pivot ──────────────────── r ──────────────── Force F
       ↑ d⊥ = r sinθ          θ ↙
       (perpendicular distance)
τ = F × d⊥ = rF sinθ
```

Also: sign diagram — CCW arrow = positive, CW arrow = negative.

P08 (notation): τ = rF sinθ. τ in N·m. Sign: CCW = +, CW = −.
Equivalent: τ = F × d⊥ (useful when d⊥ is given directly).
Walk through Worked Examples 1 and 2.

P05: "Every mechanical advantage machine — lever, wrench, gear — exploits torque.
The rotational analog of F = ma is τ = Iα. Torque IS the rotational force."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (angular kinematics) and PD-2 (FBD).
Gap in either → repair before continuing.

P10: "A 25 N force acts perpendicularly at 0.6 m from a pivot. (a) Torque?
Now the same force at 45° to the lever arm. (b) Torque?"
P13: "(a) τ = 0.6×25×1 = 15 N·m. (b) τ = 0.6×25×sin45° = 15×0.707 = 10.6 N·m."

---

### TA-4 — MC-TORQUE-IS-FORCE Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 10 N force is applied at r = 0.8 m from a hinge. Now the same 10 N is applied
at r = 0.05 m. Before computing: same force, so same torque?"

Listen: if student says "yes — same force" → MC-TORQUE-IS-FORCE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-TORQUE-IS-FORCE sequence).

P33: 50 N at r = 0.1 m: τ = 5 N·m vs 10 N at r = 1 m: τ = 10 N·m.

P36: "Why are door handles placed at the opposite end from the hinge? Why are bicycle pedals
as long as they are? Why are wrench handles long?"
[Expected: maximize r → maximize torque for same applied force.]

---

### TA-5 — MC-TORQUE-PERPENDICULAR-ONLY Probe + Net Torque [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A 12 N force acts along a 0.5 m lever arm (θ = 0°, pushing directly toward the pivot).
What torque does it produce?"

Listen: if student writes τ = 0.5 × 12 = 6 N·m → MC-TORQUE-PERPENDICULAR-ONLY confirmed.

P28 → P30 → P31 (full Misconception Engine MC-TORQUE-PERPENDICULAR-ONLY sequence).

P10 (net torque): Walk through Worked Example 3.
"A horizontal bar, pivot at centre. Left: 60 N at 1.5 m (CW). Right: 40 N at 2 m (CCW).
τ_left = −60×1.5 = −90 N·m. τ_right = +40×2 = +80 N·m. Σ τ = −10 N·m (CW net)."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic perpendicular:** A 30 N force acts perpendicularly at 0.5 m from a pivot. τ?
   [Answer: 15 N·m]
2. **Non-perpendicular:** A 20 N force at 60° to a 0.4 m lever. τ?
   [Answer: 0.4×20×sin60° = 0.4×20×0.866 = 6.93 N·m]
3. **Net torque:** See-saw pivot at centre. Left: 50 N at 1.2 m. Right: 40 N at 1.8 m.
   Net torque? Direction?
   [Answer: τ_left = −60 N·m; τ_right = +72 N·m; Σ = +12 N·m CCW]
4. **Zero torque:** A 25 N force is applied along the lever arm (θ = 0°). τ?
   [Answer: 0 — force through pivot produces no torque]
5. **Find force:** A 0.6 m wrench needs to produce 18 N·m. Force applied perpendicularly?
   [Answer: F = τ/r = 18/0.6 = 30 N]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: τ = rF sinθ. Torque is force × moment arm. sinθ is never optional.
CCW = positive, CW = negative. Net torque drives angular acceleration (τ = Iα — coming next)."

P62: "Next session: 'A force of 40 N at 30° acts at r = 0.5 m from a pivot. Torque?
What force perpendicular would give the same torque?'"

P85: "You identified that moment arm AND angle both matter — that double-dependency is what
trips students in equilibrium problems. You're ready for the next level."

P89: Log MC flags; record problem accuracy; note non-perpendicular angle performance.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic):**
"A 40 N force acts perpendicular to a 0.75 m lever arm. Torque?"
Expected: τ = 0.75 × 40 = 30 N·m.
_Discriminates: τ = rF sinθ at θ = 90°._

**MP-2 (Apply — non-perpendicular):**
"A 50 N force acts at 40° to a 0.6 m lever arm. Torque?"
Expected: τ = 0.6 × 50 × sin40° = 30 × 0.643 = 19.3 N·m.
_Discriminates: MC-TORQUE-PERPENDICULAR-ONLY resolution._

**MP-3 (Apply — force at pivot direction):**
"A 30 N force is directed exactly toward the pivot (θ = 0°) at r = 0.8 m. Torque?"
Expected: τ = 0.8 × 30 × sin0° = 0.
_Discriminates: zero-torque case; MC-TORQUE-PERPENDICULAR-ONLY._

**MP-4 (Apply — net torque):**
"Horizontal rod, pivot at left end. Force A: 20 N downward at r = 0.5 m (CW).
Force B: 15 N downward at r = 1.2 m (CW). Force C: 50 N upward at r = 0.8 m (CCW).
Find Σ τ and direction."
Expected: τ_A = −10, τ_B = −18, τ_C = +40. Σ = +12 N·m (CCW).
_Discriminates: multi-force net torque with sign convention._

**MP-5 (Apply — find r from τ):**
"A 24 N force perpendicular to a lever produces 9.6 N·m of torque. Find r."
Expected: r = τ/(F sinθ) = 9.6/24 = 0.4 m.
_Discriminates: algebraic rearrangement of torque formula._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "τ = ? What does r represent? What are the units?"
Threshold: τ = rF sinθ; r = distance from pivot (moment arm); N·m.

**FA-2 (TA-4 exit):** "10 N at r = 0.8 m vs 10 N at r = 0.05 m. Both perpendicular. Which gives more τ?"
Expected: 8 N·m vs 0.5 N·m; first is larger. If equal → MC-TORQUE-IS-FORCE not resolved.

**FA-3 (TA-5 exit):** "A 20 N force parallel to a 0.4 m lever arm (θ = 0°). τ?"
Expected: 0. If student writes 8 → MC-TORQUE-PERPENDICULAR-ONLY not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only θ = 90° (perpendicular) in TA-3 and TA-4.
- Introduce sinθ in TA-5 using only extreme cases (0° and 90°) before intermediate angles.
- Defer net torque (multi-force) until TA-5 or 6.
- Reassure: "Torque is force multiplied by two things: distance and sine. Start with the distance."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-4 (multi-force net torque) at TA-3.
- Challenge: "Design a system where three forces of 10 N each produce zero net torque.
  State the required positions and angles."
- Spend TA-6 on Problems 3 and 5 (net torque and reverse calculation).

**S4 (Prereq gap):**
- PD-1 gap (angular kinematics) → repair ω, α, θ analogs before returning.
- PD-2 gap (FBD) → repair force inventory and diagram conventions before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → τ = rF sinθ → MC-TORQUE-IS-FORCE repair).
**Session 2 (≥24 h later):** Retrieval: "Torque formula? What is the moment arm?"
  → TA-5 (MC-TORQUE-PERPENDICULAR-ONLY, net torque) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining torque and equilibrium (preview):
  "A 4 m horizontal beam, pivot at left end. A 60 N weight hangs at 3 m. What upward force
  at 4 m keeps the beam horizontal?" (Σ τ = 0 → F × 4 = 60 × 3 → F = 45 N.)
**Pre-moment-of-inertia session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.angular-kinematics (τ → α link via τ = Iα),
phys.mech.free-body-diagram (force identification before torque calculation).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.torque ✓
V-2   prerequisites listed and exist in KG: phys.mech.angular-kinematics,
      phys.mech.free-body-diagram ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: door-hinge anchor ✓
V-8   ≥2 misconceptions engineered: MC-TORQUE-IS-FORCE,
      MC-TORQUE-PERPENDICULAR-ONLY ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: door-hinge vs edge scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-TORQUE-IS-FORCE ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: angular-kinematics, free-body-diagram ✓
V-19  cross_links match KG edges: moment-of-inertia, rotational-dynamics,
      equilibrium, angular-momentum ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
