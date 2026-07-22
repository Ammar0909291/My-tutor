# Teaching Blueprint: Intrinsic Semiconductors

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.mod.intrinsic-semiconductors |
| **Name** | Intrinsic Semiconductors |
| **Domain** | Modern Physics |
| **Difficulty** | Advanced |
| **Bloom Level** | Understand |
| **Estimated Hours** | 4 |
| **Mastery Threshold** | 0.75 |
| **Prerequisites** | phys.mod.semiconductor-classification |
| **Unlocks** | phys.mod.extrinsic-semiconductors |

---

## 1. Concept Spine

**One-sentence definition:** In a pure (intrinsic) semiconductor, thermal energy generates electron-hole pairs across the band gap — every electron promoted to the conduction band leaves behind a positively-charged "hole" in the valence band — and both carrier types contribute equally to conduction, which rises with temperature, unlike a metal.

**The core insight:** A pure semiconductor doesn't just gain conduction electrons when warmed — it simultaneously creates a second, equally important type of charge carrier: the hole, a vacancy left behind in the valence band where an electron used to be, which behaves in every practical sense (for conduction purposes) like a mobile positive charge. This electron-hole pair creation, always in exactly equal numbers in a pure semiconductor, is the single foundational mechanism underlying every subsequent concept in this sub-sequence — doping, junctions, and diode behavior all trace back to manipulating this basic electron-hole picture.

**Conceptual chain:**
1. At absolute zero, a pure semiconductor's valence band is completely full and its conduction band completely empty — no available charge carriers, so conductivity is exactly zero.
2. As temperature rises above absolute zero, thermal energy occasionally promotes an electron from the valence band across the band gap into the conduction band.
3. This promoted electron becomes a mobile negative charge carrier in the conduction band — but it also leaves behind a vacancy (a missing electron) in the valence band, called a "hole."
4. A hole behaves, for conduction purposes, exactly like a mobile positive charge: nearby valence-band electrons can shift to fill the vacancy, effectively moving the hole in the opposite direction to electron motion — this is a genuine, useful, and experimentally verified way of describing collective valence-band electron behavior.
5. In a pure (intrinsic) semiconductor, electrons and holes are always created in exactly equal numbers (n = p, where n is electron concentration and p is hole concentration), since every promoted electron creates exactly one hole — this equality is the defining signature of "intrinsic" as opposed to "extrinsic" (doped) behavior, developed in the next concept.
6. Both carrier types (electrons in the conduction band, holes in the valence band) contribute to the material's total conductivity, moving in opposite directions under an applied electric field but both contributing current in the same direction (since they carry opposite charge and move opposite ways).

**Central relations:**
- Electron-hole pair generation: thermal energy promotes valence-band electrons to the conduction band, creating one hole for every promoted electron.
- Intrinsic carrier concentration: n = p (electron concentration exactly equals hole concentration) — the defining feature of a pure, undoped semiconductor.
- Hole: a vacancy in the valence band, behaving as a mobile positive charge carrier for conduction purposes.
- Total conductivity: contributions from both electron and hole motion, both increasing with temperature as more electron-hole pairs are thermally generated.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A theater seating analogy in physical form: a fully-occupied row of seats (valence band) where one person stands up and moves to a separate, empty balcony (conduction band) — the empty seat left behind (the hole) can then be "filled" by the person in the next seat shifting over, which in turn leaves a new empty seat one position over, effectively making the empty seat "move" in the opposite direction to the standing person's actual physical relocation.
- Physical analogy: a nearly full parking garage floor where one car leaves (electron promoted away), and every other car on that floor shifts forward one space to fill the resulting gap — the empty parking space effectively "moves" backward through the garage, even though no single car actually traveled that whole distance.

### Representational (Iconic)
- A band diagram showing a small number of electrons in the conduction band (dots) and an exactly equal number of holes (open circles) in the valence band, both directly created from the same thermal-excitation events.
- A "carrier motion under applied field" diagram: conduction-band electrons drifting one direction, valence-band holes drifting the opposite direction, both types of motion contributing current in the same overall direction.

