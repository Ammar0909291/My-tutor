# Teaching Blueprint — phys.opt.optical-instruments

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.optical-instruments
name: "Optical Instruments — Microscope, Telescope, Camera"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.opt.lens-power
  - phys.opt.mirrors
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

A telescope makes distant objects appear close; a microscope makes tiny nearby objects appear large. Both do this by using a combination of lenses (or mirrors) to first form a real magnified (or demagnified) image, then using a second lens (the eyepiece) to re-magnify that intermediate image for the eye. The key insight: you can magnify in two stages — a camera does it in one stage (forming a real image on the sensor), while a microscope chains two lenses in series for two stages of magnification.

### Level 2 — Developing Understanding

**Simple Microscope (magnifier):**
A single converging lens used to view nearby objects.
- Object placed between F and 2F from lens
- Image: virtual, erect, magnified
- Magnification (image at ∞): m = D/f (D = 25 cm, near point)
- Magnification (image at near point): m = 1 + D/f

**Compound Microscope:**
Two converging lenses: objective (short focal length f_o) + eyepiece (longer focal length f_e).

Setup:
1. Object placed just beyond F_o of objective → forms real, inverted, magnified intermediate image
2. Eyepiece acts as simple magnifier viewing the intermediate image

Magnification of objective: m_o = −v_o/u_o ≈ L/f_o (for image at far end of tube; L = tube length ≈ distance from F_o to intermediate image)

Magnification of eyepiece (image at ∞): m_e = D/f_e

**Total magnification:**
**m_total = m_o × m_e ≈ (L/f_o) × (D/f_e)**

where L = tube length (≈ separation between back focal point of objective and front focal point of eyepiece), f_o = objective focal length, f_e = eyepiece focal length, D = 25 cm.

**Astronomical Telescope (refracting):**
Two converging lenses: objective (long focal length F_o) + eyepiece (short focal length f_e).

Setup:
1. Distant object at ∞ → forms real, inverted, diminished intermediate image at focal plane of objective
2. Eyepiece magnifies this intermediate image

Angular magnification (image at ∞):
**m = −F_o/f_e** (negative sign: image is inverted)

Length of telescope tube: L_tube = F_o + f_e (objective and eyepiece focal planes coincide for final image at ∞)

**Reflecting Telescope (Newtonian):**
- Concave mirror (primary) + plane mirror (secondary) + eyepiece
- Advantage: no chromatic aberration; can be very large (mirrors, not lenses)
- Cassegrain: two curved mirrors — convex secondary reflects back through hole in primary

**Simple Camera:**
- Converging lens forms real, inverted, diminished image on sensor/film
- Image distance v: 1/v = 1/f − 1/|u| (adjusted by moving lens)
- For distant objects (u → ∞): v → f (image forms at focal plane)
- f-number (aperture): f/N = f/diameter → smaller f-number = more light

### Level 3 — Proficient Synthesis

