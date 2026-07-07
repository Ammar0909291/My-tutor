# Classical Mechanics — Visual Learning Mapping (Task 4)

**Status: design only.** No `VisualType` added, no renderer built, no `detectVisual` rule written, no
`VISUAL_SUBJECTS` registration. Maps visual-learning opportunities identified in
`CLASSICAL_MECHANICS_CURRICULUM_RESEARCH.md` against `CLASSICAL_MECHANICS_MASTER_CURRICULUM.md`,
following the structure of `ADVANCED_SUBJECT_TEMPLATE.md` §5.

## 1. Reusable existing visual infrastructure

No existing `VisualType` renderers are physics-content-specific enough to reuse as-is (Quantum's 9
visuals are quantum-specific SVGs), but the **infrastructure** is fully reusable without modification:
- `revealStep`-gated SVG renderer pattern + `visualAnim.module.css` (`.reveal`/`.drawLine`).
- `VisualCard.tsx` switch-based dispatch.
- `detectVisual.ts` subject-keyed `MatchRule[]` table + `VISUAL_SUBJECTS` Set gating.
- The interactive mastery subsystem (`graph`, `number_line`, `geometry`, `process_flow`) is directly
  reusable for several Classical Mechanics challenges without any new SVG renderer at all — e.g.
  velocity-vs-time graph reading maps onto the existing `graph` challenge type, and force-magnitude
  estimation maps onto `number_line`. This lowers Classical Mechanics' novel-rendering cost relative to
  Quantum Physics (consistent with the "Medium" cost rating in `ADVANCED_SUBJECT_EXPANSION_REPORT.md`).

## 2. New visual candidates (priority-ordered)

Ten candidate `VisualType`s, each mapped to the lessons it supports and the misconception it targets
(full misconception detail in `CLASSICAL_MECHANICS_MISCONCEPTIONS.md`):

| # | Candidate visual | Supports | Misconception targeted | Reveal-stage sketch |
|---|---|---|---|---|
| 1 | `free_body_diagram` | L4.5, L5.1–5.5 | force/motion ("force of motion" / missing normal force) | object → forces appear one at a time → net-force vector |
| 2 | `projectile_motion` | L3.3–3.4 | "heavier objects fall faster" / horizontal-vertical independence | launch → trajectory traces → vx/vy components shown separately |
| 3 | `inclined_plane` | L5.2 | force-component confusion on a slope | incline drawn → weight vector → decomposition into parallel/perpendicular components |
| 4 | `circular_motion` | L6.1–6.3 | "centrifugal force is real" / no inward force misconception | orbit path → velocity tangent vector → centripetal acceleration vector |
| 5 | `momentum_collision` | L8.3–8.4 | momentum vs. energy conflation | before-panel (two velocities) → collision → after-panel (conserved momentum, energy bar) |
| 6 | `energy_bar_diagram` | L7.3–7.4, L17.4 | "energy runs out" rather than transforms | KE bar + PE bar at multiple positions → total-energy line stays constant |
| 7 | `pendulum_phase` | L17.3, L21.3 | confusing restoring force direction / amplitude vs. period | pendulum swing → phase-space (θ vs. ω) trace building up |
| 8 | `spring_oscillator` | L17.1–17.2, L18.1–18.2 | amplitude/period confusion, damping misunderstood as "losing energy instantly" | spring + mass → x(t) trace → amplitude envelope for damped case |
| 9 | `torque_rotation` | L13.2–13.4 | torque vs. force conflation | lever/pivot → force vector → torque arm highlighted → angular acceleration |
| 10 | `orbit_ellipse` | L16.1–16.3 | "orbits are circles" / constant-speed-orbit misconception | central body → elliptical path → speed varying (faster at perihelion) shown via vector length |

Estimated 9–10 visuals matches the readiness-matrix estimate of "7–9" from
`ADVANCED_SUBJECT_EXPANSION_REPORT.md` (slightly higher here after detailed curriculum mapping; final
selection at implementation time may defer 1–2 lowest-priority candidates, consistent with how Quantum
Physics phased its 9 visuals across 2 build phases).

## 3. Suggested build phasing (if/when implemented — not part of this sprint)

- **Phase 1 (highest misconception density + earliest curriculum need):** `free_body_diagram`,
  `projectile_motion`, `inclined_plane`, `circular_motion`, `momentum_collision`.
- **Phase 2 (advanced/formal-layer support):** `energy_bar_diagram`, `pendulum_phase`,
  `spring_oscillator`, `torque_rotation`, `orbit_ellipse`.

This mirrors Quantum Physics's 2-phase visual rollout (5 + 4 visuals) and its subsequent 5-visual
priority subset for Visual Mastery integration.

## 4. Visual Mastery bridging (design note only)

Per `ADVANCED_SUBJECT_TEMPLATE.md` §6, a future Classical Mechanics mastery sprint would: select the
5 highest-value visuals from the table above (likely `free_body_diagram`, `projectile_motion`,
`circular_motion`, `momentum_collision`, `energy_bar_diagram`), write a 10-challenge static bank, build
one `ClassicalMechanicsVisualChallenge.tsx` bridging component, and add one new `VisualEngine` value
(`'mechanics_interactive'`). Not built in this sprint.
