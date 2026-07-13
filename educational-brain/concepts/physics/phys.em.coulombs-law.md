# Coulomb's Law — `phys.em.coulombs-law`

## Identity

- **Concept ID**: `phys.em.coulombs-law`
- **Display name**: Coulomb's Law
- **Domain**: electromagnetism
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `phys.em.electric-charge`
- **Unlocks**: `phys.em.electric-field`, `phys.mod.bohr-model`
- **Load-bearing prerequisite content**:
  - From `phys.em.electric-charge`: charge is quantised and signed (positive/negative); the sign determines attraction vs. repulsion; the elementary charge e = 1.6 × 10⁻¹⁹ C; charge is conserved
  - The sign of each charge must be correctly determined before applying Coulomb's law — errors in charge-sign flow directly into errors in force direction

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Two charged objects exert forces on each other even without touching. Like charges (both positive or both negative) repel; unlike charges (one positive, one negative) attract. The closer together they are, the stronger the force.

**Stage 2 — Intermediate**: Coulomb's law gives the magnitude of the electrostatic force between two point charges: F = kq₁q₂/r², where k = 8.99 × 10⁹ N·m²/C² (Coulomb's constant; alternatively k = 1/(4πε₀)), q₁ and q₂ are the charge magnitudes (in coulombs), and r is the separation (in metres). The force is attractive if the charges have opposite signs, repulsive if the same sign. The force is along the line joining the charges. It obeys Newton's third law: the force on q₁ due to q₂ is equal in magnitude and opposite in direction to the force on q₂ due to q₁.

**Stage 3 — Advanced**: Coulomb's law in vector form: **F₁₂** = kq₁q₂ **r̂₁₂** / r², where **r̂₁₂** is the unit vector from charge 2 to charge 1. The sign of the product q₁q₂ determines the direction: positive product → repulsion (force points along **r̂₁₂**); negative product → attraction (force points opposite **r̂₁₂**). Superposition principle: the total force on a charge due to multiple other charges is the vector sum of the individual Coulomb forces. This is an exact law for point charges in vacuum.

