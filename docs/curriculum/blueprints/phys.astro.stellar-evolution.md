# Teaching Blueprint: Stellar Evolution and End States
**ID:** phys.astro.stellar-evolution
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.astro.stellar-evolution |
| Name | Stellar Evolution and End States |
| Domain | Astrophysics |
| Difficulty | Advanced |
| Bloom Level | Analyze |
| Estimated Hours | 6 |
| Prerequisites | phys.astro.stellar-structure |
| Unlocks | phys.astro.black-holes |

---

## Section 1 — Concept Spine

**Core Claim:** When a star exhausts its core hydrogen, it leaves the main sequence and evolves through a sequence of shell burning and core contraction stages determined by its mass — culminating in one of three endpoints: a white dwarf (M < 8 M_sun), a neutron star (8–25 M_sun), or a black hole (M > 25 M_sun), each sustained against gravity by a different physical mechanism or terminated by its failure.

**Why It Matters:** Stellar evolution synthesizes all elements heavier than helium (Big Bang produced only H, He, Li), returns them to the ISM via winds and supernovae, and determines the nature of compact remnants — white dwarfs, neutron stars, and black holes — which are key objects in modern astrophysics (gravitational waves, GRBs, pulsars, X-ray binaries).

**Threshold Concept:** A star's mass at birth is destiny — it determines not just its main-sequence lifetime but the entire future evolutionary path and final endpoint. The mass boundaries are not arbitrary: they correspond to physical thresholds where one support mechanism (nuclear fusion, electron degeneracy, neutron degeneracy) fails and the star must either find a new one or collapse catastrophically.

**Prerequisite Knowledge Check:**
- Stellar structure, hydrostatic equilibrium, main sequence (phys.astro.stellar-structure)
- Nuclear fusion reactions and Q-values (phys.mod.nuclear-fusion)
- Pauli exclusion principle and degeneracy pressure (phys.qm.pauli-exclusion recommended)

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** A star is burning its fuel. When the core fuel runs out, what happens depends on whether it can ignite a new fuel at a higher temperature (more compression needed) or whether degeneracy pressure can stop the collapse. Like a relay race — each fuel type (H, He, C, Ne, O, Si) is handed off when the previous one exhausts. Massive stars run the full relay; low-mass stars drop the baton after helium.

**Representational:**
- HR diagram evolution track: horizontal line along main sequence → turns right and up (subgiant branch) → ascends red giant branch → helium flash (low mass) or quiet He ignition (high mass) → horizontal branch → AGB → end state
- Shell structure of a massive star before core collapse: concentric onion layers: H shell → He shell → C shell → Ne shell → O shell → Si shell → Fe core (inert, no fusion energy)
- Chandrasekhar mass limit: M_Ch = 1.44 M_sun (maximum white dwarf mass)

**Abstract:**
- Post-main-sequence: core contracts → T rises → ignites He at ~10⁸ K; triple-alpha process: 3 ⁴He → ¹²C + Q (7.27 MeV)
- AGB stars: double shell burning (H + He shells) → thermal pulses → mass loss → planetary nebula + white dwarf
- Massive star: successive burning stages; iron peak at ⁵⁶Fe — no energy gain from further fusion (BE/A maximum); core mass exceeds Chandrasekhar → electron degeneracy fails → core collapse at ~0.25 s → proto-neutron star (neutron degeneracy bounce) → shock wave → Type II supernova
- Remnants:
  - White dwarf: supported by electron degeneracy pressure; M < M_Ch = 1.44 M_sun; R ~ Earth's radius; cooling over ~10¹⁰ yr
  - Neutron star: supported by neutron degeneracy + strong force; M ~ 1.4–2 M_sun; R ~ 10 km; ρ ~ 10¹⁴ g/cm³; Tolman-Oppenheimer-Volkoff (TOV) limit ≈ 2–3 M_sun
  - Black hole: M > TOV limit; all support fails; Schwarzschild radius R_s = 2GM/c²

**Transfer:** Type Ia supernova: accreting white dwarf reaches M_Ch → explodes entirely (no remnant); standard candle for cosmology (uniform peak luminosity). Pulsars: rotating neutron stars with B ~ 10¹²T; radio beacon. Gravitational wave source: merging neutron stars (GW170817), merging black holes.

