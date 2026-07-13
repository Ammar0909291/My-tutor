# Refraction and Snell's Law — `phys.opt.refraction`

## Identity

- **Concept ID**: `phys.opt.refraction`
- **Display name**: Refraction and Snell's Law
- **Domain**: optics
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `phys.opt.nature-of-light`
- **Unlocks**: `phys.opt.dispersion`, `phys.opt.lenses`, `phys.opt.total-internal-reflection`
- **Load-bearing prerequisite content**:
  - From `phys.opt.nature-of-light`: light travels in straight lines in a uniform medium; the ray model describes light as beams following geometric paths; light travels at c = 3×10⁸ m/s in vacuum; in a material medium, light travels slower — this speed change is the physical cause of refraction.
  - The refractive index n = c/v quantifies how much slower light travels in a medium compared to vacuum; refraction (bending at a boundary) is the direct consequence of the speed change.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: When light passes from one transparent material to another (like from air into water), it bends. This is why a straw in a glass of water looks broken, and why swimming pools look shallower than they are. The bending happens because light travels at different speeds in different materials — slower in denser materials.

**Stage 2 — Intermediate**: Snell's law: n₁sinθ₁ = n₂sinθ₂, where n₁ and n₂ are the refractive indices of the two media, θ₁ is the angle of incidence (from the normal), and θ₂ is the angle of refraction (from the normal). The refractive index n = c/v, where v is the speed of light in the medium (n ≥ 1 always; n_vacuum = 1 exactly; n_air ≈ 1.0003; n_water ≈ 1.33; n_glass ≈ 1.5; n_diamond ≈ 2.4). When light goes into a denser medium (n₂ > n₁): θ₂ < θ₁ — the ray bends toward the normal. Into a less dense medium (n₂ < n₁): θ₂ > θ₁ — the ray bends away from the normal. At θ₁ = 0° (normal incidence), there is no bending (θ₂ = 0°).

