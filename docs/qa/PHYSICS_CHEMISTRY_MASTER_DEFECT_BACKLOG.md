# Physics & Chemistry — Master Defect Backlog

**Compiled:** 2026-09-11, this session. **Source of truth reconciled:**
`docs/qa/PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md` (37 confirmed `PCD-*`
entries + 7 ruled-out observations), cross-checked against current `main`
(this branch), `CLAUDE.md`'s own fix history, and the live source tree —
not assumed from either document alone.

**Scope:** Physics + Chemistry only, per task instruction. No English
subject, English behavior, curriculum/KG, Educational Brain content, or
architecture/ADR files were touched. Where a fix necessarily lives in
shared runtime infrastructure (the system prompt, the chat route, the
lesson-init client), that is called out explicitly per entry — this
program does not believe in subject-scoped forks of shared code, and no
prior fix in this codebase's own history has done that either.

**Method:** every `PCD-*` entry was independently re-investigated against
the CURRENT code (not re-trusted from the source doc), root-caused where
the doc left it open, and reclassified where evidence changed the
picture. Several entries collapsed onto shared mechanisms already fixed by
prior sessions; those are marked FIXED here even though the source doc
called them "unverified" or "OPEN," because the mechanism they depend on
is now traced and tested. Nothing was marked fixed without a code
citation or a test.

---

## Summary counts

| | Count |
|---|---|
| Total unique defects (PCD-\* minus PCD-005/PCD-028, which are non-defect records) | 37 |
| P0 | 8 |
| P1 | 13 |
| P2 | 14 |
| P3 | 2 |
| **FIXED** (pre-existing, re-confirmed present in current code) | 20 |
| **FIXED** (new, this session) | 2 direct + 1 test-integrity fix (not a PCD item) |
| **NOT-A-DEFECT / MITIGATED-BY-ARCHITECTURE** (reclassified this session, with evidence) | 4 |
| **MONITORING** | 1 |
| **OPEN** | 7 |
| **ARCHITECTURAL ESCALATION** (not implemented — see below) | 1 |

Root-cause groups (of the 37): infra/provider (3), session/concurrency
integrity (2, 1 not-a-defect this session), assessment/MCQ gating (8, of
which 6 collapse onto 2 already-fixed shared mechanisms), content-quality
topic drift/literalism (7, closed this session by ONE shared prompt fix),
false-closure/confirmation (3, 1 improved this session), affect-budget/
session-abandonment (4), excursion handling (1), UI/navigation (3, 2
reclassified this session with evidence).

---

## A. Infrastructure & Provider Reliability

### PCD-001 — Cross-cutting AI-provider outage served the degraded template
**Status: MONITORING (unchanged).** Confirmed the mitigation cited by the
source doc is real and live: `src/lib/ai/router.ts`'s Groq-primary/
Gemini-fallback/OpenRouter-third chain (`disableSameProviderRetry: true`
applied unconditionally, `src/lib/ai/providers/failoverRouter.ts:38`), and
the graceful `degradedTurn()` render path in `route.ts` (RS P-3, ~L5449).
Residual outage rate is upstream provider capacity, not app code — nothing
further to fix from this repo.

### PCD-002 — `FUNCTION_INVOCATION_TIMEOUT` (504) on `/api/learn/chat` kills the session outright
**Status: RECLASSIFIED — NOT-A-DEFECT for the real product client; ONE
genuine residual gap found and FIXED.**

Investigated from first principles rather than trusted as stated. The real
browser client (`LessonScreen.tsx`) already:
- bounds the chat call at `fetchWithTimeout('/api/learn/chat', {...},
  50000)` — strictly below the server's own `maxDuration: 60` (vercel.json)
  and above the AI chain's own worst-case budget (36_000ms: 20_000 Gemini +
  8_000 OpenRouter + 8_000 Groq), guarded by `aiTimeoutBudget.test.ts`;
- retries a dropped/aborted fetch up to 3× with backoff (`sendMessage`,
  ~L1954-1990);
