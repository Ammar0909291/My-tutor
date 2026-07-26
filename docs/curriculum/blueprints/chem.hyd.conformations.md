# chem.hyd.conformations — Conformational Analysis

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hyd.conformations` |
| Domain | Hydrocarbons |
| Requires | `chem.hyd.alkanes` |
| Unlocks | (none) |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

The eclipsed conformation is LESS stable, not more, despite "more overlap sounds like more stability" — the front/rear C–H bonds at 0° dihedral are NOT bonding to each other (bond overlap stabilizes only genuine covalent bonds), and the proximity instead creates torsional (Pitzer) strain via van der Waals repulsion between the bonding electrons of the C–H bonds — staggered conformation, minimizing this repulsion, is genuinely more stable; a Newman projection correctly shows 4 total bonds per carbon (3 explicit lines from the front carbon's central dot, or from the rear carbon's circle edge, PLUS the implied C–C bond represented by the viewing axis itself, i.e., the dot/circle pair) — this is CORRECT bookkeeping, not an error, since the C–C bond is the projection's viewing direction, never drawn as an explicit additional line; and after a cyclohexane ring flip, EVERY axial position becomes equatorial and every equatorial position becomes axial — substituents' spatial relationship to the ring axis completely INVERTS (never "stays the same"), so a substituent that was axial (typically less stable, e.g., methyl) becomes equatorial (typically more stable) after the flip, with the energy difference between the two resulting conformers defined as that substituent's A-value.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing eclipsed ethane's front/rear H atoms at 0° dihedral (van der Waals repulsion, torsional strain, less stable) against staggered ethane's 60°-offset H atoms (minimized repulsion, more stable), isolating repulsion (not bonding) as the relevant interaction.

**Representational**: An explicit Newman-projection bond-count diagram, labeling all 3 front-carbon lines + the implied C–C viewing-axis bond = 4 total bonds, alongside the 3 rear-carbon lines + the same implied C–C bond = 4 total bonds.

**Abstract**: The general principle that non-bonded atomic proximity produces repulsion (destabilizing), never bonding-like stabilization, unless a genuine covalent bond forms; the general principle that a Newman projection's implied viewing-axis bond must be counted alongside the explicitly drawn lines for correct valence bookkeeping; the general principle that a cyclohexane ring flip completely inverts every substituent's axial/equatorial assignment, never leaving them unchanged.

**Transfer**: Given an unfamiliar eclipsed/staggered comparison, correctly attributing eclipsed instability to non-bonded repulsion, never bonding overlap; given an unfamiliar Newman projection, correctly counting all 4 bonds per carbon including the implied viewing-axis bond; given an unfamiliar substituted cyclohexane, correctly predicting complete axial/equatorial inversion after a ring flip.

## 3. Why Beginners Fail

Students transfer the general chemistry principle that "orbital overlap creates bonding and stability" directly onto the eclipsed conformation's close H-H proximity, missing that this proximity does NOT constitute genuine bond formation — it is instead a repulsive, destabilizing interaction (van der Waals/torsional strain) between the electrons of separate, already-formed C–H bonds on adjacent carbons, the opposite consequence from actual bond overlap; students, counting only the explicitly drawn lines in a Newman projection (3 per carbon), conclude the projection under-represents carbon's tetravalency, missing that the projection's viewing AXIS itself (represented by the dot-and-circle convention, looking directly down the C–C bond) IS the fourth bond for each carbon — a Newman projection is specifically constructed by viewing along that bond, so it is implicitly represented rather than drawn as an additional explicit line; and students, learning that a cyclohexane ring flip interconverts between two chair conformations, assume this interconversion is a relatively cosmetic "shape change" that leaves substituent positions largely unaffected, missing that the ring flip specifically and completely INVERTS every substituent's axial/equatorial status — a substituent occupying an axial position before the flip occupies the equatorial position afterward, and vice versa, for every single position on the ring.

## 4. Misconception Library

### MC-1: The eclipsed conformation is the most stable because the bonds overlap more and sharing increases stability
- **Probe**: "If the H atoms on front and rear carbons point toward each other (dihedral = 0°), does their proximity stabilise or destabilise the molecule?"
- **Characteristic phrase**: "more overlap = more stable."
- **Trigger (Type 2, perceptual intuition)**: The general "orbital overlap stabilizes" principle from bond formation is transferred to non-bonded atomic proximity.
- **Conflict evidence [P28]**: BOND overlap stabilises (covalent bond formation) but non-bonding H–H proximity at 0° dihedral does NOT constitute a bond — it is a VAN DER WAALS REPULSION (at distances shorter than the sum of van der Waals radii, repulsion increases steeply). This torsional strain (Pitzer strain) is typically attributed to repulsion between bonding electrons in the C–H bonds on front vs. rear carbon (hyperconjugative model). The staggered conformation minimises this repulsion. The "more overlap = more stable" reasoning is incorrect for non-bonded atoms.
- **Bridge [P30]**: "Overlap creates stability" is specifically true for the formation of NEW covalent bonds (where atomic orbitals combine to lower overall energy through bonding molecular orbital formation) — but the eclipsed conformation's H-H proximity involves already-complete, separate C–H bonds on DIFFERENT carbons simply passing close to each other in space, a fundamentally different situation where proximity produces electron-electron REPULSION (destabilizing) rather than any new stabilizing bond formation.
- **Replacement [P31]**: Eclipsed conformation's close non-bonded H-H proximity produces destabilizing van der Waals/torsional (Pitzer) strain, never bonding-like stabilization — staggered conformation, minimizing this repulsion, is genuinely more stable.
- **Discrimination pairs [P33]**: Genuine bond formation (orbital overlap, stabilizing) vs. eclipsed non-bonded H-H proximity (electron-electron repulsion, destabilizing) — superficially similar "closeness," opposite energetic consequence.
- **S6 repair path**: Present the explicit van der Waals repulsion argument, distinguishing genuine bond overlap from non-bonded destabilizing proximity.

### MC-2: In a Newman projection of ethane, each carbon has 6 bonds shown
- **Probe**: "Count the bonds on the front carbon in the Newman projection. How many do you see? How many bonds does carbon have in total?"
- **Characteristic phrase**: "front carbon has three bonds shown plus the bond to rear carbon = four."
- **Trigger (Type 4, notation-induced)**: Miscounting or confusion about how the implied C–C viewing-axis bond factors into the total, sometimes leading to over- or under-counting.
- **Conflict evidence [P28]**: This is actually CORRECT — the Newman projection shows 3 bonds to the front carbon (the three C–H bonds, drawn as lines from the central dot) plus the C–C bond (implied as the line of sight through the dot into the circle). The rear carbon also shows 3 bonds (drawn from the circle's edge). Total per C=4 bonds, consistent with carbon's valence. The misconception arises when students draw 6 lines per carbon or omit the implied C–C bond. The Newman projection is a PROJECTION — the C–C bond is the viewing direction, represented by the dot/circle pair, not drawn as a line.
- **Bridge [P30]**: A Newman projection is constructed by viewing the molecule DIRECTLY ALONG the C–C bond axis, meaning that specific bond is oriented perpendicular to the page (pointing directly at/away from the viewer) — this geometric choice means the C–C bond cannot be drawn as a conventional line (since it has zero length in the 2D projection) and is instead represented implicitly by the dot-and-circle convention itself, requiring the viewer to mentally "add back" this implied bond when counting each carbon's total valence.
- **Replacement [P31]**: Count each carbon's total bonds as the 3 explicitly drawn lines PLUS the 1 implied C–C bond (represented by the dot/circle, not drawn as a line) = 4 total, consistent with carbon's valence.
- **Discrimination pairs [P33]**: Correct count (3 explicit lines+1 implied C–C bond=4 total per carbon) vs. common miscounts (either 3, omitting the implied bond, or an incorrect 6, from misunderstanding the projection convention).
- **S6 repair path**: Present the explicit dot/circle convention diagram, walking through the "why" of the implied bond representation.

### MC-3: After a ring flip, the cyclohexane ring has the same number of axial and equatorial bonds as before, so the molecule doesn't change
- **Probe**: "If the methyl group on C1 was axial before a ring flip, where is it after the flip?"
- **Characteristic phrase**: "the ring just changes shape but the substituents stay in the same place."
- **Trigger (Type 5, instruction-induced)**: The ring flip's conservation of the TOTAL COUNT of axial/equatorial positions (still 6 of each) is mistaken for conservation of WHICH specific positions are axial/equatorial for each substituent.
- **Conflict evidence [P28]**: Ring flip INTERCONVERTS all axial and equatorial positions. Every bond that was AXIAL becomes EQUATORIAL and vice versa. For methylcyclohexane: axial-CH₃ chair (less stable)→ring flip→equatorial-CH₃ chair (more stable). The energy difference between the two conformers is the A-value for the substituent. Saying "substituents don't change" is wrong — their relationship to the ring axis (axial vs. equatorial) completely changes.
- **Bridge [P30]**: While the TOTAL NUMBER of axial positions (always 6) and equatorial positions (always 6) around the ring remains constant before and after a ring flip (a structural invariant of the chair conformation itself), this says nothing about which SPECIFIC position any given substituent occupies — the ring flip is precisely the process that swaps every individual position's axial/equatorial identity, meaning a substituent's specific relationship to the ring genuinely and completely inverts, even though the ring's overall axial/equatorial "inventory" stays the same.
- **Replacement [P31]**: A ring flip completely inverts every substituent's specific axial/equatorial assignment — never assume "the total count stays the same" implies "each substituent's position stays the same."
- **Discrimination pairs [P33]**: Axial-methylcyclohexane (before flip, less stable) vs. equatorial-methylcyclohexane (after flip, more stable, same molecule) — the total axial/equatorial inventory is unchanged, but this specific substituent's position has completely inverted.
- **S6 repair path**: Present the explicit before/after ring-flip diagram for methylcyclohexane, tracking the specific methyl group's position through the flip.

## 5. Explanation Library

**Primary explanation**: The eclipsed conformation's instability arises from non-bonded H-H proximity producing destabilizing van der Waals/torsional (Pitzer) strain, never from any bonding-like overlap stabilization — genuine covalent bond overlap and non-bonded atomic proximity are fundamentally different situations with opposite energetic consequences. A Newman projection's total bond count per carbon (4, consistent with valence) requires including the implied C–C bond (represented by the dot/circle viewing-axis convention) alongside the 3 explicitly drawn lines.

**Secondary explanation (ring-flip complete inversion)**: A cyclohexane ring flip completely inverts every substituent's specific axial/equatorial assignment, even though the ring's overall axial/equatorial position INVENTORY (always 6 of each) remains structurally unchanged — this distinction between "total inventory conserved" and "each specific substituent's position conserved" is essential for correctly predicting conformational stability changes.

## 6. Analogy Library

- **Primary analogy**: Two people standing close together but not shaking hands (eclipsed H-H proximity, no genuine bond, just uncomfortable crowding/repulsion) vs. two people actually shaking hands (genuine bond formation, stabilizing overlap).
- **Breaking point**: The handshake-vs-crowding analogy conveys the bonding-vs-repulsion distinction well but doesn't naturally capture the Newman-projection implied-bond convention (MC-2) or the ring-flip complete-inversion concept (MC-3) — those need the explicit dot/circle diagram and the before/after ring-flip tracking.
- **Anti-analogy**: Do NOT say "eclipsed conformation has more shared electron density between the H atoms, so it's more stable" — this directly reinforces MC-1 by implying bonding-like sharing where only repulsion exists.

## 7. Demonstration Library

- **Demonstration 1 (van der Waals repulsion argument for eclipsed vs. staggered)**: Present the explicit repulsion-based energy comparison, deriving staggered's greater stability.
- **Demonstration 2 (Newman-projection dot/circle implied-bond convention diagram)**: Present the explicit convention diagram, walking through why the C–C bond is represented implicitly.
- **Demonstration 3 (before/after ring-flip position-tracking diagram for methylcyclohexane)**: Present the explicit diagram tracking the methyl group's specific axial-to-equatorial inversion.

## 8. Discovery Lesson

**Opening**: "In the eclipsed conformation, front and rear H atoms point directly at each other. Does this stabilize or destabilize the molecule?"

**Exploration**: Students examine the van der Waals repulsion argument, discovering close non-bonded proximity destabilizes rather than stabilizes.

**Synthesis**: Guide toward: non-bonded atomic proximity produces repulsion, never bonding-like stabilization, unless a genuine covalent bond forms.

**Closure**: "After a cyclohexane ring flip, does a substituent that was axial stay axial?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit van der Waals repulsion argument for eclipsed vs. staggered ethane.
- **TA-2 (TELL)**: State the Newman-projection implied-bond convention explicitly, anchored to the dot/circle diagram.
- **TA-3 (DO)**: Student tracks a substituent's specific axial/equatorial position through a ring flip for an unfamiliar substituted cyclohexane.
- **TA-4 (TEST-THINKING)**: Present the Newman-projection bond-count probe and ask the student to justify the correct total of 4 bonds per carbon.

## 10. Voice Teaching

Whenever eclipsed vs. staggered stability is discussed, narrate "non-bonded proximity repels — it never bonds, so it never stabilizes." Whenever a ring flip is analyzed, state "every axial becomes equatorial and vice versa — track the specific substituent through the flip" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly attribute eclipsed conformation instability to non-bonded repulsion, (b) correctly count all 4 bonds per carbon in a Newman projection including the implied C–C bond, (c) correctly track complete axial/equatorial inversion through a ring flip.

- **FA-1**: "If the H atoms on front and rear carbons point toward each other, does their proximity stabilise or destabilise the molecule?" — targets MC-1.
- **FA-2**: "Count the bonds on the front carbon in the Newman projection. How many do you see? How many bonds does carbon have in total?" — targets MC-2.
- **FA-3**: "If the methyl group on C1 was axial before a ring flip, where is it after the flip?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who default to a general "more overlap = more stable" heuristic without distinguishing bonded from non-bonded interactions.

**Delayed retrieval**: Re-probe MC-1's non-bonded-repulsion reasoning and MC-3's ring-flip complete-inversion principle as foundational knowledge for subsequent stereochemistry and substituted-ring-system applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the eclipsed-stability confusion, have the student explicitly check whether the close atoms form a genuine bond before invoking any "overlap stabilizes" reasoning.
- **S4 (frustrated)**: Normalize — transferring the general "overlap stabilizes" principle to non-bonded proximity is genuinely common on first exposure to conformational analysis.
- **S6 (collision)**: Use the explicit dot/circle convention diagram for MC-2; use the before/after ring-flip tracking diagram for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a substituent's axial/equatorial status completely inverts after a ring flip.

## 13. Memory & Review

Tag as one conceptual-correction memory (non-bonded repulsion, not bonding, in eclipsed conformation) plus two procedural memories (Newman-projection implied-bond counting; ring-flip complete axial/equatorial inversion tracking). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates alkane reasoning built across `chem.hyd.alkanes`, forming a capstone application to stereochemistry and substituted-cyclohexane conformational-analysis contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
