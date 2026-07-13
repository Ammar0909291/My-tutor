# Teaching Blueprint: Nuclear Fission and Chain Reactions

## 0. Concept Metadata
- **Concept ID**: phys.mod.nuclear-fission
- **Name**: Nuclear Fission and Chain Reactions
- **Domain**: Modern Physics
- **Difficulty**: advanced
- **Bloom Level**: analyze
- **Estimated Hours**: 6
- **Prerequisites**: phys.mod.binding-energy
- **Unlocks**: (none — leaf node)
- **Description**: Nuclear fission splits a heavy nucleus into lighter fragments releasing enormous energy; a chain reaction sustains continuous fission.

---

## 1. Concept Spine

### Core Idea
Nuclear fission occurs when a heavy nucleus (typically ²³⁵U or ²³⁹Pu) absorbs a neutron and splits into two medium-mass fragments plus 2–3 neutrons and ~200 MeV of energy. The energy release is explained by the binding energy per nucleon (BE/A) curve: fission products near A ≈ 115 have higher BE/A than uranium, so the system moves to a lower energy state. If the released neutrons initiate further fissions, a self-sustaining chain reaction can occur — the basis of nuclear reactors and weapons.

### Conceptual Ladder
1. **Recall**: BE/A curve — heavy nuclei have lower BE/A than mid-mass nuclei; fission moves toward the BE/A peak.
2. **Understand**: Fission Q-value ≈ (BE/A_products − BE/A_reactant) × A ≈ (8.5 − 7.6) × 235 ≈ 200 MeV.
3. **Apply**: Chain reaction concept: k = multiplication factor; k < 1 (subcritical), k = 1 (critical), k > 1 (supercritical).
4. **Analyze**: Critical mass, neutron moderation, control rods, reactor safety; compare fission reactor and bomb design.

### Key Formula Set
- **Typical fission reaction**: ²³⁵U + n → ²³⁶U* → ⁹²Kr + ¹⁴¹Ba + 3n (one example; fission is not unique)
- **Q-value estimate**: Q ≈ Δ(BE/A) × A_fissioning nucleus ≈ (8.5 − 7.6) × 235 ≈ 200 MeV
- **Multiplication factor**: k = (neutrons produced in generation n+1)/(neutrons in generation n)
  - k < 1: subcritical (reaction dies)
  - k = 1: critical (steady power)
  - k > 1: supercritical (exponential growth)
- **Neutron generation growth**: N(t) = N₀ × k^(t/τ), τ ≈ prompt neutron lifetime (~10⁻⁴ s in reactor)
- **Energy from fission**: ~200 MeV per fission; 1 kg ²³⁵U fully fissioned → ~8.5×10¹³ J (≈ 20 kt TNT equivalent)
- **Power formula**: P = R × Q, where R = fission rate (fissions/sec), Q = energy per fission
- **Four-factor formula** (reactor criticality): k_∞ = η × ε × p × f (thermal neutrons: reproduction, fast fission, resonance escape, thermal utilization)

### Canonical Example
²³⁵U fission:
BE/A(²³⁵U) ≈ 7.59 MeV/nucleon. Average BE/A of products ≈ 8.40 MeV/nucleon.
Q ≈ (8.40 − 7.59) × 235 = 0.81 × 235 = 190 MeV per fission.
Each fission also releases ≈ 7 MeV in prompt gamma rays and ≈ 6 MeV in delayed beta/gamma from fission products.
Total: ≈ 200 MeV per fission.
1 g of ²³⁵U → 2.56×10²¹ atoms / 235 × Nₐ → 2.56×10²¹ × 200 MeV = 5.12×10²³ MeV = 8.2×10¹⁰ J ≈ 82 GJ.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Imagine a heavy droplet of water vibrating. If the vibration is energetic enough, the droplet pinches in the middle and splits into two smaller droplets plus some ejected water molecules (neutrons). The two smaller droplets are rounder and more compact (higher BE/A) — they release their surface tension energy as the droplet reconfigs into a more stable shape. This is the liquid-drop model of fission: the nucleus behaves like a charged liquid drop, and the vibration triggered by neutron capture drives the split.

