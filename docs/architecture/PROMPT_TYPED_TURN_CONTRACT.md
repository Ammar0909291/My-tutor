# Typed Turn Contract — two-session prompt (Opus then Sonnet)

Two separate copy-paste blocks below. Each is fully self-contained (no
shared memory between the two sessions, so each repeats what it needs).

**Sequence:**
1. Open a session on **Opus**. Paste BLOCK 1. Let it finish — it ends by
   committing and pushing `docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md`
   to `main`.
2. Confirm that file exists on `main` (`git log --oneline -1 -- docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md`
   or just check GitHub) before moving on.
3. Open a **second, separate** session on **Sonnet**. Paste BLOCK 2. It
   will pull `main`, read the file Opus committed, and execute from it.
4. Do not paste BLOCK 2 before BLOCK 1's file is actually committed —
   BLOCK 2 has nothing to execute without it.

---

## ▼▼▼ BLOCK 1 — paste into the OPUS session ▼▼▼

```
You're working on My Tutor (my-tutor-flame.vercel.app), a Next.js/Prisma/
Supabase AI tutoring app at /home/user/My-tutor (or wherever this repo is
checked out in your environment). Read /home/user/My-tutor/CLAUDE.md in full
before touching anything — it is binding project memory, not a suggestion.
In particular: always work on `main` (never a feature branch, even if the
harness assigns one — `git checkout main && git fetch origin main && git
merge --ff-only origin/main` first), never force-push, never create a PR
unless asked, and read the "Physics Teacher Migration Architecture V2 —
AUDITED, NOT ADOPTED" section in CLAUDE.md — this task is one piece of that
document's accepted (not rejected) recommendations.

Also read docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md §4 and
§5 before designing anything. It found, by tracing actual call sites (not
guessing), that some of what looks missing already exists and works — the
mastery gate, the authored-probe pipeline, and 22 deterministic verifier
rules (kernel/verifier/rules.ts) are real and correct. It also found, by
running the experiment, that a *composed* verifier of many rules run
together deadlocks (V-Q2 rejects any draft ending in a question, which makes
a large fraction of legitimate teaching turns unreachable) — that file is
OFF by default in production for exactly that reason. Do not re-enable it
and do not build a second version of it. This task is narrower and
different: it is about the INPUT side of the turn (what the model is told,
and what downstream code reads back out of a maze of local variables), not
a second attempt at composed output verification.

THE PROBLEM (re-measure this yourself first — don't trust this number, it
will have drifted):

    grep -cE "^\s*(let|const)\s+\w*Hoisted\b" src/app/api/learn/chat/route.ts

As of 2026-09-14 this returned 116, in an 11,199-line file. This is the
file's dominant state-management idiom: each `Hoisted` local is set once,
early in the handler, then read an arbitrary number of times later —
sometimes 5 lines later, sometimes 3,000 lines later — with no type
connecting a "this was set" fact to "this is safe to read here." On top of
those declarations sit dozens of post-hoc override blocks — sequential
try { ... } catch { /* non-fatal */ } repair passes that mutate cleanText or
reassign a Hoisted variable after the model has already generated its
reply, each guarding against one specific way a previous turn went wrong.

Recent CLAUDE.md entries (search for "unauthored-key overconfidence", the
ASCII-diagram guard, answerConfirmation.ts's correctForConfirmation
derivation) are three real, necessary fixes shipped this way. Each is
correct on its own. Each is also evidence of the same shape: the code has
no way to express "the answer key was invented by the model, not authored"
as a type-level fact available everywhere confidence language gets decided
— so every new failure mode gets caught by a new regex-based strip pass at
whatever specific call site someone happened to test, rather than being
structurally impossible.

This is docs/architecture/TUTOR_REMEDIATION_PLAN.md's §2 Item 4.1. That
plan estimated 3-5 sessions for the whole primitive (design + execution
combined) — treat that as a ceiling to notice you've blown through, not a
target to hit.

WHAT "DONE" LOOKS LIKE:

A TurnContract type, compiled from raw inputs (session state, DB reads, the
parsed model output) before any downstream code makes a teaching decision,
and asserted against reality after the model call returns. Downstream code
— confirmation logic, mastery gate, visual resolver, repair passes — reads
fields off the contract object instead of reaching for a same-named
Hoisted local. The contract makes distinctions the code has been
discovering piecemeal (this session: "was this key authored or invented",
"is a real figure genuinely on screen", "was this a genuine answer attempt
or ordinary prose") into named, typed fields set in exactly one place,
instead of ad-hoc booleans recomputed or overridden at each of several call
sites.

This is NOT a rewrite of route.ts and NOT a new verification layer. It
changes how existing decisions are represented, not what they decide. If a
downstream consumer's logic needs to change to read the new field, that
change should be provably equivalent to what it read before (same boolean,
same value, new source) — any behavior change beyond that is out of scope
and should be flagged, not silently made.

YOUR JOB THIS SESSION (design only — do not touch route.ts):

1. Read, don't skim:
   - src/app/api/learn/chat/route.ts in full (read it in chunks; note every
     Hoisted declaration and what reads it, and every post-hoc repair pass
     and what it's repairing).
   - src/lib/teaching/conversationState.ts, masteryGate.ts,
     turnArbitration.ts, turnProgress.ts — the existing deterministic
     authorities this contract must NOT duplicate or compete with.
   - src/lib/teaching/answerConfirmation.ts, wrongAnswerCorrection.ts,
     asciiDiagramGuard.ts, figureReference.ts — recent repair passes, as
     worked examples of the exact ambiguity a typed contract should remove.
   - docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md §4 ("the
     turn is a HYBRID") — it maps which parts of the turn are DECIDE-only,
     which are DECIDE→ARTIFACT→RENDER→VERIFY, and which are the two
     remaining GENERATE→DETECT→REPAIR surfaces (mcqHoisted fallback
     parsing, and prose teaching content). Your contract's field list
     should cover the DECIDE-only and pre-model fields completely; the two
     GENERATE→DETECT→REPAIR surfaces are explicitly still allowed to need
     a post-hoc field (e.g. mcqSource: 'authored' | 'parsed' | 'none'),
     because there is no way to know before the model call whether it will
     invent one. Don't try to eliminate that — type it.

2. Enumerate every existing Hoisted local (grep -nE
   "^\s*(let|const)\s+\w*Hoisted\b" src/app/api/learn/chat/route.ts) and
   classify each one:
   - Contract field — set once from a deterministic source (session state,
     DB read, authored asset lookup) before the model call, read many
     times after. These become typed fields on TurnContract.
   - Post-model derived field — cannot be known before the model responds
     (e.g. what the model actually said, whether it invented a key). These
     become a second, smaller TurnOutcome type, compiled once right after
     the model call and BEFORE any repair pass runs, so every repair pass
     reads from one typed object instead of each re-deriving its own
     version of "was this graded" or "is a figure showing."
   - Not actually a contract concern — pure local scratch state that
     happens to be named xHoisted out of convention but isn't read far
     from where it's set. Leave these alone; don't force everything into
     the contract just because it shares the naming convention.

3. Design the two types (TurnContract, TurnOutcome) and the assertion
   function that validates TurnOutcome against TurnContract before any
   repair pass or response-shaping code runs — e.g. "if
   contract.pendingProbe exists and outcome.mcqSource === 'authored', the
   outcome's key must equal the contract's key" (this is exactly the class
   of invariant unauthoredKeyGradeHoisted was invented to patch around —
   make it structural instead of a derived boolean checked at 5 separate
   call sites).

4. Write the migration strategy. This must be incremental and
   shadow-safe — route.ts serves real production traffic and a mistake
   here is a live-teaching-outage risk, not a test failure. Concretely:
   - Introduce TurnContract/TurnOutcome and the assertion function
     alongside the existing Hoisted locals — populate but do not yet
     consume them in the first batch. Log a warning (not a throw) if an
     assertion would have failed, so real production traffic validates the
     model against reality before anything depends on it.
   - Migrate consumers field-by-field in small batches (group by the
     downstream module they feed — confirmation logic, mastery gate input,
     visual resolver — not by file line-order), each batch independently
     testable and revertable.
   - Only after a batch of consumers reads from the contract exclusively
     should the now-redundant Hoisted local be deleted.
   - Never plan a single big-bang replacement of all 116 in one commit.

5. Write down explicit non-goals, restated for whoever executes this next
   so they don't scope-creep:
   - Does not change what any teaching decision IS, only what type
     represents it.
   - Does not touch grading (gradeMcqAnswer), mastery certification
     (masteryVerifiedStrict, conceptMasteryVerdict), or the K5 verifier
     rules — those stay exactly as authoritative as they are today.
   - Does not re-enable ENABLE_...VERIFIER flags or add new composed
     verification passes.
   - Does not touch curriculum, KG, Educational Brain, or Blueprint
     content in any subject.
   - Does not add a DB migration.

6. Produce a written brief covering: the final TurnContract/TurnOutcome
   type definitions (full TypeScript, not prose description), the full
   classified list of every Hoisted local with a
   assign-to-contract-field / assign-to-outcome-field / leave-alone
   verdict for each, the assertion function's exact invariant list, and
   the batch order for migrating consumers (numbered, each batch small
   enough to be one commit).

DELIVERABLE: commit this brief to
docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md on `main` and push it. Do
NOT write any route.ts code this session — design only. End your final
message with the commit hash and a one-paragraph summary of the batch
plan, so it's easy to confirm from outside the session that this is done.

Standing rules: real verification over inference wherever you can check
something instead of assuming it; never claim more than you've verified;
keep any chat replies to me concise — the design doc itself is where the
depth belongs, not the conversation.
```

