# phys.opt.polarization — Polarization of Light

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.opt.polarization` |
| **Display name** | Polarization of Light |
| **KG requires** | `phys.opt.wave-optics` |
| **KG unlocks** | `phys.opt.brewsters-law` |
| **Difficulty** | advanced |
| **Bloom level** | understand |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 5 |
| **KG description** | Polarization describes the orientation of the electric field oscillation in transverse electromagnetic waves. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

A light wave is a transverse wave — the electric field oscillates perpendicular to the direction of travel. In ordinary (unpolarised) light, the field oscillates in every possible perpendicular direction, changing randomly from moment to moment. A polarising filter passes only the component oscillating in one particular direction; it absorbs (or reflects) all others. Two polarising filters at 90° to each other block all light — no direction of oscillation can pass both. This is why LCD screens go dark when you tilt them: the two polarisers misalign.

### Stage 2 — Quantitative entry

**Polarisation state**: the direction of the electric field **E** in the plane perpendicular to propagation.

**Unpolarised light**: equal intensity in all polarisation directions, randomly fluctuating on timescales ~10⁻¹⁴ s (shorter than any detector responds to).

**Linear polarisation**: **E** oscillates in a fixed plane. Described by the polarisation angle φ relative to a reference axis.

**Malus's Law**: When linearly polarised light of intensity I₀ passes through a linear polariser (analyser) at angle θ to the polarisation direction:

**I = I₀ cos²θ**

At θ = 0°: I = I₀ (full transmission). At θ = 90°: I = 0 (extinction). At θ = 45°: I = I₀/2.

**Unpolarised light through one polariser**: output intensity = I₀/2 (independent of polariser orientation), output is linearly polarised.

**Circular and elliptical polarisation**: **E** rotates in a circle (or ellipse) as the wave propagates. Produced by combining two orthogonal linear components with a quarter-wave phase shift. Relevant to optical activity, LCD operation, and 3D cinema.

### Stage 3 — Mechanisms of polarisation

**By absorption (dichroism)**: Polaroid filters contain aligned polymer chains (or iodine crystals) that absorb one E-direction component. Practical, cheap, used in sunglasses and LCDs.

**By reflection (Brewster's law)**: At a specific angle of incidence (Brewster's angle θ_B), reflected light is completely linearly polarised (s-polarised; the p-component is entirely transmitted). tan θ_B = n₂/n₁. For glass (n = 1.5) in air: θ_B ≈ 56.3°.

**By scattering (Rayleigh scattering)**: Light scattered 90° from a beam in the sky is partially linearly polarised. The sky appears polarised in a band 90° from the sun. Bees navigate using this.

**By birefringence (double refraction)**: Anisotropic crystals (calcite, quartz) have two different refractive indices for two orthogonal polarisation components (ordinary and extraordinary rays). The rays travel at different speeds, producing a phase shift — the basis for wave plates (retarders).

### Stage 4 — Jones vectors and Mueller matrices

Polarisation state is fully described by a Jones vector (2×1 complex column vector giving E_x and E_y amplitudes and phases). Optical elements are 2×2 Jones matrices. Mueller matrices operate on Stokes parameters (4-element real vectors describing partially polarised light). These are used in optical engineering and polarimetry but are beyond introductory physics.

---

## 3. Why Beginners Fail

1. **Polarisation = the direction light is going** — learners confuse the polarisation direction (direction of **E** oscillation) with the direction of propagation. These are perpendicular: polarisation is in the plane perpendicular to propagation.
2. **Two crossed polarisers block all light — but adding a third at 45° lets some through** — this is counterintuitive and violates the "blocking is blocking" intuition. Learners cannot accept that inserting a polariser between two crossed ones increases transmitted intensity.
3. **Malus's law applies to unpolarised light** — learners apply I = I₀cos²θ directly to unpolarised input. Malus's law requires linearly polarised input; unpolarised light gives I₀/2 regardless of the analyser angle.
4. **Polarisation by reflection means complete polarisation at all angles** — Brewster's angle gives complete polarisation of the *reflected* beam. At other angles, the reflected beam is only partially polarised. Learners think any reflection produces polarised light.

---

## 4. Misconception Library

### M1 — "Polarisation means the direction the light is travelling"

**Probe**: "Vertically polarised light travels horizontally. In which direction does the electric field oscillate?"  
**Characteristic phrase**: "The light goes sideways, so the field must oscillate up-down along the travel direction."  
**What's wrong**: **E** oscillates perpendicular to the propagation direction. For light travelling horizontally, **E** oscillates in the vertical plane (for vertical polarisation). **E** is never parallel to the propagation direction for a transverse wave.  
**Recovery**: Draw a sinusoidal wave on a horizontal axis (propagation). Draw vertical arrows along the wave (E oscillation). The arrows are perpendicular to travel. For polarisation: the plane in which E oscillates is specified.

### M2 — "Two crossed polarisers block all light; inserting a third can only make it darker"

**Probe**: "Two Polaroids at 90° let no light through. A third Polaroid is placed between them at 45°. What happens?"  
**Characteristic phrase**: "Still no light — you can't unblock blocked light by adding more blocking."  
**What's wrong**: After polariser 1 (0°), light is linearly polarised at 0°. After the 45° polariser: Malus's law → I₂ = I₁ cos²45° = I₁/2, now polarised at 45°. After the 90° polariser: I₃ = I₂ cos²45° = I₁/4. Non-zero. The middle polariser rotates the polarisation direction so some light can pass through the final polariser.  
**Recovery**: Apply Malus's law step by step. The key insight: each polariser projects the incoming polarisation onto its own axis; the output is newly polarised in the polariser's direction. "Blocking" in optics is a projection operation, not a gate.

### M3 — "Malus's law applies to unpolarised light as well as polarised light"

**Probe**: "Unpolarised light of intensity I₀ passes through a linear polariser oriented at 30° from vertical. What is the output intensity?"  
**Characteristic phrase**: "I₀ cos²30° = 3I₀/4."  
**What's wrong**: Malus's law (I = I₀cos²θ) requires the input to be linearly polarised and θ to be the angle between the input polarisation and the polariser axis. For unpolarised input, the output is always I₀/2 regardless of the polariser orientation. The cos²θ factor doesn't apply — you average over all orientations.  
**Recovery**: Derive the I₀/2 result: average cos²θ over all θ from 0 to 2π: ⟨cos²θ⟩ = 1/2. Therefore unpolarised input → output = (I₀)(1/2) = I₀/2.

### M4 — "Reflected light is always completely polarised"

**Probe**: "Sunglasses with polarising lenses block glare from water. Does this mean all reflected light from water is completely polarised?"  
**Characteristic phrase**: "Yes — reflected light from surfaces is always polarised."  
**What's wrong**: Only at Brewster's angle is the reflected beam *completely* polarised. At other angles, the reflected beam is *partially* polarised (the s-component is more strongly reflected than the p-component, but both are present). Polarising sunglasses work because the partial polarisation is predominantly s-polarised; blocking it reduces glare significantly even without complete polarisation.  
**Recovery**: Apply Fresnel equations qualitatively: reflectance R_s and R_p are both non-zero at most angles except at Brewster's where R_p = 0. At low angles of incidence (looking nearly straight down at water), polarisation is much weaker — sunglasses help less.

---

## 5. Explanation Library

### Explanation A — Malus's law derivation

Linearly polarised wave, electric field amplitude E₀, polarisation along the x-axis. Passes through a polariser with transmission axis at angle θ to x. The transmitted E-field component: E_t = E₀ cosθ. Intensity ∝ E²: I = I₀ cos²θ. This is Malus's law. Notably, the blocked component (E₀ sinθ) is absorbed by the polariser — its energy goes into heating the material.

### Explanation B — Three-polariser paradox

Initial intensity I₀ after first polariser (0°): I₁ = I₀ (all passes, output polarised at 0°).  
After second polariser (45°): I₂ = I₁ cos²45° = I₀/2. Output polarised at 45°.  
After third polariser (90°): I₃ = I₂ cos²45° = (I₀/2)(1/2) = I₀/4. Output polarised at 90°.  
Without the middle polariser: after first (0°) and third (90°), I = I₀ cos²90° = 0.  
The middle polariser "rotates" the polarisation in two steps of 45° rather than trying to project 0° onto 90° directly.

### Explanation C — Brewster's angle

The reflected beam is polarised because the p-component (polarisation in the plane of incidence) radiates from oscillating dipoles in the material. At the Brewster angle, the reflected p-direction coincides with the direction of dipole oscillation — dipoles do not radiate along their axis — so the p-component cannot be reflected. Only the s-component (perpendicular to the plane of incidence) appears in the reflected beam. The condition for this is: reflected ray ⊥ refracted ray → θ_r + θ_t = 90° → tan θ_B = n₂/n₁.

---

## 6. Analogy Library

### Primary analogy — Venetian blinds for waves

Imagine a rope wave being fed through a slatted fence (a polarising filter). If the slats are vertical, only vertical oscillations of the rope pass through; horizontal oscillations are blocked by the slats. If you then put a second fence with horizontal slats, it blocks what the first fence passed. Insert a fence at 45°: it converts the vertical oscillation into a 45° one (by projection), and the final horizontal fence then gets some of the 45° component to pass.

**Breaking point**: A rope can only oscillate in one plane at a time — it doesn't have the "random orientation" character of unpolarised light (which has all orientations). The analogy also implies a physical barrier (the slat), whereas the physical mechanism in a polarising filter is preferential absorption, not mechanical blocking. And the 3D analogy breaks down for circular and elliptical polarisation.

### Anti-analogy — "Polarisation is the same as interference or diffraction"

Interference and diffraction arise from the wave's *phase* relationships between different parts of the wavefront. Polarisation arises from the *direction* of the electric field oscillation — a completely different property. A polariser affects all wavelengths nearly equally (it is orientation-selective, not phase-selective). A diffraction grating or thin film is phase-selective. Never conflate these: they are independent properties of a wave.

---

## 7. Demonstration Library

### Demo A — Two and three Polaroids

**Setup**: Light box or bright lamp. Two Polaroid sheets (from old LCD monitors or polarising filter sheets). Observe intensity as the second Polaroid is rotated.  
**Observations**: (1) One Polaroid: intensity drops to half (from unpolarised input), polarisation visible by holding the filter up. (2) Two Polaroids parallel: bright. (3) Two Polaroids at 90° (crossed): dark. (4) Insert a third Polaroid at 45° between the crossed pair: light reappears.  
**Teaching target**: Malus's law (I ∝ cos²θ); the three-polariser paradox made physical.

### Demo B — Polarisation by reflection (Brewster's angle)

**Setup**: Glass plate on a dark surface. Shine a bright light at approximately 56° incidence (Brewster's angle for glass). View the reflection through a Polaroid analyser.  
**Observations**: Rotating the analyser: at one orientation, reflected glare is extinguished; at 90°, bright. Demonstrates complete s-polarisation of the reflected beam at Brewster's angle.  
**Teaching target**: Real-world application — why polarising sunglasses reduce glare from horizontal surfaces (water, road): horizontal reflected glare is s-polarised (horizontal), so vertical-axis Polaroid sunglasses cut it.

### Demo C — Sky polarisation (Rayleigh scattering)

**Setup**: Go outdoors on a clear day. Hold a Polaroid filter and look at the sky at 90° from the sun (e.g., if the sun is to the east, look north or south).  
**Observation**: Rotating the Polaroid clearly modulates the brightness of the sky — the sky light is partially linearly polarised at 90° to the sun direction.  
**Teaching target**: Scattering as a polarisation mechanism. Scattered light is polarised because the scattering dipoles cannot radiate along their own axis (same physical origin as Brewster's law).

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *manipulate first, model second*

**Why inductive here**: The phenomena are surprising enough that observation creates genuine puzzlement before the model is introduced. The crossed-polariser extinction and the three-polariser reappearance both violate common sense and demand explanation. An inductive path — observe, be puzzled, seek mechanism — is far more motivating than "transverse waves can be polarised, here is Malus's law."

**Opening challenge**: "I have two Polaroid filters. Watch what happens as I rotate one against the other. [Demo A.] Now — if two crossed Polaroids block all light, what will adding a third between them do? Make a prediction, then we'll test it."

**Sequence**:
1. Most students predict inserting a third filter makes it darker or keeps it dark.
2. Demo A step 4: light reappears. Pause for genuine surprise.
3. Ask: "What did the middle filter do?" Lead toward: "It re-polarised the light at 45° — a new direction the final filter could then project."
4. Formalise with Malus's law. Calculate the step-by-step intensities.
5. Introduce unpolarised light: why does one filter always give I₀/2 regardless of orientation? Average cos²θ = 1/2.
6. Demo B: why sunglasses reduce glare — Brewster's angle.
7. Demo C (outdoor): sky polarisation — students experience the effect physically.
8. Closure: "Polarisation is the E-field orientation degree of freedom. Controlling it lets us build LCD screens, optical isolators, stress-measurement instruments, and 3D cinema glasses."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner confuses polarisation direction with propagation direction | Draw E-field arrows perpendicular to the propagation direction on a wave diagram. "Polarisation is WHERE the field points, not where the wave goes." |
| Learner cannot explain three-polariser paradox | Apply Malus's law sequentially: I₁ → I₂ = I₁cos²45° → I₃ = I₂cos²45°. Show that each step uses the output polarisation of the previous element as the new input polarisation direction. |
| Learner applies Malus's law to unpolarised input | Derive ⟨cos²θ⟩ = 1/2 by averaging. "Malus's law needs a definite θ — unpolarised light has no definite θ, so we average." |
| Learner thinks all reflected light is fully polarised | Sketch R_s and R_p vs. angle (qualitative Fresnel curves). R_p = 0 only at θ_B; at all other angles both components reflect. Polarising sunglasses work due to partial, not complete, polarisation. |
| Learner asks "what about circular polarisation?" | Circular polarisation = two orthogonal linear components with a π/2 phase shift between them. Introduce qualitatively; defer Jones vector formalism. |

---

## 10. Voice Teaching

### Opening
"Hold two Polaroid sheets up to a light. Rotate one — watch the light go dark when they are at 90°. Now put a third sheet between them at 45°. Light comes back through. More filters, more light — welcome to polarisation, where optics gets strange."

### Core concept
"Light is a transverse wave — the electric field oscillates in a direction perpendicular to where the light is going. In unpolarised light, that direction is random and changes millions of times per second. A Polaroid filter passes only one direction and absorbs all others. The output is linearly polarised: the field oscillates in one fixed direction."

### Malus's law
"If polarised light of intensity I₀ hits a polariser at angle θ to the polarisation axis, the transmitted intensity is I₀ cos²θ. At 0°: full transmission. At 90°: nothing. At 45°: half. This is Malus's law — only for polarised input. Unpolarised input always gives half the intensity, whatever the angle."

### Misconception interrupt
"Here is the trap: Malus's law requires polarised input and a specific angle θ. If the light is unpolarised, there is no θ — you get I₀/2 automatically. Do not apply I₀cos²θ to unpolarised light."

---

## 11. Assessment

### Mastery gate

The learner can:
1. State that polarisation is the direction of E-field oscillation perpendicular to propagation.
2. Apply Malus's law correctly: (a) identify whether input is polarised or unpolarised, (b) apply appropriate formula (I₀cos²θ for polarised, I₀/2 for unpolarised through one polariser).
3. Calculate transmitted intensity through a series of polarisers step by step.
4. Explain Brewster's angle and state the formula tan θ_B = n₂/n₁.
5. Describe three mechanisms by which light can be polarised (absorption, reflection, scattering).

### Formative golden probe

> "Unpolarised light of intensity 100 W/m² passes through a stack of three linear polarisers. The first is at 0°, the second at 30°, the third at 90°. Find the intensity after each polariser and after the full stack."

*Solution*:  
After polariser 1 (0°): 100/2 = 50 W/m² (from unpolarised), polarised at 0°.  
After polariser 2 (30°): 50 cos²30° = 50 × 3/4 = 37.5 W/m², polarised at 30°.  
After polariser 3 (90°): 37.5 × cos²(90° − 30°) = 37.5 cos²60° = 37.5 × 1/4 = 9.375 W/m².  
*Likely errors*: Applying I₀cos²30° to the first polariser (wrong — input is unpolarised); using θ = 90° for the third (should be 60° — angle between 30° and 90°); forgetting to update the polarisation angle at each step.

### Confidence calibration

After the probe, ask: "Why is the angle for the third polariser 60°, not 90°?" Students who correctly say "because the light entering the third polariser is now polarised at 30°, not at 0°, so the angle to the 90° axis is 60°" are calibrated. Students who say 90° have not tracked the polarisation direction through the stack — the critical skill for multi-polariser problems.

### Delayed retrieval check (next session opener)

"State Malus's law. What does θ represent? Does the law apply to unpolarised light?"  
Expected: I = I₀cos²θ; θ = angle between the input polarisation direction and the polariser transmission axis; does NOT apply to unpolarised input (use I₀/2 for the first polariser).

---

## 12. Recovery Notes

**Recovery for Malus's law applied to unpolarised light**:
1. Ask: "What is the polarisation angle of unpolarised light?" (There is none — it changes randomly.) "Then what is θ in Malus's law?" (Undefined.) "Therefore Malus's law cannot be applied — instead, use the averaging result: ⟨cos²θ⟩ = 1/2 → I = I₀/2."
2. Drill: have the learner explicitly state, before each calculation, whether the input is polarised or unpolarised, and choose the correct formula.

**Recovery for three-polariser confusion**:
1. Make a table with four columns: polariser angle, incoming polarisation, θ (angle between incoming polarisation and polariser axis), output intensity.
2. Fill in row by row. After each polariser, the output polarisation direction equals the polariser's axis angle.
3. The three-polariser effect is only surprising until the table is filled in — the numbers come out unambiguously.

---

## 13. Memory & Review

**Memory type**: Law + mechanism + three scenarios (absorption, reflection, scattering)

**Encoding hooks**:
- Malus's law: I = I₀cos²θ — "cosine squared, polarised only"
- Unpolarised → one Polaroid → always I₀/2
- Crossed Polaroids = dark; 45° between them = I₀/4 reappears
- Brewster's angle: tan θ_B = n₂/n₁ — tangent, not sine
- Sky: polarised 90° from sun (Rayleigh scattering)

**Spaced retrieval schedule**:
- Session +1: "State Malus's law. Calculate transmitted intensity for polarised input at 60° to the analyser."
- Week 1: "Three-polariser calculation: polarisers at 0°, 60°, 90° with initial unpolarised intensity I₀."
- Week 3: "Calculate Brewster's angle for a glass-water interface (n_glass = 1.5, n_water = 1.33)."
- Month 2: "Why do polarising sunglasses reduce glare? Which component (s or p) does the vertical polariser block?"

**Interleave with**: `phys.opt.wave-optics` (prerequisite — transverse-wave character and coherence), `phys.opt.brewsters-law` (the direct downstream — full quantitative treatment of reflection polarisation)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.opt.brewsters-law` | Complete quantitative treatment of θ_B = arctan(n₂/n₁); reflection and transmission coefficients at Brewster's angle |
| Technology — LCD screens | Liquid crystal cells rotate polarisation; two crossed Polaroids on either side; rotating the crystal rotates polarisation → controls transmission |
| Technology — 3D cinema | Left/right eye glasses use orthogonal circular polarisation states to deliver different images; both frames projected simultaneously |
| Geology — photoelastic stress analysis | Stressed glass or plastic becomes birefringent; viewed between crossed Polaroids, stress patterns appear as coloured fringes |
| Navigation — bee vision | Bees can detect sky polarisation patterns 90° from the sun and use them to navigate even when the sun is not visible |
| Chemistry — optical activity | Chiral molecules rotate the plane of polarisation of linearly polarised light (e.g., sugar solutions) → polarimetry for concentration measurement |
| Astrophysics — polarimetry | Synchrotron radiation is highly polarised; magnetic field geometry in galaxies/jets inferred from polarisation of their radio emission |

---

## 15. Curriculum Feedback

**KG note**: `phys.opt.wave-optics` is the correct prerequisite — the transverse nature of electromagnetic waves (established in wave optics) is the physical foundation for polarisation. `phys.opt.brewsters-law` is correctly the downstream unlock — it deepens the reflection-polarisation mechanism with the full Fresnel equation treatment.

**Authoring note**: The three-polariser demonstration (Demo A step 4) is the single most memorable and conceptually rich moment in this concept. It should always be included and always be preceded by prediction. The two most common errors — applying Malus's law to unpolarised input and failing to track the polarisation direction after each polariser — are both addressed by enforcing the step-by-step table approach in every multi-polariser problem.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