The chain reaction: each split sends out 2-3 "water molecules" (neutrons) that can hit other droplets (nuclei) and split them. If enough droplets are present (critical mass), each neutron on average triggers one more split — steady chain reaction.

### Representational (Diagrams and Symbols)
- **Fission event diagram**: Heavy nucleus absorbs neutron → elongated intermediate state → splits into two fragments + neutrons + gamma rays. Label Q ≈ 200 MeV.
- **BE/A curve with fission arrow**: Show U (BE/A ≈ 7.6) splitting into two fragments near A ≈ 115 (BE/A ≈ 8.5). Arrow pointing up the curve = energy released.
- **Chain reaction diagram**: One fission → 2 neutrons → 4 neutrons → 8 → exponential growth (supercritical). One fission → 2 neutrons, one absorbed, one escapes → 1 new fission (critical).
- **Reactor schematic**: Fuel rods (²³⁵U), moderator (water), control rods (neutron absorbers), coolant, heat exchanger.

### Abstract (Equation Manipulation)
Students must practice:
1. Estimate Q from BE/A values.
2. Balance a fission equation (conserve Z and A).
3. Compute energy per gram of ²³⁵U.
4. Apply k factor: given initial number of neutrons and k, find N after n generations.
5. Distinguish criticality conditions and connect to reactor control vs. weapon design.

### Transfer (Novel Contexts)
- **Reactor safety**: Loss-of-coolant accident → temperature rise → Doppler broadening of U-238 resonances → more neutron absorption → k decreases → inherently safe. Physical argument: if k → 1, removing cooling makes U-238 absorb more neutrons, decreasing k below 1.
- **Nuclear waste**: Fission products have A ≈ 95 and 139; many are far from stability (neutron-rich) → long decay chains → radioactive waste with t₁/₂ ranging from seconds to millennia.
- **SNAP-23 / SNAP reactors**: Miniature fission reactors for space power (RTG for some missions — though RTGs use decay heat not chain reaction).

---

## 3. Why Beginners Fail

### Failure Mode 1: Thinking fission is always the same reaction
Students think ²³⁵U always splits into ⁹²Kr + ¹⁴¹Ba. In reality, fission yields a statistical distribution of fragment masses (yield curve peaks around A ≈ 95 and A ≈ 140). The specific fragments vary event by event; the shown reaction is one example.

### Failure Mode 2: Confusing multiplication factor k with number of neutrons per fission
k ≠ 2 or 3 (average neutrons per fission). k accounts for neutron losses (absorption, leakage, moderation) AND production. For k = 1 in a thermal reactor, each fission's 2.5 average neutrons → ~1.5 lost (absorbed by control rods, U-238, leakage) → ~1 goes to new fission.

### Failure Mode 3: Thinking a fission reactor can explode like a bomb
A reactor uses ~3% enriched ²³⁵U; a bomb requires ≥90% enriched ²³⁵U. A reactor cannot achieve the rapid supercritical assembly needed for an explosion. The Chernobyl accident involved a steam explosion and graphite fire — not a nuclear explosion. Students must understand the distinction between prompt critical (weapon) and delayed critical (reactor).

### Failure Mode 4: Misidentifying the energy source as "splitting of chemical bonds"
Students sometimes think fission energy comes from electron cloud rearrangement. Fission energy (~200 MeV) is 10⁷× larger than chemical bond energies (~eV) — it comes from the nuclear strong force via mass defect.

---

## 4. Misconception Library

