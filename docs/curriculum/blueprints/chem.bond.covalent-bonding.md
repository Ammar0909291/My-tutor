# chem.bond.covalent-bonding — Covalent Bonding

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.covalent-bonding` |
| Domain | Chemical Bonding |
| Requires | `chem.period.electron-affinity` |
| Unlocks | `chem.bond.bond-parameters`, `chem.bond.coordinate-bond`, `chem.bond.hybridization`, `chem.bond.resonance`, `chem.bond.vsepr`, `chem.org.iupac` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Covalent bonds form when atoms share electron pairs (represented in Lewis structures), classified by bond order (single, double, triple, with bond length decreasing and bond energy increasing as order rises) and by polarity (polar bonds have unequal electron sharing due to electronegativity difference; non-polar bonds share equally) — molecular polarity requires BOTH polar bonds AND a molecular geometry that doesn't cause the individual bond dipoles to cancel (a molecule with polar bonds can still be net non-polar if symmetric), melting a molecular covalent compound breaks weak intermolecular forces between molecules, never the strong covalent bonds within them (network covalent solids like diamond are the genuine high-melting-point exception, since every bond throughout the entire structure is covalent), and the octet rule generally holds but coordinate (dative) covalent bonds — where one atom contributes both electrons to the shared pair — are a real, common exception to "each atom contributes one electron."

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Melting ice at 0°C despite the O–H covalent bond having a bond energy of 459 kJ/mol — a direct puzzle motivating the intramolecular/intermolecular distinction.

**Representational**: Vector diagrams of individual bond dipoles in CO₂ (pointing in exactly opposite directions, canceling to zero net dipole) versus H₂O (bent geometry, dipoles reinforcing to a nonzero net dipole).

**Abstract**: Molecular polarity = vector sum of individual bond dipoles, requiring both bond polarity and asymmetric geometry; melting point of molecular covalent compounds reflects intermolecular force strength, not covalent bond strength.

**Transfer**: Given an unfamiliar molecule's Lewis structure and geometry, correctly predicting whether it is polar or non-polar overall, and correctly predicting whether an unfamiliar covalent solid's melting point reflects intermolecular forces or a covalent network.

## 3. Why Beginners Fail

Students overgeneralize "polar bonds → polar molecule" from simple diatomic examples (like HCl) onto polyatomic molecules, missing that molecular geometry can cause individual bond dipoles to cancel even when every bond itself is polar; they assume covalent compounds must have high melting points because covalent bonds themselves are strong, missing the crucial distinction between breaking intramolecular covalent bonds (which melting a molecular solid does NOT do) and breaking weaker intermolecular forces (which melting actually does); and they assume every covalent bond forms by each atom contributing exactly one electron to the shared pair, missing the coordinate (dative) covalent bond exception where one atom contributes both electrons.

## 4. Misconception Library

### MC-1: Molecular polarity always follows bond polarity
- **Probe**: "CO₂ has two polar C=O bonds. Is the CO₂ molecule polar? Explain."
- **Characteristic phrase**: "CO₂ is a polar molecule because it contains polar C=O bonds."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn simple diatomic examples like H–Cl (one bond, polar bond directly equals polar molecule) and extend this equivalence to any molecule containing polar bonds, regardless of geometry.
- **Conflict evidence [P28]**: CO₂ is linear, with its two C=O double bonds collinear, pointing in exactly opposite directions; the two bond dipoles, being equal in magnitude and opposite in direction, exactly cancel, giving a net dipole of zero and making CO₂ genuinely non-polar overall, despite each individual C=O bond being polar.
- **Bridge [P30]**: Bond polarity (a property of one bond) and molecular polarity (the vector sum of ALL bond dipoles, accounting for geometry) are related but distinct — a molecule needs both polar bonds AND a geometry that prevents cancellation to be polar overall.
- **Replacement [P31]**: To determine molecular polarity, draw dipole vectors from each bond (pointing toward the more electronegative atom) and sum them as vectors — if the sum is zero, the molecule is non-polar regardless of individual bond polarity.
- **Discrimination pairs [P33]**: CO₂ (linear, dipoles cancel, non-polar molecule despite polar bonds) vs. H₂O (bent, dipoles reinforce, polar molecule).
- **S6 repair path**: Draw the CO₂ dipole vectors explicitly and have the student verify they sum to zero given the linear geometry.

### MC-2: Covalent compounds have high melting points because covalent bonds are strong
- **Probe**: "Why does ice melt at 0°C if the O–H bond has a bond energy of 459 kJ/mol?"
- **Characteristic phrase**: "Covalent compounds are hard to melt because covalent bonds are so strong."
- **Trigger (Type 5, instruction-induced)**: Students correctly learn covalent bonds are strong and directly (but incorrectly) predict this strength must translate into a high melting point, without distinguishing intramolecular bonds from intermolecular forces.
- **Conflict evidence [P28]**: Melting a molecular covalent compound like ice does NOT break the covalent O–H bonds (459 kJ/mol) at all — it breaks the much weaker intermolecular hydrogen bonds holding separate water molecules together (≈20 kJ/mol), which is why ice has a low melting point despite its strong internal covalent bonds; covalent NETWORK solids like diamond or SiO₂, by contrast, genuinely do have high melting points, because in those structures every single bond throughout the entire solid is covalent — there is no separate weaker intermolecular force to break instead.
- **Bridge [P30]**: "Covalent bonds are strong" is true, but melting a substance only requires breaking whatever holds its distinct particles apart — for molecular covalent compounds, that's weak intermolecular forces between whole molecules, not the strong covalent bonds within each molecule.
- **Replacement [P31]**: Melting point of a molecular covalent compound reflects intermolecular force strength, not covalent bond strength; only covalent network solids (where the whole structure is one covalently-bonded network) have melting points that reflect covalent bond strength.
- **Discrimination pairs [P33]**: Ice (molecular covalent, weak intermolecular H-bonds broken on melting, low mp) vs. diamond (covalent network, strong covalent bonds throughout, extremely high mp).
- **S6 repair path**: Present the O–H bond energy (459 kJ/mol) alongside the much smaller hydrogen-bond energy (~20 kJ/mol) side by side, connecting the small number to what actually breaks during melting.

### MC-3: All covalent bonds involve each atom contributing one electron
- **Probe**: "In the ammonium ion NH₄⁺, how is the fourth N–H bond different from the other three?"
- **Characteristic phrase**: "All four N–H bonds in NH₄⁺ are formed by N and H each contributing one electron."
- **Trigger (Type 5, instruction-induced)**: Students learn "each atom contributes one electron to a shared pair" as the general covalent-bonding rule and aren't yet shown the coordinate (dative) bond exception.
- **Conflict evidence [P28]**: The fourth N–H bond in NH₄⁺ is a COORDINATE (dative) covalent bond — nitrogen contributes BOTH electrons from its lone pair to bond with H⁺ (which, being a bare proton, has no electrons of its own to contribute); once formed, this coordinate bond is experimentally indistinguishable from the other three ordinary N–H bonds in terms of bond length and bond energy.
- **Bridge [P30]**: The electron-contribution SOURCE (both from one atom, versus one from each) differs for coordinate bonds, but the resulting bond itself — once formed — behaves identically to any other covalent bond of the same type; the exception is about bond FORMATION, not the final bond's properties.
- **Replacement [P31]**: Most covalent bonds form with each atom contributing one electron, but coordinate (dative) covalent bonds — where one atom donates both electrons to an atom or ion with an empty orbital — are a real, common exception, indistinguishable from ordinary bonds once formed.
- **Discrimination pairs [P33]**: An ordinary N–H bond (each atom contributes one electron) vs. the fourth N–H bond in NH₄⁺ (nitrogen contributes both electrons to bond with H⁺) — same final bond type, different formation mechanism.
- **S6 repair path**: Walk through NH₄⁺'s formation step by step, showing NH₃'s lone pair being donated entirely to the incoming H⁺, which has no electrons of its own.

## 5. Explanation Library

**Primary explanation**: A covalent bond forms when two atoms share a pair of electrons, represented in Lewis structures. Bond order (single, double, triple) reflects how many electron pairs are shared, with bond length decreasing and bond energy increasing as order rises. Whether a bond is polar depends on the electronegativity difference between the bonded atoms — but whether the whole MOLECULE is polar depends additionally on geometry, since individual bond dipoles are vectors that can reinforce or cancel depending on molecular shape.

**Secondary explanation (melting-point and coordinate-bond framing)**: Melting a molecular covalent compound breaks only the weak intermolecular forces between separate molecules, never the strong covalent bonds within each molecule — covalent network solids (where the entire structure is one continuous covalent framework) are the genuine exception with high melting points. Most covalent bonds form from one electron contributed by each atom, but coordinate (dative) bonds — where one atom donates both electrons — are a real exception that produces an indistinguishable final bond.

## 6. Analogy Library

- **Primary analogy**: Two people pulling in opposite directions on a rope with exactly equal force (like CO₂'s two opposing C=O dipoles) — even though each person is genuinely pulling hard (each bond is genuinely polar), the rope (the whole molecule) doesn't move net in either direction.
- **Breaking point**: The tug-of-war analogy conveys vector cancellation well but doesn't naturally capture the intramolecular-vs-intermolecular melting-point distinction — that needs the explicit bond-energy-number comparison.
- **Anti-analogy**: Do NOT say "if a molecule has polar bonds, it's a polar molecule" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (dipole vector-sum drill)**: Present several molecules (CO₂, H₂O, CCl₄, CHCl₃) and have students draw dipole vectors and sum them to determine overall polarity, discovering which ones cancel and which don't.
- **Demonstration 2 (bond-energy comparison table)**: Build a table comparing covalent bond energies (O–H: 459 kJ/mol) against intermolecular force energies (hydrogen bonds: ~20 kJ/mol; London dispersion: even weaker) to make the melting-point mechanism concrete.

## 8. Discovery Lesson

**Opening**: "Water's O–H bond is one of the strongest common covalent bonds, at 459 kJ/mol. So why does ice melt at just 0°C?"

**Exploration**: Students compare the O–H bond energy against the much smaller hydrogen-bond energy holding separate water molecules together, discovering which one actually breaks during melting.

**Synthesis**: Guide toward: melting breaks whatever holds separate particles apart — for molecular compounds, that's weak intermolecular forces, never the strong covalent bonds within each molecule.

**Closure**: "Does CO₂ having two polar bonds automatically make the whole molecule polar? What would you need to check?" (Directly resolves MC-1.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the CO₂ dipole-vector-cancellation diagram explicitly, contrasted with H₂O's reinforcing dipoles.
- **TA-2 (TELL)**: State the intramolecular-vs-intermolecular distinction explicitly, worked through with the O–H bond energy vs. hydrogen bond energy comparison.
- **TA-3 (DO)**: Student determines overall polarity for a new molecule by drawing and summing bond dipole vectors.
- **TA-4 (TEST-THINKING)**: Present MC-3's NH₄⁺ probe and ask the student to identify which bond is coordinate and why it's formed differently.

## 10. Voice Teaching

Whenever molecular polarity is discussed, always ask "what's the geometry?" immediately after identifying bond polarity, never treating bond polarity alone as sufficient to conclude molecular polarity. When discussing a covalent compound's melting point, explicitly ask "is this a molecular compound or a network solid?" before predicting high or low melting point.

## 11. Assessment

**Mastery gate**: Student can (a) correctly determine overall molecular polarity using vector-sum reasoning, not bond polarity alone, (b) correctly explain a molecular covalent compound's melting point using intermolecular, not covalent, bond breaking, (c) correctly identify a coordinate covalent bond and explain its formation mechanism.

- **FA-1**: "CO₂ has two polar C=O bonds. Is the CO₂ molecule polar?" — targets MC-1.
- **FA-2**: "Why does ice melt at 0°C if the O–H bond energy is 459 kJ/mol?" — targets MC-2.
- **FA-3**: "How is the fourth N–H bond in NH₄⁺ different from the other three?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only encountered diatomic polar-bond examples so far.

**Delayed retrieval**: Re-probe MC-1's geometry-dependence before `chem.bond.vsepr` formally develops molecular geometry prediction, which this concept's polarity reasoning directly depends on.

## 12. Recovery Notes

- **S3 (stuck)**: For polarity confusion, have the student draw the molecule's actual 3D or 2D geometric shape first, before attempting to reason about dipole cancellation.
- **S4 (frustrated)**: Normalize — the diatomic-example-first teaching sequence genuinely does make the polar-bond-equals-polar-molecule generalization a reasonable, common first assumption.
- **S6 (collision)**: Use the bond-energy comparison table for MC-2; use the NH₄⁺ formation walkthrough for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a symmetric molecule with polar bonds can still be non-polar overall.

## 13. Memory & Review

Tag as a procedural-analytical memory (dipole vector summation) plus two conceptual-correction memories (intramolecular vs. intermolecular melting mechanism; coordinate bond exception). Schedule a spaced check at ~1 week and again before `chem.bond.vsepr`/`chem.bond.coordinate-bond`.

## 14. Transfer Map

Feeds directly into `chem.bond.bond-parameters` (bond order/length/energy relationships extend this concept's foundations), `chem.bond.coordinate-bond` (formally develops the exception introduced in MC-3), `chem.bond.hybridization` and `chem.bond.vsepr` (molecular geometry, essential for polarity reasoning, is developed here), `chem.bond.resonance` (extends Lewis structure reasoning), and `chem.org.iupac` (organic nomenclature assumes fluent covalent bond and Lewis structure understanding).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
