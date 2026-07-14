# Teaching Blueprint — phys.mech.conservation-of-angular-momentum

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.conservation-of-angular-momentum
name:               Conservation of Angular Momentum
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    4
prerequisites:      [phys.mech.angular-momentum]
cross_links:        [phys.mech.conservation-of-momentum, phys.mech.moment-of-inertia,
                     phys.mech.rolling-motion]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a figure skater spinning slowly with arms out, then pulling
                       arms in — she speeds up dramatically; where did the extra
                       angular speed come from? before L = Iω = constant;
                       difficulty 5 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** When the net external torque on a system is zero, the total angular momentum
is conserved. This explains phenomena ranging from figure skating to planetary formation to
pulsars. Unlike linear momentum conservation, angular momentum can be redistributed within the
same object by changing its moment of inertia.

**Formal Statement:**
If Σ τ_external = 0:
L_total = constant
I_i ω_i = I_f ω_f    (for a single body changing shape)
Σ I_i ω_i (before) = Σ I_i ω_i (after)    (for a system of bodies)

**Key properties:**
- Internal forces/torques cannot change the total L (Newton's 3rd applies in rotation too).
- An object can change its own ω by redistributing mass (changing I) with zero external torque.
- This is distinct from linear momentum conservation: a body can change its own ω just by
  restructuring (a skater can't change her own linear speed without an external force).
- KE is NOT generally conserved when I changes (skater does internal work pulling arms in).

**Worked Example 1 (Figure skater — single body):**
Skater: I_i = 4 kg·m², ω_i = 2 rad/s. Arms pulled in: I_f = 1 kg·m².
L conserved: I_i ω_i = I_f ω_f → 4×2 = 1×ω_f → ω_f = 8 rad/s.
KE_i = ½×4×4 = 8 J. KE_f = ½×1×64 = 32 J. Skater did 24 J of internal work.

**Worked Example 2 (Two-body system):**
A spinning disc (I_d = 3 kg·m², ω_d = 10 rad/s) catches a non-rotating ring (I_r = 1 kg·m²).
L_before = 3×10 = 30 kg·m²/s.
L_after = (3+1)×ω_f = 30 → ω_f = 7.5 rad/s.

**Worked Example 3 (Astrophysical — collapsing star):**
A star collapses: R shrinks by factor 10 → I shrinks by factor 100 (I ∝ R²).
L conserved: ω increases by factor 100.
(Pulsar periods ~ms explain why rapidly-rotating neutron stars exist.)

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.angular-momentum  ──────────────►  phys.mech.conservation-of-angular-momentum
   (L = Iω; τ = ΔL/Δt; understanding that zero torque → constant L)
   REQUIRED: student can compute L and angular impulse
```

**PD-1 (Angular momentum prerequisite):**
"A disc (I = 2 kg·m², ω = 6 rad/s). L?"
Expected: L = 12 kg·m²/s.

If student cannot compute L → prerequisite repair before TA-3.

---

## Component 3 — Misconception Engine

### MC-ANGULAR-SPEED-FREE (Priority 1)
**Label:** "A spinning skater speeds up because she is pushing off the ice or exerting an external force"

**Trigger signals:**
- Says the skater speeds up because she "pushed off" or "the ice pushed her"
- Thinks an external torque is required for the skater to spin faster
- Cannot explain the source of increased ω without inventing an external agent

**Conflict evidence [P28]:**
"The skater spins on frictionless ice (nearly zero external torque on her rotation axis).
She pulls her arms in. ω increases dramatically. But no external torque acted.
If external torque caused the speed-up, where is it? The ice can't provide torque about her vertical axis.
What DID change?"

**Bridge [P30]:**
"L = Iω = constant (no external torque). The skater changed her own I by pulling her arms in
(mass moved closer to the axis → smaller I). With L constant, smaller I forces larger ω.
No external agent needed — she redistributed her own mass. Internal forces suffice to change
I (and thus ω), though they cannot change L."

**Replacement [P31]:**
"Conservation of angular momentum: L = Iω = constant when τ_external = 0.
Changing ω requires changing I — achieved by redistributing mass (arms in/out).
The increase in ω has a definite source: it's the reciprocal change in I. No external torque needed."

**Discrimination pairs [P33]:**
- Skater pulls arms in: I decreases → ω increases, L unchanged ✓
- Skater extends arms: I increases → ω decreases, L unchanged ✓

**s6_path:** Use the L = Iω equation as a number puzzle first: "if I halves, ω doubles — just
algebra." Build the mechanics-explanation only after the arithmetic is secure.

---

### MC-KE-CONSERVED-ROTATION (Priority 2)
**Label:** "Conservation of angular momentum also means rotational KE is conserved"

**Trigger signals:**
- Says "energy is always conserved so KE must stay the same when I changes"
- Computes ω_f using both L conservation AND KE conservation (over-constrained — wrong)
- Surprised that KE increased when the skater pulled her arms in

**Conflict evidence [P28]:**
"Skater: I_i = 4, ω_i = 2. I_f = 1 (arms in). L conserved → ω_f = 8.
KE_i = ½×4×4 = 8 J. KE_f = ½×1×64 = 32 J. KE increased 4×.
If KE were conserved, we'd need ½×4×4 = ½×1×ω_f² → ω_f = 4 rad/s. NOT consistent with L
conservation. Which law governs here — and what explains the extra KE?"

**Bridge [P30]:**
"KE is not conserved when I changes because the skater does internal work pulling her arms in
against centrifugal tendency. Total energy IS conserved: extra KE = work done by skater's muscles.
Conservation of angular momentum is the rule when τ_external = 0; KE is not automatically conserved."

**Replacement [P31]:**
"When I changes with no external torque: use ONLY L = I_i ω_i = I_f ω_f.
Do NOT assume KE is conserved — it generally isn't. ΔKE = internal work done.
Compare: in linear momentum conservation during perfectly inelastic collision: p conserved, KE not."

**Discrimination pairs [P33]:**
- Disc catches ring (two-body): L conserved, KE decreases (some becomes heat/deformation) ✓
- Skater pulls arms in: L conserved, KE increases (internal muscle work done) ✓

**s6_path:** Defer the KE analysis to a single statement: "KE changes when I changes — the
skater's muscles do work. We'll compute only L conservation." Don't attempt KE calculation until
MC-ANGULAR-SPEED-FREE is resolved.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to angular momentum as a conserved quantity.
P04: "A figure skater spins slowly with arms out. She pulls them in — she spins extremely fast.
No one pushed her. The ice exerted no extra force. Where did the extra angular speed come from?"
P06: "Her angular momentum L = Iω was constant throughout. Pulling in her arms reduced I.
With L fixed, ω had to increase to compensate. No external torque — just redistribution."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Energy bar diagram for the skater showing I and ω trading off while L bar stays constant:

```
Arms out:  I [====]   ω [=]     L [====]
Arms in:   I [=]     ω [====]   L [====]   ← L unchanged
```

P08 (notation): L = constant → I_i ω_i = I_f ω_f (single body).
Σ I_iω_i (before) = Σ I_iω_i (after) (system).
Condition: Σ τ_external = 0. Walk through Worked Examples 1 and 2.

P05: "This law has zero exceptions in rotational mechanics. Spinning pulsars, ballet dancers,
divers in tucks, planetary disc formation — all explained by L conservation."

---

### TA-3 — Prerequisite Check + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41 (diagnostic): Present PD-1 (angular momentum).
P34: "I = 2 kg·m², ω = 6 rad/s → L?" If gap → repair L = Iω first.

P10: "A dancer (I_i = 3 kg·m², ω_i = 4 rad/s) pulls arms in to I_f = 0.75 kg·m². Find ω_f."
P13: "L_i = 3×4 = 12. I_f ω_f = 12 → ω_f = 12/0.75 = 16 rad/s. (4× the original speed.)"

---

### TA-4 — MC-ANGULAR-SPEED-FREE Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A skater (I_i = 5 kg·m², ω_i = 3 rad/s) pulls arms in to I_f = 1 kg·m².
She is on frictionless ice. No one touches her. Before computing: why does she speed up?"

Listen: if student invents external force/torque → MC-ANGULAR-SPEED-FREE confirmed.

P28 → P30 → P31 (full Misconception Engine MC-ANGULAR-SPEED-FREE sequence).

P33: "With arms out (I = 5, ω = 3): L = 15. Arms in (I = 1): ω = 15. 5× faster without any
external force." Verify: I_i ω_i = I_f ω_f = 15. ✓

P36: "A collapsing star shrinks its radius by factor of 10. By what factor does ω change?
(I ∝ R², so I reduces by 100 → ω increases by 100.)" [Stars become pulsars.]

---

### TA-5 — MC-KE-CONSERVED-ROTATION Probe + Two-Body System [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "Skater (I_i = 4 kg·m², ω_i = 2 rad/s) pulls in to I_f = 1 kg·m². L conserved → ω_f = 8.
Is KE conserved? Compute KE before and after."

Listen: if student claims KE is conserved and gets ω_f = 4 → MC-KE-CONSERVED-ROTATION confirmed.

P28 → P30 → P31 (full Misconception Engine MC-KE-CONSERVED-ROTATION sequence).

P10 (two-body): "Disc (I_d = 5 kg·m², ω = 8 rad/s) + ring dropped on it (I_r = 3 kg·m², ω = 0).
They spin together. ω_f? KE lost?"
P13: "L_before = 40. (5+3)ω_f = 40 → ω_f = 5 rad/s.
KE_before = ½×5×64 = 160; KE_after = ½×8×25 = 100. KE lost = 60 J (→ heat/deformation)."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Single body:** Diver (I_i = 6 kg·m², ω_i = 1.5 rad/s) tucks to I_f = 0.5 kg·m². ω_f?
   [Answer: L = 9; ω_f = 18 rad/s]
2. **Two-body (spin together):** Turntable (I_t = 8 kg·m², ω = 4 rad/s) + dropped weight
   (I_w = 2 kg·m², ω = 0). ω_f?
   [Answer: L = 32; (8+2)ω_f = 32 → ω_f = 3.2 rad/s]
3. **KE change:** For Problem 2 above, compute KE before and after. Energy change?
   [Answer: KE_before = ½×8×16 = 64 J; KE_after = ½×10×10.24 = 51.2 J. Lost 12.8 J]
4. **Find I_f:** A star (I_i = 10³⁸ kg·m², ω_i = 10⁻⁵ rad/s) collapses. ω_f = 10³ rad/s.
   Find I_f. [Answer: L constant → I_f = I_i × ω_i/ω_f = 10³⁸ × 10⁻⁸ = 10³⁰ kg·m²]
5. **Reverse: arms out:** Skater at ω = 12 rad/s (I = 0.8 kg·m²) extends arms to I = 3.2 kg·m². ω_f?
   [Answer: L = 9.6; ω_f = 9.6/3.2 = 3 rad/s (slows 4×)]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: L = Iω = constant when Σ τ_external = 0. Changing I changes ω inversely.
KE is NOT generally conserved (internal work done or lost). Two-body: Σ L_before = Σ L_after."

P62: "Next session: 'A diver (I_i = 8, ω_i = 1) tucks to I_f = 2. ω_f? KE before and after?'"

P85: "You correctly derived that no external torque is needed — just redistribution of I.
That's the conceptual leap that unlocks every conservation-of-angular-momentum application."

P89: Log MC flags; record accuracy; note KE-change calculation performance.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — single body):**
"A skater (I_i = 6 kg·m², ω_i = 2 rad/s) pulls arms in to I_f = 1.5 kg·m². No external torque.
Find ω_f."
Expected: L = 12; ω_f = 12/1.5 = 8 rad/s.
_Discriminates: basic conservation with changing I._

**MP-2 (Apply — two-body sticking):**
"A rotating disc (I_d = 4 kg·m², ω = 6 rad/s) has a ring (I_r = 2 kg·m², ω = 0) dropped on it.
Find ω_f."
Expected: L = 24; ω_f = 24/6 = 4 rad/s.
_Discriminates: two-body L conservation; analogous to perfectly inelastic linear collision._

**MP-3 (Apply — KE analysis):**
"For MP-1 above: compute KE before and after. What happened to KE?"
Expected: KE_i = ½×6×4 = 12 J; KE_f = ½×1.5×64 = 48 J. KE increased by 36 J (muscle work).
_Discriminates: MC-KE-CONSERVED-ROTATION resolution._

**MP-4 (Apply — find I):**
"A ballerina's angular momentum is 10 kg·m²/s. Arms out: ω = 2 rad/s. Arms in: ω = 5 rad/s.
Find I with arms out and arms in."
Expected: I_out = 10/2 = 5 kg·m²; I_in = 10/5 = 2 kg·m².
_Discriminates: algebraic rearrangement; L conservation verifiable._

**MP-5 (Analyze — physical explanation):**
"A neutron star forms from a collapsing gas cloud. The star rotates much faster than the original
cloud. Use conservation of angular momentum to explain this qualitatively AND quantitatively
if R decreases by a factor of 10⁵."
Expected: Qualitative: I ∝ R² → smaller R → smaller I → same L → larger ω.
Quantitative: R/10⁵ → I/10¹⁰ → ω increases by factor 10¹⁰.
_Discriminates: MC-ANGULAR-SPEED-FREE resolution; applying L conservation to astrophysics._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "When is angular momentum conserved? Write the condition."
Threshold: "When Σ τ_external = 0" (no net external torque).

**FA-2 (TA-4 exit):** "Skater (I_i = 3, ω_i = 4) pulls to I_f = 1. ω_f? What caused the speed-up?"
Expected: ω_f = 12 rad/s; caused by decrease in I (redistribution of mass) with L = constant.
If student says "external force" → MC-ANGULAR-SPEED-FREE not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "Skater above: KE_i = ? KE_f = ? Is KE conserved?"
Expected: KE_i = ½×3×16 = 24 J; KE_f = ½×1×144 = 72 J. KE NOT conserved (muscles did 48 J of work).

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only the I_i ω_i = I_f ω_f equation; present as direct proportion-inversion.
- Defer KE analysis to a second session; label it "optional extension."
- Reassure: "One equation: L = constant. The only question is: what is I_i? What is I_f? Then solve."
- Skip two-body system in TA-5 on first pass if anxiety is high.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-5 (astrophysical application) at TA-3.
- Challenge: "Two ice dancers, connected by a cord, circle each other at ω = 2 rad/s.
  They pull the cord in, halving their separation. What is ω_f? (Each is a point mass m at r.)"
  (I = 2mr²; L conserved → ω_f = 4ω_i = 8 rad/s. Also: KE quadruples — where from? Cord tension work.)
- Spend TA-6 on Problem 4 (find I_f) and Problem 3 (KE analysis).

**S4 (Prereq gap — Angular momentum):**
- Detect via PD-1 failure at TA-3.
- Repair: L = Iω, τ = ΔL/Δt before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → L = I_iω_i = I_fω_f → MC-ANGULAR-SPEED-FREE repair).
**Session 2 (≥24 h later):** Retrieval: "When is L conserved? One example."
  → TA-5 (MC-KE-CONSERVED, two-body) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe:
  "Compare linear and angular conservation:
   (a) A perfectly inelastic linear collision: p conserved, KE not.
   (b) A rotating object pulls its mass in: L conserved, KE not (muscle work).
   In both cases: what IS conserved, what ISN'T, and why?"
  (Crystallises the distinction between momentum conservation and energy conservation.)
**Pre-rolling-motion session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.angular-momentum (L = Iω), phys.mech.conservation-of-momentum
(structural analogy — both depend on no external force/torque).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.conservation-of-angular-momentum ✓
V-2   prerequisites listed and exist in KG: phys.mech.angular-momentum ✓
V-3   bloom level consistent with difficulty 5/advanced: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 4h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: figure-skater anchor ✓
V-8   ≥2 misconceptions engineered: MC-ANGULAR-SPEED-FREE,
      MC-KE-CONSERVED-ROTATION ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: figure-skater arms-in scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]:
      MC-ANGULAR-SPEED-FREE ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: angular-momentum,
      conservation-of-momentum ✓
V-19  cross_links match KG edges: conservation-of-momentum, moment-of-inertia,
      rolling-motion ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
