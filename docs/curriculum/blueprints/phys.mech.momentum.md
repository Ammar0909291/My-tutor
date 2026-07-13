# Teaching Blueprint — phys.mech.momentum

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.momentum
name:               Momentum
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              understand
mastery_threshold:  0.80
estimated_hours:    3
prerequisites:      [phys.mech.newtons-second-law]
cross_links:        [phys.mech.impulse, phys.mech.conservation-of-momentum,
                     phys.mech.kinetic-energy]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a slow-moving truck vs a fast-moving car — which is "harder
                       to stop"? before p = mv; difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Momentum is the product of an object's mass and velocity. It is a vector
quantity — direction matters. Momentum captures "how hard it is to stop" something: a large
mass or high speed both increase momentum. The rate of change of momentum equals the net force
(Newton's 2nd Law in its most general form).

**Formal Definition:**
p = mv

where p is momentum (kg·m/s), m is mass (kg), v is velocity (m/s, with direction).

**Newton's 2nd Law in momentum form:**
F_net = Δp/Δt = m(Δv/Δt) = ma    (when mass is constant)

**Key properties:**
- Momentum is a vector: p direction = v direction.
- A system's total momentum = vector sum of all individual momenta.
- Momentum ≠ kinetic energy: p = mv (vector), KE = ½mv² (scalar, always ≥ 0).
- Two objects with the same p can have very different KE (e.g., different masses).
- Momentum is the bridge to impulse (Δp = FΔt) and conservation of momentum.

**Worked Example 1 (Basic):**
A 3 kg ball moves at 4 m/s east. p = 3 × 4 = 12 kg·m/s east.

**Worked Example 2 (Direction matters):**
A 5 kg ball moves at 6 m/s west. p = 5 × 6 = 30 kg·m/s west (not east).

**Worked Example 3 (Two objects, total momentum):**
Car A: 1000 kg moving east at 15 m/s → p_A = 15 000 kg·m/s east.
Car B: 1500 kg moving west at 10 m/s → p_B = 15 000 kg·m/s west.
Total p = 15 000 − 15 000 = 0 (net momentum is zero — they cancel).

**Worked Example 4 (p vs KE):**
Object A: 4 kg, 6 m/s → p = 24 kg·m/s, KE = 72 J.
Object B: 9 kg, 8/3 m/s → p = 24 kg·m/s, KE = 32 J.
Same momentum, different KE. A has more KE because it's faster.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.newtons-second-law  ──────────►  phys.mech.momentum
   (F_net = ma; understanding that force changes velocity)
   REQUIRED: student knows Newton's 2nd Law and can compute F = ma
```

**PD-1 (Newton's 2nd Law):**
"A 5 kg object experiences F_net = 20 N. What acceleration?"
Expected: a = 4 m/s².

If student cannot apply F = ma → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-MOMENTUM-IS-SPEED (Priority 1)
**Label:** "Momentum is the same as speed or velocity — a fast object always has more momentum"

**Trigger signals:**
- Says "the car has more momentum because it's faster" without considering mass
- Computes momentum as v only (forgets ×m)
- Claims a fast bicycle has more momentum than a slow lorry

**Conflict evidence [P28]:**
"A 0.1 kg tennis ball moves at 50 m/s. A 1000 kg truck moves at 2 m/s.
Tennis ball momentum: 0.1 × 50 = 5 kg·m/s.
Truck momentum: 1000 × 2 = 2000 kg·m/s.
Which is harder to stop? Which has more momentum? Is it the faster object?"

**Bridge [P30]:**
"Momentum = mass × velocity. A very massive object at low speed can have far more momentum
than a light object at high speed. That's why a truck at walking speed is so dangerous — its
mass amplifies its momentum enormously."

**Replacement [P31]:**
"p = mv. Both mass AND velocity contribute. To rank objects by momentum, you must compute
both factors. A fast light object vs a slow heavy object — you cannot tell without the numbers."

**Discrimination pairs [P33]:**
- Tennis ball (0.1 kg, 50 m/s): p = 5 kg·m/s vs Truck (1000 kg, 2 m/s): p = 2000 kg·m/s ✓
- Racing car (800 kg, 60 m/s): p = 48 000 vs Pedestrian (70 kg, 2 m/s): p = 140 ✓

**s6_path:** Skip the truck-vs-tennis comparison; use a simpler pair: 2 kg at 3 m/s vs 6 kg at 1 m/s
(p = 6 vs 6 — equal, even though speeds differ).

---

### MC-MOMENTUM-IS-SCALAR (Priority 2)
**Label:** "Momentum is a positive number — direction doesn't matter"

**Trigger signals:**
- Adds momenta of objects moving in opposite directions without considering signs
- Says total momentum of two equal-mass, equal-speed objects moving oppositely is "2mv"
- Confused when p_total = 0 while the system is still in motion

**Conflict evidence [P28]:**
"A 2 kg ball moves east at 5 m/s: p_A = +10 kg·m/s.
A 2 kg ball moves west at 5 m/s: p_B = −10 kg·m/s.
If we add magnitudes: 10 + 10 = 20. But east + west cancel, so total = 0.
Which is the correct total momentum? What happens if they collide and stick together?"

**Bridge [P30]:**
"Momentum is a vector. Vectors in opposite directions subtract, not add. Define one direction
as positive; the opposite is negative. Always assign signs before summing. Total momentum of
zero means the system as a whole has no net motion tendency — even though both parts are moving."

**Replacement [P31]:**
"Total p = Σ(m_i × v_i) with signs. East = +, West = −. Or North = +, South = −.
The direction convention must be stated and applied consistently. p_total = 0 does not mean
'no objects are moving' — it means 'net motion of the centre of mass is zero.'"

**Discrimination pairs [P33]:**
- Two identical balls moving oppositely: p_total = 0 (not 2mv) ✓
- Same balls both moving east: p_total = 2mv ✓

**s6_path:** Use only one-dimensional east-only examples for TA-4 if S6 is flagged. Introduce
negative momentum (westward) in TA-5 only after the vector concept is secure.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to "quantity of motion."
P04: "Imagine a slow-moving lorry vs a fast-moving bicycle. Which do you think is 'harder to stop'?
Which has more 'motion'? How would you measure it?"
P06 (hands-on anchor): "A slow elephant vs a fast cheetah. The elephant has far more 'oomph' at
slow speeds. We want a single number that captures this — Momentum."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Table showing p = mv for different objects:

```
Object         Mass (kg)  Speed (m/s)  Momentum (kg·m/s)
Tennis ball      0.06        50              3
Football         0.43        20              8.6
Cyclist          80           8             640
Car            1200          20          24 000
Lorry         20 000          5         100 000
```

P08 (notation): p = mv. Units: kg·m/s. Direction: same as v; use + / − sign convention.
Newton's 2nd Law: F_net = Δp/Δt. Walk through Worked Examples 1 and 3.

P05: "Newton originally stated his 2nd Law in terms of momentum, not acceleration.
p = mv is the more fundamental form — it works even when mass changes (like a rocket)."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (Newton's 2nd Law).
P34: "5 kg, F_net = 20 N → a = ?" Expected: 4 m/s².
If gap → repair F = ma first.

P10 (example): "A 0.5 kg ball moves east at 12 m/s. Find p. Now it bounces west at 8 m/s. Find p."
P13: "East = +. p_before = +6 kg·m/s. West = −. p_after = −4 kg·m/s.
Δp = −4 − (+6) = −10 kg·m/s (westward change). This is what the wall's force caused."

---

### TA-4 — MC-MOMENTUM-IS-SPEED Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 0.1 kg tennis ball at 60 m/s vs a 2000 kg truck at 1 m/s.
Before computing: which has more momentum? Is it definitely the faster one?"

Listen: if student says "tennis ball — it's faster" → MC-MOMENTUM-IS-SPEED confirmed.

P28 → P30 → P31 (full Misconception Engine MC-MOMENTUM-IS-SPEED sequence).

P33: Tennis ball p = 6 kg·m/s; Truck p = 2000 kg·m/s. "Truck wins massively."

P36: "Can you construct two objects with equal momentum but different speeds? (Hint: vary mass.)"
[Answer: 2 kg at 6 m/s and 3 kg at 4 m/s both give p = 12 kg·m/s — different speeds, same momentum.]

---

### TA-5 — MC-MOMENTUM-IS-SCALAR Probe + Total Momentum Practice [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A 3 kg ball moves east at 4 m/s; a 3 kg ball moves west at 4 m/s.
What is the total momentum of the two-ball system?"

Listen: if student says "24 kg·m/s" (adds magnitudes) → MC-MOMENTUM-IS-SCALAR confirmed.

P28 → P30 → P31 (full Misconception Engine MC-MOMENTUM-IS-SCALAR sequence).

P10: "Find total momentum: Car (1200 kg, east, 20 m/s) + Truck (2000 kg, west, 10 m/s)."
P13: "East = +. p_car = +24 000. p_truck = −20 000. Total = +4000 kg·m/s east."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic:** A 0.4 kg football moves at 15 m/s east. p = ? [Answer: 6 kg·m/s east]
2. **Vector:** A 2 kg ball moves west at 3 m/s and a 5 kg ball moves east at 2 m/s.
   Total p? [Answer: −6 + 10 = +4 kg·m/s east]
3. **Newton's 2nd (momentum form):** A 3 kg object's momentum changes from 9 kg·m/s to
   21 kg·m/s in 4 s. Net force? [Answer: Δp/Δt = 12/4 = 3 N]
4. **p vs KE:** Object A: 2 kg, 10 m/s. Object B: 8 kg, 5 m/s. Which has more p? More KE?
   [Answer: p_A = 20, p_B = 40 → B more p. KE_A = 100, KE_B = 100 → equal KE]
5. **Find mass:** An object has p = 35 kg·m/s and moves at 7 m/s. Mass = ?
   [Answer: m = 35/7 = 5 kg]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: p = mv. Vector — direction matters; use sign convention. p ≠ KE.
Newton's 2nd Law: F_net = Δp/Δt. Next: impulse (how forces change momentum) and
conservation of momentum."

P62: "Next session: 'A 4 kg object moves east at 5 m/s, a 2 kg object moves west at 10 m/s.
Total momentum? Are they equal and opposite?'"

P85: "You correctly recognised that mass and speed both contribute to momentum — that's
the insight that drives all collision and impulse problems. Strong foundation."

P89: Log MC flags; record problem-set accuracy; note direction-sign handling.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic):**
"A 0.5 kg ball moves at 8 m/s east. What is its momentum?"
Expected: p = 4 kg·m/s east.
_Discriminates: basic p = mv with direction._

**MP-2 (Apply — mass vs speed):**
"A 3 kg ball at 4 m/s vs a 1 kg ball at 10 m/s. Which has greater momentum?"
Expected: 3×4=12 vs 1×10=10 → 3 kg ball has greater momentum.
_Discriminates: MC-MOMENTUM-IS-SPEED resolution._

**MP-3 (Apply — total momentum with direction):**
"A 4 kg ball moves east at 6 m/s. A 3 kg ball moves west at 4 m/s.
Total momentum of the system?"
Expected: +24 − 12 = +12 kg·m/s east.
_Discriminates: MC-MOMENTUM-IS-SCALAR resolution._

**MP-4 (Apply — Newton's 2nd in momentum form):**
"A 2 kg object's velocity changes from +3 m/s to +9 m/s in 3 s. What net force acted?"
Expected: Δp = 2×(9−3) = 12 kg·m/s; F = 12/3 = 4 N.
_Discriminates: F = Δp/Δt; links momentum to Newton's laws._

**MP-5 (Analyze — p vs KE comparison):**
"Object A: 4 kg, 3 m/s. Object B: 1 kg, 6 m/s. Which has more momentum? Which has more KE?"
Expected: p_A = 12, p_B = 6 → A more momentum. KE_A = 18, KE_B = 18 → equal KE.
_Discriminates: momentum and KE are distinct; can have equal KE but unequal momentum._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "p = ? Units? Is it a scalar or vector?"
Threshold: p = mv; kg·m/s; vector (direction = direction of v).

**FA-2 (TA-4 exit):** "A 2 kg object at 3 m/s vs a 0.5 kg object at 20 m/s. Which has more p?"
Expected: 2×3 = 6 vs 0.5×20 = 10 → lighter object has more p in this case.
If student says heavier object → MC-MOMENTUM-IS-SPEED not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "3 kg east at 5 m/s + 3 kg west at 5 m/s. Total p?"
Expected: 0 kg·m/s. If student says 30 → MC-MOMENTUM-IS-SCALAR not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only eastward motion (all positive) in TA-3 and TA-4.
- Introduce negative momentum (westward) only in TA-5 after positive-only examples are secure.
- Start with Problem 1 only from the TA-6 set; add complexity step by step.
- Reassure: "p = mv — just two numbers multiplied."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (p vs KE comparison) at TA-3 — catches students who conflate them.
- Challenge: "Design a scenario where a lighter object stops a heavier one dead (requires equal
  and opposite momenta) — what speeds do you need?"
- Spend TA-6 extra time on F = Δp/Δt problems.

**S4 (Prereq gap — Newton's 2nd Law):**
- Detect via PD-1 failure at TA-3.
- Repair: mini-session on F_net = ma, then introduce F = Δp/Δt as the same law.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → formula → MC-MOMENTUM-IS-SPEED repair).
**Session 2 (≥24 h later):** Retrieval: "p formula? Is it scalar or vector?"
  → TA-5 (direction, total p) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining momentum and kinetic energy:
  "Find two objects with equal KE but different momenta. Find two with equal momenta but different KE."
  (Forces student to compare p = mv against KE = ½mv² systematically.)
**Pre-impulse session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.kinetic-energy (p vs KE distinction), phys.mech.newtons-second-law
(F = Δp/Δt).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.momentum ✓
V-2   prerequisites listed and exist in KG: phys.mech.newtons-second-law ✓
V-3   bloom level consistent with difficulty 4/proficient: understand ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 3h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: truck-vs-bicycle anchor ✓
V-8   ≥2 misconceptions engineered: MC-MOMENTUM-IS-SPEED, MC-MOMENTUM-IS-SCALAR ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: elephant-vs-cheetah scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-MOMENTUM-IS-SPEED ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: kinetic-energy, newtons-second-law ✓
V-19  cross_links match KG edges: impulse, conservation-of-momentum, kinetic-energy ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
