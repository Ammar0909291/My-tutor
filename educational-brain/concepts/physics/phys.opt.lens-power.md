# phys.opt.lens-power — Lens Power and Combined Lenses

## Identity
- **Canonical KG ID**: `phys.opt.lens-power`
- **Canonical name**: Lens Power and Combined Lenses
- **Curriculum domain**: Optics
- **Difficulty tier**: proficient
- **Bloom level**: apply
- **Prerequisites**: `phys.opt.lenses`
- **Unlocks**: `phys.opt.optical-instruments`
- **Estimated study hours**: 3
- **KG description**: The power of a lens is the reciprocal of focal length in metres; combined lenses have powers that add algebraically.

---


## Learning Objective

See Blueprint (`docs/curriculum/blueprints/phys.opt.lens-power.md §1 Learning Objective`) for the full graded objective with accuracy thresholds and protocol assignments.


## Core Understanding

An optometrist measures your vision and prescribes "−2.5 dioptre lenses for distance vision." They do not say "focal length 40 cm diverging lenses" — though that is what they mean. The dioptre (D) is the standard unit of lens power in optics and medicine: P = 1/f, where f is in metres. A 2 D lens has focal length 0.5 m; a 0.5 D lens has focal length 2 m. Stronger lenses have more dioptres and shorter focal lengths.

The power of a lens, not its focal length, is what adds simply when lenses are combined. Two thin lenses in contact: P_total = P₁ + P₂. Equivalently, 1/f_total = 1/f₁ + 1/f₂. This is because each lens bends the light by a fixed amount (in terms of angle change per unit of lens height), and adding a second lens adds another fixed bend — the bends add, not the focal lengths. In an optometrist's office, your distance prescription combined with a reading add prescription (+1.5 D for reading) gives you the near-vision power: your total near prescription is your distance prescription + 1.5 D.

Sign convention: converging (convex) lenses have positive power; diverging (concave) lenses have negative power. Your prescription −2.5 D means diverging lenses (you are myopic — short-sighted; the lenses push the focal point back to fall on the retina). A reading lens (+2.5 D) helps focus nearby objects.

The combination rule fails when lenses are separated: then the thin-lens combination formula must include the separation distance d: P_total = P₁ + P₂ − d·P₁·P₂. For thick lenses, internal geometry also matters. The simple addition rule is exact only for thin lenses in contact.

## Mental Models

**Stage 1 — Concrete (power as "bending strength")**
A thick magnifying glass bends light more sharply than a thin weak one. Power is how hard a lens bends a ray per metre of travel. A strong lens has short focal length; weak lens has long focal length.

**Stage 2 — Quantitative (P = 1/f)**
Power P = 1/f, where f is in metres, giving dioptres (D).
- f = 0.5 m → P = +2 D (converging)
- f = −0.25 m → P = −4 D (diverging)
- f = 0.1 m → P = +10 D (strong converging)

**Stage 3 — Combination law (P_total = P₁ + P₂ + ...)**
Lenses in close contact (separation ≈ 0) add powers algebraically.
- P = +5 D and P = −2 D → P_total = +3 D (net converging)
- P = +4 D and P = +6 D → P_total = +10 D (f = 0.1 m)
- P = +3 D and P = −3 D → P_total = 0 D (flat — no focussing)

Equivalent focal length: 1/f = 1/f₁ + 1/f₂ (same relation, just the algebraic sum form).

**Stage 4 — Prescription context (corrective lenses)**
Opticians prescribe in dioptres because powers add without reciprocal arithmetic.
- Myopia: diverging lens required (negative D)
- Hyperopia: converging lens required (positive D)
- Astigmatism: cylindrical power added on a separate axis
- Near point/far point defects corrected by placing the image at the eye's natural range

**Mental-model versioning**: Stage 1 suffices to understand the concept qualitatively; Stage 2 is needed for numerical problems; Stage 3 enables optical instrument design; Stage 4 links to real-world application.

