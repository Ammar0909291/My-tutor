# Ionization Energy — `chem.period.ionization-energy`

## Identity

- **KG ID**: chem.period.ionization-energy
- **Subject**: Chemistry
- **Domain**: Periodic Table (chem.period)
- **Difficulty**: developing
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.modern-periodic-law
- **Unlocks**: chem.bond.ionic-bonding, chem.period.electron-affinity
- **Cross-links**: none

## Learning Objective

Students can define the first ionization energy (IE₁) and successive ionization energies; describe and explain trends across a period and down a group; explain anomalies at Group 2/13 (IE₁ dip at Group 13) and Group 15/16 (IE₁ dip at Group 16); use a log(IE) vs. ionization number graph to determine the number of valence electrons for an element; and link ionization energy to atomic radius and effective nuclear charge.

## Core Understanding

**First ionization energy (IE₁)**:
IE₁ is the minimum energy required to remove the most loosely held electron from one mole of gaseous atoms in the ground state to form one mole of gaseous cations:
M(g) → M⁺(g) + e⁻    ΔH = IE₁ (always positive — endothermic)

Units: kJ/mol (common) or eV (atomic physics). IE₁ is always positive (energy must be SUPPLIED to overcome nuclear attraction).

**Successive ionization energies (IE₁, IE₂, IE₃, ...)**:
Each successive IE removes the next electron. IEₙ > IEₙ₋₁ always — every electron removed means higher Zeff per remaining electron (fewer electrons to repel each other, same nuclear charge).
A **sharp jump** in the IE sequence reveals the valence shell boundary: once all valence electrons are removed, the next electron comes from an inner shell much closer to the nucleus → dramatically higher IE.
Example: Na (Group 1): IE₁ = 496, IE₂ = 4562 kJ/mol. IE₂/IE₁ ≈ 9. The 11-fold jump signals that the first electron (the one 3s valence electron) is easy to remove; the second requires removing from the n=2 core. This confirms Na has 1 valence electron → Group 1.

**Trend across a period (left to right): GENERALLY INCREASING**:
Across a period, Z increases at the same n → Zeff increases (same logic as atomic radius, but inverted: higher Zeff → cloud pulled closer → electron held more tightly → more energy required to ionize). Smaller atomic radius → higher IE (closer electron to higher-charge nucleus).

**Two anomalies in period 2 and 3**:

*Anomaly 1 — Group 13 < Group 2 (e.g., Al < Mg, B < Be)*:
Expected: IE₁ increases left to right. Observed: IE₁(Al) = 577 < IE₁(Mg) = 738 kJ/mol. Reason: Mg's outer electron is in 3s (lower energy, penetrates closer to nucleus); Al's is in 3p (higher energy, less penetrating, effectively shielded by the 3s² electrons). The 3p electron is easier to remove than the 3s electron despite Mg having lower Z. The subshell type matters, not just Z.

