# Teaching Blueprint: Spacetime Interval and Four-Vectors
**ID:** phys.rel.spacetime
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.rel.spacetime |
| Name | Spacetime Interval and Four-Vectors |
| Domain | Relativity |
| Difficulty | Expert |
| Bloom Level | Analyze |
| Estimated Hours | 10 |
| Prerequisites | phys.rel.mass-energy |
| Unlocks | phys.astro.black-holes, phys.astro.cosmology |

---

## Section 1 — Concept Spine

**Core Claim:** Space and time are not separate — they form a unified four-dimensional spacetime; the spacetime interval s² = c²t² − x² − y² − z² is invariant under Lorentz transformations (all inertial observers agree on it), and physical laws are most elegantly expressed as four-vectors A^μ = (A⁰, A¹, A², A³) whose inner product A_μA^μ is Lorentz invariant.

**Why It Matters:** The four-vector framework is the language of all relativistic physics — relativistic mechanics, electrodynamics (four-potential, four-current), and general relativity all use this structure. The invariant interval replaces separate space and time distances with a geometric truth that every observer agrees upon, revealing the deep structure of spacetime.

**Threshold Concept:** Spacetime is a 4D geometric object, not space + a clock. Events are points in spacetime; the "distance" between events is the invariant interval s². Different observers disagree on Δt and Δx separately but always agree on Δs² = c²Δt² − Δx² − Δy² − Δz².

**Prerequisite Knowledge Check:**
- Lorentz transformations (phys.rel.lorentz-transform)
- Mass-energy equivalence, relativistic energy-momentum (phys.rel.mass-energy)
- Four-momentum: p^μ = (E/c, p_x, p_y, p_z)

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** Two events (a lightning strike and a thunder clap). Observer A on a train measures them as separated by Δt_A and Δx_A. Observer B on the ground measures Δt_B and Δx_B — different values. Yet c²Δt_A² − Δx_A² = c²Δt_B² − Δx_B². The combination is the same for both — a shared geometric truth.

**Representational:**
- Spacetime diagram (Minkowski): time axis vertical, space horizontal; events as points; worldlines as curves
- Light cone: the set of all events connected to the origin by light signals; future cone (ct > 0) and past cone (ct < 0)
- Timelike, lightlike, spacelike intervals:
  - s² > 0 (using + − − − convention): timelike — a massive particle can connect both events
  - s² = 0: lightlike — only light connects them
  - s² < 0: spacelike — no signal can connect them; causal order can differ between observers

