# Quantum Physics — Curriculum Research Audit

**Status:** Specification research only. No code, no lessons, no schema changes.
**Scope:** Task 1 of the Quantum Physics Curriculum Expansion Sprint — study the
educational landscape and produce a topic hierarchy, dependency graph, learning
sequence, and the mathematical/physics prerequisite map that the master
curriculum (`QUANTUM_PHYSICS_MASTER_CURRICULUM.md`) is built on.

This document is descriptive (what quantum physics education *is*); the master
doc is prescriptive (how My Tutor structures it). Read this first.

---

## 0. How this maps onto the existing My Tutor architecture (read-only findings)

Before designing anything, the existing curriculum systems were audited so the
spec references *real* structures, not invented ones. Confirmed facts:

| System | Real shape (file) | How Quantum Physics uses it |
|---|---|---|
| Knowledge graph node | `KnowledgeNode { id, domain, title, description, difficulty, prerequisites[] }` with `Difficulty = 'foundational'\|'developing'\|'proficient'\|'advanced'` (`src/lib/education/educationTypes.ts`) | Every quantum topic is one node in a new `domain: 'quantum'` graph (proposed `quantumKnowledgeGraph.ts`). Prerequisites are node-id arrays — the dependency graph below feeds this directly. |
| Library subject | `Subject { slug, name, type: SubjectType }`; `SubjectType.PHYSICS` already exists (`prisma/schema.prisma:206,878`) | New subject `slug: 'quantum_physics'`, `type: PHYSICS`. Sits beside `python`/`c`/`english` in the library — **not** board/grade-coupled like school subjects. |
| Lesson authoring | `Curriculum { subjectCode, unit, unitTitle, lesson, lessonTitle, lessonGoal, order, topicSlug }`, seeded from `LessonDef[]` (`scripts/seed-curriculum.ts`) | Each lesson in the master doc maps 1:1 to a `LessonDef` row; `topicSlug` links the lesson to its `quantum.*` knowledge node. |
| Progression | `LevelBand` enum: `COMPLETE_BEGINNER(0) → BEGINNER(1) → INTERMEDIATE(2) → ADVANCED(3) → PROFESSIONAL(4) → EXPERT(5)`; `ProfileSubject.currentLevelIndex` (`prisma/schema.prisma:233,808`) | The brief's `BEGINNER → INTERMEDIATE → ADVANCED → UNIVERSITY → RESEARCH FOUNDATION` is mapped onto these bands (see §4). |
| Progress tracking | `TopicProgress.topicSlug` → `KnowledgeNode.id`; `TopicStatus` (NOT_STARTED…MASTERED) | Mastery/revision/retest intelligence keys off the quantum node ids. |
| Visual learning | 10 `VisualType`s, deterministic `detectVisual`, narration→step sync `LessonSegment { narration, visualStep }` (`src/lib/school/visuals/`, `src/lib/visuals/`) | Most quantum visuals do **not** exist yet; this audit catalogs which existing types are reusable and which are new-type backlog (Task 4, master doc §5). |
| Assessment | `QuestionType = 'mcq'\|'true_false'\|'short_answer'`, 8+4+3=15/chapter, 70% pass, grade-tiered generation, mock engine 40/30/30 (`src/lib/school/assessment/`, `exams/mockTestEngine.ts`) | Quantum assessment pathways extend this with derivation/proof/thought-experiment question *intents* layered on the existing short_answer type (Task 6). |
| Educational Intelligence | revision (spaced `[1,3,7,14,30,90]`), misconception taxonomy (topicSlug-prefix keyed), mastery, concept-transfer, confidence-calibration, momentum, 7-strategy orchestrator (`src/lib/school/adaptive/`) | All consume `quantum.*` node ids automatically once topics exist; this audit identifies the misconception clusters and retention-sensitive nodes to seed (Task 5). |

**Conclusion of the architectural audit:** Quantum Physics requires *no new
engine*. It is a new content domain that plugs into existing curriculum,
progression, intelligence, and assessment systems. The only genuinely new
*platform* work it would eventually justify (explicitly out of scope for this
sprint) is additional `VisualType`s for quantum-specific diagrams — catalogued
here as backlog, not built.

---

## 1. The educational landscape studied

Quantum physics is taught at five distinct altitudes. The curriculum must serve
all of them in one continuous spine rather than five disconnected courses.

