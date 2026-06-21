# Quantum Physics — Assessment Audit (Task 7)

**Status: spec reconciled to Revision 2 + runtime-verified.** Defines the assessment *progression*
across the five tiers requested, mapped to the final 7-level / **33-unit / 144-lesson** Master
Curriculum. Reuses the platform's existing assessment concepts (subject/topic assessments, evidence,
mastery) generically — nothing new is built. Unit ranges below are reconciled to Revision-2
numbering (consistency pass; no new assessments). See
`docs/QUANTUM_PHYSICS_ASSESSMENT_INTEGRATION_REPORT.md`.

---

## 1. Assessment philosophy

- **Mastery-gated progression:** a learner advances when they demonstrate mastery of a unit's
  competencies, not by time. Each tier raises the cognitive demand (Bloom: remember → understand →
  apply → analyze → create).
- **Conceptual + computational balance:** every tier pairs concept checks (catch the misconceptions
  in `QUANTUM_PHYSICS_MISCONCEPTIONS.md`) with calculation.
- **Spiral re-assessment:** Level 3 re-tests Level 2 ideas in rigorous form (intuition → formalism).

---

## 2. Five-tier progression

### Tier 1 — Beginner  (Levels 1–2 · `LevelIndex` 0–1)
- **Targets:** math toolkit, classical waves/energy, failure of classical physics, wave–particle
  duality, basic Schrödinger/1D wells.
- **Item types:** concept MCQs, short numeric (λ=h/p, photoelectric, well energies), graph reading
  (ψ vs |ψ|²), misconception "spot the error."
- **Mastery bar:** 70% with no critical misconception flagged (duality, uncertainty-as-disturbance).
- **Anchor units:** U1–U8.

### Tier 2 — Intermediate  (Level 3 · `LevelIndex` 2)
- **Targets:** Hilbert space/Dirac notation, postulates, operators & measurement, harmonic oscillator,
  angular momentum & spin, hydrogen atom.
- **Item types:** derivations (commutators, uncertainty bound), eigenvalue problems, expectation-value
  computations, ladder-operator manipulation, spin-½ measurement probabilities.
- **Mastery bar:** 75%; must correctly handle a measurement-collapse problem and a commutator.
- **Anchor units:** U9–U15.

### Tier 3 — Advanced  (Level 4 · `LevelIndex` 3)
- **Targets:** identical particles, perturbation theory, time-dependent QM, scattering, entanglement
  & Bell.
- **Item types:** multi-step problem sets (1st/2nd-order corrections, Fermi golden rule, Born
  approximation), Bell/CHSH calculation, density-matrix manipulation, Slater determinants.
- **Mastery bar:** 75%; must derive a perturbation correction and compute a Bell violation.
- **Anchor units:** U16–U20.

### Tier 4 — Professional  (Levels 5–6 · `LevelIndex` 4–5)
- **Targets:** qubits/gates/circuits/algorithms, QEC, cryptography, hardware; statistical QM, open
  systems/decoherence, relativistic QM, QFT intro, particle physics.
- **Item types:** circuit construction & analysis (build a Bell pair, trace teleportation, run Grover/
  QFT by hand on small registers), error-syndrome problems, BB84 protocol walkthrough, Lindblad/
  decoherence reasoning, Dirac-equation conceptual items, Standard-Model classification.
- **Mastery bar:** 80%; an applied capstone (e.g., design a 3-qubit code; analyze a 2-qubit circuit).
- **Anchor units:** U21–U30.

### Tier 5 — Research Foundation  (Level 7 · `LevelIndex` 5)
- **Targets:** gauge theory, renormalization, path integrals, many-body/condensed matter, topological
  phases, research methods.
- **Item types:** open-ended analysis, derivation chains (gauge invariance → interaction), paper
  critique, a scoped research-question proposal, computational-method design.
- **Mastery bar:** rubric-based (depth, rigor, originality) rather than percentage; a research-style
  written artifact.
- **Anchor units:** U31–U33.

---

## 3. Assessment-to-curriculum map

| Tier | Levels | Units | Dominant skill | Mastery signal |
|---|---|---|---|---|
| Beginner | 1–2 | U1–U8 | recall + basic application | 70%, no critical misconception |
| Intermediate | 3 | U9–U15 | formal derivation | 75% + measurement/commutator |
| Advanced | 4 | U16–U20 | multi-step problem solving | 75% + perturbation + Bell |
| Professional | 5–6 | U21–U30 | applied design/analysis | 80% + circuit/code capstone |
| Research Foundation | 7 | U31–U33 | synthesis & critique | rubric (research artifact) |

---

## 4. Per-unit checkpoints (formative)

Each unit ends with a short **checkpoint** (3–6 items) blending one misconception probe + one or two
computations + one concept question. Each level ends with a **level assessment** spanning its units,
acting as the gate to the next level. This mirrors the platform's existing
subject/topic-assessment + evidence/mastery model — no new assessment type is introduced.

## 5. Misconception integration

Every tier includes targeted distractors drawn from `QUANTUM_PHYSICS_MISCONCEPTIONS.md` (e.g.,
"uncertainty = disturbance," "entanglement signals FTL," "QC tries all answers and reads them out").
Selecting a misconception distractor flags the corresponding theme for remediation rather than only
deducting score.

---

## Summary

A five-tier, mastery-gated progression spanning all 7 levels / 33 units, balancing concept and
computation, with per-unit checkpoints and per-level gates. It maps onto existing assessment, evidence,
and mastery structures with **no engine change** — only content authoring would remain (future, out of
scope).
