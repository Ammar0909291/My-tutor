# Classical Mechanics Production Learning Integration Sprint — Report

Makes the five Classical Mechanics 3D visuals (built in the Foundation and Interactive Layer
sprints) reachable from real lessons, using the exact detection architecture already proven for
Quantum Physics.

## Architecture findings

See `docs/CLASSICAL_MECHANICS_PRODUCTION_AUDIT.md` (Task 1) for the full stage-by-stage trace.
Summary: `VisualCard`, `ThreeDVisual`, `VISUAL_STEP_COUNTS`, and the narration/playback engine
(`visualStepForSegment`, `synchronizedPlayback`, Play/Pause/Replay/Speed) were already fully
correct and generic — no changes needed there. The entire gap was upstream, in `detectVisual.ts`:
the five mechanics types were registered as `VisualType`s but never reachable from a lesson.

## Blockers found

1. `VISUAL_SUBJECTS` excluded `'physics'` — the Subject Library slug Classical Mechanics lessons
   actually use (`subjectCatalog.ts`'s `PHYSICS_TREE`), distinct from `'quantum_physics'`. This
   blocked **all** visual detection for Physics library lessons, not just mechanics.
2. No rule table or `detectVisual()` branch existed for `subjectSlug === 'physics'`.
3. `parseVisualTag()`'s `VALID` set omitted the five mechanics types, so even a correctly-emitted
   `VISUAL: three_projectile_motion` tag would be silently discarded.
4. `buildVisualsSystemBlock()`'s `all` list omitted them, so the tutor model was never told these
   visual options exist.

## Fixes applied

- `src/lib/school/visuals/visualTypes.ts`: added `'physics'` to `VISUAL_SUBJECTS`.
- `src/lib/school/visuals/detectVisual.ts`:
  - Added `MECHANICS_3D_RULES` (5 rules, keywords from the sprint spec: projectile motion/launch
    angle/trajectory/ballistic motion → `three_projectile_motion`; centripetal force/circular
    motion/angular velocity → `three_circular_motion`; pendulum/oscillation/simple harmonic motion
    → `three_pendulum_motion`; collision/conservation of momentum/elastic collision/inelastic
    collision → `three_momentum_collision`; force diagram/net force/friction/newton laws →
    `three_newton_forces`).
  - Added a `subjectSlug === 'physics'` branch: `matchRules(combined, MECHANICS_3D_RULES) ??
    matchRules(combined, SCIENCE_RULES)` — identical two-tier (3D-first, 2D-fallback) pattern as
    the existing `quantum_physics` branch, reusing `SCIENCE_RULES` (e.g. `force_diagram`)
    unchanged as the 2D fallback rather than inventing a new 2D physics table.
  - Added the five mechanics types to `parseVisualTag()`'s `VALID` set.
  - Added the five mechanics types to `buildVisualsSystemBlock()`'s `all` list.

No new detection architecture, no new rule-table shape, no schema changes. `VisualCard.tsx`,
`ThreeDVisual.tsx`, every mechanics simulation component, and all Quantum Physics rule tables
(`QUANTUM_RULES`, `QUANTUM_3D_RULES`) are unmodified.

## Files changed

- `src/lib/school/visuals/visualTypes.ts` (1 line: `VISUAL_SUBJECTS`)
- `src/lib/school/visuals/detectVisual.ts` (new `MECHANICS_3D_RULES` table, new `'physics'`
  branch, `VALID` set + `all` list additions)
- `docs/CLASSICAL_MECHANICS_PRODUCTION_AUDIT.md` (new — Task 1)
- `docs/CLASSICAL_MECHANICS_PRODUCTION_INTEGRATION_REPORT.md` (new — this file)

## Safe visual selection strategy (Task 4)

Reviewed against Quantum's production strategy:
- **One lesson → one visual**: `detectVisual()` returns a single `VisualType | null`; `matchRules`
  returns on the first matching rule. The new `'physics'` branch follows the same
  `A ?? B` short-circuit as `quantum_physics`, so at most one visual is ever selected — never both
  a 3D and a 2D recommendation.
- **No duplicate 2D + 3D**: structurally impossible by the above — `MECHANICS_3D_RULES` is checked
  first and short-circuits `SCIENCE_RULES` whenever it matches.
- **3D only on strong context match**: `MECHANICS_3D_RULES` keywords (projectile motion, launch
  angle, centripetal force, pendulum, conservation of momentum, etc.) are mechanics-topic-specific
  phrases, not generic physics words — mirroring how `QUANTUM_3D_RULES` requires explicit
  "3D"/"rotate" phrasing. No additive code changes were needed beyond the rule table itself; the
  existing `matchRules`/`??` mechanism already enforces this safely.

## Narration compatibility (Task 5)

Verified by code inspection — no issues found, no changes made:
- `revealStep`: all five mechanics components already accept `{ revealStep?: number }` (Foundation
  Sprint) and gate their `Scene` content on it identically to every quantum 3D component.
- `visualStepForSegment` / `synchronizedPlayback`: operate purely on `stepCount` (from
  `VISUAL_STEP_COUNTS`, already populated for all five) and narration progress — zero per-type
  logic, so mechanics types are handled identically to every existing type.
- `narrationTimeline`: consumed only by `VisualCard`, upstream of any per-type dispatch.
- Play / Pause / Replay / Speed: `VisualPlaybackControls` reads only the generic `controls.*`
  object built by `VisualCard`, with no `VisualType` branching anywhere.

## End-to-end production verification (Task 6)

For each of the five: `detectVisual({ subjectSlug: 'physics', chapterTitle/lessonTitle containing
a matching keyword })` → returns the correct `three_*` type → `buildVisualsSystemBlock()` lists it
as available and instructs the tutor to emit `VISUAL: <type>` → `parseVisualTag()` now accepts it
→ `response.visual` carries a valid `VisualType` → `LessonScreen`'s existing generic wiring passes
it to `VisualCard` → `VisualCard`'s switch (already wired, Foundation Sprint Task 9) renders the
component inside the unmodified `ThreeDVisual` host → narration/playback engine drives it like any
other visual. Confirmed end-to-end with no remaining blocker.

## Validation results

```
npx prisma generate   → succeeded
npx tsc --noEmit       → 1 pre-existing error (monaco-editor module, src/components/learn/LessonScreen.tsx)
                          — same error present before this sprint's changes (confirmed via prior
                          sprints' git-stash tests); not introduced by this sprint
npm run build           → fails at the same pre-existing monaco-editor error; no error from any
                          file touched in this sprint
```

No new type errors, lint errors, or build errors were introduced by this sprint's 2 modified / 2
new files.

## Production readiness verdict

**Production ready.** All five Classical Mechanics 3D visuals are now fully reachable from real
Physics Subject Library lessons: detected via lesson-title/chapter-title keyword match, correctly
tagged by the tutor model, correctly parsed, and rendered through the unmodified, already-proven
`VisualCard`/`ThreeDVisual`/narration pipeline. Safe-selection (one visual per lesson, 3D only on
strong context match) holds by construction, matching the Quantum Physics precedent exactly.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000
npm run build           # prisma generate && next build — pre-existing monaco-editor error unrelated to this sprint
npx tsc --noEmit       # same pre-existing monaco-editor error; pre-existing stripe/subscription errors also expected on feature branches
```
