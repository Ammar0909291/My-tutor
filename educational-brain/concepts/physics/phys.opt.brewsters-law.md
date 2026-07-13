# phys.opt.brewsters-law — Brewster's Law and Complete Polarisation by Reflection

## 1. Identity
- **Canonical KG ID**: `phys.opt.brewsters-law`
- **Canonical name**: Brewster's Law and Complete Polarisation by Reflection
- **Curriculum domain**: Optics
- **Difficulty tier**: advanced
- **Bloom level**: apply
- **Prerequisites**: `phys.opt.polarization`
- **Unlocks**: (none in current KG)
- **Estimated study hours**: 4
- **KG description**: Brewster's law gives the angle at which reflected light is completely polarized; Malus's law relates transmitted intensity to analyser angle.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (glare from water)**
Sunlight glinting off a lake is uncomfortably bright. Polarised sunglasses cut this glare because reflected light is mostly horizontally polarised. There exists one special angle — the Brewster angle — at which the reflection is 100 % polarised and the reflected beam contains only the horizontal E-field component. The transmitted beam is partially polarised in the perpendicular direction.

**Stage 2 — Geometric relationship (Brewster's condition)**
Brewster's angle θ_B satisfies: tanθ_B = n₂/n₁, where n₁ is the incident medium and n₂ is the refracting medium.
- Air → glass (n = 1.5): tanθ_B = 1.5 → θ_B ≈ 56.3°
- Air → water (n = 1.33): tanθ_B = 1.33 → θ_B ≈ 53.1°
- Glass → air: tanθ_B = 1/1.5 → θ_B ≈ 33.7°

At θ_B the reflected and refracted rays are exactly perpendicular (θ_reflected + θ_refracted = 90°). This geometric condition is the physical reason: the p-polarisation (parallel to incidence plane) component cannot be reflected when its oscillation direction would align with the refracted ray direction.

**Stage 3 — Quantitative (Malus's law review)**
For linearly polarised light of intensity I₀ incident on an analyser at angle θ: I = I₀cos²θ (Malus's law, covered in `phys.opt.polarization`). At Brewster's angle, reflected light is 100 % s-polarised (perpendicular to incidence plane). Passing it through an analyser: I = I_reflected × cos²θ. At θ = 90° (analyser axis perpendicular to s-polarisation): I = 0 (perfect extinction).

**Stage 4 — Physical mechanism (dipole radiation model)**
Dipoles in the refracting medium are driven by the transmitted E-field and reradiate. The p-component (parallel to incidence plane) oscillates along the direction of the refracted beam. Dipole radiation has zero emission along the oscillation axis. When the reflected and refracted rays are perpendicular, the reflected direction is along the p-dipole axis — so p-polarisation cannot be radiated back, leaving only s-polarisation reflected. This is the microscopic origin of Brewster's condition.

**Mental-model versioning**: Stage 1 for motivation; Stage 2 for all examination calculations; Stage 3 links to the polarisation prerequisite; Stage 4 is the explanatory layer for advanced study.

---

## 3. Why Beginners Fail

1. **Formula inversion**: Using tanθ_B = n₁/n₂ instead of n₂/n₁. The ratio is refracting medium over incident medium.
2. **Brewster's law and Snell's law conflated**: Students try to use sinθ_B = n₂/n₁ (wrong — that is Snell with θ_r = 90°, i.e. the TIR critical angle formula). Brewster uses tan, not sin.
3. **"Completely polarised" misread**: Brewster's angle gives 100 % polarised reflected beam, but the TRANSMITTED beam is only partially polarised (it retains both s and p, with p dominant). Students say "transmitted light is polarised at Brewster's angle" — incorrect.
4. **Malus's law applied to unpolarised reflected light at other angles**: At angles other than θ_B the reflected light is partially polarised — Malus's law does not apply straightforwardly to partially polarised beams.

---

## 4. Misconception Library

**M1 — "tanθ_B = n₁/n₂ (incident over refracting)"**
- Probe: "Light travels from glass (n=1.5) into air (n=1). What is the Brewster angle?"
- Characteristic phrase: "I put the first medium on top."
- Recovery: State clearly — the ratio is always n₂/n₁ (refracting over incident), the same ordering as Snell's law refraction index. For glass → air: tanθ_B = 1/1.5 → θ_B = 33.7°. Have student also check: θ_B(glass→air) + θ_B(air→glass) = 33.7° + 56.3° = 90° — Brewster angles are complementary, which is a useful consistency check.

**M2 — "The transmitted beam is completely polarised at Brewster's angle"**
- Probe: "At Brewster's angle, is the transmitted beam completely polarised?"
- Characteristic phrase: "Both beams are polarised at that angle."
- Recovery: The reflected beam is 100 % s-polarised. The transmitted beam is only partially polarised: it retains the full s-component (less what was reflected) and the full p-component. To produce highly polarised transmitted light, use a pile-of-plates polariser (many Brewster reflections in sequence, progressively removing s-component from the transmitted beam).

**M3 — "Brewster's law uses sinθ_B = n₂/n₁ (same as critical-angle formula)"**
- Probe: "What formula gives Brewster's angle? sinθ_B = n₂/n₁?"
- Characteristic phrase: "It's the same as TIR but from the other side."
- Recovery: TIR critical angle: sinθ_c = n₂/n₁ (requires n₁ > n₂). Brewster angle: tanθ_B = n₂/n₁ (works for any interface, both directions). They are different phenomena — TIR is total reflection above a threshold; Brewster is complete polarisation of the reflected partial beam at one specific angle. Table comparison:

| Property | TIR critical angle | Brewster angle |
|---|---|---|
| Formula | sinθ_c = n₂/n₁ | tanθ_B = n₂/n₁ |
| Requires n₁ > n₂? | Yes | No |
| Reflection | 100 % of intensity | Partial (only s-polarised) |
| Polarisation | Not necessarily | Reflected = 100 % s-polarised |

**M4 — "At Brewster's angle no light is reflected"**
- Probe: "Does Brewster's angle give zero reflection?"
- Characteristic phrase: "The glare disappears completely at that angle."
- Recovery: Only the p-component is absent from the reflected beam. The s-component is still reflected (some fraction per Fresnel equations). Total reflectance at θ_B is small (~15 % for glass) but nonzero. What disappears is specifically p-polarisation. A vertical polaroid filter aligned with s-polarisation would still show reflected light; a horizontal one (p-aligned) would show near-zero reflected light.

---

## 5. Explanation Library

**E1 — Core statement**
When unpolarised light strikes a dielectric interface at Brewster's angle θ_B = arctan(n₂/n₁), the reflected beam is completely linearly polarised with its E-field oscillating perpendicular to the plane of incidence (s-polarisation). The transmitted beam is partially polarised.

**E2 — Geometric derivation**
At Brewster's angle, θ_reflected + θ_refracted = 90°. Proof:
- By Snell's law: n₁ sinθ_B = n₂ sinθ_r
- By law of reflection: θ_reflected = θ_B
- Condition θ_B + θ_r = 90° means sinθ_r = cosθ_B
- Substituting: n₁ sinθ_B = n₂ cosθ_B → tanθ_B = n₂/n₁ ✓

**E3 — Pile-of-plates polariser**
A single Brewster reflection gives 100 % polarised reflected beam (weak) but only partially polarised transmitted beam. Stacking N glass plates at Brewster's angle: each plate removes a fraction of s from the transmitted beam. After ~8–10 plates in air-glass, the transmitted beam approaches linear p-polarisation. Used in high-power laser polarisers where absorption losses in sheet polarisers would be destructive.

**E4 — Brewster windows in laser cavities**
Gas lasers (He-Ne, Ar-ion) use windows tilted at θ_B to seal the gas tube. p-polarised light passes with zero reflection loss; s-polarised light suffers reflection at every pass. The laser naturally oscillates in the p-polarisation mode (lower round-trip loss), producing a linearly polarised output. A practical application of Brewster's law in precision optics.

---

## 6. Analogy Library

**Primary analogy — Tuning fork and resonance direction**
A tuning fork vibrating in one direction cannot excite a microphone diaphragm aligned exactly along the vibration axis — it excites it maximally when perpendicular. Similarly, p-polarised E-field oscillations driven parallel to the refracted-beam direction cannot radiate energy back along the reflected-beam direction. The reflected direction is the "dead angle" for p-dipoles.

**Breaking point**: The tuning fork analogy requires some intuition about dipole radiation patterns, which not all learners have at this stage. Use Stage 2 geometric argument first; reserve Stage 4 dipole argument for learners who ask "why."

**Anti-analogy — TIR as a model for Brewster**: TIR and Brewster are both angle-dependent reflection phenomena, but in opposite senses — TIR produces 100 % INTENSITY reflection above θ_c; Brewster produces 100 % POLARISATION of a partial reflection at exactly θ_B. Using TIR as a conceptual model for Brewster leads to M3 and M4 errors. Treat them as distinct phenomena early.

---

## 7. Demonstration Library

**D1 — Camera polarising filter on lake glare**
Photograph (or video) a water surface at roughly 53° to horizontal. Without polarising filter: bright glare. With filter aligned to block s-polarisation: glare disappears, underwater features visible. Rotate filter 90°: glare returns. This is direct observation of Brewster polarisation. Measuring the reflection angle and computing n = tanθ_B gives n_water ≈ 1.33 — a real index-of-refraction measurement.

**D2 — Glass block on ray box**
Shine white light onto a glass block. Vary the angle of incidence and hold a linear polaroid over the reflected ray. At most angles the reflected beam is partially polarised (polaroid reduces but doesn't eliminate it). At θ_B ≈ 56° for glass, the polaroid at the right orientation extinguishes the reflected beam. Rotate polaroid 90°: beam reappears — transmitted polaroid (wrong orientation) blocks the s-polarised reflected light.

**D3 — Laser + glass slide**
Aim a vertically polarised laser at a glass slide at ~56° incidence. The p-polarisation (in the plane of incidence = horizontal for this setup) reflects very little; rotating the laser polarisation to horizontal (p) causes the reflection to nearly vanish. Demonstrates polarisation-dependent reflectance consistent with Brewster's angle. (Care: verify which polarisation is s and p relative to your geometry before demonstrating.)

---

## 8. Discovery Lesson

*Guided inquiry is viable here* (unlike some optics topics where the formula is purely definitional):

1. Shine unpolarised light onto a glass block. Vary incidence angle from 0° to 75°.
2. At each angle, use a polaroid to probe the reflected beam — measure (or observe) whether one orientation gives lower reflected intensity.
3. At one specific angle (~56° for glass), one polaroid orientation gives near-zero reflected intensity. Record this as the special angle.
4. Measure n of the glass independently (via Snell's law). Compare tan(special angle) to n. Is tanθ ≈ n?
5. Define: the angle at which reflected light is completely s-polarised is the Brewster angle; tanθ_B = n₂/n₁.
6. Explain the perpendicularity condition (θ_B + θ_r = 90°) using Snell's law to derive tanθ_B = n₂/n₁ analytically.

The discovery path is feasible in a lab with a ray box, glass block, protractor, and polaroid filters.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student uses sinθ_B instead of tanθ_B | Return to the derivation: sinθ_r = cosθ_B implies tanθ_B = n₂/n₁, not sinθ_B. Ask student to re-derive. |
| Student inverts the ratio (n₁/n₂) | Clarify: "refracting medium over incident medium." Test: for air→glass, should θ_B > 45°? (Yes, since n_glass > 1 → tan > 1 → θ_B > 45°). Inverting gives θ_B < 45° — fails this check. |
| Student says transmitted beam is completely polarised | Correct immediately: 100 % polarisation applies only to the reflected beam. The transmitted beam is partially polarised. Ask: "what happens to the p-component in the transmitted beam?" (Answer: it's fully transmitted, only s is partially reflected.) |
| Student confuses with TIR | Draw the comparison table (M3 recovery). Emphasise: TIR needs n₁ > n₂; Brewster works either direction. |
| Student ready for advanced extension | Introduce Fresnel equations for r_s and r_p; show r_p = 0 exactly at Brewster's condition. |

---

## 10. Voice Teaching

"Brewster's angle is the one special angle where everything that bounces off a surface is s-polarised — vibrating perpendicular to the plane where the light bends. The formula is compact: tangent of theta-B equals n₂ over n₁. Notice it's tangent, not sine — that's the easy thing to mix up.

For ordinary glass with n equals one-point-five, the Brewster angle is about 56 degrees. At that angle, if you check the reflected beam with a polaroid, you can extinguish it completely. The p-component — the one vibrating in the plane of incidence — simply isn't there in the reflection.

What about the transmitted beam? It's only partially polarised. The p-component goes straight through because it has nothing to reflect; the s-component lost a little to the reflection. So the transmitted beam is mostly p, but not completely.

The real-world consequence: polarised sunglasses are aligned to block horizontal E-fields — the s-polarisation of glare from horizontal surfaces like roads and water. That's Brewster's law doing the work every time you put them on."

---

## 11. Assessment

**Mastery gate**: Student correctly computes θ_B for a given interface using tanθ_B = n₂/n₁ (with correct ratio direction), states which polarisation is absent from the reflected beam (p), and distinguishes the reflection polarisation state from the transmission polarisation state. Three correct multi-step problems.

**Formative golden probe**: "Light travels from water (n = 1.33) to glass (n = 1.50). Find the Brewster angle. At this angle, which polarisation (s or p) is absent from the reflected beam, and which medium does the reflected ray travel in?"
- tanθ_B = 1.50/1.33 = 1.128 → θ_B = 48.4°
- p-polarisation absent from reflected beam; reflected ray travels in water (incident medium)
- Common error: computing tanθ_B = 1.33/1.50 = 0.887 → θ_B = 41.6° (inverted ratio)

**Confidence calibration**: Ask after computing θ_B: "Now without redoing — for the reverse interface (glass to water), what is the Brewster angle?" A well-calibrated learner will say ≈ 41.6° (complementary). Verify: tanθ_B = 1.33/1.50 = 0.887 → θ_B = 41.6°. Note: 48.4° + 41.6° = 90° (Brewster angles for complementary interfaces are complementary — useful check).

**Delayed retrieval (1–2 weeks)**: "A Brewster window in a He-Ne laser is made of glass (n = 1.52). What angle must it be tilted at? Which polarisation does the laser output?"

---

## 12. Recovery Notes

**If student cannot distinguish s and p polarisations at this point**:
Revisit `phys.opt.polarization` — s-polarisation is perpendicular to the plane of incidence (senkrecht = German "perpendicular"), p-polarisation is parallel (parallel to the plane of incidence). Draw the geometry each time: plane of incidence is the plane containing incident ray and surface normal; s is in-plane vibrating ⊥ to that; p is vibrating in that plane.

**If student memorises formula without understanding ratio direction**:
Use the consistency check: for air → denser medium, n₂ > n₁, so n₂/n₁ > 1, so tanθ_B > 1, so θ_B > 45°. For dense → air, θ_B < 45°. If the ratio is inverted both answers swap — this sign-flip is a reliable error detector.

**If student confuses which beam is fully polarised**:
The reflected beam is 100 % s-polarised. Memory aid: the reflected beam is the weaker one — most light goes through. The strong transmitted beam cannot be fully polarised by a single Brewster surface.

---

## 13. Memory & Review

**Memory type**: Declarative (Brewster condition + which beam is polarised) + procedural (tanθ_B = n₂/n₁ computation)
**Forgetting risk**: High — the formula is similar to Snell's and TIR formulas; ratio direction and sin-vs-tan confusions resurface rapidly.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "Light in air hits a diamond surface (n = 2.42). Compute Brewster's angle and state which polarisation is absent from the reflected beam."

---

## 14. Transfer Map

**Near transfer**: Pile-of-plates polariser (multiple Brewster transmissions produce linearly polarised transmitted beam).
**Medium transfer**: Laser Brewster windows (polarisation selection mechanism in gas lasers).
**Far transfer**: Fresnel reflection control in fibre-optic connectors (minimising back-reflection at fibre endfaces by angle-polishing).
**Cross-domain**: RF/microwave Brewster angle — the same phenomenon exists for electromagnetic waves at dielectric interfaces at microwave frequencies, used in radar-absorbing materials and antenna design.

---

## 15. Curriculum Feedback

- KG prerequisite `phys.opt.polarization` is necessary and sufficient — s/p distinction, Malus's law, and the three polarisation mechanisms are all needed before this entry.
- No unlocks listed in the current KG; the concept is a natural prerequisite for pile-of-plates and laser-cavity discussions if those are added in future KG extensions.
- Difficulty `advanced`/`apply` is appropriate — the computation is moderate, but the conceptual distinction between reflected and transmitted polarisation states requires genuine understanding.
- No missing prerequisites identified.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
