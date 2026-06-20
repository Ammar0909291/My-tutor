# Visual Learning Sprint G — Assessment-Integrated Visual Learning

## 1. Files Changed

| File | Change |
|---|---|
| `docs/VISUAL_ASSESSMENT_AUDIT.md` | New — Task 1 audit |
| `docs/VISUAL_LEARNING_SPRINT_G_REPORT.md` | New — this report |
| `src/lib/visuals/visualSpec.ts` | Added `graphChallengeSchema`, `numberLineChallengeSchema`, `geometryChallengeSchema`, `processFlowChallengeSchema`, and an optional `challenge` field on `graphSpecSchema`, `numberLineSpecSchema`, `processFlowSpecSchema`, and every geometry shape schema |
| `src/components/visuals/GraphRenderer.tsx` | Added `challenge` validation (slope/intercept vs. `spec.challenge`) reading the existing `model` state; live "Target: …" / "✓ Target met: …" line |
| `src/components/visuals/NumberLineRenderer.tsx` | Added `challenge` validation (place-number, compare-relation, ordering) reading the existing `points`/`highlights` state; same live feedback line |
| `src/components/visuals/GeometryRenderer.tsx` | Added a shared `ChallengeFeedback` component; triangle (area/perimeter), rectangle (area/perimeter), circle (radius/area/circumference), angle (target angle) each gained a challenge check against their existing live derived values |
| `src/components/visuals/ProcessFlowRenderer.tsx` | `ReorderFeedback` now takes a `hasChallenge` flag and rewords its message ("Target: …" / "✓ Target met: …") when `spec.challenge` is present, while reusing the exact same `isCorrect` (Sprint F) logic |
| `src/app/dev/visual-demo/VisualDemo.tsx` | New "Sprint G — Visual Assessment" showcase section (9 challenge specs covering every renderer) |

`VisualRenderer.tsx`, `VisualConceptDetector.ts`, `VisualSpecBuilder.ts`, the database, curriculum content, Tutor Max prompts, and AI providers were **not touched** — `challenge` is a prop-level flag on existing spec members, exactly like `interactive` in Sprint F, so no dispatch change was needed anywhere in the pipeline.

## 2. Assessment Architecture

See `docs/VISUAL_ASSESSMENT_AUDIT.md` for the full audit. Summary:

- **Read-and-compare, not new state**: every renderer already tracks the live numeric value a challenge needs (slope/intercept, highlighted points, base/height/width/radius/angle, reorder permutation) as Sprint F local state. Sprint G adds zero new drag math and zero new event handlers — only a derived `useMemo`/`const` that compares that existing live value to `spec.challenge`'s targets.
- **`challenge` sits beside `interactive`, independently** on each leaf schema — same additive, opt-in pattern as `interactive` in Sprint F. A spec without `challenge` takes the exact pre-Sprint-G code path; this is a structural guarantee from the schemas (every `challenge` field is `.optional()`) down through every renderer (every new line is `{challenge && ...}`-gated).
- **Per-spec-type challenge shape**: `graphChallengeSchema` (`targetSlope`, `targetIntercept`), `numberLineChallengeSchema` (`targetValue`, `targetRelation`, `order`), `geometryChallengeSchema` (`targetArea`, `targetPerimeter`, `targetAngle`, `targetRadius` — shared across all geometry shapes since zod's `discriminatedUnion` doesn't need per-branch uniqueness here), `processFlowChallengeSchema` (an empty object — presence alone turns on the challenge wording for the already-existing `isCorrect` check). Each carries an optional `tolerance`.

## 3. Challenge System

| Renderer | Challenge fields | Live validation |
|---|---|---|
| Graph | `targetSlope`, `targetIntercept` | `|model.m − targetSlope| ≤ tolerance` and/or `|model.b − targetIntercept| ≤ tolerance`; both must hold if both are set |
| Number line | `targetValue` | Any highlighted point within `tolerance` of `targetValue` |
| Number line | `targetRelation` (`<`/`>`/`=`) | Exactly 2 highlighted points; their relation matches `targetRelation` |
| Number line | `order` (`asc`/`desc`) | 2+ highlighted points are non-decreasing/non-increasing in index order |
| Triangle | `targetArea`, `targetPerimeter` | Compared against the shape's existing live `area`/`perimeter` |
| Rectangle | `targetArea`, `targetPerimeter` | Compared against live `area` and a derived `2×(width+height)` |
| Circle | `targetRadius`, `targetArea`, `targetPerimeter` (used as target circumference) | Compared against live `radius`/`area`/`circumference` |
| Angle | `targetAngle` | Compared against live `angle` |
| Process flow | (presence only) | Reuses Sprint F's `isCorrect` (current order vs. spec's own order); wording changes to "Target: …" / "✓ Target met: …" |

All of the above are opt-in via `{ ..., interactive: true, challenge: { ... } }` on the spec — see Task 2's contract extension in `visualSpec.ts`. The brief's own example (`{ interactive: true, challenge: { targetSlope: 3, targetIntercept: 2 } }`) is exactly the shape implemented for graph.

