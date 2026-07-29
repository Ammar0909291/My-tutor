# Thermal Expansion — `phys.therm.thermal-expansion`

## Identity

- **Concept ID**: `phys.therm.thermal-expansion`
- **Display name**: Thermal Expansion
- **Domain**: thermodynamics
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.70
- **Estimated hours**: 3
- **Requires**: `phys.therm.temperature`
- **Unlocks**: *(none listed in KG)*
- **Load-bearing prerequisite content**:
  - From `phys.therm.temperature`: ΔT as a signed temperature change (expansion depends on ΔT, and the sign of ΔT determines direction — expansion or contraction); the particle-speed model (particles vibrating more vigorously push each other further apart, increasing dimensions)

---


## Learning Objective

The learner can:

1. Apply the linear thermal expansion formula ΔL = αLΔT and the volumetric expansion formula ΔV = βVΔT (β ≈ 3α for isotropic solids) to calculate dimensional changes for given α, initial size, and temperature change.
2. Explain why a hole in a metal plate or the inside of a ring expands when heated (every linear dimension, including gaps, expands proportionally) — and apply this to explain how an expansion gap in a bridge rail is designed.
3. Explain the anomalous expansion of water: water contracts when cooled from room temperature to 4°C, then expands as it freezes, reaching its maximum density at 4°C. State why this is ecologically important for aquatic life.
4. Calculate the required gap between two railway rails that are each L_0 metres long at temperature T₀ so they just barely touch at temperature T_max — a direct application of ΔL = αL₀ΔT.

## Core Understanding

_Thermal expansion describes how solids, liquids, and gases change dimensions with temperature._ This concept is the physical model learners must hold — not just a formula to apply — before related downstream concepts can be correctly understood and transferred.

## Mental Models

**Stage 1 — Beginner**: When things get hotter, they expand (get bigger); when they cool down, they contract (get smaller). This is why gaps are left in railway tracks and concrete pavements — to allow for expansion without buckling.

**Stage 2 — Intermediate**: Thermal expansion is quantified by the coefficient of thermal expansion. For a solid rod: ΔL = α L₀ ΔT, where α is the linear expansion coefficient (units: °C⁻¹ or K⁻¹), L₀ is the original length, and ΔT is the temperature change. Area and volume expansion use coefficients β ≈ 2α and γ ≈ 3α respectively. Liquids and gases also expand: gases far more than liquids (at constant pressure, gas volume is directly proportional to absolute temperature — the ideal gas law). Water is anomalous: it contracts when cooled from 4 °C to 0 °C, making ice less dense than liquid water.

**Stage 3 — Advanced**: Linear expansion is an approximation valid for small ΔT. The full expression is L = L₀(1 + α ΔT). For larger temperature changes, α itself depends on temperature and the linear approximation breaks down. Thermal stress: if an object is constrained and cannot expand, it develops internal stress σ = E α ΔT, where E is the Young's modulus. Bimetallic strips exploit the different α values of two bonded metals — different expansions cause bending, used in thermostats and circuit breakers.

**Stage 4 — Expert / University**: Thermal expansion is a consequence of the anharmonicity of the interatomic potential well — if the well were perfectly symmetric (harmonic), thermal vibration would produce no net expansion. The Grüneisen parameter γ_G quantifies the relationship between the volume change and the change in phonon frequencies. Negative thermal expansion (certain ceramics and zirconates) occurs when the dominant vibrational mode is a transverse vibration that causes atoms to pull their neighbours inward.

**Model versioning**: Stage 2 is the operative model for all secondary-level problems. Stage 3 introduces bimetallic strips and thermal stress. Stage 4 is condensed matter physics.

---

## Why Students Fail

The dominant root cause is **hole misconception**: learners believe that when a solid with a hole expands, the hole gets smaller (the solid "fills in" the hole). The opposite is true — both the material and the hole expand proportionally. The hole expands at the same rate as a solid disc of the same material would.

The secondary root cause is **water anomaly surprise**: learners expect water to contract all the way from 100 °C to 0 °C as it cools. The contraction from 4 °C to 0 °C (volume increase — water expands as it cools toward freezing) is counterintuitive and must be taught explicitly.

---

## Misconceptions