**Abstract:**
- Metric tensor (flat spacetime / Minkowski): η^μν = diag(+1, −1, −1, −1) (using +−−− convention)
- Invariant interval: ds² = η_μν dx^μ dx^ν = c²dt² − dx² − dy² − dz²
- Four-vector: A^μ = (A⁰, A⃗); covariant form A_μ = η_μν A^ν = (A⁰, −A⃗)
- Lorentz invariant inner product: A_μB^μ = A⁰B⁰ − A⃗·B⃗ = invariant
- Four-velocity: U^μ = γ(c, v⃗); U_μU^μ = c²
- Four-momentum: p^μ = mU^μ = (E/c, p⃗); p_μp^μ = (mc)² → E² = (pc)² + (mc²)²
- Four-gradient: ∂^μ = (∂/c∂t, −∇)
- Proper time: dτ = ds/c = dt/γ (elapsed time on the moving object's own clock)

**Transfer:** Electrodynamics: four-current J^μ = (cρ, J⃗); four-potential A^μ = (φ/c, A⃗); continuity equation ∂_μJ^μ = 0 (charge conservation). GR: flat η_μν replaced by curved g_μν(x) — spacetime curvature is gravity.

---

## Section 3 — Why Beginners Fail

1. **Sign convention anxiety:** Different textbooks use (+−−−) or (−+++). Learners either guess or copy signs without understanding which convention is in use, leading to sign errors throughout.
2. **Conflating proper time with coordinate time:** Proper time τ is the time on the moving object's own clock; it is invariant. Coordinate time t is frame-dependent. Learners often confuse dτ = dt/γ with time dilation (they are the same equation, but conceptually distinct: τ is intrinsic, t is extrinsic).
3. **Four-vectors seem like arbitrary 4-tuples:** Learners add ct to (x,y,z) without understanding *why*: the combination must transform as a four-vector under Lorentz transformations. The key insight — that the Lorentz transformation mixes time and space — is what makes ct the right fourth component.
4. **Interval sign interpretation:** Timelike (s²>0) and spacelike (s²<0) intervals confuse learners in the (+−−−) convention. They expect "positive = real = physical" and interpret spacelike as unphysical.

---

## Section 4 — Misconception Library

### MC-1: Different observers measure different spacetime intervals
- **Probe:** "If observer A measures s² = 9 m², what does observer B measure for the same two events?"
- **Characteristic phrase:** "B measures a different interval since they're moving differently."
- **Trigger:** Over-generalizing that "everything is relative" in relativity.
- **Conflict evidence [P28]:** Lorentz transformation: x' = γ(x−vt), t' = γ(t−vx/c²). Direct computation: c²t'² − x'² = γ²(ct−βx)² − γ²(x−βct)² = γ²(1−β²)(c²t²−x²) = c²t²−x² (since γ²(1−β²)=1). QED: invariance is exact.
- **Bridge [P30]:** The interval combines space and time in precisely the way that cancels the mixing from Lorentz boosts. That's why s² (not Δx alone or Δt alone) is the geometrically meaningful quantity.
- **Replacement [P31]:** The spacetime interval s² is Lorentz invariant — every inertial observer computes the same value. What IS observer-dependent: Δx, Δt, and whether two events are simultaneous.
- **Discrimination pairs [P33]:** Δx: frame-dependent (length contraction). Δt: frame-dependent (time dilation). s²: frame-independent. |A⃗|²: frame-dependent. A_μA^μ: frame-independent.
- **S6 repair path:** Have learner apply Lorentz transformation to specific numerical example and recompute s² in the new frame.

### MC-2: Spacelike intervals are unphysical
- **Probe:** "What does it mean for two events to have spacelike separation?"
- **Characteristic phrase:** "Spacelike is imaginary — it doesn't correspond to anything real."
- **Trigger:** In (+−−−) convention, spacelike gives s² < 0 which seems unphysical.
- **Conflict evidence [P28]:** The event "you read this word" and "a star exploded in Andromeda 3 seconds ago" have spacelike separation — they're both real events. Spacelike means no causal connection, not nonexistence. There exists a frame where they're simultaneous.
- **Bridge [P30]:** Spacelike means |Δx| > c|Δt| — the spatial separation exceeds what light could bridge. Physically: no signal could have passed between them; they cannot be causally related.
- **Replacement [P31]:** Spacelike: s² < 0 (in +−−−). Real, physical events — just causally disconnected. There exists a frame where they are simultaneous (Δt' = 0), and the proper spatial distance √(−s²) is the minimum spatial separation any frame assigns them.
- **Discrimination pairs [P33]:** Timelike s² > 0: a cause can precede its effect (all frames agree on the causal order). Lightlike s² = 0: only light can connect them. Spacelike s² < 0: causal order can differ between frames (different observers disagree on which happened first).
- **S6 repair path:** Draw the Minkowski diagram; classify several event pairs by interval type; find the frame where spacelike pair is simultaneous.

### MC-3: Four-momentum inner product is p⃗·p⃗ = |p⃗|²
- **Probe:** "What is p_μp^μ for a particle with 3-momentum p⃗ and energy E?"
- **Characteristic phrase:** "p·p = |p|² = p_x² + p_y² + p_z²."
- **Trigger:** Transferring 3D dot product to four-vectors.
- **Conflict evidence [P28]:** Four-momentum: p^μ = (E/c, p⃗). Inner product: p_μp^μ = (E/c)² − |p⃗|² = (mc)². If the learner uses 3D dot product they get |p⃗|² ≠ (mc)².
- **Bridge [P30]:** The Minkowski metric has a relative sign: (+−−−). The time component enters with +, space with −. This is what makes the combination Lorentz-invariant.
- **Replacement [P31]:** p_μp^μ = (E/c)² − p_x² − p_y² − p_z² = (mc)². For a photon (m=0): E = pc. For a particle at rest (p⃗=0): E = mc². Both follow from the same invariant.
- **Discrimination pairs [P33]:** 3D: p⃗·p⃗ = |p|² — positive definite. 4D Minkowski: p_μp^μ = (E/c)²−|p|² = (mc)² — indefinite, can be zero (photon) or positive (massive particle).
- **S6 repair path:** Compute p_μp^μ for an electron at rest and in motion; verify both give (m_e c)².

### MC-4: Proper time is observer-dependent
- **Probe:** "Does the astronaut's wristwatch (proper time) depend on who observes it?"
- **Characteristic phrase:** "The proper time depends on the frame."
- **Trigger:** General confusion that "everything is relative" extends to proper time.
- **Conflict evidence [P28]:** τ = ∫dτ = ∫ds/c along the worldline — a geometric property of the path, independent of who measures it. When the astronaut returns from a trip and both observers compare clocks side-by-side, they must agree on what the wristwatch reads. This is one reading, one number — it cannot depend on the observer.
- **Bridge [P30]:** Proper time is like the arc length of a curve: different coordinate systems describe the curve differently, but the total arc length is a geometric invariant.
- **Replacement [P31]:** Proper time τ is the time elapsed on the object's own clock, invariant (all observers agree). Coordinate time t is the time in a specific inertial frame, frame-dependent. Relation: dτ = dt/γ.
- **Discrimination pairs [P33]:** τ: one value, all agree. t: different values in different frames. Twin paradox resolution: the twin who accelerated has shorter τ — all frames agree the traveling twin is younger.
- **S6 repair path:** Use twin paradox: compute total τ for the traveling twin using dτ = dt√(1−v²/c²) integrated along their worldline.

---

## Section 5 — Explanation Library

### Explanation A — Spacetime as Geometry
Just as 2D distance r² = x² + y² is invariant under rotations (rotating axes doesn't change the distance between two points), spacetime interval s² = c²t² − x² is invariant under Lorentz "rotations" (boosts). The difference is the minus sign — Minkowski spacetime has a hyperbolic geometry, not Euclidean. Events in spacetime are like points in a geometric space; the interval is the "distance" between them in this geometry. Different inertial frames correspond to different orientations of the axes in spacetime, but the "distance" (interval) between any two events is the same regardless of orientation.

### Explanation B — Four-Vectors and Covariance
A four-vector A^μ is a set of four quantities that transforms under Lorentz boosts the same way the spacetime coordinates (ct, x, y, z) do. Because the transformation preserves the combination A_μA^μ = (A⁰)² − |A⃗|², this quantity is Lorentz invariant — all observers agree on it. The strategy of writing physics as four-vector equations (like F^μ = dp^μ/dτ for relativistic Newton's second law) guarantees the equation looks the same in every inertial frame — Lorentz covariance is automatic. This is more than a convenient notation: it encodes the principle that physical laws don't depend on who's watching.

### Explanation C — Physical Applications of Four-Vectors
Four-momentum: p^μ = (E/c, p⃗). Invariant: p_μp^μ = (mc)². For a photon: p_μp^μ = 0 → E = |p⃗|c. For decay A → B + C: four-momentum conservation p_A^μ = p_B^μ + p_C^μ in all frames simultaneously — use this to find threshold energies, invariant mass of resonances, and kinematics without ever specifying a frame. Doppler effect: four-velocity of source times four-wavevector of light → relativistic Doppler formula ν' = ν√((1+β)/(1−β)) in one step. Four-current in electrodynamics: J^μ = (cρ, J⃗); continuity equation ∂_μJ^μ = 0 is charge conservation in covariant form — one equation, automatically valid in every frame.

---

## Section 6 — Analogy Library

**Primary Analogy:** 3D spatial rotations → Lorentz boosts. Rotating axes changes (x,y) coordinates of a point but not x²+y². Boosting frames changes (ct,x) but not c²t²−x². The "minus sign" in the spacetime metric is what makes Lorentz boosts look like hyperbolic rotations rather than circular ones.

**Breaking Point:** In 3D rotations, the metric is δ_ij = diag(+1,+1,+1) — positive definite. Minkowski metric η_μν = diag(+1,−1,−1,−1) — indefinite. This means the "distance" s² can be positive, negative, or zero (null/lightlike) — something impossible in Euclidean geometry. The light cone has no Euclidean analog.

**Anti-Analogy:** Galilean relativity: space and time are separate, t is absolute, Δt and Δx are individually invariant. Minkowski spacetime shows these are frame-dependent — only s² is invariant. Galilean relativity is the c→∞ limit.

---

## Section 7 — Demonstration Library

**Demo 1 — Interval Invariance Calculation**
Two events: (t₁=0, x₁=0) and (t₂=3s, x₂=5×3×10⁸ m = 5c·s). Compute s² = c²(3)² − (5c)² = 9c²−25c² = −16c² (spacelike). Apply Lorentz boost at v=0.6c (γ=5/4): t₂'=γ(t₂−vx₂/c²)=5/4·(3−0.6·5)=5/4·0=0 s, x₂'=γ(x₂−vt₂)=5/4·(5c−0.6c·3)=5/4·3.2c=4c. s²' = −(4c)²−0 = −16c² ✓ Invariant confirmed.

**Demo 2 — Minkowski Diagram**
Draw ct vs. x axes. Mark light cone: lines ct = ±x. Plot several events; classify as timelike, lightlike, or spacelike relative to the origin. Draw a boosted frame (tilted t' and x' axes — they tilt toward the light cone for a boost). Show how the interval type (timelike/spacelike) is visible from which region of the diagram the event falls in — no calculation needed.

**Demo 3 — Four-Momentum Conservation in Particle Physics**
Proton-antiproton annihilation: pp̄ → π⁺π⁻π⁰. Use four-momentum conservation to find the minimum kinetic energy needed. p_p^μ + p_p̄^μ = Σp_π^μ. Evaluate in the center-of-mass frame using p_μp^μ = (mc)² for each particle. Shows four-vector method is far more efficient than component-by-component computation.

---

## Section 8 — Discovery Lesson

**Setup:** Give learners the Lorentz transformation formulas: ct' = γ(ct−βx), x' = γ(x−βct).

**Task 1:** Compute c²t'² − x'² starting from c²t'² − x'² = γ²(ct−βx)² − γ²(x−βct)². Expand and simplify.

**Expected finding:** After expansion: γ²(1−β²)(c²t²−x²) = c²t²−x². The interval is the same in both frames.

**Task 2:** "Is Δx alone invariant? Is Δt alone invariant? What combination is?"

**Task 3:** "Consider three pairs of events: (a) 1 s apart, 0.5 light-second apart; (b) 1 s apart, 1 light-second apart; (c) 1 s apart, 2 light-seconds apart. Classify each as timelike, lightlike, or spacelike."

**Resolution:** The discovery is that s² is a geometric invariant — learners derived it themselves. Connect to the concept of "proper distance" and "proper time" as the geometric meaning of |s|.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Derive interval invariance algebraically from Lorentz transformation | Learner doubts invariance |
| 2 | Draw Minkowski diagram classifying events into timelike/spacelike/lightlike | Learner confuses interval sign with physicality |
| 3 | Compute p_μp^μ for a photon and a massive particle | Learner applies 3D dot product to four-vectors |

---

## Section 10 — Voice Teaching

**Opening hook:** "Galileo said space is relative — different observers measure different positions. Einstein added: time is relative too. But there's something neither can touch: the spacetime interval. It's what the universe actually measures, and every observer agrees on it."

**Pacing:** Establish interval invariance numerically (Demo 1) before the formalism. Learners need to see the specific numbers agree before they'll believe the abstract statement.

**Common impasse language:** "Confused by the minus sign in the metric? That minus sign is what separates relativity from ordinary 3D geometry. Without it, boosts would be rotations in Euclidean space — nothing would change. The minus sign creates the light cone, causal structure, and everything special about relativity."

**Closing consolidation:** "Four-vectors are the language of relativistic physics: one equation in four-vector form is automatically valid in every frame. That's why physicists write p^μ, J^μ, A^μ — not to be fancy, but because the covariant form guarantees the physics doesn't change when you change frames."

---

## Section 11 — Assessment

**Mastery gate:** Compute spacetime interval; classify events; evaluate four-vector inner products; explain invariance of proper time.

**FA-1:** "Two events are separated by Δt = 4 ns and Δx = 2 m. Is the interval timelike or spacelike? What is s²?"
*Expected:* c·Δt = (3×10⁸)(4×10⁻⁹) = 1.2 m. s² = (1.2)² − (2)² = 1.44 − 4 = −2.56 m². Spacelike (s² < 0 in +−−− convention).
*Threshold:* Correct sign convention applied; correct classification.

**FA-2:** "An unstable particle has rest mass m = 1 GeV/c². It's observed with total energy E = 3 GeV. What is |p⃗|?"
*Expected:* p_μp^μ = (mc)² → (E/c)² − |p|² = (mc)² → |p|² = (E/c)² − (mc)² = 9−1 = 8 (GeV/c)² → |p| = 2√2 GeV/c.
*Threshold:* Correct use of energy-momentum invariant.

**FA-3:** "What is the proper time elapsed on a clock moving at v = 0.8c for 10 s (coordinate time)?"
*Expected:* γ = 1/√(1−0.64) = 1/0.6 = 5/3. dτ = dt/γ → τ = t/γ = 10/(5/3) = 6 s.
*Threshold:* Correct dτ = dt/γ applied; recognizes τ < t.

**FA-4:** "Two events are spacelike separated. Can their causal order (which happened first) differ between inertial frames? Why?"
*Expected:* Yes — for spacelike separation, there exists a frame where they are simultaneous and other frames where either event is first. This is allowed because no causal signal can connect them (they're outside each other's light cones). If they were timelike, the causal order would be frame-independent.
*Threshold:* Correctly states yes with light-cone reasoning; distinguishes from timelike case.

**Confidence calibration:** After FA-1, ask: "Could you find a frame where these two events are simultaneous?" (For spacelike: yes, find v such that Δt' = 0.) This probes deeper geometric understanding beyond interval computation.

**Delayed retrieval:** Return at day 7: "Write the four-momentum of a photon moving in the x-direction with energy E. Verify p_μp^μ = 0."

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Learner is shaky on Lorentz transformations. Return to phys.rel.lorentz-transform before interval invariance.

**S3 — Partial understanding:** Can compute s² but cannot classify intervals or explain proper time. Intervention: systematic Minkowski diagram exercise — draw 10 event pairs, classify each, find the frame where spacelike pairs are simultaneous.

**S6 — Misconception detected:** MC-3 (3D dot product for four-vectors). Intervention: explicit index-lowering with η_μν: p_μ = η_μν p^ν → p_0 = p⁰, p_i = −p^i. Then p_μp^μ = p⁰p⁰ − p^i p^i.

**S9 — Near mastery:** Understands flat spacetime but can't see the connection to GR. Intervention: explain that g_μν(x) (curved) replaces η_μν (flat); geodesics in curved spacetime describe gravitational trajectories — same four-vector language, more general metric.

---

## Section 13 — Memory & Review

**Memory type:** Structural (Minkowski diagram intuition) + procedural (interval computation, four-vector inner products).

**Spaced retrieval schedule:** Day 1 (compute interval, classify events), Day 3 (four-momentum inner product, particle physics kinematics), Day 7 (derive proper time, twin paradox), Day 21 (four-current continuity equation, connection to electrodynamics).

**Interleaving partners:** phys.rel.lorentz-transform (Lorentz boost is the transformation that preserves s²), phys.rel.mass-energy (E²=(pc)²+(mc²)² is p_μp^μ=(mc)² in disguise), phys.astro.black-holes (general relativity extends flat η_μν to curved g_μν).

---

## Section 14 — Transfer Map

**Near transfer:** Relativistic kinematics: threshold energy for particle creation; invariant mass of a resonance peak; four-momentum conservation in decays and collisions.

**Far transfer:** Electrodynamics: Maxwell's equations in covariant form (F^μν = ∂^μA^ν − ∂^νA^μ; ∂_νF^μν = J^μ/ε₀c) — four equations become two. General relativity: replace η_μν → g_μν(x); Einstein field equation G_μν = 8πG/c⁴ T_μν — the geometry of curved spacetime is gravity.

**Structural abstraction:** The Minkowski metric η_μν and the four-vector framework are the mathematical foundation for all of modern relativistic physics. The principle — write equations in covariant form so they're automatically valid in every frame — extends beyond relativity to gauge theories (QED, QCD, electroweak unification). Mastering four-vectors is mastering the grammar of modern theoretical physics.

---

## Section 15 — Curriculum Feedback

**Dependency check:** phys.rel.mass-energy provides E²=(pc)²+(mc²)² — learners should see this as p_μp^μ=(mc)² in the four-vector language. The connection makes the blueprint self-reinforcing.

**Common pacing error:** Introducing four-vectors algebraically before deriving interval invariance. The invariance proof should come first — it motivates why the four-vector structure is natural.

**Assessment gap:** Most curricula test interval computation but rarely test interval classification (timelike/spacelike), proper time derivation, or four-vector inner products in particle physics context.

**Suggested pairing:** Pair with phys.astro.black-holes for a follow-up session where the flat metric η_μν is replaced by the Schwarzschild metric — the natural next step in the four-vector language.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
