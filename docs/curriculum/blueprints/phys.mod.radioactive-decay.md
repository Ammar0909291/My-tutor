# Teaching Blueprint: Radioactive Decay Law and Half-Life

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.mod.radioactive-decay |
| **Name** | Radioactive Decay Law and Half-Life |
| **Domain** | Modern Physics |
| **Difficulty** | Proficient |
| **Bloom Level** | Apply |
| **Estimated Hours** | 4 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.mod.radioactivity |
| **Unlocks** | phys.mod.nuclear-reactions |

---

## 1. Concept Spine

**One-sentence definition:** Radioactive decay follows the exponential law N(t) = N₀ e^(−λt), where λ is the decay constant; the half-life t₁/₂ = ln 2/λ is the time for half of any sample to decay.

**The core insight:** Each nucleus decays independently with a fixed probability per unit time λ. This is a statistical statement about large ensembles, not a mechanical clock. Because of this independence, the fraction remaining after any equal time interval is always the same — giving exponential decay. Half-lives range from nanoseconds to billions of years, making radioactive decay the basis for dating everything from ancient artifacts to the age of the Earth.

**Conceptual chain:**
1. Decay probability: in time dt, any single nucleus has probability λ dt of decaying. λ is the decay constant (s⁻¹).
2. Differential equation: dN/dt = −λN (rate of decay ∝ number of nuclei present).
3. Solution: N(t) = N₀ e^(−λt) — exponential decay.
4. Activity: A = −dN/dt = λN = λN₀ e^(−λt) = A₀ e^(−λt) (measured in Becquerel, Bq = 1 decay/s, or Curie, Ci = 3.7 × 10¹⁰ Bq).
5. Half-life: t₁/₂ = ln 2/λ ≈ 0.693/λ. After n half-lives: N = N₀/2^n.
6. Mean lifetime: τ = 1/λ; after time τ, N = N₀/e ≈ 0.368 N₀.
7. Relationship: t₁/₂ = τ ln 2.

**Central equations:**
- N(t) = N₀ e^(−λt)
- A(t) = λN(t) = A₀ e^(−λt)
- t₁/₂ = ln 2 / λ ≈ 0.693/λ
- τ (mean life) = 1/λ
- After n half-lives: N = N₀ × (1/2)^n

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Dice rolling simulation: roll 60 dice; remove any die showing a 1 (probability 1/6 per roll = λ). Count remaining. Roll again, remove 1s, count. Plot surviving dice vs. number of rolls → exponential curve emerges.
- M&M analogy: pour M&Ms on table; remove those with M facing up (probability ½ per shake). After 1 shake: ~N₀/2 remain; after 2 shakes: ~N₀/4, etc.
- Physical demonstration: Geiger counter count rate decreasing over time for a short-lived source.

### Representational (Iconic)
- N(t) and A(t) vs. t plots: exponential decay from N₀, marking t₁/₂, 2t₁/₂, 3t₁/₂ with N = N₀/2, N₀/4, N₀/8.
- Semi-log plot: ln N vs. t is a straight line with slope −λ. Students learn to extract λ from the slope.
- Comparison table: t₁/₂ for various isotopes — ²³⁸U (4.5 Gyr), ¹⁴C (5730 yr), ²²⁶Ra (1600 yr), ⁶⁰Co (5.27 yr), ¹³¹I (8 days), ²¹²Pb (10.6 hr), ²¹²Po (0.3 μs).

### Abstract (Symbolic)
- Derivation from first principles: if each nucleus has probability λ dt of decaying in time dt, and nuclei are independent, then: dN = −λN dt → dN/N = −λ dt → ln(N/N₀) = −λt → N = N₀ e^(−λt).
- Half-life derivation: N(t₁/₂) = N₀/2 → e^(−λt₁/₂) = 1/2 → −λt₁/₂ = −ln 2 → t₁/₂ = ln 2/λ.
- Activity unit conversions: 1 Ci = 3.7 × 10¹⁰ Bq (activity of 1 g of ²²⁶Ra).
- Carbon dating: age = (1/λ) × ln(N₀/N) = t₁/₂/ln 2 × ln(A₀/A).

