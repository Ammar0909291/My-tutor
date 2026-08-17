# Moat Audit Ledger

Durable record of the Moat assessment/teaching-quality campaign. Physics and
Chemistry only. Every entry states what was MEASURED and how, and distinguishes
**authored-in-repo** / **seeded-in-production** / **production-served** /
**production-verified**. Estimates are never recorded as measurements.

---

## Stage status (as of 2026-08-16)

| Stage | Scope | Physics | Chemistry | State |
|---|---|---|---|---|
| S1 | gradeable probe count (authored) | 238/238 | 186/186 | CLOSED |
| S2 | blueprint MC coverage (authored) | 604/604 | 537/537 | CLOSED |
| S3 | structural tag integrity (orphan MC ids) | 30 residual | 4 residual | CLOSED — all classified |
| S4 | stem-vs-blueprint agreement | 238/238 | 186/186 | CLOSED |
| S5 | visual semantic (offline) | 23 widened, inspected | 20 widened, inspected | CLOSED |
| S6 | visual semantic (live) | 25 served + 16 DRAFT audited | same surface | RENDERED: NOT MEASURED (no browser); semantics: production-verified, 0 runtime defects |
| S7 | real-tutor behaviour | lesson 8 fresh: 13/13 pass | lesson 3 fresh: 12/13, 1 defect fixed | BOTH SUBJECTS COVERED — 1 detection gap = OWNER DECISION |
| S8 | production seeding | **238/238 served** | 186/186 served | **CLOSED (re-verified 2026-08-16)** |
| S9 | end-user runtime | mastery closure + real duration live-verified | mastery closure live-verified | BOTH SUBJECTS VERIFIED — duration FIXED; 1 intended mismatch remains |
| S10 | regression protection | offline pinned + prod audit incl. 2 invariants | same | EXTENDED — visual + evidence-marker invariants PASS in prod |

---

## S3 — structural tag integrity (CLOSED 2026-08-16)

All 33 physics and 4 chemistry orphan misconception ids were classified by
reading the relevant blueprint body against the probe stem.

**3 RENAME (fixed, commit `64a70d1`)** — same misconception, different spelling:

| Concept | Was | Now |
|---|---|---|
| `phys.therm.specific-heat` | `MC-HEAT-IS-STORED` | `MC-HIGH-TEMPERATURE-MEANS-HIGH-HEAT-CONTENT` |
| `phys.therm.phase-transitions` | `MC-PHASE-HEAT-RAISES-TEMP` | `MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE` |
| `phys.therm.ideal-gas-law` | `MC-FORGET-KELVIN-CONVERSION` | `MC-CELSIUS-IN-GAS-LAW` |

Physics ratchet 33 → 30; the three ids are pinned individually so a revert
fails with the id, not just a count.

**30 physics + 4 chemistry NO-MATCH** — the probe diagnoses a real
misconception the blueprint does not document. These are **curriculum
feedback**, not defects this campaign may fix: rewriting the tag would make the
join succeed while the probe still tests something the blueprint never
registered. Two candidates were explicitly REJECTED as renames after reading
both texts:

- `phys.mech.bernoulli:MC-FASTER-MEANS-HIGHER-PRESSURE` — the probe tests
  "faster fluid ⇒ higher pressure"; the blueprint's
  `MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY` is about accepting fast⇒lower as an
  unexplained suction rule. Opposite beliefs.
- `phys.mech.surface-tension:MC-LARGER-HAS-HIGHER-PRESSURE` — the probe tests
  Laplace-pressure inversion; the blueprint's `MC-SURFACE-TENSION-IS-PRESSURE`
  is about confusing N/m with N/m². Different concepts.

---

## S8 — production seeding: FOUND AND REPAIRED (2026-08-16)

### The finding

**42 of 238 physics concepts (17.6%) had no ACTIVE gradeable probe in
production.** Chemistry was already complete at 186/186. Now repaired — see
"Repair" below. State at discovery:

Measured directly against production (`asset_identity`, Supabase
`ywakxiqbevfuxsiwewnw`), read-only:

```
subject   total_concepts   with_active_gradeable   missing
chem      186              186                     0
phys      238              196                     42
```

Gradeable families counted: `mcq`, `true_false`, `checkpoint`, `short_answer`,
`step_check`, `misconception_probe`.

### Why it matters — this is learner-facing, not cosmetic

`findBestProbe` (`src/lib/teaching/assets/teachingActionRepository.ts:40`)
queries `assetIdentity` with `status: ACTIVE`. The runtime reads the DATABASE,
not the in-repo corpus. For these 42 concepts it returns null, so
`probeToMcq` never runs and the server-owned gate assessment never fires. The
mastery-gate question reverts to the model generating one in prose — the exact
ungradeable path `gateAssessment.ts` was built to remove.

It compounds with S7: the prose-MCQ guard now *suppresses* LLM-claimed
correctness on that shape. Correct behaviour (better a missing record than a
false one), but it means for these 42 concepts a learner can answer correctly
at a gate and have **nothing recorded**, so the gate may never close.

### Root cause — CORRECTED

My first diagnosis, that a slug-scheme migration re-seeded only 196 of 238, was
WRONG, and the database says so in its own words. Every affected row carries
this `deprecationReason` from a single event at `2026-08-12 21:59:37.418`:

> "Audit 2026-08-12: ACTIVE PROBE identity with NO probe_assets row —
> unservable by findBestProbe (which filters ACTIVE then joins content), so it
> occupied a serving slot it could never fill. Reversible: set status back to
> ACTIVE. NOTE: not a slug-scheme issue — 4-part slugs are the normal form; the
> defect is the missing content row."

So the deprecation was a DELIBERATE and CORRECT audit action against *hollow*
identities — identity rows with no `probe_assets` content. It removed rows that
could never serve. What it could not do was supply the missing content, so the
42 concepts were left with no servable gradeable probe at all.

Only 2 of the 42 had any deprecated row with real content; the other 40 were
hollow. Reactivation alone was therefore never the fix — the content had to be
inserted.

### It is NOT an authoring gap

Verified against the repo: **all 42 have authored gradeable probes** in
`AUTHORED_PROBES`. `gateAssessmentIsServerOwned.test.ts:152` already asserts
every physics concept with an authored probe has at least one gradeable one
(238/238) and passes. The offline invariant was sound; only the production
seeding run was incomplete.

### Affected concepts (42, all now served)

- `phys.particle.*` — 16 (the entire Particle Physics domain)
- `phys.stat.*` — 14
- `phys.mod.*` semiconductors — 6
- `phys.qm.*` — 4 (`density-matrix`, `quantum-tunneling`, `s-matrix-basics`, `selection-rules`)
- `phys.mech.displacement`, `phys.mech.hookes-law` — 2

### Repair — AUTHORIZED AND COMPLETED

Owner authorized the re-seed on 2026-08-16. Executed against production via
Supabase MCP (the sandbox has no `DATABASE_URL`, so the seed script could not be
run directly; every statement replicated its exact row shape — same
`buildProbeSlugResolver` identity, `hashContent`, `SEED_AUTHOR_ID`,
`HUMAN_CURATOR`, tags and `NOT EXISTS` skip semantics).

Two passes were needed, and the second one is the interesting part:

1. **Insert** authored gradeable probes for the 42 concepts. Guarded by
   `WHERE NOT EXISTS` on `canonicalSlug`, exactly as the seed script skips.
   Result: 196 → 234 concepts served.
2. **Backfill + reactivate** the last 4. `phys.mod.diode-rectification`,
   `phys.particle.electroweak-unification`, `phys.particle.feynman-diagrams`
   and `phys.particle.hadron-quark-model` each had their
   `misconception_probe:en:high` slug held by a hollow DEPRECATED row, so the
   insert was correctly skipped and they stayed unserved. **This is the trap
   that would have defeated a plain re-run of the seed script**: its skip check
   matches on slug regardless of status, so a hollow deprecated row makes the
   concept permanently unseedable. Fixed by inserting the missing
   `probe_assets` content against the existing identity and then setting it
   ACTIVE — precisely the reversal the audit's own note described, now valid
   because the content exists.

**Verified after the write:** physics 238/238, chemistry 186/186,
0 duplicate ACTIVE canonicalSlugs, 0 hollow ACTIVE probe identities, chemistry
unchanged at 372 ACTIVE probe rows.

### Confirmed by two independent methods

The 42 is not an artifact of how "gradeable" was defined. Both give the same
numbers (physics 196 served / 238 authored; chemistry 186/186):

1. **Family-name filter** — ACTIVE rows whose `familyKind` is one of
   `mcq`/`true_false`/`checkpoint`/`short_answer`/`step_check`/`misconception_probe`.