## 4. Validation Strategy

- **Tolerance-based equality** for every continuous numeric target (slope, intercept, area, perimeter, angle, radius, placed value) — `Math.abs(live - target) <= tolerance`, with a small sensible default per domain (`0.5` for graph/number-line, `1` for geometry area/perimeter/radius, `3°` for angle), overridable via the optional `tolerance` field.
- **Exact equality** for the discrete cases: the number-line relation challenge (`<`/`>`/`=`) and the process-flow permutation challenge.
- **All-targets-must-hold**: when a challenge specifies more than one target (e.g. graph's slope *and* intercept), the feedback line only flips to "met" when every specified target is within tolerance — no partial credit, no new code path beyond `Array.every`.
- **No new computation engine**: every comparison reads a value the renderer was already computing for its live formula text (e.g. the triangle's `area`/`perimeter` were already rendered in `<Formula>` before Sprint G).

## 5. Screenshots

All in `screenshots/visual-demo/`:

- `22_sprintg_assessment_light.png` — desktop, light mode; graph challenge card showing the slope/intercept target line, number-line place/compare/order challenge cards
- `23_sprintg_assessment_dark.png` — desktop, dark mode; confirms contrast/theming holds for the new "Target: …" feedback text
- `24_sprintg_assessment_mobile.png` — 390×844 mobile viewport; confirms the new section remains usable and legible at mobile width
- `25_sprintg_reorder_challenge_before.png` / `26_sprintg_reorder_challenge_after.png` — Photosynthesis reorder challenge before/after clicking ▲ a few times, showing the order changing and the "Target: arrange steps in the correct order" wording (mirrors Sprint F's reorder-mechanism proof)

## 6. Scoring Approach

- **Live boolean feedback only — no persisted score**, consistent with Sprint F's "no grading system yet" precedent. The "✓ Target met: …" text recomputes every render from current local state; nothing is written to a database, an API route, or any session/progress record.
- **No attempt counting, no timing.** Meeting a challenge does not trigger navigation, lesson completion, or any Tutor Max/Universal Learning callback — this is intentionally out of scope per the brief ("No curriculum rewrite. No AI rewrite. No Tutor Max redesign. No Universal Learning. No database changes").

## 7. Failure Modes

- **Graph**: the slope/intercept challenge can only be checked when the equation matches the strict `y = mx + b` form that already gates Sprint F's drag handles — if the regex doesn't match, `model` is `null`, so the challenge can never read "met" (the live value to compare against simply doesn't exist). This is the same intentional fail-safe boundary documented in Sprint F, now inherited unchanged.
- **Number line relation/order challenges** require the matching point count (`targetRelation` needs exactly 2 highlighted points, `order` needs 2+); if the spec's `highlight` array doesn't satisfy that, the corresponding check is simply never true rather than throwing — no crash, no misleading partial UI.
- **Pre-existing, unrelated to this sprint**: same sandbox condition documented in the Sprint F report — no reachable PostgreSQL instance in this container, so `/tmp/dev-server.log` shows recurring `Can't reach database server at localhost:5432`, and the dev overlay shows a "1 error" badge in the dark-mode screenshot. Confirmed unrelated by checking the log: the same Prisma errors occur independently of any visual-demo interaction.

## 8. Future Opportunities

- Lift each renderer's local "challenge met" boolean up via an optional `onChallengeComplete` callback prop, letting a parent page decide what "meeting a challenge" means for progress tracking — without touching any renderer's internal validation logic.
- Multi-step challenges (e.g., "first hit the slope, then the intercept") could layer an ordered list of sub-goals on top of the same `challenge` object.
- The same `challenge` contract shape generalizes to any future visual type, since each renderer owns its own comparison logic against its own already-existing live state — no central "grader" needs to know about every renderer's internals.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → clean, no errors.
- `npm run build` → succeeded (prisma generate && next build), all routes including `/dev/visual-demo` compiled.
- Manual verification: every Sprint B/C/D/E/F section on `/dev/visual-demo` renders pixel-identical to before — confirmed both by the gating design (every new branch is `if (spec.challenge)`-gated, and none of the pre-existing demo specs set that field) and by screenshot comparison against the Sprint F screenshots already in `screenshots/visual-demo/`.
- `GraphRenderer`, `NumberLineRenderer`, `GeometryRenderer`, `ProcessFlowRenderer` all behave exactly as their Sprint F implementations when `challenge` is absent — verified by code inspection (every new branch is gated on `spec.challenge`/`hasChallenge`) and by the Sprint F interactive-only cards on the demo page remaining unchanged in this session's screenshots.
- Non-interactive lessons (specs with neither `interactive` nor `challenge`) are unaffected — both flags are independently optional and orthogonal; the Sprint B/C/D/E sections of the demo page (which set neither) continue to render via the exact same code path.