## ▲▲▲ END BLOCK 1 ▲▲▲

---

## ▼▼▼ BLOCK 2 — paste into the SONNET session (after BLOCK 1 is committed) ▼▼▼

```
You're working on My Tutor (my-tutor-flame.vercel.app), a Next.js/Prisma/
Supabase AI tutoring app at /home/user/My-tutor (or wherever this repo is
checked out in your environment). Read /home/user/My-tutor/CLAUDE.md in
full before touching anything — it is binding project memory. In
particular: always work on `main` (never a feature branch, even if the
harness assigns one — `git checkout main && git fetch origin main && git
merge --ff-only origin/main` first), never force-push, never create a PR
unless asked.

A previous session (Opus) did the design work for a "Typed Turn Contract"
refactor of src/app/api/learn/chat/route.ts and committed its output to
docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md on `main`. Read that file
in full now. If it does not exist, stop and tell me — do not improvise a
design yourself.

Also skim docs/architecture/PROMPT_TYPED_TURN_CONTRACT.md (this same repo)
for the full background/context that motivated this — it's the original
two-block prompt this session is half of.

YOUR JOB: execute the design doc's migration plan, one batch at a time,
literally as written. Do not redesign the type shape or the migration
order while executing — if something in the design doc turns out to be
wrong once you're actually touching the code, STOP and tell me rather than
silently deviating from it.

For EACH batch in the design doc's plan, in order:

1. Implement exactly what that batch entry says.
2. Run `npx tsc --noEmit` — must be clean.
3. Run the full test suite (`npx vitest run` or the project's documented
   equivalent — check package.json) — must be green. Any pre-existing test
   that pins the OLD Hoisted-based behavior gets updated in place with a
   comment explaining what changed and why (this codebase's convention:
   never silently delete a test, always leave a dated comment — see recent
   examples in CLAUDE.md, e.g. the six test files updated for the
   unauthored-key fix).
4. Run `npm run build` — must succeed.
5. Commit on `main` (never a feature branch), push.
6. Live-verify on the real account (email: suaibamr1@gmail.com, password:
   papa@786) for any batch that touches a path a learner can actually hit
   in a normal lesson turn (confirmation language, mastery gate input,
   visual attachment) — don't just trust offline tests for those; this
   project's own history shows offline-only verification has missed real
   production variants of a bug before. A batch that's purely internal
   plumbing with no observable output difference doesn't need a live
   check, but say explicitly why you judged it that way before skipping
   it.
7. Only move to the next batch after the previous one is deployed READY
   and (where applicable) live-verified. If a batch fails validation, fix
   it before moving on — don't stack unverified batches.

Work through as many batches as you can in this session. If you run out of
budget partway through the plan, stop at a clean batch boundary (never
mid-batch with a broken build), and end with a clear status: which batches
are done and deployed, which are next, and the current count of Hoisted
locals remaining (grep -cE "^\s*(let|const)\s+\w*Hoisted\b"
src/app/api/learn/chat/route.ts) versus what it was at the start of this
session — a future session should be able to resume from your final
message alone.

NON-GOALS (do not do these even if it seems like a natural extension):
- Do not change what any teaching decision IS, only what type represents
  it — if you find yourself changing behavior, stop and flag it instead of
  shipping it.
- Do not touch grading (gradeMcqAnswer), mastery certification
  (masteryVerifiedStrict, conceptMasteryVerdict), or the K5 verifier rules.
- Do not re-enable any ENABLE_...VERIFIER flags or add new composed
  verification passes.
- Do not touch curriculum, KG, Educational Brain, or Blueprint content in
  any subject.
- Do not add a DB migration.
- Do not redesign the TurnContract/TurnOutcome shape the design doc
  specifies — if it's wrong, report it, don't fix it yourself.

Standing rules: real verification over inference — check things against
the deployed app rather than assuming; never claim the app or this
subsystem is "fixed" or "complete," report exactly what changed and what
didn't; keep chat replies to me concise, put the substance in commits and
the final status report.
```

## ▲▲▲ END BLOCK 2 ▲▲▲
