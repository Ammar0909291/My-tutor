# Physical Properties of Crystalline Solids — `chem.solid.properties`

## Identity
- **KG ID**: chem.solid.properties
- **Subject**: chemistry
- **Domain**: chem.solid
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.solid.defects, chem.bond.metallic-bonding
- **Unlocks**: (none — terminal node)

## Learning Objective
Explain the electrical conductivity, thermal conductivity, hardness, brittleness, and optical properties of ionic, metallic, molecular, and covalent network solids from their bonding and structure; predict how crystal defects and band gaps affect these properties; distinguish NTC and PTC semiconductors.

## Core Understanding
**Classifying solid types by bonding**:
Four types of crystalline solids, each with distinct physical properties arising directly from the bonding:
1. **Metallic solids**: positive ion cores in a sea of delocalised electrons.
2. **Ionic solids**: alternating cation and anion lattice; electrostatic forces hold the lattice.
3. **Covalent network (macromolecular) solids**: all atoms covalently bonded throughout; e.g. diamond, silicon, SiO₂, SiC.
4. **Molecular solids**: discrete covalent molecules held by intermolecular forces (London, dipole-dipole, H-bonds); e.g. ice, I₂, glucose, most organic solids.

**Electrical conductivity**:
- **Metallic**: HIGH conductivity. The delocalised electron "sea" carries charge freely; electrons move under an applied electric field with minimal resistance. Conductivity DECREASES with increasing temperature (more thermal vibration → more electron scattering → more resistance = "PTC-like" behaviour — though real metallic behaviour is not called PTC, the trend is the same). Example: copper σ ≈ 6×10⁷ Ω⁻¹m⁻¹.
- **Ionic**: essentially zero conductivity in the SOLID STATE (ions fixed in lattice positions cannot carry current; the electron clouds of ions do not overlap to allow electron transport). In the MOLTEN or DISSOLVED state: excellent conductivity (free ions can migrate). Exception: some ionic crystals conduct by ION TRANSPORT at high temperatures through defects (Schottky or Frenkel sites provide mobile ions — solid electrolytes, e.g. ZrO₂ doped with Y₂O₃ conducts O²⁻ ions in fuel cells).
- **Covalent network (insulators and semiconductors)**:
  - DIAMOND: zero conductivity. All electrons tightly held in localised σ C–C bonds; large band gap (5.5 eV) → no electrons promoted to conduction band at room temperature → electrical insulator.
  - SILICON/GERMANIUM: INTRINSIC SEMICONDUCTOR. Smaller band gap (Si: 1.12 eV; Ge: 0.66 eV) → a few electrons thermally promoted to conduction band, leaving holes in the valence band. Both electrons (conduction band) and holes (valence band) carry charge.
  - DOPED SEMICONDUCTORS (from chem.solid.defects extension): n-type (e.g. Si + P → extra electrons); p-type (e.g. Si + B → extra holes); see chem.mod.semiconductor context from phys.mod.*.
- **Molecular solids**: essentially zero conductivity. Electrons localised in covalent bonds within each molecule; no mechanism for charge transport between molecules.

**NTC vs. PTC semiconductors**:
- **NTC (Negative Temperature Coefficient) semiconductors**: conductivity INCREASES with temperature. More thermal energy → more electrons promoted across the band gap → more charge carriers → better conductivity. Pure (intrinsic) semiconductors: Si, Ge. Also thermistors (NTC thermistors: resistance decreases with temperature → used in temperature sensors).
- **PTC (Positive Temperature Coefficient) semiconductors/materials**: conductivity DECREASES with temperature (or resistance increases). Typical of metals (increased phonon scattering at higher T) and also certain specially doped ceramic semiconductors (BaTiO₃ above the Curie temperature — an anomalous PTC behaviour used in self-regulating heaters and fuses).

**Thermal conductivity**:
- **Metallic**: HIGH thermal conductivity — both electron transport (dominant, especially at low T) and phonon (lattice vibration) transport. Example: copper is one of the best thermal conductors.
- **Ionic and molecular solids**: low to moderate thermal conductivity via PHONON conduction only (lattice vibrations transport heat); no electronic contribution.
- **Diamond (covalent network)**: exceptionally HIGH thermal conductivity — strong, stiff C–C bonds transmit phonons very efficiently (Debye temperature is very high). Diamond has the highest thermal conductivity of any known material at room temperature (~2000 W m⁻¹ K⁻¹), though it is an electrical insulator. This combination (electrically insulating but thermally conducting) makes it valuable for heat sinks in electronics.