### Abstract (Symbolic)
- Intrinsic carrier concentration relation (qualitative, no full derivation required at this level): n = p = n_i, where n_i (the intrinsic carrier concentration) increases roughly exponentially with temperature and decreases exponentially with increasing band gap — directly connecting back to the prerequisite concept's temperature-dependence discussion.
- Real-world intrinsic carrier concentration values: silicon's n_i at room temperature is roughly 10¹⁰ carriers per cm³ — a tiny fraction of silicon's total atom density (~5×10²² atoms per cm³), illustrating just how rare thermal excitation events actually are even at room temperature.

### Transfer (+)
- Semiconductor device physics: every subsequent concept in this domain extension (doping, p-n junctions, diode behavior) is built by deliberately disturbing this natural n = p equality, making the electron-hole pair picture the essential conceptual foundation for understanding engineered semiconductor devices.
- Photovoltaics (solar cells): absorbed photons in a solar cell generate electron-hole pairs by exactly this same mechanism (photon energy substituting for thermal energy as the excitation source), which are then separated and collected to produce usable electric current.
- Photodetectors and image sensors: many light-detection technologies directly exploit photon-generated electron-hole pairs as their fundamental sensing mechanism.

---

## 3. Why Beginners Fail

**Mode 1 — Believing a "hole" is a literal physical particle, like a newly created antiparticle of the electron:** Correct: a hole is not a fundamental particle at all — it is a convenient, physically accurate description of the collective behavior of the many remaining valence-band electrons shifting to fill a vacancy; the hole "moves" as an emergent, effective description of many real electrons' small individual shifts, not as a single new particle physically traveling through the crystal.

**Mode 2 — Assuming only electrons contribute to conduction in a semiconductor, with holes being a minor or negligible detail:** Correct: both electrons (in the conduction band) and holes (in the valence band) contribute meaningfully and, in a pure intrinsic semiconductor, equally to total conductivity — omitting hole conduction would miss half the actual current-carrying mechanism.

**Mode 3 — Believing electron and hole concentrations can differ from each other in a pure, undoped semiconductor:** Correct: in an intrinsic (pure, undoped) semiconductor, electron concentration always exactly equals hole concentration (n = p), since every single electron promoted to the conduction band necessarily leaves behind exactly one hole — this strict equality is the very definition of "intrinsic," and any deviation from it signals a doped (extrinsic) semiconductor, covered in the next concept.

**Mode 4 — Assuming a hole is simply "empty space" with no charge or effect on conduction:** Correct: while a hole is indeed a vacancy (absence of an electron), it behaves as a genuine, mobile POSITIVE charge carrier for all practical conduction purposes — it responds to electric fields, drifts in a specific direction, and contributes real current, exactly analogous to (though mechanistically different from) a positively-charged particle.

---

## 4. Misconception Library

### MC-1: "A hole is a real, physical particle — like a newly created antielectron"
- **Probe:** "When an electron is promoted to the conduction band, is the 'hole' left behind a brand new physical particle, or something else?"
- **Characteristic phrase:** "A hole is basically a new particle that gets created, kind of like a positron."
- **Trigger:** The vivid, particle-like language used to describe holes (positive charge, mobility, contributes to current) invites confusion with genuine antiparticles (like the positron, already studied in phys.particle.antimatter).
- **Conflict evidence [P28]:** A hole has no independent existence separate from the collective behavior of the remaining valence-band electrons — when a hole appears to "move" through the crystal, what is actually happening is that a nearby electron shifts over to fill the vacancy, creating a new vacancy one position away; this is fundamentally a description of many real electrons' collective, small rearrangements, not the motion of any single new particle. A positron, by contrast, is a genuine fundamental antiparticle with its own independent existence, detectable in a vacuum with no surrounding crystal lattice required at all.
- **Bridge [P30]:** "A hole is not a new fundamental particle — it's an extremely useful, physically accurate bookkeeping device describing the collective motion of the remaining valence-band electrons as they shift to fill a vacancy. Unlike a positron (a genuine, independently-existing antiparticle), a hole only exists as a description of electron behavior within the crystal — it has no meaning outside that context."
- **Replacement [P31]:** A hole is an emergent, effective description of collective valence-band electron rearrangement, not an independently existing fundamental particle.
- **Discrimination pairs [P33]:** A "gap" moving down a line of people as each person steps forward to fill the space ahead of them is a useful, real description of collective motion — but the "gap" itself isn't a person; a hole is exactly this kind of emergent description, not a genuine new particle like the positron.
- **S6 repair path:** Use the theater-seating or parking-garage demonstration (Section 2) directly, having the student trace through exactly which real electrons move to make the "hole" appear to travel, emphasizing no new particle is created.

