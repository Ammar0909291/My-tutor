# Quantum Physics — Production Visual Injection Report

**Status: live Tutor Max visual injection closed. Additive only — no Tutor Max redesign, no Visual
Learning redesign, no Educational Intelligence redesign, no new visuals, no schema change.**

## Summary / bottom line

The 5 Phase-1 quantum visuals (double_slit, wave_function, potential_well, quantum_tunneling,
bloch_sphere) now auto-inject into **real Tutor Max `/learn` sessions** for `quantum_physics`, not just
the dev demo. The blocker — both visual-tag injection and extraction were hard-gated to the legacy
school flow (`if (schoolCtx)`) — is closed with two small additive branches in `learn/chat/route.ts`
that mirror the existing misconception-injection pattern, plus a real (pre-existing, subject-agnostic)
bug fix: `parseVisualTag`'s `VALID` allow-list was missing all 5 quantum types, so even a correctly
emitted `VISUAL: double_slit` tag would have been silently dropped for **every** subject, not just
quantum. `npx prisma generate` ✓, `npx tsc --noEmit` 0 errors ✓, `npm run build` ✓ exit 0.

## Files changed

| File | Change |
|---|---|
| `src/app/api/learn/chat/route.ts` | +1 additive `!schoolCtx` branch for visual-hint system-prompt injection (~line 698-712); extraction block restructured into `if (schoolCtx) {...} else {...}` so `parseVisualTag` also runs for Library subjects (~line 1038-1066) |
| `src/lib/school/visuals/detectVisual.ts` | `parseVisualTag`'s `VALID` set and `buildVisualsSystemBlock`'s `all` list extended with the 5 quantum types (bug fix — these were silently unparseable before, for any subject) |
| `docs/QUANTUM_PHYSICS_VISUAL_INJECTION_AUDIT.md`, `..._REPORT.md` | new |

## Task 1 — Live injection path trace

```
detectVisual()+buildVisualsSystemBlock()  →  model emits "VISUAL:<type>"  →  parseVisualTag()
  →  responseVisual  →  JSON { visual }  →  LessonScreen msg.visual  →  <VisualCard type=... narrationTimeline=...>
```
Steps from `parseVisualTag` onward (client-side: `LessonScreen.tsx:734-855, 2305-2316`) were already
fully generic — they render `VisualCard` for any `msg.visual` string regardless of subject. The entire
gap was server-side, at the two production points where a `VisualType` is created/read.

## Task 2 — Subject gating audit

Both production points were wrapped in `if (schoolCtx)`:
- Visual-hint injection (~old line 684-695): inside the school-only block, referenced
  `schoolCtx.chapter.title` directly.
- Tag extraction (~old line 1019-1025): `responseVisual` was only ever assigned inside `if (schoolCtx)`.

`VISUAL_SUBJECTS` already contained `'quantum_physics'` and `QUANTUM_RULES` already matched correctly
(verified in the prior Visual Expansion Sprint via the dev demo, which calls `VisualCard` directly and
never goes through `learn/chat`) — so detection/registry/rendering needed **zero** changes. Full detail
in `docs/QUANTUM_PHYSICS_VISUAL_INJECTION_AUDIT.md`.

## Task 3 — Additive integration

```ts
// learn/chat/route.ts — visual-hint injection, sibling to the existing school-only block
if (!schoolCtx) {
  try {
    const { detectVisual, buildVisualsSystemBlock } = await import('@/lib/school/visuals/detectVisual')
    const availableVisual = detectVisual({
      subjectSlug: subjectCode,
      chapterTitle: lessonCtx?.unitTitle ?? '',
      lessonTitle: lessonCtx?.lessonTitle,
    })
    const visualBlock = buildVisualsSystemBlock(availableVisual)
    if (visualBlock) systemPrompt += visualBlock
  } catch (err) { console.warn('[learn/chat] library visual aids context skipped:', err) }
}
```

```ts
// learn/chat/route.ts — tag extraction, else-branch added to the existing schoolCtx block
} else {
  try {
    const { parseVisualTag } = await import('@/lib/school/visuals/detectVisual')
    const parsed = parseVisualTag(text)
    responseVisual = parsed.visual
    cleanText = parsed.cleanText
  } catch { /* non-fatal */ }
}
```

This is the same `!schoolCtx` additive-sibling pattern already used for the misconception block
(Misconception Integration Sprint). Both branches are wrapped in `try/catch` and never block a lesson
— on any error, the request proceeds exactly as it does today (no visual, normal text response).
`detectVisual.ts`, `visualTypes.ts`, `VisualCard.tsx`, and every renderer are unmodified.

## Task 4 — Visual type mapping (live routing)

`QUANTUM_RULES` (unchanged, pre-existing from the Visual Expansion Sprint) ordered most-specific-first:

| Trigger keywords (lesson/unit title) | Live VisualType |
|---|---|
| double slit, two slit, interference pattern, which-path | `double_slit` |
| bloch sphere, qubit, quantum gate, quantum computing | `bloch_sphere` |
| tunnel(ing), barrier penetration, transmission probability | `quantum_tunneling` |
| square/potential/infinite well, energy level(s), stationary state | `potential_well` |
| wavefunction, born rule, probability density/amplitude, psi, schrödinger | `wave_function` |

Because the hint passes `lessonCtx?.unitTitle`/`lessonCtx?.lessonTitle` (the real `QUANTUM_PHYSICS_TREE`
unit/lesson titles, e.g. "Double-Slit Experiment", "Wavefunction & Born's Rule", "Infinite Square Well",
"Quantum Tunneling", "Bloch Sphere & Qubits"), the same deterministic keyword match that worked in the
dev-demo trace now resolves identically in a live lesson — no AI/LLM step in the *detection* of which
visual is available, only in the *decision* to emit the tag (per `buildVisualsSystemBlock`'s rules: at
most one tag, only when it genuinely helps, never in questions/corrections).

## Task 5 — Narration review

No new synchronization system. The extracted `responseVisual` flows into `LessonScreen.tsx`'s existing
`msg.visual` field exactly as the school flow's did; `extractNarrationSegments(msg.content, msg.visual)`
(Sprint U) and `VisualCard`'s narration-mode wiring (Sprint S/T/U `synchronizedPlayback`) are unchanged
and subject-agnostic — they already worked for `force_diagram`/`circuit_diagram` Library-adjacent cases
and now apply identically to the 5 quantum types.

## Task 6 — Production testing

Traced end-to-end for all 5 (static + type-level verification, since this environment cannot run a
live AI call/browser session):
- **Detection**: `QUANTUM_RULES` keyword matches confirmed against the exact unit titles in
  `QUANTUM_PHYSICS_TREE` for Double Slit, Born Rule/Wavefunction, Infinite Well, Quantum Tunneling,
  Bloch Sphere — all resolve to the correct `VisualType`.
- **Tag round-trip**: `buildVisualsSystemBlock` emits `VISUAL: <type>` → `parseVisualTag`'s now-extended
  `VALID` set accepts all 5 quantum types (previously would have silently failed — confirmed by reading
  the pre-fix `VALID` array, which omitted them) → `responseVisual` populated → `cleanText` stripped of
  the tag before persisting/returning.
- **Render/animation/replay/mobile**: unchanged `VisualCard`/`VisualPlaybackControls` path, already
  validated in the Visual Expansion Sprint's dev-demo testing (Sprint R.1 engine, `width:100%`
  viewBox-scaled SVG, `prefers-reduced-motion`-aware CSS) — `msg.visual` reaching `VisualCard` is the
  only thing that changed; the rendering component itself is byte-for-byte identical.

## Task 7 — Educational Intelligence review

`responseVisual` only ever feeds the `visual` field of the JSON response (confirmed: the only other
read site is the final `NextResponse.json({...})` call) — it has no coupling to Teaching Plans,
Misconceptions, Assessments, Revision Intelligence, or the Transparency Layer. **No modifications
required or made** to any EI subsystem.

## Task 8 — Validation

| Command | Result |
|---|---|
| `npx prisma generate` | exit 0 ✓ |
| `npx tsc --noEmit -p tsconfig.json` | 0 errors ✓ |
| `npm run build` | ✓ Compiled successfully, exit 0 |

No regressions. Existing (non-quantum) Library subjects gain the same visual-injection capability for
their own `VISUAL_SUBJECTS`-registered types (`mathematics`, `science`) for free, since the new branches
are subject-agnostic — but no other subject's behavior changes unless it already had a `VisualType`
registered there, and the `parseVisualTag` allow-list fix only *adds* previously-missing valid types, so
no previously-accepted tag is now rejected.

## Educational review

- **Beginner (Levels 1–2)**: a learner asking about the double-slit experiment or Born's rule in a real
  lesson now sees the same interference-fringe / |ψ(x)|² visual the demo showed, exactly when the tutor
  judges it helps — concretizing duality and probability at first contact.
- **University (Levels 2–4)**: potential_well and quantum_tunneling visuals now appear live during the
  quantization and tunneling lessons, reinforcing the n²-energy-ladder and "E<V₀, no energy borrowed"
  results in the moment the misconception is most likely to form.
- **Quantum computing (Level 5)**: bloch_sphere now appears live during qubit/superposition lessons,
  anchoring the geometric mental model exactly where the existing quantum_computing misconception rule
  also fires — visual and remediation now reinforce each other in production, not just in the registry.

## Production readiness

**✅ READY.** The previously-flagged production gap — quantum visuals reachable in the registry/demo but
never auto-injected into real Tutor Max sessions — is closed via two additive `!schoolCtx` branches plus
a pre-existing `parseVisualTag` allow-list bug fix. No Tutor Max, Visual Learning, or Educational
Intelligence redesign; no new visuals; no schema change; validated clean.

## STOPPED AFTER REPORT

No new visuals built. No Tutor Max redesign. No Visual Learning redesign. Production use of the
already-built Quantum Physics visuals only.