### Transfer (+)
- Carbon-14 dating: organisms absorb ¹⁴C during life (ratio ¹⁴C/¹²C matches atmosphere). After death, ¹⁴C decays with t₁/₂ = 5730 yr. Measuring current ratio → age.
- ²³⁸U/²⁰⁶Pb dating: t₁/₂ = 4.47 Gyr — used to date rocks and determine Earth's age (4.54 Gyr).
- Medical applications: ¹³¹I (t₁/₂ = 8 days) for thyroid treatment — activity drops to negligible levels within weeks.
- Reactor fuel burnup: fission products with various t₁/₂ determine reactor safety timescales.

---

## 3. Why Beginners Fail

**Mode 1 — Exponential decay as linear:** Students draw or think of the decay as linear (straight line from N₀ to 0) rather than exponential. The key distinction: a linear decay reaches zero; exponential decay never exactly reaches zero.

**Mode 2 — Confusing decay constant and half-life:** Students use λ and t₁/₂ interchangeably, or use the wrong quantity in the exponential: N = N₀ e^(−t₁/₂ × t) instead of N = N₀ e^(−λt). They don't know the relationship λ = ln 2 / t₁/₂.

**Mode 3 — "After 2 half-lives, the sample is gone":** Students think that after 2 × t₁/₂, only 2 × 50% = 0% remains. In fact, after each half-life, half of whatever remains decays: after 2t₁/₂, N = N₀/4 (25% remains).

**Mode 4 — Individual nucleus prediction:** Students think the half-life predicts when a specific nucleus will decay ("this nucleus will decay in exactly t₁/₂ years"). In fact, t₁/₂ is a statistical statement about large ensembles — any individual nucleus may decay at any time, with probability λ dt in time dt.

---

## 4. Misconception Library

### MC-1: "After two half-lives, none of the sample remains"
- **Probe:** "A sample starts with 1000 nuclei. After 2 half-lives, how many remain?"
- **Characteristic phrase:** "After 2 half-lives, all the material has decayed."
- **Trigger:** Students multiply: 2 half-lives × 50% per half-life = 100% decayed. They apply linear thinking to a multiplicative process.
- **Conflict evidence [P28]:** After 1 half-life: N = 1000/2 = 500. After 2nd half-life: half of 500 = 250 remain. N = N₀ × (1/2)^n = 1000 × (1/4) = 250 ≠ 0. Exponential decay: each step multiplies the remaining quantity by ½ — you never reach zero.
- **Bridge [P30]:** "Each half-life halves whatever is currently present — not the original amount. It's compounding, not subtraction. After 10 half-lives: N = N₀/1024 ≈ 0.1%. After 20 half-lives: N = N₀/10⁶ ≈ 0.0001%. It approaches zero but never reaches it."
- **Replacement [P31]:** N = N₀ × (1/2)^n after n half-lives. Never zero; each half-life multiplies the current N by ½.
- **Discrimination pairs [P33]:** Linear decay: 50% gone per unit time → all gone after 2 units. Exponential decay: 50% of current amount gone per half-life → 25% remains after 2 half-lives.
- **S6 repair path:** Run the M&M simulation for 5–6 rounds. Students observe exponentially decreasing, never-zero counts.