2. **Conversion predicate** — ACTIVE rows whose `choices` actually satisfy
   `probeToMcq`'s rules (2–4 options, exactly one `isCorrect`). This is the
   stricter and more truthful test, because it is what the turn itself runs.

---

## S8 — re-measured independently (2026-08-16, second session)

Not taken on trust from the entry below. Re-run against production with the
**conversion predicate** (the stricter of the two methods — ACTIVE PROBE
identities joined to `probe_assets` whose `choices` satisfy `probeToMcq`:
2–4 options, exactly one `isCorrect`):

```
subject   concepts_with_servable_gradeable   servable_rows
chem      186                                372
phys      238                                370
```

Integrity at the same moment: 0 duplicate ACTIVE `canonicalSlug`, 0 hollow
ACTIVE probe identities, 10 ACTIVE VISUAL, 868 ACTIVE phys+chem EXPLANATION.
**S8 stands CLOSED on independent measurement.**

Note for future sessions: `mcp__Supabase__list_projects` returns `[]` in this
sandbox, which earlier sessions recorded as "DB unreachable". It is not —
`execute_sql` against project `ywakxiqbevfuxsiwewnw` works normally. Do not
conclude the database is unreachable from an empty project list.

---

## S7/S9 — first live learner session (2026-08-16)

**Instrument note, stated plainly: there are NO browser screenshots.** Chromium
is installed but its network is blocked sandbox-wide — `ERR_CONNECTION_RESET`
on every navigation including `https://example.com`, direct and via the proxy,
with no CONNECT arriving at the proxy. The session was therefore driven over
HTTP against the real deployment (real NextAuth credentials session, real
`/api/sessions` → `/api/learn/chat`, real provider path, real persistence).
That is a real learner session, but it is not a rendered screen: **S6 stays
NOT MEASURED**, because judging a figure requires seeing what the learner sees.

### DEFECT — a finished lesson accrued a new attempt on every chat turn

Found on the first two live turns, on `phys.meas.units` (lesson:1). The learner
typed "i dont understand any of this", then "wait please explain what a unit is
again, i really dont get it". Both turns returned the *identical* first-time
close — "That's SI Units and Measurement finished — nice work." — and each one
wrote a NEW `lesson_attempts` row.

Production state for that one account:

```
lessonKey   rows   rows with durationSeconds <= 3
lesson:6    14     11
lesson:1     7      6      (2 of them written by this audit's turns)
lesson:4     4      4
```

The genuine lesson:1 attempt ran **2621s**; the rest are 1-second rows
manufactured by idle utterances after the close. The defect predates this
session (earliest 2026-08-12).

**Root cause.** `openLessonAttempt` reuses only an `IN_PROGRESS` row. Against a
COMPLETED lesson it creates a new attempt; the concept is still closed, so
`recordConceptOutcome` folds it in and `shouldFinalizeLesson` is immediately
true — a fresh COMPLETED row per turn, forever. Confirmed from the deployment's
own logs, which show D-0a serving correctly with no model call
(`RESPONSE provider=deterministic source=LessonAttempt lessonKey=lesson:1
reason=lesson_already_complete`) while the attempt row was rewritten anyway.

**Why it matters** — the damage is to the evidence ledger, which is the moat
asset, not to a cosmetic string:
- `durationSeconds` stops describing the real attempt,
- `completedAt` drifts forward onto the last thing the learner typed,
- `teachingAttempts` / `budgetExhaustions` reset to a fresh attempt's values,
  discarding the struggle history the adaptive layer reads back,
- and the learner-visible consequence: the fresh finalise overwrites the
  "you've already finished" close with the FIRST-TIME close, so a distressed
  learner is congratulated with "nice work" on every turn.

**Fix.** The outcome writer in `route.ts` is gated on `lessonCompletedHoisted`
— the same authority the D-0a completion gate already reads, computed from
`latestLessonAttempt().status` for the identical `lessonKey`, so no second
source of truth is introduced. Re-opening a completed lesson remains
`lesson-init`'s job, scoped there to `mode=restart|review`; after a real
restart the flag is false and recording resumes unchanged.

Regression: `src/tests/lessonAttemptNoReopenOnChat.test.ts` — 6 tests, pinning
the defect mechanism, the one-row outcome, non-drifting `completedAt`,
preserved counters, normal in-lesson recording, and restart resumption.

**PRODUCTION-VERIFIED** (commit `b891653`, deployment `dpl_AWBfYs7p9Le…`,
READY and aliased to `my-tutor-flame.vercel.app`). The same learner scenario
was re-run on the same completed lesson after deploy:

```
                        lesson:1 rows   latest completedAt
before fix (baseline)   7               2026-08-16 15:18:30.733
after 4 post-fix turns  7               2026-08-16 15:18:30.733
```

Pre-fix, two turns added two rows and moved `completedAt` twice. Post-fix the
ledger is untouched — and the learner now receives the correct close,
**"You've already finished SI Units and Measurement"** (the `alreadyFinished`
variant), instead of the first-time "finished — nice work" that the spurious
finalise had been overwriting it with.

### Re-entry paths — both verified clean (2026-08-16, second pass)

The first verification covered "keep chatting after the close". The other
re-entry route, **`/api/learn/lesson-init` on a completed lesson**, was then
tested live on the same account (`mode=resume`, lesson:1). Ledger after it:

```
rows 7   latest completedAt 2026-08-16 15:18:30.733   max durationSeconds 2621   IN_PROGRESS 0
```

Unchanged, no new row, the real 2621s attempt still intact — `resume` correctly
does not re-open, matching the intent documented at `lesson-init/route.ts:245`.
Evidence integrity now confirmed on BOTH re-entry paths.

Regression coverage extended to the signals the adaptive layer actually reads
(11 tests total). `latestLessonAttempt` orders `startedAt DESC` and is the
single read behind all three consumers — the prompt SUMMARY block
(`route.ts` ~1826), the completion gate on that same read, and the D-0a serve
(~3479) — so under the defect the tutor was reading the 1-second row the
previous turn had manufactured, not the learner's real attempt. Now pinned:
`durationSeconds` stays 2621, `teachingAttempts`/`budgetExhaustions` are not
reset, `latestLessonAttempt` still points at the real attempt, a RECOVERY turn
writes nothing, and an IN_PROGRESS attempt is still reused rather than doubled.

### NEW FINDING — re-entry teaches, then chat refuses to listen

Distinct from the ledger defect above, found while testing that re-entry path.
Reproduced live, in this order:

1. `lesson-init` (`mode=resume`) on the COMPLETED lesson → the tutor **teaches**
   a full opening via gemini and ends with a real question: *"when you measure
   how long a table is, what label or unit do you normally use?"*
2. The learner answers it correctly — "metres i think".
3. `/api/learn/chat` → D-0a serves the canned close. The answer is never
   acknowledged, never graded, never recorded.

The app asks a question it is structurally incapable of receiving an answer to.
Cause is a disagreement between two paths about whether a finished lesson may
be taught: `lesson-init` generates a fresh LLM opening regardless of status,
while D-0a refuses all teaching on the same lesson. Each is defensible alone;
together they produce the dead end. `lesson-init/route.ts:245` states the
intended behaviour explicitly — "resuming a finished lesson should still
deliver the close" — and the observed opening is not that.

**NOT changed here, deliberately.** Fixing it means choosing which side is
right, and that is a product call of the same family as the completion-message
items already reserved for the owner: a learner re-entering a lesson they never
mastered arguably *should* be taught, which would make the existing
`restart|review` re-open machinery the natural home rather than silencing the
opening. Recommendation recorded, decision not taken.

