# Animated Teaching Engine — Audit (Sprint R, Task 1)

**Status: audit only. No rendering code modified.**

## 1. Actual visual pipeline (names corrected vs. task brief)

The task brief refers to `VisualSpec → VisualRenderer → GraphRenderer → GeometryRenderer →
NumberLineRenderer → ProcessFlowRenderer`. Those exact names do not exist in this codebase.
The real pipeline is:

```
AI response (src/app/api/learn/chat/route.ts)
  → may include a `visual: VisualType` field (type alias in src/lib/school/visuals/visualTypes.ts)
  → src/components/school/visuals/VisualCard.tsx — single dispatcher component
      switch(type) renders one of 10 static SVG components:
      NumberLine | FractionBar | PercentageGrid | CoordinatePlane | GeometryShapes
      | FoodChain | WaterCycle | SolarSystem | ForceDiagram | CircuitDiagram
  → each component (src/components/school/visuals/*.tsx) renders a complete, static
    inline SVG on mount — no animation, no timeline, no playback state.
```

`teachingStrategy.ts` (`src/lib/school/adaptive/teachingStrategy.ts`) governs *when* a visual
is chosen (which topic/misconception triggers which `VisualType`), not *how* it renders —
it has no involvement in animation.

## 2. Why visuals currently appear instantly

Every component in `src/components/school/visuals/` (e.g. `WaterCycle.tsx`, `GeometryShapes.tsx`,
`CoordinatePlane.tsx`) is a plain functional component returning a single `<svg>` tree with all
elements present in the initial render — no `useEffect`-driven reveal, no CSS animation
timing, no per-element opacity/stroke-dashoffset state. `VisualCard.tsx` itself is also fully
synchronous (mount → render → done).

## 3. Safest insertion point

The dispatcher (`VisualCard.tsx`) is the correct seam:

- It already owns the single switch over `VisualType` and is the only place that knows
  "which shape am I about to render."
- Each of the 10 SVG components currently takes **zero props** — none of them read external
  state, so a new optional `timeline`/`playbackState` prop can be threaded through without
  touching `teachingStrategy.ts`, `visualTypes.ts`, the AI response contract, or any
  consumer of `<VisualCard type={...} />` (confirmed sole consumer: `LessonScreen.tsx`'s
  chat message renderer, via the `visual` field on an assistant message).
- Per-component SVGs are small and self-contained (median ~80–150 lines each), so adding
  staged reveal is a localized, mechanical change per file, not a structural rewrite.

**Recommended seam:** introduce a renderer-agnostic timeline model (Task 2) consumed by a thin
wrapper inside `VisualCard.tsx`, with each of the 10 SVG components accepting an optional
`revealStep: number` (or similar) prop that gates which of their existing SVG elements are
mounted/visible at a given step — i.e. animate by progressively revealing elements that
*already exist* in the current static markup, not by rewriting their geometry logic.

## 4. Confirmed unaffected by this seam

`teachingStrategy.ts`, `visualTypes.ts`, `VISUAL_META`, the AI prompt/response contract in
`src/app/api/learn/chat/route.ts`, XP/grading/Educational Intelligence, and all non-visual
LessonScreen logic — none of these need to change for staged-reveal animation to work, because
the insertion point is purely inside the already-isolated render layer.

## 5. Scope note

Tasks 3–10 of the Sprint R brief (animated process flows, geometry, graphs, number lines,
playback controls, autoplay, colorful redesign, `/dev/visual-demo` showcase) are substantial
multi-file implementation work across all 10 SVG components plus a new timeline engine and demo
page. Given session constraints, this pass delivers Task 1 (this audit) and Task 2 (the
reusable timeline engine, `src/lib/visuals/teachingTimeline.ts`) as the foundation. Wiring the
timeline into each SVG component, playback controls, and the demo page is recommended as a
follow-up continuation using this audit's seam.
