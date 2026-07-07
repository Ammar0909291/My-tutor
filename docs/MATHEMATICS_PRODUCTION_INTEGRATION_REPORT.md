# Mathematics Production Learning Integration Sprint — Report

Makes the five Mathematics 3D Foundation visuals reachable from real lessons, mirroring the
Quantum/Classical Mechanics/Chemistry Production Learning Integration sprints exactly.

## Blockers found (Task 1–2)

See `docs/MATHEMATICS_PRODUCTION_AUDIT.md` for the full pipeline trace. Two blockers, both in
`src/lib/school/visuals/detectVisual.ts`:

1. **No `MATHEMATICS_3D_RULES` table.** `detectVisual()`'s `'mathematics'` branch only called
   `MATH_RULES` (exclusively 2D types) — `detectVisual()` could never return any of the five
   `three_*` Mathematics types, so the pipeline never starts for them.
2. **`parseVisualTag()`'s `VALID` Set and `buildVisualsSystemBlock()`'s `all` list omitted the
   five Mathematics `three_*` types** — even a correctly emitted `VISUAL:` tag would be rejected,
   and the system prompt never advertised these types as available.

`VisualCard`/`VISUAL_STEP_COUNTS`/`visualTypes.ts` registration (from the Mathematics 3D
Foundation Sprint) was already correct; no changes were needed there.

## Fixes applied (Task 3)

In `src/lib/school/visuals/detectVisual.ts`:

- Added `MATHEMATICS_3D_RULES` (5 rules) using the suggested keyword mappings, checked first under
  `subjectSlug === 'mathematics'`, with `MATH_RULES` remaining the 2D fallback — the same two-tier
  pattern already used by `quantum_physics`/`physics`/`chemistry`.
- Added the five `three_*` Mathematics types to `parseVisualTag()`'s `VALID` Set and
  `buildVisualsSystemBlock()`'s `all` list.

All changes are additive — no existing rule, branch, or type was removed or altered.

## Safe visual selection review (Task 4)

- **One lesson → one visual.** `detectVisual()` returns a single `VisualType | null`; `matchRules`
  returns on the first matching rule. Unchanged by this sprint.
- **No duplicate recommendations.** Same single-return guarantee as above.
- **No cross-subject interference.** `detectVisual()` branches on `subjectSlug` before consulting
  any rule table — `MATHEMATICS_3D_RULES` is only ever consulted when `subjectSlug === 'mathematics'`,
  structurally identical to the chemistry/physics/quantum_physics branches. Verified no keyword
  string in `MATHEMATICS_3D_RULES` overlaps any keyword in `SCIENCE_RULES`, `MECHANICS_3D_RULES`,
  `CHEMISTRY_3D_RULES`, `QUANTUM_3D_RULES`, or `QUANTUM_RULES` via a substring-overlap check (no
  overlaps found) — though cross-subject overlap is structurally unreachable anyway since only one
  table is consulted per `subjectSlug`.
- **No keyword collisions found *within* `MATHEMATICS_3D_RULES` after one fix.** The generic
  keyword `'surface'` (intended for `three_surface_visualization`) would otherwise match
  `'volume and surface area'` (intended for `three_geometric_solids`) before the geometric-solids
  rule was reached, since `matchRules` returns the first matching rule in array order. Fixed by
  ordering the geometric-solids rule (more specific phrase) before the surface-visualization rule
  (generic `'surface'` keyword) — a lesson mentioning "volume and surface area" now correctly
  resolves to `three_geometric_solids` before the generic `'surface'` keyword is ever checked.

## Narration review (Task 5)

- **revealStep compatibility** — all five components already accept `revealStep` and gate their
  `Scene` JSX exactly like every other 3D visual; unchanged by this sprint.
- **Narration compatibility** — `VisualCard` drives `revealStep` from `narrationTimeline` via the
  existing `synchronizedPlayback`/`visualStepForSegment` machinery, with zero `VisualType`
  branching; the five Mathematics types pass through this untouched code path identically to every
  other registered type.
- **`VisualPlaybackControls` compatibility** — rendered unconditionally by `VisualCard` regardless
  of `VisualType`; Play/Pause/Replay/speed all work for the five Mathematics visuals with no
  additional wiring.

No narration or playback code was touched by this sprint.

## End-to-end verification (Task 6)

For each of the five types, traced and confirmed:

| VisualType | `detectVisual()` reaches it | `parseVisualTag` accepts it | `VisualCard` renders it |
|---|---|---|---|
| `three_coordinate_system` | yes — `MATHEMATICS_3D_RULES` rule 1 | yes — added to `VALID` | yes — existing switch case |
| `three_vector_visualization` | yes — rule 2 | yes | yes |
| `three_geometric_solids` | yes — rule 3 | yes | yes |
| `three_surface_visualization` | yes — rule 4 | yes | yes |
| `three_transformations` | yes — rule 5 | yes | yes |

`response.visual` reaches `LessonScreen`, which passes `msg.visual` into
`extractNarrationSegments(msg.content, msg.visual)` and renders `VisualCard` — identical wiring to
every other production-integrated subject; confirmed by inspection of
`src/components/learn/LessonScreen.tsx` (no changes required there).

## Validation results (Task 7)

```
npx prisma generate   → succeeded
npx tsc --noEmit       → 1 pre-existing error (monaco-editor module, src/components/learn/LessonScreen.tsx)
                          — same error present before this sprint's changes, confirmed present in
                          every prior sprint's validation run; not introduced by this sprint
npm run build           → compiles successfully ("Compiled successfully", only pre-existing ESLint
                          warnings unrelated to this sprint); type-checking fails at the same
                          pre-existing monaco-editor error; no error from any file touched in this
                          sprint
```

No new type errors, lint errors, or build errors were introduced by this sprint's 2 new / 1
modified files.

## Files changed

**New (2 files):**
- `docs/MATHEMATICS_PRODUCTION_AUDIT.md`
- `docs/MATHEMATICS_PRODUCTION_INTEGRATION_REPORT.md` (this file)

**Modified (1 file):**
- `src/lib/school/visuals/detectVisual.ts` — added `MATHEMATICS_3D_RULES`, the `'mathematics'`
  branch's two-tier `matchRules(MATHEMATICS_3D_RULES) ?? matchRules(MATH_RULES)` call, the five new
  types in `parseVisualTag`'s `VALID` Set, and the five new types in
  `buildVisualsSystemBlock`'s `all` list.

No change to `VisualCard.tsx`, `visualTypes.ts`, `ThreeDVisual.tsx`, `LessonScreen.tsx`, any
Mathematics 3D Foundation or Interactive component, or any other subject's rule table.

## Production readiness

**Production-reachable.** All five Mathematics 3D visuals can now be detected from real lesson
text via `detectVisual()`, validated via `parseVisualTag()`, advertised to the tutor model via
`buildVisualsSystemBlock()`, and rendered through the unmodified production
`VisualCard`/`ThreeDVisual`/narration/`VisualPlaybackControls` pipeline — identical end-to-end
reachability to the Quantum, Classical Mechanics, and Chemistry subjects after their respective
Production Learning Integration sprints.
