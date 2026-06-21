# 3D Production Learning Integration Sprint — Report

**Status: complete.** Enables the five existing 3D quantum simulations to surface in real Tutor
lessons via the existing detection pipeline. Additive only — no new architecture, no existing
simulation/engine/narration/mastery/curriculum system redesigned.

## Task 1 — Production reachability audit

All five `three_*` `VisualType`s (`three_double_slit`, `three_quantum_tunneling`,
`three_bloch_sphere`, `three_stern_gerlach`, `three_hydrogen_orbital`) were fully built, registered
in `VISUAL_META`/`VISUAL_STEP_COUNTS`, and rendered correctly through `VisualCard` since the
"3D Educational Simulations Phase 1" sprint — confirmed by re-reading
`docs/THREED_QUANTUM_PHASE1_AUDIT.md` and `VisualCard.tsx`. Yet none were reachable from a live
lesson. Root cause, traced through `src/app/api/learn/chat/route.ts`:

1. `route.ts` calls `detectVisual({ subjectSlug, chapterTitle, lessonTitle })` to pick the single
   `availableVisual` offered to the tutor model for the turn, then `buildVisualsSystemBlock()` to
   tell the model how to request it, then (on the model's reply) `parseVisualTag()` to extract the
   `VISUAL: <type>` tag the model wrote.
2. **`detectVisual.ts`'s `QUANTUM_RULES` keyword table only mapped to the nine 2D quantum types.**
   No keyword anywhere in that table could ever produce a `three_*` value, so `availableVisual` was
   structurally never a 3D type — the tutor was never even told a 3D option existed.
3. **`parseVisualTag()`'s `VALID` set and `buildVisualsSystemBlock()`'s `all` list both hard-coded
   the same nine 2D types.** Even if a tutor response somehow contained `VISUAL: three_bloch_sphere`
   (e.g. copied from documentation), `parseVisualTag` would reject it as invalid and strip the tag,
   falling back to no visual.

This was a closed loop: detection couldn't suggest a 3D type, and tag-parsing couldn't accept one
even by accident. `VisualCard`, `useTeachingPlayback`, and narration sync were never the blocker —
they already worked correctly for every `three_*` type (verified again in Task 6 below). The gap
was entirely in `detectVisual.ts`'s three lookup tables.

## Task 2 — Enable production 3D visuals

`src/lib/school/visuals/detectVisual.ts` changes (only file modified for this task):

- Added `QUANTUM_3D_RULES`, a new keyword table mapping explicit 3D/rotation phrasing (e.g.
  `"3d double slit"`, `"rotate the bloch sphere"`, `"orbital in 3d"`) to each of the five `three_*`
  types.
- `detectVisual()`'s quantum branch now evaluates `QUANTUM_3D_RULES` first, falling back to the
  existing `QUANTUM_RULES` (2D) table unchanged: `matchRules(combined, QUANTUM_3D_RULES) ??
  matchRules(combined, QUANTUM_RULES)`. For any lesson text that doesn't explicitly ask for 3D, this
  is byte-for-byte the previous behavior.
- Added the five `three_*` strings to `parseVisualTag()`'s `VALID` set and
  `buildVisualsSystemBlock()`'s `all` list, so a `VISUAL: three_bloch_sphere` tag is now accepted
  and the system prompt lists 3D types as available options.

No other file changed for this task — `VisualCard.tsx`, `visualTypes.ts`, `useTeachingPlayback.ts`,
and `route.ts` needed no changes, since the `three_*` types were already fully wired downstream of
`detectVisual()`.

## Task 3 — Safe visual selection strategy

**Rule**: a lesson surfaces the **2D** visual by default; the **3D** visual only surfaces when the
lesson/chapter/topic text itself contains explicit 3D-oriented language (e.g. "in 3D", "rotate the
model", "three-dimensional"). This is implemented exactly as `QUANTUM_3D_RULES` checked before
`QUANTUM_RULES` in `detectVisual()` (Task 2) — no separate strategy module was needed because
`matchRules()`'s "first matching rule wins, ordered by specificity" pattern already *is* a
selection strategy; this sprint just added a more-specific tier above the existing one.

This directly satisfies the brief's example: a chapter titled "Double-slit experiment — introduction"
matches only the 2D `double_slit` keywords → 2D visual (beginner explanation). A chapter or lesson
explicitly framed as "Explore the double slit in 3D" matches `QUANTUM_3D_RULES` first → 3D visual
(deeper visualization). Because `detectVisual()` only ever returns **one** `VisualType` per call
(`matchRules` returns on first match), there is no possibility of both a 2D and 3D tag being
recommended for the same lesson turn — duplicate recommendation is structurally prevented by the
existing single-return contract, unchanged.

No new architecture was required, so this task was implemented (not just documented), per the
brief's "implement only if architecture already supports it cleanly."

## Task 4 — Guided Mode integration review (audit only, not implemented)

`GuidedSimulationMode` (Phase 2) is a standalone, self-contained wrapper with its own local
`useState` step pointer and a render-prop `children` API — it does not import or depend on
`useTeachingPlayback`, `narrationTimeline`, or `synchronizedPlayback.ts` in any way today.

**Easiest integration path**: a lesson surface that wants guided mode for an interactive simulation
renders `<GuidedSimulationMode steps={...}><QuantumTunnelingInteractive3D highlightedControlId=.../></GuidedSimulationMode>` directly, exactly as the dev demo already does — this requires zero
new wiring, since the component already accepts a plain `steps` array authored by whoever renders
it. The only real integration work is **authoring**: deciding which lesson contexts should supply a
`GuidedStep[]` script, and where that script comes from (hand-authored per-lesson content vs.
generated). Until the interactive components are reachable via `detectVisual()`/`VisualCard` (which
they are not — see Task 1; only the non-interactive `revealStep`-gated 3D simulations are reachable
after Task 2), guided mode has nothing in the production lesson pipeline to attach to.

**Lowest-risk rollout path**: (1) ship Task 2's reachability for the five non-interactive 3D
simulations first (done this sprint) and observe real usage; (2) once product picks specific lesson
topics that warrant the *interactive* versions, add those as a small, explicit allow-list (not a
keyword-detected type, to avoid the model improvising scripts) wired directly into the relevant
lesson template/component, wrapped in `GuidedSimulationMode` with a hand-authored `steps` array —
the same pattern the dev demo already proves works. This avoids inventing any new narration or
detection logic for guided mode specifically, per "Do NOT redesign narration."

## Task 5 — Visual Mastery production review (audit only, not implemented)

The four interactive components' `onMasteryEvent`/`masteryContext` props (Phase 2) are currently
unused by any production caller — only the dev demo's `QuantumVisualChallenge` instances are wired
to `useVisualMastery()`'s `recordMasteryEvent`. Real quiz integrations (Practice/Assessment/
MockTestQuiz, per `docs/THREED_INTERACTIVE_LAYER_PHASE2_REPORT.md`) already call
`persistVisualMasterySummary()` once on completion using the same `useVisualMastery()` collector.

**How simulation mastery events could be recorded in real lessons** (reusing this unchanged): if/when
an interactive 3D simulation is rendered on a real lesson screen (e.g. `LessonScreen.tsx`), that
screen would instantiate its own `useVisualMastery()` (or reuse one already in scope) and pass
`recordMasteryEvent` as the `onMasteryEvent` prop, plus a `masteryContext` built from the lesson's
already-known `subjectSlug`/`topicSlug`/`source: 'learn'` — identical to how `QuantumVisualChallenge`
instances are wired on the dev-demo page today. No new collector, no new signal shape, no new
persistence call: the existing `persistVisualMasterySummary()` call already fires on the lesson's
existing completion event and would pick up these signals automatically once recorded into the same
summary object. This is a pure "plug the existing prop into the existing collector" integration —
no code changes were made this sprint since no lesson surface currently renders these interactive
components yet (that requires the Task 4 rollout above first).

## Task 6 — End-to-end verification

Traced the full path for all five production 3D `VisualType`s after Task 2's change:

`Tutor Lesson text → detectVisual() (now checks QUANTUM_3D_RULES first) → availableVisual (a
three_* type) → buildVisualsSystemBlock() tells the model how to tag it → model reply contains
"VISUAL: three_x" → parseVisualTag() accepts it (now in VALID) → VisualType passed to VisualCard →
VisualCard's switch dispatches to the correct three_* component (DoubleSlit3D/QuantumTunneling3D/
BlochSphere3D/SternGerlach3D/HydrogenOrbital3D, all unchanged) → ThreeDVisual renders the R3F Canvas
→ useTeachingPlayback drives revealStep in timer mode by default, or narration mode when
narrationTimeline is supplied (unchanged narration sync from Sprints S/T/U) → VisualPlaybackControls
renders Play/Pause/Replay/0.5×–1.5× speed, operating on the same playback object every other
VisualType already uses.`

No component in this chain needed modification beyond `detectVisual.ts`'s three lookup tables —
`VisualCard`'s switch already had all five cases since Quantum 3D Phase 1, and
`VISUAL_STEP_COUNTS` already listed `5` for all five types, so Replay/speed/narration-segment
mapping is identical to the existing SVG and 2D-quantum visuals. Manually verified via
`/dev/visual-demo`'s existing "Quantum Physics 3D Simulations" section (unchanged, still renders
all five through the same `VisualCard` path this audit traced).

