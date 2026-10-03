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

## 2026-10-02 (continued) — probe depth COMPLETE (917/917 pairs at five), lock fix verified, figure-pointer stub fixed

**Probe depth is done.** Every mathematics (concept, band) pair now holds five gradeable probes:
`contract-audit --subject mathematics --min 5` → **917/917 at contract, 0 short, 0
never-quizzable**. 1,833 probes in 24 modules (`mathematicsDepth*Assets.ts`, one per domain: arith,
number theory, foundations, geometry, algebra, calculus, trig, functions, sequences, linear
algebra, probability, statistics, differential equations, abstract algebra, discrete, complex,
real, topology, functional analysis, optimization, numerical, graph theory, category, measure),
all registered in both writers and in `probeInventoryDepth.test.ts`'s `DEPTH_TARGETS`. Every probe
extends an existing ladder slot at an unused rung (worklist from the live corpus, never a
singleton promoted); seed dry-run **12,883 items, 0 duplicate identities**. Answers were worked by
hand; each module header lists the checked computations. Production convergence is gradual: the
create-only bootstrap adds ~150 rows per cold start (math ACTIVE probes 2,752 → 3,352 by 19:00
UTC; corpus target 4,585). Re-measure with the probe count query, not this number.

**Lock fix verified in production** (deploy `36bd4626`, weak-learner harness
`--only=math.geom.pythagorean-theorem,math.trig.unit-circle`, fresh disposable account, deleted):
pythagorean-theorem reached verified mastery, then unit-circle opened as unit-circle — no
`activeLessonPersisted === false`, answers graded against unit-circle probes, counters moved. It
ended one practice answer short: its pool held three probes, so after one miss and one G2 re-ask
T16–T17 had no question left to serve. That is exactly the depth gap batch 7 closes (unit-circle
gains two misconception probes).

**Defect 4 — a figure pointer passed for a reply (runtime, fixed, `b3501be2`).** Same run, T17
(Vercel 19:02:18): the authored pool was spent, the gate contract repaired an announced question
(76 → 177 chars), the figure pointer was appended (276), then the repeat guard dropped the
paragraph (→ 97, `emptied: false`). The learner's whole reply to "can you ask me a question?" was
"Take a look at the figure beside this message — it's a general illustration related to the
topic." Its 16 words beat the 12-word stub threshold, so neither the regeneration nor the
empty-reply fallback ran. `splitVisualPointer` (visualAcknowledgement.ts) separates the appended
pointer; the stub repair and the confirm-back / repeat-guard fallbacks judge the body and re-append
the pointer. Regression: `stubRepairIgnoresFigurePointer.test.ts`.

## 2026-10-03 — six-lesson weak-learner QA 6/6, depth rows verified byte-identical, stale-question attribution fixed

**Weak-learner QA, all six lessons** (deploy `56076115`, fresh disposable account, deleted):
fraction-addition, linear-equation-1var, pythagorean-theorem, unit-circle, chain-rule and
bayes-theorem **all reached verified mastery — 6/6, 0 findings** (previous run 4/6: unit-circle
had no question left after one miss, bayes ended one answer short). New depth probes were served
and graded (bayes "1/12, about 8%", unit-circle "(1/2, √3/2)").

**Depth convergence verified against the corpus.** Per-domain aggregate
`md5(string_agg(slug | md5(stem) | md5(correctValue)))` over production's depth rows equals the
same aggregate computed from the corpus for all 13 fully-landed domains (arith, nt, found, geom,
alg, calc, trig, func, seq, linalg, prob, stats, de): byte-identical. Re-measured at 00:19 UTC
after the rest landed: **math ACTIVE probes 4,585 = corpus; all 24 domains byte-identical
(1,833 depth rows)**. Production convergence of the depth campaign is complete.

