# Quantum Physics — Curriculum Research Audit (Task 1)

**Status: research / design only. No code, no DB, no subject registration.**
Comparative review of how leading institutions sequence quantum physics, used to derive My Tutor's
prerequisite chains, topic ordering, and foundation requirements.

---

## 1. Institutions & programs reviewed

| Source | Representative sequence | What we borrow |
|---|---|---|
| **MIT** (8.04 / 8.05 / 8.06, 6.2210 Quantum Computation) | Wave mechanics → formalism → perturbation/scattering; separate quantum-information track | Three-stage "wave-first, then formalism" pacing; QI as its own track |
| **Stanford** (PHYSICS 130/131, CS 269Q) | Modern physics → QM I/II → quantum computing elective | Bridging "modern physics" unit before formal QM; CS-flavored QI |
| **Caltech** (Ph 12/125/127, Preskill Ph 219 notes) | Strong formalism, statistical mechanics, then quantum info & computation | Hilbert-space rigor; entanglement → information continuity |
| **Cambridge** (Part IB/II Principles of QM, Applications) | Linear-algebra-first axiomatic route | Operator/Hilbert-space-first option for rigor |
| **Oxford** (Quantum Mechanics, Atomic & Laser, Quantum Computing) | Physical QM → atomic systems → QC | Atomic/hydrogen anchoring before applications |
| **ETH Zurich** (Quantum Mechanics I/II, Quantum Information Theory) | Mathematically dense, early Dirac notation | Early, gentle Dirac notation; QIT as formal capstone |
| **Quantum computing curricula** (IBM Qiskit, Nielsen & Chuang, Xanadu/PennyLane) | Qubits → gates → circuits → algorithms → error correction → hardware | Entire Level 5 ordering |
| **Generic physics-degree structure** | Math methods threaded throughout; QFT/particle as senior/grad | Math-toolkit units; QFT/particle as Levels 6–7 |

---

## 2. Two dominant ordering philosophies (and our synthesis)

- **Wave-first (MIT 8.04 style):** start from de Broglie waves and the Schrödinger equation, build
  intuition with 1D potentials, *then* abstract to Hilbert space. Pedagogically gentle; great for
  beginners.
- **Axiomatic / linear-algebra-first (Cambridge/ETH style):** start from state vectors, operators,
  and postulates. Cleaner and faster to quantum information, but unforgiving for newcomers.

**My Tutor synthesis:** **wave-first for Levels 1–2, axiomatic consolidation at Level 3.** Beginners
get physical intuition early (Level 2), then the same content is re-expressed rigorously in
Hilbert-space language (Level 3) — a deliberate "spiral" so the formalism lands on prepared ground.
This directly serves the brief's "beginner friendly **and** mathematically rigorous" mandate.

---

## 3. Canonical prerequisite chains (distilled)

```
high-school algebra
   → calculus (derivatives, integrals, basic ODEs)        [math toolkit I]
   → complex numbers + linear algebra + Fourier basics    [math toolkit II]
   → classical waves & oscillations + classical mechanics/energy
   → "failure of classical physics" (blackbody, photoelectric, spectra)
   → wave–particle duality → Schrödinger equation → 1D potentials
   → Hilbert space / Dirac notation → postulates → operators & measurement
   → harmonic oscillator → angular momentum & spin → hydrogen atom
   → identical particles → perturbation theory → time-dependent QM → scattering
   → entanglement → qubits/gates → circuits/algorithms → error correction → cryptography → hardware
   → statistical QM → open systems/decoherence → relativistic QM → QFT intro → particle physics
   → advanced QFT/gauge → many-body/condensed matter → research frontiers
```

Each arrow is a hard prerequisite encoded later in the unit/lesson DAG (Master Curriculum + Report
validation).

---

## 4. Commonly observed sequencing mistakes (to avoid)

1. **Linear algebra introduced too late.** Students hit superposition/measurement without comfort in
   vector spaces, inner products, eigenvalues. → We front-load **Math Toolkit II** (Level 2) and a
   dedicated **Hilbert-space** unit (Level 3) before postulates.
2. **Complex numbers treated as a footnote.** Amplitudes and phases are intrinsically complex. → Explicit
   complex-number lessons before wavefunctions.
3. **Measurement postulate hand-waved.** Leads to durable misconceptions (see Misconceptions doc). →
   A full unit on operators/observables/measurement at Level 3.
4. **Spin bolted on after hydrogen.** Many courses delay spin, causing confusion in QI (qubits *are*
   spin-½-like). → Spin taught with angular momentum, *before* the QI level.
5. **Quantum computing without entanglement grounding.** Gates/algorithms taught as recipes. → Entanglement
   & nonlocality (Level 4) is a prerequisite for the entire QI level.
6. **Decoherence omitted.** Students think computers are "noise-free." → Dedicated open-systems/decoherence
   unit (Level 6) and an error-correction unit (Level 5).
7. **No math-readiness gate.** → Each level lists explicit prerequisite knowledge; Level 1 assumes only
   high-school algebra and builds the rest.

---

## 5. Missing-foundation checklist (what beginners usually lack)

| Foundation | Where we supply it |
|---|---|
| Calculus (derivatives, integrals, simple ODEs) | Level 1 — Math Toolkit I |
| Complex numbers, Euler's formula | Level 1/2 |
| Linear algebra (vectors, matrices, eigenvalues) | Level 2 — Math Toolkit II |
| Fourier/spectral thinking | Level 2 — Math Toolkit II |
| Classical waves, oscillations, energy | Level 1 |
| Probability & expectation | Level 1 (light) → Level 3 (measurement) |
| Dirac notation | Introduced gently Level 2, formalized Level 3 |

---

## 6. Design conclusions feeding the Master Curriculum

- **7 conceptual levels**, wave-first then axiomatic, with a math-toolkit thread.
- **Spiral re-teaching** of core ideas (intuition at L2, rigor at L3).
- **Spin and entanglement precede quantum information.**
- **Decoherence and error correction are first-class**, not appendices.
- **Beginner gate:** only high-school algebra assumed; all higher math is taught in-curriculum.
- **Research foundations (L6–L7)** map to senior-undergrad/early-grad QFT, particle, and many-body.

> Integration note (not part of design): the platform's `LevelIndex` is 0–5 (`subjectCatalog.ts`).
> The 7 conceptual levels map onto 0–5 at registration time (see Implementation Plan R3); this
> research/design document keeps the 7-level pedagogical structure.