**M1 — "A hole in a solid gets smaller when the solid expands"**
- Characteristic phrase: "When you heat a metal ring, the hole in the middle gets smaller."
- Probe: "A metal washer is heated. Does the hole in the washer get larger or smaller?"
- Expected wrong answer: "Smaller — the metal expands inward."
- Recovery: every linear dimension of the washer expands by α ΔT — including the inner diameter. Think of it as: if you drew a circle on the washer with a marker, the marked circle would expand uniformly — the hole is that circle. Alternatively, imagine the hole as a disc of the same metal temporarily removed: it would expand when heated; so the hole expands too.

**M2 — "Expansion means only length increases, not all dimensions"**
- Characteristic phrase: "It gets longer but not wider" or "thermal expansion is only in one direction."
- Probe: "A cube of metal is heated. In which directions does it expand?"
- Expected wrong answer: "Only along the longest axis" or "only upward."
- Recovery: isotropic materials expand equally in all directions. For a cube, all three sides grow by α ΔT × original side length. For anisotropic materials (certain crystals), expansion coefficients differ by direction — but this is an advanced special case. The default is equal expansion in all dimensions.

**M3 — "Water contracts uniformly from 100 °C to 0 °C"**
- Characteristic phrase: "Water always shrinks as it cools, so ice is denser than water."
- Probe: "Does ice sink or float in liquid water? What does this tell you about the relative density of ice and liquid water?"
- Expected wrong answer: "Ice sinks — it's more compact and denser."
- Recovery: ice floats. This means ice is less dense than liquid water. Water reaches maximum density at 4 °C; cooling from 4 °C to 0 °C actually causes expansion (decreasing density), which is why ice floats. This anomaly has profound ecological consequences (lakes freeze from the top down, preserving liquid water and aquatic life below).

**M4 — "ΔT must be in Celsius, not Kelvin, for thermal expansion"**
- Characteristic phrase: "You can't use Kelvin in the thermal expansion formula."
- Probe: "A rod is heated from 20 °C to 80 °C. ΔT in Celsius is 60. What is ΔT in Kelvin?"
- Expected wrong answer: "ΔT in Kelvin is 353 − 293 = 60 K ... or wait, isn't it 60 + 273 = 333 K?"
- Recovery: ΔT is the same in Celsius and Kelvin. A difference of 60 °C = a difference of 60 K, because both scales have the same size degree. (K = °C + 273 for absolute temperature, but when subtracting two temperatures, the +273 cancels: ΔT_K = (T₂ + 273) − (T₁ + 273) = T₂ − T₁ = ΔT_°C.) For the thermal expansion formula, ΔT in Celsius and ΔT in Kelvin give identical results.

---

## Analogies

**Primary analogy — The photograph scaling**
Imagine printing a photograph of a metal washer and then enlarging it on a photocopier. Every part of the image — solid regions and the white circle (hole) in the middle — gets larger. The hole in the enlarged photograph is bigger than in the original. Thermal expansion is uniform scaling: the solid scales up, and so does every gap within it.

**Breaking point**: A photocopier scales by a user-selected factor; thermal expansion scales by α ΔT, a material property and temperature change. The analogy does not capture the direction of expansion being determined by α (some materials expand less in some directions), or the water anomaly.

**Anti-analogy — "Expansion fills the gaps"**
Do NOT use any language suggesting that the expanding solid material "flows into" the hole. The material does not flow; the atomic bonds stretch slightly. Each atom moves away from its neighbours by a tiny amount, uniformly in all directions. There is no fluid-like filling of space; there is uniform scaling.

---

## Demonstrations

**D1 — Ball and ring demonstration**
A metal ball just barely fits through a metal ring at room temperature. Heat only the ring: the ball now passes through easily (ring expanded, hole grew). Cool only the ring: ball still passes. Heat the ball (not the ring): the ball no longer fits through the ring (ball expanded, ring unchanged). This directly demonstrates M1 recovery: the hole in the ring expanded when the ring was heated.

**D2 — Rail gap measurement**
Photograph or show diagrams of expansion joints in railway tracks or concrete pavements. Measure (or estimate) the gap width and calculate whether it is consistent with ΔL = α L₀ ΔT for the temperature range in that location. This connects abstract formula to visible engineering design.

**D3 — Bimetallic strip in hot water**
Place a bimetallic strip in a beaker of hot water: it bends. Remove: it straightens (or bends the other way as it cools). This demonstrates differential expansion — the two bonded metals have different α values and expand by different amounts, causing curvature. Connects Stage 2 to Stage 3 content.

**D4 — Ice-float demonstration**
Place an ice cube in a glass of water: it floats. Ask: "What does this tell you about the density of ice vs. liquid water? What does that tell you about what happened to water's volume when it froze?" This introduces the water anomaly as an empirical observation before the explanation.

