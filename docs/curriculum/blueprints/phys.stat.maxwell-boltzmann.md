# Teaching Blueprint: Maxwell-Boltzmann Speed Distribution

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.stat.maxwell-boltzmann |
| **Name** | Maxwell-Boltzmann Speed Distribution |
| **Domain** | Statistical Physics |
| **Difficulty** | Advanced |
| **Bloom Level** | Apply |
| **Estimated Hours** | 6 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.stat.boltzmann-factor |
| **Unlocks** | (none) |

---

## 1. Concept Spine

**One-sentence definition:** The Maxwell-Boltzmann speed distribution gives the probability distribution of molecular speeds in an ideal gas at thermal equilibrium: f(v) = 4π(m/2πk_BT)^(3/2) v² e^(−mv²/2k_BT).

**The core insight:** Not all molecules in a gas move at the same speed — they have a broad distribution determined by temperature. The distribution arises from three competing factors: the Boltzmann factor (higher speeds are exponentially less probable), the density of states (more directions available at higher speeds — the v² factor), and normalization. Temperature shifts the distribution; at higher T, the peak moves to higher speed and the distribution broadens.

**Conceptual chain:**
1. Kinetic theory: gas molecules move in random directions with a distribution of speeds.
2. Boltzmann factor: probability of speed v ∝ e^(−mv²/2k_BT) (kinetic energy ½mv²).
3. Phase space density of states: the number of velocity vectors with speed between v and v+dv is proportional to the surface area of a sphere of radius v → factor v².
4. Speed distribution: f(v) = 4π n(m/2πk_BT)^(3/2) v² e^(−mv²/2k_BT), normalized so ∫₀^∞ f(v) dv = n (total particle density).
5. Characteristic speeds:
   - Most probable speed: v_p = √(2k_BT/m) (peak of f(v))
   - Mean speed: ⟨v⟩ = √(8k_BT/πm)
   - RMS speed: v_rms = √(3k_BT/m) = √(3RT/M) (used in kinetic energy ½mv_rms² = 3/2 k_BT)
6. Temperature dependence: all three speeds scale as √T — doubling T increases speeds by factor √2.
7. Mass dependence: all speeds scale as 1/√m — heavier molecules move slower at the same T.

**Central equations:**
- f(v) = 4π(m/2πk_BT)^(3/2) v² e^(−mv²/2k_BT)
- v_p = √(2k_BT/m)
- ⟨v⟩ = √(8k_BT/πm)
- v_rms = √(3k_BT/m)
- Ordering: v_p < ⟨v⟩ < v_rms (always, for Maxwell-Boltzmann)

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Ball-pit analogy: pour balls into a tilted box (the Boltzmann factor tilts the "energy landscape" against high speed). But there are many more directions to travel at high speed than at low speed (the v² factor). The distribution peaks where these two effects balance.
- Effusion demonstration: two gases at the same T in connected containers separated by a pinhole. Lighter gas (H₂) effuses faster than heavier gas (N₂) — Graham's law follows from the Maxwell-Boltzmann distribution.
- Temperature dial: as T increases, the whole distribution shifts right and flattens (broader, peak moves to higher v, but area under curve stays constant = total number of molecules).

### Representational (Iconic)
- Plot f(v) vs. v for nitrogen at T = 300 K, 600 K, 1200 K: show the shift and broadening.
- Mark v_p, ⟨v⟩, v_rms on the T = 300 K curve. Show v_p < ⟨v⟩ < v_rms.
- Compare H₂ and N₂ at the same T = 300 K: H₂ distribution is shifted to much higher speeds (lighter mass).
- The v² factor: show separately how e^(−mv²/2k_BT) falls with v, how v² rises with v, and how their product creates the peaked f(v) shape.