---

## Why Students Fail

1. **Unit confusion**: mixing cm and m when computing P = 1/f. f = 20 cm must become 0.20 m first, giving P = 5 D, not P = 0.05 D.
2. **Forgetting sign**: a diverging lens with f = −0.25 m has P = −4 D; students drop the negative and then misapply the combination law.
3. **Additive law misapplied to non-contact lenses**: P_total = P₁ + P₂ holds ONLY when the separation between lenses is negligible compared to their focal lengths. Separated lenses require the full formula: 1/f = 1/f₁ + 1/f₂ − d/(f₁f₂).
4. **Confusing power with magnification**: a high-power lens (small f) converges strongly but the image magnification depends on object distance, not P alone.

---

## Misconceptions

**M1 — "Power and magnification are the same"**
- Probe: "A +10 D lens always magnifies more than a +5 D lens." True or false?
- Characteristic phrase: "Higher power means bigger image."
- Recovery: Show that both lenses can produce any magnification from near-zero (object far from lens) to very large (object near F). Power determines where parallel rays meet, not how large a near-object image is. Use m = v/u for both lenses at the same object distance to show different m for different f.

**M2 — "f in cm gives dioptres directly"**
- Probe: "A lens with f = 50 cm has power 50 dioptres." Correct?
- Characteristic phrase: "I just divided by the centimetres."
- Recovery: SI definition: P = 1/f(metres). f = 50 cm = 0.50 m → P = 2 D. The dioptre is a reciprocal-metre, not reciprocal-centimetre. Have student redo three problems converting cm → m first.

**M3 — "Adding focal lengths gives the combined focal length"**
- Probe: "A +10 cm lens and a +20 cm lens in contact have combined f = 30 cm." True?
- Characteristic phrase: "I added the focal lengths together."
- Recovery: The combination law is P_total = P₁ + P₂, i.e. 1/f = 1/f₁ + 1/f₂. For f₁ = 0.10 m, f₂ = 0.20 m: 1/f = 10 + 5 = 15 → f = 6.7 cm (not 30 cm). Use a concrete ray-tracing demo: two converging lenses bend rays twice; together they produce shorter f.

**M4 — "A zero-power combination produces a flat piece of glass"**
- Probe: "If P₁ + P₂ = 0, the two lenses together do nothing to a beam."
- Characteristic phrase: "They cancel out so it's like no glass."
- Recovery: Physically correct — a converging and diverging lens of equal magnitude power in contact do produce a collimated exit beam from a collimated input (afocal pair), but this is used in telescopes and beam expanders, not the same as "no glass" (there is still refraction at each surface; only the NET convergence is zero). Distinguish optical effect from physical presence.

---

## Analogies

**Primary analogy — Gravity wells adding**
Two hills of known steepness placed end-to-end: the total slope is the sum of individual slopes. Focal length is like the run (horizontal distance to focus); power is slope (1/run). Adding slopes (powers) is natural; adding runs (focal lengths) is not.

**Breaking point**: Gravity wells interact differently when separated; the separated-lens correction term d/(f₁f₂) has no simple gravity-well analogue. Use the analogy only for the contact-lens case.

**Anti-analogy — Resistance in series**: Resistors in series add (R_total = R₁ + R₂). Focal lengths of lenses in series do NOT add — only their reciprocals (powers) add. Students who recall the resistor rule should swap: if electrical resistance → series adds; then optical focal length → do NOT add.

---

## Demonstrations

**D1 — Two magnifying glasses stacked**
Hold two converging lenses in contact (or nearly so). Focus sunlight (or a distant lamp) through one, then both. Observe that the combined focus is closer than either lens alone, confirming greater combined power. Measure focal lengths separately (f₁, f₂) and verify P₁ + P₂ = 1/f_combined.

