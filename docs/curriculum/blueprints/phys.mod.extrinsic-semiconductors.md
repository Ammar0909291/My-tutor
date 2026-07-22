# Teaching Blueprint: Extrinsic Semiconductors: Doping and Carrier Types

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.mod.extrinsic-semiconductors |
| **Name** | Extrinsic Semiconductors: Doping and Carrier Types |
| **Domain** | Modern Physics |
| **Difficulty** | Expert |
| **Bloom Level** | Apply |
| **Estimated Hours** | 5 |
| **Mastery Threshold** | 0.70 |
| **Prerequisites** | phys.mod.intrinsic-semiconductors |
| **Unlocks** | phys.mod.pn-junction |

---

## 1. Concept Spine

**One-sentence definition:** Doping a semiconductor with a donor or acceptor impurity deliberately breaks the natural n = p balance, producing an n-type material (excess mobile electrons) or a p-type material (excess mobile holes) with a majority charge carrier, while the material as a whole remains electrically neutral.

**The core insight:** Pure silicon conducts too poorly (as established in the prerequisite concept, n_i is vanishingly small at room temperature) to be useful in most real electronic devices. The single engineering breakthrough that makes modern electronics possible is doping: deliberately introducing a tiny, carefully controlled concentration of a different element into the silicon crystal lattice, which either donates an extra, easily-freed electron (n-type doping) or creates an extra, easily-filled vacancy (p-type doping) — dramatically increasing the concentration of one specific carrier type by many orders of magnitude, while the crystal as a whole remains perfectly electrically neutral throughout.

**Conceptual chain:**
1. Silicon has 4 valence electrons and forms 4 covalent bonds with its neighboring silicon atoms in the crystal lattice.
2. n-type doping: replacing a small fraction of silicon atoms with a pentavalent (5-valence-electron) donor impurity (e.g., phosphorus, arsenic) — 4 of the impurity's 5 valence electrons form the required covalent bonds, and the 5th electron is only weakly bound, easily freed by thermal energy at room temperature to become a mobile conduction-band electron.
3. p-type doping: replacing a small fraction of silicon atoms with a trivalent (3-valence-electron) acceptor impurity (e.g., boron, gallium) — the impurity can only form 3 of the required 4 covalent bonds, leaving one bond incomplete, which readily accepts an electron from a neighboring silicon atom, creating a hole in the valence band.
4. In n-type material, electrons are the majority carrier (vastly more numerous than holes) and holes are the minority carrier; in p-type material, holes are the majority carrier and electrons are the minority carrier.
5. Despite this dramatic imbalance in mobile carrier types, the doped material as a whole remains electrically neutral: the donor impurity atoms, having given up their extra electron, become fixed, immobile positive ions embedded in the lattice (in n-type material); the acceptor impurity atoms, having accepted an extra electron, become fixed, immobile negative ions (in p-type material) — these fixed ion charges exactly balance the mobile majority carrier charges, so the bulk material has zero net charge.
6. Doping concentrations are typically extremely small (often one impurity atom per million to per billion silicon atoms) yet increase majority carrier concentration by many orders of magnitude relative to the pure material's tiny intrinsic concentration, illustrating just how sensitive semiconductor conductivity is to controlled impurity introduction.

**Central relations:**
- n-type: pentavalent donor impurity (P, As); excess mobile electrons (majority carriers); holes are minority carriers; fixed donor ions become positively charged.
- p-type: trivalent acceptor impurity (B, Ga); excess mobile holes (majority carriers); electrons are minority carriers; fixed acceptor ions become negatively charged.
- Overall electrical neutrality: mobile majority carrier charge is exactly balanced by fixed, immobile ionized-impurity charge — the doped material has zero net charge, despite having a huge majority-carrier imbalance.
- Doping dramatically increases majority carrier concentration (often by many orders of magnitude) relative to the intrinsic (undoped) concentration.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A physical bond-model demonstration: build a silicon lattice segment using ball-and-stick models (each silicon atom with 4 bonds to neighbors), then substitute one atom with a 5-bond "donor" piece (showing the 5th, unbonded electron) or a 3-bond "acceptor" piece (showing the incomplete, vacant bond).
- Analogy prop: a marching band formation where every member is normally paired with exactly the right number of partners — introducing one "extra" member with one arm free (donor) or one member "short" an arm (acceptor) into an otherwise perfectly paired formation.