**Observation, not yet diagnosed:** two of the four post-fix turns served a
prior assistant question verbatim ("Let me ask you something concrete about SI
Units and Measurement…") with `provider=memory`,
`memoryFallbackReason=lesson_complete`, before the fourth turn served the
correct close. Recorded rather than guessed at; it needs its own turn-by-turn
trace and is NOT claimed here as either a defect or as intended behaviour.

### Chemistry live session — what PASSED (2026-08-16)

A second live session on `chem.found.states-of-matter` (a genuinely open
lesson — no prior attempt row), played as a weak beginner. Every step below was
observed live, with the DB checked afterwards:

- **Misconception diagnosis and repair works.** "in a solid the particles are
  completely still" → repaired without marking the learner wrong ("completely
  natural to picture them that way… never truly still"). Second misconception
  ("when it melts the particles are gone?") → repaired with conservation of
  identity. Third, a confident wrong answer at a check question ("they break
  apart into hydrogen and oxygen atoms") → correctly diagnosed as a
  physical-vs-chemical-change error, and **not** marked correct.
- **The evidence spine records it.** `mistake_records` row written at the exact
  turn: `category=signal_confident_wrong`, `topicSlug=chem.found.states-of-matter`.
  The physics distress turn likewise wrote `category=recovery_signal`.
- **Explanation and figure agree.** The attached `visualSpec` (`process_flow`,
  "Interconversion of States of Matter") was referenced by its REAL step labels
  — "Solid State" → "Melting (Heating)" → "Liquid State" — and used correctly
  to extend the vibration repair. The same figure was held across turns with
  continuity rather than churned. This is a semantic check of explanation
  against figure SPEC; it is **not** S6, which needs the rendered screen.
- **Stance enforcement held.** After one correct answer the model produced
  mastery-shaped closing text ("✓ You've mastered…"), but the server issued
  **no** `lessonComplete` payload and `topic_progress` stayed
  `IN_PROGRESS / masteryPct 25`. The model's claim did not become state.
  Worth an owner's eye: the learner still READS "you've mastered" on evidence
  the server refused to certify.

### S9 — RESOLVED BY INVESTIGATION: the ladder is correctly strict; the LOSS is a DB timeout

Verdict on the previous entry's hypothesis: **D (MIXED), and the headline
hypothesis was WRONG.** The ladder is reachable and behaving as designed
(**A — correctly strict**). A separate, real **C — state/transport defect**
explains the missing `topic_progress` update. No code change was made to the
ladder, and none should be.

**The turn-by-turn trace that settled it** (production `[ladder]` logs,
chemistry session, concept `chem.found.states-of-matter`):

```
16:18:24  "another practice question?"  signalTag=false correctness=null  mcqAsked=true
          OBSERVE     -> OBSERVE      check 0  practice 0
16:18:53  "C"                          signalTag=true  correctness=true
          [mcq-grade] chosen=2 correct=true
          OBSERVE     -> DEMONSTRATE  check 0  practice 0
16:19:54  "one more practice question"  signalTag=false correctness=null
          DEMONSTRATE -> GUIDE        check 0  practice 0
```

The correct answer was **not lost**. Two things the previous entry got wrong:

1. The MCQ **is** graded server-side and **did** reach the ladder —
   `[mcq-grade] correct: true`, `signalTag: true, correctness: true`. There is
   no signal-transport failure and no dependence on the model self-reporting.
2. The session had never left **OBSERVE**, so that correct answer was spent on
   `OBSERVE -> DEMONSTRATE`, a transition that increments no counter. The
   counters move only inside CHECK and PRACTICE. That is the design, not a bug.

Persisted state confirms the ladder is climbing and durable:
`phase GUIDE, demonstrated true, turnsOnConcept 8`.

**The cost of mastery, now pinned in the suite**
(`src/tests/masteryLadderReachability.test.ts`, 7 tests): closing the gate takes
**five graded-correct answers** — OBSERVE→DEMONSTRATE, a teaching give for
DEMONSTRATE→GUIDE, GUIDE→CHECK, one in CHECK (`correctAtCheck` 1 → PRACTICE),
two in PRACTICE (→ TRANSFER). Strict, but plainly reachable in one sitting.

**OBSERVE is deliberately not absorbing.** An assumption written into the first
draft of that test — "a learner who never answers correctly never leaves
OBSERVE" — FAILED against the real module. `phaseAfterConcludedDiagnostic`
advances after two failed probes, and `conversationState.ts` carries a long
note explaining why: without it a learner who answered wrong twice was pinned
forever and every later turn re-emitted a byte-identical directive. Leaving
OBSERVE that way awards no counter, so it is not hollow advancement. The test
was corrected to the real contract; the module was not touched.

**The genuine defect — evidence lost to a DB socket timeout.** On the turn at
16:19:54 these all failed with Prisma **P1008 socket timeout**:

```
prisma.evidenceEvent.create()      prisma.spineEvent.aggregate()
prisma.studentProgress.upsert()    prisma.topicProgress.upsert()
```

That is why `topic_progress` still carried the earlier wrong-answer timestamp.
Frequency in the measured window: **1 request** — intermittent infrastructure,
not chronic. Root cause at `route.ts:5267`: the mastery-evidence write runs in
a floating fire-and-forget `async` IIFE, is **not** wrapped in `withRetry`, and
ends in `.catch(() => {})` — a silent swallow. The project's own
`src/lib/db/withRetry.ts` already lists **P1008** as retryable, so the remedy
exists and this write simply does not use it.

**FIX IMPLEMENTED 2026-08-16** (commit `f70c3a4`) — see the section below.

**Smallest root fix — as originally PROPOSED.** Wrap that upsert in the
existing `withRetry` and log the failure instead of swallowing it. Stopped
short of implementing because it is **not unambiguously safe**: the update
carries `attempts: { increment: 1 }`, which is not idempotent, and a P1008
timeout does not tell us whether the write committed — so a naive retry can
double-count attempts. Doing it properly means making the write idempotent
(or moving the increment) first, which is a real design decision and wants its
own bounded change, not a wrapper bolted on during an investigation.

---

## S7 PHYSICS — real-tutor behavioural coverage (2026-08-16, live-verified)

Mirrors the chemistry S7 batch on a genuinely untouched concept: physics
lesson 8, `phys.meas.unit-conversion`. Fresh-state confirmed before starting —
0 `lesson_attempts`, 0 `topic_progress`, 6 ACTIVE gradeable probes, 1 ACTIVE
VISUAL belonging to the concept itself. Played as a weak beginner.

**13/13 checks pass. No defect found, so no code was changed.**

| # | check | evidence |
|---|---|---|
| 1 | lesson switch / active concept | switched from chemistry; taught unit conversion |
| 2 | concrete anchor | paperclip, then a 1 m ribbon cut into 100 cm — before any rule |
| 3 | beginner does not know | "i find this stuff hard" / "i dont know how to do this" |
| 4 | confusion recovery | "It is completely normal to find unit conversion tricky at first" |
| 5 | misconception expressed | "so 1 metre is 10 centimetres right" |
| 6 | diagnosis → repair | corrected with the mechanism (centi = one-hundredth), tied to the figure's "Apply conversion factor" step |
| 7 | structured probe | server-owned MCQ issued on request |
| 8 | grading authoritative | wrong graded wrong, correct graded correct, server-side |
| 9 | wrong answer handled | scored 25, `mistake_records` row written, no false advance |
| 10 | correct answer advances | `GUIDE → CHECK` |
| 11 | visual ownership | served the concept's OWN "Steps for Unit Conversion"; the tutor narrated its real step labels |
| 12 | evidence only when gradeable | `attempts=2` for exactly the 2 graded answers; ungraded turns wrote nothing |
| 13 | no duplicate/stale state | 0 attempt rows (concept not closed), 1 ACTIVE visual, marker resolves to a USER message |

Assessment summary: 2 probes issued, 2 answered, 1 wrong + 1 correct, both
graded server-side; `topic_progress` ended `IN_PROGRESS 65% attempts=2 last=65`.

Ladder: `OBSERVE → DEMONSTRATE → GUIDE → CHECK`. The `OBSERVE → DEMONSTRATE`
step came from two failed probes (the "i dont know" plus the wrong MCQ)
concluding the diagnostic — the documented anti-deadlock exit, matching
`masteryLadderReachability.test.ts`, NOT an advance earned by a wrong answer.

**Bonus verification:** this exercised `f1cad37` across a SUBJECT switch
(chemistry → physics), which the fix's own live verification did not cover — no
chemistry figure carried into the physics lesson.

**S7 is now covered on a fresh concept in both subjects.** The physics/chemistry
behavioural asymmetry is closed. Rendered-browser evidence remains NOT MEASURED;
the visual checks above are payload and production-data evidence, not a screen.

---

## S10 — production invariants for the two 2026-08-16 fixes

The suite proves what the code does; the production audit proves what the
database holds. Both fixes now have the second kind of guard, in the SAME
read-only script (one audit entry point, no second authority). Rules live in
`src/lib/teaching/moatInvariants.ts` as pure functions, unit-tested without a
database (`moatInvariants.test.ts`, 10 tests); the script supplies Prisma rows.

**1. Visual integrity** — at most one ACTIVE visual per concept. Guards
`f1cad37`'s surface: the APPROVED tier resolves by concept, so a second ACTIVE
row would make the served figure depend on row order.

**2. Evidence-marker integrity** — guards `f70c3a4`. Three falsifiable checks:
a non-null marker must resolve to a real message, that message must be a USER
message, and it must belong to the same learner as the row; plus, once the
column exists, a row updated after the migration must carry a marker.

**What is NOT checkable, stated rather than approximated.**
`lastEvidenceMessageId` is a SCALAR holding only the LATEST marker, so stored
state cannot answer "does `attempts` equal the number of distinct events that
incremented it" — earlier markers were overwritten and no history is kept. A row
with `attempts: 7` and one marker is normal. The literal
"attempts == distinct markers" invariant is therefore not implementable, and a
test pins that limitation so it is not re-derived later. Idempotency is enforced
at WRITE time by the guarded UPDATE and proved in
`topicProgressEvidenceIdempotency.test.ts`; this audit checks identity and
completeness, which is what production state can actually support.

**Historical rows are exempt by construction.** The cutoff is read from the
migration's own `_prisma_migrations.finished_at`
(`2026-08-16 17:27:34 UTC`) — never a constant typed into the code — and when
that timestamp cannot be read the completeness check is SKIPPED rather than
guessed, because otherwise every pre-migration row would look like a violation.

**Production result (read-only, 2026-08-16):**

```
marker cutoff            2026-08-16 17:27:34 UTC (from _prisma_migrations)
duplicate ACTIVE visuals 0     (10 ACTIVE visuals total)
marker violations        0     (147 rows, 4 marked, 0 dangling/non-USER/wrong-user)
unmarked after migration 0     (143 historical rows correctly exempt)
```

Both invariants PASS. No production repair needed, so no write was proposed.

**Evidence-state note:** the script itself could not be executed here — this
sandbox has no `DATABASE_URL` — so the numbers above come from running the
script's own queries directly against production, including the
migration-derived cutoff and the message→session→userId join it uses. That is
production-verified data, not a verified script run; the first real run belongs
to an environment that has the connection string.

---

## S9 CHEMISTRY — genuine mastery closure (2026-08-16, live-verified)

Mirrors the physics run on a genuinely untouched lesson: chemistry 4,
`chem.found.measurement` (baseline 0 attempts, 0 `topic_progress`, 2 ACTIVE
probes). Weak-learner session, five server-graded MCQs, no guiding.

Ladder: `OBSERVE → DEMONSTRATE → GUIDE → CHECK → checkCorrect 1 / PRACTICE →
practiceCorrect 1 → practiceCorrect 2 / TRANSFER`. Assessment results: 5 probes
issued, 5 answered, 5 graded correct server-side, 0 wrong, 0 ungraded.

Outcome — identical shape to physics:

```
verified true, TRANSFER, check 1 / practice 2
mastered [chem.found.measurement], needsReview [], fullyMastered true, next 5
lesson_attempts: 1 row, COMPLETED, budgetExhaustions 0, teachingAttempts 1
re-entry: D-0a "You've already finished… You mastered: …", still 1 row,
          completedAt unchanged
```

**14/14 chain checks behave as in physics.** Closed by MASTERY, not budget.
No duplicate attempt on re-entry. Completion message names the mastered concept.

**Both open findings reproduce here, confirming they are subject-independent
and systemic rather than physics quirks:**
- FINDING C — `durationSeconds: 1` again, for a full worked lesson.
- FINDING D — `topic_progress` reads `IN_PROGRESS 65% att=5` while the attempt
  says `fullyMastered`.

No new defect and no new owner decision. **S9 mastery closure is now
live-verified for BOTH subjects.**

---

## S6 — offline semantic audit of the 16 DRAFT visual assets (2026-08-16)

Read-only. No asset promoted, no production write, no runtime change.
All 16 are `AI_AUTHORED`, `familyKind: concept_figure`, `gradeBand: ADULT`, and
all carry a non-empty `a11yDescription` (ADR 12 requirement met).

**Zero conflicts with authoritative content**: not one of the 15 distinct
concepts holds an ACTIVE visual, so promoting any of these could not violate the
one-ACTIVE-per-`canonicalSlug` rule.

**Instrument correction (recorded, since it nearly produced a false finding).**
A first pass reported every graph as having no `series` and every number_line no
`min`/`max`. That was my SQL guessing field names. The real schema
(`visualSpec.ts:54,83`) uses `equation` + `xLabel`/`yLabel` for graphs and
`start`/`end`/`highlight` for number lines. Re-measured against the real fields
before drawing any conclusion.

### Dispositions

| concept | verdict |
|---|---|
| `chem.thermo.gibbs` | **REVISE — do not promote.** `equation: "H - T*S"` contains no `x`; the renderer plots f(x), so this cannot vary or compile. Title promises "Gibbs Free Energy vs. Temperature"; the spec cannot draw it. |
| `phys.rel.time-dilation` | **REVISE — do not promote.** `xLabel`/`yLabel` MISSING. `visualSpec.ts:62` records the measured learner-facing defect this exists to prevent (a graph narrated with axis names that were not on screen), and `validateGeneratedFigure` REQUIRES labels of a generated graph. |
| `eng.phonetics.intonation-patterns` (×2) | **DE-DUPLICATE.** Two drafts, same concept, both `sin(x)`. "Pitch Contour of a Statement vs. Question" is strictly the more teachable; "Pitch Contour of an Utterance" is the weaker sibling. |
| `phys.mech.work-energy-theorem` | **REVISE.** Title says "Net Work vs Kinetic Energy"; axes are Displacement [m] vs Energy [J]. Coherent figure, mismatched promise. |
| `phys.meas.errors` and `topic:77646280409e3c0c` | **DUPLICATE across identities** — byte-identical spec (`start 9.5, end 10.5, 2 highlights`). One is the KG concept, one the runtime-topic hash of the same subject. |
| `chem.equil.kw-ph`, `chem.found.states-of-matter`, `chem.bond.ionic-bonding`, `phys.mod.radioactive-decay`, `phys.wave.doppler-effect`, `phys.em.electric-field` | **PROMOTABLE on semantics** — spec well-formed, type fits the concept, labels present. (`chem.bond.ionic-bonding` draws the Born-Haber cycle: correct, but a notably advanced framing for a foundational bonding concept — a level call, not an error.) |
| `topic:5c4a5b24…`, `topic:75f44540…`, `topic:cc25d3d3…` | **KEEP DRAFT.** Keyed to runtime-topic hashes, not KG ids, so they can only ever serve the same off-curriculum phrasing that produced them. |

### Findings

- **No runtime defect. Classification C/D.** The two unpromotable specs are
  content quality, and the system is already handling them correctly: they sit
  in DRAFT, and the APPROVED tier re-validates through `validateGeneratedFigure`
  at serve time, so even an erroneous promotion of the time-dilation graph would
  be rejected rather than shown. The review gate is doing its job.
- **Curriculum-adjacent observation (F), not acted on.**
  `topic:cc25d3d3…` is "Steps in Dimensional Analysis", while the KG concept
  `phys.meas.dimensions` carries a cached DECLINE served 31 times. The same
  subject matter is refused on the curriculum path and drawn on the
  runtime-topic path, because the two are judged against different grounding
  text (KG title+description vs the learner's own words). Consistent with the
  engine's design; recorded because the learner-visible consequence is that
  asking off-curriculum is the only way to get that figure.

**S6 remains RENDERED: NOT MEASURED** — Chromium still cannot reach HTTPS from
this sandbox. Nothing here is browser evidence.

---

## S9 — lesson completion by GENUINE MASTERY (2026-08-16, live-verified)

First time in this campaign a concept was driven to real mastery on a real
account. Fresh lesson: physics 2, `phys.meas.scalars-vectors` (no prior attempt
row). Played as a weak learner; five server-graded MCQ answers, no guiding.

Ladder walked exactly as `masteryLadderReachability.test.ts` predicts:
`OBSERVE →(correct) DEMONSTRATE →(teaching give) GUIDE →(correct) CHECK
→(correct) checkCorrect 1 / PRACTICE →(correct) practiceCorrect 1
→(correct) practiceCorrect 2 / TRANSFER`.

| # | check | result |
|---|---|---|
| 1 | mastered concept closes correctly | **PASS** — `budgetExhaustions: 0`, closed by mastery not budget |
| 2 | counters/evidence persisted | **PASS** — `verified: true`, TRANSFER, check 1 / practice 2; `topic_progress` attempts 7, marker set |
| 3 | attempt duration/state correct | **FAIL** — see FINDING C |
| 4 | completion message matches mastery | **PASS** — "You mastered: Scalar and Vector Quantities" (contrast the zero-mastery close, which names nothing) |
| 5 | D-0a agrees post-completion | **PASS** — "You've already finished… You mastered: …", the `alreadyFinished` variant |
| 6 | re-entry creates no duplicate attempt | **PASS** — still 1 row, `completedAt` unchanged |
| 7 | correct next action | **PASS** — `nextLessonOrder: 3`, `fullyMastered: true` |
| 8 | message vs persisted history consistent | **MISMATCH** — see FINDING D |

Payload: `mastered: ["phys.meas.scalars-vectors"]`, `needsReview: []`,
`fullyMastered: true`. Attempt row: 1, COMPLETED, `teachingAttempts: 1`.

### FINDING C — **RESOLVED 2026-08-16** (owner-approved, `8dfe689`, live-verified)

Fixed by opening the attempt at genuine lesson start. `lesson-init` already
opened one for `restart|review` on a COMPLETED lesson; it now also opens one when
**no attempt exists at all**. The chat route needed no change — `openLessonAttempt`
reuses an existing IN_PROGRESS row, so the outcome block finalises THAT row.

The duplicate-attempt invariant is preserved because the only new case is
`latest === null`: IN_PROGRESS is left alone, COMPLETED is still reopened ONLY
for restart/review, so a completed attempt is never reopened or replaced by
chat, resume or D-0a.

**LIVE-VERIFIED** on `dpl_EJph4bEqDZVtrZY1mBE21fzLWr3D`, fresh physics lesson 7
(`phys.meas.vector-products`), driven to genuine mastery with real elapsed time:

```
attempt opened at lesson start   20:56:42.847  (IN_PROGRESS — this never existed before)
completed at                     21:00:07.006
durationSeconds                  204           (was 1; wall clock 3m24s — exact)
rows                             1             (0 IN_PROGRESS left)
mastered                         [phys.meas.vector-products], fullyMastered true
re-entry via chat                D-0a close, no new row
re-entry via lesson-init resume  no new row
```

The completion card renders `max(1, round(204/60))` = **3 min** instead of the
old "1 min". Historical 1-second rows were deliberately left untouched — no
migration, no repair.

Regression: `lessonAttemptOpensAtLessonStart.test.ts` (12 tests, edge cases
A–J). `completedLessonIsReEnterable.test.ts` matched the warn string by literal
and that string was renamed ("re-open" no longer covers every case); the matcher
was updated with the reason recorded and its assertion left unchanged.

### FINDING C — as originally recorded (classification A, fix architectural)

The attempt above records `startedAt 18:56:34.618`, `completedAt 18:56:35.275`,
`durationSeconds: 1` — for a concept the learner actually worked for ~12
minutes.

**Learner-visible**, not internal bookkeeping: `LessonScreen.tsx:4914` renders
`Math.max(1, Math.round(durationSeconds / 60))` + `t('lc_min')` on the
completion card, so a normally-completed lesson tells the learner it took
**1 min**.

Root cause: `openLessonAttempt` is called from the chat route's outcome block,
which only runs when a concept CLOSES. The row is therefore created and
finalised in the same turn and `startedAt ≈ completedAt`. The one historical row
with a real duration (2621s, physics lesson:1) got it because `lesson-init`'s
`restart|review` path had opened the attempt earlier — the only path that opens
one in advance.

**Not patched — the fix is an architectural choice, and both options have a
cost:**
- Open the attempt when the lesson opens (lesson-init, all modes). Restores the
  field's meaning, but creates IN_PROGRESS rows for every opened-and-abandoned
  lesson, reshaping a ledger whose lifecycle was only just stabilised.
- Derive the duration at finalisation from the first message carrying this
  `lessonKey`. No new rows and no lifecycle change, but it makes something other
  than `startedAt` the authority on when the attempt began.

Owner/architect call. Severity is low (a wrong number on a card, no teaching
decision reads it) but it is genuinely wrong, so it is recorded as a defect
rather than a nitpick.

### FINDING D — the two stores disagree about mastery. **Classification: D (intended)**

For the same concept at the same moment:

```
lesson_attempts   conceptsMastered: [phys.meas.scalars-vectors], fullyMastered: true
topic_progress    status: IN_PROGRESS, masteryPct: 65
```

Both are deliberate. `topic_progress` is written by the SIGNAL checkpoint, which
"deliberately NEVER writes COMPLETED/MASTERED and never exceeds 65 —
conversational evidence alone must not certify mastery". The attempt ledger
certifies from the ladder's server-graded MCQ counters, which is stronger
evidence than the checkpoint path was designed around.

No code change. Recorded because the learner is told "You mastered X" while the
per-topic ledger still reads 65% IN_PROGRESS, and any future dashboard or
review-scheduler reading `topic_progress` will disagree with the completion
card. Whether the two should be reconciled is a product question, not a bug.

---

## Chemistry S7 batch — real-tutor behaviour on a fresh concept (2026-08-16)

Real test account, played as a genuinely weak learner on **chemistry lesson 3,
`chem.found.pure-substances`** — chosen because it had no `lesson_attempts` row
and no `topic_progress` row, so nothing was inherited. Production baseline
before the session: 2 ACTIVE probes, 2 ACTIVE explanations, **no cached
figure**.

| # | checked | result |
|---|---|---|
| 1 | lesson switching / `activeLessonSlug` | switched and persisted |
| 2 | opening teaching + anchoring | tap water vs distilled water, before any definition |
| 3 | confusion detection | "i dont know" → `recoveryKey: dont_know`, D0-RECOVERY-PREEMPT |
| 4 | diagnosis → repair | see FINDING B below |
| 5 | structured MCQ generation | `[gate-assessment] probeFound:true converted:true` from the seeded asset |
| 6 | deterministic grading | `[mcq-grade] chosen: null, correct: null` on a non-answer — correctly not scored |
| 7 | wrong-answer handling | corrected without marking the learner wrong |
| 8 | correct-answer handling | covered in the physics batch (create + increment) |
| 9 | `topic_progress` persistence | no write on ungraded turns — correct |
| 10 | ladder transitions | OBSERVE held while ungraded; advanced only on a graded signal |
| 11 | attempt lifecycle | no attempt row (concept not closed) — correct |
| 12 | visual selection/ownership | **DEFECT — see FINDING A** |
| 13 | lesson completion | not reached this batch |

Best single behaviour observed: to "i dont know" the tutor answered *"of course
— I haven't shown you the definition yet, so there is no way you could have
known!"* — the register the Recovery Engine specifies, taking the blame itself.

Also confirmed live: **provider=memory** served a seeded Explanation Memory
asset (`D1-MEMORY-HIT`, 2 asset ids, no model call). S8-seeded content is
genuinely reaching learners, not just sitting in the database.

### FINDING A — a lesson's own figure survived a lesson change (FIXED)

Reproduced, root-caused, fixed, regression-guarded — commit `f1cad37`.

The learner left `chem.found.states-of-matter` for
`chem.found.pure-substances`, and the States-of-Matter process flow stayed on
screen for **every** turn of the new lesson:

```
[visual-v2] concept: 'chem.found.states-of-matter'
            provenance: 'generated:chem.found.states-of-matter:cached'
            continuity: 'continuity'
RESPONSE    resolvedConceptId=chem.found.pure-substances
```

All three payload fields plus the log were inspected, per the visual rule.
Cause: `decideContinuity`'s lesson-changed guard required
`session.returnToConceptId`. That anchor is set **only** when a figure is
introduced for a concept that is not the lesson's own — i.e. for excursion
figures — so a plain LESSON figure has none, the guard could not fire, and the
turn fell to the catch-all hold meant for follow-ups and corrections.

Learner impact is real: the tutor narrates whatever is on screen (observed
earlier this campaign: *"Let's look at the figure on your screen showing…"*), so
the previous lesson's figure gets explained as though it depicts the new one.

Fix: compare the anchor by VALUE, not existence — release when the lesson
concept is neither the figure's concept nor its return anchor. Excursions are
byte-identical: anchored-to-current-lesson still holds, lesson-changed-underneath
still releases, and a figure the lesson has just moved ONTO is still kept.
Guard: `visualLessonFigureSurvivesLessonChange.test.ts` (8 tests), including the
answer-shaped turn, since that hold sits below this guard and previously won.

**LIVE-VERIFIED** on deployment `dpl_8a7NBDaAAmeEZWksGrq1xekv9ySr` (`f1cad37`,
READY and aliased). The original scenario was reproduced exactly — return to
`chem.found.states-of-matter` until its figure is on screen (confirmed:
`visualSpec` process_flow delivered, `continuity: no-active-session`), switch to
`chem.found.pure-substances`, then take an answer-shaped turn ("i dont know"):

```
BEFORE (18:07)  concept: chem.found.states-of-matter   continuity: 'continuity'
                provenance: generated:chem.found.states-of-matter:cached
                graphical: true,  renderer: 'spec'

AFTER  (18:22)  concept: chem.found.pure-substances    continuity: 'lesson-changed'
                provenance: no-figure:declined-cached
                graphical: false, renderer: 'none'
```

All three payload fields (`visual`, `sceneSpec`, `visualSpec`) were empty on the
AFTER turn. The stale figure is released and the engine correctly declines
rather than inventing one for the new concept.

**Correct behaviour seen in the same session**, worth recording so the engine is
not misjudged: on an explicit "can you show me a diagram of this" the resolver
returned to the lesson concept and declined honestly —
`concept: chem.found.pure-substances`,
`provenance: no-figure:engine-no-suitable-form`,
`continuity: visual-request-returns-to-lesson`. That path was already right.

### FINDING B — INVESTIGATED 2026-08-16: **E (mixed), dominated by F (intended)** — NOT a defect

Reproduced live and traced end to end. **Not patched**, because the only way to
close it changes a deliberate design stance — see the decision at the end.

**Reproduction (live, real account).** On `chem.found.pure-substances` the
learner asserted a textbook conflation: *"so salt water is a compound because
the salt and water are chemically joined"*. The tutor diagnosed and repaired it
in prose — *"that is a really common place to get tripped up—let me show you why
salt water is actually a mixture, not a compound… if you boil away the water you
get the original salt back entirely unchanged"* — and the turn recorded nothing:

```
llmUsed: true, explanationMemoryServes: 0     <- NOT a memory-served turn
[ladder] signalTag: false, correctness: null
misconceptionCandidates: []
mistake_records: no row written
```

**This eliminates (C).** The first observation happened on a memory-served turn,
so Explanation Memory precedence was the obvious suspect. It reproduces on a
plain LLM turn with no memory hit, so precedence is not the cause. It also
eliminates (B) — nothing was computed and discarded — and (D), since no asset
served on the reproduction turn.

**Root cause — three independent gates, each deliberate:**

1. `detectMisconceptions` (`misconceptionEngine.ts:767`) is a **historical
   aggregator**: it queries `mistake_records` and `learning_checkpoints` over a
   30/14-day window. It cannot see the current utterance, so
   `misconceptionCandidates: []` is CORRECT output, not a failure. This is why
   (A) is the wrong diagnosis.
2. The only live writer of misconception evidence is route.ts's
   `signal_confident_wrong` branch, gated on
   `correctness === false && confidence === 'high'`. Hesitant-wrong deliberately
   writes nothing ("fast = misconception, hedged = guess") — confirmed in
   production: the physics MCQ answered wrong hesitantly produced only a
   `recovery_signal`, while a confident-wrong answer on
   `chem.found.states-of-matter` DID write `signal_confident_wrong`. **The
   recording machinery works.**
3. `teachingSignal` exists only if the model emits `<!--SIGNAL-->`, and
   `buildSignalInstruction()` (`signals.ts:85`) restricts it to "the student's
   LAST message contained an answer or attempt at a task you set", explicitly
   excluding greetings, questions and small talk — "no fabricated evidence".

So misconception evidence has exactly **one** entry point (a graded, confident
wrong answer), while learners express misconceptions in free prose. The
decision engine even has a misconception-preempt rule
(`decisionEngine.ts:260`, `HIGH` candidate), but its input can only be populated
by a prior recorded mistake — so a first-time conversational misconception can
never trigger it.

**Scope: general**, not chemistry and not one misconception family. Every gate
above is in shared code (`signals.ts`, `route.ts`, `misconceptionEngine.ts`);
no subject-specific branch is involved. A second-subject sample was not run
because the code path proof is stronger than another anecdote.

**OWNER/PRODUCT DECISION — not patched.** Closing this needs a live free-text
misconception classifier feeding the same evidence tables. That would:
- overturn the explicit "no fabricated evidence" stance in the signal contract,
- introduce false-positive misconception records, which then drive
  MISCONCEPTION_REPAIR at learners who never held the misconception, and
- widen what counts as evidence for the mastery ledger.

Loosening the SIGNAL contract to fire on non-answers is exactly the
"force every suspicious message through a generic repair path" fix that must
not be applied. The honest summary is that the tutor **teaches** these
misconceptions well and **remembers** none of them.

### FINDING B — as originally recorded

The learner said *"so a mixture is when two things are chemically joined
together right"* — a textbook mixture/compound conflation. That turn:

```
misconceptionCandidates: []
decision: SERVE_EXPLANATION_MEMORY (D1-MEMORY-HIT)
```

The canned explanation served is good and on-topic, but it never names the
learner's error. No `MistakeRecord` was written, so nothing routes to
MISCONCEPTION_REPAIR on the following turn. Not fixed here: it spans the
misconception engine's detection surface and the precedence between
D1-MEMORY-HIT and repair, which is a bigger design question than this batch —
recorded for its own bounded investigation.

### Budget-exhaustion finding from the previous batch — CLASSIFIED: **D (MIXED)**

Investigated only far enough to classify, as instructed. Evidence: the closing
row carries `teachingAttempts: 1`, so `attemptsUsed = 1` and the
`MAX_TEACHING_ATTEMPTS` route did not fire — it closed on the **12-turn**
`CONCEPT_TURN_BUDGET`, exactly as specified ("introduction, explanation,
example, MCQ, one recovery explanation, one recovery MCQ, then move on…
deliberately generous but finite").

- **NOT (B) a runtime defect.** Nothing was lost or mis-recorded: the ladder
  advanced correctly, the evidence persisted, the counters were right, and one
  attempt row was written, not several.
- **(A) intended strict behaviour**, and deliberately so:
  `evaluateConceptBudget` checks mastery FIRST precisely to stop "a
  slow-but-successful learner from being marked for review on the turn they
  succeed" — but that carve-out covers only FULL mastery
  (`correctAtPractice >= 2` or phase TRANSFER).
- **(C) the open half is policy**: whether that carve-out should extend to a
  learner who is demonstrably improving — this learner had just advanced
  GUIDE → CHECK on a correct answer — is a teaching decision. Extending it
  changes when a concept closes (P6).

**OWNER/PRODUCT DECISION. Not patched.**

---

## S6/S9 batch — served figures audited, physics runtime end-to-end (2026-08-16)

### S6 — what production ACTUALLY serves as a figure

Measured read-only from `visualization_cache` (58 rows): **25 served figures**
(`scene:v1:fig:*`), 19 cached declines, 14 cached verdicts. Alongside:
10 ACTIVE VISUAL assets over 10 concepts, 16 DRAFT, 199
`visual_generation_outcome` rows.

Every one of the 25 was checked title-against-concept. All read as
semantically honest — e.g. `chem.equil.kw-ph` → "The pH Scale at 25°C"
(number_line), `phys.rel.time-dilation` → "Lorentz Factor vs. Velocity (v/c)"
(graph), `chem.found.states-of-matter` → "Interconversion of States of Matter"
(process_flow), `eng.phonetics.intonation-patterns` → "Pitch Contour of a
Statement vs. Question" (graph). No mislabelled or off-concept figure found on
this surface.

**S6 remains NOT MEASURED in the rendered sense** and this does not change it:
Chromium still cannot reach HTTPS from the sandbox (re-tested this session:
`ERR_PROXY_CONNECTION_FAILED` via proxy, `ERR_CONNECTION_RESET` direct, even to
`example.com`). This is production-data evidence about figure SEMANTICS, not
browser evidence about rendering.

**Three suspicious signals investigated, all correct by design** — recorded
because each looked like a defect and was not:

1. One turn logged `representation: labelled_figure`, `renderer: spec` and
   delivered `visualSpec.type: process_flow` — three different names. Not a
   disagreement: all three come from the same `decision` object, and
   `labelled_figure` is the default classification for a generated figure
   (`resolveVisual.ts:990`).
2. Two served rows carry a title but no top-level `type`
   (`phys.em.electric-field`, served 5×; one runtime topic). `classifyFigure`
   handles both payload generations explicitly — `steps` without `type` is a
   scene. The `type`-less shape is older, not broken. My SQL was the imprecise
   instrument.
3. `phys.meas.units` has a cached DECLINE served 52 times — the entry lesson of
   physics, never getting a figure. That is the documented "a list is not a
   process" rule: the seven SI base units are a list, and the engine is
   supposed to decline rather than bend it into a `process_flow`.

### S9 — physics end-to-end on a fresh lesson (live-verified)

Real test account, played as a struggling beginner on
**lesson 5, `phys.meas.significant-figures`** — chosen because it had no prior
attempt row, so nothing was inherited. Full chain observed live:

| step | evidence |
|---|---|
| lesson switch | `activeLessonSlug` → `phys.meas.significant-figures`, persisted |
| teaching | concrete anchor (jeweller's vs bathroom scale) before the term |
| wrong answer | "the whole seconds one because its simpler" — corrected, not marked harshly |
| confusion | "i dont understand which digits are the real ones" — answered, no drilling |
| probe | structured MCQ served, "45.2 cm" → `correctIndex 2` (3 s.f.), correct |
| wrong MCQ | graded server-side → `topic_progress` CREATED, attempts 1, score 25 |
| correct MCQ | "0.0042 g" → 2 s.f., answered A → attempts 1→2 **exactly**, score 65 |
| marker | joined to `messages`: a real USER row containing "A" |
| ladder | OBSERVE → DEMONSTRATE on the correct answer, counters still 0 — per contract |
| attempt ledger | **no** `lesson:5` attempt row (concept not closed) — correct |

This also live-exercises the **CREATE branch** of the idempotent applier, which
until now had only been proven offline: the wrong answer created the row, the
correct answer updated it, one increment each, marker advancing both times.

### NEW FINDING — a lesson closed by budget exhaustion on an improving turn

Not changed; recorded. On the chemistry turn at 17:34 the learner answered a
structured MCQ correctly, the evidence was applied (65), and the ladder
advanced `GUIDE → CHECK`. On that **same** turn the concept's turn budget
expired, so `lesson:2` was opened, folded and finalised: `status COMPLETED`,
`conceptsMastered: []`, `conceptsNeedingReview: [chem.found.states-of-matter]`.
The learner reached the CHECK rung and was closed out of the lesson in the same
breath — and D-0a then locks the lesson to the canned close.

The attempt row itself is correct (one row, first close, no duplicate — the
lifecycle fix holding). What is questionable is the pedagogy: budget exhaustion
fires on evidence of improvement rather than of stalling. Changing it means
changing what "a concept closes" means (P6), which is a product decision of the
same family as the completion-message items already reserved for the owner.

---

## Evidence idempotency — the P1008 fix (2026-08-16, commit `f70c3a4`)

**Idempotent first, retried second.** The order matters and is the whole point:
a socket timeout never reports whether the statement committed, so wrapping the
old blind `attempts: { increment: 1 }` in `withRetry` would have traded a lost
increment for a double one. Corrupting the ledger in the other direction is not
a fix.

**Identity — existing, not invented.** The learner's own `Message` row id. It is
already database-generated and already stable across every retry of that turn,
so no second source of truth appears. It is stamped on the `TopicProgress` row
it guards (`lastEvidenceMessageId`), so the marker and the counter it protects
commit in the SAME row write and cannot drift apart.

**Enforced by the database, not an in-memory flag.** One statement:

```sql
UPDATE topic_progress
   SET attempts = attempts + 1, masteryPct = $score, lastScore = $score,
       status = 'IN_PROGRESS', "lastEvidenceMessageId" = $event
 WHERE (userId, subjectSlug, topicSlug) = (...)
   AND status NOT IN ('MASTERED','COMPLETED')
   AND ("lastEvidenceMessageId" IS NULL OR "lastEvidenceMessageId" <> $event)
```

The guard and the increment are evaluated under the row lock, so a concurrent
duplicate serialises behind it, re-reads the stamped marker and matches zero
rows. There is no read-then-write window left to lose.

Two details that would have been silent bugs:

- The `IS NULL` arm is **required**. SQL's `NULL <> 'x'` is NULL, not true, so a
  bare `<>` would have skipped every row written before this column existed —
  i.e. all 146 of them.
- The MASTERED/COMPLETED guard moved **into** the same WHERE. It used to be a
  separate `findUnique` followed by an upsert, which was its own race.

**Semantics preserved exactly.** Same 65/25 scores, still never writes
MASTERED/COMPLETED, no threshold, phase, counter meaning or mastery rule
touched. The ladder is not involved. Failures now log
`[topic-progress-evidence] FAILED after retries` instead of `.catch(() => {})`.

**Migration** `20260816180000_topic_progress_evidence_idempotency` — additive,
nullable, `ADD COLUMN IF NOT EXISTS`. **Production-verified**: column present,
`_prisma_migrations` row `finished_at` set. **No historical repair**: 146 rows,
0 carrying a marker, `sum(attempts)` 146 — unchanged by the migration.

**LIVE-VERIFIED** on the real test account, deployment
`dpl_8y8tLnRT4is6p1TaKs8rqjkRPrEe` (commit `f70c3a4`), played as a weak learner
on `chem.found.states-of-matter`. One structured MCQ, answered correctly once:

```
[mcq-grade]                chosen: 1, correct: true       <- graded server-side
[ladder]                   signalTag:true correctness:true
                           GUIDE -> CHECK
[topic-progress-evidence]  event: 'cmsw33inq000jk3045auc7akd'
                           score: 65, outcome: 'applied'  <- the new code path
```

`topic_progress` before → after:

```
attempts 1 -> 2      masteryPct 25 -> 65     lastScore 25 -> 65
lastEvidenceMessageId  NULL -> cmsw33inq000jk3045auc7akd
updatedAt  15:34:24 -> 17:34:11
```

Exactly one increment for one answer. The marker was confirmed against the
`messages` table to be the learner's own USER row (`content: "B"`,
17:33:56) — the identity is genuinely the learner's utterance, not a
synthesised key.

Two negative controls fell out of the same session, both correct: a PROSE
question answered "C" produced no `[mcq-grade]`, no signal, and **no write at
all** (`completionSuppressed: true` — the prose-MCQ guard refusing to record
ungraded correctness), and the ladder moved `GUIDE -> CHECK` while
`checkCorrect` stayed 0, exactly as `masteryLadderReachability.test.ts`
predicts.

**Evidence states, kept separate:** repo-fixed `f70c3a4` · deployed
`dpl_8y8t…` READY · production-verified (migration applied, 146 rows untouched)
· live-verified (the run above).

**Regression** — `src/tests/topicProgressEvidenceIdempotency.test.ts`, 11 tests,
each asserting `attempts` advanced by exactly one: normal success (existing row
and first create), pre-commit failure + retry, post-commit timeout + retry (the
committed-but-unreported case), five repeated retries, concurrent duplicates on
both the update and the create race. Plus the semantics guards: a genuinely
different event still increments, a certified concept stays locked and is never
overwritten, a NULL marker counts as unapplied, and a non-unique error
propagates rather than being swallowed.

---

### Superseded — the original S9 finding as first recorded

The core S9 criterion ("a real learner reaches it and can achieve/close mastery
correctly") was measured live for the first time, on
`chem.found.states-of-matter`. It does **not** currently hold.

**MEASURED — not inferred.** The learner asked for practice, received a
genuinely structured MCQ (`mcq` field present — the server-owned gradeable
path, i.e. an S8-seeded probe reaching a real learner), and answered it
correctly ("C"). The tutor replied "Spot on". Then:

```
response.mastery  {"verified":false,"phase":"GUIDE","checkCorrect":0,
                   "practiceCorrect":0,"checkRequired":1,"practiceRequired":2,
                   "completionSuppressed":false,"gatePending":false}

topic_progress    chem.found.states-of-matter  IN_PROGRESS  masteryPct 25
                  updatedAt 15:34:24  <- the earlier WRONG-answer turn
lesson_attempts   (no row at all for this chemistry lesson)
```

So the WRONG answer was recorded (25%, `signal_confident_wrong`) and the RIGHT
answer recorded nothing. `checkCorrect` and `practiceCorrect` are still 0
against a gate needing 1 and 2 — the counters never moved, so this gate cannot
close by mastery no matter how many questions the learner gets right.

This is consistent with the whole account's history: every `lesson_attempts`
row has `conceptsMastered: []` except one (`lesson:92`). Physics `lesson:1` ran
a genuine **2621 seconds** and still closed with `mastered: []` — by budget
exhaustion, not mastery. Closure by exhaustion appears to be the normal path in
production, and closure by mastery the exception.

**Traced, but NOT confirmed — do not act on this without proving it.**
`correctAtCheck` increments only in `conversationState.ts:638`, and only when
`prev.phase === 'CHECK'`. The session is stuck at `GUIDE`, which advances only
on `if (next.demonstrated) next.phase = 'CHECK'`. `demonstrated` is set at
:459 from `deliveredAGive = !degradedTurn && (!askedQuestion ||
deliveredTeaching === true)` — so a turn that is *purely a question*, which is
exactly what the MCQ turn is, may deliver no "give" and leave `demonstrated`
false. A physics `[ladder]` log in the same session also shows a phase moving
BACKWARDS (`phaseBefore: 'GUIDE'` → `phaseAfter: 'DEMONSTRATE'`), so
`phaseDown()` is active too and may be part of it.

Deliberately not fixed in this batch: this is the core teaching ladder, the
blast radius is every lesson, and strictness here is partly INTENDED (the moat's
own stance is to refuse hollow advancement). Distinguishing "correctly strict"
from "cannot ever close" needs its own bounded investigation with the ladder
logs turn-by-turn — not a patch written on top of a plausible-looking trace.

### NOT a defect, checked and dismissed

- `status=COMPLETED` alongside `summaryEvidence.complete=false` is **by
  design**: `closedConceptIds` counts budget-spent as closed (P6), and
  `summary.complete` means fully-mastered. Two different questions.
- D-0a preempting recovery on a closed lesson is **deliberate**, with a
  recorded production incident behind it (2026-08-02). Not reopened.

### STILL OPEN from this session

The close for a zero-mastery attempt says "finished — nice work" and points
only at "Start next lesson". Its own rule's rationale claims it "points them at
Review or the next lesson", and a Review path does exist (`lesson-init`
`mode=review|restart`), but the text never offers it. Not changed here: it is a
learner-facing copy + affordance decision, not a correctness bug, and it wants
an owner call rather than an audit's guess.

---

## S10 — regression protection

`scripts/moat/audit-production-seeding.ts` (read-only) compares authored-vs-
served per subject, importing `probeToMcq` so it measures what the tutor could
really serve. Exits 1 on a gap, so it can gate a post-deploy check. This closes
the blind spot that let S8 happen: the suite proves what is AUTHORED, the
runtime serves what is ACTIVE, and until now nothing compared them.

Two defects were found and fixed while writing it, both of which would have
made the audit report a false pass — recorded because they are the failure mode
this class of script is most prone to:

- A `as unknown as Row[]` cast masked a wrong relation name (`probe` vs the
  schema's `probeAsset`). The cast is gone; tsc now checks the query.
- The corpus omitted the chemistry/biology/CS arrays, so chemistry reported
  "0 authored, 0 missing" — a clean pass produced by looking at nothing. It is
  now composed exactly as `seed-knowledge-assets.ts:43` composes it.

---

## Verification honesty notes

- **Prose-MCQ guard (S7)**: commit `de1d29d` is an ancestor of `64a70d1`, which
  is READY in production — so it is **DEPLOYED**. Wiring verified in code at
  both the prompt-directive and evidence-suppression points, and the
  `orderBy: createdAt desc` ordering confirmed so `.find()` returns the most
  recent assistant message. It is **NOT production-verified**: production
  runtime logs show zero traffic in the retention window, so the
  `[prose-mcq-ungradeable]` marker has no session to fire on.
- **S6 / S9** remain NOT MEASURED. Both need live learner traffic, and there
  has been none in the observable window.

---

## S9 — progress-aware budget extension (owner-approved), live-verified

Commit `7f703c3`, deployment `dpl_CxXEqYp3oQxdYza6ednQSKt2em6N` (READY).
Implements Option B exactly as analysed: a learner sitting at
`CONCEPT_TURN_BUDGET` who is demonstrably converting gets **one** `+6`
extension (hard cap 18). The extension buys TURNS and never certification —
mastery stays `correctAtPractice >= 2 || phase TRANSFER`, from server-graded
evidence only.

### Premise correction, recorded because it weakens my own case

The analysis that motivated this said a weak learner burns budget on clarifying
questions. **That part was wrong, and measured to be wrong**: an active
excursion freezes the lesson ladder, and excursion turns do NOT increment
`turnsOnConcept` (observed: 6 turns on concept across 11 chat turns). The part
that survives is the one the policy actually rests on — the ladder needs five
server-graded correct answers plus a teaching give, and when the tutor does not
volunteer each question the learner spends a turn asking for it.

### LIVE TEST A — progressing learner (PASS)

`chem.found.mole-concept` (chemistry lesson 6), verified fresh beforehand:
0 attempts, 0 `topic_progress`, 2 ACTIVE probes. Driven with server-owned MCQs
and letter answers only, padded with bare acknowledgements, to avoid opening an
excursion (which would have frozen the very counter under test).

| assertion | result |
| --- | --- |
| extension granted exactly once | `budgetExtensionGranted` false → **true at turn 12**, still a single grant at turn 14 |
| all three conditions held at grant | `chk+prac = 2 ≥ 1`, `fails = 0`, phase `PRACTICE` |
| mastery still reachable | reached at turn 13 — `practiceCorrect 2`, phase `TRANSFER` |
| no artificial certification | mastery came from a server-graded MCQ (`correctIndex` owned by the server), not from the extension |
| `budgetExhaustions` | **0** |
| attempt rows for `lesson:6` | **exactly 1** |
| duration | **520 s** (real elapsed, not the 1-second artefact) |
| close | `conceptsMastered: ["chem.found.mole-concept"]`, `conceptsNeedingReview: []`, `fullyMastered: true` |

This is the direct A/B against the recorded `chem.found.states-of-matter` case:
mastery landed at turn 13, so **under the old policy this concept would have
closed at turn 12 as `needsReview` with `conceptsMastered: []`** — on a learner
who then proved mastery one turn later.

### LIVE TEST B — did NOT test what it was meant to, and found something else

Intent: a non-converting learner must still be capped at 12. Run on
`chem.found.stoichiometry` (lesson 7, verified fresh) with acknowledgements
only, never answering a graded MCQ. At turn 6 the profile was exactly right —
phase `CHECK` and `fails 0` both *qualifying*, `chk+prac = 0` the only
disqualifier, so the extension had to be refused.

It was not refused, because the counter moved. At turn 10 `correctAtCheck` went
0 → 1 and the extension was granted at turn 12. **The extension behaved
correctly given its inputs**; the inputs were wrong.

Note also the framing of the original Test B is unreachable as written: a purely
failing learner cannot be driven to turn 18, because `MAX_CONSECUTIVE_FAILURES`
(3) exhausts the budget first. The reachable and meaningful form of the test is
the one above — "a non-qualifying learner is still capped at 12" — and it
remains **NOT VERIFIED**, blocked on the defect below.

### FINDING — correctness accepted with NO question pending (class A, pre-existing)

Reproduced on the real account, `chem.found.stoichiometry`, 2026-08-17:

1. turn 8 — tutor asks a prose-only MCQ (`A)`/`B)` on their own lines).
2. turn 9 — learner says `hmm`. The prose-MCQ guard fires correctly here and
   correctness is suppressed. The tutor then **works through the answer itself**
   and states the conclusion.
3. turn 10 — learner says `i see`. The prior assistant message is now an
   explanation, not an options list, so `hasProseMultipleChoice()` is false and
   the guard does not fire. `pendingMcqHoisted` is also null. The model's
   `<!--SIGNAL--> correctness="true"` is accepted.

Result: `correctAtCheck` 0 → 1, the ladder advanced `CHECK` → `PRACTICE`, and
`topic_progress.chem.found.stoichiometry` was written to **65 %** — all from a
two-word acknowledgement of the tutor's own worked answer. The learner
demonstrated nothing.

Mechanism, read in `route.ts:3870`: the suppression condition is
`!pendingMcqHoisted && hasProseMultipleChoice(prior)`. The complementary case —
`!pendingMcqHoisted` **and no question of any kind was asked** — is entirely
ungoverned, and it is strictly *more* ungradeable than the prose-MCQ case the
guard was built for: there is not even a question to compare an answer against.

Classification **A, genuine runtime defect, PRE-EXISTING and independent of this
batch** — `qualifiesForBudgetExtension` only reads counters and cannot cause one
to increment. It is reported, not fixed: the approved plan for this batch says
to stop and report on an unexpected interaction with the ladder rather than
change policy, and this is one. Fixing it means deciding what counts as an
answerable turn, which is a ladder-wide evidence rule, not a patch.

Not repaired in production either: the two affected rows
(`chem.found.stoichiometry` at 65 %, and the `lesson:7` attempt left
IN_PROGRESS) are historical learner data on the test account, and repairing
historical production data needs explicit authorization.

### Regression guard

`src/tests/conceptBudgetExtension.test.ts` — 16 tests over the three approved
conditions, the grant-at-most-once property (including the fold, where
evaluating at the `turnsOnConcept` increment would have read a stale
`consecutiveFailures: 0` and granted on a failing turn), the 12-vs-18 cap in
both directions, and snapshot round-tripping with a no-migration default for
states written before the field existed.
