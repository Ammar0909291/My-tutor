# Mathematics visual render audit + freshness gate (2026-10-13)

Queue item 1 of the Mathematics figure campaign's deferred follow-ups (owner chose it on 2026-10-13). Result and findings: `docs/qa/MATHEMATICS_VISUAL_QUALITY_REPORT.md`.
Mathematics-only: the Physics, Chemistry and Biology audits, gates and rules are untouched; the shared browser machinery and the audit RULES (`figureAudit.ts`, `figureSemantics.ts`) are reused as they are.

## What exists
| Piece | Where |
|---|---|
| Inventory (what each concept serves) | `scripts/qa/mathVisual/inventory.ts` |
| Render runner (Chromium; mobile 390 dark+light, desktop 1280 dark, desktop-column dark; **lesson token scope**) | `scripts/qa/mathVisual/renderAudit.ts` (NOT named render.ts: the Physics runner it imports starts itself when the entry file is called render.ts) |
| Verdicts | `scripts/qa/mathVisual/validate.ts` |
| Per-concept fingerprint (served payload + provenance + scope) | `scripts/qa/mathVisual/fingerprint.ts` |
| Merge a partial re-audit | `scripts/qa/physicsVisual/merge-audit.ts` (generic; shared) |
| Render surface | `/dev/physics-audit?concept=…&fw=…&subject=mathematics` (dev only; `subject` defaults to physics) |
| Committed record | `docs/qa/mathematics-visual-audit/audit-summary.json`, `verdict-summary.json` |
| Dispositions of the 61 first-pass REVIEW items | `docs/qa/mathematics-visual-audit/review-dispositions.json`, gate `src/tests/mathReviewDispositions.test.ts` (each bound to the figure's fingerprint) |
| Deterministic semantic evidence (cards, shared-generator scenes) | `src/tests/mathVisualSemanticEvidence.test.ts` (`validate.ts` counts it as evidence) |
| Label-displacement backlog (batches 1-29) | `scripts/math/labelAssociation.ts`, gate `src/tests/mathLabelAssociation.test.ts` |
| Gate | `src/tests/mathVisualAudit.test.ts` — fails, naming the concepts, when a served figure differs from the one the audit rendered; also when a concept is unaudited, a render is missing, or any verdict is FAIL |

## Re-audit after a figure change (a partial re-render, minutes not hours)
1. `npx vitest run src/tests/mathVisualAudit.test.ts` names the stale concepts.
2. `npx next dev -p 3000` (a COLD dev server renders an unstyled page and is not evidence: load one page first), then
   `npx tsx scripts/qa/mathVisual/renderAudit.ts --out tmp/math-audit --concepts a,b,c --redo --workers 3` (`tmp/` is not committed).
3. `npx tsx scripts/qa/mathVisual/validate.ts --in tmp/math-audit --out tmp/math-audit-v` (the other concepts show as "missing renders" there; the merge ignores them).
4. `npx tsx scripts/qa/physicsVisual/merge-audit.ts --base docs/qa/mathematics-visual-audit/audit-summary.json --update tmp/math-audit-v/audit-summary.json --out docs/qa/mathematics-visual-audit/audit-summary.json`; commit.
A change to the shared renderers or to a card component (`GeometryShapes`, `FractionBar`, …) is NOT in the fingerprint: re-render the concepts that card serves (`inventory.json` lists `cardType`) by hand with `--redo --concepts`.

## Procedure that worked (and the traps)
- Full run: 556 concepts × (3 dark viewports + mobile light) = 2,224 renders, ~3.4 s each with 4 workers on 4 cores (≈ 2 h). Sorted so the phone/dark pass of every concept finishes first (≈ 35 min): read its verdicts, repair, and only then render the rest with the final code.
- Do NOT edit `src` while a render run is in flight: the dev server recompiles under it, and a concept rendered half before / half after an edit is stale while its fingerprint (computed at validate time) says current. Kill the run (`pkill -f` kills your own shell if its command line contains the pattern: use `for p in $(pgrep -f "[r]enderAudit"); do kill $p; done` as the ONLY content of that command), edit, delete the changed concepts' `results/<id>__*.json`, restart (finished results are skipped).
- A card concept's fingerprint does not change when its component changes, so deleting its results by hand is how a card fix gets re-rendered.
- A second pass at the end re-renders any concept whose render died ("Target page, context or browser has been closed" — an interrupted browser, not a figure defect).

## Scope notes
- 556 concepts serve a figure: 513 scenes, 43 cards (27 domain-fallback cards, 16 curated). 352 serve none. The audit judges READABILITY and STRUCTURE; whether a card is a figure OF its concept is the visual-scope audit's question (`mathematicsVisualScopeAudit.test.ts`).
- Semantic PASS needs a deterministic assertion (a `mathCoreScenesBatch<N>.test.ts` naming the concept/scene id, or an evaluated arithmetic chain). 61 figures have none or carry a REVIEW finding; they await the semantic review (queue item 2).

## Update 2026-10-14 — lesson token scope, dispositions, evidence
- **The audit page renders under the real lesson page's token scope** (`?scope=lesson` → `.learnCandy`, `data-audit-scope="lesson"`). Default off, so the Physics / Chemistry / Biology audits are measured as before. Without it a shared figure's numerals fell back to white-on-amber (a false 1.8:1 FAIL). `renderAudit.ts` of both Mathematics and English passes it; the committed Mathematics record was re-rendered under it (2,224 renders).
- **Shared harness fix** (`scripts/qa/physicsVisual/render.ts`, `capture`): two real animation frames are awaited after the text is hidden. Under CPU load 120 ms was not always enough for the repaint, so the "background-only" screenshot still held the glyphs and a numeral read ~1.7:1 against itself — one-off contrast FAILs that disappeared on a quiet re-render. Do not run other heavy work (vitest, tsc) while an audit renders.
- **Do not edit `src` while a run is in flight**, and delete the results of any concept (or of every concept a shared card serves) you changed before restarting: finished results are skipped.
- A card component's change is NOT in a concept's fingerprint: re-render its concepts by hand.
- The 12 figures that stay REVIEW_REQUIRED (text-laid-out tables / worked layouts) are not defects: their dispositions are in the ledger. Q1 (31 concepts that show their domain's shared overview card) is a product decision for the owner.

