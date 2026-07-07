# Quantum Physics — Curriculum QA Audit (Tasks 1–6)

**Status: audit only. No code, no subject registration, no implementation, no curriculum modification.**
Deep quality review of the designed curriculum (7 levels / 32 units / 131 lessons) prior to any
implementation. Findings are recommendations for a *future* design revision — nothing is changed here.

---

## Summary / bottom line

The curriculum is **strong, coherent, and genuinely beginner-to-research in scope**, with an
excellent wave-first→axiomatic spiral and well-placed spin/entanglement-before-quantum-information
sequencing. QA found **one real prerequisite inversion** (composite-system/tensor-product formalism
is introduced at L19.1 but is implicitly required by identical particles at U15), **two beginner
knowledge cliffs** (Level-1 calculus compressed into ~4 lessons; the Level-2→3 intuition→formalism
jump), and **depth/ambition mismatches in Level 7** (QFT/gauge/renormalization compressed into ~12
lessons). None are fatal; all are fixable with small additive lessons and minor reordering. Modern QI
topics (NISQ/variational algorithms) are under-represented. **Overall: implementation-ready after a
short list of required fixes.**

---

## TASK 1 — Expert review (physicist / professor / curriculum designer / educational psychologist)

### Strengths
- **Sound macro-ordering:** math toolkit → classical failure → wave mechanics → formalism → advanced
  → information → modern → research mirrors MIT 8.04→8.05→8.06 + a QI track.
- **Spiral design** (intuition at L2, rigor at L3) is pedagogically excellent and directly serves the
  "beginner friendly + rigorous" mandate.
- **Spin & entanglement precede quantum information** — avoids the common "gates as recipes" failure.
- **Decoherence and error correction are first-class units**, not appendices.

### Findings

**F1 (prerequisite mistake — HIGH).** *Composite systems & tensor products* live at **L19.1 (Level 4)**,
but **identical particles (U15, L15.1–15.3)** — symmetric/antisymmetric states, Slater determinants —
genuinely require the multi-particle tensor-product state space. U15 precedes U19, so the formal tool
is used before it is taught. **Fix:** introduce a short tensor-product/composite-system lesson at the
end of Level 3 (e.g., new L13.6 or a U14 addendum) and have L15.1 and L19.1 depend on it.

**F2 (weak ordering — MEDIUM).** *Pictures of quantum mechanics* (Schrödinger vs Heisenberg vs
interaction picture) are never explicitly taught, yet time-dependent perturbation theory (U17) and the
interaction picture are assumed. **Fix:** add a lesson (e.g., L10.5 or early U17) on the three pictures.

**F3 (missing concept — MEDIUM).** No explicit **free particle / plane waves & momentum eigenstates**
lesson before the 1D wells (U8); learners meet normalization subtleties and momentum representation
(L9.4) without it. **Fix:** add an L7.5 (free particle, plane waves, wave-packet normalization).

**F4 (missing concept — LOW/MEDIUM).** **Symmetries & conservation laws** appear only at L29.2
(particle physics). They are foundational much earlier (Noether, parity, degeneracy). **Fix:** a short
symmetry lesson in Level 3 (around U11) would strengthen the through-line.

**F5 (excessive complexity — MEDIUM).** **Level 7** packs non-abelian gauge theory, renormalization,
path integrals, BCS, topological phases, and research methods into **12 lessons**. This is realistic
only as *orientation*, not working competence. Either relabel Level 7 explicitly as "orientation /
literacy," or expand it (see Task 4). Mild **overengineering** relative to the rest of the curriculum's
granularity.

**F6 (duplication — LOW, acceptable).** Uncertainty appears at L6.4 (qualitative) and L11.3 (rigorous);
measurement at L10.3 and revisited L26.4. This is **intentional spiral**, not redundant — keep, but
label as "revisit/deepen" so it isn't mistaken for repetition.

