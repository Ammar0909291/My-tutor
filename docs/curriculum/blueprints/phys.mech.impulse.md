# Teaching Blueprint — phys.mech.impulse

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.impulse
name:               Impulse
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    3
prerequisites:      [phys.mech.momentum]
cross_links:        [phys.mech.conservation-of-momentum, phys.mech.collisions,
                     phys.mech.newtons-second-law]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (catching a ball with stiff arms vs bending elbows —
                       same Δp, but which hurts more? before J = FΔt = Δp;
                       difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Impulse is the product of force and the time over which it acts. It equals the
change in momentum. The Impulse–Momentum Theorem (J = FΔt = Δp) explains why extending contact
time reduces force for the same change in momentum — the foundation of airbags, crash helmets,
and sports technique.

**Formal Definitions:**
J = FΔt            (impulse, when F is constant)
J = Δp = p_f − p_i = mv_f − mv_i    (Impulse–Momentum Theorem)

Units: N·s = kg·m/s (same as momentum — no coincidence).

For a variable force: J = area under the F-t graph.

**Key properties:**
- Impulse is a vector: direction = direction of force (= direction of Δp).
- Same Δp can be achieved by large F over short time, or small F over long time.
- The "long contact time" strategy: airbags, crumple zones, bending knees on landing.
- Newton's 2nd Law in impulse form: F_avg = Δp/Δt.

**Worked Example 1 (Basic impulse):**
A 0.5 kg ball moving at 4 m/s east bounces off a wall at 4 m/s west.
Δp = m(v_f − v_i) = 0.5 × (−4 − 4) = −4 kg·m/s (westward).
J = −4 N·s. If contact time = 0.02 s: F_avg = Δp/Δt = −4/0.02 = −200 N (westward).

**Worked Example 2 (Extending contact time):**
A 70 kg skydiver hits the ground at 10 m/s and comes to rest.
Δp = 70 × (0 − 10) = −700 kg·m/s.
If contact time = 0.05 s (stiff landing): F_avg = 700/0.05 = 14 000 N.
If contact time = 0.5 s (knees bent): F_avg = 700/0.5 = 1 400 N — 10× lower force.

**Worked Example 3 (Find v_f from impulse):**
A 3 kg object at rest receives impulse J = 24 N·s eastward.
Δp = 24 kg·m/s = m × v_f → v_f = 24/3 = 8 m/s east.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.momentum  ──────────────────►  phys.mech.impulse
   (p = mv; Δp = m Δv; direction convention)
   REQUIRED: student can compute momentum and momentum change with signs
```

**PD-1 (Momentum prerequisite):**
"A 2 kg ball moves east at 6 m/s and slows to 2 m/s east. Compute Δp."
Expected: Δp = 2×(2−6) = −8 kg·m/s (impulse was westward — opposing motion).

If student cannot compute Δp with signs → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-IMPULSE-IS-FORCE (Priority 1)
**Label:** "Impulse is just another word for force — bigger force always means bigger impulse"

**Trigger signals:**
- Equates impulse with force magnitude
- Says "the wall exerts more impulse than the hand because walls are harder"
- Ignores time when comparing impulses

**Conflict evidence [P28]:**
"Scenario A: A force of 1000 N acts for 0.001 s. Impulse = 1000 × 0.001 = 1 N·s.
Scenario B: A force of 10 N acts for 1 s. Impulse = 10 × 1 = 10 N·s.
Scenario B's impulse is 10× larger despite the force being 100× smaller. Can impulse equal force?"

**Bridge [P30]:**
"Impulse = force × time. A brief but large force can have a smaller impulse than a gentle but
sustained force. Think of a dripping tap vs a single punch — the tap delivers far more total water
(impulse-analogy) over time, even though each drop is tiny."

**Replacement [P31]:**
"J = FΔt. Both force AND duration matter. To compare impulses you must know both.
A powerful but brief hit can give less impulse than a gentle sustained push."

**Discrimination pairs [P33]:**
- 500 N for 0.002 s: J = 1 N·s vs 5 N for 0.5 s: J = 2.5 N·s (gentle wins) ✓
- Same ball, same Δp, different contact times: more time → less force ✓

**s6_path:** Skip the force-comparison; use only the airbag analogy: "same Δp, longer time,
smaller force — that's why airbags save lives." Start with Worked Example 2.

---

### MC-DELTAP-DIRECTION (Priority 2)
**Label:** "Δp (and impulse) is always positive — it can't point 'backwards'"

**Trigger signals:**
- Assigns positive impulse to a ball bouncing back from a wall (reverses direction)
- Writes |p_f| − |p_i| instead of p_f − p_i (takes magnitudes before subtracting)
- Confused when the impulse direction is opposite to the initial motion direction

**Conflict evidence [P28]:**
"A 0.2 kg ball moves east at 5 m/s and bounces west at 5 m/s.
You wrote Δp = |−1| − |+1| = 0. But the ball clearly changed its motion dramatically!
Let's use signs: Δp = m(v_f − v_i) = 0.2×(−5 − 5) = 0.2×(−10) = −2 kg·m/s.
The impulse was 2 N·s westward — that's what the wall exerted. Is zero correct?"

**Bridge [P30]:**
"Δp = p_f − p_i must be computed with signs (vectors), never magnitudes. A ball bouncing
reverses velocity: v_f is opposite to v_i in sign. The wall's force is westward, so the impulse
is westward (negative), and Δp is negative (westward). That's physically correct."

**Replacement [P31]:**
"Always assign: one direction = positive. Compute v_f and v_i as signed numbers.
Δp = m × (v_f − v_i). Subtract after assigning signs — never subtract magnitudes first."

**Discrimination pairs [P33]:**
- Ball bouncing: Δp = m(−v − v) = −2mv (not zero) ✓
- Ball slowing from +6 to +2: Δp = m(2−6) = −4m (negative, opposing motion) ✓

**s6_path:** Use east-only bouncing analogy: "ball hits wall and reverses — velocity goes from
+5 to −5. Show the number line."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to force-time interaction.
P04: "You catch a fast ball — do you prefer to catch with stiff arms or soft arms? Why?
The ball's momentum changes by the same amount either way. What's different?"
P06 (hands-on anchor): "Imagine stopping a moving trolley with a very brief sharp shove
vs a long gentle push. Same final speed change (Δp the same) — but the forces are very different.
That ratio of Δp to time is what we study today."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): F-t graph showing two rectangles with equal areas = same impulse:

```
F (N) ↑
      |  █████  ← 500 N for 0.002 s = 1 N·s
      |
      |  █                           ← 5 N for 0.2 s = 1 N·s (same area!)
      |  █
      |  █
      +──────────────────────────── t (s)
```
Area under F-t graph = impulse = Δp.

P08 (notation): J = FΔt = Δp = mv_f − mv_i. Units: N·s = kg·m/s.
Walk through Worked Examples 1 and 2. Emphasise: J = Δp is the theorem.

P05: "Every safety device exploits this theorem: airbags, helmets, crumple zones, shock absorbers
— all increase Δt so F decreases for the same Δp. This is physics saving lives."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (Momentum Δp check).
P34: "2 kg, east 6 m/s → east 2 m/s. Δp?" Expected: −8 kg·m/s.
Gap → repair p = mv and vector signs before continuing.

P10: "A 0.4 kg ball at rest is struck and reaches 10 m/s east in 0.05 s.
Find: (a) impulse, (b) Δp, (c) average force."
P13: "(a) Δp = 0.4×10 = 4 kg·m/s = J. (b) Same = 4 N·s. (c) F = 4/0.05 = 80 N east."

---

### TA-4 — MC-IMPULSE-IS-FORCE Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Force A = 2000 N for 0.001 s. Force B = 20 N for 1 s.
Before computing: which do you think has the bigger impulse?"

Listen: if student says "A — it's a much larger force" → MC-IMPULSE-IS-FORCE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-IMPULSE-IS-FORCE sequence).

P33: J_A = 2 N·s; J_B = 20 N·s. B wins despite 100× smaller force.

P36: "Name a real-world technology designed specifically to increase Δt and reduce peak force.
Explain how it exploits J = FΔt = Δp."
[Airbag, crumple zone, foam padding, bending knees — any valid answer.]

---

### TA-5 — MC-DELTAP-DIRECTION Probe + Bouncing Ball Work [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A 0.3 kg ball moves east at 5 m/s. It bounces off a wall and moves west at 5 m/s.
Compute Δp."

Listen: if student writes 0 or +3 (took magnitudes) → MC-DELTAP-DIRECTION confirmed.

P28 → P30 → P31 (full Misconception Engine MC-DELTAP-DIRECTION sequence).
Expected: Δp = 0.3×(−5−5) = −3 kg·m/s (westward). "The wall exerted 3 N·s westward on the ball."

P10: "Same ball bounces elastically (same speed). Contact time = 0.015 s. Average force from wall?"
[Answer: F = |Δp|/Δt = 3/0.015 = 200 N westward.]

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Basic:** A 0.5 kg ball at rest is kicked; receives 15 N·s impulse east. Final speed?
   [Answer: v = J/m = 15/0.5 = 30 m/s east]
2. **Find Δt:** A 60 kg gymnast lands at 8 m/s and stops. Allowable peak force = 2400 N. Min Δt?
   [Answer: Δt = Δp/F = 480/2400 = 0.2 s]
3. **Bouncing:** 0.2 kg ball east at 8 m/s bounces west at 6 m/s. Δp? If Δt = 0.02 s, F?
   [Answer: Δp = 0.2×(−6−8) = −2.8 N·s; F = 2.8/0.02 = 140 N west]
4. **F-t graph:** Rectangular impulse: 300 N for 0.05 s. Δp? If m = 2 kg, v_i = 3 m/s east: v_f?
   [Answer: J = 15 N·s; v_f = 3 + 15/2 = 10.5 m/s]
5. **Design:** A 1000 kg car hits a wall at 20 m/s and stops. Without a crumple zone: Δt = 0.05 s.
   With zone: Δt = 0.5 s. Compare peak forces. By what factor is force reduced?
   [Answer: No zone: F = 1000×20/0.05 = 400 000 N; With zone: 40 000 N. Factor: 10×]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: J = FΔt = Δp. Impulse is force × time = change in momentum. Direction matters.
F-t graph area = impulse. Extending Δt reduces peak force for same Δp."

P62: "Next session: 'A 0.6 kg ball bounces off a wall: east at 10 m/s → west at 8 m/s.
Find Δp, impulse, and average force if contact time is 0.04 s.'"

P85: "You correctly used signed velocities to compute Δp — that's the step most students get wrong
when objects bounce. That precision will carry through to collision problems."

P89: Log MC flags; record problem accuracy; note bouncing-Δp handling.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — find v_f):**
"A 4 kg object at rest receives an impulse of 32 N·s eastward. Find v_f."
Expected: v_f = J/m = 32/4 = 8 m/s east.
_Discriminates: J = Δp = mv_f (from rest)._

**MP-2 (Apply — find force):**
"A 0.4 kg ball moves east at 6 m/s and is caught (stops). Contact time = 0.08 s.
Average catching force?"
Expected: Δp = 0.4×(0−6) = −2.4 N·s; F = 2.4/0.08 = 30 N westward.
_Discriminates: Δp with direction; F_avg = Δp/Δt._

**MP-3 (Apply — extended contact time):**
"A 2 kg ball hits a wall at 5 m/s east and stops. Contact time A = 0.01 s; Contact time B = 0.1 s.
Compare the force in each case."
Expected: Δp = 10 N·s; F_A = 1000 N; F_B = 100 N. B exerts 10× less force.
_Discriminates: MC-IMPULSE-IS-FORCE resolution; time-force tradeoff._

**MP-4 (Apply — bouncing with direction):**
"A 0.5 kg ball moves east at 8 m/s and bounces west at 4 m/s. Find Δp."
Expected: Δp = 0.5×(−4−8) = −6 kg·m/s (westward). |J| = 6 N·s.
_Discriminates: MC-DELTAP-DIRECTION resolution; magnitudes not subtracted._

**MP-5 (Apply — F-t graph area):**
"An F-t graph shows a triangular impulse: peak force 600 N at t = 0.1 s, rising from zero and
falling back to zero. What is the total impulse?"
Expected: Area = ½ × base × height = ½ × 0.2 × 600 = 60 N·s.
_Discriminates: impulse as area under F-t graph; triangular case._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "J = ? (formula). What is the unit of impulse? What does the area under an F-t graph equal?"
Threshold: J = FΔt = Δp; N·s (or kg·m/s); impulse.

**FA-2 (TA-4 exit):** "Force A = 800 N for 0.002 s; Force B = 8 N for 0.2 s. Which delivers more impulse?"
Expected: J_A = 1.6 N·s < J_B = 1.6 N·s — equal (good discriminator!).
If student says "A because it's bigger" → MC-IMPULSE-IS-FORCE not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "0.4 kg ball, east 5 m/s → west 5 m/s. Δp?"
Expected: 0.4×(−5−5) = −4 kg·m/s. If student writes 0 → MC-DELTAP-DIRECTION not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-4. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only "ball from rest → moving" (no bouncing) in TA-3.
- Introduce bouncing (reversed direction) only in TA-5 after simpler cases are secure.
- Break every problem: "Step 1 — compute Δp. Step 2 — apply J = FΔt."
- Reassure: "Two formulas: J = FΔt and J = Δp. The theorem says they're equal."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (F-t triangle area) at TA-3.
- Challenge: "Design the crumple zone thickness for a 1500 kg car at 90 km/h so peak force ≤ 30 kN."
- Spend TA-6 on the design problem (Problem 5) and triangular/variable force F-t graph.

**S4 (Prereq gap — Momentum):**
- Detect via PD-1 failure at TA-3.
- Repair: mini-session on p = mv and signed Δp before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → J = FΔt = Δp → MC-IMPULSE-IS-FORCE repair).
**Session 2 (≥24 h later):** Retrieval: "State the Impulse-Momentum Theorem. How does it explain airbags?"
  → TA-5 (MC-DELTAP-DIRECTION, bouncing) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining impulse and conservation:
  "Ball A (0.5 kg, 10 m/s east) hits Ball B (0.5 kg, rest). Contact time = 0.05 s.
  If they exert equal and opposite forces (Newton's 3rd), what impulse does each receive?
  What are the final velocities if it's a perfectly elastic collision?"
  (Previews conservation of momentum.)
**Pre-conservation-of-momentum session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.momentum (Δp), phys.mech.newtons-second-law (F = Δp/Δt),
phys.mech.conservation-of-momentum (next concept in chain).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.impulse ✓
V-2   prerequisites listed and exist in KG: phys.mech.momentum ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 3h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: stiff-arms-vs-bent-elbows anchor ✓
V-8   ≥2 misconceptions engineered: MC-IMPULSE-IS-FORCE, MC-DELTAP-DIRECTION ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: catching-a-ball arms scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-IMPULSE-IS-FORCE ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: momentum, newtons-second-law,
      conservation-of-momentum ✓
V-19  cross_links match KG edges: conservation-of-momentum, collisions,
      newtons-second-law ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