### 1.1 High-school quantum foundations (CBSE XII, UP Board XII, A-level, AP Physics 2)
Conceptual + light-quantitative. Centres on the "old quantum theory" (1900–1925):
- Dual nature of radiation and matter (photoelectric effect, `E = hν`, `p = h/λ`).
- de Broglie hypothesis; Davisson–Germer.
- Bohr model of hydrogen; spectral series (Lyman, Balmer, Paschen).
- Photons, work function, stopping potential, threshold frequency.
- Qualitative uncertainty principle.
*CBSE Class XII "Dual Nature of Radiation and Matter" + "Atoms" chapters define
this tier almost exactly.*

### 1.2 JEE Advanced / Olympiad quantum topics
Same old-quantum-theory syllabus as 1.1 but **problem-solving intensive**:
- Photoelectric numericals (stopping potential vs frequency graphs, multi-photon).
- Bohr model derivations (radius, energy, velocity for hydrogen-like ions `Z`).
- de Broglie wavelength of accelerated charges; matter-wave numericals.
- Moseley's law, X-ray spectra (characteristic + continuous).
- Photon momentum, radiation pressure (Olympiad).
- Combination problems linking modern physics with EM and mechanics.
*No formal wavefunction/Schrödinger work — that boundary is the line between
1.2 and 1.3.*

### 1.3 Undergraduate quantum mechanics (B.Sc / B.Tech engineering physics)
The formal theory. Standard texts: Griffiths, Zettili, Shankar (intro chapters),
Eisberg & Resnick.
- Wavefunctions, Born rule, normalization, probability current.
- Time-dependent & time-independent Schrödinger equation.
- Operators, Hermiticity, eigenvalue problems, expectation values, commutators.
- Exactly-solvable systems: infinite/finite wells, barrier & tunnelling,
  harmonic oscillator (analytic + ladder operators), hydrogen atom (3D).
- Angular momentum, spin-½, Stern–Gerlach, addition of angular momenta.
- Identical particles, Pauli principle, multi-electron atoms.
- Approximation methods: time-independent perturbation theory, variational
  method, WKB, time-dependent perturbation / Fermi's golden rule.

### 1.4 Graduate quantum foundations & quantum information
Bridges to research and to the quantum-technology industry.
- Dirac formalism, Hilbert spaces, density matrices, mixed states.
- Measurement theory, decoherence, open quantum systems.
- Qubits, Bloch sphere, entanglement, Bell inequalities, no-cloning.
- Quantum gates, circuits, algorithms (Deutsch–Jozsa, Grover, Shor).
- Quantum error correction, fault tolerance.

### 1.5 Modern quantum technologies & frontier physics
- Physical qubit platforms (superconducting, trapped-ion, photonic, spin, topological).
- Quantum cryptography (BB84, E91), QKD, quantum networks/repeaters.
- Quantum sensing & metrology.
- Relativistic QM (Klein–Gordon, Dirac), second quantization, QFT foundations,
  QED, quantum vacuum/Casimir, Standard Model overview.

---

## 2. Topic hierarchy (7 levels)

The seven levels in the brief map onto the landscape above as follows. Node-id
prefix in parentheses; these prefixes are what the misconception engine and the
knowledge graph key off.

```
LEVEL 1  FOUNDATIONS              (quantum.foundations.*)   ← landscape 1.1–1.2
LEVEL 2  CORE QUANTUM THEORY      (quantum.core.*)          ← landscape 1.3 (formalism)
LEVEL 3  QUANTUM SYSTEMS          (quantum.systems.*)       ← landscape 1.3 (solvable systems)
LEVEL 4  ADVANCED QUANTUM MECH.   (quantum.advanced.*)      ← landscape 1.3 (advanced) + 1.4 bridge
LEVEL 5  QUANTUM INFORMATION      (quantum.qinfo.*)         ← landscape 1.4
LEVEL 6  QUANTUM TECHNOLOGIES     (quantum.qtech.*)         ← landscape 1.5 (applied)
LEVEL 7  MODERN QUANTUM PHYSICS   (quantum.modern.*)        ← landscape 1.5 (frontier)
```

Each level decomposes into units, each unit into lessons. Full lesson inventory
lives in the master doc; the hierarchy spine is:

- **L1 Foundations** — The Quantum Idea · Failures of Classical Physics ·
  Wave–Particle Duality · The Uncertainty Principle
- **L2 Core Theory** — Mathematical Toolkit · The Wavefunction · The Schrödinger
  Equation · Operators & Observables · Postulates & Measurement
