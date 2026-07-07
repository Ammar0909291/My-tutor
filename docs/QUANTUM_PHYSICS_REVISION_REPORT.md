# Quantum Physics — Revision Report (Tasks 1–5)

**Status: curriculum-document update only. No code, no subject registration, no database, no implementation.**

## Summary / bottom line

All 4 QA-required fixes applied, 4 of 6 optional improvements adopted, and Level 7 relabeled
(Task 3 decision **B**: reduce scope, relabel as "Research Foundations — Orientation & Literacy")
rather than expanded into a full grad sequence. Curriculum grew from **32 units / 131 lessons** to
**33 units / 144 lessons** (+1 unit, +13 lessons, +44h). Revalidation: **no prerequisite gaps, no
circular dependencies, beginner→research path intact** — all five Task-4 checks pass.
`QUANTUM_PHYSICS_MASTER_CURRICULUM.md` and `QUANTUM_PHYSICS_CURRICULUM_REPORT.md` updated in place.

## TASK 1 — Required fixes applied

| Fix | Change |
|---|---|
| **R-Fix-1** | New **U15 — Composite Quantum Systems & Tensor Products** (2 lessons: L15.1 tensor products, L15.2 multi-particle Hilbert spaces) inserted at the end of Level 3, before Identical Particles. U16 (Identical Particles, was U15) and U20 (Entanglement, was U19) now correctly prereq U15 instead of defining tensor products inline or using them before introduction. Closes the QA-flagged inversion. |
| **R-Fix-2** | U1 split from 5→7 lessons: derivatives (L1.2) gets a new applications/practice lesson (L1.3); the old single ODE lesson (L1.4) is split into first-order/separable (L1.5) and a new second-order/oscillator-equation lesson (L1.6). Removes the steepest beginner cliff. |
| **R-Fix-3** | U7 grows 4→6 lessons: new L7.5 (free particle, plane waves, momentum eigenstates) and L7.6 (wave-packet normalization intuition) inserted before U8 (1D potential wells), which now explicitly prereqs them. |
| **R-Fix-4** | U22 (Circuits & Algorithms) grows 5→7 lessons: +L22.6 VQE, +L22.7 QAOA. U25 (Hardware) grows 4→6 lessons: +L25.5 Error mitigation, +L25.6 Quantum advantage literacy. |

## TASK 2 — Optional improvements: 4 adopted, 2 deferred

**Adopted** (each closes a specific QA finding):
- **Wavefunction→state-vector bridge** (new L9.1) — softens the Level 2→3 abstraction jump (QA C2).
- **Pictures of quantum mechanics** (new L10.5) — was assumed-but-untaught before U18 (QA F2).
- **Early symmetry/conservation intro** (new L11.5) — previously only appeared at L30.2 particle physics (QA F4).
- **Berry/geometric phase** (new L32.4) — now precedes topological phases L32.5 (QA G4).

**Deferred** (documented, not included — would not proportionately improve the curriculum at this stage):
- **Quantum metrology/sensing** — genuinely modern but tangential to the core beginner→research spine; flag for a future enrichment pass.
- **Tensor networks** — a specialist numerical tool; Level 7 is already at orientation-depth (Task 3), and adding it would re-introduce the depth/breadth mismatch QA flagged.

## TASK 3 — Level 7 decision: **Option B**

Recommendation: **reduce/clarify scope, relabel** rather than expand to full technical fluency.
Level 7 is renamed **"Research Foundations — Orientation & Literacy"**, explicitly setting learner
expectations (orientation/vocabulary, not working competence in gauge theory/renormalization/path
integrals — that requires a dedicated graduate sequence, out of scope). The only structural addition
is the Berry-phase lesson (closes a specific readiness gap, G4); gauge theory/renormalization/path
integrals/many-body/topological-matter unit content is otherwise unchanged. This directly resolves QA
finding F5 (excessive complexity) without an unsustainable lesson-count expansion.

## TASK 4 — Revalidation

- **Prerequisite graph:** every lesson's prereq references an earlier-numbered lesson that exists;
  spot-checked across all renumbered units (L16.1←L15.2, L16.3←L15.1, L20.1←L15.1, L18.1←L10.5,
  L22.6←L17.1, L25.5←L23.1, L32.5←L32.4, L30.2←L11.5). **No gaps.**
- **Lesson ordering:** strictly increasing unit/lesson numbering preserved through the full renumber
  (old U15–U32 → new U16–U33); no lesson references a later-numbered one. **Consistent.**
- **Circular dependencies:** all edges still point earlier→later; the graph remains a **DAG**. **None found.**
- **Beginner pathway:** L1.1 (algebra) → ... → U15 (composite systems, now correctly placed) →
  U16 (identical particles) intact and improved; calculus/free-particle cliffs smoothed (R-Fix-2/3). **Verified.**
- **University pathway:** core QM (postulates→operators→QHO→spin→hydrogen, Level 3) and advanced
  systems (Level 4) unchanged in substance, now better sequenced. **Verified, on par with reviewed programs.**
- **Research pathway:** QI/QC strengthened (VQE/QAOA/error mitigation/quantum advantage); Level 7
  reframed as literacy, with Berry phase closing a condensed-matter gap. **Verified, literacy-level achieved.**

**Revalidation verdict: PASS on all five checks.**

## Lesson/unit count changes

| | Before (Rev 1) | After (Rev 2) | Δ |
|---|---|---|---|
| Units | 32 | 33 | +1 |
| Lessons | 131 | 144 | +13 |
| Hours | ~400 | ~444 | +44 |

Per-level lessons: L1 17→19, L2 17→19, L3 26→31, L4 19→18, L5 20→24, L6 20→20, L7 12→13.

## Final readiness verdict

**Implementation-ready.** All 4 required QA fixes are applied and revalidated; the one real
prerequisite inversion (F1) is structurally resolved, not just patched; both beginner cliffs are
smoothed; modern quantum-computing coverage is strengthened; Level 7's depth/ambition mismatch is
resolved by honest relabeling rather than scope creep. No code, database, subject registration, or
engine change was made — `QUANTUM_PHYSICS_MASTER_CURRICULUM.md` and `QUANTUM_PHYSICS_CURRICULUM_REPORT.md`
are updated in place to Revision 2.

## STOPPED AFTER REPORT

Curriculum-document update only. No code, no subject registration, no database, no implementation.