---

## Section 3 — Why Beginners Fail

1. **Thinking all stars explode:** Only massive stars (M > 8 M_sun) produce core-collapse supernovae. Most stars (like the Sun) end as planetary nebulae + white dwarfs. Learners often think all stars explode.
2. **Iron fusion liberates energy:** Learners think the iron core could fuse to produce energy. But ⁵⁶Fe is at the peak of the binding-energy-per-nucleon curve — fusing it requires energy input, not releases energy. The star is "out of fuel" once it has an iron core.
3. **White dwarf is a star still fusing:** Learners think white dwarfs still shine by fusion. They don't — they are degenerate carbon-oxygen remnants cooling by radiation (like a dying ember, not a burning fire).
4. **Neutron stars are just compressed white dwarfs:** Neutron stars require the collapse of a stellar core and neutronization of protons (p + e⁻ → n + νₑ); they are supported by neutron degeneracy and strong-force repulsion, not electron degeneracy. Different physics, different composition, different density by 10⁶.

---

## Section 4 — Misconception Library

### MC-1: The Sun will explode in a supernova
- **Probe:** "What will happen to the Sun when it runs out of fuel?"
- **Characteristic phrase:** "It will eventually go supernova."
- **Trigger:** Cultural familiarity with "supernova" as the way stars die; conflating star death with stellar explosion.
- **Conflict evidence [P28]:** The Sun has mass 1 M_sun — well below the ~8 M_sun threshold for core-collapse supernova. The Sun's carbon-oxygen core (after helium burning) will never reach temperatures hot enough to ignite carbon burning. The core will instead be supported by electron degeneracy pressure as a white dwarf. The outer layers will be expelled as a planetary nebula.
- **Bridge [P30]:** Supernova occurs when the degenerate iron core exceeds the Chandrasekhar mass — requiring a more massive precursor star (typically > 8 M_sun).
- **Replacement [P31]:** Sun's future: ~5 Gyr on MS remaining → red giant (core He burning) → AGB phase with thermal pulses → planetary nebula ejection → white dwarf cooling for ~10¹⁰ yr. No explosion.
- **Discrimination pairs [P33]:** Sun (1 M_sun): white dwarf endpoint. Betelgeuse (~ 20 M_sun): Type II supernova endpoint → neutron star or black hole. Different mass → qualitatively different fate.
- **S6 repair path:** Walk through the Sun's future on the HR diagram step by step; identify each phase and why the carbon core doesn't ignite.

### MC-2: Fusing iron releases energy
- **Probe:** "Can a star fuse iron to release energy and halt collapse?"
- **Characteristic phrase:** "Just fuse the iron to make heavier elements."
- **Trigger:** Extrapolating the pattern: H fuses → He, He fuses → C, C fuses → … → Fe should fuse.
- **Conflict evidence [P28]:** BE/A curve peaks at ⁵⁶Fe (8.79 MeV/nucleon). Fusing Fe → heavier elements requires energy input (BE/A decreases). The iron core is a dead end — no nuclear energy release possible. If you try to fuse Fe, the core temperature drops, pressure drops, gravity wins.
- **Bridge [P30]:** All previous burning stages (H→He→C→O→Si) released energy because BE/A increased. At ⁵⁶Fe, BE/A is at its maximum — there is nowhere higher to go on the binding energy curve.
- **Replacement [P31]:** Iron is the "ash of all ashes." An inert iron core grows from silicon burning (28Si + 28Si → 56Ni → 56Co → 56Fe). When the iron core exceeds M_Ch, no energy source can halt collapse — the star implodes.
- **Discrimination pairs [P33]:** ⁴He fusing to ¹²C: BE/A increases from 7.07 to 7.68 MeV/nucleon → energy released. ⁵⁶Fe fusing to ¹¹²Cd: BE/A decreases from 8.79 to 8.55 MeV/nucleon → energy required, not released.
- **S6 repair path:** Plot the BE/A curve; mark each stellar burning stage; show why iron is the endpoint.

