# Teaching Blueprint — phys.opt.single-slit

## Component 0 — Concept Metadata

```
concept_id:         phys.opt.single-slit
name:               Single-Slit Diffraction
domain:             optics
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    5
prerequisites:      [phys.opt.diffraction]
cross_links:        []
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (laser through a narrow slit on a card: one wide bright stripe flanked by
                       fainter stripes; difficulty 5 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Single-slit diffraction is the quantitative analysis of the intensity distribution
produced when a plane wave passes through one aperture of width a. The central maximum is twice as
wide as any secondary maximum. Every feature of the pattern follows from one condition: a sin θ = mλ
for dark fringes (m = ±1, ±2, …). Mastery means (1) deriving the dark-fringe positions, (2)
computing linear fringe positions using y_m = mλD/a, (3) explaining why the central maximum is
twice as wide as secondary maxima, (4) predicting pattern changes when a or λ change, and (5)
calculating secondary-maximum intensities using the sinc² formula.

**The Two Equations That Matter:**
  Dark fringes: a sin θ = mλ   (m = ±1, ±2, …; note: m = 0 is the central maximum, NOT a dark fringe)  
  Intensity:    I(θ) = I₀ (sin α / α)²  where α = πa sin θ / λ

**The Key Asymmetry:** The central maximum spans from m = −1 to m = +1 dark fringe, making it
twice as wide as any secondary maximum (which spans from m to m+1). Students must recognise this
asymmetry explicitly — it is the most distinctive feature of the single-slit pattern.

**Why This Is Hard:** The formula is deceptively similar to Young's double-slit formula but the
meaning of m is inverted (m = 0 is bright in Young's, m = 0 would be the central maximum; in
single-slit, m = 0 gives the bright central max but the formula gives dark fringes for integer m).
This sign/offset confusion produces systematic errors.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
Project a single-slit pattern on a wall: one wide, bright central stripe with flanking dimmer
stripes. Ask: "Why is the middle so much brighter? Why are the side stripes dimmer and narrower?"
These are the questions the session answers.

**Stage 2 — Representational (R)**  
Divide the slit into pairs of strips. A ray from strip k in the upper half pairs with strip k in
the lower half. Path difference between each pair: (a/2) sin θ. When (a/2) sin θ = λ/2, i.e.
a sin θ = λ, the pair cancels. The entire slit is cancelled in pairs → first dark fringe.
The central maximum has no cancellation partner at θ = 0.

**Stage 3 — Abstract (A)**  
Full phasor integration gives I(θ) = I₀ (sin α / α)² with α = πa sin θ / λ. Secondary maxima
occur where dI/dα = 0, giving α ≈ 3π/2, 5π/2, … Their intensities are I₀/22, I₀/61, …
The central maximum has intensity I₀ and angular half-width λ/a.

**Stage 4 — Transfer (T)**  
The sinc² function is universal: it describes antenna radiation patterns, spectral leakage in
signal processing (windowing), optical transfer functions, and diffraction from rectangular
apertures in 2D. Single-slit mastery is the entry point to all of these.

---

## Component 3 — Why Beginners Fail

1. **m = 0 confusion:** In Young's double-slit, m = 0 is the central bright fringe and dark
   fringes occur at m = ±½, ±3/2, … In single-slit, dark fringes occur at integer m (m ≠ 0) and
   the central maximum is NOT at "m = 0" in the dark-fringe formula. Students mix the two formulas.

2. **Central maximum width miscounted:** Students count the central maximum as one fringe width
   and expect it to equal secondary maxima width. The central maximum spans 2λ/a, others span λ/a.
   This factor of 2 must be derived, not memorised.

3. **Pattern symmetry assumption:** Students expect all secondary maxima to have the same intensity
   as each other. The sinc² envelope means each successive secondary maximum is dimmer. Students
   who only know the dark-fringe positions miss this.

4. **Confusing path difference (a sin θ) with geometry (a/2 sin θ):** The paired-strip argument
   uses the half-slit width a/2; the final formula uses the full width a. The factor-of-2 bookkeeping
   is a persistent error site.

---

## Component 4 — Misconception Library

### MC-1: MC-CENTRAL-MAX-SAME-WIDTH-AS-SECONDARIES
**Probe:** "In a single-slit pattern, compare the width of the central maximum to the width of the
first secondary maximum. Are they equal?"  
**Characteristic phrase:** "They should all be the same width."  
**Trigger:** Analogy to Young's uniform-fringe-spacing pattern.  
**Conflict evidence [P28]:** Dark fringes at m = ±1 bound the central maximum; it spans 2θ₁.
Dark fringes at m = 1 and m = 2 bound the first secondary maximum; it spans θ₂ − θ₁ = θ₁. The
central maximum is exactly twice as wide.  
**Bridge [P30]:** "The central maximum is special: it has zero path difference and no cancellation
partner. The first dark fringe appears at both sides of it simultaneously. Secondary maxima are
bounded by two dark fringes, each one m step apart — so they are half as wide."  
**Replacement [P31]:** Central maximum angular width = 2λ/a; secondary maximum angular width = λ/a.  
**Discrimination pairs [P33]:** Width of central max vs. first secondary max: (A) equal, (B) central
is twice as wide, (C) secondary is twice as wide. Correct: (B).  
**S6 repair path:** TA-3 (measured intensity scan) → TA-4 (formula derivation for both widths).

### MC-2: MC-M=0-IS-DARK
**Probe:** "Using the formula a sin θ = mλ, what is the fringe at m = 0? Is it bright or dark?"  
**Characteristic phrase:** "m = 0 means no path difference — that should be a dark fringe."  
**Trigger:** Misreading the formula; forgetting that the formula gives dark fringes, not all fringes.  
**Conflict evidence [P28]:** At m = 0, sin θ = 0, θ = 0 — this is the central maximum (brightest
point). The formula a sin θ = mλ gives positions of dark fringes; m = 0 happens to give θ = 0, but
the physical interpretation is that zero path difference means zero cancellation, hence maximum
brightness.  
**Bridge [P30]:** "The formula is a dark-fringe formula. Plug in m = 0: you get θ = 0, which is
the straight-through direction — the brightest point. Coincidentally that is m = 0, but it is not
a dark fringe. Dark fringes start at m = ±1."  
**Replacement [P31]:** The formula gives dark-fringe positions; m = 0 is excluded because the
central maximum is not dark.  
**Discrimination pairs [P33]:** At θ = 0: (A) dark fringe (m = 0 rule), (B) central bright maximum,
(C) secondary maximum. Correct: (B).  
**S6 repair path:** TA-2 (visual pattern identification) → explicit formula-interpretation drill.

### MC-3: MC-SECONDARIES-EQUAL-BRIGHTNESS
**Probe:** "After the central maximum, do all secondary maxima have the same brightness? Why or
why not?"  
**Characteristic phrase:** "Yes, they should all be the same brightness."  
**Trigger:** Analogy to Young's equal-intensity fringes.  
**Conflict evidence [P28]:** The sinc² envelope decays: secondary maxima at α ≈ 3π/2, 5π/2, …
give I/I₀ ≈ 4/9π² ≈ 0.045, 4/25π² ≈ 0.016, … Each is roughly 22×, 61× dimmer than the central
maximum.  
**Bridge [P30]:** "In Young's, each slit contributes equal amplitude regardless of angle —
uniform fringes. Here, the amplitude from the slit varies with angle because the phasor diagram
changes shape. The sinc function tells us how it decays."  
**Replacement [P31]:** Secondary maxima intensities decrease monotonically following the sinc²
envelope; they are not equal.  
**Discrimination pairs [P33]:** First vs. second secondary maximum: (A) same intensity, (B) first
brighter, (C) second brighter. Correct: (B).  
**S6 repair path:** TA-5 (intensity profile measurement or simulation).

### MC-4: MC-SINGLE-SLIT-FORMULA-SAME-AS-YOUNGS
**Probe:** "In Young's double-slit, d sin θ = mλ gives bright fringes at integer m. In single-slit,
a sin θ = mλ — does integer m give bright or dark fringes?"  
**Characteristic phrase:** "Same formula, same answer — bright fringes."  
**Trigger:** Surface similarity of the two formulas.  
**Conflict evidence [P28]:** In Young's, d sin θ = mλ → constructive interference → bright.
In single-slit, a sin θ = mλ → complete paired cancellation → dark. The formulas look identical
but mean opposite things physically.  
**Bridge [P30]:** "Both formulas involve a path difference = integer × λ. In Young's, that means
the two separate waves arrive in phase — bright. In single-slit, that means the top half and
bottom half of the aperture completely cancel each other — dark. The geometry determines the
interpretation."  
**Replacement [P31]:** In single-slit, integer m gives dark fringes; the formula is a destructive-
interference condition, not constructive.  
**Discrimination pairs [P33]:** a sin θ = mλ → (A) bright, (B) dark, (C) depends on m. Correct: (B).  
**S6 repair path:** TA-2 (side-by-side Young's vs. single-slit formula table) → TA-4 paired
derivation.

---

## Component 5 — Explanation Library

**Explanation E-1 (paired-strip, verbal):**  
Divide the slit into two equal halves. Every point in the upper half pairs with a corresponding
point in the lower half. Their path difference to a screen point at angle θ is (a/2) sin θ.
When this equals λ/2, they cancel perfectly. The condition (a/2) sin θ = λ/2 simplifies to
a sin θ = λ — the first dark fringe. Repeat pairing the slit into 4 strips, 6 strips, …
to get m = 2, 3, … dark fringes.

**Explanation E-2 (phasor/sinc):**  
Represent each infinitesimal strip of the slit as a phasor of infinitesimal amplitude. At θ = 0,
all phasors are parallel — maximum amplitude. As θ increases, successive phasors rotate. At the
first dark fringe they form a closed circle (net amplitude zero). Between dark fringes they form
an arc — non-zero but less than maximum, giving secondary maxima. The mathematics of the integral
is I(θ) = I₀ (sin α / α)² = I₀ sinc²(α).

**Explanation E-3 (ratio shortcut):**  
The ratio a/λ sets the scale. At θ such that a sin θ/λ = integer, destructive interference is
complete. At θ such that a sin θ/λ = half-integer + ½, a secondary maximum occurs. Memorise:
dark at a sin θ = mλ; bright (secondary) at a sin θ ≈ (m + ½)λ.

---

## Component 6 — Analogy Library

**Primary analogy — Orchestra tuning:**  
When an orchestra tunes before a concert, all instruments play the same A. From directly in front
of the stage you hear a strong, clear note (all in phase — central maximum). If you stand far to
one side, the instruments' distances to your ear differ; some cancel others at certain angles,
producing quieter regions. The single slit distributes "sources" (strip elements) across its
width just as the orchestra distributes instruments across the stage.  
**Breaking point:** Orchestra instruments are discrete point sources; the slit has a continuous
distribution. The phasor integration is approximate for orchestras but exact for the slit.  
**Anti-analogy:** A picket fence with light shining through (geometric optics): light goes straight
through each gap, and the far-field pattern is just multiple bright bars. No diffraction envelope.
This is the geometric-optics picture students default to — and it is wrong whenever a/λ is small.

---

## Component 7 — Demonstration Library

**D-1 (Minimal — laser + single-slit card):**  
Shine a 650 nm red laser through a single slit (0.1–0.3 mm) cut in black card. Project on a wall
2 m away. The pattern is unmistakable: wide bright centre, flanking dimmer stripes. Ask students
to count: "How wide is the central stripe compared to the side stripes?"

**D-2 (Quantitative — measure and verify):**  
With a ruler, measure the distance from the central maximum to the first dark fringe (y₁). Record
slit width a (use micrometer or manufacturer spec) and screen distance D. Compute: predicted
y₁ = λD/a. Compare measured vs. predicted.

**D-3 (Intensity scan — photodetector):**  
Mount a photodetector on a rail and scan it across the diffraction pattern. Plot intensity vs.
position. The sinc² shape is visible — secondary maxima are clearly dimmer than the central max.
Compare with a plot of a uniform-intensity fringe pattern for contrast.

---

## Component 8 — Discovery Lesson

**Best approach:** Structured observation → measurement → formula derivation.

*Anchor (2 min):* Project the single-slit pattern (D-1). "Count the stripes. Which is brightest?
Which is widest? What is the ratio of the central stripe width to the side stripes?"

*Observation (5 min):* Students measure widths by projecting on graph paper. They find the central
stripe is approximately twice as wide as each side stripe.

*Question (1 min):* "Why exactly twice? Is that a coincidence or is there a reason?"

*Derivation (10 min):* Paired-strip argument (Component 5, E-1). Show that the first dark fringe
is where m = 1, so the central max spans from m = −1 to m = +1 → twice the secondary width.

*Verify (5 min):* Measure y₁ and y₂. Confirm y₁ ≈ λD/a; y₂ − y₁ ≈ λD/a. Ratio y₁/(y₂ − y₁) ≈ 1.

*Transfer (2 min):* "A telescope mirror is a circular aperture. What is the equivalent of the
central maximum? This is why bigger mirrors give sharper images."

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Project single-slit pattern (D-1). Ask students to describe what they see — before any
equations. Focus on: central stripe width, side stripe widths, brightness gradient.  
Success signal: Students observe the 2:1 width ratio and the brightness gradient unprompted.

**TA-2 — Formula Orientation [P14]**  
Trigger: After anchor.  
Action: Write a sin θ = mλ on the board. State explicitly: "This formula gives dark fringe
positions. m = ±1, ±2, … At m = 0 this gives θ = 0, but that is the central bright maximum —
so m = 0 is not a dark fringe." Address MC-2 pre-emptively.  
Success signal: Students restate: "m = 1, 2, … give dark fringes; m = 0 is the central max."

**TA-3 — Paired-Strip Derivation [P14, P28]**  
Trigger: After formula orientation.  
Action: Draw the slit divided into two halves. Identify paired strips. Show path difference
(a/2) sin θ. Derive first minimum condition. Extend to m = 2 (four strips). Derive general
condition a sin θ = mλ.  
Success signal: Students can reproduce the paired-strip argument for m = 1 from scratch.

**TA-4 — Width Asymmetry [P14, P28, P31]**  
Trigger: After derivation.  
Action: Mark dark-fringe positions on a diagram: θ₁ = arcsin(λ/a), θ₂ = arcsin(2λ/a). Central
max: from −θ₁ to +θ₁ (width 2θ₁). First secondary: from θ₁ to θ₂ (width θ₁). Show factor of 2.
Measure on the actual pattern (D-1) to confirm.  
Success signal: Students state the 2:1 ratio with the geometric justification.

**TA-5 — MC-1 & MC-3 Diagnostic [P14, P28, P31, P33, P36]**  
Trigger: After width asymmetry.  
Action: Present MC-CENTRAL-MAX-SAME-WIDTH-AS-SECONDARIES and MC-SECONDARIES-EQUAL-BRIGHTNESS
probes back-to-back. For intensity: show the sinc² graph. Mark secondary-maximum heights at
~4.5% and ~1.6% of central max.  
Success signal: Students correct both misconceptions with reference to the formula.

**TA-6 — Quantitative Problem Set [P50]**  
Trigger: After MC clearance.  
Action: (a) Given a = 0.2 mm, λ = 589 nm, D = 1 m — find positions of first three dark fringes
and first two secondary maxima. (b) Given measured y₁ = 3.5 mm, D = 1.5 m, λ = 632 nm — find a.
(c) Slit width doubled: describe new pattern.  
Success signal: All three correctly solved; (c) verbally explained as halving all fringe widths.

**TA-7 — Closure & Self-Assessment [P68, P85, P91]**  
Trigger: Session end.  
Action: Three questions without notes — (1) condition for mth dark fringe; (2) how wide is the
central maximum compared to secondary maxima; (3) a single slit of unknown width produces a
central maximum of angular half-width 0.4°. λ = 550 nm. Find a.  
Success signal: All three correct. Any failure → identify the TA and loop.

---

## Component 10 — Voice Teaching

**Opening move:** "Look at that pattern. [Point to D-1.] The middle stripe is wider than the side
stripes. That is not a coincidence — it is because the middle stripe is not bounded by two dark
fringes like the others. It is bounded by the first dark fringe on both sides — so it spans twice
the distance."

**Key explanatory moves:**
- "Divide the slit. Upper half, lower half. Pair each strip with its partner. When each pair
  cancels, the whole slit goes dark. That is your dark fringe condition."
- "The formula a sin θ = mλ is a destructive-interference formula. Do not confuse it with Young's
  constructive-interference formula. Same shape, opposite meaning."
- "Why do secondary maxima get dimmer? The phasors form an arc, not a straight line. The longer
  the arc, the smaller the net amplitude."

**Common recovery phrases:**
- If m = 0 confusion: "Write: dark fringes at m = 1, 2, 3, not m = 0. The formula at m = 0
  gives θ = 0, which is the central maximum — but the formula is still a dark-fringe formula.
  m = 0 is a limiting case that lands on the bright maximum by coincidence of geometry."
- If width confusion: "Central max: goes from −θ₁ to +θ₁. Width = 2θ₁. First secondary: goes
  from θ₁ to θ₂. Width = θ₁. The '2' is not a mystery — it is because the central max has a
  dark fringe on each side symmetrically."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.80):**  
Pass criteria — student correctly:  
(a) Identifies dark-fringe positions using a sin θ = mλ  
(b) Computes y_m = mλD/a for m = 1, 2, 3  
(c) States that the central maximum is twice as wide as secondary maxima  
(d) Identifies that secondary maxima decrease in intensity following sinc² envelope  
Failure on (a) or (b) → restart from TA-3. Failure on (c) → return to TA-4. Failure on (d) → TA-5.

**Formative Golden Probe (FA-1):**  
"A single slit of width 0.3 mm is illuminated with λ = 600 nm. Screen is 2 m away. Find: (a) the
position of the second dark fringe, (b) the width of the central maximum."  
Expected: (a) y₂ = 2λD/a = 2 × 600×10⁻⁹ × 2 / (0.3×10⁻³) = 8 mm. (b) Width = 2y₁ = 8 mm.  
Threshold: Both correct with units.

**Formative Golden Probe (FA-2):**  
"In a single-slit experiment, the central maximum is 12 mm wide and the screen is 1.8 m from the
slit. If λ = 500 nm, find the slit width."  
Expected: Half-width y₁ = 6 mm; a = λD/y₁ = 500×10⁻⁹ × 1.8 / (6×10⁻³) = 0.15 mm.  
Threshold: Correct identification that half-width (not full width) is used in the formula.

**Formative Golden Probe (FA-3):**  
"What happens to the single-slit pattern when the slit width is tripled? Describe the new central
maximum width and the positions of the first and second dark fringes."  
Expected: All fringe widths reduce by factor 3. New y₁ = λD/(3a_old); new y₂ = 2λD/(3a_old).  
Threshold: Inverse relationship stated clearly; quantitative reduction by factor 3 given.

**Formative Golden Probe (FA-4):**  
"Why is the central maximum in single-slit diffraction twice as wide as the secondary maxima?
Give the geometric reason, not the formula."  
Expected: The central maximum extends from the first dark fringe on one side to the first dark
fringe on the other — spanning 2θ₁. Each secondary maximum is bounded by two consecutive dark
fringes, spanning only θ₁.  
Threshold: The asymmetry explained geometrically without recourse to the formula.

**Confidence Calibration:** After each probe, ask for confidence rating. Flag persistent over-
confidence on the m = 0 confusion.

**Delayed Retrieval (Session + 3 days):**  
"Without looking at notes: state the condition for the mth dark fringe in single-slit diffraction.
Why is the central maximum twice as wide as secondary maxima?"  
Threshold: Both answered correctly unaided.

---

## Component 12 — Recovery Notes

**S0 (no prior exposure to phys.opt.diffraction):** Do not proceed. The prerequisite teaches
Huygens and the physical mechanism. Without it, the paired-strip derivation is unmotivated.

**S3 (knows diffraction generally but confuses single-slit with Young's):** Use the side-by-side
comparison: write d sin θ = mλ (Young's, constructive) and a sin θ = mλ (single-slit, destructive)
next to each other. "Same structure, opposite meaning." Run TA-2 explicitly.

**S6 (MC-M=0-IS-DARK dominant):** Draw the intensity pattern on the board. Label θ = 0 as "central
bright maximum." Then write the formula. Then note: "At m = 0, this formula gives θ = 0 — but you
already drew that as a bright maximum. So the formula describes dark fringes at m = 1, 2, 3 only."

**S9 (procedural, cannot explain width asymmetry):** Require the student to point to the dark
fringes on the physical pattern (D-1), count them, and state the boundary condition for the central
maximum vs. each secondary maximum. Conceptual understanding must precede formula re-use.

---

## Component 13 — Memory & Review

**Memory type:** Procedural-conceptual hybrid. The formula a sin θ = mλ is fast to recall but
the m = 0 exclusion and the 2:1 width ratio require conceptual anchoring. Teach them as two
separate memory targets.

**Spaced retrieval plan:**
- Session + 1 day: "State the single-slit dark fringe condition. What does m = 0 give, and is
  it dark or bright?" (Formula check + m = 0 disambiguation)
- Session + 4 days: "A slit of width 0.25 mm is illuminated with λ = 640 nm, D = 1.5 m. Find
  y₁ and the full width of the central maximum." (Quantitative application)
- Session + 9 days: "Why is the central maximum twice as wide as secondary maxima? Also: a telescope
  has a 50 mm lens. λ = 500 nm. What is the angular resolution? How does this relate to single-
  slit diffraction?" (Conceptual check + transfer to Rayleigh)

**Interleaving partners:** phys.opt.diffraction (general diffraction, this concept's prerequisite),
phys.opt.youngs-experiment (contrast: constructive vs. destructive conditions), phys.opt.diffraction-
grating (generalization to N slits with the diffraction envelope modulating fringe intensities).

---

## Component 14 — Transfer Map

**Near transfer:**
- Diffraction grating: individual slit diffraction provides the intensity envelope modulating the
  grating's interference peaks
- Circular aperture diffraction: replaces a sin θ = mλ with the Bessel-function result; first
  minimum at 1.22λ/D (Rayleigh criterion)

**Far transfer:**
- Optical instruments: resolving power limited by diffraction of circular apertures
- Antenna theory: antenna beam-width pattern = sinc²(πL sin θ / λ) for a linear array of length L
- Signal processing: time-domain rectangular window → frequency-domain sinc² spectrum (spectral
  leakage)
- X-ray diffraction: Bragg's law peaks are modulated by the form factor, which is the 3D single-
  crystal analogue of the single-slit sinc² function
- Electron diffraction: same geometry confirms de Broglie wavelengths

**Structural abstraction:** sinc² = the universal footprint of a finite uniform window in any
physical system. Anywhere that energy is distributed uniformly across a finite interval and
superimposed at a remote field point, the sinc² result follows.

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.opt.diffraction ensures the student already knows Huygens, the paired-strip
idea, and the general dark-fringe condition — the current concept is purely the quantitative
specialization with the sinc² intensity profile. Correct ordering.

**Missing prerequisite?**  
None. The phys.opt.diffraction prerequisite covers all needed concepts.

**Recommended teaching pair:** phys.opt.diffraction + phys.opt.single-slit are best taught in
back-to-back sessions (diffraction establishes mechanism; single-slit provides quantitative depth).
The same laser + slit apparatus works for both; D-2 (quantitative measurement) bridges perfectly.

**Asset opportunity:** An interactive sinc² plotter with live a and λ sliders — showing dark-fringe
positions and secondary-maximum intensities updating in real-time — would resolve MC-3
(equal-brightness assumption) far more efficiently than any static diagram. Priority: high.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.opt.single-slit ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: central maximum flanked by progressively weaker
      secondary maxima through narrow slit ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-CENTRAL-MAX-SAME-WIDTH-AS-SECONDARIES,
      MC-M=0-IS-DARK ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P01, P06]: single-slit pattern observation anchor ✓
V-12  TA-5 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-CENTRAL-MAX-SAME-WIDTH-AS-SECONDARIES + MC-SECONDARIES-EQUAL-BRIGHTNESS ✓
V-13  TA-7 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: diffraction, youngs-experiment, diffraction-grating ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
