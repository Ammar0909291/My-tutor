# Teaching Blueprint: Relativistic Momentum and Energy

## 0. Concept Metadata
- **Concept ID**: phys.rel.relativistic-momentum
- **Name**: Relativistic Momentum and Energy
- **Domain**: Special Relativity
- **Difficulty**: expert
- **Bloom Level**: apply
- **Estimated Hours**: 8
- **Prerequisites**: phys.rel.lorentz-transform
- **Unlocks**: phys.rel.mass-energy
- **Description**: Relativistic momentum is p = γmv and total energy E = γmc²; together they form the energy-momentum four-vector.

---

## 1. Concept Spine

### Core Idea
At speeds comparable to c, the classical momentum p = mv fails to be conserved in all reference frames. The correct relativistic momentum is p = γmv, where γ = 1/√(1−v²/c²). Total relativistic energy is E = γmc² = mc² + KE_relativistic. The famous energy-momentum relation E² = (pc)² + (mc²)² unifies these and remains valid even for massless photons (m = 0, E = pc). Together, (E/c, p) forms a Lorentz four-vector.

### Conceptual Ladder
1. **Recall**: γ = 1/√(1−v²/c²) from Lorentz transformations; γ → ∞ as v → c.
2. **Understand**: Why classical p = mv fails: it's not conserved when Lorentz-transforming between frames for high-velocity collisions.
3. **Apply**: Use p = γmv, E = γmc², E² = (pc)² + (mc²)² for calculations involving high-energy particles.
4. **Extend**: Rest energy mc² is real energy stored in mass; kinetic energy KE = (γ−1)mc²; massless particles (photons) have E = pc.

### Key Formula Set
- **Relativistic momentum**: p = γmv
- **Total energy**: E = γmc²
- **Rest energy**: E₀ = mc²
- **Kinetic energy**: KE = E − E₀ = (γ−1)mc²
- **Energy-momentum relation**: E² = (pc)² + (mc²)²
  (This holds in ALL frames and for ALL particles, including photons)
- **Four-momentum**: p^μ = (E/c, pₓ, p_y, pᵤ) — transforms as a Lorentz four-vector
- **Lorentz scalar**: E² − (pc)² = (mc²)² = invariant mass squared
- **Photon**: m = 0 → E = pc; p = E/c = hf/c = h/λ (consistent with de Broglie)
- **Low-speed limit**: γ ≈ 1 + v²/2c² → KE ≈ mv²/2 ✓ (classical limit recovered)

