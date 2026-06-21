# Quantum Physics — Misconception Audit (Task 5)

**Status: catalog + runtime-integrated.** Catalog of high-frequency learner misconceptions, the
lesson(s) where each must be confronted, and the correction strategy. Lesson anchors below are
reconciled to the final **Revision 2** curriculum (33 units / 144 lessons) and are now wired into the
runtime `misconceptionEngine` taxonomy (6 thematic rules, slugs `l<unit>-<lesson>`) — see
`docs/QUANTUM_PHYSICS_MISCONCEPTION_INTEGRATION_REPORT.md`. No new misconceptions were added in the
consistency pass; only stale lesson ids were corrected.

Format per entry: **Misconception → Why it's wrong → Correction strategy → Anchor lesson(s)**.

---

## 1. Wave–particle duality

- **"A quantum object is sometimes a wave and sometimes a particle (it switches)."**
  → It is neither classical wave nor classical particle; it is a quantum entity whose statistics show
  wave-like or particle-like aspects depending on the measurement.
  → Strategy: contrast the *measurement context*, not the object; use the single-particle double-slit
  build-up. Anchor: **L6.2, L6.1**.
- **"The wavefunction is a physical wave in 3D space like water."**
  → ψ is a complex probability amplitude in configuration space; |ψ|² is a probability density.
  → Strategy: emphasize complex amplitude + Born rule; show ψ for 2 particles lives in 6D. Anchor: **L7.1, L9.4**.
- **"Photons travel along definite paths through one slit."**
  → No which-path information exists unless measured; measuring destroys interference.
  → Strategy: which-path vs. interference complementarity demo. Anchor: **L6.2**.

## 2. Uncertainty principle

- **"Uncertainty is just measurement disturbance (the observer effect)."**
  → Δx·Δp ≥ ħ/2 is an intrinsic property of conjugate observables, true even before measurement.
  → Strategy: derive it from non-commuting operators / Fourier width, separate from disturbance.
  Anchor: **L11.3, L6.4, L5.5**.
- **"You can know position and momentum exactly if your instruments are good enough."**
  → No — the bound is fundamental, not technological.
  → Strategy: wave-packet width tradeoff visualization. Anchor: **L6.3, L11.3**.
- **"Energy–time uncertainty means energy isn't conserved."**
  → It relates linewidth/lifetime, not a license to violate conservation.
  → Strategy: lifetime–linewidth examples. Anchor: **L18.2**.

## 3. Measurement & collapse

- **"Collapse is a physical force/signal that propagates."**
  → Collapse is an update of the state description upon measurement; it carries no usable signal
  (no faster-than-light communication).
  → Strategy: contrast with entanglement + no-signaling. Anchor: **L10.3, L20.2**.
- **"The system 'decides' its value only because a conscious observer looks."**
  → Any sufficient interaction/decoherence with an environment suffices; consciousness is not required.
  → Strategy: decoherence framing. Anchor: **L10.3, L27.3**.
- **"Eigenvalues are the only values an observable can ever have at any time."**
  → Pre-measurement, a system can be in superposition; eigenvalues are the possible *outcomes*.
  → Strategy: superposition vs. measurement outcome. Anchor: **L9.3, L10.3, L11.4**.

## 4. Entanglement

- **"Entanglement lets you send information faster than light."**
  → Marginal statistics of each party are unchanged; correlations appear only when results are
  compared over a classical channel.
  → Strategy: no-signaling theorem, reduced density matrix. Anchor: **L20.2, L20.3, L24.2**.
- **"Entangled particles each secretly carry predetermined values (local hidden variables)."**
  → Bell inequality violations rule out local hidden variables.
  → Strategy: walk through a Bell/CHSH bound and its experimental violation. Anchor: **L20.2**.
- **"Measuring one particle physically yanks the other."**
  → Correlations, not causal influence; frame-dependent ordering shows no objective "first" collapse.
  → Strategy: correlation-vs-causation emphasis. Anchor: **L20.1, L20.2**.

## 5. Quantum tunneling

- **"The particle borrows energy to climb over the barrier."**
  → No energy is borrowed; the wavefunction has nonzero amplitude inside/beyond the classically
  forbidden region.
  → Strategy: show exponential decay of ψ in the barrier, not an over-the-top trajectory. Anchor: **L8.3**.
- **"Tunneling is instantaneous / faster-than-light."**
  → Tunneling time is subtle and does not permit signaling.
  → Strategy: caution against naive speed claims; focus on transmission probability. Anchor: **L8.3, L17.4**.
- **"Wider/taller barriers only change speed, not probability."**
  → Transmission falls off exponentially with width and √(barrier height).
  → Strategy: parameter-sweep intuition. Anchor: **L8.3, L17.4**.

## 6. Quantum computing

- **"A quantum computer tries all answers simultaneously and reads them out."**
  → Superposition explores amplitudes, but measurement yields one outcome; algorithms must engineer
  interference so the right answer is amplified.
  → Strategy: amplitude amplification (Grover) framing. Anchor: **L22.4, L22.1**.
- **"Qubits are just probabilistic bits."**
  → Qubits carry complex amplitudes (phase) and can interfere/entangle — strictly more than classical
  randomness.
  → Strategy: Bloch sphere + interference. Anchor: **L21.1, L21.3**.
- **"More qubits always means exponentially faster for everything."**
  → Speedups are problem-specific (factoring, search, simulation); many problems get no advantage.
  → Strategy: contrast Shor/Grover scope vs. general tasks. Anchor: **L22.5, L25.6**.
- **"Quantum computers are noise-free and you can copy qubits to back them up."**
  → Decoherence is the central engineering obstacle; the no-cloning theorem forbids copying.
  → Strategy: no-cloning + QEC motivation. Anchor: **L21.4, L23.1**.
- **"Error correction just means measuring and re-checking the qubit."**
  → Direct measurement destroys the state; QEC uses entanglement with ancillas + stabilizer syndromes.
  → Strategy: syndrome-measurement walkthrough. Anchor: **L23.2, L23.3**.

---

## Coverage summary

| Theme | Entries | Primary anchor level |
|---|---|---|
| Wave–particle duality | 3 | L2 |
| Uncertainty | 3 | L2–L3 |
| Measurement & collapse | 3 | L3, L6 |
| Entanglement | 3 | L4 |
| Tunneling | 3 | L2, L4 |
| Quantum computing | 5 | L5 |
| **Total** | **20** | — |

Every misconception is anchored to at least one existing lesson id in the Master Curriculum, so
remediation can later be wired to lessons without restructuring the tree.
