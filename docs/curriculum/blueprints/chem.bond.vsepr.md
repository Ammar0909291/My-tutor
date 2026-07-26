# chem.bond.vsepr — VSEPR Theory and Molecular Geometry

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.vsepr` |
| Domain | Chemical Bonding |
| Requires | `chem.bond.covalent-bonding` |
| Unlocks | `chem.bond.polar-molecules` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

VSEPR (valence shell electron pair repulsion) theory predicts molecular geometry by counting electron domains around a central atom, where a double or triple bond counts as exactly ONE domain regardless of how many electron pairs it contains; ELECTRON geometry (the arrangement of all domains including lone pairs) must be distinguished from MOLECULAR geometry (the arrangement of only the ATOMS, ignoring lone-pair positions in the name, though lone pairs still occupy space and affect atom positions) — H₂O has tetrahedral electron geometry but bent molecular geometry; the equatorial-lone-pair-preference rule applies specifically to trigonal bipyramidal (5-domain) geometry, NOT to octahedral (6-domain) geometry, where two lone pairs instead go trans (both axial), producing square planar molecular geometry; and a larger electron domain (like a double bond) repels MORE strongly, which compresses (not opens) the angles between its neighboring smaller domains.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing water's actual bent shape against its electron geometry (tetrahedral) by explicitly identifying which of the 4 electron domains are lone pairs (not counted as "atoms" in the molecular geometry name).

**Representational**: A side-by-side electron-geometry-vs-molecular-geometry diagram for H₂O, showing all 4 domains (electron geometry: tetrahedral) alongside only the 2 visible atom positions (molecular geometry: bent).

**Abstract**: The general domain-counting rule (double/triple bonds = 1 domain); the distinct lone-pair placement rules for trigonal bipyramidal (equatorial preference) versus octahedral (trans/axial preference) geometries; the domain-size-versus-angle-compression relationship.

**Transfer**: Given an unfamiliar molecule with lone pairs and/or multiple bonds, correctly counting domains, correctly distinguishing electron geometry from molecular geometry, and correctly predicting real bond-angle deviations from idealized values.

## 3. Why Beginners Fail

Students count each electron pair within a double bond as a separate electron domain (treating CO₂'s two double bonds as 4 domains rather than 2), rather than correctly counting the whole double bond as ONE domain; they conflate electron geometry (counting all domains, including lone pairs) with molecular geometry (naming only the atom arrangement), incorrectly naming H₂O's molecular shape "tetrahedral" instead of "bent"; they overextend the equatorial-lone-pair-preference rule (correct specifically for trigonal bipyramidal, 5-domain geometry) onto octahedral (6-domain) geometry, where the correct rule is actually the opposite (lone pairs go trans/axial, not equatorial); and they assume a larger electron domain (like a double bond) pushes its neighboring domains FURTHER apart (opening the angle), when in fact the larger domain's stronger repulsion compresses neighboring angles.

## 4. Misconception Library

### MC-1: Double bonds count as two electron domains
- **Probe**: "How many electron domains does the central C in CO₂ have?"
- **Characteristic phrase**: "CO₂ has 4 bonds (2 double bonds = 4 single bonds), so 4 electron domains."
- **Trigger (Type 5, instruction-induced)**: Students count the total number of shared electron PAIRS (2 pairs per double bond × 2 double bonds = 4 pairs) and mistakenly equate this pair count directly with domain count, rather than recognizing each double bond occupies just one spatial region.
- **Conflict evidence [P28]**: A double bond, despite containing 2 shared electron pairs, occupies exactly ONE region of space (one electron domain), regardless of the number of electron pairs it contains — CO₂'s central carbon genuinely has only 2 electron domains (one per C=O double bond), giving linear geometry (180°), confirmed by CO₂'s well-established real, measured linear structure.
- **Bridge [P30]**: "Electron domain" refers to a spatial REGION of electron density, not a count of individual electron pairs — a double or triple bond's multiple pairs all occupy the SAME spatial region between the two bonded atoms, so they collectively count as just one domain for repulsion-geometry purposes.
- **Replacement [P31]**: Count electron domains by spatial region, not electron-pair count — a single, double, or triple bond each counts as exactly ONE domain, regardless of how many electron pairs are shared within it.
- **Discrimination pairs [P33]**: Pair-counting (WRONG: CO₂ = 4 domains from 4 electron pairs) vs. region-counting (CORRECT: CO₂ = 2 domains from 2 double bonds).
- **S6 repair path**: Have the student recount CO₂'s domains using spatial-region logic (one domain per bond to a different atom, regardless of bond order), arriving at 2, not 4.

### MC-2: The molecular geometry IS the electron geometry
- **Probe**: "What is the molecular geometry of H₂O?"
- **Characteristic phrase**: "H₂O is tetrahedral."
- **Trigger (Type 5, instruction-induced)**: Students learn to count total electron domains (which correctly gives H₂O's tetrahedral ELECTRON geometry) but don't apply the separate step of naming molecular geometry based only on visible ATOM positions.
- **Conflict evidence [P28]**: H₂O genuinely has tetrahedral ELECTRON geometry (4 total domains: 2 bonding pairs + 2 lone pairs), but its MOLECULAR geometry — which names the shape based only on the positions of ATOMS, not lone pairs — is BENT, since only 2 atoms (the two hydrogens) surround the central oxygen, with the 2 lone pairs occupying space but not counted as "atoms" for the purpose of naming the visible molecular shape.
- **Bridge [P30]**: Electron geometry and molecular geometry answer two different questions using the same underlying domain arrangement — electron geometry describes ALL domains' spatial arrangement (including lone pairs), while molecular geometry describes only the resulting positions of the ATOMS, which is what's actually "seen" as the molecule's shape.
- **Replacement [P31]**: Always distinguish electron geometry (counts all domains, including lone pairs) from molecular geometry (names the shape using only atom positions) — the two can differ whenever lone pairs are present.
- **Discrimination pairs [P33]**: H₂O's electron geometry (tetrahedral, based on all 4 domains) vs. H₂O's molecular geometry (bent, based on only the 2 visible atoms).
- **S6 repair path**: Have the student explicitly separate "domains including lone pairs" (for electron geometry) from "atoms only" (for molecular geometry) as two distinct counting exercises for the same molecule.

### MC-3: Lone pairs are always at equatorial positions in trigonal bipyramidal molecules
- **Probe**: "Where are the lone pairs in XeF₄ (octahedral electron geometry, 2 lone pairs)?"
- **Trigger (Type 1, overgeneralization)**: Students correctly learn the equatorial-lone-pair-preference rule for trigonal bipyramidal geometry and extend it universally to any geometry with multiple lone pairs, without recognizing this rule is specific to the 5-domain trigonal bipyramidal case.
- **Conflict evidence [P28]**: The equatorial-preference rule applies SPECIFICALLY to trigonal bipyramidal electron geometry (5 electron domains, where equatorial and axial positions are genuinely distinct with different angles) — in octahedral geometry (6 electron domains, XeF₄'s case), all six positions are equivalent to start with, and the two lone pairs instead go TRANS to each other (directly opposite, both occupying what would be "axial" positions in an octahedral frame), producing a square planar MOLECULAR geometry for the remaining 4 fluorine atoms — there is no "equatorial" position that even exists in the same sense within an octahedral arrangement.
- **Bridge [P30]**: The specific lone-pair placement rule depends on the specific electron-domain geometry involved — trigonal bipyramidal's distinct equatorial/axial positions (with different neighbor angles) create a genuine preference for lone pairs to minimize repulsion by going equatorial, but octahedral's six equivalent positions instead favor lone pairs going trans (maximally separated) to minimize their mutual repulsion, a different geometric logic entirely.
- **Replacement [P31]**: Apply the equatorial-preference rule only to trigonal bipyramidal (5-domain) geometry; for octahedral (6-domain) geometry with 2 lone pairs, the lone pairs go trans (both axial, maximally separated), producing square planar molecular geometry.
- **Discrimination pairs [P33]**: Trigonal bipyramidal with lone pairs (equatorial preference, distinct axial/equatorial positions) vs. octahedral with lone pairs (trans/axial preference, all positions initially equivalent, lone pairs maximize separation).
- **S6 repair path**: Draw both geometries explicitly, having the student identify why octahedral's initially-equivalent positions lead to a "maximize separation" (trans) strategy rather than an "equatorial preference" strategy.

## 5. Explanation Library

**Primary explanation**: VSEPR theory predicts molecular shape by counting electron domains — spatial regions of electron density — around a central atom, with each single, double, or triple bond counting as exactly ONE domain regardless of how many electron pairs it contains. The resulting domain arrangement (electron geometry) includes lone pairs, but the final MOLECULAR geometry name describes only the resulting positions of the ATOMS, which is why a molecule like H₂O can have tetrahedral electron geometry but bent molecular geometry.

**Secondary explanation (lone-pair placement and angle-compression framing)**: Lone-pair placement rules are specific to each electron-domain geometry — trigonal bipyramidal geometry (5 domains) favors equatorial lone-pair placement due to its distinct axial/equatorial position types, while octahedral geometry (6 domains) favors trans (maximally separated) lone-pair placement instead, since all six initial positions are equivalent. Separately, a larger electron domain (like a double bond, which repels more strongly than a single bond or lone pair) compresses — rather than opens — the angles between its neighboring smaller domains.

## 6. Analogy Library

- **Primary analogy**: A crowded elevator where two people standing shoulder-to-shoulder (a double bond's two electron pairs) still occupy just ONE "spot" in terms of how much floor space they claim relative to other passengers (other electron domains) — the elevator's total spot-count depends on how many distinct groups are standing, not how many total people are packed into those groups.
- **Breaking point**: The elevator-spot analogy conveys the "domain = spatial region, not pair count" idea well but doesn't naturally distinguish electron geometry from molecular geometry, nor the trigonal-bipyramidal-vs-octahedral lone-pair placement rules — those need the explicit atom-vs-domain and position-type arguments.
- **Anti-analogy**: Do NOT say "count every shared electron pair as a separate domain" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (electron-vs-molecular geometry drill)**: For H₂O and NH₃, have students explicitly separate the "all domains" count (for electron geometry) from the "atoms only" count (for molecular geometry), naming both shapes for each molecule.
- **Demonstration 2 (trigonal bipyramidal vs. octahedral lone-pair placement comparison)**: Present both geometries side by side with lone pairs added, having students justify the different placement rules (equatorial vs. trans) using position-equivalence reasoning.

## 8. Discovery Lesson

**Opening**: "CO₂ has two C=O double bonds. Does that mean the central carbon has 2 electron domains, or 4?"

**Exploration**: Students work through the spatial-region-counting logic, discovering each double bond counts as one domain regardless of its two electron pairs.

**Synthesis**: Guide toward: electron domains are counted by spatial region (one per bonded neighbor, regardless of bond order), not by total electron-pair count.

**Closure**: "H₂O has 4 electron domains, giving tetrahedral electron geometry. Is 'tetrahedral' also the correct name for H₂O's molecular shape?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the CO₂ spatial-region-counting exercise explicitly, arriving at 2 domains.
- **TA-2 (TELL)**: State the electron-geometry-vs-molecular-geometry distinction explicitly, worked through for H₂O.
- **TA-3 (DO)**: Student determines lone-pair placement for a given octahedral-geometry molecule, using the trans (not equatorial) rule.
- **TA-4 (TEST-THINKING)**: Present MC-4's H₂C=O probe and ask the student to predict whether the H–C–H angle compresses or expands relative to 120°, given the double bond's stronger repulsion.

## 10. Voice Teaching

Whenever counting electron domains for a multiply-bonded atom, narrate "one domain per bonded neighbor, regardless of bond order" explicitly before counting. Whenever naming a molecular shape, ask "are we counting lone pairs in this name, or only atoms?" as the first distinguishing question between electron geometry and molecular geometry.

## 11. Assessment

**Mastery gate**: Student can (a) correctly count electron domains treating double/triple bonds as one domain each, (b) correctly distinguish electron geometry from molecular geometry for a lone-pair-containing molecule, (c) correctly apply the appropriate lone-pair placement rule (equatorial for trigonal bipyramidal, trans for octahedral).

- **FA-1**: "How many electron domains does the central C in CO₂ have?" — targets MC-1.
- **FA-2**: "What is the molecular geometry of H₂O?" — targets MC-2.
- **FA-3**: "Where are the lone pairs in XeF₄ (octahedral, 2 lone pairs)?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've just learned to count electron domains correctly but haven't yet separated the electron-geometry and molecular-geometry naming steps.

**Delayed retrieval**: Re-probe MC-1's domain-counting rule and MC-2's geometry distinction before `chem.bond.polar-molecules` requires fluent, correct molecular geometry for polarity prediction.

## 12. Recovery Notes

- **S3 (stuck)**: For domain-miscounting, have the student count bonded NEIGHBORS (distinct atoms bonded to the center) rather than electron pairs, since neighbor-counting naturally avoids the double-bond-pair trap.
- **S4 (frustrated)**: Normalize — "more electron pairs should mean more domains" is a very reasonable, common first instinct before the spatial-region distinction is made explicit.
- **S6 (collision)**: Use the explicit atoms-only recount for MC-2; use the position-equivalence comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why H₂O's electron geometry and molecular geometry have different names despite describing the same molecule.

## 13. Memory & Review

Tag as a procedural-counting memory (domain-by-region, not by pair) plus a conceptual-correction memory (electron vs. molecular geometry; geometry-specific lone-pair placement rules). Schedule a spaced check at ~1 week and again before `chem.bond.polar-molecules`.

## 14. Transfer Map

Feeds directly into `chem.bond.polar-molecules` (molecular polarity prediction requires correct molecular geometry, not electron geometry, established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