---

## Discovery Questions

**Argue for guided discovery with direct instruction for exceptions**:

For linear expansion, a guided discovery works: "We have a steel rod at 20 °C and a steel rod at 120 °C. Which is longer? How much longer? If the length change is proportional to the original length and to ΔT, what would the formula look like?" The learner can derive ΔL = k × L₀ × ΔT and then learn that k is called α.

For the water anomaly and the hole expansion, direct instruction is required — neither can be discovered from first principles without laboratory equipment or strong prior knowledge. Present both as surprising exceptions to the "everything expands uniformly" rule, with the empirical evidence (floating ice, ball-and-ring demo) first.

---

## Teaching Sequence

**TA1 — Hole-expansion prediction before demo**: Before the ball-and-ring demonstration, ask the learner to predict: "If I heat the ring, does the hole get larger or smaller?" Record the answer. Run the demo. This creates a deliberate collision with M1 that the physical outcome resolves.

**TA2 — ΔT unit confirmation**: For every thermal expansion calculation, require the learner to write "ΔT = ___ °C = ___ K" and confirm the values are numerically equal before substituting.

**TA3 — Material application question**: After any thermal expansion calculation, ask: "What real engineering problem does this cause or solve?" Connects the formula to design applications (expansion joints, bimetallic thermostats, precision instruments).

**TA4 — Water anomaly flag**: Whenever a thermal expansion problem involves water, flag the anomaly: "Water is unusual near 0 °C — check whether the temperature range crosses 4 °C, where the normal contraction reverses."

---


## Tutor Actions

Priority dispatch (in order):

1. **PREDICTION-BEFORE-DEMO** — "A metal lid on a glass jar is stuck. You run it under hot water and it loosens. Why? Which expanded more — the lid or the jar?" Let learner predict, then reason through α_metal > α_glass as the mechanism.

2. **WORKED-EXAMPLE** — three traces: (a) steel rail 10 m at 20°C, heated to 40°C — find ΔL. (b) Same material, 2D: square plate — what happens to the area? (c) Gap design: bridge segment needs 5 mm gap at 15°C to remain gap-free up to 45°C — find the required segment length. Makes expansion engineering-concrete.

3. **MISCONCEPTION-PROBE M2** — "A circular metal ring is heated uniformly. Does the hole get larger or smaller?" Expected wrong: "smaller — the metal expands inward." Correct: the hole expands. Heat every part of the ring proportionally — each arc segment lengthens, so the circumference grows, so the hole grows. Analogy: imagine drawing the ring on a rubber sheet and stretching it uniformly.

4. **RETRIEVAL-SCHEDULE-PROMPT** — "A glass thermometer works because the liquid inside expands. Why does the glass tube need to be capillary (very narrow)? What would happen if the tube were wider?" (Tests proportionality of ΔV to the cross-section — the narrower tube makes the expansion visible.)

## Voice Teaching Notes

> "The most surprising thing about thermal expansion is the hole. When a ring is heated, the hole gets bigger — not smaller. I know your instinct says the ring expands inward and closes the gap. But expansion is uniform: every dimension grows, including the inner diameter. Think of blowing up a photograph — the white space in the picture gets bigger too. The ring is that photograph."

> "Water breaks the rules between 0 °C and 4 °C. Most liquids contract as they cool — water does too, down to 4 °C. But below 4 °C, water starts expanding again until it freezes into ice, which is less dense than liquid water. This is why ice floats, why lakes freeze from the top down, and why fish survive winter: the layer of ice insulates the liquid water below it."

> "ΔT is the same number in Celsius and in Kelvin. When you subtract two temperatures, the +273 offset cancels perfectly. So in the thermal expansion formula, use whichever unit you started with — Celsius or Kelvin, both give the same ΔT."

---

## Assessment Signals

**Mastery gate**: The learner can apply ΔL = α L₀ ΔT correctly, explain that holes expand when a solid is heated, and identify the water anomaly as an exception to normal thermal contraction.

**Formative golden probe**
> "A steel bridge beam is 50 m long at 10 °C. α_steel = 12 × 10⁻⁶ K⁻¹. (a) How much does it expand when heated to 40 °C? (b) A circular steel plate with a 10 cm diameter hole is heated from 10 °C to 40 °C. Does the hole diameter increase or decrease, and by how much? (c) Water at 6 °C is cooled to 2 °C. Does its volume increase or decrease?"

