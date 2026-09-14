# My Tutor — Remediation Plan

**Status:** proposal. Nothing here is approved, scheduled, or implemented.
**Written:** 2026-09-14. **Author:** engineering session `session_013fy8QoeuD6oGukoSFjGif3`.
**Baseline:** commit `2bcc573`, deployment `dpl_BnW8Za7erUYRiPKuKS2fv5FBtJ18` (READY).

This is the answer to one question: *if the whole tutor were mine to fix, what
would I do, in what order, and what would it cost?*

Every number below was **measured during this session** against the live
production database or the real modules. Where a number contradicts a figure
recorded elsewhere in `CLAUDE.md`, the contradiction is called out explicitly
rather than quietly corrected — see §7. Do not trust any figure here without
re-running the query beside it; this document ages.

---

## 1. The diagnosis

The engine is not broken. It is **un-measurable**.

Every significant defect this repository has found was found by a *person
noticing*, and then took days to attribute to a decision:

| Defect | How it was found | Time to attribute |
|---|---|---|
| Evidence-identity split (counters vs verdict) | a learner saw 1/1, 2/2, `verified:false` | one full investigation |
| C7 verbatim explanation re-serve | reading 60 transcripts | one investigation + a diagnostic deploy |
| 50.8 GB egress overrun | a quota warning email | one forensic session |
| GUIDE stall / D4b | a 60-concept sweep | still not proven |
| 188 knowledge-exposure residues | an audit nobody asked for | one session |

That table is the product defect. Not any one row in it.

The runtime already emits a great deal — `[ladder]`, `[gate-eligibility]`,
`[gate-assessment]`, `[gate-contract]`, `[arbitration]`, `[turn-decision]`,
`[excursion]`, `BRAIN_EVENT`, `EXCURSION_EVENT` — and **none of it joins**.
Each line is a different shape, in a different place, about a different
subsystem, with no turn identifier tying them together. So the facts needed to
explain a bad lesson exist and cannot be assembled.

The second-order consequence is worse: because attribution is expensive,
every fix has been a *guard* — a narrow, locally-correct predicate added at the
point of pain. There are now **63 detector-shaped exported predicates and 60
regex constants**, `route.ts` is **10.5k lines**, and there are **73
prompt-append sites**. Each guard is individually right. Collectively they are
no longer analysable, which is exactly why the next defect will again be found
by a person noticing.

---

## 2. The plan, in priority order

### Item 1 — One turn record *(1–2 sessions)*

Every turn emits **one** structured record, with a turn id, carrying the facts
that decide the turn:

```
phase, move, arbitration owner, probe id (or the exact reason none),
grading provenance (serverGraded), both counter pairs (plain + verified),
unverifiedReason, withhold reasons, figure decision, provider
```

Constraints, non-negotiable:
- **Sampled**, ~1 KB per turn. Log volume only.
- **No database write.** The 5 GB Supabase egress quota was blown once already
  (see `CLAUDE.md`, 2026-08-31); an observability feature must not repeat it.
- **Reads only values the turn already computed.** No second calculation path,
  no recomputed verdict — the mistake the `[ladder]` line itself made until
  this session (it logged the plain counters and omitted the governing ones).

This is the highest leverage item in the document. It makes every later
estimate honest instead of guessed, and it is the only item that survives a
long pause without going stale.

**Partial precedent already shipped** (`9f295b6`, this session): `[ladder]`
now carries `verifiedCheck` / `verifiedPractice` / `serverGraded`, and the
mastery payload carries `verifiedCheckCorrect` / `verifiedPracticeCorrect` /
`unverifiedReason`. That is one line and one payload. Item 1 is the same idea
applied to the whole turn.

### Item 2 — Lesson outcome as the only KPI *(1 session of work, then blocked)*

Not test count. Not coverage. Not rubric means.

> Did a real learner reach verified mastery, and if not, **which decision**
> stopped them?

The code is about a day on top of Item 1. The *number* requires real learner
traffic, which this app does not currently have — Vercel runtime logs have
repeatedly shown zero organic requests. **I would not promise this item.** It
is listed because leaving it out would make the plan dishonest, not because I
can deliver it alone.

### Item 3 — Close the content inventory *(2–3 sessions — see §7, much smaller than previously recorded)*

Measured against production, 2026-09-14 (`ACTIVE`, `en`, gradeable = 2–4
choices, exactly one keyed correct, no duplicate option text):

| Subject | (concept, band) pairs | at contract (≥3) | below | gradeable probes needed |
|---|---|---|---|---|
| physics | 261 | **261** | 0 | 0 |
| chemistry | 186 | **186** | 0 | 0 |
| english | 335 | **333** | 2 | **6** |
| mathematics | 47 | **0** | 47 | **58** |

So the authoring gap is **64 probes**, not the twelve-to-fifteen sessions of
work recorded elsewhere. Mathematics is 11 pairs at one probe and 36 at two.

**But mathematics has a second, larger and different problem.** Only 47 maths
pairs have *any* serving assets, against 908 KG concepts and 257 authored
Educational Brain entries. A 6,030-asset maths corpus exists in git and is
unreachable: `BOOTSTRAP_SEED_SUBJECTS` includes `'mathematics'`, but **none of
the 31 mathematics asset modules is imported into the bootstrap corpus**, so
the cold-start seeder has nothing maths-shaped to write. That is a wiring
defect, not an authoring one, and it is worth more than the 64 probes.

Order: wire the maths modules into the corpus → re-measure → author only the
genuine residue.

