# Handoff prompt: Typed Turn Contract (Primitive 1 of 4)

Paste this whole file as the opening prompt to a fresh session. It is
self-contained — the session should not need this conversation's history.

---

## Context (read first)

You're working on My Tutor (`my-tutor-flame.vercel.app`), a Next.js/Prisma/
Supabase AI tutoring app. Read `/home/user/My-tutor/CLAUDE.md` in full before
touching anything — it is binding project memory, not a suggestion. In
particular: **always work on `main`** (never a feature branch, even if the
harness assigns one — `git checkout main && git fetch origin main && git
merge --ff-only origin/main` first), never force-push, never create a PR
unless asked, and read the "Physics Teacher Migration Architecture V2 —
AUDITED, NOT ADOPTED" section — this task is one piece of that document's
accepted (not rejected) recommendations.

Also read `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4 and
§5 before designing anything. It found, by tracing actual call sites (not
guessing), that some of what looks missing already exists and works — the
mastery gate, the authored-probe pipeline, and 22 deterministic verifier rules
(`kernel/verifier/rules.ts`) are real and correct. It also found, by running
the experiment, that a *composed* verifier of many rules run together
deadlocks (`V-Q2` rejects any draft ending in a question, which makes a large
fraction of legitimate teaching turns unreachable) — that file is OFF by
default in production for exactly that reason. **Do not re-enable it and do
not build a second version of it.** This task is narrower and different: it
is about the INPUT side of the turn (what the model is told, and what
downstream code reads back out of a maze of local variables), not a
second attempt at composed output verification.

## The problem, measured today (2026-09-14, route.ts at 11,199 lines)

```
grep -cE "^\s*(let|const)\s+\w*Hoisted\b" src/app/api/learn/chat/route.ts
→ 116
```

116 separate `let`/`const` declarations whose name ends in `Hoisted` exist in
one file. This is the file's dominant state-management idiom: each one is
set once, early in the handler, then read an arbitrary number of times later
— sometimes 5 lines later, sometimes 3,000 lines later — with no type
connecting a "this was set" fact to "this is safe to read here." On top of
those 116 declarations sit dozens of **post-hoc override blocks** — sequential
`try { ... } catch { /* non-fatal */ }` repair passes that mutate `cleanText`
or reassign a `Hoisted` variable after the model has already generated its
reply, each guarding against one specific way a previous turn went wrong.

This session alone shipped three of those repair passes as real, necessary
fixes for real defects (see CLAUDE.md's dated entries — "unauthored-key
overconfidence", the ASCII-diagram guard, `answerConfirmation.ts`'s
`correctForConfirmation` derivation). Each one was correct and necessary. But
each one is also evidence of the same underlying shape: the code has no way
to express "the answer key was invented by the model, not authored" as a
*type-level* fact available everywhere confidence language gets decided — so
every new failure mode gets caught by adding a new regex-based strip pass
after the fact, at whatever specific call site someone happened to test,
rather than being structurally impossible.

This is `docs/architecture/TUTOR_REMEDIATION_PLAN.md`'s §2 Item 4.1, restated
with today's real numbers (the plan's own "~40 Hoisted locals" figure is
stale — it was written earlier the same day route.ts was at ~10.5k lines;
it's grown since). Session estimate in that plan: 3-5 sessions. Treat that as
a ceiling to notice you've blown through, not a target to hit.

## What "done" looks like

A `TurnContract` type, compiled from raw inputs (session state, DB reads,
the parsed model output) **before** any downstream code makes a teaching
decision, and **asserted** against reality after the model call returns.
Downstream code — the confirmation logic, the mastery gate, the visual
resolver, the repair passes — reads fields off the contract object instead
of reaching for a same-named `Hoisted` local. The contract makes the
*already-real* distinctions the code has been discovering piecemeal (this
session: "was this key authored or invented", "is a real figure genuinely on
screen", "was this a genuine answer attempt or ordinary prose") into named,
typed fields set in exactly one place, instead of ad-hoc booleans recomputed
or overridden at each of several call sites.

This is **not** a rewrite of route.ts and **not** a new verification layer.
It changes how existing decisions are *represented*, not what they *decide*.
If a downstream consumer's logic needs to change to read the new field, that
change should be provably equivalent to what it read before (same boolean,
same value, new source) — any behavior change beyond that is out of scope
for this task and should be flagged, not silently made.

## Two-phase structure (Opus does phase 1, Sonnet does phase 2)

This is deliberately split so a cheaper model can do most of the token-heavy
work once the hard part is decided. If you are Opus reading this: do phase 1
fully, then hand off with a written brief for Sonnet to execute phase 2 in a
following session (or later in this one, if budget allows) — don't do phase
2 yourself; it's designed to be mechanical enough not to need you.

### Phase 1 (Opus): design, not execution

1. **Read, don't skim, before designing anything:**
   - `src/app/api/learn/chat/route.ts` in full (11k lines — read it in
     chunks; note every `Hoisted` declaration and what reads it, and every
     post-hoc repair pass and what it's repairing).
   - `src/lib/teaching/conversationState.ts`, `masteryGate.ts`,
     `turnArbitration.ts`, `turnProgress.ts` — the existing deterministic
     authorities this contract must NOT duplicate or compete with.
   - `src/lib/teaching/answerConfirmation.ts`, `wrongAnswerCorrection.ts`,
     `asciiDiagramGuard.ts`, `figureReference.ts` — this session's own
     repair passes, as worked examples of the exact ambiguity a typed
     contract should remove.
   - `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4
     ("the turn is a HYBRID") — it already maps which parts of the turn are
     DECIDE-only, which are DECIDE→ARTIFACT→RENDER→VERIFY, and which are
     the two remaining GENERATE→DETECT→REPAIR surfaces (`mcqHoisted`
     fallback parsing, and prose teaching content). Your contract's field
     list should cover the DECIDE-only and pre-model fields completely;
     the two GENERATE→DETECT→REPAIR surfaces are explicitly still allowed
     to need a post-hoc field (e.g. `mcqSource: 'authored' | 'parsed' |
     'none'`), because there is no way to know before the model call
     whether it will invent one. Don't try to eliminate that — type it.

