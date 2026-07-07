# Visual Learning Architecture (Design Only — Not Implemented)

**Date:** 2026-06-19
**Sprint:** Visual Learning Foundation — Sprint A (Phase 1)
**Status:** DESIGN ONLY. No code in this sprint. This document defines the target architecture so later phases implement against a stable contract.

---

## 1. Design goals & constraints

**Goals**
- Evolve the existing v1 visual layer (audit §0) from *static type* to **type + data payload**, so a visual depicts the *specific* concept/problem, not a generic picture.
- One small, typed contract that the AI, the backend, and the frontend all share.
- Future-proof: adding a new visual = adding one payload type + one renderer, nothing else.

**Hard constraints (from the sprint brief — must hold in every phase)**
- Existing architecture (School Mode, Library Mode, Tutor Max, Learn Screen, Practice, Assessment, Mock, Progress, Dashboard) keeps working unchanged.
- No DB rewrite, no AI rewrite, no curriculum rewrite, no lesson-flow change.
- Visuals are an **additive, fail-safe enhancement**: if a payload is missing, malformed, or a renderer throws, the lesson degrades silently to text. This mirrors how `buildVisualsSystemBlock`/`parseVisualTag` already fail open.
- No new AI models, no new tutor systems, no Universal Learning.

---

## 2. The core contract: `VisualSpec`

A single discriminated union flows end-to-end. The `type` selects the renderer; the rest is the **payload** that makes the visual specific.

```ts
// PROPOSED (design only) — src/lib/visuals/visualSpec.ts
type VisualSpec =
  | { type: 'graph';        title?: string; payload: GraphPayload }
  | { type: 'geometry';     title?: string; payload: GeometryPayload }
  | { type: 'process_flow'; title?: string; payload: ProcessFlowPayload }
  | { type: 'timeline';     title?: string; payload: TimelinePayload }
  | { type: 'number_line';  title?: string; payload: NumberLinePayload }
  | { type: 'fraction_bar'; title?: string; payload: FractionPayload }
  | { type: 'percentage';   title?: string; payload: PercentagePayload }
  | { type: 'diagram';      title?: string; payload: DiagramPayload }   // labelled static figures (circuit, force, cell, atom…)
```

### Example payloads

```ts
// Graph — covers y=f(x), linear, quadratic, physics motion
interface GraphPayload {
  equation?: string                 // "y = x^2"  (parsed by a SAFE evaluator, never eval())
  points?: { x: number; y: number }[]
  domain?: [number, number]         // default [-10, 10]
  range?: [number, number]
  markers?: { x: number; y: number; label?: string }[]  // roots, vertex, intercepts
}

// Geometry — labelled 2D shapes
interface GeometryPayload {
  shape: 'triangle' | 'rectangle' | 'circle' | 'polygon'
  dimensions?: Record<string, number>     // { base: 4, height: 3 } | { radius: 5 }
  labels?: { text: string; at: 'side' | 'angle' | 'vertex'; index: number }[]
}

// Process flow — reactions, photosynthesis, water cycle, loops, functions
interface ProcessFlowPayload {
  steps: { id: string; label: string }[]
  edges?: { from: string; to: string; label?: string }[]
  cyclic?: boolean                         // water cycle, loops
}

// Timeline — history, tenses, story arc
interface TimelinePayload {
  events: { date: string; title: string; description?: string }[]
  orientation?: 'horizontal' | 'vertical'
}

// Arithmetic primitives (parameterized versions of today's static SVGs)
interface NumberLinePayload  { min: number; max: number; marks?: number[]; highlight?: number[] }
interface FractionPayload    { numerator: number; denominator: number }
interface PercentagePayload  { value: number }      // 0..100

// Diagram — labelled static figure with a known template id
interface DiagramPayload {
  template: 'circuit' | 'force' | 'cell' | 'atom' | 'solar_system' | 'food_chain' | 'water_cycle' | string
  labels?: { text: string; x: number; y: number }[]  // optional overlay annotations
  params?: Record<string, string | number>           // e.g. atom: { protons: 6 }
}
```

**Why a discriminated union:** exhaustive `switch` in the renderer (compiler enforces every type is handled), trivial validation per branch, and a stable shape for persistence.

---

## 3. End-to-end flow

```
                    ┌───────────────────────────────────────────────┐
   Concept context  │  PRODUCER (one of two, both already-styled)    │
   (subject,        │                                               │
    chapter,        │  (a) Deterministic: detectVisual()/builder →   │
    lesson, turn)   │      VisualSpec  (no AI, no network)           │
                    │  (b) AI-tagged: tutor emits VISUAL:<type>{json}│
                    │      → parsed into VisualSpec                  │
                    └───────────────────────────────────────────────┘
                                      │  VisualSpec (validated)
                                      ▼
                    ┌───────────────────────────────────────────────┐
   /api/learn/chat  │  TRANSPORT                                     │
   response         │  { success, text, provider, visual?: VisualSpec}│  ← `visual` upgraded
                    │  (string → object; still optional)             │     from string to object
                    └───────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌───────────────────────────────────────────────┐
   LessonScreen     │  VALIDATION (zod) — if invalid, drop to text   │
   (and future      │  ChatMsg.visual: VisualSpec | null            │
    surfaces)       └───────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌───────────────────────────────────────────────┐
                    │  RENDERER:  <VisualRenderer spec={spec} />     │
                    │  switch(spec.type){ graph|geometry|flow|... }  │
                    │  each branch = a pure, prop-driven SVG comp    │
                    │  ErrorBoundary → silent fallback to nothing    │
                    └───────────────────────────────────────────────┘
```

