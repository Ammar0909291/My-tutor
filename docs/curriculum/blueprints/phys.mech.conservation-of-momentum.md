# Teaching Blueprint — phys.mech.conservation-of-momentum

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.conservation-of-momentum
name:               Conservation of Momentum
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    5
prerequisites:      [phys.mech.impulse, phys.mech.newtons-third-law]
cross_links:        [phys.mech.collisions, phys.mech.conservation-of-energy,
                     phys.mech.newtons-second-law]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (two ice skaters at rest push off each other —
                       neither was moving; now both are. Where did the momentum
                       come from? before Σp_before = Σp_after; difficulty 5 →
                       C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** The total momentum of an isolated system (no external net force) is constant.
Internal forces (Newton's 3rd Law pairs) cancel out in the total, leaving the sum unchanged.
This is the most powerful single principle in classical mechanics — it applies to explosions,
collisions, recoil, and rocket propulsion.

**Formal Statement:**
If F_net_external = 0:
Σp_before = Σp_after
m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f

**Why it works (Newton's 3rd Law link):**
During a collision, A exerts force F on B; B exerts −F on A (Newton's 3rd).
Both act for the same time Δt. Impulses: +FΔt on B, −FΔt on A. They cancel.
Total Δp of system = 0 → total p unchanged. ✓

**Key properties:**
- Applies even when mechanical energy is NOT conserved (e.g., perfectly inelastic collisions).
- Applies in both 1D and 2D (vector equation in each dimension separately).
- "Isolated system" means no net external force — gravity and normal cancel on a flat surface.
- Rocket propulsion: exhaust backward → rocket forward (no external medium required).

**Worked Example 1 (Two objects colliding and sticking):**
Car A: 1000 kg, 20 m/s east. Car B: 1500 kg, at rest. They lock together. Find v_f.
Total p_before = 1000×20 + 1500×0 = 20 000 kg·m/s.
(m_A + m_B)v_f = 20 000 → v_f = 20 000/2500 = 8 m/s east.

**Worked Example 2 (Recoil/explosion):**
A 5 kg rifle fires a 0.02 kg bullet at 400 m/s east. Initial total p = 0.
0.02×400 + 5×v_rifle = 0 → v_rifle = −8/5 = −1.6 m/s (west — recoil).

**Worked Example 3 (Head-on with opposite directions):**
Ball A: 3 kg, east 6 m/s. Ball B: 2 kg, west 4 m/s (v = −4).
p_before = 3×6 + 2×(−4) = 18 − 8 = 10 kg·m/s east.
After A stops (v_Af = 0): 3×0 + 2×v_Bf = 10 → v_Bf = 5 m/s east.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.impulse          ──►
                                phys.mech.conservation-of-momentum
phys.mech.newtons-third-law ──►
```

**PD-1 (Impulse prerequisite):**
"A 0.5 kg ball bounces off a wall, east at 8 m/s → west at 6 m/s. Δp?"
Expected: 0.5×(−6−8) = −7 N·s (westward).

**PD-2 (Newton's 3rd Law prerequisite):**
"During a collision, object A exerts 200 N on B. What force does B exert on A?"
Expected: 200 N in the opposite direction (Newton's 3rd).

Both must pass before TA-3. Gap in either → repair that concept first.

---

## Component 3 — Misconception Engine

### MC-MOMENTUM-LOST (Priority 1)
**Label:** "Momentum is lost in collisions — especially when objects stop or slow down"

**Trigger signals:**
- Says "A gave some of its momentum to B but lost the rest"
- Claims total momentum after collision is less than before (without noting external force)
- Checks only one object's momentum after the event

**Conflict evidence [P28]:**
"Car A (1000 kg, 15 m/s east) hits stationary Car B (2000 kg). They stick.
Before: p_total = 1000×15 + 0 = 15 000 kg·m/s.
v_f = 15 000/(1000+2000) = 5 m/s east.
After: p_total = 3000×5 = 15 000 kg·m/s.
Before = After. Did momentum disappear?"

**Bridge [P30]:**
"Momentum is transferred between objects, not lost. What A loses, B gains — exactly.
This is because Newton's 3rd Law forces are equal and opposite, so their impulses cancel
in the total. The total is locked; it cannot decrease (in an isolated system)."

**Replacement [P31]:**
"Conservation: p_total_before = p_total_after. Always check the TOTAL (sum of all objects),
never just one object in isolation. One object slowing down means another speeds up by the
exact compensating amount."

**Discrimination pairs [P33]:**
- Sticking collision: individual momenta change, total unchanged ✓
- Explosion from rest: total starts and ends at zero; pieces fly in opposite directions ✓

**s6_path:** Skip conflict example; use only the explosion-from-rest scenario (intuitively clear:
if nothing was moving, the pieces must be equal and opposite).

---

### MC-INTERNAL-EXTERNAL (Priority 2)
**Label:** "Conservation applies in all situations — even when there's an external force"

**Trigger signals:**
- Applies conservation when a wall or floor exerts an unaccounted force on the system
- Says "gravity doesn't count as an external force"
- Ignores friction with the floor when computing post-collision state

**Conflict evidence [P28]:**
"A 3 kg ball (east, 10 m/s) hits a fixed wall and bounces back at 10 m/s west.
Before: p = +30 kg·m/s. After: p = −30 kg·m/s. Total changed by 60 kg·m/s.
You said momentum is conserved here. It isn't — why? What force acted on the system?"

**Bridge [P30]:**
"The wall is external to the ball system. It exerts a force on the ball (the impulse that
reversed it) without receiving equal momentum back — because the wall is fixed to the Earth.
The Earth's momentum changes by 60 kg·m/s — but Earth is so massive you don't notice.
'Isolated system' must include everything that exerts a net external force."

**Replacement [P31]:**
"Conservation of momentum requires NO net external force on the system.
For a collision on a frictionless surface between two free objects: isolated ✓.
Ball bouncing off a wall: wall + Earth must be included, or the ball alone is not isolated ✗.
Always define the system and check for external forces before applying conservation."

**Discrimination pairs [P33]:**
- Two pucks colliding on ice (frictionless): isolated, conservation applies ✓
- Ball bouncing off fixed wall: external force → conservation doesn't apply to ball alone ✓

**s6_path:** Defer the wall example; use only puck-on-ice scenarios where isolation is obvious.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to total momentum of a system.
P04: "Two ice skaters stand still at rest. They push each other. Both start moving.
Where did the momentum come from? Before: p_total = 0. After: they're moving. How?"
P06: "The key is the total. Skater A gains eastward momentum; Skater B gains exactly the same
amount westward. They cancel — total stays zero. Momentum didn't appear; it redistributed."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): "Before → After" bar diagram for a sticking collision:

```
Before:     p_A [========]  p_B [ ]       Total [========]
After:      p_AB  [====]                  Total [========]  ← same!
```

P08 (notation): Σp_before = Σp_after (isolated system).
Write the two-body form: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f.
Walk through Worked Examples 1 (sticking) and 2 (recoil/explosion).

P05: "This law has zero exceptions in classical mechanics. Rockets use it: they expel gas
backward so the rocket goes forward — no ground needed. It works in space."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2 consecutively.
Gap in PD-1 → repair Impulse (Δp with signs) before continuing.
Gap in PD-2 → repair Newton's 3rd Law before continuing.

P10: "Ball A: 2 kg, east 5 m/s hits Ball B: 3 kg, at rest. After: A moves east at 1 m/s. Find v_Bf."
P13: "p_before = 2×5 + 0 = 10. p_after = 2×1 + 3×v_Bf = 10. 3v_Bf = 8. v_Bf = 2.67 m/s east."

---

### TA-4 — MC-MOMENTUM-LOST Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A 5 kg cart (east, 6 m/s) hits a stationary 5 kg cart. They stick.
Before computing: does total momentum change? Estimate v_f."

Listen: if student says "yes, some momentum is lost" → MC-MOMENTUM-LOST confirmed.

P28 → P30 → P31 (full Misconception Engine MC-MOMENTUM-LOST sequence).

P33: 
"(a) Sticking: p_before = 30, p_after = 10×v_f = 30 → v_f = 3 m/s (total unchanged).
 (b) Explosion from rest: 4 kg east at 6 m/s + ? kg west: 4×6 + m×v = 0 → mv = 24."

P36: "A rifle recoils. Where does the bullet's momentum come from? Before firing, total p = 0.
After: bullet east, rifle west. What is the total p after firing?"
[Expected: still 0 — they are equal and opposite.]

---

### TA-5 — MC-INTERNAL-EXTERNAL Probe + System Definition [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P34

P14: "A 0.2 kg ball (east 10 m/s) bounces off a wall and returns west at 10 m/s.
Is momentum conserved for the ball-only system?"

Listen: if student says "yes — same speed" → MC-INTERNAL-EXTERNAL confirmed.

P28 → P30 → P31 (full Misconception Engine MC-INTERNAL-EXTERNAL sequence).

P34: "How do we define the system so that conservation holds here? What must we include?"
[Expected: ball + wall + Earth. Then p_ball changes by −4 kg·m/s; Earth's p changes by +4 kg·m/s. Total unchanged.]

P33: Puck-puck on ice (isolated) vs ball-wall (not isolated) ✓.

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Sticking collision:** 4 kg (east 8 m/s) + 6 kg (at rest) → stick together. v_f?
   [Answer: p = 32; v_f = 32/10 = 3.2 m/s east]
2. **Head-on:** 5 kg (east 10 m/s) + 3 kg (west 6 m/s). After: 5 kg at rest. v of 3 kg?
   [Answer: p = 50−18 = 32; 0 + 3v = 32 → v = 10.67 m/s east]
3. **Explosion:** 8 kg initially at rest splits: 3 kg goes west at 4 m/s. Other piece?
   [Answer: 3×(−4) + 5×v = 0 → v = +2.4 m/s east]
4. **Recoil:** 3 kg gun fires 0.015 kg bullet at 300 m/s east. Gun recoil speed?
   [Answer: 0.015×300 + 3×v = 0 → v = −1.5 m/s (west)]
5. **External force check:** 2 kg object (east 5 m/s) is hit by a wall and rebounds at 5 m/s.
   Is momentum of the 2 kg object conserved? Explain.
   [Answer: No — Δp = 2×(−5−5) = −20 N·s. Wall exerted external force. Total (object + Earth) is conserved.]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: Σp_before = Σp_after (isolated system). Momentum is transferred, never lost.
Newton's 3rd Law is why it works: internal forces cancel. Verify isolation before applying."

P62: "Next session: '6 kg (east 4 m/s) hits 2 kg (west 2 m/s). They stick. Find v_f and
check if momentum was conserved.'"

P85: "You correctly identified that the total — not just one object — is what conservation
tracks. That shift from 'one object' to 'system' thinking is the key skill in all collision problems."

P89: Log MC flags; record problem accuracy by type (sticking, explosion, recoil, head-on).

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — sticking):**
"A 2 kg cart (east 6 m/s) collides and sticks with a 4 kg cart at rest. Find v_f."
Expected: p = 12; v_f = 12/6 = 2 m/s east.
_Discriminates: basic conservation for inelastic collision._

**MP-2 (Apply — head-on):**
"Ball A: 3 kg east 8 m/s. Ball B: 2 kg west 3 m/s. After: A moves east at 2 m/s. Find v_Bf."
Expected: p_before = 24−6 = 18; p_after = 6 + 2v_Bf = 18 → v_Bf = 6 m/s east.
_Discriminates: vector signs in head-on collision._

**MP-3 (Apply — explosion from rest):**
"A 10 kg stationary device explodes: 3 kg piece goes west at 8 m/s. Find v of 7 kg piece."
Expected: 0 = 3×(−8) + 7×v → v = 24/7 ≈ 3.43 m/s east.
_Discriminates: explosion from zero total momentum._

**MP-4 (Apply — recoil):**
"A 4 kg gun fires 0.02 kg bullet at 500 m/s east. Gun recoil speed?"
Expected: 0.02×500 + 4×v = 0 → v = −2.5 m/s west.
_Discriminates: recoil; small mass × high speed = large mass × small speed._

**MP-5 (Analyze — isolation check):**
"Two ice pucks on a frictionless surface collide. Is momentum conserved? Why?
A puck hits a stationary wall. Is momentum conserved for the puck alone? Why not?"
Expected: Puck-puck: isolated (friction-free, no external horizontal force) → conserved.
Puck-wall: wall exerts external force → not conserved for puck alone.
_Discriminates: MC-INTERNAL-EXTERNAL resolution; conceptual reasoning._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "State the law of conservation of momentum. When does it apply?"
Threshold: "Σp_before = Σp_after" + "when no external net force / isolated system."

**FA-2 (TA-4 exit):** "4 kg (east 10) + 6 kg (at rest) → stick. v_f? Total p before = after?"
Expected: v_f = 4 m/s; p_before = 40 = p_after = 40. If student gets different total before vs after
without an external force → MC-MOMENTUM-LOST not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "Name one scenario where conservation of momentum does NOT apply
for the objects-only system." Expected: any collision with external force (wall, friction, gravity
without ground).

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only east-direction cases in TA-3 (no head-on until TA-5).
- Break into steps: (1) compute total p_before; (2) set = p_after; (3) solve for unknown.
- Start TA-6 with Problem 1 (sticking — simplest); skip Problem 5 if anxiety remains.
- Reassure: "One formula: total before = total after. Add up momenta, set equal."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (isolation check) at TA-3 before calculation problems.
- Challenge: "A 3-body explosion: 10 kg splits into 3 kg (east 8), 4 kg (north 3), and ?
  Find the third piece's velocity." (2D vector momentum — extends the lesson.)
- Advance quickly to recoil and explosion; spend TA-6 on Problems 4 and 5.

**S4 (Prereq gap):**
- PD-1 gap (Impulse) → repair signed Δp, J = FΔt before returning.
- PD-2 gap (Newton's 3rd) → repair action-reaction pairs, equal magnitude, opposite direction.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → Σp conservation → MC-MOMENTUM-LOST repair).
**Session 2 (≥24 h later):** Retrieval: "State conservation of momentum. When must you define
  the system carefully?" → TA-5 (MC-INTERNAL-EXTERNAL) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe combining conservation of momentum and energy:
  "4 kg (east 6) + 2 kg (at rest) → stick. Find v_f, p_before, p_after, KE_before, KE_after.
  Is KE conserved? (No — inelastic.) Is p conserved? (Yes.)"
  (Distinguishes conservation of momentum from conservation of energy.)
**Pre-collisions session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.impulse (J = Δp link), phys.mech.newtons-third-law
(why internal forces cancel), phys.mech.conservation-of-energy (what IS conserved vs not).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.conservation-of-momentum ✓
V-2   prerequisites listed and exist in KG: phys.mech.impulse,
      phys.mech.newtons-third-law ✓
V-3   bloom level consistent with difficulty 5/advanced: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 5h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: ice-skater push-off anchor ✓
V-8   ≥2 misconceptions engineered: MC-MOMENTUM-LOST, MC-INTERNAL-EXTERNAL ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: ice-skaters-push-off scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-MOMENTUM-LOST ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: impulse, newtons-third-law,
      conservation-of-energy ✓
V-19  cross_links match KG edges: collisions, conservation-of-energy,
      newtons-second-law ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