### Abstract (Symbolic)
- Derivation sketch: start from Boltzmann factor in 3D velocity space: f₃D(v_x, v_y, v_z) ∝ e^(−m(v_x²+v_y²+v_z²)/2k_BT). Convert to spherical coordinates: f(v) dv = f₃D × 4πv² dv → f(v) = C v² e^(−mv²/2k_BT). Determine C from normalization ∫₀^∞ f(v) dv = n.
- Find v_p: df/dv = 0 → 2v e^(−mv²/2k_BT) + v² × (−mv/k_BT)e^(−mv²/2k_BT) = 0 → 2 = mv_p²/k_BT → v_p = √(2k_BT/m).
- Gaussian integrals: ∫₀^∞ v² e^(−αv²) dv = √π/(4α^(3/2)), ∫₀^∞ v³ e^(−αv²) dv = 1/(2α²) — needed for normalization and ⟨v⟩.

### Transfer (+)
- Atmospheric escape: molecules at the high-speed tail of the Maxwell-Boltzmann distribution can escape Earth's gravity if v > v_escape = 11.2 km/s. H₂ and He escape slowly over geological time; N₂ and O₂ don't (explains atmospheric composition).
- Chemical reaction rates (Arrhenius): only molecules with kinetic energy > E_activation can react. Fraction with E > E_a ∝ e^(−E_a/k_BT) — the Boltzmann factor tail. Rate ∝ e^(−E_a/k_BT).
- Stellar nucleosynthesis: nuclear fusion in stellar cores requires collisions at v >> v_p (quantum tunneling assists, but the Maxwell-Boltzmann tail is essential for overcoming the Coulomb barrier).

---

## 3. Why Beginners Fail

**Mode 1 — Confusing v_p, ⟨v⟩, v_rms:** Students compute v_rms (from equipartition: ½mv_rms² = 3/2 k_BT) and assume it is the same as the most probable or mean speed. The three quantities differ and play different roles: v_p is the peak of f(v); ⟨v⟩ is the average speed; v_rms gives the average kinetic energy.

**Mode 2 — Forgetting the v² factor:** Students write f(v) ∝ e^(−mv²/2k_BT) without the v² density-of-states factor. This gives the distribution in one dimension, not the 3D speed distribution. The 3D distribution has a peak away from v = 0 precisely because of the v² factor.

**Mode 3 — Misinterpreting the high-speed tail:** Students think "very few molecules have high speed" means the probability is zero above some cutoff. The Maxwell-Boltzmann distribution has an infinite tail — there is always a nonzero probability of any speed. The tail is crucial for chemical kinetics and atmospheric escape.

**Mode 4 — Wrong temperature/mass scaling:** Students don't know whether doubling T doubles v_p or increases it by √2. Similarly for mass: students often say "lighter gas moves twice as fast" when it should be "moves √(m₂/m₁) times as fast."

---

## 4. Misconception Library

### MC-1: "The most probable speed, mean speed, and RMS speed are the same"
- **Probe:** "For nitrogen at 300 K, rank v_p, ⟨v⟩, v_rms from smallest to largest."
- **Characteristic phrase:** "They're all about 400 m/s for nitrogen."
- **Trigger:** All three speeds are computed from similar formulas (√k_BT/m) and give similar numerical values, so students equate them.
- **Conflict evidence [P28]:** v_p = √(2k_BT/m) ≈ 0.816 v_rms; ⟨v⟩ = √(8/3π) v_rms ≈ 0.921 v_rms. For N₂ (m = 4.65 × 10⁻²⁶ kg) at 300 K: v_p ≈ 422 m/s, ⟨v⟩ ≈ 476 m/s, v_rms ≈ 517 m/s — clearly different, approximately 10–20% apart.
- **Bridge [P30]:** "These three speeds characterize three different aspects of the distribution: v_p is where f(v) peaks, ⟨v⟩ is the arithmetic mean of all speeds, v_rms is the square root of the mean squared speed (used in kinetic energy). Because the distribution is skewed right (long high-speed tail), the mean is pulled above the mode, and the RMS is highest because squaring emphasizes the high-speed tail."
- **Replacement [P31]:** Always v_p < ⟨v⟩ < v_rms. The ratios are v_p : ⟨v⟩ : v_rms = √2 : √(8/π) : √3 ≈ 1 : 1.13 : 1.22.
- **Discrimination pairs [P33]:** Median household income vs. mean income vs. RMS income in a country with a long-tailed wealth distribution — they differ in the same way. The distribution is right-skewed; mean > median > mode for a right-skewed distribution.
- **S6 repair path:** Compute all three speeds for H₂ and N₂ at 300 K. Verify the ordering v_p < ⟨v⟩ < v_rms numerically. Show why v_rms > ⟨v⟩ using Jensen's inequality: ⟨v²⟩ ≥ ⟨v⟩² (equality only for a delta distribution).

