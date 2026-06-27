# Quantum Physics — Levels 2-7 Audit (`QUANTUM_PHYSICS_TREE` vs Master Curriculum)

Read-only diff of `QUANTUM_PHYSICS_TREE` (`src/lib/curriculum/subjectCatalog.ts`, lines 459-683)
against `docs/QUANTUM_PHYSICS_MASTER_CURRICULUM.md` (Revision 2), scoped to Levels 2-7
(Units U5-U33, 125 lessons per the master doc's own reconciled counts for those levels:
19+31+18+24+20+13 = 125).

Checked per unit: lesson count, lesson titles, prerequisite chain (unit-level and lesson-level),
difficulty tag, estimated hours.

## Result: CLEAN. No mismatches found.

Every unit, lesson, title, prerequisite edge, difficulty tag, and hour estimate in
`QUANTUM_PHYSICS_TREE` for Levels 2-7 matches the master curriculum document exactly.

## Level 2 — Wave Mechanics (U5-U8, 19 lessons)

- **U5 — Mathematical Toolkit II** (16h, `developing`, prereq U1): 5 lessons (5.1-5.5). Clean — titles, prereqs match.
- **U6 — Wave–Particle Duality** (10h, `developing`, prereq U4,U5): 4 lessons (6.1-6.4). Clean.
- **U7 — The Schrödinger Equation** (20h, `proficient`, prereq U6): 6 lessons (7.1-7.6), including the two doc-flagged NEW lessons (7.5 free particle/plane waves, 7.6 wave-packet normalization). Clean.
- **U8 — Particle in 1D Potentials** (14h, `proficient`, prereq U7): 4 lessons (8.1-8.4). Clean.

Level 2 total: 5+4+6+4 = 19 lessons. Matches doc.

## Level 3 — Formal Quantum Mechanics (U9-U15, 31 lessons)

- **U9 — Hilbert Spaces & Dirac Notation** (16h, `proficient`, prereq U5,U8): 5 lessons (9.1-9.5), including NEW bridge lesson 9.1. Clean.
- **U10 — Postulates of Quantum Mechanics** (16h, `proficient`, prereq U9): 5 lessons (10.1-10.5), including NEW pictures-of-QM lesson 10.5. Clean.
- **U11 — Operators, Observables & Measurement** (18h, `advanced`, prereq U10): 6 lessons (11.1-11.6), including NEW symmetry/conservation lesson 11.5. Clean.
- **U12 — The Quantum Harmonic Oscillator** (12h, `advanced`, prereq U11): 4 lessons (12.1-12.4). Clean.
- **U13 — Angular Momentum & Spin** (16h, `advanced`, prereq U11): 5 lessons (13.1-13.5). Clean.
- **U14 — The Hydrogen Atom** (14h, `advanced`, prereq U12,U13): 4 lessons (14.1-14.4). Clean.
- **U15 — Composite Quantum Systems & Tensor Products** (10h, `advanced`, prereq U13) — the doc's R-Fix-1 new unit: 2 lessons (15.1-15.2). Present in code exactly as specified. Clean.

Level 3 total: 5+5+6+4+5+4+2 = 31 lessons. Matches doc.

## Level 4 — Advanced Quantum Systems (U16-U20, 18 lessons)

- **U16 — Identical Particles & Many-Body Basics** (12h, `advanced`, prereq U14,U15): 4 lessons (16.1-16.4). Lesson 16.1 prereq correctly includes `15.2` and 16.3 includes `15.1` — the R-Fix-1 prerequisite-inversion fix is present in code. Clean.
- **U17 — Approximation Methods** (14h, `advanced`, prereq U14): 4 lessons (17.1-17.4). Clean.
- **U18 — Time-Dependent Quantum Mechanics** (12h, `advanced`, prereq U17): 4 lessons (18.1-18.4). Lesson 18.1 prereq correctly includes `10.5` (pictures of QM). Clean.
- **U19 — Scattering Theory** (10h, `advanced`, prereq U17): 3 lessons (19.1-19.3). Clean.
- **U20 — Quantum Entanglement & Nonlocality** (10h, `advanced`, prereq U13,U15,U16): 3 lessons (20.1-20.3). Lesson 20.1 prereq correctly references `15.1` (moved tensor-product content, not a duplicated self-contained lesson). Clean.