### MC-2: "Only electrons contribute to conduction in a semiconductor; holes are a minor detail"
- **Probe:** "Does hole motion in the valence band contribute meaningfully to a semiconductor's total electrical conductivity, or is essentially all the conduction due to electrons alone?"
- **Characteristic phrase:** "Conduction is really just about electrons moving — holes are a minor side detail."
- **Trigger:** Prior experience with metals (where conduction is described purely in terms of electron motion) is over-generalized to semiconductors without recognizing the valence band's genuinely separate, equally important contribution.
- **Conflict evidence [P28]:** In a pure (intrinsic) semiconductor, electrons and holes are created in exactly equal numbers and both contribute measurably to total conductivity — experimentally, both electron mobility and hole mobility are separately measured, well-established material properties (for example, in silicon, electron mobility is roughly 2–3 times higher than hole mobility, but both are nonzero and both contribute to the measured total conductivity).
- **Bridge [P30]:** "In a semiconductor, conduction genuinely involves two distinct carrier types, not one: electrons in the conduction band and holes in the valence band. Both move under an applied electric field (in opposite directions, since they carry opposite charge) and both contribute real current in the same overall direction. Treating hole conduction as a minor detail would miss roughly half the actual physical mechanism."
- **Replacement [P31]:** Total semiconductor conductivity has two genuine, separately measurable contributions: electron conduction (conduction band) and hole conduction (valence band).
- **Discrimination pairs [P33]:** A tug-of-war has two teams pulling in opposite directions, both contributing to the net force on the rope — ignoring one team because you're more familiar with tracking the other would give a wrong picture of the total force; ignoring hole conduction because you're more familiar with electron conduction gives an equally incomplete picture.
- **S6 repair path:** Present the carrier-motion-under-applied-field diagram (Section 2) directly, having the student trace both the electron and hole contributions to current separately, then confirm both point the same direction.

### MC-3: "Electron and hole concentrations can be different from each other, even in a pure, undoped semiconductor"
- **Probe:** "In a completely pure, undoped semiconductor, could there be more electrons in the conduction band than holes in the valence band, or must these two numbers always match exactly?"
- **Characteristic phrase:** "There's no particular reason the number of electrons and holes should be exactly equal."
- **Trigger:** Without explicit emphasis on the pair-creation mechanism, students may assume electron and hole populations are independently, separately determined quantities rather than strictly linked by their shared origin.
- **Conflict evidence [P28]:** Every single electron promoted from the valence band to the conduction band, by the very mechanism of thermal excitation across the band gap, necessarily and simultaneously creates exactly one hole in the valence band (the vacancy left behind) — there is no physical mechanism in a pure semiconductor that could create an electron without a corresponding hole, or vice versa, so the two populations are locked in exact equality (n = p) by the pair-creation process itself.
- **Bridge [P30]:** "In a pure, undoped semiconductor, electrons and holes are created exclusively in pairs — one hole for every promoted electron, with no exceptions, because that's literally what the excitation process is: one electron leaves the valence band (creating a hole) and arrives in the conduction band (becoming a free electron), simultaneously, as one single event. This is precisely the defining signature of 'intrinsic' — n always equals p."
- **Replacement [P31]:** In an intrinsic (pure, undoped) semiconductor, n = p exactly and unconditionally, as a direct structural consequence of the pair-creation mechanism — this equality is the definition of "intrinsic," not a coincidental or approximate result.
- **Discrimination pairs [P33]:** Every time one person leaves a completely full room through the only door, exactly one empty seat appears — the number of "people who left" and "empty seats created" cannot differ, because they're the same event counted two ways; electron and hole creation in a pure semiconductor work exactly the same way.
- **S6 repair path:** Directly state the one-event framing: "when an electron leaves the valence band for the conduction band, is that one event or two separate events? [One.] So can the number of electrons created differ from the number of holes created, if they're literally the same single event counted from two different perspectives?"

---

## 5. Explanation Library