### MC-2: "The speed distribution f(v) ∝ e^(−mv²/2k_BT) is missing the v² factor"
- **Probe:** "What is f(0) for the Maxwell-Boltzmann distribution? Should it be zero or positive?"
- **Characteristic phrase:** "f(v) is just the Boltzmann factor e^(−mv²/2k_BT)."
- **Trigger:** The Boltzmann factor is introduced first, and students apply it directly to speed without considering phase space.
- **Conflict evidence [P28]:** f(0) = 0 for the Maxwell-Boltzmann distribution — the probability density for speed = 0 is zero. Without the v² factor, f(0) = C × e^0 = C ≠ 0. The v² factor is essential: there is only one way to have speed exactly zero (all velocity components zero), but there are many directions for any nonzero speed.
- **Bridge [P30]:** "In 3D, speed v = |v⃗|. The number of velocity vectors with speed between v and v+dv is the volume of a spherical shell: 4πv² dv. This geometric factor v² appears in the speed distribution as the 'density of states.' At low v, very few velocity vectors have that speed (small spherical shell area); at high v, many velocity vectors exist but Boltzmann factor exponentially suppresses them."
- **Replacement [P31]:** f(v) = C × v² × e^(−mv²/2k_BT). The v² factor ensures f(0) = 0 and creates the peak away from zero. Without v², the formula gives the 1D velocity component distribution (which does peak at zero — that is correct for velocity, not speed).
- **Discrimination pairs [P33]:** 1D velocity distribution: f(v_x) ∝ e^(−mv_x²/2k_BT) — Gaussian, peaks at v_x = 0. 3D speed distribution: f(v) ∝ v² e^(−mv²/2k_BT) — peaks at v_p > 0. Different objects, different physics.
- **S6 repair path:** Draw f₃D in velocity space (symmetric Gaussian around origin). Transform to spherical coordinates: probability of speed in (v, v+dv) = f₃D × 4πv² dv → the v² geometric factor enters automatically.

### MC-3: "The high-speed tail is negligible — no molecules have very high speed"
- **Probe:** "What fraction of N₂ molecules at 300 K have speed greater than 3v_rms ≈ 1550 m/s?"
- **Characteristic phrase:** "Essentially zero molecules move faster than 2000 m/s."
- **Trigger:** The exponential decay of f(v) makes students think the tail is effectively zero above a few multiples of v_rms.
- **Conflict evidence [P28]:** The fraction above 3v_rms is small (~10⁻⁵) but nonzero. In a mole of gas (6 × 10²³ molecules), that's ~6 × 10¹⁸ molecules — an enormous number. The tail drives atmospheric escape, chemical reaction rates, and star formation.
- **Bridge [P30]:** "The Maxwell-Boltzmann distribution has an infinite tail. The fraction above any finite speed is always positive. In a macroscopic sample, 'exponentially rare' still means billions of molecules. For processes with exponential activation barriers (chemistry, nuclear fusion), the tail is everything — the rate is controlled entirely by molecules in the tail."
- **Replacement [P31]:** The high-speed tail is thermally thin but physically crucial. Rate processes with energy barrier E_a depend on e^(−E_a/k_BT) — this is the Boltzmann tail fraction at energy E_a. Small changes in T dramatically change this fraction.
- **Discrimination pairs [P33]:** A lottery with odds of 1 in 10⁷ pays out once per week because millions of tickets are sold. Similarly, rare high-speed molecules drive chemistry because there are Avogadro's number of them.
- **S6 repair path:** Calculate the escape fraction for H₂ vs. N₂ from Earth's atmosphere (v_escape = 11.2 km/s) using the Maxwell-Boltzmann tail. H₂ has a much larger tail fraction — explains why Earth has almost no H₂ in its atmosphere but retains N₂.