- **L3 Quantum Systems** — Free Particle & Wave Packets · Bound States in 1D ·
  Barriers & Tunnelling · The Harmonic Oscillator · The Hydrogen Atom
- **L4 Advanced QM** — Angular Momentum · Spin · Identical Particles & Atomic
  Structure · Approximation Methods
- **L5 Quantum Information** — Qubits & the Bloch Sphere · Multi-Qubit Systems &
  Entanglement · Quantum Gates & Circuits · Quantum Algorithms & Protocols
- **L6 Quantum Technologies** — Physical Qubits & Decoherence · Quantum Error
  Correction · Quantum Cryptography & Communication · Quantum Sensing & Networks
- **L7 Modern Quantum Physics** — Relativistic Quantum Mechanics · Quantum Field
  Theory Foundations · QED & the Quantum Vacuum · The Standard Model &
  Interpretations

---

## 3. Dependency graph

The critical pedagogical claim of this curriculum is that the dependency graph is
**connected and acyclic from a single beginner entry point** — i.e. a learner
starting at `quantum.foundations.what_is_quantum` can reach any LEVEL 7 node by
following prerequisite edges. The summarised level-level dependency (unit-level
edges are in the master doc):

```
L1 Foundations
   │ (conceptual base: quantization, duality, uncertainty)
   ▼
L2 Core Theory ──────────────┐
   │ (wavefunction, SE,       │ (linear algebra / Dirac
   │  operators, measurement) │  notation also feeds L5)
   ▼                          │
L3 Quantum Systems            │
   │ (solvable models give    │
   │  intuition for spectra)  │
   ▼                          │
L4 Advanced QM ◄──────────────┘
   │ (angular momentum, spin, identical particles,
   │  approximation methods)
   ├───────────────► L5 Quantum Information
   │                    │ (qubits = spin-½ formalism reused)
   │                    ▼
   │                 L6 Quantum Technologies
   ▼                    │
L7 Modern Quantum ◄─────┘
   (relativistic QM, QFT, QED, Standard Model)
```

Key cross-level edges that the sequence must respect:
- **L2 → L5**: qubit theory needs *complex amplitudes, superposition, measurement
  postulate* from L2, but **not** L3/L4 systems. This is the basis for the
  "Quantum Information Express" alternate pathway (master doc §4): a CS-oriented
  learner can branch from end-of-L2 directly into L5, deferring L3/L4.
- **L4 spin → L5 qubits**: the cleanest conceptual on-ramp to a qubit is the
  spin-½ system; L5 explicitly reuses the L4 spin formalism.
- **L4 → L7**: relativistic QM and QFT need angular momentum, spin, and
  perturbation theory from L4.

No back-edges (no node depends on a node in a later level except the explicit
documented cross-level forward edges). Validated in Task 9 (report §6).

---

## 4. Learning sequence & level-band mapping

The brief's 5-stage progression is mapped onto the platform's 6-band `LevelBand`
enum so `ProfileSubject.currentLevelIndex` works unmodified:

| Brief stage | Curriculum levels | `LevelBand` (index) | Audience |
|---|---|---|---|
| BEGINNER | L1 | `BEGINNER` (1) | CBSE XII, UP Board XII, curious self-learners |
| INTERMEDIATE | L2 + L3 | `INTERMEDIATE` (2) | JEE Advanced, Olympiad, early UG |
| ADVANCED | L4 | `ADVANCED` (3) | UG physics core |
| UNIVERSITY | L5 + L6 | `PROFESSIONAL` (4) | UG/PG, quantum-computing entrants |
| RESEARCH FOUNDATION | L7 | `EXPERT` (5) | PG, research on-ramp |

(`COMPLETE_BEGINNER` (0) is reserved for the optional bridging "Mathematical
Toolkit" unit at the start of L2 for learners arriving without calculus/linear
algebra.)

**Default linear sequence:** L1 → L2 → L3 → L4 → L5 → L6 → L7.
**Documented alternate pathways** (master doc §4): School/Exam Track (L1 only,
exam-tuned), Quantum Information Express (L1 → L2 → L5 → L6), UG Core (L2 → L3 →
L4), Research Foundation (L4 → L7).

---

## 5. Mathematical prerequisites

Mapped per level so the curriculum can surface a "you'll need this maths"
checkpoint (and, where the learner lacks it, route to the existing Mathematics
subject via the knowledge graph). `M0`–`M6` tags are referenced by lessons in the
master doc.