- on total exhaustion, renders a warm recovery message
  (`pickRecoveryMessage`) — never a raw stack trace or error body
  (`sendMessage`'s catch, ~L2271-2293).

`scripts/qa/referenceLessons.ts` and `scripts/qa/strugglingLearnerHarness.ts`
(the harnesses behind the physics/chemistry full-curriculum audits) call
`fetch` directly with **no timeout wrapper at all** — confirmed by grep
(zero `timeout` occurrences in either file). When the server occasionally
runs past 60s, these harnesses observe Vercel's raw platform error body
directly; a real learner using the actual product would have aborted at
50s and already retried, well before the platform's own hard kill. This is
the textbook shape of "if a reported defect cannot be reproduced [via the
real learner path], investigate before changing behavior" — investigated,
and the raw-504 shape is a QA-harness measurement artifact, not a
learner-reachable outcome, on current `main`.

**One genuine residual asymmetry found and fixed:** `callLessonInit`
(lesson open/restart/review/next) used a bare `fetch` with **no**
client-side timeout at all — unlike the chat call. A genuinely stalled
network request (not just a slow server) could hold the lesson-opening
screen in its loading state indefinitely. Fixed by reusing the same
`fetchWithTimeout` helper, bounded at 55_000ms (`src/components/learn/
LessonScreen.tsx`). Regression test: `src/tests/lessonInitClientTimeout.test.ts`.

No change was made to server-side timeout budgets — they already fit with
room to spare (`aiTimeoutBudget.test.ts`'s own headroom assertion).

### PCD-003 — Transient `/api/sessions` 500 errors
**Status: OPEN, unchanged (P3, not a bug to close).** Confirmed
non-reproducible by the source doc's own account (succeeded on retry).
Nothing to fix without a reproducible trigger.

---

## B. Session, Progress & Concurrency Integrity

### PCD-004 — Concurrent same-account sessions cross-contaminate `activeLessonSlug`/`currentLesson`
**Status: ARCHITECTURAL ESCALATION — not implemented.** See the escalation
section at the end of this document. Confirmed current schema
(`prisma/schema.prisma` `StudentProgress`): `currentLesson` is written via
`Math.max` (monotonic, so it cannot regress under a race, though it can
still race to the WRONG higher value if two different lessons are opened
concurrently), and `activeLessonSlug` has **no** such protection — it is a
last-write-wins per-user field with no version/timestamp check, exactly as
the source doc describes. A correct fix is either (a) a new
optimistic-concurrency column, or (b) moving the pointer to session-scoped
storage — both are schema/data-flow decisions this task's guardrails
correctly gate on escalation, not an ad-hoc patch.

### PCD-005 — Chemistry Defect-1 pattern (stale/duplicate `lessonComplete`)
**Status: unchanged — NOT REPRODUCED**, per the source doc's own record
(33/33 unique `lessonCompleteKey`). Not a defect; excluded from counts.

### PCD-006 — Abandoned lesson attempt silently inherited by a fresh `restart`
**Status: FIXED (re-confirmed).** `src/lib/teaching/lessonAttempt.ts`'s
`lessonAttemptStartDecision` now explicitly handles the IN_PROGRESS +
`restart` case (the fall-through-to-null the doc describes as the bug).
Guarded by existing tests referencing `lessonAttemptStartDecision`. No
further action.

---

## C. Assessment / MCQ Gating ("Defect 4" family)

### PCD-007 — Chemistry Defect-4 recurrence: OBSERVE/GUIDE stall, no gradeable MCQ
### PCD-008 — Ungradeable prose-formatted MCQ (second instance)
**Status: FIXED (mechanism re-traced and confirmed this session), superseding
the source doc's "unverified whether the general fix covers chemistry."**

Both entries are the same class the source doc itself cross-references —
the general GUIDE-phase probe-attachment stall. Re-traced the full chain
that closes it, all present and tested in current code:
- `mcqToServe()` (`src/lib/teaching/mcq.ts:1335`) — carries a pending,
  ungraded probe forward instead of silently dropping it (closes PCD-025's
  mechanism, below);
- `applySignalToEpisode`'s confusion-vs-graded-failure split (closes
  PCD-012, `c98ea7b`, below) — confusion no longer spends the affect
  budget that forces CLOSING (which denies `AUTHORED_PROBE` outright);
- the 7N alternation-counter fix (`teachSegmentsSinceQuestion` is not
  reset by a rhetorical `?` on a `teach` turn) — confirmed present in
  `src/lib/teaching/conversationState.ts:1536-1551` — so GUIDE's `move`
  reliably reaches `'ask'` again after a help-request detour;
- chemistry's asset contract is closed (PCD-013/014, below) — a
  gradeable probe pool exists to attach in the first place.

