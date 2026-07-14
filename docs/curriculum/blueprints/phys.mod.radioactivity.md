# Teaching Blueprint: Radioactivity — Alpha, Beta, Gamma Decay

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.mod.radioactivity |
| **Name** | Radioactivity: Alpha, Beta, Gamma Decay |
| **Domain** | Modern Physics |
| **Difficulty** | Proficient |
| **Bloom Level** | Understand |
| **Estimated Hours** | 5 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.mod.atomic-spectra |
| **Unlocks** | phys.mod.radioactive-decay |

---

## 1. Concept Spine

**One-sentence definition:** Radioactivity is the spontaneous emission of alpha particles (⁴He nuclei), beta particles (electrons or positrons), or gamma rays (high-energy photons) from unstable atomic nuclei as they seek a more stable configuration.

**The core insight:** Nuclei, like atoms, exist in quantized energy states. An unstable nucleus is one where the strong nuclear force cannot hold the nuclear configuration together indefinitely — it decays to a lower-energy configuration, releasing the energy difference as radiation. The type of radiation reveals the type of nuclear rearrangement occurring.

**Conceptual chain:**
1. Nuclear stability: determined by the neutron-to-proton ratio. Too many neutrons, too few neutrons, or too large a nucleus → instability.
2. Alpha decay: nucleus emits a ⁴₂He nucleus. Reduces Z by 2, A by 4. Occurs in very heavy nuclei (A > 200) where electrostatic repulsion between protons destabilizes the nucleus.
3. Beta-minus decay: neutron → proton + electron + antineutrino. Z increases by 1, A unchanged. Occurs when N/Z too high.
4. Beta-plus decay: proton → neutron + positron + neutrino. Z decreases by 1, A unchanged. Occurs when N/Z too low.
5. Gamma decay: nucleus in excited state → ground state + high-energy photon. Z and A unchanged. Often follows alpha or beta decay.
6. Conservation laws: mass number A (total nucleons), atomic number Z (total charge), energy, momentum, lepton number all conserved in every decay.
7. Penetrating power: alpha (stopped by paper), beta (stopped by few mm Al), gamma (requires cm of Pb).

**Decay equations (symbolic notation):**
- Alpha: ᴬ_Z X → ᴬ⁻⁴_{Z-2} Y + ⁴₂He
- Beta-minus: ᴬ_Z X → ᴬ_{Z+1} Y + e⁻ + ν̄_e
- Beta-plus: ᴬ_Z X → ᴬ_{Z-1} Y + e⁺ + ν_e
- Gamma: ᴬ_Z X* → ᴬ_Z X + γ

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Geiger counter beside a radioactive source: audible clicks — each click is one decay event. Irregular timing → random, probabilistic process.
- Fog chamber (cloud chamber): show alpha tracks (short, thick, straight), beta tracks (longer, curvy, deflected by magnetic field), gamma (invisible, only secondary ionization tracks).
- Shielding demonstration: paper stops alpha; aluminum plate required for beta; thick lead for gamma.

### Representational (Iconic)
- Segré chart (N vs. Z): stable nuclei form a "valley of stability." Alpha decay moves a nucleus down-left (−2,−2). Beta-minus moves right (+1,0). Beta-plus moves left (−1,0). Gamma decay stays at same position.
- Decay sequence diagram: ²³⁸U → series of alpha and beta decays → ²⁰⁶Pb (uranium decay chain).
- Penetrating power diagram: source → paper → Al sheet → Pb block. Alpha stopped by paper; beta stopped by Al; gamma partially attenuated by Pb.

### Abstract (Symbolic)
- Write balanced equations for representative decays:
  - ²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He (alpha)
  - ¹⁴₆C → ¹⁴₇N + e⁻ + ν̄_e (beta-minus, carbon-14 dating)
  - ²²₁₁Na → ²²₁₀Ne + e⁺ + ν_e (beta-plus)
  - ⁶⁰₂₇Co* → ⁶⁰₂₇Co + γ (gamma, medical use)
- Conservation check: verify A, Z, and charge balance in each equation.
- Q-value: Q = (m_parent − m_daughter − m_products)c² > 0 for spontaneous decay (energy released).

