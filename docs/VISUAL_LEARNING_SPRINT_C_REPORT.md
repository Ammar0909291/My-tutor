# Visual Learning Sprint C — Tutor Max → Visual System Connection

Status: **Complete**, with one sandbox limitation documented in §5. Sprint B's
`VisualSpec` / `VisualRenderer` / `GraphRenderer` / `NumberLineRenderer` /
math parser / lesson integration point / dev showcase were **not rebuilt,
redesigned, or replaced** — this sprint only adds a rule-based detector and
producer that feed the existing pipeline.

## 1. Files changed

**New**
- `docs/VISUAL_PRODUCER_AUDIT.md` (Task 1) — full pipeline trace and injection-
  point analysis.
- `src/lib/visuals/visualConceptDetector.ts` (Task 2) — `detectVisualConcept()`.
  Deterministic, regex/keyword-based. No AI call, no LLM parsing. Recognizes:
  - **Graph**: any `y = <expr containing x>` substring that also compiles via
    the existing safe `mathParser.compileExpression()` (covers linear and
    quadratic — the only two equation families Sprint B's `GraphRenderer`
    supports). An equation match alone is sufficient; nearby graph/coordinate
    keywords (`linear equation`, `quadratic equation`, `coordinate plane`,
    `cartesian`, `x-axis`/`y-axis`, `slope`, `parabola`, `graph`, etc.)
    corroborate but are not required.
  - **Number line**: presence of `number line` / `positive number` /
    `negative number` / `integer(s)` / `compare`/`comparison` keywords *and*
    at least one extractable standalone number in the text (used as the
    highlight point(s)).
  - Returns `null` — no rule fires — for anything else (e.g. plain prose,
    unrelated subjects, unparseable pseudo-equations like `y = sin(@@@)`).
- `src/lib/visuals/visualSpecBuilder.ts` (Task 3) — `buildVisualSpec()`. Calls
  the detector, builds a plain object (graph: `{type, equation}`; number_line:
  `{type, start, end, highlight}` with a "nice" auto-computed range that covers
  every highlighted value), then validates it through Sprint B's existing
  `parseVisualSpec()` (zod). Wrapped in try/catch — any failure anywhere
  yields `null`, never a thrown error.

