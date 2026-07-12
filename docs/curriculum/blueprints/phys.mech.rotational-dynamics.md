# Teaching Blueprint — phys.mech.rotational-dynamics

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.rotational-dynamics
name:               Rotational Dynamics
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    5
prerequisites:      [phys.mech.torque, phys.mech.moment-of-inertia]
cross_links:        [phys.mech.angular-momentum, phys.mech.rolling-motion,
                     phys.mech.newtons-second-law]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a heavy vs light flywheel given the same torque — which
                       spins up faster? before τ = Iα; difficulty 5 → C with
                       accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Rotational dynamics is Newton's 2nd Law for rotation. The net torque on an
object equals its moment of inertia times angular acceleration: τ_net = Iα. This is the
complete rotational analog of F_net = ma — every linear dynamics technique maps directly
to rotation.

**Newton's 2nd Law for Rotation:**
Σ τ = I α

where Σ τ is the net torque (N·m), I is the moment of inertia (kg·m²), and α is the angular
acceleration (rad/s²).

**Linear–Rotational analog table (complete):**

| Linear | Rotational |
|--------|-----------|
| F = ma | τ = Iα |
| p = mv | L = Iω |
| W = Fs | W = τθ |
| KE = ½mv² | KE_rot = ½Iω² |
| P = Fv | P = τω |

**Rotational kinetic energy:**
KE_rot = ½Iω²

**Rotational work:**
W_rot = τ × θ    (τ constant, θ in radians)

**Worked Example 1 (Find α):**
A solid disc (M = 4 kg, R = 0.5 m) has I = ½×4×0.25 = 0.5 kg·m².
Net torque = 3 N·m.
α = τ/I = 3/0.5 = 6 rad/s².

**Worked Example 2 (Find torque from α):**
A flywheel (I = 2 kg·m²) needs to reach ω = 10 rad/s from rest in 4 s.
α = 10/4 = 2.5 rad/s². τ = Iα = 2×2.5 = 5 N·m.

**Worked Example 3 (Rotational KE):**
The disc in Example 1 reaches ω = 12 rad/s.
KE_rot = ½ × 0.5 × 144 = 36 J.
Work done = τ × θ = 3 × θ. From ω² = 2αθ → θ = 144/(2×6) = 12 rad.
W = 3×12 = 36 J. ✓ (Energy consistent.)

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.torque            ──►
                                 phys.mech.rotational-dynamics