**Hardness and mechanical properties**:
- **Metallic**: DUCTILE and MALLEABLE. Dislocation motion through the metallic lattice allows layers to slide without fracture. The "sea of electrons" adjusts to accommodate new arrangements of ion cores. CCP metals (Cu, Al, Au) are most ductile (multiple slip systems from multiple {111} planes). HCP metals (Ti, Zn, Mg) are less ductile (fewer slip systems). Note: hardness varies widely among metals (Pb soft; W very hard) due to bonding strength variations.
- **Ionic**: HARD but BRITTLE. Hardness arises from the strong electrostatic attraction resisting dislocation motion (ions of the same sign must be moved alongside each other — requires high stress). Brittleness: when a slip does occur (stress applied), like-charged ions are brought adjacent → large electrostatic repulsion → catastrophic fracture (the lattice "snaps" rather than sliding). NaCl cleaves cleanly along {100} planes because slip along these planes maintains alternating charges; other cleavage directions would bring like charges together.
- **Covalent network**: extremely HARD (diamond: hardest known natural material, 10 on Mohs scale) due to continuous 3D covalent bonding — no easy slip planes without breaking strong σ bonds. Also brittle (fracture rather than plastic deformation when the bond network is broken).
- **Molecular solids**: SOFT and low melting point — intermolecular forces much weaker than covalent/ionic bonds. Easily deformed by breaking IMF without breaking covalent bonds within molecules.

**Optical properties**:
- **Transparent (insulating) solids**: wide band gap → photons of visible light (1.8–3.1 eV) do not have enough energy to excite electrons across the gap → no absorption of visible light → TRANSPARENT (colourless). Examples: NaCl (band gap ~8.5 eV), SiO₂ glass (band gap ~9 eV), diamond (band gap 5.5 eV).
- **Coloured ionic solids**: colour can arise from d–d transitions (transition metal impurities or intrinsic — e.g. the colour of Ruby from Cr³⁺ in Al₂O₃), charge-transfer transitions (permanganate, dichromate, see chem.dblock.oxo-species), or F-centres (electron trapped in anion vacancy absorbs visible light — see chem.solid.defects).
- **Metallic**: LUSTROUS (shiny/metallic appearance) because free electrons can absorb and re-emit photons at almost any energy → opaque; reflected light gives metallic sheen.
- **Semiconductors (Si, Ge)**: band gap is smaller than visible light range for Ge (0.66 eV, in the IR) but just at the edge for Si (1.12 eV, just into the near-IR). Silicon appears dark grey/metallic — it absorbs some visible light and has a semiconductor lustre.

**Melting points**:
| Solid type | Typical mp range | Bonding |
|---|---|---|
| Ionic (NaCl) | 600–2800°C | Electrostatic (proportional to charge density) |
| Metallic (Fe, W) | 200–3400°C | Metallic bond strength (band width) |
| Covalent network (diamond) | >3000°C | Strong 3D covalent σ bonds |
| Molecular (I₂, glucose) | <300°C | Weak IMF |

## Mental Models
**Property triangle for solid types**: imagine four nodes — metallic, ionic, covalent network, molecular — each with a distinct "fingerprint" of properties. Learning these fingerprints (conductivity/thermal/hardness/optical) as a coherent package for EACH node is more efficient than learning each property independently. When a question names the bonding type, the full fingerprint is accessible.

**Band gap as a gatekeeper**: the band gap decides what energy (photons = light; phonons = heat; volts = electric potential) can excite electrons across. Wide gap = gate requires a lot of energy to open → insulator (electrically), transparent (optically). Narrow gap = gate opens at room temperature thermal energy → semiconductor. Zero gap (metals) = gate is always open → conductor.

