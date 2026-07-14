# Teaching Blueprint — phys.opt.polarization

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.polarization
name: "Polarization of Light"
domain: optics
difficulty:
  label: advanced
  number: 5
bloom: understand
prerequisites:
  - phys.opt.wave-optics
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Hold a pair of polarized sunglasses. Look through one lens — the scene dims slightly. Now take a second polarizer and rotate it while looking through both. At one angle the view is nearly as bright as usual; rotate 90° and it goes almost completely dark. This is polarization: ordinary light oscillates in all directions perpendicular to its direction of travel; polarized light oscillates in only ONE direction. The first polarizer selects one direction; the second blocks it when turned perpendicular. Unlike sound waves (longitudinal), light is a transverse wave — polarization is direct evidence of this.

### Level 2 — Developing Understanding

**Types of polarization:**

| Type | Description |
|------|-------------|
| Unpolarized | E oscillates in all directions perpendicular to propagation (random phase, random direction) |
| Linear | E oscillates in one fixed plane |
| Circular | E vector rotates at constant rate; |E| constant |
| Elliptical | E vector traces ellipse; general case |

**Methods of producing linearly polarized light:**

1. **Selective absorption (dichroism) — Polaroids:**
   - Polymer sheets with aligned chains absorb one E-component
   - Transmission axis: direction of E that passes through
   - Reduces intensity of unpolarized light by 50% (absorbs one polarization component)