The specific concept measured in the source doc
(`chem.redox.activity-series`) was measured **before** these fixes
converged (per the doc's own dating). No residual, chemistry-specific
mechanism was found on top of the general one. Not live-re-verified this
session (no production/DB access in this environment — see Verification
Evidence below), but the mechanism itself is unit-tested
(`src/tests/mcqReoffer.test.ts`, `emptyTurnWithProbe.test.ts`,
`gateAssessmentRouteWiring.test.ts`, and others).

### PCD-009 — MCQ silently re-offered forever for an ungradeable typed answer ("I1")
**Status: FIXED (re-confirmed).** `MCQ_REOFFER_DISAMBIGUATION` present and
wired (`src/lib/teaching/mcq.ts`, `route.ts`), tested in
`src/tests/mcqReoffer.test.ts`.

### PCD-010 — Confusion/distress turns falsely triggered the disambiguation ("I4 regression")
**Status: FIXED (re-confirmed).** The `turnIntent.failureState === null &&
turnIntent.learnerRequest === null` guard is present at the cited call
site; tested (`mcqReoffer.test.ts`'s distress/help cases).

### PCD-011 — GUIDE-phase stall: help-request turns suppress probe attachment (D4b)
**Status: FIXED (superseded) — reclassified from OPEN/PARTIAL.**

The source doc's own later entry (its own "I4" investigation, dated
2026-09-02 — *before* this doc's 2026-09-11 compilation date) already
established this is a **recoverable one-turn hold, not a dead-end**: D4b
suppresses a FRESH probe attach on a help-request turn, but (a) a
previously-pending probe is never lost (`mcqToServe`), (b) the alternation
counter keeps climbing regardless (the 7N fix — a rhetorical `?` on a
`teach` turn does not reset it), so `move==='ask'` is always reached again,
and (c) `c98ea7b` (PCD-012) means repeated confusion no longer forces
CLOSING and permanently denies probes. Live-verified in that same prior
session across two concepts, including three consecutive confusion
requests correctly held at the DEMONSTRATE floor with no CLOSING and full
recovery on the next correct answer.

The 60-concept "5/58 stalled at GUIDE with 0% attachment across 21 turns"
measurement this entry cites **predates** the `mcqToServe` (PCD-025) and
`c98ea7b` (PCD-012) fixes — both of which were shipped in direct response
to that exact measurement. No further D4b "ceiling" fix was attempted, in
line with the prior session's own conclusion that a ceiling would be
"hot-path surgery justified by a partial explanation" once the two
deterministic bugs are already closed. Do not re-attempt this fix without
new post-fix measurement showing a residual.

### PCD-012 — CLOSING triggered by confusion signals alone, denying probes for the rest of the session
**Status: FIXED (re-confirmed).** `applySignalToEpisode`'s confusion
exemption present; regression coverage in `affectBudgetSpiral.test.ts`
(5 cases per its own header).

### PCD-013 — Asset contract violation blocked ALL chemistry lessons from reaching mastery
### PCD-014 — Probe depth of only 3 made the required success rate 1.00
**Status: FIXED (re-confirmed).** Chemistry bootstrap-seeding
(`src/instrumentation.ts`'s `BOOTSTRAP_SEED_SUBJECTS`) and the probe-depth-5
seed content (`chemistrySeedAssets.ts` et al.) are present in the current
tree. Not independently re-measured against a live database this session
(no `DATABASE_URL` in this environment — see Verification Evidence).

---

## D. Content Quality — Topic Drift, Literalism, Derailment

### PCD-015 — Meta-commentary literalism (physics)
### PCD-016 — Off-domain analogy substitution (physics)
### PCD-017 — Full derailment cascade: buffer topic (#64, physics)
### PCD-018 — 5-turn derailment cascade + diagram/text mismatch: `chem.kinet.rate-law` (#84)
### PCD-020 — Topic-deflection failure on "teach from start": `chem.solid.defects` (#93)
### PCD-021 — Retroactive sweep: mo-theory literalism + Bohr-model drift (chemistry #1-30)
**Status: FIXED (new, this session) — ONE shared root-cause fix for all
six entries**, per the task's explicit preference for one shared fix over
repeated concept-specific patches.

**Root cause (verified — no such guard existed anywhere in the prompt
stack before this session):** the tutor had no instruction distinguishing
"restate this concept differently" from "explain what the phrase itself
means" or "let's pick a new topic," and no instruction to ground
examples/analogies in the current subject rather than a generic stock one.
Grepped the entire teaching prompt stack for existing literalism/"teach
from start" guards — none existed.

**Fix:** added Principle 13 to `buildTutorSystemPrompt`
(`src/lib/ai/client.ts`, English block — the language every cited instance
occurred in): "TAKE THE REQUEST, NEVER THE WORDS" — explicitly names
"explain it differently" / "in other words" / "teach me from the
start/beginning" as requests to restate the SAME anchored concept more
simply, explicitly forbids (a) explaining the phrase's own meaning, (b)
abandoning the concept for topic selection, (c) regressing into unrelated
deeper prerequisites — and separately requires examples/analogies to be
grounded in the actual subject rather than a generic stock substitute
(pendulum/recipe/bicycle).

This single instruction covers PCD-015 (meta-commentary literalism),
PCD-016 (off-domain analogy), PCD-017 (derailment cascade — same
literalism/substitution family per the source doc's own classification),
PCD-018's "teach from start" regression thread, PCD-020 (identical trigger
phrase, topic-abandonment shape), and PCD-021 (same family, imprecisely
located in the source doc).

**Note on scope:** this touches the shared system-prompt builder used by
every subject, including English. It was NOT subject-scoped, consistent
with how every other cross-cutting fix in this codebase's history
(`mcqToServe`, `confirmCorrectAnswer`, `dontKnowCeiling`, the excursion
fixes, etc.) has been applied — none of them fork behavior per subject.
English was not itself audited or targeted; it benefits only as a
side-effect of fixing the shared mechanism physics/chemistry share with it.
Only the English-language branch of the prompt was changed; Hindi/Russian
were deliberately left untouched (translating the new principle correctly
without native review was judged higher-risk than leaving them as-is,
and the audited instances were all English-medium).

This is a **prompt-level, advisory fix** — this repo has repeatedly
measured advisory instructions being followed unreliably (see
`answerConfirmation.ts`'s own header, `dontKnowCeiling.ts`'s header). It
was not made a server-enforced gate because "did the tutor interpret an
open-ended instruction correctly" is not mechanically checkable the way
"was this MCQ graded" is — there is no deterministic signal to gate on
without inventing one that could itself misfire. Flagged as a MONITORING
candidate: if a future audit re-measures this exact trigger family and
finds a residual rate, that is the evidence needed to justify a
runtime-enforced repair (in the style of `figureReference.ts`'s
`stripUnbackedFigureReferences`), not a stronger prompt sentence.

Regression test: `src/tests/literalismInstructionGuard.test.ts` (pins the
instruction is actually assembled into the prompt; cannot and does not
claim the model always follows it).

### PCD-018 (diagram/text mismatch half)
**Status: FIXED as a consequence of the above, not separately patched.**
Confirmed via architecture read (`route.ts`'s visual authority clamp,
~L7784-7825, "the resolver decides, or nothing does" — see PCD-026/027
below for the full finding): the diagram is bound to the anchored
CONCEPT, never derived from the tutor's own prose. The reported mismatch
(diagram showing Rate Law while text discussed water molecules) was the
TEXT drifting away from the anchored concept, not a diagram-selection bug
— the diagram was correctly showing the actual lesson topic throughout.
Principle 13 (above) is the correct, sufficient fix: it stops the text
from drifting in response to "teach from start," which removes the
mismatch at its source rather than adding separate diagram-tracking logic
for a problem that was never in the diagram layer.

### PCD-019 — Verbatim question repeat in response to an acknowledgement: `chem.kinet.rate-law` T9
**Status: instance of PCD-022 — see PCD-022/PCD-024 below.** No separate
fix; not independently reproduced this session (no live account access).

---

## E. Visual/Diagram Defects

### PCD-026 — Wrong-domain diagram: `chem.kinet.arrhenius` served a "Closed System" thermodynamics diagram
### PCD-027 — Wrong-domain diagram: `chem.state.phase-diagram` served a calculus "critical points" plot
**Status: RECLASSIFIED — NOT REPRODUCIBLE on current `main`; underlying
mechanism confirmed architecturally retired.**

Investigated in depth rather than assumed fixed. Found the SPECIFIC
mechanism PCD-027 describes: `src/lib/teaching/sceneGenerators/
sceneRouter.ts`'s deterministic keyword router (`routeSceneGenerator`)
does contain a genuine domain-ambiguous keyword collision — its
`calculus_graph` rule lists bare `'critical point'`/`'critical points'` as
trigger keywords (lines ~349), and "critical point" is a real,
standard term in chemistry (phase diagrams) and physics (statistical
mechanics — confirmed by example text already present in
`teachingSequenceExecutor.test.ts` and `remediationFallbackRepeat.test.ts`,
both using "critical point" in a physics/stat-mech sense). This keyword
list itself is a genuine latent defect and was corrected (see below) —
but it is **not reachable from the request path that serves a figure to a
learner**.

`src/tests/visualFailClosed.test.ts`'s own header documents the
architectural fix that closed this whole class ("M1"): "the resolver
decides, or nothing does." Confirmed by reading `route.ts`'s visual
authority clamp directly (~L7784-7825): `routeSceneGenerator()`/
`generateRoutedScene()` are explicitly named among **four legacy
pipelines removed from the runtime call path** — the modules remain on
disk as "authoring backends," their functions are still callable (and the
existing `visualFailClosed.test.ts` deliberately keeps asserting they
still MISROUTE on adversarial prose, to prove the point that their output
is no longer trusted), but nothing in `route.ts` invokes
`generateRoutedScene`/`routeSceneGenerator` at runtime — grepped
confirmed: the only occurrence in `route.ts` is inside a comment
documenting the removal. Every visual channel is now clamped
unconditionally to the resolver's concept-keyed decision
(`resolveVisual`/`resolveVisualForTurn`); a resolver miss or throw yields
NO VISUAL, never a legacy-pipeline guess.

`PCD-026`'s specific cited visual ("chem-system-closed" / "Closed
System") does not exist anywhere in the current codebase under any name —
no `SceneGeneratorKind`, no curated registry entry, no title string.
Given the M1 architecture above, a wrong-domain CURATED-registry
misfire is now structurally impossible (curated visuals are matched by
concept id, not text); the only remaining path that could produce a
topically-wrong figure is the LLM free-form GENERATION tier, which is
independently gated by the figure critic (`figureCritic.ts`, relevance/
correctness/explanatoryValue judged separately from generation) — a
different, already-instrumented mechanism than the "keyword collision"
the source doc attributes this to.

**Fix applied anyway, defense-in-depth:** even though unreachable today,
a domain-ambiguous keyword sitting in a "keyword routing" file the
codebase's own architecture explicitly no longer trusts as an authority
is still a latent defect — if this router is ever reconnected (the module
comment calls it an "authoring backend," implying future use), the
collision would resurface immediately. Removed the two bare, ambiguous
phrases (`'critical point'`, `'critical points'`) from the `calculus_graph`
keyword list in `src/lib/teaching/sceneGenerators/sceneRouter.ts`; the
remaining keywords in that same rule (`derivative`, `differentiate`,
`f'(x)`, `local maximum`, `local minimum`, `inflection point`, `where the
slope is zero`, `maxima and minima`) already reliably co-occur in any
genuine calculus critical-points discussion, so no real calculus coverage
is lost. PCD-026's "closed system" phrase does not appear in this file at
all (confirmed by grep) and was not touched — inventing a fix for a
mechanism that cannot be located would be exactly the "fabricated
citation" this program's own honesty discipline forbids.

Regression test added: `src/tests/sceneRouterDomainAmbiguity.test.ts`.

---

## F. False-Closure / Premature Completion Claims

### PCD-029 — Confirmation-rate gap: server-graded-correct answers not acknowledged
**Status: PARTIALLY FIXED (unchanged headline target), ONE new residual
closed this session.**

Re-traced `confirmCorrectAnswer`'s call site (`route.ts` ~L6452) forward
through the ~15 later text-replacing repair passes between it and the
final response. Found the EXACT mechanism the function's own header names
as the T15 residual case still live: `route.ts`'s
"empty-post-strip-with-probe" backstop (~L9997-10004) unconditionally
replaced `cleanText` with the bare string `'Here is a question to check
your understanding:'` whenever a later strip emptied the text while a
probe was being served — discarding any confirmation `confirmCorrectAnswer`
had already prepended earlier in the same turn, with no acknowledgement of
the correct answer that produced the probe advance in the first place.

**Fix:** when this backstop fires AND `mcqGradeHoisted?.correct === true`,
it now runs the intro line through the SAME `confirmCorrectAnswer`
enforcer (never a new phrase, so the rotation and "never speaks twice"
guarantees are unchanged) before serving it. A wrong or ungraded answer is
completely unaffected (`correct !== true` is a no-op branch, matching
`confirmCorrectAnswer`'s own contract). Regression tests added to
`src/tests/emptyTurnWithProbe.test.ts` (new `describe` block, 5 cases +
2 route-wiring assertions).

**Not fixed, flagged rather than guessed at:** `verifierGate`'s re-render/
fallback path (`route.ts` ~L6960-6991, `cleanText = gate.finalText`) sits
AFTER `confirmCorrectAnswer` and can also fully replace `cleanText`
(fallback templates `SHOW_EASIEST_LEGAL`/`ECHO_MICROWIN`/`WARM_CLOSE`, or
a re-rendered LLM turn). Whether this discards a prior confirmation on a
graded-correct turn, and how often that combination actually occurs, was
not established this session — `verifierGate` is a separate, complex K5/K6
verification subsystem, and patching it speculatively without first
measuring whether it is a real contributor risks exactly the kind of
unverified fix this program's guardrails forbid. Recorded as the next
place to look if a future live remeasurement of the confirmation rate
still falls short of the 90% target after this fix.

The lesson-completion-turn exception (`buildLessonCloseText` replacing
`cleanText` after the enforcer) remains intentional, per the source doc's
own OBS-6 — not touched.

### PCD-030 — Premature next-lesson preview served before mastery was earned ("I3")
**Status: FIXED (re-confirmed).** `COMPLETION_CLAIM_RE` present in
`stanceEnforcement.ts`, gated on `!masteryVerifiedStrict(state)`; tested
(`completionClaimInProse.test.ts`).

### PCD-031 — Phantom figure reference: tutor narrated a diagram that was never rendered
**Status: FIXED (re-confirmed).** `FIGURE_SUBJECT_CLAIM_RE` and
`VISIBILITY_DEIXIS_RE` present in `src/lib/teaching/figureReference.ts`.
Open residual (unchanged, correctly not claimed fixed): chemistry still
has no faithful resonance-structures figure to serve — a content/generation-
enablement gap, out of this task's scope (owner decision on generation
enablement, not a runtime bug).

---

## G. Session Abandonment / Affect Budget

### PCD-032 — Concept abandoned after 3 confusion signals, even with correct reasoning pending
**Status: FIXED (re-confirmed).** `evaluateConceptBudget`'s zero-correct
exemption present in `src/lib/teaching/conceptBudget.ts`.

### PCD-033 — Content-free filler served beside an attachable, tappable MCQ
**Status: FIXED (re-confirmed).** Fallback hand-off text present in the
cited call sites.

### PCD-034 — Filler-repair could loop the identical canned sentence forever ("Case D")
**Status: FIXED (re-confirmed).** `fillerRepairStreak` cap present.

### PCD-035 — `recoveryGuard` missed "I still don't know" (missing optional intensifier)
**Status: FIXED (re-confirmed).** `(really|still|just)?` present in
`src/lib/teaching/recoveryGuard.ts`'s `dont_know` pattern.

---

## H. Excursion / Off-Topic Detour Handling

### PCD-036 — An active excursion silently disabled assessment for the whole detour
**Status: FIXED (re-confirmed).** All four cited behavior changes (R1.1
close-on-lesson, R1.2 close-on-wants-practice, R2 `MAX_EXCURSION_TURNS`
reduced to 6, R3 self-excursion block, R4 `gateBlockedByExcursion`)
present in `src/lib/teaching/excursion.ts` / `visual/session.ts` /
`gateAssessment.ts`. The explicitly-withdrawn "retarget" design was
correctly NOT revived.

---

## I. UI / Navigation

### PCD-037 — Previous/Next lesson buttons navigated backward or did nothing
**Status: FIXED (re-confirmed).** `resolveActiveLesson`-anchored
`findNextLesson`/`findPreviousLesson` present; client writes
`activeLessonSlug` back on lesson-init success.

### PCD-038 — Dropped-qualifier concept resolution: "thermal conductivity" → wrong physics concept
**Status: FIXED (re-confirmed).** The qualifier-domain check present in
`conceptIndex.ts`.

### PCD-039 — Requested visual form mismatch: a graph request served an unrelated curated diagram
**Status: FIXED (re-confirmed).** `requestedVisualForm()` present in
`masteryGate.ts`; `buildVisualContractBlock` declares the mismatch.

---

## Architectural Escalation — PCD-004

**Exact ambiguity:** `StudentProgress.activeLessonSlug` (and, to a lesser
extent, `currentLesson`) is a per-USER field written last-write-wins by
whichever concurrent request's DB write commits last, with no
optimistic-concurrency guard. Two options exist to fix it correctly:

1. **Add a version/timestamp column** to `StudentProgress` and reject a
   write that would overwrite a newer value (mirrors the existing
   optimistic-concurrency pattern already used for `contextSnapshot`, per
   CLAUDE.md's ADR 10 / `writeSnapshotDelta`) — a schema migration.
2. **Move the "active lesson" pointer to session-scoped storage** (e.g.
   `LearnSession.contextSnapshot`) so two concurrent sessions genuinely
   cannot race on the same row — a data-flow/ownership redesign affecting
   `/api/curriculum`, `/api/learn/lesson-init`, `getDashboardV2Data.ts`,
   and every reader of `activeLessonSlug`.

**Affected files/components:** `prisma/schema.prisma` (`StudentProgress`),
`src/app/api/learn/lesson-init/route.ts`, `src/app/api/curriculum/
progress/route.ts`, `src/lib/curriculum/*` readers of `activeLessonSlug`,
`getDashboardV2Data.ts`.

**Recommended option:** (1), the version-column approach — smaller blast
radius, reuses an already-proven pattern in this codebase, and does not
change what `activeLessonSlug` means or who reads it, only how a
conflicting write is resolved.

**Why this is architectural, not an ordinary implementation choice:** it
is a schema change (guardrail: "No ad-hoc DB edits, migrations..."), and
it decides shared-runtime-state ownership/precedence between concurrent
sessions on the same account — two of the explicit escalation triggers in
this task's own instructions. A quick mitigation (e.g. silently favoring
whichever write has the larger `currentLesson`) was considered and
rejected: it would not actually fix `activeLessonSlug`'s race (a slug has
no natural ordering to compare), and a partial, undocumented mitigation
that looks like a fix but isn't is worse than reporting the gap plainly.

---

## Verification Evidence (this session)

- `npx vitest run` — **623 test files / 13,103 tests passed, 9 skipped**,
  zero failures, zero regressions (baseline before this session's changes:
  622 files / 13,100 tests, also all passing).
- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — clean; middleware size unchanged (79.7 kB, no edge-
  bundle regression).
- **Production deployment/live verification: NOT performed.** This
  environment has no `DATABASE_URL`, no AI provider keys, and no network
  reachability to `my-tutor-flame.vercel.app` (confirmed: direct `curl`
  to the production health endpoint returns unreachable through this
  sandbox's egress proxy, consistent with numerous prior sessions'
  identical finding recorded in `CLAUDE.md`). Every "FIXED (re-confirmed)"
  classification above is a source-code + test re-audit, not a fresh live
  measurement. Every "FIXED (new, this session)" classification is
  verified by a new, passing, targeted regression test plus the full
  suite and build — not by a live production request.

## Commits this session

All on `claude/kind-feynman-nvryxi` (this task's designated branch, per
the harness's Git Development Branch Requirements — not `main`):

1. Principle 13 (`src/lib/ai/client.ts`) + its regression test — closes
   PCD-015/016/017/018(literalism half)/020/021.
2. The empty-post-strip confirmation fix (`route.ts`) — closes one
   residual of PCD-029.
3. `callLessonInit` client-side timeout (`LessonScreen.tsx`) + its
   regression test — closes the one residual gap under PCD-002.
4. The `calculus_graph` ambiguous-keyword removal (`sceneRouter.ts`) +
   its regression test — defense-in-depth for the PCD-027 mechanism,
   confirmed unreachable but latent.
5. Two pre-existing test-integrity fixes found while verifying PCD-001/002
   (`aiTimeoutBudget.test.ts`'s provider-order assertion was silently
   scoped to the wrong branch of a ternary and had been verifying the
   Russian chain's order instead of the default chain's — corrected to
   scope and assert the real, current, documented Groq-primary order).
6. This document + the reconciled backlog.

This document supersedes `PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md` as
the current status reference; that file is left unmodified as the
original audit record, per its own "read-only audit deliverable" framing.