### MC-1: "A fission reactor can explode like an atomic bomb"
- **Probe**: "If a nuclear reactor loses control, can it explode with nuclear force?"
- **Characteristic phrase**: "Reactors are basically slow nuclear bombs."
- **Trigger**: Media conflation of reactors and weapons; general fear of nuclear technology.
- **Conflict evidence**: Reactor fuel is ~3% enriched; weapons require ≥90% enriched. Even if reactor k > 1, the geometry and materials prevent the super-prompt-critical condition needed for a nuclear explosion. The Chernobyl accident demonstrated this: runaway power caused a steam explosion and fire, not a nuclear detonation.
- **Bridge**: A nuclear explosion requires rapid assembly of highly enriched fissile material to prompt-supercritical conditions in microseconds. A reactor's slow chain reaction (millisecond timescales with delayed neutrons) and low enrichment make this impossible.
- **Replacement**: A reactor can have a runaway power excursion → steam explosion, structural failure, radioactive material release. It cannot detonate as a nuclear weapon.
- **Discrimination pairs**: "Reactor safety concern: steam explosion, meltdown" ✓ vs. "Reactor can go nuclear" ✗
- **S6 repair path**: Compare reactor fuel enrichment (3%) to weapon-grade enrichment (>90%). Calculate k for each. Show reactor k is controlled by delayed neutrons; weapon k must be prompt-critical.

### MC-2: "Fission always produces the same fragments"
- **Probe**: "²³⁵U splits into ⁹²Kr + ¹⁴¹Ba. Does it always split this way?"
- **Characteristic phrase**: "That's the fission reaction."
- **Trigger**: Textbooks show one reaction as "the" example.
- **Conflict evidence**: Fission is a quantum event with a broad statistical distribution of products. The yield distribution is bimodal (peaks near A ≈ 95 and A ≈ 139); hundreds of different fragment pairs are possible with varying probabilities. Only the total A and Z (conservation) are fixed for a given incident.
- **Bridge**: Like rolling dice and splitting the total — many ways to partition 235 into two numbers around 95 and 140.
- **Replacement**: Fission produces a statistical distribution of fragment pairs. Any specific pair (like Kr + Ba) represents one possible outcome. The fission yield curve shows probabilities for each mass number.
- **Discrimination pairs**: "Fission yield distribution: peaks near A = 95 and A = 139" ✓ vs. "Always splits into Kr + Ba" ✗
- **S6 repair path**: Show a fission yield curve graph; identify the two peaks; note that symmetric fission (A ≈ 118 each) is actually rare.

### MC-3: "All neutrons are prompt and chain reactions are instantaneous"
- **Probe**: "How fast does a chain reaction proceed?"
- **Characteristic phrase**: "It's instantaneous — all neutrons are released at once."
- **Trigger**: Thinking of the bomb context only (prompt neutrons, microsecond timescale).
- **Conflict evidence**: ~0.65% of fission neutrons are delayed (released from fission products over milliseconds to minutes). These delayed neutrons allow reactor control — without them, k would have to be held at exactly 1 with mechanical control rods moving in microseconds (impossible). Reactors are designed to be critical only with delayed neutrons, giving operators seconds to respond.
- **Bridge**: Two timescales: prompt neutrons (10⁻⁷ s, 99.35%) and delayed neutrons (0.1 s to minutes, 0.65%). Reactors operate in the delayed-critical regime; prompt-critical is the weapon regime.
- **Replacement**: Delayed neutrons are essential to reactor control. The effective neutron generation time in a thermal reactor is ~0.1 s (not 10⁻⁷ s) because of delayed neutrons — this is what makes control rods effective.
- **Discrimination pairs**: "Reactor: delayed-critical, k_effective ≈ 1 including delayed neutrons" ✓ vs. "All neutrons prompt, chain reaction instantaneous" ✗
- **S6 repair path**: Compute neutron generation time with and without delayed neutrons; show the 10⁶× difference in timescale.