### MC-4: "Doubling the temperature doubles the mean speed"
- **Probe:** "The temperature of a gas doubles from 300 K to 600 K. By what factor does v_rms change?"
- **Characteristic phrase:** "Hotter gas has twice the speed — temperature and speed are proportional."
- **Trigger:** Temperature and average kinetic energy are proportional (½mv_rms² = 3/2 k_BT). Students confuse energy proportionality with speed proportionality.
- **Conflict evidence [P28]:** v_rms = √(3k_BT/m). If T doubles: v_rms → √(3k_B × 2T/m) = √2 × v_rms. Speed increases by √2 ≈ 1.41, not 2. Energy doubles (as it should), but speed only increases by √2.
- **Bridge [P30]:** "Kinetic energy ∝ v². So KE ∝ T means v² ∝ T, which means v ∝ √T — not v ∝ T. Doubling T doubles the energy but only increases speed by √2."
- **Replacement [P31]:** v_p, ⟨v⟩, v_rms all ∝ √T. To double the speed, you need to increase T by a factor of 4.
- **Discrimination pairs [P33]:** A car's kinetic energy is ½mv². Doubling speed quadruples the kinetic energy (braking distance is proportional to v²). Conversely, doubling kinetic energy only increases speed by √2.
- **S6 repair path:** Compute v_rms for N₂ at T = 300, 600, 1200 K. Verify: √(600/300) = √2 ≈ 1.41; √(1200/300) = 2. Ask student to generalize: v ∝ √T.

---

## 5. Explanation Library

**Explanation A — The two competing factors (conceptual):**
"Imagine trying to throw a ball as fast as possible. At very low speeds, there's only one way to do it — basically no motion. At higher speeds, there are many directions you can throw (more configurations). That's the v² factor — more freedom at higher speeds. But the Boltzmann factor punishes high speeds exponentially — kinetic energy costs. The Maxwell-Boltzmann distribution peaks where these two effects balance: enough phase space volume to matter (v² term) but not so much energy that it's Boltzmann-suppressed. The peak is at v_p = √(2k_BT/m)."

**Explanation B — Derivation in 3D velocity space (mathematical):**
"In 3D, each molecule has velocity v⃗ = (v_x, v_y, v_z). The probability distribution in velocity space is f₃D ∝ e^(−m|v⃗|²/2k_BT) — a 3D Gaussian. To find the speed distribution, we integrate over all directions: f(v)dv = f₃D × (volume of shell between v and v+dv) = f₃D × 4πv² dv. This gives f(v) = C v² e^(−mv²/2k_BT). Normalization (∫₀^∞ f(v) dv = n) fixes C = 4πn(m/2πk_BT)^(3/2)."

**Explanation C — Characteristic speeds derivation (procedural):**
"Most probable speed: set df/dv = 0. Since f = Cv² e^(−αv²) where α = m/2k_BT, df/dv = C(2v − 2αv³)e^(−αv²) = 0 → v² = 1/α → v_p = √(1/α) = √(2k_BT/m).
Mean speed: ⟨v⟩ = ∫₀^∞ v f(v) dv / n. Need ∫₀^∞ v³ e^(−αv²) dv = 1/(2α²). Result: ⟨v⟩ = √(8k_BT/πm).
RMS speed: ⟨v²⟩ = ∫₀^∞ v² f(v) dv / n. Need ∫₀^∞ v⁴ e^(−αv²) dv = 3√π/(8α^(5/2)). Result: v_rms = √(3k_BT/m)."

---

## 6. Analogy Library

**Primary analogy — The lottery ticket distribution:**
The Maxwell-Boltzmann distribution is like a lottery where: (1) buying an expensive ticket (high speed = high kinetic energy) is exponentially more expensive (Boltzmann penalty), but (2) there are more types of expensive tickets (more combinations = v² density of states). The "peak" ticket price is where these two effects balance. At higher temperatures (richer economy), people can afford more expensive tickets, shifting the peak.

**Breaking point:** The lottery is a discrete system with a maximum number of tickets. The Maxwell-Boltzmann distribution has no maximum speed (infinite tail). Also, lottery ticket buyers make choices; molecular speeds are determined by random collisions, not decisions.

