# AssetIdentity Global Audit (2026-07-26)

Direct production evidence only — every number below is a literal query result against
Supabase project `ywakxiqbevfuxsiwewnw`, run via `mcp__Supabase__execute_sql`. Nothing estimated.

## Why this audit

Before continuing Chemistry AssetIdentity seeding (started in a prior session, 60/744 rows),
this audit checks whether Chemistry is genuinely the only subject with incomplete AssetIdentity
seeding, or whether the same gap exists elsewhere — so effort isn't spent finishing one subject
while others turn out equally incomplete.

## Two independent things are being measured

1. **Authored seed source availability** — how much curated, KG-validated content exists in
   `src/lib/teaching/assets/{brainSeedAssets,authoredSeedAssets,chemistrySeedAssets,
   biologySeedAssets,csSeedAssets}.ts`, ready to load via `scripts/brain/seed-knowledge-assets.ts`.
2. **What's actually in production `asset_identity`** — which, for mathematics/physics/english,
   turns out to be almost entirely a *different* thing: organic, unreviewed content captured live
   by `explanationMemory.ts`'s per-turn DRAFT-capture path (ADR 14 Phase 2/3), not the authored
   seed batch. These two are distinguishable by `canonicalSlug` shape and `authorKind`:

   | Origin | canonicalSlug shape | authorKind |
   |---|---|---|
   | Seed script (`seedCanonicalSlug()`) | `conceptId:familyKind:language:gradeband` (4 segments) | `HUMAN_CURATOR` |
   | Live capture (`explanationMemory.ts`) | `conceptId:familyKind:language` (3 segments) | `AI_AUTHORED` |

## Production state as of 2026-07-26 (after this session's Mathematics batch)

| Subject | KG concepts | Teaching Assets (pipeline) | Authored seed source (E+P) | HUMAN_CURATOR rows in DB | AI_AUTHORED rows in DB (live capture, distinct concepts) | Seed % (of authored source) | Status |
|---|---|---|---|---|---|---|---|
| Mathematics | 908 | 908 | 179 (96E+83P) | 20 (20E+0P) | 144 (7 distinct concepts, up to 21× duplicated) | 11.2% | PARTIALLY SEEDED |
| Physics | 238 | 238 | 1639 (495E+1144P) | 0 | 312 (13 distinct concepts, up to 73× duplicated) | 0% | NOT SEEDED (authored) |
| English | 216 | 216 | 1056 (626E+430P) | 0 | 240 (30 distinct concepts, up to 47× duplicated) | 0% | NOT SEEDED (authored) |
| Chemistry | 186 | 186 | 744 (372E+372P) | 60 (60E+0P) | 0 | 8.1% | PARTIALLY SEEDED |
| Biology | 108 | 89 | 432 (216E+216P) | 0 | 0 | 0% | NOT SEEDED |
| Computer Science | 119 | 119 | 476 (238E+238P) | 0 | 0 | 0% | NOT SEEDED |
| **Total** | **1775** | **1739** | **4526** | **80** | **696** | **1.8%** | — |

Notes on the table:
- "Teaching Assets" is the separate Curriculum Production Pipeline artifact
  (`docs/{subject}/teaching-assets/assets.json`), a different content layer, shown for context
  only — not part of this program's scope.
- "AI_AUTHORED rows" for math/physics/english are NOT part of the seeding program's denominator —
  they're organic live-capture output, unrelated to the authored seed files, and are NOT
  duplicated toward "seed %". They ARE flagged separately below as a real data-quality risk.
- Every row in the "HUMAN_CURATOR rows" column was verified: 0 duplicate canonicalSlugs, 0 orphan
  `explanation_assets`/`probe_assets` rows, 0 `lengthChars`≠`length(content)` mismatches, all
  `status=DRAFT`, all `gradeBand` values from the enum, all `version=1`.

## Finding 1 — the "694 DRAFT rows" were mischaracterized in prior sessions