- (a): straightforward application of the formula
- (b): targets M1 — hole diameter increases by α × 0.10 m × 30 K
- (c): targets M3 — water is between 4 °C and 0 °C, so it expands (volume increases)

**Confidence calibration question**
After (b): "How confident are you that the hole expands?" (1–5). A learner who answered "decreases" with high confidence has deeply embedded M1.

**Delayed retrieval check (48 h / 7 days)**
"Explain in one sentence why expansion joints are left between sections of concrete pavement." (Tests functional understanding: without gaps, thermal expansion in summer would cause buckling.)

---

## Tutor Recovery Strategy

**Failure mode A — Hole misconception persists (M1)**
Run D1 (ball-and-ring demo, even as a video). The ball not fitting through the heated ball-alone scenario (ball expanded, ring did not) and fitting through the heated-ring scenario (ring hole expanded) must be seen. Then ask: "If you heat the ring and the ball by the same amount, does the ball fit?" (No — both expand by the same fraction, so the ball remains too large for the hole if it started tight. This is a beautiful extension question.)

**Failure mode B — Water anomaly not retained**
Return to D4 (floating ice). "Ice floats. This is a direct observation. What must be true about ice's density relative to liquid water?" Follow the chain: density comparison → volume comparison → water expanded when freezing → below 4 °C, water expands when cooling.

**Failure mode C — ΔT Celsius vs. Kelvin confusion**
Write explicitly: T₁ = 20 °C = 293 K. T₂ = 80 °C = 353 K. ΔT = T₂ − T₁ = 60 °C = 60 K. Show the subtraction cancels the +273. Confirm numerically. This is a one-time explicit demonstration that should resolve the confusion permanently.

---

## Memory Hooks

**Memory type**: Formula (ΔL = α L₀ ΔT) + two factual exceptions (hole expands, water anomaly).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State the linear thermal expansion formula and define each symbol."
- "What happens to the size of a hole in a metal plate when the plate is heated?"
- "At what temperature does water have its maximum density?"
- "Why does ice float on water?"

**Interleaving**: After mastery, interleave thermal expansion with thermal stress problems (if a rod is prevented from expanding, it experiences compressive stress) and bimetallic-strip problems.

---

## Transfer Connections

**Immediate applications**:
- Engineering: railway expansion joints, pavement expansion joints, precision measurement instruments (compensating for thermal drift), bimetallic thermostats and circuit breakers
- Everyday: glass lids that are difficult to remove (cooled — contracted); loosening a tight jar lid by running hot water over it (differential expansion of metal lid vs. glass jar)

**Downstream physics**:
- `phys.therm.ideal-gas-law`: gas thermal expansion is the dominant behaviour (γ_gas >> γ_solid); the gas law is the theoretical description of how volume changes with T at constant pressure
- Thermal stress: when combined with Young's modulus and the geometry of constrained structures

**Cross-subject transfers**:
- `chem` — volumetric glassware calibration temperature (all calibrated at 20 °C); thermometers (mercury or alcohol expansion); density-temperature curves for solutions
- Biology — the water anomaly is ecologically critical: aquatic life depends on ice floating and insulating; organisms have evolved in an environment where water bodies do not freeze solid from the bottom up

---


## Cross-Subject Connections

Mathematics: calculus underlies heat-flow equations; statistical probability distributions govern thermal averages. Chemistry: thermochemistry, chemical equilibrium (Gibbs free energy), and reaction spontaneity are thermodynamics applied to molecular systems; the ideal-gas law is shared. Biology: metabolism is biochemical thermodynamics; body temperature regulation is heat-transfer in a biological system.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.therm.thermal-expansion.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) including core_explanation, worked_example, and misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe variants, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required

## Curriculum Feedback

The KG lists no unlocks for `phys.therm.thermal-expansion`. In teaching sequence, thermal expansion is foundational for understanding ideal gas behaviour (gases expand dramatically with temperature) and for engineering applications. Consider adding `phys.therm.ideal-gas-law` as a soft conceptual unlock — students benefit from seeing that gases are the extreme case of thermal expansion, while solids expand by tiny fractions per degree and gases expand by factors at constant pressure.

The description "solids, liquids, and gases change dimensions with temperature" correctly covers all three phases. The water anomaly deserves a mention in the KG description — it is a curriculum-critical factual exception that every secondary-level learner encounters and needs to be prepared for.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

## Version History

- **v1.0** (2026-07-29): Initial full-standard entry. Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.