| Tag | Maths topic | First needed at | Existing My Tutor coverage |
|---|---|---|---|
| M0 | Algebra, functions, exponentials/logs, basic trig | L1 | Mathematics: `algebra`, `functions`, `trigonometry` domains |
| M1 | Complex numbers (Euler's formula, modulus, phase) | L2 | partial — `algebra`; **gap flagged** |
| M2 | Single-variable calculus (derivatives, integrals) | L2 | Mathematics: `calculus` domain |
| M3 | Differential equations (ODEs; separation of variables) | L2 (Schrödinger eq.) | **gap flagged** |
| M4 | Multivariable calculus (partial derivatives, ∇, Laplacian, spherical coords) | L3 (3D systems, hydrogen) | **gap flagged** |
| M5 | Linear algebra (vectors, matrices, eigenvalues, inner products, Hilbert spaces) | L2 (operators) → essential L4/L5 | Mathematics: `vectors`, `matrices` domains |
| M6 | Probability & statistics (distributions, expectation) | L2 (Born rule) | Mathematics: `probability`, `statistics` domains |
| M7 | Fourier analysis (transforms, wave packets) | L3 (wave packets) | **gap flagged** |
| M8 | Group theory basics (symmetry, SU(2)/SO(3) intuition) | L4/L7 | **gap flagged — optional** |

**Bridging recommendation:** L2 opens with an optional "Mathematical Toolkit"
unit covering M1, M3, M7 essentials (the flagged gaps) at exactly the depth
quantum needs, so the curriculum is self-contained for a motivated self-learner
without forcing a full separate maths course.

## 6. Physics prerequisites

| Tag | Physics topic | First needed at | Existing My Tutor coverage |
|---|---|---|---|
| P0 | Energy, momentum, conservation laws | L1 | Science/Physics (school) |
| P1 | Classical waves (frequency, wavelength, superposition, interference, standing waves) | L1 (duality) / L3 (wave packets) | Physics (school, Grade 11–12) |
| P2 | Simple harmonic motion / oscillations | L3 (harmonic oscillator) | Physics (school) |
| P3 | Electromagnetism (fields, EM waves, potentials) | L1 (photons) / L4 (perturbations) | Physics (school, Grade 12) |
| P4 | Classical mechanics (Lagrangian/Hamiltonian formulation) | L2 (Hamiltonian operator), deepens at L7 | **gap flagged** |
| P5 | Special relativity (4-vectors, `E² = (pc)² + (mc²)²`) | L7 (relativistic QM, QFT) | **gap flagged** |
| P6 | Statistical mechanics (ensembles, partition function) | L6/L7 (decoherence, thermal states) | **gap flagged — optional** |

**Hamiltonian-mechanics note (P4):** L2 introduces the Hamiltonian operator. A
short bridging lesson ("From Classical Energy to the Hamiltonian Operator")
covers the minimum P4 needed, deferring full Hamiltonian mechanics to a pointer.

---

## 7. Sources & standards consulted (for fidelity, not citation)

- **Syllabi:** CBSE Physics XII (Units VII–VIII), UP Board Intermediate Physics,
  JEE Advanced Physics (Modern Physics), IPhO syllabus (modern physics section),
  representative B.Sc/B.Tech engineering-physics quantum modules.
- **Canonical texts (topic scoping & sequencing only):** Griffiths
  *Introduction to QM*; Zettili; Shankar *Principles of QM*; Eisberg & Resnick;
  Sakurai (graduate bridge); Nielsen & Chuang *Quantum Computation and Quantum
  Information* (L5/L6); Peskin & Schroeder + Griffiths *Particle Physics* (L7).
- **Standards bodies referenced for technology tier:** NIST quantum-information
  conventions; common qubit-platform taxonomy.

No copyrighted text is reproduced; only the standard topic structure and
prerequisite ordering — which is common knowledge across the field — informs the
hierarchy.

---

## 8. Outputs handed to the master spec

This audit produced, for consumption by `QUANTUM_PHYSICS_MASTER_CURRICULUM.md`:
1. A 7-level topic hierarchy (§2).
2. A connected, acyclic dependency graph with documented cross-level edges (§3).
3. A default linear sequence + four alternate pathways, mapped to `LevelBand` (§4).
4. Math (M0–M8) and physics (P0–P6) prerequisite tags with coverage gaps flagged
   (§5–§6).
5. The confirmation that no new platform engine is required — only content nodes,
   curriculum rows, and (future, backlogged) visual types (§0).

**STOP — research audit only. No implementation.**