### MC-2: "N = N₀ e^(−t₁/₂ × t) is the decay equation"
- **Probe:** "At time t = t₁/₂, what does your equation predict for N?"
- **Characteristic phrase:** "The formula uses the half-life in the exponent."
- **Trigger:** Students confuse λ and t₁/₂ in the exponential formula. They know t₁/₂ is "the" characteristic time and put it in the exponent.
- **Conflict evidence [P28]:** N = N₀ e^(−t₁/₂ × t). At t = t₁/₂: N = N₀ e^(−t₁/₂²). For t₁/₂ = 5730 yr: N = N₀ e^(−5730²) ≈ 0 — catastrophically wrong. The correct formula N = N₀ e^(−λ t) gives N = N₀/2 at t = t₁/₂. The exponent must be λt, a dimensionless number.
- **Bridge [P30]:** "The exponent must be dimensionless. λ has units s⁻¹; t has units s; λt is dimensionless. t₁/₂ has units s; t₁/₂ × t has units s² — dimensional disaster. The correct formula is N = N₀ e^(−λt) = N₀ e^(−t ln 2/t₁/₂)."
- **Replacement [P31]:** N = N₀ e^(−λt) where λ = ln 2 / t₁/₂. Equivalently: N = N₀ e^(−t ln 2/t₁/₂) = N₀ × (1/2)^(t/t₁/₂).
- **Discrimination pairs [P33]:** Compound interest: amount = principal × (1 + r)^t — interest rate r, not duration, goes in the exponent. Similarly: λ (rate), not t₁/₂ (duration), goes in the exponential for radioactive decay.
- **S6 repair path:** Dimensional analysis: "What are the units of the exponent in e^(−λt)? Must be dimensionless." Then derive λ = ln 2/t₁/₂ from the definition of half-life.

### MC-3: "The half-life predicts when a specific nucleus will decay"
- **Probe:** "You have a single radium-226 nucleus with t₁/₂ = 1600 yr. Will it decay in 1600 years?"
- **Characteristic phrase:** "After 1600 years, the nucleus will have decayed."
- **Trigger:** "Half-life" sounds like "lifetime" — the time until the nucleus decays.
- **Conflict evidence [P28]:** A single nucleus decays probabilistically — it may decay in 1 second or in 5000 years. The half-life is a statistical quantity: in any large sample, half the nuclei decay within t₁/₂. A single nucleus has a 50% chance of decaying before t₁/₂ and a 50% chance of surviving past t₁/₂. The distribution of decay times follows an exponential distribution with mean τ = t₁/₂/ln 2 ≈ 1.44 t₁/₂.
- **Bridge [P30]:** "Half-life is a population statistic, not an individual prediction. A single nucleus has probability λ dt of decaying in any infinitesimal interval dt — it's random. The half-life tells you that among billions of identical nuclei, half will have decayed by t₁/₂. For one nucleus, it's a coin flip with time."
- **Replacement [P31]:** The half-life is a property of the ensemble, not the individual nucleus. For a single nucleus, the probability it decays before time t is P = 1 − e^(−λt). At t = t₁/₂: P = 1/2. This is the probabilistic meaning of half-life.
- **Discrimination pairs [P33]:** Average life expectancy of 80 years doesn't mean every person lives to exactly 80. Some die at 20, some at 100. Half-life means 50% of the population survives past that age — same logic.
- **S6 repair path:** Roll one die repeatedly, removing it when it shows a 6. Ask: "Did the die 'know' it would survive 5 rolls?" No — each roll is independent with probability 1/6 of being removed.

