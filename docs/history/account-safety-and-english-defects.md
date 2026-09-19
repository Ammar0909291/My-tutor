# Account Safety Revocation & English Defect Campaign (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Account safety — suaibamr@gmail.com forbidden-account restriction REVOKED (2026-09-06)
- **Explicit owner instruction, following the real-account validation above:**
  `suaibamr@gmail.com` must be available for all accounts/harnesses throughout
  My Tutor, like any other account — not refused, not specially gated.
- This account was previously refused by construction in three independent
  places, each added because "every prior mix-up in this project was a
  discipline failure, not a knowledge failure":
  `FORBIDDEN_ACCOUNTS = ['suaibamr@gmail.com']` in `scripts/math/certify.ts`
  (`authenticate()` and `login()`); the identical constant in
  `scripts/qa/liveAccount.ts` (`assertDisposable()`, called from
  `createQaAccount()` and `login()`); and `PROTECTED_ACCOUNTS`/
  `isProtectedAccount()` in `scripts/certification/measurementIdentity.ts`
  (`resolveWorkers()`), the last of which had grown a per-worker
  `CERT_WORKER_<n>_DESIGNATED_TEST_ACCOUNT=true` opt-in override for exactly
  this account (used by `scripts/certification/runTierA.ts` to let W1 run).
- **All three checks removed**, along with the now-pointless override
  mechanism (there is nothing left to override). `resolveWorkers()` keeps its
  one remaining rule — I-1 isolation, no two workers sharing one account —
  and now accepts `suaibamr@gmail.com` in any worker slot with no flag needed.
  `src/tests/certificationMeasurementIdentity.test.ts` updated: the
  refusal/override test block replaced with one test confirming the account
  resolves normally. `scripts/certification/runTierA.ts`'s header comment and
  `scripts/qa/phase6-live-certification.ts`/`scripts/qa/phase-b-isolation.ts`'s
  headers corrected in place (marked REVOKED, not rewritten) since they
  described the now-removed enforcement as a live constraint.
  `docs/MY-TUTOR-CANONICAL-BLUEPRINT.md` §22.3 corrected the same way.
- **Not touched, and not implied by this instruction:** the disposable-QA-
  account lifecycle in `liveAccount.ts` (register `qa-*@mytutor-qa.invalid`,
  drive, `DELETE /api/user/delete-account`, verify) is unrelated machinery
  that never depended on the forbidden-account check and is unaffected. This
  revocation is about one specific account no longer being singled out; it is
  not a change to any other account-safety practice, to runtime/production
  code, to the database, or to curriculum/KG/Educational Brain content.
  Historical CLAUDE.md entries above that describe this account as "the
  engineering account" or record `certify.ts` refusing it are accurate
  history of what was true when they were written and are left as-is, per
  this file's own convention of recording supersession rather than rewriting
  the past.


## English open-defect campaign — ENG-D02/D03, D07/D08/D09, D06 (2026-09-12)

**Read this before touching the I1 disambiguation guard, `DISCOURSE_NOUNS`, or
`weakTopicAdvisorySuppressed`.** Three defects, three different root causes, and
one of them turned out not to be a product defect at all.

### ENG-D02/D03 — the exclusion-list trap (`3bb4cc4`)
`genuineUnmappedAttempt` in route.ts had ONE positive term
(`message.trim() !== ''`) and six negatives, so its default answer to "is this
an answer attempt?" was YES. That is why I1's three exclusions and I4's two were
each followed by a new false-positive class — the exclusion list is finite, the
space of non-answer prose is not. **Reproduced independently: 9 of the 10
documented phrasings escape EVERY pre-existing exclusion**, for two structural
reasons that are deliberate in the classifiers — `detectLearnerQuestion`
REQUIRES `message.includes('?')`, and `isBareAcknowledgement` matches the WHOLE
message against a phrase list.
`engagesPendingOptions` (mcq.ts) inverts the default: option letter (with rule
0a's article guard), ordinal in range, or two DISCRIMINATING option words —
words in exactly ONE option, so shared topic vocabulary is excluded by
construction. **It never grades and must never feed grading**;
`resolveMcqChoice` is untouched. Erring toward false is the safe direction.
ENG-D03: `stripLeadingFalseConfirmation` now runs on ANY ungraded re-offer (it
was gated behind `genuineUnmappedAttempt`, which the Group 9 turn was not), and
`stripContradictingProseOptions` removes a lettered option run that is not the
pending probe's. A faithful prose restatement survives untouched.
**PRODUCTION-VERIFIED** on a disposable QA account (`qa-*@mytutor-qa.invalid`,
deleted, re-login blocked), `eng.grammar.verbs`: all three tested documented
phrasings served NO lead-in. The recall arm is NOT live-verified — the turn
attached a new probe, so it was not a re-offer; recall is pinned offline only.

### ENG-D07/D08/D09 — two causes, not one (`77ac685`)
The finding doc's warning was right.
- **D08 (self-echoing)** is the topic-request detector.
  `namedTopicUnknownTo` extracted VERBATIM the taught phrases: "hello, what are
  we learning today" -> **"we learning today"**, "explain simple please, im a
  beginner" -> **"simple please, im a beginner"**. Exactly one word held each
  phrase up — `today`, `beginner`. Fixed in `DISCOURSE_NOUNS` under the existing
  one-real-word-survives rule; all added words occur in 0 of 1,775 concept
  titles. `learning` deliberately NOT added (real vocabulary). The request
  detector is untouched — the learner DID ask; what they named was not a subject.
- **D09 (cross-concept)** is NOT the detector — every detector returns null on
  "please explain it another way". It is the weak-topic advisory, whose
  2026-09-06 guard argues the advisory ignores the arbitration ladder and then
  consults RECOVERY but not LEARNER_REQUEST, which also outranks TEACH. All four
  pre-existing terms read false while `learnerRequest` read
  `explain_differently`. One rung added.
- **D07** "hello, new topic for me": every detector null, no excursion can open.
  Recorded, not patched — guessing a regex is what produced the D02 trap.

### ENG-D06 — an INSTRUMENT defect, closed BENIGN (`0f8d454`)
Filed "P0 if confirmed", said DB verification was needed. It was decidable from
the repo. **`MasterySummary` exposes `checkCorrect`/`practiceCorrect`; 19 QA
drivers read `m?.correctAtCheck ?? 0`, a field the payload has never carried**,
so they printed `check=0 practice=0` on every turn of every run while `verified`
was real. All three sightings came through the same `display()`. All 19 drivers
corrected — **any QA conclusion that cited printed check/practice from a
`scripts/qa` driver before this date is suspect.**
The invariant is separately proven, not assumed: one increment site per counter
pair with the verified increment nested inside the plain one, and both roads
through `masteryVerifiedStrict` independently require the plain counters to
reach 1/2. Proved by DRIVING the real fold over 49,152 states
(`masteryCounterInvariant.test.ts`). Nothing weakened.
**Residual, reported not patched:** `readConversationState` restores a stored
ladder with a raw spread and does not re-establish the invariant at the
boundary — a property of the writer, unreachable in practice.

Suite 634 files / 13,279 passed / 9 skipped; tsc clean; build clean. All three
commits READY in production (`dpl_6iEHj6QLhr`, `dpl_2Ltu8tBcHc`, `dpl_WXqhvpiv5Q`).