phys.mech.moment-of-inertia ──►
```

**PD-1 (Torque prerequisite):**
"A 20 N force perpendicularly at r = 0.3 m from a pivot. τ?"
Expected: 6 N·m.

**PD-2 (Moment of inertia prerequisite):**
"Solid disc M = 6 kg, R = 0.4 m. I?"
Expected: I = ½×6×0.16 = 0.48 kg·m².

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-ALPHA-EQUALS-TORQUE (Priority 1)
**Label:** "Angular acceleration equals torque — larger torque always means proportionally larger α"

**Trigger signals:**
- Equates α = τ without dividing by I
- Says "double the torque → double α" without noting that I matters
- Computes α = τ/m (uses linear mass instead of I)

**Conflict evidence [P28]:**
"Two discs: Disc A (I = 2 kg·m²) and Disc B (I = 0.5 kg·m²). Both receive τ = 4 N·m.
If α = τ: both get α = 4 rad/s². But:
α_A = 4/2 = 2 rad/s²; α_B = 4/0.5 = 8 rad/s².
Same torque, very different α — by a factor of 4. What determines α?"

**Bridge [P30]:**
"α = τ/I. Torque is the 'push'; I is the 'resistance.' Just like F = ma → a = F/m,
we have τ = Iα → α = τ/I. A heavy flywheel (large I) resists angular acceleration
even under large torque. You must divide by I."

**Replacement [P31]:**
"α = τ_net / I. Always identify both τ_net AND I before computing α.
For the same torque: larger I → smaller α. This is why flywheels store energy
(large I → hard to change ω)."

**Discrimination pairs [P33]:**
- Same τ, different I: I doubles → α halves ✓
- Same α desired: if I doubles, τ must double to maintain same α ✓

**s6_path:** Use a single numerical example only; avoid the comparison side-by-side if it causes
cognitive overload. "τ = Iα → α = τ/I. One step."

---

### MC-ROTATIONAL-KE-IGNORED (Priority 2)
**Label:** "Rotational kinetic energy doesn't exist — only translational KE = ½mv² applies"

**Trigger signals:**
- Uses only KE = ½mv² even for spinning objects
- Says "the wheel is rolling so KE = ½mv²"
- Ignores ½Iω² term in energy calculations

**Conflict evidence [P28]:**
"A solid disc (M = 2 kg, R = 0.5 m, I = 0.25 kg·m²) spins at ω = 6 rad/s about its centre (no translation).
You said KE = ½mv² = ½×2×0 = 0 (v of centre = 0 for pure rotation).
But the disc is clearly moving — its parts are sweeping around. Let's compute KE_rot:
½Iω² = ½×0.25×36 = 4.5 J. The energy is non-zero. Where does it come from?"

**Bridge [P30]:**
"KE = ½mv² counts translational energy of the centre of mass. Rotating objects also have
rotational kinetic energy ½Iω² — the energy of spinning motion about the CM.
For pure rotation (CM stationary): total KE = ½Iω² only.
For rolling without slipping: total KE = ½mv² + ½Iω² (both terms)."

**Replacement [P31]:**
"Total KE = ½mv²_cm + ½Iω². For pure spin (no translation): ½Iω² only.
For rolling: both terms. Never ignore ½Iω² for rotating bodies.
Rolling problems: v_cm = Rω links the two terms."

**Discrimination pairs [P33]:**
- Spinning disc (pure rotation): KE = ½Iω² only ✓
- Rolling sphere: KE = ½mv² + ½Iω² (both) ✓

**s6_path:** Start with pure rotation (no translation) to isolate KE_rot = ½Iω²;
rolling (both terms) deferred to phys.mech.rolling-motion.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to Newton's 2nd Law in rotational form.
P04: "A heavier flywheel and a lighter one, same torque applied. Which spins up faster?
Is it proportional to the torque alone, or does the 'rotational mass' matter too?"
P06: "The flywheel's moment of inertia is its rotational mass. τ = Iα is Newton's 2nd Law
for rotation — every concept from linear dynamics carries over."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Complete analog table (from Component 1). Circle τ = Iα as the central equation.

P08 (notation): τ_net = Iα; α = τ/I; τ = Iα. All three rearrangements.
KE_rot = ½Iω². W_rot = τθ. P_rot = τω.
Walk through Worked Examples 1, 2, 3.

P05: "Flywheels in hybrid cars store energy as ½Iω² — they spin up (charging) and spin down
(discharging). Engines are designed with the τ = Iα relationship in mind for every gear change."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2. Gap in either → repair before continuing.

P10: "A hollow cylinder (M = 3 kg, R = 0.4 m, I = MR² = 0.48 kg·m²). Net τ = 2.4 N·m.
Find α. Then: find ω after 5 s from rest."
P13: "α = τ/I = 2.4/0.48 = 5 rad/s². ω = αt = 25 rad/s."

---

### TA-4 — MC-ALPHA-EQUALS-TORQUE Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Disc A (I = 4 kg·m²) and Disc B (I = 1 kg·m²) both receive τ = 8 N·m.
Before computing: do they get the same α?"

Listen: if student says "yes — same τ → same α" → MC-ALPHA-EQUALS-TORQUE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-ALPHA-EQUALS-TORQUE sequence).

P33: α_A = 2 rad/s²; α_B = 8 rad/s². "4× different I → 4× different α (inversely)."

P36: "You want a motor to produce α = 10 rad/s² in a flywheel of I = 5 kg·m².
What minimum torque is needed?" [Answer: τ = Iα = 50 N·m.]

---

### TA-5 — MC-ROTATIONAL-KE-IGNORED Probe + Energy Work [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A solid disc (M = 2 kg, R = 0.5 m, I = 0.25 kg·m²) spins at ω = 4 rad/s about its
fixed centre (not rolling). What is its kinetic energy?"

Listen: if student writes KE = 0 or KE = ½mv² (v_cm = 0 for pure spin) → MC-ROTATIONAL-KE-IGNORED confirmed.

P28 → P30 → P31 (full Misconception Engine MC-ROTATIONAL-KE-IGNORED sequence).

P10: "Work-energy: A torque of 5 N·m acts on the disc through θ = 20 rad. Starting from rest.
Find ω using W_rot = τθ = ΔKE_rot."
P13: "W = 5×20 = 100 J = ½Iω² → ω² = 200/0.25 = 800 → ω = 28.3 rad/s."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Find α:** Solid sphere (M = 3 kg, R = 0.5 m, I = ²/₅ MR² = 0.3 kg·m²). τ = 1.5 N·m. α?
   [Answer: α = 1.5/0.3 = 5 rad/s²]
2. **Find τ:** A flywheel (I = 8 kg·m²) must reach ω = 30 rad/s in 6 s from rest. τ required?
   [Answer: α = 5 rad/s²; τ = 8×5 = 40 N·m]
3. **Rotational KE:** Hollow cylinder (I = MR² = 2 kg·m²) spinning at ω = 10 rad/s. KE_rot?
   [Answer: ½×2×100 = 100 J]
4. **Work → ω:** Torque 6 N·m on solid disc (I = 0.6 kg·m²) through 30 rad. Final ω (from rest)?
   [Answer: W = 180 J; ω = √(2×180/0.6) = √600 ≈ 24.5 rad/s]
5. **Power:** A motor exerts τ = 20 N·m at ω = 50 rad/s. Power?
   [Answer: P = τω = 1000 W = 1 kW]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: τ_net = Iα (Newton's 2nd for rotation). KE_rot = ½Iω². W_rot = τθ. P = τω.
Complete analogy with linear dynamics: F↔τ, m↔I, a↔α, v↔ω, s↔θ."

P62: "Next session: 'A solid disc (I = 0.5 kg·m²) starts at rest. τ = 4 N·m acts for 8 rad.
Find α, ω after 8 rad, and KE gained.'"

P85: "You applied the full analogy table — once you see τ = Iα as the rotational twin of F = ma,
every technique from linear dynamics is immediately available in rotation."

P89: Log MC flags; record problem accuracy by type (find α, find τ, KE, power).

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — find α):**
"A solid cylinder (M = 5 kg, R = 0.4 m, I = 0.4 kg·m²). Net τ = 3.2 N·m. Find α."
Expected: α = 3.2/0.4 = 8 rad/s².
_Discriminates: τ = Iα → α = τ/I; MC-ALPHA-EQUALS-TORQUE resolution._

**MP-2 (Apply — find τ):**
"A disc (I = 3 kg·m²) needs α = 6 rad/s². Required net torque?"
Expected: τ = 3×6 = 18 N·m.
_Discriminates: rearrangement of τ = Iα._

**MP-3 (Apply — rotational KE):**
"A solid sphere (I = 0.4 kg·m²) spinning at ω = 5 rad/s. KE_rot?"
Expected: KE = ½×0.4×25 = 5 J.
_Discriminates: MC-ROTATIONAL-KE-IGNORED resolution._

**MP-4 (Apply — work and KE):**
"A torque of 8 N·m acts on a flywheel (I = 2 kg·m²) through θ = 12 rad (from rest). Find ω."
Expected: W = 96 J = ½×2×ω²; ω = √96 ≈ 9.8 rad/s.
_Discriminates: W_rot = τθ + energy theorem chain._

**MP-5 (Analyze — design):**
"Two motors, same τ = 10 N·m. Motor A drives a flywheel with I = 5 kg·m²;
Motor B drives one with I = 1 kg·m². After 4 s from rest, compare ω and KE_rot of each."
Expected: α_A = 2, α_B = 10. ω_A = 8, ω_B = 40.
KE_A = ½×5×64 = 160 J; KE_B = ½×1×1600 = 800 J.
_Discriminates: full chain τ→α→ω→KE; effect of I on all downstream quantities._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "τ = Iα. Rearranged to find α? Find τ?"
Threshold: α = τ/I; τ = Iα. Units: α in rad/s², τ in N·m, I in kg·m².

**FA-2 (TA-4 exit):** "I = 6 kg·m², τ = 12 N·m. α?"
Expected: 2 rad/s². If student says 12 → MC-ALPHA-EQUALS-TORQUE not resolved.

**FA-3 (TA-5 exit):** "Disc spinning at ω = 8 rad/s, I = 0.5 kg·m². KE_rot?"
Expected: ½×0.5×64 = 16 J. If student writes 0 → MC-ROTATIONAL-KE-IGNORED not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only the single-step α = τ/I in TA-3 and TA-4.
- Defer KE_rot = ½Iω² to TA-5; W = τθ to TA-6.
- Reassure: "One equation: τ = Iα. Same shape as F = ma — you already know how to use it."
- Build from Worked Example 1 (find α) before attempting find-τ or KE problems.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (full chain design problem) at TA-3.
- Challenge: "A motor with P = 2 kW and ω = 100 rad/s drives a flywheel. Find τ, and
  then the time to reach ω from rest if I = 4 kg·m²." (τ = P/ω = 20 N·m; α = 5; t = 20 s.)
- Spend TA-6 on Problems 4 and 5.

**S4 (Prereq gap):**
- PD-1 gap (Torque) → repair τ = rF sinθ before returning.
- PD-2 gap (Moment of inertia) → repair I = Σmr² and standard shapes before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → τ = Iα → MC-ALPHA-EQUALS-TORQUE repair).
**Session 2 (≥24 h later):** Retrieval: "τ = Iα. How does doubling I affect α for same τ?"
  → TA-5 (MC-ROTATIONAL-KE-IGNORED, W = τθ) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining linear and rotational dynamics:
  "A mass m hangs from a cord wrapped around a disc (M, R). Find α of the disc and a of the mass."
  (τ = mgR − tension×R; separate linear eq for m; solve simultaneously. Previews Atwood-with-pulley.)
**Pre-angular-momentum session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.torque (τ), phys.mech.moment-of-inertia (I),
phys.mech.newtons-second-law (F = ma structural analogy).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.rotational-dynamics ✓
V-2   prerequisites listed and exist in KG: phys.mech.torque,
      phys.mech.moment-of-inertia ✓
V-3   bloom level consistent with difficulty 5/advanced: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 5h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: flywheel-spin-up anchor ✓
V-8   ≥2 misconceptions engineered: MC-ALPHA-EQUALS-TORQUE,
      MC-ROTATIONAL-KE-IGNORED ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: heavy-vs-light flywheel scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]:
      MC-ALPHA-EQUALS-TORQUE ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: torque, moment-of-inertia, newtons-second-law ✓
V-19  cross_links match KG edges: angular-momentum, rolling-motion,
      newtons-second-law ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