**Explanation A — The electron-hole pair: one event, two carriers (procedural/conceptual):**
"When thermal energy promotes an electron from the valence band to the conduction band, exactly one thing has happened, viewed from two perspectives: a new mobile electron now exists in the conduction band, AND a new vacancy (hole) now exists in the valence band where that electron used to be. These are not two separate events — they are the same single event, which is exactly why, in a pure semiconductor with no other carrier source, electron concentration must always exactly equal hole concentration (n = p)."

**Explanation B — Why a hole behaves like a moving positive charge (conceptual):**
"A hole isn't a real particle, but describing it as one is remarkably useful and accurate for conduction purposes. When a vacancy exists in an otherwise-full valence band, a nearby electron can shift over to fill it — creating a new vacancy one position away, in the direction the original electron came from. Track this vacancy over many such shifts, and it appears to move steadily in the opposite direction to the electrons actually doing the shifting — and because the vacancy represents a local absence of negative charge, this apparent motion behaves, in every measurable way, exactly like a mobile positive charge moving through the material."

**Explanation C — Why the intrinsic carrier concentration is so small, even at room temperature (transfer/conceptual):**
"Even at room temperature, silicon's intrinsic carrier concentration (n_i) is only about 10¹⁰ per cubic centimeter — compared to roughly 5×10²² silicon atoms per cubic centimeter in the same volume. That means only about one in every five trillion atoms has an electron promoted across the band gap at any given moment. This tiny fraction — not zero, but genuinely rare — is exactly why pure silicon is a poor conductor at room temperature, and exactly why deliberately adding impurities (doping, the next concept) to increase carrier concentration by many orders of magnitude is so essential for making silicon useful in real electronic devices."

---

## 6. Analogy Library

**Primary analogy — The moving empty seat in a full theater row:**
Picture a completely full row of theater seats (the valence band) with no aisle to leave through except by climbing over people, until one person is lifted out entirely to a separate balcony section (the conduction band, representing the promoted electron). The now-empty seat doesn't stay put — the person next to it shifts over to fill it, leaving a new empty seat one position further down, and this continues, effectively making the "empty seat" travel steadily down the row in the opposite direction from the original person's actual relocation to the balcony. The traveling empty seat is the hole.

**Breaking point:** Real theater patrons shift seats out of courtesy or convenience, a voluntary social behavior; valence-band electrons shift to fill a vacancy due to a genuine physical driving force (electric fields, or simply energetic favorability) — the analogy captures the "collective shift creates apparent reverse motion" structure well, but not the actual physical driving mechanism, which requires the more technical framing in Explanation B.

**Anti-analogy:** Do NOT say "a hole is basically a positron that exists inside the semiconductor" — this directly reinforces MC-1 by conflating an emergent, context-dependent description (the hole) with a genuine, independently-existing fundamental antiparticle (the positron, already studied in a different concept with a fundamentally different physical status).

---

## 7. Demonstration Library

**Demo 1 — Parking garage / theater-seat hole-motion simulation:**
Using a physical row of chairs or a drawn diagram of parking spaces, physically or visually simulate one "car"/"person" leaving and the subsequent chain of shifts, tracking exactly where the "gap" ends up after several steps, to make hole motion concrete.

**Demo 2 — Electron-hole pair generation and equal-count verification:**
Build a simple band diagram showing several thermally-generated electron-hole pairs, having students count and verify that the number of electrons in the conduction band always exactly matches the number of holes in the valence band, directly targeting MC-3.

**Demo 3 — Dual-carrier current diagram:**
Draw an applied electric field with both electron drift (one direction) and hole drift (opposite direction) explicitly shown, having students verify both contribute to current flowing in the same overall direction, directly targeting MC-2.

---

## 8. Discovery Lesson

**Opening (5 min):** "When a semiconductor is warmed up and an electron gets promoted into the conduction band, something else happens at the exact same moment — something that turns out to behave almost exactly like a brand new, positively-charged particle. What do you think that 'something else' is?"

**Exploration (15 min):**
- Introduce the electron-hole pair concept (Explanation A) and run Demo 2 (pair generation and equal-count verification), directly targeting MC-3.
- Present the theater-seat/parking-garage demonstration (Demo 1) to build the concrete, mechanistic picture of hole motion.

**Synthesis (10 min):**
- Present Explanation B (why a hole behaves like a moving positive charge), directly addressing MC-1 (hole as a literal new particle).
- Run Demo 3 (dual-carrier current diagram), directly targeting MC-2 (electrons only).

