# Teaching Blueprint — phys.mech.collisions

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.collisions
name:               Collisions
domain:             Classical Mechanics (Physics)
difficulty:         advanced (5)
bloom:              analyze
mastery_threshold:  0.85
estimated_hours:    5
prerequisites:      [phys.mech.conservation-of-momentum, phys.mech.kinetic-energy]
cross_links:        [phys.mech.conservation-of-energy, phys.mech.impulse]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (pool balls colliding — do they always bounce off, stick together,
                       or something in between? before elastic vs inelastic classification;
                       difficulty 5 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** All collisions conserve momentum (if isolated). They differ in whether kinetic
energy is also conserved. Elastic collisions conserve both p and KE; perfectly inelastic lose
maximum KE while objects stick together; partially inelastic are everything in between.
The classification determines which equations can be used.

**Three collision types:**

| Type | Momentum | KE | Example |
|------|----------|----|---------|
| Elastic | Conserved | Conserved | Pool balls, gas molecules |
| Perfectly inelastic | Conserved | Not conserved (minimum) | Cars locking, clay blob |
| Partially inelastic | Conserved | Not conserved | Most real collisions |

**Equations:**

*Perfectly inelastic:*
m₁v₁ᵢ + m₂v₂ᵢ = (m₁+m₂)v_f     (one unknown → solvable directly)

*Elastic (1D, two unknowns → two equations):*
m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f    (momentum)
½m₁v₁ᵢ² + ½m₂v₂ᵢ² = ½m₁v₁f² + ½m₂v₂f²   (KE)

Special result for elastic collision with equal masses (m₁ = m₂):
v₁f = v₂ᵢ, v₂f = v₁ᵢ    (velocities exchange — pool ball special case)

**KE lost in perfectly inelastic collision:**
ΔKE = KE_before − KE_after (always negative — energy goes to deformation/heat)

**Worked Example 1 (Perfectly inelastic):**
3 kg (east 6 m/s) + 5 kg (at rest) → stick.
v_f = (3×6)/(3+5) = 18/8 = 2.25 m/s east.
KE_before = ½×3×36 = 54 J. KE_after = ½×8×5.0625 = 20.25 J. KE lost = 33.75 J.

**Worked Example 2 (Elastic, equal mass):**
2 kg (east 5 m/s) hits 2 kg (at rest).
v₁f = 0 m/s (1st ball stops). v₂f = 5 m/s east (2nd ball takes all the speed).
Check KE: before = ½×2×25 = 25 J; after = ½×2×25 = 25 J. ✓ Conserved.

**Worked Example 3 (Elastic, unequal mass):**
4 kg (east 6 m/s) hits 2 kg (at rest).
System: 2 eqs, 2 unknowns. Using combined elastic formulas:
v₁f = (m₁−m₂)/(m₁+m₂) × v₁ᵢ = (4−2)/6 × 6 = 2 m/s east.
v₂f = 2m₁/(m₁+m₂) × v₁ᵢ = 8/6 × 6 = 8 m/s east.
Check p: 4×2 + 2×8 = 8+16 = 24 = 4×6. ✓

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.conservation-of-momentum  ──►
                                         phys.mech.collisions
phys.mech.kinetic-energy            ──►
```

**PD-1 (Conservation of momentum):**
"5 kg (east 4 m/s) + 3 kg (at rest) → stick. Find v_f."
Expected: v_f = 20/8 = 2.5 m/s east.

**PD-2 (KE prerequisite):**
"A 4 kg object moves at 3 m/s. KE?"
Expected: KE = ½×4×9 = 18 J.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-ELASTIC-ALWAYS (Priority 1)
**Label:** "All collisions are elastic — KE is always conserved"

**Trigger signals:**
- Applies the elastic KE equation to a clay-blob or car-crash scenario
- Says "energy is conserved so KE must be the same before and after"
- Computes v_f using both momentum and energy equations when objects stick (over-constrained)

**Conflict evidence [P28]:**
"Two 3 kg clay balls. Ball A: east 6 m/s. Ball B: at rest. They collide and stick.
Using momentum: v_f = 18/6 = 3 m/s east. KE_before = 54 J. KE_after = ½×6×9 = 27 J.
If KE were conserved, we'd need KE_after = 54 J → v_f = √18 = 4.24 m/s — NOT 3 m/s.
Only one equation can be correct. Which one? And where did 27 J go?"

**Bridge [P30]:**
"Conservation of energy (total) holds: the 27 J went into deforming the clay — heat,
sound, permanent deformation. Kinetic energy alone is not conserved. 'Elastic' is a
special case (bouncy ball, ideal gas). Most macroscopic collisions are inelastic."

**Replacement [P31]:**
"Elastic: p AND KE conserved → two equations, two unknowns.
Inelastic: p conserved, KE not conserved → use only momentum equation.
Perfectly inelastic (sticking): same as inelastic, but v₁f = v₂f = v_f → one equation."

**Discrimination pairs [P33]:**
- Pool ball strikes stationary: elastic (very bouncy, minimal deformation) → use both equations ✓
- Cars locking in crash: perfectly inelastic → momentum only ✓

**s6_path:** Start with perfectly inelastic only (one equation, no KE confusion); introduce elastic
in TA-5 only after the distinction is clear.

---

### MC-EQUAL-REBOUND (Priority 2)
**Label:** "In an elastic collision, objects always bounce back with the same speed they came in"

**Trigger signals:**
- Claims v₁f = −v₁ᵢ in all elastic collisions regardless of mass
- Says "it bounced back at 6 m/s because it hit at 6 m/s"
- Confused when the first ball slows (or stops) but doesn't reverse

**Conflict evidence [P28]:**
"A 4 kg ball (east 6) elastically hits a 2 kg stationary ball.
If v₁f = −6 m/s, check momentum: 4×(−6) + 2×v₂f = 24 → v₂f = 24 m/s.
Check KE: ½×4×36 + ½×2×576 = 72+576 = 648 J ≠ 72 J original. KE not conserved.
Using the correct formulas: v₁f = 2 m/s east (slows), v₂f = 8 m/s east (fast). Check: p=24✓, KE=72✓."

**Bridge [P30]:**
"Equal rebound speed is only correct for equal-mass elastic collisions. For unequal masses,
the heavier ball barely slows; the lighter ball can receive many times the incoming speed.
The specific outcome depends on the mass ratio — you must use the formulas."

**Replacement [P31]:**
"For equal masses: v₁f = v₂ᵢ and v₂f = v₁ᵢ — velocities exchange.
For unequal masses: v₁f = (m₁−m₂)/(m₁+m₂) × v₁ᵢ; v₂f = 2m₁/(m₁+m₂) × v₁ᵢ.
Verify by checking both momentum AND KE after computing."

**Discrimination pairs [P33]:**
- Equal mass elastic: velocities exchange — 1st stops, 2nd moves at 1st's speed ✓
- m₁ >> m₂ elastic: heavy ball barely changes; light ball flies off at ≈ 2v₁ᵢ ✓
- m₁ << m₂ elastic: light ball bounces back at ≈ −v₁ᵢ (nearly equal rebound — exception!) ✓

**s6_path:** Start with the equal-mass case only (clean velocity exchange); defer unequal-mass
elastic to TA-5 after the student is comfortable with the algebra.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Open session; orient to collision variety.
P04: "Pool balls bounce off each other cleanly. Two cars in a crash lock together. A bullet
embeds in a sandbag. All three are collisions — but they behave very differently. What's different?"
P06: "The difference is what happens to kinetic energy. In all three, momentum is conserved.
But kinetic energy behaves differently in each case. We'll classify and calculate all three types."

---

### TA-2 — Modality / Formula Introduction [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Three-scenario side-by-side table (see Component 1 table) + energy bar diagrams:

```
Elastic:            KE [====]  →  KE [====]   (unchanged)
Perfectly inelastic: KE [====]  →  KE [==]    (half lost)
Partially inelastic: KE [====]  →  KE [===]   (some lost)
```

P08 (notation): Present the three equation sets. Special case: equal-mass elastic.
Walk through Worked Examples 1 (perfectly inelastic) and 2 (elastic, equal mass).

P05: "In real engineering: car crash analysis uses perfectly inelastic formulas (cars lock).
Billiard ball calculations use elastic formulas. Choosing the wrong type gives completely wrong answers."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2 consecutively.
Gap in either → repair before continuing.

P10 (perfectly inelastic): "6 kg (east 10 m/s) + 4 kg (west 5 m/s) → stick together. v_f?
KE_before? KE_after? KE lost?"
P13: "p_before = 60−20 = 40. v_f = 40/10 = 4 m/s east. KE_before = 300+50 = 350 J.
KE_after = ½×10×16 = 80 J. KE lost = 270 J."

---

### TA-4 — MC-ELASTIC-ALWAYS Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Two 3 kg clay balls. A: east 6 m/s. B: at rest. They stick together.
Is KE conserved in this collision? What equation set should you use?"

Listen: if student applies elastic equations or says KE is conserved → MC-ELASTIC-ALWAYS confirmed.

P28 → P30 → P31 (full Misconception Engine MC-ELASTIC-ALWAYS sequence).

P33: Pool ball (elastic, momentum + KE) vs clay collision (perfectly inelastic, momentum only).

P36: "In a real car crash, some KE becomes deformation energy, heat, sound. If this were elastic,
what would happen to the car? Would that be safer or more dangerous?"
[Expected: elastic → cars bounce off each other at high speed; inelastic → deformation absorbs energy, slows cars more.]

---

### TA-5 — MC-EQUAL-REBOUND Probe + Elastic Unequal Mass [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P13

P14: "A 4 kg ball (elastic, east 6 m/s) hits a stationary 2 kg ball.
Does the 4 kg ball bounce back? At what speed?"

Listen: if student says "6 m/s westward" → MC-EQUAL-REBOUND confirmed.

P28 → P30 → P31 (full Misconception Engine MC-EQUAL-REBOUND sequence).

P13 (walk through Worked Example 3): v₁f = 2 m/s east (forward, not backward).
v₂f = 8 m/s east. Verify p and KE.

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **Perfectly inelastic:** 5 kg (east 8 m/s) + 3 kg (at rest) → stick. v_f? KE lost?
   [Answer: v_f = 5 m/s; KE_before=160, KE_after=100, lost=60 J]
2. **Elastic, equal mass:** 2 kg (east 7 m/s) hits 2 kg (at rest). Both v after?
   [Answer: v₁f = 0, v₂f = 7 m/s east]
3. **Elastic, unequal:** 6 kg (east 10 m/s) hits 2 kg (at rest). Both v after?
   [Answer: v₁f = (6−2)/8 × 10 = 5 m/s east; v₂f = 12/8 × 10 = 15 m/s east]
4. **Head-on perfectly inelastic:** 4 kg (east 6 m/s) + 4 kg (west 4 m/s) → stick. v_f?
   [Answer: p = 24−16 = 8; v_f = 8/8 = 1 m/s east]
5. **Classify and solve:** 3 kg (east 5 m/s) hits 3 kg (at rest). After: 3 kg at 1 m/s east.
   What is the other ball's v? Was this elastic, partially inelastic, or perfectly inelastic?
   [Answer: p → v₂f = 4 m/s east. KE_before=37.5J, KE_after=1.5+24=25.5J. Not elastic. Not perfectly inelastic (didn't stick). Partially inelastic.]

P51, P52, P55, P54 (standard protocol).

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: 3 collision types. ALL conserve momentum. Elastic: also conserves KE (two equations).
Perfectly inelastic: objects stick, one equation. KE lost = goes to heat/deformation.
Verify type before choosing equations."

P62: "Next session: 'A 5 kg cart (east 6 m/s) hits a 5 kg cart (at rest) and they stick.
Compute v_f, KE_before, KE_after, and state the collision type.'"

P85: "You correctly classified each collision before choosing equations — that's the critical
skill. The math is easy once the type is identified; the classification is where most students fail."

P89: Log MC flags; record accuracy by collision type; note elastic-unequal-mass performance.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — perfectly inelastic):**
"A 4 kg ball (east 10 m/s) collides and sticks with a 6 kg ball at rest. Find v_f and KE lost."
Expected: v_f = 40/10 = 4 m/s east. KE_before = 200 J; KE_after = ½×10×16 = 80 J. KE lost = 120 J.
_Discriminates: standard perfectly inelastic calculation + energy analysis._

**MP-2 (Apply — elastic equal mass):**
"A 3 kg ball (east 8 m/s) elastically strikes a stationary 3 kg ball. Find both final velocities."
Expected: v₁f = 0, v₂f = 8 m/s east.
_Discriminates: MC-EQUAL-REBOUND resolution; equal-mass special case._

**MP-3 (Apply — elastic unequal mass):**
"A 2 kg ball (east 6 m/s) elastically strikes a stationary 6 kg ball. Find both final velocities."
Expected: v₁f = (2−6)/8 × 6 = −3 m/s (west); v₂f = 4/8 × 6 = 3 m/s east.
_Discriminates: lighter hitting heavier → lighter bounces back; unequal mass formula._

**MP-4 (Analyze — classify from data):**
"Before: 5 kg (east 4 m/s) + 3 kg (at rest). After: 5 kg (east 1 m/s) + 3 kg (east 5 m/s).
Was this elastic, perfectly inelastic, or partially inelastic? Show evidence."
Expected: p_before=20, p_after=5+15=20 ✓ (momentum conserved). KE_before=40J, KE_after=2.5+37.5=40J ✓ (KE conserved). ELASTIC.
_Discriminates: working backward from data to classify; checks both conservation laws._

**MP-5 (Analyze — energy loss calculation):**
"A 2 kg ball (east 10 m/s) hits a 4 kg ball (at rest). They stick. How much KE is converted
to other forms? What fraction of the original KE is lost?"
Expected: v_f = 20/6 = 10/3 m/s. KE_before = 100 J; KE_after = ½×6×(10/3)² = 100/3 ≈ 33.3 J.
Lost = 66.7 J ≈ 2/3 of original. Fraction: 1 − m₁/(m₁+m₂) = 1 − 2/6 = 2/3.
_Discriminates: full KE loss analysis including fraction; MC-ELASTIC-ALWAYS resolution._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Name the three collision types. Which conserves KE?"
Threshold: Elastic, perfectly inelastic, partially inelastic; only elastic conserves KE.

**FA-2 (TA-4 exit):** "Two cars crash and lock together. Which equation(s) do you use? KE conserved?"
Expected: Momentum only (m₁v₁+m₂v₂ = (m₁+m₂)v_f); KE not conserved (inelastic).
If student applies elastic equations → MC-ELASTIC-ALWAYS not resolved → loop back to P31.

**FA-3 (TA-5 exit):** "A 6 kg ball (east 5 m/s) elastically hits a stationary 6 kg ball.
What are the final velocities?" Expected: v₁f = 0, v₂f = 5 m/s east.
If student says both bounce → MC-EQUAL-REBOUND not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-4. 3/3 correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Perfectly inelastic only in TA-3 and TA-4. Elastic deferred to TA-5.
- Within elastic: equal-mass first (only one special result to remember); unequal mass last.
- Break elastic into: "step 1 — is it elastic? step 2 — are masses equal? step 3 — use the formula."
- Reassure: "Perfectly inelastic is one equation. Elastic adds only one more. Build up gradually."

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-4 (backward classification from data) at TA-3.
- Challenge: "In an elastic collision between a ball and a wall (wall mass → ∞),
  show that v₁f = −v₁ᵢ (ball reverses at same speed)." (Uses unequal mass formula as m₂ → ∞.)
- Spend TA-6 on Problems 3, 5, and the fraction-of-KE-lost derivation.

**S4 (Prereq gap):**
- PD-1 gap (Conservation of momentum) → repair Σp_before = Σp_after before returning.
- PD-2 gap (KE) → repair KE = ½mv² before returning.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete classification → perfectly inelastic → MC-ELASTIC-ALWAYS repair).
**Session 2 (≥24 h later):** Retrieval: "Three types of collisions — which equations for each?"
  → TA-5 (MC-EQUAL-REBOUND, elastic unequal mass) → TA-6 (Problem set).
**Session 3 (≥72 h later):** Interleaved probe:
  "Two collisions: (A) 4 kg east 8 m/s hits 4 kg at rest — elastic.
   (B) 4 kg east 8 m/s hits 4 kg at rest — they stick.
   For each: find v_f, total KE after, and KE lost. Compare."
  (Forces simultaneous application of both collision types; highlights the KE difference.)
**Pre-rotational-cluster session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.conservation-of-momentum (all collisions conserve p),
phys.mech.kinetic-energy (elastic collisions also conserve KE), phys.mech.impulse (J = Δp during collision).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.collisions ✓
V-2   prerequisites listed and exist in KG: phys.mech.conservation-of-momentum,
      phys.mech.kinetic-energy ✓
V-3   bloom level consistent with difficulty 5/advanced: analyze ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 5h for advanced ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: pool-ball / crash / bullet anchor ✓
V-8   ≥2 misconceptions engineered: MC-ELASTIC-ALWAYS, MC-EQUAL-REBOUND ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: pool-ball / crash / bullet-in-sandbag scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]: MC-ELASTIC-ALWAYS ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: conservation-of-momentum, kinetic-energy, impulse ✓
V-19  cross_links match KG edges: conservation-of-energy, impulse ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