### Canonical Examples
- **Electron accelerated to 0.99c**: γ = 1/√(1−0.99²) ≈ 7.09. KE = (7.09−1)×0.511 MeV = 3.11 MeV. Classical would give KE = mv²/2 = 0.25 MeV — factor 12× too small.
- **Photon energy**: E = hf; p = E/c = hf/c. Check: E² = (pc)² + 0 → E = pc ✓.
- **Threshold energy for pair production**: γ + γ → e⁺ + e⁻. Using E² − (pc)² invariant: 2E_γ ≥ 2m_e c² → E_γ ≥ 0.511 MeV each.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Push a shopping cart harder and harder. At low speeds, doubling your force roughly doubles the speed (Newton's law). Now imagine the cart approaching c — no matter how hard you push, it can never reach c. Its momentum p = γmv keeps growing (γ → ∞) even as v barely increases beyond 0.99c. The energy you're inputting goes into increasing γ (and hence KE and p), not into increasing v much. The cart becomes effectively infinitely "heavy" — its inertia keeps growing.

### Representational (Diagrams and Symbols)
- **γ vs. v/c graph**: Plot γ from v=0 (γ=1) to v=0.99c (γ=7.1) to v=0.9999c (γ=70.7). Show the explosive growth near c.
- **KE comparison table**: Classical KE = mv²/2 vs. relativistic KE = (γ−1)mc² for v = 0.1c, 0.5c, 0.9c, 0.99c. Shows convergence at low v, large divergence at high v.
- **Energy-momentum diagram**: E vs. p curve E² = (pc)² + (mc²)². Massive particle: hyperbola. Photon: straight line E = pc (slope c). Rest: E = mc², p = 0.
- **Four-vector diagram**: Spacetime analogy — four-position (ct, x) transforms as Lorentz; four-momentum (E/c, p) transforms the same way.

### Abstract (Equation Manipulation)
Students must practice:
1. Given v, compute γ and then p = γmv and E = γmc².
2. Use E² = (pc)² + (mc²)² — given E, find p; or given p, find E.
3. Apply invariant mass: E² − (pc)² = (mc²)² is the same in all frames.
4. Threshold energy calculations using the invariant in the CM frame.
5. Show classical limit: Taylor expand γ ≈ 1 + v²/2c² → KE ≈ mv²/2.

### Transfer (Novel Contexts)
- **Particle accelerators**: LHC protons at 6.5 TeV; rest mass = 938 MeV; γ ≈ 6900. All energy goes into γ, not velocity (v = 0.9999999c).
- **Cosmic rays**: Ultra-high-energy cosmic rays with E ≈ 10²⁰ eV hitting the atmosphere — relativistic kinematics governs the air-shower physics.
- **PET scanning**: Positron (e⁺) annihilates with electron (e⁻) → two photons, each E = 0.511 MeV = m_e c², emitted back-to-back (momentum conservation). Requires E = mc² and E = pc simultaneously.

---

## 3. Why Beginners Fail

### Failure Mode 1: Using classical p = mv for high-speed particles
Students forget to include γ. The error is invisible at low speeds (γ ≈ 1) but enormous at v = 0.99c (γ ≈ 7).

### Failure Mode 2: Thinking "mass increases" relativistically
Some textbooks use "relativistic mass" m_rel = γm. This is an outdated and conceptually misleading framework. Prefer: mass m is invariant (rest mass); momentum p = γmv and energy E = γmc² both depend on γ. The four-vector approach is cleaner: invariant mass squared = E²/c² − p² = m²c².

### Failure Mode 3: Forgetting rest energy in energy conservation
Students write KE = mv²/2 for relativistic particles and then add potential energy terms, missing the mc² rest energy entirely. In relativistic problems, use total energy E = γmc² in conservation equations.

### Failure Mode 4: Misapplying E = pc to massive particles
Students apply E = pc (valid only for photons, m = 0) to electrons or protons. For massive particles, E² = (pc)² + (mc²)² — there is a constant (mc²)² offset.

---

## 4. Misconception Library

### MC-1: "Nothing can travel faster than light because it would need infinite force"
- **Probe**: "Why can't a rocket reach c? Is it because we don't have a powerful enough engine?"
- **Characteristic phrase**: "We just don't have enough fuel/thrust yet."
- **Trigger**: Classical thinking: F = ma → with enough force, any speed is achievable.
- **Conflict evidence**: Relativistic KE = (γ−1)mc² → ∞ as v → c. You would need infinite energy, not just more force. No finite energy source can accelerate a massive particle to c.
- **Bridge**: It's not about force limits — it's about energy. Each increment of speed costs more energy (γ grows explosively). To go from 0.99c to 0.999c costs more energy than going from 0 to 0.99c.
- **Replacement**: The energy barrier is infinite — the speed barrier is energetic, not mechanical. Massless particles (photons) naturally travel at c because they have no rest energy to overcome.
- **Discrimination pairs**: "Infinite energy needed to reach c → thermodynamic/physical impossibility" ✓ vs. "Just need a more powerful rocket" ✗
- **S6 repair path**: Calculate energy needed to accelerate an electron from 0 to 0.99c and 0.99c to 0.999c; compare.

### MC-2: "E = mc² means mass can be converted to energy by destroying atoms"
- **Probe**: "How does a nuclear reactor convert mass to energy? Does it destroy atoms?"
- **Characteristic phrase**: "The mass is annihilated and becomes pure energy."
- **Trigger**: Popularized "E = mc²" descriptions.
- **Conflict evidence**: In fission, atoms are not destroyed — uranium becomes barium + krypton + neutrons. The mass of products is slightly less than uranium, and Q = Δm·c² accounts for the energy released. No matter is "annihilated."
- **Bridge**: E = mc² says mass IS energy — it is stored energy, not destroyed when released. The mass decrease Δm corresponds to released binding energy.
- **Replacement**: E = mc² means rest mass is a form of energy. Nuclear reactions release a fraction of this as kinetic energy/radiation; the vast majority of mass-energy remains in the products.
- **Discrimination pairs**: "Small Δm × c² = Q (released energy)" ✓ vs. "Entire mass converted to energy" ✗
- **S6 repair path**: Compute what fraction of ²³⁸U mass is released in fission: ~0.09% — the rest remains in fission products.

### MC-3: "Relativistic mass (γm) is the real mass"
- **Probe**: "Does an electron moving at 0.99c have a different mass than one at rest?"
- **Characteristic phrase**: "Moving objects are heavier."
- **Trigger**: Old textbook language: "mass increases with velocity."
- **Conflict evidence**: In the particle's own rest frame, it has mass m — always. The quantity γm is not an invariant; it depends on the observer's frame. True (invariant) mass = rest mass m. The energy-momentum relation E² − (pc)² = (mc²)² defines the invariant mass unambiguously.
- **Bridge**: "Relativistic mass" was pedagogically useful but creates confusion when used in Newton's law (F = ma becomes ill-defined). Modern physics uses rest mass m exclusively.
- **Replacement**: Mass m is invariant (Lorentz scalar). The γ factor enters momentum (p = γmv) and energy (E = γmc²) explicitly, without changing m.
- **Discrimination pairs**: "Rest mass m invariant; p = γmv, E = γmc²" ✓ vs. "Mass γm increases with v" ✗
- **S6 repair path**: Show that the four-vector invariant E²/c² − p² = m²c² is frame-independent; confirm with numerical example.

### MC-4: "The energy-momentum relation E² = (pc)² + (mc²)² is only for particles at rest"
- **Probe**: "A proton is moving at 0.9c. Does E² = (pc)² + (mc²)² still apply?"
- **Characteristic phrase**: "That formula is for rest energy only."
- **Trigger**: Confusing E = mc² (rest energy only) with the full E² relation.
- **Conflict evidence**: E² = (pc)² + (mc²)² holds for all particles in any frame. Proof: E = γmc², p = γmv → (pc)² + (mc²)² = γ²m²v²c² + m²c⁴ = m²c⁴(γ²v²/c² + 1) = m²c⁴γ²(v²/c² + 1/γ²) = m²c⁴γ²(v²/c² + 1 − v²/c²) = m²c⁴γ² = E² ✓.
- **Bridge**: E = mc² is the special case v = 0 (γ = 1). The full relation is E² = (pc)² + (mc²)², valid for all v.
- **Replacement**: E² − (pc)² = (mc²)² is a Lorentz invariant — true in all frames for all massive particles.
- **Discrimination pairs**: "E² = (pc)² + (mc²)² always (all v, all m ≥ 0)" ✓ vs. "Only for v = 0" ✗
- **S6 repair path**: Verify the relation algebraically for v = 0.9c proton: compute E, p, then check E² = (pc)² + (0.938)².

---

## 5. Explanation Library

### Explanation A — Four-vector derivation (for mathematically confident learners)
In special relativity, spacetime events are described by four-vectors x^μ = (ct, x, y, z) that transform via Lorentz transformations. The proper time interval dτ = dt/γ is Lorentz invariant. Define four-velocity u^μ = dx^μ/dτ = γ(c, v). Four-momentum p^μ = mu^μ = (γmc, γmv) = (E/c, p). The Lorentz transformation of p^μ gives: E' = γ(E − v·p), p'_∥ = γ(p_∥ − vE/c²). The invariant scalar p^μ p_μ = E²/c² − p² = m²c² is frame-independent — this is the energy-momentum relation.

### Explanation B — Conservation law motivation (for conceptual learners)
Classical momentum p = mv is NOT conserved in all inertial frames under Lorentz transformations. Experiment confirms momentum IS conserved in high-energy collisions. The only Lorentz-covariant definition of momentum that is conserved is p = γmv. This is why we use it — it's the correct quantity, not just a mathematical trick. Energy E = γmc² follows from requiring E and p to transform together as a four-vector.

### Explanation C — Formulas and limits (for applied learners)
Three regimes:
1. v << c: γ ≈ 1, p ≈ mv, KE ≈ mv²/2 (classical mechanics recovered).
2. v → c: γ → ∞, p → ∞, KE → ∞. Asymptotic: E ≈ pc (particle behaves like a photon).
3. m = 0 (photon): γ undefined, but E = pc applies directly; use E = hf.
All regimes are unified by E² = (pc)² + (mc²)².

---

## 6. Analogy Library

### Primary Analogy
**Currency exchange with escalating fees**: As you convert more currency, the exchange rate gets worse and worse (transaction costs scale up). Converting the last €1 to c-speed costs infinitely more than the first €1 converted. Your "speed-buying power" (momentum per unit energy) approaches zero as v → c — all your energy goes into γ, not v.

### Breaking Point
Currency exchange is reversible and non-physical. The analogy doesn't capture why γ diverges specifically at c (related to spacetime geometry) or why photons are exactly at c. Use only as an intuition for "why more energy doesn't proportionally increase speed."

### Anti-Analogy
"E = mc² means mass turns into energy" — mass and energy are the same thing (E = mc²), not different substances that convert into each other. Chemical or nuclear reactions release some stored mass-energy as kinetic energy; they don't "turn mass into energy" any more than a spring "turns elastic potential into kinetic energy."

---

## 7. Demonstration Library

### Demo 1: LHC Energy Scale
Materials: Calculator.
LHC proton at 6.5 TeV: E = 6.5 × 10¹² eV = 6.5 × 10¹² × 1.6 × 10⁻¹⁹ J. Proton rest energy mc² = 938 MeV. Ratio γ = E/mc² ≈ 6.5×10⁶/0.938 ≈ 6930. Velocity: v = c√(1−1/γ²) ≈ c(1 − 1/(2γ²)) ≈ c(1 − 1.04×10⁻⁸). The proton is 99.9999999% of c but nowhere near c itself.

### Demo 2: Electron Kinetic Energy Comparison
Materials: Calculator.
Electron at v = 0.9c: γ = 1/√(1−0.81) = 1/√0.19 ≈ 2.294.
Classical KE = mv²/2 = 0.511 MeV × 0.81/2 = 0.207 MeV.
Relativistic KE = (γ−1)mc² = 1.294 × 0.511 = 0.661 MeV.
Ratio: 3.2×. Students see the 3× discrepancy — classical formula is badly wrong here.

### Demo 3: Photon Pair Production Threshold
Materials: Whiteboard.
γ + γ → e⁺ + e⁻: Two photons collide head-on. Use invariant mass in CM frame: s = (E₁ + E₂)² − (p₁c − p₂c)² = (2E_γ)² for head-on (p₁ = −p₂ = E_γ/c). Products at threshold: s = (2m_e c²)² = 4 × (0.511)² = 1.044 MeV². So 4E_γ² = 1.044 → E_γ = 0.511 MeV. Each photon must have at least 0.511 MeV = m_e c². This threshold prediction has been verified experimentally.

---

## 8. Discovery Lesson

**Title**: "What Happens When We Accelerate a Particle to High Speed?"

**Hook**: "A linear accelerator can give an electron 50 MeV of energy. If classical mechanics were right, what speed would it reach? Let's calculate — and then find the flaw."

**Exploration**:
1. Classical: KE = mv²/2 = 50 MeV → v = √(2×50 MeV/0.511 MeV) × c = 14c. Absurd — exceeds c!
2. Something is wrong with classical KE at high energies.
3. Students apply relativistic KE = (γ−1)mc²: 50 MeV = (γ−1)(0.511 MeV) → γ = 98.9.
4. Solve: v = c√(1 − 1/γ²) = c√(1 − 1/9780) ≈ 0.999995c.
5. Compare: Classical predicts 14c; relativistic gives 0.999995c. Factor of 14000 × discrepancy in speed prediction.

**Generalization**: At high energies, relativistic mechanics is not a small correction — it completely transforms the kinematic picture. Particle accelerators, which operate routinely at these energies, confirm the relativistic formulas in every measurement.

---

## 9. Teaching Actions

**session_cap**: 7

1. **Classical failure**: Show v = 14c result from classical KE = 50 MeV. Motivate need for relativistic framework.
2. **Define p = γmv and E = γmc²**: Derive the low-speed limit (Taylor expand γ) to show they match classical at v << c.
3. **Energy-momentum relation**: Derive E² = (pc)² + (mc²)² algebraically from p = γmv, E = γmc².
4. **Photon limit**: Set m = 0 → E = pc. Connect to de Broglie: p = h/λ, E = hf = pc ✓.
5. **Numerical practice**: Students calculate γ, p, E, KE for electrons at v = 0.9c and 0.99c.
6. **Invariant mass**: E² − (pc)² = (mc²)² is the same in all frames. Apply to threshold calculation.
7. **Address "relativistic mass" misconception**: Explicitly reject γm as "the mass"; insist on rest mass m as invariant.

---

## 10. Voice Teaching

**Opening move**: "Classical mechanics says you can reach any speed with enough energy. Let's see how it fails — and what replaces it."

**Core explanation**: "Two formulas: p = γmv and E = γmc². As v → c, γ → ∞, and both p and E → ∞. That's why no finite energy can accelerate a massive particle to c. The energy-momentum relation E² = (pc)² + (mc²)² connects them all — including photons, where m = 0."

**Common error interception**: "When you write E = mc², that's only the rest energy. For a moving particle, E = γmc². Don't drop the γ."

**Checkpoint question**: "A photon has frequency f. What is its momentum?" (p = E/c = hf/c = h/λ.) "Does a photon have mass?" (No — m = 0; it obeys E = pc, not E = γmc².)

**Closing move**: "Every particle accelerator — from the one that discovered the Higgs boson to the ones that treat cancer — is designed using these exact formulas. This is not abstract theory; it's the engineering manual for high-energy physics."

---

## 11. Assessment

### Mastery Gate
Student can: (1) compute p = γmv, E = γmc², KE = (γ−1)mc² for any massive particle at given v, (2) apply E² = (pc)² + (mc²)² to find p from E or vice versa, (3) correctly handle photons (m = 0, E = pc), (4) identify and use the Lorentz invariant E² − (pc)².

### Formative Assessment 1 — Momentum and energy
**Prompt**: "A proton (rest mass 938 MeV/c²) moves at v = 0.8c. Find (a) γ, (b) p in MeV/c, (c) total energy E in MeV, (d) kinetic energy in MeV."
**Expected answer**: γ = 1/√(1−0.64) = 1/0.6 = 5/3 ≈ 1.667. p = γmv = 1.667 × 938 × 0.8 = 1250 MeV/c. E = γmc² = 1.667 × 938 = 1564 MeV. KE = E − mc² = 1564 − 938 = 626 MeV.
**Threshold**: γ correct to 3 sig figs; E, p, KE derived correctly.

### Formative Assessment 2 — Energy-momentum relation
**Prompt**: "An electron has total energy E = 5 MeV. Find its momentum p using the energy-momentum relation."
**Expected answer**: p = √(E² − (mc²)²)/c = √(25 − 0.261)/c = √24.74/c ≈ 4.97 MeV/c.
**Threshold**: ±0.05 MeV/c.

### Formative Assessment 3 — Photon momentum
**Prompt**: "A gamma-ray photon has energy 1.5 MeV. Find its momentum and wavelength."
**Expected answer**: p = E/c = 1.5 MeV/c. λ = h/p = hc/E = 1240 eV·nm / (1.5×10⁶ eV) = 8.27×10⁻⁴ nm = 0.827 pm.
**Threshold**: Correct p; wavelength within 5%.

### Formative Assessment 4 — Lorentz invariant
**Prompt**: "A pion (m = 135 MeV/c²) decays into two photons: π⁰ → γ + γ. In the pion's rest frame, what is the energy of each photon? Use the invariant mass."
**Expected answer**: In rest frame, pion has E = mc² = 135 MeV, p = 0. By momentum conservation, photons are emitted back-to-back with equal momenta. By energy conservation: 2E_γ = 135 MeV → E_γ = 67.5 MeV each.
**Threshold**: Correct reasoning from momentum and energy conservation; E_γ = 67.5 MeV.

### Confidence Calibration
After FA1: "How confident are you (0–100%) that your γ = 5/3 is correct? What's the quick check?" (1/γ² + v²/c² should equal 1: (0.6)² + (0.8)² = 0.36 + 0.64 = 1 ✓.)

### Delayed Retrieval
Two weeks later: Write the energy-momentum relation for (a) a proton, (b) a photon, (c) a neutrino (approximately massless). State the condition under which each reduces to the other's form.

---

## 12. Recovery Notes

### S0 — Block: "Why does classical p = mv fail?"
Return to a thought experiment: two particles collide in frame S with classical momentum conserved. Lorentz-transform to frame S'. Show that classical p = mv is NOT conserved in S' (numerical example: head-on equal-mass collision; after transformation, momenta don't balance). This motivates the need for p = γmv, which IS conserved in all frames.

### S3 — Can compute γ but not E and p
Drill: given γ, immediately write E = γmc² (substitute numbers) and p = γmv = (E/c²)v = E×(v/c)/c. Students who memorize E = γmc² and then substitute are more reliable than those who re-derive each time.

### S6 — Cannot use E² = (pc)² + (mc²)²
The relation is simpler than it looks: it's just the Pythagorean theorem in energy-momentum space. Draw a right triangle: hypotenuse = E, one leg = pc, other leg = mc². Given any two, find the third. Practice 5 examples with different known quantities.

### S9 — Cannot handle photon (m = 0) case
E = pc is the photon's version. Students who set m = 0 in E² = (pc)² + (mc²)² get E² = (pc)² → E = pc directly. Drill: photon with λ = 0.5 nm → p = h/λ → E = pc. Check with E = hf = hc/λ → same answer.

---

## 13. Memory and Review

### Memory Type
Procedural (γ calculation, formula chains) + conceptual (why classical fails, invariant mass) + structural (four-vector framework connecting spacetime and energy-momentum).

### Spaced Retrieval Schedule
- Day 1: Compute γ, p, E, KE for proton at 0.95c.
- Day 3: Apply E² = (pc)² + (mc²)² to find p given E = 2mc².
- Day 7: Explain in 3 sentences why a massive particle can never reach c.
- Day 14: Find the energy of each photon in π⁰ → γγ from the pion rest frame.
- Day 30: Derive E² = (pc)² + (mc²)² from p = γmv and E = γmc² by eliminating γ.

### Interleaving Partners
- phys.rel.lorentz-transform (γ factor, four-vectors)
- phys.rel.mass-energy (E = mc² rest energy — direct consequence)
- phys.mod.nuclear-reactions (relativistic threshold energy calculations)

---

## 14. Transfer Map

### Near Transfer
- Compute momentum, total energy, kinetic energy for any massive particle at a given speed.
- Apply the energy-momentum relation to find unknowns in a two-body decay or collision.
- Handle massless and nearly-massless particles (photons, neutrinos).

### Far Transfer
- **Medical radiation therapy**: Electron linacs produce MeV electrons; beam design requires relativistic kinematics.
- **Astrophysics**: Relativistic jets from black holes, synchrotron radiation, ultra-relativistic cosmic rays — all governed by these formulas.
- **Dark matter searches**: Missing energy and momentum in LHC collisions used to detect invisible particles — requires complete relativistic energy-momentum accounting.

### Structural Abstraction
The four-vector framework (p^μ = (E/c, p)) is the prototype for all covariant descriptions in special relativity. The pattern — two quantities that separately depend on frame, combined into a four-vector whose magnitude is invariant — generalizes to electromagnetic four-potential, four-current, and eventually to the tensor machinery of general relativity.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.rel.lorentz-transform provides the γ factor and the four-vector framework needed here. Students who mastered the Lorentz transformations of coordinates can immediately accept the analogous transformation of (E/c, p). The prerequisite is necessary and sufficient.

### Unlock Readiness
phys.rel.mass-energy (E = mc²) is the direct application of the rest-energy concept introduced here. The blueprint is well-prepared for that follow-on.

### Suggested Flag
Flag: students who used "relativistic mass" (γm) in prior courses will need explicit unlearning of that notation. Build in a misconception-confrontation moment at the start of the session.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