### Item 4 — Four primitives, not a rewrite *(12–16 sessions)*

From `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md`, which
already did the audit and already refuted four of its own load-bearing claims:

1. **Typed Turn Contract** *(3–5)* — compiled before the model call, asserted
   after. Today the contract is ~40 `…Hoisted` locals plus ~20 post-hoc
   overrides, four of which are consecutive `mcqHoisted = null` statements
   inside 45 lines.
2. **Closed-taxonomy learner-move interpreter** *(3–4)* with a confidence gate
   and a first-class `UNINTERPRETABLE` class, replacing the six-detector
   aggregation in `readTurnIntent`.
3. **Deterministic verifier** *(2–3)* — dimensions first, then limiting cases,
   signs, magnitude. There is currently **no physics correctness checking
   anywhere in `src/`**, and `mathjs` sits in `package.json` imported by zero
   files.
4. **Durable per-concept learner state** *(3–4, the only item needing a
   migration)* — `ConceptMasteryRecord` and `ActiveMisconception` exist in the
   schema with **zero writers each**.

This is a migration, not a redesign. The repo has introduced five deterministic
authorities into a running system before (`conversationState`, `masteryGate`,
`gateAssessment`, `turnArbitration`, `turnProgress`), each in 2–4 sessions.

### Item 5 — Harness discipline *(folded into all of the above)*

Six harness defects have nearly condemned correct product behaviour, and 19 QA
drivers printed `correctAtCheck` — a field the payload has never carried — on
every turn of every run. Rule: **any measurement tool ships with a negative
control, or it is not evidence.** A harness that cannot fail on known-bad input
has not been tested.

---

## 3. What I would *not* do

- Rewrite the teaching architecture.
- Loosen the mastery gate to make a number look better.
- Add an LLM judge to the QA harness.
- Chase a defect I cannot reproduce. (D4b, this session: investigated, not
  reproduced, **reported as NOT PROVEN and left alone**.)
- Delete a guard test whose invariant survives. Update it in place, keeping the
  original assertion verbatim in a dated comment.

---

## 4. Cost

Sessions here are **context-bounded, not time-bounded**.

| | sessions |
|---|---|
| Item 1 — turn record | 1–2 |
| Item 2 — outcome KPI | 1, then blocked on traffic |
| Item 3 — content + maths seeding wiring | 2–3 |
| Item 4 — four primitives | 12–16 |
| Item 5 — harness discipline | folded in |
| **Total** | **~18–24** |
| **High-value subset (1 + 3)** | **~4–5** |

Basis, measured from this session: ~$120–180 and ~120k context tokens per
focused task (investigate → fix → test → deploy → verify). Anthropic meters
usage, not sessions, so a weekly budget is roughly **4–6 heavy / 8–12 normal /
15–25 light** sessions. Read the exact remaining quota with `/usage`; the API
exposes only the limit *status*, never the size.

At ~8 sessions/week: the full plan is **~3 weeks**, the high-value subset is
**under one week**.

---

## 5. Confidence

| Claim | Confidence |
|---|---|
| Make the tutor observable (Item 1) | ~95% |
| Close the content inventory (Item 3) | ~90% |
| Item 4 lands without regressions | ~75% |
| Lessons measurably improve for real learners | **~40%** |
| I find every remaining defect | ~10% |

The 40% is the one that matters and the one I am least sure of. It needs
traffic I do not have, and *"did this learner actually learn"* has no
deterministic test. I can prove a lesson **can** close. I cannot yet prove it
**taught well**. Anyone quoting a high number there is guessing.

---

## 6. If only one thing is done

**Item 1.** Then Item 3's maths wiring. In that order, and stop there until
there is traffic to measure against.

---

## 7. Corrections to previously recorded figures

Stated plainly because this document would otherwise repeat them.

1. **English is no longer the content gap.** `CLAUDE.md` records "english 214
   of 216 pairs hold exactly TWO gradeable probes while the subject is LIVE —
   no English lesson can close" (2026-08-31). Measured today: **333 of 335
   English pairs are at contract**, 214 of them at four probes. English was
   seeded in the interim and the note was never updated. Only 2 pairs remain,
   needing 6 probes.
2. **I repeated that stale figure earlier in this session**, in conversation,
   before querying. The query is the correction.
3. **Mathematics is the real gap, and it is mostly a wiring defect**, not an
   authoring one — 47 pairs seeded against 908 KG concepts, with 31 authored
   asset modules absent from the bootstrap corpus.
4. **Physics probe depth is confirmed, and pool depletion is not a defect.**
   Production reported `poolSize: 3` for two physics concepts while the
   database holds 5 and 4 convertible probes respectively — the already-asked
   ledger, working correctly, not an inventory shortfall.

---

## 8. Provenance

Measured this session: the four-subject contract table (§2 Item 3, direct SQL
against production), the per-pair maths/English shortfall, the
`BOOTSTRAP_SEED_SUBJECTS` / maths-module absence (source), the physics pool
figures (SQL + production `[gate-assessment]` logs), and the deployment/health
state. Estimated, not measured: every session count in §4 and every figure in
§5 — those are judgement, and are labelled as such.

Related, and not superseded by this document:
`EDUCATIONAL_BRAIN_BIBLE.md` · `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` ·
`PHYSICS_MASTERY_CEILING_ROOT_CAUSE.md` ·
`docs/qa/PHYSICS_CHEMISTRY_MASTER_DEFECT_BACKLOG.md`