## Files changed

| File | Change |
|---|---|
| `src/lib/school/visuals/detectVisual.ts` | +`QUANTUM_3D_RULES` keyword table; quantum branch of `detectVisual()` now checks 3D rules before 2D rules; +5 `three_*` entries in `parseVisualTag()`'s `VALID` set and `buildVisualsSystemBlock()`'s `all` list |
| `docs/THREED_PRODUCTION_INTEGRATION_REPORT.md` | new — this report |

**Not touched**: `VisualCard.tsx`, `visualTypes.ts`, `useTeachingPlayback.ts`,
`synchronizedPlayback.ts`, `narrationProgress.ts`, `VisualPlaybackControls.tsx`,
`SimulationControlPanel.tsx`, `GuidedSimulationMode.tsx`, `visualMastery.ts`, any of the five
`*3D.tsx` simulation files, any of the four `*Interactive3D.tsx` components, `route.ts` (its calls
to `detectVisual`/`parseVisualTag`/`buildVisualsSystemBlock` are unchanged — only the functions'
internal tables grew), and no Tutor Max / Educational Intelligence / Assessment / Curriculum file.

## Educational review

- Defaulting to 2D and only surfacing 3D on explicit request matches how the existing 2D quantum set
  was already pedagogically sequenced (2D for the canonical textbook diagram, 3D for spatial/
  rotatable depth) — this sprint makes that sequencing reachable instead of changing it.
