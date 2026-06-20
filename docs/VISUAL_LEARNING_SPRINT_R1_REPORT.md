# Visual Learning Sprint R.1 — Animated Teaching Engine Completion

Transforms the 10 static `VisualCard` visuals into step-by-step animated teaching visuals that
build up like a teacher drawing at a whiteboard. Uses the existing Sprint R `teachingTimeline.ts`
engine. No new rendering engine, no second architecture, no changes to teachingStrategy.ts,
visualTypes.ts, AI contracts, curriculum, grading, XP, Educational Intelligence, or Visual Mastery.

## Architecture confirmation

The production lesson path is `AI response → msg.visual (VisualType) → VisualCard.tsx → SVG
component` (confirmed at `src/components/learn/LessonScreen.tsx:2307`). All animation work
targets exactly that path. (Note: a separate `VisualSpec`/`VisualRenderer` system exists and is
exercised by the dev demo's other sections; the R.1 brief's named target — the listed
`NumberLine…CircuitDiagram` + `VisualCard` components — is the production path animated here.)

## Files changed

**New files**
- `src/hooks/useTeachingPlayback.ts` — requestAnimationFrame-driven playback over the existing
  `teachingTimeline.ts`. Drives a `revealStep` integer (1..stepCount). Play / Pause / Replay /
  speed. Lightweight, mobile-safe (single rAF loop, cleaned up on unmount), deterministic per speed.
- `src/components/school/visuals/VisualPlaybackControls.tsx` — Play / Pause / Replay buttons +
  speed selector (0.5×, 0.75×, 1×, 1.25×, 1.5×), Eagle/candy-styled (rounded, bold, coral accent),
  speed shown as “Speed 1x”.
- `src/components/school/visuals/visualAnim.module.css` — shared reveal/draw/write-in keyframes,
  with `prefers-reduced-motion` fallback.

**Modified files**
- `src/components/school/visuals/VisualCard.tsx` — wires `useTeachingPlayback` +
  `VisualPlaybackControls`; exports `VISUAL_STEP_COUNTS`; threads `revealStep` into each SVG;
  new optional `autoPlay` (default true) and `speed` props. Architecture/switch unchanged.
- All 10 SVG components (`NumberLine`, `FractionBar`, `PercentageGrid`, `CoordinatePlane`,
  `GeometryShapes`, `FoodChain`, `WaterCycle`, `SolarSystem`, `ForceDiagram`, `CircuitDiagram`) —
  each gained an optional `revealStep` prop (default `Infinity` → full diagram, so any direct/static
  use is unchanged) and groups its existing SVG elements into reveal steps. **No element geometry
  was changed** — only mount-gating + colour enrichment. Final state (`revealStep = Infinity`)
  matches the previous static diagram.
- `src/components/learn/LessonScreen.tsx:2307` — passes `autoPlay speed={speed}` so lesson visuals
  auto-play using the existing Learn-panel speed (Task 9; no second speed system).
- `src/app/dev/visual-demo/VisualDemo.tsx` — new “Sprint R.1 — Animated Teaching Engine” section
  showcasing all 10 animated `VisualCard`s with autoplay + controls.

## Animation strategy per visual

| Visual | Steps | Progressive reveal |
|---|---|---|
| NumberLine | 4 | draw line → ticks → number labels → highlight zero/target |
| FractionBar | 4 | empty partitions → fill numerator (colour) → fraction label → value caption |
| PercentageGrid | 3 | draw grid → colour filled cells (green) → reveal % value |
| CoordinatePlane | 5 | draw axes → grid (purple) → tick labels → plot point → coordinate label |
| GeometryShapes | 4 | draw outlines (coral/purple/green) → dimension markers → names → formula |
| FoodChain | 5 | reveal one node + its incoming arrow per step (Sun→Snake), colour-coded |
| WaterCycle | 6 | ground → ocean → sun → cloud → evaporation (gold) → precipitation/runoff (blue) |
| SolarSystem | 3 | orbits → sun → planets (staggered) |
| ForceDiagram | 5 | ground+object → Applied → Friction → Weight → Normal (one force/step, colour-coded) |
| CircuitDiagram | 5 | wires → battery → switch → bulb → resistor + current arrow |

Reveal mechanics: each step’s `<g>` mounts when `revealStep` reaches it, playing a one-shot CSS
animation — `vReveal` (scale-in) for shapes/nodes, `vDraw` (stroke-dashoffset, via `pathLength={1}`)
for lines/arrows so they “draw”, `vWrite` (slide-up) for labels. This teaches (build-up) rather
than a flat fade. Colours follow the colourful-educational mandate (distinct hues per dimension/step;
science colours: sun=gold, water=blue, plant/producer=green, etc.).

## Task coverage

1. Playback hook — `useTeachingPlayback.ts` (rAF, play/pause/replay/speed, uses `teachingTimeline.ts`). ✓
2. Playback controls — `VisualPlaybackControls.tsx` (play/pause/replay + 5 speeds, “Speed 1x”). ✓
3–8. All 10 visuals (number line, fraction bar, percentage grid, coordinate plane, geometry,
   food chain, water cycle, solar system, force, circuit) animate progressively. ✓
9. Autoplay — VisualCard `autoPlay` default true; lesson passes the Learn-panel `speed`. ✓
10. Validation — see below.

Interactive mode (Sprint F) is untouched — it lives in the separate `VisualRenderer` system, which
this sprint did not modify.

## Validation evidence

```
npx prisma generate         # required first (stale client otherwise)
npx tsc --noEmit -p tsconfig.json   → 0 errors
npm run build               → exit 0, all routes compiled (incl. /dev/visual-demo)
```

Note: before `prisma generate`, tsc shows 4 pre-existing `EvidenceType "VISUAL"` errors in
`visual-mastery/persist`, `improvement-tracking`, and `visualMasteryProfile` — all in files NOT
touched by this sprint, and all cleared by regenerating the Prisma client. Zero errors originate
from any Sprint R.1 file.

### No regression
- Each component’s final state (`revealStep = Infinity`, the default for any non-VisualCard caller)
  renders the same elements as before — only mount order + colour. Static usage anywhere is unchanged.
- Graph / Geometry / Science / Interactive / Visual Assessment / Visual Mastery / Recommendations /
  Educational Intelligence systems (the `src/lib/visuals/*` + `src/components/visuals/*` stack) were
  not modified — only `src/components/school/visuals/*`, one hook, one CSS module, one LessonScreen
  line, and the dev demo.

## Screenshots

Not captured — this environment has no browser/screenshot capability. The animated showcase is
viewable at `/dev/visual-demo` (new “Sprint R.1 — Animated Teaching Engine” section); each card
auto-plays its build-up and exposes Play / Pause / Replay + speed controls.

## Commit

See the commit on `claude/my-tutor-foundation-KDSUO` accompanying this report.

**STOP AFTER REPORT** — no Sprint S, no video generation, no AI-generated animations, no curriculum/
prompt/grading/XP/Educational-Intelligence changes.
