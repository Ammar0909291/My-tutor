# Electrochemical Series and Activity Series — `chem.redox.activity-series`

## Identity
- **KG ID**: chem.redox.activity-series
- **Subject**: chemistry
- **Domain**: chem.redox
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.redox.balancing
- **Unlocks**: chem.elect.galvanic-cell

## Learning Objective
Use standard electrode potentials (E°) to predict the spontaneity of redox reactions, determine the EMF of electrochemical cells, and apply the activity series to explain displacement reactions between metals and aqueous metal ions.

## Core Understanding
**Standard electrode potential (E°)**: the potential of a half-cell measured relative to the Standard Hydrogen Electrode (SHE, E° = 0.00 V by definition) under standard conditions (298 K, 1 mol dm⁻³ solutions, 100 kPa gas).

**Standard Hydrogen Electrode (SHE)**: H⁺(aq, 1 mol dm⁻³) | H₂(g, 100 kPa) | Pt. The Pt electrode is inert; H₂ is bubbled over it. E° ≡ 0.00 V by international convention.

**The electrochemical series**: all half-reactions written as REDUCTIONS (gains of electrons), ranked from most negative E° (strongest reducing agent at top) to most positive E° (strongest oxidising agent at bottom).

Selected values (reduction half-reactions):
- Li⁺ + e⁻ → Li, E° = −3.04 V (strongest common reducing agent)
- Zn²⁺ + 2e⁻ → Zn, E° = −0.76 V
- Fe²⁺ + 2e⁻ → Fe, E° = −0.44 V
- Pb²⁺ + 2e⁻ → Pb, E° = −0.13 V
- 2H⁺ + 2e⁻ → H₂, E° = 0.00 V (reference)
- Cu²⁺ + 2e⁻ → Cu, E° = +0.34 V
- Ag⁺ + e⁻ → Ag, E° = +0.80 V
- F₂ + 2e⁻ → 2F⁻, E° = +2.87 V (strongest common oxidising agent)

**Predicting spontaneity**: for a cell, E°cell = E°cathode − E°anode (reduction potential of the more positive half-cell minus the reduction potential of the more negative half-cell). If E°cell > 0, the reaction is spontaneous under standard conditions. The half-cell with the MORE POSITIVE E° is cathode (reduction); the less positive (or more negative) is anode (oxidation).

**Displacement reactions**: a metal will displace a metal ion from solution only if the reducing metal is ABOVE the displaced metal in the activity series (more negative E°).
- Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s): E°cell = +0.34 − (−0.76) = +1.10 V > 0 ✓
- Cu(s) + ZnSO₄(aq) → no reaction: E°cell = −0.76 − (+0.34) = −1.10 V < 0 ✗
- Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g): E°cell = 0.00 − (−0.44) = +0.44 V > 0 ✓
- Cu(s) + 2HCl(aq) → no reaction: E°cell = 0.00 − (+0.34) = −0.34 V < 0 ✗

**Thermodynamic relationship**: ΔG° = −nFE°cell. Spontaneous cell (E°cell > 0) → ΔG° < 0. Relationship links electrode potentials to Gibbs energy.

**Activity series (metals only, by reactivity)**: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Hg > Ag > Pt > Au. Metals above H displace H₂ from dilute acid; below H do not.

## Mental Models
**The seesaw of oxidising/reducing power**: the electrochemical series is a seesaw. The further a metal is to the top (most negative E°), the stronger it is as a reducing agent — it readily loses electrons. The further to the bottom (most positive E°), the stronger it is as an oxidising agent. The STRONGER reducing agent in a pair always reduces the weaker — it "pushes" electrons to the stronger oxidising agent.

**The "uphill electrons" rule**: electrons always flow from the more negative half-cell to the more positive half-cell spontaneously — like water flowing downhill. E°cell measures how far "downhill" the electrons travel; the bigger the drop, the larger the driving force.

