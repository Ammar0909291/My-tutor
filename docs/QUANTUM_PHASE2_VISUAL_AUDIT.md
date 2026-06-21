# Quantum Physics — Phase 2 Visual Backlog Audit (Tasks 1–2)

**Status: audit + selection.** Ranks the remaining deferred quantum visuals and selects the Phase 2
set. No engine redesign — every candidate conforms to the existing `VisualType` + `revealStep`
contract (Sprint R.1 reveal, Sprint S/T/U narration), exactly like the 5 Phase-1 visuals.

## Phase 1 (already shipped, live in production)

`double_slit · wave_function · potential_well · quantum_tunneling · bloch_sphere`

## Remaining backlog (from `QUANTUM_PHYSICS_VISUALS.md` §2, minus what Phase 1 already covered)

| Candidate | Anchor lessons | Educational impact | Misconception coverage | Curriculum coverage | Beginner value | Impl. risk |
|---|---|---|---|---|---|---|
| **energy_level_diagram** | L4.3, L14.2, L17.3 | **High** — atomic transitions, line spectra, photon emission/absorption | "energy is continuous", "electrons spiral in" | **Broad** (Levels 1–4, atomic + spectroscopy) | **High** — first concrete "why atoms emit colour" | **Low** (levels + arrows) |
| **quantum_circuit** | L21.1, L21.2 | **High** — the core notation of all quantum computing lessons | "quantum gates are just logic gates", "measurement is reversible" | Level 5 (computing track) | Medium | **Low** (lines + boxes) |
| **stern_gerlach** | L13.3 | **High** — the canonical spin-measurement / quantization-of-angular-momentum demo | "spin is literal spinning", "measurement reveals a pre-existing value" | Level 3 (spin) | **High** — concrete measurement story | **Low** (beam + split) |
| **entanglement_pair** | L19.2, L19.3 | **High** — correlated measurement, Bell-pair statistics | "entanglement sends signals", "hidden variables", "spooky FTL" | Level 4 (entanglement) | Medium | Medium (two-particle correlation) |
| bloch_rotation_timeline | L17.4 | Medium — Rabi/precession dynamics | "gates are instantaneous", "measurement mid-rotation" | Level 4–5 (narrow) | Low | Medium (overlaps bloch_sphere) |
| orbital_cloud | L14.3 | Medium — hydrogen orbital probability clouds | "orbits are planetary paths" | Level 3 (narrow) | Medium | **High** (3D cloud in 2D SVG) |

## Selection (Task 2)

**Phase 2 = 4 visuals: `energy_level_diagram`, `quantum_circuit`, `stern_gerlach`, `entanglement_pair`.**

Rationale:
- Each is **High** educational impact, each carries **distinct, high-frequency misconceptions**, and
  together they span four different curriculum regions (atomic/spectra, computing, spin, entanglement)
  with **no overlap** against the Phase-1 set or each other — maximizing catalog breadth per visual.
- All four are **Low–Medium implementation risk** and fit the existing flat-SVG + `revealStep` pattern
  (levels, lines, boxes, beams, paired dots) with no dynamics framework.
- **Deferred to a later phase:** `bloch_rotation_timeline` (conceptually overlaps the shipped
  `bloch_sphere`, narrower lessons) and `orbital_cloud` (genuine 3D probability cloud — highest render
  risk per impact, best served by a dedicated effort). Deferring them keeps Phase 2 high-value and
  low-risk, consistent with the Phase-1 selection discipline.

## Integration points (additive only — identical to Phase 1)

1. `visualTypes.ts` — +4 `VisualType` union members, +4 `VISUAL_META` entries.
2. 4 new `revealStep`-gated SVG renderers reusing `visualAnim.module.css` (`reveal`/`drawLine`).
3. `VisualCard.tsx` — +4 imports, +4 `VisualComponent` switch cases, +4 `VISUAL_STEP_COUNTS`.
4. `detectVisual.ts` — +4 keyword rules in `QUANTUM_RULES`, +4 types in `parseVisualTag`'s `VALID`
   set and `buildVisualsSystemBlock`'s list.
5. `VisualDemo.tsx` — +4 demo cards.

No change to the playback engine, narration sync, Tutor Max, EI, assessments, or schema.