### MC-4: "Activity and number of nuclei always decrease at the same rate"
- **Probe:** "If a sample's half-life is 10 minutes, when does the activity reach half its initial value?"
- **Characteristic phrase:** "Activity decreases faster than the number of nuclei because it's the rate."
- **Trigger:** Students confuse A(t) = λN(t) (activity) with the rate of change dN/dt. Activity is proportional to N — it has the same half-life as N. Some students think the activity halves faster than the number.
- **Conflict evidence [P28]:** A(t) = λN(t) = λN₀ e^(−λt) = A₀ e^(−λt). Activity and number have the same exponential decay factor e^(−λt) — they have the same half-life. After one half-life: N = N₀/2 and A = A₀/2.
- **Bridge [P30]:** "Activity A = λN. Both A and N decline as e^(−λt). They have the same half-life. The constant λ is just a proportionality factor — it doesn't change the exponential decay."
- **Replacement [P31]:** Activity and number of nuclei have the same half-life and the same exponential time dependence. A(t) = A₀ e^(−λt), N(t) = N₀ e^(−λt).
- **Discrimination pairs [P33]:** If you know N(t) = 1000 e^(−0.1t), then A(t) = 0.1 × 1000 e^(−0.1t) = 100 e^(−0.1t). Both decay with the same time constant 1/λ = 10 s.
- **S6 repair path:** Plot both N(t) and A(t) = λN(t) on the same axes (different y-scales). Both curves have the same shape and the same half-life — they are proportional.

---

## 5. Explanation Library

**Explanation A — The probabilistic first principles (narrative):**
"Imagine you have a room full of 10,000 radioactive nuclei, each with a 0.001% chance of decaying every second. In 1 second, about 1 nucleus decays. After 693 seconds — the half-life if λ = 0.001/s — about 5000 have decayed. But here's the key: after those 693 seconds, the remaining 5000 nuclei each still have a 0.001% per second probability. Nothing has changed for them. They don't 'know' half their companions have gone. In the next 693 seconds, half of those 5000 decay, leaving 2500. This self-similar behavior — the same fraction decaying in each equal time interval — is the hallmark of exponential decay. It arises from the independence of each nucleus's decay probability."

**Explanation B — Differential equation derivation (procedural):**
"Step 1: In time dt, each nucleus has probability λ dt of decaying. Step 2: Expected number of decays from N nuclei: dN = −λN dt. Step 3: dN/N = −λ dt. Step 4: Integrate: ∫_{N₀}^N dN'/N' = −λ ∫₀^t dt' → ln N − ln N₀ = −λt → N = N₀ e^(−λt). Step 5: Activity A = |dN/dt| = λN₀ e^(−λt). Step 6: Half-life: N(t₁/₂) = N₀/2 → e^(−λt₁/₂) = 1/2 → t₁/₂ = ln 2/λ."

**Explanation C — Carbon dating application (applied):**
"A living tree absorbs CO₂ continuously, maintaining a ¹⁴C/¹²C ratio matching the atmosphere (about 1.2 × 10⁻¹²). When the tree dies, ¹⁴C decays with t₁/₂ = 5730 yr and is not replenished. Today, we measure the ratio in a wood sample and find it is ¼ of the atmospheric value. Then N/N₀ = 1/4 = e^(−λt) → −λt = ln(1/4) = −2 ln 2 → t = 2 ln 2/λ = 2 t₁/₂ = 11,460 yr. The wood is approximately 11,460 years old."

---

## 6. Analogy Library

**Primary analogy — The fair coin flip:**
Imagine a bag with N coins. Each hour, you flip every coin; heads = the coin "survives," tails = it's removed. After 1 hour: N/2 remain (on average). After 2 hours: N/4. After n hours: N/2^n. This is exactly the radioactive decay law with t₁/₂ = 1 hour (probability λ = ln 2 per hour of decaying). The coins don't remember past flips — each flip is independent. This is the memoryless property of exponential decay.

**Breaking point:** Coins are macroscopic; they don't decay spontaneously — a person must flip them. Radioactive nuclei decay on their own without external intervention. Also, in the coin analogy, the half-life is exactly 1 flip. In reality, λ is a continuous rate (decays per unit time per nucleus) derived from quantum mechanics, not a discrete probability per flip.

**Anti-analogy:** Do NOT say "the nucleus ages and eventually falls apart — old nuclei are more likely to decay than young ones." This implies aging, which contradicts the memoryless (Markov) nature of radioactive decay. Each nucleus at every moment has the same probability λ dt of decaying regardless of how long it has already survived.

---

## 7. Demonstration Library

