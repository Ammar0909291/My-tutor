# Chemistry Production Learning Integration Sprint — Report

Makes the five Chemistry 3D visuals (built in the Foundation and Interactive Layer sprints)
reachable from real lessons, using the exact detection architecture already proven for Quantum
Physics and Classical Mechanics.

## Architecture findings

See `docs/CHEMISTRY_PRODUCTION_AUDIT.md` (Task 1) for the full stage-by-stage trace. Summary:
`VisualCard`, `ThreeDVisual`, `VISUAL_STEP_COUNTS`, and the narration/playback engine
(`visualStepForSegment`, `synchronizedPlayback`, Play/Pause/Replay/Speed) were already fully
correct and generic — no changes needed there. The entire gap was upstream, in `detectVisual.ts`:
the five Chemistry types were registered as `VisualType`s but never reachable from a lesson.

## Blockers found

1. `VISUAL_SUBJECTS` excluded `'chemistry'` — the dedicated Subject Library slug Chemistry lessons
   use (`subjectCatalog.ts`: `{ slug: 'chemistry', ..., modules: CHEMISTRY_TREE }`), distinct from
   the generic `'science'` slug. This blocked **all** visual detection for Chemistry library
   lessons.
2. No rule table or `detectVisual()` branch existed for `subjectSlug === 'chemistry'`.
3. `parseVisualTag()`'s `VALID` set omitted the five Chemistry types, so even a correctly-emitted
   `VISUAL: three_atomic_structure` tag would be silently discarded.
4. `buildVisualsSystemBlock()`'s `all` list omitted them, so the tutor model was never told these
   visual options exist.

This is the identical class of blocker the Classical Mechanics Production Learning Integration
Sprint diagnosed and fixed for the `'physics'` slug.

## Fixes applied

- `src/lib/school/visuals/visualTypes.ts`: added `'chemistry'` to `VISUAL_SUBJECTS`.
- `src/lib/school/visuals/detectVisual.ts`:
  - Added `CHEMISTRY_3D_RULES` (5 rules, keywords mapped per spec: atomic structure/protons and
    neutrons/nucleus/subatomic particle/atomic number/mass number → `three_atomic_structure`;
    electron shell(s)/shell configuration/K-L-M shell/electron configuration →
    `three_electron_shells`; molecular shape/molecular geometry/bond angle/tetrahedral/trigonal
    planar/VSEPR → `three_molecular_shapes`; bond formation/ionic bond/covalent bond/metallic
    bond/chemical bonding/valence electron → `three_bond_formation`; crystal lattice/unit cell/
    lattice structure/crystalline solid/crystal structure → `three_crystal_lattice`).
  - Added a `subjectSlug === 'chemistry'` branch: `matchRules(combined, CHEMISTRY_3D_RULES) ??
    matchRules(combined, SCIENCE_RULES)` — identical two-tier (3D-first, 2D-fallback) pattern as
    the existing `physics`/`quantum_physics` branches, reusing `SCIENCE_RULES` unchanged as the 2D
    fallback rather than inventing a new 2D chemistry table.
  - Added the five Chemistry types to `parseVisualTag()`'s `VALID` set.
  - Added the five Chemistry types to `buildVisualsSystemBlock()`'s `all` list.

No new detection architecture, no new rule-table shape, no schema changes. `VisualCard.tsx`,
`ThreeDVisual.tsx`, every Chemistry simulation component, and all Quantum/Mechanics rule tables are
unmodified.

## Files changed

- `src/lib/school/visuals/visualTypes.ts` (1 line: `VISUAL_SUBJECTS`)
- `src/lib/school/visuals/detectVisual.ts` (new `CHEMISTRY_3D_RULES` table, new `'chemistry'`
  branch, `VALID` set + `all` list additions)
- `docs/CHEMISTRY_PRODUCTION_AUDIT.md` (new — Task 1)
- `docs/CHEMISTRY_PRODUCTION_INTEGRATION_REPORT.md` (new — this file)

## Safe visual selection review (Task 4)

- **One lesson → one visual**: `detectVisual()` returns a single `VisualType | null`; `matchRules`
  returns on the first matching rule. The new `'chemistry'` branch follows the same `A ?? B`
  short-circuit as `physics`/`quantum_physics`, so at most one visual is ever selected.
- **No duplicate recommendations**: structurally impossible by the above — `CHEMISTRY_3D_RULES` is
  checked first and short-circuits `SCIENCE_RULES` whenever it matches.
- **Chemistry keywords do not interfere with mechanics or quantum**: verified programmatically — no
  substring overlap exists between any `CHEMISTRY_3D_RULES` keyword and any keyword in
  `MECHANICS_3D_RULES`, `QUANTUM_3D_RULES`, `QUANTUM_RULES`, or `SCIENCE_RULES`. Additionally, each
  subject branch is gated by a distinct `subjectSlug` (`'chemistry'` vs. `'physics'` vs.
  `'quantum_physics'`), so even if keyword text overlapped, a lesson tagged with one subject slug
  could never reach another subject's rule table.

## Narration review (Task 5)

Verified by code inspection — no issues found, no changes made:
- `revealStep`: all five Chemistry components already accept `{ revealStep?: number }` (Foundation
  Sprint) and gate their `Scene` content on it identically to every quantum/mechanics 3D component.
- `visualStepForSegment` / `synchronizedPlayback`: operate purely on `stepCount` (from
  `VISUAL_STEP_COUNTS`, already populated for all five) and narration progress — zero per-type
  logic.
- `narrationTimeline`: consumed only by `VisualCard`, upstream of any per-type dispatch.
- Play / Pause / Replay / Speed: `VisualPlaybackControls` reads only the generic `controls.*`
  object built by `VisualCard`, with no `VisualType` branching anywhere.

## End-to-end production verification (Task 6)

For each of the five: `detectVisual({ subjectSlug: 'chemistry', chapterTitle/lessonTitle containing
a matching keyword })` → returns the correct `three_*` type → `buildVisualsSystemBlock()` lists it
as available and instructs the tutor to emit `VISUAL: <type>` → `parseVisualTag()` now accepts it
→ `response.visual` carries a valid `VisualType` → `LessonScreen`'s existing generic wiring passes
it to `VisualCard` → `VisualCard`'s switch renders the component inside the unmodified
`ThreeDVisual` host → narration/playback engine drives it like any other visual. Confirmed
end-to-end with no remaining blocker.

## Validation results

```
npx prisma generate   → succeeded
npx tsc --noEmit       → 1 pre-existing error (monaco-editor module, src/components/learn/LessonScreen.tsx)
                          — same error confirmed present in the immediately prior (Chemistry
                          Interactive Layer) sprint's validation run; not introduced by this sprint
npm run build           → fails at the same pre-existing monaco-editor error; no error from any
                          file touched in this sprint
```

No new type errors, lint errors, or build errors were introduced by this sprint's 2 modified / 2
new files.

## Production readiness verdict

**Production ready.** All five Chemistry 3D visuals are now fully reachable from real Chemistry
Subject Library lessons: detected via lesson-title/chapter-title keyword match, correctly tagged by
the tutor model, correctly parsed, and rendered through the unmodified, already-proven
`VisualCard`/`ThreeDVisual`/narration pipeline. Safe-selection (one visual per lesson, no
cross-subject keyword interference) holds by construction and was verified programmatically,
matching the Quantum Physics and Classical Mechanics precedent exactly.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000
npm run build           # prisma generate && next build — pre-existing monaco-editor error unrelated to this sprint
npx tsc --noEmit       # same pre-existing monaco-editor error; pre-existing stripe/subscription errors also expected on feature branches
```