**D2 — Converging + diverging cancel**
Pair a +5 D lens with a −5 D lens of the same diameter. A collimated laser beam entering the stack exits collimated (afocal). Confirm with a far screen: no convergence or divergence. Swap to only the +5 D lens: beam converges. Demonstrates P_total = 0 when powers cancel.

**D3 — Corrective-lens simulation**
Use a water-filled plastic bag as an adjustable converging lens (squeeze to change curvature → change f). Model myopic eye as too-strong lens. Show that adding a diverging element brings focus back to the "retina" (a screen). Quantify in dioptres.

---

## Discovery Questions

*Direct instruction is argued here*: The power formula P = 1/f is definitional — there is no discovery path that avoids stating the SI convention for dioptres. However, the combination law P_total = P₁ + P₂ can be discovered:

1. Give student two lenses with measured focal lengths f₁ and f₂.
2. Ask: "If I put them in contact, what is the combined focal length? Make a prediction."
3. Most will guess f₁ + f₂ (wrong). Measure the actual combined focal length.
4. Ask: "What operation on f₁ and f₂ gives the measured result?"
5. Guide: 1/f_measured ≈ 1/f₁ + 1/f₂. Name this quantity "power."
6. Derive P = 1/f from the measurement — naming follows discovery.

This semi-guided approach is feasible in a lab with ray boxes or laser benches.

---

## Teaching Sequence

| Situation | Action |
|---|---|
| Student uses f in cm in dioptre formula | Stop. Have student re-read the SI definition, then redo with metres. Never let a cm error pass silently — it becomes a persistent habit. |
| Student adds focal lengths instead of powers | Ask: "What did we just observe experimentally about the combined focal length?" Return to D1 data. |
| Student ignores sign on diverging lens | Restate sign convention: diverging f is negative, so P is negative. Redo with correct signs. |
| Student confuses power with magnification | Use two different-power lenses at the same object distance; compute m = v/u for both to show magnification differs from power. |
| Student ready for separated-lens extension | Introduce d/(f₁f₂) term with physical motivation: a ray hitting lens 2 at a different height than lens 1 because of the gap. |

---


## Tutor Actions

Priority dispatch (in order):

1. **CONCRETE-THEN-ABSTRACT** — "A reading-glasses lens is labelled +2.5 D. What does that mean in metres? In centimetres?" (Focal length = 1/2.5 = 0.4 m = 40 cm.) Make the dioptre a reciprocal focal length, not a separate quantity.

2. **WORKED-EXAMPLE** — two traces: (a) combination of two thin lenses in contact: P_total = P₁ + P₂ (or 1/f_total = 1/f₁ + 1/f₂). (b) Near-point correction: a person's near point is 50 cm, normal is 25 cm — find required lens power to read at 25 cm.

3. **MISCONCEPTION-PROBE M1** — "A higher-power lens always produces a bigger image." Expected wrong: true. Correct: power determines how strongly a lens converges light (shorter focal length), but image size (magnification) depends on the object distance relative to f. A very high-power lens with the object well beyond 2f produces a small image; the same lens used as a magnifier (object inside f) produces a large virtual image.

4. **RETRIEVAL-SCHEDULE-PROMPT** — "A person is short-sighted — their far point is 2 m. What lens power corrects their distance vision to infinity? Is the correction lens converging or diverging?" (Tests the far-point correction: virtual image at the far point formed by a diverging lens of power −0.5 D — tests sign convention and clinical application.)

## Voice Teaching Notes

"Power tells you how strongly a lens bends light — high power, tight bend, short focal length. The key formula is just: P equals one over f, where f is in metres. If your focal length is half a metre, your power is two dioptres. Converging is positive, diverging is negative — just like with focal lengths.

Now, the beautiful thing: when you put two lenses together touching, their powers simply add. Plus five and minus two gives plus three. That's it — no reciprocal juggling, just addition. That's why opticians write prescriptions in dioptres. It makes the arithmetic easy when they stack multiple corrections.