**Anti-analogy:** Do NOT say "molecules travel at speed v_rms — that's the most common speed." v_p (not v_rms) is the most probable speed. v_rms is the root-mean-square, useful for kinetic energy but not the peak of the distribution.

---

## 7. Demonstration Library

**Demo 1 — PhET gas properties simulation:**
Use the "Gas Properties" PhET simulation. Set T = 300 K. Display speed histogram alongside the theoretical Maxwell-Boltzmann curve. Raise T to 600 K: show the distribution shifting and broadening. Lower mass (switch from N₂ to H₂): show distribution shifting to higher speeds.

**Demo 2 — Numerical calculation of v_p, ⟨v⟩, v_rms:**
For N₂ (M = 28 g/mol) at T = 300 K:
- v_p = √(2RT/M) = √(2 × 8.314 × 300 / 0.028) = √(178,157) ≈ 422 m/s
- ⟨v⟩ = √(8RT/πM) = √(8 × 8.314 × 300 / π × 0.028) ≈ 476 m/s
- v_rms = √(3RT/M) = √(3 × 8.314 × 300 / 0.028) ≈ 517 m/s
Mark all three on the Maxwell-Boltzmann curve for N₂.

**Demo 3 — Atmospheric escape calculation:**
Escape velocity from Earth: v_escape = 11.2 km/s = 11,200 m/s.
For H₂ (M = 2 g/mol) at T = 300 K: v_rms = √(3 × 8.314 × 300 / 0.002) ≈ 1934 m/s. While most H₂ is below escape velocity, the tail fraction at 11,200 m/s (≈ 5.8 × v_rms for H₂) is small but nonzero. Over billions of years, the tail-fraction molecules escape → Earth has lost its H₂.
For N₂ (M = 28 g/mol) at T = 300 K: v_rms ≈ 517 m/s. v_escape is ~22 v_rms. Tail fraction is negligibly small — N₂ retained over billions of years.

---

## 8. Discovery Lesson

**Opening (5 min):** "Room temperature air. All the molecules have the same kinetic energy — true or false?" Take votes. Show: false — there is a distribution. "What is the shape of that distribution?"

**Guided inquiry (20 min):**
- Step 1: Students plot e^(−mv²/2k_BT) vs. v for N₂ at 300 K. What shape? (Monotonically decreasing from v=0.)
- Step 2: Students plot 4πv² vs. v. What shape? (Monotonically increasing from zero.)
- Step 3: Students multiply: f(v) ∝ v² e^(−mv²/2k_BT). Find where df/dv = 0. (v_p = √(2k_BT/m).)
- Step 4: Students compute v_p for H₂ vs. N₂ at 300 K. Compare. "Which gas has more molecules at high speed?" (H₂.)
- Step 5: Using the PhET simulation, verify predictions from steps 3 and 4.

**Synthesis (10 min):**
- Write f(v) with all three factors: normalization constant, v², Boltzmann factor.
- Discuss: what changes with T? (All characteristic speeds shift by √T.) What changes with m? (Inverse √m.)
- Preview: chemical reaction rates and atmospheric escape.

**Closure:** "The Maxwell-Boltzmann distribution is not just a theoretical curiosity. It tells you which molecules react, which escape gravity, and which are responsible for heat flow. It is the speed profile of every gas you have ever breathed."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN]:** Explanation A (two competing factors) + Explanation B (derivation sketch from 3D velocity space). Emphasize the role of the v² density-of-states factor.

**TA-2 [DEMONSTRATE]:** Demo 1 (PhET simulation) — vary T and mass, observe distribution shift. Demo 2 (numerical calculation of v_p, ⟨v⟩, v_rms for N₂).

**TA-3 [PROBE]:** MC-1 probe ("Rank v_p, ⟨v⟩, v_rms") and MC-2 probe ("What is f(0)?"). Resolve both misconceptions before calculation practice.

**TA-4 [APPLY]:** Demo 3 (atmospheric escape). Assign: "Calculate the ratio of v_rms for H₂ vs. O₂ at 300 K. Why does Earth retain O₂ but not H₂?" Then: Arrhenius equation application — fraction of molecules above E_activation = ε at T = 300 K and T = 600 K. Show the dramatic change in rate.

---

## 10. Voice Teaching

