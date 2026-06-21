# 3D Interactive Simulation Layer Phase 1 — Audit (Task 1)

## Scope reviewed

`ThreeDVisual.tsx`, `DoubleSlit3D.tsx`, `QuantumTunneling3D.tsx`, `BlochSphere3D.tsx`,
`SternGerlach3D.tsx`, `HydrogenOrbital3D.tsx`, `VisualCard.tsx` integration, narration
synchronization (`useTeachingPlayback`, `synchronizedPlayback.ts`, `narrationProgress.ts`).

## Existing capabilities

- `ThreeDVisual.tsx` is a shared, renderer-only host: `Canvas` + lighting + `OrbitControls`
  (camera rotate/zoom only — `enablePan={false}`), `prefers-reduced-motion` gating, and a
  `revealStep` pass-through. It owns **no simulation parameters or input widgets** — it is purely
  presentational.
- All five existing quantum simulations follow one pattern: a `Scene({ revealStep })` component
  that gates which meshes are visible/animated by comparing `revealStep` against fixed thresholds
  (1–5), driven entirely by `VisualCard`'s playback timer or narration sync. There is **no student
  input anywhere** — camera orbit (via `OrbitControls`) is the only end-user interaction surface.
- `VisualCard.tsx` renders `VisualComponent` (the active simulation) above `VisualPlaybackControls`
  (Play/Pause/Replay/Speed). These controls drive `revealStep`, not simulation physics — they
  control *when* a fixed sequence is revealed, not *what* is shown.
- `useTeachingPlayback` / `synchronizedPlayback.ts` / `narrationProgress.ts` are renderer-agnostic
  pure logic for mapping a timer or narration-segment index to a `revealStep` integer. None of
  this logic accepts or needs student-set physics parameters — it is orthogonal to interactivity.

## Missing interaction points

- No sliders/toggles/dropdowns exist anywhere in the 3D visual stack prior to this sprint.
- No component recomputes physics (transmission probability, fringe spacing, orbital shape, state
  vector orientation) from a live, student-controlled parameter — all five existing simulations
  hard-code their physical setup and only animate a fixed reveal sequence.
- No "guided" affordance (highlighting a specific control or scene element while a particular step
  is active) exists, since no controls existed to highlight.

## Reusable control architecture (decision)

Two integration options were available:
1. Modify the five existing `revealStep`-gated components in place to add `useState`-driven
   parameters alongside their `revealStep` gating, and register the result as the same
   `VisualType`.
2. Add new, separate, additive components for the interactive versions, reusing `ThreeDVisual`
   for the 3D host and a new shared `SimulationControlPanel` for input, without touching the
   originals.

This sprint uses **option 2**: `ThreeDVisual` already cleanly separates "3D host" from "scene
content," so an interactive scene is just a different `children` tree driven by `useState` instead
of `revealStep`. This satisfies "DO NOT...Replace existing simulations" literally (the originals
are untouched and remain registered/used as-is) and avoids risk of regressing the narration-synced
reveal behavior already validated in the prior sprint.

`SimulationControlPanel.tsx` (Task 2) is the new reusable piece: a generic, subject-agnostic
slider/toggle/dropdown/reset panel that any interactive simulation can pass a `SimulationControl[]`
into, decoupled from `ThreeDVisual` and from `VisualCard`'s `revealStep`/narration plumbing
entirely. It also exposes a `highlightedControlId` prop for future guided-mode highlighting
(Task 7, deferred — see report).

## Conclusion

Interactivity is layered *alongside* the existing revealStep/narration architecture, not merged
into it: interactive components use local `useState` for live parameters and do not currently
accept `revealStep` or narration props. This is the minimal-risk path consistent with "DO NOT
redesign architecture."
