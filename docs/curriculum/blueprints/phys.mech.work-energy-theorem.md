# Teaching Blueprint — phys.mech.work-energy-theorem

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.work-energy-theorem
name:               Work–Energy Theorem
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    4
prerequisites:      [phys.mech.kinetic-energy, phys.mech.work]
cross_links:        [phys.mech.conservation-of-energy, phys.mech.kinematics-1d,
                     phys.mech.friction, phys.mech.power]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (push a book on a table; it speeds up — where did the KE come
                       from? before W_net = ΔKE; difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** The net work done on an object equals the change in that object's kinetic
energy. This bridges force-displacement reasoning with energy reasoning, and is often a
simpler path to finding speed than kinematics when force or displacement is known.

**Formal Statement:**
W_net = ΔKE = KE_f − KE_i = ½mv_f² − ½mv_i²

where W_net is the sum of work done by all forces acting on the object.

**Derivation in one step (for reference):**
From Newton's 2nd Law: F_net = ma. Over displacement s: W_net = F_net × s = mas.
Using kinematics: v_f² = v_i² + 2as → as = (v_f² − v_i²)/2.
Substituting: W_net = m(v_f² − v_i²)/2 = ½mv_f² − ½mv_i² = ΔKE. ✓

**Key properties:**
- W_net includes ALL forces (applied, friction, gravity, normal — anything that does work).
- Normal force and centripetal force are always ⊥ to motion → do zero work → don't appear.
- If W_net > 0: object speeds up (KE increases).
- If W_net < 0: object slows down (KE decreases).
- If W_net = 0: constant speed (KE unchanged), even if multiple forces act.
- Advantage over kinematics: no need to find acceleration when force and displacement are known.

**Worked Example 1 (Accelerating object):**
A 4 kg box starts at rest. A 20 N force pushes it 5 m horizontally; friction force = 8 N.
W_applied = 20 × 5 = 100 J; W_friction = −8 × 5 = −40 J.
W_net = 60 J = ΔKE → ½ × 4 × v_f² − 0 → v_f² = 30 → v_f = 5.48 m/s.

**Worked Example 2 (Object slows):**
A 2 kg object moves at 10 m/s. A friction force of 5 N acts over 6 m.
W_net = −5 × 6 = −30 J. ΔKE = −30 J.
KE_i = ½ × 2 × 100 = 100 J. KE_f = 70 J. v_f = √(2×70/2) = √70 ≈ 8.37 m/s.

**Worked Example 3 (Find distance from speed change):**
A 3 kg object decelerates from 12 m/s to 6 m/s. Friction force = 18 N. Find distance.
ΔKE = ½×3×36 − ½×3×144 = 54 − 216 = −162 J.
W_net = −18 × d = −162 → d = 9 m.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.kinetic-energy  ──────────►
                                       phys.mech.work-energy-theorem
phys.mech.work           ──────────►
```

**PD-1 (KE prerequisite):**
"A 5 kg cart moves at 6 m/s. What is its KE?"
Expected: KE = ½ × 5 × 36 = 90 J.

**PD-2 (Work prerequisite):**
"A 15 N force acts over 4 m at θ = 0°. What work is done?"
Expected: W = 60 J.

Both must pass before TA-3. Gap in either → repair that concept first.

---

## Component 3 — Misconception Engine

### MC-PARTIAL-WORK (Priority 1)
**Label:** "Only the applied/external force counts — friction doesn't contribute to W_net"

**Trigger signals:**
- Computes W_net = W_applied only, ignoring friction, gravity components, or other forces
- Writes "W = Fd" using only the push force in a friction scenario
- Gets correct applied-force work but wrong final speed (off by ignoring friction)

**Conflict evidence [P28]:**
"A 5 kg box starts at rest. Applied force = 30 N, friction = 10 N, displacement = 4 m.
You wrote W_net = 30×4 = 120 J → v_f = √(2×120/5) = 6.93 m/s.
But let's check with kinematics: F_net = 30−10 = 20 N; a = 4 m/s²; v_f² = 2×4×4 = 32;
v_f = 5.66 m/s. The two answers disagree. Why?"

**Bridge [P30]:**
"W_net is the work done by the NET force. Every force that has a component along displacement
does work — positive (if it aids motion) or negative (if it opposes). Friction opposes, so it
does negative work that reduces ΔKE. Skipping it means you're computing the wrong ΔKE."

**Replacement [P31]:**
"W_net = ΣW_each_force = W_applied + W_friction + W_gravity + ... 
List every force; compute its work (W = Fd cosθ); sum all. Only forces perpendicular to motion
(normal force on flat surface; centripetal force) contribute zero and can be omitted."

**Discrimination pairs [P33]:**
- Box on flat surface: W_net = W_applied + W_friction (both nonzero) ✓
- Box on frictionless flat surface, normal force: W_net = W_applied only (normal ⊥ motion → 0) ✓

**s6_path:** Skip the conflict comparison; use the simpler single-force case (no friction) first;
add friction in TA-5 only after the theorem is secure.

---

### MC-WET-ZERO-SPEED (Priority 2)
**Label:** "If W_net = 0, the object must be at rest (speed = 0)"

**Trigger signals:**
- Says "W_net = 0 → v = 0" for a box moving at constant velocity
- Thinks ΔKE = 0 means KE = 0
- Confuses no change in speed with no speed

**Conflict evidence [P28]:**
"A box moves at 5 m/s across a surface. Friction = 8 N. Applied force = 8 N. Displacement = 3 m.
W_applied = +24 J. W_friction = −24 J. W_net = 0.
ΔKE = 0, so KE_f = KE_i. But the box started at 5 m/s, so KE_i = ½mv² > 0.
What is the final speed?"

**Bridge [P30]:**
"ΔKE = 0 means KE did not change — not that KE = 0. If the object was already moving,
it continues at the same speed. The theorem relates CHANGE in KE to net work, not KE itself."

**Replacement [P31]:**
"W_net = ΔKE = KE_f − KE_i.
ΔKE = 0 → KE_f = KE_i → constant speed (could be any nonzero speed).
The theorem says nothing about the absolute value of KE — only about its change."

**Discrimination pairs [P33]:**
- W_net = 0, v_i = 5 m/s → v_f = 5 m/s (constant speed, not stopped) ✓
- W_net = −KE_i → KE_f = 0 → object comes to rest (this IS the stop case) ✓

**s6_path:** Use only the rest-to-moving direction (W_net > 0 → object speeds up) initially;
introduce constant-speed case only after confidence is established.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to energy as the alternative path to solving motion problems.
P04: "You push a book across a table. It speeds up — where did that kinetic energy come from?
The push did work on the book. Could work and KE be connected by a formula?"
P06 (hands-on anchor): "A book starts at rest, you push it 0.5 m and let go. It slides away.
The work you did on the book is now the KE it has. Same idea — just made precise."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Three-column diagram:

```
Forces acting        Work done        ΔKE
Applied (→)   →   +W_applied    ↗
Friction  (←) →   −W_friction   ↘   →  W_net = ΔKE
Normal    (↑) →     0 (⊥)       —
Gravity   (↓) →     0 (⊥ here)  —
```

P08 (notation): W_net = ΔKE = ½mv_f² − ½mv_i². Emphasise: ALL forces' work summed; normal/
centripetal excluded only if ⊥ to motion. Walk through Worked Example 1 step by step.

P05: "This is one of the most powerful shortcuts in physics. If someone tells you the force
and displacement, you can find the final speed in one equation — no kinematics needed."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 and PD-2 consecutively.
P34: "5 kg, 6 m/s → KE?" then "15 N, 4 m → Work?"
Gap in KE → repair KE = ½mv² before continuing.
Gap in Work → repair W = Fd cosθ before continuing.

P10 (example): "A 3 kg object at rest. Applied force 18 N, friction 6 N, displacement 5 m.
Find v_f using the Work–Energy Theorem."
P13 (think-aloud): "W_applied = 18×5 = 90 J. W_friction = −6×5 = −30 J.
W_net = 60 J = ΔKE = ½×3×v_f² − 0. v_f² = 40. v_f = 6.32 m/s."

---

### TA-4 — MC-PARTIAL-WORK Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 5 kg box at rest. Applied 30 N, friction 10 N, displacement 4 m.
Before computing: do you think you should include friction in W_net? Estimate v_f."

Listen: if student ignores friction → MC-PARTIAL-WORK confirmed.

P28 → P30 → P31 (full Misconception Engine MC-PARTIAL-WORK sequence).

P33 (discrimination pair):
"(a) No friction: W_net = 30×4 = 120 J → v_f = 6.93 m/s.
 (b) Friction 10 N: W_net = 80 J → v_f = 5.66 m/s.
 The friction scenario gives a lower final speed — friction does negative work."

P36 (open probe): "Under what conditions could friction do zero work on an object? (Hint: think
about the definition of work.)" [Answer: if friction force is zero, or if there is no displacement.]

---

### TA-5 — MC-WET-ZERO-SPEED Probe + Non-trivial Applications [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A 4 kg box moves at 5 m/s. Applied force 12 N, friction 12 N, displacement 3 m.
What is v_f?" Listen: if student says "0 m/s (because W_net = 0)" → MC-WET-ZERO-SPEED confirmed.

P28 → P30 → P31 (full Misconception Engine MC-WET-ZERO-SPEED sequence).

P10: "Find distance to stop: A 2 kg object moves at 8 m/s; friction = 4 N. How far before rest?"
Think-aloud: "ΔKE = 0 − ½×2×64 = −64 J. W_net = −4×d = −64 → d = 16 m."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic:** 3 kg object, rest, applied 24 N, frictionless, displacement 6 m. Find v_f.
   [Answer: W_net = 144 J; v_f = √(2×144/3) = √96 ≈ 9.8 m/s]
2. **With friction:** 5 kg object, v_i = 4 m/s, applied 30 N, friction 10 N, displacement 5 m.
   [Answer: W_net = 100 J; KE_i = 40 J; KE_f = 140 J; v_f = √(2×140/5) = √56 ≈ 7.48 m/s]
3. **Deceleration:** 4 kg object at 10 m/s, friction only (no applied), friction = 8 N.
   Find v_f after 3 m. [Answer: W_net = −24 J; KE_f = 200−24 = 176 J; v_f = √(2×176/4) = √88 ≈ 9.38 m/s]
4. **Find distance:** 6 kg object decelerates from 15 m/s to 9 m/s. Friction = 12 N.
   [Answer: ΔKE = ½×6×(81−225) = −432 J; d = 432/12 = 36 m]
5. **Constant speed:** 3 kg box moves at constant 4 m/s for 5 m. Applied = 6 N, friction = 6 N.
   What is v_f? [Answer: W_net = 0; ΔKE = 0; v_f = 4 m/s (unchanged)]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: W_net = ΔKE. Net work = sum of all forces' work. Normal force and centripetal
force ⊥ to motion → zero work → excluded. W_net = 0 → constant speed, not rest (unless v_i = 0)."

P62: "Next session: 'A 2 kg object at 6 m/s. Friction = 3 N. How far before KE halves?'"

P85: "You included friction correctly — that's the most common source of error here. The
systematic force-by-force work inventory will serve you well in every energy problem from here."

P89: Log MC flags; record problem-set accuracy by problem number.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — basic, frictionless):**
"A 2 kg cart at rest is pushed by 16 N over 4 m (frictionless). Find v_f."
Expected: W_net = 64 J; v_f = √(2×64/2) = 8 m/s.
_Discriminates: basic W_net = ΔKE._

**MP-2 (Apply — with friction):**
"A 4 kg box at rest. Applied 20 N, friction 8 N, displacement 5 m. Find v_f."
Expected: W_net = (20−8)×5 = 60 J; v_f = √(2×60/4) = √30 ≈ 5.48 m/s.
_Discriminates: MC-PARTIAL-WORK resolution._

**MP-3 (Apply — find distance):**
"A 5 kg object moves at 12 m/s. Friction = 15 N (no applied). Find d to reach 6 m/s."
Expected: ΔKE = ½×5×(36−144) = −270 J; d = 270/15 = 18 m.
_Discriminates: algebraic rearrangement; deceleration case._

**MP-4 (Understand — W_net = 0):**
"A 3 kg box moves at 7 m/s. Applied = 9 N, friction = 9 N, displacement = 4 m. Find v_f."
Expected: W_net = 0; ΔKE = 0; v_f = 7 m/s.
_Discriminates: MC-WET-ZERO-SPEED resolution._

**MP-5 (Apply — normal force):**
"A 2 kg box is pushed along a flat horizontal surface (μ_k = 0.25) by applied force 12 N
for 3 m. g = 9.8. The box starts at rest. Find v_f."
Expected: Normal N = mg = 19.6 N; friction = 0.25×19.6 = 4.9 N; W_net = (12−4.9)×3 = 21.3 J;
v_f = √(2×21.3/2) = √21.3 ≈ 4.62 m/s.
_Discriminates: must compute friction force from normal force (not just given)._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Which forces contribute to W_net? Give an example of a force that does zero work."
Threshold: Must list 'all forces with a component along displacement'; give normal or centripetal as zero-work example.

**FA-2 (TA-4 exit):** "5 kg box, applied 25 N, friction 5 N, 8 m. KE_i = 0. Find KE_f and v_f."
Expected: W_net = 160 J; v_f = 8 m/s. If student ignores friction → MC-PARTIAL-WORK not resolved.

**FA-3 (TA-5 exit):** "4 kg, v_i = 6 m/s, applied = friction (both 10 N), displacement 5 m. v_f = ?"
Expected: v_f = 6 m/s. If student says 0 → MC-WET-ZERO-SPEED not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.
Otherwise → targeted re-teach of failed probe type.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Begin with frictionless cases only; add friction in TA-5 only.
- Break every problem into explicit steps: (1) list forces, (2) compute each W, (3) sum → W_net,
  (4) set equal to ΔKE, (5) solve for unknown.
- Use g = 10 to simplify arithmetic.
- Reassure: "The formula has only two parts: net work and change in KE."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (must derive friction force) at TA-3 before guided practice.
- Challenge: "A block is launched up an incline. Applied force is gone once launched. Friction
  acts downward. Use the theorem to find how far it travels before stopping."
- Advance quickly to distance-finding problems (MP-3 type) in TA-6.

**S4 (Prereq gap):**
- PD-1 gap (KE) → repair KE = ½mv² concept before TA-3.
- PD-2 gap (Work) → repair W = Fd cosθ before TA-3.
- Both gaps → KE repair first (Work builds on KE conceptually in this theorem).

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → theorem formula → MC-PARTIAL-WORK repair).
**Session 2 (≥24 h later):** Retrieval cold-start: "State the Work–Energy Theorem. What forces
  contribute to W_net?" → TA-5 (MC-WET-ZERO-SPEED) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe:
  "A 3 kg box starts at v_i = 5 m/s. It travels 10 m with friction = 2 N and applied = 8 N.
  Find v_f. Then: what power does the applied force deliver at v_f?"
  (Integrates Work–Energy Theorem with Power = Fv.)
**Pre-conservation-of-energy session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.kinetic-energy, phys.mech.work, phys.mech.friction (friction
work), phys.mech.power (P = Fv connects to final speed found via theorem).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.work-energy-theorem ✓
V-2   prerequisites listed and exist in KG: phys.mech.kinetic-energy, phys.mech.work ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 4h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: push-a-book-it-speeds-up anchor ✓
V-8   ≥2 misconceptions engineered: MC-PARTIAL-WORK, MC-WET-ZERO-SPEED ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: book-push-speeds-up scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-PARTIAL-WORK ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: kinetic-energy, work, friction, power ✓
V-19  cross_links match KG edges: conservation-of-energy, kinematics-1d, friction, power ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