### Transfer (+)
- Carbon-14 dating: ¹⁴C produced in atmosphere by cosmic rays; decays by beta-minus with t₁/₂ = 5730 years. Ratio of ¹⁴C/¹²C in organism decreases after death — rate gives age.
- Medical imaging: PET scan uses positron emitters (¹⁸F); annihilation photons at 511 keV detected.
- Nuclear power: fission of ²³⁵U produces beta and gamma radiation; shielding and coolant design determined by decay products.
- Smoke detectors: ²⁴¹Am (alpha emitter) ionizes air; smoke particles absorb ions, reducing current → detector triggers.

---

## 3. Why Beginners Fail

**Mode 1 — Confusing atomic and nuclear processes:** Students think radioactivity involves electrons changing shells (like atomic spectra). Alpha and beta decay involve the nucleus, not the electron shells. The nucleus, not the electrons, determines radioactive behavior.

**Mode 2 — Forgetting lepton/baryon conservation:** Students balance A and Z but don't write the neutrino in beta decay. This leaves the equation unbalanced in lepton number — a conserved quantity. Beta decay produces a (anti)neutrino that carries energy and lepton number.

**Mode 3 — Penetration and ionization confusion:** Students think "more penetrating = more dangerous." In fact, alpha particles are the most ionizing (most dangerous in the body, since dense ionization destroys cells) but the least penetrating (stopped by skin). Gamma is highly penetrating but sparsely ionizing.

**Mode 4 — Confusion of beta-plus with gamma:** Students confuse positron emission (beta-plus) with gamma emission because both involve "coming out of the nucleus" without changing A. Gamma changes neither A nor Z (excited nucleus → ground state, same nucleus). Beta-plus changes Z by −1.

---

## 4. Misconception Library

### MC-1: "Radioactivity comes from the electrons in the atom"
- **Probe:** "When radium decays by alpha emission, what part of the atom does the alpha particle come from?"
- **Characteristic phrase:** "The electrons jump and release radiation."
- **Trigger:** Students have just learned about atomic spectra (photons emitted by electron transitions). They generalize to radioactivity.
- **Conflict evidence [P28]:** An alpha particle is ⁴₂He — two protons and two neutrons. These are nuclear particles, not electrons. The nucleus of radium-226 contains 88 protons and 138 neutrons. After alpha decay, the daughter has 86 protons and 136 neutrons. Electron shells rearrange afterward, but they are not the source.
- **Bridge [P30]:** "Atomic spectra are electron transitions between shells — energy scale ~1–10 eV. Radioactive decay involves nuclear rearrangements — energy scale ~MeV, one million times larger. The nucleus is the seat of radioactivity."
- **Replacement [P31]:** Radioactive decay is a nuclear process. The nucleus emits alpha particles (nuclear fragments), electrons/positrons (created in the nucleus via weak force), or gamma photons (nuclear excited state to ground state — not electron transitions).
- **Discrimination pairs [P33]:** Atomic spectra: ΔE ~ eV, electrons, outer structure. Radioactivity: ΔE ~ MeV, nucleons, inner nucleus.
- **S6 repair path:** Write the decay equation for ²²⁶Ra → ²²²Rn + ⁴He. Show that Z decreases by 2 — the number of protons in the nucleus changes. Electrons don't change the proton count.

### MC-2: "Neutrinos don't need to be included in beta decay"
- **Probe:** "Balance the beta-minus decay of ¹⁴C. Is lepton number conserved without the antineutrino?"
- **Characteristic phrase:** "Beta decay: neutron → proton + electron."
- **Trigger:** Many introductory presentations say "beta-minus decay emits an electron" without mentioning the antineutrino, since neutrinos are hard to detect.
- **Conflict evidence [P28]:** The beta spectrum (distribution of electron kinetic energies) is continuous, not discrete. If only n → p + e⁻, the electron would have a fixed energy (by energy-momentum conservation). The observed continuous spectrum requires a third particle sharing the energy: the antineutrino. Pauli proposed the neutrino in 1930 precisely to explain this spectrum.
- **Bridge [P30]:** "The continuous beta spectrum was a crisis — energy seemed not to be conserved. Pauli solved it by proposing an invisible third particle (the neutrino) that carries the remaining energy. Without the antineutrino, energy conservation fails."
- **Replacement [P31]:** Beta-minus: n → p + e⁻ + ν̄_e. Beta-plus: p → n + e⁺ + ν_e. The (anti)neutrino always accompanies beta decay; without it, energy, momentum, and lepton number are not conserved.
- **Discrimination pairs [P33]:** Alpha decay has a discrete energy spectrum (alpha particles all have the same energy from a given decay) — because there are only two products (daughter + alpha). Beta decay has a continuous spectrum — because there are three products (daughter + electron + neutrino).
- **S6 repair path:** Show alpha spectrum (discrete line) vs. beta spectrum (continuous distribution) on the same plot. Ask: "What explains the difference in shape?" Lead to: two-body vs. three-body decay.