The trap everyone falls into: forgetting to convert centimetres to metres. A twenty-centimetre lens is not twenty dioptres — it's five dioptres. Always check your units before you invert."

---

## Assessment Signals

**Mastery gate**: Student correctly computes combined power of two lenses (including a diverging lens) in dioptres, converts focal length from cm to m, and explains why powers add rather than focal lengths. Three correct independent problems with sign discipline satisfied.

**Formative golden probe**: "A −25 cm lens and a +10 cm lens are placed in contact. What is the combined power and focal length? Is the combination converging or diverging?"
- f₁ = −0.25 m → P₁ = −4 D; f₂ = +0.10 m → P₂ = +10 D
- P_total = +6 D → f = +0.167 m (converging)
- Error: students who add f get −25 + 10 = −15 cm (wrong sign and magnitude)

**Confidence calibration**: After answering, ask: "Rate your confidence 1–5." Students who say 5 but used f in cm have miscalibrated confidence — surface the discrepancy by checking units together.

**Delayed retrieval (1–2 weeks)**: "An optometrist prescribes +2.5 D for the left eye. What is the focal length? If a second lens of −1.0 D is added in contact, what is the new combined focal length?"

---

## Tutor Recovery Strategy

**If student cannot remember which to add (f or P)**:
Return to D1 experimental result. The combined focal length was shorter than either individual lens, not longer (which adding f would produce). Power addition matches observation; focal-length addition contradicts it.

**If unit errors persist**:
Institute a mandatory "convert to SI first" step written at the top of every solution before any formula is applied. Make it a metacognitive habit, not a one-off correction.

**If sign confusion persists (diverging positive or focal length positive for diverging)**:
Anchor: diverging lens spreads rays. Spreading rays never converge to a real focus in front — so f is negative (virtual focus behind), P is negative. Sketch each time until sign assignment becomes automatic.

---

## Memory Hooks

**Memory type**: Declarative (definition P = 1/f) + procedural (combination law application)
**Forgetting risk**: Medium — the law is simple but the unit trap (cm vs m) and sign trap are persistent error sources even months later.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A +15 cm converging lens and a −40 cm diverging lens are in contact. Compute combined power and state whether the result is converging or diverging."

---

## Transfer Connections

**Near transfer**: Corrective spectacle prescriptions (computing required dioptre correction from far/near point defect data).
**Medium transfer**: Compound microscope / telescope power computation (objective + eyepiece combination).
**Far transfer**: Fibre-optic coupler design (GRIN lens power addition); laser collimation systems (beam expander = afocal pair with power sum = 0).
**Cross-domain**: Electrical admittance (Y = 1/Z) adds in parallel — structural analogue to power addition; acoustical conductance in coupled resonators.

---


## Cross-Subject Connections

Mathematics: ray diagrams use similar triangles; Snell's law uses trigonometry; wave optics uses Fourier analysis. Chemistry: spectrophotometry and colorimetry measure concentrations optically; X-ray diffraction uses diffraction physics. Biology: the eye is a biological optical instrument; microscopy, endoscopy, and photoreception are optics applications.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.lens-power.md` (authoritative for Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite sections by reference, never restate here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages runtime-served explanation and probe assets. Authored seed assets for this concept are in `src/lib/teaching/assets/authoredSeedAssets.ts`.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) — core_explanation, worked_example, misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe kinds, distractor-mapped to this entry's misconception IDs  
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required to activate

## Curriculum Feedback

- KG prerequisite `phys.opt.lenses` is necessary and sufficient — this concept requires sign convention and the lens formula, both covered there.
- The unlock `phys.opt.optical-instruments` is natural: microscope and telescope analysis requires the combination law as a prerequisite.
- The concept is correctly tagged `proficient`/`apply` — students must compute, not just recall.
- No missing prerequisites identified.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

## Version History

- **v1.0** (2026-07-29): Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.
