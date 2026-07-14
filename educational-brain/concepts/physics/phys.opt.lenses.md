# phys.opt.lenses — Thin Lenses and Lens Formula

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.opt.lenses` |
| **Display name** | Thin Lenses and Lens Formula |
| **KG requires** | `phys.opt.refraction` |
| **KG unlocks** | `phys.opt.lens-power` |
| **Difficulty** | proficient |
| **Bloom level** | apply |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 5 |
| **KG description** | The thin lens formula 1/f = 1/v − 1/u relates focal length, image distance, and object distance for thin lenses. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

A magnifying glass makes things look bigger. A camera lens focuses the world onto a sensor. A projector lens throws a magnified image onto a screen. All of these are converging lenses — they bend light rays toward each other. Diverging lenses (thinner in the middle) spread rays apart, making things look smaller, the way a "fish-eye" peephole works. In both cases, refraction at two curved surfaces is what does the bending.

### Stage 2 — Quantitative entry

**Thin lens approximation**: lens thickness ≪ radii of curvature and ≪ object/image distances. All refraction treated as occurring at a single plane (the lens plane).

**Sign convention (New Cartesian)**: distances measured from the optical centre (lens). Incident light direction = positive. For real objects in front of the lens: u is negative. For image behind the lens (real image, converging): v is positive. Focal length: positive for converging (convex) lens; negative for diverging (concave) lens.

**Thin lens formula**: **1/f = 1/v − 1/u**

(Note sign difference from mirror formula: mirror has 1/f = 1/v + 1/u; lens has 1/f = 1/v − 1/u. The difference arises from the sign convention — u is negative for real objects.)

**Magnification**: m = v/u (= image height / object height)
- m > 0: upright (virtual image); m < 0: inverted (real image)

**Lensmaker's equation** (thin lens in air): 1/f = (n−1)(1/R₁ − 1/R₂), where n is the lens index and R₁, R₂ are radii of curvature of the two surfaces (sign conventions for R apply).

**Key cases for a converging lens** (f > 0, real object u < 0):
- |u| > 2f: real, inverted, diminished image between f and 2f on the far side
- |u| = 2f: real, inverted, same-size image at 2f
- f < |u| < 2f: real, inverted, magnified image beyond 2f
- |u| = f: image at infinity (parallel refracted rays)
- |u| < f: virtual, upright, magnified image on the same side as the object

**Diverging lens** (f < 0): always produces virtual, upright, diminished image on the same side as the object, regardless of object position.

### Stage 3 — Two-lens systems and power

**Power** P = 1/f (measured in dioptres D = m⁻¹). A 2 D lens has f = 0.5 m.

For two thin lenses in contact: P_total = P₁ + P₂ (equivalently, 1/f_eq = 1/f₁ + 1/f₂).

For two lenses separated by distance d: 1/f_eq = 1/f₁ + 1/f₂ − d/(f₁f₂).

Image formed by a two-lens system: treat the image from lens 1 as the object for lens 2.

### Stage 4 — Aberrations

**Chromatic aberration**: refractive index n depends on wavelength (dispersion) → different colours have different focal lengths. White-light images show coloured fringes. Corrected with achromatic doublets (crown glass + flint glass; one converging, one diverging, chosen so their dispersions cancel while their power sum is non-zero).

**Spherical aberration**: marginal rays (far from the axis) focus closer than paraxial rays. Corrected with aspherical lenses or aperture stops. Both aberrations also affect mirrors (chromatic does not, spherical does).

---

## 3. Why Beginners Fail

1. **Sign convention errors in the lens formula** — in the New Cartesian convention, u < 0 for real objects and the formula is 1/f = 1/v − 1/u. Learners either use the mirror formula (1/f = 1/v + 1/u, wrong for lenses) or forget that u is negative and substitute a positive number.
2. **Confusing converging and diverging lenses** — converging = thicker in centre; diverging = thinner in centre. Both are called "glass lenses" and look similar without handling. Learners apply converging-lens ray rules to diverging lenses.
3. **Assuming lenses behave like mirrors for virtual images** — for a concave mirror, a virtual image is behind the mirror. For a diverging lens, a virtual image is in front of the lens (same side as the object). Learners draw it on the wrong side.
4. **Forgetting that two-lens systems use sequential image formation** — learners try to add distances or apply a combined formula without first finding where lens 1 forms an image and using that as the object for lens 2.

---

## 4. Misconception Library

### M1 — "The lens formula for lenses is the same as for mirrors (1/v + 1/u = 1/f)"

**Probe**: "An object is 30 cm in front of a converging lens of focal length 10 cm. Using 1/v + 1/u = 1/f with u = −30 and f = +10, find v."  
**Characteristic phrase**: "Same formula as mirrors — just swap f's sign for a lens."  
**What's wrong**: The standard New Cartesian thin-lens formula is 1/v − 1/u = 1/f. With u = −30: 1/v − 1/(−30) = 1/10 → 1/v + 1/30 = 1/10 → 1/v = 1/10 − 1/30 = 2/30 → v = +15 cm. Using the mirror formula: 1/v + 1/(−30) = 1/10 → 1/v = 1/10 + 1/30 = 4/30 → v = 7.5 cm. The answers differ — and the correct one is 15 cm.  
**Recovery**: Derive the lens formula separately from Snell's law applied at each surface. Show that the formula is 1/v − 1/u = 1/f. Alternatively: state the rule clearly — lens: 1/v − 1/u; mirror: 1/v + 1/u — and drill the distinction with several numerical problems.

### M2 — "Converging lenses always converge all parallel rays to the same point"

**Probe**: "Why do camera lenses develop blurry edges (vignetting) or coloured fringes?"  
**Characteristic phrase**: "A good converging lens focuses all parallel rays to the focal point."  
**What's wrong**: This is only true for paraxial rays in the monochromatic case. Spherical aberration means marginal rays focus at a slightly different point. Chromatic aberration means different wavelengths focus at different points. Real lenses use multiple elements and aperture stops to minimise these effects — a single thin lens converges only approximately.  
**Recovery**: Show a white-light spectrum through a single converging lens: rainbow fringes around the focal spot. Compare to an achromatic doublet: clean white spot.

### M3 — "The virtual image from a diverging lens is behind the lens"

**Probe**: "Where does the virtual image form when an object is placed in front of a diverging lens?"  
**Characteristic phrase**: "Behind the lens, like a virtual image in a concave mirror."  
**What's wrong**: A diverging lens always forms a virtual image on the same side as the object (in front of the lens), not behind it. The refracted rays diverge — extending them backward on the incoming side locates the virtual image.  
**Recovery**: Draw the ray diagram for a diverging lens. Trace a ray parallel to the axis — it refracts as if diverging from the virtual focus (on the incoming side). Extend this refracted ray backward: the virtual image is in front of the lens, between the object and the lens, always.

### M4 — "Thicker lenses are always more powerful"

**Probe**: "A lens of glass (n=1.5) is ground more thickly at the centre. Is it always more powerful?"  
**Characteristic phrase**: "More glass = more bending = more power."  
**What's wrong**: Power is determined by the *radii of curvature* of the surfaces (lensmaker's equation), not directly by thickness. A flat slab of glass (thickness irrelevant for the thin-lens approximation) has 1/R₁ = 1/R₂ → 1/f = 0 → f = ∞ (no power). Thickness in the thin-lens approximation is negligible. In real thick lenses, thickness matters but through a more complex formula, not simply "more = stronger."  
**Recovery**: Apply lensmaker's equation to a flat slab (R₁ = ∞, R₂ = ∞ → 1/f = 0) and to a plano-convex lens (R₁ = R, R₂ = ∞ → 1/f = (n−1)/R). Same material, same n — only the curvature of the surfaces determines power.

---

## 5. Explanation Library

### Explanation A — Thin lens formula derivation via similar triangles

Consider an object of height h₀ at |u| from a converging lens (f > 0). The image at |v| has height hᵢ. Two pairs of similar triangles (one through the optical centre, one using the focal rays) give:

hᵢ/h₀ = −v/u (from the central ray through the optical centre, giving magnification)

Combine with the focal-ray geometry → 1/v − 1/u = 1/f.

### Explanation B — Power and the dioptre

The power of a lens P = 1/f (dioptres, D, when f in metres). Powers of thin lenses in contact add: P_total = P₁ + P₂. Example: eyeglass prescription "−2.0 D" means a diverging lens with f = −0.5 m. "Reading glasses +1.5 D" means converging lens, f = 0.67 m. The eye's own power (lens + cornea combined) is ~60 D.

### Explanation C — Sequential image formation in a two-lens system

Step 1: Ignore lens 2. Compute where lens 1 would form an image of the original object. Call this Image₁.  
Step 2: Image₁ is the object for lens 2. If Image₁ would form on the far side of lens 2 (where lens 2 is in the way), Image₁ is a virtual object for lens 2 (positive u for lens 2 in some conventions). Apply the lens formula again.  
Step 3: The final image is where lens 2 forms an image of Image₁.

This sequencing is essential — there is no shortcut except for the special case of two thin lenses in contact (d = 0).

---

## 6. Analogy Library

### Primary analogy — The lens as a prism array

Imagine slicing a converging lens into thin horizontal strips. Each strip is a tiny prism. Prisms at the edges (thicker part of a convex lens) bend light more toward the axis. Prisms near the centre bend less. Together they redirect all parallel rays to converge at one point — the focus. This explains *why* a thicker-at-centre glass converges: it is like a collection of prisms whose bending angles are graded to make rays converge.

**Breaking point**: The prism-array model correctly explains convergence direction and the role of geometry but misrepresents the actual physics — refraction at each surface, not a series of discrete prisms. It also breaks down for aberrations (it treats each strip independently, missing the effects of aperture and wavelength). Use it to build intuition only.

### Anti-analogy — "Lenses are just curved mirrors"

Mirrors work by reflection; lenses work by refraction at two surfaces. Mirror formula 1/v + 1/u = 1/f; lens formula 1/v − 1/u = 1/f. For a concave mirror, the virtual image is behind the mirror (where light doesn't go); for a diverging lens, the virtual image is in front of the lens (where light came from). The sign conventions, the image-side geometry, and the physical mechanism are all different. Mapping lens problems onto mirror thinking produces systematic errors.

---

## 7. Demonstration Library

### Demo A — Five cases with a converging lens and a candle

**Setup**: A large converging lens (f ≈ 15 cm) on an optical bench. Candle as object; white screen behind the lens.  
**Procedure**: Start with candle far beyond 2f; move candle closer to lens through all five positions.  
**Observations**: Identical sequence to concave mirror five cases, but images form on the *opposite side* of the lens (not the same side as the object for real images). Inside f: no image on screen; look through lens to see virtual upright magnified image.  
**Teaching target**: Five cases live. Students record image position, size, orientation at each candle position and match to formula predictions.

### Demo B — Diverging lens — always virtual, always diminished

**Setup**: A diverging lens. Look through it at a distant object.  
**Observation**: The image is always smaller and appears to be on the same side as the object (a virtual image closer to the lens than the object).  
**Confirm with formula**: f = −20 cm (diverging), u = −100 cm. 1/v = 1/f + 1/u = 1/(−20) + 1/(−100) ... wait: 1/v = 1/f + 1/u for the version where u is negative. Use 1/v − 1/u = 1/f → 1/v = 1/f + 1/u = −0.05 − 0.01 = ... Actually: 1/v = 1/f + 1/u = 1/(−20) + 1/(−100) = −0.05 − 0.01 = −0.06 → Incorrect — use the formula correctly: 1/v − 1/u = 1/f → 1/v = 1/f + 1/u = (1/(−20)) + (1/(−100)) = −5/100 − 1/100 = −6/100. Wait: 1/v − 1/u = 1/f; u = −100; 1/v − (1/(−100)) = 1/(−20) → 1/v + 1/100 = −1/20 → 1/v = −1/20 − 1/100 = −5/100 − 1/100 = −6/100 → v = −100/6 ≈ −16.7 cm. Negative v: virtual image on same side as object, 16.7 cm from lens — closer than the object (100 cm). Diminished: m = v/u = (−16.7)/(−100) = 0.167 → 1/6th the size. Virtual and upright (m > 0).

### Demo C — Lens power addition (spectacle simulation)

**Setup**: A +5 D convex lens (f = 20 cm) and a −5 D concave lens (f = −20 cm) of the same size.  
**In contact**: Total P = 5 − 5 = 0 D → flat glass (no optical power). Verified by showing that parallel rays remain parallel after passing through both lenses in contact.  
**Teaching target**: Powers add algebraically in contact; a corrective lens and the eye's own lens combine to bring focus onto the retina.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *measure first, derive second*

**Why inductive here**: The five-case behaviour of a converging lens (parallel to concave mirror) is non-intuitive without observation. Learners already know "lenses focus things" but do not expect a virtual image when the object is inside the focal length. Observation of Demo A provides the empirical pattern that the formula then explains and predicts.

**Opening challenge**: "Here is a converging lens and a candle. Before I set up the screen, predict: where will the image be when the candle is 50 cm away? 15 cm away? 5 cm away? (f = 10 cm)."

**Sequence**:
1. Students make predictions (usually: "always on the far side, inverted").
2. Demo A: observe the five cases. Note especially the jump to virtual image when candle is inside f.
3. Ask: "When the candle is 5 cm (inside f), the image appears on the same side as the candle and is upright. How can a converging lens do this?" Trace two rays — they diverge after the lens; extension backwards locates the virtual image.
4. Derive the formula via similar triangles.
5. Apply formula to all five cases. Numbers confirm observations.
6. Introduce power: P = 1/f. "What P corrects a myopic eye that focuses 0.5 m in front of the retina instead of on it?" (Need to move focus back 0.5 m → −2 D correction lens.)
7. Closure: "The thin lens formula, lensmaker's equation, and power addition let you design eyeglasses, cameras, and microscopes — all from one equation."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner uses mirror formula for lenses | Drill the distinction: write both formulas side by side. Mirror: 1/v + 1/u = 1/f. Lens: 1/v − 1/u = 1/f. Run the same numerical example both ways; show which matches the physical result. |
| Learner draws virtual image on wrong side for diverging lens | Trace the two principal rays for a diverging lens step by step: ray 1 (parallel) refracts as if from virtual F in front of lens; extend backward. Virtual image is always in front. |
| Learner confuses converging/diverging lens type | Handle both: converging (thicker centre) → press in the middle with your thumb to remember "inward = converging." Diverging (thinner centre) → feel the edge is thicker. |
| Learner cannot do two-lens system | Force a two-step approach: solve lens 1 alone → get v₁. Use v₁ as u₂ for lens 2 (adjust sign: if Image₁ is to the right of lens 2, it is a virtual object, u₂ > 0 if lens 2 is further right). |
| Learner asks "why is it 1/v − 1/u and not 1/v + 1/u?" | Derive from the sign convention: u is negative for real objects → 1/(−|u|) = −1/|u|. The formula 1/f = 1/v + 1/u with u negative becomes 1/f = 1/v − 1/|u|. Writing it explicitly with the sign convention absorbed: 1/v − 1/u = 1/f (where u = −|u|). |

---

## 10. Voice Teaching

### Opening
"A magnifying glass makes things look bigger — but only when you hold it close to the object. Hold it farther away, and the image flips upside down and shrinks. The thin lens formula explains exactly when each happens."

### Core formula
"One over f equals one over v minus one over u. Three distances. f is focal length — positive for converging. v is image distance — positive means the image is on the far side (real image). u is object distance — negative when the object is in front (always for a real object). Plug in, solve."

### Five cases
"When the object is beyond 2f: real, inverted, diminished — like a camera making a small image. At 2f: real, inverted, same size. Between f and 2f: real, inverted, magnified — like a projector. At f: no image, beams go parallel. Inside f: virtual, upright, magnified — like a magnifying glass."

### Misconception interrupt
"Here is the trap: the lens formula has a minus sign where the mirror formula has a plus sign. This is because u is negative for real objects, and the two formulas look different only because of how the sign convention is applied. Always write the correct formula for lenses before substituting any numbers."

---

## 11. Assessment

### Mastery gate

The learner can:
1. Apply the correct sign convention and thin lens formula to find image position and magnification.
2. State the image character (real/virtual, upright/inverted, magnified/diminished) for all five converging-lens cases and the one diverging-lens case.
3. Draw a correct two-principal-ray diagram for any of the six cases.
4. Calculate the focal length needed to correct myopia or hyperopia given the near/far point data.
5. Compute the equivalent focal length of two thin lenses in contact.

### Formative golden probe

> "An object is placed 8 cm in front of a converging lens of focal length 12 cm. (a) Find the image position. (b) Find the magnification. (c) State the image character. (d) Can you project this image on a screen?"

*Solution*: u = −8 cm, f = +12 cm. 1/v = 1/f + 1/u = 1/12 + 1/(−8) = 1/12 − 1/8 = 2/24 − 3/24 = −1/24 → v = −24 cm. m = v/u = (−24)/(−8) = 3. Image: v < 0 → virtual, same side as object. m = +3 → upright, magnified. Cannot project — virtual image.  
*Likely errors*: Positive u (+8 substituted) → wrong v. Using mirror formula → wrong answer. Saying m = −3 → wrongly calling it inverted.

### Confidence calibration

After the probe, ask: "The image is 24 cm in front of the lens. How do you see it?" (Look through the lens — the brain traces the diverging refracted rays backward to the virtual image location.) Students who say "hold a screen 24 cm in front of the lens" confuse virtual and real images — reteach the virtual-image concept.

### Delayed retrieval check (next session opener)

"Write the thin lens formula. What sign does f have for a converging lens? A diverging lens?"  
Expected: 1/v − 1/u = 1/f; f > 0 converging, f < 0 diverging. If the learner writes the mirror formula or gets signs wrong: reteach sign convention explicitly before moving on to lens power.

---

## 12. Recovery Notes

**Recovery for sign convention errors**:
1. Write a template at the top of every problem: "Real object in front of lens: u = −|distance|. Real image behind lens: v = +|distance|. Virtual image in front: v = −|distance|. Converging lens: f = +|f|. Diverging: f = −|f|."
2. Fill in the template with every problem before substituting.
3. After solving: check that the sign of v matches whether the image is real (should be +) or virtual (should be −) for the case at hand.

**Recovery for five-cases confusion**:
1. Create a table with columns: object position (in terms of f), formula result (v), m value, real/virtual, upright/inverted, magnified/diminished.
2. Fill in all five rows numerically (pick f = 10 cm; use u = −40, −20, −15, −10, −5 cm).
3. Verify each row against a ray diagram.
4. Commit the pattern to memory: inside f = virtual upright magnified; beyond f = real inverted; at f = ∞.

---

## 13. Memory & Review

**Memory type**: Procedural (formula + sign convention) + tabular case knowledge + formula network (lensmaker's equation, power)

**Encoding hooks**:
- Lens formula: 1/v **minus** 1/u = 1/f (the minus distinguishes it from the mirror formula)
- Converging: f positive, thicker at centre
- Diverging: f negative, thinner at centre
- Power: P = 1/f; unit dioptre (D); powers add for lenses in contact
- Five cases: same pattern as concave mirror, but images on the far side for real images

**Spaced retrieval schedule**:
- Session +1: "Write the thin lens formula. Solve a numerical problem with a converging lens."
- Week 1: "Describe the image for a diverging lens for any object position. Write the formula proof."
- Week 3: "A myopic eye can see clearly only up to 0.25 m. What spectacle power is needed to see clearly at infinity?"
- Month 2: "Derive the formula for a two-lens system separated by distance d."

**Interleave with**: `phys.opt.refraction` (prerequisite — Snell's law at each lens surface), `phys.opt.lens-power` (the direct downstream — power, dioptre, eye prescriptions, combinations)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.opt.lens-power` | P = 1/f; corrective lenses for myopia (−D) and hyperopia (+D); presbyopia; compound microscope/telescope power |
| `phys.opt.optical-instruments` | Camera (object beyond 2f → real diminished image on sensor); projector (f < u < 2f → real magnified image on screen); magnifier (u < f → virtual magnified image) |
| Medicine — ophthalmology | Eye's total power ~60 D; cornea ~40 D, lens ~20 D; accommodation by changing lens curvature (thus f) |
| Technology — camera design | Zoom lenses = multi-element systems where element spacing changes to vary f_eq |
| `phys.opt.wave-optics` | Chromatic aberration links to dispersion (dn/dλ); diffraction limit sets minimum resolvable detail (Rayleigh criterion: θ ≈ 1.22λ/D) |
| Astrophysics — telescope resolution | Larger aperture D → smaller diffraction limit → sharper images; f determines field of view vs. magnification trade-off |

---

## 15. Curriculum Feedback

**KG note**: `phys.opt.refraction` is the necessary prerequisite — Snell's law and refractive index must be fluent. The concept is tagged "developing" in difficulty in the KG but marked "proficient" in this entry based on the formula complexity, sign convention discipline, and the five-cases mastery requirement. The KG tag may warrant review. `phys.opt.lens-power` is the correct downstream unlock — the dioptre formalism and prescription calculation build directly on 1/f.

**Authoring note**: The single most error-prone element in this concept is the sign convention, specifically the formula being 1/v − 1/u = 1/f (not 1/v + 1/u). This distinction from the mirror formula must be stated explicitly, drilled early, and revisited in every assessment. Never let learners assume the two formulas are the same.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