### Representational (Iconic)
- A lattice diagram showing silicon atoms in their tetrahedral bonding arrangement, with one substituted donor atom (5 valence electrons, one drawn as a loosely-bound extra) and, in a separate diagram, one substituted acceptor atom (3 valence electrons, one incomplete bond shown as a vacancy).
- A "fixed ion vs. mobile carrier" diagram, explicitly distinguishing the immobile, embedded donor/acceptor ions (drawn fixed in the lattice) from the mobile majority carriers (drawn as free to move through the crystal) — directly illustrating overall neutrality.

### Abstract (Symbolic)
- Majority/minority carrier concentration relation (qualitative, mass-action law preview, no full derivation required at this level): in a doped semiconductor, the product of electron and hole concentrations remains approximately equal to the square of the intrinsic concentration (n×p ≈ n_i²) — so increasing one carrier type (via doping) necessarily suppresses the other, explaining why the minority carrier concentration in a doped material can actually be lower than in the pure intrinsic material.
- Typical doping ratios: roughly 1 impurity atom per 10⁶–10⁹ silicon atoms is often sufficient to increase majority carrier concentration from the intrinsic ~10¹⁰ cm⁻³ to roughly 10¹⁵–10¹⁸ cm⁻³ — several orders of magnitude, from an extremely dilute impurity concentration.

### Transfer (+)
- Semiconductor device manufacturing: the entire modern semiconductor industry (transistors, integrated circuits, solar cells) is built on precisely controlled doping processes (ion implantation, diffusion) to create specific n-type and p-type regions with exact, engineered carrier concentrations.
- Solar cell design: p-n junction solar cells (developed in the next two concepts) require carefully balanced n-type and p-type layers, each engineered via specific doping choices.
- Materials science research: doping concepts (introducing controlled impurities to dramatically alter electronic properties) extend well beyond silicon to compound semiconductors (gallium arsenide, gallium nitride) used in specialized high-performance electronics and LEDs.

---

## 3. Why Beginners Fail

**Mode 1 — Believing a doped semiconductor carries a net electric charge (n-type is "positively charged overall" or "negatively charged overall"):** Correct: despite having a large majority-carrier imbalance (excess mobile electrons in n-type, excess mobile holes in p-type), the doped material as a whole remains exactly electrically neutral — the fixed, immobile donor or acceptor ion charges precisely balance the mobile majority carrier charges.

**Mode 2 — Assuming "n-type" means the material has literally no holes at all, or "p-type" means literally no electrons at all:** Correct: both carrier types are always present in any real semiconductor — n-type material simply has a vastly larger electron concentration than hole concentration (majority vs. minority carriers), and p-type material has the reverse; neither carrier type is ever completely absent.

**Mode 3 — Confusing donor (pentavalent) and acceptor (trivalent) impurities, or which produces which carrier type:** Correct: a pentavalent (5-valence-electron) donor impurity donates an extra electron, producing n-type material with excess mobile electrons; a trivalent (3-valence-electron) acceptor impurity creates an electron vacancy, producing p-type material with excess mobile holes — the valence-electron count of the dopant, relative to silicon's 4, directly determines which carrier type results.

**Mode 4 — Believing doping increases both carrier concentrations simultaneously and proportionally:** Correct: doping to increase one carrier type (say, electrons in n-type material) actually suppresses the other carrier type (holes) below even the pure intrinsic concentration — a consequence of the mass-action-law-like relationship (n×p ≈ n_i², approximately constant), meaning majority and minority carrier concentrations move in opposite directions under doping, not together.

---

## 4. Misconception Library

