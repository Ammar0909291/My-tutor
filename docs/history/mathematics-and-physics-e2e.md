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



## 2026-10-02 — Mathematics production-readiness loop (all layers re-measured, 2 defects fixed)

Owner instruction: "MATHEMATICS AUTONOMOUS COMPLETION LOOP" (Mathematics only). Starting SHA
`6e2d984b`. Every number below was measured this session, not carried forward.

**Static layers (no defects found).**
- KG: `scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS — 908 concepts,
  0 duplicate ids, 0 broken edges, 0 cycles, 908/908 reachable from the single root, 0 warnings.
- `scripts/math/state.ts`: KG 908/908, Blueprints 908/908, EB 908/908, 24/24 domains, 0 orphan
  Blueprints, 0 orphan EB entries. (Its "serving source extract/author/neither" split is a
  historical Blueprint-prose classification, not a gap — all 908 now carry authored assets.)
- `scripts/assets/contract-audit.ts --subject mathematics`: 908/908 concepts authored, 917/917
  (concept, band) pairs at contract, 0 short, 0 never-quizzable.
- Educational Package determinism: 908/908 `math.*` packages `--check OK`.
- Placeholder scan of EB/Blueprints/asset files: every hit was mathematical prose ("placeholder
  zero", "dummy variable"), none a stub.

**Production convergence (verified against the live database, read-only).**
Seed corpus = 961 explanations + 2,752 probes (3,713 slugs, 0 duplicate identities). Production
ACTIVE math rows = 961 EXPLANATION (908 concepts / 917 pairs) + 2,752 PROBE (908 / 917).
Order-independent md5 aggregates over `slug=md5(content)`, `slug=md5(stem)` and
`slug=md5(choices text:isCorrect)` are byte-identical between the corpus and production, so no
stale content. 0 hollow identities. Production curriculum endpoint: 908 lessons, 1:1 with the KG,
0 non-math slugs. (The bootstrap is create-only — a future content EDIT to an existing slug will
NOT reach production by itself; re-run this aggregate comparison after any such edit.)

**Defect 1 — the certification instrument could not answer mathematics (harness, fixed).**
`scripts/certification/answerSource.ts` loaded a hand-written list of six corpus modules
(brain/authored/chemistry/physics), none of the ~100 `mathematics*Assets.ts` modules the bootstrap
serves. `certify.ts` therefore reported `UNMEASURED-no-authored-match` on the first served probe
(math.found.set-theory). Fixed: the corpus is now every content module on disk (the set
`seedCorpusCoverageRatchet.test.ts` proves the bootstrap imports). A second staleness in the same
file: it re-implemented `probeToMcq`'s rules and indexed the FULL choice text, while `probeToMcq`
(2026-09-30) serves only the answer head before " — " — 16 English modules were wholly
`options-mismatch`. Fixed by calling the real `probeToMcq` for admission, question and answer
head. Index now: 7,414 probes, 7,406 answerable stems; mathematics 2,748/2,752 resolvable. The 4
are two cross-concept duplicate stems with different correct wording ("What is 7⁰?" in
math.arith.exponentiation + math.alg.zero-exponent; "A circle has diameter 10…" in math.geom.circle
+ math.geom.circle-parts) — harmless to learners (grading is per pending probe), recorded only.
Regression: `certificationAnswerSource.test.ts` "answers a probe from every content module on
disk" (fails on the old loader, listing the mathematics modules).

**Production runtime certification — 12/12 PASS** (`certify.ts`, D1–D6, disposable
`qa-math-runtime-*@mytutor-qa.invalid`, deleted afterwards): math.found.set-theory,
math.arith.fraction-addition, math.alg.linear-equation-1var, math.alg.factoring,
math.geom.pythagorean-theorem, math.trig.unit-circle, math.func.composition, math.calc.chain-rule,
math.linalg.eigenvalues, math.prob.bayes-theorem, math.abst.group-theory, math.de.ode — each
`verified=true` at TRANSFER (check 1, practice 2) in 6 turns, 0 unmeasured. DB cross-check: 12
`topic_progress` rows MASTERED/100; 104 asset-linked evidence rows, all EDUCATIONAL_BRAIN_SEED
assets of the lesson's own concept; 0 non-math evidence; 36/36 PROBE_OUTCOME pass.

**Defect 2 — a correct tap was stored as misconception evidence (runtime, fixed).** The same run
wrote, on 2 of 12 concepts, PROBE_OUTCOME `pass` AND MISCONCEPTION_DETECTED on one turn, the
"misconception" being the correct option tapped ("It is multiplied by 3 too",
"5 — 9 + 16 = 25"). The server grade replaces the model SIGNAL's `correctness`, but its `phrase`
survived, setting `misconceptionDetectedThisLesson` (read by stance enforcement and the concept
budget) and persisting a correct answer as misconception evidence (read by authoring feedback and
analytics). Smallest fix, in the existing grade block of `route.ts`: `phraseRestatesCorrectChoice`
(mcq.ts) drops the phrase only when the server graded the tap CORRECT and the phrase is that
option (head, head + working, or a span). Different-words phrases and wrong taps are untouched.
Regression: `mcqCorrectAnswerPhraseDropped.test.ts` (the two real probes + narrowness + wiring).

**Visual verification (no campaign).** `validate-visualization-coverage.ts`: mathematics exact 17,
fallback 313, none 578, **incorrect 0**, broken refs 0. 11 legacy `math.*` registry keys match no
KG concept — already in the warn-only orphan baseline, left untouched. 4 of 12 certified lessons
served a figure on the opening turn. 3 ACTIVE math VISUAL rows in production.

**Recorded, not changed (outside Mathematics authority):** the create-only bootstrap (see above);
`eb_asset_identity`/`eb_explanation`/`eb_probe` are empty for every subject (not read for math).

**Post-deploy verification (production `7980085e`, CI `validate` green, fresh disposable account):
15/15 PASS** — math.arith.fraction-addition, math.geom.pythagorean-theorem, math.nt.prime-number,
math.stats.measures-of-center, math.disc.permutations, math.seq.geometric-sequence,
math.real.sup-inf, math.cx.cauchy-riemann, math.top.open-sets, math.meas.sigma-algebra,
math.fnal.banach-space, math.num.newtons-method, math.opt.convex-function,
math.graph.connectivity, math.cat.functor. With the first run, all 24 mathematics domains have a
production-certified concept (27 runs, 25 distinct concepts, 27/27 PASS). DB: 15 MASTERED, 93
asset-linked rows all seed assets of their own concept, 45/45 PROBE_OUTCOME pass, 0 non-math. The
two Defect-2 cases no longer recur; one new pass-turn misconception row did — "U discards G's
relations" on math.cat.functor, a PARAPHRASE of the correct option's working, not a span, so the
narrow rule kept it. Widened minimally: on a pure tap of the correct option (the learner wrote
nothing else), a phrase built only from that option's own words is dropped too; a typed answer
with words of its own keeps the exact-span rule (tests in the same file).

**Final verification (production `448ef6c8`, CI `validate` green): 6/6 PASS** — math.cat.functor,
math.arith.fraction-addition, math.geom.pythagorean-theorem (the three concepts that had shown the
phrase defect) plus math.calc.limits, math.linalg.determinant, math.prob.conditional-probability.
DB: 6 MASTERED, 0 MISCONCEPTION_DETECTED on any pass turn, 0 non-seed / non-math / cross-concept
asset rows. Production convergence re-checked at the end: hashes unchanged (961 + 2,752, identical
aggregates). All four disposable accounts deleted (0 `qa-math-runtime-*` rows remain). Session
total: 33 production certification runs, 30 distinct concepts, 24/24 domains, 33/33 PASS.

## 2026-10-02 (continued) — weak-learner QA, a lesson-switch lock defect, and probe depth

**Weak-learner production QA** (new `scripts/qa/mathematicsProductionRuntimeQa.ts`, disposable
account, one session, six lessons opened back to back with misconception / wrong / typed /
confused / question turns): fraction-addition, linear-equation-1var, pythagorean-theorem and
chain-rule reached verified mastery; bayes-theorem ended one practice answer short at the 18-turn
budget; **math.trig.unit-circle never left GUIDE.**

**Defect 3 — opening the next lesson could be blocked by the previous turn's open transaction
(runtime, fixed).** Vercel log, lesson-init for unit-circle: three `studentProgress.upsert`
attempts failed with `55P03 canceling statement due to lock timeout` and `activeLessonSlug persist
FAILED after retries`. The pointer stayed on pythagorean-theorem, so all 18 "Unit Circle" turns
taught Pythagoras (DB: 32 ASSET_SHOWN rows for pythagorean-theorem in that window, none for
unit-circle). Cause: the chat route's two writes to the same `student_progress` row — the per-turn
"auto-save lesson position" upsert and the placement-adjustment update — were fire-and-forget, the
exact R1 shape (a frozen serverless instance keeps the row lock). Fix: both are captured in
`studentProgressWrites` and settled at R1's response boundary; regression
`studentProgressWritesAwaited.test.ts` (fails 3/3 on the old route). The harness now flags
`activeLessonPersisted === false` directly.

**Probe depth — what it is for (corrected the same day).** 916/917 mathematics pairs held exactly
three gradeable probes. A first reading said one wrong answer made mastery unreachable; production
showed otherwise — the owner-approved G2 rule (2026-09-24) re-asks a question the learner got
WRONG once the fresh pool is spent. What production did show: after a miss the tutor states the
answer ("Not quite — the answer is: 5 — 9 + 16 = 25") and the re-asked question is then credited
toward VERIFIED mastery (pythagorean-theorem, linear-equation-1var). Depth lets a learner recover
on questions they have not been shown. Batches 1–5 (arith 64, nt 36, found 84, geom 69, alg 60
pairs; 626 probes) extend existing ladder slots only — no singleton promoted, guarded by
`probeInventoryDepth.test.ts` (whose duplicate-stem normaliser now keeps Unicode letters/digits:
"a³ · a²" and "a⁵ / a²" are different questions). `bootstrapLadderSiblingGuard.test.ts`'s fixture
size ("two rungs per slot", 90) now checks the property per slot, since those 45 ladders gained
rungs; its real assertions (0 created with the guard, exactly 45 without) are unchanged.