### MC-4: "Fission energy comes from converting all the mass to energy"
- **Probe**: "In ²³⁵U fission releasing 200 MeV, how much mass is converted?"
- **Characteristic phrase**: "The mass of the uranium atom is converted to energy."
- **Trigger**: Loose application of E = mc².
- **Conflict evidence**: Δm = 200 MeV / 931.5 MeV/u ≈ 0.215 u. But mass of ²³⁵U = 235 u. Fraction converted = 0.215/235 ≈ 0.09%. The vast majority of the uranium's mass-energy remains in the fission products; only the mass defect difference is released.
- **Bridge**: E = mc² applies to the mass DIFFERENCE between reactants and products, not the total mass.
- **Replacement**: Fission converts 0.09% of the uranium mass to kinetic energy of products and radiation. 99.91% of the mass-energy remains in the fission products.
- **Discrimination pairs**: "Δm = 0.215 u (0.09% of 235 u) → Q = 200 MeV" ✓ vs. "Entire uranium mass converted" ✗
- **S6 repair path**: Compute Δm for a specific fission reaction from atomic masses; verify Δm/m_reactant ≈ 0.09%.

---

## 5. Explanation Library

### Explanation A — Liquid drop model (for conceptual learners)
The nucleus behaves like a charged liquid drop. Stable heavy nuclei are spherical (minimizing surface energy vs. Coulomb energy). When ²³⁵U absorbs a neutron, the compound nucleus ²³⁶U oscillates — if the oscillation amplitude is large enough, the Coulomb repulsion overcomes surface tension and the drop elongates, necks in the middle, and splits. The two fragments fly apart with kinetic energy from the Coulomb repulsion between them (most of the Q ≈ 200 MeV appears as kinetic energy of fragments).

### Explanation B — BE/A argument (for quantitative learners)
From the binding energy curve: average BE/A(fragments near A = 115) ≈ 8.5 MeV/nucleon vs. BE/A(²³⁵U) ≈ 7.6 MeV/nucleon. Energy released per nucleon ≈ 0.9 MeV; total Q ≈ 0.9 × 235 ≈ 210 MeV. This is consistent with measured values. The energy source is the increased binding in the products — the nucleons are more tightly bound in fragments than in uranium.

### Explanation C — Chain reaction (for applied learners)
Each ²³⁵U fission releases on average ν = 2.43 prompt neutrons. For a sustained chain reaction, exactly one must trigger the next fission. In a reactor: of 2.43 neutrons per fission, ~1.28 are captured by U-238 (resonance absorption), ~0.15 are lost by leakage, ~0.30 are captured by structural materials and coolant → about 1 neutron triggers the next fission. Control rods (neutron absorbers) capture additional neutrons to tune k precisely to 1.

---

## 6. Analogy Library

### Primary Analogy
**Water droplet fission**: A large water droplet can be made to split by vibrating it at the right frequency. The droplet oscillates, becomes elongated, and pinches into two droplets. Nuclear fission is the same process at the nuclear scale: the liquid-drop model describes the nucleus as a charged liquid; the neutron provides the "vibration kick." The fragments, like two smaller droplets, settle into more compact shapes (higher BE/A per nucleon) and release the excess energy.

### Breaking Point
The liquid drop analogy misses the quantum aspects: (1) fission is quantized (occurs in discrete events, not continuous splitting); (2) the fragment mass distribution is determined by quantum shell effects (magic numbers cause the mass distribution to peak at specific values, not symmetrically); (3) tunneling through the fission barrier occurs even below the classical barrier top (spontaneous fission).

### Anti-Analogy
"Fission is like breaking a stick" — this suggests two equal halves. Fission almost always produces asymmetric fragments (A ≈ 95 and A ≈ 140) due to nuclear shell effects. Symmetric fission (A ≈ 118 each) is a minority outcome despite being what a simple "stick-breaking" model would predict.

---

## 7. Demonstration Library

### Demo 1: Chain Reaction Simulation with Coins
Materials: A flat surface, ~100 coins, some representing ²³⁵U and some ²³⁸U.
Procedure: Place coins flat. "Fission" one ²³⁵U coin by knocking it over → it "emits" 2-3 small coins (neutrons). Those knock over adjacent ²³⁵U coins. Students see whether the arrangement is subcritical (most neutrons miss ²³⁵U), critical, or supercritical. Adjust density to demonstrate criticality.