### Producer options (two, both preserve "additive + fail-safe")

- **(a) Deterministic builder (preferred for v2 / MVP).** Extend the existing `detectVisual()` to not just pick a *type* but also build a *payload* from known context (e.g. a chapter on "Quadratic Equations" → `graph` with `equation: "y = x^2"`). **No AI prompt change, no network, fully testable.** This is the lowest-risk way to ship the first data-driven visual.
- **(b) AI-emitted payload (later).** Upgrade the tutor tag from `VISUAL:graph` to a tag that can carry JSON, e.g. `VISUAL:{"type":"graph","payload":{"equation":"y=x^2"}}`. Parsed by an upgraded `parseVisualTag` and **validated with zod**; invalid → dropped. (Touches AI prompt text — explicitly out of scope until a sprint authorizes it.)

---

## 4. Module layout (proposed; created in later phases, not now)

```
src/lib/visuals/
  visualSpec.ts          # VisualSpec union + payload interfaces + zod schemas
  validate.ts            # parseVisualSpec(json) -> VisualSpec | null  (fail-safe)
  builders/
    mathGraphBuilder.ts  # context -> { type:'graph', payload } (deterministic)
    timelineBuilder.ts
    processFlowBuilder.ts
  detect.ts              # successor to school/visuals/detectVisual.ts (type + payload)

src/components/visuals/
  VisualRenderer.tsx     # switch(spec.type) dispatcher + ErrorBoundary
  GraphRenderer.tsx      # prop-driven SVG (uses a small, safe expression evaluator)
  GeometryRenderer.tsx
  ProcessFlowRenderer.tsx
  TimelineRenderer.tsx
  NumberLineRenderer.tsx
  FractionRenderer.tsx
  PercentageRenderer.tsx
  DiagramRenderer.tsx    # wraps the existing static SVGs (circuit/force/cell/…) as templates
```

**Migration of v1:** the current `src/components/school/visuals/*` static SVGs become `DiagramRenderer` templates (a `diagram` spec with `template: 'circuit' | …`). The current `VisualType` string maps onto the new union via a thin compatibility shim, so the existing lesson-chat path keeps working during transition. Nothing is deleted in a way that breaks the running app.

---

## 5. Rendering technology decision

| Option | Verdict |
|---|---|
| **Hand-rolled SVG** (current approach) | ✅ **Default.** Zero deps, SSR-safe, dark-mode via CSS vars, tiny bundle. Already proven by the 10 v1 components. Use for geometry, timeline, process flow, arithmetic, diagrams. |
| Tiny safe math-expression evaluator for `graph` | ✅ Needed for `y=f(x)`. Must be a **whitelisted parser** (e.g. a small shunting-yard evaluator), **never `eval`/`new Function`**. Plot by sampling the domain → SVG `<path>`. |
| Charting lib (Recharts/Chart.js/D3) | ❌ Not for MVP. Heavy, overkill for a single-equation plot. Revisit only if rich interactive charts are later required. |
| KaTeX/MathJax for equation *typesetting* | ⚠️ Optional, separate concern. Nice for rendering the equation label prettily; not required to plot. Defer. |
| Canvas / WebGL / simulations | ❌ Phase 8 only (interactive simulations). |

**Principle:** stay library-free as long as SVG suffices; introduce a dependency only when a concept genuinely cannot be done with SVG.

---

## 6. Persistence (optional, additive)

Today the `visual` is ephemeral (stripped before storing `Message.content`). Two future options, both backward-compatible:

- **Option A (recommended):** add a nullable `visualSpec Json?` column to `Message` (additive migration via `prisma db push`, no rewrite). Past lessons re-render their visuals.
- **Option B:** keep ephemeral; re-derive via the deterministic builder on reload (works only for builder-produced, not AI-produced, visuals).

Persistence is **not required for the MVP** and can be deferred to the Tutor-Max integration phase.

---

## 7. Safety, accessibility, performance (carried from v1)

- **Fail-safe:** every renderer wrapped in an ErrorBoundary; unknown/invalid `type` or payload → render nothing, lesson text unaffected.
- **Validation:** all inbound `VisualSpec` (AI or transport) validated with zod before render.
- **No code execution:** graph equations parsed by a whitelisted evaluator, never `eval`.
- **Accessibility:** keep v1's `role="figure"` + `aria-label` + text description per visual.
- **Performance:** SVG only; sample graphs at a fixed resolution; cap payload sizes (e.g. timeline events ≤ N) in validation.
- **Theming:** CSS variables (`--coral`, `--bg-surface`, …) as today.

---

## 8. What this architecture explicitly does NOT do

- Does not change Tutor Max behavior, prompts, or models (producer option (b) is deferred and gated).
- Does not restructure lessons into block arrays — visuals attach at the **message/turn** level (and optionally chapter level via the deterministic builder).
- Does not touch curriculum data or question banks (question-level visuals are a later, separately-scoped option).
- Does not introduce Universal Learning, age bands, promotion assessments, or knowledge-graph expansion.

---

## 9. Summary

One `VisualSpec` discriminated union (type + typed payload), produced either deterministically (no AI change) or by an upgraded AI tag (later), validated with zod, and rendered by a `VisualRenderer` switch over ~6–8 prop-driven SVG components — with the existing 10 static SVGs absorbed as `diagram` templates. Additive, fail-safe, library-free for the MVP. This is the smallest stable contract that turns *"text only"* into *"text + the right diagram for this exact concept."*