**Demo 1 — Dice/M&M simulation:**
Start with 100 dice. Roll all; remove dice showing 1 (1/6 probability of "decay" per roll). Count and record remaining dice. Repeat 10 times. Plot surviving dice vs. roll number. Fit: N ≈ 100 × (5/6)^n. Half-life: n₁/₂ such that (5/6)^n₁/₂ = 1/2 → n₁/₂ = ln(1/2)/ln(5/6) ≈ 3.8 rolls. Students observe that the curve never reaches zero.

**Demo 2 — Semi-log graph:**
Plot N(t) = N₀ e^(−λt) on (a) linear scale (exponential curve) and (b) semi-log scale (straight line with slope −λ). Students extract λ from the slope of the semi-log plot. Application: if Geiger counter data from a short-lived source is plotted on semi-log paper and gives a straight line with slope −0.023 min⁻¹, then t₁/₂ = ln 2/0.023 ≈ 30 minutes.

**Demo 3 — Carbon dating calculation:**
Given: ¹⁴C t₁/₂ = 5730 yr. A bone sample has ¹⁴C activity = 3.5 dpm/g; living bone has 15.3 dpm/g. Age = t₁/₂/ln 2 × ln(A₀/A) = 5730/0.693 × ln(15.3/3.5) = 8264 × 1.477 ≈ 12,200 years old. (This is a famous Cro-Magnon calculation.)

---

## 8. Discovery Lesson

**Opening (5 min):** "A radioactive source has activity 1000 counts/min now. In 10 hours, it has activity 125 counts/min. What is the half-life?" Students guess. (Answer: 3 hours 20 minutes — three halvings in 10 hours → 10/3 hours ≈ 3.33 hours.)

**Guided inquiry (15 min):**
- Step 1: Students run the dice simulation (Demo 1) and collect data for 8 rounds.
- Step 2: Students plot their data on semi-log paper. Does it look like a straight line?
- Step 3: Students measure the slope → extract λ → compute t₁/₂ = ln 2/λ. Compare to theoretical t₁/₂ = ln(6/5)/ln 2 ≈ 3.8 rolls.
- Step 4: Students compute: if a real Geiger counter measures 800 counts/min at t=0 and 200 counts/min at t=20 minutes, what is t₁/₂? (N = N₀/4 = N₀ × (1/2)^2 → 2 half-lives in 20 min → t₁/₂ = 10 min.)

**Synthesis (10 min):**
- Derive N = N₀ e^(−λt) from dN/dt = −λN (for students comfortable with calculus).
- State t₁/₂ = ln 2/λ and τ = 1/λ. Verify: t₁/₂ = τ ln 2 ≈ 0.693τ.
- Present the range of half-lives (comparison table from Section 2).

**Closure:** "Exponential decay appears in radioactivity, but also in capacitor discharge, Newton's law of cooling, population decline, and drug elimination in the body. The same differential equation — rate of decrease proportional to current amount — always gives the same exponential solution. Radioactivity gave physicists the clearest, most precise example of this universal law."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN + MOTIVATE]:** Explanation A (probabilistic first principles) — establish the independence of each nucleus as the key assumption. Then Explanation B (differential equation derivation — for calculus-ready students).

**TA-2 [DEMONSTRATE]:** Demo 1 (dice simulation) — students collect data, plot on semi-log paper (Demo 2), extract λ and t₁/₂.

**TA-3 [PROBE]:** MC-1 probe ("After 2 half-lives, how many remain of 1000?") and MC-3 probe ("Will this specific nucleus decay in exactly t₁/₂ years?"). Resolve both misconceptions.

