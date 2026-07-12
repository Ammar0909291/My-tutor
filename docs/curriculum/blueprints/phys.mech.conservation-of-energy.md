# Teaching Blueprint — phys.mech.conservation-of-energy

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.conservation-of-energy
name:               Conservation of Energy
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              analyze
mastery_threshold:  0.85
estimated_hours:    5
prerequisites:      [phys.mech.kinetic-energy, phys.mech.potential-energy,
                     phys.mech.work-energy-theorem]
cross_links:        [phys.mech.power, phys.mech.momentum, phys.mech.collisions,
                     phys.mech.hookes-law]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (swing a pendulum and watch it return to the same height —
                       where does the energy go when it's at the bottom?
                       before E_total = KE + PE = constant; difficulty 5 → C
                       with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** In an isolated system with no non-conservative forces, the total mechanical
energy (KE + PE) is constant. Energy transforms between kinetic and potential forms but is
never created or destroyed. When friction or air resistance acts, mechanical energy decreases —
but total energy (including thermal) is still conserved.

**Formal Statements:**

*Conservative system (no friction/air resistance):*
E_total = KE + PE = constant
KE_i + PE_i = KE_f + PE_f
½mv_i² + mgh_i = ½mv_f² + mgh_f

*Non-conservative system (with friction):*
KE_i + PE_i = KE_f + PE_f + W_friction
(W_friction = μ_k N × d = energy lost to heat)

**Key properties:**
- Mechanical energy is conserved ONLY when all forces are conservative (gravity, springs).
- Friction, air resistance, drag are non-conservative → they dissipate mechanical energy.
- The reference level for PE cancels out: only ΔPE = mg Δh appears in the equation.
- Path is irrelevant for conservative forces: only initial and final heights matter.
- Conservation of energy is often the fastest solver for speed-vs-height problems.

**Worked Example 1 (Frictionless roller coaster):**
A 500 kg cart starts at rest at height h = 20 m. Find speed at h = 5 m.
KE_i + PE_i = KE_f + PE_f
0 + 500×9.8×20 = ½×500×v_f² + 500×9.8×5
98 000 = 250v_f² + 24 500
v_f² = (98 000 − 24 500)/250 = 294
v_f = √294 ≈ 17.1 m/s.

**Worked Example 2 (With friction — slide):**
A 3 kg block slides from rest at top of a 4 m frictionless ramp (height 2 m) then travels
3 m across a rough floor (μ_k = 0.3). Find final speed. g = 10.
Total PE_i = 3×10×2 = 60 J. W_friction = μ_k × mg × d = 0.3×30×3 = 27 J.
KE_f = 60 − 27 = 33 J. v_f = √(2×33/3) = √22 ≈ 4.69 m/s.

**Worked Example 3 (Spring-mass):**
A spring (k = 500 N/m) compressed 0.2 m launches a 0.5 kg ball. Find launch speed.
EPE_i = ½×500×0.04 = 10 J = KE_f = ½×0.5×v_f²
v_f = √(2×10/0.5) = √40 ≈ 6.32 m/s.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.kinetic-energy        ──►
phys.mech.potential-energy      ──►  phys.mech.conservation-of-energy
phys.mech.work-energy-theorem   ──►
```

**PD-1 (KE prerequisite):**
"A 4 kg object moves at 5 m/s. KE?"
Expected: 50 J.

**PD-2 (GPE prerequisite):**
"A 3 kg ball is 4 m above the floor. GPE? (g = 9.8)"
Expected: 117.6 J.

**PD-3 (Work–Energy Theorem):**
"A 2 kg object at rest. Applied 10 N, friction 4 N, displacement 5 m. Find v_f."
Expected: W_net = 30 J; v_f = √30 ≈ 5.48 m/s.

All three must pass before TA-3. Gap in any → repair that concept first.

---

## Component 3 — Misconception Engine

### MC-FRICTION-CONSERVES (Priority 1)
**Label:** "Conservation of energy applies even with friction — mechanical energy is still constant"

**Trigger signals:**
- Applies KE_i + PE_i = KE_f + PE_f in a friction scenario and gets the wrong answer
- Says "energy is always conserved so I can use the same equation"
- Attributes erroneous speed to the pendulum returning lower than its release height

**Conflict evidence [P28]:**
"A 2 kg block slides from rest at the top of a 3 m high frictionless ramp.
Using conservation: ½mv² = mgh → v = √(2×10×3) = √60 ≈ 7.75 m/s at the bottom.
Now the same scenario but with friction force 5 N over 5 m slope length.
W_friction = 5×5 = 25 J. If we use KE_f = mgh − W_friction = 60 − 25 = 35 J.
v = √(2×35/2) = √35 ≈ 5.92 m/s.
Both cannot be correct. Which formula applies when friction acts?"

**Bridge [P30]:**
"Total energy (mechanical + thermal) is always conserved. But mechanical energy = KE + PE
decreases when friction converts some into heat. The equation KE_i + PE_i = KE_f + PE_f
holds ONLY if zero mechanical energy is lost to friction. When friction is present, add it
to the right side as 'energy dissipated.'"

**Replacement [P31]:**
"With friction: KE_i + PE_i = KE_f + PE_f + W_friction_dissipated.
Without friction: KE_i + PE_i = KE_f + PE_f.
Always identify: is the system conservative (no friction/drag)? If not, account for losses."

**Discrimination pairs [P33]:**
- Frictionless ramp: full PE converts to KE ✓
- Same ramp with friction: less KE at bottom than PE at top (some lost to heat) ✓

**s6_path:** Start with frictionless examples only; introduce friction in TA-5 using a simple
"energy lost = friction × distance" calculation before full integration.

---

### MC-PATH-MATTERS (Priority 2)
**Label:** "The path taken between two heights affects the final speed (conservation should account for it)"

**Trigger signals:**
- Computes different final speeds for a ball sliding down a curved vs straight ramp to the same height
- Believes a longer curved path gives less final speed "because it traveled more distance"
- Says "the slope angle must matter — different angles give different speeds"

**Conflict evidence [P28]:**
"Ball A slides down a straight 60° ramp from height 4 m.
Ball B slides down a curved 'waterslide' ramp from the same height 4 m.
Both frictionless. Both start at rest. Using conservation:
v_f = √(2gh) = √(2×10×4) = √80 ≈ 8.94 m/s for both.
Same final speed, different paths. Does the path length appear in the formula?"

**Bridge [P30]:**
"Conservation of energy for gravity only depends on height change, not path. Gravity is a
conservative force — work done against it depends only on vertical displacement. That's why
the formula KE_i + PE_i = KE_f + PE_f has h (height), not L (path length). The path is irrelevant."

**Replacement [P31]:**
"For conservative forces (gravity, springs): only initial and final positions matter.
Path length, slope angle, and route are irrelevant to the final speed.
This path-independence is the defining property of conservative forces."

**Discrimination pairs [P33]:**
- Straight ramp vs curved ramp, same height: same v_f (frictionless) ✓
- Same height, with friction: longer path → more W_friction → lower KE_f ✓ (friction is path-dependent — good contrast)

**s6_path:** Skip the curved-vs-straight comparison initially; establish v_f = √(2gh) for straight
ramp; present as a single formula before introducing path independence.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to energy transformation.
P04: "Watch a pendulum swing. It starts high (slow), swings to the bottom (fast), then rises to
the same height on the other side (slow again). Where does the speed go at the top? Where does
it come from at the bottom?"
P06 (hands-on anchor): "A ball rolls down a ramp and back up. If frictionless, it returns to
exactly the starting height — no more, no less. The energy is simply changing form."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Energy bar diagram for a falling object:

```
Height:   h = 4 m    h = 2 m    h = 0 m
GPE (J):   [====]    [==]       [ ]
KE  (J):   [ ]       [==]       [====]
Total:     [====]    [====]     [====]   ← constant (frictionless)
```

P08 (notation): E_total = KE + PE. Conservative: KE_i + PE_i = KE_f + PE_f.
Non-conservative: add W_friction to right side.
Walk through Worked Example 1 (roller coaster) step by step.

P05: "Conservation of energy bypasses force and acceleration entirely. If you know the heights
and want the speed — this is almost always the fastest path."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1, PD-2, PD-3 consecutively.
P34: "4 kg, 5 m/s → KE?" then "3 kg, 4 m → GPE?" then "Work–Energy Theorem problem."
Gap in any → repair before continuing.

P10: "A 2 kg ball is dropped from 5 m (g = 10). Find speed just before hitting the floor."
P13: "KE_i + PE_i = KE_f + PE_f. At top: KE = 0, PE = 2×10×5 = 100 J. At bottom: PE = 0.
KE_f = 100 J. v_f = √(2×100/2) = √100 = 10 m/s."

---

### TA-4 — MC-FRICTION-CONSERVES Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 3 kg block slides from rest on a 3 m high frictionless ramp (g = 10).
Find v_f at the bottom. Now suppose friction removes 18 J of energy during the descent.
What is v_f now? Do you expect the same answer?"

Listen: if student applies same formula for both → MC-FRICTION-CONSERVES confirmed.

P28 → P30 → P31 (full Misconception Engine MC-FRICTION-CONSERVES sequence).

P33: Frictionless: v_f = √(2×10×3) = √60; With friction: KE_f = 90−18 = 72 J; v_f = √(2×72/3) = √48.
"Same height, lower final speed when friction acts. Friction dissipated 18 J as heat."

P36: "A pendulum is released from height h. After 10 swings it barely reaches h/2. Where did
the other energy go? Is total energy conserved? Is mechanical energy conserved?"

---

### TA-5 — MC-PATH-MATTERS Probe + Spring Systems [Protocol B + A]
**Primitives:** P14, P28, P30, P31, P33, P07, P08

P14: "Ball A: straight 45° ramp from 5 m. Ball B: curved waterslide from 5 m. Both frictionless.
Which has greater v at the bottom?"

Listen: if student says "A, because shorter path" → MC-PATH-MATTERS confirmed.

P28 → P30 → P31 (full Misconception Engine MC-PATH-MATTERS sequence).
P33: Same height → same v_f for conservative forces. Add friction → longer path → lower v_f.

P07 (spring): Energy bar diagram for a spring-mass system:
```
Compressed:   EPE [====]  KE [ ]    → fully compressed
Equilibrium:  EPE [ ]     KE [====] → max speed at centre
Extended:     EPE [====]  KE [ ]    → fully extended
```
P08: Walk through Worked Example 3 (spring launch).

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Frictionless fall:** 4 kg ball dropped from 10 m (g = 10). Speed at 4 m height?
   [Answer: KE gained = mg×(10−4) = 240 J; v = √(2×240/4) = √120 ≈ 10.95 m/s]
2. **Ramp with friction:** 5 kg block slides from 6 m height. Friction does −50 J of work.
   Find v_f at bottom. [Answer: KE_f = 5×10×6 − 50 = 250 J; v_f = √(2×250/5) = 10 m/s]
3. **Spring-mass:** k = 300 N/m, compressed 0.3 m, launches 0.6 kg ball. Find launch speed.
   [Answer: EPE = ½×300×0.09 = 13.5 J; v = √(2×13.5/0.6) = √45 ≈ 6.71 m/s]
4. **Find height:** A 2 kg ball with KE = 80 J at the bottom of a hill. How high can it rise
   if frictionless? [Answer: h = KE/(mg) = 80/20 = 4 m]
5. **Non-conservative — find friction:** A 3 kg block slides from 5 m height to the floor
   over a 10 m slope. v_f = 8 m/s. Find friction force. [g = 10]
   [Answer: KE_f = ½×3×64 = 96 J; PE_i = 150 J; W_friction = 150−96 = 54 J; f = 54/10 = 5.4 N]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: Conservation of energy — KE + PE = constant (frictionless). With friction:
KE_i + PE_i = KE_f + PE_f + W_friction. Path is irrelevant for conservative forces.
Energy is never destroyed — only transformed."

P62: "Next session: 'A 1 kg ball is released from 8 m. At 3 m height: speed? (frictionless)
What if friction dissipates 20 J on the way?' — solve both."

P85: "You identified the difference between conservative and non-conservative systems — that
distinction is the foundation of all energy problems in advanced physics."

P89: Log MC flags; log problem accuracy; note spring-system readiness.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — frictionless fall):**
"A 3 kg ball rolls from rest at h = 8 m down a frictionless ramp. Find v at h = 2 m. (g = 10)"
Expected: KE = mg(8−2) = 180 J; v = √(2×180/3) = √120 ≈ 10.95 m/s.
_Discriminates: basic conservation; height difference, not total height._

**MP-2 (Apply — with friction loss):**
"A 4 kg block slides from 5 m height. Friction dissipates 30 J. Find v_f at the bottom. (g = 10)"
Expected: KE_f = 200 − 30 = 170 J; v_f = √(2×170/4) = √85 ≈ 9.22 m/s.
_Discriminates: MC-FRICTION-CONSERVES resolution._

**MP-3 (Apply — spring launch):**
"A spring (k = 400 N/m) is compressed 0.1 m and launches a 0.2 kg ball. Find launch speed."
Expected: EPE = ½×400×0.01 = 2 J; v = √(2×2/0.2) = √20 ≈ 4.47 m/s.
_Discriminates: EPE → KE transfer._

**MP-4 (Analyze — path independence):**
"Ball A rolls down a steep short ramp; Ball B rolls down a gentle long ramp. Both start from
the same height (5 m) and both are frictionless. Which has the greater speed at the bottom?"
Expected: Same. v = √(2gh) = √(2×10×5) = 10 m/s for both.
_Discriminates: MC-PATH-MATTERS resolution._

**MP-5 (Analyze — find friction from energy data):**
"A 2 kg ball released at 10 m reaches the ground with v = 12 m/s. (g = 10)
How much energy was lost to friction?"
Expected: PE_i = 200 J; KE_f = ½×2×144 = 144 J; W_friction = 200−144 = 56 J.
_Discriminates: backward problem — uses conservation to find friction, not speed._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Under what conditions is KE + PE constant? What breaks that conservation?"
Threshold: Must state 'no friction / no air resistance' and 'friction dissipates mechanical energy'.

**FA-2 (TA-4 exit):** "3 kg block, height 4 m, frictionless. v at bottom? Now friction removes 24 J. v?"
Expected: v_frictionless = √(2×10×4) = √80 ≈ 8.94; v_friction = √(2×(120−24)/3) = √64 = 8 m/s.
If student gives same answer for both → MC-FRICTION-CONSERVES not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "Two frictionless ramps — steep vs gentle — from height 3 m. Same v_f?"
Expected: Yes. If student says no → MC-PATH-MATTERS not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.
Otherwise → targeted re-teach of failed probe type.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Begin with the ball-drop (PD-1-type) using g = 10 for clean arithmetic.
- Only frictionless problems in TA-3 and TA-4; defer friction to TA-5.
- Use the energy bar diagram heavily — visual reassurance that totals match.
- Break spring problems into: "step 1: EPE = ? step 2: set EPE = KE, solve v."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (backward — find friction from energy data) at TA-3.
- Challenge: "A ball is thrown upward at 15 m/s. How high does it reach? No energy formula
  given — derive it from conservation." (h = v²/2g)
- Introduce non-conservative problem early; spring-mass in TA-5.

**S4 (Prereq gap):**
- PD-1 gap (KE) → repair KE = ½mv² first.
- PD-2 gap (GPE) → repair GPE = mgh, reference level.
- PD-3 gap (Work–Energy Theorem) → repair W_net = ΔKE before this concept.
- All gaps must be resolved before TA-3; prioritise in PD-3 → PD-2 → PD-1 order (most complex first).

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → Conservation formula → MC-FRICTION-CONSERVES repair).
**Session 2 (≥24 h later):** Retrieval: "State conservation of energy. When does it fail?"
  → TA-5 (MC-PATH-MATTERS, spring systems) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe integrating all energy concepts:
  "A 500 kg car rolls from rest at the top of a hill (h = 20 m). Friction dissipates 40 kJ.
  Find v at the bottom. What average power did friction act at if the hill took 8 s?"
  (Combines conservation + friction loss + power = W/t.)
**Pre-momentum session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.kinetic-energy, phys.mech.potential-energy,
phys.mech.work-energy-theorem, phys.mech.power — the four form the complete energy cluster.

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.conservation-of-energy ✓
V-2   prerequisites listed and exist in KG: kinetic-energy, potential-energy,
      work-energy-theorem ✓
V-3   bloom level consistent with difficulty 5/advanced: analyze ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 5h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: pendulum anchor ✓
V-8   ≥2 misconceptions engineered: MC-FRICTION-CONSERVES, MC-PATH-MATTERS ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: pendulum/ball-on-ramp scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-FRICTION-CONSERVES ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: kinetic-energy, potential-energy,
      work-energy-theorem, power ✓
V-19  cross_links match KG edges: power, momentum, collisions, hookes-law ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