### MC-3: White dwarfs are still burning hydrogen
- **Probe:** "How does a white dwarf produce light?"
- **Characteristic phrase:** "It still has some hydrogen fuel burning slowly."
- **Trigger:** Thinking all luminous objects produce energy by fusion.
- **Conflict evidence [P28]:** The hottest white dwarfs have T ~ 100,000 K immediately after formation (cooling from planetary nebula). Over billions of years they cool to T < 10,000 K (cool white dwarfs observed in nearby clusters). If they were fusing hydrogen, they would be increasing in temperature or maintaining it — instead they monotonically cool.
- **Bridge [P30]:** White dwarfs are inert degenerate carbon-oxygen (or oxygen-neon) remnants supported by electron degeneracy pressure. They cool like a brick: no energy generation, just radiating stored thermal energy.
- **Replacement [P31]:** White dwarf luminosity: L = 4πR²σT⁴ (black body radiation from cooling degenerate remnant). No fusion. The oldest white dwarfs in globular clusters (age ~12 Gyr) have cooled to T ~ 4000 K and are barely luminous.
- **Discrimination pairs [P33]:** Main sequence star: hydrogen fusion in core. White dwarf: no fusion, cooling. The surface luminosity of both can be similar (at some point during cooling) but the mechanism is completely different.
- **S6 repair path:** Estimate cooling timescale: white dwarf thermal energy ~kT × N_e ~ 10³² J; luminosity ~10²² W → cooling time ~10¹⁰ s ~ 300 yr at peak, but L decreases as T⁴ → much longer total cooling.

### MC-4: Neutron stars are just very dense white dwarfs
- **Probe:** "What's the difference between a white dwarf and a neutron star?"
- **Characteristic phrase:** "A neutron star is like a white dwarf, just more compressed."
- **Trigger:** Thinking compact objects form a continuous sequence of compression.
- **Conflict evidence [P28]:** White dwarf: supported by electron degeneracy, composition C/O, density ~10⁶ g/cm³, R~5000 km. Neutron star: protons captured electrons (neutronization: p+e⁻→n+νₑ) during core collapse, composition mostly neutrons + quarks, supported by neutron degeneracy + strong force, density ~10¹⁴ g/cm³ (nuclear density), R~10 km. The densities differ by 10⁸; the support mechanism and composition are qualitatively different.
- **Bridge [P30]:** When a stellar core exceeds the Chandrasekhar limit, electron degeneracy fails — electrons are captured by protons, converting the white-dwarf-like core into neutronium. A phase transition, not a compression.
- **Replacement [P31]:** White dwarf (M < 1.44 M_sun): electron degeneracy support, density ~10⁶ g/cm³. Neutron star (1.4–2 M_sun): neutron degeneracy + repulsive nuclear force, density ~10¹⁴ g/cm³, R~10 km. They are qualitatively different objects separated by a core-collapse event.
- **Discrimination pairs [P33]:** White dwarf: size of Earth, mass of Sun. Neutron star: size of a city, mass of 1.4 Sun. Same mass-range, factor 1000 difference in radius, factor 10⁸ in density.
- **S6 repair path:** Show why electron degeneracy fails at M_Ch: Fermi momentum → relativistic electrons → pressure no longer grows fast enough to halt gravity (Γ < 4/3 instability for relativistic gas).

---

## Section 5 — Explanation Library

### Explanation A — The Onion Structure and Iron Core Collapse
A massive star burns through its nuclear fuels like an onion: hydrogen burns to helium (center outward), then the helium core contracts until helium ignites into carbon, then carbon into neon and oxygen, then oxygen into silicon, then silicon into iron (via nuclear statistical equilibrium at T > 5×10⁹ K). Each burning stage is faster than the last: hydrogen ~10 Myr, helium ~1 Myr, carbon ~10³ yr, neon ~1 yr, oxygen ~6 months, silicon ~1 day. When the iron core reaches 1.44 M_sun, no energy source remains. Electron degeneracy fails (relativistic electrons), the core implodes in ~0.25 seconds, bounces at nuclear density, and the shock wave — aided by neutrino pressure — blows off the outer layers in a Type II supernova.