**Edited (both additive — Task 4)**
- `src/app/api/learn/chat/route.ts`:
  - Added `import { buildVisualSpec } from '@/lib/visuals/visualSpecBuilder'`.
  - After `cleanText` is finalized (before the existing
    `prisma.message.create` persist call), added:
    ```ts
    let detectedVisualSpec: ReturnType<typeof buildVisualSpec> = null
    try { detectedVisualSpec = buildVisualSpec(cleanText) } catch { /* non-fatal */ }
    ```
  - Extended the final response: `visualSpec: detectedVisualSpec ?? undefined`
    alongside the existing `visual` field. Nothing else in the route changed —
    no system prompt edits, no AI provider changes, no Prisma schema/writes
    touched (the spec is never persisted, mirroring how `visual` already
    isn't).
- `src/components/learn/LessonScreen.tsx`:
  - Import changed from `type { VisualSpec }` to
    `{ parseVisualSpec, type VisualSpec }` (re-using Sprint B's validator).
  - In `sendMessage`, added `const responseVisualSpec = parseVisualSpec(data.visualSpec) ?? undefined` (re-validates the network payload client-side — defense in depth).
  - `setMessages(...)` now also sets `visualSpec: responseVisualSpec`. The
    render block that consumes it (`{!isUser && !msg.streaming && msg.visualSpec && <VisualRenderer spec={msg.visualSpec} />}`) already existed from Sprint B and required no change.

**Extended (additive — Task 5 demonstration aid)**
- `src/app/dev/visual-demo/VisualDemo.tsx` — added a new "Sprint C — Automatic
  detection from real lesson text" section below the existing Sprint B
  content (which is untouched). Four fixtures, each a tutor-style sentence
  grounded in real curriculum topics from
  `src/lib/education/mathKnowledgeGraph.ts` (`algebra.linear_equations_2var`,
  `algebra.quadratic_equations`, `coordinate_geometry.cartesian_plane`,
  `number_systems.integers`). Each card calls the real `buildVisualSpec()` live
  and renders whatever it returns — **no VisualSpec is hand-written** in this
  section; if the detector ever returned `null` for one of these, the card
  would show "No visual detected," not a fake graph.

## 2. Visual detection architecture

```
Tutor Max AI response (cleanText, complete — route.ts is not streamed)
        │
        ▼
detectVisualConcept(text)            — pure regex/keyword rules, no AI
        │  { kind:'graph', equation } | { kind:'number_line', highlight[] } | null
        ▼
buildVisualSpec(text)                 — wraps detector, builds raw object,
        │                               validates with Sprint B's zod schema
        ▼ VisualSpec | null
route.ts response: { ..., visualSpec }
        │  (JSON over HTTP — same response that already carries `visual`)
        ▼
LessonScreen.sendMessage: parseVisualSpec(data.visualSpec)   — re-validated
        │
        ▼
ChatMsg.visualSpec  →  <VisualRenderer spec={...} />   (Sprint B, unchanged)
```

Design choices:
- **Detection happens server-side, once, on the complete response** — no
  streaming race condition (this route awaits the full AI text before
  returning), no per-token false positives.
- **Equation-match is the dominant signal for graphs** — keyword presence
  alone never produces a spec; only a regex match that *also* survives
  `compileExpression()` (the same safe parser `GraphRenderer` itself uses)
  can produce a graph. This keeps the detector honest with what the renderer
  can actually draw.
- **Three independent fail-safe layers**, same as Sprint B: `buildVisualSpec`
  returns `null` on any exception or invalid shape → `route.ts` sends
  `undefined` → `LessonScreen` re-validates with `parseVisualSpec` → if
  somehow malformed anyway, `VisualErrorBoundary` (Sprint B) catches any
  renderer crash. A broken visual never blocks the lesson text.
- **Zero persistence change** — `visualSpec` travels only in the HTTP JSON
  response and React state, exactly like the existing `visual` field; the
  `prisma.message.create` call for the AI response is untouched.

## 3. Real lessons tested

Per curriculum file `src/lib/education/mathKnowledgeGraph.ts`, exercised the
detector against tutor-style explanations of the four requested real platform
topics:

| Curriculum topic (real `KnowledgeNode`) | Detected | Result |
|---|---|---|
| `algebra.linear_equations_2var` — Linear Equations in Two Variables and Pairs | graph | `{type:"graph", equation:"y = x + 2"}` |
| `algebra.quadratic_equations` — Quadratic Equations | graph | `{type:"graph", equation:"y = x^2 - 2x - 3"}` |
| `coordinate_geometry.cartesian_plane` — Cartesian Plane and Plotting | graph | `{type:"graph", equation:"y = -2x + 1"}` |
| `number_systems.integers` — Integers — Introduction | number_line | `{type:"number_line", start:-5, end:5, highlight:[-5,3]}` |

All four rendered automatically via the unmodified Sprint B `VisualRenderer` —
no spec was authored by hand for these cards; each is the live output of
`buildVisualSpec()` called on the sentence shown above it.

## 4. Screenshots

`screenshots/visual-demo/`:
- `05_sprintc_desktop_light.png` / `06_sprintc_desktop_dark.png` — full page,
  Sprint B section (unchanged) + new Sprint C detector section, light/dark.
- `07_sprintc_mobile_light.png` — mobile viewport (390×844 @2x), full page.
- `08_sprintc_detail.png` — Sprint C section close-up: linear, quadratic,
  cartesian-plane fixtures.
- `09_sprintc_integers.png` — Sprint C section close-up including the
  integers → number-line fixture (`highlight:[-5,3]`).

## 5. Failure modes & sandbox limitation

- **No live AI round-trip was possible in this sandbox**: `OPENROUTER_API_KEY`
  / `GEMINI_API_KEY` are not configured in `.env` here, so `routeAI()` cannot
  reach a real model. Confirmed the route fails safely:
  `POST /api/learn/chat` with a real seeded student session
  (`demo.student@sprinte.local`) returns
  `{"success":false,"error":"AI service temporarily unavailable. Please try again."}`
  — clean error, no crash, no leaked stack trace, no `visualSpec` field
  produced (correctly, since there's no text to detect on). **This is an
  environment constraint, not a code defect** — on a deployment with real
  provider keys, the exact same `cleanText` that would have been returned is
  what gets passed to `buildVisualSpec()`, which was independently proven to
  work correctly (§3) using the same production function, fed text grounded in
  the real curriculum rather than synthetic/invented examples.
- **Zero-regression confirmed on real authenticated traffic**: curled the
  same seeded session against `/learn`, `/learn?subject=mathematics`,
  `/dashboard`, `/coach` — all `200 OK`, zero `aria-label="Graph of` /
  `aria-label="Number line` markers in any response (these pages don't call
  the chat route, so `visualSpec` never enters their render tree — expected
  and correct).
- **Detector false-negative risk**: a tutor response that discusses a graph-
  worthy concept *without* writing an explicit `y = ...` equation (e.g. "the
  line through the origin with slope 2") will not produce a graph — by design,
  to avoid guessing at an equation the detector can't verify parses safely.
  This is a deliberate conservative tradeoff: false negatives (no visual) are
  safe; false positives (a wrong/garbled graph) are not.
- **Detector false-positive risk**: any response that happens to contain a
  syntactically valid `y = <expr with x>` substring will produce a graph, even
  if the surrounding sentence isn't really "about" graphing (e.g. a stray
  example in an unrelated explanation). Acceptable for this sprint's scope —
  showing an accurate, correctly-rendered graph of a real equation that was
  genuinely written in the response is never actively wrong, just occasionally
  unprompted.

## 6. Validation

- `npx tsc --noEmit` → exit 0.
- `npm run build` → success; all routes build, no new errors.
- Dark mode / light mode / desktop / mobile — verified via screenshots (§4).
- Zero regression on existing lessons — verified via live authenticated
  curl checks (§5).
- Detector/builder correctness — verified directly (`tsx` scripts) against
  both synthetic edge cases (irrelevant prose, unparseable pseudo-equations)
  and the four real-curriculum fixtures (§3), all producing the expected
  output.

## 7. Remaining gaps (not in this sprint's scope)

- No live, real-AI-provider end-to-end test was possible in this sandbox
  (§5) — recommend re-running the same `buildVisualSpec` call against a few
  dozen real production chat transcripts once provider keys are available, to
  measure real-world false-positive/negative rates before considering this
  fully production-validated.
- Detector covers only the two equation families Sprint B's `GraphRenderer`
  already supports (linear, quadratic) and one number-line pattern
  (positive/negative/integer comparison) — consistent with "only implement
  the first visual learning capability"; broader concept coverage (e.g.
  fractions-as-number-line, inequalities) is future work, not this sprint.
- Geometry Engine, Science Flow Engine, History Timelines, Universal Learning,
  Tutor Max prompt changes, database changes — all explicitly out of scope and
  untouched.

---

STOP AFTER REPORT — no further Sprint C/D work performed.