**Stage 4 — Expert / University**: Coulomb's law is the static limit of the Lorentz force law and is exact in the non-relativistic, static regime. It is derived from Maxwell's equations (Gauss's law for electricity): ∇·**E** = ρ/ε₀, which for a point charge gives F = q₁q₂/(4πε₀r²). The 1/r² dependence is a consequence of the masslessness of the photon (the force carrier). Virtual photon exchange mediates the electrostatic interaction in QED.

**Model versioning**: Stage 2 is the operative model for all secondary-level electrostatics. Stage 3 introduces the vector form and superposition. Stage 4 is university electrodynamics.

---

## Why beginners fail

The dominant root cause is **inverse-square law misapplication**: learners know the F ∝ 1/r² relationship but fail to apply it correctly when r changes by a factor. They compute "r doubles → F halves" instead of "r doubles → F decreases by a factor of 4." The 1/r² behaviour requires squaring the factor before taking the reciprocal.

The secondary root cause is **sign handling in the force direction**: learners plug magnitudes into F = kq₁q₂/r², get a positive number, and then separately try to determine if the force is attractive or repulsive. They frequently guess wrong or forget to state the direction at all. The vector form (Stage 3) eliminates this ambiguity, but secondary learners need a sign-reading protocol for the magnitude form.

---

## Misconception library

**M1 — "Doubling the distance halves the force"**
- Characteristic phrase: "If you move twice as far, the force is half as much."
- Probe: "Two charges are 2 cm apart with force F. They are moved to 4 cm apart. What is the new force?"
- Expected wrong answer: "F/2."
- Recovery: F ∝ 1/r². If r → 2r, then r² → 4r², and F → F/4. The force is one-quarter, not one-half. Distance doubled → distance squared quadrupled → force quartered. This is the defining feature of an inverse-square law. Always square the ratio first: (r_new/r_old)² is the factor by which r² changes; F changes by its reciprocal.

**M2 — "The force on q₁ due to q₂ is greater than the force on q₂ due to q₁ if q₁ is larger"**
- Characteristic phrase: "The bigger charge feels more force — the smaller one feels less."
- Probe: "A charge of +10 C and a charge of +0.01 C are 1 m apart. Which charge experiences the greater force?"
- Expected wrong answer: "The +10 C charge experiences more force."
- Recovery: Newton's third law applies. The force on each is F = kq₁q₂/r² — the SAME magnitude for both, opposite direction. The 10 C charge exerts a force on the 0.01 C charge, and the 0.01 C charge exerts an equal and opposite force on the 10 C charge. The formula uses both charges symmetrically.

**M3 — "Coulomb's law requires both charges to be the same sign"**
- Characteristic phrase: "The formula doesn't work for opposite charges" or "If q₁q₂ is negative, there's no force."
- Probe: "Calculate the force between a +3 μC charge and a −2 μC charge 0.5 m apart."
- Expected wrong answer: "I can't use the formula for opposite charges" or substituting only magnitudes without noting direction.
- Recovery: the formula F = k|q₁||q₂|/r² gives the magnitude; the sign of q₁q₂ determines the direction. Negative product (opposite signs) → attractive force. Positive product (same signs) → repulsive force. The formula works for all charge combinations; the sign tells you direction.

**M4 — "Coulomb's law applies at any scale and for any charge distribution"**
- Characteristic phrase: "I'll use Coulomb's law to find the force between two charged spheres."
- Probe: "Two conducting spheres each with charge Q are separated by distance r (centre-to-centre). When is F = kQ²/r² exact?"
- Expected wrong answer: "Always."
- Recovery: Coulomb's law is exact only for point charges. For extended charge distributions, it applies when the separation r is much larger than the size of the distributions (they can be treated as point charges). For two conducting spheres, the charge redistributes on the surfaces non-uniformly when they are close — Coulomb's law with total Q and centre-to-centre r is then approximate, not exact.

---

## Explanation library

**E1 — The inverse-square ratio method (procedural)**
"F ∝ 1/r². If r changes by a factor of n, then r² changes by n², and F changes by 1/n². Always: (1) compute the factor change in r. (2) Square it. (3) Take the reciprocal. That's the factor change in F. Example: r triples → r² × 9 → F ÷ 9. No formula needed; just this three-step ratio."

**E2 — Coulomb's law vs. gravitational law**
Both F_gravity = Gm₁m₂/r² and F_Coulomb = kq₁q₂/r² have the same 1/r² dependence and the same product-of-sources structure. Differences: (1) gravity is always attractive (masses are always positive); Coulomb force can attract or repel. (2) k = 8.99 × 10⁹ >> G = 6.67 × 10⁻¹¹ — electrostatic forces are enormously stronger than gravity for fundamental particles. The proton–proton electrostatic repulsion inside a nucleus is ~10³⁶ times stronger than their gravitational attraction.

**E3 — Superposition principle**
"Each pair of charges exerts a Coulomb force independently. The total force on a charge is the vector sum of all the individual Coulomb forces. Three charges on a line: find F₁₂ and F₁₃ separately; add as vectors (same line → add with signs based on direction). In 2D: find each force as a vector with x and y components; add components separately."

---

## Analogy library

**Primary analogy — The gravitational analogy (structure only)**
Coulomb's law has the exact same mathematical form as Newton's law of gravitation. A student who has studied gravity already knows: "force is proportional to the product of the sources and inversely proportional to the square of the distance." The only additions for electrostatics are: (1) sources can be positive or negative (masses are always positive), so force direction must be determined by sign, and (2) the constant k >> G means electric forces dwarf gravitational forces between fundamental particles.

**Breaking point**: Gravity is always attractive; Coulomb force can be repulsive. A learner who learns Coulomb from the gravity analogy may forget that opposite charges attract — the sign-determines-direction rule is the critical difference. Never say "Coulomb's law is the same as gravity" — say "same form, different constants, and the sign of q can reverse the direction."

**Anti-analogy — "Closer always means stronger for any force"**
The 1/r² relationship is specific to inverse-square laws. Not all forces get stronger as distance decreases — spring forces (F = kx) get stronger with distance, and the strong nuclear force weakens sharply at nuclear radii. Do not over-generalise the "closer = stronger" rule beyond the 1/r² context.

---

## Demonstration library

**D1 — Charged rods and force observation**
Charge two identical rods (glass rubbed with silk → positive). Suspend one on a pivot. Bring the other near: repulsion is visible. Charge one rod oppositely (PVC rubbed with wool → negative). Now attraction is visible. This demonstrates the sign-dependent direction qualitatively.

**D2 — Torsion balance (Coulomb's original apparatus)**
In a torsion balance (or simulation): two charged spheres, one fixed, one on a torsion wire. Rotate the head until the wire is untwisted; measure the angle. Halve the distance; measure new angle (proportional to force). Show that quadrupling distance reduces force by a factor of 16. This demonstrates the inverse-square law quantitatively.

**D3 — Superposition with three charges (calculation)**
Three charges in a line: +2 μC at x = 0, −3 μC at x = 0.3 m, +1 μC at x = 0.5 m. Ask: find the total force on the −3 μC charge. Students must compute two Coulomb forces (one from each of the other charges), determine directions, and add as vectors (1D: signed forces). This builds the superposition procedure.

---

## Discovery lesson

**Argue for direct instruction** (the 1/r² dependence is not guessable from everyday experience and requires either the historical torsion-balance measurement or a simulation):

Present Coulomb's historical measurement (torsion balance, 1785) as the motivation: "How does electrostatic force depend on distance? Coulomb measured it systematically and found F ∝ 1/r². Then he varied the charges and found F ∝ q₁q₂." Introduce the formula as a distillation of these measurements.

After the formula, the discovery-style task is applying it to ratio questions (M1) without a calculator — "if r triples, F changes by...?" This builds the ratio intuition without being purely discovery.

---

## Teaching actions

**TA1 — Inverse-square ratio before formula**: For any "r changes by factor n" question, require the three-step ratio method (factor n → square → reciprocal) BEFORE substituting numbers. This prevents M1 permanently.

**TA2 — Sign protocol before direction**: For every Coulomb problem, require: (1) identify q₁ and q₂ with signs; (2) compute product q₁q₂; (3) positive product → repulsive; negative product → attractive. State the direction in words before stating the magnitude in newtons.

**TA3 — Newton's third law check**: After every Coulomb force calculation, ask: "What is the force on the OTHER charge?" Answer: same magnitude, opposite direction. This addresses M2 and reinforces Newton's third law.

**TA4 — Point-charge validity check**: Before any Coulomb calculation with extended objects, ask: "Are these small compared to their separation? If yes, treat as point charges. If no, Coulomb's law is approximate."

---

## Voice teaching

> "Coulomb's law: F = kq₁q₂/r². The key word is 'inverse-square.' When the distance doubles, r² quadruples, and F drops to one-quarter — not one-half. When the distance triples, F drops to one-ninth. Always square the distance ratio first, then flip it. That's the whole trick for ratio questions."

> "The sign of q₁q₂ tells you everything about direction. Positive product — both charges the same sign — means repulsive. Negative product — opposite signs — means attractive. Don't try to reason out the direction separately; just look at the product. Negative → attraction. Positive → repulsion."

> "Newton's third law applies here perfectly. A 10 C charge and a 0.001 C charge separated by 1 m — what force does each feel? Same force, same magnitude, opposite direction. The tiny charge pushes back on the large charge with exactly the same force the large charge pushes on it. Symmetry is exact."

---

## Assessment

**Mastery gate**: The learner can (1) calculate the force between two point charges using F = kq₁q₂/r², (2) determine direction from charge signs without error, (3) correctly apply the inverse-square scaling for ratio questions, and (4) add two Coulomb forces as vectors in 1D.

**Formative golden probe**
> "A charge q₁ = +4 μC and q₂ = −6 μC are 0.3 m apart. (a) Calculate the force magnitude. (b) Is the force attractive or repulsive? (c) The charges are moved to 0.9 m apart. Without recalculating, what is the new force? (d) A third charge q₃ = +2 μC is placed at the midpoint (0.15 m from each). What is the magnitude and direction of the net force on q₃?"

- (a): F = 8.99×10⁹ × 4×10⁻⁶ × 6×10⁻⁶ / (0.3)² ≈ 2.4 N
- (b): opposite signs → attractive
- (c): r triples → r² × 9 → F = 2.4/9 ≈ 0.27 N — targets M1
- (d): superposition — both forces on q₃ are attractive (toward q₁ and toward q₂), in opposite directions; calculate each and find net

**Confidence calibration question**
After (c): "How confident are you that the force decreased by a factor of 9, not 3?" (1–5). Low confidence with correct answer → inverse-square rule is procedural, not internalised.

**Delayed retrieval check (48 h / 7 days)**
"Two protons (charge +1.6 × 10⁻¹⁹ C each) are 1 × 10⁻¹⁵ m apart (nuclear scale). Calculate the electrostatic repulsion force. Does this help explain why strong nuclear forces must exist?" (Connects Coulomb's law to nuclear physics context.)

---

## Recovery notes

**Failure mode A — Inverse-square error persists (M1)**
Run the three-step ratio method as a standalone drill: "r changes by factor 3 → r² changes by factor ___? → F changes by factor ___?" Do this for factors of 2, 3, 4, 5 with only mental arithmetic, no formula. Repeat until automatic. Only then return to formula-based problems.

**Failure mode B — Direction errors persist**
Remove all mention of "attractive" and "repulsive" from the approach. Replace with: "Compute q₁q₂. Positive → push apart (repel). Negative → pull together (attract)." Practice sign computation with five pairs of charges before returning to any force magnitude calculation.

**Failure mode C — Newton's third law violation (M2)**
Draw the force diagram: q₁ on the left, q₂ on the right. Draw the force arrow on q₁ (pointing left if repulsive, right if attractive from q₂'s perspective... wait — from q₂ pushing q₁ away, the arrow on q₁ points left). Draw the force arrow on q₂ (equal length, opposite direction). Ask: "Are these arrows the same length?" They must be, by Newton's third law. If learner drew unequal lengths, ask why and discuss.

---

## Memory & review

**Memory type**: Formula (F = kq₁q₂/r²) + constant (k = 8.99 × 10⁹ N·m²/C²) + rule (inverse-square ratio, sign determines direction) + superposition procedure.

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State Coulomb's law in words and as a formula."
- "Two like charges 1 m apart experience force F. They are moved to 3 m apart. What is the new force?"
- "A positive and a negative charge are separated by 0.5 m. What is the direction of force on each?"
- "What is the value of Coulomb's constant k?"

**Interleaving**: After mastery, mix Coulomb's law with gravitational force problems (same mathematical form, different constants and sign rules) — the learner must identify which law applies from context.

---

## Transfer map

**Immediate transfers**:
- `phys.em.electric-field`: the electric field is defined as E = F/q₀ = kq/r² for a point charge — Coulomb's law per unit test charge
- `phys.mod.bohr-model`: the Coulomb attraction between the electron and proton provides the centripetal force for circular orbits in the Bohr model

**Downstream transfers**:
- `phys.em.electric-potential`: potential energy U = kq₁q₂/r follows directly from Coulomb's law by integration
- `phys.em.gauss-law`: Gauss's law for electricity generalises Coulomb's law to arbitrary charge distributions using flux

**Cross-subject transfers**:
- `chem` — ionisation energy, lattice energy, electronegativity scales — all derive quantitatively from Coulomb-like potentials
- `phys.mod.nuclear-physics`: the proton-proton Coulomb repulsion at nuclear scales (~10⁻¹⁵ m) gives repulsive forces of ~10³ N — motivating the strong nuclear force

---

## Curriculum feedback

The KG correctly identifies the inverse-square law and the proportionality to charge product. The two unlocks (electric-field, bohr-model) are appropriate.

One gap: the superposition principle is not mentioned in the KG description. For any system with more than two charges, superposition is required for every force calculation — it is not a special case but a fundamental property of the electrostatic force (linearity of Maxwell's equations). It should be listed as a learning outcome for this concept.

A second gap: the KG description does not mention that Coulomb's law applies exactly only to point charges or to situations where objects can be treated as point charges (separation >> object size). This scope limitation should be part of the description to prevent the M4 error.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