**No circular dependencies** were found (consistent with the Report's DAG validation); F1 is an
*ordering/placement* issue, not a cycle.

---

## TASK 2 — Beginner path review (algebra-only, no calculus, no QM)

**Verdict: realistically completable, but with two genuine cliffs that need scaffolding.**

- **Knowledge cliff C1 — Level 1 calculus compression.** U1 teaches derivatives (L1.2), integrals
  (L1.3), **and** differential equations (L1.4) in single lessons each. For an algebra-only learner,
  ODEs-in-one-lesson is the steepest cliff in the curriculum. **Fix:** split L1.4 into "intro ODEs"
  + "2nd-order ODEs & oscillator equation," and add more worked practice. Consider 2 lessons for
  integrals.
- **Knowledge cliff C2 — Level 2→3 abstraction jump.** Difficulty jumps to `A` by U11, and Dirac
  notation/Hilbert space (U9) is the classic intimidation point. The spiral softens it, but a bridging
  "from wavefunctions to state vectors" lesson would help. **Fix:** add an explicit bridge lesson at
  the start of U9.
- **Intimidation points:** complex numbers (L1.5) and eigenvalues (L5.3) arrive fast; Bra–ket (L9.1)
  and commutators (L11.2) are notation shocks. All are surmountable with the existing visuals + tutor.
- **Motivation risks:** the long L1–L2 math runway (~34 lessons) before "real" quantum payoff
  (double-slit at L6.2, tunneling at L8.3) risks early drop-off. **Fix (motivational):** seed early
  "preview" hooks (the failure-of-classical-physics unit U4 already helps); surface a quantum "wow"
  demo earlier via the visuals layer.

Accessibility is good but not effortless; the fixes above are about **smoothing**, not restructuring.

---

## TASK 3 — University comparison (MIT / Stanford / Caltech / Cambridge / Oxford)

| Area | Our coverage | vs. reference programs |
|---|---|---|
| Core QM (postulates, operators, measurement, QHO, ang. mom./spin, hydrogen) | Levels 3 | **On par** (MIT 8.05, Cambridge Principles) |
| Wave mechanics & 1D systems | Level 2 | **On par** (MIT 8.04) |
| Perturbation / scattering / identical particles | Level 4 | **On par** (MIT 8.06, Oxford) |
| Quantum information & computing | Level 5 | **On par / strong** (Nielsen–Chuang, CS269Q, Preskill) |
| Statistical / open-system QM | Level 6 | **On par** (Caltech) |
| Relativistic QM / QFT intro / particle physics | Levels 6–7 | **Intro-level** (lighter than dedicated grad QFT) |
| Gauge / renormalization / path integrals / condensed matter | Level 7 | **Orientation only** (below a full grad course) |

### Gaps / missing modern topics
- **G1:** **NISQ-era & variational algorithms** (VQE, QAOA), quantum advantage/supremacy, and
  error *mitigation* are barely present (only L24.4 touches NISQ). Given the brief's "modern quantum
  technologies" goal, add 1–2 lessons in U21/U24.
- **G2:** **Tensor networks / matrix product states** (now standard in many-body & QI) absent — optional.
- **G3:** **Quantum metrology / sensing** absent — optional but a real "modern technology."
- **G4:** **Berry phase / geometric phase** missing before topological phases (L31.4) — recommended.

### Overengineering
- Level 7's breadth (Task 1 F5) exceeds the depth the lesson budget can support; better to **narrow and
  deepen** or explicitly frame as literacy.

Otherwise coverage is **not** over-engineered; it tracks the reference syllabi closely.

---

## TASK 4 — Research readiness review (could a Level-7 finisher read intro papers?)

| Paper type | Realistic outcome after Level 7 | Missing preparation |
|---|---|---|
| **Quantum computing** (algorithms, NISQ) | **Yes** — can read most intros | Add VQE/QAOA + benchmarking depth (G1) |
| **Intro quantum information** | **Yes** — strong (entanglement, density matrices, QEC, channels) | Minor: more on entropy measures / channel capacities |
| **Intro particle physics** | **Partially** — can follow conceptual/overview papers | QFT compression (F5) limits technical reading; needs deeper cross-sections, Feynman-rule practice |
| **Intro condensed matter** | **Partially** — band theory, BCS, topological covered at orientation depth | Add Berry phase (G4), second-quantization practice, more many-body methods |

**Honest verdict:** a diligent finisher reaches **research literacy** (can read and broadly understand
introductory papers and reviews) but **not full technical fluency** in QFT-heavy particle physics or
advanced condensed matter — consistent with a senior-undergrad/early-grad bridge, which matches the
stated "research *foundation*" goal. To raise particle/condensed-matter reading from "partially" to
"yes," expand Level 7 (Task 1 F5) and add G4.

---

## TASK 5 — My Tutor compatibility (review only)

| System | Compatible? | Notes |
|---|---|---|
| **Visual Learning** | ✅ Strong | 6 existing visuals reusable now; 10 proposed types conform to the `revealStep` engine (`QUANTUM_PHYSICS_VISUALS.md`). No engine change. |
| **Educational Intelligence** | ✅ Strong | All EI sprints (S1–S11) are `subjectSlug`/`topicSlug`-keyed and subject-agnostic; the lesson tree feeds Difficulty/Teaching-Plan engines directly. |
| **Tutor Max** | ✅ Compatible | Lessons generate from the module tree via `renderCurriculumTree`. **Caveat R4:** 131 lessons makes a full-tree prompt large — use the existing `modulesForLevelSpan` to feed level-sliced trees (no new code). |
| **Assessments** | ✅ Compatible | 5-tier progression maps onto existing subject/topic-assessment + evidence/mastery models (`QUANTUM_PHYSICS_ASSESSMENTS.md`). |
| **Adaptive Teaching** | ✅ Strong | Misconception catalog (20 items) is lesson-anchored, ready to wire to `MistakeRecord` categories for remediation. |

### Compatibility caveats (not blockers)
- **CC1 — 7→6 level mapping:** the platform's `LevelIndex` is 0–5, so Levels 6 and 7 both map to index 5.
  Two conceptual levels share one platform level — acceptable, but level-based UI/gating granularity is
  coarser at the top. Decide explicitly at registration (Implementation Plan R3).
- **CC2 — prompt size (R4):** as above; mitigated by existing level-slicing, no engine change.
- **CC3 — category/SubjectType (R1):** reuse `physics` → `SubjectType.PHYSICS` to avoid a schema change.

No system is incompatible; integration remains a single-file additive registration per the
Implementation Plan.

---

## TASK 6 — Final verdict

### Strengths
1. Coherent beginner→research arc with an excellent intuition→rigor spiral.
2. Correct, deliberate placement of spin and entanglement before quantum information.
3. Decoherence and error correction treated as first-class.
4. Strong, modern quantum-information level; clean DAG (no cycles).
5. Fully compatible with every My Tutor subsystem with no engine change.

### Weaknesses
1. **F1 prerequisite inversion** — tensor products/composite systems taught after identical particles.
2. **C1 beginner calculus cliff** (ODEs compressed) and **C2** L2→L3 abstraction jump.
3. **F5 Level-7 depth/ambition mismatch** (QFT/gauge/renorm compressed).
4. **G1 modern QI gaps** (VQE/QAOA, error mitigation, quantum advantage thin).
5. **F2/F3 missing connective lessons** (pictures of QM; free particle/plane waves).

### Required fixes (before implementation)
- **R-Fix-1 (F1):** add a tensor-product/composite-system lesson at end of Level 3; make U15 + U19 depend on it.
- **R-Fix-2 (C1):** split Level-1 calculus (separate ODE lesson; add practice) to remove the cliff.
- **R-Fix-3 (F3):** add a free-particle/plane-wave + normalization lesson (L7.5) before U8.
- **R-Fix-4 (G1):** add 1–2 modern-QI lessons (VQE/QAOA, error mitigation, quantum advantage) in U21/U24.

### Optional improvements
- F2 pictures-of-QM lesson; F4 early symmetries lesson; C2 wavefunction→state-vector bridge lesson.
- G2 tensor networks; G3 quantum metrology/sensing; G4 Berry/geometric phase before topological phases.
- Expand Level 7 (or relabel as "research literacy") to lift particle/condensed-matter paper-reading
  from "partially" to "yes."
- Add an early motivational "quantum wow" demo to de-risk the long math runway.

### Final scores (/10)

| Dimension | Score | Rationale |
|---|---|---|
| **Educational Quality** | **8.5** | Excellent spiral & ordering; minor connective gaps (F2/F3) and one inversion (F1). |
| **University Quality** | **8.5** | On par with MIT/Cambridge for core QM & QI; Level-7 depth lighter than dedicated grad courses. |
| **Research Preparation** | **7.5** | Literacy achieved; full QFT/condensed-matter fluency needs Level-7 expansion + G1/G4. |
| **Beginner Accessibility** | **7.0** | Reachable from algebra, but calculus cliff (C1) and L2→L3 jump (C2) need scaffolding. |
| **My Tutor Compatibility** | **9.0** | Fully compatible, single-file additive integration; only coarse top-level mapping (CC1) and prompt size (CC2). |
| **Overall** | **8.1** | Strong, implementation-ready after the four required fixes. |

---

## STOPPED AFTER REPORT

Audit only. No code, no subject registration, no implementation, no curriculum modification. All
findings are recommendations for a future, separately-authorized curriculum-revision sprint.
