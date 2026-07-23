# Photochemical Reactions — `chem.kinet.photochemistry`

## Identity

- **KG ID**: chem.kinet.photochemistry
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: advanced
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.kinet.rate, chem.atomic.electromagnetic-radiation
- **Unlocks**: chem.env.ozone
- **Cross-links**: none

## Learning Objective

Students can define primary and secondary photochemical processes; calculate quantum yield; apply the Beer–Lambert law to calculate absorbance and transmittance; and describe the role of photochemical reactions in stratospheric ozone formation and depletion.

## Core Understanding

**Photochemical vs thermal reactions**: thermal reactions are driven by molecular kinetic energy (temperature); photochemical reactions are initiated by absorption of a photon. The photon must have at least the energy of the bond or electronic transition being activated: E = hν = hc/λ. UV and visible light typically trigger photochemical reactions; infrared photons usually only cause vibrational excitation, not electronic excitation.

**Primary photochemical process**: the direct result of photon absorption by a molecule — electronic excitation, followed by dissociation, isomerisation, ionisation, or energy transfer. This is the step where light is consumed:
M + hν → M* (excitation) → products (dissociation, etc.)

**Secondary photochemical process**: subsequent thermal or dark reactions of the primary photoproducts with other species — these steps do NOT directly involve light. For example, in the ozone layer: O• (primary photoproduct from O₂ photodissociation) + O₂ → O₃ (secondary, thermal).

**Quantum yield (Φ)**: the number of molecules undergoing a specific process per photon absorbed.
Φ = (number of events / number of photons absorbed)
Φ ranges from 0 (no photochemical event) to ~10⁶ for chain reactions where one photon triggers many secondary steps. For a simple primary process with no chain, Φ ≤ 1 (the Stark–Einstein law: one photon excites at most one molecule).

**Beer–Lambert law**: A = εcl
- A = absorbance (dimensionless, log₁₀(I₀/I))
- ε = molar absorption (extinction) coefficient (L mol⁻¹ cm⁻¹)
- c = concentration (mol L⁻¹)
- l = path length (cm)
- Transmittance T = I/I₀; A = −log₁₀(T)
- The law is valid only for dilute solutions and monochromatic light.

**Ozone photochemistry (Chapman cycle — primary/secondary example)**:
- Primary: O₂ + hν (λ < 240 nm) → 2 O•
- Secondary: O• + O₂ + M → O₃ + M (thermal)
- Primary: O₃ + hν (λ 200–320 nm) → O₂ + O•
- Secondary: O• + O₃ → 2 O₂ (thermal)
These two pairs of primary + secondary processes constitute the natural ozone equilibrium.

## Mental Models

**The photon as a key**: each photon is a key that fits only certain molecular "locks" (electronic energy gaps). The wrong wavelength (wrong key shape) cannot open the lock — no photochemical reaction occurs even at high intensity. The right wavelength opens the lock (excitation), and then either the excited molecule does chemistry (primary process) or it falls back down harmlessly (quenching).

**Quantum yield as factory efficiency**: Φ is how many product molecules come out per photon put in. A factory (Φ = 1) that perfectly converts each photon into one product molecule is the theoretical maximum for a single-step process. A chain-reaction factory (Φ >> 1) multiplies each photon into many product molecules via thermal steps; Φ < 1 means competing pathways (fluorescence, quenching) bleed energy away before reaction.

## Why Students Fail

1. **Primary = light-driven is all that matters**: students focus on the primary process and think secondary processes are less important or optional. In practice (e.g., ozone formation), the secondary step produces the important product.
2. **Quantum yield always ≤ 1**: students assume Φ ≤ 1 because "one photon can only do one thing." Chain reactions routinely give Φ >> 1 (HBr formation: Φ ≈ 10⁶).
3. **Beer–Lambert: A = εcl uses natural log**: students use ln instead of log₁₀. The law uses log₁₀ by convention (absorbance A = log₁₀(I₀/I)).
4. **Thermal reactions use higher temperature → more photochemical reactions too**: students think heating increases photochemical reaction rates the same way it increases thermal rates. Photochemical rates depend on light intensity, not temperature (though secondary thermal steps do depend on temperature).

## Misconceptions

**MC-1 — Quantum yield is always ≤ 1** (Type 1, overgeneralization)
- *Mechanism*: Stark–Einstein law (one photon activates one molecule) is taught as a ceiling on Φ. Students overgeneralise to ALL photochemical processes.
- *Diagnostic probe*: "The photochemical formation of HBr has Φ ≈ 10⁶. Is this physically possible? Explain."
- *Characteristic phrase*: "Quantum yield can't be more than 1 because one photon only excites one molecule."
- *Repair*: Stark–Einstein applies to the primary step only (one photon activates one molecule). Secondary chain reactions can then produce millions of product molecules from that one activated molecule. Φ = 10⁶ means 10⁶ HBr molecules per photon — the primary activation triggers a radical chain of 10⁶ steps. No physics law is violated; the photon's energy is the trigger, not the fuel for the whole chain.