### MC-3: "Alpha particles are more dangerous than gamma rays because they carry more energy"
- **Probe:** "A gamma source and an alpha source with equal activity. Which is more dangerous to (a) hold in your bare hand, (b) accidentally ingest?"
- **Characteristic phrase:** "Alpha is the most energetic, so it's the most harmful."
- **Trigger:** Students confuse ionizing power with penetrating power, and associate energy with danger without considering tissue context.
- **Conflict evidence [P28]:** (a) Hand: alpha is stopped by dead skin — negligible internal exposure. Gamma penetrates to internal organs. External gamma is more dangerous. (b) Ingested: alpha deposits all its energy in a tiny tissue volume — extreme local ionization density, high relative biological effectiveness (RBE ~ 20 for alpha vs. ~ 1 for gamma). Internal alpha is far more dangerous.
- **Bridge [P30]:** "Danger depends on both radiation type and exposure route. Alpha is highly ionizing — it deposits energy densely along a short track, causing clustered DNA damage. But it can't penetrate your skin. Once inside the body, that dense ionization makes it extremely damaging. Context determines danger."
- **Replacement [P31]:** Alpha = high ionizing power, low penetration (stopped by paper/skin). Beta = intermediate. Gamma = low ionizing power, high penetration (requires cm of Pb). External exposure: gamma most dangerous. Internal exposure (ingestion/inhalation): alpha most dangerous.
- **Discrimination pairs [P33]:** A flamethrower is dangerous if it reaches you (external alpha/gamma comparison) vs. a match in your mouth (internal alpha). Different mechanisms, different dangers.
- **S6 repair path:** Radiation protection triage: for a spilled alpha source, protective gloves and no ingestion are critical; for an external gamma field, distance + shielding is critical. Different protection strategies for different radiation types.

### MC-4: "Beta-plus decay is the same as gamma decay because Z doesn't change"
- **Probe:** "In beta-plus decay of ²²Na, does the atomic number change? Compare to gamma decay of ⁶⁰Co*."
- **Characteristic phrase:** "Positron emission doesn't change the nucleus."
- **Trigger:** Students confuse A unchanged (gamma) with A unchanged and Z unchanged (gamma) vs. A unchanged and Z−1 (beta-plus). The phrase "nucleus emits a particle" doesn't specify what kind.
- **Conflict evidence [P28]:** ²²₁₁Na → ²²₁₀Ne + e⁺ + ν_e: Z changes from 11 (Na) to 10 (Ne) — the element changes! ⁶⁰₂₇Co* → ⁶⁰₂₇Co + γ: Z stays at 27 (still Co) — the element does NOT change, only the nuclear energy state.
- **Bridge [P30]:** "Gamma decay: nucleus goes from excited to ground state — same nucleus, different energy. Beta-plus decay: a proton converts to a neutron — the element CHANGES (Z decreases by 1, new element). They both leave A unchanged, but gamma leaves Z unchanged while beta-plus decreases Z by 1."
- **Replacement [P31]:** Gamma: ᴬ_Z X* → ᴬ_Z X + γ (same Z, same A). Beta-plus: ᴬ_Z X → ᴬ_{Z-1} Y + e⁺ + ν_e (Z decreases by 1, new element). The key difference: does the element change?
- **Discrimination pairs [P33]:** Gamma is like a person changing clothes (same person, different energy state). Beta-plus is like a person becoming a different person (Z changes → different element).
- **S6 repair path:** Write both equations side by side with element symbols and Z values. Verify element names on both sides using the periodic table.

---

## 5. Explanation Library

**Explanation A — Nuclear instability (narrative):**
"Think of a nucleus as a tightly packed crowd in a small room. Small crowds (light nuclei) are fine — everyone gets along. Very large crowds (heavy nuclei like uranium) are chaotic — too many people jostling, too much repulsion. The nucleus tries to reach a calmer state by ejecting groups of people: an alpha particle (a tight subgroup of 2 protons + 2 neutrons) shoots out, and the remaining crowd settles. Sometimes individual rearrangements happen — a neutron converts to a proton (or vice versa) via the weak force, emitting an electron or positron. And sometimes the nucleus just releases excess energy as a gamma photon. The driving force is always the same: reaching a more stable nuclear configuration."

