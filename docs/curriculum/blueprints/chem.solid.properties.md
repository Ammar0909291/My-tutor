# chem.solid.properties — Electrical and Magnetic Properties

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.solid.properties` |
| Domain | Solid State |
| Requires | `chem.solid.defects`, `chem.bond.metallic-bonding` |
| Unlocks | (none) |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Ionic solids do NOT conduct electricity in the solid state despite containing charged ions — conductivity requires MOBILE charges, and in a rigid solid lattice, ions are held fixed in position, unable to migrate in response to an applied field (only molten or dissolved ionic compounds, where ions become mobile, conduct); having the SAME crystal structure does NOT guarantee the same electrical behavior — diamond (band gap 5.5eV, insulator) and silicon (band gap 1.12eV, semiconductor) share the identical diamond-cubic structure, but their vastly different BAND GAPS (arising from differing bond strength/orbital overlap between C and Si) produce completely different conductivity — structure alone does not determine electrical properties without also specifying band gap; and NTC/PTC do NOT describe absolute levels of thermal or electrical conductivity — "NTC" (Negative Temperature Coefficient) and "PTC" (Positive Temperature Coefficient) describe the SIGN of a property's TEMPERATURE DEPENDENCE (typically resistance/conductivity) — NTC means resistance DECREASES as temperature increases (conductivity increases), PTC means resistance INCREASES as temperature increases (conductivity decreases) — never "not/poorly thermally conducting."

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing solid NaCl (rigid lattice, ions immobile, zero conductivity) against molten NaCl (ions freed to migrate, genuine conductivity), isolating physical state/ion mobility as the determining factor, not ion charge presence.

**Representational**: A side-by-side band-gap diagram for diamond (5.5eV gap, too wide for thermal excitation at room temperature) and silicon (1.12eV gap, bridgeable by thermal energy at 300K), both sharing the identical diamond-cubic crystal structure.

**Abstract**: The general principle that conductivity requires mobile (not merely present) charge carriers; the general principle that identical crystal structure does not guarantee identical electrical properties without specifying band gap; the general principle that NTC/PTC describe the SIGN of temperature-dependence of a property, not an absolute conductivity level.

**Transfer**: Given an unfamiliar ionic solid, correctly predicting zero conductivity in the solid state (regardless of ion charge) and genuine conductivity when molten/dissolved; given an unfamiliar pair of same-structure materials, correctly checking band gap before assuming identical conductivity; given an unfamiliar NTC/PTC-labeled material, correctly interpreting the label as describing temperature-dependence direction, not absolute conductivity level.

## 3. Why Beginners Fail

Students reason that since ions are inherently charged particles, any material containing ions must be able to conduct electricity, missing that conductivity specifically requires charge carriers to be MOBILE (able to migrate in response to an applied field) — in a rigid solid lattice, ions are held fixed at their lattice positions, unable to move, so solid ionic compounds like NaCl genuinely have zero conductivity despite containing charged species, and only become conductive when melted or dissolved, where the ions gain mobility; students see that diamond and silicon share the identical crystal structure (both diamond cubic, Group 14 covalent solids) and assume shared structure implies shared electrical behavior, missing that conductivity depends specifically on BAND GAP — a property that, despite the identical crystal geometry, differs enormously between diamond (5.5eV, too large to bridge thermally at room temperature) and silicon (1.12eV, bridgeable), due to differing bond strength and orbital overlap between carbon and silicon atoms; and students interpret the abbreviations "NTC" and "PTC" by guessing at plausible expansions based on the letters alone (e.g., "not thermally conducting," "poorly thermally conducting"), missing that these terms specifically describe the SIGN of a property's TEMPERATURE COEFFICIENT (how resistance/conductivity CHANGES as temperature changes), not an absolute statement about how well or poorly the material conducts heat or electricity in general.

## 4. Misconception Library

### MC-1: Ionic solids are electrical conductors because they contain charged ions
- **Probe**: "Why does solid NaCl not conduct electricity, while molten NaCl does?"
- **Characteristic phrase**: "ions carry charge, so ionic solids must conduct."
- **Trigger (Type 5, instruction-induced)**: The presence of charged ions is emphasized in ionic-bonding instruction without equal emphasis on the mobility requirement for conductivity.
- **Conflict evidence [P28]**: In the SOLID STATE, ions are rigidly held in fixed lattice positions — they cannot migrate in response to an applied electric field. Only free charges can carry current: in metals, electrons are free (mobile); in molten or dissolved ionic compounds, IONS are free to migrate. Solid NaCl has charged ions but they are immobile→zero conductivity. The physical state fundamentally changes the ions' mobility.
- **Bridge [P30]**: Electrical conductivity requires not merely the PRESENCE of charged particles but their MOBILITY — the ability to physically migrate through the material in response to an applied electric field; a rigid crystal lattice structurally prevents this migration by holding each ion at a fixed position, so the mere fact of ionic charge is insufficient — the physical state (solid vs. molten/dissolved) is what actually determines whether conduction can occur.
- **Replacement [P31]**: Conductivity requires MOBILE charge carriers, not merely charged particles — solid ionic compounds have immobile ions (zero conductivity); molten or dissolved ionic compounds have mobile ions (genuine conductivity).
- **Discrimination pairs [P33]**: Solid NaCl (ions present but immobile, zero conductivity) vs. molten NaCl (same ions, now mobile, genuine conductivity) — identical chemical species, opposite conductivity, differing only in physical state/mobility.
- **S6 repair path**: Present the explicit solid-vs-molten NaCl comparison, isolating ion mobility (not ion presence) as the determining factor.

### MC-2: Diamond must be a semiconductor because silicon (also Group 14, covalent) is a semiconductor
- **Probe**: "Diamond and silicon have the same structure. Why is diamond an electrical insulator while silicon is a semiconductor?"
- **Characteristic phrase**: "same structure = same conductivity."
- **Trigger (Type 2, perceptual intuition)**: Structural similarity is intuitively assumed to predict similar properties in general.
- **Conflict evidence [P28]**: BAND GAP determines conductivity. Diamond: 5.5eV (too large for visible photons or thermal energy at room temperature to bridge→insulator). Silicon: 1.12eV (thermal energy at 300K≈0.026eV — enough electrons are excited across the gap for measurable conductivity→semiconductor). Same structure (diamond cubic); vastly different band gap due to C vs. Si bond strength and orbital overlap; completely different electrical behaviour.
- **Bridge [P30]**: Crystal STRUCTURE (the geometric arrangement of atoms) and electrical PROPERTIES (governed by the electronic band structure, specifically band gap) are related but genuinely distinct aspects of a material — two materials can share identical structural geometry while having very different electronic band gaps, because band gap magnitude depends on the specific atomic orbitals and bond strengths involved (carbon's small, tightly-bound orbitals vs. silicon's larger, more diffuse orbitals), not merely on the geometric pattern of atomic positions.
- **Replacement [P31]**: Always check band gap specifically, never infer conductivity from crystal structure alone — identical structure does not guarantee identical electrical behavior.
- **Discrimination pairs [P33]**: Diamond (diamond-cubic structure, 5.5eV band gap, insulator) vs. silicon (identical diamond-cubic structure, 1.12eV band gap, semiconductor) — same geometry, different band gap, opposite electrical classification.
- **S6 repair path**: Present the explicit band-gap comparison diagram, isolating band gap (not structure) as the conductivity-determining factor.

### MC-3: NTC means 'not thermally conducting' and PTC means 'poorly thermally conducting'
- **Probe**: "What do the T and C stand for in NTC and PTC, and what property do they describe?"
- **Characteristic phrase**: "NTC = not thermally conducting."
- **Trigger (Type 3, language contamination)**: The unfamiliar abbreviations "NTC"/"PTC" invite plausible-sounding but incorrect guessed expansions based on surface letter matching.
- **Conflict evidence [P28]**: NTC=Negative Temperature Coefficient and PTC=Positive Temperature Coefficient. The "T" is TEMPERATURE and the "C" is COEFFICIENT. They describe the sign of the TEMPERATURE DEPENDENCE of a PROPERTY (usually electrical resistance or electrical conductivity). NTC: resistance DECREASES as temperature increases (conductivity increases). PTC: resistance INCREASES as temperature increases (conductivity decreases). They are about how a property CHANGES WITH TEMPERATURE, not about the absolute level of thermal or electrical conductivity.
- **Bridge [P30]**: "NTC" and "PTC" are technical abbreviations with precise, specific meanings (Negative/Positive Temperature Coefficient) that describe the DIRECTION of change in a property (typically electrical resistance) as temperature varies — this is fundamentally different from describing the ABSOLUTE magnitude of thermal or electrical conductivity, and guessing plausible-sounding expansions from the letters alone (rather than learning the actual technical definition) leads directly to this category confusion.
- **Replacement [P31]**: NTC/PTC describe the sign (negative/positive) of a property's temperature coefficient (typically resistance's dependence on temperature) — never interpret them as absolute statements about "how well" something conducts.
- **Discrimination pairs [P33]**: NTC material (resistance decreases with rising temperature) vs. PTC material (resistance increases with rising temperature) — both descriptions of temperature-dependence direction, neither describing absolute conductivity level.
- **S6 repair path**: Present the explicit resistance-vs-temperature graphs for both NTC and PTC materials, isolating the slope direction as the defining feature.

## 5. Explanation Library

**Primary explanation**: Electrical conductivity requires mobile charge carriers, not merely the presence of charged species — solid ionic compounds have immobile, lattice-fixed ions (zero conductivity), while molten or dissolved ionic compounds have mobile ions (genuine conductivity), the physical state being the determining factor. Identical crystal structure does not guarantee identical electrical behavior — diamond and silicon share the same diamond-cubic structure but differ enormously in band gap (5.5eV vs. 1.12eV), producing opposite electrical classifications (insulator vs. semiconductor).

**Secondary explanation (NTC/PTC terminology)**: "NTC" and "PTC" are precise technical abbreviations (Negative/Positive Temperature Coefficient) describing the direction of a property's (typically resistance's) dependence on temperature, never an absolute statement about conductivity magnitude — NTC materials become more conductive as temperature rises, PTC materials become less conductive.

## 6. Analogy Library

- **Primary analogy**: A parking lot full of cars (ions) with their parking brakes locked (rigid lattice, immobile) vs. the same cars with brakes released and engines running (molten/dissolved, mobile) — the cars (charge) are present in both scenarios, but only the mobile scenario can generate "traffic flow" (current).
- **Breaking point**: The parking-lot analogy conveys the mobility-requirement concept well but doesn't naturally capture the band-gap-vs-structure distinction (MC-2) or the NTC/PTC terminology (MC-3) — those need the explicit band-gap diagram and the resistance-vs-temperature graphs.
- **Anti-analogy**: Do NOT say "same structure means same properties" as a general rule — this directly reinforces MC-2 by ignoring band gap's independent role.

## 7. Demonstration Library

- **Demonstration 1 (solid-vs-molten NaCl conductivity comparison)**: Present both states explicitly, isolating ion mobility (not ion presence) as the conductivity-determining factor.
- **Demonstration 2 (diamond-vs-silicon band-gap diagram)**: Present both band gaps explicitly alongside the shared crystal structure, deriving the opposite electrical classification.
- **Demonstration 3 (NTC/PTC resistance-vs-temperature graphs)**: Present both graphs explicitly, isolating slope direction as the defining feature of each term.

## 8. Discovery Lesson

**Opening**: "Solid NaCl contains charged Na⁺ and Cl⁻ ions. Does it conduct electricity?"

**Exploration**: Students compare solid and molten NaCl conductivity, discovering ion mobility (not mere presence) is required.

**Synthesis**: Guide toward: conductivity requires mobile charge carriers — physical state determines whether ions can migrate.

**Closure**: "Do diamond and silicon, sharing the same crystal structure, have the same electrical properties?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit solid-vs-molten NaCl conductivity comparison.
- **TA-2 (TELL)**: State the band-gap-determines-conductivity principle explicitly, anchored to the diamond-vs-silicon comparison.
- **TA-3 (DO)**: Student interprets an unfamiliar NTC/PTC-labeled material's resistance-vs-temperature behavior correctly.
- **TA-4 (TEST-THINKING)**: Present the "same structure, different conductivity" probe and ask the student to justify the difference from band gap.

## 10. Voice Teaching

Whenever ionic-solid conductivity is discussed, narrate "check mobility, not just ion presence." Whenever comparing same-structure materials, state "band gap, not structure alone, determines conductivity" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain why solid ionic compounds don't conduct while molten ones do, (b) correctly attribute diamond-vs-silicon conductivity difference to band gap, not structure, (c) correctly interpret NTC/PTC as temperature-coefficient sign, not absolute conductivity.

- **FA-1**: "Why does solid NaCl not conduct electricity, while molten NaCl does?" — targets MC-1.
- **FA-2**: "Diamond and silicon have the same structure. Why is diamond an electrical insulator while silicon is a semiconductor?" — targets MC-2.
- **FA-3**: "What do the T and C stand for in NTC and PTC, and what property do they describe?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered ionic bonding's charge emphasis without exposure to the mobility requirement.

**Delayed retrieval**: Re-probe MC-1's mobility requirement and MC-2's band-gap-vs-structure distinction as foundational knowledge for subsequent semiconductor and materials-engineering applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the ionic-conductivity confusion, have the student explicitly check ion mobility (not just charge presence) before predicting conductivity.
- **S4 (frustrated)**: Normalize — assuming charged particles automatically conduct is genuinely common on first exposure, since ionic bonding instruction emphasizes charge heavily.
- **S6 (collision)**: Use the explicit band-gap diagram for MC-2; use the resistance-vs-temperature graphs for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why diamond and silicon have such different conductivity despite identical structure.

## 13. Memory & Review

Tag as three conceptual-correction memories (mobility requirement for conductivity; band-gap-vs-structure distinction; NTC/PTC as temperature-coefficient sign). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates defect and metallic-bonding reasoning built across `chem.solid.defects` and `chem.bond.metallic-bonding`, forming a capstone application to semiconductor and materials-science contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
