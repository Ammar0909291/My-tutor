# Teaching Blueprint — phys.mech.equilibrium

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.equilibrium
name:               Equilibrium
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.torque, phys.mech.free-body-diagram]
cross_links:        [phys.mech.newtons-second-law, phys.mech.rotational-dynamics,
                     phys.mech.centre-of-mass]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a see-saw with two children at different distances from
                       the pivot — how do you balance it? before Σ F = 0 and
                       Σ τ = 0; difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** A body in static equilibrium has zero translational acceleration AND zero
rotational acceleration. Two independent conditions must hold simultaneously: the net force
is zero (ΣF = 0) and the net torque is zero (Στ = 0). Critically, the torque condition must
hold about ANY chosen pivot — this freedom of pivot choice is the key problem-solving tool.

**Conditions for Static Equilibrium:**
ΣF_x = 0    (horizontal net force)
ΣF_y = 0    (vertical net force)
Στ = 0      (net torque about ANY pivot — choose wisely)

**Strategy for equilibrium problems:**
1. Draw a complete FBD (all forces, with point of application for torques).
2. Choose a pivot at the point of action of an unknown force — eliminates it from the torque equation.
3. Apply Στ = 0 to find the remaining unknown.
4. Apply ΣF = 0 to find the force at the pivot.

**Worked Example 1 (Balanced beam):**
A uniform 4 m beam (weight W = 100 N, acts at centre = 2 m). One end on support; person
(weight 600 N) stands 1 m from the other end. Find the two support forces R_A (left) and R_B (right).
Take pivot at A: Στ_A = 0 → R_B×4 − 100×2 − 600×3 = 0 → R_B = (200+1800)/4 = 500 N.
ΣF_y = 0 → R_A + R_B = 700 → R_A = 200 N.

**Worked Example 2 (Ladder against wall):**
A uniform 5 m ladder (mass 20 kg), angle 60° to floor. Frictionless wall. Find floor reaction (F_floor)
and wall reaction (F_wall). Pivot at base: Στ_base = 0 → F_wall × 5 sin60° = 20×9.8×2.5 cos60°.
F_wall = (20×9.8×2.5 cos60°)/(5 sin60°) = (20×9.8×1.25)/(5×0.866) = 245/4.33 ≈ 56.6 N.
ΣF_x = 0 → F_floor_x = F_wall = 56.6 N. ΣF_y = 0 → F_floor_y = 196 N.

**Worked Example 3 (Pivot choice — eliminating unknowns):**
A beam with two unknown reaction forces. Taking the pivot at one reaction force makes its torque
zero — the equation has only one unknown. This is always the optimal pivot choice strategy.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.torque           ──►
                                phys.mech.equilibrium