**Explanation B — Conservation law accounting (procedural):**
"Every decay equation must balance: (1) Mass number A = total nucleons — conserved. (2) Atomic number Z = total protons = total charge — conserved. (3) Lepton number — conserved (electron = +1, antineutrino = −1, cancel). Steps: write parent, identify decay type, write daughter (adjust A and Z), write all radiation products, verify all three conservation laws. Practice with: ²³⁸U → ? + ⁴₂He (alpha). Answer: A = 238−4 = 234, Z = 92−2 = 90 → ²³⁴₉₀Th."

**Explanation C — Detection and properties (applied):**
"Alpha radiation: high ionizing power (creates dense ionization trail), very low penetration (stopped by few cm of air or a sheet of paper). Detected by: Geiger counter, scintillation, cloud chamber (thick, straight tracks). Beta: medium ionization, medium penetration (few mm aluminum). Gamma: low ionization, high penetration (several cm of lead). Gamma detected by NaI scintillation detectors. In medical imaging, the goal is to select isotopes that emit penetrating radiation (gamma or positron → annihilation photons) that can exit the body and be detected externally."

---

## 6. Analogy Library

**Primary analogy — The overstuffed backpack:**
An overstuffed backpack is unstable: you rearrange it by removing items (alpha decay — remove a heavy subgroup), swapping items (beta decay — convert a neutron to a proton), or just settling the contents without removing anything (gamma — release energy without changing nuclear composition). The result is a more stable, lower-energy configuration.

**Breaking point:** A backpack can be continuously rearranged at will; nuclear decay is probabilistic and spontaneous — you cannot predict when a specific nucleus decays, only the statistical probability per unit time (half-life). Also, removing items from a backpack doesn't convert them into different items; beta decay creates new particles (electron, neutrino) that didn't exist before in the nucleus.

**Anti-analogy:** Do NOT say "radioactivity is like burning — the nucleus is on fire." Burning is a chemical process (electron rearrangement, ~eV per reaction). Radioactivity is nuclear (~MeV per decay, six orders of magnitude more energetic per event).

---

## 7. Demonstration Library

**Demo 1 — Cloud chamber visualization:**
Show video of cloud chamber with an alpha source (short, thick, straight tracks) and a beta source (long, curved, thin tracks). Point out the curvature of beta tracks in a magnetic field — negative charge curves one way, positive the other. Gamma rays leave no tracks (only sparse secondary ionization from Compton electrons).

**Demo 2 — Penetration experiment:**
Set up Geiger counter, then place paper, then Al sheet, then Pb block between source and counter. Record counts with each shielding layer:
- No shielding: high count (alpha + beta + gamma)
- Paper: alpha blocked (count decreases sharply)
- Al: beta blocked (count decreases further)
- Pb: gamma partially blocked (count decreases further)
Students identify which component of radiation is blocked by each material.

**Demo 3 — Decay equation practice (whiteboard):**
Systematically work through four equations, one of each type:
1. Alpha: ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He
2. Beta-minus: ¹⁴₆C → ¹⁴₇N + e⁻ + ν̄_e
3. Beta-plus: ²²₁₁Na → ²²₁₀Ne + e⁺ + ν_e
4. Gamma: ⁶⁰₂₇Co* → ⁶⁰₂₇Co + γ
Students verify A, Z, lepton number balance for each.

---

## 8. Discovery Lesson

**Opening (5 min):** "In 1896, Becquerel wrapped a uranium salt and a photographic plate in thick black paper and put them in a drawer. When he developed the plate, there was an image — even without sunlight. What was penetrating the paper? What was producing the image?"

**Exploration (15 min):**
- Students receive four decay equations with blanks (daughter nucleus or radiation product missing). Task: use conservation of A and Z to fill in the blanks.
- Compare: which decays change the element? (alpha: yes, Z−2; beta-minus: yes, Z+1; beta-plus: yes, Z−1; gamma: no.)
- Students rank alpha, beta, gamma by: (a) ionizing power, (b) penetrating power (provided data from Demo 2).

**Synthesis (10 min):**
- Students construct a summary table: Type | Change in A | Change in Z | Charge of emitted particle | Penetrating power | Ionizing power.
- Discuss: "A nuclear power plant produces gamma radiation and beta radiation from fission products. What shielding is required?"

