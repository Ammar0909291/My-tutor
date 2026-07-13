# phys.opt.dispersion — Dispersion and Prisms

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.opt.dispersion` |
| **Display name** | Dispersion and Prisms |
| **KG requires** | `phys.opt.refraction` |
| **KG unlocks** | — |
| **Difficulty** | proficient |
| **Bloom level** | understand |
| **Mastery threshold** | 0.75 |
| **Estimated hours** | 4 |
| **KG description** | Dispersion is the separation of white light into its constituent wavelengths by a prism due to wavelength-dependent refractive index. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

A glass prism splits white light into a rainbow of colours. This means the glass bends different colours by different amounts. Violet bends most; red bends least. The same effect makes rainbows appear — each raindrop acts like a tiny prism, sending each colour of sunlight at a slightly different angle to your eye. Dispersion is simply the fact that glass (and most transparent materials) refracts light by an amount that depends on wavelength.

### Stage 2 — Quantitative entry

Refractive index n depends on wavelength λ: **n = n(λ)**. For most glass, n decreases as λ increases (normal dispersion):

n_violet > n_blue > n_green > n_yellow > n_red

(Typical glass: n_violet ≈ 1.532, n_red ≈ 1.514.)

From Snell's law (n₁ sinθ₁ = n₂ sinθ₂) applied at each surface: different n → different θ₂ → different exit angle for each wavelength → *angular dispersion*: colours spread out.

**Angle of deviation** for a prism of apex angle A (thin prism approximation):

δ ≈ (n − 1)A

Deviation is larger for violet (higher n) than red → violet deflected most toward the base of the prism.

**Dispersive power** (a material property): ω = (n_F − n_C)/(n_D − 1), where F, C, D are the Fraunhofer spectral lines (486 nm, 656 nm, 589 nm). High ω = high dispersion relative to mean bending.

### Stage 3 — Cauchy's equation and material models

The wavelength dependence of n is approximated by **Cauchy's equation**:

n(λ) ≈ A + B/λ² + C/λ⁴ + …

For most optical glass in the visible range, n(λ) ≈ A + B/λ² is adequate. The physical origin: the refractive index arises from the interaction of light's electromagnetic field with bound electrons in the glass. Lower λ (higher frequency) → closer to electronic resonances → stronger interaction → higher n.

### Stage 4 — Achromatic doublets and the control of dispersion

A single converging lens has different focal lengths for different wavelengths (chromatic aberration). An achromatic doublet combines a crown-glass converging element (low ω) and a flint-glass diverging element (high ω). Choose powers P₁, P₂ and dispersive powers ω₁, ω₂ such that:

P_total = P₁ + P₂ (desired net power)  
ω₁P₁ + ω₂P₂ = 0 (no net angular dispersion)

Solving: P₁ = −P_total × ω₂/(ω₁ − ω₂); P₂ = P_total × ω₁/(ω₁ − ω₂).

This gives the same focal length for two wavelengths (typically F and C lines) while keeping a non-zero net power.

---

## 3. Why Beginners Fail

1. **Dispersion = refraction** — learners conflate dispersion with refraction in general. Refraction is the bending of light at an interface; dispersion is the *differential* bending by wavelength. A single-wavelength laser beam is refracted by a prism but not dispersed (no splitting). White light is refracted AND dispersed.
2. **Violet bends least** — learners reason "violet is a short wavelength → small bending" by analogy with wavelength and distance. In fact, shorter wavelength → higher n → more bending. The analogy with, say, diffraction (longer wavelength bends more) confuses the direction.
3. **Rainbow colours are painted onto raindrops** — learners think raindrops have pre-existing colour that they "show" to sunlight. In fact, white sunlight enters each raindrop; dispersion inside the drop sends each wavelength to a different exit angle; each observer sees only the wavelength arriving at the correct angle from that particular drop. The colour is created by the geometry of the observation, not stored in the drop.
4. **Dispersion and diffraction both separate colours** — true, but by different mechanisms and in different wavelength-order. Diffraction grating: longer wavelength diffracts more (red farther from centre). Prism dispersion: shorter wavelength refracts more (violet farther from straight-through). These are opposite orderings — learners mix them up.

---

## 4. Misconception Library

### M1 — "Dispersion is the same as refraction"

**Probe**: "A red laser beam passes through a glass prism. It bends. Is this dispersion?"  
**Characteristic phrase**: "Yes — it's being split by the prism."  
**What's wrong**: A single-wavelength beam is refracted but NOT dispersed — it bends as a whole with no colour splitting. Dispersion requires multiple wavelengths with different n. A laser produces one wavelength; no separation occurs.  
**Recovery**: Show a red laser through a prism (bends, no splitting) vs. white-light torch through the same prism (rainbow). Dispersion = differential refraction = requires wavelength spread.

### M2 — "Violet bends least because it has the shortest wavelength"

**Probe**: "Which colour is deviated most by a glass prism — red or violet?"  
**Characteristic phrase**: "Red — longer wavelength, bigger bending."  
**What's wrong**: Glass has n_violet > n_red (normal dispersion). From Snell's law, higher n → more bending. Violet deviates most, red least. The short-wavelength–less-bending intuition works for diffraction but is backwards for refraction.  
**Recovery**: Look up n for violet (≈1.532) and red (≈1.514) in crown glass. Apply Snell's law with each n: larger n → larger refraction angle from straight-through → more deviation. Tabulate: violet n → violet deviation > red n → red deviation.

### M3 — "A rainbow shows the colours that are in the raindrops"

**Probe**: "Why do we see a rainbow only when the sun is behind us and rain is in front?"  
**Characteristic phrase**: "The raindrops are coloured from the sunlight and we see them."  
**What's wrong**: Raindrops contain no colour — they contain white light that has entered and been internally reflected. Dispersion inside each drop sends different wavelengths at different exit angles relative to the incoming sunlight direction. An observer sees red at ≈42° and violet at ≈40° from the antisolar point. The specific geometry (sun behind you) places your eye at the right angle to see refracted light from the drops.  
**Recovery**: Draw the single-raindrop diagram: sunlight in, internal reflection, refraction out at the exit face. Show that violet exits at a smaller angle than red. Observer sees a ring of violet (inner arc) and red (outer arc). Vary the observer's angle: only one colour reaches the eye from a given drop at a given position.

### M4 — "Dispersion and diffraction both spread violet farthest from centre"

**Probe**: "White light hits a diffraction grating. Which colour appears farthest from the straight-through direction in the first-order maximum?"  
**Characteristic phrase**: "Violet — same as a prism."  
**What's wrong**: For a diffraction grating, dsinθ = mλ. Larger λ → larger θ → red appears farthest. The wavelength-order is reversed compared to prismatic dispersion.  
**Recovery**: For a prism: violet farthest (because n_violet highest). For diffraction: red farthest (because λ_red largest in mλ). Opposite orders. A quick mnemonic: prism = (n controls), diffraction = (λ controls) — and in both cases the controlling quantity is larger for the colour that deviates most, but the two controlling quantities go in opposite wavelength-directions.

---

## 5. Explanation Library

### Explanation A — Why n depends on λ

Light is an oscillating electromagnetic field. In a dielectric medium, the field polarises bound electrons, creating oscillating dipoles. The refractive index is determined by how strongly the medium responds. Closer to an electronic resonance frequency (in the UV for glass), the response is stronger → higher n. Violet is closer to the UV resonance than red → n_violet > n_red. This is the physical origin of normal dispersion.

### Explanation B — Deviation angle and the thin-prism formula

For a thin prism (small apex angle A, small incidence angle), the minimum deviation approximation is δ ≈ (n − 1)A for both surfaces combined. Since n > 1 and n varies with λ, δ varies with λ. Total angular spread (violet to red): Δδ = (n_V − n_R) × A. For crown glass (Δn ≈ 0.018) with A = 30°: Δδ ≈ 0.018 × 30° = 0.54° of spread. This small angle is all that separates the colours in a real prism — visible because the coloured bands are observed at long distance.

### Explanation C — Rainbow geometry

Primary rainbow: sunlight enters raindrop (refraction), reflects once off the back surface (TIR), exits (refraction). The geometry of these two refractions and one reflection produces a deviation of ≈138° for red (minimum deviation angle) and ≈140° for violet. Observer sees the reflected light at 180° − 138° = 42° from the antisolar point (red) and 180° − 140° = 40° (violet). Red forms the outer arc; violet the inner arc. The sky inside the rainbow is brighter (more orders of reflection from drops at smaller angles all overlap) than outside.

---

## 6. Analogy Library

### Primary analogy — Runners on different surfaces

Imagine a team of runners in a line (representing white light's colour components) crossing a border between pavement and sand at an angle. Violet runners are affected more by the sand (they slow down more, because they interact more strongly with the medium). Red runners are affected less. Each runner bends toward the normal by an amount proportional to how much they slow. Since violet slows more, it bends more. The team spreads into a rainbow.

**Breaking point**: Runners interact with the sand at a macroscopic level (friction). Light interacts with glass at the quantum/electromagnetic level (electron resonances). The "slowing" of light in glass is a phase velocity effect — individual photons are not slowed; the wave's phase velocity is c/n. The analogy does not account for the wavelength dependence mechanism (resonance proximity) and would wrongly suggest that denser materials always cause more dispersion.

### Anti-analogy — "Dispersion is like a prism painting colours onto white light"

White light contains all wavelengths. The prism does not add colour — it separates the already-present wavelengths by refracting each one differently. "Painting" implies creation; dispersion is a sorting, not a creation. This confusion is common in children's descriptions of rainbows but persists at the introductory physics level.

---

## 7. Demonstration Library

### Demo A — White light through a prism on a white wall

**Setup**: Project a narrow beam of sunlight or white-LED light through an equilateral glass prism onto a white wall or screen at distance ≥1 m.  
**Observation**: A clearly separated spectrum, red to violet. Note violet closest to the base of the prism (most deviated).  
**Teaching target**: Dispersion is visible, not computed. Identify R-O-Y-G-B-I-V order. Note that without a prism, the same beam produces only a white spot — the prism separates, it does not add.

### Demo B — Recombination with a second inverted prism

**Setup**: Place a second identical prism immediately after the first, rotated 180° (apex pointing in opposite direction).  
**Observation**: The dispersed spectrum recombines into white light after the second prism.  
**Teaching target**: Dispersion is reversible. The colours were always in the white light; the prism revealed them and the second prism hid them again. Newton's historical experiment — confirms white light is a mixture, not a pure entity.

### Demo C — Diffraction grating comparison

**Setup**: Shine white light through a diffraction grating (e.g., a CD). Compare the colour order and position to the prism spectrum.  
**Observation**: Grating: red farthest from centre; prism: violet farthest. The order reverses.  
**Teaching target**: Two different mechanisms that both separate wavelengths but in opposite colour order. Dispersion (refractive index) vs. diffraction (path difference ∝ λ).

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *observe the rainbow, then build the model*

**Why inductive here**: The rainbow is humanity's most familiar example of dispersion. Starting with the natural phenomenon and asking "why are the colours always in this order, and why is red always outside?" creates motivation for the refractive-index-wavelength relationship. A deductive start ("n depends on λ") feels arbitrary until the rainbow payoff arrives.

**Opening question**: "A rainbow always has red on the outside and violet on the inside. Why? And why does it appear as a curved arc, not a random splash of colour?"

**Sequence**:
1. Students propose explanations (most will say "the raindrops separate colours" without mechanism).
2. Demo A: prism spectrum. Establish: violet bends most, red least.
3. Present the n-vs-λ data for crown glass. Ask: "What pattern do you see?" (n decreases as λ increases.)
4. Link to Snell's law: higher n → more refraction → more deviation.
5. Apply to a single raindrop: draw the path of red and violet through the drop (two refractions + one internal reflection). Show violet exits at smaller angle (40°) than red (42°).
6. Show how this geometry, combined with the observer's position, produces the rainbow arc.
7. Demo C: compare to diffraction grating — red and violet positions swap. Why?
8. Closure: "Dispersion is the fact that n depends on λ. Everything else — rainbows, chromatic aberration, spectroscopy, achromatic lenses — follows from this one fact."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner confuses dispersion with refraction | Demo B (single-wavelength laser through prism — no dispersion). White light through same prism — dispersion. Difference = wavelength spread. |
| Learner thinks violet bends least | Look up n values for violet and red. Apply Snell's law numerically with each. Confirm: higher n → more bending. |
| Learner cannot explain rainbow geometry | Draw single-raindrop path: entry refraction → back-surface TIR → exit refraction. Show that red exits at 42° and violet at 40° from antisolar direction. Observer at each angle sees only that colour. |
| Learner confuses grating and prism colour order | Establish the two control rules side by side: prism: n_violet > n_red → violet more deviated. Grating: dsinθ = mλ → red larger λ → red more deviated. Opposite orderings. |
| Learner asks how to design an achromatic lens | Present the condition ω₁P₁ + ω₂P₂ = 0. Show that two materials with different dispersive powers but combined power P_total can eliminate dispersion while keeping refraction. |

---

## 10. Voice Teaching

### Opening
"Why is a rainbow red on the outside and violet on the inside? A raindrop is not coloured — it is full of white sunlight. The drop disperses that light: violet bends more inside the drop than red does, so it exits at a slightly different angle. Your eye picks up each colour from a slightly different drop, arranged in a ring. Dispersion turns one beam of white light into a sorted spread of wavelengths."

### Core physics
"The key fact: in glass, the refractive index is higher for shorter wavelengths. n_violet > n_red. From Snell's law, higher n means more bending. So violet bends more than red at every glass surface it crosses. The prism bends both — but violet more than red — and they come out at different angles. That spread is dispersion."

### Comparison to diffraction
"Here is a trap: diffraction gratings also spread white light into colours, but in the opposite order. For a grating, red goes farther from the centre because d sinθ = mλ — bigger λ means bigger θ. For a prism, violet goes farther because it has a bigger n. Two mechanisms, two colour orders. Never confuse them."

### Closing
"Dispersion is useful: it lets us build spectroscopes to identify elements from their light. It is a problem: it gives lenses chromatic aberration. We fix that with achromatic doublets — two lens elements whose dispersions cancel while their powers add."

---

## 11. Assessment

### Mastery gate

The learner can:
1. State that dispersion arises because n depends on λ, with n decreasing as λ increases for normal dispersion.
2. Predict which colour deviates most (violet) and least (red) in a glass prism, with justification from Snell's law.
3. Explain qualitatively how a rainbow forms (single-raindrop diagram: entry + TIR + exit + angle separation).
4. State that diffraction grating and prism spread colours in opposite orders and explain why.
5. Define dispersive power ω and describe how an achromatic doublet uses two materials to cancel chromatic dispersion.

### Formative golden probe

> "White light enters an equilateral prism (apex angle 60°, n_red = 1.515, n_violet = 1.530). At minimum deviation, (a) which colour exits with greater deviation? (b) Estimate the angular spread between red and violet using the thin-prism formula δ ≈ (n−1)A."

*Answers*: (a) Violet — n_violet > n_red → δ_violet > δ_red. (b) Δδ = (n_V − n_R) × A = (1.530 − 1.515) × 60° = 0.015 × 60° = 0.9°.  
*Likely errors*: Saying red deviates more (M2); using A = 60° incorrectly in a non-thin-prism formula (the formula is a first approximation for small A; for 60° it underestimates; the actual answer via exact Snell's law calculation is ≈1.2°).

### Confidence calibration

After the probe, ask: "Looking at a rainbow, which colour is on the outer arc?" Students who say red (correct) and can link it to violet bending more inside the raindrop (so violet exits at a smaller angle from the antisolar direction → inner arc) are calibrated. Students who say violet is outer: they have the prism right but the rainbow geometry backwards — reteach the raindrop diagram.

### Delayed retrieval check (next session opener)

"State the direction of normal dispersion: does n increase or decrease as wavelength increases?"  
Expected: n decreases as λ increases (violet has higher n than red). If reversed: reteach the physical origin (proximity to UV resonances).

---

## 12. Recovery Notes

**Recovery for violet/red confusion**:
1. Provide the n table: n_violet ≈ 1.53, n_red ≈ 1.51.
2. Solve Snell's law for each at θ₁ = 30°: sinθ₂ = sinθ₁/n → θ₂_violet < θ₂_red (violet bends more toward normal on entry). On exit (second surface), violet also bends more.
3. Physical anchor: "UV light does not pass through ordinary glass — it is absorbed near a resonance. Visible violet is just below this resonance, so glass responds more strongly to violet. That stronger response = higher n."

**Recovery for rainbow-geometry confusion**:
1. Draw a circle (raindrop cross-section). Mark the incoming sunlight direction.
2. Trace violet and red from entry (refraction), to back surface (TIR), to exit (refraction).
3. Measure the exit angle from the incoming direction for each colour: ≈40° (violet), ≈42° (red).
4. "You, the observer, stand with the sun behind you. Which drops send violet to your eye? Those at 40° from the antisolar point. Which send red? Those at 42°. Red forms the outer ring because it comes from drops at a larger angle."

---

## 13. Memory & Review

**Memory type**: Relational (n vs. λ relationship) + mechanistic (Snell's law applied per wavelength) + phenomenon (rainbow geometry)

**Encoding hooks**:
- "Violet vies for higher n" — higher index, higher deviation
- ROYGBIV = prism order from least (red) to most (violet) deviated
- Grating reverses: red farthest (λ controls), prism: violet farthest (n controls)
- Rainbow: red outer (42°), violet inner (40°) from antisolar point

**Spaced retrieval schedule**:
- Session +1: "Which colour is deviated most by a glass prism? Why?"
- Week 1: "Using the thin-prism formula, estimate the angular spread for glass with Δn = 0.02 and A = 45°."
- Week 3: "Draw a single-raindrop diagram showing why red is on the outer arc of a rainbow."
- Month 2: "What is an achromatic doublet? Why is it needed, and what two material properties must be matched?"

**Interleave with**: `phys.opt.refraction` (prerequisite — Snell's law), `phys.opt.lenses` (chromatic aberration and achromatic correction), `phys.opt.wave-optics` (grating dispersion comparison)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.opt.lenses` | Chromatic aberration in a single lens is the lens-level consequence of dispersion; achromatic doublet corrects it |
| `phys.opt.wave-optics` | Diffraction grating also disperses white light but in opposite wavelength order (λ controls vs. n controls) |
| Astronomy — spectroscopy | Prism spectrographs separate starlight into spectral lines; absorption line wavelengths identify elements in stellar atmospheres |
| Atmospheric optics — halos, coronae | Ice-crystal halos (22° halo) arise from refraction through hexagonal ice prisms; colour ordering follows dispersion |
| Materials science — glass formulation | Crown glass (low ω) vs. flint glass (high ω) — choice of dispersive power is a design parameter for optical systems |
| Chemistry — UV-Vis spectroscopy | n(λ) data and absorption spectra both reflect the electronic structure of the medium; Cauchy equation fits measured spectra |

---

## 15. Curriculum Feedback

**KG note**: `phys.opt.refraction` is the correct prerequisite — Snell's law and n must be fluent. No KG unlocks are listed, but this concept feeds naturally into `phys.opt.lenses` (chromatic aberration) and spectroscopy applications. The "proficient / understand" tags are correct — the core is conceptual (n vs. λ, mechanism), with light calculation only in the thin-prism formula.

**Authoring note**: The contrast between prism dispersion (violet farthest) and grating diffraction (red farthest) is the most important cross-concept link in this entry and should be made in every teaching session. Students who confuse the two mechanisms will make systematic errors in spectroscopy and optics problems.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
