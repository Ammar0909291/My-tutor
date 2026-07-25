# chem.kinet.photochemistry — Photochemistry

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.kinet.photochemistry` |
| Domain | Chemical Kinetics |
| Requires | `chem.kinet.rate`, `chem.atomic.electromagnetic-radiation` |
| Unlocks | `chem.env.ozone` |
| Difficulty | advanced |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Photochemistry studies reactions initiated by light absorption: the primary process directly absorbs a photon (governed by the Stark-Einstein law — one photon activates one molecule/species in the primary step only), which can then trigger secondary (thermal/dark) processes that don't themselves require light, sometimes propagating into long radical chains that produce a quantum yield (Φ = molecules of product per photon absorbed) far greater than one; light absorption itself is quantified via the Beer-Lambert law using base-10 logarithm by spectroscopic convention (A = log₁₀(I₀/I) = εcl).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Sunlight splitting O₂ into oxygen radicals high in the stratosphere as the first step of ozone formation — a directly light-driven event.

**Representational**: A reaction-step diagram distinguishing the photon-absorbing primary step (drawn with an explicit hν arrow) from subsequent thermal/dark secondary steps (drawn without any light arrow).

**Abstract**: Quantum yield Φ = (molecules of product formed)/(photons absorbed), which can vastly exceed 1 when a chain reaction propagates from a single primary photochemical activation event.

**Transfer**: Given an unfamiliar multi-step photochemical mechanism, correctly identifying which single step is the true photon-driven primary process and which subsequent steps are thermal, and reasoning about whether a reported Φ value is physically plausible given that structure.

## 3. Why Beginners Fail

Students overgeneralize the Stark-Einstein one-photon-one-molecule law from the primary step onto the entire reaction, concluding quantum yield can never exceed 1 (missing that chain propagation in secondary steps can multiply the effect enormously); they carry over the natural-log convention from other rate-law contexts (like first-order integrated rate laws) into Beer-Lambert's absorbance, which by spectroscopic convention uses base-10 log, not natural log; and they assume every step described as part of a "photochemical reaction" individually requires light, rather than recognizing only the primary step is photon-driven while secondary steps proceed thermally.

## 4. Misconception Library

### MC-1: Quantum yield is always ≤ 1
- **Probe**: "The photochemical formation of HBr has Φ ≈ 10⁶. Is this physically possible? Explain."
- **Characteristic phrase**: "Quantum yield can't be more than 1 because one photon only excites one molecule."
- **Trigger (Type 1, overgeneralization)**: The Stark-Einstein law (one photon activates one molecule) is taught as an apparent ceiling on Φ, and students overgeneralize this primary-step-only rule to all photochemical processes as a whole.
- **Conflict evidence [P28]**: Φ ≈ 10⁶ for HBr formation means roughly a million HBr molecules form per photon absorbed — physically possible because the single photon-activated primary step triggers a radical chain reaction that propagates through roughly a million further (thermal, non-photon) steps before terminating.
- **Bridge [P30]**: Stark-Einstein applies strictly to the primary step — one photon does activate exactly one molecule there — but that one activated molecule can then set off a self-sustaining thermal chain that produces far more product molecules without consuming any additional photons.
- **Replacement [P31]**: Quantum yield equals the total number of product molecules formed per photon absorbed across the entire mechanism, including any chain-propagated secondary steps — it is bounded by the chain length, not by 1.
- **Discrimination pairs [P33]**: A simple non-chain photoreaction (Φ ≈ 1, one photon → roughly one product molecule) vs. a radical chain photoreaction (Φ >> 1, one photon triggers a long self-sustaining chain).
- **S6 repair path**: Present the HBr chain mechanism explicitly, showing the single photon-driven initiation step followed by many thermal propagation steps.

### MC-2: Beer-Lambert law uses ln, not log₁₀
- **Probe**: "A solution transmits 10% of incident light. Calculate its absorbance."
- **Characteristic phrase**: "A = ln(I₀/I) = ln(10) = 2.303, so A = 2.303."
- **Trigger (Type 5, instruction-induced)**: Beer-Lambert is often introduced near other contexts (like radioactive decay or first-order integrated rate laws) where natural log is the standard choice, and students carry that convention over incorrectly.
- **Conflict evidence [P28]**: By spectroscopic convention, A = log₁₀(I₀/I) = log₁₀(10) = 1.00, not 2.303 — most spectrometers are calibrated to read absorbance directly in these base-10 log units, and the factor 2.303 only ever appears when explicitly converting between the two log bases (A_decadic = A_natural/2.303).
- **Bridge [P30]**: Different fields adopt different log-base conventions for historical/instrumental reasons; spectroscopy's choice of log₁₀ is a definitional convention, not something derivable from first principles the way the natural-log integrated rate law is.
- **Replacement [P31]**: Beer-Lambert's absorbance is defined as A = log₁₀(I₀/I) = εcl, using base-10 logarithm by spectroscopic convention.
- **Discrimination pairs [P33]**: log₁₀(10) = 1.00 (correct Beer-Lambert answer) vs. ln(10) = 2.303 (wrong, imported from a different context).
- **S6 repair path**: Compute the transmittance example both ways side by side and state explicitly which convention applies to Beer-Lambert.

### MC-3: Secondary processes directly use light
- **Probe**: "In the Chapman ozone cycle, which step directly requires light? Which doesn't?"
- **Characteristic phrase**: "Ozone forms when UV light combines O and O₂ — light is needed for that step."
- **Trigger (Type 3, language contamination)**: Hearing the overall process called a "photochemical reaction" leads students to assume every individual step in the mechanism involves photons.
- **Conflict evidence [P28]**: In the Chapman cycle, only O₂ + hν → 2O• directly requires a photon (the primary, light-driven step); the subsequent step O• + O₂ → O₃ is a thermal (dark) reaction that proceeds at any temperature once O• radicals already exist, with no photon involved at all.
- **Bridge [P30]**: The label "photochemical reaction" describes the overall process being initiated by light, not a claim that every constituent step is individually light-driven — this is a definitional distinction (primary = photon-driven, secondary = dark/thermal), not a matter of degree.
- **Replacement [P31]**: Only the primary step of a photochemical mechanism directly absorbs a photon; secondary steps proceed thermally, driven by the reactive species (radicals, excited states) the primary step produced.
- **Discrimination pairs [P33]**: O₂ + hν → 2O• (photon-driven primary) vs. O• + O₂ → O₃ (thermal secondary, no photon).
- **S6 repair path**: Walk through the full Chapman cycle step by step, explicitly labeling each step as primary (hν) or secondary (thermal).

## 5. Explanation Library

**Primary explanation**: A photochemical reaction begins with a primary process — the direct absorption of a photon by one molecule, governed by the Stark-Einstein law (one photon, one molecule activated, in this step only). That activated species can then undergo secondary processes, which proceed thermally (no further photons required) and can include chain-propagation steps that multiply the initial effect into a large number of product molecules, measured by the quantum yield Φ = product molecules formed per photon absorbed.

**Secondary explanation (Beer-Lambert framing)**: Light absorption by a solution is quantified by the Beer-Lambert law, A = εcl, where absorbance A is defined using base-10 logarithm (A = log₁₀(I₀/I)) by spectroscopic convention — distinct from the natural-log conventions used elsewhere in kinetics (like first-order integrated rate laws).

## 6. Analogy Library

- **Primary analogy**: A single lit match (the photon-driven primary step) igniting a long chain of falling dominoes (the thermal secondary/propagation steps) — the match only needs to touch the first domino once, but the resulting cascade can knock over a million more dominoes without any further matches.
- **Breaking point**: The domino analogy conveys chain amplification well but doesn't capture the specific Beer-Lambert quantification of how much light gets absorbed in the first place — that requires the separate log₁₀ absorbance framework.
- **Anti-analogy**: Do NOT describe every step of a photochemical mechanism as "needing light" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (quantum yield calculation)**: Present the HBr radical chain mechanism (initiation, propagation, termination steps) and have students count how many product molecules trace back to a single primary photon-absorption event, building Φ from mechanism structure rather than a formula alone.
- **Demonstration 2 (Beer-Lambert convention check)**: Give students a transmittance value and have them compute absorbance both with log₁₀ and ln, then state which one matches instrument-reported absorbance values from a real spectrometer.

## 8. Discovery Lesson

**Opening**: "If one photon can only activate one molecule, how can a photochemical reaction produce a million product molecules per photon absorbed?"

**Exploration**: Students work through the HBr chain mechanism step by step, identifying the single photon-driven initiation step and then counting how many thermal propagation cycles follow from it.

**Synthesis**: Guide toward: the one-photon-one-molecule rule is strictly true only for the primary step; everything downstream in a chain mechanism multiplies that single activation event without needing more photons.

**Closure**: "So in the Chapman ozone cycle, is every step 'photochemical' in the sense of directly needing light?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the HBr radical chain mechanism, explicitly labeling the single photon-driven initiation step.
- **TA-2 (TELL)**: State the Beer-Lambert log₁₀ convention explicitly, immediately followed by a worked absorbance calculation.
- **TA-3 (DO)**: Student computes quantum yield from a given mechanism's product count and photon count.
- **TA-4 (TEST-THINKING)**: Present the Chapman cycle and ask the student to label each step as primary (photon-driven) or secondary (thermal).

## 10. Voice Teaching

Always distinguish "primary process" (photon-driven, Stark-Einstein applies) from "secondary process" (thermal, no photon) by name whenever describing a photochemical mechanism step by step — never use "photochemical reaction" as a blanket label without this clarification. When computing absorbance, state "log base 10, by spectroscopy convention" explicitly every time, since the natural-log habit from other kinetics contexts is a strong, well-established competing convention.

## 11. Assessment

**Mastery gate**: Student can (a) explain how a chain mechanism produces Φ >> 1 without violating the Stark-Einstein law, (b) correctly compute absorbance using log₁₀, (c) correctly identify which steps in a given photochemical mechanism are primary (photon-driven) vs. secondary (thermal).

- **FA-1**: "The photochemical formation of HBr has Φ ≈ 10⁶. Is this physically possible? Explain." — targets MC-1.
- **FA-2**: "A solution transmits 10% of incident light. Calculate its absorbance." — targets MC-2.
- **FA-3**: "In the Chapman ozone cycle, which step directly requires light? Which doesn't?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've recently worked with natural-log-based integrated rate laws in the immediately preceding kinetics concepts.

**Delayed retrieval**: Re-probe MC-3's primary/secondary distinction before `chem.env.ozone` builds the full Chapman cycle and ozone-depletion mechanisms on top of this concept.

## 12. Recovery Notes

- **S3 (stuck)**: For quantum yield confusion, walk the HBr chain mechanism one step at a time, having the student mark which single step has an hν arrow before counting downstream products.
- **S4 (frustrated)**: Normalize — the ln-vs-log₁₀ convention clash is a genuine cross-context trap that catches most students who've just done natural-log-based kinetics work.
- **S6 (collision)**: Use the explicit HBr chain-step-counting exercise for MC-1; use the Chapman cycle step-by-step labeling for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why quantum yield isn't capped at 1 despite the Stark-Einstein law being true.

## 13. Memory & Review

Tag as a conceptual-correction memory (chain amplification of quantum yield; primary vs. secondary steps) plus a convention-based procedural memory (Beer-Lambert log₁₀). Schedule a spaced check at ~1 week and again immediately before `chem.env.ozone`.

## 14. Transfer Map

Feeds directly into `chem.env.ozone` (the Chapman cycle's primary/secondary step structure, and its light-driven initiation, are exactly this concept's core content applied to atmospheric ozone chemistry).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
