# Teaching Blueprint — phys.mech.rolling-motion

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.rolling-motion
name:               Rolling Motion
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.angular-kinematics, phys.mech.kinetic-energy,
                     phys.mech.conservation-of-angular-momentum]
cross_links:        [phys.mech.rotational-dynamics, phys.mech.friction,
                     phys.mech.conservation-of-energy]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (roll a solid ball and a hollow ball down a ramp —
                       they have the same mass and radius; which wins?
                       before KE_total = ½mv² + ½Iω²; difficulty 5 →
                       C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** A rolling object has two forms of kinetic energy simultaneously: translational
(½mv²_cm) and rotational (½Iω²). The constraint v_cm = Rω links them for rolling without
slipping. Because different shapes have different I, they trade energy between these forms
differently — a solid sphere always beats a hollow cylinder down a frictionless ramp regardless
of mass or radius.

**Rolling constraint (without slipping):**
v_cm = Rω
a_cm = Rα

**Total kinetic energy of a rolling object:**
KE_total = ½mv²_cm + ½Iω²

Using v_cm = Rω and I = βmR² (β = ½ for solid disc, 1 for hollow cylinder, ²/₅ for solid sphere):
KE_total = ½mv²_cm(1 + β)

**Speed at the bottom of a ramp (height h, frictionless ramp, rolling without slip):**
Energy conservation: mgh = ½mv²_cm(1 + β)
v_cm = √(2gh / (1 + β))

**Ranking by speed at ramp bottom (smallest β wins):**
Solid sphere (β = 2/5): v ∝ 1/√1.4 → fastest
Solid cylinder (β = 1/2): v ∝ 1/√1.5
Hollow cylinder (β = 1): v ∝ 1/√2 → slowest
(All independent of mass and radius — only β matters!)

**Worked Example 1 (Total KE of rolling ball):**
A solid sphere (M = 2 kg, R = 0.5 m, I = ²/₅×2×0.25 = 0.2 kg·m²) rolls at v_cm = 4 m/s.
ω = v/R = 4/0.5 = 8 rad/s.
KE_trans = ½×2×16 = 16 J. KE_rot = ½×0.2×64 = 6.4 J. KE_total = 22.4 J.

**Worked Example 2 (Speed at ramp bottom):**
Solid cylinder (β = ½) rolls from h = 2 m. v_cm = √(2×10×2/1.5) = √(40/1.5) = √26.7 ≈ 5.16 m/s.

**Worked Example 3 (Compare sphere vs hollow cylinder):**
Same h = 2 m.
Sphere (β = 2/5): v = √(2×10×2/1.4) ≈ 5.35 m/s. Wins.
Hollow cylinder (β = 1): v = √(2×10×2/2) = √20 ≈ 4.47 m/s. Loses.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.angular-kinematics            ──►
phys.mech.kinetic-energy                ──►  phys.mech.rolling-motion
phys.mech.conservation-of-angular-momentum ──► (rotational KE, energy conservation)
```

**PD-1 (Angular kinematics):**
"A disc of radius 0.4 m rolls at v_cm = 3 m/s. What is ω?"
Expected: ω = v/R = 7.5 rad/s.

**PD-2 (Rotational KE):**
"A disc (I = 0.5 kg·m²) spins at ω = 6 rad/s. KE_rot?"
Expected: ½×0.5×36 = 9 J.

Both must pass before TA-3. Gap in either → repair before continuing.

---

## Component 3 — Misconception Engine

### MC-SAME-RACE (Priority 1)
**Label:** "A heavier or larger object rolls down a ramp faster — mass and radius determine the winner"

**Trigger signals:**
- Says "the heavier ball will reach the bottom first"
- Claims radius matters (larger radius → faster)
- Doesn't know that β (shape factor) is the only determinant

**Conflict evidence [P28]:**
"Solid sphere A: 1 kg, R = 0.1 m. Solid sphere B: 100 kg, R = 2 m. Both roll from 3 m height.
v_cm = √(2gh/(1+β)). For both: β = 2/5, h = 3 m.
v = √(2×10×3/1.4) = √42.9 ≈ 6.55 m/s — identical for both!
Mass and radius cancelled out completely. What actually determined the speed?"

**Bridge [P30]:**
"v_cm = √(2gh/(1+β)). Neither m nor R appears — they cancelled. Only β (the shape coefficient)
and h remain. β = I/(mR²) is the ratio of rotational inertia to translational inertia.
A solid sphere always reaches the bottom before a hollow cylinder, no matter their sizes."

**Replacement [P31]:**
"For rolling without slipping on a ramp: v_cm = √(2gh/(1+β)).
β depends only on shape:
Solid sphere: β = 2/5 = 0.4 (lowest → fastest).
Solid cylinder: β = 1/2 = 0.5.
Hollow sphere: β = 2/3 ≈ 0.67.
Hollow cylinder: β = 1 (highest → slowest).
Mass and radius do NOT determine order. Shape does."

**Discrimination pairs [P33]:**
- Solid sphere vs hollow cylinder, same mass and radius: sphere wins every time ✓
- Two hollow cylinders of different mass: tie — β identical, mass cancels ✓

**s6_path:** Use only the qualitative result first: "solid shapes beat hollow shapes down a ramp
because less energy goes into spinning." Derive the formula only after the qualitative answer is secure.

---

### MC-ROLLING-SAME-AS-SLIDING (Priority 2)
**Label:** "Rolling without slipping is the same as sliding — you just use ½mv² for both"

**Trigger signals:**
- Uses only ½mv² (ignoring ½Iω²) for a rolling object
- Says "the ball is moving so KE = ½mv² — rotation is inside the ball, it doesn't count"
- Gets wrong v at bottom of ramp (overcounts energy available for translation)

**Conflict evidence [P28]:**
"A solid sphere (m = 2 kg, R = 0.5 m, I = 0.2 kg·m²) rolls at v = 4 m/s.
You wrote KE = ½×2×16 = 16 J (sliding formula).
But also: ω = 8 rad/s → KE_rot = ½×0.2×64 = 6.4 J.
Total = 22.4 J. If we use only 16 J and compute v at ramp bottom,
we get a different (wrong) answer. Which is the actual total kinetic energy?"

**Bridge [P30]:**
"Rolling means the object both translates AND rotates simultaneously. Every point of mass
participates in the spinning motion, contributing to ½Iω². That energy is just as real as
the translational ½mv². If you drop only ½mv², you're ignoring the rotational energy — the
sphere can't reach as high up a ramp as you'd calculate."

**Replacement [P31]:**
"For any rolling object: KE_total = ½mv²_cm + ½Iω².
Use the rolling constraint: v_cm = Rω to express everything in terms of v_cm.
Never ignore the rotational term — it's always present when an object rolls."

**Discrimination pairs [P33]:**
- Rolling sphere on level surface: KE_total = ½mv²(1 + 2/5) = 7/10 mv² (not ½mv²) ✓
- Sliding frictionless block: KE = ½mv² only (no rotation) ✓

**s6_path:** Start with the two separate calculations (KE_trans and KE_rot) and add them;
defer the β shortcut formula to a second session.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to combined translational and rotational motion.
P04: "Roll a solid ball and a hollow ball down the same ramp. Same mass, same radius.
Which do you expect to win? Does your intuition surprise you when you test it?"
P06: "The solid ball always wins — not because it's heavier (same mass) but because less of
its energy goes into spinning. A hollow ball has all its mass at maximum radius → large I →
more energy 'stuck' in rotation and less available for translating down the ramp."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Energy partitioning diagram:

```
At ramp top:  GPE = mgh  [=====================]
At bottom:    KE_trans   [========]
              KE_rot     [====]         (solid sphere)
              ─────────────────────
              Total       [============]  = mgh
```

For hollow cylinder: KE_rot takes a larger share, KE_trans smaller → lower v.

P08 (notation): v_cm = Rω (rolling constraint). KE_total = ½mv²(1 + β) where β = I/(mR²).
Ramp: mgh = ½mv²(1+β) → v = √(2gh/(1+β)). Table of β values.
Walk through Worked Examples 1, 2, 3.

P05: "This is why engineers designing fast-spinning machinery choose solid rotors over hollow
ones (less I → easier to spin up) but flywheels (energy storage) use hollow rims (large I)."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2. Gap in either → repair before continuing.

P10: "A solid cylinder (M = 3 kg, R = 0.4 m, I = 0.24 kg·m²) rolls at v_cm = 5 m/s.
Find ω, KE_trans, KE_rot, KE_total."
P13: "ω = 5/0.4 = 12.5 rad/s. KE_trans = ½×3×25 = 37.5 J. KE_rot = ½×0.24×156.25 = 18.75 J.
KE_total = 56.25 J = 37.5×(1 + ½) ✓."

---

### TA-4 — MC-SAME-RACE Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A solid sphere (m = 1 kg, R = 0.2 m) and a hollow cylinder (m = 1 kg, R = 0.2 m)
roll down a 2 m ramp. Before computing: which wins, and by how much? Does mass matter?"

Listen: if student says "they tie — same mass and radius" → MC-SAME-RACE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-SAME-RACE sequence).

P33: Sphere v = √(2×10×2/1.4) ≈ 5.35 m/s; Hollow cylinder v = √(2×10×2/2) ≈ 4.47 m/s. Sphere wins.
"Change m = 100 kg for the hollow cylinder — still loses to the 1 kg sphere. Mass doesn't matter."

P36: "If β is what determines the race, what would you choose for the slowest possible roller?
And the fastest?" [Slowest: hollow cylinder (β = 1). Fastest: solid sphere (β = 2/5).]

---

### TA-5 — MC-ROLLING-SAME-AS-SLIDING Probe [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A solid cylinder (m = 2 kg, I = 0.5 kg·m²) rolls at v_cm = 6 m/s. KE?"

Listen: if student writes KE = ½×2×36 = 36 J (ignoring rotation) → MC-ROLLING-SAME-AS-SLIDING confirmed.

P28 → P30 → P31 (full Misconception Engine MC-ROLLING-SAME-AS-SLIDING sequence).
Expected: ω = 6/R. If R not given for this problem: use β directly.
KE_total = ½×2×36×(1 + ½) = 36×1.5 = 54 J. "36 J was only part of the story."

P10 (energy conservation on ramp): "Solid sphere, h = 5 m. v_cm at bottom?"
P13: "v = √(2×10×5/1.4) = √71.4 ≈ 8.45 m/s."
"Compare to sliding (no rotation): v = √(2×10×5) = √100 = 10 m/s. Rolling is slower — some energy in rotation."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **KE of rolling:** Hollow cylinder (β = 1, m = 5 kg) rolls at v_cm = 4 m/s. KE_total?
   [Answer: KE = ½×5×16×(1+1) = 80 J]
2. **Ramp speed:** Solid disc (β = 1/2) rolls from h = 3 m. v_cm?
   [Answer: v = √(2×10×3/1.5) = √40 ≈ 6.32 m/s]
3. **Race:** Solid sphere, solid cylinder, hollow cylinder, all from h = 4 m. Rank order and speeds.
   [Answer: Sphere: √(80/1.4)≈7.56; Solid cyl: √(80/1.5)≈7.30; Hollow cyl: √(80/2)≈6.32]
4. **Find h from v:** A solid sphere rolls at v_cm = 6 m/s at the bottom. Starting height?
   [Answer: h = v²(1+β)/(2g) = 36×1.4/20 = 2.52 m]
5. **Combined energy:** A solid sphere (m = 2 kg, R = 0.3 m) rolls at v_cm = 5 m/s.
   Find KE_trans, KE_rot, and KE_total. What fraction is rotational?
   [Answer: KE_trans=25J; KE_rot=½×(2/5×2×0.09)×(5/0.3)²=½×0.072×277.8=10J; KE_total=35J=½mv²×(1+2/5); fraction=10/35=2/7]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: rolling KE = ½mv²_cm + ½Iω²; v_cm = Rω. Ramp: v = √(2gh/(1+β)).
β = I/(mR²) depends only on shape — mass and radius cancel. Solid sphere (β=2/5) always
wins over hollow cylinder (β=1) regardless of size."

P62: "Next session: 'A hollow sphere (β = 2/3) rolls from h = 2 m. v_cm? Compare to solid sphere.'"

P85: "You correctly applied both energy terms — the step most students skip. And you understood
that β is shape-only: a beautiful result that mass and radius cancel completely."

P89: Log MC flags; record accuracy; note β-table fluency.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — rolling KE):**
"A solid sphere (m = 3 kg, R = 0.5 m, β = 2/5) rolls at v_cm = 6 m/s. Find KE_total."
Expected: KE = ½×3×36×(1+0.4) = 54×1.4 = 75.6 J.
_Discriminates: MC-ROLLING-SAME-AS-SLIDING resolution; KE = ½mv²(1+β)._

**MP-2 (Apply — ramp speed):**
"A hollow cylinder (β = 1) rolls from h = 4 m. v_cm at bottom? (g = 10)"
Expected: v = √(2×10×4/2) = √40 ≈ 6.32 m/s.
_Discriminates: v_cm = √(2gh/(1+β)) formula._

**MP-3 (Analyze — race outcome):**
"A solid sphere and a solid cylinder, equal mass and radius, roll down the same ramp.
Which wins? Would doubling the mass of the cylinder change the outcome? Explain."
Expected: Sphere wins (β = 0.4 < 0.5). Doubling mass doesn't change outcome — mass cancels.
_Discriminates: MC-SAME-RACE resolution; mass independence._

**MP-4 (Apply — find height from v):**
"A solid disc (β = 1/2) reaches v_cm = 8 m/s at the bottom of a ramp. Starting height?"
Expected: h = v²(1+β)/(2g) = 64×1.5/20 = 4.8 m.
_Discriminates: energy equation rearrangement._

**MP-5 (Analyze — energy partitioning):**
"A hollow cylinder rolls at v_cm = 5 m/s. What fraction of KE_total is rotational?"
Expected: β = 1 → KE_rot/KE_total = β/(1+β) = 1/2 = 50%.
(For solid sphere: 2/5 ÷ 7/5 = 2/7 ≈ 29%.)
_Discriminates: energy fraction as function of β; deeper understanding._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Rolling constraint: v_cm = ? Total KE for rolling = ?"
Threshold: v_cm = Rω; KE = ½mv²_cm + ½Iω².

**FA-2 (TA-4 exit):** "Race: solid sphere vs hollow cylinder, same mass and radius, same ramp.
Which wins? Does changing mass change the outcome?"
Expected: Sphere wins; changing mass doesn't change outcome (mass cancels).
If student says hollow cylinder or says mass matters → MC-SAME-RACE not resolved.

**FA-3 (TA-5 exit):** "Solid cylinder (m = 4 kg, β = 1/2) rolls at v = 5 m/s. KE_total?"
Expected: KE = ½×4×25×(1+0.5) = 75 J. If student writes 50 → MC-ROLLING-SAME-AS-SLIDING not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only the two-term calculation (KE_trans + KE_rot separately) in TA-3.
- Introduce the β shortcut only in TA-5 after the two-term approach is secure.
- Skip the race problem in TA-4 on first pass; just confirm solid sphere wins qualitatively.
- Reassure: "Rolling = translating + spinning. Add the two energies. That's all."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (energy fraction) at TA-3 — requires algebraic manipulation.
- Challenge: "Derive v_cm = √(2gh/(1+β)) from energy conservation. What assumption did you need?"
  (Rolling without slipping, i.e., v_cm = Rω — the key constraint.)
- Spend TA-6 on Problem 5 (energy fraction) and the derivation.

**S4 (Prereq gap):**
- PD-1 gap (rolling constraint) → repair v = Rω from angular kinematics.
- PD-2 gap (rotational KE) → repair ½Iω² from rotational dynamics.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete race → KE_total formula → MC-SAME-RACE repair).
**Session 2 (≥24 h later):** Retrieval: "Rolling KE formula? v_cm = ? Which shape wins a ramp race?"
  → TA-5 (MC-ROLLING-SAME-AS-SLIDING, ramp speed formula) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining rolling motion and conservation of energy:
  "A solid sphere rolls without slipping to the top of a hill (h = 3 m) from the bottom
  with initial v_cm = 10 m/s. Does it make it? (Find h max first.)"
  (h_max = v²(1+β)/(2g) = 100×1.4/20 = 7 m > 3 m — yes, it makes it easily.)
**Pre-equilibrium session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.kinetic-energy (KE_trans), phys.mech.rotational-dynamics
(KE_rot = ½Iω²), phys.mech.conservation-of-energy (energy partitioning).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.rolling-motion ✓
V-2   prerequisites listed and exist in KG: phys.mech.angular-kinematics,
      phys.mech.kinetic-energy, phys.mech.conservation-of-angular-momentum ✓
V-3   bloom level consistent with difficulty 5/advanced: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 4h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: solid-vs-hollow ball race anchor ✓
V-8   ≥2 misconceptions engineered: MC-SAME-RACE, MC-ROLLING-SAME-AS-SLIDING ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: solid-vs-hollow ramp race scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-SAME-RACE ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: kinetic-energy, rotational-dynamics,
      conservation-of-energy ✓
V-19  cross_links match KG edges: rotational-dynamics, friction,
      conservation-of-energy ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
