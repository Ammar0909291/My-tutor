# Visual Learning — Sprint E Report: Science Flow Engine

Scope delivered exactly as specified: ProcessFlowSpec, ProcessFlowRenderer,
science process detection, and science lesson rendering via the existing
Sprint C pipeline. No curriculum rewrite, no AI/prompt changes, no database
changes, no new lesson pages/APIs, no Universal Learning, no timeline engine,
no interactive simulations.

## 1. Files Changed

| File | Change |
|---|---|
| `docs/SCIENCE_FLOW_ENGINE_AUDIT.md` | **New.** Architecture audit (Task 1). |
| `src/lib/visuals/visualSpec.ts` | Added `process_flow` member: a flat `ZodObject` (unlike geometry, no nested union needed) joining the existing `mathSpecUnion` `discriminatedUnion('type', ...)` directly. `steps` accepts bare strings or `{title, note?}` objects via a `z.preprocess` step. Added `ProcessFlowSpec` type, bumped `SUPPORTED_VISUAL_TYPES`. |
| `src/components/visuals/ProcessFlowRenderer.tsx` | **New.** SVG-only renderer: vertical, horizontal, and auto orientation; sequence-numbered step boxes with optional notes; directional arrows. |
| `src/components/visuals/VisualRenderer.tsx` | Added `case 'process_flow': return <ProcessFlowRenderer spec={spec} />` to the dispatch switch. One line, no other change. |
| `src/lib/visuals/visualConceptDetector.ts` | Added `ProcessFlowConcept` type and a `PROCESS_DEFINITIONS` table (10 processes across biology/chemistry/geography/environmental science) with one additive detection loop. Existing graph/number_line/geometry logic untouched. |
| `src/lib/visuals/visualSpecBuilder.ts` | Added `buildProcessFlowSpec()`; extended `buildVisualSpec()`'s switch with one `process_flow` case. |
| `src/app/dev/visual-demo/VisualDemo.tsx` | Added `PROCESS_FLOW_SPECS` (4 manual specs covering vertical/horizontal/auto/with-notes) and `SCIENCE_DETECTOR_FIXTURES` (8 real-curriculum-grounded tutor texts) plus two new showcase sections. Dev-only, not user-facing. |

