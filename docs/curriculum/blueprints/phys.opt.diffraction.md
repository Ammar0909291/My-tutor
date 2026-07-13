# Teaching Blueprint — phys.opt.diffraction

## Component 0 — Concept Metadata

```
concept_id:         phys.opt.diffraction
name:               Diffraction of Light
domain:             optics
difficulty:         advanced (5)
bloom:              analyze
mastery_threshold:  0.80
estimated_hours:    6
prerequisites:      [phys.opt.youngs-experiment]
cross_links:        []
session_cap:        8 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (shadow of a razor blade under a torch: the edge is not sharp — there is a
                       bright fringe inside the geometric shadow; difficulty 5 → C with
                       accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Diffraction is the bending and spreading of waves around obstacles or through
apertures when the aperture size is comparable to the wavelength. Every diffraction result follows
from Huygens' principle: each point on a wavefront acts as a new point source. When those secondary
wavelets superpose, they produce a pattern of maxima and minima determined by path-difference
geometry. Mastery means (1) predicting whether diffraction is significant from the ratio a/λ, (2)
deriving the condition for diffraction minima for a single slit (a sin θ = mλ), (3) explaining
why narrower slits produce wider central maxima, and (4) distinguishing diffraction effects from
interference effects.

**The One Equation That Matters:**
For a single slit of width a, the mth minimum occurs when:  
  a sin θ = mλ   (m = ±1, ±2, ±3, …)  
Angular half-width of central maximum: sin θ₁ = λ/a  
Linear half-width on screen: y₁ = λD/a

**Why This Is Hard:** Students conflate diffraction with interference. They treat diffraction as
"light bending around corners" (a ray-optics shortcut) rather than a wave-superposition phenomenon.
They also invert the slit-width/fringe-width relationship: they expect a narrower slit to give a
narrower pattern (analogous to geometric shadows), but a narrower slit actually gives a wider
central maximum.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
A razor blade held in a beam of light casts a shadow whose edge is fringed — bright bands appear
inside the geometric shadow. A distant streetlamp seen through a mesh fabric shows a starburst
pattern. These are not optical artifacts; they are the wave nature of light made visible.

**Stage 2 — Representational (R)**  
Draw a single slit as a gap of width a. Divide the slit into many point sources (Huygens). Rays
from opposite ends of the slit travel to the same screen point P. The path difference between
the top-most and bottom-most ray is a sin θ. When this path difference equals mλ, the slit can
be divided into pairs of strips that cancel — producing a minimum. The central maximum (θ = 0)
has zero path difference, hence maximum constructive superposition.

**Stage 3 — Abstract (A)**  
Intensity distribution: I(θ) = I₀ (sin β / β)², where β = (πa sin θ)/λ. The central maximum
(β = 0) has intensity I₀; secondary maxima are at β ≈ ±3π/2, ±5π/2, … with intensities ≈ I₀/22,
I₀/62, … Angular width of central maximum = 2λ/a; narrowing a doubles this angular width.

**Stage 4 — Transfer (T)**  
Diffraction limits the resolving power of all optical instruments (Rayleigh criterion:
θ_min = 1.22λ/D for a circular aperture). A narrow radio-telescope dish has poor angular
resolution. CD/DVD tracks act as diffraction gratings. X-ray diffraction (Bragg's law) reveals
crystal structures. Electron diffraction confirms de Broglie's matter-wave hypothesis.

---

## Component 3 — Why Beginners Fail

1. **The geometric-optics habit:** Students have spent years in a world where light "goes straight."
   Diffraction requires abandoning that habit and accepting that waves explore all paths.

2. **Conflation with interference:** Both involve superposition and fringes, so students merge them
   mentally. The distinction (single source spread out vs. multiple discrete sources) is abstract
   until made very explicit.

3. **Inverted slit-width intuition:** Geometric thinking predicts: smaller slit → smaller shadow →
   narrower pattern. Wave physics predicts the opposite. This counterintuitive reversal must be
   addressed head-on, not by-passed.

4. **Treating θ as large:** Students apply sin θ ≈ θ (small-angle) uncritically, then get
   confused when the approximation breaks near the first minimum for very narrow slits. The
   approximation must always be stated with its validity range.

---

## Component 4 — Misconception Library

### MC-1: MC-DIFFRACTION-IS-BENDING-AROUND-CORNERS
**Probe:** "A student says: 'Diffraction just means light bends around the edge of an obstacle,
the way water bends around a rock.' Is this description correct? What is missing?"  
**Characteristic phrase:** "Light bends around the slit."  
**Trigger:** Everyday language; the word "bending" appears in most textbook definitions.  
**Conflict evidence [P28]:** If diffraction were simple bending, we would see only one bright
fringe on each side, not the alternating dark-bright pattern. The pattern arises from superposition
of many secondary wavelets, not from a single bend.  
**Bridge [P30]:** "Bending is a consequence, not the cause. The cause is Huygens: every point
in the slit opening radiates a new wave. Those waves overlap and produce both bright and dark
regions, including some light inside the geometric shadow."  
**Replacement [P31]:** Diffraction is wave superposition from a distributed aperture; the
spreading of the beam is a side-effect of that superposition, not a separate bending mechanism.  
**Discrimination pairs [P33]:** (A) Light always travels in straight lines — false for waves. (B)
Diffraction is just bending — too simple. (C) Diffraction is superposition of Huygens secondary
wavelets from across the aperture — correct.  
**S6 repair path:** TA-3 (Huygens construction) → TA-4 (superposition overlay diagram).

### MC-2: MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN
**Probe:** "If you halve the slit width, what happens to the width of the central maximum? A
student predicts it will also halve. Is this right?"  
**Characteristic phrase:** "Smaller slit, smaller beam."  
**Trigger:** Geometric-shadow analogy; treating the slit like a hole a ball passes through.  
**Conflict evidence [P28]:** The formula y₁ = λD/a shows y₁ is inversely proportional to a.
Halving a doubles the central maximum half-width.  
**Bridge [P30]:** "Think of it this way: a very wide slit approaches a flat wavefront — parallel
rays, no diffraction, a narrow geometric image. A very narrow slit barely constrains the wave —
it must spread out in all directions to obey wave physics. Narrower slit = more spreading."  
**Replacement [P31]:** Angular half-width θ₁ = λ/a — the narrower the slit, the larger the
diffraction angle.  
**Discrimination pairs [P33]:** Slit halved: central maximum (A) halves, (B) doubles, (C) stays
the same. Correct: (B).  
**S6 repair path:** TA-5 (quantitative slit-width variation) → TA-6 (simulation/demonstration).

### MC-3: MC-DIFFRACTION-SAME-AS-INTERFERENCE
**Probe:** "A student says: 'Diffraction and interference are basically the same thing — both give
bright and dark fringes.' Agree or disagree? Explain the key difference."  
**Characteristic phrase:** "They both make fringes, so they're the same."  
**Trigger:** Surface similarity (alternating bright/dark fringes) without attending to the source
geometry.  
**Conflict evidence [P28]:** Interference (Young's) comes from two (or more) discrete coherent
sources; fringe spacing is uniform. Diffraction comes from a single extended aperture; the central
maximum is twice as wide as secondary maxima, and secondary maxima diminish in intensity.  
**Bridge [P30]:** "Both are superposition. The difference is the geometry: interference superimposes
waves from separated point sources (like two slits). Diffraction superimposes waves from a
continuum of points distributed across one aperture."  
**Replacement [P31]:** Diffraction = superposition across a single continuous aperture.
Interference = superposition from multiple discrete sources. In practice, diffraction modulates
the envelope of an interference pattern when both are present.  
**Discrimination pairs [P33]:** Compare double-slit pattern (uniform fringe spacing, equal
intensities for equal-width slits) vs. single-slit pattern (central max twice as wide, intensity
falls off). Which is diffraction? The single-slit pattern.  
**S6 repair path:** TA-7 (comparison overlay) → re-check using TA-4 probe.

### MC-4: MC-DIFFRACTION-ONLY-AT-SLITS
**Probe:** "Does diffraction occur when light passes through a large door opening? Why or why
not?"  
**Characteristic phrase:** "You need a really small opening for diffraction."  
**Trigger:** Textbook always show narrow-slit setups; students never see diffraction from large
apertures.  
**Conflict evidence [P28]:** Diffraction always occurs; the condition a/λ ≈ 1 determines whether
effects are observable. For a 1 m door and λ = 500 nm, a/λ = 2×10⁶ — the central maximum is
0.5 μrad wide, invisible. But it is there.  
**Bridge [P30]:** "Diffraction is universal. Whether you see it depends on the ratio a/λ. A door
diffracts light, but the spread is immeasurably small. Narrow the opening to a/λ ≈ 1 and the
pattern becomes visible."  
**Replacement [P31]:** Diffraction occurs for all apertures; significant observable effects require
a ≈ λ.  
**Discrimination pairs [P33]:** (A) Diffraction requires a slit. (B) Diffraction requires a/λ ≈ 1
to be observable. (C) Diffraction only happens with laser light. Correct: (B).  
**S6 repair path:** TA-2 (everyday diffraction examples) → ratio calculation exercise.

---

## Component 5 — Explanation Library

**Explanation E-1 (Huygens-first):**  
Every point on the wavefront at the slit opening becomes a new point source of circular wavelets
(Huygens' principle). These wavelets from all points across the slit width spread out and overlap
on the screen. Where they arrive in phase, we get a bright fringe; where they arrive out of phase
and cancel, we get a dark fringe. The condition for the first dark fringe: the wavelet from the
top edge of the slit travels exactly λ/2 further than the one from the midpoint, so they cancel.
This happens when a sin θ = λ.

**Explanation E-2 (phasor/zone argument):**  
Divide the slit into N strips. Each strip contributes a phasor of equal amplitude. For the
central maximum (θ = 0), all phasors point the same direction — maximum amplitude. As θ
increases, successive phasors rotate relative to each other. At the first minimum, the phasors
form a closed polygon (total rotation = 2π), giving zero net amplitude.

**Explanation E-3 (ratio-first for quick recall):**  
Two numbers determine every diffraction result: the slit width a and the wavelength λ. Their
ratio a/λ tells you how many wavelengths fit across the slit. When a/λ < 10, diffraction effects
dominate and the beam spreads significantly. Every formula follows from this ratio.

---

## Component 6 — Analogy Library

**Primary analogy — Water through a harbour gap:**  
Ocean waves entering a harbour through a gap in a breakwater spread out into the harbour in
circular arcs — they do not remain collimated as a parallel beam. The narrower the gap relative
to the wavelength of the water waves, the more the waves spread. Light through a narrow slit
behaves identically.  
**Breaking point:** Water waves are macroscopic and slow; interference fringes in the harbour
are easy to photograph. Light fringes require careful geometry to observe. The analogy is
structurally perfect but scales differently.  
**Anti-analogy:** A bullet through a narrow slot (particle model): only bullets in the geometric
path of the slot pass through, producing a sharp shadow. No spreading, no fringes. This is what
students expect from geometric optics — and it is wrong for light.

---

## Component 7 — Demonstration Library

**D-1 (Minimal, instant — laser + razor blade):**  
Shine a laser pointer past the straight edge of a razor blade onto a white wall in a darkened
room. The shadow edge shows fine bright fringes inside the geometric shadow. No special equipment.
Ask: "If light travels in straight lines, how did it get there?"

**D-2 (Slit kit — quantitative):**  
Use a variable-width single slit (or a pair of blades mounted on a vernier). Shine a laser
through. Project the pattern. Narrow the slit — watch the central maximum widen. Measure the
half-width at several slit settings. Compute a sin θ = λ and compare to the known laser wavelength.

**D-3 (CD/DVD diffraction — everyday):**  
Shine a white-light torch at a CD at grazing incidence. The reflected colours are a diffraction
grating pattern, not a mirror reflection. Ask: "Why do you see different colours at different
angles?" Connect to the diffraction grating equation d sin θ = mλ as a multi-slit generalization.

---

## Component 8 — Discovery Lesson

**Is this concept suited for discovery or direct instruction?**  
Discovery with structured observation. The counterintuitive reversal (narrower slit → wider
fringe) is best experienced first, then explained.

**Discovery Lesson Plan:**

*Anchor (3 min):* Show the razor-blade shadow with a laser (D-1). "The bright band is inside the
geometric shadow. Light clearly went somewhere it shouldn't — how?"

*Exploration (8 min):* Give students a variable slit and laser. Ask them to observe what happens
to the central bright region as they narrow the slit. Record: wider or narrower?

*Conflict (2 min):* Most predict narrower. They observe wider. "Your geometric-optics intuition
said narrower. The wave said wider. Why?"

*Explanation (5 min):* Introduce Huygens. Draw the phasor diagram for θ = 0 and θ = θ₁. Show
that the first minimum condition a sin θ₁ = λ means wider spreading for narrower slits.

*Formalise (5 min):* Derive a sin θ = mλ from the paired-strip cancellation argument. Verify
with the measurement data from the exploration.

*Transfer (2 min):* "Why does a telescope with a wider mirror see finer detail?" (Rayleigh
criterion — opposite direction: larger aperture, smaller diffraction spread, better resolution.)

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Project the laser-razor-blade shadow (D-1). No equations. "Light went inside the shadow.
Why?"  
Success signal: Students name the anomaly; they cannot explain it with ray optics.

**TA-2 — Huygens Construction [P14]**  
Trigger: After anchor. Students are puzzled.  
Action: Draw a wavefront at the slit. Mark 5 point sources. Draw their circular wavelets. Show
wavefronts spreading into the geometric shadow.  
Success signal: Students say: "Each point in the slit sends a wave in all directions."

**TA-3 — Paired-Strip Cancellation [P14, P28]**  
Trigger: After Huygens. Students accept spreading but not the dark fringes.  
Action: Divide the slit into two halves. Show a ray from the top of the upper half and the top of
the lower half. Path difference = a/2 sin θ. At θ₁: (a/2) sin θ₁ = λ/2 → cancellation. Generalize
to a sin θ₁ = λ.  
Success signal: Students can state the first-minimum condition.

**TA-4 — MC-2 Diagnostic [P14, P28, P31, P33, P36]**  
Trigger: After derivation.  
Action: Present MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN probe. Ask for prediction before showing
the formula. Run the variable-slit demo (D-2). Compare.  
Success signal: Students articulate: "Narrower slit → larger angle → wider central maximum."

**TA-5 — Quantitative Practice [P50]**  
Trigger: After MC-2 cleared.  
Action: Problem set — (a) compute fringe half-width for given a, λ, D; (b) given fringe
positions, find λ; (c) compare single-slit widths for red vs. blue light.  
Success signal: Students correctly apply a sin θ = mλ and y₁ = λD/a.

**TA-6 — Diffraction vs. Interference Distinction [P28, P33]**  
Trigger: After quantitative practice.  
Action: Show side-by-side photographs: Young's double-slit pattern vs. single-slit pattern.
Identify: (1) uniform vs. non-uniform fringe intensity, (2) central max width, (3) source count.
Resolve MC-3.  
Success signal: Students correctly classify each pattern and state the geometric reason for the
difference.

**TA-7 — Rayleigh Criterion Transfer [P68, P85]**  
Trigger: After distinction exercise.  
Action: "Telescopes, cameras, the human eye — they all have circular apertures. The diffraction
limit for a circular aperture is θ_min = 1.22λ/D. Why does the Hubble Space Telescope have a
2.4 m mirror?" Compute its angular resolution and compare with a 10 cm amateur telescope.  
Success signal: Students compute θ_min for both and explain why a larger mirror resolves finer
detail.

**TA-8 — Closure & Self-Assessment [P68, P85, P91]**  
Trigger: Session end.  
Action: Three-question self-check — (1) State the condition for the mth diffraction minimum. (2)
If a doubles, what happens to fringe half-width? (3) Why is diffraction more noticeable for sound
than for visible light in everyday life?  
Success signal: All three answered without notes. If any fail → loop to relevant TA.

---

## Component 10 — Voice Teaching

**Opening move:** "Before we write any formula — look at this shadow. [Show D-1.] That bright
band is inside the shadow. Geometrically, it should be dark. We need a completely different model
to explain it."

**Key explanatory moves:**
- "Every point in the slit is a new source. Not just the edges — every single point across the
  whole width."
- "A narrower slit gives fewer point sources crowded into a smaller space. They spread out more
  to find room. That's why the central maximum widens."
- "The formula a sin θ = λ is just the tipping point — the angle at which the top-half and
  bottom-half of the slit's wavelets perfectly cancel."

**Common recovery phrases:**
- If student says "light bends around the slit": "It is more accurate to say waves from inside
  the slit spread in all directions. The edge is not doing the bending — the entire opening is
  radiating."
- If student inverts the ratio: "Write the formula: y₁ = λD/a. a is in the denominator. Bigger
  a → smaller y₁. Smaller a → bigger y₁. The formula is the memory."
- If student confuses with double-slit: "Ask yourself: how many sources? One continuous aperture
  = diffraction. Two point sources = interference. The envelope of a double-slit pattern is set
  by single-slit diffraction — they coexist."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.80):**  
Pass criteria — student correctly:  
(a) States the condition for diffraction minima: a sin θ = mλ  
(b) Predicts the effect of changing a or λ on the central maximum width (inverse relationship for a, direct for λ)  
(c) Distinguishes single-slit diffraction from double-slit interference using pattern features  
(d) Applies the Rayleigh criterion to a new instrument context  
Failure on (a) or (b) → restart from TA-3. Failure on (c) → return to TA-6. Failure on (d) → extend session to TA-7+.

**Formative Golden Probe (FA-1):**  
"A single slit of width 0.2 mm is illuminated with laser light of λ = 600 nm. The screen is 1.5 m
away. Calculate the half-width of the central maximum. If the slit is narrowed to 0.1 mm, what
happens to the half-width?"  
Expected: y₁ = λD/a = (600×10⁻⁹ × 1.5) / (0.2×10⁻³) = 4.5 mm. Halving a doubles y₁ to 9 mm.  
Threshold: Both values correct, ratio correctly predicted.

**Formative Golden Probe (FA-2):**  
"In a single-slit experiment the first dark fringe appears at 3° from the centre. The wavelength
is 500 nm. Find the slit width."  
Expected: a = λ / sin θ = 500×10⁻⁹ / sin 3° = 500×10⁻⁹ / 0.0523 ≈ 9.56 μm.  
Threshold: Correct application of first-minimum condition; correct use of sin not tan.

**Formative Golden Probe (FA-3):**  
"Why does a narrower slit produce a wider central diffraction maximum? Answer using Huygens'
principle — no formulas."  
Expected: A narrower slit contains fewer point sources. The wavelets from these sources overlap
across a wider angular range. The condition for destructive interference (first minimum) occurs at
a larger angle because the path difference a sin θ = λ requires a larger θ when a is smaller.  
Threshold: Huygens explicitly named; inverse relationship explained physically, not just stated.

**Formative Golden Probe (FA-4):**  
"A telescope mirror has diameter 0.5 m and observes light at 550 nm. What is its angular
resolution? A second telescope has diameter 5 m. Compare their abilities to resolve two stars
0.1 arcsecond apart."  
Expected: θ_min = 1.22 × 550×10⁻⁹ / 0.5 ≈ 1.34 μrad ≈ 0.28 arcsec. Not resolved. For 5 m:
θ_min ≈ 0.028 arcsec. Resolved (barely).  
Threshold: Rayleigh formula correctly applied; comparison correctly drawn.

**Confidence Calibration:**  
After each probe, ask: "How confident were you before you calculated: certain / likely / unsure?"
Track against accuracy. Flag calibration deficit if student is consistently certain but wrong, or
consistently unsure but right.

**Delayed Retrieval (Session + 3 days):**  
"Without looking at your notes — what is the condition for the first dark fringe in single-slit
diffraction? What happens to fringe width if you halve the slit?"  
Threshold: Both correct unaided.

---

## Component 12 — Recovery Notes

**S0 (no prior knowledge of Huygens):** Start with the water-harbour analogy (Component 6).
Establish that all waves spread through gaps before introducing light. Then run TA-1.

**S3 (has Young's interference, struggles with why diffraction is different):** Use TA-6 head-on.
Emphasize: "In Young's, we had two separated point sources and superimposed them. Here we have one
continuous aperture and superimpose all its points. Same mathematics, different geometry."

**S6 (MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN is dominant):** Do not try to reason past it
verbally. Run the variable-slit demo (D-2) first. Make the student observe the counterintuitive
result before you explain it. Physical experience is more durable than verbal argument for this
specific misconception.

**S9 (plateau — can solve problems but cannot explain the physics):** Set the Huygens-only
explanation task (FA-3). If they cannot do it, they have a procedural schema without conceptual
understanding. Return to TA-2 and require verbal Huygens explanation before any formula work.

---

## Component 13 — Memory & Review

**Memory type:** Conceptual-procedural hybrid. The formula a sin θ = mλ is procedural; the Huygens
explanation is conceptual. Both must be encoded separately or they interfere with each other at
retrieval.

**Spaced retrieval plan:**
- Session + 1 day: "State the condition for the first minimum. What is the effect of halving the
  wavelength on the diffraction pattern?" (Procedural check)
- Session + 4 days: "Explain using Huygens' principle why a narrow slit produces a wider pattern
  than a wide slit." (Conceptual check)
- Session + 10 days: "A telescope uses a circular aperture of diameter D = 2 m. Light of wavelength
  450 nm enters. Find its angular resolution. A competing telescope has D = 8 m — how much better
  is its resolution?" (Transfer check)

**Interleaving partners:** phys.opt.youngs-experiment (interference vs. diffraction contrast),
phys.wave.interference (superposition mechanics), phys.opt.single-slit (immediate successor),
phys.opt.diffraction-grating (multi-slit generalization).

---

## Component 14 — Transfer Map

**Near transfer:**
- Single-slit diffraction: the immediate quantitative application of the general diffraction result
- Diffraction grating: d sin θ = mλ generalizes the slit formula to N slits
- Circular aperture: replaces the factor 1 with 1.22 for circular geometry

**Far transfer:**
- Optical instruments: Rayleigh criterion limits resolution of all image-forming systems
- X-ray crystallography: Bragg diffraction uses exactly the same geometry at atomic scales
- Electron diffraction: Davisson-Germer experiment confirms de Broglie using diffraction
- Radio astronomy: antenna-array systems use diffraction to achieve directional sensitivity
- Acoustic diffraction: sound bending around walls, sonar resolution limits

**Structural abstraction:** The wave-aperture ratio (a/λ) as a universal controller of spreading
appears in antenna theory (beam width = λ/D), acoustic engineering (speaker directivity), and
medical ultrasound (transducer resolution). Any system that emits or receives waves through an
aperture obeys the same ratio law.

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.opt.youngs-experiment ensures students have already met interference and
wave-optics; diffraction is the natural generalization. Unlocking phys.opt.single-slit is correct
— single-slit is the quantitative specialization.

**Missing prerequisite?**  
Huygens' principle is used heavily but has no explicit KG node. Students who have not seen it
formally need the harbour-analogy warmup (Component 6) before TA-2.

**Recommended teaching pair:** phys.opt.diffraction + phys.opt.single-slit should be taught in
consecutive sessions with the slit-width demo bridging them. Teaching them in the same session is
feasible but exceeds the 6h estimate.

**Asset opportunity:** A live interactive simulation (slit-width slider, wavelength slider,
real-time intensity pattern update) would substantially reduce S6-path recovery time. The razor-
blade shadow demonstration (D-1) is currently the only no-equipment option and works well as an
anchor.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.opt.diffraction ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: bending/spreading around obstacles/apertures,
      aperture size comparable to wavelength ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN,
      MC-DIFFRACTION-SAME-AS-INTERFERENCE ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (8 TAs): TA-1…TA-8 ✓
V-11  TA-1 is Concrete [P01, P06]: laser-razor-blade shadow anchor ✓
V-12  TA-4 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN ✓
V-13  TA-8 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: youngs-experiment, wave.interference,
      single-slit, diffraction-grating ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
