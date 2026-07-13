# Teaching Blueprint — phys.mech.power

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.power
name:               Power
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    3
prerequisites:      [phys.mech.work]
cross_links:        [phys.mech.kinetic-energy, phys.mech.conservation-of-energy]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (two workers lifting same box to same height — one in 10 s, one in
                       5 s — who is "stronger"? before P = W/t; difficulty 4 → C with
                       accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Power is the rate of doing work (or the rate of energy transfer). Two machines
can do the same work; the one that does it faster has higher power. Power is a scalar.

**Formal Definitions:**
P = W / t       (average power)
P = Fv          (instantaneous power when force and velocity are parallel)

where W is work in joules (J), t is time in seconds (s), F is force (N), v is speed (m/s).
Unit: watt (W) = J/s = kg·m²/s³. Also: 1 horsepower (hp) ≈ 746 W.

**Key properties:**
- Power does not tell you how much work was done — only how quickly.
- Same work, shorter time → higher power.
- P = Fv is useful for engines (rated by power and speed, not by work done).
- Power can be negative: if a braking force opposes motion, P = Fv cosθ with θ = 180° → negative.

**Worked Example 1 (Average power):**
A worker lifts a 50 kg box 2 m in 4 s.
Work = mgh = 50 × 9.8 × 2 = 980 J.
P = W/t = 980/4 = 245 W.

**Worked Example 2 (P = Fv):**
A car engine exerts a 3000 N driving force at 20 m/s.
P = Fv = 3000 × 20 = 60 000 W = 60 kW.

**Worked Example 3 (Find time from power):**
A 1200 W motor does 18 000 J of work. How long does it run?
t = W/P = 18 000/1200 = 15 s.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.work  ──────────────────────►  phys.mech.power
   (W = Fd cosθ; W = mgh for vertical lift)
   REQUIRED: student can compute work done in a physical scenario
```

**PD-1 (Work prerequisite):**
"A 10 N force pulls a box 6 m horizontally (cos0° = 1). What work is done?"
Expected: W = 60 J.

If student cannot compute W → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-POWER-IS-ENERGY (Priority 1)
**Label:** "Power and energy (work) are the same thing"

**Trigger signals:**
- Says "the car has more power so it did more work"
- Confused when two engines with different powers do the same work
- Uses P and W interchangeably in equations

**Conflict evidence [P28]:**
"Two cranes lift identical 500 kg loads 10 m. Crane A takes 20 s, Crane B takes 5 s.
Work done by A = Work done by B = 500×9.8×10 = 49 000 J — identical.
But power of A = 49 000/20 = 2450 W; power of B = 49 000/5 = 9800 W — four times more.
Same work, different power. What is power measuring that work is not?"

**Bridge [P30]:**
"Power is the rate of work, not work itself. Energy/work is the 'amount'; power is the 'speed
of delivery.' A light bulb and a kettle may use the same total energy in a day, but the kettle
draws far more power in the short time it runs — it delivers energy faster."

**Replacement [P31]:**
"P = W/t. Power is work per unit time. Same work in less time = more power.
A machine with high power can do a job faster — it doesn't necessarily do more work."

**Discrimination pairs [P33]:**
- Crane A (2450 W, 20 s, 49 kJ) vs Crane B (9800 W, 5 s, 49 kJ): same work, ×4 power ✓
- Dim bulb (40 W, 10 hours = 1.44 MJ) vs kettle (2000 W, 3 min = 360 kJ): lower power, more total energy ✓

**s6_path:** Skip the crane conflict; use only the light-bulb-vs-torch analogy:
"A torch and a floodlight both use batteries — which runs out faster?"

---

### MC-POWER-CONSTANT-V (Priority 2)
**Label:** "P = Fv requires the object to be accelerating — it doesn't apply at constant speed"

**Trigger signals:**
- Hesitates to use P = Fv for a car at constant velocity
- Says "P = Fv only works when the car is speeding up"
- Claims power is zero when velocity is constant because acceleration = 0

**Conflict evidence [P28]:**
"A car cruises at constant 30 m/s on a flat road. The engine exerts 4000 N to overcome air
resistance and friction. Using P = W/t: in 1 second the engine moves the car 30 m,
doing W = 4000 × 30 = 120 000 J. P = 120 000/1 = 120 kW.
Using P = Fv = 4000 × 30 = 120 000 W = 120 kW. Both give the same answer at constant speed.
When is P = Fv wrong to use?"

**Bridge [P30]:**
"P = Fv = (F)(v) is the instantaneous power at any instant — it doesn't require acceleration.
At constant velocity on a flat road, the engine still exerts force to maintain speed against
friction. That force times speed is the power delivered. Zero acceleration does not mean
zero force, and it certainly doesn't mean zero power."

**Replacement [P31]:**
"P = Fv holds at any instant regardless of whether the object accelerates.
It equals the rate at which the force does work on the object.
At constant velocity: F ≠ 0 (balances resistance), so P = Fv ≠ 0."

**Discrimination pairs [P33]:**
- Constant speed 20 m/s, 5000 N engine force: P = 100 kW (not zero) ✓
- Acceleration phase vs cruise phase at same speed: same P = Fv if same F and v ✓

**s6_path:** Only use P = W/t form; verify P = Fv matches it; then state: "Both work — choose the
easier one." Avoid discussing acceleration vs. constant speed if it causes confusion.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to rate of doing work.
P04: "Two people carry the same heavy bag up 3 floors. One takes 1 minute, the other takes 5.
Same work was done. Are they equally 'powerful'? What's different?"
P06 (hands-on anchor): "Imagine lifting a book slowly vs snapping it up fast. Same work —
but one feels different. The fast lift has higher power."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Side-by-side bar chart:

```
Crane A (20 s)    Crane B (5 s)
Work:  49 kJ  =   49 kJ    ← same
Time:  20 s   >    5 s     ← B is faster
Power: 2450 W <  9800 W    ← B is more powerful
```

P08 (notation): Introduce P = W/t and P = Fv. Units: W = J/s = watt.
Also 1 kW = 1000 W; 1 horsepower ≈ 746 W (mention for real-world context).
Walk through Worked Example 1 and 2.

P05: "Engine ratings are given in kilowatts or horsepower because cars are sold on how
fast they can deliver energy — not how much total energy they contain."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (Work prerequisite).
P34: "10 N, 6 m, horizontal. Work done?"
If gap → repair W = Fd before continuing.

P10 (example): "A motor lifts a 20 kg load 5 m in 8 s. Find the average power."
P13 (think-aloud): "Step 1: W = mgh = 20×9.8×5 = 980 J. Step 2: P = W/t = 980/8 = 122.5 W."

---

### TA-4 — MC-POWER-IS-ENERGY Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Two cranes, each lifts 500 kg up 10 m. Crane A takes 20 s, Crane B takes 5 s.
Which crane did more work? Which crane is more powerful?"

Listen: if student says "B did more work" → MC-POWER-IS-ENERGY confirmed.

P28 → P30 → P31 (full Misconception Engine MC-POWER-IS-ENERGY sequence).

P33 (discrimination pair): Compute W and P for both cranes.
P36: "A 100 W bulb and a 2000 W kettle both run for one hour. Which uses more energy?
Can you express the answer in joules?" (Bulb: 360 kJ; Kettle: 7200 kJ. Power ≠ energy.)

---

### TA-5 — MC-POWER-CONSTANT-V Probe + P = Fv Practice [Protocol B]
**Primitives:** P14, P28, P30, P31, P33

P14: "A car moves at constant 25 m/s. Engine force = 3500 N. Is the engine doing work?
What power is the engine delivering?"

Listen: if student says "no work — no acceleration" → MC-POWER-CONSTANT-V confirmed.

P28 → P30 → P31 (full Misconception Engine MC-POWER-CONSTANT-V sequence).

P33 (discrimination): Compute via P = W/t for 1-second interval; then via P = Fv.
Both give 3500 × 25 = 87 500 W. "Same answer — two ways to reach it."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic:** A pump does 36 000 J of work in 3 min. Average power? [Answer: 200 W]
2. **P = Fv:** A cyclist pedals with 150 N force at 8 m/s. Power? [Answer: 1200 W]
3. **Find time:** A 500 W motor must do 15 000 J. Time? [Answer: 30 s]
4. **Mass/height:** A 70 kg person climbs stairs rising 5 m in 10 s. Power? [Answer: 343 W]
5. **Conceptual:** A car engine rated at 80 kW moves at 40 m/s. What driving force does it exert
   (assume constant speed)? [Answer: F = P/v = 80 000/40 = 2000 N]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: P = W/t and P = Fv. Power is the rate of doing work — same work in less time
means more power. Unit: watt (W) = J/s."

P62: "Next session: 'A 600 W motor lifts a 30 kg box. How high does it lift the box in 10 s?'"

P85: "You correctly identified that the cranes did equal work — that's the key distinction
that separates power from energy. That insight will matter in every engine problem you face."

P89: Log MC flags (POWER-IS-ENERGY, POWER-CONSTANT-V); log problem-set scores.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic P = W/t):**
"A pump does 45 000 J of work in 1.5 min. What is its average power?"
Expected: P = 45 000 / 90 = 500 W.
_Discriminates: correct unit conversion (min → s) and P = W/t._

**MP-2 (Apply — P = Fv):**
"A car engine exerts 2500 N at a constant speed of 30 m/s. What power does it deliver?"
Expected: P = 2500 × 30 = 75 000 W = 75 kW.
_Discriminates: P = Fv at constant speed; MC-POWER-CONSTANT-V resolution._

**MP-3 (Apply — find time):**
"A 750 W motor must lift a 60 kg load 4 m. How long does this take? (g = 9.8)"
Expected: W = 60×9.8×4 = 2352 J; t = 2352/750 = 3.14 s.
_Discriminates: multi-step: W first, then t = W/P._

**MP-4 (Understand — work vs power):**
"Crane A (3000 W) lifts a load in 30 s. Crane B (1500 W) lifts the same load in 60 s.
Which crane did more work?"
Expected: Equal. W_A = 3000×30 = 90 000 J = W_B = 1500×60 = 90 000 J.
_Discriminates: MC-POWER-IS-ENERGY resolution._

**MP-5 (Apply — find force from power):**
"A speedboat engine delivers 120 kW at a speed of 15 m/s. What is the driving force?"
Expected: F = P/v = 120 000/15 = 8000 N.
_Discriminates: algebraic rearrangement of P = Fv._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Complete: P = ___ (two formulas). Units of power?"
Threshold: Both P = W/t and P = Fv; unit = watt (W) or J/s.
If not → re-deliver P08 before TA-3.

**FA-2 (TA-4 exit):** "Two workers each lift 100 kg by 3 m. Worker A takes 6 s, Worker B 12 s.
Who did more work? Who is more powerful?"
Expected: Same work (2940 J each); A is more powerful (490 W vs 245 W).
If student says A did more work → MC-POWER-IS-ENERGY not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "A car at constant 20 m/s, engine force 4000 N. Power = ?"
Expected: 80 000 W = 80 kW. If student writes 0 → MC-POWER-CONSTANT-V not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.
Otherwise → targeted re-teach of failed probe type.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Begin with P = W/t only; defer P = Fv to TA-5.
- Reassure: "Power is just work divided by time — that's all."
- Problem set: use only P = W/t problems in TA-6 for first pass; introduce P = Fv problems
  only after 3 correct P = W/t answers.
- Simplify units: use g = 10 to reduce arithmetic burden.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-4 (same-work trap) at TA-3 before guided practice.
- Challenge: "Engine rated at 100 kW at maximum speed 50 m/s — what force? At 25 m/s with
  same power rating, what force?" (Force doubles at half speed.)
- Speed through P = W/t into P = Fv quickly; spend TA-6 on the inverse: finding F from P and v.

**S4 (Prereq gap — Work):**
- Detect via PD-1 failure at TA-3.
- Repair: mini-session on W = Fd cosθ; W = mgh; then return.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → P = W/t → MC-POWER-IS-ENERGY repair).
**Session 2 (≥24 h later):** Retrieval cold-start: "Power formula? If time halves, what happens
  to power for same work?" → TA-5 (MC-POWER-CONSTANT-V, P = Fv) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe mixing Work, KE, and Power:
  "A 1000 kg car accelerates from rest to 20 m/s in 5 s. What average power does the engine deliver?"
  (KE gained = ½×1000×400 = 200 000 J; P = 200 000/5 = 40 000 W — previews Work–Energy Theorem.)
**Pre-work-energy-theorem session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.work (W = Fd cosθ), phys.mech.kinetic-energy (KE = ½mv²).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.power ✓
V-2   prerequisites listed and exist in KG: phys.mech.work ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 3h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: two-workers anchor ✓
V-8   ≥2 misconceptions engineered: MC-POWER-IS-ENERGY, MC-POWER-CONSTANT-V ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: two-workers bag-carry scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-POWER-IS-ENERGY ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: work, kinetic-energy ✓
V-19  cross_links match KG edges: kinetic-energy, conservation-of-energy ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
