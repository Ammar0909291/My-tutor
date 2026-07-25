# chem.bond.ionic-bonding — Ionic Bonding

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.ionic-bonding` |
| Domain | Chemical Bonding |
| Requires | `chem.period.ionization-energy`, `chem.period.electron-affinity` |
| Unlocks | `chem.solid.crystal-systems`, `chem.solid.ionic-solids` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Ionic bonding forms an extended 3D crystal lattice of alternating cations and anions (not a discrete molecule with one privileged ion pair), held together by lattice energy — the total electrostatic attraction summed across the entire lattice, which scales strongly with ionic charge (e.g., MgO's +2/−2 ions give roughly 4× the lattice energy per formula unit compared to NaCl's +1/−1 ions, directly explaining MgO's much higher melting point) — and ionic compounds only conduct electricity when their ions become MOBILE (molten or dissolved in solution), not in the rigid solid state where ions are fixed in place, despite the compound genuinely containing charged particles throughout.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A 3D ball-and-stick or space-filling model of the NaCl rock-salt structure, showing each Na⁺ surrounded by exactly 6 Cl⁻ neighbors (and vice versa), with no single "the" Na–Cl bond identifiable.

**Representational**: A side-by-side comparison of the chemical formula "NaCl" (simplest ratio) against the actual crystal structure (a repeating 6:6 coordination lattice extending in all directions).

**Abstract**: Lattice energy as the sum of electrostatic interactions across the whole 3D array, scaling with the product of ionic charges (Coulomb's law), explaining why higher-charge ion pairs (Mg²⁺/O²⁻) produce dramatically higher lattice energies and melting points than lower-charge pairs (Na⁺/Cl⁻).

**Transfer**: Given an unfamiliar ionic compound's formula and ion charges, correctly predicting its relative melting point compared to a known reference compound, and correctly reasoning about whether it would conduct electricity in solid, molten, and dissolved states.

## 3. Why Beginners Fail

Students picture ionic compounds as discrete molecules with one specific bonded ion pair (like a covalent molecule), rather than as an extended 3D crystal lattice where every ion is surrounded by multiple oppositely-charged neighbors with no privileged single bond; they assume melting point reflects the strength of "the ionic bond" as if it were a single pairwise interaction, missing that it actually reflects the TOTAL lattice energy summed across the entire 3D structure, which scales strongly with ionic charge; and they overgeneralize "ionic compounds contain charged particles, so they must conduct electricity" onto the solid state, missing that conductivity requires those charged particles to be mobile, which they are not while locked into a rigid crystal lattice.

## 4. Misconception Library

### MC-1: NaCl is a molecule with one Na–Cl bond
- **Probe**: "Draw the structure of sodium chloride."
- **Characteristic phrase**: "the ionic bond between Na and Cl."
- **Trigger (Type 5, instruction-induced)**: Students are accustomed to drawing discrete molecular structures for covalent compounds (a specific, countable set of bonds) and default to the same mental model for ionic compounds, picturing one privileged Na–Cl pair.
- **Conflict evidence [P28]**: The real structure of solid NaCl is an extended 3D crystal lattice (the rock-salt structure) where each Na⁺ ion is surrounded by exactly 6 Cl⁻ neighbors, and each Cl⁻ is surrounded by exactly 6 Na⁺ neighbors (6:6 coordination) — there is no single, privileged Na–Cl pair that can be pointed to as "the" bond; every ion interacts electrostatically with all its neighbors simultaneously.
- **Bridge [P30]**: "NaCl" as a chemical formula describes the simplest whole-number RATIO of ions in the compound (1:1), not a literal count of discrete molecules — the actual physical structure is a continuous, repeating 3D array, fundamentally different from a discrete covalent molecule.
- **Replacement [P31]**: Ionic compounds form extended crystal lattices with each ion surrounded by multiple oppositely-charged neighbors (coordination number depends on the specific structure), not discrete molecules with one bonded pair.
- **Discrimination pairs [P33]**: A covalent molecule like H₂O (discrete, countable bonds, a specific molecular structure) vs. NaCl (extended lattice, no discrete molecular unit, only a formula-unit ratio).
- **S6 repair path**: Show the full 3D rock-salt lattice structure directly, having the student count the actual number of nearest neighbors around a single Na⁺ ion.

### MC-2: Ionic compounds have high melting points because the bond between the two ions is very strong
- **Probe**: "Why does MgO have a much higher mp than NaCl if both are 'ionic bonds'?"
- **Trigger (Type 2, perceptual intuition)**: Students transfer the covalent-bond-strength intuition (one strong bond = high melting point) onto ionic compounds, picturing "the ionic bond" as a single pairwise interaction whose strength alone determines melting point.
- **Conflict evidence [P28]**: Melting point actually reflects the TOTAL lattice energy — the sum of ALL electrostatic interactions throughout the entire 3D crystal array, not a single pairwise bond strength; MgO's ions carry +2/−2 charges compared to NaCl's +1/−1, and since electrostatic attraction scales with the PRODUCT of the charges (Coulomb's law), MgO's lattice energy per formula unit is roughly 4 times larger than NaCl's, directly explaining MgO's dramatically higher melting point (~2852°C vs. 801°C for NaCl).
- **Bridge [P30]**: There is no single "the ionic bond" whose strength alone can be compared between compounds — what varies between compounds is the total lattice energy, which depends on ion charge (strongly, via Coulomb's law) and ion size (more weakly), summed across the whole crystal, not a single bond's strength.
- **Replacement [P31]**: Ionic compound melting points reflect total lattice energy, which scales strongly with the product of the ions' charges — higher-charge ion pairs (like Mg²⁺/O²⁻) produce dramatically stronger lattices and higher melting points than lower-charge pairs (like Na⁺/Cl⁻).
- **Discrimination pairs [P33]**: NaCl (+1/−1 charges, lattice energy X, mp 801°C) vs. MgO (+2/−2 charges, lattice energy ≈4X, mp 2852°C) — same basic bonding type, vastly different lattice energy from charge alone.
- **S6 repair path**: Compute or present the Coulomb's-law charge-product comparison (1×1=1 for NaCl vs. 2×2=4 for MgO) directly connecting to the ~4× lattice energy ratio.

### MC-3: Ionic compounds always conduct electricity
- **Probe**: "Does solid NaCl conduct electricity?"
- **Characteristic phrase**: "ionic compounds have charged particles so they must conduct."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn ionic compounds contain charged particles (ions) and directly (but incorrectly) generalize this to mean conduction must always occur, missing the additional requirement that those charges be mobile.
- **Conflict evidence [P28]**: Solid NaCl does NOT conduct electricity, despite genuinely containing Na⁺ and Cl⁻ ions throughout its structure — in the solid state, these ions are locked into fixed positions within the rigid crystal lattice and cannot move to carry current; only upon melting (freeing the ions to move within the liquid) or dissolving in water (freeing the ions to move within solution) does NaCl become conductive.
- **Bridge [P30]**: Electrical conductivity requires charged particles that can physically MOVE in response to an applied field, not merely the presence of charge — a solid ionic lattice has plenty of charge but zero charge mobility, which is exactly why it fails to conduct despite being "full of ions."
- **Replacement [P31]**: Ionic compounds conduct electricity only when their ions are mobile — molten (liquid) or dissolved in solution — never in the rigid solid state, regardless of how many charged particles are present.
- **Discrimination pairs [P33]**: Solid NaCl (ions present but fixed, does NOT conduct) vs. molten or dissolved NaCl (ions present and mobile, DOES conduct).
- **S6 repair path**: Ask directly, "can the ions in solid NaCl actually move anywhere?" — the answer (no, they're locked in the lattice) directly motivates the mobility requirement.

## 5. Explanation Library

**Primary explanation**: Ionic bonding produces an extended 3D crystal lattice, not discrete molecules — cations and anions arrange themselves in a repeating pattern (like NaCl's 6:6 coordination rock-salt structure) held together by electrostatic attraction summed across the entire lattice, called lattice energy. This lattice energy scales strongly with the product of the ions' charges (per Coulomb's law), which is why higher-charge ion pairs produce dramatically stronger lattices, reflected in much higher melting points.

**Secondary explanation (conductivity framing)**: Despite containing charged ions throughout, ionic compounds only conduct electricity when those ions are free to move — molten or dissolved in solution — because conductivity fundamentally requires mobile charge carriers, and a rigid solid lattice locks ions in fixed positions, preventing any net charge movement despite the charge itself being genuinely present.

## 6. Analogy Library

- **Primary analogy**: A parking garage fully packed with cars arranged in a perfectly ordered grid (the ionic lattice) — the cars (ions) are genuinely there and genuinely have engines (charge), but nobody can drive anywhere while every space is filled and cars are locked bumper-to-bumper (solid state, no mobility); only once the garage empties out enough (melting) or the cars are released onto an open road (dissolving) can they actually move and "carry traffic" (current).
- **Breaking point**: The parking-garage analogy conveys the mobility requirement for conductivity well, but doesn't naturally capture the charge-squared scaling of lattice energy — that needs the explicit Coulomb's-law charge-product argument.
- **Anti-analogy**: Do NOT say "NaCl has one strong ionic bond holding it together" — this directly reinforces MC-1 and MC-2 together.

## 7. Demonstration Library

- **Demonstration 1 (lattice structure model)**: Present or build a 3D model of the NaCl rock-salt structure, having students count the actual number of nearest-neighbor ions around a central Na⁺, discovering the 6:6 coordination directly.
- **Demonstration 2 (charge-product melting-point comparison)**: Build a table comparing NaCl (+1/−1, mp 801°C) and MgO (+2/−2, mp 2852°C), having students compute the Coulomb's-law charge product for each and connect it to the observed lattice-energy/melting-point ratio.

## 8. Discovery Lesson

**Opening**: "When you write 'NaCl,' does that mean there's literally one sodium atom bonded to one chlorine atom, like a molecule?"

**Exploration**: Students examine the actual 3D crystal structure and count coordination numbers, discovering there's no single privileged Na–Cl pair anywhere in the lattice.

**Synthesis**: Guide toward: "NaCl" is a formula-unit ratio, not a molecular formula — the real structure is a continuous, repeating 3D array of alternating ions.

**Closure**: "Given that solid NaCl is packed full of Na⁺ and Cl⁻ ions, why doesn't it conduct electricity?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the 3D rock-salt lattice structure directly, with coordination numbers explicitly counted.
- **TA-2 (TELL)**: State the lattice-energy-scales-with-charge-product rule explicitly, worked through for the NaCl-vs-MgO comparison.
- **TA-3 (DO)**: Student predicts the relative melting point of a new ionic compound pair using charge-product reasoning.
- **TA-4 (TEST-THINKING)**: Present MC-3's probe and ask the student to explain, using the mobility requirement, why solid NaCl fails to conduct despite containing ions.

## 10. Voice Teaching

Whenever an ionic compound's formula is written, immediately clarify "this is a ratio, not a molecule" before any structural discussion, to preempt MC-1 directly. Whenever conductivity is discussed for an ionic compound, always ask "solid, molten, or dissolved?" as the very first question, since the answer depends entirely on ion mobility, not merely on ion presence.

## 11. Assessment

**Mastery gate**: Student can (a) correctly describe ionic compounds as extended lattices, not discrete molecules, (b) correctly predict relative melting points using the charge-product/lattice-energy relationship, (c) correctly predict conductivity based on physical state (solid vs. molten/dissolved).

- **FA-1**: "Draw the structure of sodium chloride." — targets MC-1.
- **FA-2**: "Why does MgO have a much higher melting point than NaCl?" — targets MC-2.
- **FA-3**: "Does solid NaCl conduct electricity? Why or why not?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students who've just learned "ionic compounds contain charged particles" without the mobility caveat emphasized.

**Delayed retrieval**: Re-probe MC-1's lattice structure and MC-2's charge-product reasoning before `chem.solid.ionic-solids` develops Born-Haber cycles and lattice-energy calculations in full quantitative detail.

## 12. Recovery Notes

- **S3 (stuck)**: For the molecular-picture confusion, return directly to the 3D lattice model and have the student physically point to (or attempt to point to) "the one bond," discovering there isn't one.
- **S4 (frustrated)**: Normalize — the transfer from covalent-molecule thinking is genuinely natural, given how much earlier bonding instruction focuses on discrete molecular structures.
- **S6 (collision)**: Use the Coulomb's-law charge-product comparison for MC-2; use the "can the ions move?" question for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why melting point reflects total lattice energy rather than a single bond's strength.

## 13. Memory & Review

Tag as a structural-conceptual memory (extended lattice, not molecule) plus a quantitative-relational memory (charge-product scaling of lattice energy) plus a conceptual-correction memory (mobility requirement for conductivity). Schedule a spaced check at ~1 week and again before `chem.solid.ionic-solids`.

## 14. Transfer Map

Feeds directly into `chem.solid.crystal-systems` (lattice geometry and coordination numbers extend this concept's structural foundation) and `chem.solid.ionic-solids` (Born-Haber cycles and quantitative lattice-energy calculations build directly on the charge-product reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