2. **Enumerate every existing `Hoisted` local** (`grep -nE
   "^\s*(let|const)\s+\w*Hoisted\b" src/app/api/learn/chat/route.ts`) and
   classify each one:
   - **Contract field** — set once from a deterministic source (session
     state, DB read, authored asset lookup) before the model call, read
     many times after. These become typed fields on `TurnContract`.
   - **Post-model derived field** — cannot be known before the model
     responds (e.g. what the model actually said, whether it invented a
     key). These become a second, smaller `TurnOutcome` type, compiled
     once right after the model call and BEFORE any repair pass runs, so
     every repair pass reads from one typed object instead of each
     re-deriving its own version of "was this graded" or "is a figure
     showing."
   - **Not actually a contract concern** — pure local scratch state that
     happens to be named `xHoisted` out of convention but isn't read far
     from where it's set. Leave these alone; don't force everything into
     the contract just because it shares the naming convention.

3. **Design the two types** (`TurnContract`, `TurnOutcome`) and the
   **assertion function** that validates `TurnOutcome` against
   `TurnContract` before any repair pass or response-shaping code runs —
   e.g. "if `contract.pendingProbe` exists and `outcome.mcqSource ===
   'authored'`, the outcome's key must equal the contract's key" (this is
   exactly the class of invariant `unauthoredKeyGradeHoisted` was invented
   to patch around this session — make it structural instead of a derived
   boolean checked at 5 separate call sites).

4. **Write the migration strategy.** This must be incremental and
   shadow-safe — route.ts serves real production traffic and a mistake here
   is a live-teaching-outage risk, not a test failure. Concretely:
   - Introduce `TurnContract`/`TurnOutcome` and the assertion function
     alongside the existing `Hoisted` locals — **populate but do not yet
     consume** them in the first PR. Log a warning (not a throw) if an
     assertion would have failed, so real production traffic validates the
     model against reality before anything depends on it.
   - Migrate consumers field-by-field in small batches (group by the
     downstream module they feed — confirmation logic, mastery gate input,
     visual resolver — not by file line-order), each batch independently
     testable and revertable.
   - Only after a batch of consumers reads from the contract exclusively
     should the now-redundant `Hoisted` local be deleted.
   - Never do a single big-bang replacement of all 116 in one commit.

5. **Write down explicit non-goals**, restated for whoever executes phase 2
   so they don't scope-creep:
   - Does not change what any teaching decision IS, only what type
     represents it.
   - Does not touch grading (`gradeMcqAnswer`), mastery certification
     (`masteryVerifiedStrict`, `conceptMasteryVerdict`), or the K5 verifier
     rules — those stay exactly as authoritative as they are today.
   - Does not re-enable `ENABLE_...VERIFIER` flags or add new composed
     verification passes.
   - Does not touch curriculum, KG, Educational Brain, or Blueprint content
     in any subject.
   - Does not add a DB migration (contrast: Primitive 4, durable learner
     state, is the one that needs one — this one doesn't).

6. **Produce a written brief for Sonnet** covering: the final
   `TurnContract`/`TurnOutcome` type definitions, the full classified list
   of all 116 (or however many are current at execution time) `Hoisted`
   locals with a assign-to-contract-field / assign-to-outcome-field /
   leave-alone verdict for each, the assertion function's exact invariant
   list, and the batch order for migrating consumers. This brief is the
   actual deliverable of phase 1 — commit it to
   `docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md` before phase 2 starts,
   even if no route.ts code has changed yet, so the work survives a
   session boundary.

### Phase 2 (Sonnet): execution, one batch at a time

Follow `docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md` from phase 1
literally — do not redesign the type shape or the migration order while
executing; if something in the design doc turns out to be wrong once you're
actually touching the code, stop and say so rather than silently deviating.

For each batch:

1. Implement exactly what the design doc's batch entry says.
2. Run `npx tsc --noEmit` — must be clean.
3. Run the full suite (`npx vitest run` or the project's equivalent) — must
   be green. Any pre-existing test that pins the OLD `Hoisted`-based
   behavior (there will be some — this codebase's convention is dated
   comments on updated tests, never silent deletion) gets updated in place
   with a comment explaining what changed and why, per CLAUDE.md's own
   established convention (see e.g. the six test files updated for the
   unauthored-key fix this session — same pattern).
4. Run `npm run build` — must succeed.
5. Commit on `main` (per CLAUDE.md's branch policy — never a feature
   branch), push.
6. **Live-verify on the real account** (`suaibamr1@gmail.com` / `papa@786`)
   for any batch that touches a path a learner can actually hit in a
   normal lesson turn (confirmation language, mastery gate input, visual
   attachment) — don't just trust offline tests for those; this session's
   own history (the ASCII-diagram guard needed a live re-test to find its
   third real-world variant) is the reason for this rule, not a suggestion.
   A batch that's purely internal plumbing with no observable output
   difference doesn't need a live check, but say explicitly why you judged
   it that way.
7. Move to the next batch only after the previous one is deployed READY
   and (where applicable) live-verified.

## Deliverables checklist

- [ ] `docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md` (phase 1 output,
      committed before any code changes)
- [ ] `src/lib/teaching/turnContract.ts` (or similar — the type definitions
      + assertion function, phase 1 design point)
- [ ] Batched commits migrating consumers, each independently green and
      pushed
- [ ] A final short report: how many of the original 116 locals were
      eliminated vs. deliberately kept as-is, what (if anything) is
      deferred to a follow-up session, and current line count of route.ts
      (report the number — don't claim it "got smaller" without checking)

## Standing rules (apply throughout, not just at the end)

- Real verification over inference — if you can test it against the
  deployed app with the real account, do that rather than assuming a fix
  works from reading the code.
- Never claim the app or this subsystem is "fixed" or "complete" — report
  exactly what changed and what didn't.
- Keep responses to the user concise; this file is long because it's a
  one-time handoff brief, not a model for ongoing chat style.
