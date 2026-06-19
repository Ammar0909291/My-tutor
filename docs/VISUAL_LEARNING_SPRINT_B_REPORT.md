# Visual Learning Sprint B — Math Graph Engine MVP

Status: **Complete.** Scope strictly limited to the six tasks below (linear/quadratic
graphs + number lines). No geometry engine, no science flow engine, no history
timelines, no Universal Learning, no Tutor Max redesign, no curriculum changes,
no DB changes, no AI provider changes.

## 1. Files changed

**New — visual data contract**
- `src/lib/visuals/visualSpec.ts` — zod `VisualSpec` discriminated union (`graph` |
  `number_line`), `parseVisualSpec()` fail-safe validator, `SUPPORTED_VISUAL_TYPES`.
- `src/lib/visuals/mathParser.ts` — safe expression compiler: normalize → tokenize
  → shunting-yard → RPN eval. No `eval`/`new Function`. `compileExpression()` returns
  `null` on anything unparseable/unsafe.

**New — renderers**
- `src/components/visuals/VisualRenderer.tsx` — dispatcher (`spec.type` → component),
  `never`-typed exhaustiveness check so a future union member fails to compile if
  unhandled.
- `src/components/visuals/GraphRenderer.tsx` — interactive SVG plot: pan (pointer
  drag), zoom (wheel + buttons, cursor-anchored), dynamic "nice" grid, axis labels,
  asymptote-aware path breaking, responsive via `ResizeObserver`, theme-aware via
  CSS vars with literal fallbacks.
- `src/components/visuals/NumberLineRenderer.tsx` — responsive number line with
  auto-stepped ticks, positive/negative range, basic fraction labels (halves,
  thirds, quarters, fifths, sixths, eighths, tenths), highlighted points.
- `src/components/visuals/VisualErrorBoundary.tsx` — class error boundary; any
  renderer exception is swallowed (dev-only console.warn) and renders nothing,
  never crashes the host page.

**New — dev-only showcase (Task 6)**
- `src/app/dev/visual-demo/page.tsx` — `notFound()` in production; not linked from
  any nav.
- `src/app/dev/visual-demo/VisualDemo.tsx` — 7 example specs (2 linear, 2 quadratic,
  3 number-line) through the real `VisualRenderer`, light/dark toggle (+ `?theme=dark`
  URL param for repeatable screenshots), and a fail-safe section with two
  intentionally invalid specs.

**Edited — one lesson integration (Task 5, additive only)**
- `src/components/learn/LessonScreen.tsx`:
  - Added imports for `VisualRenderer` / `VisualSpec`.
  - Extended `ChatMsg` with an optional `visualSpec?: VisualSpec` field.
  - Added one new conditional render block, alongside the existing static
    `VisualCard` block, that renders `<VisualRenderer spec={msg.visualSpec} />`
    only when a tutor message carries a `visualSpec`. Nothing currently populates
    this field — it's pure scaffolding. Confirmed zero regression (see §3).

## 2. Architecture decisions

- **VisualSpec is the only contract.** A producer (today: the demo page; later: an
  AI tag or lesson builder) emits a plain object; `parseVisualSpec()` validates it
  and returns `null` on anything malformed, so callers can always fall back to
  text-only with no crash.
- **discriminatedUnion + superRefine, not refine-per-member.** `z.discriminatedUnion`
  requires plain `ZodObject` members; cross-field checks (e.g. `number_line.end >
  start`) live in a `.superRefine()` on the union itself.
- **No eval, ever.** `mathParser.ts` is a from-scratch tokenizer → shunting-yard →
  RPN evaluator. Character whitelist rejects anything outside digits/`x`/operators/
  parens/decimal point; `compileExpression` additionally probes the result at two
  sample points and rejects compiles that produce `NaN` everywhere.
- **Dispatcher pattern for extensibility.** `VisualRenderer` is a single switch keyed
  on `spec.type`. Adding a Sprint C renderer (geometry, etc.) means: add the zod
  schema to the union, add one `case` branch, write the component — nothing else in
  the codebase changes.
- **Error boundary at the dispatch boundary.** Renderer crashes (e.g. a pathological
  equation that compiles but blows up at render time) are caught one level above
  the renderer, not inside each renderer — so the same safety net protects all
  current and future visual types for free.
- **Additive-only lesson integration.** `visualSpec` is an optional field on an
  existing message type; the new render block is purely conditional. No existing
  code path was modified, only appended to.

## 3. Validation results

- `npx tsc --noEmit` → **exit 0**.
- `npm run build` → **success**; `/dev/visual-demo` builds as a static route
  (`○ /dev/visual-demo  1.42 kB  106 kB`); all other routes unaffected.
- Standalone unit test of `mathParser.ts` (transpiled via `tsc`, run under Node) →
  **15/15 passed** — 10 correctness cases (linear, quadratic, parens, negative
  coefficients, decimals) + 5 fail-safe rejections (script injection attempts,
  malformed syntax, empty input).
- **Zero-regression proof**: curled the live seeded student session
  (`demo.student@sprinte.local`) against `/learn`, `/learn?subject=python`,
  `/dashboard`, `/coach` — all 200 OK, and grepping the returned HTML for visual
  markers (`aria-label="Graph of`, `aria-label="Number line`) found **zero**
  matches. No existing lesson renders a visual, because no message anywhere
  populates `visualSpec` yet — confirming the integration is purely additive.
- **Showcase page verified live** (dev server, fresh restart to rule out stale
  compilation):
  - 4 graph `aria-label`s and 3 number-line `aria-label`s present in the rendered
    HTML, e.g. `aria-label="Graph of y = -2x + 1"` (confirmed no duplicated "y =").
  - Fail-safe section confirmed: an unparseable equation (`y = sin(@@@)`) renders
    the graceful "Could not render this equation." message instead of crashing;
    an unknown `type` renders nothing at all.
  - Light mode and dark mode (`?theme=dark`) verified visually distinct (screenshots
    below) — CSS-variable theming confirmed correct on both desktop (1280×900) and
    mobile (390×844 @2x) viewports.

## 4. Screenshots

All captured against the real `VisualRenderer` pipeline via the dev-only showcase
page, Playwright + Chromium, saved under `screenshots/visual-demo/`:

- `01_desktop_light.png` — desktop, light mode, all 7 specs + fail-safe section.
- `02_desktop_dark.png` — desktop, dark mode, same content.
- `03_mobile_light.png` — mobile viewport (390×844 @2x), light mode.
- `04_mobile_dark.png` — mobile viewport (390×844 @2x), dark mode.

## 5. Remaining work for Sprint C (not started, per scope)

- Geometry Engine (shapes, angles, area/perimeter visuals).
- Science Flow Engine (process/cycle diagrams).
- History Timelines.
- Wiring a real producer to populate `LessonScreen`'s `visualSpec` field (today
  nothing sets it) — e.g. an AI tag in the tutor response parser, or a manual
  per-lesson author field.
- Persistence: `VisualSpec` is currently never written to or read from the
  database; if a future sprint wants visuals to survive a session, that needs a
  schema change (explicitly out of scope here).
- Broader expression support (trig/log functions) in `mathParser.ts`, if a future
  curriculum need arises — Sprint B intentionally targets only linear/quadratic.

---

STOP AFTER REPORT — no further Sprint B/C work performed.