### Explanation B — The Three Endpoints
Stars end in one of three states. (1) White dwarf (M < 8 M_sun): after helium burning and AGB phase, the outer layers are expelled in a planetary nebula; the carbon-oxygen core of mass < 1.44 M_sun is supported by electron degeneracy pressure indefinitely. It cools from ~100,000 K to eventual darkness. (2) Neutron star (8–25 M_sun): core-collapse supernova leaves a neutron-degenerate remnant of mass ~1.4–2 M_sun and radius ~10 km. Observed as pulsars (rotation-powered radio beacons) or X-ray binaries. TOV limit: ~2–3 M_sun. (3) Black hole (M > 25 M_sun approximately): when the remnant mass exceeds the TOV limit, even neutron degeneracy fails; the core collapses to a singularity inside the Schwarzschild radius R_s = 2GM/c² — all further collapse is hidden.

### Explanation C — Supernovae as Element Factories
Core-collapse supernovae are the primary source of elements from oxygen through iron in the universe. The explosion ejects several solar masses of processed material into the interstellar medium — oxygen, silicon, calcium, iron, and (through the r-process neutron captures in the shock wave) elements heavier than iron: gold, platinum, uranium. Without supernovae, the universe would contain only hydrogen, helium, and trace lithium (Big Bang nucleosynthesis products). The iron in your blood and the calcium in your bones were forged in dying stars and returned by supernova explosions. Type Ia supernovae (accreting white dwarfs reaching M_Ch) produce most of the iron-peak elements; their uniform peak luminosity makes them standard candles for measuring the universe's accelerated expansion.

---

## Section 6 — Analogy Library

**Primary Analogy:** A relay race with increasingly difficult handoffs. Each fuel type (H, He, C, O, Si) is a leg of the race — carried as long as the runner has energy, then handed off to the next. Iron is the last runner who can't hand off (no energy in fusing it). For a low-mass star, the race ends after helium; for a massive star, the race continues to iron, then stops catastrophically.

**Breaking Point:** In a relay race, the baton is simply carried and passed. In a star, each fuel handoff requires gravity to compress the core to higher temperatures. The "handoff" is actually a gravitational crisis — the star shrinks, heats, and only survives if a new fuel can ignite. Iron doesn't ignite — the crisis becomes a collapse.

**Anti-Analogy:** Main-sequence stars (stable, slow hydrogen burning) — they are the calm between the crises of pre-main-sequence contraction and post-main-sequence evolution. Stellar evolution is dramatic precisely because the main sequence is an exception to the rule of gravitational collapse.

---

## Section 7 — Demonstration Library

**Demo 1 — HR Diagram Evolution Track**
Show the Sun's evolutionary track from ZAMS to white dwarf on a computer-generated HR diagram. Time-stamp each phase. Key observation: most time (90%) is on the main sequence; the red giant, AGB, and planetary nebula phases are brief in comparison. Ask: "Why does the star move right on the HR diagram when the core hydrogen is exhausted?" (Core contracts → surface expands → surface cools → moves right.)

**Demo 2 — Onion Structure Diagram**
Draw the interior of a 20 M_sun star just before core collapse: concentric shells labeled H, He, C, Ne, O, Si, Fe (innermost). Time stamps for each burning stage. Shock the learner: "Silicon burning lasts 1 day. The star has an iron core the size of Earth — and collapses to 10 km in 0.25 seconds."

**Demo 3 — Chandrasekhar Mass Calculation**
Estimate M_Ch from the condition that relativistic electron degeneracy pressure equals gravitational pressure. The relativistic case gives P_deg ∝ (N/V)^(4/3) — weaker than non-relativistic ∝ (N/V)^(5/3). Setting P_deg = P_grav gives M_Ch ∝ (ℏc/G)^(3/2) m_p^(−2) ≈ 1.44 M_sun. Show the Sun (1 M_sun) is safely below; core collapse occurs when remnant mass ≈ M_Ch.

---

## Section 8 — Discovery Lesson

**Setup:** Provide learners with the binding-energy-per-nucleon curve and a table of stellar burning stages.

**Task 1:** "Mark on the BE/A curve each fusion reaction: H→He, He→C, C→O, O→Si, Si→Fe. Is each fusion reaction energy-releasing?" (Yes for all up to Fe — BE/A increases each time.)

**Task 2:** "What happens at Fe? Could you fuse Fe to Pb? Show what the BE/A curve predicts." (BE/A decreases → energy input required, not released → fusing Fe is endothermic.)

**Task 3:** "If the iron core can't produce energy, what happens to the hydrostatic equilibrium?" (Pressure drops → gravity wins → collapse.)