- Because `detectVisual()` still returns at most one `VisualType`, a lesson never recommends both a
  2D and 3D visual for the same explanation, avoiding visual clutter or conflicting "which one do I
  look at" confusion for the student.

## Validation results (Task 7)

| Command | Result |
|---|---|
| `npx prisma generate` | exit 0 ✓ |
| `npx tsc --noEmit -p tsconfig.json` | **0 new errors.** Only the pre-existing, unrelated `Cannot find module 'monaco-editor'` (`LessonScreen.tsx:646`) remains. |
| `npm run build` | Next.js compile step **succeeded** (`✓ Compiled successfully`), no new ESLint errors. Build pipeline stops at the same pre-existing `monaco-editor` type-check step as every prior sprint — confirmed unrelated to the one file this sprint touched. |

## Rollout recommendations

1. Ship this sprint's `detectVisual.ts` change as-is — it is the lowest-risk, highest-value step:
   the five existing, fully-tested non-interactive 3D simulations become reachable with zero new
   components.
2. Monitor real `VISUAL: three_*` tag usage once live (e.g. via existing logging in `route.ts`) to
   confirm the 3D keyword phrasing in `QUANTUM_3D_RULES` actually matches how tutor responses tend
   to phrase "let's look at this in 3D" — tune keywords only if real usage shows misses, without
   touching the 2D rule ordering.
3. Defer interactive-simulation and guided-mode production rollout (Tasks 4/5) until product
   chooses specific lesson topics for them, per the documented lowest-risk path above — both are
   ready to wire in with zero further component changes when that decision is made.

## STOP AFTER REPORT

Additive only — one file's lookup tables extended, zero existing systems redesigned. No Tutor Max,
Educational Intelligence, Assessment, Curriculum, or Narration Engine changes. Committed only after
validation confirmed zero new errors.
