# Universal 3D Educational Engine — Foundation Sprint 1 Report

**Status: foundation complete, additive only.** No Tutor Max, Educational Intelligence, Assessment,
Curriculum, 2D visual system, or narration architecture redesign. No Quantum Physics or Classical
Mechanics content touched. The 3D engine plugs into the existing `VisualCard` ecosystem as four new
`VisualType` values, exactly like every prior visual expansion.

## 1. Architecture audit (Task 1)

The teaching-visual system (`VisualCard` ecosystem) is fully additive-friendly by design:

- **`VisualType` union + `VISUAL_META`** (`src/lib/school/visuals/visualTypes.ts`) — a flat string
  union and an exhaustive `Record<VisualType, {...}>` metadata map. New types are pure additions.
- **`VisualCard.tsx`** (`src/components/school/visuals/VisualCard.tsx`) — owns the exhaustive
  `VISUAL_STEP_COUNTS: Record<VisualType, number>` map and a `VisualComponent` switch with no
  `default` arm, so TypeScript forces every `VisualType` to have both a step count and a render case.
  `VisualCard` itself never branches on engine vs. SVG — it calls `useTeachingPlayback(stepCount, …)`
  and passes the resulting `revealStep: number` straight into `VisualComponent`. Any renderer that
  accepts a single `revealStep?: number` prop integrates with zero changes to this file's playback
  logic.
- **Narration sync** (`src/lib/visuals/synchronizedPlayback.ts`, `narrationProgress.ts`) — pure
  functions mapping a narration segment number to a clamped `revealStep` via `visualStepForSegment()`.
  Renderer-agnostic; no visual-type-specific code exists here.
- **Playback engine** (`src/hooks/useTeachingPlayback.ts`) — timer or narration mode, both produce the
  same `revealStep` field. Untouched.
- **Visual Mastery** (`src/lib/visuals/visualMastery.ts` + `VisualSpec`/`VisualRenderer` subsystem) —
  confirmed a separate, independent subsystem from `VisualCard`; not touched, not required for this
  sprint's "engine type" registration.

**Integration point identified:** the 3D engine integrates exactly where every SVG visual does — as
new `VisualType` members with a `VISUAL_META` entry, a `VISUAL_STEP_COUNTS` entry, and a `VisualComponent`
switch case rendering a component that accepts `{ revealStep?: number }`. No new playback, narration, or
controls architecture is needed; the existing engine is renderer-agnostic by construction.

## 2. New 3D visual types (Task 2, additive)

Registered in `src/lib/school/visuals/visualTypes.ts`:

```
| 'three_particle_system'
| 'three_wave_simulation'
| 'three_field_visualization'
| 'three_structure_visualization'
```

