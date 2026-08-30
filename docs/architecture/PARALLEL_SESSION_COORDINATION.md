# Parallel session coordination

**Two Claude sessions work this repo at once.** They share one `main`, one
production database, one Vercel deployment and one QA account. This file is the
contract between them. **Both sessions edit it. Pull before you write, and keep
your edits inside your own section.**

---

## 1. Who owns what

Ownership is by FILE, not by intention — that is the only line that prevents a
merge conflict neither session can see coming.

### Session A — ENGINE (physics + chemistry teaching loop)

Owns, and is the only session that may edit:

    src/app/api/learn/**
    src/lib/teaching/conversationState.ts
    src/lib/teaching/gateAssessment.ts
    src/lib/teaching/masteryGate.ts
    src/lib/teaching/questionLegality.ts
    src/lib/teaching/turnArbitration.ts
    src/lib/teaching/turnDecision.ts
    src/lib/teaching/visual/**
    src/components/learn/**
    src/components/school/visuals/**

### Session B — CONTENT (probe inventory)

Owns, and is the only session that may edit:

    src/lib/teaching/assets/*SeedAssets.ts
    src/lib/teaching/assets/*BandGapAssets.ts
    scripts/assets/**
    docs/architecture/PROBE_INVENTORY_WORKLIST.*

### Shared — announce in section 4 before editing

    src/lib/teaching/assets/assetContract.ts   (the bar itself — changing it
                                                changes what "done" means)
    src/tests/**                               (add freely; before EDITING an
                                                existing test another session
                                                wrote, say so)
    CLAUDE.md                                  (append only, never rewrite)

**If you need a file you do not own, do not take it. Post in section 4 and wait.**

---

## 2. Shared resources — the two rules that matter

**QA account (`suaibamr@gmail.com`).** `POST /api/sessions` resumes any ACTIVE
session for an account from the last 24h. Two harness runs at once WILL read
each other's sessions and corrupt both. This is not theoretical — it is the
defect fixed in `ec7d595`, where one session's lessonOrder moved
203 -> 62 -> 188 -> 210 and the gate served probes from three other concepts.

    Only ONE session may run scripts/qa/strugglingLearnerHarness.ts at a time.
    Claim it in section 3 before starting. Release it when the run ends.

**Deploys.** Every push to `main` redeploys, and a redeploy mid-run means the
measurement straddles two builds. Before pushing APP CODE, check section 3 for
an active run. Docs, tests and scripts are always safe to push — they change no
served behaviour.

---

## 3. Run lock — claim before starting a harness run

| held by | subject | started (UTC) | expected | status |
|---|---|---|---|---|
| Session A | chemistry, 12 concepts, seed 7 | 2026-08-30 ~15:45 | ~90 min | RUNNING |

Release by setting status to DONE. Do not start a run while another row is
RUNNING.

---

## 4. Log — append, newest at the bottom

Format: `YYYY-MM-DD HH:MM UTC · Session X · what changed, and what it means for
the other session.`

    2026-08-30 16:10 UTC · Session A · Created this file. Engine work not yet
      started; blueprint at docs/architecture/TEACHING_QUALITY_BLUEPRINT.md.
      Chemistry baseline running (see section 3) — Session B, do not start a
      harness run until it releases.

---

## 5. Shared facts — measured, not assumed

Anything here was measured against production or a captured run. **Correct it
if you re-measure and get something different, and say so in the log.** Three of
this programme's founding premises and four confident hypotheses were falsified
by checking; assume the same will happen again.

| Fact | Value | Source |
|---|---|---|
| Physics KG / Chemistry KG | 238 / 186 concepts | `docs/*/kg/graph.json` |
| Asset contract, physics | 261/261 (concept, band) pairs meet it | production |
| Asset contract, chemistry | 186/186 pairs meet it | production |
| Pairs holding EXACTLY 3 probes | **209** (phys 123, chem 86) | production |
| Questions the tutor asks that are gradeable | **22%** (79 of 362) | 56-session run |
| Correct answers to keyed probes that earn credit | **54%** | two runs |
| Verified mastery, physics | 78% (was 81% before three engine fixes) | 56-session run |
| Verified mastery, chemistry | measuring | — |
| Hand-rated teaching quality, physics | **5.8/10** (10 random transcripts) | hand audit |
| Registry visual bindings | phys 78/238, chem 13/186 | `visualRegistry.ts` |

**Two numbers that look like the same thing and are not.** "78% mastery" comes
from a harness replaying seven canned lines and watching a counter. "5.8/10"
comes from reading transcripts. They disagree because the harness cannot see a
tutor refusing to confirm a correct answer. Do not quote the first as evidence
of teaching quality.

---

## 6. Standing rules for both sessions

- Work on `main`. Never force-push. Never skip tests. No PR unless asked.
- **Measure before acting.** Three founding premises of this programme were
  false, and four confident hypotheses were falsified the same day.
- **Report numbers that go the wrong way as prominently as ones that go the
  right way.** Three engine fixes shipped on 2026-08-30 moved their own targets
  and left mastery flat; that is in the record because it has to be.
- Never claim something works without verifying it against the real deployed
  app.
- When a test you did not write fails, read it before changing it. Several
  encode measured production incidents and are right when your change is wrong.
