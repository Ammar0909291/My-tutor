# Teaching Blueprint — phys.mech.kinetic-energy

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.kinetic-energy
name:               Kinetic Energy
domain:             Classical Mechanics (Physics)
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.work]
cross_links:        [phys.mech.work-energy-theorem, phys.mech.conservation-of-energy,
                     phys.mech.momentum]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (rolling ball on table slows and stops — where did the "go"
                       go? before KE = ½mv²; difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Kinetic energy is the energy an object possesses because it is moving; it
equals ½mv², so a small increase in speed produces a large increase in KE (quadratic
relationship). KE is always non-negative, and it can be transferred to or from objects through
Work.

**Formal Definition:**
KE = ½mv²

where m is the object's mass (kg) and v is its speed (m/s). KE has units of joules (J = kg·m²/s²).

**Why the ½:**
Derived from the Work–Energy relationship: integrate F = ma over displacement ds using
v dv = a ds → W = m∫v dv = ½mv² − ½mv₀². The ½ is not an approximation; it is exact.

**Key properties:**
- KE is a scalar (always ≥ 0; direction of motion does not matter).
- KE depends on speed squared — doubling speed quadruples KE; tripling speed gives 9× KE.
- KE is additive: a system's total KE is the sum of each object's KE.
- KE and momentum p = mv are related: KE = p²/(2m).
- KE changes when net work is done on the object (Work–Energy Theorem: W_net = ΔKE).

**Worked Example 1 (Concrete):**
A 2 kg ball rolls at 3 m/s.
KE = ½ × 2 × 3² = ½ × 2 × 9 = 9 J.

**Worked Example 2 (Speed Doubled):**
Same ball now rolls at 6 m/s.
KE = ½ × 2 × 6² = 36 J → 4× the KE for 2× the speed.

**Worked Example 3 (Find speed from KE):**
A 5 kg cart has KE = 40 J. Find v.
40 = ½ × 5 × v² → v² = 16 → v = 4 m/s.

**Conceptual anchor — rolling ball on table:**
A ball rolls across a table and gradually slows down. Its KE is being transferred to thermal
energy (friction with table and air). KE isn't "lost" — it transforms.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.work  ──────────────────────►  phys.mech.kinetic-energy
   (W = Fd cosθ, sign of work)
   REQUIRED: student can compute work done by a force and interpret sign
```

**PD-1 (Work):**
"A 10 N force pulls a 3 kg box 5 m along the floor (μ_k = 0.2).
Friction force = μ_k × N = μ_k × mg = 0.2 × 3 × 10 = 6 N.
W_applied = 10 × 5 × cos0° = 50 J. W_friction = 6 × 5 × cos180° = −30 J.
W_net = 20 J."

If student cannot compute net work including signs → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-KE-LINEAR (Priority 1)
**Label:** "KE is proportional to speed, not speed squared"

**Trigger signals:**
- Says "double speed → double KE"
- Computes KE = mv instead of ½mv²
- Surprised that a car at 100 km/h needs 4× the braking distance of one at 50 km/h

**Conflict evidence [P28]:**
"You said doubling speed doubles KE. Let's check:
Ball at 2 m/s: KE = ½ × 1 × 2² = 2 J.
Ball at 4 m/s: KE = ½ × 1 × 4² = 8 J.
8 is not twice 2 — it is four times 2. What does that tell us about the relationship?"

**Bridge [P30]:**
"The formula has v², not v. Squaring means if v grows by a factor k, KE grows by k².
That's why high-speed crashes are so much more destructive than low-speed ones —
the energy difference is enormous."

**Replacement [P31]:**
"KE = ½mv². Speed appears squared. Doubling speed → (2v)² = 4v² → KE quadruples.
Tripling speed → KE increases 9×. The relationship is quadratic, not linear."

**Discrimination pairs [P33]:**
- Ball at 3 m/s vs 6 m/s, mass 2 kg: KE = 9 J vs 36 J (4×, not 2×) ✓
- Car braking distance: v doubles → distance quadruples (same v² relationship) ✓

**s6_path:** Skip P28; use the rolling-ball scene: "Watch what happens to the ball's
motion as it hits the slope at different speeds — notice anything surprising?"

---

### MC-KE-NEGATIVE (Priority 2)
**Label:** "KE can be negative (e.g., when object moves backward)"

**Trigger signals:**
- Assigns negative KE to objects moving in the negative direction
- Confuses velocity (signed) with speed (unsigned) in KE formula
- States "the ball has −4 J of KE going left"

**Conflict evidence [P28]:**
"You said KE is negative when the object moves left. Let's plug in:
Ball moves at v = −3 m/s (leftward). KE = ½ × 1 × (−3)² = ½ × 9 = 4.5 J.
The square of −3 is +9. KE comes out positive. What does squaring do to a negative number?"

**Bridge [P30]:**
"Velocity has direction; speed does not. KE uses speed — or equivalently v² — so
squaring removes the sign. KE is a measure of how much energy of motion exists,
not which way. Energy doesn't have direction; work and displacement do."

**Replacement [P31]:**
"KE = ½mv² is always ≥ 0 because v² ≥ 0 for any real v, and m > 0.
Only ΔKE (change in KE) can be negative — that means the object slowed down.
Negative KE itself is physically meaningless."

**Discrimination pairs [P33]:**
- v = +5 m/s vs v = −5 m/s, same mass: KE identical (both 12.5 J for m=1 kg) ✓
- ΔKE = −10 J: object slowed (KE decreased), NOT KE is negative ✓

**s6_path:** Use only the positive-number arithmetic: "v = −3, v² = 9, ½×1×9 = 4.5 J —
let's just check the arithmetic step together."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to energy of motion.
P04: "Think about a slow-rolling marble vs a fast one hitting a stack of blocks.
Which knocks over more blocks? Why might that be?"
P06 (hands-on anchor): "A ball is rolling across a table. It slows and stops.
Where did its 'go' go? It had something — what was it? We call that Kinetic Energy."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Draw a number line of KE values.

```
SPEED    0 m/s ── 1 m/s ── 2 m/s ── 3 m/s ── 4 m/s
KE(1kg)   0 J  ── 0.5J ── 2 J  ── 4.5 J ── 8 J
                   × 4   × 4   × ...
Ratio vs prev:     ─      ×4    ×(4.5/2)=2.25  ×(8/4.5)≈1.78  → not constant
vs v=0:    ─      ×─    ×4     ×9      ×16    → exact squares
```

P08 (notation): Introduce KE = ½mv². Label: ½ = exact (from calculus derivation),
m in kg, v in m/s, KE in J. Walk through Worked Example 1 (2 kg ball at 3 m/s = 9 J).

P05: "The v² is what makes kinetic energy so dangerous at high speeds — a car at
100 km/h has 4× the KE of one at 50 km/h, so it needs 4× the braking distance."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (Work prerequisite).
P34: "Before we go further — can you compute the net work done here? Take your time."

If gap detected → repair: "Let's quickly revisit work. W = Fd cosθ. Net work sums
all forces. Positive when force and motion align, negative when opposed."

P10 (example): Guided practice — "A 5 kg skateboard rolls at 4 m/s. Find KE."
P13 (think-aloud): "First identify m = 5, v = 4. Then KE = ½ × 5 × 16 = 40 J.
Notice I square v first, then multiply — squaring first avoids errors."

---

### TA-4 — MC-KE-LINEAR Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 1 kg ball rolls at 2 m/s. KE = 2 J. I now push it so it moves
at 4 m/s — double the speed. What do you think happens to the KE? Estimate first."

Listen: if student says "4 J" → MC-KE-LINEAR confirmed.

P28 → P30 → P31 (full Misconception Engine MC-KE-LINEAR sequence).

P33 (discrimination pair): "Compare a 2 kg ball at 3 m/s vs 6 m/s. Compute both KEs."
Expected: 9 J vs 36 J → "4× not 2×. Yes — speed doubled, KE quadrupled."

P36 (open probe): "Can you think of a real situation where the quadratic KE relationship
matters? (Hint: car crashes, roller coasters, bullets...)"

---

### TA-5 — MC-KE-NEGATIVE + Direction Independence [Protocol B]
**Primitives:** P14, P28, P30, P31, P33

P14: "A 2 kg ball rolls at −3 m/s (leftward). What is its KE?"
Listen: if student writes −9 J or −4.5 J → MC-KE-NEGATIVE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-KE-NEGATIVE sequence).

P33: "Ball at +5 m/s vs −5 m/s, mass 1 kg. Compute both KEs. Are they different?"
Expected: both 12.5 J. "Direction of motion doesn't affect KE — only speed does."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set (increasing difficulty):

1. **Basic:** A 3 kg ball moves at 6 m/s. KE = ?  [Answer: 54 J]
2. **Ratio:** Speed of 4 kg object triples from 2 m/s to 6 m/s. KE ratio? [Answer: 9×]
3. **Reverse:** An object has KE = 50 J and mass 4 kg. Find v. [Answer: 5 m/s]
4. **Multi-body:** Car (1000 kg, 20 m/s) + truck (5000 kg, 10 m/s). Total KE?
   [Answer: 200 000 J + 250 000 J = 450 000 J]
5. **Interpretation:** Why does a car at 80 km/h need much more than 2× the braking
   distance of a car at 40 km/h? [Answer: KE ∝ v², so 4× the energy, 4× the stopping distance]

P51 (check): After each answer, compare against solution. Flag errors for targeted repair.
P52 (narrow): "You wrote v = 2 — can you check whether you squared it before multiplying?"
P55 (wait): Allow student 60 s of uninterrupted work before intervening.
P54 (productive struggle): If stuck >90 s: "What is m? What is v? Now just substitute into ½mv²."

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today's key idea: KE = ½mv². Speed squared means small speed gains give big KE gains.
KE is always non-negative — direction doesn't matter."

P62 (retrieval schedule): "I'll give you a KE problem to work from memory in our next session."

P85 (regulation tail): "You correctly identified that KE is quadratic in speed. That's the
insight that makes energy physics powerful — keep that in mind as we move to the Work–Energy Theorem."

P89 (retrieval schedule document): Log: MC-KE-LINEAR flag status; session KE range; ratio exercise result.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — basic computation):**
"A 4 kg object moves at 5 m/s. What is its kinetic energy?"
Expected: KE = ½ × 4 × 25 = 50 J.
_Discriminates: can substitute correctly into ½mv²._

**MP-2 (Apply — quadratic ratio):**
"An object's speed increases from 3 m/s to 9 m/s. By what factor does its KE change?"
Expected: (9/3)² = 9. KE increases by a factor of 9.
_Discriminates: understands v² relationship, not linear._

**MP-3 (Apply — reverse):**
"A 2 kg ball has kinetic energy of 36 J. What is its speed?"
Expected: v² = 2×36/2 = 36 → v = 6 m/s.
_Discriminates: algebraic rearrangement of KE formula._

**MP-4 (Understand — direction independence):**
"A 1 kg ball moves at −4 m/s (leftward). A second 1 kg ball moves at +4 m/s (rightward).
Which has greater kinetic energy?"
Expected: Equal — both have KE = ½ × 1 × 16 = 8 J.
_Discriminates: MC-KE-NEGATIVE resolution._

**MP-5 (Analyze — multi-body comparison):**
"Object A: mass 2 kg, speed 6 m/s. Object B: mass 8 kg, speed 3 m/s.
Which has greater KE? By how much?"
Expected: KE_A = ½×2×36 = 36 J; KE_B = ½×8×9 = 36 J. Equal.
_Discriminates: careful computation; does not assume larger mass always wins._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "What happens to KE if v doubles? Write one sentence."
Threshold: Must state "quadruples" or "increases by factor of 4" or "v² relationship".
If not → repeat P28 conflict evidence before TA-3.

**FA-2 (TA-4 exit):** "Ball at 2 m/s, mass 1 kg: KE = 2 J. Ball at 6 m/s, same mass: KE = ?"
Expected: 18 J (= ½×1×36). Accept within 5% for arithmetic rounding.
If student writes 6 J → MC-KE-LINEAR not resolved → loop back to P33.

**FA-3 (TA-5 exit):** "A 3 kg object moves at −5 m/s. KE = ?"
Expected: 37.5 J. If student writes −37.5 J → MC-KE-NEGATIVE not resolved → repeat P31.

**FA-4 (Session exit):** Administer MP-1 through MP-3. 3/3 correct → advance to TA-7.
Otherwise → targeted re-teach of failed probe type before closure.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Skip collision-scenario probes at TA-4 on first attempt; use simpler marble-vs-ball P06 anchor.
- Use P05 reassurance: "KE = ½mv² — just two multiplications. You already know how to do this."
- On P54 trigger: reduce problem to one step ("What is v²?") before asking for KE.
- Never deploy multi-body MP-5 style questions in TA-4 if S6 is flagged.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (equal-KE trap) at TA-3 before guided practice.
- If student says "A has more KE because it's faster" → deploy conflict evidence immediately.
- Advance through worked examples faster; spend more time on ratio and reverse problems.

**S4 (Prereq gap — Work):**
- Detect via PD-1 failure at TA-3.
- Repair path: deliver a 2-TA mini-session on W = Fd cosθ and sign conventions before returning.
- Do not proceed past TA-3 with unresolved PD-1.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → Formula → MC-KE-LINEAR repair).
**Session 2 (≥24 h later):** Retrieval cold-start — "Define KE. If speed triples, what happens to KE?"
  → TA-5 (MC-KE-NEGATIVE) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe:
  "A 2 kg object has KE = 18 J and moves left. A 2 kg object has KE = 18 J and moves right.
  What is each object's speed?"
  (Tests both formula inversion and direction independence simultaneously.)
**Pre-Work–Energy-Theorem session:** Administer all 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.work (W = Fd cosθ) and phys.mech.momentum (p = mv)
are natural interleaving pairs — ensure student can distinguish KE (scalar, v²) from p (vector, v).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.kinetic-energy ✓
V-2   prerequisites listed and exist in KG: phys.mech.work ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for proficient ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: rolling-ball anchor ✓
V-8   ≥2 misconceptions engineered: MC-KE-LINEAR, MC-KE-NEGATIVE ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: rolling-ball stop scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-KE-LINEAR ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: work, momentum ✓
V-19  cross_links match KG edges: work-energy-theorem, conservation-of-energy, momentum ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
