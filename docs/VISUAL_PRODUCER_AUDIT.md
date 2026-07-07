# Visual Producer Audit — Sprint C, Task 1

Trace of Tutor Max → AI response → lesson rendering → LessonScreen, and the
recommended injection point for automatic `VisualSpec` production.

## 1. Pipeline, file by file

| Step | File | What happens |
|---|---|---|
| Page load | `src/app/learn/page.tsx` | Server component. Resolves subject, fetches user profile/curriculum/progress/session-summary from Prisma, passes props (no streaming) into `LessonScreen`. |
| Lesson UI + state | `src/components/learn/LessonScreen.tsx` | Client component. Owns `messages: ChatMsg[]` state. On mount, creates a session (`POST /api/sessions`) then sends an opening prompt. |
| User → AI request | `LessonScreen.tsx:550-553` (`sendMessage`) | `POST /api/learn/chat` with `{ sessionId, message, userId }`. |
| AI generation | `src/app/api/learn/chat/route.ts` | Authenticates, rate-limits, saves the user message to Prisma (`prisma.message.create`, ~line 52-54), builds a large system prompt, calls `routeAI()` (OpenRouter/Gemini) at line 958. **Not streamed** — `routeAI` is awaited and returns the complete text. |
| Tag extraction (existing) | `route.ts:971-994` | Strips `VISUAL:<type>` (school mode only, via `parseVisualTag` in `src/lib/school/visuals/detectVisual.ts`), `[WE:...]` worked-example tags. Produces `cleanText`. |
| Persist | `route.ts:997-999` | `prisma.message.create({ role: ASSISTANT, content: cleanText })` — **only `content` is ever persisted**, never `visual`/`visualSpec`. |
| Response to client | `route.ts:1074` | `return NextResponse.json({ success: true, text: cleanText, provider, visual: responseVisual ?? undefined })`. No `visualSpec` field exists today. |
| Client receives | `LessonScreen.tsx:554-559` | Parses JSON, pulls `data.text`, `data.provider`, `data.visual` into locals. Further client-side tag stripping for `[LESSON_COMPLETE]`, `[MATH_ANSWER]`, `[CODE_ANSWER]`, `[ASSESSMENT_RESULT]` (lines 560-657) — all **client-side, post-hoc, on the already-complete text**. |
| State update | `LessonScreen.tsx:659` | `setMessages(... { ...m, content: full, streaming: false, provider, visual: responseVisual })` — single update once the full response has arrived. |
| Render | `LessonScreen.tsx:2097-2100` | `{!isUser && !msg.streaming && msg.visualSpec && <VisualRenderer spec={msg.visualSpec} />}` — already wired (Sprint B), currently dead code since nothing sets `visualSpec`. |

`ChatMsg` (line 167):
```ts
type ChatMsg = { id: string; role: 'user'|'assistant'; content: string; ts: number; streaming?: boolean; provider?: 'YANDEX'|'GROQ'|'FALLBACK'; visual?: string; visualSpec?: VisualSpec }
```

## 2. Existing precedent: the `visual` string field

`src/lib/school/visuals/detectVisual.ts` already does deterministic, rule-based
detection for school-mode chapters (`detectVisual()` — keyword match against
chapter/lesson title) and tag parsing (`parseVisualTag()` — extracts a
`VISUAL:<type>` tag the AI was prompted to emit, school-mode only, gated on
`schoolCtx`). This is the precedent pattern for wiring a *new* signal into the
chat route's response: compute it server-side after `cleanText` is final, attach
it as a new field in the JSON response, consume it client-side into `ChatMsg`.

The new `VisualConceptDetector`/`VisualSpecBuilder` (Task 2/3) differs in one
important way: it must run for **all** lessons (not just school mode) and must
analyze the actual tutor response text directly (not the AI-chosen tag, not
chapter titles) — fully deterministic, no reliance on the model choosing to
emit anything.

## 3. Recommended injection point

**Server-side, in `src/app/api/learn/chat/route.ts`, immediately after
`cleanText` is finalized (after line 994, before the `prisma.message.create`
persist at line 997).**

Rationale:
- `cleanText` is the complete, tag-stripped text — exactly what the student
  will read. Running detection here means detection sees final content, not an
  in-progress stream.
- The AI call is **not streamed** in this route, so there is no
  partial/incomplete-text race condition to guard against.
- Detection runs once per response (1:1 user message → AI response in this
  route), so no batching/dedup concerns.
- The result is attached to the **JSON response only** (`visualSpec` field
  alongside the existing `visual` field) — never written to Prisma. The
  `prisma.message.create` call is untouched; only `content` (text) is ever
  persisted, exactly as today.
- Client-side (`LessonScreen.tsx`), the new field is read at the same point
  `data.visual` already is (line 559), validated again with the existing
  `parseVisualSpec()` (defense in depth — never trust a network payload even
  though it originated from validated server code), and passed into the
  `setMessages` call at line 659 alongside `visual`. The render block at line
  2097 already exists and needs no change.

## 4. Risks

| Risk | Mitigation |
|---|---|
| Detector runs on streaming/partial text and false-positives on incomplete equations | Not applicable here — `routeAI()` is awaited; `cleanText` is always complete before detection runs. |
| Detector throws on malformed input | Wrap the whole detect+build call in `try { } catch { /* non-fatal */ }`, identical to the existing `parseVisualTag` pattern at `route.ts:978-983` — falls back to `visualSpec: undefined`. |
| Invalid/partial `VisualSpec` shape leaks to the client and crashes `VisualRenderer` | Builder validates with `parseVisualSpec()` (zod) before returning; `VisualRenderer` also re-validates via `parseVisualSpec` when given `raw`, and is wrapped in `VisualErrorBoundary` regardless — three independent layers of fail-safety already exist. |
| Detector accidentally fires on every response (over-eager keyword match) | Rules are conjunctive and narrow (e.g. graph requires an actual extractable, parseable `y = ...` equation, not just the word "graph"); see Task 2 design. |
| Performance cost on every chat response | Detection is pure string regex + the existing `compileExpression` parser (already proven cheap, no network/DB calls) — negligible compared to the AI call it follows. |
| Scope creep into persistence/curriculum/AI prompts | None of the above touches Prisma schema, system prompt content, or AI provider routing — the system prompt is unchanged; detection is purely a post-processing step on the model's already-generated output. |

## 5. Conclusion

Build `VisualConceptDetector` + `VisualSpecBuilder` as pure functions in
`src/lib/visuals/`, call them once in `route.ts` right after `cleanText` is
computed, return the result as an optional `visualSpec` field in the existing
JSON response, and consume it in `LessonScreen.tsx` at the same point as the
existing `visual` field. Zero new files needed outside `src/lib/visuals/`; one
new field threaded through one route and one component, mirroring an existing,
proven pattern.