### Demo 2: Energy per Gram Calculation
Materials: Calculator.
1 gram of ²³⁵U (fully fissioned): N = (0.001/0.235) × 6.022×10²³ = 2.56×10²¹ atoms. Energy = 2.56×10²¹ × 200 MeV × 1.6×10⁻¹³ J/MeV = 8.2×10¹⁰ J. Compare to 1 gram of coal (~30 kJ). Ratio: 8.2×10¹⁰/3×10⁴ ≈ 2.7×10⁶. Students viscerally feel the scale difference.

### Demo 3: Reactor Power Calculation
Materials: Calculator.
A 1 GW(electric) power reactor (efficiency ~33%): thermal power = 3 GW. Fission rate = 3×10⁹ J/s / (200×10⁶×1.6×10⁻¹⁹) J/fission = 9.4×10¹⁹ fissions/second. Annual fuel consumption: (9.4×10¹⁹ × 3.15×10⁷ s/yr × 235 u) / Nₐ ≈ 870 kg/yr of ²³⁵U. Compare to a coal plant: ~3 million tonnes of coal/yr. Students see the energy density difference.

---

## 8. Discovery Lesson

**Title**: "Why Does Uranium Release 10 Million Times More Energy Than Coal?"

**Hook**: "Both uranium fission and coal burning produce heat. But 1 kg of ²³⁵U releases as much energy as ~2,700 tonnes of coal. Why?"

**Exploration**:
1. Coal burning: C + O₂ → CO₂; energy per bond ≈ 4 eV; one carbon atom → 4 eV.
2. Uranium fission: ²³⁵U + n → fragments + 200 MeV = 200,000,000 eV.
3. Ratio: 200 MeV / 4 eV = 5×10⁷. Factor of 50 million.
4. Why? Coal energy from electrons (chemical bonds, eV scale). Fission energy from nucleons (nuclear strong force, MeV scale). The strong force is 10⁷× stronger per nucleon than electromagnetic force for typical bonding.
5. This is why a nuclear submarine can operate for 25 years on one fuel load, while a diesel submarine must refuel every few days.

---

## 9. Teaching Actions

**session_cap**: 6

1. **BE/A curve revisit**: Ask student to read off BE/A for U (~7.6) and for A~115 (~8.5). Ask: "If uranium splits into two A~115 nuclei, does the system gain or lose energy? By how much per nucleon? Total?"
2. **Balanced fission equation**: Present ²³⁵U + n → ? + ?. Students apply conservation of A and Z to identify possible fragment pairs.
3. **Q-value estimation**: Students compute Q ≈ (8.5 − 7.6) × 235 = 212 MeV. Confirm against measured 200 MeV.
4. **Chain reaction mechanics**: Draw 3 generations of fission; define k. Classify k < 1, k = 1, k > 1.
5. **Reactor vs. bomb**: Enrichment levels, prompt vs. delayed neutrons, control mechanisms. Address the "reactor explosion" misconception explicitly.
6. **Energy density**: Students compute energy per gram of ²³⁵U and compare to coal.

---

## 10. Voice Teaching

**Opening move**: "Uranium fission releases 200 MeV per nucleus. Let's trace exactly where that comes from — and why one gram of uranium equals 2,700 tonnes of coal."

**Core explanation**: "Look at the BE/A curve. Uranium sits at ~7.6 MeV/nucleon. Split it into mid-mass nuclei at ~8.5 MeV/nucleon. The difference — 0.9 MeV/nucleon — times 235 nucleons gives ~210 MeV of energy released. The fragments are more tightly bound; the nuclear glue was stronger. That's where the energy came from."

