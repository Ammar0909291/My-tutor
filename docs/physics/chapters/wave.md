# Waves & Oscillations

*My Tutor — Physics Knowledge Graph domain `phys.wave`*

Concepts in this chapter: 17

This chapter is generated from the canonical Knowledge Graph (`graph.json`, frozen, read-only) plus authored teaching content validated against the existing `TeachingAssetSchema`. It is intended for students, teachers, and as a canonical AI teaching source.

## Concepts in this chapter

- [Simple Harmonic Motion](#simple-harmonic-motion)
- [Energy in Simple Harmonic Motion](#energy-in-simple-harmonic-motion)
- [Simple Pendulum](#simple-pendulum)
- [Spring-Mass System](#spring-mass-system)
- [Damped Oscillations](#damped-oscillations)
- [Forced Oscillations and Resonance](#forced-oscillations-and-resonance)
- [Wave Properties: Amplitude, Period, Frequency](#wave-properties-amplitude-period-frequency)
- [Transverse Waves](#transverse-waves)
- [Longitudinal Waves](#longitudinal-waves)
- [Wave Speed and the Wave Equation](#wave-speed-and-the-wave-equation)
- [Superposition Principle](#superposition-principle)
- [Wave Interference](#wave-interference)
- [Standing Waves](#standing-waves)
- [Sound Waves](#sound-waves)
- [Sound Intensity and the Decibel Scale](#sound-intensity-and-the-decibel-scale)
- [Doppler Effect](#doppler-effect)
- [Beats and Beat Frequency](#beats-and-beat-frequency)

---

### Simple Harmonic Motion

*Concept ID: `phys.wave.shm` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Students will be able to define simple harmonic motion by its restoring-force condition F = −kx, write and interpret the sinusoidal solutions x(t) = A cos(ωt + φ), relate angular frequency to period and frequency (ω = 2π/T = 2πf), extract amplitude, phase, velocity, and acceleration from the motion equations, and explain why SHM's period is independent of amplitude.

Simple harmonic motion is periodic oscillation in which the restoring force is proportional to and directed opposite the displacement.

Simple harmonic motion is what happens when a restoring force proportional to displacement — F = −kx, Hooke's law wearing dynamics — acts alone: substituting into Newton's second law gives a = −(k/m)x = −ω²x, whose solution is the sinusoid x(t) = A cos(ωt + φ). Every symbol earns its keep: A is the amplitude (maximum excursion, set by how the motion was started), ω = √(k/m) the angular frequency (set by the system, not the start), φ the phase constant (where in the cycle it began), and the period T = 2π/ω follows as 2π√(m/k). Velocity and acceleration are the derivatives in spirit: v(t) = −Aω sin(ωt + φ) peaks at Aω through the centre where x = 0, while a(t) = −Aω²x/A... more plainly a = −ω²x is largest at the extremes where the object is momentarily at rest — the drumbeat of SHM is speed at the middle, force at the edges. The signature property is isochronism: because both the restoring force and the distance to travel scale with amplitude, the period does not — big and small swings take the same time, the fact that made pendulum clocks conceivable. SHM's reach is enormous because near any stable equilibrium the force is approximately linear in displacement, so bridges, molecules, quartz crystals, and circuit charges all oscillate harmonically for small excursions — and its circular shadow (uniform circular motion projected onto a diameter IS SHM) supplies both intuition and the ω notation.

**Key ideas**

- Defining condition: restoring force proportional to displacement, F = −kx ⇒ a = −ω²x with ω² = k/m — acceleration always aimed at equilibrium, largest at the extremes.
- Solution: x(t) = A cos(ωt + φ) — amplitude A and phase φ from initial conditions; ω from the system alone.
- Frequency dictionary: ω = 2πf = 2π/T; T = 2π√(m/k) — stiffer springs quicken, larger masses slow.
- Kinematic profile: v = ±ω√(A² − x²), maximal (Aω) at the centre; a = −ω²x, maximal (Aω²) at the turning points where v = 0.
- Isochronism: period independent of amplitude — the linear force law's signature, and the clockmaker's foundation.
- Circular-motion shadow: SHM is the projection of uniform circular motion onto a diameter — the reference-circle picture that explains ω and the sinusoid at a glance.
- Universality: near any stable equilibrium the potential is approximately parabolic, so small oscillations of almost anything are SHM — the most reused model in physics.

**Vocabulary**

- **simple harmonic motion (SHM)** — Oscillation under a restoring force proportional to displacement (F = −kx), producing sinusoidal motion with amplitude-independent period.
- **amplitude A** — The maximum displacement from equilibrium — set by initial conditions, absent from the period.
- **angular frequency ω** — The cycle-phase rate in rad/s: ω = √(k/m) = 2πf = 2π/T.
- **phase constant φ** — The cycle position at t = 0, fixed by how the motion was started.
- **isochronism** — The amplitude-independence of SHM's period — the linear force law's signature.
- **restoring force** — A force always directed toward equilibrium; linear-in-displacement restoring force defines SHM.

**Common misconceptions**

- *Misconception:* A larger amplitude means a longer period — bigger swings take more time.
  *Correction:* In SHM the period is amplitude-independent: doubling A doubles both the distance and (via F = −kx) the typical force and speed, and the effects cancel exactly. Big and small oscillations tick at the same rate — isochronism.
- *Misconception:* At the extremes of the motion, everything is zero because the object stops.
  *Correction:* Velocity is zero there, but acceleration and force are at their MAXIMUM — the spring is most stretched and pulls hardest exactly where the object pauses. Conversely at the centre velocity peaks while force and acceleration vanish.
- *Misconception:* The angular frequency ω means the object moves in a circle.
  *Correction:* ω is borrowed notation: SHM is straight-line motion whose mathematics matches the projection of a reference point moving on a circle. Nothing physical rotates; ω just counts radians of cycle phase per second (2π per full oscillation).
- *Misconception:* Any back-and-forth motion is simple harmonic.
  *Correction:* SHM requires F ∝ −x specifically. A ball bouncing between walls oscillates but with constant-magnitude forces; large-angle pendulums deviate; only the linear restoring law gives sinusoids and amplitude-free periods.

**Common mistakes in practice**

- Letting amplitude into ω or T.
- Placing maximum acceleration at the centre or maximum speed at the extremes.
- Confusing ω (rad/s) with f (Hz) — a factor of 2π.
- Dropping or mis-setting the phase constant for motions not starting at an extreme.
- Applying SHM formulas to oscillations whose force law is not linear.

**Visual teaching opportunities**

- The reference-circle animation: a point moving uniformly on a circle beside its shadow oscillating on a diameter, x(t) = A cos ωt traced live by the shadow.
- A triple-graph stack of x(t), v(t), a(t) sinusoids with phase relationships highlighted: v a quarter-cycle ahead of x, a exactly opposite to x.
- A force-arrow strip of the oscillator at five positions: arrows always pointing home, longest at the extremes, vanishing at the centre.
- An isochronism race: two identical spring-mass systems released from different amplitudes, metronome-synchronized returns filmed side by side.
- A 'parabola-hugging' potential diagram: an arbitrary potential well with its parabolic approximation overlaid near the minimum — why everything small-oscillates harmonically.

**Worked example**

*Setup:* A 0.50 kg block on a spring with k = 200 N/m is pulled 0.10 m from equilibrium and released from rest. Find ω, T, the maximum speed and maximum acceleration, the speed at x = 0.06 m, and write x(t).

1. Angular frequency: ω = √(k/m) = √(200/0.50) = √400 = 20 rad/s.
2. Period: T = 2π/ω = 2π/20 ≈ 0.31 s — about three oscillations per second.
3. Released from rest at maximum excursion ⇒ A = 0.10 m and φ = 0 with the cosine form: x(t) = 0.10 cos(20t) m.
4. Maximum speed (at the centre): v_max = Aω = 0.10 × 20 = 2.0 m/s.
5. Maximum acceleration (at the extremes): a_max = Aω² = 0.10 × 400 = 40 m/s² — about 4g at the turnaround.
6. Speed at x = 0.06 m: v = ω√(A² − x²) = 20√(0.01 − 0.0036) = 20 × 0.08 = 1.6 m/s — the kinematic profile in action; note the amplitude never entered ω or T.

*Outcome:* The student computes ω = 20 rad/s, T ≈ 0.31 s, v_max = 2.0 m/s, a_max = 40 m/s², v(0.06) = 1.6 m/s, writes x(t) = 0.10 cos(20t), and can point to where in the cycle each maximum lives.

**Real-world intuition**

- Quartz watches count the SHM of a crystal resonating at 32,768 Hz — timekeeping by isochronism, miniaturized.
- Vehicle suspension tuning sets ω = √(k/m) so the ride oscillates near 1 Hz — the frequency bodies find comfortable.
- Seismometers read ground motion against a suspended oscillator's inertia; accelerometers in phones are micro spring-mass SHM systems.
- Molecular vibrations are quantum SHM: infrared spectroscopy identifies chemical bonds by their spring constants.
- AC circuits oscillate with charge obeying the same equation — the LC circuit is SHM with L as mass and 1/C as stiffness, a preview of electromagnetism.

**Practice progression**

Item types: ω, T, f computations from k and m (and inversions), equation-reading items (extract A, ω, φ, v_max from a given x(t)), position-velocity-acceleration profile problems (v at given x, where is a maximal?), conceptual items on isochronism and the SHM-defining condition. Suggested item count: 12.

Begin with system-parameter computations, add equation reading and writing with initial conditions, then profile questions across the cycle, ending with is-it-SHM classification and isochronism reasoning.

**Assessment objectives**

Formats: structured computation set, equation-interpretation tasks, conceptual classification quiz. Bloom alignment: Apply — students must set up and read the SHM equations in unfamiliar configurations and locate kinematic extremes across the cycle; this concept carries the domain's highest mastery threshold (0.85) as its foundation.

Mastery signal: The student computes ω, T, v_max, a_max from system parameters, writes x(t) from initial conditions, and answers extreme-location and isochronism items, at 85% accuracy or better.

**Teacher notes**

This is the domain's keystone — everything from pendulums to standing waves reuses its vocabulary, so over-invest here. The reference circle is the single most powerful teaching artifact: it makes ω, the sinusoid, and the phase constant all visible at once. Drill the kinematic profile as geography (speed lives at the centre, force at the edges) before formulas. Isochronism deserves a live race — two amplitudes, one metronome. The 'everything is SHM near equilibrium' point, made with the parabola-hugging diagram, is the concept's export licence; state it explicitly.

**Student notes**

Test for SHM first: is the force proportional to displacement and aimed home? Then everything follows from ω = √(k/m): T = 2π/ω, x = A cos(ωt + φ), v_max = Aω at the centre, a_max = Aω² at the edges, v = ω√(A² − x²) in between. Keep A and φ (start-dependent) mentally separate from ω and T (system-dependent) — and never let amplitude sneak into a period. When confused, draw the reference circle.

**Prerequisite graph**

- Requires: phys.mech.hookes-law, phys.mech.newtons-second-law
- Unlocks (future prerequisite links): phys.wave.pendulum, phys.wave.shm-energy, phys.wave.spring-mass
- Cross-topic connections (graph cross-links): none
- Narrative: SHM fuses Hooke's law (phys.mech.hookes-law) with Newton's second law (phys.mech.newtons-second-law) and inherits the reference-circle geometry of circular motion (phys.mech.circular-motion). Its energy story follows immediately (phys.wave.shm-energy), its realizations are the pendulum and spring-mass systems (phys.wave.pendulum, phys.wave.spring-mass), and its sinusoids become travelling waves (phys.wave.wave-properties) — the whole domain speaks this concept's language.

**Teaching hints — review triggers**

- phys.mech.hookes-law
- phys.mech.newtons-second-law

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one full parameter computation, one equation-reading item, one profile question, and a spoken isochronism explanation. Monthly, re-derive a = −ω²x from F = −kx and redraw the reference circle — the two-line derivation and one picture that regenerate the topic.

---

### Energy in Simple Harmonic Motion

*Concept ID: `phys.wave.shm-energy` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Students will be able to describe the continuous exchange between kinetic and elastic potential energy in SHM, show the total E = ½kA² is constant and amplitude-squared dependent, compute energies and speeds at any displacement, locate where each energy form peaks, and use energy methods to solve SHM problems without time equations.

In SHM the total mechanical energy remains constant while kinetic and potential energies interchange sinusoidally.

Simple harmonic motion is conservation of energy performing on a spring: the total mechanical energy E = ½kA², fixed at the moment of release, sloshes ceaselessly between elastic potential energy U = ½kx² (all of E at the turning points, where the spring is fully stretched and the mass momentarily still) and kinetic energy K = ½mv² (all of E at the equilibrium crossing, where the spring is relaxed and speed peaks at Aω). At any intermediate displacement the books balance exactly — K = ½k(A² − x²) — which yields the speed-anywhere formula v = ω√(A² − x²) without touching time, the energy method's characteristic shortcut. Two structural facts carry the physics: energy scales with amplitude SQUARED (doubling a swing quadruples its energy — the reason loud sounds and big earthquakes cost so disproportionately), and the exchange runs at twice the oscillation frequency (each full cycle visits two turning points and two centre crossings, so U and K each peak twice per period). Averaged over a cycle, the energy splits evenly — ⟨K⟩ = ⟨U⟩ = E/2 — a harbinger of equipartition. The parabolic energy-well diagram (U = ½kx² with the horizontal E-line at height ½kA², K the gap between them) is the concept's master picture: turning points where the line meets the parabola, maximum speed where the gap yawns widest, and — in the damped oscillations ahead — the E-line sliding slowly down the well.

**Key ideas**

- Total energy: E = ½kA² = ½mv_max² — constant in ideal SHM, set once by the release conditions.
- The exchange: U = ½kx² peaks at the turning points (x = ±A, v = 0); K = ½mv² peaks at equilibrium (x = 0, v = Aω); their sum never wavers.
- Energy anywhere: K = ½k(A² − x²) ⇒ v = ω√(A² − x²) — speeds from bookkeeping, no time equation needed.
- Amplitude-squared law: E ∝ A² — double the amplitude, quadruple the energy; the scaling behind loudness and destructive resonance.
- Double-frequency exchange: U and K each complete two full peaks per oscillation period — the energy movie runs at 2f.
- Cycle averages: ⟨K⟩ = ⟨U⟩ = E/2 — the even split that previews equipartition in statistical physics.
- Master picture: the parabolic well U(x) with the horizontal total-energy line — turning points at the intersections, K as the vertical gap; damping will later lower the line.

**Vocabulary**

- **total mechanical energy (SHM)** — E = ½kA² = ½mv_max² — the conserved sum of kinetic and elastic potential energy.
- **energy exchange** — The continuous K ↔ U conversion, each form peaking twice per oscillation period.
- **turning point (energy view)** — Where the total-energy line meets the potential parabola: U = E, K = 0, motion reverses.
- **amplitude-squared law** — E ∝ A²: doubling amplitude quadruples the oscillation's energy.

**Common misconceptions**

- *Misconception:* Kinetic and potential energy are each conserved in the oscillation.
  *Correction:* Only their SUM is conserved; K and U individually swing between zero and the full E twice per cycle. The oscillation IS the exchange — freeze either form and the motion stops.
- *Misconception:* Doubling the amplitude doubles the energy.
  *Correction:* E = ½kA² is quadratic: double A means four times the energy. The oscillator must be given four times the work to swing twice as far — and delivers four times the punch.
- *Misconception:* Energy exchange completes once per oscillation period.
  *Correction:* Each period contains two turning points and two equilibrium crossings, so U and K each peak twice per period — the energy cycle runs at twice the motion's frequency.
- *Misconception:* At the halfway displacement x = A/2, the energy is split half-and-half.
  *Correction:* U = ½k(A/2)² = E/4 there — only a quarter potential, three-quarters kinetic. Energy follows x², not x; the half-half split occurs at x = A/√2 ≈ 0.707A.

**Common mistakes in practice**

- Linear-scaling the energy with amplitude.
- Placing the 50/50 energy split at x = A/2.
- Conserving K or U individually.
- Using x in metres but A in centimetres inside one ledger.
- Forgetting that E can be read from either ½kA² or ½mv_max² — and failing the free cross-check.

**Visual teaching opportunities**

- The parabolic-well master diagram: U(x) = ½kx² with the E-line at ½kA², the K-gap shaded, turning points marked at the intersections.
- Twin bar-graphs of U and K pulsing beneath an oscillating mass animation, their sum-bar rigid — with a cycle counter showing two energy peaks per swing.
- An E-versus-A² plot from simulated or measured release experiments: a straight line through the origin, the quadratic law as data.
- The x = A/2 pie chart (25% U / 75% K) beside the x = A/√2 pie (50/50) — energy following the square, not the distance.

**Worked example**

*Setup:* A 0.50 kg block on a k = 200 N/m spring oscillates with amplitude 0.10 m (the SHM worked example's system). Find the total energy, the speed at x = 0.05 m, the displacement where the energy is half kinetic and half potential, and the new total energy if the amplitude is doubled.

1. Total energy: E = ½kA² = 0.5 × 200 × 0.01 = 1.0 J.
2. Cross-check via v_max: ½mv_max² = 0.5 × 0.50 × (2.0)² = 1.0 J ✓ — the two faces of E agree.
3. Speed at x = 0.05 m: K = E − ½kx² = 1.0 − 0.5 × 200 × 0.0025 = 0.75 J ⇒ v = √(2K/m) = √3 ≈ 1.7 m/s.
4. Half-half point: ½kx² = E/2 ⇒ x = A/√2 ≈ 0.071 m — NOT at A/2, where the split is 25/75.
5. Doubled amplitude: E' = ½k(2A)² = 4E = 4.0 J — quadratic scaling in one line.
6. Note the method: no time, no phase, no trigonometry — the energy ledger answered every question the kinematics would have reached more laboriously.

*Outcome:* The student computes E = 1.0 J two ways, v(0.05) ≈ 1.7 m/s by bookkeeping, locates the 50/50 point at A/√2, and quadruples E for doubled amplitude, crediting the time-free energy method.

**Real-world intuition**

- Vibration-isolation engineering sizes mounts by the energy an oscillation carries — E ∝ A² is why halving amplitude quarters transmitted energy.
- Earthquake magnitude scales encode energy's steep growth with ground-motion amplitude — small amplitude differences, vast energy differences.
- Loudspeaker and sonar power budgets follow amplitude-squared: doubling cone excursion quadruples acoustic output.
- Energy-harvesting devices (piezoelectric pavements, vibration harvesters) skim the K-U exchange of ambient oscillations.
- Clock escapements inject tiny energy packets each cycle to top up the E-line against friction — maintenance of the master diagram in brass.

**Practice progression**

Item types: total-energy and v_max computations (both faces of E), speed-at-displacement problems via the energy ledger, energy-split locators (where is U = K? where is K = 3U?), amplitude-scaling and graph-interpretation items. Suggested item count: 10.

Begin with E computations and cross-checks, add speed-anywhere problems, then split-locator algebra, ending with scaling arguments and well-diagram readings.

**Assessment objectives**

Formats: computation set on the energy ledger, well-diagram interpretation tasks, scaling-reasoning quiz. Bloom alignment: Apply — students must run the SHM energy ledger in both directions and exploit its time-free shortcuts on unfamiliar oscillators.

Mastery signal: The student computes E, speeds at given displacements, and energy-split locations correctly, including one quadratic-scaling item, at 80% accuracy or better.

**Teacher notes**

Teach from the parabolic-well diagram — it converts every question (turning points, max speed, splits, damping ahead) into geometry, and it is the picture students will reuse in quantum wells years later. The two quantitative surprises (quadratic scaling; 50/50 at A/√2 not A/2) should be posed as predictions before solving. The double-frequency exchange is worth one explicit animation moment. Bank the ⟨K⟩ = ⟨U⟩ fact verbally for statistical mechanics. Energy methods here also rehearse the time-free style used throughout mechanics — name the method as such.

**Student notes**

Write the ledger first: E = ½kA², then split it — U = ½kx² at your displacement, K is the remainder, and v follows from K. Expect squares everywhere: double amplitude means quadruple energy, and the half-half point sits at A/√2, not halfway. Peaks live where the other form dies: all potential at the edges, all kinetic at the centre, exchanging twice per cycle. When a problem asks for speed without time, the energy route is the short one.

**Prerequisite graph**

- Requires: phys.wave.shm
- Unlocks (future prerequisite links): phys.wave.damped-oscillations
- Cross-topic connections (graph cross-links): none
- Narrative: SHM energy applies the conservation machinery (phys.mech.conservation-of-energy) and spring energy ½kx² (phys.mech.potential-energy, phys.mech.hookes-law) to oscillation (phys.wave.shm). The E-line sliding down the well is damping's picture (phys.wave.damped-oscillations); amplitude-squared energy scaling reappears in wave intensity (phys.wave.sound-intensity); and the parabolic well returns in molecular and quantum oscillators (phys.qm).

**Teaching hints — review triggers**

- phys.wave.shm

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one full ledger computation, one split-locator, one scaling argument. Monthly, redraw the parabolic-well master diagram from memory with E-line, turning points, and K-gap labelled — the picture is the concept.

---

### Simple Pendulum

*Concept ID: `phys.wave.pendulum` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Students will be able to derive the simple pendulum's SHM approximation for small angles, apply T = 2π√(L/g), explain the period's independence of mass and (for small swings) amplitude, use pendulums to measure g, and state where the small-angle approximation breaks down.

A simple pendulum undergoes approximate SHM for small angles with period T = 2π√(L/g).

The simple pendulum — a point mass on a light string of length L — is gravity's oscillator: displaced by angle θ, it feels a restoring force −mg sin θ along its arc, and for small angles sin θ ≈ θ turns this into the linear law of SHM with the string's geometry supplying the stiffness. The result is the most famous period formula in physics: T = 2π√(L/g) — longer pendulums swing slower (quadruple the length to double the period), stronger gravity quickens the beat, and, remarkably, the mass has vanished entirely: bob mass cancels just as it does in free fall, because gravity both drives and must move the same m. For small swings the period is also amplitude-independent (Galileo's cathedral-lamp observation), which made the pendulum the world's timekeeper for three centuries; at larger angles the sin θ ≈ θ approximation degrades and the true period runs slightly long (about 0.05% at 5°, 2% at 30°, 18% at 90°) — a systematic error every pendulum lab must reckon with. Inverted, the formula is a gravimeter: measuring L and T yields g = 4π²L/T², the classic student experiment and the historical method for mapping Earth's gravity (a pendulum clock loses time up a mountain — g weaker, beat slower). The pendulum thus packages three lessons at once: the small-angle linearization that manufactures SHM from a nonlinear system, the mass cancellation that echoes the equivalence of inertial and gravitational mass, and an honest approximation with a stated domain of validity.

**Key ideas**

- Restoring mechanism: tangential gravity component −mg sin θ; for small θ (radians), sin θ ≈ θ linearizes it into SHM along the arc.
- Period: T = 2π√(L/g) — length and local gravity only; quadruple L to double T; stronger g, faster tick.
- Mass cancellation: bob mass is absent — gravity supplies force ∝ m while inertia costs ∝ m, the same cancellation as free fall (equivalence principle's echo).
- Small-swing isochronism: amplitude-independent period for small angles — Galileo's observation and the clock's licence.
- Approximation budget: true period exceeds the formula by ~0.05% at 5°, ~2% at 30°, ~18% at 90° — small-angle means small, and labs should quote the domain.
- Gravimetry: g = 4π²L/T² — the pendulum as a precision g-meter, historically the tool that mapped Earth's gravity variations.
- Model fine print: point mass, massless inextensible string, no air or pivot friction — real (physical) pendulums with distributed mass need the moment-of-inertia generalization.

**Vocabulary**

- **simple pendulum** — An idealized point mass on a massless string, oscillating under gravity: T = 2π√(L/g) for small angles.
- **small-angle approximation** — sin θ ≈ θ (radians), the linearization that turns the pendulum into SHM — good to ~1% below 15°.
- **seconds pendulum** — The ~0.99 m pendulum whose half-swing takes one second (T = 2 s) — the classic clock standard.
- **physical pendulum** — A real swinging body with distributed mass, requiring the moment-of-inertia generalization of the period formula.

**Common misconceptions**

- *Misconception:* A heavier bob swings with a different period.
  *Correction:* Mass cancels exactly: T = 2π√(L/g) contains no m. Lead and cork bobs on equal strings keep identical time (air resistance aside) — the pendulum repeats free fall's mass-independence lesson at the end of a string.
- *Misconception:* The pendulum formula works at any swing angle.
  *Correction:* It rests on sin θ ≈ θ. The true period runs longer as amplitude grows — negligibly below ~10°, by 2% at 30°, and drastically toward 90°. Quote the formula WITH its small-angle condition.
- *Misconception:* Doubling the length doubles the period.
  *Correction:* T ∝ √L: doubling L stretches the period by √2 ≈ 1.41; doubling T needs FOUR times the length. Grandfather clocks are about a metre long because √(1 m/g) sets a one-second half-beat.
- *Misconception:* A pendulum clock keeps the same time anywhere — on a mountain, on the Moon.
  *Correction:* T depends on local g: weaker gravity slows the beat. A clock loses time at altitude and would tick √6 ≈ 2.4× slower on the Moon — historically, pendulum rate WAS the measurement of g.

**Common mistakes in practice**

- Including bob mass in the period.
- Linear-scaling T with L.
- Using the formula at large amplitudes without comment.
- Timing one swing instead of twenty.
- Measuring L to the bob's top rather than its centre of mass.
- Degrees inside sin θ ≈ θ reasoning (the approximation lives in radians).

**Visual teaching opportunities**

- A force-decomposition diagram at swing angle θ: weight split into string-tension direction and the tangential −mg sin θ restoring component, with the sin θ ≈ θ chord-arc comparison inset.
- A mass-independence race: lead versus wooden bob on equal strings, released together, filmed staying in phase.
- A period-versus-amplitude data plot from a real or simulated pendulum: flat at small angles, curling upward past ~20° — the approximation's edge made visible.
- A length-scaling ladder: pendulums of L, 2L, 4L beating together every √1 : √2 : 2 — the square root heard as rhythm.
- A world-gravimetry vignette: the same clock at sea level, on a peak, and on the Moon with its daily gain/loss annotated.

**Worked example**

*Setup:* A pendulum is to beat with a period of 2.0 s (one-second half-swings) where g = 9.8 m/s². Find the required length; find the period of the same pendulum on the Moon (g = 1.62 m/s²); then a student measures 20 oscillations of a 0.80 m pendulum in 35.9 s — extract g.

1. Length for T = 2.0 s: L = gT²/4π² = 9.8 × 4/(4π²) = 9.8/π² ≈ 0.99 m — the metre-long 'seconds pendulum' of clock history.
2. Moon period: T = 2π√(0.99/1.62) ≈ 2π × 0.782 ≈ 4.9 s — the beat slows by √(9.8/1.62) ≈ 2.46×.
3. Student measurement: T = 35.9/20 = 1.795 s (timing 20 swings divides the stopwatch error by 20 — the standard trick).
4. Extract g: g = 4π²L/T² = 4π² × 0.80/3.222 ≈ 9.80 m/s².
5. Error sense: a 0.1 s stopwatch slip over 20 swings shifts T by 0.005 s and g by ~0.5% — quote g ≈ 9.8 ± 0.1 m/s².
6. Method notes: swings kept under ~10° for the formula's validity; mass never asked for — it cancels.

*Outcome:* The student sizes the seconds pendulum at ~1 m, slows it to 4.9 s on the Moon, and extracts g = 9.80 m/s² from timing data with the 20-swing error-division trick and small-angle discipline stated.

**Real-world intuition**

- Pendulum clocks governed civilization's timekeeping for three centuries; the metre-long seconds pendulum nearly became the metre's definition.
- Gravimetric surveying by pendulum rate mapped Earth's gravity field, ore bodies, and the planet's oblateness before spring gravimeters.
- Foucault pendulums display Earth's rotation in museums worldwide — the swing plane's slow pirouette is the planet turning beneath it.
- Skyscraper tuned mass dampers are giant engineered pendulums (Taipei 101's 660-tonne sphere) with lengths chosen so T matches the building's sway.
- Playground swings are pendulums: pumping at the natural period is every child's first resonance experiment.

**Practice progression**

Item types: T, L, g computations in all directions, scaling-reasoning items (length ratios, gravity ratios, clock gain/loss), g-measurement data problems with error sense, validity-judgment items on amplitude and model assumptions. Suggested item count: 10.

Begin with direct period computations, add inversions and scaling ratios, then measurement-and-error problems, ending with validity and clock-drift scenarios.

**Assessment objectives**

Formats: computation set, laboratory data-analysis task, conceptual quiz on cancellation and validity. Bloom alignment: Apply — students must run the period formula in all directions, design g measurements, and police the small-angle domain in fresh scenarios.

Mastery signal: The student computes T/L/g correctly with √-scaling intact, extracts g from timing data, and states the mass-cancellation and small-angle conditions unprompted, at 80% accuracy or better.

**Teacher notes**

Three teachable treasures share one apparatus: the linearization (do the sin θ ≈ θ step explicitly — it is many students' first honest approximation), the mass cancellation (race the bobs; connect it verbally to free fall and the equivalence principle), and measurement craft (the 20-swing timing trick and the amplitude ceiling). The g-measurement lab is compulsory heritage — cheap, accurate to a percent, and quietly teaches error division. Keep the physical pendulum as one honest sentence of scope, not content.

**Student notes**

One formula, two absentees: T = 2π√(L/g) — no mass (it cancels, as in free fall) and no amplitude (for small swings only; keep under ~10°). Scale by square roots: ×4 length for ×2 period. Run it backwards for g = 4π²L/T², timing many swings to shrink the stopwatch error. And remember what the pendulum measures when it misbehaves: a slow clock means weak gravity — that is data, not failure.

**Prerequisite graph**

- Requires: phys.wave.shm
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The pendulum realizes SHM (phys.wave.shm) with gravity (phys.mech.universal-gravitation) as the spring, its mass cancellation echoing free fall (phys.mech.kinematics-1d) and foreshadowing the equivalence principle (phys.rel). Its energy exchange is the SHM ledger (phys.wave.shm-energy); its resonance pumping previews forced oscillations (phys.wave.forced-oscillations); tuned mass dampers connect it to engineering practice.

**Teaching hints — review triggers**

- phys.wave.shm

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one T/L/g triangle solved each way, one clock-drift scenario, one validity judgment. Monthly, re-derive the linearization from the force diagram — the sin θ → θ step is the pendulum's entire theory, and owning it inoculates against misuse.

---

### Spring-Mass System

*Concept ID: `phys.wave.spring-mass` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Students will be able to apply T = 2π√(m/k) to horizontal and vertical spring-mass oscillators, show that gravity shifts a vertical system's equilibrium without changing its period, combine springs in series and parallel into effective oscillators, extract k or m from measured periods, and contrast spring-mass scaling with the pendulum's.

A mass on a spring executes SHM with angular frequency ω = √(k/m) and period T = 2π√(m/k).

The spring-mass system is SHM's laboratory standard: a mass m on a spring of stiffness k oscillates with ω = √(k/m) and T = 2π√(m/k) — heavier is slower (more inertia per unit force), stiffer is faster (more force per unit stretch), each by square roots. Its quiet surprise is the vertical case: hanging the mass stretches the spring to a new equilibrium (kx₀ = mg), but oscillations ABOUT that shifted centre obey exactly the same period — gravity relocates the home position and then cancels out of the dynamics, so T = 2π√(m/k) with no g anywhere. That absence is the sharpest contrast with the pendulum (T = 2π√(L/g)): the spring clock is portable across planets while the pendulum clock is a gravimeter; one carries its restoring force internally, the other borrows gravity's. Spring combinations inherit Hooke's-law algebra — parallel springs add stiffness (faster oscillation), series springs add compliance (slower) — letting one mass-and-spring kit realize any frequency. Run backwards, the period formula is an instrument: T measures m at known k (the principle of inertial balances that weigh astronauts in orbit, where scales read zero but inertia never does) or k at known m (vibration engineers' standard characterization). The system is also the honest template for real-world modelling: car suspensions, building floors, molecular bonds, and microchip resonators are all effective m's on effective k's, tuned through this one formula.

**Key ideas**

- Period: T = 2π√(m/k) — mass slows (√m), stiffness quickens (√k); amplitude absent, as SHM demands.
- Vertical systems: gravity shifts equilibrium by x₀ = mg/k, then vanishes from the dynamics — same T about the new centre; measure displacements from IT.
- The g-free clock: no gravity in the spring period — spring watches work on the Moon unchanged, while pendulums drift; the two formulas are complementary instruments.
- Combinations compose: parallel k_eq = Σk (stiffer, faster), series 1/k_eq = Σ1/k (softer, slower) — Hooke's-law algebra imported wholesale.
- Inertial balance: T at known k weighs m without gravity — how astronauts are 'weighed' in orbit; conversely T at known m measures k.
- Scaling instincts: ×4 mass → ×2 period; ×4 stiffness → ×½ period — square roots throughout.
- Modelling template: suspensions, floors, bonds, and MEMS resonators reduce to effective spring-mass systems — the formula is the entry point to vibration engineering.

**Vocabulary**

- **spring-mass oscillator** — A mass on a Hookean spring: T = 2π√(m/k), amplitude- and gravity-independent.
- **loaded equilibrium** — The vertical system's oscillation centre, where spring force balances weight (stretch mg/k).
- **inertial balance** — A calibrated spring oscillator that measures mass from period — weighing without gravity.
- **effective stiffness k_eq** — The single-spring equivalent of a combination: Σk in parallel, (Σ1/k)⁻¹ in series.

**Common misconceptions**

- *Misconception:* A vertical spring-mass system oscillates with a different period than a horizontal one, since gravity joins in.
  *Correction:* Gravity only relocates the equilibrium (stretch mg/k); about that point the net force is again −kx and the period is identical. The constant force shifts the centre, not the clock.
- *Misconception:* The oscillation of a hanging mass is centred on the spring's natural length.
  *Correction:* It is centred on the LOADED equilibrium, where spring force balances weight. Measuring displacements from the natural length imports a spurious constant and wrecks the energy and force bookkeeping.
- *Misconception:* Heavier masses oscillate faster because the spring is stretched harder.
  *Correction:* T = 2π√(m/k) grows with mass: more inertia per unit restoring force means slower cycles. The larger static stretch changes the centre, not the tempo — quadruple the mass and the period doubles.
- *Misconception:* Spring-mass periods depend on g like the pendulum's.
  *Correction:* No g appears: the spring supplies its own restoring force. On the Moon the spring watch keeps time while the pendulum clock slows — the pairing is the classic exam contrast, and the physics of why quartz-and-spring superseded pendulums in portable timekeeping.

**Common mistakes in practice**

- Inserting g into the spring-mass period.
- Centring vertical oscillations on the natural length.
- Linear-scaling T with m or k.
- Series/parallel k-algebra inverted.
- Confusing the static stretch (uses g) with the dynamic period (doesn't).

**Visual teaching opportunities**

- A horizontal/vertical twin animation: the same m and k oscillating side by side, the vertical one about its shifted equilibrium, both period counters locked together.
- A shifted-well energy diagram for the vertical system: the parabola simply relocated to the loaded equilibrium — same curvature, same ω.
- A combination bench: one mass run on single, parallel, and series spring rigs with the three periods displayed as √-related.
- An inertial-balance vignette: an astronaut on the ISS body-mass device oscillating on a calibrated spring — mass from T where weight is useless.
- A pendulum-versus-spring 'Moon test' split screen: pendulum clock slowing, spring watch unmoved.

**Worked example**

*Setup:* A 0.40 kg mass hangs from a spring, stretching it 0.049 m to equilibrium (g = 9.8 m/s²). Find k, the period of vertical oscillations, the period if a second identical spring is added in parallel, and the mass an astronaut must have if the same single spring oscillates her at T = 2.5 s on an inertial balance.

1. Stiffness from the static stretch: k = mg/x₀ = 0.40 × 9.8/0.049 = 80 N/m.
2. Vertical period (gravity now dismissed): T = 2π√(m/k) = 2π√(0.40/80) = 2π × 0.0707 ≈ 0.44 s.
3. Note what g did and didn't do: it set the 4.9 cm sag, then vanished — a horizontal run of the same system gives the same 0.44 s.
4. Parallel pair: k_eq = 160 N/m ⇒ T = 2π√(0.40/160) ≈ 0.31 s — stiffness doubled, period divided by √2.
5. Inertial balance: m = kT²/4π² = 80 × 6.25/39.5 ≈ 12.7 kg... check scale: that's the effective oscillating mass on THIS light spring; real body-mass devices use stiffer springs — the formula, not the furniture, is the lesson.
6. Summarize the instrument readings: static stretch measured k; period then measured m — one spring, two measurements, no gravity needed for the second.

*Outcome:* The student extracts k = 80 N/m statically, computes the g-free 0.44 s period, quickens it by √2 with a parallel spring, and inverts the formula as an inertial balance, articulating gravity's shift-then-cancel role.

**Real-world intuition**

- Vehicle suspensions are spring-mass(-damper) systems tuned near 1 Hz; load changes shift ride height (the mg/k sag) and subtly slow the bounce.
- Astronaut body-mass measurement devices on the ISS are inertial balances — mass from oscillation period where scales read zero.
- MEMS accelerometers and resonators in phones are microscopic spring-mass systems; their ω = √(k/m) sets sensitivity and drift.
- Bungee systems, trampolines, and gym equipment are engineered spring-mass oscillators with amplitude and frequency budgets.
- Atomic force microscopy cantilevers oscillate as spring-mass systems whose frequency shifts report forces at the nanonewton scale.

**Practice progression**

Item types: T, m, k computations in all directions (horizontal and vertical), static-stretch-plus-period two-step problems, combination problems (series/parallel effective oscillators), contrast items (spring vs. pendulum scaling, Moon tests, inertial balances). Suggested item count: 10.

Begin with direct period computations, add vertical-equilibrium two-steps, then combinations, ending with instrument inversions and pendulum-contrast reasoning.

**Assessment objectives**

Formats: computation set, two-step laboratory-style problems, conceptual contrast quiz. Bloom alignment: Apply — students must run the spring-mass formula in all directions, handle the vertical shift correctly, and compose combination oscillators in fresh configurations.

Mastery signal: The student solves vertical two-step problems (k from stretch, then T), composes one combination oscillator, and answers the g-dependence contrast correctly, at 80% accuracy or better.

**Teacher notes**

The vertical-shift theorem (gravity relocates, then cancels) is the concept's examinable heart — prove it once by substituting x = x₀ + y and watching mg vanish, then enforce 'measure from the loaded equilibrium' as a rule. Pair every result with its pendulum contrast; the Moon-test question is the cleanest discriminator of understanding in the whole oscillations block. The inertial-balance application dignifies the inversion T → m and delights students. Combination rigs recycle Hooke's-law algebra — let students predict the three periods before running them.

**Student notes**

One clock, two knobs: T = 2π√(m/k) — mass slows it, stiffness speeds it, by square roots, and neither amplitude nor gravity gets a vote. For hanging systems, find the loaded equilibrium first (stretch mg/k) and measure everything from there; the period is unchanged from the horizontal case. Compose springs before oscillating them: parallel adds k, series adds 1/k. And keep the contrast loaded: spring clocks travel, pendulum clocks survey gravity.

**Prerequisite graph**

- Requires: phys.wave.shm
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The spring-mass system realizes SHM (phys.wave.shm) with Hooke's law (phys.mech.hookes-law) as its engine and the SHM energy ledger (phys.wave.shm-energy) as its accounting; combinations import the spring algebra wholesale. Its contrast with the pendulum (phys.wave.pendulum) is the domain's standard comparison, and its damped and driven extensions follow immediately (phys.wave.damped-oscillations, phys.wave.forced-oscillations).

**Teaching hints — review triggers**

- phys.wave.shm

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one vertical two-step, one combination, one Moon-test contrast answered aloud. Monthly, re-derive the gravity-cancellation by the x = x₀ + y substitution — three lines that carry the concept's one subtlety.

---

### Damped Oscillations

*Concept ID: `phys.wave.damped-oscillations` · Difficulty: advanced · Bloom level: analyze · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Students will be able to describe how resistive forces drain an oscillator's energy, distinguish underdamped, critically damped, and overdamped regimes, interpret the exponentially decaying amplitude envelope, explain why light damping leaves frequency nearly unchanged while amplitude decays, and match damping regimes to engineering purposes.

Damped oscillations occur when a resistive force causes the amplitude to decrease exponentially with time.

Real oscillators run down: friction, air drag, and internal losses add a resistive force (in the standard model, proportional to velocity: F = −bv) that continuously converts the oscillation's energy to heat. The result is damped oscillation, and its character depends on how the damping strength compares with the restoring stiffness. Underdamped systems — the common case — still oscillate, but inside a shrinking exponential envelope: amplitude decays as A(t) = A₀e^(−bt/2m), so equal time intervals lose equal FRACTIONS of amplitude (and, since energy goes as amplitude squared, energy decays twice as fast, ∝ e^(−bt/m)); the oscillation frequency is nudged slightly below the natural ω₀, negligibly so for light damping. Crank the damping up and oscillation dies entirely: at critical damping the system returns to equilibrium in the fastest possible time without overshooting — the designed behaviour of car shock absorbers, analog meter needles, and door closers — while overdamped systems creep home slowly without oscillating (a door closer set too stiff). The trio of regimes is a design menu: clocks and instruments that must keep ringing want minimal damping (quantified by the quality factor Q, the number of radians of oscillation before the energy drains by e); anything that must settle fast and clean wants critical; anything that must never slam wants slight overdamping. In the energy-well picture from SHM, damping is the total-energy line sliding down the parabola — the master diagram acquiring its first arrow of time.

**Key ideas**

- Damping model: resistive force −bv opposing motion converts mechanical energy to heat continuously — the oscillation's energy account leaks.
- Underdamped motion: oscillation inside a decaying envelope A(t) = A₀e^(−bt/2m); equal times lose equal fractions (exponential decay's signature).
- Energy decays twice as fast as amplitude: E ∝ A² ⇒ E(t) = E₀e^(−bt/m).
- Light damping barely shifts frequency: ω ≈ ω₀ for small b — the clock slows imperceptibly while the swing shrinks visibly.
- Three regimes: underdamped (oscillates, decays), critically damped (fastest non-overshooting return), overdamped (slow creep home, no oscillation).
- Critical damping is a design target, not a failure: shock absorbers, meter needles, and door closers are tuned to it.
- Quality factor Q measures ringing: high Q (tuning fork ~10³, quartz ~10⁵) rings long; low Q settles fast — Q ≈ 2π × (energy stored)/(energy lost per cycle).
- Energy-well picture: damping slides the total-energy line down the SHM parabola — turning points migrating inward, the well emptied into heat.

**Vocabulary**

- **damping** — Resistive dissipation (model −bv) that converts oscillation energy to heat, shrinking amplitude over time.
- **amplitude envelope** — The decaying bounds ±A₀e^(−bt/2m) inside which an underdamped oscillation lives.
- **underdamped / critically damped / overdamped** — The three regimes: ringing decay, fastest non-overshooting return, and slow oscillation-free creep.
- **quality factor Q** — The dimensionless ringing measure ≈ 2π × energy stored / energy lost per cycle — high Q rings long.

**Common misconceptions**

- *Misconception:* Damping makes the oscillation slow down — the period grows dramatically as the swing dies.
  *Correction:* For light damping the frequency is almost untouched: the pendulum's swings shrink, but each cycle takes nearly the same time (isochronism survives). Only heavy damping near the critical point shifts timing appreciably — the amplitude, not the clock, is what visibly decays.
- *Misconception:* The amplitude decreases by equal amounts each cycle.
  *Correction:* Decay is exponential, not linear: each cycle loses the same FRACTION (say 5%), so the losses shrink with the amplitude. That is why oscillations fade asymptotically instead of hitting zero on schedule — and why 'half-life of amplitude' is a meaningful constant.
- *Misconception:* More damping always brings the system to rest faster.
  *Correction:* Only up to the critical point: past it, overdamped systems creep home SLOWER (the heavy syrup effect). The fastest clean return is exactly at critical damping — which is why shock absorbers are tuned there rather than maximized.
- *Misconception:* The lost oscillation energy is destroyed.
  *Correction:* It is converted to thermal energy in the damper, the air, and the material — shock absorbers get genuinely hot. The first-law ledger closes exactly; damping is a transfer channel, not a sink into nothing.

**Common mistakes in practice**

- Linear decay assumptions (equal amounts per cycle).
- Using the amplitude rate for energy (missing the factor 2).
- Believing maximum damping gives fastest settling.
- Reporting a large frequency shift for light damping.
- Treating dissipated energy as destroyed rather than converted.

**Visual teaching opportunities**

- The canonical underdamped x(t) trace: sinusoid inside the ±A₀e^(−bt/2m) envelope, drawn dashed, with equal-fraction decay marked over successive cycles.
- A three-regime comparison plot from identical initial displacement: underdamped ringing, critical's swift clean return, overdamped's slow creep — one graph, the whole design menu.
- A car-suspension clip: pushing down on a good car (one rebound, settle) versus worn shocks (bouncing on) — critical versus underdamped, kerbside.
- The energy-well animation: the SHM parabola with the E-line sliding down as heat ticks up in a side-tank, turning points migrating inward.
- A Q-factor gallery: tuning fork (rings for seconds), car suspension (settles in one cycle), quartz crystal (rings for minutes in vacuum) with Q values annotated.

**Worked example**

*Setup:* A 0.50 kg oscillator on a k = 200 N/m spring (ω₀ = 20 rad/s) has light damping b = 0.40 kg/s. Its initial amplitude is 0.10 m. Find the amplitude and energy after 5.0 s, the fraction of energy lost per cycle, and verify the light-damping assumption.

1. Amplitude decay constant: b/2m = 0.40/1.0 = 0.40 s⁻¹, so A(t) = 0.10 e^(−0.40t).
2. Amplitude at 5.0 s: A = 0.10 e^(−2.0) ≈ 0.014 m — about 14% of the start.
3. Energy decays at twice the rate: E(t) = E₀e^(−bt/m) with E₀ = ½kA₀² = 1.0 J ⇒ E(5.0) = e^(−4.0) ≈ 0.018 J — under 2% remains (amplitude², as it must be).
4. Per-cycle loss: T ≈ 2π/ω₀ = 0.314 s; energy fraction retained per cycle = e^(−bT/m) = e^(−0.126) ≈ 0.88 — the oscillator loses ~12% of its energy each cycle, equal fractions every cycle.
5. Light-damping check: b/2m = 0.40 s⁻¹ against ω₀ = 20 rad/s — a 2% ratio; the frequency shift is ~0.02% and the SHM clock is effectively untouched.
6. Read the structure: amplitude halves every ln2/0.40 ≈ 1.7 s regardless of its current size — exponential decay's constant-half-life signature.

*Outcome:* The student computes A(5) ≈ 1.4 cm and E(5) ≈ 0.018 J with the ×2 rate relation, extracts the constant ~12%-per-cycle loss, and certifies the frequency as effectively unshifted.

**Real-world intuition**

- Car shock absorbers are tuned near critical damping so wheels track the road instead of bouncing — worn (underdamped) shocks fail the kerbside push test.
- Earthquake engineering adds dampers to buildings and bridges to bleed oscillation energy before amplitudes grow dangerous.
- Analog meters, door closers, and camera gimbals are critically damped to settle fast without overshoot.
- High-Q resonators — tuning forks, quartz crystals, superconducting cavities — are engineered for MINIMAL damping so they ring long and define precise frequencies.
- Vibration isolation in buildings and instruments pairs soft springs with tuned damping to swallow footfall and machinery energy as heat.

**Practice progression**

Item types: envelope computations (A and E at given times, half-life extraction), regime classification from described behaviour or b values, per-cycle fraction problems and Q-factor estimates, design-matching items (which regime for which device?). Suggested item count: 10.

Begin with envelope evaluations, add the amplitude-energy rate doubling, then regime classification and Q estimates, ending with design-selection justifications.

**Assessment objectives**

Formats: computation set on exponential envelopes, regime-identification quiz, design-justification tasks. Bloom alignment: Analyze — students must decompose decaying motion into envelope and oscillation, compare damping regimes, and match them to engineering intents, beyond evaluating exponentials.

Mastery signal: The student computes envelope decays with the amplitude/energy rate distinction, classifies the three regimes correctly, and justifies one design choice, at 80% accuracy or better.

**Teacher notes**

Teach the decomposition explicitly: damped motion = SHM's sinusoid × an exponential envelope, and let students see that the two factors answer different questions (when? how big?). The equal-fractions property against the equal-amounts intuition deserves a direct numerical confrontation. The three-regime plot is the design menu — pair it immediately with the car-suspension kerb test, which students can perform in the car park. The energy-well E-line sliding down is the continuity thread from SHM energy; use it. Q can stay estimative (count the rings).

**Student notes**

Split every damped problem in two: the envelope A₀e^(−bt/2m) sets the size, the (barely shifted) SHM clock sets the timing. Energy decays at twice the amplitude's rate — square the envelope. Expect equal FRACTIONS lost per cycle, hence half-lives, not countdown schedules. Know the menu: underdamped rings, critical settles fastest, overdamped creeps — and past critical, more damping means slower, not faster. The lost joules are in the damper as heat.

**Prerequisite graph**

- Requires: phys.wave.shm-energy
- Unlocks (future prerequisite links): phys.wave.forced-oscillations
- Cross-topic connections (graph cross-links): none
- Narrative: Damping drains the SHM energy ledger (phys.wave.shm-energy) through non-conservative forces (phys.mech.conservative-forces), with the drag model echoing viscosity (phys.mech.viscosity). It sets the stage for forced oscillations and resonance (phys.wave.forced-oscillations), where driving replenishes what damping drains, and its exponential-decay mathematics recurs from circuits (phys.em) to radioactivity (phys.mod).

**Teaching hints — review triggers**

- phys.wave.shm-energy

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one envelope computation with the ×2 energy rate, one regime classification set, one design match. Monthly, sketch the three-regime plot and the sliding E-line from memory — the two pictures that hold the topic.

---

### Forced Oscillations and Resonance

*Concept ID: `phys.wave.forced-oscillations` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Students will be able to describe forced oscillation at the driver's frequency, explain resonance as the amplitude peak when driving frequency approaches the natural frequency, relate resonance sharpness and peak height to damping, interpret resonance curves, and analyze resonance's uses and hazards in engineering and daily life.

Forced oscillations occur when an external periodic force drives a system; resonance is maximum amplitude when the driving frequency matches the natural frequency.

Push an oscillator periodically and, after transients fade, it settles into steady-state oscillation at the DRIVER's frequency — not its own — with an amplitude that depends dramatically on how the driving frequency f compares with the system's natural frequency f₀. Far below f₀ the system placidly follows the push; far above, it barely responds, quivering out of phase; but as f approaches f₀ the driver times its pushes to arrive in step with the motion — each shove adding energy like a well-timed playground push — and the amplitude climbs to a peak: resonance. Damping is the peak's regulator: in steady state the driver's input balances the damping's drain, so light damping permits enormous resonant amplitudes with a tall, narrow response curve (high Q: selective but explosive), while heavy damping caps the peak into a low, broad hump (unselective but safe). The resonance curve — amplitude versus driving frequency — is the concept's master graph, and the phase story rides along: the oscillation lags the driver by ~0° well below resonance, exactly 90° at it (velocity in phase with force — maximum power transfer), and ~180° above. Resonance is simultaneously civilization's tool and its trap: radios tune, MRI machines image, musical instruments speak, and microwave ovens heat by driving systems at their natural frequencies — while soldiers break step on bridges, engineers stiffen buildings against earthquake frequencies, and the Tacoma Narrows collapse (aeroelastic flutter, resonance's wilder cousin) hangs in every engineering syllabus as the cautionary photograph.

**Key ideas**

- Steady-state rule: a driven oscillator oscillates at the DRIVING frequency; the natural frequency governs how LARGE the response is.
- Resonance: amplitude peaks as driving frequency approaches the natural frequency f₀ — pushes arriving in step with the motion feed energy cycle after cycle.
- Damping shapes the peak: light damping → tall, narrow curve (high Q, selective, dangerous); heavy damping → low, broad curve (safe, unselective).
- Steady state is a power balance: driver input = damping dissipation; at resonance with light damping, balance is struck only at large amplitude.
- Phase signature: response lags the driver by ≈0° below, 90° at, and ≈180° above resonance — the 90° point is maximum power transfer.
- Transients: the natural-frequency ringing at switch-on dies at the damping rate, leaving the pure driven response.
- Resonance as tool: tuning circuits, MRI, musical instruments, microwave ovens, swing-pumping — energy delivered selectively at f₀.
- Resonance as hazard: marching soldiers on bridges, earthquake-matched buildings, wine glasses, rattling machinery — design either detunes f₀ away from expected drivers or adds damping.

**Vocabulary**

- **forced (driven) oscillation** — Oscillation sustained by a periodic external force; steady state runs at the driver's frequency.
- **resonance** — The amplitude peak when driving frequency approaches the natural frequency — energy delivered in step with the motion.
- **resonance curve** — Amplitude versus driving frequency: tall and narrow for light damping, low and broad for heavy.
- **steady state / transient** — The persistent driven response versus the switch-on ringing at the natural frequency that damping erases.
- **bandwidth (of resonance)** — The frequency width of the response peak — narrow for high Q, broad for low.

**Common misconceptions**

- *Misconception:* A driven system oscillates at its own natural frequency.
  *Correction:* In steady state it oscillates at the DRIVER's frequency, whatever that is; the natural frequency only decides the response's size (huge near f₀, small far away). The system's own frequency appears only in the brief switch-on transient.
- *Misconception:* Resonance means the amplitude becomes infinite.
  *Correction:* Only an idealized undamped system diverges. Real systems always have damping, and the steady amplitude settles where driver input equals dissipation — large, possibly destructive, but finite. Breakage happens when that finite amplitude exceeds the structure's limits.
- *Misconception:* The Tacoma Narrows bridge collapsed from simple wind resonance at its natural frequency.
  *Correction:* The collapse was aeroelastic flutter — a self-excited interaction where the bridge's own motion organized the wind forces feeding it. It is resonance's more dangerous cousin (motion-synchronized driving), and the standard cautionary tale is best told with that refinement.
- *Misconception:* More damping is always the safe engineering choice.
  *Correction:* Damping caps resonant peaks but also broadens response and wastes energy; instruments, radios, and resonant sensors NEED high Q to function. Engineering chooses per purpose: detune or damp for safety, sharpen Q for selectivity.

**Common mistakes in practice**

- Assigning the steady-state motion the natural frequency.
- Predicting infinite resonant amplitudes.
- Reading damping's effect as shifting rather than shrinking/broadening the peak (the shift is minor).
- Retelling Tacoma as simple wind-at-f₀ resonance.
- Treating damping as unconditionally good or bad rather than purpose-dependent.

**Visual teaching opportunities**

- The master resonance-curve family: amplitude versus driving frequency for three damping levels — the tall-narrow to low-broad progression on one graph.
- A playground-swing timing animation: pushes in step (amplitude climbing) versus mistimed pushes (energy alternately added and removed).
- Barton's pendulums (or simulation): one driver pendulum, many responders of different lengths — only the length-matched one swings large, phase lag visible.
- The phase-lag dial across the curve: 0° → 90° → 180° as the driving frequency sweeps through resonance.
- A hazard/tool gallery pair: wine-glass shattering and MRI scanner side by side — same physics, opposite intent; Tacoma Narrows footage with the flutter caption.

**Worked example**

*Setup:* A washing machine's drum assembly (m = 10 kg on mounts of k = 4000 N/m) is driven by an unbalanced load as the spin rate ramps up. Find the natural frequency and the spin rate (rpm) at which violent shaking is expected; explain the observed lurch as the machine passes that rate and settles; and evaluate two fixes — stiffer mounts (k × 4) versus added damping.

1. Natural frequency: ω₀ = √(k/m) = √400 = 20 rad/s ⇒ f₀ = 20/2π ≈ 3.2 Hz.
2. Danger rpm: 3.2 Hz × 60 ≈ 190 rpm — as the drum accelerates through ~190 rpm, driving frequency crosses f₀ and amplitude peaks: the familiar mid-ramp shudder.
3. Past resonance: at the 1000+ rpm spin, driving frequency ≫ f₀ and the response is small and antiphase — the machine runs smoother at full speed than during the ramp, exactly as the curve predicts.
4. Fix 1, stiffer mounts: ω₀ doubles to 40 rad/s (f₀ ≈ 6.4 Hz, ~380 rpm) — resonance still gets crossed during ramp-up, just later; stiffening relocates the peak, it does not remove it.
5. Fix 2, added damping: the peak's height collapses (low, broad curve) — the crossing still happens but the shaking stays modest; this is why machines ship with friction dampers on the drum suspension.
6. Design summary: pass through resonance quickly, damp the peak, and never operate steadily at ~190 rpm — the resonance curve as an owner's manual.

*Outcome:* The student locates f₀ ≈ 3.2 Hz (≈190 rpm), explains the ramp-through lurch and the smooth high-speed run from the response curve, and judges damping (peak-capping) superior to stiffening (peak-moving) for this hazard.

**Real-world intuition**

- Radio and phone tuning circuits are electrical resonators: selecting a station is sliding a high-Q resonance onto its frequency.
- MRI drives nuclear spins exactly at their resonant frequency — medicine's most valuable image is a resonance phenomenon.
- Musical instruments are resonance products: strings, air columns, and soundboards amplify at their natural frequencies.
- Earthquake engineering detunes buildings from dominant ground-shaking bands and installs dampers; soldiers break step on footbridges (London Millennium Bridge's lateral wobble forced a damper retrofit).
- Microwave ovens drive water molecules near an absorption resonance; ultrasonic cleaners and kidney-stone lithotripsy deliver energy resonantly on purpose.

**Practice progression**

Item types: natural-frequency and danger-frequency computations for driven systems, resonance-curve reading (peak location, damping comparison, bandwidth), phase and steady-state conceptual items, design-analysis problems (detune vs. damp; tool vs. hazard framing). Suggested item count: 12.

Begin with f₀ computations and curve readings, add steady-state/transient and phase items, then design evaluations, ending with tool/hazard case analyses.

**Assessment objectives**

Formats: computation and curve-interpretation set, scenario-analysis problems, design-justification tasks. Bloom alignment: Apply — students must locate resonances, read response curves, and deploy the detune-or-damp design logic on driven systems they have not rehearsed.

Mastery signal: The student computes danger frequencies, orders response curves by damping, states the steady-state frequency rule, and justifies one design fix, at 80% accuracy or better.

**Teacher notes**

Two rules organize everything: steady state runs at the driver's frequency, and the natural frequency sets the gain. Barton's pendulums (or its simulation) demonstrates both at once and is worth the string. Sweep a signal-generator-driven mass or a smartphone-on-speaker through resonance live if possible — hearing the peak beats graphing it. Tell Tacoma honestly (flutter, not textbook resonance) — the correction itself teaches. Close with the design dichotomy, detune or damp, and let students argue cases; the washing machine is the domestic anchor everyone has felt.

**Student notes**

Ask two frequencies of every driven system: what drives it, and what would it do naturally? The response runs at the first and balloons when the two meet. Expect finite peaks (damping always collects) and remember damping's trade: tall-narrow (selective, risky) versus low-broad (safe, dull). The phase tells you where you are: in step below, 90° behind at the peak, opposite above. For design: move f₀ away from the driver, or damp the peak — and pass through resonances quickly, never park on them.

**Prerequisite graph**

- Requires: phys.wave.damped-oscillations
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Forced oscillation completes the oscillator trilogy — SHM's clock (phys.wave.shm), damping's drain (phys.wave.damped-oscillations), and now driving's supply — with the swing-pumping intuition planted at the pendulum (phys.wave.pendulum). Resonance returns as standing waves in bounded media (phys.wave.standing-waves), as acoustic response in sound (phys.wave.sound-waves), in AC circuits (phys.em), and in atomic absorption (phys.qm) — this curve is one of physics' most reused graphs.

**Teaching hints — review triggers**

- phys.wave.damped-oscillations

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one danger-frequency computation, one curve-family sketch with damping labels, one detune-vs-damp judgment. Monthly, restate the two rules (driver's frequency; natural frequency's gain) and the phase progression — the sentence-length core of the topic.

---

### Wave Properties: Amplitude, Period, Frequency

*Concept ID: `phys.wave.wave-properties` · Difficulty: developing · Bloom level: understand · Mastery threshold: 0.75 · Estimated study time: 3h*

**Learning objective.** Students will be able to define a wave as a travelling disturbance transporting energy without net matter transport, identify amplitude, wavelength, period, frequency, and speed on wave diagrams, apply v = fλ and f = 1/T, distinguish snapshot (x-space) from history (t-space) graphs, and distinguish mechanical from electromagnetic waves by their medium requirements.

Waves are characterised by amplitude, wavelength, period, frequency, and phase, related by v = fλ.

A wave is a disturbance that travels: a pattern moving through a medium (or through space itself) carrying energy and information while the medium's particles merely oscillate about home — the ripple crosses the pond, the water stays. This decoupling of pattern-motion from matter-motion is the wave idea, and one small vocabulary measures every wave: amplitude A, the maximum displacement from equilibrium (the energy-carrier: intensity scales as A²); wavelength λ, the spatial repeat distance (crest to crest); period T and frequency f = 1/T, the temporal repeat and its rate, set by the SOURCE; and wave speed v, set by the MEDIUM (string tension and mass, water depth, air's stiffness and density). The master relation chains them: v = fλ — in each period the pattern advances one wavelength — and its division of labour is the concept's deepest lesson: when a wave enters a new medium, v changes, f stays loyal to the source, and λ adjusts to balance the books. Two graphs that look identical but answer different questions complete the toolkit: the snapshot (displacement versus position at one instant — read λ from it) and the history (displacement versus time at one point — read T from it); confusing them is the classic wave-reading error. Waves divide by their need for a medium — mechanical waves (sound, water, seismic, string) require one; electromagnetic waves (light, radio) travel through vacuum — and by geometry into the transverse and longitudinal families the next two concepts formalize.

**Key ideas**

- A wave transports energy and information, not matter: the pattern travels, the medium's particles oscillate about fixed homes (the floating duck bobs; the ripple passes).
- Core vocabulary: amplitude A (max displacement; energy ∝ A²), wavelength λ (spatial repeat), period T and frequency f = 1/T (temporal repeat, source-set), speed v (medium-set).
- Master relation: v = fλ — one wavelength advances per period; with v fixed by the medium, f and λ trade inversely.
- Division of labour: the source sets f; the medium sets v; λ = v/f adjusts — crossing into a new medium changes λ, never f.
- Two graphs, two questions: snapshot (y vs. x, read λ) versus history (y vs. t, read T) — same sinusoid shape, different axes, different harvest.
- Mechanical waves need a medium (sound, water, string, seismic); electromagnetic waves do not (light crosses vacuum) — the moon is silent but visible.
- Frequency ranges as identity: audible sound 20 Hz–20 kHz, visible light ~10¹⁴ Hz — the same vocabulary spans them all.

**Vocabulary**

- **wave** — A travelling disturbance transporting energy and information while the medium's particles oscillate about fixed positions.
- **amplitude A** — Maximum displacement from equilibrium; wave energy and intensity scale as A².
- **wavelength λ** — The spatial repeat distance (crest to crest); read from a snapshot graph.
- **period T / frequency f** — The temporal repeat and its rate (f = 1/T), set by the source; read from a history graph.
- **wave speed v** — The pattern's travel speed, set by the medium: v = fλ.
- **mechanical / electromagnetic wave** — Waves that need a material medium (sound, water) versus those that cross vacuum (light, radio).

**Common misconceptions**

- *Misconception:* Waves carry the medium along with them — water travels across the ocean with the wave.
  *Correction:* The medium oscillates locally while the PATTERN travels: a duck on ripples bobs in place, and ocean water moves in small circles as swells pass. (Breaking surf and currents move water, but that is not the wave motion itself.) Energy crosses the ocean; the water largely stays.
- *Misconception:* When a wave enters a new medium, its frequency changes.
  *Correction:* Frequency is locked to the source — the rate of wiggles cannot change mid-stream without waves piling up or vanishing. The medium changes the SPEED, and wavelength adjusts as λ = v/f. (This loyalty of f is why colour doesn't change under water.)
- *Misconception:* Bigger amplitude means faster waves.
  *Correction:* Speed is a medium property (tension, density, stiffness), independent of amplitude in the linear regime: a loud shout and a whisper arrive together. Amplitude carries the ENERGY (∝ A²), not the speed.
- *Misconception:* A y-versus-t graph shows the wave's shape in space.
  *Correction:* It shows one point's biography — read the PERIOD from it, not the wavelength. The spatial shape lives in the snapshot (y vs. x). The two sinusoids look alike; the axes decide what the repeat distance means.

**Common mistakes in practice**

- Having the medium travel with the wave.
- Changing f at a medium boundary.
- Reading λ off a y-t graph (or T off a snapshot).
- Letting amplitude into the speed.
- Mixing units in v = fλ (kHz with metres, MHz with centimetres).

**Visual teaching opportunities**

- The duck-on-ripples clip: pattern crossing the pond, duck bobbing in place — matter/pattern decoupling in five seconds.
- An annotated master sinusoid: A, λ, crest, trough labelled on a snapshot; then the same curve relabelled as a history with T — the axes-swap lesson made explicit.
- A v = fλ conveyor animation: wiggle rate (source dial) and pattern speed (medium label) with wavelength visibly stretching or compressing as either changes.
- A medium-crossing animation: wave fronts slowing into a denser medium, frequency counter constant, wavelength shrinking on screen.
- A wave-family sorting board: sound, light, water, seismic P/S, radio, string — sorted by needs-medium and (previewing) by oscillation direction.

**Worked example**

*Setup:* A radio station broadcasts at 100 MHz (v = 3.0 × 10⁸ m/s in air ≈ vacuum). A sound wave of the same 100 Hz... rather: (a) find the radio wave's wavelength; (b) a 440 Hz concert-A sound travels at 343 m/s in air — find its wavelength and period; (c) the same 440 Hz note continues into water where sound travels at 1480 m/s — find the new wavelength and state what stayed fixed.

1. (a) Radio: λ = v/f = 3.0 × 10⁸/1.0 × 10⁸ = 3.0 m — FM antennas are metre-scale for exactly this reason.
2. (b) Sound wavelength: λ = 343/440 ≈ 0.78 m; period T = 1/f = 1/440 ≈ 2.3 ms.
3. Calibrate: the concert-A wave is about an arm-span, wiggling 440 times per second — instrument sizes echo these wavelengths.
4. (c) Into water: f stays 440 Hz (source-loyal); λ = 1480/440 ≈ 3.4 m — the wavelength more than quadruples because the medium quickened the pattern.
5. Tabulate the division of labour: f unchanged (source), v changed (medium), λ = v/f adjusted (bookkeeping).
6. Cross-check the master relation in each row: v = fλ holds — 343 = 440 × 0.78 ✓, 1480 = 440 × 3.36 ✓.

*Outcome:* The student computes 3.0 m, 0.78 m/2.3 ms, and 3.4 m, and articulates the source-sets-f, medium-sets-v, λ-adjusts division across the medium crossing.

**Real-world intuition**

- Radio, WiFi, and 5G allocate the electromagnetic spectrum by frequency; antenna sizes are set by λ = v/f — metre-scale FM masts to centimetre phone antennas.
- Musical pitch is frequency and instrument size tracks wavelength — a piccolo and a tuba are λ = v/f drawn in brass and wood.
- Sonar and medical ultrasound choose frequencies to trade resolution (short λ) against penetration — the v = fλ dial in clinical form.
- Earthquake monitoring reads seismic wave speeds and frequencies to locate events and image Earth's interior.
- Ocean-wave forecasting for shipping and surfing runs on period, wavelength, and depth-dependent speed — the vocabulary at sea.

**Practice progression**

Item types: v = fλ and f = 1/T computations across wave families, graph-reading items (extract λ from snapshots, T from histories, and never vice versa), medium-crossing problems (what changes, what stays), classification items (mechanical vs. electromagnetic, needs-medium judgments). Suggested item count: 12.

Begin with direct chain computations, add dual-graph readings, then medium-crossing bookkeeping, ending with classification and scale-calibration items across sound, light, and water.

**Assessment objectives**

Formats: computation set, graph-interpretation tasks, conceptual classification quiz. Bloom alignment: Understand — students must explain the pattern/matter decoupling, the division of labour among source, medium, and bookkeeping, and read both graph types correctly.

Mastery signal: The student runs v = fλ fluently, reads λ and T from the correct graph types, and answers medium-crossing and needs-medium items correctly, at 75% accuracy or better.

**Teacher notes**

Two lessons carry the concept: the pattern/matter decoupling (duck clip first, always) and the division of labour in v = fλ (source→f, medium→v, λ adjusts) — drill the medium-crossing question until 'frequency stays' is reflexive, and bank it explicitly for refraction in optics. The snapshot/history graph confusion is this topic's dominant exam error; teach the two graphs as different QUESTIONS, not different curves. Calibrate scales often (arm-span sound waves, metre radio waves) — numbers make the vocabulary real. Transverse/longitudinal is next; here just plant the sorting board.

**Student notes**

See every wave as a travelling pattern over a stay-at-home medium, measured by five numbers chained by v = fλ and f = 1/T. Assign ownership before computing: the source owns f, the medium owns v, and λ does the bookkeeping — so crossing media changes λ and v, never f. Check the axes before reading any wave graph: x-axis position → read λ; x-axis time → read T. Loudness (amplitude) rides separately from speed.

**Prerequisite graph**

- Requires: phys.meas.units
- Unlocks (future prerequisite links): phys.opt.nature-of-light, phys.opt.wave-optics, phys.wave.longitudinal-waves, phys.wave.sound-waves, phys.wave.transverse-waves
- Cross-topic connections (graph cross-links): none
- Narrative: Wave vocabulary is SHM's language (phys.wave.shm) travelling through space, and it underwrites the whole domain: geometry families next (phys.wave.transverse-waves, phys.wave.longitudinal-waves), medium physics in wave speed (phys.wave.wave-speed), and combination in superposition (phys.wave.superposition). The f-loyalty at boundaries becomes refraction in optics (phys.opt); the vocabulary transfers wholesale to electromagnetic waves (phys.em).

**Teaching hints — review triggers**

- phys.meas.units

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one v = fλ chain across two wave families, one dual-graph reading pair, one medium-crossing bookkeeping table. Monthly, recite the ownership sentence — source sets f, medium sets v, λ adjusts — the one line that prevents this domain's most common error.

---

### Transverse Waves

*Concept ID: `phys.wave.transverse-waves` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Students will be able to define transverse waves by perpendicular particle oscillation, identify crests and troughs, trace individual particle motion as a travelling transverse wave passes, explain polarization as a transverse-only phenomenon, and classify waves (string, light, S-waves, sound) by their oscillation geometry.

In transverse waves the particle displacement is perpendicular to the direction of wave propagation.

A transverse wave is one whose particles oscillate PERPENDICULAR to the direction the wave travels: flick a rope horizontally stretched and the hump runs along it while every rope segment moves only up and down. The geometry names the features — crests (maximum upward displacement) and troughs (maximum downward) — and fixes the particle choreography: as a wave moves right, each particle rehearses its left neighbour's motion a moment later, executing vertical SHM with the wave's frequency while going precisely nowhere horizontally. Reading particle velocity off a snapshot is the concept's skill: a particle on the leading edge of an approaching crest is moving up, one just past the crest moving down — the transverse-velocity map that exam questions probe. Transverse geometry carries an exclusive capability: polarization. Because the oscillation has a whole plane of perpendicular directions to choose from, a transverse wave can be filtered to one direction (vertical slots pass vertical rope waves and block horizontal ones); longitudinal waves, oscillating along the travel line, have no such choice to filter — so polarization is the experimental fingerprint of transverseness, and the polarization of light (sunglasses, LCD screens, bee navigation) is standing proof that light waves are transverse. The family album: waves on strings and ropes, electromagnetic waves (light, radio — field oscillations perpendicular to travel), and seismic S-waves, whose transverse shear cannot propagate through liquids — the observation that revealed Earth's liquid outer core.

**Key ideas**

- Definition: particle (or field) oscillation perpendicular to propagation — the wave travels along, the medium bobs across.
- Features: crests and troughs are the perpendicular extremes; amplitude is measured to them from equilibrium.
- Particle choreography: each particle performs vertical SHM at the wave's frequency, copying its upstream neighbour with a delay — no particle travels with the wave.
- Velocity-map reading: ahead of a crest (wave moving toward you) particles move up; behind it, down — the snapshot's slopes encode the particle velocities.
- Polarization is transverse-exclusive: perpendicular oscillation has directions to choose, so filters (slots, polaroids) can select one; longitudinal waves cannot be polarized.
- Light is transverse: its polarization (sunglasses, LCDs, glare) is the classical proof; the oscillating entities are electric and magnetic fields, needing no medium.
- Seismic S-waves are transverse shear: they cannot cross liquids — their shadow zone mapped Earth's molten outer core.
- Mechanical transverse waves need shear stiffness: strings under tension and solids carry them; ideal fluids (no shear) cannot — previewing why sound in air must be longitudinal.

**Vocabulary**

- **transverse wave** — A wave whose particles or fields oscillate perpendicular to the propagation direction.
- **crest / trough** — The maximum upward / downward displacements of a transverse wave.
- **polarization** — Restriction of a transverse wave's oscillation to one perpendicular direction — impossible for longitudinal waves.
- **S-wave (shear wave)** — The transverse seismic wave; blocked by liquids, hence the shadow zone that mapped Earth's outer core.

**Common misconceptions**

- *Misconception:* Particles in a transverse wave travel along with the crest.
  *Correction:* Each particle only oscillates perpendicular to the travel direction — up and down for a horizontal rope — returning home every cycle. The crest is a PATTERN passing through successive particles, like a stadium wave through seated spectators.
- *Misconception:* A particle at the crest is moving fastest.
  *Correction:* At the crest the particle is at its turning point — momentarily at rest, like SHM at maximum displacement. Maximum particle speed occurs as it passes through equilibrium (the zero crossings of the snapshot).
- *Misconception:* All waves can be polarized if the filter is good enough.
  *Correction:* Polarization requires a choice of oscillation directions perpendicular to travel — a transverse privilege. Longitudinal waves oscillate along the one and only travel direction; there is nothing for a filter to select. Sound cannot be polarized, and that is diagnostic.
- *Misconception:* Light must be longitudinal since it travels through empty space with nothing to wiggle sideways.
  *Correction:* Light's oscillating quantities are electric and magnetic FIELDS, which point perpendicular to the travel direction and need no medium. Its polarization behaviour — verified by every pair of polaroid sunglasses — certifies the transverse geometry.

**Common mistakes in practice**

- Sending particles along with the wave.
- Placing maximum particle speed at the crests.
- Reversing the velocity map when the wave travels in −x.
- Granting polarization to longitudinal waves.
- Conflating particle speed Aω with wave speed v.

**Visual teaching opportunities**

- A rope-wave animation with three particles painted: each tracing pure vertical SHM with successive delays while the hump runs along — choreography and delay in one loop.
- The velocity-map overlay: a snapshot with particle-velocity arrows drawn (up ahead of crests, down behind), then advanced one frame to verify.
- The slot-filter (polarization) demonstration: rope wave through a vertical picket gate passing, through a horizontal one dying — then the same logic with two polaroid filters and a lamp.
- The stadium-wave clip: spectators (particles) rising and sitting in place while the wave circles the ground — the perfect human analogy.
- The S-wave shadow-zone diagram: transverse shear waves stopping at the liquid outer core, with the seismographic shadow that mapped it.

**Worked example**

*Setup:* A transverse wave y(x, t) travels in the +x direction at 4.0 m/s with amplitude 0.05 m and wavelength 2.0 m along a rope. (a) Find the frequency and period. (b) For a snapshot at t = 0 with a crest at x = 1.0 m, determine the direction of motion of rope particles at x = 0.5 m (leading edge) and x = 1.5 m (trailing edge). (c) Find each particle's maximum speed and compare it with the wave speed.

1. (a) f = v/λ = 4.0/2.0 = 2.0 Hz; T = 0.5 s — the pattern advances one 2 m wavelength every half second.
2. (b) Method: the wave moves +x, so each particle is about to do what its LEFT neighbour... rather what the profile to its LEFT shows — equivalently, shift the snapshot slightly right and see where each particle must go.
3. At x = 0.5 m (ahead of the crest): the crest is approaching, so the particle is moving UP toward its coming maximum.
4. At x = 1.5 m (behind the crest): the crest has passed; the particle is moving DOWN toward the trough that follows.
5. (c) Particles execute SHM with ω = 2πf = 4π rad/s: v_max = Aω = 0.05 × 4π ≈ 0.63 m/s — perpendicular to travel.
6. Compare: particle speed (≤ 0.63 m/s, transverse) versus wave speed (4.0 m/s, longitudinal direction... along the rope's line): different directions, different magnitudes, different owners — the pattern outruns its dancers.

*Outcome:* The student computes f = 2 Hz and T = 0.5 s, assigns up/down particle velocities correctly by the shift-the-snapshot method, and contrasts v_max ≈ 0.63 m/s (particle, perpendicular) with 4.0 m/s (pattern, along travel).

**Real-world intuition**

- Polarized sunglasses cut glare because reflected light is partially polarized — a transverse-wave filter on your face.
- LCD screens sculpt images with switchable polarization filters — billions of transverse-wave gates per display.
- Guitar, violin, and piano strings carry transverse waves whose frequencies are the notes — music as transverse-wave engineering.
- Seismology's S-wave shadow zones revealed Earth's liquid outer core — transverse waves as planetary interior probes.
- Optical-fibre polarization control and radio antenna orientation (matching a transmitter's polarization) are everyday transverse-geometry engineering.

**Practice progression**

Item types: particle-velocity direction items from snapshots with stated travel direction, particle vs. wave speed computations and contrasts, polarization reasoning (what passes, what dies, what it proves), classification items (which waves are transverse, and how we know). Suggested item count: 10.

Begin with feature identification and particle-motion tracing, add velocity-map readings both travel directions, then particle/wave speed contrasts, ending with polarization logic and the S-wave/liquid-core argument.

**Assessment objectives**

Formats: snapshot-analysis tasks, computation set on particle kinematics, conceptual quiz on polarization and classification. Bloom alignment: Understand — students must explain the perpendicular choreography, read particle motion from wave diagrams, and deploy polarization as the transverse fingerprint.

Mastery signal: The student assigns particle velocity directions correctly from snapshots in both travel directions, separates particle from wave speed, and explains why sound cannot be polarized, at 80% accuracy or better.

**Teacher notes**

The choreography is the content: run the painted-particles animation until 'the pattern travels, the dancer stays' is boring, then teach the velocity-map skill explicitly with the shift-the-snapshot method — it is the domain's most examined diagram question. Polarization earns a live demonstration (rope through slots, then two polaroids); its longitudinal impossibility should be argued, not asserted, and banked as the light-is-transverse proof. The particle-speed-versus-wave-speed contrast in the worked example inoculates against a whole family of confusions. The S-wave/liquid-core story gives the geometry planetary stakes.

**Student notes**

Transverse means the medium moves ACROSS the travel line: crests and troughs are perpendicular extremes, and every particle does SHM in place, copying its upstream neighbour late. To find a particle's velocity from a snapshot, nudge the whole pattern slightly along the travel direction and watch where the particle must go — up ahead of an incoming crest, down behind it, fastest at the zero crossings, at rest on the crests. Keep two speeds apart: the particle's Aω (perpendicular) and the wave's v (along). Polarization is the transverse badge: filterable sideways choice — which sound, oscillating along its travel line, can never offer.

**Prerequisite graph**

- Requires: phys.wave.wave-properties
- Unlocks (future prerequisite links): phys.wave.wave-speed
- Cross-topic connections (graph cross-links): none
- Narrative: Transverse waves put SHM (phys.wave.shm) into perpendicular choreography under the wave vocabulary (phys.wave.wave-properties), and pair contrastively with longitudinal waves next (phys.wave.longitudinal-waves). Their string realization carries the wave-speed physics (phys.wave.wave-speed) and standing-wave music (phys.wave.standing-waves); polarization returns in optics (phys.opt) and electromagnetic waves (phys.em); S-wave seismology connects to astrophysical and planetary interiors (phys.astro).

**Teaching hints — review triggers**

- phys.wave.wave-properties

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one velocity-map reading in each travel direction, one particle/wave speed contrast, one polarization argument. Monthly, re-run the shift-the-snapshot method aloud and re-explain why sunglasses prove light transverse — the skill and the story that anchor the concept.

---

### Longitudinal Waves

*Concept ID: `phys.wave.longitudinal-waves` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Students will be able to define longitudinal waves by particle oscillation parallel to propagation, identify compressions and rarefactions as the wave's features, translate between displacement and pressure descriptions, explain why fluids carry only longitudinal waves, and analyze sound and seismic P-waves as the family's exemplars.

In longitudinal waves the particle displacement is parallel to the direction of wave propagation, forming compressions and rarefactions.

A longitudinal wave oscillates ALONG its travel direction: push-pull a stretched slinky and pulses of squeezed coils (compressions) and stretched coils (rarefactions) run down its length while each coil shuttles back and forth about home. Compressions and rarefactions replace crests and troughs as the features, with wavelength now the compression-to-compression distance — and the wave admits two equivalent descriptions whose interplay is the concept's finesse: a displacement picture (how far each particle sits from home) and a pressure/density picture (how squeezed each region is), a quarter wavelength out of step with each other — pressure extremes occur where displacement is ZERO, since maximum compression happens where neighbours have converged from both sides. Sound in air is the family's star: vibrating sources push air molecules into travelling compression-rarefaction trains (at conversational loudness, pressure wiggles of a few pascals on the 101 kPa atmosphere — hearing is astonishingly sensitive), and sound in fluids MUST be longitudinal because liquids and gases, lacking shear stiffness, cannot snap back sideways — they resist only compression, so only push-pull waves propagate. That rule powers the seismological classic: P-waves (longitudinal, faster, first to arrive) cross Earth's liquid outer core while transverse S-waves are stopped — the arrival-time gap and shadow zones together X-rayed the planet. Longitudinal geometry also explains what sound cannot do: with oscillation locked to the single travel direction, there is no sideways choice to filter — no polarization, the negative fingerprint distinguishing the family.

**Key ideas**

- Definition: particle oscillation parallel to propagation — push-pull, not side-to-side; the slinky's compression pulse is the icon.
- Features: compressions (squeezed, high pressure/density) and rarefactions (stretched, low) — wavelength runs compression to compression.
- Two descriptions, quarter-wave offset: displacement extremes sit at pressure ZEROS and vice versa — maximum squeeze where particles have converged, i.e. where displacement passes through zero.
- Sound is longitudinal: sources push air into compression trains; audible pressure amplitudes are pascals against the 101 kPa ambient — tiny ripples on a deep sea.
- Fluids carry only longitudinal waves: no shear stiffness → no transverse restoring force → push-pull is the only game in liquids and gases.
- Seismic P-waves: longitudinal, fastest, first-arriving, and able to cross the liquid outer core that blocks S-waves — the pair is Earth's CT scanner.
- No polarization: oscillation along the unique travel direction leaves nothing for a filter to select — the family's diagnostic absence.
- Same vocabulary throughout: v = fλ, amplitude, period all apply unchanged; only the oscillation geometry differs from transverse waves.

**Vocabulary**

- **longitudinal wave** — A wave whose particles oscillate parallel to the propagation direction — compression and rarefaction trains.
- **compression / rarefaction** — The squeezed (high-pressure) and stretched (low-pressure) regions that are the longitudinal wave's features.
- **displacement vs. pressure description** — Two equivalent wave pictures a quarter wavelength out of step: pressure extremes at displacement zeros.
- **P-wave** — The longitudinal seismic wave — fastest, first-arriving, able to cross liquids.

**Common misconceptions**

- *Misconception:* Air molecules travel from the speaker to the ear when sound is heard.
  *Correction:* Molecules shuttle micrometres about home while the compression PATTERN crosses the room at 343 m/s. What arrives at the ear is the pressure oscillation, not speaker-side air — the duck-on-ripples lesson in longitudinal costume.
- *Misconception:* Longitudinal waves have crests and troughs like any wave drawing.
  *Correction:* Their features are compressions and rarefactions along the travel line. The familiar sinusoid drawn for sound is a GRAPH of pressure or displacement versus position — a plot, not a picture of sideways motion; mistaking the graph for the geometry is the classic error.
- *Misconception:* Maximum pressure occurs where the particles are displaced farthest.
  *Correction:* The two descriptions are a quarter wavelength out of step: pressure peaks where displacement is ZERO — where neighbours from both sides have converged. Displacement extremes are pressure-neutral. Reading one curve as the other misplaces every feature by λ/4.
- *Misconception:* Sound can be polarized with a fine enough filter.
  *Correction:* Polarization requires perpendicular oscillation directions to choose among; longitudinal oscillation is locked along the travel line, offering no choice. Sound's unpolarizability is not a technology gap but the family's defining geometry.

**Common mistakes in practice**

- Reading the sound sinusoid as sideways particle motion.
- Placing pressure maxima at displacement maxima.
- Sending molecules across the room with the sound.
- Granting sound polarization.
- Swapping the P/S properties (speed order, liquid transmission).

**Visual teaching opportunities**

- The slinky push-pull demonstration (live, then slow-motion): compression pulses travelling while a marked coil shuttles in place.
- A dual-curve panel: displacement s(x) and pressure Δp(x) plotted together with the λ/4 offset highlighted and the converging-neighbours argument illustrated at one compression.
- A loudspeaker-cone animation driving alternating compression (dark bands) and rarefaction (light bands) shells across a room, with a molecule's tiny shuttle inset.
- The P-wave/S-wave planetary cross-section: P-waves refracting through the liquid core, S-waves stopping at it — arrival-time seismograms beside the picture.
- A 'no-polarization' contrast strip: rope wave through slots (filtered) beside a slinky compression pulse through the same slots (unaffected).

**Worked example**

*Setup:* A loudspeaker emits a 220 Hz tone in air (v = 343 m/s). (a) Find the wavelength and the distance between a compression and the nearest rarefaction. (b) The same tone enters water (v = 1480 m/s) — find the new wavelength. (c) An earthquake's P-waves (6.0 km/s) and S-waves (3.5 km/s) reach a station 42 s apart — how far is the source?

1. (a) λ = v/f = 343/220 ≈ 1.56 m; compression-to-rarefaction is half a wavelength: ≈ 0.78 m.
2. (b) Frequency stays source-loyal: λ_water = 1480/220 ≈ 6.7 m — the same note, four times longer in water.
3. (c) Set distance d: arrival times are d/3.5 and d/6.0 (km, s); the gap is d(1/3.5 − 1/6.0) = d × 0.119 s/km.
4. Solve: d = 42/0.119 ≈ 353 km — one station's time gap converts to a source distance.
5. Note the method's power: three stations' circles intersect at the epicentre — the routine of every seismic network, run on the longitudinal/transverse speed difference.
6. Collect the theme: all three parts used only v = fλ and arrival bookkeeping — the shared wave vocabulary doing longitudinal work.

*Outcome:* The student computes λ = 1.56 m (half-spacing 0.78 m), the water wavelength 6.7 m with f fixed, and the 353 km epicentral distance from the P-S gap, citing the triangulation extension.

**Real-world intuition**

- All of acoustics — speech, music, hearing — is longitudinal pressure waves in air; microphone and eardrum alike read the Δp trace.
- Medical ultrasound sends megahertz longitudinal waves into tissue, imaging from the echoes of compression pulses.
- Seismic P-waves trigger earthquake early-warning systems: their first arrival buys seconds before the destructive S and surface waves.
- Sonar and echo-sounding map oceans with underwater compression waves at 1480 m/s.
- Pressure-wave hammer in pipelines ('water hammer') is a destructive longitudinal pulse plumbers and engineers design against.

**Practice progression**

Item types: wavelength/feature-spacing computations for sound in various media, displacement-pressure translation items (locate pressure extremes on displacement curves), P-S arrival-gap distance problems, classification and capability items (why fluids are longitudinal-only; why no polarization). Suggested item count: 10.

Begin with v = fλ computations and feature spacings, add the two-description translation, then seismic gap problems, ending with geometry-capability arguments.

**Assessment objectives**

Formats: computation set, dual-curve interpretation tasks, conceptual geometry quiz. Bloom alignment: Understand — students must explain the parallel choreography, translate between displacement and pressure pictures, and argue the fluid and polarization consequences of the geometry.

Mastery signal: The student computes wavelengths and feature spacings, places pressure extremes at displacement zeros, and explains both the fluids-longitudinal-only rule and sound's unpolarizability, at 80% accuracy or better.

**Teacher notes**

The slinky is non-negotiable apparatus — mark one coil and let students watch it shuttle. The graph-versus-geometry confusion (sinusoids drawn for sound read as sideways motion) should be raised and defused explicitly with the dual-curve panel; the λ/4 offset argument (converging neighbours) is the concept's one subtle inference and rewards a careful walkthrough. Pair the fluids-longitudinal-only rule with its seismological payoff immediately — the planet's core as evidence gives the geometry gravity. Keep contrasting against the transverse concept: same vocabulary, different choreography, opposite polarization verdict.

**Student notes**

Longitudinal means push-pull along the travel line: compressions and rarefactions instead of crests and troughs, wavelength between like features, and every particle shuttling in place. Hold the two pictures with their λ/4 offset — squeeze is greatest where displacement is zero, because neighbours converged there. Fluids only do push-pull (no shear), so sound in air and water is longitudinal and CANNOT be polarized. And keep the seismic pair straight: P (longitudinal, fast, crosses liquids, arrives first), S (transverse, slower, blocked by the core).

**Prerequisite graph**

- Requires: phys.wave.wave-properties
- Unlocks (future prerequisite links): phys.wave.wave-speed
- Cross-topic connections (graph cross-links): none
- Narrative: Longitudinal waves complete the geometry pair with transverse waves (phys.wave.transverse-waves) under the shared vocabulary (phys.wave.wave-properties), with pressure fundamentals from fluids (phys.mech.pressure-fluids). Sound (phys.wave.sound-waves) is the family's flagship, wave speed in media follows (phys.wave.wave-speed), and the P/S seismic pairing recurs wherever planetary interiors are probed (phys.astro).

**Teaching hints — review triggers**

- phys.wave.wave-properties

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one feature-spacing computation, one displacement-pressure translation, one P-S gap problem. Monthly, re-argue the two geometry verdicts — why fluids are longitudinal-only and why sound can't be polarized — the two inferences that certify understanding.

---

### Wave Speed and the Wave Equation

*Concept ID: `phys.wave.wave-speed` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Students will be able to state that wave speed is set by the medium's restoring and inertial properties, apply v = √(T/μ) for stretched strings, use representative sound speeds across media, combine medium speed with v = fλ in two-step problems, and explain speed changes at boundaries and with temperature.

Wave speed is determined by the medium's properties; the wave equation relates displacement to position and time.

How fast a wave travels is the medium's decision, and the deciding committee always has two members: a restoring property (how hard the medium snaps back — tension, stiffness, bulk modulus) and an inertial property (how much mass must be moved — linear density, volume density). Speed rises with stiffness and falls with inertia, and every mechanical wave-speed formula is this one story in local costume: for a stretched string, v = √(T/μ) — tension over mass-per-length under a square root, so quadrupling tension doubles the speed (the guitarist's tuning physics: tighter strings, faster waves, higher notes) and thicker strings are slower (why bass strings are wound fat); for sound, v = √(elastic modulus/density), giving the canonical ladder ~343 m/s in air (20 °C), ~1480 m/s in water, ~5000+ m/s in steel — denser media are usually FASTER for sound because their enormous stiffness outvotes their inertia, the resolution of the topic's favourite paradox. Temperature moves the air number (≈ +0.6 m/s per °C, via faster molecules), which matters to musicians tuning in cold halls and to sound ranging. Two disciplines complete the concept: wave speed is amplitude-independent (linear regime) and frequency-independent in non-dispersive media — the pattern's pace belongs to the medium, not to how hard or how often you shake it — and at boundaries the medium changes, so v changes, f holds loyal to the source, and λ = v/f adjusts, the bookkeeping that becomes refraction. The lightning-thunder gap (light ~instant, sound ~3 s/km) is the concept's everyday laboratory.

**Key ideas**

- Universal recipe: v = √(restoring/inertia) — stiffness accelerates, mass retards; every mechanical wave-speed formula instantiates it.
- Strings: v = √(T/μ) — tension T in newtons over linear density μ in kg/m; ×4 tension → ×2 speed; heavier strings slower (bass strings are wound to add μ).
- Sound ladder: ~343 m/s in air (20 °C), ~1480 m/s in water, ~5000–6000 m/s in steel — stiffness dominates density, so 'denser is faster' for sound (the paradox resolved by the modulus's decisive vote).
- Temperature: air's sound speed grows ≈ 0.6 m/s per °C (v ≈ 331 + 0.6T_C m/s) — faster molecules relay compressions sooner.
- Speed is amplitude- and (in non-dispersive media) frequency-independent: shout or whisper, bass or treble — one arrival time; the medium owns the pace.
- Boundary bookkeeping: crossing media changes v; f stays with the source; λ = v/f adjusts — the wave-properties division of labour, now with the medium physics underneath.
- Two-step problem pattern: medium properties → v (square-root formula), then v and f → λ (or timing) — the domain's standard computation chain.
- Everyday laboratory: lightning-to-thunder at ~3 s per kilometre; echo timing; the tap-the-rail-hear-it-twice classic.

**Vocabulary**

- **wave speed (medium-set)** — The propagation speed determined by the medium's restoring and inertial properties: v = √(restoring/inertia).
- **linear density μ** — A string's mass per unit length (kg/m) — the inertia term in v = √(T/μ).
- **bulk/elastic modulus** — A medium's compressional stiffness — the restoring term in sound's speed.
- **non-dispersive medium** — One in which wave speed is frequency-independent, so signals keep their shape (air for audible sound, to excellent approximation).

**Common misconceptions**

- *Misconception:* Sound travels slower in dense media — density means resistance.
  *Correction:* Usually the opposite: water and steel are denser than air AND far faster, because their stiffness (bulk/elastic modulus) grows even more than their density. The speed is a ratio's square root — √(stiffness/density) — and stiffness casts the deciding vote across the air-water-steel ladder.
- *Misconception:* Turning up the amplitude or frequency makes the wave travel faster.
  *Correction:* In the linear regime speed belongs to the medium alone: loud and soft arrive together, and (absent dispersion) bass and treble do too — a concert heard at the back would otherwise smear into chaos. Amplitude carries energy; frequency sets wavelength; neither touches v.
- *Misconception:* Doubling a string's tension doubles its wave speed.
  *Correction:* The square root intervenes: v = √(T/μ), so doubling T multiplies v by √2 ≈ 1.41; doubling the speed needs FOUR times the tension. Tuning pegs work in square roots — which is why small turns make semitones.
- *Misconception:* When a wave slows at a boundary, its frequency drops.
  *Correction:* Frequency is locked to the source — wavefronts cannot pile up or vanish at a boundary in steady state. The wavelength contracts instead: λ = v/f with f fixed. (Pitch doesn't change under water; colour doesn't change in glass.)

**Common mistakes in practice**

- Ranking sound speeds by density alone.
- Linear-scaling v with tension.
- Grams-per-metre left unconverted in μ.
- Letting amplitude or frequency set the speed.
- Changing f instead of λ at a boundary.
- Confusing wave speed on the string with the sound speed in air for the same note.

**Visual teaching opportunities**

- The two-member committee graphic: a spring (restoring) and a weight (inertia) voting on v = √(restoring/inertia), recostumed for string, air, water, steel.
- A live string demonstration: pulse timed along a cord at two tensions and along a heavier cord — the √ scaling measured with a stopwatch or slow-motion camera.
- The sound-speed ladder bar chart (air, water, steel) with stiffness and density values annotated, resolving the density paradox numerically.
- The lightning-thunder counting rule illustrated: flash, three seconds per kilometre, rumble — the concept's field method.
- A boundary animation: wavefronts crossing into a slower medium, spacing (λ) compressing while the crossing rate (f) is counted constant.

**Worked example**

*Setup:* A guitar string of linear density μ = 4.0 × 10⁻⁴ kg/m... check realism: use μ = 4.0 g/m = 4.0 × 10⁻³ kg/m under tension T = 80 N. (a) Find the wave speed on the string. (b) The string plays 220 Hz — find the wavelength on the string. (c) What tension would raise the same string's wave speed by 12% (two semitones ≈ ×1.122 in frequency at fixed length)? (d) The 220 Hz sound then travels through air at 343 m/s — find its wavelength in air and explain why it differs from (b).

1. (a) v = √(T/μ) = √(80/0.004) = √20,000 ≈ 141 m/s — string waves are fast but far below sound-in-steel.
2. (b) On the string: λ = v/f = 141/220 ≈ 0.64 m — set by the string's own medium properties.
3. (c) Speed ×1.122 needs tension ×1.122² ≈ ×1.26: T' ≈ 80 × 1.26 ≈ 101 N — square-root law run backwards; tuning two semitones costs 26% more tension.
4. (d) In air: λ_air = 343/220 ≈ 1.56 m — same frequency (the source's 220 Hz), different medium, different speed, different wavelength.
5. Read the structure: one f, two media, two v's, two λ's — the source-medium-bookkeeping division with real numbers.
6. Reality checks: 141 m/s and 0.64 m suit a guitar's scale; the air wavelength (1.56 m) matches the earlier sound example at this frequency ✓.

*Outcome:* The student computes 141 m/s and 0.64 m on the string, inverts the square-root law to 101 N for a 12% speed rise, and contrasts the 1.56 m air wavelength with the string wavelength under one shared frequency.

**Real-world intuition**

- Stringed-instrument design and tuning is v = √(T/μ) in luthiery: tension pegs, wound bass strings, scale lengths.
- Lightning ranging (3 s/km), sonar depth-finding, and echo location all convert medium speed into distance.
- Non-destructive testing times ultrasonic pulses through metal — speed changes reveal cracks and porosity.
- Earthquake early warning exploits P-wave speed to outrun the slower destructive waves electronically.
- Temperature-compensated tuning: orchestras retune as halls warm because air's sound speed drifts 0.6 m/s per °C.

**Practice progression**

Item types: v = √(T/μ) computations and inversions (find T or μ), two-step chains (medium → v → λ or timing), medium-comparison and temperature items (air/water/steel; cold-hall tuning), boundary bookkeeping problems (one f, two media tables). Suggested item count: 12.

Begin with direct string computations, add square-root inversions, then cross-media chains and temperature corrections, ending with boundary tables and echo/lightning field problems.

**Assessment objectives**

Formats: computation set, comparative-reasoning quiz, field-method problems (echo, thunder, rail-tap). Bloom alignment: Apply — students must run the medium formulas with square-root discipline and chain them through v = fλ across realistic scenarios.

Mastery signal: The student computes and inverts v = √(T/μ), ranks media correctly with the stiffness-over-density argument, and completes one boundary table, at 80% accuracy or better.

**Teacher notes**

Sell the universal recipe before any formula: every wave speed is a stiffness-inertia vote under a square root, and students who hold that template stop memorizing formula zoos. The density paradox (steel beats air) must be confronted numerically — show the moduli. Enforce square-root discipline with the tuning inversion (×1.26 tension for two semitones). The one-f-two-media table from the worked example is the boundary bookkeeping in its clearest form and pre-pays refraction. Field methods (thunder counting, echoes) give homework that happens outdoors.

**Student notes**

Ask the medium two questions: how stiff (restoring) and how heavy (inertia)? Speed is their ratio's square root — strings: √(T/μ); sound: √(modulus/density). Expect the ladder air ≪ water ≪ steel (stiffness wins), +0.6 m/s per °C in air, and square roots in every scaling (×4 tension for ×2 speed). Amplitude and frequency don't get a vote on v. At boundaries run the table: f fixed, v new, λ = v/f adjusted.

**Prerequisite graph**

- Requires: phys.wave.transverse-waves, phys.wave.longitudinal-waves
- Unlocks (future prerequisite links): phys.wave.superposition
- Cross-topic connections (graph cross-links): none
- Narrative: Wave speed grounds the vocabulary's v (phys.wave.wave-properties) in medium physics — string tension from mechanics (phys.mech.tension), compressional stiffness from elasticity and fluids (phys.mech.stress-strain, phys.mech.pressure-fluids), with sound's adiabatic character noted in thermodynamics (phys.therm.thermodynamic-processes). It sets the frequencies of standing waves (phys.wave.standing-waves), underlies sound (phys.wave.sound-waves), and its boundary bookkeeping becomes refraction in optics (phys.opt).

**Teaching hints — review triggers**

- phys.wave.transverse-waves
- phys.wave.longitudinal-waves

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one string computation with an inversion, one media ranking with the stiffness argument, one boundary table. Monthly, restate the universal recipe and re-derive the two costume formulas from it — one template, no zoo.

---

### Superposition Principle

*Concept ID: `phys.wave.superposition` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Students will be able to state the superposition principle (overlapping waves add displacements algebraically), construct resultant waveforms graphically from overlapping pulses, show that waves pass through each other unchanged, identify constructive and destructive addition, and state the linearity condition under which the principle holds.

The superposition principle states that the resultant displacement is the algebraic sum of displacements of individual waves.

When two waves occupy the same place at the same time, the medium does something remarkably simple: it adds. The superposition principle states that the resultant displacement at any point and instant is the algebraic sum of the individual waves' displacements — signs included, so two upward pulses meeting produce a momentary double-height pulse (constructive addition) while an upward meeting an equal downward produces a flat instant of cancellation (destructive) in which the medium is momentarily straight yet still moving, the energy hiding in velocity. The principle's quiet companion is wave independence: after overlapping, waves pass through each other completely unchanged — each pulse emerges with its own shape, speed, and direction as if the encounter never happened, which is why a room full of crossing conversations, WiFi, and music remains intelligible: waves interpenetrate without collision damage, unlike particles. Graphical superposition is the working skill (align the pulses at the chosen instant, add ordinates point by point, signs respected), and the principle holds wherever the medium responds LINEARLY — restoring force proportional to displacement — which is excellent for sound at ordinary loudness, light in vacuum, and gentle water ripples, and fails honestly at extremes (shock waves, breaking surf, nonlinear optics) where waves do distort each other. Superposition is the domain's engine of consequences: run it on continuous waves and interference emerges; run it on counter-propagating waves in a bounded medium and standing waves; on nearly-equal frequencies, beats — the next three concepts are this one principle wearing three costumes.

**Key ideas**

- The principle: overlapping waves add displacements algebraically, point by point and instant by instant — signs included.
- Constructive addition: like-signed displacements reinforce (two +A pulses → momentary 2A); destructive: opposite signs cancel (+A meets −A → momentary zero).
- The cancellation instant is not death: the medium is flat but MOVING — energy resides in velocity, and both pulses re-emerge intact.
- Wave independence: after overlap, each wave proceeds unchanged in shape, speed, and direction — waves interpenetrate; particles collide.
- Graphical method: freeze the instant, align the two profiles, sum ordinates with signs — the constructions exam questions are made of.
- Validity condition: linearity of the medium (restoring ∝ displacement) — superb for ordinary sound, light, gentle ripples; breaks for shocks, breakers, and extreme intensities.
- The consequence engine: interference (continuous waves), standing waves (counter-propagating), and beats (near-equal frequencies) are all superposition specialized — one principle, three upcoming costumes.

**Vocabulary**

- **superposition principle** — Overlapping waves add displacements algebraically at each point and instant; valid in linear media.
- **constructive / destructive addition** — Reinforcement of like-signed displacements versus cancellation of opposite-signed ones.
- **wave independence** — Waves pass through each other unchanged in shape, speed, and direction after overlapping.
- **linearity** — The medium condition (restoring ∝ displacement) under which superposition holds exactly.

**Common misconceptions**

- *Misconception:* When waves collide they bounce off or destroy each other like objects.
  *Correction:* Waves are patterns, not bodies: they overlap, add while coincident, and pass through unchanged — both pulses emerge with their original shapes and directions. 'Collision' is particle vocabulary; waves interpenetrate.
- *Misconception:* When a crest cancels a trough, the waves and their energy are destroyed.
  *Correction:* The cancellation is one instant at one place: the medium is momentarily flat but moving, the energy stored in velocity, and both pulses re-emerge intact beyond the overlap. Even in sustained destructive interference, energy is not destroyed but redistributed to the constructive regions.
- *Misconception:* Superposition means waves blend into one merged wave permanently.
  *Correction:* The sum describes the medium only WHILE the waves overlap; the constituent waves retain their identities throughout and separate afterwards. Superposition is bookkeeping of coincidence, not fusion.
- *Misconception:* Superposition is an exact law of all waves everywhere.
  *Correction:* It is exact only for linear media. Crank the amplitude — shock waves, breaking surf, high-power laser optics — and waves genuinely distort each other. The principle's domain is wide (all of everyday acoustics and optics) but honestly bounded.

**Common mistakes in practice**

- Adding magnitudes while ignoring signs.
- Letting pulses reflect off or permanently alter each other.
- Declaring energy destroyed at cancellation instants.
- Merging the constituent waves into one permanent hybrid.
- Applying the principle to visibly nonlinear situations without comment.

**Visual teaching opportunities**

- The two-pulse meeting animation, run twice: like pulses (momentary double height) and opposite pulses (momentary flatness with velocity arrows shown), both ending with unchanged pulses departing.
- A frame-by-frame graphical-addition worksheet: five instants of an overlap, students summing ordinates to draw each resultant.
- The 'flat but moving' close-up: the cancellation instant with the medium's velocity field displayed — energy visible in motion when invisible in shape.
- A crossing-beams demonstration: two flashlight beams or laser pointers intersecting with neither deflected — wave independence in the air of the classroom.
- A linearity-limit gallery: gentle ripples adding cleanly beside breaking surf and a sonic-boom N-wave — where the principle retires.

**Worked example**

*Setup:* Two pulses travel toward each other on a string at 2.0 m/s: a rectangular pulse of height +2.0 cm and width 2.0 m (leading edge at x = 4.0 m moving right) and one of height −1.0 cm and width 2.0 m (leading edge at x = 8.0 m moving left) at t = 0. Sketch/describe the string at t = 1.0 s (full overlap) and t = 2.5 s (after separation), and account for the energy at full overlap.

1. Locate at t = 1.0 s: each pulse has moved 2.0 m toward the other; both now occupy x = 6.0–8.0 m... verify: right-mover spans 6.0–8.0, left-mover spans 6.0–8.0 — full overlap.
2. Add algebraically in the overlap: +2.0 + (−1.0) = +1.0 cm — the string shows a single rectangular hump of height 1.0 cm over x = 6.0–8.0 m.
3. Note what the sum hides: the +2 and −1 pulses both still exist within that modest hump — superposition is their coincident bookkeeping.
4. At t = 2.5 s: each has moved 5.0 m from start; the +2.0 cm pulse now spans x = 9.0–11.0 m moving right, the −1.0 cm pulse spans x = 1.0–3.0 m moving left — both with ORIGINAL heights and shapes: independence demonstrated.
5. Energy at overlap: the displacement field alone (height 1.0) underestimates the stored energy; the missing share sits in the string's transverse velocities within the overlap — total energy is conserved throughout.
6. Extract the method: locate each pulse at the instant, add ordinates with signs in the overlap, and never expect the encounter to alter the travellers.

*Outcome:* The student constructs the +1.0 cm overlap resultant, restores both original pulses after separation, and places the 'missing' overlap energy in the medium's velocity — the three-part core of superposition.

**Real-world intuition**

- Noise-cancelling headphones synthesize the anti-phase wave so superposition erases the drone at the eardrum — destructive addition as a product.
- Every crowded acoustic space works because sound waves interpenetrate: dozens of conversations cross a room without scrambling each other.
- Radio, WiFi, and cellular signals share the air by superposition; receivers filter frequencies from the summed field.
- Audio mixing IS superposition: a recording is the algebraic sum of tracks, and speakers reproduce the summed waveform.
- Rogue ocean waves arise when swells superpose constructively — momentary giants from the chance alignment of trains.

**Practice progression**

Item types: graphical pulse-addition constructions at specified instants, constructive/destructive identification and resultant-amplitude items, post-overlap independence questions (shapes, speeds, directions afterwards), conceptual items on cancellation energy and linearity limits. Suggested item count: 10.

Begin with like-pulse additions, add opposite and partial overlaps, then asymmetric-shape constructions, ending with energy accounting and validity-boundary judgments.

**Assessment objectives**

Formats: graphical construction tasks, conceptual short answers, multi-instant sequence problems. Bloom alignment: Apply — students must execute signed graphical addition at arbitrary instants and deploy the independence and energy principles on unfamiliar pulse pairs.

Mastery signal: The student constructs correct resultants at overlap instants (signs respected), restores the original pulses afterwards, and explains the cancellation-instant energy, at 80% accuracy or better.

**Teacher notes**

Two demonstrations carry the concept: the two-pulse meeting (run both polarities; freeze the cancellation frame and ask 'where is the energy?') and crossing light beams (independence in mid-air). The graphical-addition skill must be drilled on paper — exam constructions reward the point-by-point habit, signs first. Name the linearity condition honestly and give one broken case (breaking surf); students trust bounded laws more. Close by advertising the three costumes ahead — interference, standing waves, beats — so the principle is felt as the domain's engine, not one more fact.

**Student notes**

One rule: add the displacements, signs included, wherever and whenever waves overlap — then let each wave leave exactly as it arrived. Momentary flatness is not destruction: the medium is moving, the energy is in velocity, and both pulses come back. Work constructions frame by frame: locate, align, sum ordinates. Trust the principle for ordinary sound and light; suspect it for shocks and breakers. Everything in the next three concepts is this rule applied.

**Prerequisite graph**

- Requires: phys.wave.wave-speed
- Unlocks (future prerequisite links): phys.wave.interference
- Cross-topic connections (graph cross-links): none
- Narrative: Superposition acts on the travelling waves built so far (phys.wave.wave-properties, phys.wave.wave-speed) and powers the domain's remaining machinery: interference (phys.wave.interference), standing waves (phys.wave.standing-waves), and beats (phys.wave.beats) are its three specializations. The same additivity underlies AC circuit analysis and field superposition in electromagnetism (phys.em) and, transformed, the amplitude addition of quantum mechanics (phys.qm).

**Teaching hints — review triggers**

- phys.wave.wave-speed

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one like-pulse and one opposite-pulse construction, one independence question, one cancellation-energy explanation. Monthly, re-run the frozen-flat frame argument aloud — 'flat but moving' is the concept's deepest three words.

---

### Wave Interference

*Concept ID: `phys.wave.interference` · Difficulty: proficient · Bloom level: analyze · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Students will be able to explain interference as sustained superposition of coherent waves, apply the path-difference conditions (Δd = nλ constructive, (n+½)λ destructive), locate maxima and minima in two-source patterns, explain the roles of coherence and comparable amplitudes, and connect energy redistribution to the pattern.

Wave interference is the superposition of two or more waves producing regions of reinforcement or cancellation.

Interference is superposition made geography: when two coherent sources — same frequency, constant phase relationship — fill a region with waves, the addition rule stamps a stable spatial pattern onto it, with locations of permanent reinforcement and permanent cancellation. The organizing quantity is path difference: at any point, the waves have travelled different distances from their sources, and the difference Δd decides their arrival phase — Δd = nλ (whole wavelengths) delivers crest-on-crest, constructive interference and double amplitude (quadruple intensity, since intensity goes as amplitude squared); Δd = (n + ½)λ delivers crest-on-trough, destructive interference and, for equal amplitudes, silence or darkness. The two-source pattern — alternating loud/soft hyperbolic bands fanning out from a speaker pair, or bright/dark fringes from twin slits — is the classic laboratory realization, walked by students crossing a room with two speakers playing one tone. The fine print carries the physics: coherence is mandatory (independent sources drift in relative phase, washing the pattern into uniform average brightness — why two lamps don't make fringes), equal amplitudes make the deepest nulls, and energy is never destroyed — the dead zones' missing energy is exactly the excess delivered to the loud zones: interference redistributes, conservation audits. Historically, interference is the wave phenomenon: Young's double-slit fringes (1801) settled light's wave nature, and the same logic now runs noise-cancelling headphones, anti-reflective lens coatings (thin-film interference), gravitational-wave interferometers, and the iridescence of soap bubbles and butterfly wings.

**Key ideas**

- Interference = sustained, spatially stable superposition of coherent waves — the addition rule frozen into a standing geography of loud and quiet.
- Path difference decides phase: Δd = nλ → in step → constructive (amplitude 2A, intensity 4× one source); Δd = (n + ½)λ → opposite → destructive (zero for equal amplitudes).
- Two-source pattern: alternating maxima and minima along hyperbolic bands — the central line (Δd = 0) always constructive for in-phase sources.
- Coherence is the licence: constant relative phase (same frequency, locked sources) — independent sources drift and the pattern washes out to uniform average.
- Equal amplitudes deepen nulls: unequal sources leave residual sound/light at the 'dark' locations — cancellation quality is an amplitude match.
- Energy is redistributed, not destroyed: minima's deficit = maxima's surplus; the average over the pattern equals the incoherent sum — conservation audits interference.
- Flagship realizations: Young's double slit (light's wave nature, 1801), speaker-pair walks, thin-film colours (soap bubbles, oil slicks, AR coatings), noise cancellation, LIGO.

**Vocabulary**

- **interference** — The stable spatial pattern of reinforcement and cancellation produced by sustained superposition of coherent waves.
- **path difference Δd** — The difference in travel distances from two sources to a point — the quantity that sets arrival phase.
- **constructive / destructive conditions** — Δd = nλ → maxima; Δd = (n + ½)λ → minima (in-phase sources).
- **coherence** — A constant phase relationship between sources — the requirement for a stable pattern.
- **fringe** — One band of the alternating maxima/minima pattern (bright/dark in light, loud/quiet in sound).

**Common misconceptions**

- *Misconception:* Destructive interference destroys the waves' energy.
  *Correction:* The energy missing from the quiet bands appears in the loud bands — the pattern's spatial average matches the no-interference total. Interference is a redistribution ledger that conservation audits exactly; nothing is annihilated.
- *Misconception:* Any two sources of the same kind will produce an interference pattern.
  *Correction:* A STABLE pattern needs coherence — constant relative phase, hence locked frequencies. Two independent lamps or singers drift in phase millions of times a second; the fringes exist momentarily but wash out to uniformity faster than any eye or ear can follow.
- *Misconception:* The bright fringes are where the waves arrive with more energy each.
  *Correction:* Each wave arrives everywhere with its ordinary amplitude; brightness comes from ADDING IN STEP — amplitude 2A gives intensity 4×, paid for by the dark bands' 0. The geometry of arrival phase, not the waves' local strength, draws the pattern.
- *Misconception:* Destructive interference requires the waves to have travelled equal distances.
  *Correction:* Equal paths (Δd = 0) give CONSTRUCTIVE interference for in-phase sources — the central maximum. Destruction needs a half-wavelength offset: Δd = λ/2, 3λ/2, … — the half-integer family, not the equal-path line.

**Common mistakes in practice**

- Assigning destruction to equal paths (Δd = 0).
- Forgetting to compare Δd with the CURRENT λ after retuning.
- Predicting stable fringes from incoherent sources.
- Declaring energy destroyed at minima.
- Ignoring amplitude mismatch when promising perfect silence.
- Mixing the in-phase conditions with the anti-phase-source case without flagging the swap.

**Visual teaching opportunities**

- The two-source ripple-tank overhead: circular wavefronts overlapping into visible hyperbolic bands of churn and calm — the pattern before any formula.
- A path-difference geometry diagram: one field point, two source distances, Δd highlighted, with the nλ / (n+½)λ verdict table beside it.
- The speaker-pair classroom walk: students crossing the room mapping loud and quiet bands with their ears, then overlaying the predicted hyperbolae.
- Young's double-slit fringe photograph beside its intensity plot — history's decisive wave evidence, annotated.
- A thin-film iridescence gallery (soap bubble, oil slick, AR-coated lens) with the front/back-surface path-difference cartoon.
- An energy-audit bar chart: intensity across the pattern averaging exactly to the two-source incoherent sum.

**Worked example**

*Setup:* Two in-phase speakers 3.0 m apart play 686 Hz in air (v = 343 m/s). A listener stands 4.0 m directly in front of speaker A (so distances are: from A, 4.0 m; from B, 5.0 m). (a) Find the wavelength and the path difference. (b) Loud or quiet at the listener's spot? (c) The frequency is now tuned downward — find the lowest frequency making that spot destructively quiet. (d) State two practical reasons the quiet is imperfect.

1. (a) λ = v/f = 343/686 = 0.50 m; geometry gives d_A = 4.0 m, d_B = 5.0 m (3-4-5 triangle), so Δd = 1.0 m.
2. (b) Test against λ: Δd/λ = 1.0/0.50 = 2 — a whole number: constructive. The listener stands in a LOUD band (amplitude doubled, intensity quadrupled versus one speaker).
3. (c) Destructive needs Δd = (n + ½)λ: the longest such λ is Δd/(½) = 2.0 m → f = 343/2.0 ≈ 172 Hz — the lowest quiet-making frequency; the next (n = 1: λ = 2/3 m) is ~515 Hz.
4. (d) Imperfection sources: the speakers' amplitudes differ at the listener (unequal distances → unequal loudness → shallow null), and room reflections add extra coherent paths that fill the silence.
5. Method summary: geometry → Δd; Δd/λ integer or half-integer → verdict; retuning f moves λ and slides the pattern — the three-step routine of every interference problem.
6. Energy note: the 4× intensity here is financed by quiet bands elsewhere in the room — conservation's audit passes.

*Outcome:* The student computes λ = 0.50 m and Δd = 1.0 m, rules the spot constructive (n = 2), retunes to 172 Hz for destruction, and names amplitude mismatch and reflections as the real-world null-spoilers.

**Real-world intuition**

- Noise-cancelling headphones manufacture Δd = λ/2-equivalent anti-phase sound — engineered destructive interference at the eardrum.
- Anti-reflective lens and solar-panel coatings tune thin-film thickness so reflected waves cancel — interference as optical engineering.
- Soap-bubble, oil-slick, and butterfly-wing iridescence are thin-film interference sweeping through colours with thickness and angle.
- LIGO detects gravitational waves as sub-proton-width shifts in an interference pattern — the principle at its most precise.
- Concert-hall acoustics and stadium PA design fight dead spots created by speaker-pair interference; radio broadcasters manage the same physics between towers.

**Practice progression**

Item types: path-difference verdicts (constructive/destructive/neither) from geometries, retuning and re-positioning problems (find f or the position for a chosen verdict), coherence and amplitude-match conceptual items, energy-redistribution audits and application explanations (headphones, coatings). Suggested item count: 12.

Begin with verdict computations from given distances, add geometric setups (3-4-5 and beyond), then retuning inversions, ending with coherence reasoning and application analyses.

**Assessment objectives**

Formats: computation-and-verdict set, geometric interference problems, conceptual quiz on coherence and energy. Bloom alignment: Analyze — students must dissect two-source geometries into path differences, apply the phase conditions, and reason about coherence and energy redistribution beyond formula substitution.

Mastery signal: The student delivers correct verdicts from geometry, inverts the conditions for frequency or position, and explains both the coherence requirement and the energy audit, at 80% accuracy or better.

**Teacher notes**

Let students HEAR it first: the two-speaker walk converts interference from diagram to experience, and the imperfect nulls open the amplitude-match and reflection discussions naturally. The path-difference verdict routine (geometry → Δd → divide by λ → integer/half-integer) should be drilled as a three-step reflex. Coherence deserves its own moment — the two-lamps question is the discriminator — and the energy audit should be computed once explicitly to retire 'destroyed energy' permanently. Young's 1801 slit story gives the concept its historical weight; thin films connect it to every rainbow-slicked puddle on the walk home.

**Student notes**

Interference questions are geometry first: find both distances, take the difference, divide by λ. Whole number → loud/bright; half-odd → quiet/dark (for in-phase sources — and note the equal-path centre line is always LOUD). Demand coherence before predicting any stable pattern, and expect real nulls to be shallow when amplitudes mismatch. Never write off the missing energy: it is banked in the maxima. The whole topic is superposition with a map.

**Prerequisite graph**

- Requires: phys.wave.superposition
- Unlocks (future prerequisite links): phys.opt.youngs-experiment, phys.wave.beats, phys.wave.standing-waves
- Cross-topic connections (graph cross-links): none
- Narrative: Interference is superposition (phys.wave.superposition) organized by path geometry, and it feeds directly into standing waves (phys.wave.standing-waves — interference of counter-propagating waves) and beats (phys.wave.beats — interference in time rather than space). Young's slits and thin films carry it into optics (phys.opt); interferometry into precision measurement; and the amplitude-addition logic returns transformed in quantum mechanics (phys.qm).

**Teaching hints — review triggers**

- phys.wave.superposition

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one geometry-verdict problem, one retuning inversion, one coherence explanation. Monthly, re-run the three-step verdict routine aloud and re-tell the energy audit — the routine solves the problems; the audit answers the deep question.

---

### Standing Waves

*Concept ID: `phys.wave.standing-waves` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Students will be able to explain standing waves as interference of counter-propagating waves, identify nodes and antinodes, derive the harmonic series for strings fixed at both ends (f_n = nv/2L) and for open and closed air columns, compute allowed frequencies, and connect standing waves to resonance and musical instruments.

Standing waves form when two identical waves travel in opposite directions, producing fixed nodes and antinodes.

Confine waves and they organize: a wave reflecting between the fixed ends of a string meets itself coming back, and superposition of the counter-propagating pair produces a standing wave — a pattern that oscillates in place, travelling nowhere. Its anatomy is fixed points and fat loops: nodes, permanently still (destructive interference always, spaced λ/2 apart), and antinodes, oscillating at doubled amplitude (constructive, midway between nodes). Confinement quantizes: a string fixed at both ends must place nodes at both boundaries, so only wavelengths fitting a whole number of half-wavelengths survive — λ_n = 2L/n, hence the harmonic series f_n = nv/2L: a fundamental f₁ = v/2L and its integer multiples, the private frequency menu that makes a string a musical instrument (and the reason standing waves ARE resonance in bounded media: drive at a menu frequency and the pattern builds). Air columns run the same logic with different boundary rules — closed ends demand displacement nodes, open ends antinodes — so an open-open pipe (flute) carries all harmonics f_n = nv/2L while a closed-open pipe (clarinet-like; bottle) carries only odd harmonics f_n = nv/4L, its fundamental an octave below an equal open pipe. Standing waves store rather than transport energy (no net propagation — the two travelling waves' fluxes cancel) and their signatures are everywhere: string and wind instruments' pitches, microwave-oven hot spots, laser cavities, MRI coils, and — with the boundaries loosened — the vibration modes of bridges and buildings that engineers must detune from expected drivers.

**Key ideas**

- Genesis: two identical counter-propagating waves (typically incident + reflection) superpose into a pattern oscillating in place — the travelling waves' motion cancels, their oscillation remains.
- Anatomy: nodes (always still, λ/2 apart) and antinodes (double amplitude, midway); adjacent segments oscillate in antiphase.
- Quantization by boundaries: fixed string ends demand nodes → λ_n = 2L/n → harmonic menu f_n = nv/2L (n = 1, 2, 3…).
- The fundamental f₁ = v/2L sets pitch; harmonics are its integer multiples — tune by tension (v = √(T/μ)) or length (fretting).
- Air columns: open end ≈ displacement antinode, closed end = node — open-open pipes give all harmonics (f_n = nv/2L); closed-open pipes give odd only (f_n = nv/4L), fundamental an octave lower.
- Standing waves are resonance in bounded media: driving at a menu frequency pumps the mode; off-menu driving builds nothing — the resonance curve reappears with many peaks.
- No net energy transport: the counter-propagating fluxes cancel; energy sloshes between kinetic and potential within each loop — stored, not shipped.
- Signatures at large: instrument pitches, microwave hot spots (node/antinode grids), laser cavities, organ pipes, and structural vibration modes.

**Vocabulary**

- **standing (stationary) wave** — The in-place oscillation pattern formed by counter-propagating identical waves — nodes fixed, antinodes at doubled amplitude.
- **node / antinode** — Points of permanent stillness / maximum oscillation, alternating every quarter wavelength (nodes λ/2 apart).
- **harmonic series** — The quantized frequency menu of a bounded medium: f_n = nv/2L (fixed-fixed string, open-open pipe); odd multiples of v/4L for closed-open pipes.
- **fundamental (first harmonic)** — The lowest menu frequency — the pitch; higher harmonics colour the timbre.
- **mode** — One allowed standing-wave pattern of a bounded system — the vocabulary that scales from strings to bridges to quantum states.

**Common misconceptions**

- *Misconception:* A standing wave is a wave that has stopped moving.
  *Correction:* The PATTERN stands; the medium oscillates vigorously (antinodes at double the travelling wave's amplitude). It is two travelling waves in permanent counter-propagating superposition — motion organized, not motion ended.
- *Misconception:* A string can vibrate at any frequency you like.
  *Correction:* Freely vibrating, it selects from its harmonic menu f_n = nv/2L — the boundary conditions admit only node-at-both-ends patterns. (You can force other frequencies by continuous driving, but response is feeble off-menu; plucking excites menu members only.)
- *Misconception:* All pipes carry all harmonics.
  *Correction:* Boundary rules decide: open-open pipes support the full series, but closed-open pipes support only ODD harmonics (f₁, 3f₁, 5f₁…) — the missing evens are why a clarinet sounds hollow next to a flute and why a bottle's resonance sits an octave below an equal open tube.
- *Misconception:* Nodes are where the wave's energy has been destroyed.
  *Correction:* Nodes are locations of permanent destructive interference in DISPLACEMENT; the energy resides in the oscillating loops between them (and at a string's nodes, the tension does its bookkeeping). Total energy is stored in the mode — the audit passes, as always with interference.

**Common mistakes in practice**

- Treating standing waves as motionless.
- Spacing nodes λ apart instead of λ/2.
- Giving closed-open pipes even harmonics.
- Using v of sound for waves ON a string (or vice versa) in one problem.
- Forgetting that fretting/shortening changes L in the SAME menu formula.
- Counting loops as n − 1 or mislabeling which harmonic a diagram shows.

**Visual teaching opportunities**

- The genesis animation: incident and reflected travelling waves shown separately, then summed frame by frame into the standing pattern — nodes emerging where they always cancel.
- A driven-string (Melde) demonstration or slow-motion clip: sweeping the driver frequency through f₁, f₂, f₃ with the loop count jumping at each menu frequency.
- The harmonic gallery for a fixed-fixed string: n = 1, 2, 3, 4 patterns stacked with λ_n = 2L/n and f_n labelled — the menu as a poster.
- Air-column boundary cards: open-open versus closed-open pipes with displacement node/antinode positions drawn and the all-vs-odd harmonic series beside each.
- A microwave-oven map: melted-chocolate or thermal-paper hot-spot grid with the λ/2 spacing measured — c = fλ from kitchen equipment.
- A mode-shape gallery for a bridge deck or building, connecting music's standing waves to structural engineering's.

**Worked example**

*Setup:* A 0.65 m guitar string has wave speed 286 m/s (from its tension and density). (a) Find the fundamental and the next two harmonics. (b) The guitarist frets the string to 0.433 m — find the new fundamental. (c) An organ pipe open at both ends plays the same 220 Hz fundamental in air (v = 343 m/s) — find its length; then find the length if the pipe were closed at one end.

1. (a) Fundamental: f₁ = v/2L = 286/(2 × 0.65) = 220 Hz (concert A₃); harmonics f₂ = 440 Hz, f₃ = 660 Hz — the integer ladder.
2. (b) Fretted: f₁' = 286/(2 × 0.433) ≈ 330 Hz — shortening by a third raises the pitch a fifth (220 → 330 Hz): fretboard geometry IS the menu formula.
3. (c) Open-open pipe at 220 Hz: L = v/2f₁ = 343/440 ≈ 0.78 m.
4. Closed-open at the same pitch: L = v/4f₁ = 343/880 ≈ 0.39 m — half the length for the same note, the closed pipe's octave economy.
5. Contrast the two pipes' voices: the open pipe adds 440, 660 Hz…; the closed pipe skips to 660, 1100 Hz… (odd only) — same fundamental, different timbre.
6. Collect the design rules: pitch by v and L (menu formulas); timbre by which harmonics the boundaries admit.

*Outcome:* The student computes the 220/440/660 Hz ladder, the fretted 330 Hz, and the 0.78 m vs. 0.39 m pipe lengths, reading the all-vs-odd harmonic distinction as timbre.

**Real-world intuition**

- Every string and wind instrument is a standing-wave menu made playable — frets, valves, and tone holes edit L; tension pegs edit v.
- Microwave ovens contain a 2.45 GHz standing-wave grid; turntables exist because nodes would otherwise leave cold spots.
- Laser cavities sustain optical standing waves between mirrors; the cavity length selects the lasing frequencies.
- MRI RF cavities and musical-hall acoustics manage standing-wave modes — reinforcing wanted ones, damping room 'boom' at others.
- Structural engineering computes bridge and building mode shapes (standing waves in steel and concrete) to detune them from wind, footfall, and seismic driving.

**Practice progression**

Item types: harmonic-menu computations for strings (f_n, λ_n, L, or v unknown), node/antinode counting and spacing items from mode diagrams, air-column problems across both boundary types, design and identification items (fret positions, pipe lengths, which-harmonic-is-missing). Suggested item count: 12.

Begin with fundamental computations and mode-diagram reading, add higher harmonics and inversions, then air columns with boundary discrimination, ending with instrument-design and odd-only identification problems.

**Assessment objectives**

Formats: computation set on both menu formulas, mode-diagram interpretation tasks, instrument-analysis problems. Bloom alignment: Apply — students must derive and deploy the quantized frequency menus under both boundary regimes on instruments and cavities they have not rehearsed.

Mastery signal: The student computes string and pipe harmonic series correctly (including the closed-pipe odd-only rule), reads node/antinode structure from diagrams, and solves one design inversion, at 80% accuracy or better.

**Teacher notes**

Build the concept by literal addition: run the incident-plus-reflected sum frame by frame before naming anything — students who see nodes EMERGE from superposition never mistake standing waves for stopped waves. The driven-string sweep (Melde) is the domain's best single demonstration: quantization heard and seen. Keep the boundary-rule logic explicit for pipes (node at closed, antinode at open) and let students derive the odd-only rule rather than memorize it. Plant the 'mode' vocabulary deliberately — it is the bridge to structural engineering and, eventually, quantum states. The microwave-chocolate lab measures c with a candy bar; do it.

**Student notes**

Standing waves are interference between a wave and its reflection: nodes where they always cancel (λ/2 apart), antinodes where they always reinforce. Boundaries write the menu: string fixed both ends → f_n = nv/2L; pipe open both ends → same; pipe closed one end → odd harmonics of v/4L only, an octave lower per length. Every problem is 'fit the pattern to the boundaries, read off λ, convert by v = fλ'. Remember what stands and what moves: the pattern stands, the medium dances.

**Prerequisite graph**

- Requires: phys.wave.interference
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Standing waves are interference (phys.wave.interference) under confinement, with wave speed (phys.wave.wave-speed) setting every menu and resonance (phys.wave.forced-oscillations) explaining why driving at menu frequencies builds amplitude. Sound (phys.wave.sound-waves) plays the menus aloud; optics reuses cavities (phys.opt); and the quantized-modes idea matures into quantum mechanics' standing-wave states (phys.qm) — the deepest export of this concept.

**Teaching hints — review triggers**

- phys.wave.interference

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one string-menu computation, one pipe pair (both boundary types), one mode-diagram reading. Monthly, re-run the genesis addition mentally (incident + reflected → nodes) and re-derive the odd-only pipe rule from its boundary conditions — the two derivations that keep the topic honest.

---

### Sound Waves

*Concept ID: `phys.wave.sound-waves` · Difficulty: developing · Bloom level: understand · Mastery threshold: 0.75 · Estimated study time: 3h*

**Learning objective.** Students will be able to describe sound as a longitudinal pressure wave requiring a medium, relate pitch to frequency and loudness to amplitude, state the audible range and the ultrasound/infrasound extensions, use the speed of sound across media and temperature, and explain everyday acoustic phenomena (echoes, timbre, hearing).

Sound waves are longitudinal mechanical waves that propagate through a medium via pressure fluctuations.

Sound is the longitudinal family's ambassador to daily life: a vibrating source — vocal folds, a string, a cone — pushes its medium into travelling trains of compression and rarefaction, which the ear decodes with astonishing sensitivity (audible pressure wiggles start around 20 μPa, a billionth of the atmosphere). The perceptual dictionary maps cleanly onto wave vocabulary: pitch is frequency (the audible window spanning roughly 20 Hz to 20 kHz, its ceiling sagging with age — with infrasound below, the province of elephants, storms, and building sway, and ultrasound above, the province of bats, dogs, and medical imaging); loudness tracks amplitude (formally intensity ∝ amplitude², the next concept's business); and timbre — why a violin and a flute on one note sound different — is the harmonic recipe, the mix of overtones each instrument's standing-wave menu contributes. Being mechanical, sound requires a medium (the bell in the vacuum jar falls silent — space is genuinely silent) and travels at the medium's speed: ~343 m/s in 20 °C air (drifting +0.6 m/s per °C), ~1480 m/s in water, ~5000+ m/s in steel — a millionfold slower than light, the gap that delays thunder and separates an echo from its shout. Echo logic (distance = v × round-trip-time/2) runs sonar, ultrasound imaging, and the clap-and-count of canyon walls; the ear's own machinery — eardrum driven by Δp, ossicles as impedance-matching levers, cochlea as frequency analyzer — closes the loop from physics to perception.

**Key ideas**

- Sound = longitudinal pressure wave from a vibrating source: compression-rarefaction trains; the microphone and eardrum both read Δp(t).
- Medium mandatory: no medium, no sound — the vacuum-jar bell; space is silent while light crosses it.
- Perceptual dictionary: pitch ↔ frequency; loudness ↔ amplitude (intensity ∝ A²); timbre ↔ harmonic content from the source's standing-wave menu.
- Audible window: ~20 Hz–20 kHz (ceiling falls with age); infrasound below (elephants, storms, structures), ultrasound above (bats, sonar, medical imaging).
- Speeds: ~343 m/s in air at 20 °C (+0.6 m/s per °C), ~1480 m/s water, ~5000–6000 m/s steel — the stiffness-over-density ladder in action.
- Echo ranging: d = v·t/2 — sonar, ultrasound scans, laser-less rangefinding, and the canyon clap.
- Hearing sensitivity spans a millionfold pressure range (20 μPa threshold to pain ~20 Pa) — the compression the decibel scale will tame next.
- The sound-light speed gap (~10⁶×) times thunder (3 s/km), delays stadium echoes, and syncs badly at long range — everyday evidence of v_sound.

**Vocabulary**

- **sound wave** — A longitudinal pressure wave in a material medium, produced by a vibrating source and perceived via Δp at the ear.
- **pitch / loudness / timbre** — The perceptual triple mapping to frequency / amplitude (intensity) / harmonic content.
- **audible range** — ≈ 20 Hz–20 kHz for young human hearing; infrasound below, ultrasound above.
- **echo ranging** — Distance from round-trip time: d = v·t/2 — sonar's and ultrasound's working equation.

**Common misconceptions**

- *Misconception:* Sound travels through empty space — movie explosions roar in vacuum.
  *Correction:* Sound is a mechanical wave: it needs matter to compress. The vacuum-jar bell demonstration is decisive — pump the air out and the ringing fades to silence while the hammer visibly strikes. Space battles are silent; cinema adds the roar.
- *Misconception:* Higher pitch means louder sound (or louder means higher).
  *Correction:* Pitch and loudness are independent axes: frequency versus amplitude. A piccolo can whisper at 4 kHz and a bass drum can thunder at 60 Hz — the wave's repetition rate and its size are separate dials.
- *Misconception:* Sound travels more slowly in dense media like water and metal.
  *Correction:* The stiffness term dominates: sound runs ~4× faster in water and ~15× faster in steel than in air. Rail-tap arrives twice — first through the steel, then the air — with the metal signal leading.
- *Misconception:* Different instruments playing the same note produce the same wave.
  *Correction:* They share the fundamental frequency but differ in harmonic recipe — the amplitudes of the overtones stacked on it. That spectral fingerprint is timbre, and it is why the waveforms (and the sounds) of a flute and violin at A₄ differ unmistakably.

**Common mistakes in practice**

- Letting sound cross vacuum.
- Conflating pitch with loudness.
- Using the air speed for underwater or in-metal problems.
- Forgetting the ÷2 in echo ranging.
- Expecting frequency to change between media (it is λ that adjusts).
- Reading a louder oscilloscope trace as higher-pitched.

**Visual teaching opportunities**

- The bell-in-vacuum-jar demonstration (live or filmed): sound dying with the air while the striker keeps swinging.
- A microphone-plus-oscilloscope station: students see their own voices as Δp(t) traces — pitch as trace density, loudness as trace height, vowels as shape.
- A frequency-sweep player across 20 Hz–20 kHz with a class hands-up census — the audible window (and its age dependence) measured live.
- Same-note spectra: violin, flute, and tuning fork at A₄ with their harmonic bar-charts — timbre as recipe, visualized.
- An echo-ranging schematic: clap, cliff, stopwatch, d = v·t/2 — then the same diagram relabelled as sonar and as obstetric ultrasound.
- The rail-tap twice-heard diagram: one tap, two arrivals, two media speeds.

**Worked example**

*Setup:* Standing 850 m from a cliff on a 20 °C day (v = 343 m/s), a hiker claps. (a) When does the echo return? (b) The same clap's sound also travels through a steel pipeline (v = 5100 m/s) beside the trail to a listener 850 m away — find both arrival times at the listener and the gap. (c) The hiker's whistle is 1.7 kHz — find its wavelength in air and in the steel.

1. (a) Echo round trip: t = 2d/v = 1700/343 ≈ 5.0 s — the classic five-second canyon answer at this distance.
2. (b) Through air (one way): 850/343 ≈ 2.48 s; through steel: 850/5100 ≈ 0.17 s.
3. Gap: ≈ 2.3 s — the pipeline listener hears the metal-borne clap first by over two seconds: the rail-tap effect quantified.
4. (c) In air: λ = v/f = 343/1700 ≈ 0.20 m.
5. In steel: λ = 5100/1700 = 3.0 m — same 1.7 kHz (source-loyal), fifteen times the wavelength in the faster medium.
6. Collect the themes: echo ranging (d = vt/2), the media speed ladder (heard as a time gap), and the f-fixed λ-adjusts bookkeeping — three concepts in one clap.

*Outcome:* The student computes the 5.0 s echo, the 2.3 s two-media gap, and the 0.20 m vs. 3.0 m wavelengths, naming the fixed-frequency bookkeeping across media.

**Real-world intuition**

- Medical ultrasound images organs and fetuses by megahertz echo ranging in tissue — sonar at the bedside.
- Sonar maps seabeds, finds fish shoals, and guides submarines with underwater compression waves.
- Concert-hall and studio acoustics engineer reflections, absorption, and reverberation — applied echo physics.
- Thunder ranging (3 s/km), avalanche infrasound monitoring, and elephant-call research use the low end of the spectrum.
- Noise control — from headphone seals to highway barriers — manages pressure-wave paths through and around media.

**Practice progression**

Item types: echo and ranging computations (d = vt/2, two-media gaps), wavelength/frequency computations across the audible window and media, perceptual-dictionary items (pitch/loudness/timbre mapping), temperature and medium reasoning (cold-day speeds, why space is silent). Suggested item count: 12.

Begin with v = fλ and echo computations, add two-media and temperature variants, then perceptual mapping and spectra reading, ending with integrated scenario problems (thunder ranging, rail-tap, ultrasound depth).

**Assessment objectives**

Formats: computation set, perception-physics mapping quiz, scenario-analysis problems. Bloom alignment: Understand — students must explain sound's mechanism, medium dependence, and perceptual dictionary, supported by ranging and wavelength computations.

Mastery signal: The student computes echoes and wavelengths across media, maps pitch/loudness/timbre onto wave properties correctly, and explains the medium requirement, at 75% accuracy or better.

**Teacher notes**

This concept consolidates the domain for its most familiar wave — teach it as APPLICATIONS of machinery already built (longitudinal geometry, medium speeds, standing-wave menus), not new theory. The oscilloscope-voice station is the irreplaceable activity: seeing one's own Δp trace converts the abstraction permanently. Run the frequency-sweep census (and let the class discover the teacher's ceiling is lower than theirs — the humour teaches). Keep the perceptual dictionary strict: pitch-frequency, loudness-amplitude, timbre-spectrum, each with a counterexample against conflation. The vacuum bell settles the medium question forever.

**Student notes**

Sound is the longitudinal wave you live in: source vibrates, medium relays compressions, ear reads pressure. Map perception to physics and keep the axes independent — pitch is f, loudness is amplitude, timbre is the overtone recipe. Know your speeds (343 air, 1480 water, ~5100 steel; +0.6 per °C in air) and your window (20 Hz–20 kHz). Echoes are stopwatch problems: d = vt/2. And in vacuum: silence — no medium, no sound, no exceptions.

**Prerequisite graph**

- Requires: phys.wave.wave-properties
- Unlocks (future prerequisite links): phys.wave.doppler-effect, phys.wave.sound-intensity
- Cross-topic connections (graph cross-links): none
- Narrative: Sound instantiates longitudinal waves (phys.wave.longitudinal-waves) at the medium speeds of phys.wave.wave-speed, with timbre supplied by standing-wave menus (phys.wave.standing-waves) and loudness formalized next in intensity (phys.wave.sound-intensity). Motion effects follow in the Doppler effect (phys.wave.doppler-effect); pressure fundamentals trace to fluids (phys.mech.pressure-fluids); hearing links to biology's transducers.

**Teaching hints — review triggers**

- phys.wave.wave-properties

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one echo problem, one cross-media wavelength table, one perceptual-mapping sweep. Monthly, restate the dictionary (pitch-f, loudness-A, timbre-spectrum) and the medium mandate — the two sentences this concept lives in.

---

### Sound Intensity and the Decibel Scale

*Concept ID: `phys.wave.sound-intensity` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Students will be able to define sound intensity as power per unit area, apply the inverse-square law for point sources, convert between intensity and decibel level using β = 10 log(I/I₀), manipulate the logarithmic scale (+10 dB per ×10 intensity, +3 dB per doubling), and connect levels to hearing thresholds, damage risk, and distance.

Sound intensity is power per unit area; the decibel scale logarithmically measures intensity relative to a reference level.

Loudness needs numbers, and two scales share the work. Physically, sound intensity I is power crossing unit area (W/m²): a point source's power P spreads over ever-larger spheres, giving the inverse-square law I = P/4πr² — double the distance, quarter the intensity — the geometric dilution that makes distance the cheapest noise control. Human hearing, though, spans a preposterous range — from the threshold I₀ = 10⁻¹² W/m² to painful ~1 W/m², twelve orders of magnitude — and perceives ratios rather than differences, so acoustics adopts the logarithmic decibel scale: β = 10 log₁₀(I/I₀), placing threshold at 0 dB, whisper ~30, conversation ~60, heavy traffic ~85 (the occupational-damage frontier), rock concerts ~110, and pain ~120–130 dB. The scale's arithmetic is the skill: each ×10 in intensity adds 10 dB, each doubling adds ~3 dB, and equal dB steps are equal intensity RATIOS — so 60 dB is not 'twice' 30 dB but a thousand times its intensity, and two equal machines together add 3 dB, not double the number. Combined with the inverse-square law, decibels compute distance effects directly: doubling distance subtracts ~6 dB (quartered intensity), which is why moving away beats ear-covering. Intensity also closes the amplitude loop — I ∝ (pressure amplitude)², inheriting the A² energy scaling from oscillations — and the dB toolkit generalizes across engineering (signal chains, attenuation) far beyond acoustics; hearing-conservation limits (e.g. ~85 dB for 8-hour exposure, halving time per +3 dB) turn the arithmetic into occupational health.

**Key ideas**

- Intensity I = P/A (W/m²): acoustic power through unit area — the physical loudness variable, ∝ (pressure amplitude)².
- Point-source spreading: I = P/4πr² — inverse-square dilution; ×2 distance → ¼ intensity (−6 dB).
- Decibel definition: β = 10 log₁₀(I/I₀) with I₀ = 10⁻¹² W/m² (hearing threshold at 0 dB) — a ratio scale matched to perception.
- Scale arithmetic: +10 dB per ×10 intensity; +3 dB per doubling; equal dB steps = equal ratios — never treat dB as additive intensity.
- Landmark ladder: 0 threshold, 30 whisper, 60 conversation, 85 damage frontier, 110 concert, 120–130 pain — calibration worth memorizing.
- Two equal sources: +3 dB, not double-the-number; ten equal sources: +10 dB — the logarithm compresses crowds.
- Hearing conservation: ~85 dB(A)/8 h with exposure time halving per +3 dB — the arithmetic as occupational law.
- Perceived loudness roughly doubles per +10 dB — perception's own compression atop the physics.

**Vocabulary**

- **sound intensity I** — Acoustic power per unit area (W/m²), proportional to pressure-amplitude squared.
- **inverse-square law (acoustic)** — I = P/4πr² for a point source — quartering per distance doubling (−6 dB).
- **decibel (dB)** — The logarithmic level β = 10 log₁₀(I/I₀), referenced to threshold I₀ = 10⁻¹² W/m².
- **threshold of hearing / pain** — The 0 dB reference (10⁻¹² W/m²) and the ~120–130 dB upper extreme of tolerable sound.

**Common misconceptions**

- *Misconception:* Decibels add like intensities — two 60 dB machines make 120 dB.
  *Correction:* Doubling intensity adds 3 dB: two 60 dB machines give 63 dB. Decibels are logarithms of ratios; adding the numbers multiplies the ratios — 120 dB would be a million times the intensity of the pair.
- *Misconception:* 60 dB is twice as intense as 30 dB.
  *Correction:* It is 10³ = 1000 times the intensity: every 10 dB is a factor of ten. Equal dB DIFFERENCES are equal intensity RATIOS — the whole scale is multiplicative.
- *Misconception:* Doubling distance halves the intensity.
  *Correction:* Spherical spreading is inverse-SQUARE: double distance quarters intensity (−6 dB). The energy dilutes over area, and area grows with r² — the same geometry as gravity's dilution.
- *Misconception:* 0 dB means no sound at all.
  *Correction:* 0 dB marks the reference threshold I₀ = 10⁻¹² W/m² — a real, barely audible sound. Negative decibels exist (quieter than threshold, inaudible to humans but measurable); silence would be −∞ dB.

**Common mistakes in practice**

- Adding dB values across sources.
- Reading equal dB steps as equal intensity differences.
- Halving instead of quartering intensity per distance doubling.
- Treating 0 dB as silence.
- Logarithm slips (log of ratio, not of I alone; factor 10 not 20 for intensity ratios).
- Forgetting the exposure-time halving per +3 dB in safety questions.

**Visual teaching opportunities**

- The expanding-spheres diagram: one source's power painted over 1×, 4×, 9× areas at r, 2r, 3r — inverse-square as geometry, with the −6 dB per doubling annotated.
- A logarithmic ladder poster: the 0–130 dB landmarks with intensity values alongside — twelve orders of magnitude on one staircase.
- A sound-level-meter walk: measuring the classroom, corridor, and street, then verifying the −6 dB distance rule against a portable speaker.
- The two-machines demo: one, then two identical buzzers metered — the +3 dB surprise measured live.
- An exposure-time chart: 85 dB/8 h halving per +3 dB down to minutes at concert levels — the arithmetic as a safety card.

**Worked example**

*Setup:* A speaker radiates P = 0.50 W uniformly (point source). (a) Find the intensity and dB level at 2.0 m. (b) At what distance does the level fall to 70 dB? (c) A second identical speaker joins at the same location — find the new level at 2.0 m. (d) How many such speakers would reach 100 dB at 2.0 m?

1. (a) I = P/4πr² = 0.50/(4π × 4) ≈ 9.95 × 10⁻³ W/m²; β = 10 log(9.95 × 10⁻³/10⁻¹²) ≈ 10 log(10¹⁰) = 100 dB — concert-loud at two metres.
2. (b) 70 dB means I = 10⁻⁵ W/m²; r = √(P/4πI) = √(0.50/(4π × 10⁻⁵)) ≈ √3979 ≈ 63 m — a 30 dB drop needs ~32× the distance (10^{30/20}), matching −6 dB per doubling five times.
3. (c) Two speakers double I: +3 dB → 103 dB at 2.0 m — not 200 dB.
4. (d) 100 dB is already achieved by ONE speaker at 2.0 m (from part a) — so one suffices; the instructive variant: from a single 90 dB speaker, reaching 100 dB needs ×10 intensity = 10 speakers. State the rule: +10 dB per tenfold source count.
5. Audit the arithmetic pattern: ×2 sources → +3 dB; ×10 → +10 dB; ×2 distance → −6 dB — the three moves that solve the whole topic.
6. Safety footnote: at 100+ dB, permissible exposure is minutes — the ladder's upper rungs carry occupational limits, not just adjectives.

*Outcome:* The student computes 100 dB at 2 m, the 63 m radius for 70 dB, +3 dB for the doubled source, and deploys the ×10-sources/+10 dB rule, reciting the three-move arithmetic.

**Real-world intuition**

- Occupational hearing conservation is dB arithmetic in law: 85 dB(A)/8 h limits, exposure halving per +3 dB, mandatory protection above.
- Concert, venue, and festival sound design budgets speaker counts and distances in exactly the +3/+10/−6 dB moves.
- Environmental noise regulation (aircraft corridors, highways, night-time limits) is written and enforced in decibels.
- Audiology measures hearing loss as threshold shifts in dB; hearing aids amplify by prescribed dB gains per frequency band.
- The dB toolkit runs far beyond sound: signal chains, antenna gains, and attenuation budgets across electrical engineering.

**Practice progression**

Item types: intensity and dB computations in both directions, inverse-square distance problems (find I, r, or ΔdB), source-combination items (2, 10, N equal sources), exposure and landmark-calibration questions. Suggested item count: 12.

Begin with definition computations and dB conversions, add distance and combination moves, then mixed multi-step scenarios (move away AND add sources), ending with exposure-limit reasoning.

**Assessment objectives**

Formats: computation set with logarithm discipline, scenario problems (venues, workplaces), conceptual quiz on the ratio scale. Bloom alignment: Apply — students must execute the logarithmic and inverse-square arithmetic fluently across realistic acoustic scenarios.

Mastery signal: The student converts I ↔ dB both ways, applies the three arithmetic moves (+3, +10, −6 dB) correctly in combination, and passes the two-machines trap, at 80% accuracy or better.

**Teacher notes**

The scale's multiplicative grammar is the entire difficulty: drill the three moves (+3 doubling, +10 tenfold, −6 per distance doubling) until they are reflexes, and spring the two-machines trap early — measured live with a meter app it converts scepticism into memory. Motivate the logarithm from hearing's twelve decades before defining it; the scale then feels inevitable rather than arbitrary. The landmark ladder should be memorized like multiplication tables. Exposure limits give the arithmetic moral weight — students protect their own ears with this lesson.

**Student notes**

Work in ratios: every 10 dB is ×10 intensity, every 3 dB is ×2, every distance doubling is −6 dB — and dB never add across sources (two equal sources: +3). Convert with β = 10 log(I/I₀), I₀ = 10⁻¹² W/m², and calibrate against the ladder (60 conversation, 85 damage frontier, 120 pain). For point sources, spread the power over 4πr². Distance is the cheapest ear protection: each doubling buys 6 dB.

**Prerequisite graph**

- Requires: phys.wave.sound-waves
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Intensity quantifies sound's loudness axis (phys.wave.sound-waves) with the amplitude-squared energy scaling inherited from oscillations (phys.wave.shm-energy) and the same inverse-square geometry as gravitation's dilution (phys.mech.gravitational-field). The dB toolkit exports to signal engineering (phys.em); hearing thresholds connect to biology; and intensity redistribution recalls interference's energy audit (phys.wave.interference).

**Teaching hints — review triggers**

- phys.wave.sound-waves

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one two-way conversion, one combined-moves scenario, one exposure judgment. Monthly, recite the three moves and the landmark ladder — the six numbers and three rules that ARE this topic.

---

### Doppler Effect

*Concept ID: `phys.wave.doppler-effect` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Students will be able to explain the Doppler effect as frequency shift from relative motion of source and observer, apply f' = f(v ± v_o)/(v ∓ v_s) with correct sign choices, distinguish source motion (wavelength change) from observer motion (encounter-rate change), compute shifts for standard scenarios, and connect the effect to radar, medicine, and astronomy.

The Doppler effect is the change in observed frequency due to relative motion between source and observer.

The Doppler effect is motion written into frequency: when a sound source and an observer approach each other, the observer receives more wave crests per second than the source emits — higher pitch; when they recede, fewer — lower pitch: the passing ambulance's signature eee-aww. The mechanism differs instructively by who moves. A moving SOURCE chases its own forward wavefronts, physically compressing wavelengths ahead (and stretching them behind) — the medium's wave pattern itself is distorted; a moving OBSERVER leaves the pattern untouched but changes the encounter rate, sweeping crests up faster when approaching. Both effects live in one master formula, f' = f(v ± v_o)/(v ∓ v_s), where v is the sound speed in the medium, v_o the observer's speed, v_s the source's — with the sign discipline that carries every problem: choose signs so approach raises f' and recession lowers it (numerator +v_o for observer approaching; denominator −v_s for source approaching). The asymmetry between the cases is real physics, not bookkeeping: at equal speeds the moving-source shift differs from the moving-observer shift (the medium referees), and as v_s → v the forward wavefronts pile into the sonic-boom cone — the formula's divergence made audible. The effect's reach is enormous: police and weather radar read speeds from reflected-wave shifts (a double Doppler), medical ultrasound maps blood flow the same way, bats and dolphins hunt with it, and light's version — governed by relativity but analogous in spirit — delivers the redshifts on which the expanding universe was discovered.

**Key ideas**

- Effect: relative approach raises received frequency, recession lowers it — the moving-siren signature; shift size grows with speed.
- Two mechanisms: moving source compresses/stretches the wavelengths in the medium (pattern distorted); moving observer changes the crest-encounter rate (pattern intact).
- Master formula: f' = f(v ± v_o)/(v ∓ v_s) — v is the medium's sound speed; signs chosen so approach → f' up, recession → f' down.
- Sign discipline: observer approaching → +v_o (numerator); source approaching → −v_s (denominator); reverse both for recession — reason from the physics each time.
- The asymmetry is real: equal speeds give different shifts for moving-source vs. moving-observer — the medium provides the reference frame for sound.
- The pass-by: pitch is high (constant) on approach, drops THROUGH the true frequency at closest passage, low (constant) on recession — the listener never hears f itself except at the instant of passing.
- Limits: v_s → v piles wavefronts into the Mach cone (sonic boom) — the denominator's divergence; supersonic sources outrun their own sound.
- Reflected-wave (double) Doppler: radar and medical ultrasound shift twice — out and back — doubling sensitivity to target speed; light's analogue delivers astronomical redshifts.

**Vocabulary**

- **Doppler effect** — The shift of received frequency caused by relative motion of source and observer — up on approach, down on recession.
- **Doppler formula** — f' = f(v ± v_o)/(v ∓ v_s), signs chosen so approach raises f'; v is the medium's wave speed.
- **Mach cone / sonic boom** — The piled-up wavefront cone of a source at or beyond the sound speed — the formula's v_s → v divergence made audible.
- **redshift / blueshift** — The recession/approach shifts of light's spectral lines — the effect's astronomical (relativistic) counterpart.

**Common misconceptions**

- *Misconception:* The siren's pitch drops because the ambulance's engine slows or the sound tires with distance.
  *Correction:* The source emits one fixed frequency throughout; the RECEIVED frequency depends on relative motion — high while approaching, low while receding, stepping down as it passes. Loudness fades with distance; pitch shifts with velocity — different variables, different physics.
- *Misconception:* The pitch rises continuously as the source gets closer.
  *Correction:* For constant approach speed the shifted pitch is CONSTANT (a steady higher note); it does not climb with proximity. The drama is the step DOWN through the true frequency as the source passes — approach pitch and recession pitch are two plateaus, not a crescendo.
- *Misconception:* Only the relative speed matters — moving source at 30 m/s equals moving observer at 30 m/s.
  *Correction:* For sound the medium referees: the two cases give different shifts at equal speeds (compare f·v/(v−30) with f·(v+30)/v). Sound's Doppler is medium-anchored; only light's relativistic Doppler depends purely on relative velocity.
- *Misconception:* Doppler shift changes the sound's speed.
  *Correction:* The wave still travels at the medium's v (343 m/s in air) regardless of source or observer motion. What shifts are wavelength and received frequency — their product stays the medium's speed. (The source can outrun its sound; the sound cannot hurry.)

**Common mistakes in practice**

- Sign errors that lower the pitch of an approaching source.
- Predicting continuously rising pitch with proximity.
- Using relative speed alone and merging the two cases for sound.
- Shifting the wave SPEED instead of frequency/wavelength.
- Forgetting the factor-of-two in reflected (radar) Doppler.
- Applying the sound formula unmodified to light at high speeds.

**Visual teaching opportunities**

- The classic wavefront-circles diagram: stationary source (concentric) versus moving source (compressed ahead, stretched behind) versus supersonic (Mach cone) — the whole topic in three panels.
- A pass-by frequency-versus-time trace: the two plateaus and the step through f at closest approach, synced to an ambulance audio clip.
- An interactive with source- and observer-speed sliders showing the received frequency and the (asymmetric) two-case comparison at equal speeds.
- The double-Doppler radar cartoon: outgoing shift on reception by the car, return shift on reflection — speed from the summed shift.
- A galaxy-spectrum pair: laboratory lines versus a receding galaxy's redshifted lines — the effect at cosmological scale (with the relativistic caveat noted).

**Worked example**

*Setup:* An ambulance siren emits 700 Hz on a 343 m/s day. (a) Find the frequency heard by a stationary pedestrian as the ambulance approaches at 25 m/s, and after it passes. (b) Find the frequency heard if instead the ambulance is parked and the pedestrian drives toward it at 25 m/s. (c) Compare (a)-approach with (b) and explain the difference.

1. (a) Approach (source moving, observer still): f' = f·v/(v − v_s) = 700 × 343/318 ≈ 755 Hz — a steady higher plateau.
2. Recession: f' = 700 × 343/368 ≈ 652 Hz — the step down through 700 Hz at the pass is 755 → 652, about a whole tone and a half.
3. (b) Observer moving toward parked source: f' = f(v + v_o)/v = 700 × 368/343 ≈ 751 Hz.
4. (c) Compare: 755 Hz (source moving) vs. 751 Hz (observer moving) at the same 25 m/s — unequal, because the moving source distorts the wave pattern itself (shorter λ ahead) while the moving observer merely samples an undistorted pattern faster.
5. Verify the sign discipline: both scenarios describe approach, and both formulas raised f' ✓; recession would flip both signs and lower it.
6. Generalize: at speeds ≪ v the two cases converge (Δf/f ≈ v_rel/v ≈ 7% here shows the gap already); as v_s → v the source case diverges toward the boom — the asymmetry's two ends.

*Outcome:* The student computes 755/652 Hz for the pass-by and 751 Hz for the moving observer, explains the 755-vs-751 asymmetry mechanistically, and states the sign discipline as physics rather than memorization.

**Real-world intuition**

- Police radar and speed cameras read vehicle speeds from the double Doppler shift of reflected microwaves.
- Doppler ultrasound maps blood flow and fetal heartbeats — the shift from moving red blood cells, imaged in colour.
- Weather radar's Doppler mode reads wind fields inside storms, and tornado rotation signatures trigger warnings.
- Bats, dolphins, and sonar systems compensate for their own motion via Doppler when echolocating prey and terrain.
- Astronomy's redshifts and blueshifts — exoplanet wobbles, binary-star orbits, the expanding universe — are the effect's grandest ledger (relativistic for light, Doppler in spirit).

**Practice progression**

Item types: single-motion computations (each case, both directions), pass-by problems (both plateaus and the step), asymmetry and mechanism explanation items, application problems (radar double-shift, ultrasound flow, redshift reading). Suggested item count: 12.

Begin with one-mover computations and sign drills, add pass-by plateaus and both-moving cases, then asymmetry explanations, ending with reflected-wave and astronomical applications.

**Assessment objectives**

Formats: computation set with sign-discipline requirements, mechanism-explanation tasks, application-analysis problems. Bloom alignment: Apply — students must choose the correct formula configuration from the physical situation and execute the shift computations across the standard scenario family.

Mastery signal: The student computes shifts for all four single-motion cases with correct signs, produces both pass-by plateaus, and explains the source/observer asymmetry, at 80% accuracy or better.

**Teacher notes**

Teach the two mechanisms BEFORE the formula — wavefront circles for the moving source, crest-sampling for the moving observer — and the sign discipline becomes derivable rather than memorized ('approach must raise f', then check the algebra agrees). The pass-by plateaus-and-step trace corrects the near-universal 'pitch climbs as it nears' error; play the audio against the plot. The asymmetry question (755 vs. 751) is the concept's discriminator — set it explicitly. Handle light honestly: analogous phenomenon, relativistic formula, purely relative velocity — one sentence of scope keeps the astronomy connection clean.

**Student notes**

Reason the direction first — approach means more crests per second, so f' must rise — then set the signs to agree: +v_o up top for an approaching observer, −v_s below for an approaching source. Expect plateaus, not crescendos: steady high note in, step down through the true pitch, steady low note out. Keep the asymmetry in stock (moving source ≠ moving observer at equal speed — the medium referees) and the limit in mind (source at sound speed → boom). Radar shifts twice; galaxies shift red.

**Prerequisite graph**

- Requires: phys.wave.sound-waves
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Doppler effect rides on sound's medium-anchored propagation (phys.wave.sound-waves, phys.wave.wave-speed) and the frequency bookkeeping of wave properties (phys.wave.wave-properties). Its reflected form powers radar and medical ultrasound; its supersonic limit connects to shock waves; and its light version — relativistic, purely relative — awaits in special relativity (phys.rel) and underwrites cosmology's expanding universe (phys.astro).

**Teaching hints — review triggers**

- phys.wave.sound-waves

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one computation per single-motion case, one pass-by trace sketched, one asymmetry explanation. Monthly, redraw the three wavefront panels (stationary, subsonic, supersonic) — the pictures from which every formula sign can be re-derived.

---

### Beats and Beat Frequency

*Concept ID: `phys.wave.beats` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Students will be able to explain beats as the slow amplitude modulation produced by superposing waves of nearly equal frequencies, apply f_beat = |f₁ − f₂|, describe the alternation of constructive and destructive interference in time, use beats for tuning and small-frequency-difference measurement, and resolve the two-sided ambiguity of a beat measurement.

Beats are periodic variations in amplitude produced by the superposition of two waves of slightly different frequencies.

Beats are interference played out in time instead of space: superpose two tones of NEARLY equal frequencies and, at any fixed listening point, the two waves drift slowly in and out of step — momentarily crest-on-crest (loud), then, as the higher-frequency wave gains phase, crest-on-trough (quiet), then loud again. The result is a single tone of intermediate pitch (the average frequency) whose loudness pulses — waxing and waning — at the beat frequency f_beat = |f₁ − f₂|: two tones of 440 and 443 Hz beat three times per second. The formula's simplicity hides its power as a measuring instrument: the ear cannot tell 440 from 442 Hz directly, but it counts the 2 Hz pulsation effortlessly — beats convert a tiny frequency DIFFERENCE into a slow, audible rhythm, which is precisely how musicians tune (adjust until the beats slow and vanish: zero beat = unison) and how piano technicians, radio engineers (heterodyning), and even Doppler flow meters extract small differences from pairs of nearly equal frequencies. Two disciplines complete the concept. First, the absolute value carries an ambiguity: 3 Hz of beating against a 440 Hz reference means the other source is 437 OR 443 Hz — resolved by nudging one frequency and watching whether the beats speed up or slow down. Second, beats are audible as loudness pulsation only while the difference is small (up to ~10–15 Hz); push the difference further and the pulsation blurs into roughness and then into two distinct tones — the phenomenon's honest domain. Mathematically, beats are the superposition identity cos(2πf₁t) + cos(2πf₂t) = 2cos(2πf_beat t/2)·cos(2πf_avg t): a carrier at the average frequency inside a slow amplitude envelope — the same envelope idea met in damping, now periodic.

**Key ideas**

- Beats = interference in time: at one point, two nearly-equal-frequency waves alternate between in-step (loud) and out-of-step (quiet) as their phases drift apart and realign.
- Beat frequency: f_beat = |f₁ − f₂| — the loudness pulses per second equal the frequency difference; the heard pitch is the average (f₁ + f₂)/2.
- The envelope picture: sum = carrier at f_avg inside a slow envelope; two loudness maxima per envelope cycle give f_beat = Δf exactly.
- Measurement power: the ear (or a detector) counts slow pulsations easily, converting imperceptible frequency differences into countable rhythm — a difference amplifier built from superposition.
- Tuning by zero beat: adjust one source until beats slow, crawl, and vanish — silence of the pulsation certifies unison; the method of orchestras, piano tuners, and radio heterodynes.
- The two-sided ambiguity: |Δf| = 3 Hz against 440 Hz means 437 or 443 Hz — resolve by perturbing one frequency and watching the beat rate's response.
- Audibility domain: clean beats up to ~10–15 Hz difference; beyond, roughness, then two separate tones — beats are a small-difference phenomenon.
- Family placement: superposition's third costume — interference organizes amplitude in space, standing waves in bounded space, beats in time.

**Vocabulary**

- **beats** — The periodic loudness pulsation from superposing two nearly-equal frequencies — interference alternating in time.
- **beat frequency** — The pulsation rate f_beat = |f₁ − f₂|; the heard pitch is the average (f₁ + f₂)/2.
- **zero beat** — The vanishing of pulsation at exact unison — the tuner's certificate of frequency match.
- **envelope (beat)** — The slow amplitude modulation enclosing the average-frequency carrier — damping's envelope idea, made periodic.

**Common misconceptions**

- *Misconception:* Beats are two pitches heard alternately, or a new note at the beat frequency.
  *Correction:* The ear hears ONE pitch — the average frequency — whose LOUDNESS pulses at f_beat. (Only at large beat rates, beyond the beating regime, do two tones separate; and only in special nonlinear circumstances does a difference TONE appear.) Beats are amplitude modulation, not melody.
- *Misconception:* The beat frequency is the average of the two frequencies.
  *Correction:* It is the DIFFERENCE: f_beat = |f₁ − f₂|. The average sets the heard pitch; the difference sets the pulsation rate. 440 + 444 Hz gives a 442 Hz tone beating 4 times per second — two numbers, two jobs.
- *Misconception:* Hearing 3 beats per second against a 440 Hz fork tells you the other source is 443 Hz.
  *Correction:* It tells you 443 OR 437 Hz — the absolute value hides the sign. Resolve by tightening the string slightly: if the beats slow, you were below (437 side) and are approaching; if they quicken, you were above. One perturbation disambiguates.
- *Misconception:* Beats occur for any two frequencies played together.
  *Correction:* Perceptible beating needs NEARLY equal frequencies (differences up to ~10–15 Hz). Larger gaps blur into roughness and then resolve as two distinct pitches — a major third doesn't beat; it harmonizes. Beats are the physics of the almost-unison.

**Common mistakes in practice**

- Reporting the average as the beat frequency (or the difference as the heard pitch).
- Forgetting the two-sided ambiguity and asserting one candidate.
- Reversing the perturbation logic (beats faster read as 'getting closer').
- Expecting beats between widely separated frequencies.
- Confusing beat pulsation with the presence of a third tone.
- Halving or doubling f_beat via the envelope's two-maxima-per-cycle subtlety.

**Visual teaching opportunities**

- The three-panel construction: wave 1, wave 2 (slightly different f), and their sum showing the slow envelope — with in-step and out-of-step instants flagged along the time axis.
- A live two-oscillator demonstration (signal generators or phone apps at 440/443 Hz): students count the beats, then close the gap to zero beat by ear.
- An envelope-with-carrier animation: the fast f_avg oscillation riding inside the slow |Δf| envelope, loudness meter pulsing in step.
- A tuning-session clip: guitarist or piano technician beating a string against a reference, beats audibly slowing to silence at unison.
- The ambiguity flowchart: 3 Hz beats → two candidates → nudge sharp → beats faster? (was above) / slower? (was below) — the disambiguation as a decision tree.

**Worked example**

*Setup:* A violinist tunes her A string against a 440 Hz tuning fork and hears 4 beats per second. (a) What are the possible string frequencies? (b) She tightens the string slightly (raising its frequency) and the beat rate rises to 6 per second — determine the original frequency and the current one. (c) What should she do now, and what will she hear as she approaches perfect tune? (d) If instead she had heard the beats slow to 2 per second on tightening, what was the original frequency?

1. (a) f_beat = |f_string − 440| = 4 Hz ⇒ f_string = 436 Hz or 444 Hz — the two-sided ambiguity stated.
2. (b) Tightening RAISES f_string. The beats sped up (4 → 6 Hz), so the difference GREW: she was already above 440 — originally 444 Hz, now 446 Hz.
3. (c) She should loosen the string (lower f). As f_string descends toward 440, the beats slow — 6, 4, 2, 1 per second, then a slow breathing, then none: zero beat is unison, and the pulsation's death is the tuning certificate.
4. (d) Alternative: beats slowing on tightening means the difference SHRANK — she was below: originally 436 Hz (now 438 Hz, 2 beats), and continued tightening leads through zero beat at 440.
5. Collect the method: count beats for |Δf|; perturb once for the sign; steer toward zero beat — three steps, no electronics.
6. Note the sensitivity: the ear resolves the 1 Hz endgame effortlessly as a slow wobble — a 0.2% frequency discrimination delivered by counting, the measurement power of the phenomenon.

*Outcome:* The student produces both candidates (436/444), uses the perturbation response to select 444, prescribes loosening toward zero beat, and solves the mirrored case — the complete tune-by-beats protocol.

**Real-world intuition**

- Musicians and piano technicians tune by beats daily — zero beat against a reference is the oldest precision-frequency instrument.
- Radio heterodyning mixes signals to produce difference frequencies — the beat principle inside every superheterodyne receiver since the 1920s.
- Doppler flow and vibration measurement beats the reflected wave against the original; the beat rate reads the target's speed.
- Twin-engine aircraft and ships synchronize propellers by nulling the audible beat between them — passenger comfort by zero beat.
- Precision metrology beats lasers and atomic clocks against references, counting hertz-level differences between terahertz oscillators — the concept at its most exquisite.

**Practice progression**

Item types: beat-frequency computations and inversions (find f_beat, or the unknown source pair), ambiguity-resolution problems (perturb-and-observe reasoning), tuning-protocol scenarios (steer to zero beat), conceptual items on the envelope picture and the audibility domain. Suggested item count: 10.

Begin with direct |Δf| computations and average-pitch identification, add two-candidate inversions, then perturbation-logic problems, ending with envelope interpretation and domain-boundary judgments.

**Assessment objectives**

Formats: computation and inversion set, tuning-scenario reasoning problems, conceptual quiz on the envelope and domain. Bloom alignment: Apply — students must run the beat relation in both directions and execute the perturbation protocol that resolves its ambiguity in tuning scenarios.

Mastery signal: The student computes beat frequencies, states both candidates unprompted, resolves the sign by perturbation reasoning, and identifies the heard pitch as the average, at 80% accuracy or better.

**Teacher notes**

Beats must be HEARD: two signal generators (or free phone apps) at 440/443 Hz, counted aloud by the class, then steered to zero beat — five minutes that teach the whole concept. Frame it explicitly as superposition's third costume (space → interference; bounded space → standing waves; time → beats) to close the domain's architecture. The two-sided ambiguity and its perturbation resolution is the examinable reasoning — drill the 'tighten and listen' logic until it is a decision tree. Keep the average-pitch/difference-rate role separation crisp; conflation is the standard error. The heterodyne mention seeds radio engineering for later.

**Student notes**

Two almost-equal tones make one pitch (the average) that breathes at the difference: f_beat = |f₁ − f₂|. Count the breaths to measure the gap; remember the absolute value hides WHICH side you're on — nudge one frequency and let the beat rate's response tell you (faster = wrong way). Tune by steering to zero beat. Expect clean beating only for small gaps (≲10–15 Hz); beyond that you simply hear two notes. The envelope is damping's picture made periodic — carrier inside a slow breathing curve.

**Prerequisite graph**

- Requires: phys.wave.interference
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Beats are superposition (phys.wave.superposition) and interference (phys.wave.interference) transposed from space to time, with the envelope vocabulary of damped oscillations (phys.wave.damped-oscillations) recurring in periodic form. Tuning connects them to standing-wave instrument menus (phys.wave.standing-waves); heterodyning carries them into radio and signal engineering (phys.em); beating reflected against emitted waves links to Doppler measurement (phys.wave.doppler-effect).

**Teaching hints — review triggers**

- phys.wave.interference

**Spaced repetition / revision guidance**

Revise after 2 days, 1 week, and 1 month: one computation-with-both-candidates, one perturbation resolution, one envelope sketch. Monthly, run the live test if possible — two tones, count, steer to zero — and recite the role separation: average is the pitch, difference is the breath.

---