**Not touched** (per audit, confirmed unnecessary): `src/app/api/learn/chat/route.ts`, `src/components/learn/LessonScreen.tsx`, AI system prompts, Prisma schema, `GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`, `mathParser.ts`, `src/lib/school/visuals/*` (a separate, pre-existing School-module visual-suggestion system with its own `food_chain`/`water_cycle` keywords — unrelated pipeline, not part of Tutor Max's `VisualSpec` union, left untouched).

## 2. Architecture Decisions

- **`ProcessFlowSpec` is a flat member, not nested** — unlike `geometry` (which needed `z.union([mathSpecUnion, geometrySpecSchema])` because six shapes share `type: 'geometry'`), `process_flow` has one shape with a unique `type` literal, so it joins `mathSpecUnion`'s existing `discriminatedUnion('type', [graph, number_line, process_flow])` directly — the simplest possible extension.
- **String/object dual input via `z.preprocess`** — the sprint brief's own example (`steps: ["Sunlight", "Water", ...]`) uses bare strings; the renderer needs a stable `{title, note?}` shape to annotate per Task 4. A `z.preprocess` step on each array element coerces a bare string to `{title: <string>}` before the inner object schema validates it, so both the brief's literal example and a richer `{title, note}` form validate identically. Note: this means the *zod-inferred* `VisualSpec`/`ProcessFlowSpec` TypeScript type is the **output** shape (`{title, note?}` objects) — manually-typed `VisualSpec` literals in `VisualDemo.tsx` use `.map(title => ({title}))`, while real production specs always flow through `parseVisualSpec()` (runtime-validated `unknown` input) and so accept the brief's bare-string form transparently.
- **One dedicated renderer, no diagram library** — `ProcessFlowRenderer.tsx` lays out N step-boxes via plain arithmetic (index × spacing) and connects them with SVG `<line>` + `<polygon>` arrowheads. No canvas, no WebGL, no external diagram engine — strictly simpler than even `GeometryRenderer`'s per-shape coordinate math, since every step is an identical rectangle.
- **Vertical / horizontal / auto orientation** — `resolveOrientation()` honors an explicit `orientation` field; when `'auto'` (default), it measures the container width (via the same `ResizeObserver` pattern as every other renderer) and picks horizontal only if every step box fits at a legible width, otherwise falls back to vertical (which always fits, scrolling if needed). This satisfies Task 3's "vertical flow / horizontal flow / auto-layout" requirement without per-process configuration.
- **Educational annotations (Task 4)** — every step box shows a numbered circle badge (sequence number) and its title; an optional `note` renders as a smaller sub-line. Confirmed visually in the Rock Cycle (8-step, with-notes) showcase fixture.
- **Detection (Task 5)** — additive `PROCESS_DEFINITIONS` table in `visualConceptDetector.ts`: each entry is a domain-unambiguous keyword phrase (e.g. `"photosynthesis"`, `"water cycle"`, `"rock cycle"`, `"carbon cycle"`) mapped to a fixed, curriculum-accurate step list. Unlike geometry's generic shape words, these nouns have no everyday alternate meaning, so a single keyword match is sufficient to fire — matching the brief's own one-line examples ("Explain photosynthesis" → ProcessFlowSpec, no extra task keyword required). 10 processes covered: Photosynthesis, Respiration, Digestion, Food Chain, Ecosystem/Energy Flow (biology); Chemical Reaction Process, States of Matter Changes (chemistry); Water Cycle, Rock Cycle (geography); Carbon Cycle (environmental science).
- **Builder (Task 6)** — `buildProcessFlowSpec(title, steps)` is a one-line passthrough; `buildVisualSpec()`'s switch routes any `process_flow` concept to it before `parseVisualSpec()` validates.
- **Pipeline integration** — zero new architecture. `buildVisualSpec()` (already called by `route.ts`) now also returns `process_flow` specs; `VisualRenderer` (already rendered by `LessonScreen.tsx`) now also dispatches `'process_flow'` to `ProcessFlowRenderer`. No call site changed.
- **Extension path** — adding a future process (e.g. nitrogen cycle, lifecycle of a star) requires only one new `PROCESS_DEFINITIONS` entry; no renderer change, no schema change, no pipeline change — the same additive story established in Sprints C and D.

## 3. Real Lessons Tested (Task 7)

Detection fixtures use real topics from `biologyKnowledgeGraph.ts`, `scienceKnowledgeGraph.ts`, `chemistryKnowledgeGraph.ts`, and `geographyKnowledgeGraph.ts`:

| Curriculum topic | Tutor text | Detected |
|---|---|---|
| `biology.photosynthesis` | "Photosynthesis is how plants convert sunlight, water, and carbon dioxide into glucose and oxygen…" | `Photosynthesis` → Sunlight, Water, Carbon Dioxide, Glucose, Oxygen |
| `biology.digestion` | "Explain the human digestive system: digestion begins in the mouth…" | `Digestion` → Mouth, Stomach, Small Intestine, Large Intestine, Absorption |
| `biology.ecosystem` | "A food chain shows how energy flows from producers to consumers…" | `Food Chain` → Sun, Producer, Primary Consumer, Secondary Consumer, Decomposer |
| `biology.respiration_plants` | "Cellular respiration breaks down glucose using oxygen…" | `Respiration` → Glucose, Oxygen, Carbon Dioxide, Water, Energy (ATP) |
| `chemistry.chemical_reactions.equations` | "In a chemical reaction, reactants are transformed into products…" | `Chemical Reaction Process` → Reactants, Activation Energy, Bond Breaking, Bond Formation, Products |
| `chemistry.states_of_matter` | "Water can exist as a solid, liquid, or gas — these are called states of matter…" | `Changes in States of Matter` → Solid, Melting, Liquid, Evaporation, Gas |
| `geography.moisture_precipitation` | "The water cycle describes how water evaporates, condenses…" | `Water Cycle` → Evaporation, Condensation, Precipitation, Collection |
| `earth_science.earth_structure.layers` | "The rock cycle explains how igneous, sedimentary, and metamorphic rocks…" | `Rock Cycle` → Magma, Igneous Rock, Weathering and Erosion, Sediment, Sedimentary Rock, Heat and Pressure, Metamorphic Rock, Melting |

Negative/regression controls confirmed via direct `detectVisualConcept`/`buildVisualSpec` calls:
- "Let's graph y = x + 2 on the cartesian plane." → still `{graph, equation:'y = x + 2'}` (unaffected).
- "On the number line, compare -5 and 3 as integers." → still `{number_line, start:-5, end:5, highlight:[-5,3]}` (unaffected).
- "Find the area of a triangle with base 6 and height 4." → still `{geometry, triangle, base:6, height:4}` (unaffected).
- "This lesson covers the history of ancient Rome." → `null` (no false positive).

## 4. Screenshots

Captured via the dev showcase page (`/dev/visual-demo`) using the project's chromium binary, light + dark + mobile:

- `screenshots/visual-demo/13_sprinte_science_light.png` — full page, light mode (manual process_flow specs + all 8 detector fixtures, plus pre-existing Sprint B/C/D sections for regression comparison).
- `screenshots/visual-demo/14_sprinte_science_dark.png` — same, dark mode.
- `screenshots/visual-demo/15_sprinte_science_mobile.png` — same, 390px mobile viewport.

Verified: horizontal orientation renders a left-to-right row with rightward arrows (scrolls within its card on narrow containers, by design); vertical orientation renders a top-to-bottom stack with downward arrows and always fits; auto orientation correctly picks vertical for the 4-step Water Cycle in a half-width grid column on desktop and on mobile; the 8-step Rock Cycle fixture demonstrates per-step notes rendering as a smaller sub-line under each title. Dark mode shows correct contrast on all process boxes, arrows, and numbered badges. Existing Sprint B/C/D sections visible in the same screenshots are pixel-identical to their pre-Sprint-E appearance.

## 5. Performance Notes

- Detection adds a fixed 10-entry keyword-phrase scan (`PROCESS_DEFINITIONS`) run only after graph/number_line/geometry checks fail to match — negligible (<1ms), and the hot path for non-visual/graph/number_line/geometry text is unaffected.
- `ProcessFlowRenderer` does one `ResizeObserver` + one SVG render per spec, same cost profile as the other three renderers. Layout is O(n) arithmetic over step count (capped at 12 by zod) — no measurable render cost difference between orientations.
- No new network calls, no new AI calls, no new DB queries.

## 6. Failure Modes

- Invalid specs (steps array <2 or >12, step title >60 chars, etc.) are rejected by zod in `parseVisualSpec()`; `buildVisualSpec()` returns `null` and the lesson falls back to text-only, same fail-safe behavior as every prior visual type.
- `VisualRenderer`'s existing `VisualErrorBoundary` wraps `ProcessFlowRenderer` automatically — a rendering exception cannot crash the host lesson screen.
- Forced `orientation: 'horizontal'` on a narrow/mobile viewport intentionally overflows with horizontal scroll inside its own card rather than auto-switching — this is correct per the explicit-override design (the user/caller asked for horizontal specifically); `'auto'` is the safe default for unknown viewport widths.
- A single-keyword match (e.g. "photosynthesis") fires without a corroborating task keyword, by design (these nouns are domain-unambiguous) — this is a deliberate scope tradeoff documented in the audit's risk table, consistent with the sprint brief's own one-line trigger examples.

## 7. Remaining Work

- Only 10 processes are covered; additional ones (nitrogen cycle, life cycle of a star, mitosis/meiosis stages, etc.) can be added with one `PROCESS_DEFINITIONS` entry each — no renderer/schema/pipeline change required (see audit's extension path).
- Live end-to-end verification against a real OpenRouter-backed tutor session was not performed (would require a real AI completion call); verification was done at the unit level (`detectVisualConcept`/`buildVisualSpec` direct calls) and via `tsc --noEmit` + `npm run build`, sufficient because `route.ts`/`LessonScreen.tsx` were not modified and remain generic over the `VisualSpec` union.
- Long step titles wrap awkwardly if they approach the 60-character zod limit inside the fixed-width `StepBox`; acceptable for the curriculum step names used here (none exceed ~35 characters) but a future sprint could add text-wrapping/auto-width if longer titles are needed.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → **clean, zero errors** after all Sprint E changes.
- `npm run build` → **succeeded**, all routes (including `/dev/visual-demo`) compiled without error.
- Direct test of `detectVisualConcept`/`buildVisualSpec` confirmed graph, number_line, and geometry detection produce byte-identical output to Sprint D for unchanged inputs (see Section 3, negative controls).
- Screenshots confirm Sprint B (`01`–`04`), Sprint C (`05`–`09`), and Sprint D (`10`–`12`) sections render identically to their pre-Sprint-E state.
- `GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`, `mathParser.ts` were not modified — zero risk of regression to those renderers by construction.