2. **Reflection — Brewster's Law:**
   - At Brewster's angle θ_B: tan θ_B = n₂/n₁
   - Reflected light is completely linearly polarized (⊥ to plane of incidence)
   - Refracted light is partially polarized
   - (Brewster's Law has its own dedicated blueprint: phys.opt.brewsters-law)

3. **Scattering — Rayleigh scattering:**
   - Sky light is partially polarized (maximum polarization at 90° from Sun)
   - Scattered light is polarized perpendicular to the scattering plane

4. **Double refraction (birefringence) — calcite, quartz:**
   - Anisotropic crystals have different n for two perpendicular polarizations
   - Splits beam into ordinary ray (o-ray, constant n) and extraordinary ray (e-ray, n depends on angle)
   - Wave plates (λ/4 and λ/2 plates) use birefringence to change polarization state

**Malus's Law:**
When linearly polarized light of intensity I₀ passes through a polarizer with its transmission axis at angle θ to the polarization direction:

**I = I₀ cos²θ**

- θ = 0°: I = I₀ (full transmission, axes aligned)
- θ = 90°: I = 0 (complete blocking, crossed polarizers)
- θ = 45°: I = I₀/2

For unpolarized light through a single polarizer: I = I₀/2 (independent of orientation — all angles average to ½).

### Level 3 — Proficient Synthesis

**Malus's Law for multiple polarizers:**
Light through a sequence of polarizers at angles θ₁, θ₂ (relative to the previous polarizer):
I_final = I_0 × cos²θ₁ × cos²θ₂ × ...

Example: Unpolarized light through three polarizers at 0°, 30°, 90° (final):
After polarizer 1 (0°, from unpolarized): I₁ = I₀/2
After polarizer 2 (30° to polarizer 1): I₂ = I₁ cos²30° = (I₀/2)(3/4) = 3I₀/8
After polarizer 3 (60° to polarizer 2 = 90° from polarizer 1): I₃ = I₂ cos²60° = (3I₀/8)(1/4) = 3I₀/32

**Crossed polarizers with intermediate polarizer:**
With only two crossed polarizers: I = 0.
Insert intermediate polarizer at 45° between them:
I_final = (I₀/2) × cos²45° × cos²45° = (I₀/2)(1/2)(1/2) = I₀/8 > 0.
The intermediate polarizer allows some light to pass — paradoxical but physically real.

**Optical activity:**
Some materials (sugar solution, quartz along optical axis) rotate the plane of polarization by angle α = [α]cL (specific rotation × concentration × path length). Used in saccharimetry (measuring sugar concentration).

**Polarizing filters in photography:**
Reduces glare from reflections (at Brewster's angle, reflected light is polarized → polarizing filter at right angle blocks it). Darkens sky by blocking polarized scattered light.

**Wave plates:**
- Quarter-wave plate (λ/4 plate): introduces λ/4 phase difference between o and e rays → converts linear to circular polarization
- Half-wave plate (λ/2 plate): rotates plane of linear polarization by 2α (where α = angle of plate to input polarization)

---

## Component 2 — Worked Examples

### WE-1: Malus's Law — Two Polarizers

**Problem:** Unpolarized light of intensity 80 W/m² passes through two polarizers. The angle between their transmission axes is 60°.
(a) Find the intensity after the first polarizer.
(b) Find the intensity after the second polarizer.
(c) What angle between the axes would give 20 W/m² after the second polarizer?

**Solution:**

**(a) After first polarizer:**
For unpolarized light, first polarizer transmits 50%:
I₁ = I₀/2 = 80/2 = **40 W/m²**

**(b) After second polarizer (Malus's Law):**
I₂ = I₁ cos²θ = 40 × cos²60° = 40 × (0.5)² = 40 × 0.25 = **10 W/m²**

**(c) Find θ for I₂ = 20 W/m²:**
20 = 40 × cos²θ
cos²θ = 0.5
cos θ = 1/√2 = 0.707
**θ = 45°**

---

### WE-2: Three Polarizers — Paradox

**Problem:** A beam of unpolarized light (I₀ = 100 W/m²) passes through three polarizers:
- Polarizer 1: transmission axis at 0°
- Polarizer 2: transmission axis at 45°
- Polarizer 3: transmission axis at 90°
(a) Find the intensity after each polarizer.
(b) What would be the intensity after polarizer 3 if polarizer 2 were removed?

**Solution:**

**(a) With all three polarizers:**
After P₁ (unpolarized → 0°): I₁ = 100/2 = **50 W/m²**
After P₂ (0° → 45°, angle = 45°): I₂ = 50 × cos²45° = 50 × (1/√2)² = 50 × 0.5 = **25 W/m²**
After P₃ (45° → 90°, angle = 45°): I₃ = 25 × cos²45° = 25 × 0.5 = **12.5 W/m²**

**(b) Without P₂ (two crossed polarizers at 0° and 90°):**
After P₁: I₁ = 50 W/m²
After P₃ (angle = 90° from P₁): I = 50 × cos²90° = 50 × 0 = **0 W/m²**

**Paradox resolved:** Adding an intermediate polarizer at 45° allows 12.5 W/m² to pass through two "crossed" polarizers that would otherwise block all light. The intermediate polarizer creates a new polarization state that can partially pass the third polarizer. This demonstrates that polarizers are not passive filters — they actively change the polarization state.

---

### WE-3: Partially Polarized Sky Light

**Problem:** Skylight at 90° from the Sun is 75% polarized (degree of polarization P = 0.75). This means the intensity can be written as I_total = I_polarized + I_unpolarized, where P = I_polarized / I_total.
(a) If total intensity is 200 W/m², find I_polarized and I_unpolarized.
(b) A photographer places a perfect polarizer aligned to block the polarized component. What is the transmitted intensity?
(c) What is the maximum possible intensity that can be blocked by the polarizer?

**Solution:**

**(a) Components:**
I_polarized = P × I_total = 0.75 × 200 = **150 W/m²**
I_unpolarized = (1 − P) × I_total = 0.25 × 200 = **50 W/m²**

**(b) Polarizer blocks polarized component (θ = 90° to polarized component):**
- Polarized component passes at θ = 90°: I_pol through = 150 × cos²90° = 0
- Unpolarized component through polarizer: I_unpol through = 50/2 = 25 W/m²
**Total transmitted = 0 + 25 = 25 W/m²**

**(c) Maximum blocked = I_total − minimum transmitted:**
Minimum transmission occurs when polarizer is at 90° to the polarized component (as in (b)).
**Maximum blocked = 200 − 25 = 175 W/m²** (87.5% reduction).
The 25 W/m² from the unpolarized component cannot be blocked by a single polarizer.

---

## Component 3 — Misconception Engine

### MC-1: MC-POLARIZATION-PROVES-LIGHT-IS-LONGITUDINAL

**trigger_signal:** Student states "polarization occurs along the direction of travel, so light must be longitudinal like sound" or confuses the plane of polarization with the propagation direction.

**conflict_evidence [P28]:** Polarization means the E-field oscillates in a specific plane that is PERPENDICULAR to the propagation direction. In a longitudinal wave (like sound), particles oscillate parallel to propagation — there is no "perpendicular plane" to restrict. Polarization can only restrict an oscillation that occurs in a plane perpendicular to travel (transverse). Sound cannot be polarized because its oscillation is along the propagation direction. The existence of polarization proves light is TRANSVERSE, not longitudinal.

**bridge_text [P30]:** Think of passing a rope through a fence with vertical slats (polarizer). Wiggle the rope in all directions — only vertical oscillations pass through the slats. Horizontal oscillations are blocked. This works ONLY if the rope oscillates transversely (up-down-left-right), not longitudinally (toward-away from the fence). Similarly, polarizers can select E-field orientations only because E oscillates transversely.

**replacement_text [P31]:** Polarization is conclusive evidence that light is a TRANSVERSE wave. The E-field oscillates in a plane perpendicular to the propagation direction. Polarization restricts which direction in that transverse plane the E-field oscillates. Longitudinal waves (like sound) cannot be polarized because there is only one oscillation direction — along propagation — with no transverse plane to select.

**discrimination_pairs [P33]:**
- "Sound can be polarized by a suitable material with aligned structure" → FALSE: sound is longitudinal, with no transverse oscillation direction — polarization is geometrically impossible.
- "The fact that light can be polarized proves it is a transverse wave" → CORRECT: only transverse waves can exhibit polarization. ✓

**s6_path:** If student fails transverse vs. longitudinal probe → rope-through-fence analogy visual + comparison table (sound: longitudinal, no polarization; light: transverse, can be polarized) before mastery gate.

---

### MC-2: MC-CROSSED-POLARIZERS-MEANS-ZERO-ALWAYS

**trigger_signal:** Student states "two polarizers at 90° always give zero intensity and no intermediate polarizer can change that" or "adding more polarizers can only reduce intensity."

**conflict_evidence [P28]:** Perform the three-polarizer experiment (WE-2): P₁ at 0°, P₃ at 90° → crossed → I = 0. Insert P₂ at 45° between them → I = I₀/8 > 0. Adding the intermediate polarizer INCREASES transmitted intensity from zero to I₀/8. This is counterintuitive but physically real — the intermediate polarizer changes the polarization state of the light so that it is no longer 90° misaligned with P₃. Each polarizer actively re-defines the polarization direction, not just filters passively.

**bridge_text [P30]:** Think of it as a two-step process: after P₁, light is polarized at 0°. P₃ blocks 0° light. But P₂ at 45° takes the 0° polarized light and produces 45°-polarized light — a new state that P₃ can partially transmit (cos²45° = 50% of what reaches P₃). The intermediate polarizer re-encodes the polarization, allowing what was previously blocked to now partially pass.

**replacement_text [P31]:** Two crossed polarizers (90°) transmit zero intensity. Adding a third polarizer BETWEEN them at any angle other than 0° or 90° results in non-zero transmission, because the intermediate polarizer changes the polarization state. Maximum transmission with one intermediate polarizer occurs at 45° between the two crossed ones, giving I = I₀/8. More intermediate polarizers at finer angular steps can approach I₀/2 in the limit.

**discrimination_pairs [P33]:**
- "Adding more polarizers between two crossed polarizers always reduces transmission" → FALSE: the first intermediate polarizer increases it from 0 to non-zero (e.g., I₀/8).
- "No device can change the polarization state of light" → FALSE: wave plates, birefringent materials, and even polarizers themselves all change the polarization state.

**s6_path:** If student insists crossed polarizers always give zero → hands-on demonstration (three-polarizer sequence) or step-by-step Malus's Law calculation for WE-2 before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Has used polarized sunglasses; no model for mechanism; thinks polarization is a filter effect | Cannot state Malus's Law or what "transverse" means for light |
| S3 | Knows I = I₀cos²θ but applies it incorrectly (forgets the ½ factor for unpolarized input); confused about transverse vs. longitudinal | Applies Malus's Law from zero rather than from I₀/2; cannot explain three-polarizer paradox |
| S6 | Correctly applies Malus's Law for one and two polarizers; understands first polarizer gives I₀/2 from unpolarized; uncertain about three-polarizer or optical activity | Correctly does WE-1; cannot set up WE-2 three-polarizer calculation |
| S9 | Applies Malus's Law for multiple polarizer chains; explains three-polarizer paradox mechanistically; describes methods of polarization; connects to Brewster's Law and birefringence | Correctly handles all three WEs; explains degree of polarization (WE-3) |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 5, accelerated P track; physics + bloom=understand but not Analyse/Evaluate → difficulty ≥ 4 rule → P, BUT domain=physics and this is harder concept → C entry with accelerated P track per Component 0).

**TA-1 [P01 — Session Open]**
"Take two polarizing filters. Hold them both in front of a light source and rotate one relative to the other. What do you observe? At 0° they're almost clear; at 90° it goes dark. Now here's the puzzle: if I slip a third polarizing filter between the two crossed ones and rotate it to 45°, the darkness partially lifts — light passes through three polarizers where it couldn't pass through two. How? Write your prediction."
[Diagnose S3/S6 — does student know the ½ factor for unpolarized light?]

**TA-2 [P06 — Concrete Anchor]**
"[Display: electric field oscillation diagrams — unpolarized (E rotates randomly), linearly polarized (E always along y), circularly polarized (E rotates uniformly).] A polarizer selects one direction. Malus's Law: I = I₀cos²θ. Key step: for UNPOLARIZED light, the first polarizer always gives I₀/2 regardless of its orientation — because the average of cos²θ over all θ is ½." [→ WE-1]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Polarization proves light is transverse. Sound cannot be polarized — try: make a sound wave and try to block it with a 'polarizer' aligned with one direction. It doesn't work because sound oscillates along the travel direction (longitudinal), not perpendicular to it. Light oscillates perpendicular to travel. Only transverse waves can be polarized. This is one of the strongest experimental arguments for the wave nature of light." [→ MC-1 discrimination pairs]

**TA-4 [P31 — Replacement: MC-2 — Three-polarizer paradox]**
"Crossed polarizers → zero. Now add P₂ at 45° between them. I = 12.5 W/m² from 100 W/m² initial — not zero! Let's trace: P₁ → 50 W/m² (horizontal). P₂ at 45° re-polarizes it at 45° → 50×cos²45° = 25 W/m². P₃ at 90° from P₁ = 45° from P₂ → 25×cos²45° = 12.5 W/m². The middle polarizer changes the polarization STATE — it makes light that was completely blocked by P₃ into light that P₃ can partially transmit. Adding a polarizer can increase transmission from zero." [→ WE-2]

**TA-5 [P51 — Check-in]**
"Quick check: Unpolarized light (I₀ = 60 W/m²) through a polarizer (any orientation). What exits? [30 W/m²] Now rotate the second polarizer to 30° from the first. What exits? [30×cos²30° = 30×0.75 = 22.5 W/m²] Now to 60°? [30×cos²60° = 30×0.25 = 7.5 W/m²]"
[Confirms S3 → S6 transition; catches students who forget the ½ factor]

**TA-6 [P41 — Diagnostic: sky polarization]**
"Sky is 75% polarized at 90° from the Sun. Total intensity = 200 W/m². A photographer uses a polarizing filter. What fraction of the sky light can be blocked? What intensity always gets through no matter how the filter is rotated? [→ WE-3]"
[Tests whether student understands partially polarized light and why unpolarized component persists]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Unpolarized 120 W/m² passes through two polarizers at 40°. Find final intensity. (2) Three polarizers: first at 0°, second at 30°, third at 90°. Find intensity after each for I₀ = 200 W/m². (3) Explain in one sentence why polarization proves light is a transverse wave.

Closing thought: Liquid crystal displays (LCDs) — in every phone screen and monitor — work by using an applied electric field to rotate polarized light through liquid crystal molecules, allowing each pixel to switch between transparent and opaque states using two crossed polarizers.

Spaced retrieval: +1 day (Malus's Law and the ½ factor for unpolarized input), +4 days (three-polarizer paradox explanation), +2 weeks (methods of producing polarized light and Brewster's angle concept)."

[P91 gate: threshold 0.80. Failure → Malus's Law drill with the ½-factor and three-polarizer sequence before re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** Unpolarized light of intensity 100 W/m² passes through a polarizing filter. (a) What is the transmitted intensity? (b) The transmitted polarized light then passes through a second filter at 30° to the first. Find the final intensity. (c) If the angle were 90°, what would the final intensity be?

**P-2 (Developing — identifies S6):** Polarized light of intensity I₀ passes through three filters at 0°, 45°, and 90° (angles relative to the previous polarizer). (a) Find the intensity after each filter. (b) If instead only the first and third filters are used (no 45° intermediate), what is the final intensity? (c) Why is the result different?

**P-3 (Proficient — identifies S9):** Light passes through a sequence of N polarizers, each rotated by 90°/N from the previous, starting at 0° and ending at 90°. Find the fraction of the initial polarized intensity transmitted for N = 1 (directly crossed), N = 2 (one intermediate at 45°), and N = 4 (three intermediates). Show that as N → ∞, the fraction transmitted → 1.

**P-4 (Mastery gate — confirms S9):** (a) A polarizer at 0° and an analyzer at 90° give zero output from unpolarized light. A half-wave plate (rotates polarization by 2α, where α is the angle between the plate's fast axis and the input polarization) is inserted at angle 22.5°. What is the new output intensity as a fraction of input? (b) Explain the three-polarizer experiment result I₃ = I₀/8 from a wave perspective — what has changed physically after each polarizer? (c) Why can partially polarized light never be completely blocked by a single polarizer? Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Polarizer transmission interactive. Shows E-field before and after a polarizer. Unpolarized mode: random arrows → one arrow after polarizer. Adjust second polarizer angle (slider 0°–90°). Real-time intensity display. Graph shows I vs. θ (cos² curve). Toggle between "from unpolarized" and "from polarized" to show the ½ factor.

**VIS-2:** Three-polarizer demonstration. Three polarizer cards at adjustable angles. Shows intensity after each polarizer numerically. Demonstrates: at P₂ = 0° → same as two-polarizer crossed → I₃ = 0. At P₂ = 45° → I₃ = I₀/8 = 12.5 W/m² for I₀ = 100. Animated photons (conceptual) showing state change at each polarizer.

**VIS-3:** Polarization methods comparison. Four panels: (1) Polaroid/dichroic sheet — absorption of one component; (2) Brewster angle reflection — horizontally polarized reflected ray; (3) Scattering — 90°-scattered light is polarized; (4) Birefringent crystal — two separated beams (o and e rays). Each shows the resulting polarization state.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.wave-optics | Wave nature of light (transverse oscillation) is the foundation of polarization | prerequisite |
| phys.opt.brewsters-law | Brewster's angle is the mechanism for polarization by reflection; builds on Malus's Law | unlocks |
| phys.em.electromagnetic-waves | EM wave's E-field transverse oscillation is the physical basis for polarization | conceptual link |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.polarization ✓ |
| V-2 | name matches KG | PASS — "Polarization of Light" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (advanced=5) | PASS ✓ |
| V-5 | bloom matches KG (understand) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — wave-optics ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (5) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 5, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (two polarizers), WE-2 (three-polarizer paradox), WE-3 (partially polarized sky light) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P51/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 3 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