**Closure:** "Radioactivity is not mysterious energy. It's nuclear instability finding its way to a more stable state — the same thermodynamic drive that makes water flow downhill. The difference is the energy scale: millions of electron volts per nuclear decay vs. a few electron volts for chemical reactions."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN]:** Deliver Explanation A (nuclear instability narrative) + show the Segré chart with the valley of stability and decay directions.

**TA-2 [DEMONSTRATE]:** Demo 1 (cloud chamber video) + Demo 2 (penetration experiment). Students build the penetration/ionization comparison table.

**TA-3 [PROBE + PRACTICE]:** Use MC-1 probe ("What part of the atom does the alpha particle come from?") and MC-2 probe ("Balance ¹⁴C beta decay without the antineutrino — what's wrong?"). Then Demo 3 (four decay equations on whiteboard).

**TA-4 [TRANSFER]:** Carbon-14 dating mechanism (beta-minus decay of ¹⁴C, t₁/₂ = 5730 years). Medical PET scan (beta-plus emitter → positron → annihilation → 511 keV photon pairs → detected by ring of detectors). Smoke detector (²⁴¹Am alpha emitter). Students identify the decay type used in each application.

---

## 10. Voice Teaching

**Opening:**
"In 1898, Marie Curie discovered that uranium wasn't the only radioactive element. She found thorium — and then polonium and radium. She noticed that the intensity of radiation was proportional to the amount of uranium present, not to its chemical form. This was a crucial clue: radioactivity is an atomic property, not a chemical one. And since chemistry is all about the electrons, radioactivity must come from somewhere deeper — the nucleus."

**At the decay types:**
"Three types of nuclear decay, three types of instability. Too heavy → alpha decay: the nucleus ejects a tight, stable subunit (⁴He) and gets smaller. Wrong neutron-to-proton ratio → beta decay: the weak nuclear force converts one type of nucleon to another, emitting an electron (or positron) and a neutrino. Excess energy after a decay → gamma: the nucleus releases that energy as a photon, just like an atom emitting visible light, but with a million times more energy."

**At the conservation law check:**
"Never write a radioactive decay equation without checking three things: Does A balance? Does Z balance? Does lepton number balance? If any of those fail, your equation is wrong. Nature does not allow non-conservation of any of these quantities. The neutrino was predicted to exist — before it was detected — because beta decay equations violated energy and lepton conservation without it."

---

## 11. Assessment

**Mastery gate:** Student correctly writes and balances all four decay types, identifies the decay type given a description, and correctly states penetration and ionization properties. Score ≥ 80%.

**FA-1 — Decay equation completion:**
*Q: Complete the following decay equations: (a) ²²⁶₈₈Ra → ___ + ⁴₂He. (b) ³²₁₅P → ³²₁₆S + ___ + ___.*
Expected: (a) ²²²₈₆Rn. (b) e⁻ + ν̄_e (antineutrino required for full credit).
Threshold: Correct A, Z in (a); correct beta-minus products including antineutrino in (b).

**FA-2 — Decay identification:**
*Q: A nucleus emits radiation with the following properties: penetrates 3 mm of aluminum but is stopped by 5 cm of lead. No change in A. What type of decay occurred?*
Expected: Beta decay — beta particles penetrate aluminum but are stopped by lead (not 5 cm exactly, but more than paper). But if A unchanged and also Z unchanged → gamma. If A unchanged and Z changes → beta. Without A/Z info, "stops in lead" and "penetrates aluminum" → beta or gamma. Answer: gamma if Z unchanged; beta-minus or beta-plus if Z changes. Award credit for any answer that correctly identifies the penetration characteristics as consistent with beta or gamma, and invokes the A/Z change distinction.
Threshold: Correctly states gamma rays are not stopped by aluminum and penetrate lead (requiring cm of Pb), so the described radiation is more consistent with beta. (Clarify: "penetrates 3 mm Al but stopped by 5 cm Pb" — beta is stopped by a few mm of Al; gamma requires cm of Pb. This radiation behaves like gamma. If Z unchanged: gamma. Award if student identifies the contradiction and resolves it.)

**FA-3 — Penetration and biological hazard:**
*Q: An alpha source and a gamma source both have the same activity (same number of decays per second). A worker is (a) standing 1 m away from each source, (b) accidentally swallows a small amount of each source. For each scenario, which source is more dangerous? Explain.*
Expected: (a) Gamma — alpha is stopped by air at 1 m, gamma penetrates to the worker's body. (b) Alpha — dense ionization in internal tissues causes extreme cellular damage; high RBE makes it more biologically effective per unit energy deposited internally.
Threshold: Correct answer for both scenarios with correct reasoning.

