# Teaching Blueprint — phys.opt.lens-power

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.lens-power
name: "Lens Power and Optical Instruments Basics"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.opt.lenses
mastery_threshold: 0.80
estimated_hours: 3
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

An optometrist's prescription says "−2.5 diopters" or "+3.0 diopters" — these numbers are the power of a lens. Power measures how strongly a lens bends light: a high-power (high-diopter) lens bends light a lot; low power bends it a little. Positive power means the lens converges light (convex); negative power means it diverges (concave). The convenient thing about diopters is that you can add them: if you stack two lenses in contact, their powers add directly. This is why your eye has a total optical system power of about 60 diopters — combining the cornea (~43 D) and crystalline lens (~17 D).

### Level 2 — Developing Understanding

**Power of a lens:**

**P = 1/f**

Where f is the focal length in metres. Units: diopters (D) = m⁻¹.

| Focal length | Power |
|-------------|-------|
| f = +2 m | P = +0.5 D |
| f = +0.5 m | P = +2 D |
| f = +0.1 m | P = +10 D |
| f = −0.25 m | P = −4 D (concave/diverging) |

**Sign convention:**
- Converging (convex) lens: f > 0 → P > 0
- Diverging (concave) lens: f < 0 → P < 0

**Lensmaker's equation:**
P = 1/f = (n − 1)[1/R₁ − 1/R₂]

Where n = refractive index of lens material, R₁ = radius of curvature of first surface (positive if center of curvature is on transmission side), R₂ = radius of curvature of second surface.

**Thin lenses in contact — combined power:**
P_total = P₁ + P₂

Or equivalently: 1/f_total = 1/f₁ + 1/f₂

**Important limitation:** This formula applies ONLY to thin lenses in contact (separation d = 0). For separated lenses:
1/f_eff = 1/f₁ + 1/f₂ − d/(f₁f₂)

**Angular magnification:**
For an optical instrument, the angular magnification is M = θ'/θ where θ is the angle subtended by the object at the unaided eye and θ' is the angle subtended by the image through the instrument.

For a simple magnifier (converging lens) with object at the near point D = 25 cm (least distance of distinct vision):
- When image at ∞: m = D/f = 25/f (f in cm)
- When image at near point D: m = 1 + D/f

### Level 3 — Proficient Synthesis

**Accommodation and the human eye:**
The cornea has fixed power ~43 D. The crystalline lens is flexible: ciliary muscles change its curvature → power range 17–33 D. Total eye power range: 60–76 D.
- Near point: closest point of clear vision (25 cm for normal eye)
- Far point: farthest point of clear vision (∞ for normal eye)

**Defects of vision and correction:**

| Defect | Description | Cause | Correction |
|--------|-------------|-------|------------|
| Myopia (near-sightedness) | Distant objects blurred; near objects clear | Eyeball too long or lens too curved; image forms in front of retina | Concave (diverging) lens; P = 1/f_correction = 1/f_far_point − 1/∞ |
| Hypermetropia (far-sightedness) | Near objects blurred; distant objects may be clear | Eyeball too short or lens too flat; image forms behind retina | Convex (converging) lens |
| Presbyopia | Loss of accommodation with age; both distances blur | Ciliary muscles weaken | Bifocals or progressive lenses |

**Corrective lens power for myopia:**
A person with far point at d_far (where d_far < ∞):
Corrective lens: P = −1/d_far (in diopters, d_far in metres) — a concave lens that makes parallel rays appear to diverge from d_far.

**Corrective lens power for hypermetropia:**
A person whose near point is at d_near (where d_near > 25 cm):
Corrective lens: P = 1/0.25 − 1/d_near (so that the lens makes an object at 25 cm appear at d_near).

---

## Component 2 — Worked Examples

### WE-1: Combined Power

**Problem:** Two thin lenses are placed in contact: a converging lens with f₁ = 30 cm and a diverging lens with f₂ = −20 cm.
(a) Find the power of each lens.
(b) Find the combined power and equivalent focal length.
(c) Is the combination converging or diverging?

**Solution:**

**(a) Individual powers:**
P₁ = 1/f₁ = 1/0.30 m = **+3.33 D**
P₂ = 1/f₂ = 1/(−0.20 m) = **−5.00 D**

**(b) Combined:**
P_total = P₁ + P₂ = 3.33 + (−5.00) = **−1.67 D**
f_total = 1/P_total = 1/(−1.67) = **−0.60 m = −60 cm**

