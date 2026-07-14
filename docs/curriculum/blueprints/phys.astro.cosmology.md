# Teaching Blueprint: Big Bang Cosmology
**ID:** phys.astro.cosmology
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.astro.cosmology |
| Name | Big Bang Cosmology |
| Domain | Astrophysics |
| Difficulty | Advanced |
| Bloom Level | Analyze |
| Estimated Hours | 6 |
| Prerequisites | phys.rel.spacetime, phys.astro.stellar-structure |
| Unlocks | phys.astro.dark-matter |

---

## Section 1 — Concept Spine

**Core Claim:** The universe began ~13.8 billion years ago in an extremely hot, dense state (the Big Bang), has been expanding ever since (described by the Friedmann equations from GR), and its history is recorded in three independent observations: the Hubble expansion of galaxies (v = H₀d), the Cosmic Microwave Background radiation (T = 2.725 K), and Big Bang nucleosynthesis (H:He ≈ 3:1 by mass).

**Why It Matters:** Cosmology explains the large-scale structure of the universe, the origin of all matter and radiation, and constrains fundamental physics at energies unreachable by any particle accelerator. The standard ΛCDM model (cold dark matter + cosmological constant) is one of the most precisely tested scientific theories.

**Threshold Concept:** The Big Bang is not an explosion in space — it is an expansion of space itself. Every point in the universe was once arbitrarily close to every other point; the universe did not expand from a central location into pre-existing space.