## Why Students Fail
Students correctly state "ionic solids are good conductors" without specifying the state (they conduct ONLY when molten or dissolved). They confuse NTC (semiconductor — conductivity increases with T) with metallic (conductivity decreases with T). They also say diamond is a semiconductor because it's a covalent solid — not realising the band gap of 5.5 eV is far too large for semiconductor behaviour at room temperature.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Ionic solids are electrical conductors because they contain charged ions." Probe: "Why does solid NaCl not conduct electricity, while molten NaCl does?" Characteristic phrase: "ions carry charge, so ionic solids must conduct." Intervention: in the SOLID STATE, ions are rigidly held in fixed lattice positions — they cannot migrate in response to an applied electric field. Only free charges can carry current: in metals, electrons are free (mobile); in molten or dissolved ionic compounds, IONS are free to migrate. Solid NaCl has charged ions but they are immobile → zero conductivity. The physical state fundamentally changes the ions' mobility.
- **MC-2 (Type 2 — perceptual intuition)**: "Diamond must be a semiconductor because silicon (also Group 14, covalent) is a semiconductor." Probe: "Diamond and silicon have the same structure. Why is diamond an electrical insulator while silicon is a semiconductor?" Characteristic phrase: "same structure = same conductivity." Intervention: BAND GAP determines conductivity. Diamond: 5.5 eV (too large for visible photons or thermal energy at room temperature to bridge → insulator). Silicon: 1.12 eV (thermal energy at 300 K ≈ 0.026 eV — enough electrons are excited across the gap for measurable conductivity → semiconductor). Same structure (diamond cubic); vastly different band gap due to C vs. Si bond strength and orbital overlap; completely different electrical behaviour. Structure ≠ properties unless band gap is also specified.
- **MC-3 (Type 3 — language contamination)**: "NTC means 'not thermally conducting' and PTC means 'poorly thermally conducting'." Probe: "What do the T and C stand for in NTC and PTC, and what property do they describe?" Characteristic phrase: "NTC = not thermally conducting." Intervention: NTC = Negative Temperature Coefficient and PTC = Positive Temperature Coefficient. The "T" is TEMPERATURE and the "C" is COEFFICIENT. They describe the sign of the TEMPERATURE DEPENDENCE of a PROPERTY (usually electrical resistance or electrical conductivity). NTC: resistance DECREASES as temperature increases (conductivity increases). PTC: resistance INCREASES as temperature increases (conductivity decreases). They are about how a property CHANGES WITH TEMPERATURE, not about the absolute level of thermal or electrical conductivity.

## Analogies
**Valid**: electrical conductivity as a traffic flow analogy. Metallic conductors = a motorway with no speed limits and no traffic lights — charge flows freely. Ionic solids = a car park where all cars are locked in their spaces — everyone has a car (charge) but nothing moves. Semiconductors = a car park where a few cars can escape their spaces on hot days — a temperature-dependent flow. Insulators = the same car park but with much higher fences — essentially no cars escape at room temperature.

## Demonstrations
**Conductivity testing**: connect a light bulb circuit and test: solid NaCl (bulb off), molten NaCl (bulb on), NaCl solution (bulb on), copper wire (bulb on, brightest), graphite rod (bulb dim but on), SiC (bulb barely on or off at room temperature). Students directly observe the conductivity range across solid types.

**Hardness and brittleness**: strike a piece of NaCl (or LiF) crystal with a hammer along the {100} plane — it cleaves cleanly. Attempt to bend a piece of copper tubing — it bends without fracturing. The physical contrast between brittle ionic and ductile metallic behaviour is immediately tangible.

## Discovery Questions
1. "Diamond is electrically insulating and thermally conducting; graphite is electrically conducting but less thermally conducting along the c-axis. Using bonding and band theory, explain both properties for each allotrope of carbon."
2. "A doped n-type semiconductor at room temperature has conductivity σ = 10² Ω⁻¹m⁻¹. What happens to σ as temperature increases from 25°C to 200°C? (a) Is this NTC or PTC behaviour? (b) Contrast with a metallic conductor under the same temperature increase. (c) Explain both trends using a carrier concentration/mobility framework."

## Teaching Sequence
1. Classify the four solid types by bonding — brief recap from prior concepts.
2. Electrical conductivity: metallic (electron sea, free); ionic (state-dependent: mobile only when molten/dissolved); covalent network (band gap determines; diamond insulator, Si semiconductor); molecular (insulating).
3. Band gap concept: conductor (zero gap), semiconductor (small gap), insulator (large gap). NTC vs. PTC.
4. Thermal conductivity: metals (electrons + phonons); diamond anomaly (phonon only but exceptional); ionic/molecular (phonon only, low).
5. Hardness and brittleness: metallic (ductile — dislocation motion); ionic (hard + brittle — like-charge repulsion on slip); covalent network (hardest — 3D covalent bond network); molecular (soft — weak IMF).
6. Optical properties: wide gap → transparent; F-centres → colour; metals → lustrous/opaque; semiconductor band edges → absorption edge in spectrum.
7. Melting points: systematic comparison by bonding type.

