# chem.org.spectroscopy — Spectroscopic Identification of Organic Compounds

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.spectroscopy` |
| Domain | Organic Chemistry |
| Requires | `chem.atomic.electromagnetic-radiation`, `chem.org.iupac` |
| Unlocks | `chem.anal.spectroscopy`, `chem.carb.spectro` |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Three spectroscopic techniques combine to identify organic structures: mass spectrometry (the molecular ion appears at the HIGHEST m/z, which may or may not coincide with the base peak — the tallest peak, arbitrarily set to 100% intensity, which is often a fragment instead), ¹H NMR (the n+1 splitting rule means the NUMBER OF PEAKS in a multiplet equals ONE MORE than the number of neighboring protons — a triplet indicates 2 neighbors, a quartet indicates 3 neighbors), and IR spectroscopy (a broad O–H absorption must be interpreted in combination with the rest of the spectrum, since both alcohols, 3200–3550 cm⁻¹, and carboxylic acids, 2500–3300 cm⁻¹ very broad, show O–H absorption, distinguished definitively by whether a C=O peak near 1710 cm⁻¹ is also present).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Reading a mass spectrum with peaks at m/z=29 (tallest, base peak), 43, 57, and 86, correctly identifying the molecular ion as the highest-m/z peak (86), not the tallest one (29).

**Representational**: An NMR multiplet diagram for ethanol's CH₂ group, showing 4 peaks (a quartet) directly corresponding to 3 neighboring protons (n+1=4 when n=3).

**Abstract**: The general n+1 rule (peaks = neighbors + 1) and the requirement to interpret IR peaks in combination (O–H alone is ambiguous between alcohol and carboxylic acid; adding the C=O check resolves it).

**Transfer**: Given an unfamiliar mass spectrum, NMR spectrum, or IR spectrum, correctly identifying the molecular ion (not the base peak), correctly counting neighboring protons from multiplet peak count, and correctly distinguishing alcohol from carboxylic acid using combined IR evidence.

## 3. Why Beginners Fail

Students assume the tallest peak in a mass spectrum (the base peak, by definition set to 100% intensity) must represent the intact molecule, missing that the molecular ion is instead identified by its position at the HIGHEST m/z value, which is very often a smaller, less intense peak than a stable fragment; they misread NMR multiplet peak counts as directly equal to the number of neighboring protons (reading a triplet as "3 neighbors"), rather than correctly applying the n+1 rule (a triplet's 3 peaks actually indicate 2 neighbors); and they identify any broad O–H absorption in an IR spectrum as automatically indicating an alcohol, without checking whether an accompanying carbonyl peak reveals the true functional group to be a carboxylic acid instead.

## 4. Misconception Library

### MC-1: The base peak in a mass spectrum is always the molecular ion
- **Probe**: "The mass spectrum shows peaks at m/z = 29 (base peak), 43, 57, and 86. Which is the molecular ion?"
- **Characteristic phrase**: "the tallest peak is the molecular mass."
- **Trigger (Type 5, instruction-induced)**: Students conflate "the most prominent/important-looking peak" with "the molecular ion," since the base peak's visual dominance (100% height) makes it feel like the natural candidate for representing the whole molecule.
- **Conflict evidence [P28]**: The MOLECULAR ION is specifically the peak at the HIGHEST m/z value (here, 86) — representing the intact, unfragmented molecule — while the base peak (tallest, set to 100%) is instead at m/z=29, a FRAGMENT of the original molecule that happens to form more abundantly during ionization; the molecular ion frequently isn't the tallest peak, and for compounds that fragment very readily, it may even be entirely absent from the spectrum.
- **Bridge [P30]**: Peak height (intensity) reflects how abundantly a particular ion forms during the ionization/fragmentation process, which is an entirely separate property from peak POSITION (m/z value) — the molecular ion is identified by its position (highest m/z, representing the full, unfragmented mass), not by its height.
- **Replacement [P31]**: Identify the molecular ion by finding the peak at the HIGHEST m/z value, regardless of that peak's height — never assume the tallest peak (base peak) is automatically the molecular ion.
- **Discrimination pairs [P33]**: m/z=29 (tallest, base peak, but a FRAGMENT) vs. m/z=86 (highest m/z, the actual molecular ion, despite not being the tallest peak).
- **S6 repair path**: Have the student scan the full spectrum for the highest m/z value first, entirely independent of peak height, before naming the molecular ion.

### MC-2: A triplet in ¹H NMR means the proton has three neighbours
- **Probe**: "Ethanol CH₃CH₂OH: the CH₂ group appears as a quartet. How many neighbours does CH₂ have?"
- **Characteristic phrase**: "triplet = 3 neighbours."
- **Trigger (Type 4, notation-induced)**: Students read the multiplet's peak count directly as the neighbor count, without applying the specific n+1 offset the splitting rule actually requires.
- **Conflict evidence [P28]**: The n+1 rule states that the NUMBER OF PEAKS in a multiplet equals ONE MORE than the number of neighboring protons (n) — so a triplet (3 peaks) indicates n=2 neighbors, and a quartet (4 peaks) indicates n=3 neighbors; in ethanol, the CH₂ group's only neighbor is the adjacent CH₃ group (3 protons), correctly producing a quartet (n+1 = 3+1 = 4 peaks), directly confirming the n+1 relationship rather than a naive peaks-equals-neighbors reading.
- **Bridge [P30]**: The splitting pattern arises from the neighboring protons' spins combining in n+1 distinguishable ways — the resulting peak count is inherently offset by one from the neighbor count, which is why the rule requires the "+1," not simply matching neighbor count to peak count directly.
- **Replacement [P31]**: Peak count = neighbors + 1, so neighbors = peak count − 1 — always subtract one from the observed multiplet peak count to find the true neighbor count.
- **Discrimination pairs [P33]**: A triplet (3 peaks, naive misreading: "3 neighbors," correct reading: 2 neighbors) vs. a quartet (4 peaks, naive misreading: "4 neighbors," correct reading: 3 neighbors, matching ethanol's CH₂-CH₃ relationship).
- **S6 repair path**: Explicitly work the ethanol CH₂ example, subtracting one from the observed quartet's 4 peaks to correctly arrive at 3 neighboring protons.

### MC-3: If the IR spectrum shows a broad O–H absorption, the compound must be an alcohol
- **Probe**: "A compound has a broad O–H absorption from 2500–3300 cm⁻¹, a strong C=O peak at 1710 cm⁻¹, and no C–O stretch. What is the functional group?"
- **Characteristic phrase**: "broad O–H = alcohol."
- **Trigger (Type 1, overgeneralization)**: Students learn "broad O–H absorption indicates an alcohol" from an early, simplified example and generalize this single-peak indicator without checking whether it's genuinely the ONLY diagnostic feature relevant, missing that a second functional group (carboxylic acid) also produces a broad O–H signal with a distinctly different frequency range and accompanying features.
- **Conflict evidence [P28]**: There are genuinely TWO distinct types of O–H absorption relevant here — alcohol O–H (3200–3550 cm⁻¹, narrow-to-moderately-broad) and carboxylic acid O–H (2500–3300 cm⁻¹, VERY broad, always accompanied by a strong C=O peak near 1710 cm⁻¹) — the given spectrum's specific combination (very broad O–H in the lower 2500-3300 range PLUS a strong C=O peak) definitively indicates a carboxylic acid, not a simple alcohol, and the given data explicitly notes NO C–O stretch (which would be expected for an alcohol's C–O single bond, further ruling out the alcohol interpretation).
- **Bridge [P30]**: A single IR absorption band, viewed in isolation, is frequently ambiguous between multiple functional groups — reliable functional-group identification requires interpreting each peak IN COMBINATION with the rest of the spectrum, since the accompanying peaks (like the C=O here) resolve ambiguities a single peak alone cannot.
- **Replacement [P31]**: A very broad O–H absorption specifically combined with a strong nearby C=O peak (~1710 cm⁻¹) indicates a carboxylic acid, not an alcohol — always cross-check the O–H band's exact range and any accompanying carbonyl peak before concluding the functional group.
- **Discrimination pairs [P33]**: Alcohol O–H alone (3200-3550 cm⁻¹, no accompanying C=O) vs. carboxylic acid O–H (2500-3300 cm⁻¹, very broad, WITH an accompanying C=O near 1710 cm⁻¹) — same general "O–H absorption" label, genuinely different functional group depending on range and combination.
- **S6 repair path**: Walk through the full given spectrum systematically, checking the O–H band's exact frequency range AND the presence/absence of an accompanying carbonyl peak before naming the functional group.

## 5. Explanation Library

**Primary explanation**: Mass spectrometry identifies the molecular ion by its POSITION at the highest m/z value (representing the intact molecule), which is a separate question from peak HEIGHT (the base peak, often a more abundant fragment). ¹H NMR splitting follows the n+1 rule — the observed number of peaks in a multiplet is always one more than the actual number of neighboring protons, requiring a subtract-one step to correctly determine neighbor count from peak count.

**Secondary explanation (combined-evidence IR framing)**: IR spectroscopy peaks are frequently ambiguous when read in isolation — a broad O–H absorption alone cannot definitively distinguish an alcohol from a carboxylic acid, since both produce broad O–H signals in overlapping but distinguishable ranges; correct identification requires cross-checking the O–H band's specific frequency range together with the presence or absence of an accompanying carbonyl (C=O) peak, since only carboxylic acids show both features together.

## 6. Analogy Library

- **Primary analogy**: A marathon's finish-line photo showing the most PHOTOGENIC runner (the base peak, tallest/most prominent) is a completely separate question from identifying who ran the LONGEST distance overall (the molecular ion, highest m/z) — popularity/prominence in the photo doesn't determine who covered the full course.
- **Breaking point**: The marathon analogy conveys the height-vs-position distinction for mass spectrometry well but doesn't naturally capture the NMR n+1 rule or the combined-IR-evidence requirement — those need the explicit splitting-pattern and multi-peak-correlation arguments.
- **Anti-analogy**: Do NOT say "the biggest peak tells you the molecular weight" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (molecular-ion-vs-base-peak identification drill)**: Present several mass spectra and have students identify the molecular ion (highest m/z) separately from the base peak (tallest), discovering they're frequently different peaks.
- **Demonstration 2 (n+1 rule application across multiple multiplets)**: Present several NMR multiplets (doublet, triplet, quartet, quintet) and have students apply the subtract-one rule consistently to determine neighbor counts for each.

## 8. Discovery Lesson

**Opening**: "In a mass spectrum, is the tallest peak always the one representing the complete, unfragmented molecule?"

**Exploration**: Students examine a spectrum with a clear base peak at low m/z and a smaller peak at high m/z, discovering the molecular ion is defined by position, not height.

**Synthesis**: Guide toward: molecular ion identification requires scanning for the highest m/z value specifically, independent of any peak's relative height.

**Closure**: "If a spectrum shows both a broad O–H peak and a C=O peak together, does that combination point to an alcohol or something else?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present a mass spectrum with the molecular ion clearly NOT being the base peak, working through the correct identification.
- **TA-2 (TELL)**: State the n+1 rule explicitly, worked through step by step for ethanol's CH₂ quartet.
- **TA-3 (DO)**: Student determines the functional group from a given IR spectrum showing combined O–H and C=O evidence.
- **TA-4 (TEST-THINKING)**: Present MC-1's mass-spectrum probe and ask the student to identify the molecular ion using position, not height.

## 10. Voice Teaching

Whenever a mass spectrum is discussed, narrate "molecular ion = highest m/z, not tallest peak" explicitly before naming any specific peak. Whenever an NMR multiplet is read, verbally subtract one from the peak count every time: "quartet, 4 peaks, minus 1, that's 3 neighbors."

## 11. Assessment

**Mastery gate**: Student can (a) correctly identify the molecular ion by highest m/z, independent of peak height, (b) correctly apply the n+1 rule to determine neighboring proton count from a multiplet's peak count, (c) correctly distinguish alcohol from carboxylic acid using combined O–H and C=O IR evidence.

- **FA-1**: "The mass spectrum shows peaks at m/z=29 (base peak), 43, 57, and 86. Which is the molecular ion?" — targets MC-1.
- **FA-2**: "Ethanol's CH₂ group appears as a quartet. How many neighbours does CH₂ have?" — targets MC-2.
- **FA-3**: "A compound has broad O–H (2500-3300 cm⁻¹), strong C=O at 1710 cm⁻¹, no C–O stretch. What's the functional group?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've just been introduced to multiplet naming without the n+1 subtraction step yet internalized.

**Delayed retrieval**: Re-probe MC-1's position-vs-height distinction before `chem.anal.spectroscopy` and `chem.carb.spectro` require fluent, correct spectral interpretation across all three techniques.

## 12. Recovery Notes

- **S3 (stuck)**: For the molecular-ion confusion, have the student list all peaks by m/z value in order, ignoring height entirely, before naming the molecular ion.
- **S4 (frustrated)**: Normalize — "tallest = most important" is a reasonable, common visual-reading intuition that genuinely doesn't apply to mass spectrometry's specific conventions.
- **S6 (collision)**: Use the explicit n+1 subtraction walkthrough for MC-2; use the systematic O–H-range-plus-carbonyl-check for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a broad O–H peak alone can't distinguish an alcohol from a carboxylic acid.

## 13. Memory & Review

Tag as three separate procedural-diagnostic memories (mass-spec position-vs-height; NMR n+1 rule; IR combined-evidence interpretation). Schedule a spaced check at ~1 week and again before `chem.anal.spectroscopy`/`chem.carb.spectro`.

## 14. Transfer Map

Feeds directly into `chem.anal.spectroscopy` (generalizes these three techniques into broader analytical chemistry practice) and `chem.carb.spectro` (applies spectroscopic identification specifically to carbonyl-containing compounds, directly building on MC-3's O–H/C=O combined-evidence reasoning).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