A prior session's handover (`ENGINEERING_HANDOVER.md`) described "694 DRAFT explanation-asset
rows (eng/math/phys)... all quality-gate-passing... awaiting your manual review" as if they were
the curated authored batch. Direct inspection this session shows they are not: every one of them
has a 3-segment canonicalSlug and `authorKind=AI_AUTHORED` — the signature of
`explanationMemory.ts`'s live capture path, which writes a DRAFT row after every LLM-generated
explanation during real chat turns. They passed the code's automated quality gate (which checks
things like minimum length and placeholder detection, not human-authored-ness), but they are
organic, unreviewed model output, not a hand-authored batch. This doesn't change their promotion
mechanism (still `PATCH /api/admin/knowledge-assets`, still a human decision) but does change what
promoting them would actually mean: approving live-generated content, not curated content.

## Finding 2 — severe uncontrolled duplication in the live-capture rows

The live-capture path (`explanationMemory.ts`'s capture-after-generation call) has no
deduplication against existing DRAFT rows for the same canonicalSlug. Top duplicate counts found:

| canonicalSlug | duplicate count |
|---|---|
| `phys.mech.conservative-forces:core_explanation:en` | 73 |
| `phys.meas.vector-products:core_explanation:en` | 53 |
| `math.found.axiomatic-system:core_explanation:en` | 52 |
| `eng.phonics.letter-sound-correspondence:core_explanation:en` | 45 |
| `phys.meas.units:core_explanation:en` | 38 |

This means real per-concept coverage from live capture is much smaller than raw row counts imply
(math: 7 distinct concepts from 144 rows; physics: 13 from 312; english: 30 from 240). Flagged
only — not remediated this session (deleting ~600 rows is a scale of change that needs explicit
owner sign-off; it was also out of this program's stated scope, which is seeding, not cleanup).

## Finding 3 — this production database had zero authored-seed content before this program

Before the prior session's Chemistry batch, this specific Supabase project had 0
`HUMAN_CURATOR` AssetIdentity rows for any subject. The commonly-cited "Wave 0" seed (9
EXPLANATION + 5 PROBE from `brainSeedAssets.ts`, covering `math.arith.fractions`,
`phys.mech.newtons-first-law`, and the English phonics entries) does not exist in this database —
confirmed by direct lookup, zero rows returned for those conceptIds with `authorKind=
HUMAN_CURATOR`. Whatever environment those Wave-0 claims were verified against was not this
production project.

## Prioritization (Phase 2)

Chemistry is not uniquely incomplete — every subject is at or near 0% of its own authored seed
source. Priority order, ranked by fastest full completion (smallest remaining volume first, to
bank complete subjects across more of the platform rather than exhausting one session's context
budget on a single large subject):

1. **Mathematics** (179 total, 20 seeded this session, 159 remaining) — smallest, in progress.
2. **Biology** (432, not started) — zero rows of any kind; complete authored content ready.
3. **Chemistry** (744, 60 seeded, 684 remaining) — already in progress from a prior session.
4. **Computer Science** (476, not started) — zero rows of any kind; complete authored content ready.
5. **English** (1056, not started) — large; live-capture duplication issue also lives here.
6. **Physics** (1639, not started) — largest; live-capture duplication issue also lives here.

## Method (for continuation in future sessions)

Same approach used for Chemistry: a temporary, uncommitted script
(`scripts/brain/tmp-generate-subject-sql.ts`, pattern documented in git history — regenerate as
needed, never committed) imports the real seed-source files, filters by `subjectSlug`, runs the
same KG-validation guard, and emits batched SQL using the real `seedCanonicalSlug`/`hashContent`
functions. Execute each batch via `mcp__Supabase__execute_sql`. A single ~20-statement batch costs
tens of thousands of tokens each way (once to read the generated file, once as the query
argument) — this is the binding constraint on how much can be seeded per session, not credentials
(Supabase access works fine) or KG validation (100% pass rate on every subject checked).

The fastest full completion path for any subject remains: run
`npx tsx scripts/brain/seed-knowledge-assets.ts --draft` from an environment with real
`DATABASE_URL` access (local machine, CI runner) — idempotent, skips all canonicalSlugs already
seeded, completes all 6 subjects' remaining ~4366 items in one script run with no per-session
context constraint.