**Closure:** "A hole isn't a new particle physics has discovered hiding inside crystals — it's an elegant, remarkably useful way of describing something that's actually happening among a huge number of ordinary electrons. And because every promoted electron creates exactly one hole, a pure semiconductor's electron and hole populations are locked together in perfect balance — a balance the very next concept is entirely about deliberately breaking."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN + DEMONSTRATE]:** Deliver Explanation A (electron-hole pair, one event) alongside Demo 2 (pair generation and equal-count verification), directly probing MC-3 (n ≠ p misconception).

**TA-2 [DEMONSTRATE]:** Demo 1 (theater-seat/parking-garage hole-motion simulation), building the concrete mechanistic picture before any abstract "hole as positive charge" language.

**TA-3 [EXPLAIN + CHALLENGE]:** Deliver Explanation B (why a hole behaves like a positive charge), directly confronting MC-1 (hole as literal new particle).

**TA-4 [DEMONSTRATE + TRANSFER]:** Demo 3 (dual-carrier current diagram) directly confronting MC-2 (electrons-only misconception), followed by Explanation C (why intrinsic carrier concentration is so small), previewing doping's motivation.

---

## 10. Voice Teaching

**Opening:**
"When a semiconductor warms up and an electron gets promoted into the conduction band, something else happens at that exact same instant — something that ends up behaving almost exactly like a brand new, positively charged particle appears in the material. What do you think that is?"

**At the hole-motion demonstration:**
"Picture a completely full row of theater seats, no aisle, and one person gets lifted straight up and out to a balcony. The seat they left doesn't stay empty for long — the person right next to it shifts over to fill it. Now there's a new empty seat, one position over. That process keeps happening, and if you just watch the empty seat, it looks like it's steadily traveling down the row — in the opposite direction from where the original person actually went. That traveling empty seat is a hole. Nobody created a new person. A whole chain of already-existing people just shifted, one seat each, and the gap moved."

**At the not-a-new-particle clarification:**
"Important distinction: a hole is not a new particle, the way a positron — the electron's actual antiparticle — is a real, independently existing thing. A hole only exists as a description of what a huge number of ordinary electrons are doing, together, inside this specific crystal. Take the crystal away, and there's no hole left to talk about. Take a positron out of a crystal, into empty space, and it's still every bit a positron. That's the difference."

---

## 11. Assessment

**Mastery gate:** Student correctly explains that electron-hole pairs are created together in a single event, correctly rejects the "hole as literal new particle" misconception in favor of an emergent-description understanding, and correctly explains why both carrier types contribute to conductivity. Score ≥ 75%.

**FA-1 — Pair creation:**
*Q: In a pure silicon sample, if thermal energy promotes 1000 electrons from the valence band to the conduction band, how many holes are created? Explain.*
Expected: Exactly 1000 — each promoted electron leaves behind exactly one hole in the valence band, as the same single event viewed from two perspectives, so electron and hole counts are always exactly equal in an intrinsic semiconductor.
Threshold: Correct numeric answer (1000) with correct "same event" reasoning.

**FA-2 — Hole as emergent description:**
*Q: Is a hole a genuine, independently existing fundamental particle, like a positron? Explain the difference.*
Expected: No — a hole is an emergent, effective description of the collective shifting of many real valence-band electrons filling a vacancy; it has no independent existence outside that context, unlike the positron, a genuine fundamental antiparticle that exists independently even in a vacuum.
Threshold: Must correctly deny hole-as-fundamental-particle status and correctly contrast with the positron.

**FA-3 — Dual carrier contribution:**
*Q: When an electric field is applied to a pure semiconductor, do both electrons and holes contribute to the resulting current? Explain their relative directions of motion.*
Expected: Yes — electrons in the conduction band drift one direction, while holes in the valence band drift the opposite direction; because they carry opposite charge, both motions contribute current flowing in the same overall direction.
Threshold: Must correctly say "yes, both contribute" and correctly describe the opposite-direction-but-same-current-direction relationship.

**FA-4 — Why n_i is so small:**
*Q: Silicon's intrinsic carrier concentration at room temperature is about 10¹⁰ per cm³, while its atomic density is about 5×10²² per cm³. What does this comparison tell you about how "rare" thermal carrier generation actually is?*
Expected: Only an extremely small fraction of atoms (roughly one in several trillion) have an electron thermally promoted across the band gap at any given moment — thermal carrier generation is a genuinely rare event even at room temperature, which is why pure silicon conducts poorly without additional measures (doping).
Threshold: Must correctly interpret the ratio as indicating rarity, connecting to why doping becomes necessary.

