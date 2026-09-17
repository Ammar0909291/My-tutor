# Mathematics/Physics End-to-End Readiness Passes (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Mathematics Educational Brain serving-asset campaign — COMPLETE (2026-08-19)
- **257/257 authored Educational Brain entries in mathematics now have serving assets.**
  Started the session at 75/257. 29 batches, 185 concepts authored this session
  (185 explanations + 555 closed-choice probes). All five domains closed:
  `math.found`, `math.alg`, `math.arith`, `math.nt`, `math.geom`.
- Every concept meets `src/lib/teaching/assetContract.ts` v1: >= 1 explanation and
  >= 3 closed-choice probes per served band — the inventory that lets a lesson close
  without depending on the model volunteering a gradeable question.
- Seed corpus: **6,030 assets, 0 duplicate canonicalSlugs** (`--dry-run` reports
  `created=6030 revived=0 skipped=0`). All DRAFT. Promotion stays human via
  `PATCH /api/admin/knowledge-assets` — unchanged, and deliberately so.
- Guard: `src/tests/mathematicsAssetContract.test.ts`, 472 assertions. It does NOT
  only pattern-match prose — it RE-DERIVES the arithmetic every batch quotes
  (Carmichael 561 by modular exponentiation, phi(12) by distinct primes, the Bezout
  certificate for gcd(30,18), the D=61 Pell solution, pi(10^6) by sieve, all five
  Platonic solids at V-E+F=2, the diameter slip costing exactly 2x and 4x). A wrong
  number in a teaching asset is worse than a missing one, because it is believed.
- Four probe defects were caught by these checks BEFORE commit and are worth knowing
  about as a class: an 11-rule distractor that was a valid alternative method; a
  cube-Euler distractor that was the octahedron's count and evaluated correctly; a
  misconception id mapped to a register entry that did not describe it; and two
  explanations that opened with genus-differentia definitions the corpus guard bans.
  Three test failures in the same period were the ASSERTIONS being wrong, not the
  content — recorded so a future session does not "fix" correct prose.
- **Still blocked, unchanged and unchanged for the whole session:** none of this
  reaches a learner. Seeding needs a real `DATABASE_URL`; the Supabase MCP surface is
  a READ-ONLY transaction (verified: `25006: cannot execute CREATE TABLE in a
  read-only transaction`), so no batching works around it. One idempotent run
  finishes all 6,030: `npx tsx scripts/brain/seed-knowledge-assets.ts --draft`.
- Per-batch detail lives in the commit messages (`git log --grep "feat(math)"`), which
  carry the misconception analysis rather than a change list.


## Mathematics end-to-end pass (2026-08-19, after the 257/257 authoring campaign)
- **Run `npx tsx scripts/math/state.ts` and `npx tsx scripts/brain/seed-knowledge-assets.ts
  --draft --dry-run` before trusting any count in this file.** Current: KG 908/908, Blueprints
  908/908, Educational Brain 257/908, seed corpus **6,045 assets, 0 canonicalSlug collisions**.
- **Seeding is NOT blocked, and the note above saying it needs a `DATABASE_URL` is only half
  true.** `src/instrumentation.ts` runs a cold-start asset bootstrap that seeds the SAME corpus
  directly as ACTIVE (and promotes seed-owned DRAFT rows to ACTIVE), ~150 rows per cold start,
  bounded by `ASSET_BOOTSTRAP_WRITE_BUDGET`/`ASSET_BOOTSTRAP_DEADLINE_MS`. So production converges
  on the authored corpus by itself. Two consequences worth an owner decision, recorded not
  changed: (a) that path **bypasses the DRAFT -> human-review -> ACTIVE lifecycle** the admin
  endpoint exists to enforce — it is deliberate and documented in the file's own header, with
  `DISABLE_SEED_ACTIVATION=true` as the opt-out; (b) convergence is gradual, so a freshly authored
  concept is not servable the moment it is committed.
- **Five (concept, band) pairs could be TAUGHT and never QUIZZED** — the same defect class as
  chemistry's `chem.org.spectroscopy`, found because the earlier audit counted per CONCEPT and the
  contract is per (concept, BAND): `math.arith.addition` EARLY, `math.arith.subtraction` EARLY,
  `math.arith.division` EARLY, `math.found.logic` MIDDLE, `math.arith.fractions` ADULT — each had
  a `core_explanation` at that band and every probe at a higher one. Fatal rather than untidy:
  `matcher.ts` scores base 50, +25 exact band, +10 one band away, against a threshold of 65, so an
  adjacent-band probe scores 60 and is REFUSED. The learner is taught, the gate pool is EMPTY, and
  `withholdUngradedGateQuestion` correctly strips the model's prose question — so the turn teaches,
  asks nothing, and the lesson can never close. Closed by `mathematicsBandGapAssets.ts` (15 probes,
  3 per pair, DRAFT). Guarded by `src/tests/mathematicsBandContract.test.ts`, which scans the
  assets DIRECTORY rather than an import list and also checks the seed script imports every module
  it finds — it immediately caught a canonicalSlug collision in that new content that would have
  left the band at two probes again.
- **BLOCKER — certification is bounded by AI provider capacity, not by the engine.** A 9-concept
  sweep produced 5 PASS and then 4 IDENTICAL failures (24 turns, phase still OBSERVE, check 0,
  practice 0). Production logs for that window: 139 `http_status=429 error_name=AIRateLimitError`,
  40 `[ai/router] all providers failed`, and `[learn/chat] all providers down — serving degraded
  template (RS P-3)`. The captured turn is the degraded template verbatim ("Something on my side
  isn't responding right now…"). The teaching engine was never reached. It had NOT recovered ~10
  minutes later on single-lesson traffic. A full 257-concept sweep needs on the order of 1,800
  provider calls and cannot run against this quota.
  **Owner decision, reported not taken:** gemini-only mode (the standing 2026-08-12 instruction)
  turns a provider rate limit into a TOTAL teaching outage, because there is nothing to fail over
  to. The failover chain is intact and one env var away (`AI_PROVIDER_MODE=failover`).
- The harness itself held three defects, all fixed, none in the product: it could not log in at all
  (`/api/auth/csrf` returns the same cookie name twice with two different values; joining every
  Set-Cookie sent both, the server read the first, the body carried the second, `MissingCSRF`); a
  D3 verdict carried no evidence; and an outage was reported as a teaching failure. Outcomes are
  now three buckets — pass / teaching-failure / **unmeasured** — split by `classifyOutcome`, which
  reads the product's own `isDegradedProvider` rather than matching template prose. **This is the
  fourth time this harness has nearly condemned the product for its own blind spot.** Read the
  captured turn before believing a verdict.
- Verified this session with no provider calls: 257/257 EB concepts have serving assets; 282/282
  taught (concept, band) pairs meet the contract; 0 duplicate canonical identities; 0 hollow
  explanations or probes; 3,547 authored texts scanned for printable LaTeX, 0 malformed; 2,290
  misconception references over 823 distinct ids, 0 near-duplicates, and the 3 cross-concept
  references are correct authoring (a distractor tagged with the misconception the learner actually
  holds, routed to the sibling concept).
- **Mohd's account (suaibamr@gmail.com) was never authenticated, queried, or certified.** Every run
  authenticated as `claudeTest <explorewithpappu@gmail.com>`; `FORBIDDEN_ACCOUNTS` in the harness
  refuses the engineering account by construction.