These are **engine types**, not subject visuals — no `detectVisual.ts` keyword rules or
`VISUAL_SUBJECTS`/chat-injection wiring were added this sprint (out of scope; a future per-subject
sprint adds detection rules the same way Quantum Physics's visuals did).

## 3. Shared 3D wrapper (Task 3)

`src/components/school/visuals/ThreeDVisual.tsx` — the engine-agnostic scene host:
- React Three Fiber `<Canvas>` with `dpr={[1,2]}` (mobile-safe), `alpha`/`antialias` GL options.
- Camera (`PerspectiveCamera` via `camera` prop) + two-light setup (ambient + two directional).
- `OrbitControls` (from `@react-three/drei`) for pan-free orbit/zoom, with `autoRotate` gated by
  `prefers-reduced-motion` (auto-spin disabled when the user's OS requests reduced motion; manual
  orbit/zoom remains available).
- Responsive layout: `width: 100%`, fixed `aspect-ratio`, `touchAction: 'none'` for clean mobile
  gesture handling.
- `role="img"` + `aria-label` for accessibility, matching the SVG visuals' `role="figure"` pattern.
- No subject-specific logic — accepts `children` (the scene contents) and an optional `revealStep`
  pass-through for renderers that want it.

## 4. First production demo (Task 4)

`src/components/school/visuals/ParticleSystem3D.tsx` — a reusable particle engine intended for later
reuse by Quantum Physics (probability clouds), Classical Mechanics (gas particles, collisions),
Chemistry (molecular motion), etc. 14 particles orbiting a shared center, `revealStep`-gated:

| Step | Behavior |
|---|---|
| 1 | Particles appear, static |
| 2 | Movement begins (per-particle oscillation via `useFrame`) |
| 3 | Interactions: proximity links rendered as thin connecting cylinders |
| 4 | One particle highlighted (color + emissive + larger radius) |
| 5 | Completed simulation (final particle color state) |

Three additional foundation placeholders (`src/components/school/visuals/ThreeDEngineStub.tsx`) back
the other three registered types (`WaveSimulation3D`, `FieldVisualization3D`,
`StructureVisualization3D`) with a minimal wireframe→solid icosahedron, confirming each type renders
correctly through the full `VisualCard` pipeline. These are explicitly stubs for a future sprint to
replace with real renderers, following the `ParticleSystem3D` pattern.

## 5. Narration compatibility (Task 5)

No new narration code was written. `ParticleSystem3D`/the stub components accept the same `revealStep`
prop every SVG visual accepts; `VisualCard` computes `revealStep` from `useTeachingPlayback`, which in
narration mode derives it from `visualStepForSegment(narrationProgress, stepCount)` — narration segment
*N* maps to `revealStep` *N* exactly as for the 19 existing SVG visuals. Verified by registering
`three_particle_system` etc. with `VISUAL_STEP_COUNTS = 5`, matching the 5-step design in Task 4.

## 6. VisualCard integration (Task 6)

`VisualCard.tsx` changes:
- Imported `ParticleSystem3D` and the three stub components.
- Added 4 entries to `VISUAL_STEP_COUNTS` (all `5`).
- Added 4 `case` arms to the `VisualComponent` switch, each rendering `<Component revealStep={revealStep} />`.

No changes to `VisualPlaybackControls.tsx` — Play/Pause/Replay/speed/narration-mode controls are
rendered once by `VisualCard` itself and work unmodified for the new types, since they operate purely
on the `controls` object derived from `useTeachingPlayback`/narration state, never on the visual type.

## 7. Dev demo (Task 7)

Added a "3D Educational Engine Foundation" section to `src/app/dev/visual-demo/VisualDemo.tsx`
(`THREE_D_ENGINE_DEMOS` array, following the exact `ANIMATED_TEACHING_DEMOS`/`QUANTUM_VISUAL_DEMOS`
pattern), rendering all 4 new types through the real production `<VisualCard>` with `autoPlay`/`speed`
controls — positioned directly after the Quantum Physics visuals section.

## 8. Files changed

| File | Change |
|---|---|
| `package.json` / `package-lock.json` | + `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` |
| `src/lib/school/visuals/visualTypes.ts` | +4 `VisualType` union members, +4 `VISUAL_META` entries |
| `src/components/school/visuals/VisualCard.tsx` | +4 imports, +4 `VISUAL_STEP_COUNTS` entries, +4 switch cases |
| `src/components/school/visuals/ThreeDVisual.tsx` | **new** — shared R3F scene host |
| `src/components/school/visuals/ParticleSystem3D.tsx` | **new** — first production 3D demo |
| `src/components/school/visuals/ThreeDEngineStub.tsx` | **new** — 3 foundation placeholders |
| `src/app/dev/visual-demo/VisualDemo.tsx` | +`THREE_D_ENGINE_DEMOS` array + demo section |
| `docs/THREED_ENGINE_FOUNDATION_REPORT.md` | new — this report |

No change to: `detectVisual.ts`, `useTeachingPlayback.ts`, `synchronizedPlayback.ts`,
`narrationProgress.ts`, `lessonSegments.ts`, `VisualPlaybackControls.tsx`, `learn/chat/route.ts`,
any curriculum/misconception/assessment/Educational-Intelligence file, or any existing SVG visual.

## 9. Validation (Task 8)

| Command | Result |
|---|---|
| `npx prisma generate` | exit 0 ✓ |
| `npx tsc --noEmit -p tsconfig.json` | **0 new errors.** 1 pre-existing unrelated error
  (`Cannot find module 'monaco-editor'` in `LessonScreen.tsx:646`) confirmed present identically on
  the base branch with this sprint's changes stashed — not introduced by this sprint. |
| `npm run build` | Next.js compile step **succeeded** (`✓ Compiled successfully`); the build fails at
  the same pre-existing `monaco-editor` type-check step, unrelated to any file this sprint touched. |

## 10. Future roadmap

1. **Replace the 3 stub renderers** (`three_wave_simulation`, `three_field_visualization`,
   `three_structure_visualization`) with real per-engine-type scenes, following the
   `ParticleSystem3D` pattern (revealStep-gated, `useFrame` for motion, reduced-motion aware).
2. **Per-subject 3D adoption** — Quantum Physics could reuse `three_particle_system` for probability
   clouds/orbitals; Classical Mechanics for rigid-body/collision scenes (`docs/CLASSICAL_MECHANICS_VISUALS.md`
   §2 already anticipates several 3D-friendly candidates); Chemistry for molecular structures
   (`three_structure_visualization`).
2a. Add `detectVisual.ts` keyword rules + `VISUAL_SUBJECTS` entries only once a subject's 3D content is
   actually built, mirroring how 2D visuals were wired per-subject.
3. **Visual Mastery bridging** — once specific 3D teaching visuals are built per subject, follow the
   existing bridging-component pattern (`QuantumVisualChallenge.tsx`) to add interactive mastery
   challenges, with one new `VisualEngine` value per subject (not per visual), exactly as
   `docs/ADVANCED_SUBJECT_TEMPLATE.md` §6 specifies.
4. **Performance**: monitor `ParticleSystem3D`'s frame cost at scale (currently 14 particles, O(n²)
   proximity-link computation cached via `useMemo` on static base positions) before raising particle
   counts for denser subject-specific scenes.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000 — visit /dev/visual-demo for the 3D Engine Foundation section
npm run build           # prisma generate && next build
npx tsc --noEmit         # pre-existing monaco-editor error is expected on this branch
```

## STOP AFTER REPORT

Additive only. No architecture redesign. No Tutor Max, Educational Intelligence, Assessment, or
Curriculum changes. No commits made until validation (Task 8) passed.