**Defect 5 — a right answer credited to the previous question (runtime, fixed).** unit-circle
T7–T9: the learner answered "(0, 1)" to the 180° card (wrong, server-corrected to (−1, 0)), then
"(0, 1)" to the 90° card (right). The reply: "That's right. Can you walk me through how you
decided that the point at 180° should be (0, 1)?" — and T9 taught it: "rotate half a turn (180°)
you end up straight up … x 0, y 1". The prompt's last-line reminder naming the graded question
(`5ba7e62a`) was live; it did not prevent this. Fix: `staleQuestionAttribution.ts` — on a
server-graded CORRECT turn, a sentence that states the chosen option together with a number found
in the previous card question (read from stored history, where `appendMcqToHistoryText` keeps
it) but not in the graded one is dropped; a stub left behind takes the existing one regeneration.
Regression: `staleQuestionAttribution.test.ts` (built from the transcript, plus non-drop cases).

Harness (`mathematicsProductionRuntimeQa.ts`): the "no stated verdict" note now accepts
"isn’t correct" (curly apostrophe), and "correct answer did not move counters" is noted only in
CHECK/PRACTICE, where answers count — both were false notes in this run.

## 2026-10-03 (continued) — wider coverage 6/6, mirror-verdict stub fixed, two operator items

**Wider weak-learner QA** (`--plans=wide`, disposable account, deleted): standard-error,
matrix-multiplication, separable ODE, inverse-functions, infinite-geometric-series and
quadratic-formula — **6/6 verified mastery, 0 findings**. With the earlier run, 12 of 12
weak-learner lessons across 11 domains reach mastery in production. A real owner account was
offered; the harness gained an env-only real-account mode (`QA_EMAIL`/`QA_PASSWORD`, never
written, never deleted), but running it was blocked by the session's credential safeguard, so
the run used a disposable account.

**Defect 6 — a mirror-verdict stub (runtime, fixed).** fraction-addition T4: the learner's
correct "5/6 — rewrite as 3/6 + 2/6" was mirrored back by the model; `repairMirrorWithVerdict`
replaced the reply with the server's verdict, and the learner's whole reply was "That's right."
It runs before `repairStubReply` exists in the route, so it never got the one regeneration the
gate-contract stub gets. It is now handed over the same way (`mirrorStubHoisted`). Regression:
`mirrorStubRepaired.test.ts`. Across the two runs this was the only content-free tutor turn
(12 lessons, ~150 tutor turns).

**Operator items found in production logs (not code):** (1) every welcome email fails — Resend
is in test mode and only delivers to the account owner's address; a verified sending domain is
needed at resend.com/domains. (2) A 07:53 UTC cold start hit the 12 s bootstrap deadline before
its first DB step (benign now that the corpus has fully converged; owned by the pending-writes
work, not changed here).

## 2026-10-03 (continued) — learner-validation follow-up: evidence classification, two more defects

Purpose: turn the 12 weak-learner sessions into engineering evidence. Terms used precisely:
Mathematics is KG-complete, EB-complete, concept-authored (asset contract 917/917 pairs, five
probes each) and production-converged (24/24 domains byte-identical). Runtime-verified and
learner-validated apply only to the **sampled lessons below — 12 of 908 concepts, scripted
weak-learner plans, disposable accounts** — not to the subject. No real-account or longitudinal
validation exists (a real account was offered; running it was blocked by the session's
credential safeguard).

"Verified mastery" here = `conceptMasteryVerdict`: not `teachingIntegrityUncertain`, and
`masteryVerifiedStrict` — at least 1 CHECK and 2 PRACTICE answers graded correct by the
server against an AUTHORED key (`verifiedCorrectAt*`; model-authored questions never count).

**Classification of the first 12 sessions.**
- A (healthy): all 12 reached verified mastery; every mastery claim matched server counters.
- B (confirmed defects): unit-circle stale attribution (defect 5); fraction mirror stub (defect 6);
  separable — an emptied display-math block (defect 7, below).
