# Quantum Physics — Live Visual Injection Audit (Tasks 1–2)

**Status: audit only.** Traces the live Tutor Max visual-injection path end to end and pinpoints
the exact blocker that lets quantum visuals work in `/dev/visual-demo` but not in real lessons.

## Task 1 — Live injection path trace

```
Tutor Response generation (learn/chat/route.ts)
  1. System-prompt visual hint:  detectVisual() + buildVisualsSystemBlock()   [~line 684-695]
       → tells the model it MAY emit "VISUAL:<type>" at the end of its reply.
  2. Model replies (routeAI) → raw `text`.
  3. Tag extraction:           parseVisualTag(text) → { visual, cleanText }  [~line 1019-1025]
       → responseVisual set, VISUAL: tag stripped from the persisted/returned text.
  4. (Unrelated subsystem) planVisualTeaching(cleanText).spec → detectedVisualSpec
       → drives the OTHER visual system (VisualSpec/VisualRenderer: graph/number_line), not VisualCard.
  5. JSON response: { text: cleanText, visual: responseVisual, visualSpec: detectedVisualSpec }
  6. Client (LessonScreen.tsx:734-855): reads data.visual → stores msg.visual on the chat message.
  7. Render (LessonScreen.tsx:2305-2316):
       {!isUser && !msg.streaming && msg.visual && <VisualCard type={msg.visual} ... narrationTimeline={...} />}
  8. VisualCard (Sprint R.1/S/T/U): plays the step animation, narration-synced if a timeline was derived.
```

Steps 6–8 are **fully generic** — `LessonScreen` renders `VisualCard` for any `msg.visual` string,
regardless of subject. `extractNarrationSegments(msg.content, msg.visual)` is likewise subject-agnostic.

## Task 2 — Subject gating audit (the exact blocker)

Steps **1** and **3** — the only two places a `VisualType` can ever be produced for a live message —
are both wrapped in `if (schoolCtx) { ... }` in `learn/chat/route.ts`:

- Line ~684-695 (system-prompt hint): inside the `if (schoolCtx) { ... }` block that also adds
  revision-notes hints; references `schoolCtx.chapter.title` directly, so it cannot run when
  `schoolCtx` is null (i.e. for any `SUBJECT_LIBRARY` subject, including `quantum_physics`).
- Line ~1019-1025 (tag extraction): `if (schoolCtx) { const parsed = parseVisualTag(text); ... }`
  — `responseVisual` is **only ever assigned inside this block**. For Library subjects it stays
  `null` for the entire request, so `visual` is `undefined` in the JSON response, and step 6/7 never
  fire — even if the model happened to emit a `VISUAL:<type>` tag, it would never be parsed or stripped.

`VISUAL_SUBJECTS` (`visualTypes.ts`) already includes `'quantum_physics'`, and `detectVisual()` already
has a working `quantum_physics` branch (`QUANTUM_RULES`) — confirmed in the prior Visual Expansion
Sprint and exercised successfully in the dev demo, which calls `VisualCard` directly and bypasses
`learn/chat` entirely. **The blocker is purely the two `if (schoolCtx)` wrappers in `learn/chat/route.ts`
— nothing in the detection/registry/rendering layers needs to change.**

## Safest additive integration point

Both blocks need a Library-subject sibling, following the exact precedent already established in this
file for the misconception block (`if (!schoolCtx) { ... }` at line ~775, added in the Misconception
Integration Sprint):

1. **Injection**: add a `!schoolCtx` branch next to the existing school-only visual-hint block, using
   `findLibrarySubject(subjectCode)` + the Library lesson's title (already resolved into `lessonCtx`)
   in place of `schoolCtx.chapter.title`.
2. **Extraction**: extend the tag-parsing condition from `if (schoolCtx)` to also parse for Library
   subjects (`if (schoolCtx || findLibrarySubject(subjectCode))`, or a parallel `else if` branch),
   so `responseVisual` gets populated for quantum_physics (and other VISUAL_SUBJECTS-eligible Library
   subjects) too.

No change to `detectVisual.ts`, `visualTypes.ts`, `VisualCard.tsx`, or any renderer — purely two
additive branches in `learn/chat/route.ts`, mirroring the existing misconception-injection pattern.