**Confidence calibration:** After FA-2, students rate confidence before revealing the answer; students confident but wrong are walked through the theater-seat demonstration (Demo 1) again, explicitly tracing which real electrons move, before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Explain why electron and hole concentrations are always exactly equal in a pure (intrinsic) semiconductor. What is a hole, physically?" Expected: same single pair-creation event; an emergent description of collective valence-band electron shifting, not a fundamental particle.

---

## 12. Recovery Notes

**S3:** Student has the semiconductor classification framework secure but hasn't yet grasped the electron-hole pair mechanism. Begin entirely with the theater-seat/parking-garage demonstration (Demo 1) as a concrete, hands-on anchor before introducing any "hole as positive charge" abstract language.

**S4:** Student treats the hole as a literal new particle (MC-1) or assumes n and p can differ (MC-3). Run Demo 2 (pair generation and equal-count verification) repeatedly with new hypothetical electron counts until the "same event, two perspectives" framing becomes automatic.

**S6:** Student is anxious about the abstractness of "a vacancy that behaves like a particle." Anchor entirely in the concrete, physical chair/parking-space demonstration, explicitly tracing real electron movements, before introducing any charge-carrier terminology or symbolic notation (n, p, n_i).

**S9:** Extend into photon-generated electron-hole pairs (previewing solar cell / photodetector applications, Section 2's Transfer content) as enrichment — "thermal energy isn't the only way to create an electron-hole pair — what do you think happens when light hits a semiconductor?"

---

## 13. Memory & Review

**Memory type:** Conceptual/mechanistic (the electron-hole pair creation event and the emergent nature of hole motion) — retrieval practice should emphasize explaining the mechanism and the emergent-description status of holes in the student's own words, not just stating "n = p" as a memorized fact.

**Spaced retrieval schedule:**
- Session + 1: "Explain why electron and hole concentrations are always exactly equal in a pure semiconductor."
- Session + 3: "Is a hole a real particle? Explain what it actually represents."
- Session + 7: "Do both electrons and holes contribute to conduction in a semiconductor? Explain their relative motion under an applied field."

**Interleaving partners:** phys.mod.semiconductor-classification (prerequisite — the band-gap-based classification this concept elaborates), phys.mod.extrinsic-semiconductors (successor — deliberately breaking the n = p equality via doping).

---

## 14. Transfer Map

**Near transfer:** Applying the same electron-hole pair framework to photon-generated (rather than thermally-generated) carrier pairs in the context of solar cells and photodetectors, using the identical "one event, two carriers" reasoning.

**Far transfer:** Solid-state device engineering broadly (every subsequent semiconductor device concept builds directly on manipulating electron and hole populations), the general scientific principle of emergent, collective description (holes as an effective description of collective electron behavior, analogous to how "current" itself is an emergent description of countless individual charge carriers' motion), and quasi-particle concepts in condensed matter physics generally (phonons, plasmons, and other "quasi-particles" are conceptually similar emergent descriptions of collective behavior).

**Structural abstraction:** "An emergent, effective description of collective behavior can behave, for all practical purposes, exactly like a genuine particle, without actually being one." This pattern — a hole as a quasi-particle description of collective electron rearrangement — is a foundational idea in condensed matter physics, recurring in phonons (quantized collective lattice vibrations) and other quasi-particle concepts encountered in more advanced physics.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.mod.semiconductor-classification is necessary and sufficient — this concept directly elaborates the semiconductor category's carrier-generation mechanism established there.
- **Unlock readiness:** phys.mod.extrinsic-semiconductors directly depends on the electron-hole pair and n = p equality established here, since doping is precisely defined as deliberately breaking this natural equality; sequencing as the immediate next concept is well-motivated.
- **Difficulty calibration:** Advanced/Understand is appropriate — the electron-hole pair mechanism and the emergent nature of holes require genuine conceptual work (particularly resisting the literal-new-particle misconception), matching the Advanced difficulty at the Understand Bloom level, appropriately positioned before the Apply-level doping concept that follows.
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Physics KG's Modern Physics domain extension (semiconductor physics) design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