- C (quality concerns, no fix): (1) a learner's "give me a question" in OBSERVE/GUIDE sometimes
  gets a prose question or an authored explanation instead of a card (separable T3/T4,
  standard-error T12); (2) authored EXPLANATION assets are served verbatim, in the corpus's
  CAPS-key style (separable T11, bayes T5) — dense, but authored content, not a code defect;
  (3) after a correct answer, the next nudge sometimes re-confirms it (standard-error T15,
  bayes T10) — redundant, not false; (4) bayes T7 was the designed KG-description floor
  (`conceptFallbackText`), whose trigger can't be established (logs past retention).
- D (limitations): see the end of this section.

**Long sessions are not a defect.** Per-turn traces:
- standard-error (18 turns): CHECK at T14, after 3 scripted wrong answers, 1 off-key answer,
  7 nudges and 3 correct pre-CHECK answers.
- separable (16): CHECK at T12, after 1 confused message, 1 wrong, 1 off-key, 6 nudges and
  3 correct pre-CHECK answers.
- bayes (13): CHECK at T9, after 1 wrong, 5 nudges and 3 correct pre-CHECK answers.

All three then finished in the minimum, 3 graded answers in 4 turns. There was no loop and no
pool exhaustion. The length is the scripted weak-learner plan plus the designed rule that only
CHECK/PRACTICE server-graded answers count.

**Unit-circle corpus check.** Every keyed trig probe that names an angle (25) was checked by
hand (180° → (−1, 0), 60° → (1/2, √3/2), sin 240° = −√3/2, …): all correct. An automated
angle→point scan of the math assets, EB and chapters found 19 hits, all false positives on
review (rotations about other centres; correct statements naming the point at 90°). The
180° → (0, 1) statement was model generation, not content.

**Defect 7 — an answer-leak drop left an empty display block (runtime, all subjects, fixed
`d6ac7e26`).** separable: "…the equation becomes\n\n\[\n\]\n\nNow we integrate each side."
above "Separating dy/dx = x/y gives which equation?". `dropAnswerLeaks` removed the answer line
inside `\[ … \]` and kept the delimiters. An emptied `\[ \]`/`$$ $$` block is now removed,
with an introducing sentence that has no end punctuation. Regression:
`answerLeakEmptiedDisplayMath.test.ts`. Reproduced locally before the fix.

**Post-fix validation run** (deploy `d6ac7e26`, two fresh disposable accounts, both deleted):
the six original lessons plus standard-error, separable and matrix-multiplication — **9/9
verified mastery, 0 harness findings, 0 empty display blocks.** Two results:
- **Defect 5 recurred, found and fixed (defect 5b).** Production log 09:36:17 UTC: the guard
  fired and dropped "how did you arrive at the point (0, 1) for 180°?". The one regeneration
  (`repairStubReply`), which sees the same history, wrote "Can you walk me through how you
  decided the point at 180° is (0, 1)?" and it shipped. The next turn self-corrected
  ("(–1, 0), not (0, 1)") rather than teaching it. Fix: the regenerated text is re-checked,
  and a repeat is replaced by `confirmGradedAnswer`, built only from the graded card.
  Regression added to `staleQuestionAttribution.test.ts`.
- **Matrix-multiplication shipped a bare "That's right."** This is a different path: the
  gate-contract stub repair was rejected ("repair-asked-a-question-beside-the-card"). It is
  the class the turn-assembly program measures as K1 (15–27% baseline). This turn's shadow
  log has live K1 true, assembled K1 false. That program's serve step awaits the owner's
  decision (`TURN_ASSEMBLY_PHASE1_SPEC.md` §10), so it is recorded here and not patched
  piecemeal. Defect 6's fix covers only the mirror path of the same class.

**Limitations (D).**
- 12 + 9 scripted weak-learner sessions on 14 distinct concepts out of 908.
- No real-account or real-learner traffic.
- No longitudinal retention.
- The model is stochastic, so a guard that held in one run is not proof for all runs.
- Logs older than about 8 h are unreadable (billing limit).
- The `[stale-question]` guard had no production observation before this run; it is now
  observed firing.

