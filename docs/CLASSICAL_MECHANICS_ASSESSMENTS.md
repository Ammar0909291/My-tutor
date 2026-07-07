# Classical Mechanics — Assessment Design (Task 6)

**Status: design only.** No code added to `/api/assessment/evaluate` or `/api/practice/submit`. Per
`ADVANCED_SUBJECT_FRAMEWORK_AUDIT.md` §3, the assessment engine is fully generic and subject-agnostic —
registering the curriculum from `CLASSICAL_MECHANICS_MASTER_CURRICULUM.md` automatically grants full
assessment capability with zero new code. This document is the educator-facing design note describing
how the curriculum maps onto that existing engine.

## 1. Mastery tiers

Reuses the existing generic tier model (no new tier concept introduced) mapped onto the curriculum's
difficulty tags:

| Tier | Curriculum difficulty | Levels | Description |
|---|---|---|---|
| Foundational | `F` | 1 | Vector/kinematics/Newton's-laws fluency |
| Developing | `D` | 1–2 | Applied force problems, circular motion, work/energy/momentum |
| Proficient | `P` | 2–4 | Lagrangian reformulation, rotation, gravitation |
| Advanced | `A` | 5–7 | Hamiltonian/rigid-body formalism, oscillation theory, research literacy |

## 2. Assessment progression

Follows the existing `TopicProgress`-per-`(userId, subjectSlug, topicSlug)` model:
- Each lesson (`CurriculumNode`) is independently assessable via `/api/assessment/evaluate` once
  enrolled, with prerequisite lessons gating availability exactly as Quantum Physics's lessons do.
- Practice sets (`/api/practice/submit`) accumulate evidence per topic, feeding the existing generic
  Difficulty Intelligence and Retest/Revision Intelligence without any new wiring.
- Progression through the 28 units follows the prerequisite graph defined in
  `CLASSICAL_MECHANICS_MASTER_CURRICULUM.md` — no separate assessment-level prerequisite system is
  needed; the curriculum's own `prerequisites` field is the single source of truth, identical to
  Quantum Physics.

## 3. Challenge categories

Mechanics' problem types map cleanly onto categories the generic engine already supports for other
subjects (no new category required):
- **Conceptual/qualitative** (e.g. "does kinetic energy alone determine momentum?") — multiple-choice,
  same pattern as Quantum's Visual Mastery MCQs.
- **Quantitative/numeric** (e.g. compute range of a projectile, moment of inertia of a rod) — the
  generic engine's numeric-answer evaluation, already used across Math/Science subjects.
- **Diagram interpretation** (e.g. read a free-body diagram or a velocity-time graph) — pairs naturally
  with the `free_body_diagram`/`projectile_motion` visuals proposed in
  `CLASSICAL_MECHANICS_VISUALS.md`, using the same Visual-Mastery-adjacent pattern Quantum used (not
  required for baseline assessment — visuals are a teaching/mastery enhancement, not an assessment
  dependency).
- **Derivation/multi-step** (e.g. derive the Euler–Lagrange equation for a pendulum) — higher-tier
  (Proficient/Advanced) problems, generic free-response evaluation already supported.

## 4. Reuse confirmation

No new assessment code, schema, or registry is required. This matches the audit finding exactly: once
`CLASSICAL_MECHANICS_MASTER_CURRICULUM.md`'s curriculum tree is converted to code and registered in
`SUBJECT_LIBRARY` (a future implementation sprint, not this one), `/api/assessment/evaluate` and
`/api/practice/submit` serve it immediately and identically to every other Library Subject.
