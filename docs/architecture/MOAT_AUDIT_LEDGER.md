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
| S6 | visual semantic (live) | — | — | NOT MEASURED |
| S7 | real-tutor behaviour | live session run; 1 defect found + fixed | — | IN PROGRESS |
| S8 | production seeding | **238/238 served** | 186/186 served | **CLOSED (re-verified 2026-08-16)** |
| S9 | end-user runtime | live learner session run (HTTP, no browser) | — | IN PROGRESS |
| S10 | regression protection | offline pinned + prod audit script | same | ONGOING |

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