**FA-4 — Carbon dating:**
*Q: ¹⁴C has a half-life of 5730 years. Write the beta-minus decay equation for ¹⁴C. A sample of wood contains ¹/₄ of the ¹⁴C ratio present in living wood. How old is the sample?*
Expected: ¹⁴₆C → ¹⁴₇N + e⁻ + ν̄_e. Age = 2 × t₁/₂ = 2 × 5730 = 11460 years.
Threshold: Correct equation (including antineutrino) and correct age calculation.

**Confidence calibration:** After FA-1, student rates confidence before seeing the answer. Students who omit the antineutrino in (b) but are confident they're correct receive targeted feedback: "What is lepton number? Is it conserved here?"

**Delayed retrieval (session + 3):** "State the three types of radioactive decay. For each: what changes in A, what changes in Z, what is emitted."

---

## 12. Recovery Notes

**S0:** Student needs phys.mod.atomic-spectra as prerequisite — they must understand that atoms have nuclei before nuclear processes make sense. Briefly review nuclear vs. atomic structure.

**S3:** Student can identify decay types but cannot balance equations. Drill the conservation law checklist: A balance → Z balance → lepton balance. Use Demo 3 as a structured procedure.

**S6:** Student systematically confuses alpha (Z−2, A−4), beta-minus (Z+1, A unchanged), and beta-plus (Z−1, A unchanged). Build a summary table (as in the Discovery Lesson synthesis) and have the student fill it in from memory, then compare to the model.

**S9:** Introduce electron capture (p + e⁻ → n + ν_e) as an alternative to beta-plus for neutron-rich-deficient nuclei. Discuss the Geiger-Nuttall law for alpha decay (log of decay constant vs. energy — empirical precursor to quantum tunneling explanation in phys.qm). Preview nuclear binding energy as the driving force for all decays.

---

## 13. Memory & Review

**Memory type:** Declarative (decay types, properties, conservation laws) + procedural (balancing decay equations).

**Spaced retrieval schedule:**
- Session + 1: "State the three decay types. For each: what is emitted, and how do A and Z change?"
- Session + 3: "Write and balance the alpha decay of ²³⁸U. Write and balance the beta-minus decay of ¹⁴C."
- Session + 7: "Rank alpha, beta, gamma by: (a) ionizing power, (b) penetrating power. Give one application of each."

**Interleaving partners:** phys.mod.atomic-spectra (prerequisite — nuclear context vs. atomic context); phys.mod.radioactive-decay (unlock — quantitative half-life calculation, this concept provides the qualitative foundation); phys.mod.binding-energy (cross-concept — Q-value calculation requires binding energy).

---

## 14. Transfer Map

**Near transfer:** Nuclear medicine: ¹³¹I (beta-minus + gamma, thyroid treatment), ⁹⁹ᵐTc (gamma, SPECT imaging), ¹⁸F (beta-plus, PET). Each isotope selected for specific decay properties matching clinical need.

**Far transfer:** Cosmological nucleosynthesis: the Big Bang and stellar nucleosynthesis produce unstable isotopes whose beta decays define the composition of the universe. The r-process in neutron star mergers produces neutron-rich nuclei that decay through beta chains to stable heavy elements.

**Structural abstraction:** "Spontaneous transitions to lower-energy configurations." This pattern is universal: excited atoms emit photons (atomic spectra), excited nuclei decay (radioactivity), unstable particles decay (particle physics — muon → electron + neutrinos, pion → muon + neutrino). In all cases: conservation laws, energy release, characteristic timescale.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.mod.atomic-spectra is appropriate — students need the nuclear model and the concept of quantized energy states. Explicit coverage of nuclear structure (protons, neutrons, nuclear force) may be needed as a mini-review.
- **Unlock readiness:** phys.mod.radioactive-decay (quantitative half-life and decay constant) can follow immediately — this concept provides the qualitative understanding of what decays, the next concept quantifies how fast.
- **Difficulty calibration:** Proficient/understand is correct. The mathematics is minimal (A and Z arithmetic). The conceptual demands (three decay types, conservation laws, penetration/ionization properties) require systematic organization but not advanced mathematics.
- **Suggested lab:** Geiger counter + sealed sources (Ra-226, Sr-90, Co-60) with penetration experiment. Cloud chamber video if equipment unavailable. Carbon dating calculation as quantitative homework.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