**Prerequisite Knowledge Check:**
- Special relativity, spacetime intervals, four-vectors (phys.rel.spacetime)
- Stellar structure, stellar evolution, nucleosynthesis (phys.astro.stellar-structure)
- Doppler effect (phys.wave.doppler-effect)

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** Stretch a rubber sheet with dots painted on it. As the sheet expands, every dot moves away from every other dot — and dots farther apart recede faster (Hubble's law). No dot is the "center" — the expansion is uniform everywhere.

**Representational:**
- Hubble's law: v = H₀d where H₀ = 67.4 km/s/Mpc (Planck 2018)
- Hubble time: t_H = 1/H₀ ≈ 14.5 Gyr (approximate age of universe)
- CMB: blackbody spectrum at T = 2.725 K; anisotropies ΔT/T ~ 10⁻⁵ (seeds of structure)
- Friedmann equation: (ȧ/a)² = 8πGρ/3 − kc²/a² + Λc²/3 (scale factor a(t), density ρ, curvature k, cosmological constant Λ)

**Abstract:**
- Scale factor a(t): ratio of physical distance to comoving distance; a(t₀) = 1 today; a → 0 as t → 0 (Big Bang)
- Cosmic energy budget: ordinary matter 5%, dark matter 27%, dark energy 68% (ΛCDM)
- Timeline: Planck epoch (t < 10⁻⁴³ s), quark epoch (10⁻³⁶ s), nucleosynthesis (t ~ 1–3 min), recombination (t ~ 380,000 yr, CMB released), dark ages (380 kyr–100 Myr), first stars (~200 Myr), reionization, galaxy formation, today (13.8 Gyr)
- BBN: 4 minutes of neutron-proton fusion produces H (75% by mass), ⁴He (25%), trace D, Li. Precise ratio depends on baryon/photon ratio η = n_b/n_γ.
- Redshift: z = (λ_observed − λ_emitted)/λ_emitted = a(t₀)/a(t_emit) − 1; CMB: z ~ 1100

**Transfer:** Type Ia supernovae as standard candles → Hubble diagram → accelerated expansion → dark energy. CMB power spectrum → baryon acoustic oscillations → dark matter/dark energy fractions.

---

## Section 3 — Why Beginners Fail

1. **Big Bang as an explosion in space:** Learners picture an explosion centered at some location in pre-existing empty space. Actually, the Big Bang is an expansion of space itself — there is no center, no edge, no "outside."
2. **The CMB is the glow of the Big Bang fireball:** The CMB is the relic radiation released when the universe cooled enough for electrons and protons to combine (recombination), making the universe transparent for the first time. It is not the glow of the initial singularity.
3. **Hubble recession = Doppler shift:** Cosmological redshift is not a Doppler shift — it is a stretching of photon wavelengths by the expanding space the photon traveled through. For nearby galaxies the distinction is small; for high-z objects it matters significantly.
4. **The universe is 13.8 billion light-years across:** Due to expansion, the observable universe is ~46 billion light-years in radius (comoving), not 13.8 billion. Light emitted 13.8 Gyr ago came from regions that have since receded much farther.

---

## Section 4 — Misconception Library

### MC-1: The Big Bang occurred at a specific location in space
- **Probe:** "Where did the Big Bang happen?"
- **Characteristic phrase:** "At the center of the universe, wherever that is."
- **Trigger:** Analogizing to a conventional explosion.
- **Conflict evidence [P28]:** If the Big Bang had a center, galaxies should appear to recede predominantly from that center. Instead, Hubble's law v = H₀d is isotropic — every galaxy recedes with speed proportional to distance, regardless of direction. No preferred center is observed, no matter where in the universe we stand.
- **Bridge [P30]:** The Big Bang is not matter expanding into pre-existing space; it is space itself that expanded. At t=0, every region of space was infinitely (or extremely) compact. The expansion has no center because space has no center.
- **Replacement [P31]:** The Big Bang happened everywhere simultaneously. Every point in today's universe was once at the "starting point" — the expansion is a property of space itself, described by the scale factor a(t) which applies uniformly to all points.
- **Discrimination pairs [P33]:** Conventional explosion: center, edge, expansion into existing space. Cosmological expansion: no center, no edge, space itself expanding, Hubble's law from every vantage point.
- **S6 repair path:** Rubber sheet analogy (dots on expanding sheet) — every dot recedes from every other; no dot is the center.

### MC-2: The CMB is light from the moment of the Big Bang
- **Probe:** "What is the cosmic microwave background?"
- **Characteristic phrase:** "It's the afterglow of the Big Bang explosion."
- **Trigger:** Popular-science language; literal interpretation of "Big Bang glow."
- **Conflict evidence [P28]:** The CMB was emitted at z~1100 (t~380,000 years after the Big Bang), when the universe cooled to ~3000 K and protons captured electrons (recombination). Before recombination, the universe was opaque (photons scattered off free electrons); after, transparent. The CMB photons are from this "last-scattering surface" — 380,000 years into cosmic history, not t=0.
- **Bridge [P30]:** The first ~380,000 years are hidden behind the CMB — photons from earlier cannot reach us because the universe was opaque. The CMB is the "oldest light we can see," not light from the singularity.
- **Replacement [P31]:** CMB = relic radiation from the epoch of recombination (t~380,000 yr). Temperature then: ~3000 K. Redshifted by factor z~1100 to T today = 3000/1100 ≈ 2.73 K. Blackbody spectrum confirmed by COBE 1992 (Nobel Prize 2006).
- **Discrimination pairs [P33]:** Big Bang itself (t~0): hidden; no photons can escape. CMB (t=380,000 yr): oldest observable radiation, z~1100. Visible universe today: z=0.
- **S6 repair path:** Walk through the timeline: quark plasma → proton+neutron formation (t~1s) → nucleosynthesis (t~1-3 min) → radiation dominated → recombination (t=380,000 yr) → CMB released.

### MC-3: Cosmological redshift is a Doppler shift
- **Probe:** "Why are distant galaxies redshifted?"
- **Characteristic phrase:** "They're moving away from us, so we see a Doppler shift."
- **Trigger:** Correct for local galaxy motions; over-applied to cosmological context.
- **Conflict evidence [P28]:** Cosmological redshift at z~1 (galaxies receding at roughly the speed of light) would require Doppler formula: z = √((1+β)/(1−β)) − 1 ≈ 1 → β ≈ 0.6c. But the recession "velocity" in Hubble's law v = H₀d can exceed c for sufficiently distant objects (d > c/H₀ ~ 14 Gly) — which is allowed in GR for space expansion but not in SR Doppler.
- **Bridge [P30]:** Cosmological redshift is a stretching of photon wavelength by expanding space: λ_observed/λ_emitted = a(t₀)/a(t_emit) = 1 + z. No photon moves faster than light; the space the photon travels through expands.
- **Replacement [P31]:** 1 + z = a(t₀)/a(t_emit). For nearby galaxies, z is small and the approximation z ≈ v/c (Hubble's law) works. For high-z, the full GR expansion formula must be used. The CMB (z=1100) is not a Doppler effect — it is 1100× wavelength stretching by 13.8 billion years of expansion.
- **Discrimination pairs [P33]:** Doppler: source moves relative to medium. Cosmological: no medium; space itself expands; both source and observer carried by expansion.
- **S6 repair path:** Compute CMB temperature: T_CMB = T_recomb/(1+z) = 3000/1100 ≈ 2.73 K. The (1+z) factor is from expansion, not Doppler.

### MC-4: The observable universe is 13.8 billion light-years in radius
- **Probe:** "How large is the observable universe?"
- **Characteristic phrase:** "13.8 billion light-years — because that's how long light has had to travel."
- **Trigger:** Intuitive: light-travel distance = c × age of universe.
- **Conflict evidence [P28]:** The light we now receive from the CMB was emitted from regions that were then only ~42 million light-years away. During the 13.8 Gyr that light traveled to us, those regions continued to expand away. They are now ~46 billion light-years away. The observable universe has a comoving radius of ~46 Gly, not 13.8 Gly.
- **Bridge [P30]:** Light-travel distance ≠ current distance in an expanding universe. The "lookback" distance and the "proper" current distance are different quantities. The comoving distance accounts for the expansion during transit.
- **Replacement [P31]:** Observable universe radius: ~46 billion light-years (comoving). Light has only traveled 13.8 billion light-years in travel-time, but the source has receded during transit due to expansion.
- **Discrimination pairs [P33]:** Static universe: observable radius = c × age = 13.8 Gly. Expanding universe: observable comoving radius ~ 46 Gly > c × age.
- **S6 repair path:** Analogy: ant walking on a rubber sheet — the sheet stretches as the ant walks; the ant's start point is now farther than the distance walked.

---

## Section 5 — Explanation Library

### Explanation A — Hubble's Law and the Age of the Universe
Edwin Hubble (1929) found that galaxy recession velocity v is proportional to distance d: v = H₀d. H₀ ≈ 67.4 km/s/Mpc (Planck 2018). If expansion were constant, running time backward gives t = 1/H₀ = 14.5 Gyr as the approximate age. The actual age (13.8 Gyr) differs because the expansion rate was not constant — gravity decelerates it early on while dark energy accelerates it more recently. Three independent methods (CMB, BAO, Type Ia supernovae) converge on 13.8 Gyr, making this one of the best-measured quantities in science.

### Explanation B — Big Bang Nucleosynthesis
In the first three minutes after the Big Bang, when T ~ 10⁹ K, protons and neutrons were in thermal equilibrium. As temperature dropped, neutrons froze out at a ratio n/p ≈ 1/7. Over the next few minutes, essentially all neutrons were incorporated into ⁴He: n_He/n_p ≈ (1/7)/(2) → mass fraction Y_He = 2×(1/8)/1 = 25%. The rest remained as hydrogen (75%). This prediction — independent of all parameters except the baryon-to-photon ratio η — matches observed helium abundances in metal-poor stars and regions to within 1%. BBN also predicts trace amounts of D, ³He, and ⁷Li, all confirmed observationally.

### Explanation C — The Cosmic Microwave Background
At t=380,000 yr (z~1100), T dropped to ~3000 K and electrons combined with protons to form hydrogen atoms. The universe became transparent. All the photons that had been scattering off free electrons streamed freely for the first time — this is the CMB. It is a perfect blackbody spectrum (measured by COBE to 0.01% accuracy), confirming the thermal equilibrium of the early universe. Tiny temperature fluctuations (ΔT/T ~ 10⁻⁵) reflect quantum fluctuations inflated to cosmic scales — the seeds from which galaxies and large-scale structure grew. The CMB is the most detailed snapshot of the early universe available.

---

## Section 6 — Analogy Library

**Primary Analogy:** Raisin bread dough expanding in an oven. Raisins (galaxies) embedded in the expanding dough (space). Every raisin sees every other raisin receding; raisins farther away recede faster because more dough lies between them. No raisin is the center.

**Breaking Point:** Raisin bread has a center and an edge; the universe (if infinite) does not. Also, the bread expands into the oven (existing space); the universe has no "outside" into which it expands. The analogy breaks for the global topology.

**Anti-Analogy:** Steady-state model (Hoyle, 1950s): the universe had no beginning; matter is continuously created to maintain constant density despite expansion. Ruled out by CMB (a steady-state universe predicts no CMB) and the observed abundance of ⁴He (BBN requires a hot dense past).

---

## Section 7 — Demonstration Library

**Demo 1 — Hubble Diagram**
Plot recession velocity vs. distance for a set of galaxies (from supernova data). Show the linear relationship v = H₀d. Extrapolate backward: when was all matter at the same point? → ~1/H₀ ago. Ask: "Why is the actual age 13.8 Gyr while 1/H₀ ≈ 14.5 Gyr?" (Gravity slowed expansion early; dark energy accelerates it now — the two effects partially cancel in the age estimate.)

**Demo 2 — CMB Temperature Calculation**
Given: CMB emitted at T_rec ~ 3000 K; current T_CMB = 2.725 K. Compute z = T_rec/T_CMB − 1 ≈ 1099. Ask: "What does z~1100 mean for the size of the universe at recombination?" (Universe was 1101× smaller in linear scale = 1.3×10⁹× smaller in volume.)

**Demo 3 — BBN Calculation**
Neutron-proton ratio at freeze-out: n/p = exp(−Δm/kT) where Δm = m_n − m_p = 1.293 MeV, T_freeze ≈ 0.7 MeV → n/p ≈ 1/7. Almost all neutrons end up in ⁴He. Helium mass fraction: Y = 2n/(n+p) = 2×(1/7)/(1+7) × 8/7 ≈ 0.25 ≈ 25%. Observed: ~24–26% in metal-poor environments. Match confirms BBN.

---

## Section 8 — Discovery Lesson

**Setup:** Give learners the Hubble data (recession velocity vs. distance for 20 galaxies).

**Task 1:** "Plot v vs. d. What is the slope?" (H₀ ≈ 67 km/s/Mpc.)

**Task 2:** "If this ratio has been constant, when were all galaxies at d=0?" (t ≈ 1/H₀ ≈ 14.5 Gyr.)

**Task 3:** "Now look at this spectrum of a distant galaxy with λ_observed = 780 nm for a line known to emit at λ_rest = 121.6 nm (Lyman alpha). What is z? What is d if z ≈ v/c (approximate)?" (z = 780/121.6 − 1 ≈ 5.4; v ≈ 5.4c — exceeds c! This breaks the simple Doppler approximation; need full Friedmann.)

**Resolution:** The Doppler approximation breaks for high-z. The correct interpretation is expansion of space: the photon's wavelength was stretched by factor (1+z) = 6.4 during its journey. Distance and velocity in an expanding universe require the Friedmann equations.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Rubber-sheet/raisin-bread analogy for isotropic expansion, no center | Learner asks "where did the Big Bang happen?" |
| 2 | Calculate CMB temperature from z~1100: T = 3000/(1+z) ≈ 2.73 K | Learner thinks CMB is from t=0 |
| 3 | Show BBN prediction: n/p = 1/7 → 25% He → compare to observation | Learner asks "what evidence is there for the Big Bang?" |

---

## Section 10 — Voice Teaching

**Opening hook:** "13.8 billion years ago, everything you can see, touch, and measure was compressed into a region smaller than an atom — and then it expanded. We have three independent lines of evidence for this: the Hubble expansion of galaxies, the cosmic microwave background, and the abundance of helium. The Big Bang is not a guess — it is one of the best-confirmed theories in all of science."

**Pacing:** Lead with the three observational pillars (Hubble, CMB, BBN) before the Friedmann equations. The theory should feel demanded by evidence, not imposed.

**Common impasse language:** "The Big Bang wasn't an explosion in space — it was an explosion of space. There is no center and no edge. If you run a movie of the universe backward, every point converges to every other point simultaneously. The Big Bang happened everywhere at once."

**Closing consolidation:** "The universe began hot and dense, expanded and cooled, formed hydrogen and helium in the first three minutes, released the CMB at 380,000 years, formed the first stars at ~200 million years, and has been forming galaxies and stars ever since. We live near the middle of the Milky Way, in the middle of cosmic time — the universe is about halfway through the main-sequence lifetime of its typical stars."

---

## Section 11 — Assessment

**Mastery gate:** Hubble's law and age estimate; CMB origin and temperature; BBN helium abundance; the three evidence pillars for the Big Bang.

**FA-1:** "A galaxy is observed at redshift z = 0.5. Estimate its recession velocity using v = cz. Is this approximation valid?"
*Expected:* v ≈ 0.5c = 1.5×10⁸ m/s. At z=0.5, this approximation overestimates by ~15% (relativistic corrections needed). Valid only for z ≪ 1 (small redshifts).
*Threshold:* Correct calculation; aware of approximation's limitations.

**FA-2:** "What is the origin of the cosmic microwave background? Why is it at 2.725 K?"
*Expected:* CMB was emitted at z~1100 (t~380,000 yr after Big Bang) when the universe cooled to ~3000 K and became transparent. Since then, the universe expanded by factor 1+z~1100, stretching the photon wavelengths: T today = 3000/1100 ≈ 2.73 K. It is the "oldest light" — the surface of last scattering.
*Threshold:* Correct origin (recombination, not Big Bang); correct temperature calculation with (1+z) factor.

**FA-3:** "What is the predicted primordial helium mass fraction from BBN, and what does it depend on?"
*Expected:* Y_He ≈ 25% by mass. It depends on the neutron-to-proton ratio at freeze-out (n/p ≈ 1/7), which in turn depends on the baryon-to-photon ratio η and the expansion rate at T~1 MeV. The fraction is nearly independent of small changes in η but sensitive to the number of neutrino flavors (3 in the Standard Model) and the neutron lifetime.
*Threshold:* Correct fraction (~25%); identifies n/p ratio and its origin; knows it's a prediction from first principles.

**FA-4:** "What are three independent observational pillars supporting the Big Bang model?"
*Expected:* (1) Hubble expansion: v = H₀d, confirmed by galaxy redshifts; (2) CMB: 2.725 K blackbody radiation, confirmed by COBE/WMAP/Planck — thermal relic of the hot early universe; (3) BBN: predicted H/He ratio ~3:1 by mass, confirmed in metal-poor systems. (Additional: large-scale structure, light element abundances, BAO.)
*Threshold:* All three stated with brief physical explanation of each.

**Confidence calibration:** After FA-3, ask: "Could you explain why the CMB temperature anisotropy ΔT/T ~ 10⁻⁵ is significant?" Tests whether the learner understands that these tiny fluctuations are the seeds of all cosmic structure — galaxies, clusters, filaments.

**Delayed retrieval:** Return at day 7: "Estimate the age of the universe from H₀ = 67 km/s/Mpc. Why does the actual age differ from 1/H₀?"

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Learner doesn't know what a redshift is or how Hubble's law works. Review phys.wave.doppler-effect first; then distinguish cosmological redshift from Doppler.

**S3 — Partial understanding:** Can quote Hubble's law and CMB temperature but cannot explain origins or derive BBN fractions. Intervention: walk through BBN calculation (Demo 3) step by step.

**S6 — Misconception detected:** MC-1 (Big Bang at a location) or MC-3 (redshift = Doppler). Intervention: MC-1 → raisin bread analogy; MC-3 → compute what recession velocity would be needed to Doppler-shift z=5 galaxy and show it exceeds c.

**S9 — Near mastery:** Understands Big Bang but not dark energy or the accelerated expansion. Intervention: preview phys.astro.dark-matter/dark-energy — Type Ia SN data (1998 Nobel Prize) showed z vs. distance fainter than expected for decelerating universe → accelerated expansion → Λ > 0.

---

## Section 13 — Memory & Review

**Memory type:** Timeline (key epochs and when they occur) + three evidence pillars (Hubble, CMB, BBN) + Friedmann equation structure.

**Spaced retrieval schedule:** Day 1 (three Big Bang evidence pillars; Hubble's law), Day 3 (CMB origin and temperature; BBN He fraction), Day 7 (cosmic timeline: 10⁻⁴³ s to 13.8 Gyr; what happens at each epoch), Day 21 (ΛCDM energy budget: 5/27/68% matter/DM/DE).

**Interleaving partners:** phys.rel.spacetime (Friedmann equation is GR applied to a homogeneous, isotropic universe; the metric is the Robertson-Walker metric, a special case of g_μν), phys.astro.stellar-structure (stars form and synthesize metals within the cosmic timeline), phys.astro.dark-matter (ΛCDM requires 27% dark matter; evidence from CMB + structure formation).

---

## Section 14 — Transfer Map

**Near transfer:** Age dating of the universe from H₀; CMB as diagnostic of early-universe physics; using SNe Ia as standard candles to measure deceleration/acceleration.

**Far transfer:** Particle physics at early universe energies (t < 10⁻¹⁰ s: electroweak symmetry breaking; t < 10⁻³⁵ s: inflation?). The early universe was the highest-energy physics laboratory that ever existed; cosmological observations constrain particle physics (number of neutrino species from BBN; WIMP dark matter from structure formation).

**Structural abstraction:** The Friedmann equations are the cosmological application of GR — the same formalism used for black holes and gravitational waves. The scale factor a(t) is analogous to a size coordinate; H = ȧ/a is the Hubble parameter describing expansion. The transition from decelerated to accelerated expansion (at z~0.7) encodes the relative contributions of matter (decelerating) and dark energy (accelerating) — directly observable in the Hubble diagram.

---

## Section 15 — Curriculum Feedback

**Dependency check:** phys.rel.spacetime (four-vectors, Lorentz invariance, metric tensor) is needed to understand the Friedmann equation and why cosmological redshift is not Doppler. phys.astro.stellar-structure provides the stellar context (stars form within the cosmic timeline; BBN precedes stellar nucleosynthesis).

**Common pacing error:** Teaching the Big Bang as a narrative timeline without establishing the three independent evidence pillars. Learners who learn only the story cannot assess its evidential basis.

**Assessment gap:** Most curricula test Hubble's law and the CMB temperature but rarely ask learners to derive the BBN helium fraction, explain the comoving vs. proper distance distinction, or connect the Friedmann equation to GR.

**Suggested pairing:** Pair with phys.astro.dark-matter for the ΛCDM completion: cosmology requires dark matter (27%) to explain structure formation and the CMB power spectrum, and dark energy (68%) to explain the accelerated expansion.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