**Common error interception**: "The multiplication factor k is not the number of neutrons per fission. It's the net number that cause fission after accounting for all losses. In a reactor, those 2.4 neutrons per fission — most are absorbed by other things. k is the fraction that survive to cause the NEXT fission."

**Checkpoint question**: "A reactor has k = 1.001. It's slightly supercritical. Will the power stay constant, grow, or shrink?" (Grow — exponentially. That's why control rods must be inserted immediately to bring k back to 1.)

**Closing move**: "Nuclear reactors and weapons are the same physics — chain reactions — but with entirely different engineering: fuel enrichment, neutron speed, geometry, and control mechanisms. The physics is one thing; the engineering choices are what separate a power plant from a bomb."

---

## 11. Assessment

### Mastery Gate
Student can: (1) estimate Q from BE/A values, (2) balance a fission equation, (3) define k and classify reactor conditions, (4) explain the role of delayed neutrons in reactor control, (5) debunk the "reactor explosion" misconception.

### Formative Assessment 1 — Q estimation
**Prompt**: "Using BE/A(²³⁵U) = 7.59 MeV/nucleon and average BE/A(products) = 8.40 MeV/nucleon, estimate Q for ²³⁵U fission."
**Expected answer**: Q ≈ (8.40 − 7.59) × 235 = 0.81 × 235 = 190 MeV. Accept 180–210 MeV.
**Threshold**: Within 10% of 190 MeV; must show ΔBE/A × A calculation.

### Formative Assessment 2 — Balancing fission
**Prompt**: "Complete the fission reaction: ²³⁵U + ¹n → ⁹⁰Sr + ? + 2¹n."
**Expected answer**: A of unknown: 235 + 1 − 90 − 2 = 144. Z of unknown: 92 − 38 = 54. Unknown: ¹⁴⁴Xe (xenon-144).
**Threshold**: Correct Z = 54 and A = 144.

### Formative Assessment 3 — Criticality
**Prompt**: "A reactor has k = 0.95 initially and a mean neutron generation time of τ = 0.1 s. Starting with N₀ = 10⁶ neutrons, how many neutrons are there after 1 s (10 generations)?"
**Expected answer**: N = 10⁶ × (0.95)^10 = 10⁶ × 0.599 ≈ 5.99 × 10⁵.
**Threshold**: ~6 × 10⁵ (within 5%).

### Formative Assessment 4 — Conceptual (reactor vs. bomb)
**Prompt**: "Explain in 3 sentences why a nuclear reactor cannot explode like a nuclear bomb."
**Expected answer**: (1) Reactor fuel is ~3% enriched ²³⁵U, too dilute for the rapid supercritical configuration required for a nuclear explosion. (2) Reactors operate in the delayed-critical regime — controlled by delayed neutrons over milliseconds to seconds, allowing mechanical control. (3) Weapons require prompt-critical geometry assembled in microseconds from ≥90% enriched fissile material — impossible with reactor fuel and design.
**Threshold**: Must include enrichment difference AND delayed neutron control AND prompt-critical distinction.

### Confidence Calibration
After FA1: "How confident (0–100%) are you in your Q estimate? What's the main source of uncertainty?" (BE/A values are averages over the yield distribution; actual Q varies by fission fragment pair.)

### Delayed Retrieval
Two weeks later: Without notes, explain the role of delayed neutrons in reactor control; state why their absence would make reactor control impossible; estimate reactor neutron generation time with delayed neutrons.

---

## 12. Recovery Notes

### S0 — Block: "I don't understand what chain reaction means"
Draw the simplest case: 1 neutron → fission → 2 neutrons → 2 fissions → 4 neutrons → 4 fissions → 8 neutrons... This is k = 2 (unrealistic but illustrative). For k = 1: each fission produces 1 net neutron → steady production. For k = 0.9: each generation has 90% of the previous → dying chain reaction. Ask: "What k is needed for a reactor to maintain constant power?" (k = 1.) "What must operators do if k rises to 1.01?" (Insert control rods to absorb neutrons.)

### S3 — Can describe fission but cannot balance equations
Recall conservation rules: ΣZ_reactants = ΣZ_products; ΣA_reactants = ΣA_products. For ²³⁵U + n: total A = 236, total Z = 92. Fission into two fragments (Z₁ + Z₂ = 92, A₁ + A₂ = 236 − neutrons emitted). Balance Z first to identify elements; then A to get mass numbers.

### S6 — Understands the physics but confused about reactor safety
Four key safety mechanisms: (1) delayed neutrons (timescale for control); (2) Doppler broadening (negative temperature coefficient in U-238 absorber); (3) void coefficient (water moderator loss reduces moderation → k drops in most designs); (4) control rods (mechanical absorbers). The Chernobyl reactor had a positive void coefficient — a known design flaw (RBMK reactor). Modern reactors (PWR, BWR) have negative feedback coefficients — inherently safer.

### S9 — Cannot connect to energy policy and climate
Nuclear fission produces ~200 MeV per event, zero CO₂ in operation, and ~870 kg of ²³⁵U consumed per GW-year. Nuclear waste is ~30 tonnes of high-level waste per GW-year — compact but highly radioactive. Students should be able to compare this to 3×10⁶ tonnes of CO₂ per GW-year for a coal plant, and make informed arguments about the trade-offs (waste vs. climate).

---

## 13. Memory and Review

### Memory Type
Conceptual (why fission releases energy from BE/A curve) + procedural (balancing equations, k factor calculation) + declarative (key facts: Q ≈ 200 MeV, reactor enrichment ~3%, delayed neutrons ~0.65%, control mechanism).

### Spaced Retrieval Schedule
- Day 1: Estimate Q for ²³⁵U fission using BE/A values.
- Day 3: Balance a new fission equation (different fragment pair).
- Day 7: Compute N after 5 generations with k = 1.02 and N₀ = 10⁶.
- Day 14: Explain in 4 sentences why delayed neutrons make reactor control possible.
- Day 30: Compare energy per kg from ²³⁵U fission vs. gasoline; explain the difference using nuclear physics.

### Interleaving Partners
- phys.mod.binding-energy (BE/A curve — foundation of Q-value explanation)
- phys.mod.nuclear-reactions (Q-value from mass defect — same physics)
- phys.mod.radioactivity (fission products are radioactive → waste problem)

---

## 14. Transfer Map

### Near Transfer
- Estimate Q for any fission reaction using BE/A values.
- Balance fission equations and identify fragment pairs.
- Compute neutron population evolution for given k and τ.

### Far Transfer
- **Energy policy**: Nuclear reactor capacity factors, CO₂ emissions, waste volumes — using Q value and fission rate calculations.
- **Weapons physics**: Subcritical → supercritical transition; enrichment requirement; implosion vs. gun-type design (qualitative only).
- **Medical physics**: Fission-produced isotopes (Mo-99 → Tc-99m) for SPECT imaging — produced in research reactors, demand sensitive to reactor availability.

### Structural Abstraction
The chain reaction concept — one event produces multiple triggers for the next event — appears in: epidemic modeling (R₀ = reproduction number, k analog), information virality, avalanche dynamics, and economic multiplier effects. The mathematics of k factors and exponential growth/decay applies directly. Nuclear criticality is the canonical physical example of this universal branching-process mathematics.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.mod.binding-energy provides the BE/A curve and the conceptual link between mass defect and energy release. Without that foundation, students cannot understand WHY fission releases energy. The prerequisite is necessary and sufficient.

### Unlock Readiness
Leaf node — no further KG unlocks. However, this blueprint connects deeply to energy policy discussions, nuclear waste, and weapons non-proliferation — cross-domain connections should be flagged.

### Suggested Flag
Consider teaching phys.mod.nuclear-fission and phys.mod.nuclear-fusion in the same session or consecutive sessions, contrasting the two on the same BE/A diagram. Their educational value is greatly enhanced by comparison.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
