# Production snapshot of the Chemistry Tier 2 / Tier 3 visual corpus

Taken **2026-10-09** from the production database (project `ywakxiqbevfuxsiwewnw`) with **read-only `SELECT`s**
(Supabase MCP `execute_sql`). Nothing was written. Chemistry concepts only (`chem.%`). No learner data: every row is a
figure generated from a concept title/description, a critic verdict about that figure, or a decline marker.

| file | source table / key | rows | what it is |
|---|---|---|---|
| `figures.json` | `visualization_cache` where `conceptKey like 'scene:v1:fig:chem.%'` (the **served** generated-figure cache) | 147 | `{conceptId, renderCount, cachedOn, figure}`; `figure` is the raw model JSON (a `SceneSpec` or a `VisualSpec`) exactly as `JSON.parse(code)` returns it |
| `verdicts.json` | `visualization_cache` where `conceptKey like 'scene:v1:verdict:chem.%'` | 145 (74 promote / 71 reject) | the critic's cached decision per concept. A `reject` is **not served** on an ordinary turn (`no-figure:critic-reject-cached`) |
| `declines.json` | `visualization_cache` where `conceptKey like 'scene:v1:decline:chem.%'` | 26 | concepts the generator deliberately declined (`no-suitable-form`) |
| `tier2-active.json` | `asset_identity` ⋈ `visual_assets` where `family='VISUAL' and status='ACTIVE' and conceptId like 'chem.%'` | 2 | the **approved** (Tier 2) figures |

Integrity: every figure row was transcribed through the tool channel and verified against the server with
`md5(code::jsonb::text)` — 147/147 identical (three rows carry U+202F NARROW NO-BREAK SPACE that the model emitted; they are
preserved). The 145 verdicts were verified with an aggregate md5 (`7f3ea05a7e575a792ecb53230df7a04e`). The two figures without
a verdict are exactly the two Tier 2 concepts (approved figures are not judged).

Also read (counts only, not committed): 177 `DRAFT` + 2 `ACTIVE` chemistry `VISUAL` rows in `asset_identity` (the engine's audit
record of generations), and `visual_generation_outcome` (4,477 cached+served `spec` outcomes over 110 concepts and 1,338
cached+served `scene` outcomes over 36 concepts since 2026-08-11) — the evidence that these figures are shown to learners.

Replay it: `npx tsx scripts/chemistry/visual-audit/tier23-resolve.ts` runs the **real** `resolveVisualForTurn` over all 186
concepts with a cache client backed by these files, so what it reports is what the resolver would serve from this snapshot.
Refresh by re-running the same read-only queries; do not edit these files by hand.