**Stage 3 — Advanced**: Snell's law is derived from Fermat's principle (same as reflection): the path of least time across the interface satisfies n₁sinθ₁ = n₂sinθ₂. Equivalently (Huygens' construction): the wavelength changes at the boundary (λ = λ₀/n), while the frequency stays constant; the change in wavelength means the wavefronts change direction, bending the wave. Total internal reflection (TIR) occurs when n₁ > n₂ and θ₁ ≥ θ_c, where sinθ_c = n₂/n₁ (critical angle). At TIR, no refracted ray exists; all energy is reflected. The apparent depth of an object in water is d_apparent = d_actual/n (for near-normal viewing).

**Stage 4 — Expert / University**: Snell's law in vector form: (n₁ k̂₁) × n̂ = (n₂ k̂₂) × n̂ (where k̂ are unit direction vectors and n̂ is the surface normal) — this is the boundary condition from Maxwell's equations (continuity of the tangential component of the wave vector k). The Fresnel equations give the amplitudes of the reflected and transmitted rays as a function of angle and polarization. At Brewster's angle (tanθ_B = n₂/n₁), the reflected beam is completely s-polarized. Metamaterials with negative refractive index bend light to negative angles — still obeying Snell's law but with n < 0.

**Model versioning**: Stage 2 is the operative model for all secondary-level problems (Snell's law calculation, apparent depth, critical angle intro). Stage 3 is needed for TIR and Huygens' construction. Stage 4 is university wave optics.

---

## Why beginners fail

The dominant root cause is **"denser means faster" (reversed speed-density relationship)**: learners know that denser materials have slower light but reverse the bending direction in diagrams. They reason: "denser material, more resistance, so light bends away from the normal." The correct rule is the opposite — slower speed bends the ray toward the normal (like a car wheel hitting soft ground at an angle turns toward the soft ground, not away). The sign of the bending is the persistent error; Snell's law gives the magnitude correctly but the learner draws the refracted ray on the wrong side of the normal.

The secondary root cause is **applying the sin rule to the wrong angles** (measuring from the surface instead of the normal) — the same M1 from reflection, re-appearing here because the angle convention is identical (normal-based) but the new context causes learners to revert to surface-based measurement.

---

## Misconception library

**M1 — "Denser medium bends light away from the normal"**
- Characteristic phrase: "Light slows down in glass, so it bends outward — away from the normal — because it's being pushed back."
- Probe: "A ray of light passes from air (n = 1) into glass (n = 1.5) at 40° to the normal. Does the refracted ray bend toward or away from the normal?"
- Expected wrong answer: "Away from the normal — glass is denser, so light slows and bends outward."
- Recovery: use the marching-soldiers analogy (see Analogy library). When one end of a line of soldiers hits mud and slows down, the line turns toward the mud — not away from it. Similarly, when a wavefront crosses into a slower medium (denser, higher n), the wavefront pivots toward the normal. Verify with Snell's law: n₁sinθ₁ = n₂sinθ₂. If n₂ > n₁, then sinθ₂ < sinθ₁, so θ₂ < θ₁ — angle decreases, meaning the ray bends toward the normal.

**M2 — "Angles measured from the surface (not the normal) in Snell's law"**
- Characteristic phrase: "The angle of incidence is 30° — the ray hits the glass at 30°."
- Probe: "A ray strikes a glass surface at 30° to the surface. What do you substitute for θ₁ in Snell's law?"
- Expected wrong answer: "θ₁ = 30°" (the glancing angle).
- Recovery: same convention as reflection — all angles from the normal. If the ray makes 30° with the surface, it makes 60° with the normal. θ₁ = 60°. Substituting 30° gives the wrong refracted angle (and a different physics). Always draw the normal first; always measure from the normal. The convention is universal in all optics.

**M3 — "Light changes frequency when it enters a new medium"**
- Characteristic phrase: "Different colours bend differently because their frequency changes in glass."
- Probe: "Red light and blue light enter glass. Which changes — their frequency or their wavelength?"
- Expected wrong answer: "Frequency changes — that's why different colours bend differently."
- Recovery: frequency does NOT change when light enters a new medium. Frequency is determined by the source and is preserved at the boundary (the wavefronts must match up at the boundary — the number of wavefronts arriving per second equals the number leaving per second). What changes is the wavelength: λ_medium = λ₀/n. Since v = fλ and f is fixed, v decreases by the same factor that λ decreases. Different colours (frequencies) have slightly different n values in the same glass (dispersion) — not different frequencies in the glass, but different refractive indices that each frequency experiences.

**M4 — "Snell's law doesn't apply at normal incidence"**
- Characteristic phrase: "At 0°, there's no angle, so Snell's law breaks down."
- Probe: "A ray hits a glass surface at exactly 0° to the normal. What does Snell's law predict?"
- Expected wrong answer: "Snell's law doesn't apply — you can't divide by zero or something."
- Recovery: at θ₁ = 0°: n₁sin(0°) = n₂sin(θ₂) → n₁ × 0 = n₂ × sin(θ₂) → sin(θ₂) = 0 → θ₂ = 0°. Snell's law applies perfectly — it predicts zero bending at normal incidence. A ray hitting straight on continues straight (no direction change), just at a different speed. This is mathematically and physically consistent.

---

## Explanation library

**E1 — Snell's law from the speed change (physical derivation)**
"Light travels slower in a denser medium (speed v = c/n). Consider a wavefront — a line connecting points of equal phase — crossing the boundary. The left edge of the wavefront enters the glass first and slows down. While that edge travels a shorter distance in the glass, the right edge is still in air and travels a longer distance. The wavefront pivots — the slower edge lags, the faster edge leads — and the whole ray direction turns toward the normal. Quantify: the distance travelled in medium 1 along the boundary in time t is v₁t sinθ₁; in medium 2 it is v₂t sinθ₂. For the wavefront to remain continuous: v₁sinθ₁ = v₂sinθ₂. Substitute v = c/n: sinθ₁/n₁ = sinθ₂/n₂, rearranged to n₁sinθ₁ = n₂sinθ₂."

**E2 — Apparent depth formula (application)**
"A fish is 2 m below the surface of water (n = 1.33). Looking from above at near-normal incidence, the apparent depth is d_apparent = d_actual/n = 2/1.33 ≈ 1.5 m. The fish appears to be 1.5 m deep, not 2 m. This is why swimming pools look shallower than they are — and why spearfishing requires aiming below where the fish appears to be."

**E3 — Critical angle and total internal reflection**
"Total internal reflection occurs when light tries to go from a denser to a less dense medium (n₁ > n₂) at a steep enough angle. Snell's law: n₁sinθ₁ = n₂sinθ₂. As θ₁ increases, θ₂ increases faster (since n₁ > n₂). When θ₂ reaches 90°: n₁sinθ_c = n₂sin90° = n₂, so sinθ_c = n₂/n₁. For θ₁ > θ_c: no solution exists for sinθ₂ — no refracted ray; 100% of the light is reflected. This is the basis of optical fibres (light trapped in the glass core by TIR at the core-cladding boundary)."

---

## Analogy library

**Primary analogy — Marching soldiers crossing a mud line**
A line of soldiers marching at an angle toward a strip of mud (slow ground) on their left. When the left end of the line reaches the mud, it slows down. The right end is still on firm ground, moving fast. The line pivots — the left end lags, the right end leads — and the whole formation turns toward the mud. This is exactly what happens to a wavefront crossing into a denser medium (slower light). The angle toward the mud corresponds to the ray bending toward the normal when entering a denser medium.

**Breaking point**: (1) The soldiers analogy fails when n < 1 (light can travel faster than c in some exotic metamaterials — analogous to soldiers speeding up on mud, which is unphysical). (2) The analogy is 2D and doesn't naturally extend to 3D refraction. (3) Soldiers don't have a "frequency" — the analogy captures the direction change but not the wavelength change (the most common M3 confusion).

**Anti-analogy — "Refraction is like a ball rolling into sand (slowing down)"**
A ball rolling from a hard surface onto sand slows down — but it doesn't change direction (unless you roll it at an angle). The refraction analogy requires the oblique approach and the partial crossing of the boundary. A ball rolled straight at the sand slows but doesn't bend (like normal incidence: no bending). A ball rolled at an angle DOES veer — the part of the ball that hits the sand first slows, causing the ball to turn. But the direction is toward the sand (slower region) for the oblique case — correct for light going into a slower medium. The ball analogy gives the right direction for this case but breaks for light going from slow to fast (emerging from glass into air), where light bends away from the normal — a ball would accelerate and might not change direction at all.

---

## Demonstration library

**D1 — Straw in water (broken appearance)**
Place a straw in a glass of water at an angle. Viewed from the side, the straw appears to bend at the water surface. Ask: "What does this suggest about the path of light from the straw to your eye?" (It bends at the air-water interface.) "Does the straw bend toward or away from the normal at the surface?" (Away — going from water to air, less dense, so bends away from normal.) "Which way would it bend going from air into water?" (Toward the normal.) Simple, universal, requires no equipment beyond a glass of water and a straw.

**D2 — Semicircular glass block and laser**
Shine a laser at the flat face of a semicircular glass block, aiming at the curved center. The curved surface is normal to the incident ray at all points, so no refraction occurs at entry; all bending happens at the flat face at exit. Measure θ₁ and θ₂ at exit. Verify n₁sinθ₁ = n₂sinθ₂. Then increase the angle until TIR occurs — the transmitted ray disappears and the reflected ray brightens. Measure the critical angle. This is a complete quantitative demonstration of both Snell's law and TIR.

**D3 — Coin in a cup (apparent depth illusion)**
Place a coin at the bottom of an opaque cup. Position a viewer so the coin is just out of view over the rim. Without moving the viewer, add water to the cup. The coin "appears" as water raises the apparent position of the bottom — the coin becomes visible because refraction raises its apparent position. Directly demonstrates apparent depth and the bending-toward-normal rule at the water-air interface.

---

## Discovery lesson

**Argue for guided empirical discovery with derivation**:

The direction of bending (M1's territory) is discoverable from D1 or D3 before naming Snell's law. "The straw looks bent in which direction? Which way does the light actually bend when it goes from water into air?" (Away from the normal — bends outward.) "What about going from air into water?" (By time-reversal symmetry of light, toward the normal.)

Once the direction rule is established empirically, the quantitative law follows from the Huygens wavefront argument (E1): the marching-soldiers picture makes the formula n₁sinθ₁ = n₂sinθ₂ derivable, not just memorable. Showing the derivation burns in both the formula and the correct bending direction simultaneously — the formula is the rigorous form of what was just observed.

The discovery sequence: observe bending → determine direction → derive formula from speed-change argument → verify numerically with D2 → extend to TIR.

---

## Teaching actions

**TA1 — Draw the normal first (same rule as reflection)**: Before any Snell's law calculation, require the learner to draw the normal. "No normal drawn → no marks for the geometry." This is identical to the reflection discipline — one more repetition of the universal optics angle convention.

**TA2 — Direction check before calculation**: After identifying the media (n₁, n₂), require the learner to state: "Going into denser (n₂ > n₁) → bend toward normal. Going into less dense (n₂ < n₁) → bend away from normal." Draw the approximate refracted ray direction BEFORE substituting into Snell's law — then the calculation confirms the direction rather than determining it.

**TA3 — Frequency vs. wavelength distinction**: For any refraction problem involving colour or dispersion, ask: "What changes when light enters the medium — frequency or wavelength?" (Wavelength. Frequency is invariant.) Then: "Which is different for different colours — their frequency (fixed by source) or their n value in glass?" (Their n value — that's dispersion.)

**TA4 — Critical angle computation ritual**: For TIR problems, require: (1) identify which medium is denser (larger n), (2) confirm light is going from denser to less dense (n₁ > n₂), (3) use sinθ_c = n₂/n₁ (smaller n divided by larger n). If n₁ < n₂, there is no critical angle and TIR is impossible — the learner must check this before computing.

---

## Voice teaching

> "Snell's law: n₁sinθ₁ = n₂sinθ₂. Angles from the normal — always. Going into glass (denser, higher n): the angle decreases — the ray bends toward the normal. Coming out of glass (into air, lower n): the angle increases — the ray bends away from the normal. The marching-soldiers picture: the slower end of the line lags, the whole line turns toward the slower medium. That's the direction. The formula gives you the exact angle."

> "Frequency doesn't change at a boundary. The source sets the frequency; the medium can't change it — wavefronts must match up at the boundary. What changes is the wavelength: λ = λ₀/n. Speed changes (v = c/n). Frequency is constant. This is why different colours have different n values in glass (dispersion) but all travel at the same frequency they started with."

> "Total internal reflection: going from glass to air, bigger angle, bigger angle — until the refracted ray would have to go along the surface (θ₂ = 90°). That's the critical angle. Any steeper angle: no refracted ray — 100% reflection. This is how optical fibres work: light trapped in the glass core bounces between the walls by TIR, never leaking out, travelling thousands of kilometres."

---

## Assessment

**Mastery gate**: The learner can (1) state Snell's law and identify which way the ray bends (toward/away from normal) when n₂ > n₁ vs. n₂ < n₁; (2) calculate θ₂ given n₁, θ₁, and n₂; (3) identify that frequency is invariant and wavelength changes; (4) calculate the critical angle for TIR given n₁ and n₂.

**Formative golden probe**
> "A ray of light in air (n = 1.00) strikes a water surface (n = 1.33) at 50° to the normal. (a) Calculate the angle of refraction in water. (b) Does the refracted ray bend toward or away from the normal? (c) The ray then hits the water-air boundary from inside at 40°. Does TIR occur? (d) What is the critical angle for the water-air interface?"

- (a): n₁sinθ₁ = n₂sinθ₂ → 1.00 × sin50° = 1.33 × sinθ₂ → sinθ₂ = 0.766/1.33 = 0.576 → θ₂ ≈ 35.2°
- (b): toward the normal (going into denser medium, angle decreased from 50° to 35°)
- (c): sinθ_c = n₂/n₁ = 1.00/1.33 = 0.752 → θ_c ≈ 48.8°. Since 40° < 48.8°, TIR does NOT occur
- (d): θ_c ≈ 48.8° (from part c)

**Confidence calibration question**
After (b): "Why does the ray bend toward the normal in water? Can you explain it from the speed-change argument?" (1–5 confidence). Low confidence or incorrect direction → M1 (reversed bending direction) is active; use the soldiers analogy.

**Delayed retrieval check (48 h / 7 days)**
"A fish is 3 m below the surface of a lake. To a person looking straight down, how deep does the fish appear to be? (n_water = 1.33)" (d_apparent = 3/1.33 ≈ 2.26 m — the fish appears shallower than it is.)

---

## Recovery notes

**Failure mode A — M1 persists (bending direction reversed)**
Run the soldiers analogy explicitly: draw a line of dots (soldiers) marching at an angle toward a boundary. "When the left end hits mud (slow) and the right end is still on firm ground (fast) — which end moves forward faster? Which end lags?" (Right fast, left lags.) "The whole line turns — which way? Toward the mud or away?" (Toward the mud.) "Mud = denser medium = slower light. Light bends toward the denser medium." Then verify with Snell's law: if n₂ > n₁, then sinθ₂ < sinθ₁, so θ₂ < θ₁ — consistent with bending toward the normal.

**Failure mode B — Angles from surface (M2)**
Identical recovery to reflection M1: draw the normal physically; measure from it. "In every optics formula — reflection, refraction, TIR — angles are from the normal. Surface-angle is not a physics angle in optics."

**Failure mode C — M3 (frequency changes)**
"What does a wave's frequency mean? How many cycles per second. When a wave crosses a boundary, does the source suddenly produce a different number of cycles per second?" No — the source is unchanged. "Can the boundary create or destroy wave cycles?" No. "So the frequency must be..." Constant. "Then what changes?" Speed = fλ; f fixed, so v changes, therefore λ = v/f changes. "For different colours: is it their frequency that differs in glass, or the glass's response (n) to each frequency?" The glass has a slightly different n for each frequency — that's dispersion.

---

## Memory & review

**Memory type**: Formula (n₁sinθ₁ = n₂sinθ₂) + direction rule (denser → toward normal) + invariant (frequency fixed, wavelength changes) + critical angle (sinθ_c = n₂/n₁).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State Snell's law. Which way does light bend when going from air into glass?"
- "A ray hits glass (n=1.5) at 30° to the normal from air. What is the refracted angle?"
- "What changes when light enters a new medium — its frequency or its wavelength?"
- "Calculate the critical angle for glass (n=1.5) to air (n=1.0)."

**Interleaving**: After mastery, mix refraction problems with reflection problems — learners must identify which law applies (same medium → reflection; crossing boundary → Snell's law). Also mix with TIR problems (Snell's law with sinθ₂ > 1 signaling TIR) to build fluency with the critical-angle boundary condition.

---

## Transfer map

**Immediate transfers**:
- `phys.opt.total-internal-reflection`: the critical-angle condition sinθ_c = n₂/n₁ is derived directly from Snell's law; optical fibres and TIR prisms are the applications
- `phys.opt.lenses`: converging and diverging lenses work by refraction at each curved surface; every surface obeys Snell's law; the thin-lens equation is an aggregate
- `phys.opt.dispersion`: different n for different wavelengths → different θ₂ → colour separation (prism, rainbow)

**Downstream transfers**:
- `phys.opt.wave-optics` (prerequisite already): the Huygens' principle derivation of Snell's law connects the ray model to the wave model — refraction is a wavefront boundary condition
- Apparent depth formula: everyday application of refraction; relevant to photography (underwater), fishing, pool depth estimation

**Cross-subject transfers**:
- `chem` — refractive index measurement: Abbe refractometer measures n of liquids to identify compounds (oils, sugars) — direct application of Snell's law at a glass-liquid boundary
- Biology — the eye: the cornea and lens refract light to focus it on the retina; the eye has refractive indices ~1.34–1.41 across its optical elements; spectacles correct refractive errors using lenses (converging for myopia, diverging for hyperopia)

---

## Curriculum feedback

The KG description "Snell's law n₁sinθ₁ = n₂sinθ₂ describes how light bends at an interface between media of different refractive indices" is accurate.

One gap: the KG description does not state the bending direction rule (toward normal going into denser medium). This directional knowledge is what learners most frequently get wrong (M1) and is not derivable from "n₁sinθ₁ = n₂sinθ₂" alone without understanding which quantity is larger. The learning outcomes should specify: when n₂ > n₁, θ₂ < θ₁ (toward normal); when n₂ < n₁, θ₂ > θ₁ (away from normal).

A second gap: the KG does not mention the critical angle or total internal reflection, even though TIR is listed as an unlock. Since the critical angle condition sinθ_c = n₂/n₁ is derived directly from Snell's law (it is the angle at which θ₂ = 90°), it belongs in the refraction concept — not deferred entirely to a separate TIR concept.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