**MC-2 — Beer–Lambert law uses ln, not log₁₀** (Type 5, instruction-induced)
- *Mechanism*: Beer–Lambert is introduced alongside radioactive decay or other contexts where natural log is the natural choice (e.g., first-order integrated rate law uses ln). Students carry the ln convention over.
- *Diagnostic probe*: "A solution transmits 10% of incident light. Calculate its absorbance."
- *Characteristic phrase*: "A = ln(I₀/I) = ln(10) = 2.303, so A = 2.303."
- *Repair*: Beer–Lambert uses log₁₀ by definition (spectroscopy convention). A = log₁₀(I₀/I) = log₁₀(10) = 1.00, not 2.303. (The factor 2.303 appears only when converting between the two: A_decadic = A_natural / 2.303.) Many spectrometers read A directly in log₁₀ units; this is why the log₁₀ convention is standard.

**MC-3 — Secondary processes directly use light** (Type 3, language contamination)
- *Mechanism*: students hear "photochemical reaction" and assume ALL steps in the mechanism involve photons.
- *Diagnostic probe*: "In the Chapman ozone cycle, which step directly requires light? Which doesn't?"
- *Characteristic phrase*: "Ozone forms when UV light combines O and O₂ — light is needed for that step."
- *Repair*: only the primary step directly requires the photon. O₂ + hν → 2 O• is light-driven. The secondary step O• + O₂ → O₃ is a thermal (dark) reaction — it proceeds at any temperature once O• radicals exist, with no photon involved. This distinction is definitional: primary = photon-driven; secondary = dark/thermal.

## Analogies

**The first-domino analogy**: photon absorption is knocking over the first domino (primary step). All subsequent dominos fall by contact (secondary thermal steps) — no more photon energy is needed. Quantum yield > 1 means the first domino triggers a long chain.

**The sparking a fire analogy**: a photon (spark) ignites kindling (primary activation). The kindling can then set logs on fire (secondary steps that release far more energy). The spark itself only starts the process; the chain reaction provides the scale.

## Demonstrations

**Demonstration 1 — Beer–Lambert measurement**
- Use a spectrophotometer to measure absorbance of a dye solution (e.g., KMnO₄) at several concentrations. Plot A vs. c — a straight line through the origin confirms Beer–Lambert. Calculate ε from the slope. Students observe directly that A is additive and linear in concentration.

## Discovery Questions

1. "Light of λ = 300 nm strikes a solution in a 1.00 cm cell. ε = 1500 L mol⁻¹ cm⁻¹, c = 0.002 mol L⁻¹. Calculate A and %T." (Targets: A = εcl = 1500 × 0.002 × 1.00 = 3.00. T = 10⁻³ = 0.001. %T = 0.1%. Essentially all light absorbed — the solution is opaque at this wavelength.)
2. "A photochemical reaction has Φ = 0.25. If 4.0 × 10²⁰ photons are absorbed per second, how many molecules react per second?" (Targets: molecules/s = Φ × photons/s = 0.25 × 4.0 × 10²⁰ = 1.0 × 10²⁰ mol s⁻¹ × N_A⁻¹. Actually: 1.0 × 10²⁰ molecules/s. In moles: 1.0 × 10²⁰ / 6.022 × 10²³ = 1.66 × 10⁻⁴ mol s⁻¹.)
3. "Identify which steps in the Chapman cycle are primary and which are secondary." (Targets: O₂ + hν → 2 O• = primary; O• + O₂ + M → O₃ = secondary; O₃ + hν → O₂ + O• = primary; O• + O₃ → 2 O₂ = secondary.)

## Teaching Sequence

1. Review from chem.kinet.rate: rate depends on concentration, temperature, surface area, catalyst — now add light as a 5th driver (photochemical activation).
2. Review from chem.atomic.electromagnetic-radiation: photon energy E = hν = hc/λ; UV > visible > IR in energy.
3. Introduce primary vs secondary processes. Demonstrate with the Chapman ozone cycle (Discovery Question 3 first as a guided group task).
4. Introduce quantum yield: definition, Stark–Einstein limit for primary step, chain-reaction exception (HBr). Address MC-1.
5. Introduce Beer–Lambert law: derive from the physical idea that each thin layer absorbs a constant fraction of incident light → exponential decay → log₁₀. Address MC-2.
6. Work Discovery Question 1 (Beer–Lambert calculation).
7. Work Discovery Question 2 (quantum yield calculation).

