# Teaching Corpus Audit — persistent ledger

Durable state for the continuous learner -> professor -> engineer -> moat loop.
This file is the source of truth across sessions and context resets. Update it
in the same turn as any topic or fix, never from memory.

## Corpus

| subject   | eligible topics | source |
|-----------|-----------------|--------|
| physics   | 238 | `docs/physics/kg/graph.json` v1.0.0 production |
| chemistry | 186 | `docs/chemistry/kg/graph.json` v1.0.0 production |
| **total** | **424** | |

## Status

| state | count |
|-------|-------|
| VERIFIED | 0 |
| REPLAYED + VERIFIED | 0 |
| HELD | 0 |
| BLOCKED | 0 |
| SKIPPED | 0 |
| REMAINING | 424 |

Topic-by-topic auditing has NOT started. It is deliberately gated behind the
global persistence fix below: a defect that changes learner-visible behaviour
for every topic must be fixed before topics are audited, or every topic
audited first would have to be replayed.

## Phase 0 — pre-flight (2026-08-11, complete)

- branch `main`, synced to origin (`f4f7ab65`).
- production: commit `317e8721` serving, alias my-tutor-flame.vercel.app.
- baseline: 292 test files / 6,322 passed / 9 skipped; `tsc --noEmit` clean;
  `npm run build` clean.
- production learner verification of the unresolved-topic excursion: PASSED
  on the real account (see CLAUDE.md "Unresolved-topic excursion").

## D8/D10/D11/D12 — VISUAL PERSISTENCE. Root cause MEASURED

**The visual is persisted at SESSION level only. It is never persisted at
MESSAGE level.** Read from the repository, not inferred:

1. `prisma.Message` has NO visual column of any kind. Its full field list is
   `id, sessionId, role, content, audioUrl, codeSnippet, codeLanguage,
   inputTokens, outputTokens, provider, createdAt`. There is no
   `displayedVisualAssetId`, no payload, no relation to AssetIdentity or
   VisualAsset.
2. The chat route writes the figure's identity to
   `contextSnapshot.visualSession` — ONE slot, overwritten every turn
   (`route.ts` ~4888).
3. `/api/sessions/history` selects only
   `{ id, role, content, createdAt, sessionId, provider }` — history carries
   no visual at all.
4. `/api/sessions` (resume) re-derives exactly ONE figure via
   `restoreVisualSession(snapshot.visualSession)` and returns it as
   `restoredVisual`.
5. `LessonScreen.tsx` (~2485) attaches that single figure to **the last
   ASSISTANT message**, in code:
   `[...prev].reverse().find((m) => m.role === 'assistant')`.

### Consequences, stated precisely

- **D8 CONFIRMED** — every historical message that displayed a figure loses it
  on refresh. At most one figure survives a reload, no matter how many the
  conversation showed.
- **D10 CONFIRMED** — the one surviving figure is re-attached to the LAST
  assistant message, which is not necessarily the message that displayed it.
  This is reachable today: during an unresolved-topic excursion the route
  passes the visual resolver `lessonConceptId: null`, so recent turns
  legitimately have no figure, while `contextSnapshot.visualSession` still
  holds the lesson's. On reload that figure lands on a message that never had
  one.
- **D12 CONFIRMED** — a diagram shown while teaching is disposable client
  state by construction (`ChatMsg` in `LessonScreen.tsx` ~732 holds
  `visual/visualSpec/sceneSpec` in React state only). It is not part of the
  learner's historical learning record.
- **D11 does NOT apply as written** — this is not "persisted but not
  reconstructed". The per-message data was never written.
- **D9 already satisfied for the one restored figure** — `restoreVisualSession`
  is a deterministic resolver + admission-gate call. Reload costs 0 LLM calls
  and 0 generation calls today, and the fix must preserve that.

### Selected fix (architecture-consistent, no parallel system)

Persist per message the SAME identity object the session slot already stores,
and restore it through the SAME deterministic authority:

    Message.visualSession (Json?, nullable, additive)
        -> parseVisualSession()      (existing)
        -> restoreVisualSession()    (existing: resolver + admission gate)
        -> render

No visual payload is copied, no asset is duplicated, no second visualization
system is created, and reload still costs 0 LLM and 0 generation calls. The
frontend's "attach to the last assistant message" heuristic is removed: each
restored figure attaches to its own message id, which is what closes D10.

## Change log

| date | commit | what |
|------|--------|------|
| 2026-08-11 | (pending) | ledger created; Phase 0 complete; D8/D10/D12 root cause measured |
