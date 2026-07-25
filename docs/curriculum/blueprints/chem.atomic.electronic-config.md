# chem.atomic.electronic-config — Electron Configuration

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.atomic.electronic-config` |
| Domain | Atomic Structure |
| Requires | `chem.atomic.orbitals` |
| Unlocks | `chem.dblock.general`, `chem.period.modern-periodic-law` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Electron configurations are built using the Aufbau principle (fill lowest-energy orbitals first, in the order set by (n+l) rules with 4s filling before 3d), Hund's rule (within a degenerate set of orbitals, electrons occupy separate orbitals singly before pairing, to maximize unpaired spins), and the Pauli exclusion principle (no two electrons share all four quantum numbers) — with two well-known exceptions (chromium and copper) where an electron shifts from s to d to achieve a more stable half-filled or fully-filled d subshell via exchange energy, and with ionization of d-block atoms removing electrons from 4s first, not 3d, despite Aufbau's filling order.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Building up nitrogen's electron configuration (1s² 2s² 2p³) orbital-box by orbital-box, placing single electrons in each of the three degenerate 2p orbitals before any pairing.

**Representational**: An orbital-box diagram distinguishing energy levels (rows) and degenerate sets within a level (adjacent boxes at the same height).

**Abstract**: The Aufbau filling order (built from n+l rules) as distinct from the post-filling ionization-removal order (highest-n orbital removed first, regardless of filling history).

**Transfer**: Correctly predicting an anomalous configuration for an unfamiliar d-block element (like molybdenum) using the same exchange-energy reasoning that explains chromium and copper, without having memorized that specific case.

## 3. Why Beginners Fail

Students reverse the Aufbau filling order when reasoning about ionization (assuming since 3d fills after 4s, 3d electrons must be removed last, when in fact once filled, 3d sits at lower energy than 4s, so 4s is removed first); they overextend Hund's rule (one electron per orbital) globally across all subshells in an atom rather than restricting it to electrons within one degenerate set; and they memorize the chromium/copper exceptions as isolated facts without the underlying exchange-energy mechanism, leaving them unable to predict analogous anomalies in unfamiliar elements like molybdenum.

## 4. Misconception Library

### MC-1: d-block cations retain 4s electrons and lose d electrons
- **Probe**: "Write the electron configuration of Fe²⁺. Explain which electrons are removed first."
- **Characteristic phrase**: "Fe²⁺ is [Ar] 3d⁴ 4s² because we remove the 3d electrons which are highest in energy according to the Aufbau order."
- **Trigger (Type 5, instruction-induced from Aufbau)**: Aufbau teaches "fill 4s before 3d," and students incorrectly reverse this rule when reasoning about ionization, assuming the last-filled orbital is also the last-removed.
- **Conflict evidence [P28]**: Once 3d and 4s are both occupied, the energy ordering changes — 3d sits lower in energy than 4s for the filled configuration, confirmed by experimental ionization energies and the magnetic properties of Fe²⁺; ionization removes electrons from the highest-energy orbital present in the resulting ion, which is 4s, giving Fe → Fe²⁺ as [Ar] 3d⁶, not [Ar] 3d⁴ 4s².
- **Bridge [P30]**: The Aufbau order describes the FILLING sequence for building up a neutral atom from scratch; it does not describe the reverse REMOVAL sequence for ionization, because the relative energies of 3d and 4s actually swap once both are occupied.
- **Replacement [P31]**: Ionization always removes electrons from the highest-n orbital present in the current ion — for transition metals, this means 4s electrons are removed before 3d electrons, regardless of the filling order used to build the neutral atom.
- **Discrimination pairs [P33]**: Neutral Fe filling ([Ar] 3d⁶ 4s² built by filling 4s before 3d) vs. Fe²⁺ ionization (4s electrons removed first, giving [Ar] 3d⁶) — filling order and removal order are opposite.
- **S6 repair path**: Present the experimental evidence (ionization energies, magnetic data) confirming 4s removal, and explicitly state the filling-vs-removal distinction as a named rule.

### MC-2: Hund's rule means one electron per orbital across all subshells
- **Probe**: "Draw the orbital box diagram for nitrogen (Z=7). Is there an electron in the 2s orbital and three separate electrons in 2p, or are some paired?"
- **Characteristic phrase**: "Hund's rule means each electron goes in its own orbital, so N has seven separate boxes each with one electron."
- **Trigger (Type 1, overgeneralization)**: "Maximize unpaired electrons" is applied globally across the whole atom rather than restricted to the degenerate set (orbitals of equal energy) it actually governs.
- **Conflict evidence [P28]**: Nitrogen's correct configuration is 1s² 2s² 2p³ — the 2s orbital is lower energy than 2p and holds 2 paired electrons before 2p is populated at all; only within the three degenerate 2p orbitals does Hund's rule apply, giving one electron per 2p orbital (three unpaired), not seven separate single electrons across all subshells.
- **Bridge [P30]**: Hund's rule specifically addresses how to distribute electrons among orbitals of EQUAL energy (a degenerate set) — it says nothing about pairing in lower-energy, non-degenerate orbitals like 2s, which fill and pair according to Aufbau/Pauli alone.
- **Replacement [P31]**: Within a degenerate set (e.g., the three 2p orbitals), place one electron in each before pairing any; lower-energy non-degenerate orbitals (like 2s) fill and pair normally before the degenerate set is even touched.
- **Discrimination pairs [P33]**: The three 2p orbitals of nitrogen (degenerate, Hund's rule applies, one electron each) vs. 2s (non-degenerate relative to 2p, fills and pairs first).
- **S6 repair path**: Build nitrogen's orbital-box diagram step by step, explicitly labeling which orbitals are degenerate with each other before applying Hund's rule only within that set.

### MC-3: Cr/Cu anomalies occur because half-filled/full subshells are "more stable" (memorized, no reason)
- **Probe**: "Molybdenum (Z=42) is directly below Cr in the periodic table. Predict its actual configuration."
- **Characteristic phrase**: "I only memorised Cr and Cu as exceptions. I can't predict Mo."
- **Trigger (Type 5, instruction-induced)**: Students memorize "half-filled d = stable" as an isolated fact without the underlying exchange-energy argument, leaving them unable to generalize to new cases.
- **Conflict evidence [P28]**: The rule generalizes precisely — any d-block element where the expected [noble gas] dⁿ⁻¹s² configuration can promote to dⁿ⁻¹⁺¹s¹ = dⁿ to reach a half-filled (d⁵) or fully-filled (d¹⁰) subshell gains extra exchange energy; molybdenum's expected configuration [Kr] 4d⁴ 5s² actually promotes to [Kr] 4d⁵ 5s¹ (achieving a half-filled 4d⁵), the exact same pattern as chromium.
- **Bridge [P30]**: "Half-filled = stable" is a genuine physical consequence of exchange energy (electrons with parallel spins in different orbitals lower the atom's energy), not an arbitrary rule confined to two memorized elements — the same physics applies anywhere the promotion reaches a d⁵ or d¹⁰ configuration.
- **Replacement [P31]**: Check any d-block element's expected configuration for whether promoting one s electron into d would produce a half-filled (d⁵) or fully-filled (d¹⁰) subshell — if so, expect the same anomalous promotion seen in Cr and Cu.
- **Discrimination pairs [P33]**: Chromium (expected d⁴s², actual d⁵s¹, half-filled gain) vs. molybdenum (expected d⁴s², actual d⁵s¹, same pattern, different element) — proof the rule generalizes beyond the two textbook examples.
- **S6 repair path**: Walk through the molybdenum prediction using the same exchange-energy reasoning applied to chromium, showing the student can derive the anomaly rather than recall it.

## 5. Explanation Library

**Primary explanation**: Electron configurations are built by filling orbitals from lowest to highest energy (Aufbau), obeying the Pauli exclusion principle (no two electrons share all four quantum numbers) and Hund's rule (within a set of same-energy orbitals, spread electrons out singly before pairing, to maximize unpaired spins and lower energy via exchange interactions). Two exceptions, chromium and copper, arise because promoting one electron from s to d achieves a half-filled or fully-filled d subshell, which gains enough exchange-energy stabilization to outweigh the small energy cost of the promotion.

**Secondary explanation (ionization framing)**: Once an atom's orbitals are filled, the relative energy ordering of 3d and 4s (and analogous pairs in later periods) reverses compared to the filling order — 3d becomes lower in energy than 4s in the filled/ionized configuration, so ionization always removes the highest-n electrons (4s) first, distinct from the order those electrons were originally added.

## 6. Analogy Library

- **Primary analogy**: Filling a parking garage floor by floor (Aufbau) versus deciding which cars leave first when the garage needs to shed vehicles (ionization) — the order cars arrived isn't necessarily the order they leave, especially if the garage's internal layout changes once it's full.
- **Breaking point**: The parking-garage analogy conveys the filling-vs-removal asymmetry but doesn't capture the exchange-energy mechanism behind the Cr/Cu anomalies — that needs the explicit half-filled/full-subshell stabilization argument.
- **Anti-analogy**: Do NOT say "electrons leave in the reverse order they were added" as a universal rule — this reinforces MC-1's Aufbau-reversal error for d-block ionization specifically.

## 7. Demonstration Library

- **Demonstration 1 (orbital-box construction)**: Build nitrogen's full orbital-box diagram step by step, explicitly marking which orbitals form a degenerate set before applying Hund's rule only within that set.
- **Demonstration 2 (Mo prediction from Cr pattern)**: Have students apply the exchange-energy reasoning used for chromium to predict molybdenum's actual configuration, then reveal the correct answer as confirmation.

## 8. Discovery Lesson

**Opening**: "If 4s fills before 3d when building up an atom, do you think 4s or 3d electrons get removed first when that atom becomes an ion?"

**Exploration**: Students examine experimental ionization-energy and magnetic data for Fe²⁺ to determine which orbital's electrons were actually removed.

**Synthesis**: Guide toward: the filling order and the ionization-removal order are governed by different energy orderings — 3d sits below 4s only once the atom is fully built and/or ionized, not during the filling process itself.

**Closure**: "Now that you understand why Cr and Cu are exceptions, can you predict Mo's configuration without being told?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the orbital-box diagram for nitrogen, explicitly marking the degenerate 2p set.
- **TA-2 (TELL)**: State the filling-vs-removal energy-order distinction explicitly, worked through for Fe/Fe²⁺.
- **TA-3 (DO)**: Student writes the configuration for a given d-block cation, applying the 4s-removed-first rule.
- **TA-4 (TEST-THINKING)**: Present the molybdenum probe and ask the student to predict its anomalous configuration using the exchange-energy argument from chromium.

## 10. Voice Teaching

Every time a d-block ion's configuration is discussed, state explicitly: "filling order and removal order are not the same — 4s comes off first." When introducing the Cr/Cu anomalies, always lead with the exchange-energy mechanism before naming the two textbook elements, so the rule is understood as generalizable rather than memorized as two isolated facts.

## 11. Assessment

**Mastery gate**: Student can (a) correctly write configurations for d-block cations with 4s removed first, (b) correctly apply Hund's rule only within a degenerate set, (c) predict an anomalous half-filled/full-filled configuration for an unfamiliar d-block element.

- **FA-1**: "Write the electron configuration of Fe²⁺. Explain which electrons are removed first." — targets MC-1.
- **FA-2**: "Draw the orbital box diagram for nitrogen. How many unpaired electrons does it have?" — targets MC-2.
- **FA-3**: "Molybdenum is directly below Cr in the periodic table. Predict its actual configuration." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've just learned the Aufbau filling order and haven't yet encountered the ionization-order distinction.

**Delayed retrieval**: Re-probe MC-1's filling-vs-removal distinction before `chem.dblock.general` introduces transition-metal ion chemistry broadly, since that domain assumes fluent d-block ion configuration writing.

## 12. Recovery Notes

- **S3 (stuck)**: For ionization-order confusion, return to the experimental evidence (ionization energies) directly rather than re-deriving from Aufbau, since Aufbau alone doesn't predict the reversal.
- **S4 (frustrated)**: Normalize — the filling-order-vs-removal-order distinction is a genuinely subtle point that trips up most students on first exposure to transition-metal ions.
- **S6 (collision)**: Use the Fe/Fe²⁺ experimental evidence for MC-1; use the Mo-prediction exercise for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why 3d being "filled after" 4s doesn't mean it's "removed after" 4s.

## 13. Memory & Review

Tag as a procedural-rule memory (Aufbau/Hund/Pauli application) plus a conceptual-correction memory (filling vs. removal order; exchange-energy generalization). Schedule a spaced check at ~1 week and again before `chem.dblock.general`.

## 14. Transfer Map

Feeds directly into `chem.dblock.general` (transition-metal chemistry assumes fluent d-block ion configuration writing) and `chem.period.modern-periodic-law` (periodic trends are explained by electron configuration patterns established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
