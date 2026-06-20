# Visual Assessment Audit — Sprint G, Task 1

Audit of `GraphRenderer`, `NumberLineRenderer`, `GeometryRenderer`, `ProcessFlowRenderer` as they stand after Sprint F (Interactive Learning Layer), to determine how an assessment/challenge layer can be added on top without rebuilding anything.

## 1. What each renderer already computes (the "free" assessment substrate)

Sprint F's interaction layer already tracks every number a challenge would need to grade, as local component state derived from drag gestures. No renderer needs a new source of truth — challenges only need to *read* what already exists and *compare* it to a target.

| Renderer | Already-live values (Sprint F state) | Where |
|---|---|---|
| GraphRenderer | `model.m`, `model.b` (only when `spec.interactive` and the equation matches the strict `y=mx+b` regex) | `model` state, `GraphRenderer.tsx` |
| NumberLineRenderer | `points: number[]` (draggable highlighted values), `comparison` string for the 2-point case | `points` state, `NumberLineRenderer.tsx` |
| GeometryRenderer (triangle) | `base`, `height` → derived `area`, `perimeter` | `TriangleShape` |
| GeometryRenderer (rectangle) | `width`, `height` → derived `area` | `RectangleShape` |
| GeometryRenderer (circle) | `radius` → derived `area`, `circumference` | `CircleShape` |
| GeometryRenderer (angle) | `angle` | `AngleShape` |
| ProcessFlowRenderer | `order: number[]` (current permutation), `isCorrect` (already compares `order` to the identity permutation) | `useReorder()` |

**Conclusion**: assessment is a pure read-and-compare problem against existing state. No renderer needs new drag math, new state shapes, or new event handlers — only a new derived `isChallengeMet` (or similar) boolean/feedback string computed from existing state plus a new `spec.challenge` target.

## 2. Assessment architecture

- **Opt-in, additive, sits beside `interactive`**: a new optional `challenge` object on each leaf `VisualSpec` schema, exactly mirroring how `interactive: boolean` was added in Sprint F. Absent `challenge` → zero new code paths execute, same structural guarantee Sprint F established for `interactive`.
- **`challenge` implies `interactive`** in practice (you can't demonstrate understanding through interaction you can't perform), but the two flags are independent in the schema — a renderer with `challenge` set but `interactive` unset/false simply has nothing to validate against (no handles, so the live value never changes from the spec's initial value). Renderers treat this as "challenge present, but not interactive" → they still show the target and the current vs. target state, just without drag handles. This keeps the two concerns orthogonal and avoids a `superRefine` cross-field requirement that would make `challenge` accidentally invalidate otherwise-valid specs.
- **No new component, no new render path**: validation is computed inline in the same function component that already owns the live state (a `useMemo`/derived `const`), and feedback is a small `<p>` line under the existing card — the same pattern Sprint F used for `ReorderFeedback` / the live equation subtitle / the comparison line.
- **Per-spec-type challenge shape**, not a single generic shape, because each renderer's "live value" is differently typed (a slope/intercept pair vs. a point list vs. an area/perimeter pair vs. a permutation). A generic `{ target: number }` would not type-check across all four renderers without losing meaning.

## 3. Validation strategy

- **Tolerance-based equality for all continuous numeric targets** (slope, intercept, area, perimeter, angle, radius, placed value): `Math.abs(live - target) <= tolerance`, with a small sane default per domain (e.g. `0.5` for slope/intercept, `1` for geometry measurements, `0.5` for a placed number) overridable via an optional `tolerance` field on the challenge object. This mirrors how floating-point drag output (already rounded to 1 decimal via `round1()`) can never hit an exact target pixel-for-pixel.
- **Exact relational equality for the number-line comparison challenge** (`<`, `>`, `=`) and **exact permutation equality for the process-flow reorder challenge** (already implemented via `useReorder`'s `isCorrect`) — these are discrete, not continuous, so no tolerance is needed.
- **Multi-condition challenges (e.g., graph slope *and* intercept) require all present targets to be met** — partial credit is not modeled; a challenge is satisfied only when every target field that was specified is within tolerance. Unset target fields are not checked (so a challenge can target only slope, only intercept, or both).
- **All comparisons run client-side on values the renderer already owns** — no new computation engine, no re-parsing of the equation string, no calls to any solver/CAS.

## 4. Scoring approach

- **Live boolean feedback only, no persisted score** — consistent with the Sprint F precedent ("no grading system yet" for process-flow reorder). A challenge renders "✓ target met" / "keep adjusting" style text that updates every frame as the student drags, the same as the existing live equation/area/perimeter text.
- **No attempt counting, no timing, no database writes** — this stays entirely inside React state, dies when the component unmounts, and never reaches an API route, Prisma, or any persistence layer. This is intentional and matches the sprint's explicit "No database changes" rule.
- **No automatic advancement / completion signaling** — meeting a challenge does not trigger navigation, lesson completion, or any Tutor Max/Universal Learning callback. The renderer is a dumb display of correctness; wiring that correctness into curriculum progress is explicitly out of scope and flagged as a future opportunity below.

## 5. Future extensibility

- A later sprint could lift the local "challenge met" boolean up via an optional `onChallengeComplete` callback prop, letting a parent page (not the renderer) decide what "meeting a challenge" means for progress/grading — without touching the renderer's internal validation logic.
- Multi-step challenges (e.g., "first get the slope right, then the intercept") could be layered on top of the same `challenge` object by adding an ordered list of sub-goals, without changing how any single target is validated.
- The same `challenge` contract shape could extend to a not-yet-built visual type without requiring renderer-specific rework, since each renderer owns its own comparison logic against its own already-existing live state.

## 6. Risk / regression notes

- Same risk profile as Sprint F: every new branch is gated behind `spec.challenge` truthiness, so specs without `challenge` take the exact pre-Sprint-G code path.
- `challenge` is purely additive to the zod schemas (`.optional()` everywhere) — existing specs in the DB/curriculum/demo continue to validate unchanged.