### MC-1: "An n-type (or p-type) doped semiconductor carries an overall net electric charge"
- **Probe:** "If an n-type semiconductor has a huge excess of mobile electrons compared to holes, does that mean the material as a whole is negatively charged?"
- **Characteristic phrase:** "N-type material should be negatively charged overall, since it has extra electrons."
- **Trigger:** The word "excess electrons" (used to describe n-type material's majority carrier) is misread as implying an excess of total negative charge in the material, rather than an excess of one specific mobile carrier type balanced by fixed positive charge elsewhere.
- **Conflict evidence [P28]:** Every donor atom that gives up its extra electron to become a free conduction-band electron itself becomes a fixed, immobile positive ion, permanently embedded in the crystal lattice at that exact location — for every mobile electron created, there is exactly one fixed positive ion left behind. The total charge (mobile electrons plus fixed donor ions) sums to exactly zero; n-type material, measured with any external charge-detection instrument, shows exactly zero net charge, just like the undoped material it came from.
- **Bridge [P30]:** "Every mobile carrier created by doping is exactly balanced by a fixed, oppositely-charged ion left behind in the lattice. N-type material has excess mobile NEGATIVE carriers (electrons) exactly balanced by excess fixed POSITIVE ions (ionized donors) — the material as a whole remains perfectly electrically neutral, with zero net charge, despite the dramatic imbalance in which carrier type is doing the actual moving."
- **Replacement [P31]:** Doped semiconductors remain electrically neutral overall; "majority carrier" describes an imbalance in mobile carrier type, not a net charge on the bulk material.
- **Discrimination pairs [P33]:** A room with 100 people who each hold a red balloon on a string tied to the floor (fixed positive ions) and 100 free-floating blue balloons drifting around the room (mobile electrons) has exactly balanced red and blue — the room "has extra blue balloons visibly moving around" doesn't mean the room's total balloon count is unbalanced; n-type material's "extra mobile electrons" doesn't mean its total charge is unbalanced.
- **S6 repair path:** Present the fixed-ion-vs-mobile-carrier diagram (Section 2) directly, explicitly counting fixed positive donor ions against mobile electrons, and asking the student to compute the net charge (zero).

### MC-2: "N-type material has literally zero holes; p-type material has literally zero electrons"
- **Probe:** "Does n-type silicon have absolutely no holes present at all, or does it just have far fewer holes than electrons?"
- **Characteristic phrase:** "N-type means only electrons, no holes at all — p-type means only holes, no electrons at all."
- **Trigger:** The simplified "n-type = electrons, p-type = holes" shorthand, useful for a first pass, is taken as an absolute, exclusive statement rather than a majority/minority distinction.
- **Conflict evidence [P28]:** Both carrier types coexist in any real doped semiconductor — n-type material still has a small, nonzero hole concentration (the minority carrier), just dramatically smaller than its electron concentration; this minority carrier population, while small, plays a genuinely important role in device behavior (particularly at p-n junctions, developed in the next concept), and is never literally zero in any real material at any nonzero temperature.
- **Bridge [P30]:** "N-type and p-type labels describe which carrier type is the MAJORITY (vastly more numerous), not which carrier type is the ONLY one present. Both electrons and holes exist in every real doped semiconductor; doping shifts their relative populations dramatically, but never eliminates either type entirely."
- **Replacement [P31]:** N-type/p-type describes majority-vs-minority carrier populations, both of which are always present and nonzero, not the exclusive presence of only one carrier type.
- **Discrimination pairs [P33]:** A country with a strong ethnic or linguistic majority group still has minority groups present, even if far less numerous — describing a country by its majority doesn't mean the minority is literally absent; n-type/p-type labeling works the same way for carrier populations.
- **S6 repair path:** Present the mass-action-law relation (n×p ≈ n_i²) conceptually, showing that even in heavily n-type material, p is small but never exactly zero.

### MC-3: "Doping increases both electron and hole concentrations together, proportionally"
- **Probe:** "If doping silicon with a donor impurity dramatically increases the electron concentration, does the hole concentration also increase, stay the same, or decrease?"
- **Characteristic phrase:** "Doping should make the material more conductive overall by increasing both types of carriers."
- **Trigger:** Assuming "doping increases conductivity" implies both underlying carrier populations increase together, rather than recognizing a genuine tradeoff relationship.
- **Conflict evidence [P28]:** The approximate relation n×p ≈ n_i² (a constant, for a given material and temperature) means that if doping increases n (electron concentration) far above its intrinsic value, p (hole concentration) must correspondingly DECREASE far below the intrinsic value to keep the product roughly constant — in heavily n-type doped silicon, the minority hole concentration can actually be many orders of magnitude LOWER than in pure, undoped silicon, not higher.
- **Bridge [P30]:** "Doping doesn't increase both carrier types together — it trades one off against the other. Increasing the majority carrier concentration (via doping) actually suppresses the minority carrier concentration below even its original intrinsic value, following the approximate relationship n×p ≈ n_i² (roughly constant for a given material and temperature). More of one type genuinely means less of the other."
- **Replacement [P31]:** Doping trades majority against minority carrier concentration (following n×p ≈ n_i², approximately constant); it does not increase both carrier types simultaneously.
- **Discrimination pairs [P33]:** In many chemical equilibrium reactions, increasing the concentration of one product shifts the reaction to reduce a related species' concentration, keeping an equilibrium constant roughly fixed — carrier concentrations in a doped semiconductor follow an analogous constant-product relationship.
- **S6 repair path:** Present the n×p ≈ n_i² relationship explicitly with example numbers (intrinsic n_i ≈ 10¹⁰; heavily n-type doped n ≈ 10¹⁷, implying p ≈ 10³ — dramatically below intrinsic), making the tradeoff concrete.

---

## 5. Explanation Library

**Explanation A — Donor and acceptor impurities: one extra electron, one missing electron (procedural):**
"Silicon has 4 valence electrons and needs exactly 4 covalent bonds to its neighbors. Substitute a pentavalent impurity (5 valence electrons, like phosphorus): 4 electrons form the required bonds, and the 5th is left over, only weakly bound, easily freed by thermal energy at room temperature — this is n-type doping, producing an excess mobile electron per donor atom. Substitute a trivalent impurity (3 valence electrons, like boron): only 3 bonds can form, leaving one bond incomplete — an electron from a neighboring silicon atom readily fills this vacancy, creating a hole — this is p-type doping, producing an excess mobile hole per acceptor atom."

**Explanation B — Overall neutrality despite carrier imbalance (conceptual):**
"Every donor atom that releases its extra electron becomes a fixed, immobile, positively-charged ion, permanently embedded at that exact lattice site — it cannot move, unlike the electron it released. Every acceptor atom that accepts an extra electron becomes a fixed, immobile, negatively-charged ion. In both cases, the fixed ion charge exactly balances the mobile carrier charge created, so the material as a whole always remains precisely electrically neutral — 'n-type' and 'p-type' describe an imbalance in which carrier type is mobile, never an imbalance in total charge."

**Explanation C — The majority-minority tradeoff (conceptual, mass-action preview):**
"Doping doesn't just add carriers of one type — it actively suppresses the other type, following an approximate relationship where the product of electron and hole concentrations (n×p) stays roughly constant, equal to the square of the intrinsic concentration. This means heavily n-type doped silicon has not just abundant electrons, but genuinely scarce holes — scarcer, in fact, than in undoped silicon. This majority/minority tradeoff, not a simple 'more of everything' picture, is essential to understanding how p-n junctions (the next concept but one) actually work."

---

## 6. Analogy Library

**Primary analogy — A marching band with one extra or one missing member:**
Imagine a marching band where every formation position is normally filled by exactly the right number of paired members, standing in tight, complete rows. Introduce one "extra" person into one row (a donor atom, with one member having a free hand no partner is grabbing) — that free hand (the extra electron) can wander off relatively easily, distinct from that row's tightly-locked formation. Alternatively, remove one member from a row that needs exactly the right count (an acceptor atom), leaving one formation slot empty (a hole) — nearby members constantly shuffle to try to fill that gap, and the gap itself seems to wander through the formation.

**Breaking point:** A marching band's "extra hand" or "missing member" doesn't leave behind any analog of a fixed, charged ion the way a real donor or acceptor atom does — the analogy captures the "one extra vs. one missing" structural idea well, but the overall-neutrality point (Explanation B) requires the more technical fixed-ion framing to be fully accurate.

**Anti-analogy:** Do NOT say "n-type material is just negatively charged material, and p-type is positively charged material" — this directly reinforces MC-1; always immediately specify that both types remain exactly electrically neutral overall, with only the mobile-carrier-type balance shifted.

---

## 7. Demonstration Library

**Demo 1 — Ball-and-stick donor/acceptor lattice build:**
Physically build a small silicon lattice segment (ball-and-stick model), then substitute one donor atom (showing the 5th, loosely-bound electron) and, separately, one acceptor atom (showing the incomplete, vacant bond) — directly grounding Explanation A.

**Demo 2 — Fixed ion vs. mobile carrier charge-balance count:**
Present a diagram with a specific number of donor atoms (each becoming a fixed positive ion) and the resulting equal number of mobile electrons, having students explicitly sum the total charge to verify neutrality — directly targeting MC-1.

**Demo 3 — Majority/minority concentration table:**
Present real approximate numbers (intrinsic n_i ≈ 10¹⁰ cm⁻³; heavily n-type doped n ≈ 10¹⁷ cm⁻³, implied p ≈ 10³ cm⁻³) and have students verify the approximate n×p ≈ n_i² relationship, directly targeting MC-3.

---

## 8. Discovery Lesson

**Opening (5 min):** "Pure silicon barely conducts electricity at room temperature — you learned that in the last concept. Engineers solved this problem by deliberately adding an incredibly tiny amount of a different element — sometimes as little as one atom per billion — and it can increase conductivity by many orders of magnitude. What do you think that added element actually does?"

**Exploration (15 min):**
- Introduce Explanation A (donor/acceptor mechanism) using Demo 1 (ball-and-stick lattice build), covering both n-type and p-type doping.
- Run Demo 2 (fixed ion vs. mobile carrier charge-balance count), directly targeting MC-1 (net charge misconception).

**Synthesis (10 min):**
- Present Explanation B (overall neutrality) explicitly, reinforcing the charge-balance point.
- Run Demo 3 (majority/minority concentration table), directly targeting MC-3 (both carriers increase together) and MC-2 (minority carrier is literally zero).

**Closure:** "Doping is the single engineering trick that turns a nearly useless pure semiconductor into the foundation of every modern electronic device — and it works not by adding charge to the material, but by deliberately, precisely shifting the balance between two carrier types that are always both present, while keeping the material perfectly neutral throughout."

---

## 9. Teaching Actions

*(session_cap = 5 actions)*

**TA-1 [EXPLAIN + DEMONSTRATE]:** Deliver Explanation A (donor/acceptor mechanism) alongside Demo 1 (ball-and-stick lattice build), covering both n-type and p-type doping mechanisms.

**TA-2 [CHALLENGE]:** Demo 2 (fixed ion vs. mobile carrier charge-balance count) directly confronting MC-1 (net charge misconception), reinforced by Explanation B.

**TA-3 [EXPLAIN]:** Directly probe MC-2 (n-type has zero holes), clarifying the majority/minority framing explicitly.

**TA-4 [DEMONSTRATE + CHALLENGE]:** Demo 3 (majority/minority concentration table) directly confronting MC-3 (both carriers increase together), reinforced by Explanation C.

**TA-5 [SYNTHESIS]:** Consolidation exercise: given a specific dopant (e.g., arsenic, gallium), have students determine the resulting carrier type (n or p), majority/minority carriers, and confirm overall neutrality — priming for the p-n junction concept ahead.

---

## 10. Voice Teaching

**Opening:**
"Pure silicon barely conducts electricity at room temperature — you already know that. Here's the engineering trick that changes everything: add an almost unbelievably tiny amount of a different element — sometimes just one atom for every billion silicon atoms — and conductivity can jump by many orders of magnitude. What do you think that one-in-a-billion added atom actually does?"

**At the donor/acceptor explanation:**
"Silicon has four valence electrons and needs exactly four bonds to its neighbors. Swap in an atom with five valence electrons instead — phosphorus, say — and four of its electrons form the required bonds just fine, but the fifth one has nothing to bond to. It's barely held on at all, and at room temperature, it easily breaks free to become a mobile conduction electron. That's n-type doping. Now swap in an atom with only three valence electrons — boron — and it can only form three of the four required bonds. One bond stays incomplete, a vacancy — a hole — that a neighboring electron will readily jump in to fill. That's p-type doping."

**At the neutrality clarification:**
"Here's the part almost everyone gets wrong at first: does n-type silicon end up negatively charged overall, since it's got all these extra mobile electrons? No. Every single donor atom that releases its extra electron becomes a fixed, permanently embedded positive ion, stuck right where it is in the lattice. One mobile negative electron created, one fixed positive ion left behind, every single time. Add it all up, and the material is exactly, perfectly electrically neutral — just like it was before doping. What's changed isn't the total charge. It's which carrier type is doing the actual moving."

---

## 11. Assessment

**Mastery gate:** Student correctly determines the carrier type (n or p) resulting from a given dopant, correctly explains why doped semiconductors remain electrically neutral overall, and correctly explains the majority/minority carrier tradeoff. Score ≥ 70%.

**FA-1 — Dopant-to-carrier-type mapping:**
*Q: Silicon is doped with gallium (3 valence electrons). What carrier type results, and why?*
Expected: p-type — gallium, with only 3 valence electrons, can form only 3 of silicon's required 4 covalent bonds, leaving an incomplete bond (a hole) that is readily filled by a neighboring electron, creating excess mobile holes.
Threshold: Correct carrier type (p-type) with correct valence-electron-count reasoning.

**FA-2 — Overall neutrality:**
*Q: An n-type semiconductor has a huge excess of mobile electrons compared to holes. Is the material as a whole electrically charged? Explain.*
Expected: No — the material remains exactly electrically neutral overall; every donor atom that releases a mobile electron becomes a fixed, immobile positive ion, and this fixed positive charge exactly balances the mobile electron charge.
Threshold: Must correctly say "no, neutral" and cite the fixed-ion balancing mechanism.

**FA-3 — Majority/minority tradeoff:**
*Q: If doping silicon with a donor impurity increases the electron concentration from ~10¹⁰ to ~10¹⁷ per cm³, what happens to the hole concentration? Explain using the approximate relationship between electron and hole concentrations.*
Expected: The hole concentration decreases, roughly to ~10³ per cm³ (well below the original intrinsic ~10¹⁰), since the approximate relation n×p ≈ n_i² keeps the product roughly constant — increasing n forces p to decrease correspondingly.
Threshold: Must correctly state hole concentration decreases (not increases or stays the same) and reference the roughly-constant-product relationship.

**FA-4 — Majority vs. exclusive presence:**
<br>*Q: Does p-type silicon have any electrons present at all, or only holes? Explain.*
Expected: Both carrier types are always present — p-type silicon has holes as the majority carrier and a small but nonzero electron concentration as the minority carrier; electrons are never literally absent.
Threshold: Must correctly say both are present and correctly identify majority vs. minority.

**Confidence calibration:** After FA-2, students rate confidence before revealing the answer; students confident but wrong are walked through the fixed-ion-vs-mobile-carrier charge count (Demo 2) again explicitly before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Given a specific dopant's valence-electron count, determine the resulting carrier type. Explain why a doped semiconductor remains electrically neutral despite having a majority carrier imbalance." Expected: 5-valence → n-type; 3-valence → p-type; fixed ion charge balances mobile carrier charge.

---

## 12. Recovery Notes

**S3:** Student has the electron-hole pair concept (from the prerequisite concept) secure but hasn't yet connected it to the doping mechanism. Begin entirely with the ball-and-stick lattice build (Demo 1), physically substituting a donor and then an acceptor atom, before introducing any charge-balance or majority/minority terminology.

**S4:** Student assumes doped material carries net charge (MC-1) or that minority carriers are literally absent (MC-2). Run Demo 2 (fixed ion vs. mobile carrier charge count) repeatedly with different doping levels until the neutrality result becomes automatic; explicitly restate the majority/minority (not exclusive) framing at every opportunity.

**S6:** Student is anxious about the abstractness of "fixed ions" and "mobile carriers" as separate concepts. Anchor entirely in the marching-band analogy (Section 6) and the physical ball-and-stick model (Demo 1) before introducing symbolic notation (n, p, n_i) or the mass-action-law relationship.

**S7:** Student is intellectually ready for challenge-first entry given this concept's Expert difficulty — open directly with the majority/minority tradeoff puzzle ("if you add millions of electrons, does the hole count stay the same, go up, or go down? Most people guess wrong") before any donor/acceptor scaffolding.

---

## 13. Memory & Review

**Memory type:** Procedural (dopant-to-carrier-type mapping) plus conceptual (overall neutrality and the majority/minority tradeoff) — retrieval practice should test both the mapping skill and the two conceptual distinctions (neutrality despite imbalance; tradeoff not simultaneous increase).

**Spaced retrieval schedule:**
- Session + 1: "Given a dopant's valence-electron count, determine the resulting carrier type (n or p)."
- Session + 3: "Explain why a doped semiconductor remains electrically neutral overall despite a majority carrier imbalance."
- Session + 7: "Explain the majority/minority carrier tradeoff relationship in a doped semiconductor."

**Interleaving partners:** phys.mod.intrinsic-semiconductors (prerequisite — the electron-hole pair concept this concept deliberately unbalances), phys.mod.pn-junction (successor — joining n-type and p-type regions together).

---

## 14. Transfer Map

**Near transfer:** Applying the same donor/acceptor mechanism and neutrality reasoning to other semiconductor materials (germanium, gallium arsenide) doped with analogous impurities, using the same valence-electron-counting logic.

**Far transfer:** Semiconductor device manufacturing and integrated circuit design (precisely controlled doping profiles are the foundation of transistor fabrication), materials engineering generally (deliberately introducing controlled impurities to dramatically alter a bulk material's properties, a pattern also seen in metallurgy's alloying and in glass/ceramics doping for optical properties), and chemical equilibrium reasoning (the mass-action-law-like n×p ≈ n_i² relationship directly parallels equilibrium constant relationships in chemistry).

**Structural abstraction:** "Introducing a small, controlled perturbation to a system can dramatically shift the balance between two coupled, tradeoff-linked quantities, without changing the system's overall neutral/balanced status." This pattern — deliberate perturbation producing a large majority/minority shift while preserving an overall conservation law (charge neutrality) — recurs in chemical equilibrium, population genetics (allele frequency shifts under selection while total population remains fixed), and other coupled-quantity systems.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.mod.intrinsic-semiconductors is necessary and sufficient — doping is precisely the deliberate disruption of the n = p equality established there.
- **Unlock readiness:** phys.mod.pn-junction directly depends on n-type and p-type material being independently understood, since a p-n junction is formed by joining exactly these two doped material types together; sequencing as the immediate next concept is well-motivated.
- **Difficulty calibration:** Expert/Apply is well-calibrated — correctly applying the donor/acceptor mechanism, the neutrality principle, and especially the majority/minority tradeoff (a genuinely counter-intuitive result) together represent the most demanding applied-reasoning combination in the semiconductor sub-sequence so far, justifying the Expert difficulty and reduced mastery threshold (0.70).
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Physics KG's Modern Physics domain extension (semiconductor physics) design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