**Opening:**
"Here's a thought experiment. Take a box of air at room temperature. Every molecule has the same temperature — temperature is a property of the whole system. But does every molecule move at the same speed? If they did, what would happen in a collision between two molecules with exactly the same kinetic energy at different angles? The answer is: the speeds would randomize. Temperature equilibrium doesn't mean identical speeds — it means a specific distribution of speeds. Maxwell derived this distribution in 1860. Let's see what he found."

**At the v² factor:**
"The key insight is that in 3D, there are many more ways to move fast than to move slowly. Not because fast motion is preferred — it costs energy. But because in 3D velocity space, the number of directions increases as the square of the speed. A sphere of radius 2v has four times the surface area of a sphere of radius v. So there are four times as many ways to have speed 2v as speed v. This geometric factor competes with the Boltzmann exponential suppression of high speeds. The distribution peaks where they balance."

**At v_p vs. ⟨v⟩ vs. v_rms:**
"Three different speeds, three different questions. 'Most common speed?' — that's v_p, the peak. 'Average speed of all molecules?' — that's ⟨v⟩. 'What speed gives the right average kinetic energy?' — that's v_rms. They're all close (within 20% of each other) but not equal. v_rms is highest because squaring the speed before averaging gives extra weight to the high-speed tail — and the Maxwell-Boltzmann tail extends to infinity."

---

## 11. Assessment

**Mastery gate:** Student correctly writes f(v) with all factors, computes v_p from df/dv = 0, computes v_rms from ½mv_rms² = 3/2 k_BT, and correctly identifies f(0) = 0 and the ordering v_p < ⟨v⟩ < v_rms. Score ≥ 80%.

**FA-1 — Formula identification:**
*Q: Write the Maxwell-Boltzmann speed distribution f(v). Identify each factor and its physical origin. What is f(0)?*
Expected: f(v) = 4πn(m/2πk_BT)^(3/2) v² e^(−mv²/2k_BT). Factor 1: normalization. Factor 2: v² — density of states in 3D velocity space (number of velocity vectors with speed v). Factor 3: e^(−mv²/2k_BT) — Boltzmann factor, probability of energy ½mv². f(0) = 0 (v² = 0 at v = 0).
Threshold: Must identify v² as density of states (not arbitrary), and correctly give f(0) = 0.

**FA-2 — Characteristic speed calculation:**
*Q: Calculate v_p and v_rms for O₂ (M = 32 g/mol) at T = 400 K. R = 8.314 J/mol/K.*
Expected: v_p = √(2RT/M) = √(2 × 8.314 × 400/0.032) = √(207,850) ≈ 456 m/s. v_rms = √(3RT/M) = √(3 × 8.314 × 400/0.032) = √(311,775) ≈ 558 m/s.
Threshold: Correct formulas (2RT vs. 3RT), correct arithmetic (±20 m/s).

**FA-3 — Temperature scaling:**
*Q: Helium (M = 4 g/mol) is at T₁ = 300 K. At what temperature T₂ does its v_rms equal the v_rms of N₂ (M = 28 g/mol) at 300 K?*
Expected: v_rms = √(3RT/M). For equal v_rms: T_He/M_He = T_N₂/M_N₂ → T_He = T_N₂ × M_He/M_N₂ = 300 × 4/28 ≈ 43 K. Helium must be cooled to ~43 K to have the same rms speed as N₂ at 300 K.
Threshold: Correct proportionality argument and answer.

**FA-4 — Application to chemical kinetics:**
*Q: The activation energy for a reaction is E_a = 0.5 eV. Estimate by what factor the fraction of molecules exceeding this energy increases when T rises from 300 K to 600 K. (k_B = 8.62 × 10⁻⁵ eV/K)*
Expected: Fraction ∝ e^(−E_a/k_BT). At 300 K: βE_a = 0.5/0.02586 ≈ 19.3. At 600 K: βE_a = 0.5/0.05172 ≈ 9.67. Ratio = e^(19.3)/e^(9.67) = e^(9.63) ≈ 15,000. Doubling T increases the reactive fraction by a factor ~15,000.
Threshold: Correct identification of e^(−E_a/k_BT) as the relevant fraction, correct ratio calculation showing dramatic enhancement.