## Tutor Actions
- **If student says ionic solids conduct**: immediately qualify "in what STATE?" Drill: "solid ionic = NO. Molten ionic = YES. Dissolved ionic = YES."
- **If student says diamond is a semiconductor**: ask for the band gap of diamond (5.5 eV) and silicon (1.12 eV); compare to thermal energy kT at 300 K (0.026 eV); show that 5.5/0.026 ≈ 212 — impossible to thermally excite across the gap. Diamond is an insulator.
- **FRAGILE sign**: can list properties for each solid type from a table but cannot EXPLAIN WHY a given property arises from the bonding structure.

## Voice Teaching Notes
The metallic conductivity vs. ionic conductivity trap is one of the most common errors at the developing level. In voice, force explicit qualification: "When you say 'ionic conducts,' I want you to tell me in what physical state. Answer: ionic solids in solid form — what is their conductivity?" (Zero.) "Good. In molten form?" (High.) Make this qualification automatic before any other property discussion.

## Assessment Signals
- **Green**: explains electrical conductivity for all four solid types by bonding mechanism; specifies that ionic solids conduct only when molten/dissolved; explains NTC vs. PTC; explains diamond (insulator) vs. Si (semiconductor) by band gap; explains why ionic solids are brittle and metals are ductile; explains diamond's exceptional thermal conductivity vs. electrical insulation.
- **Amber**: correct property table for solid types but cannot explain the mechanism; or confuses NTC/PTC or ionic state dependence.
- **Red**: says ionic solids conduct; says diamond is a semiconductor; says NTC means "not thermally conducting."
- **Probe**: "An unknown solid X: (a) has a high melting point (>2000°C); (b) conducts electricity in the solid state; (c) is malleable; (d) has a shiny, metallic surface; (e) is opaque. Identify the solid type and justify each property from the bonding model."

## Tutor Recovery Strategy
If student cannot explain why ionic solids are brittle: draw the ion arrangement before and during slip. "In NaCl, the cations and anions alternate. If the lattice slips by one position, what ions are now next to each other?" (Same-charge ions: Na⁺ next to Na⁺, Cl⁻ next to Cl⁻). "What does like-charge mean for the electrostatic interaction?" (Repulsion). "So instead of sliding, the lattice...?" (Cracks — the repulsion is so large that fracture occurs rather than plastic deformation). This narrated "slip test" makes the brittle mechanism concrete.

## Memory Hooks
- **Conductivity summary**: "Metals: high (free e⁻). Ionic: solid = zero; molten/dissolved = high. Covalent: diamond insulator, Si semiconductor. Molecular: insulator."
- **NTC vs. PTC**: "NTC = semiconductor: conductivity UP with temperature (more carriers). PTC = metallic: conductivity DOWN with temperature (more scattering)."
- **Diamond anomaly**: "Best thermal conductor at room T (phonons through stiff bonds). Electrically insulating (5.5 eV band gap). Both simultaneously — unique."
- **Hardness/ductility**: "Metallic = ductile (dislocation slip easy). Ionic = brittle (slip brings like charges together → repulsion → crack). Covalent network = hardest (3D bond network)."
- **Transparency**: "Wide band gap → no visible photon absorbed → transparent/colourless. Metal → opaque → lustrous."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for solid-state chemistry.

## Cross-Subject Connections
- **Materials science**: the interplay of electrical and thermal conductivity vs. hardness governs which materials are chosen for specific engineering applications — diamond for abrasives AND heat sinks; copper for electrical wiring AND heat exchangers; steel (iron alloy) for structural applications requiring strength + ductility; silicon for semiconductor devices.
- **Electronics**: the distinction between conductors (metals), semiconductors (Si, Ge, GaAs), and insulators (SiO₂, diamond) is the physical basis of all solid-state electronics. The band gap engineering in compound semiconductors (GaAs, InP, GaN) directly applies band theory to design LEDs, lasers, and solar cells with specific emission/absorption wavelengths.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.solid.properties`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.solid.properties` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