**Resolution:** The endpoint of nuclear burning (iron) is written in the binding-energy curve. Learners discover for themselves why iron is the "ash of all ashes" — the inevitable dead end of stellar nucleosynthesis.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Show Sun's HR track ending at white dwarf, not supernova | Learner says "the Sun will go supernova" |
| 2 | Plot BE/A curve; show Fe is the peak; demonstrate fusing Fe is endothermic | Learner thinks iron fusion could halt collapse |
| 3 | Contrast white dwarf (electron degeneracy, C/O, density 10⁶ g/cm³) vs. neutron star (neutron degeneracy, nuclear density 10¹⁴ g/cm³) | Learner says neutron star is "just denser white dwarf" |

---

## Section 10 — Voice Teaching

**Opening hook:** "Every atom of iron in your body was forged in a star that died in a supernova. Stellar evolution is not just astrophysics — it is the history of every atom you are made of. Stars live, burn out, and die; and in dying, they scatter the material for planets, oceans, and life."

**Pacing:** Anchor with the mass-fate table: M < 8 M_sun → white dwarf; 8–25 M_sun → neutron star; > 25 M_sun → black hole. Then explain the physics behind each boundary. The table provides a framework before the physics is developed.

**Common impasse language:** "Iron doesn't explode the star — it ends the star. The explosion is powered by the gravitational energy released when the core collapses from Earth-size to city-size in a quarter second: ~3×10⁴⁶ J, 100× the Sun's lifetime output. Only 1% couples to the envelope to power the supernova. 99% leaves as neutrinos — and we detected them from SN1987A."

**Closing consolidation:** "Three endpoints: a cooling coal (white dwarf), a spinning lighthouse (neutron star/pulsar), or a gravitational abyss (black hole). The boundary between them is sharp physics: the Chandrasekhar mass and the TOV limit. Every stellar death is the birth of one of these three objects."

---

## Section 11 — Assessment

**Mastery gate:** Correctly predict the endpoint of stars with given masses; explain the iron core crisis; distinguish the three support mechanisms.

**FA-1:** "A star has initial mass 12 M_sun. Describe its likely endpoint."
*Expected:* 12 M_sun > 8 M_sun → proceeds through all burning stages (H, He, C, Ne, O, Si) → iron core → core-collapse supernova → neutron star (if remnant mass 1.4–2 M_sun below TOV limit, which is expected for 12 M_sun progenitor).
*Threshold:* Correct identification as core-collapse supernova; correct endpoint as neutron star; qualitative explanation of why.

**FA-2:** "Why does the iron core of a massive star collapse rather than fuse to release more energy?"
*Expected:* ⁵⁶Fe is at the peak of the BE/A curve (8.79 MeV/nucleon). Fusing iron to heavier nuclei would require energy input (BE/A decreases for A > 56). No nuclear energy source remains; without energy generation, radiation pressure falls, gravity overwhelms electron degeneracy pressure (relativistic electrons give Γ = 4/3, insufficient to maintain stability), and the core implodes.
*Threshold:* Invokes BE/A peak; states fusing Fe is endothermic; mentions electron degeneracy failure.

**FA-3:** "What determines whether a supernova leaves a neutron star or a black hole?"
*Expected:* The mass of the compact remnant after the explosion. If remnant mass < TOV limit (approximately 2–3 M_sun), neutron degeneracy pressure supports it as a neutron star. If remnant mass > TOV limit (or if fallback accretion pushes it over), even neutron degeneracy fails and a black hole forms. More massive progenitors generally leave more massive remnants.
*Threshold:* Identifies TOV limit as the deciding threshold; distinguishes neutron degeneracy (neutron star) from complete collapse (black hole).

**FA-4:** "What supports a white dwarf against gravity, and why is there a maximum mass?"
*Expected:* Electron degeneracy pressure (Pauli exclusion principle) — electrons are packed into all available states up to the Fermi energy, producing a pressure that does not depend on temperature. Maximum mass (Chandrasekhar limit, 1.44 M_sun) arises because as mass increases, the electrons become relativistic (Fermi momentum → relativistic). Relativistic electron degeneracy pressure increases as ρ^(4/3) rather than ρ^(5/3), and at some mass, it grows too slowly to balance gravity — the white dwarf becomes unstable.
*Threshold:* Identifies electron degeneracy as support; states M_Ch = 1.44 M_sun; explains relativistic instability qualitatively.

