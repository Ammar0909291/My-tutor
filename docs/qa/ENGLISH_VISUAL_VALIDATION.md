# English visual validation (2026-10-14)

**Result: 222 / 222 PASS (0 REVIEW, 0 FAIL), 888 Chromium renders, 0 missing.** This is an ENVELOPE audit, not an audit of what learners were served — read "What this does and does not prove".

## Why an envelope audit
English serves almost no static figure: `resolveVisual` returns "no figure" for 215 of the 216 English concepts (pinned by `src/tests/englishVisualAudit.test.ts`, which fails if a concept serves a static figure the static-figure audit below does not cover). The one exception, `eng.grammar.nouns` (2026-10-18), has its own audit. Every English figure a learner sees is generated at runtime (Tier 2/3), admitted by `parseVisualSpec` / `payloadBlockers`, and cached in production. There is no committed corpus of what was served and this environment has no production-data access, so the served set cannot be enumerated here.

## What was rendered
- 216 `process_flow` fixtures, one per English concept, built deterministically from that concept's own authored wording (`key_ideas` in `docs/english/teaching-assets/assets.json`: long sentences with quotes, parentheses, dashes, slashes, phonics notation), cut to the schema limits (title ≤ 60, note ≤ 140, 2–12 steps). 55 key ideas cross-reference other concepts by internal id; the fixture shows the concept NAME instead (a figure must never show an id, audit rule ST-04).
- 6 worst-case envelope fixtures: 12 steps × max text, 2 steps × max text, an unbroken 60-character word, IPA / phonics glyphs, no notes, the minimum figure.
- Real renderer (`ProcessFlowRenderer`) on the dev page `/dev/physics-audit?fixture=<id>&scope=lesson`, under the real lesson page's token scope (`.learnCandy`), at 390 px (dark + light), 1280 px and the 50/50 column (dark). Rules: the shared `figureAudit.ts` structure / readability / contrast / layout rules. There is deliberately no semantic dimension (the fixtures are synthetic wording).

## What this does and does not prove
- PROVES: English-shaped text that the schema allows renders legibly (contrast ≥ 4.5:1, no clipping, no overflow, no raw ids) at every viewport and theme, in the real renderer, and that the committed record still describes the fixtures (per-fixture fingerprint gate).
- DOES NOT PROVE: that any model-generated figure in production is correct, relevant or well-formed. A production sample check needs a logged-in disposable account (see the Mathematics report's blocker) and has NOT been done.

## Defects found and repairs (no threshold loosened)
| Finding | Cause | Fix |
|---|---|---|
| Process-flow badge numerals read 1.7:1 | audit page used global tokens; the real page uses `.learnCandy` | `?scope=lesson` on the dev page (default off) |
| Note text 9.5 px | below the 10 px floor | `NOTE_FONT_PX = 10`, `NOTE_CHAR_W = 5.7` (`processFlowLayout.ts`, renderer) |
| Origin / tick numerals lost on the grid | no halo | `CoordinatePlane` tick halo (shared card, re-audited via Mathematics) |
| One-off contrast FAILs in single states (different fixtures each run) | harness measurement races under 4-worker load: text-hide repaint, first screenshot raster, layout moving between DOM measure and pixel capture, and a restarted entrance fade measured mid-way | `render.ts`: two rAF frames after hide, a throwaway screenshot, a layout re-measure with retake (`layoutMoved`), and an animation settle before EVERY capture incl. retakes (`settleAnimations`) |
The last two single-state FAILs (`eng.phonics.alphabet-recognition` mobile/dark 3.38:1, `eng.vocab.phrasal-verbs` mobile/light 3.95:1) were retaken states; the screenshot shows dimmed step titles (a fade caught half way). On a quiet machine the same states measured ≥ 5.02:1 in 3/3 re-renders; after the settle fix the full 888-render run is 222/222 PASS. The root cause of the restart is inferred from the screenshot, not traced in the renderer.

## Observation (not changed)
English teaching assets contain 55 internal concept ids inside `key_ideas`. If a model copies one into a figure the ST-04 rule would flag it; the content was not rewritten (out of visual scope).

## Reproduce
```
npx next dev -p 3000                      # load one page first (a cold server renders unstyled)
npx tsx scripts/qa/englishVisual/buildFixtures.ts                      # only if the key ideas changed
npx tsx scripts/qa/englishVisual/renderAudit.ts --out tmp/english --workers 4     # ~32 min; run nothing else
npx tsx scripts/qa/englishVisual/validate.ts --in tmp/english --out tmp/english-v
cp tmp/english-v/audit-summary.json docs/qa/english-visual-audit/
npx vitest run src/tests/englishVisualAudit.test.ts
```
Partial re-render of named fixtures: `renderAudit.ts --redo --concepts <ids>` then `validate.ts` and merge with `scripts/qa/physicsVisual/merge-audit.ts`.


## Static figures — `eng.grammar.nouns` (2026-10-18)
`eng.grammar.nouns` is the first English concept served a figure of its own: a four-group classification scene (Person · Place · Thing · Idea,
two or three example nouns each), built with the shared comparison generator and registered in `conceptSceneParams.ts`. Backlog item B2
(`docs/history/learner-experience-backlog-plan-2026-10-16.md`): the learner who asked for a picture used to be told there was none.
- **Faithfulness.** Nothing is invented. The four kinds are the KG description's ("people, places, things, or ideas"); every example (teacher, Ms. Chen,
  city, Paris, dog, book — the teaching asset; happiness, freedom, honesty — the Educational Brain entry) is a word the concept's own sources use; the
  capital-letter remark is the asset's ("proper … capitalized"); the idea group carries the EB's central point (an abstract noun is still a noun although
  nothing can be touched). It states no number and no rule beyond these. `src/tests/englishStaticFigureContent.test.ts` re-derives all of this from the DRAWN
  groups and labels against those sources (mutation-checked: a word not in the sources, a dropped "can touch").
- **Render audit.** Real resolver (subject `english`) + real renderer under the lesson token scope, 390 px dark and light, 1280 px and the 50/50 column:
  PASS on every viewport (structure, readability, contrast, layout; semantic evidence = the content test). Tooling:
  `scripts/qa/englishVisual/staticFigures.ts` (the dev page `/dev/physics-audit` now accepts `subject=english`), record
  `docs/qa/english-visual-audit/static-figures.json`, fingerprints in `staticFingerprint.ts`.
- **Gate.** `src/tests/englishStaticFigureAudit.test.ts` fails, naming the concept, when the served figure differs from the audited one, when an English
  concept serves a static figure the audit does not cover, when a render is missing or a verdict is not PASS. Re-audit:
  `npx next dev -p 3000` (load one page first) → `npx tsx scripts/qa/englishVisual/staticFigures.ts --out tmp/english-static` → copy
  `tmp/english-static/audit-summary.json` to `docs/qa/english-visual-audit/static-figures.json`.
- **Not proved.** That the figure helps a learner (no production sample: it needs a disposable account), and the countable / uncountable and collective
  distinctions are not drawn (the figure is the four kinds only, by design — a second classification would be a second figure).