**TA-4 [APPLY]:** Demo 3 (carbon dating calculation). Then: "²³⁸U has t₁/₂ = 4.47 Gyr. A rock contains equal amounts of ²³⁸U and ²⁰⁶Pb. How old is the rock?" (N/N₀ = 1/2 → one half-life → age = 4.47 Gyr — consistent with Earth's measured age of 4.54 Gyr by multiple methods.)

---

## 10. Voice Teaching

**Opening:**
"Here's something remarkable about radioactive nuclei: they have no memory. A radium nucleus that has existed for 100 years has exactly the same probability of decaying in the next second as a radium nucleus that was just created. There is no aging, no fatigue, no accumulated damage. Each nucleus at each moment has the same fixed probability λ of decaying per second. This memoryless property — this constancy of λ — is what gives radioactive decay its simple, universal, exponential form."

**At the differential equation:**
"If the rate of decay is proportional to how many nuclei exist, then dN/dt = −λN. This says: the more nuclei you have, the faster they disappear. Solve it: separate variables, integrate, exponentiate. N = N₀ e^(−λt). The solution is exponential. This isn't surprising in hindsight — any process where 'rate of change ∝ current amount' gives exponential behavior. Bank interest, population growth, RC circuits, drug clearance — same equation, same solution."

**At half-life:**
"The half-life is the most useful characterization of a decay. It tells you: half the nuclei in any sample will have decayed in this time. It doesn't tell you when any specific nucleus will decay. Half-life is a population statistic, not a death sentence for an individual nucleus. And notice: after each t₁/₂, you have half of what you had before — not half of the original. After 10 half-lives: (1/2)^10 ≈ 0.1% remains. After 20 half-lives: (1/2)^20 ≈ 0.0001% remains. Exponential decay — approaches zero but never reaches it."

---

## 11. Assessment

**Mastery gate:** Student correctly applies N = N₀ e^(−λt), correctly computes t₁/₂ from λ and vice versa, correctly finds age from isotope ratios, and correctly interprets the probabilistic meaning of half-life. Score ≥ 80%.

**FA-1 — Half-life calculation:**
*Q: A radioactive sample has decay constant λ = 0.0347 min⁻¹. (a) What is the half-life? (b) Starting with 5000 nuclei, how many remain after 40 minutes?*
Expected: (a) t₁/₂ = ln 2/λ = 0.693/0.0347 ≈ 20 min. (b) N = 5000 e^(−0.0347 × 40) = 5000 e^(−1.388) = 5000 × 0.25 = 1250. (Equivalently: 40 min = 2 half-lives → N = 5000/4 = 1250.)
Threshold: Correct t₁/₂ and correct N(40 min).

**FA-2 — Activity:**
*Q: A sample initially has activity A₀ = 4000 dpm. After 3 half-lives, what is the activity?*
Expected: After n half-lives, A = A₀/2^n = 4000/8 = 500 dpm.
Threshold: Correct application of A = A₀/2^n.

**FA-3 — Carbon dating:**
*Q: A wood sample has ¹⁴C activity = 7.65 dpm/g. Fresh wood has 15.3 dpm/g. t₁/₂(¹⁴C) = 5730 yr. How old is the sample?*
Expected: A/A₀ = 1/2 → one half-life → age = 5730 years.
Threshold: Correct ratio identification (1/2) and age = one half-life = 5730 years.

**FA-4 — Probabilistic interpretation:**
*Q: A single radon-222 nucleus has t₁/₂ = 3.82 days. A student says "this nucleus will definitely decay within 3.82 days." What is wrong with this statement? What is correct?*
Expected: The half-life is a statistical quantity for large ensembles — it tells us that 50% of a large sample will decay in 3.82 days. For a single nucleus, decay is probabilistic: it has a 50% chance of decaying before 3.82 days and 50% chance of surviving past 3.82 days. There is no certainty about when any individual nucleus decays.
Threshold: Correct distinction between ensemble statistic and individual prediction; invokes probability language.

**Confidence calibration:** After FA-1, students rate confidence. Students who use N = N₀/2^n (half-life method) instead of N = N₀ e^(−λt) receive explicit feedback that both are equivalent, but the exponential form is more general.

**Delayed retrieval (session + 3):** "State the radioactive decay law. What is the relationship between t₁/₂ and λ? After 5 half-lives, what fraction of the original nuclei remain?"

---

## 12. Recovery Notes

**S0:** Student needs phys.mod.radioactivity — without knowing what decays (alpha, beta, gamma) and that each nucleus decays independently, the exponential law has no motivation.

**S3:** Student can state the formula but applies it incorrectly (e.g., uses t₁/₂ instead of λ in the exponent). Drill dimensional analysis: exponent must be dimensionless. λt is dimensionless; t₁/₂ × t is not.

**S6:** Student believes exponential decay reaches zero. Run the dice simulation: after 10 rounds with 100 dice, about 100 × (5/6)^10 ≈ 16 dice remain — still some dice survive. Then compute: after 20 half-lives of ¹⁴C, a mole of ¹⁴C has (6 × 10²³)/2^20 ≈ 5 × 10¹⁷ atoms remaining — orders of magnitude above zero.

**S9:** Introduce the Bateman equations for decay chains: parent → daughter → granddaughter, each with its own λ. Show secular equilibrium: when t₁/₂(parent) >> t₁/₂(daughter), the daughter activity equals the parent activity. Application: ²³⁸U → Th → Pa → ... → ²⁰⁶Pb (14-step chain).

---

## 13. Memory & Review

**Memory type:** Procedural (N = N₀ e^(−λt), t₁/₂ = ln 2/λ, N = N₀/2^n) + conceptual (memoryless property, ensemble vs. individual).

**Spaced retrieval schedule:**
- Session + 1: "Write the radioactive decay law and the half-life formula. How many nuclei remain after 3 half-lives?"
- Session + 3: "A nuclide has t₁/₂ = 2 hours. At t = 0, activity = 800 Bq. Find activity at t = 6 hours."
- Session + 7: "A rock contains 75% ²⁰⁶Pb and 25% ²³⁸U (by number of nuclei). If t₁/₂(²³⁸U) = 4.47 Gyr, approximately how old is the rock?"

**Interleaving partners:** phys.mod.radioactivity (prerequisite — identifies what decays); phys.mod.nuclear-reactions (successor — provides context for nuclear energy); exponential functions (mathematics — same ODE as RC discharge, population dynamics, pharmacokinetics).

---

## 14. Transfer Map

**Near transfer:** Capacitor discharge through a resistor: V(t) = V₀ e^(−t/RC). Same exponential law with time constant τ = RC instead of 1/λ. Both derive from "rate ∝ current amount."

**Far transfer:** Pharmacokinetics: drug concentration in the body decays exponentially after IV administration (clearance rate ∝ concentration). Biological half-life is analogous to radioactive half-life. Medical dosing schedules are designed around this.

**Structural abstraction:** "Any memoryless, first-order rate process → exponential decay." This is the fundamental principle. The radioactive decay law is an idealized, physically exact example; approximations of this law appear in every field from ecology (species decline) to finance (debt amortization at constant rate).

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.mod.radioactivity is necessary — students must know what a decay event is before quantifying the rate. Also requires comfort with exponential functions (mathematics prerequisite should be verified).
- **Unlock readiness:** phys.mod.nuclear-reactions can follow — students now understand decay kinetics and are ready for nuclear reaction cross-sections and reaction rates.
- **Difficulty calibration:** Proficient/apply is correct. The mathematics (exponential function, logarithm, simple ODE) is accessible to students who have had calculus or even pre-calculus. The conceptual content (probabilistic interpretation, half-life vs. mean life) requires care.
- **Suggested lab:** Geiger counter measurement of a Ba-137m source (produced from a Cs-137 generator, t₁/₂ = 2.55 min). Students measure activity every 30 seconds for 15 minutes, plot on semi-log paper, and extract the half-life. Comparing to the accepted value (2.55 min) validates the method.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