Level 4 total: 4+4+4+3+3 = 18 lessons. Matches doc.

## Level 5 — Quantum Information & Computing (U21-U25, 24 lessons)

- **U21 — Qubits & Quantum Gates** (12h, `proficient`, prereq U20): 4 lessons (21.1-21.4). Clean.
- **U22 — Quantum Circuits & Algorithms** (24h, `advanced`, prereq U21): 7 lessons (22.1-22.7), including the two R-Fix-4 NEW lessons (22.6 VQE, 22.7 QAOA). Clean.
- **U23 — Quantum Error Correction** (12h, `advanced`, prereq U22): 4 lessons (23.1-23.4). Clean.
- **U24 — Quantum Cryptography & Communication** (10h, `proficient`, prereq U22): 3 lessons (24.1-24.3). Clean.
- **U25 — Quantum Hardware Platforms** (18h, `proficient`, prereq U23): 6 lessons (25.1-25.6), including the two R-Fix-4 NEW lessons (25.5 error mitigation, 25.6 quantum advantage literacy). Clean.

Level 5 total: 4+7+4+3+6 = 24 lessons. Matches doc.

## Level 6 — Modern Quantum Physics (U26-U30, 20 lessons)

- **U26 — Quantum Statistical Mechanics** (12h, `advanced`, prereq U16): 4 lessons (26.1-26.4). Clean.
- **U27 — Open Quantum Systems & Decoherence** (12h, `advanced`, prereq U20,U26): 4 lessons (27.1-27.4). Clean.
- **U28 — Relativistic Quantum Mechanics** (12h, `advanced`, prereq U14): 4 lessons (28.1-28.4). Clean.
- **U29 — Introduction to Quantum Field Theory** (14h, `advanced`, prereq U28): 4 lessons (29.1-29.4). Clean.
- **U30 — Particle Physics Foundations** (12h, `advanced`, prereq U29): 4 lessons (30.1-30.4). Lesson 30.2 prereq correctly includes `11.5` (now builds on Level-3 symmetry intro, per doc). Clean.

Level 6 total: 4+4+4+4+4 = 20 lessons. Matches doc.

## Level 7 — Research Foundations / Orientation & Literacy (U31-U33, 13 lessons)

- **U31 — Advanced QFT & Gauge Theory** (14h, `advanced`, prereq U29): 4 lessons (31.1-31.4). Clean.
- **U32 — Quantum Many-Body & Condensed Matter** (16h, `advanced`, prereq U26): 5 lessons (32.1-32.5), including the NEW Berry/geometric-phase lesson (32.4), correctly sequenced before 32.5 topological phases per the doc's gap-G4 fix. Clean.
- **U33 — Frontiers & Research Methods** (10h, `advanced`, prereq U31,U32): 4 lessons (33.1-33.4). Clean.

Level 7 total: 4+5+4 = 13 lessons. Matches doc.

Note: both code and doc independently set `LevelIndex` 5 for Level 7's units (same raw level
index as Level 6) — this is intentional in the master doc itself ("Level 7 ... (`LevelIndex` 5)"),
not a code/doc divergence.

## Grand total (Levels 2-7)

19 + 31 + 18 + 24 + 20 + 13 = **125 lessons**, across 29 units (U5-U33) — matches the task's stated
scope exactly, and matches the master doc's own reconciled counts for these levels.

## Method note

Verified via direct line-by-line comparison of `qUnit()`/`qL()` calls in `subjectCatalog.ts`
(lines 459-683) against the "TASK 3 + TASK 4 — UNITS & LESSONS" section of the master curriculum
doc, checking: unit lesson count, every lesson title, every lesson-level prerequisite id, every
unit-level prerequisite (mapped to `u{n}` slugs), every difficulty tag (`foundational`/`developing`/
`proficient`/`advanced` vs `F`/`D`/`P`/`A`), and every `estimatedHours` value. No discrepancy found
in any of the above across all 29 units.