## Tutor Actions

- If student says Φ ≤ 1 always → MC-1 repair: HBr example, Φ ≈ 10⁶; Stark–Einstein applies to the primary step only.
- If student uses ln in Beer–Lambert → MC-2 repair: spectroscopy convention is log₁₀; A = log₁₀(I₀/I); compute the 10%-transmittance check.
- If student says all steps involve light → MC-3 repair: primary = photon-activated; secondary = dark/thermal; ozone formation does not require a photon.
- Advance when student correctly classifies primary/secondary steps, calculates Φ, and applies Beer–Lambert with log₁₀.

## Voice Teaching Notes

Beer–Lambert is a log₁₀ law. Say it plainly at the start: "Absorbance is log base ten of the intensity ratio — not natural log, base ten." The reason: spectrophotometers display absorbance as log₁₀ and students will use real instruments; the convention must be explicit.

Quantum yield > 1 is counterintuitive and often not believed. Use the HBr number (Φ = 10⁶) as a dramatic example and trace the mechanism: one Br• radical from one photon triggers a 10⁶-step chain. "The photon is the trigger, not the fuel."

## Assessment Signals

**Mastery gate**:
1. Student correctly identifies primary and secondary steps in a given photochemical mechanism.
2. Student correctly calculates quantum yield from molecule count and photon count.
3. Student correctly applies Beer–Lambert (A = εcl, log₁₀) and converts between A, T, and %T.
4. Student explains why Φ > 1 is possible without violating Stark–Einstein.

**FRAGILE signal**: student applies Beer–Lambert correctly but cannot explain why A is proportional to concentration (no structural understanding of the exponential-decay derivation).

**MISCONCEIVING signal**: student writes A = ln(I₀/I). Correct immediately before any Beer–Lambert calculation.

## Tutor Recovery Strategy

If stuck:
1. For Beer–Lambert derivation: each thin layer of thickness dx absorbs fraction dI/I = −αdx (each added molecule removes a constant fraction of remaining light). Integrate → I = I₀ × 10^(−εcl). Taking log₁₀ gives A = εcl. This shows why it's log₁₀ and why it's linear in c and l.
2. For quantum yield > 1: trace the HBr mechanism step-by-step: Br₂ + hν → 2 Br• (primary). Then Br• + H₂ → HBr + H• (secondary); H• + Br₂ → HBr + Br• (secondary) — the last two steps cycle 10⁶ times per primary activation. Chain length = Φ.
3. For primary/secondary distinction: ask "Does this step require a photon?" If yes → primary. If no, it only requires the products of a prior step → secondary.

## Memory Hooks

- **Primary = photon-driven. Secondary = dark (thermal) after primary.**
- **Φ = molecules reacted / photons absorbed. Can be >> 1 in chain reactions.**
- **Beer–Lambert: A = εcl. A = log₁₀(I₀/I). Log BASE TEN.**
- **A = 1 → T = 10%. A = 2 → T = 1%. A = 3 → T = 0.1%.** (Quick mental check.)

## Transfer Connections

- **chem.env.ozone**: the Chapman ozone cycle (this node) is the core mechanism for stratospheric ozone; CFC photochemistry (Cl• from CF₂Cl₂ + hν) disrupts the ozone equilibrium via the secondary Cl• + O₃ → ClO + O₂ chain.
- **chem.kinet.rate-law**: photochemical primary steps obey first-order kinetics in the absorbed photon flux; Beer–Lambert governs how that flux depends on solution depth.

## Cross-Subject Connections

- **Physics (phys.opt.nature-of-light)**: Beer–Lambert derives from the exponential attenuation of electromagnetic radiation in an absorbing medium — the same physics as attenuation in any continuous medium.
- **Biology (bio.metabol.photosynthesis)**: the light reactions of photosynthesis are primary photochemical processes (excitation of chlorophyll by photons); the Calvin cycle (dark reactions) is a series of secondary processes driven by the primary photoproducts ATP and NADPH.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.photochemistry`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.photochemistry` as of 2026-07-23.

## Curriculum Feedback

The prerequisite on chem.kinet.rate (not chem.kinet.rate-law) is appropriate — students need the basic concept of reaction rate but not yet the formal rate-law machinery, since photochemical kinetics depend on photon flux rather than the standard concentration-based rate law. The unlock into chem.env.ozone is well-placed (ozone chemistry is the direct application).

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