phys.mech.free-body-diagram ──►
```

**PD-1 (Torque prerequisite):**
"A 60 N force acts perpendicularly at 0.8 m from a pivot. τ?"
Expected: 48 N·m.

**PD-2 (FBD prerequisite):**
"Draw a FBD for a horizontal beam supported at both ends with a weight hanging from the middle.
Label all forces."
Expected: Weight down at centre; two upward support forces at the ends.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-ONE-CONDITION (Priority 1)
**Label:** "Equilibrium requires only ΣF = 0 — torque balance is automatic"

**Trigger signals:**
- Sets up only force equations without a torque equation
- Says "the forces are balanced so it must be in equilibrium"
- Gets wrong support forces because one equation is insufficient

**Conflict evidence [P28]:**
"A 3 m beam, pivot at left end. Weight 100 N at 2 m (downward). One support force R at 3 m (upward).
Force balance: R = 100 N. But check torques about left end:
τ_weight = −100×2 = −200 N·m. τ_R = +100×3 = +300 N·m. Στ = +100 N·m ≠ 0.
The forces balance, but the beam rotates. Can it be in equilibrium?"

**Bridge [P30]:**
"Force balance prevents translational acceleration. Torque balance prevents rotational acceleration.
You need BOTH to prevent all motion. A balanced force can still cause rotation if the forces don't
act along the same line. Equilibrium needs two independent conditions: ΣF = 0 AND Στ = 0."

**Replacement [P31]:**
"Both conditions must hold: ΣF = 0 (all components) AND Στ = 0 (about any axis).
For a 2D beam problem: ΣF_x = 0, ΣF_y = 0, and Στ = 0. Three equations. Three unknowns maximum."

**Discrimination pairs [P33]:**
- Two equal forces at same point: ΣF = 0 AND Στ = 0 (equilibrium) ✓
- Two equal forces at different points, antiparallel: ΣF = 0 but Στ ≠ 0 (a couple — rotates) ✓

**s6_path:** Use only the see-saw problem (intuitive, symmetric) before introducing asymmetric
beams. Show that for the see-saw, Στ = 0 is the key condition, not just ΣF.

---

### MC-PIVOT-FIXED (Priority 2)
**Label:** "The pivot must be at a physical support — you can't choose it freely"

**Trigger signals:**
- Always places the pivot at the leftmost support or a physical hinge
- Doesn't realise that placing the pivot at an unknown force eliminates that unknown
- Solves problems with unnecessarily complicated simultaneous equations

**Conflict evidence [P28]:**
"A 4 m beam with supports at both ends (forces R_A at left, R_B at right). Weight 300 N at 1 m.
Taking pivot at A: Στ_A = 0 → R_B×4 = 300×1 → R_B = 75 N. One step, one unknown.
Taking pivot at beam's centre: Στ_centre = 0 → R_B×2 − R_A×2 − 300×1 = 0. Two unknowns — need ΣF too.
Which pivot was more efficient? Why?"

**Bridge [P30]:**
"Torque about any point is zero in equilibrium. You get to choose. If you pick the pivot at a
point where an unknown force acts, its moment arm is zero — it drops out of the equation.
This reduces the equation to one unknown. Picking the pivot at a physical support is just one
option — not always the best one."

**Replacement [P31]:**
"Strategy: choose your pivot to eliminate the most troublesome unknown force.
If a force acts at a point — put the pivot there. Its moment arm is zero (r = 0 → τ = 0).
This is the standard trick for solving equilibrium problems efficiently."

**Discrimination pairs [P33]:**
- Pivot at R_A: equation has only R_B → solve directly ✓
- Pivot at R_B: equation has only R_A → solve directly ✓
- Pivot at midpoint: equation has both R_A and R_B → need a second equation ✓

**s6_path:** Show one problem with "bad pivot" (lots of algebra) and "good pivot" (one step).
Let the student experience the efficiency difference before explaining the rule.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to balance as a two-condition problem.
P04: "A see-saw with two children at different distances. One weighs more. How do you balance it?
Is it enough to have their weights equal, or does position matter?"
P06 (hands-on anchor): "Position always matters — torque depends on weight × distance. Even equal
weights can cause rotation if they're at different distances. Equilibrium needs BOTH force balance
AND torque balance."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): FBD of a horizontal beam:
- Arrows: weight W at centre (down); R_A at left (up); R_B at right (up).
- Label all moment arms from a chosen pivot.
- Show CCW = + and CW = − convention.

P08 (notation): Three equilibrium equations: ΣF_x = 0; ΣF_y = 0; Στ = 0 (any pivot).
Walk through Worked Example 1 (balanced beam) step by step.
Highlight pivot choice at A eliminates R_A from the torque equation.

P05: "Structural engineers use these equations for every bridge, building, and crane.
The pivot-choice strategy is the most valuable calculation trick in statics."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2. Gap in either → repair before continuing.

P10: "Uniform 6 m beam (W = 120 N at 3 m). Support at left end (R_A). Person 80 kg (g=9.8)
stands 4 m from left. Find R_B (at right end) and R_A."
P13: "Pivot at A: R_B×6 = 120×3 + 784×4 = 360+3136 = 3496; R_B = 582.7 N.
ΣF_y: R_A = 120+784−582.7 = 321.3 N."

---

### TA-4 — MC-ONE-CONDITION Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 3 m beam. Support at left (R_A = 100 N upward) and right (R_B = 100 N upward).
Weight 200 N hanging at 2 m from left. Forces balance: 200 = 200. Is this necessarily in equilibrium?"

Listen: if student says "yes — forces balance" → MC-ONE-CONDITION confirmed.

P28 → P30 → P31 (full Misconception Engine MC-ONE-CONDITION sequence).
Compute: Στ_left = R_B×3 − 200×2 = 300−400 = −100 N·m ≠ 0. NOT equilibrium.

P33: Two equal antiparallel forces (a couple) → ΣF = 0, Στ ≠ 0 → NOT equilibrium ✓.
A single object hanging from two ropes → ΣF = 0 AND Στ = 0 required ✓.

P36: "For a beam problem in 2D, how many independent equations do you have?
How many unknowns can you solve for?" [3 equations; 3 unknowns maximum.]

---

### TA-5 — MC-PIVOT-FIXED Probe + Ladder Problem [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A 4 m beam: weight 200 N at 1 m; R_A at left end; R_B at right end.
You placed the pivot at the beam's midpoint. You get an equation with both R_A and R_B.
Is there a better pivot? Where would you place it?"

Listen: if student cannot identify the better pivot → MC-PIVOT-FIXED confirmed.

P28 → P30 → P31 (full Misconception Engine MC-PIVOT-FIXED sequence).

P10 (ladder): Walk through Worked Example 2 (frictionless wall ladder).
P13: "Pivot at base → eliminates floor reaction. One equation → F_wall. Then ΣF → floor components."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Uniform beam:** 5 m beam, W = 200 N at centre, R_A at 0 m, R_B at 5 m, person 70 kg at 3.5 m.
   Find R_A and R_B. [Answer: pivot at A → R_B×5 = 200×2.5 + 686×3.5 = 500+2401 → R_B = 580.2 N; R_A = 200+686−580.2 = 305.8 N]
2. **Off-centre pivot:** For Problem 1, re-solve using pivot at R_B. Same answer?
   [Answer: R_A×5 = 200×2.5 + 686×1.5 = 500+1029 → R_A = 305.8 N. ✓ Same.]
3. **Non-uniform beam:** 4 m beam with CM at 1.5 m from left. W = 300 N. R_A at 0 m, R_B at 4 m.
   Find forces. [Answer: pivot at A → R_B×4 = 300×1.5 = 450 → R_B = 112.5 N; R_A = 187.5 N]
4. **Hanging sign:** A 2 m uniform sign (mass 10 kg) is supported by a hinge at the wall (left)
   and a horizontal wire at 1.5 m. Find tension T and hinge reaction components. (g = 9.8)
   [Answer: pivot at hinge → T×1.5 = 98×1 → T = 65.3 N; Hinge_x = 65.3 N, Hinge_y = 98 N]
5. **Ladder (with friction):** 4 m ladder (mass 15 kg, CM at 2 m), angle 70° to floor.
   μ_s = 0.4 between ladder and floor. Maximum height a 60 kg person can climb?
   [Requires Στ = 0 about base → F_wall = (15×9.8×2 cos70° + 60×9.8×d cos70°)/(4 sin70°).
   ΣF: friction = F_wall; max friction = 0.4×(15+60)×9.8 = 294 N → solve for d_max.]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: ΣF = 0 AND Στ = 0 (both required for equilibrium). Three equations in 2D.
Pivot strategy: choose pivot at an unknown force → eliminates it from the torque equation.
Torque balance is valid about ANY chosen point."

P62: "Next session: '6 m uniform beam (W = 180 N). Supported at left and 1 m from right end.
A 500 N weight hangs 2 m from left. Find both support forces.'"

P85: "You used the pivot strategy to reduce two-unknown torque equations to one-unknown — that's
the skill that makes equilibrium problems tractable in real engineering. Well applied."

P89: Log MC flags; record accuracy; note pivot-choice proficiency.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic beam):**
"A 4 m uniform beam (W = 80 N at 2 m). R_A at left, R_B at right. A 120 N weight at 3 m.
Find R_A and R_B."
Expected: Pivot at A: R_B×4 = 80×2 + 120×3 = 160+360 = 520; R_B = 130 N. R_A = 70 N.
_Discriminates: both equilibrium conditions; pivot at A to solve._

**MP-2 (Apply — pivot choice):**
"For MP-1, take the pivot at R_B instead. Find R_A. Verify it matches."
Expected: R_A×4 = 80×2 + 120×1 = 160+120 = 280; R_A = 70 N. ✓
_Discriminates: MC-PIVOT-FIXED resolution; arbitrary valid pivot._

**MP-3 (Apply — torque only check):**
"A 2 m beam. Forces: 100 N up at 0 m; 100 N up at 2 m; 200 N down at 1 m.
Is it in equilibrium? Check BOTH conditions."
Expected: ΣF = 100+100−200 = 0 ✓. Pivot at left: Στ = 100×2 − 200×1 = 200−200 = 0 ✓. YES.
_Discriminates: MC-ONE-CONDITION; must check both._

**MP-4 (Apply — hanging sign):**
"A 3 m horizontal rod hinged at wall (left). Uniform mass 8 kg. Wire pulls up at 2 m.
Find T and hinge reaction. (g = 9.8)"
Expected: Pivot at hinge: T×2 = 78.4×1.5 = 117.6; T = 58.8 N. Hinge_y = 78.4−58.8 = 19.6 N.
Hinge_x = 0 (no horizontal forces in this setup).
_Discriminates: real-world configuration; pivot at hinge to eliminate hinge from torque eq._

**MP-5 (Analyze — identify non-equilibrium):**
"A 3 m beam. Forces: 300 N down at 1 m; 200 N up at 2 m; 100 N up at 3 m. Is it in equilibrium?"
Expected: ΣF = −300+200+100 = 0 ✓. Pivot at left: Στ = −300×1 + 200×2 + 100×3 = −300+400+300 = 400 ≠ 0. NOT in equilibrium.
_Discriminates: MC-ONE-CONDITION; forces can balance but torque does not._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "State the two conditions for static equilibrium."
Threshold: ΣF = 0 (all components) AND Στ = 0 (about any chosen axis).

**FA-2 (TA-4 exit):** "Forces on a beam balance (ΣF = 0). Is it necessarily in equilibrium?"
Expected: No — must also have Στ = 0. If student says yes → MC-ONE-CONDITION not resolved.

**FA-3 (TA-5 exit):** "A beam has R_A (unknown) at the left and R_B (unknown) at the right.
Where should you put the pivot to find R_B in one step?"
Expected: At R_A (pivot where one unknown acts → it drops out). If student says "at the centre" →
MC-PIVOT-FIXED not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-3, MP-5. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only symmetric beams (weight at centre, equal supports) in TA-1 and TA-2.
- Introduce asymmetry (weight off-centre) in TA-3 only after symmetric cases are secure.
- Skip the ladder problem in TA-5; substitute a simpler hanging sign.
- Reassure: "Two equations: ΣF = 0 and Στ = 0. Start with the torque equation — it usually
  has only one unknown if you choose the pivot well."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (non-equilibrium detection) at TA-3 before any guided practice.
- Challenge: "Design a 5 m beam with a weight of 500 N that is in equilibrium with support
  forces no greater than 400 N each. Where can the weight be placed?"
- Spend TA-6 on Problem 5 (ladder with friction — introduces friction into equilibrium).

**S4 (Prereq gap):**
- PD-1 gap (Torque) → repair τ = rF sinθ and sign convention.
- PD-2 gap (FBD) → repair force inventory and labelling before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → two conditions → MC-ONE-CONDITION repair).
**Session 2 (≥24 h later):** Retrieval: "Two conditions for equilibrium? Pivot strategy?"
  → TA-5 (MC-PIVOT-FIXED, ladder) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining equilibrium and torque:
  "A 6 m uniform ladder (mass 18 kg) leans at 65° against a frictionless wall.
  A 70 kg person stands 4 m up the ladder. Find the friction force at the base and the
  normal force at the wall." (Requires Στ = 0 about base and ΣF = 0.)
**Pre-gravitation cluster:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.torque (Στ = 0), phys.mech.free-body-diagram (force identification),
phys.mech.newtons-second-law (ΣF = 0 as special case of ΣF = ma).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.equilibrium ✓
V-2   prerequisites listed and exist in KG: phys.mech.torque,
      phys.mech.free-body-diagram ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: see-saw balance anchor ✓
V-8   ≥2 misconceptions engineered: MC-ONE-CONDITION, MC-PIVOT-FIXED ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: see-saw balance scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-ONE-CONDITION ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: torque, free-body-diagram,
      newtons-second-law ✓
V-19  cross_links match KG edges: newtons-second-law, rotational-dynamics,
      centre-of-mass ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
