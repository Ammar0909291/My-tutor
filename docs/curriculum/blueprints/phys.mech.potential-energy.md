# Teaching Blueprint — phys.mech.potential-energy

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.potential-energy
name:               Potential Energy
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.work]
cross_links:        [phys.mech.kinetic-energy, phys.mech.conservation-of-energy,
                     phys.mech.hookes-law]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (lifting a book vs holding it in place — does holding require
                       energy? before GPE = mgh; difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Potential energy is stored energy that depends on an object's position or
configuration within a force field. It represents the capacity to do work. The most common
forms are gravitational PE (GPE = mgh) and elastic PE (EPE = ½kx²). PE is defined relative
to a chosen reference point — only changes in PE are physically meaningful.

**Gravitational Potential Energy:**
GPE = mgh

where m is mass (kg), g is gravitational field strength (≈ 9.8 m/s² near Earth's surface),
h is height above the reference level (m). GPE is in joules (J).

**Elastic Potential Energy (preview for Hooke's Law):**
EPE = ½kx²

where k is the spring constant (N/m) and x is the compression or extension from equilibrium (m).

**Key properties:**
- GPE can be positive (above reference), zero (at reference), or negative (below reference).
- Only ΔGPE matters in any physical process — choice of reference cancels out.
- GPE is stored energy: lifting an object does work against gravity, storing that work as GPE.
- When an object falls, GPE converts to KE (Work–Energy Theorem).
- GPE is a scalar quantity.

**Worked Example 1 (Lifting):**
A 3 kg book is lifted 2 m above a table.
GPE = 3 × 9.8 × 2 = 58.8 J.
This equals the work done by the hand against gravity.

**Worked Example 2 (Reference Choice):**
Same book, 2 m above the table, but the table is 1 m above the floor.
Taking floor as reference: GPE = 3 × 9.8 × 3 = 88.2 J.
Taking table as reference: GPE = 3 × 9.8 × 2 = 58.8 J.
ΔGPE from floor to 2 m above table: same in both cases (58.8 J). Reference cancels.

**Worked Example 3 (Spring):**
A spring with k = 200 N/m is compressed 0.05 m.
EPE = ½ × 200 × 0.05² = ½ × 200 × 0.0025 = 0.25 J.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.work  ──────────────────────►  phys.mech.potential-energy
   (W = Fd cosθ; work done against gravity stores as GPE)
   REQUIRED: student understands that lifting requires work against gravity
```

**PD-1 (Work against gravity):**
"A 2 kg object is lifted 3 m straight up at constant velocity. What is the work done
by the lifting force? (Lifting force = mg = 19.6 N upward; displacement = 3 m upward;
W = 19.6 × 3 × cos0° = 58.8 J.)"

If student cannot compute work by the lifting agent → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-GPE-ABSOLUTE (Priority 1)
**Label:** "GPE has a fixed, absolute value — the reference level is not a choice"

**Trigger signals:**
- Claims the book 2 m above a table "has" exactly one GPE value regardless of reference
- Says "you can't change where the reference is — it's always the ground"
- Confused when two students get different GPE values for the same scenario

**Conflict evidence [P28]:**
"Let's calculate GPE for a 1 kg object sitting on a table that is 1 m above the floor,
and the object is 0 m above the table.
Student A uses the floor as reference: GPE = 1×10×1 = 10 J.
Student B uses the table as reference: GPE = 1×10×0 = 0 J.
Both are correct. How can the same object have two different GPEs?"

**Bridge [P30]:**
"GPE = mgh tells you stored energy relative to a chosen zero. Like temperature in Celsius
vs Fahrenheit — the numbers differ, but temperature differences are the same. The physics
only ever uses ΔGPE: how much did PE change? That answer is the same no matter which
reference you pick."

**Replacement [P31]:**
"GPE has no absolute value — it depends on the reference level you choose. The reference
is arbitrary; it must be stated in any problem. Only ΔGPE is physically meaningful — the
work–energy relationship uses ΔGPE, not GPE itself."

**Discrimination pairs [P33]:**
- Same 2 kg object, different reference levels → different GPE, same ΔGPE ✓
- Pendulum at lowest point = reference: GPE = 0 there, positive at top → valid choice ✓

**s6_path:** Skip P28; use the floor/table comparison as a simple arithmetic demonstration
("just arithmetic — we compute with both and compare the difference").

---

### MC-HEIGHT-VERTICAL-ONLY (Priority 2)
**Label:** "h in GPE = mgh means the length of the path, not the vertical rise"

**Trigger signals:**
- Uses the incline length (hypotenuse) as h when computing GPE for a block on a slope
- Says "it was pushed 5 m up the ramp so h = 5 m"
- Computes GPE = mg × (path length along ramp)

**Conflict evidence [P28]:**
"A block slides 5 m up a 30° ramp. You wrote GPE = mg × 5.
Let's check: the block only rose vertically by 5 × sin30° = 2.5 m.
Gravity acts vertically. If we lift the same block straight up 2.5 m, GPE = mg × 2.5.
Both should give the same energy stored — which formula is right?"

**Bridge [P30]:**
"Gravity is a vertical force. Work done against gravity = F × vertical displacement = mgh,
where h is the vertical rise only. The path taken — straight up, along a ramp, curved —
does not matter; only the net vertical change in height matters."

**Replacement [P31]:**
"In GPE = mgh, h is always the vertical height gained (or lost), not the path length.
On an incline of angle θ and length L: h = L sinθ. This is why ramps make lifting easier —
you push over a longer distance but the vertical rise (and GPE gain) is the same."

**Discrimination pairs [P33]:**
- 5 m ramp at 30° vs lifted 2.5 m straight: same GPE gain ✓
- 10 m ramp at 30° vs 5 m ramp at 60°: same h = 5 m, same GPE for same mass ✓

**s6_path:** Use a diagram showing vertical rise explicitly; avoid ramp calculation on first
attempt if anxiety is detected; build to it after the vertical-rise concept is secure.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to stored energy.
P04: "You lift a heavy book onto a high shelf. You feel tired — you did work. Later the book
falls off and crashes loudly. Where did that 'crash energy' come from? Was it hiding somewhere?"
P06 (hands-on anchor): "Hold a book high vs low. Imagine releasing it. The higher one hits
harder. Why? It had more of something stored. We call that Gravitational Potential Energy."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Diagram showing a ball at different heights, with GPE bar growing linearly with h.

```
Height (m):    0    1    2    3    4
GPE (1kg,g=10): 0   10   20   30   40  J
                |    |    |    |    |
                █   ██   ███  ████ █████
```

P08 (notation): Introduce GPE = mgh. Identify: m in kg, g ≈ 9.8 m/s² (use 10 for estimates),
h = vertical height above reference in m, GPE in joules. Walk through Worked Example 1.

P05: "Every time you climb stairs or lift an object, your muscles store energy as GPE. When
you drop the object, that stored energy converts back into motion (KE) — nothing is lost."

---

### TA-3 — Prerequisite Check + Reference Level [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (Work prerequisite — lifting at constant velocity).
P34: "What work does the hand do lifting a 2 kg object 3 m? Take a moment."
If gap → repair work concept (W = Fd = mgh for vertical lift).

P10 (example): "A 5 kg rock is 4 m above a river. Taking river as reference:
GPE = 5 × 9.8 × 4 = 196 J. Now someone takes the same rock 4 m above a bridge
that is 3 m above the river. How do we find GPE? And what is ΔGPE from river surface to
the rock?"
P13 (think-aloud): "We need to be explicit: state the reference level first, then compute.
ΔGPE = mg × (vertical rise). From river to 7 m above river: ΔGPE = 5×9.8×7 = 343 J."

---

### TA-4 — MC-GPE-ABSOLUTE Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 2 kg book sits 3 m above the floor. The floor is 2 m above the ground outside.
Student A takes the ground as reference; Student B takes the floor as reference.
Before computing: do you think they will get the same GPE?"

Listen: if student says "yes, it's a fixed amount" → MC-GPE-ABSOLUTE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-GPE-ABSOLUTE sequence).

P33 (discrimination pair): "Compute GPE using each reference. Do you get the same ΔGPE
if the book is later placed on the floor?" (ΔGPE = 3 × 2 × 9.8 = 58.8 J — same either way.)

P36 (open probe): "Why do physicists say 'the book has X joules of GPE relative to the floor'
rather than just 'the book has X joules of GPE'?"

---

### TA-5 — MC-HEIGHT-VERTICAL-ONLY Probe + Elastic PE Intro [Protocol B + A]
**Primitives:** P14, P28, P30, P31, P33, P07, P08

P14: "A 4 kg block is pushed 6 m up a 30° ramp. What height did it gain? What GPE did it gain?"
Listen: if student writes GPE = mg × 6 → MC-HEIGHT-VERTICAL-ONLY confirmed.

P28 → P30 → P31 (full Misconception Engine MC-HEIGHT-VERTICAL-ONLY sequence).
P33: ramp vs direct lift comparison.

P07 (visual — elastic PE preview): Draw spring extended with x labeled; state EPE = ½kx².
P08: "A spring with k = 500 N/m is stretched 0.04 m: EPE = ½ × 500 × 0.0016 = 0.4 J.
Note the x² — same quadratic relationship as KE = ½mv². Elastic PE will be the focus
when we reach Hooke's Law."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic:** A 6 kg box is lifted 5 m. GPE gained? (g = 9.8) [Answer: 294 J]
2. **Reference:** 1 kg ball, 4 m above table, table 2 m above floor. GPE taking floor as ref?
   [Answer: 1×9.8×6 = 58.8 J. Taking table: 1×9.8×4 = 39.2 J. ΔGPE from table to ball: 39.2 J — same.]
3. **Incline:** 3 kg block slides up a 45° ramp for 8 m. Vertical height gained? GPE gained?
   [h = 8 sin45° = 5.66 m; GPE = 3×9.8×5.66 = 166 J]
4. **Spring:** k = 400 N/m, x = 0.1 m. EPE? [Answer: ½×400×0.01 = 2 J]
5. **Conceptual:** A pendulum swings from bottom (lowest point) to top (0.3 m rise, mass 0.5 kg).
   GPE gained? What provides this energy? [Answer: 0.5×9.8×0.3 = 1.47 J; KE of the swinging bob]

P51, P52, P55, P54 (same protocol as kinetic-energy TA-6).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: GPE = mgh where h is vertical rise only; reference level is arbitrary; only ΔGPE
matters. EPE = ½kx² — stored in compressed/stretched springs."

P62: "Next session, I'll ask: 'A 2 kg ball is 5 m above the ground. What is its GPE above
the ground? If it falls to 3 m, what is ΔGPE?'"

P85: "You caught the ramp-vs-height distinction — that's a classic error that trips students
in more complex problems. Well done."

P89: Log MC flags (GPE-ABSOLUTE, HEIGHT-VERTICAL-ONLY); log problem-set performance.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic GPE):**
"A 5 kg ball is held 3 m above the floor. What is its GPE above the floor? (g = 9.8)"
Expected: GPE = 5 × 9.8 × 3 = 147 J.
_Discriminates: correct substitution into mgh._

**MP-2 (Apply — reference choice):**
"The same 5 kg ball is 3 m above a table that is 1 m above the floor. What is its
GPE above the table? What is ΔGPE from floor level to ball's height?"
Expected: GPE above table = 147 J; ΔGPE from floor = 5×9.8×4 = 196 J.
_Discriminates: MC-GPE-ABSOLUTE resolution; ΔGPE understood._

**MP-3 (Apply — incline height):**
"A 2 kg block moves 10 m up a 30° ramp. What vertical height did it gain? What GPE did it gain?"
Expected: h = 10 sin30° = 5 m; GPE = 2×9.8×5 = 98 J.
_Discriminates: MC-HEIGHT-VERTICAL-ONLY resolution._

**MP-4 (Apply — spring):**
"A spring (k = 800 N/m) is compressed 0.05 m. What is the elastic PE stored?"
Expected: EPE = ½ × 800 × 0.0025 = 1 J.
_Discriminates: EPE formula ½kx²._

**MP-5 (Analyze — energy transformation):**
"A 1 kg ball has GPE = 40 J at its highest point and KE = 0.
At a lower point, it has KE = 25 J. What is its GPE at that lower point?
(Assume no energy loss to friction.)"
Expected: GPE = 40 − 25 = 15 J.
_Discriminates: preview of conservation of energy; treats GPE and KE as interconvertible._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Complete: GPE = ___. What does h represent?"
Threshold: Must write GPE = mgh and state h = vertical height above reference.
If not → re-deliver P08 before TA-3.

**FA-2 (TA-4 exit):** "A 3 kg box is 4 m above the table. Table is 2 m above the floor.
What is GPE above the table? Above the floor?"
Expected: 117.6 J; 176.4 J. ΔGPE from table to box: 117.6 J (same).
If student claims only one valid answer → MC-GPE-ABSOLUTE not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "4 kg block, 5 m up a 60° ramp. Vertical rise?"
Expected: h = 5 sin60° = 4.33 m. If student writes h = 5 → MC-HEIGHT-VERTICAL-ONLY not resolved.

**FA-4 (Session exit):** Administer MP-1 through MP-3. 3/3 correct → advance to TA-7.
Otherwise → targeted re-teach of failed probe type.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use the book-on-shelf P06 anchor only; defer ramp problems to TA-5.
- Reassure: "GPE = mgh is three multiplications. You can do this."
- Break MP-3 into two steps: "First find h using h = L sinθ. Then compute GPE."
- No EPE in TA-4 if S6 is flagged; defer spring content to a separate mini-session.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (energy transformation) at TA-3 — most students at this stage have not seen this.
- Challenge: "Why does the reference level not matter physically? Prove it with numbers."
- Advance quickly through GPE; spend extra time on EPE and the reference-independence proof.

**S4 (Prereq gap — Work):**
- Detect via PD-1 failure at TA-3.
- Repair: mini-session on W = Fd, W = mgh for vertical lift, before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → GPE formula → reference level).
**Session 2 (≥24 h later):** Retrieval: "GPE formula? What does h mean? Ramp example."
  → TA-5 (MC-HEIGHT-VERTICAL-ONLY) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe mixing KE and GPE:
  "A 2 kg ball at rest 10 m high: what is GPE? It falls. At 5 m height, what is KE?"
  (Tests KE = ½mv², GPE = mgh, and their complementarity — previewing conservation of energy.)
**Pre-conservation-of-energy session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.kinetic-energy (KE = ½mv²) and phys.mech.work (W = Fd cosθ)
— the three concepts form the core energy triangle before conservation of energy.

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.potential-energy ✓
V-2   prerequisites listed and exist in KG: phys.mech.work ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: book-lift anchor ✓
V-8   ≥2 misconceptions engineered: MC-GPE-ABSOLUTE, MC-HEIGHT-VERTICAL-ONLY ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: book-on-shelf/drop scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-GPE-ABSOLUTE ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: kinetic-energy, work ✓
V-19  cross_links match KG edges: kinetic-energy, conservation-of-energy, hookes-law ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