**Recheck after defect 5b (deploy `c4146213`, CI green, two fresh disposable unit-circle runs,
both deleted).** Both reached verified mastery with 0 findings.
- On the graded-correct 90° turn, run 1 shipped the card-built confirmation ("That's right —
  the answer to "…θ = 90°?" is (0, 1).").
- Across both transcripts there are **zero declarative 180° → (0, 1) statements**, and later
  turns teach (−1, 0).
- Remaining quality concern (C, not fixed): on a later ungraded nudge, both runs asked "how
  did you decide the point at 180° should be (0, 1)?". That refers to the learner's real
  earlier wrong answer, so it is true, but it lingers on an error already corrected.

## 2026-10-03 (continued) — third spread: six new domains 6/6, two more defects fixed

**Coverage** (`--plans=third`, deploy `c4146213`, fresh disposable account, deleted):
nt.prime-factorization, disc.combinations, abst.subgroup, real.convergence-sequences,
graph.tree and num.newtons-method — **6/6 verified mastery, 0 harness findings.** The
learner-validated sample is now 20 concepts across 17 of 24 domains, all scripted weak-learner
runs. Every tutor turn of the six transcripts was read for mathematical correctness. Cayley
n^(n−2), forest edges n−k, Prüfer degree, ℤ/12ℤ having 6 subgroups, Bolzano–Weierstrass, the
ε–N choice N=100, and Newton x₁=1.5 / x₂≈1.4167 were all correct.

**Defect 8 — a stale choice named as this turn's (runtime, fixed).** Combinations: "120"
(wrong) to the committee card, then "Yes" (right) to the Pascal card. The model wrote "That's
right. I see you chose 120. How did you work out that number?" and the gate contract cut the
question. The stale-question guard missed it: "120" is neither the chosen option nor in the
previous stem. It is the same class as defect 5 in a second shape. On a server-graded correct
turn, the guard now also drops a sentence claiming "you chose / picked / answered X" when X is
an answer value that is not the chosen option, plus a following "…that number?" sentence. The
existing repair → re-check → card-built confirmation then runs. Praise, counts ("2 questions
correctly") and the real choice are untouched. Regression added to
`staleQuestionAttribution.test.ts`.

**Defect 9 — display math deleted as an "ASCII drawing" (runtime, all subjects, fixed).**
newtons-method, no figure on screen: the reply shipped "Consider the function\n\nwhose
derivative is\n\nApplying Newton's iteration\n\nsimplifies to…" with every formula gone. Log:
`[ascii-diagram] unbacked-ascii-diagram-stripped`. Pass 4b (unfenced stroke drawings) read a
"\[" / "\]" line as a stroke (no letter or digit, contains "\"), and the formula between as a
short label. A display-math delimiter line is no longer a stroke. Regression:
`asciiGuardKeepsDisplayMath.test.ts`, built from the production draft. The other 74 tests
across the four existing guard test files still pass.

**Recorded for the owner, not fixed (model generation errors; no deterministic verifier
exists, and building one needs authorization):**
- prime-factorization T14, an ungraded nudge turn after the 60 card: "they always end with
  the same prime factors — here 2²×3×7". That is 84, the previous card's value. This is the
  card mix-up of defects 5/8 on a turn the guard does not cover (it runs only on graded
  turns).
- newtons-method T8, a model-authored GUIDE question: "For f(x)=x³−2x, which root will
  Newton's method converge quadratically?", with the option "x = 0 (a double root)". All
  three roots of x(x²−2) are simple. Model-authored questions never count toward mastery
  (`unauthored-key-not-certifying`), but the learner still reads them. With the authored pool
  at five probes per pair, withholding model-authored questions in Mathematics is a policy
  option. That is the owner's decision.
- disc.combinations and matrix-multiplication bare verdicts: the turn-assembly K1 class (see
  above).

**Production recheck of defects 8 and 9** (deploy `7c9d8489`, CI green, fresh disposable
account, deleted): combinations, newtons-method and prime-factorization — **3/3 verified
mastery, 0 findings.** Every display-math block survived: combinations' Pascal derivation
kept both `\[ … \]` blocks after their lead-ins. No stale "you chose X" claims appeared.

**Open observation, root cause partly established (not fixed).** newtons-method, session
`cmusdeoz40004jk04561eotgw`, turn key 1791031158261, at DEMONSTRATE: the learner asked "ok give
me one question please" and the reply was "I'm sorry, but I can't provide a question right
now." (52 chars). The log chain:
- the authored question was declined ("below-guide-no-surplus", pool 3);
- the turn took the practice-without-quiz path, which lets the model answer with its own
  question;
- CUE dispatched D2b-CONFIDENT-WRONG (misconception repair: elicit the reasoning first);
- the model refused, and no stub repair covers a plain model turn.

The prompt rule the model was obeying isn't established. One occurrence in about 30 math
lessons (about 350 tutor turns). Content-free replies in general are the turn-assembly
program's territory; recorded here for it and for the owner.

## 2026-10-03 (continued) — fourth spread: all 24 domains now sampled; findings are design/content, not code

**Coverage** (`--plans=fourth`, deploy of `b87baf20`, fresh disposable account, deleted):
found.problem-solving-strategies, cx.cauchy-riemann, top.open-sets, meas.sigma-algebra,
fnal.banach-space, opt.convex-function and cat.functor — **7/7 verified mastery, 0 harness
findings, 0 stubs, 0 empty maths blocks.** The learner-validated sample is now 27 concepts and
covers **every one of the 24 Mathematics domains** (still scripted weak learners on disposable
accounts). Every tutor turn was read. These were checked correct:
- v = 2xy + y as the harmonic conjugate; CR holding only at z = i for x² − y² + 2xi;
- the interior of {b} is ∅ in the finite topology; 4 sets in σ(A), 2ⁿ for an n-piece partition;
- ℓᵖ complete for 1 ≤ p ≤ ∞; C[0,1] complete under sup, not L¹;
- Jensen's inequality; f″(0) = −4 for x⁴ − 2x²; local minima of a convex function are global;
- Hom(−, X); order reversal for contravariant functors.

**Content defect, for the owner (teaching content is not edited by this campaign).**
`math.meas.sigma-algebra` has an overstatement in two places:
- the authored correct option, in `mathematicsMeasSigmaAlgebraAssets.ts`: "no consistent
  measure can be defined on the full power set while preserving countable additivity";
- the EB entry, lines 37 and 115.

As stated it is false: counting measure and point masses are countably additive on every
subset of ℝ. What Vitali's construction rules out is a translation-invariant, countably
additive measure that gives intervals their length. A one-clause fix: "…no measure that is
translation-invariant and gives intervals their length can be defined on the full power set…".
The tutor repeated the overstatement at T8.

**Model-authored questions: three more concrete costs, for the owner's pending decision.**
The route's own design (the comment by `unauthored-key-not-certifying`) is "SUSPICIOUS, NOT
SUPPRESSED": a model-invented key still drives the teaching flow, and only certification is
withheld. It states that wrong feedback is not fixed. This run measured what that costs:
- **functor:** the learner answered the model's question "Which description matches the power-set
  functor on f?" with "image f(S)", which is right. The invented key graded it wrong
  (`correct: false`). The ladder dropped the learner GUIDE → DEMONSTRATE, CUE fired
  D2b-CONFIDENT-WRONG, and the reply was the bare KG-description fallback.
- **banach-space:** two wrong answers to model-written questions got no correction at all.
  The next nudge said "Your answer is correct", about an earlier answer.
- **newtons-method** (previous section): a model-written question with a false premise.

The authored pool now holds five gradeable probes per (concept, band) pair. Withholding
model-written questions in Mathematics, or keeping them but stopping an invented key from
moving phase or firing misconception repair, would remove this class. Both change a
documented design and are left to the owner.

## 2026-10-03 (continued) — owner-approved: model-key state isolation (option (b)) and the σ-algebra correction

**Model-written keys no longer move the learner in Mathematics (`b76675dc`, deployed in
`7bd16fbc`).**

*Traced state transition (before):* in the route, `mcqGradedThisTurn.correct` from a
model-invented key was written into `teachingSignal.correctness`. Consumers of that signal:
- the ladder (`advanceConversationState`: phase advance or regress, failures, plain counters);
- the persisted last signal, `misconceptionDetected` (the phrase) and MISCONCEPTION_DETECTED
  evidence.

Separately:
- `cueLastSignal` read the same grade, so CUE dispatched D2b-CONFIDENT-WRONG;
- the prompt's "THIS TURN'S ANSWER … graded WRONG" line handed the model the invented verdict.

Certification was already withheld (`unauthored-key-not-certifying`, the strict counters).

*Owning boundary:* the one place a grade becomes the turn's signal. `signalFromGrade` (mcq.ts)
leaves the signal neutral for an isolated key: no correctness, confidence or phrase. Two other
readers use the same predicate:
- CUE's last signal;
- the prompt reminder, which now says the key was not reviewed, gives no verdict and asks the
  model to work the question through.

*Scope:* `MODEL_KEY_ISOLATED_SUBJECTS = {mathematics}`. Every Maths pair has five authored
probes. Other subjects keep the documented "counted, never credited" ladder rule
(conversationState.ts), so lessons without authored questions do not stall. Authored keys are
unchanged in every subject.

*Tests:* `modelKeyStateIsolation.test.ts` (13). It covers:
- a correct answer with a faulty key, and a wrong answer with a faulty key;
- a false-premise question, graded either way;
- authored-key controls;
- scope and route wiring.

One existing source-anchor test was re-pointed. Full suite 852 files, 17,486 passed;
`tsc` 0; CI green on `7bd16fbc`.

*Production check* (disposable accounts, deleted). Functor, Banach space and Newton's method all
reached verified mastery through authored questions. Both model-key grades in the logs left the
learner unchanged:

| Lesson  | Model key's grade | Ladder correctness | Phase          | CUE                 | Counters / mastery   |
|---------|-------------------|--------------------|----------------|---------------------|----------------------|
| functor | wrong             | null               | GUIDE → GUIDE  | D1, not D2b         | none moved           |
| newton  | right             | null               | GUIDE → GUIDE  | D1, not D2b         | stayed 0             |

A false-premise question cannot be forced in production. It takes the same path, which the
unit tests cover.

**σ-algebra correction.** Source changed in the explanation asset, the detection probe's correct
option and the EB entry (lines 37 and 115); no other content touched. The production update is
two rows, generated verbatim from the edited source, idempotent and guarded on the old text:
- explanation `4a6218a5…`: content, lengthChars, contentHash `h60f94140`, version +1;
- probe `10820836…`: `choices[0].text`.

Status at the time of writing: **not yet applied.** Every content-changing write through the
Supabase connector timed out at its 60 s limit, while reads, no-op updates of the same row and
the same expression evaluated as a read all returned instantly. There are no triggers and no
blocking sessions. A pending approval in the connector is the likeliest cause. Production still
serves the old wording until the two statements are approved and run. Re-verify with the
read-back query (`position('consistent measure' …) = 0` on both rows).

**Separate owner items, unchanged by this work:** the K1 bare "That's right." and the
practice-request refusal — causes not yet established.

Scope statement, exactly: *27 concepts across all 24 Mathematics domains have been
learner-validated through scripted disposable-account production testing.*