**Confidence calibration:** After FA-2, students rate confidence. Students who use the correct formula but make an arithmetic error (and are confident they're wrong) receive targeted encouragement; students who use the wrong formula (v_rms = √(2RT/M)) and are confident receive targeted correction of v_p vs. v_rms distinction.

**Delayed retrieval (session + 3):** "State the Maxwell-Boltzmann speed distribution. What is the most probable speed? Why is v_rms > v_p?"

---

## 12. Recovery Notes

**S0:** Student needs phys.stat.boltzmann-factor — the Boltzmann factor e^(−E/k_BT) is the probability weight for kinetic energy ½mv². Without this, the exponential factor in f(v) is unmotivated.

**S3:** Student can apply f(v) but doesn't understand the v² factor. Use the 3D velocity space argument (Demo 2 setup) — draw the velocity sphere and count the number of points on spherical shells of different radii.

**S6:** Student confuses v_p, ⟨v⟩, v_rms. Use the numerical comparison for N₂ (Demo 2) and have the student compute all three from scratch. Require the student to state which formula applies to each and why.

**S9:** Derive the Maxwell-Boltzmann distribution for energy E rather than speed v. Use dN/dE = f(v) × dv/dE = f(v)/|dE/dv| where E = ½mv². Show: dN/dE ∝ E^(1/2) e^(−E/k_BT) — the density of states factor becomes √E for energy. This is the foundation for understanding the density of states in quantum statistical mechanics.

---

## 13. Memory & Review

**Memory type:** Procedural (characteristic speed formulas, scaling with T and m) + conceptual (v² density of states, three-factor structure of f(v)).

**Spaced retrieval schedule:**
- Session + 1: "What is the most probable speed? Write the formula. What is f(0) and why?"
- Session + 3: "Compare v_p, ⟨v⟩, v_rms: write all three formulas and rank them."
- Session + 7: "By what factor does v_rms change when T is tripled? When mass is quadrupled?"

**Interleaving partners:** phys.stat.boltzmann-factor (prerequisite — provides the exponential factor); phys.therm.kinetic-theory (related — provides the macroscopic context: pressure, temperature, equipartition); phys.stat.boltzmann-factor applications (reaction rates, atmospheric escape — transfer applications).

---

## 14. Transfer Map

**Near transfer:** Graham's law of effusion: rate of effusion ∝ ⟨v⟩ ∝ 1/√m. Lighter gases effuse faster — follows directly from the Maxwell-Boltzmann mean speed.

**Far transfer:** Stellar spectral line broadening: thermal motion of atoms causes Doppler shifts in emitted photons. The distribution of Doppler shifts follows the Maxwell-Boltzmann distribution → Gaussian line profile with width ∝ √T. Measuring line widths gives the stellar temperature.

**Structural abstraction:** "Phase space volume times Boltzmann weight = probability density." This pattern generalizes to all of statistical mechanics: the density of states × Boltzmann factor always appears together. In quantum statistics, the density of states is modified (Fermi-Dirac or Bose-Einstein replaces the classical Boltzmann factor), but the structure remains.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.stat.boltzmann-factor is necessary. phys.therm.kinetic-theory is strongly recommended (students need the microscopic model of an ideal gas to contextualize the speed distribution).
- **Unlock readiness:** No formal unlocks. However, the Maxwell-Boltzmann distribution is a prerequisite for understanding activation energy (chemistry), atmospheric composition, and stellar spectroscopy.
- **Difficulty calibration:** Advanced/apply is correct. The derivation requires 3D integration and Gaussian integrals (advanced mathematics), but the formulas themselves are straightforward to apply. The conceptual content (three competing factors in f(v), three characteristic speeds) is the main challenge.
- **Suggested problem set:** (1) Compute v_p, ⟨v⟩, v_rms for H₂, N₂, O₂ at 300 K — tabulate and compare. (2) At what temperature does v_rms of N₂ equal 1000 m/s? (3) By what factor does the fraction of O₂ molecules with E > 1 eV change as T goes from 300 K to 1000 K? (4) Calculate the ratio of effusion rates of He vs. N₂ through a pinhole (Graham's law).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