**(c) Type:** P_total < 0 → **Diverging combination** (the concave lens dominates).

---

### WE-2: Corrective Lens for Myopia

**Problem:** A myopic person can see clearly only up to 50 cm. They want to see objects at infinity.
(a) What is the required power of the corrective lens?
(b) What type of lens is this?
(c) With this lens, where will an object at 25 cm appear?

**Solution:**

**(a) Corrective power:**
The corrective lens must make parallel rays (from ∞) appear to diverge from 50 cm (the person's far point).
Object at ∞ (u = −∞), image at −50 cm (virtual, at far point; in NC convention v = −0.50 m since it's on the same side as the object = virtual).

Using lens formula: 1/v − 1/u = 1/f
1/(−0.50) − 1/(−∞) = 1/f
−2.00 − 0 = 1/f
**P = 1/f = −2.00 D**

**(b) Type:** Negative power → **Concave (diverging) lens** ✓

**(c) Object at 25 cm (u = −0.25 m):**
1/v = 1/f + 1/u = −2.00 + 1/(−0.25) = −2.00 − 4.00 = −6.00
v = −1/6.00 = **−0.167 m = −16.7 cm**

The image of the 25 cm object appears at 16.7 cm from the lens (virtual, still within far point) — so the person CAN see this object clearly with the corrective lens.

---

### WE-3: Simple Magnifier

**Problem:** A converging lens of focal length f = 5 cm is used as a simple magnifier (reading glass).
(a) Find the magnification when the image is formed at infinity (relaxed eye).
(b) Find the magnification when the image is at the near point (D = 25 cm).
(c) If the lens has n = 1.5 and both surfaces are convex with equal radii R, find R.

**Solution:**

**(a) Image at infinity:**
m = D/f = 25 cm / 5 cm = **m = 5×**

**(b) Image at near point:**
m = 1 + D/f = 1 + 25/5 = 1 + 5 = **m = 6×**

**(c) Lensmaker's equation for equal biconvex lens (R₁ = R, R₂ = −R):**
1/f = (n − 1)[1/R₁ − 1/R₂] = (1.5 − 1)[1/R − 1/(−R)] = 0.5 × [1/R + 1/R] = 0.5 × 2/R = 1/R
f = R
R = f = 5 cm

**R = 5 cm** (both surfaces have radius of curvature 5 cm).

---

## Component 3 — Misconception Engine

### MC-1: MC-POWER-ADDS-FOR-SEPARATED-LENSES

**trigger_signal:** Student applies P_total = P₁ + P₂ for lenses with a gap between them.

**conflict_evidence [P28]:** Two lenses f₁ = f₂ = +10 cm separated by d = 5 cm. Using P_total = P₁ + P₂ = 10 + 10 = 20 D → f = 5 cm. Correct formula: 1/f = 1/10 + 1/10 − 5/(10×10) = 0.1 + 0.1 − 0.05 = 0.15 → f = 6.67 cm. The simple addition gives 5 cm, the correct answer is 6.67 cm — a 33% error. For a telescope eyepiece (5 cm separation of two 20 cm lenses), this error causes completely wrong predictions about image quality. The P₁ + P₂ formula explicitly assumes d = 0 in its derivation.

**bridge_text [P30]:** The combination formula derives from tracing where the ray from the first lens hits the second. When the lenses touch (d = 0), the refracted ray exits lens 1 and immediately enters lens 2 at the same height. When separated, the ray travels to a different height at lens 2, changing the effective power. The d/(f₁f₂) correction term accounts for this height change.

**replacement_text [P31]:** P_total = P₁ + P₂ applies ONLY for thin lenses in contact (d = 0). For separated lenses: 1/f_eff = 1/f₁ + 1/f₂ − d/(f₁f₂), or equivalently P_eff = P₁ + P₂ − d×P₁×P₂. Always check whether the problem specifies lenses "in contact" before using P_total = P₁ + P₂.

**discrimination_pairs [P33]:**
- "Two lenses with focal lengths 15 cm and 20 cm are 5 cm apart. Equivalent focal length = 1/(1/15 + 1/20 − 5/(15×20)) = 1/(0.0667 + 0.05 − 0.01667) = 1/0.10 = 10 cm." → CORRECT application of the separated-lens formula.
- "Two lenses in contact: f₁ = +25 cm, f₂ = −50 cm. Combined power = 4 + (−2) = 2 D, f = 50 cm." → CORRECT application (lenses in contact).

**s6_path:** If student applies addition for separated lenses → numerical counterexample (calculate both answers, show discrepancy) before mastery gate.

---

### MC-2: MC-HIGHER-POWER-MEANS-STRONGER-LENS-ALWAYS

**trigger_signal:** Student states "a −5 D lens is stronger than a +2 D lens" without distinguishing sign from magnitude.

**conflict_evidence [P28]:** A −5 D lens has f = −20 cm — it diverges light strongly. A +2 D lens has f = +50 cm — it converges light weakly. Which is "stronger"? If "stronger" means "bends light more," then |P| = 5 > |P| = 2 → the −5 D lens bends light more. But the nature of the bending is opposite: −5 D diverges, +2 D converges. In corrective optics, a −5 D myopia prescription corrects greater short-sightedness than a −2 D prescription — so the sign matters for the type of correction.

**bridge_text [P30]:** Power has two independent pieces of information: (1) the sign tells the direction of bending (+ = converging, − = diverging); (2) the magnitude tells how much bending. "Strength" should specify which property you mean. In a prescription context: −5 D is a "stronger" myopia correction than −2 D (more divergence needed). But −5 D and +5 D are equally "strong" in bending magnitude, opposite in type.

**replacement_text [P31]:** The sign of P tells the type of lens (converging vs. diverging); the magnitude |P| tells the degree of bending. "Stronger" lens usually means larger |P| (shorter focal length). Comparing −5 D and +2 D: −5 D is stronger in |P|, but the type is opposite. In prescriptions, always consider sign AND magnitude: −5 D and −2 D are both myopia corrections, but −5 D corrects more severe myopia.

**discrimination_pairs [P33]:**
- "A +3 D lens and a −3 D lens have the same focal length" → FALSE: f₁ = +33.3 cm, f₂ = −33.3 cm — same magnitude, opposite sign. Equal in |P| (bending amount) but opposite in type (converging vs. diverging).
- "A −6 D prescription is more severe myopia than a −3 D prescription" → TRUE: larger |P| for correction → more defocus to correct → more severe. ✓

**s6_path:** If student confuses sign with magnitude → power table (fill in f for various positive and negative P values) before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | No exposure to power concept; knows diopters from optometrist visits but no formula | Cannot state P = 1/f or units |
| S3 | Knows P = 1/f; applies P₁ + P₂ to separated lenses; confused about corrective lens type for myopia/hypermetropia | Applies addition formula correctly for contact case; gets confused when separation is given |
| S6 | Correctly applies P = 1/f and contact-lens addition; uncertain about corrective lens calculation or lensmaker's equation | Correctly does WE-1; cannot set up WE-2 (corrective lens) |
| S9 | Applies all lens power formulas; correctly calculates corrective prescriptions; applies lensmaker's equation; explains magnification formula | Correctly handles all three WEs; explains angular magnification vs. linear magnification |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 4, accelerated P track).

**TA-1 [P01 — Session Open]**
"An optometrist writes '−2.5 D' on a prescription. What does this number mean — and why is it convenient to use this unit? Today we connect focal length to diopters and discover why optometrists don't say 'your lens has f = 40 cm.' First: if f = 25 cm, what is the power? If f = 50 cm, which lens is stronger?"
[Diagnose S0/S3 — can student convert f↔P?]

**TA-2 [P06 — Concrete Anchor]**
"[Display: P = 1/f table — various f values and corresponding P values.] Convention: f in metres, P in diopters (D). Convex lens: f > 0, P > 0. Concave: f < 0, P < 0. Sign tells type, magnitude tells bending strength. For combined lenses IN CONTACT: P_total = P₁ + P₂. This is the ONLY case where simple addition works." [→ WE-1]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Power addition tested. Lenses at f₁=10 cm and f₂=10 cm, separated by 5 cm. P_total = 10+10 = 20 D → f=5 cm? Actual: 1/f = 1/10 + 1/10 − 5/100 = 0.15 → f=6.67 cm. The simple addition predicts 25% shorter focal length. For an optical instrument, this causes completely wrong image positions. Simple addition only works for d = 0." [→ MC-1 correct formula]

**TA-4 [P31 — Replacement: MC-2]**
"Power sign and magnitude: '−5 D is stronger than +2 D.' Let's unpack. |−5| > |+2| → the −5 D lens bends light more. But the types are opposite: −5 D diverges, +2 D converges. Stronger in magnitude, not the same type. In a prescription: −5 D corrects more severe myopia than −2 D because it needs to diverge light more. Always state both: type (sign) and degree (magnitude)."

**TA-5 [P06 — Pictorial: corrective lenses]**
"[Display: myopic eye — image forming in front of retina; corrective concave lens shown.] Myopia: far point < ∞ → parallel rays focus before retina → diverging lens needed. Hypermetropia: near point > 25 cm → converging lens needed. Corrective power: for myopia, P = −1/d_far (in D, d_far in m)." [→ WE-2]

**TA-6 [P41 — Diagnostic: simple magnifier]**
"A reading glass has f = 5 cm. When you use it with the image at infinity (relaxed eye) vs. image at 25 cm (maximum accommodation): calculate magnification both ways. What does angular magnification mean physically?" [→ WE-3; confirms S6→S9 transition]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Two lenses in contact: f₁ = +20 cm, f₂ = −60 cm. Find P_total, f_total, type. (2) A person's far point is 40 cm. Find the corrective lens power. (3) A biconvex lens (n=1.6, R₁ = R₂ = 20 cm) — find focal length and power.

Closing thought: The human crystalline lens adjusts its power from 17 D (relaxed, viewing far objects) to 33 D (accommodated, viewing near objects) — a remarkable active optical system that operates 16 hours a day for decades without servicing.

Spaced retrieval: +1 day (P = 1/f conversion and sign convention), +4 days (combined power in-contact formula and corrective lens calculation), +2 weeks (lensmaker's equation and magnifier formulas)."

[P91 gate: threshold 0.80. Failure → MC-1 separation distinction and corrective lens setup before re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** (a) Convert: f = +40 cm to diopters; P = −3.5 D to focal length. (b) Two lenses in contact: f₁ = +25 cm, f₂ = −40 cm. Find P_total and f_total. Is the combination converging or diverging?

**P-2 (Developing — identifies S6):** A person with hypermetropia has near point at 100 cm. (a) What power corrective lens is needed to allow reading at 25 cm? (b) With this lens, at what distance can the person see a distant object clearly?

**P-3 (Proficient — identifies S9):** Two lenses are placed 5 cm apart: f₁ = +20 cm, f₂ = +30 cm. (a) Find the effective focal length using the separated-lens formula. (b) Compare to the result if you incorrectly use P₁ + P₂. (c) Find the percentage error in f.

**P-4 (Mastery gate — confirms S9):** (a) A lensmaker creates a plano-convex lens (n = 1.7, one flat face R₂ = ∞, one convex face R₁ = 15 cm). Find f and P. (b) A myopic person (far point = 25 cm) uses a corrective lens. With the correction, what is the new effective far point? (c) If this person uses a magnifier (f = 5 cm, image at ∞) while wearing the corrective lens, find the total magnifying power available. Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Power-to-focal-length converter. Input f (slider, −100 cm to +100 cm). Outputs P in diopters, lens type (converging/diverging), and a visual ray diagram showing convergence or divergence. Demonstrates relationship between short f and large |P|.

**VIS-2:** Corrective lens simulation. Shows a myopic eye (eyeball diagram, image focus point in front of retina). Add corrective concave lens: rays now focus on retina. Slider: far point of the person (10 cm to 100 cm). Computes required P automatically. Same for hypermetropia with convex lens.

**VIS-3:** Combined lens power builder. Two lens sliders: P₁ and P₂. Toggle: "in contact" vs. "separated by d." Shows P_total for contact case and the corrected formula for separated case. A difference meter shows the discrepancy between the two formulas as a function of d. At d = 0: both agree. As d increases: divergence increases.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.lenses | Lens power P = 1/f directly extends the thin lens formula | prerequisite |
| phys.opt.optical-instruments | Microscope, telescope, and camera all use combined lens power formulas | unlocks |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.lens-power ✓ |
| V-2 | name matches KG | PASS — "Lens Power and Optical Instruments Basics" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (apply) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — lenses ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (3) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 4, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (combined power), WE-2 (corrective lens for myopia), WE-3 (magnifier + lensmaker's) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 2 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