**Confidence calibration:** After FA-1, ask: "What about a 2 M_sun star? A 0.5 M_sun star? A 50 M_sun star?" Testing rapid application across the mass range reveals whether the learner has internalized the mass-boundary logic or only memorized the single example.

**Delayed retrieval:** Return at day 5: "Sketch the HR evolutionary track for a 1 M_sun star from the ZAMS to the endpoint. Label each phase and estimate how long it lasts."

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Learner is unclear on what determines a star's main-sequence position. Return to phys.astro.stellar-structure before evolution.

**S3 — Partial understanding:** Knows the endpoints but cannot explain the transitions between them. Intervention: BE/A curve exercise (Discovery Lesson) — making iron core crisis concrete.

**S6 — Misconception detected:** MC-1 (Sun goes supernova) or MC-2 (iron fusion). Intervention: for MC-1, show HR track ending at white dwarf. For MC-2, point to BE/A peak at Fe and ask what happens to the energy budget.

**S9 — Near mastery:** Understands stellar evolution but struggles with quantitative aspects (Chandrasekhar limit, Schwarzschild radius). Intervention: dimensional estimate of M_Ch from relativistic electron degeneracy (Demo 3); estimate of R_s for a stellar-mass black hole.

---

## Section 13 — Memory & Review

**Memory type:** Structural (mass-fate table, onion-layer diagram, HR evolutionary tracks) + conceptual (why each endpoint occurs: degeneracy pressure physics, BE/A curve).

**Spaced retrieval schedule:** Day 1 (three endpoints and mass ranges; why iron core collapses), Day 3 (sketch HR track for Sun and for 20 M_sun star; explain each branch), Day 5 (Chandrasekhar mass and what happens above it), Day 14 (connect to supernovae as element factories; estimate energy budget of Type II SN).

**Interleaving partners:** phys.astro.stellar-structure (main-sequence physics underpins the evolution), phys.mod.binding-energy (BE/A curve is the key to why iron is the endpoint), phys.qm.pauli-exclusion (degeneracy pressure is Pauli in action), phys.astro.black-holes (next step: Schwarzschild radius, event horizons).

---

## Section 14 — Transfer Map

**Near transfer:** Type Ia supernova as standard candle (accreting WD reaches M_Ch → explosion; used to measure cosmic acceleration). Pulsar properties (spin-down rate → magnetic field → neutron star age). X-ray binaries (neutron star/BH accreting from companion → X-ray luminosity → mass transfer rate).

**Far transfer:** Big Bang nucleosynthesis produced H, He, Li only. All heavier elements are stellar (up to Fe: stellar burning; above Fe: r-process in neutron star mergers/core-collapse; confirmed by GW170817 kilonova). The chemical history of the universe is written in stellar evolution.

**Structural abstraction:** The logic — a system supported by one mechanism, that mechanism failing at a critical mass/energy, triggering collapse or transition to a new support — recurs throughout physics: Jeans mass (gravitational collapse of molecular clouds), Eddington luminosity (radiation pressure vs. gravity), white dwarf cooling models, TOV equation for neutron stars. Understanding the stellar evolution "cascade of crises" prepares learners for analogous reasoning in nuclear, condensed matter, and gravitational physics.

---

## Section 15 — Curriculum Feedback

**Dependency check:** phys.astro.stellar-structure must be complete — hydrostatic equilibrium, mass-luminosity relation, HR diagram. Without these, the evolutionary track (which follows deviations from MS equilibrium) is not comprehensible. phys.mod.binding-energy (BE/A curve) is implicitly required to explain the iron endpoint.

**Common pacing error:** Spending all time on the dramatic endpoint (supernova) without establishing why the iron core cannot produce energy. The physics of BE/A and its implications must come first.

**Assessment gap:** Curricula frequently test the three endpoints but rarely ask learners to explain: (1) why electron degeneracy becomes relativistic and fails at M_Ch; (2) why fusing iron is endothermic; (3) quantitative cooling timescales for white dwarfs.

**Suggested pairing:** Pair with phys.astro.black-holes (natural next step: Schwarzschild geometry, event horizon, tidal forces) and phys.astro.cosmology (connects to element synthesis history of the universe).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