## Why Students Fail
Students subtract electrode potentials in the wrong order (anode − cathode) or reverse the sign of the anode half-cell, giving the wrong sign for E°cell and the wrong spontaneity prediction. The formula E°cell = E°cathode − E°anode requires both values as written REDUCTION potentials — the anode value is subtracted, not negated, before adding.

Students also confuse the activity series order with reactivity in oxidation; the metal at the TOP of the series (most negative E°) is the BEST reducing agent (most easily oxidised), not the most stable.

## Misconceptions
- **MC-1 (Type 4 — notation-induced)**: "E°cell = E°cathode + E°anode, adding the oxidation potential of the anode." Probe: "Cu²⁺/Cu has E° = +0.34 V and Zn²⁺/Zn has E° = −0.76 V. Calculate E°cell for a Zn–Cu cell." Characteristic phrase: "flip the sign for the anode and add." Intervention: the IUPAC convention writes ALL half-reactions as reductions; E°cell = E°reduction(cathode) − E°reduction(anode) = +0.34 − (−0.76) = +1.10 V. Flipping the sign and adding gives the same numerical answer but hides the reasoning and causes errors when both potentials have the same sign. Subtract reduction potentials; never flip then add — these are NOT separate "oxidation potentials."
- **MC-2 (Type 5 — instruction-induced)**: "A more reactive metal always has a more positive E°." Probe: "Which has the higher (more positive) E°: Na or Au?" Characteristic phrase: "Na reacts with water vigorously, so it has a high E°." Intervention: MORE reactive metals (Na, K, Li) are STRONGER reducing agents; they are placed at the TOP of the electrochemical series with the MOST NEGATIVE E° (Na: −2.71 V). A positive E° means the species is EASILY reduced (a good oxidising agent, a less reactive metal). "High E°" = stable, noble, unreactive metal. The sign is counterintuitive — it reverses the everyday meaning of "high."
- **MC-3 (Type 2 — perceptual intuition)**: "Copper wire in ZnSO₄ solution would react because copper is a visible, reactive-looking metal." Probe: "Predict whether Cu(s) will displace Zn²⁺ from ZnSO₄(aq)." Characteristic phrase: "metals always react with metal salt solutions." Intervention: Cu(E°=+0.34 V) has a MORE positive E° than Zn²⁺/Zn (−0.76 V) — so Cu is a WEAKER reducing agent than Zn. Cu cannot reduce Zn²⁺ to Zn; only the stronger reducing agent can displace the weaker one. No reaction occurs. The electrochemical series, not appearance, is the reliable predictor.

## Analogies
**Valid**: the electrochemical series as a height ranking on a cliff. Electrons are pebbles. A pebble (electron) thrown from the top of the cliff (most negative E°, e.g. Li) falls furthest and does most work. Electrons only flow spontaneously DOWNHILL — from high-energy metals (top) to low-energy metal ions (bottom). You cannot push a pebble uphill without external energy (ΔG° > 0).

## Demonstrations
**Metal displacement series**: copper wire in silver nitrate solution (Ag⁺ deposits as silver crystals; blue Cu²⁺ forms); zinc in copper sulphate (pink copper deposits, blue fades); iron nail in copper sulphate (copper deposits). Show no reaction for copper in zinc sulphate. The visual colour changes and metal depositions make the spontaneity rule concrete.

## Discovery Questions
1. "A cell is constructed using Fe/Fe²⁺ (E° = −0.44 V) and Ag/Ag⁺ (E° = +0.80 V) half-cells. (a) Which is cathode and which is anode? (b) Calculate E°cell. (c) Write the overall cell equation. (d) Would adding more Fe²⁺ to the Fe half-cell increase or decrease E? Explain qualitatively using Le Chatelier's principle."
2. "Explain why magnesium dissolves readily in dilute hydrochloric acid but copper does not. Use E° values to support your answer and calculate E°cell for both reactions."

