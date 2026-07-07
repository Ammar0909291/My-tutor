# Visual Learning Roadmap

**Date:** 2026-06-19
**Sprint:** Visual Learning Foundation — Sprint A (Phase 1)
**Status:** Planning only. No implementation in this sprint.

This roadmap sequences the work from the current v1 (10 static SVGs, math/science, lesson-chat only — see `VISUAL_LEARNING_AUDIT.md` §0) to a data-driven visual layer, ordered by **value ÷ risk**.

---

## Phase overview

| Phase | Name | Output | Risk | Depends on |
|---|---|---|---|---|
| 1 | **Audit** ✅ (this sprint) | 4 docs: audit, opportunities, architecture, roadmap | none (docs) | — |
| 2 | **Architecture foundation** | `VisualSpec` types + zod validation + `VisualRenderer` shell + v1 compatibility shim. No new visuals yet. | Low | Phase 1 |
| 3 | **Math Graph Engine** | `graph` renderer (`y=f(x)`) + safe evaluator + deterministic math builder. **The MVP.** | Low–Med | Phase 2 |
| 4 | **Geometry Engine** | `geometry` renderer (parameterized shapes) + parameterize `fraction/number_line/percentage` | Low–Med | Phase 2 |
| 5 | **Science Flow Engine** | `process_flow` renderer (reactions, photosynthesis, water cycle) | Med | Phase 2 |
| 6 | **History Timeline Engine** | `timeline` renderer | Low | Phase 2 |
| 7 | **Tutor Max Visual Integration** | Upgrade AI tag to carry payload JSON (`VISUAL:{...}`) + optional `Message.visualSpec` persistence | Med (touches AI prompt) | Phases 3–6 |
| 8 | **Interactive Simulations** | Canvas/animation: algorithm traces, motion sims, circuit interactivity | High | Phases 3–7 |

---

## Phase detail

### Phase 1 — Audit (this sprint) ✅
Deliverables: `VISUAL_LEARNING_AUDIT.md`, `VISUALIZATION_OPPORTUNITIES.md`, `VISUAL_LEARNING_ARCHITECTURE.md`, `VISUAL_LEARNING_ROADMAP.md`. No code.

### Phase 2 — Architecture foundation
- Create `src/lib/visuals/visualSpec.ts` (union + payloads + zod) and `src/components/visuals/VisualRenderer.tsx` (switch + ErrorBoundary).
- Add a compatibility shim mapping the existing `VisualType` string → `VisualSpec` (`diagram` templates) so the current lesson-chat visuals keep working unchanged.
- **No new visual types yet** — pure scaffolding. Ship behind the existing seam.
- Exit criteria: existing v1 visuals render through the new `VisualRenderer` with zero behavioral change; `tsc`/build green.

### Phase 3 — Math Graph Engine (**MVP**)
- `GraphRenderer.tsx`: sample a whitelisted-parsed equation over a domain → SVG path, axes, gridlines, markers (roots/intercepts). **Never `eval`.**
- `mathGraphBuilder.ts`: deterministic — given a math chapter/lesson context, build `{ type:'graph', payload:{ equation } }` (no AI change).
- Wire into the Learn-screen math path (reuse the existing `visual` seam).
- Exit criteria: a math lesson on linear/quadratic functions shows the *actual* curve; fail-safe verified (bad equation → no crash, text intact).

### Phase 4 — Geometry Engine
- `GeometryRenderer.tsx` (triangle/rectangle/circle/polygon with labelled dimensions).
- Parameterize the existing arithmetic SVGs (`fraction_bar`, `number_line`, `percentage`) to accept payloads (so 3/4 shows as 3/4).

### Phase 5 — Science Flow Engine
- `ProcessFlowRenderer.tsx` (linear + cyclic). Builders for photosynthesis, simple reactions, water cycle.

### Phase 6 — History Timeline Engine
- `TimelineRenderer.tsx` (horizontal/vertical events). Trivial, high comprehension value. (History lives under Social Science catalogs today.)

### Phase 7 — Tutor Max Visual Integration
- Upgrade `parseVisualTag` to accept payload JSON; **carefully** extend the visuals system-prompt block to teach the tutor the payload format (this is the first phase that touches AI prompt text — must be its own gated sprint).
- Optional additive `Message.visualSpec Json?` column for persistence (`prisma db push`).

### Phase 8 — Interactive Simulations
- Canvas/animation for algorithm traces, motion, circuits. Highest effort; only after the static-payload layer is proven.

---

## MVP recommendation (Task 4)

**Smallest implementation, highest value, lowest risk = Phase 2 + Phase 3: a data-driven Math Graph Engine fed by a deterministic builder.**

Ranking rationale:

1. **Highest value** — graphs of `y=f(x)` serve Mathematics (functions, linear, quadratic, coordinates, slope) *and* Physics (distance–time, velocity–time) from one engine. They are the most universally requested math visual and the one currently *faked* by a static coordinate plane.
2. **Easiest meaningful implementation** — a graph is "sample the function, draw an SVG path." No external library; the only new primitive is a small whitelisted expression evaluator. The render seam (`visual` on the tutor message → `VisualRenderer`) already exists.
3. **Lowest risk** — using the **deterministic builder** (not the AI) as the producer means **no AI prompt change, no DB change, no curriculum change**. It is additive and fail-safe: a malformed equation degrades to plain text. Confined to the math Learn-screen path.

Runner-up (if a non-math first win is preferred): **History Timeline (Phase 6)** — pure data→SVG, even easier, but narrower subject reach than graphs.

---

## Recommended next sprint

**Visual Learning Sprint B — "Architecture Foundation + Math Graph MVP" (Phases 2 + 3).**

Scope:
1. Build `VisualSpec` + zod validation + `VisualRenderer` shell, with a compatibility shim so the existing 10 static visuals render through it unchanged (prove zero regression first).
2. Implement `GraphRenderer` + a safe expression evaluator + a deterministic `mathGraphBuilder`.
3. Wire it into the math Learn-screen path via the existing `visual` seam.

Hard guardrails for Sprint B:
- No AI prompt changes (deterministic builder only — defer AI-emitted payloads to Phase 7).
- No DB changes (persistence deferred to Phase 7).
- No changes to School/Library/Practice/Assessment/Mock/Progress/Dashboard behavior.
- Fail-safe: any visual error → silent fallback to text.
- `npx prisma generate`, `npx tsc --noEmit`, `npm run build` must stay green; verify a math lesson live.

Estimated complexity: **Medium-low.** Phase 2 is scaffolding against a contract already designed here; Phase 3's only novel piece is the safe evaluator. Everything else reuses existing SVG patterns and the existing render seam.