**Resolving power (qualitative):**
The minimum angular separation that an optical instrument can distinguish. Fundamental limit is diffraction (Abbe's criterion, Rayleigh criterion: θ_min ≈ 1.22 λ/D where D = aperture diameter). Larger aperture → better resolution.

**Binoculars:**
Magnification = F_o/f_e, but prisms fold the optical path (increasing effective tube length) and create an erect image. Written as m × D notation (e.g., 8×42 = 8× magnification, 42 mm objective diameter).

**Eye relief:**
Distance from eyepiece to where the exit pupil forms. Spectacle wearers need longer eye relief (>15 mm typically).

**Magnifying power vs. resolving power:**
High magnification without corresponding resolving power just produces "empty magnification" — larger but not sharper image. Resolution is limited by the objective lens/mirror.

**Normal adjustment:**
When the final image is at infinity (relaxed eye). This is the standard position for both telescope and microscope magnification formulas.

---

## Component 2 — Worked Examples

### WE-1: Compound Microscope

**Problem:** A compound microscope has objective focal length f_o = 0.5 cm and eyepiece focal length f_e = 2.5 cm. The tube length L = 15 cm. A student's eye at the eyepiece sees a final image at infinity.
(a) Find the magnification of the objective.
(b) Find the angular magnification of the eyepiece.
(c) Find the total magnification.

**Solution:**

**(a) Objective magnification:**
m_o = L/f_o = 15/0.5 = **30×**

(The objective creates a real image 15 cm from its back focal point, which is 30× the object size)

**(b) Eyepiece angular magnification (image at ∞):**
m_e = D/f_e = 25/2.5 = **10×**

**(c) Total magnification:**
m_total = m_o × m_e = 30 × 10 = **300×**

The compound microscope produces an image 300 times larger than the object (inverted).

---

### WE-2: Astronomical Telescope

**Problem:** An astronomical telescope uses an objective lens of focal length F_o = 100 cm and an eyepiece of focal length f_e = 5 cm.
(a) Find the magnifying power (normal adjustment — final image at ∞).
(b) Find the length of the telescope tube.
(c) If the telescope is used to view the Moon (angular diameter 0.5° from Earth), what is the apparent angular diameter through the telescope?

**Solution:**

**(a) Magnifying power:**
m = F_o/f_e = 100/5 = **20×** (image inverted)

**(b) Tube length:**
L_tube = F_o + f_e = 100 + 5 = **105 cm**

**(c) Apparent angular diameter:**
θ_apparent = m × θ_actual = 20 × 0.5° = **10°**

The Moon appears to have an angular diameter of 10° through this telescope — comparable to the size of your fist at arm's length.

---

### WE-3: Comparing Instruments

**Problem:** A person with near point D = 25 cm wants to examine a tiny biological sample (object size 0.1 mm).
(a) With a single magnifier lens f = 5 cm (image at ∞), what is the apparent size of the object?
(b) With a compound microscope (f_o = 0.5 cm, f_e = 2.5 cm, L = 15 cm, image at ∞), what is the apparent size?
(c) To observe a star cluster 10° across, what telescope magnification would make it fill a 30° field of view?

**Solution:**

**(a) Single magnifier:**
m = D/f = 25/5 = 5×
Apparent size = 5 × 0.1 mm = **0.5 mm**
(Compared to the unaided eye at 25 cm viewing 0.1 mm)

**(b) Compound microscope:**
m_total = (L/f_o)(D/f_e) = (15/0.5)(25/2.5) = 30 × 10 = 300×
Apparent size = 300 × 0.1 mm = **30 mm = 3 cm**
(The sample looks 3 cm across — clearly detailed with the microscope)

**(c) Telescope for star cluster:**
Required m = θ_apparent/θ_actual = 30°/10° = **3×**
Use F_o/f_e = 3 → for example, F_o = 60 cm, f_e = 20 cm.

---

## Component 3 — Misconception Engine

### MC-1: MC-TELESCOPE-OBJECTIVE-ENLARGES-DISTANT-OBJECTS

**trigger_signal:** Student states "the telescope objective magnifies the star" or "the objective makes distant objects appear closer."

**conflict_evidence [P28]:** The objective lens of a telescope forms a real image of a distant star — but the image is much smaller than the star. For the Moon (angular diameter 0.5°) with F_o = 100 cm: the intermediate image size = F_o × tan(0.5°) ≈ 100 × 0.0087 = 0.87 cm. The Moon is 3476 km in diameter — so the image is 0.87 cm. The objective has REDUCED the apparent size to fit in the focal plane. The EYEPIECE then magnifies this small intermediate image. The objective's job is not magnification but to bring a large area of sky to a small focused image.

**bridge_text [P30]:** Think of the objective as a collector and focuser: it captures light from a wide field and focuses it to a small, detailed intermediate image. The eyepiece then acts as a magnifier for that small image. Magnification happens in two steps: first, the objective subtends a larger angle (because it's bigger than your eye pupil → more light); second, the eyepiece magnifies the intermediate image.

**replacement_text [P31]:** The telescope objective forms a REAL, DIMINISHED (for distant objects at ∞, image size = F_o × angular size of object) intermediate image at its focal plane. The eyepiece then magnifies this intermediate image with magnification D/f_e. Total angular magnification = F_o/f_e. The objective's primary role is light-gathering and creating an intermediate image, not magnification — that is the eyepiece's role.

**discrimination_pairs [P33]:**
- "A telescope with a large objective lens is brighter because it collects more light" → TRUE: larger aperture → more photons collected → brighter image. ✓
- "A telescope's objective magnifies the star — the eyepiece just helps you see it" → FALSE: objective demagnifies (creates small intermediate image at focal plane); eyepiece magnifies that image.

**s6_path:** If student fails intermediate-image description → ray diagram tracing through objective + eyepiece showing intermediate image position and size before mastery gate.

---

### MC-2: MC-MICROSCOPE-EYEPIECE-IS-JUST-A-WINDOW

**trigger_signal:** Student treats the eyepiece as "just a lens to look through" without contributing to magnification, or states "the total magnification equals just the objective magnification."

**conflict_evidence [P28]:** Remove the eyepiece from a compound microscope and look at the intermediate image projected on a card. It's real and magnified by m_o = L/f_o. Now put the eyepiece back — the image through the eyepiece is magnified by an additional factor D/f_e. Total = m_o × m_e. For f_o = 0.5 cm, f_e = 2.5 cm, L = 15 cm: m_o alone = 30×; total = 300×. The eyepiece provides a 10× factor that is lost without it. In WE-1: m_total = 300 vs. m_o alone = 30.

**bridge_text [P30]:** The eyepiece functions as a simple magnifier — identical to holding a magnifying glass to view a small photograph. The "photograph" in this case is the real intermediate image formed by the objective. Just as a magnifying glass multiplies the apparent size of whatever you place at its focus, the eyepiece multiplies the apparent size of the intermediate image by D/f_e.

**replacement_text [P31]:** The eyepiece of a compound microscope provides a genuine angular magnification of D/f_e (for image at ∞), contributing equally to total magnification alongside the objective. Total magnification = m_o × m_e — neither factor is negligible. The eyepiece's job is to act as a simple magnifier viewing the real intermediate image formed by the objective.

**discrimination_pairs [P33]:**
- "In a compound microscope, the eyepiece only lets you see the image — the objective does the magnifying" → FALSE: eyepiece magnification m_e = D/f_e multiplies the total; removing the eyepiece gives 10× less magnification (in WE-1's case).
- "Using an eyepiece with shorter focal length gives more magnification" → TRUE: m_e = D/f_e → smaller f_e → larger m_e. ✓

**s6_path:** If student fails "how much does the eyepiece magnify" probe → WE-1 recalculated with eyepiece absent vs. present before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Uses microscope and telescope; no model of how they work; thinks the eyepiece "just makes the image clearer" | Cannot state the two-lens chain or magnification formula |
| S3 | Can state m = F_o/f_e for telescope; doesn't understand compound microscope's two-stage magnification; confuses total with just the objective | Correctly applies telescope formula; fails compound microscope total-m calculation |
| S6 | Correctly applies both formulas; uncertain about tube length or camera f-number | Correctly does WE-1 and WE-2; cannot explain resolving power limitation |
| S9 | Applies all magnification formulas; explains objective vs. eyepiece roles; calculates tube lengths; discusses resolving power qualitatively | Correctly handles all three WEs; explains why large telescope apertures matter for resolution, not just brightness |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 4, accelerated P track).

**TA-1 [P01 — Session Open]**
"Look through a telescope's objective lens alone (remove eyepiece). What do you see? [A small, real, dim image at the focal plane.] Now look through both — you see a bright, magnified image. The objective creates the intermediate image; the eyepiece magnifies it. Today we build the mathematical model for this two-stage system. First question: for a telescope with F_o = 60 cm and f_e = 3 cm, what magnification would you expect?"
[Diagnose S0/S3 — can student apply m = F_o/f_e?]

**TA-2 [P06 — Concrete Anchor: telescope]**
"[Display: two-lens telescope ray diagram — objective at left, intermediate image, eyepiece at right.] Objective: brings parallel rays from distant object to focus at focal plane (F_o). Eyepiece: acts as simple magnifier for intermediate image. Angular magnification = F_o/f_e. Tube length = F_o + f_e. Direction: inverted. Application: binoculars add prisms to invert → erect image." [→ WE-2]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Does the objective magnify distant objects? Calculate: Moon angular diameter 0.5°. F_o = 100 cm. Intermediate image size = 100 × tan(0.5°) = 0.87 cm. The Moon (3476 km) mapped to 0.87 cm — the objective has REDUCED the Moon to a spot. The eyepiece then magnifies this 0.87 cm image by D/f_e = 25/5 = 5× → apparent size = 0.87×5 = 4.35 cm subtending 5×0.5° = 2.5°. The objective collects and focuses; the eyepiece magnifies." [→ MC-1 discrimination pairs]

**TA-4 [P31 — Replacement: MC-2 + compound microscope]**
"Microscope eyepiece role: Remove eyepiece — you see m_o = L/f_o = 30× real intermediate image. Reinsert eyepiece — additional m_e = D/f_e = 10× → total 300×. Each factor is essential. Formula: m_total = (L/f_o)(D/f_e). Different from telescope: here the objective magnifies because the object is nearby (just outside F_o); in a telescope the objective just focuses parallel rays." [→ WE-1]

**TA-5 [P06 — Pictorial: compound microscope]**
"[Display: compound microscope ray diagram — two lenses, real intermediate image, virtual final image.] Object just beyond F_o → objective produces real, inverted, magnified image at distance L from back focal point of objective. Eyepiece positioned so this intermediate image is at its front focal point → final image at ∞ (relaxed eye). Compare: WE-3 shows magnifier (5×) vs. microscope (300×) — same 0.1 mm object." [→ WE-3]

**TA-6 [P51 — Check-in]**
"Quick verification: for a compound microscope with f_o = 1 cm, f_e = 5 cm, L = 10 cm, D = 25 cm (image at ∞): m_o = 10, m_e = 5, total = 50×. Now with f_e = 2.5 cm: m_e = 10, total = 100×. Cutting eyepiece focal length in half doubles total magnification. Confirm with formula."
[Confirms S6→S9; ensures both factors are correctly included]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Compound microscope: f_o = 0.4 cm, f_e = 4 cm, L = 16 cm. Find total magnification. (2) Telescope: F_o = 150 cm, f_e = 6 cm. Find m and tube length. (3) Why does increasing objective lens size improve resolution but not magnification?

Closing thought: The 10-meter Keck telescope's primary mirror has angular resolving power of 0.013 arcseconds — it could theoretically resolve two car headlights 400 km apart. This resolving power, not magnification, is what drives the construction of ever-larger mirrors.

Spaced retrieval: +1 day (telescope m = F_o/f_e and tube length), +4 days (compound microscope total magnification), +2 weeks (objectives vs. eyepieces roles and resolving power concept)."

[P91 gate: threshold 0.80. Failure → MC-1 and MC-2 role-distinction drills before re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** An astronomical telescope has objective focal length 80 cm and eyepiece focal length 4 cm. (a) Find the magnifying power (normal adjustment). (b) Find the tube length. (c) Is the final image erect or inverted?

**P-2 (Developing — identifies S6):** A compound microscope has f_o = 0.8 cm, f_e = 2 cm, L = 14 cm, D = 25 cm. (a) Find m_o and m_e separately. (b) Find total magnification. (c) If you replace the eyepiece with one of f_e = 1 cm, by what factor does total magnification change?

**P-3 (Proficient — identifies S9):** You have two converging lenses: f₁ = 5 cm and f₂ = 25 cm. You want to build either a telescope or a microscope. (a) Which lens serves as the objective for a telescope, and what is the magnifying power? (b) Reconfigure them as a compound microscope with L = 15 cm. What is the total magnification? (c) Explain why the same two lenses give vastly different magnifications in the two configurations.

**P-4 (Mastery gate — confirms S9):** (a) Design a compound microscope to achieve total magnification of 400×. Use D = 25 cm. You must choose f_o and f_e such that f_o < 1 cm, the tube length L = 16 cm, and total m ≥ 400×. Verify your design. (b) A reflecting telescope uses a primary concave mirror (focal length 2 m) and an eyepiece (f_e = 4 cm). Find the magnifying power. What advantage does a reflecting telescope have over a refracting one for very large apertures? Required: 2/2 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Compound microscope interactive. Sliders: f_o (0.2–2 cm), f_e (1–10 cm), L (5–20 cm). Displays: m_o, m_e, m_total, tube length. Ray diagram auto-updates showing intermediate image position and final image. Color-coded rays: objective (blue), eyepiece (red), final extension (dashed).

**VIS-2:** Telescope side-by-side comparison. Left: refracting telescope (two convex lenses). Right: Newtonian reflecting (concave mirror + plane mirror + eyepiece). Both show same F_o/f_e magnification. Highlights: refracting has chromatic aberration (rainbow fringing on bright stars); reflecting has none. Size comparison shows why large telescopes are always reflectors.

**VIS-3:** Magnification ladder. Three instruments side-by-side viewing the same 0.1 mm object: unaided eye at 25 cm, magnifier (f=5 cm, m=5×), compound microscope (m=300×). Shows apparent object size for each. Reinforces why chaining two lenses achieves far greater magnification.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.lens-power | Magnification formulas build on P = 1/f and combined lens concepts | prerequisite |
| phys.opt.mirrors | Reflecting telescopes use curved mirrors; Cassegrain design uses two mirrors | prerequisite |
| phys.opt.diffraction | Resolving power limit is set by diffraction at the objective aperture | downstream |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.optical-instruments ✓ |
| V-2 | name matches KG | PASS — "Optical Instruments — Microscope, Telescope, Camera" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (apply) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — lens-power, mirrors ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (5) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 4, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (compound microscope m), WE-2 (telescope m and tube), WE-3 (comparison: magnifier vs. microscope vs. telescope angular) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P51/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 3 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