## Teaching Sequence
1. Define standard conditions and the Standard Hydrogen Electrode (E° = 0 V by convention).
2. Introduce the electrochemical series — all as reduction half-reactions; practise reading the table.
3. Identify cathode and anode from E° values (most positive = cathode).
4. Calculate E°cell = E°cathode − E°anode; test spontaneity from the sign.
5. Apply to displacement reactions: metal displaces another if above it in the series.
6. Activity series: metals that displace H₂ from dilute acid (above H, E° < 0).
7. Thermodynamic link: ΔG° = −nFE°cell (qualitative only at this level).

## Tutor Actions
- **If student subtracts in wrong order**: write the formula explicitly: "E°cell = E°cathode − E°anode. The cathode is the MORE POSITIVE electrode. Write cathode value first, then subtract anode." Compute together with Zn–Cu example (+0.34 minus −0.76 = +1.10 V).
- **If student confuses reactive = high E°**: ask "what does a negative E° mean about that metal's preference — to exist as an atom or as an ion?" (as an atom — so it readily loses electrons — so it's reactive). Draw the arrow: more negative E° → lower on the energy scale for the ion → metal easily oxidised.
- **FRAGILE sign**: can state that the more positive E° electrode is cathode but cannot apply this to a novel pair of half-cells or reverses the formula.

## Voice Teaching Notes
The common point of breakdown is the direction of subtraction in E°cell. In a voice session, give a new half-cell pair and ask the student to announce "cathode" and "anode" first, then walk through the subtraction out loud. Many students recite the formula correctly but swap the values when applying it — the spoken walkthrough exposes this instantly.

## Assessment Signals
- **Green**: identifies cathode/anode from E° values; calculates E°cell correctly; predicts spontaneity from sign; explains displacement reactions using electrode potential comparison; correctly identifies which metals displace H₂ from dilute acid.
- **Amber**: correct cathode/anode identification but arithmetic error in E°cell (often wrong sign for anode); or correct formula stated but reversed when applied.
- **Red**: believes more reactive metals have more positive E°; adds rather than subtracts electrode potentials; says copper reacts with zinc sulphate.
- **Probe**: "The half-cells Sn²⁺/Sn (E° = −0.14 V) and Pb²⁺/Pb (E° = −0.13 V) are set up as a cell. Predict which is cathode, calculate E°cell, and state whether the reaction is spontaneous."

## Tutor Recovery Strategy
If student cannot identify cathode/anode: start with a single rule — "the half-cell that GAINS electrons is cathode; the one that LOSES electrons is anode. The half-cell with the MORE POSITIVE E° more readily gains electrons (the ion more readily gets reduced) — so it's cathode." Reduce to: bigger number → cathode → E°cell = bigger − smaller → positive → spontaneous.

## Memory Hooks
- **E°cell formula**: "Cathode minus Anode. Positive result → spontaneous."
- **Activity series direction**: "Li, K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Hg, Ag, Pt, Au — most reactive (most negative E°) to least."
- **Displacement rule**: "Above displaces below in the activity series. A metal displaces H₂ only if above H in the series."
- **SHE**: "Standard Hydrogen Electrode = 0.00 V by definition. All other potentials relative to it."

## Transfer Connections
- **chem.elect.galvanic-cell**: the activity series and E°cell calculation are the conceptual core of galvanic cell design; galvanic cells apply these values to harness spontaneous redox reactions as electrical energy.

## Cross-Subject Connections
- **Materials science**: the activity series explains galvanic corrosion — when two metals are in electrical contact in an electrolyte (e.g. Fe and Cu in sea water), the metal with the more negative E° corrodes preferentially (sacrificial anode principle; zinc used to protect steel ship hulls).
- **Environmental chemistry**: standard electrode potentials explain the corrosion of iron infrastructure (E°(Fe²⁺/Fe) = −0.44 V < 0) and the thermodynamic feasibility of various industrial reduction processes.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.redox.activity-series`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.redox.activity-series` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