*Anomaly 2 — Group 16 < Group 15 (e.g., S < P, O < N)*:
Expected: IE₁(S) > IE₁(P). Observed: IE₁(S) = 999 < IE₁(P) = 1011 kJ/mol. Reason: P has the configuration 3s²3p³ — all three 3p electrons are in separate orbitals (Hund's rule), no spin-pairing repulsion. S has 3s²3p⁴ — one 3p orbital is doubly occupied; the paired electron experiences additional electron-electron repulsion from its partner in the same orbital → easier to remove → lower IE₁.

**Trend down a group: DECREASING**:
Down a group, new shells are added (higher n); outer electrons are further from the nucleus; inner shells provide substantial shielding. Despite increasing Z, Zeff experienced by the outermost electron changes only modestly — but the increased distance dominates, and IE falls (electron is easier to remove).

**Using successive IE data**:
If successive IEₙ values are given as a log graph or table:
- Gradual increase: electrons still in the same shell.
- Sudden large jump (factor of 3–10): shell boundary crossed → the number of electrons BEFORE the jump = number of valence electrons = group number.

## Mental Models

**The nuclear-gravity model**: ionization energy is the energy needed to launch an electron into orbit (escape velocity from the nucleus's gravitational well). Heavier nucleus (more protons) + shorter distance (smaller radius across a period) = deeper gravity well = harder to escape = higher IE. Further from nucleus (down a group) = shallower well = easier to escape.

**The shell-boundary cliff model for successive IEs**: plot log(IE) against ionization number. Within a shell, values climb gently (a gentle hill). Crossing into an inner shell is a cliff — a sudden steep jump. Reading the graph: count the electrons on the gentle slope before the cliff = valence electrons.

## Why Students Fail

1. **Anomaly at Group 13 is because Al is heavier**: students see more protons in Al (13) vs. Mg (12) and expect higher IE, ignoring the subshell effect (3p is higher energy and more shielded than 3s).
2. **Anomaly at Group 16 is because S is further left**: students note S (Group 16) is "more to the right" than P (Group 15) and expect higher IE without considering electron pairing repulsion.
3. **Jump in successive IE = number of electrons already removed**: students misread the graph as "the jump is at ionization number n = number of valence electrons," not recognising it means the (n+1)th electron comes from an inner shell, so n electrons before the jump are valence.

## Misconceptions

**MC-1 — IE increases monotonically across a period with no exceptions** (Type 5, instruction-induced: "Zeff increases → IE always increases" is taught before anomalies)
- *Mechanism*: the general trend is introduced, then anomalies are treated as footnotes; students apply the rule universally and fail on exam questions about B/Be or O/N pairs.
- *Diagnostic probe*: "Arrange the first ionization energies in order for the period 3 elements: Na, Mg, Al, Si, P, S, Cl, Ar. Note any deviations from the expected trend."
- *Characteristic phrase*: "IE₁ always increases from Na to Ar, so Al > Mg and S > P."
- *Repair*: Two dips interrupt the trend: Mg → Al drops (3p electron in Al is easier to remove than Mg's 3s electron, even though Z increases); P → S drops (S's paired 3p electron is easier to remove than P's half-filled 3p). Knowing WHY resolves both: subshell type (s vs. p) and pairing repulsion.

**MC-2 — The large jump in successive IEs = the ionisation number of the jump** (Type 4, notation-induced: "jump at IE₃ means 3 valence electrons")
- *Mechanism*: students read the graph as "the jump happens at position 3 → 3 valence electrons," confusing the position of the jump with the number of electrons before it.
- *Diagnostic probe*: "An element has successive IEs (kJ/mol): 578, 1817, 2745, 11578, 14831... Where is the big jump and how many valence electrons does it have?"
- *Characteristic phrase*: "The big jump is at IE₄, so the element has 4 valence electrons."
- *Repair*: the jump is BETWEEN IE₃ and IE₄. The electron involved in the jump (the 4th) is the first from an inner shell. Therefore, 3 electrons were in the valence shell → 3 valence electrons → Group 13 element (aluminium). The jump is between the last valence electron and the first core electron — count the electrons BEFORE the jump.

**MC-3 — IE decreases down a group because there are more electrons (more shielding is less effective)** (Type 5, instruction-induced: students learn "more shielding" but invert the logic)
- *Mechanism*: students know shielding is the key, but confuse "shielding reduces Zeff" with "shielding is worse further down the group." The truth is that shielding by inner shells is very effective and increases going down the group; Zeff experienced by the outermost electron barely changes.
- *Diagnostic probe*: "Compare IE₁ for Li (520 kJ/mol) and Cs (376 kJ/mol). Explain why Cs has a lower IE₁."
- *Characteristic phrase*: "Cs has lower IE₁ because it has so many more electrons that shielding is very poor — the electrons block each other from the nucleus."
- *Repair*: Cs has far more inner-shell electrons than Li, and those inner shells shield VERY effectively (σ ≈ 0.85 per inner-shell electron in Slater's rules). Zeff for the outer electron of Cs (~2.2) is barely higher than for Li (~1.3). The dominant effect is that Cs's outer electron is in n=6 (much further from the nucleus than Li's n=2 electron) — greater distance = weaker nuclear pull = lower IE. The distance effect, not worse shielding, is the primary reason.

## Analogies

**The launching rocket analogy**: ionization energy is the fuel needed to escape a planet's gravity well. A massive, compact planet (high Z, small radius) needs more fuel (higher IE). A distant moon (same mass, much further out — large n, well-shielded) needs less fuel. The Group 13 and 16 anomalies are like a planet with a weak outer crust — even though the planet is slightly more massive, its outermost layer is easier to break off.

**The elevator analogy for successive IEs**: removing electrons is like taking items off successive floors of a building. The top floors are far from the ground (easy to remove — low IE). Each floor removed brings you closer to the ground. The lobby (core electrons) has very heavy furniture that requires enormous effort to remove (massive jump in IE). The jump IS the boundary between the lobby (core) and the upper floors (valence).

## Demonstrations

**Demonstration 1 — Flame colours and ionization energies**
- Observe flame test colours for Li (crimson), Na (yellow), K (violet), Ca (orange-red). The photon energy of the flame emission colour is related to orbital energy gaps. Connect to ionization energy: higher IE for the valence electron → deeper orbital → higher-energy transitions → higher-frequency light. Li's higher IE₁ (520 vs. K's 419 kJ/mol) corresponds to higher-energy photon emission in the flame. This is a qualitative connection; the exact relationship requires quantum mechanics, but the directional trend is observable.

## Discovery Questions

1. "The successive ionization energies (kJ/mol) for an element are: 738, 1451, 7733, 10540, 13630, 18020, 21710. (a) After which ionisation does the large jump occur? (b) How many valence electrons does this element have? (c) Name the element." (Targets: (a) Large jump between IE₂ (1451) and IE₃ (7733) — approximately 5× increase. (b) 2 valence electrons — the first two are removed easily; the third requires energy appropriate for a core electron. (c) 2 valence electrons → Group 2. The successive IEs match magnesium (Mg, Z=12). Mg has [Ne]3s² → IE₁ and IE₂ remove 3s electrons; IE₃ removes from n=2 core.)
2. "Explain why O (IE₁ = 1314 kJ/mol) has a LOWER first ionization energy than N (IE₁ = 1402 kJ/mol), even though O has a higher nuclear charge." (Targets: N has configuration 2s²2p³ — Hund's rule gives one electron per 2p orbital, no spin pairing, no extra repulsion. O has configuration 2s²2p⁴ — one 2p orbital has two electrons with the same spin forced together (spin-pairing repulsion). The paired electron in O is easier to remove because the pairing repulsion raises its energy slightly, even though Z(O) > Z(N). The anomaly: spin-pairing repulsion > the Zeff advantage.)
3. "First ionization energies for period 3: Na=496, Mg=738, Al=577, Si=786, P=1011, S=999, Cl=1251, Ar=1521 kJ/mol. (a) Sketch a rough graph. (b) Mark the two anomalies. (c) Explain each anomaly." (Targets: (a/b) graph decreases at Mg→Al (anomaly 1) and P→S (anomaly 2) against the general increasing trend. (c) Mg→Al: Al's outer electron is in 3p (higher energy, shielded by 3s²) vs. Mg's 3s (lower energy, closer to nucleus) → Al's electron easier to remove despite higher Z. P→S: S has a paired 3p electron (extra repulsion) while P has all three 3p orbitals singly occupied → paired electron in S easier to remove despite higher Z.)

## Teaching Sequence

1. Review from chem.period.modern-periodic-law: Zeff concept; block structure; Hund's rule from electronic configuration.
2. Define IE₁ precisely (gaseous atoms, molar, endothermic). Introduce successive IEs and the shell-boundary jump concept. Work Discovery Question 1.
3. General trend across a period: Zeff increases, radius decreases → IE generally increases. Then introduce the two anomalies (Group 13 and 16) with their mechanistic explanations. Address MC-1. Work Discovery Question 2 and 3.
4. Trend down a group: radius effect dominates over modest Zeff change → IE decreases. Address MC-3.
5. Connect to atomic radius: smaller radius ↔ higher IE (inverse relationship).

## Tutor Actions

- If student says IE increases monotonically across a period → MC-1 repair: two dips — Mg→Al (3p higher energy than 3s) and P→S (paired electron repulsion in Group 16).
- If student reads "jump at IE₃ = 3 valence electrons" → MC-2 repair: count electrons BEFORE the jump; the jump is between the last valence and first core electron.
- If student says IE decreases down a group because "shielding gets worse" → MC-3 repair: inner-shell shielding is actually very effective (σ ≈ 0.85); Zeff barely changes down the group; the dominant factor is the increasing distance (higher n = further from nucleus = weaker pull).
- Advance when student can draw the period 3 IE₁ graph correctly (including both anomalies with mechanisms), read a successive IE table to identify valence electron count, and explain the group trend in terms of distance not shielding quality.

## Voice Teaching Notes

"Two exceptions to memorise: Mg→Al drops (3p over 3s), P→S drops (paired electron). Before any IE question, check: is the comparison crossing one of these two boundaries? If yes, the trend reverses."

"Successive IEs: find the cliff. Count what comes before the cliff. That's your valence electrons. The element's group number."

## Assessment Signals

**Mastery gate**:
1. Student correctly states the general trend across a period (IE increases) and identifies the two anomalies (B/Be and O/N equivalents) with correct mechanistic explanations.
2. Student correctly states the trend down a group (IE decreases) with the distance explanation.
3. Student correctly reads a successive IE table to determine the number of valence electrons.
4. Student correctly explains the connection between atomic radius and IE (smaller radius = higher IE, same direction as Zeff).

**FRAGILE signal**: student gives the correct trend and anomalies but cannot explain which effect (subshell type vs. pairing repulsion) applies to which anomaly — surface pattern without mechanism.

**MISCONCEIVING signal**: student predicts IE₁(Al) > IE₁(Mg) or IE₁(S) > IE₁(P). Address MC-1 with the actual values before any trend analysis.

## Tutor Recovery Strategy

If stuck:
1. For Mg→Al anomaly: "What is Mg's outermost electron in? 3s. What is Al's outermost electron in? 3p. Which orbital is higher in energy? 3p (it's further from the nucleus on average; shielded by the 3s² pair). The 3p electron is easier to remove — not because Z fell, but because the electron is in a higher-energy, more-shielded orbital."
2. For P→S anomaly: "Write P: [Ne]3s²↑3p↑ ↑ ↑ (three separate orbitals, each with one electron). Write S: [Ne]3s²↑↓3p↑↓ ↑ ↑ — that first 3p now has TWO electrons. They repel each other. The doubly occupied orbital's electron has extra repulsion energy — it's easier to remove. Despite S having one more proton than P, the spin-pairing penalty outweighs the Zeff advantage."
3. For successive IE shell jump: "Go to the table. Find where IE jumps by a factor of 3 or more. Call that jump position 'n'. How many electrons are listed BEFORE the jump? That many electrons were in the valence shell. Element is in group = that many valence electrons."

## Memory Hooks

- **IE increases across a period (in general). Two dips: Group 2→13 (3p > 3s energy) and Group 15→16 (spin-pairing in doubly occupied orbital).**
- **IE decreases down a group (distance effect: outer electron further from nucleus).**
- **Successive IEs: sharp jump between last valence and first core electron. Count electrons before the jump = valence electrons.**
- **Smaller atom → higher IE: radius and IE trend in opposite directions across the table.**

## Transfer Connections

- **chem.period.atomic-radius**: atomic radius and IE are inversely linked — across a period, radius decreases as IE increases (both driven by rising Zeff). Down a group, radius increases as IE decreases. This node and the radius node together explain ALL the major periodic trends via a single Zeff + distance framework.
- **chem.period.electron-affinity**: electron affinity follows analogous trends with similar anomalies; the mechanism is the same (Zeff, subshell type, pairing repulsion). Mastery of IE anomalies provides the template for EA anomalies.

## Cross-Subject Connections

- **Physics (atomic spectra and photoelectron spectroscopy)**: PES (photoelectron spectroscopy) directly measures IE values from binding energies. The PES spectrum of an atom shows distinct peaks for each subshell; peak energy = IE for that subshell. This experimentally validates both the shell structure and the IE values taught here.
- **Materials science (work function)**: the work function of a metal surface (the energy to eject an electron from the surface) is the solid-state analogue of IE. Alkali metals (low IE₁) have low work functions → best photocathode materials → used in photodetectors and night-vision equipment.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.period.ionization-energy`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.period.ionization-energy` as of 2026-07-23.

## Curriculum Feedback

The two anomalies (Group 2/13 and Group 15/16) are the highest-frequency exam targets in this node — they are asked in virtually every standardised examination (CBSE, IB, A-Level, AP, NCERT). Both should be explicitly addressed before any assessment. The successive IE → valence electron determination is a universally useful data-handling skill that many curricula test in novel contexts (unidentified elements). This node correctly unlocks electron affinity, which uses the same anomaly mechanisms in the opposite direction.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
