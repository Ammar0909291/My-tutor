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
**Status: PARTIALLY FIXED — corrected 2026-09-13.** The Principle 13 entry
below is accurate for what it changed, but it OVER-CLAIMED closure: it is a
prompt-level fix, and PCD-018/PCD-020's topic-abandonment thread also had a
DETERMINISTIC half that it did not touch. Re-measured 2026-09-13 against the
live modules, `"please teach from start"` still resolved to the topic
`"from start"` and opened an unresolved-topic excursion, pausing the lesson and
blocking the authored-probe gate regardless of what the model was told. That
half is now fixed in `requestedTopic.ts` (leading-modifier shape test); see the
PCD-018/PCD-020 entries in `PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md`.
PCD-015/016/017/021 remain prompt-governed and advisory, as stated below.

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

**RE-MEASUREMENT, 2026-09-16 — the MONITORING trigger above fired, and it
found a DIFFERENT defect than the one it was watching for.**

Ran the audit this entry itself calls for: a disposable QA account
(`liveAccount.ts` convention) driven against the deployed app through all
five Principle-13-named trigger phrases ("explain it differently", "in
other words?", "can you explain simply", "teach me from the start",
"teach me from the beginning"), on 2 physics concepts
(`phys.mech.newtons-second-law`, `phys.mech.momentum`), 2 chemistry
concepts (`chem.bond.resonance`, `chem.kinet.rate-law`), and 2 English
concepts (`eng.grammar.verbs`, `eng.grammar.nouns`) — 30 trigger turns,
full transcripts captured (`scripts/qa/literalismReobserve.ts`). Account
deleted afterward, re-login confirmed blocked.

**The THREE originally-audited failure modes (literalism, topic
abandonment, prerequisite regression) measured 0/30 — genuinely fixed,
holding under live re-measurement.** No turn explained what the phrase
itself meant, abandoned the concept, or regressed into an unrelated
deeper prerequisite. Two adjacent, genuine findings surfaced instead, one
fixed and one reported:

1. **FIXED — the deterministic LEARNER_REQUEST reader only recognized ONE
   of Principle 13's five named phrases.** `detectLearnerRequest`
   (`masteryGate.ts`)'s `EXPLAIN_DIFF_RE` is the deterministic,
   pre-LLM classifier that feeds the LEARNER_REQUEST arbitration rung —
   whose own documented job is to `suppress: ['NEXT_MOVE',
   'AUTHORED_PROBE', 'SESSION_CLOSE']` so an explicit request is never
   turned into a graded quiz (the exact defect class this file calls "D3
   / Phase 2 C6"). Verified by direct call, before writing any fix, that
   4 of the 5 phrases Principle 13 itself names verbatim in the SAME
   prompt instruction returned `null` from this reader: "in other
   words", "explain simply" (bare, no "more"), "teach me from the
   start", "teach me from the beginning" — only "explain it differently"
   matched. Because this reader runs BEFORE any LLM call, an unrecognized
   phrase gets zero LEARNER_REQUEST protection, and the turn can be
   pre-empted entirely by a server-rendered gate/probe response
   (`provider: 'gate'`, "zero provider calls" per its own comment) —
   bypassing the LLM, and therefore Principle 13, altogether. Live
   evidence, consistent with this mechanism: 5 of the 30 trigger turns in
   this session's own transcript received a probe/gate response ("Here's
   a question on Resonance Structures — take your time with it.", "Pick
   the one you think is right.") instead of a restated explanation, all
   5 on the two unrecognized phrases used that turn ("in other words?",
   "teach me from the beginning"); "teach me from the start" happened not
   to land on a gate-eligible moment in this particular run, so the live
   sample does not cleanly isolate the mechanism on its own — the
   code-level gap is what is definitively proven, and the live data is
   consistent with it, not a substitute for it.

   **Fix:** `EXPLAIN_DIFF_RE` widened with three additive alternatives —
   `simply` added to the existing easy/simple/simpler adverb group (so
   "explain simply" matches without requiring "more"), a literal
   `\bin\s+other\s+words\b`, and a literal, CLOSED
   `\bteach\s+me\s+from\s+the\s+(?:start|beginning)\b` — deliberately
   NOT folded into the existing end-anchored bare-"teach me" pattern,
   whose own comment already explains why an open continuation-word list
   is unsafe ("teach me about relativity" names a topic and belongs to
   the excursion reader). All three phrases are Principle 13's own
   already-authored vocabulary, not invented. Verified: all 5 canonical
   phrases plus two real variants (with "?", with "ok … please") now
   return `explain_differently`; 7 negative controls, including the
   exact topic-naming shape the existing pattern already protects
   against ("teach me about relativity", "teach me from chapter 5",
   "teach me from your notes", "teach me from the textbook") and two
   unrelated uses of the bare word "simply" ("simply put, i think this
   is correct", "that is simply wrong"), all correctly still return
   `null`. 9 new test cases in `src/tests/masteryGate.test.ts`. Full
   suite 696 files / 14,426 passed / 9 skipped; `tsc --noEmit` clean;
   `npm run build` clean.

2. **REPORTED, NOT FIXED — off-domain generic-analogy substitution
   persists, specifically on chemistry, specifically naming "recipe"
   (one of Principle 13's own three forbidden examples,
   "pendulum/recipe/bicycle").** `chem.kinet.rate-law` used a
   sugar/baking "recipe" analogy on 2 of its 5 trigger responses ("Think
   of a recipe that doubles the amount of sugar…", "Picture a simple
   recipe. You're stirring a cup of coffee with sugar…") despite the
   prompt explicitly naming "recipe" as a forbidden substitute when a
   same-subject example is available (concentration/rate IS directly
   demonstrable with chemistry-native language, e.g. reactant
   concentration). `chem.bond.resonance` used cake/pizza analogies on 3
   of 5 — not literally named as forbidden, but the same class.
   Physics and English trigger responses did not show this pattern in
   this sample. This is model-instruction-following, not a deterministic
   classification a whitelist regex can repair — "did the model choose
   a same-subject example when one was available" is not mechanically
   checkable the same way "did this phrase match a known request" is,
   matching this entry's own stated philosophy. Not fixed; flagged as a
   MONITORING candidate for a future re-measurement, same discipline as
   before.

3. **CONFIRMED AND CLOSED, 2026-09-16 — was item #1's own mechanism,
   already fixed by that same commit.** `chem.kinet.rate-law`'s "can you
   explain simply" turn had returned grading-shaped text ("...So the
   correct choice is **A**.") instead of a restated explanation,
   immediately after a turn that had attached an MCQ (`mcq=yes`).
   Hypothesis at the time: same mechanism as item #1 — "can you explain
   simply" was not recognized by `detectLearnerRequest`
   pre-fix, so it fell through the LEARNER_REQUEST arbitration
   protection and could be intercepted while a probe was pending.

   Tested directly, not assumed: replayed the exact original turn
   sequence ("ok, go on" -> "explain it differently" -> "in other
   words?" -> "can you explain simply") against `chem.kinet.rate-law` on
   the now-deployed fix (`scripts/qa/mcqInterceptionReproduce.ts`), TWICE
   in fresh sessions. Neither run reproduced the anomaly — both times
   "can you explain simply" returned a genuine, on-topic restated
   explanation (a traffic-jam / line-of-people analogy), including the
   one run where an MCQ genuinely was attached alongside that same turn
   (`mcq: {"question":"For 2NO₂ + F₂ → 2NO₂F, can you determine the rate
   law directly..."}`, text still correctly a restatement, not a grading
   verdict). This confirms the hypothesis rather than merely leaving it
   plausible: fixing item #1's classification gap independently closed
   this anomaly too, because it was the identical mechanism. No separate
   fix needed or made.

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

**`verifierGate`'s re-render/fallback path — INVESTIGATED 2026-09-16,
NOT a real contributor under the current production flag configuration.**
Previously flagged rather than guessed at: `verifierGate`'s re-render/
fallback path (`route.ts`, the `if (runFullVerifier) { … cleanText =
gate.finalText … }` block, ~L8373-8460 at the time of this note — line
numbers drift as the file grows, search for `outputVerifierFlag` rather
than trusting either number) sits AFTER `confirmCorrectAnswer` and, in
`enforce` mode, can fully replace `cleanText` (fallback templates
`SHOW_EASIEST_LEGAL`/`ECHO_MICROWIN`/`WARM_CLOSE`, or a re-rendered LLM
turn) — discarding any confirmation `confirmCorrectAnswer` had already
prepended earlier in the same turn.

Resolved by direct evidence, not speculation, in two independent steps:
(1) source trace of `verifierGate` (`src/lib/eos-runtime/verifierGate.ts`)
shows a hard branch on `mode`: when `mode === 'log'`, the function returns
`finalText: inputs.draftText` **verbatim** — no rerender call, no fallback
template, "not even the STRIP auto-repair is applied" per the module's own
comment — so `cleanText = gate.finalText` is a pure no-op in log mode,
by construction, and cannot discard anything a prior pass wrote. The
re-render/fallback behaviour PCD-029 was worried about exists ONLY in
`enforce` mode. (2) live production telemetry: queried the deployed app's
own `[affirm-guard-scope]` diagnostic log line (which the route already
emits every turn this block runs, `{ outputVerifierFlag, verifierMode }`)
across a 24-hour window via Vercel MCP — **30 of 30 samples read
`verifierMode: 'log'`**, zero `'enforce'`. So in the CURRENT live
configuration, this path runs (the flag is not fully off, contrary to
this doc's own earlier "flags unset in production" comments elsewhere in
the codebase, which are stale for `ENABLE_OUTPUT_VERIFIER` specifically),
but it runs in the one mode that is structurally incapable of discarding
`confirmCorrectAnswer`'s text.

**Verdict: not fixed, because there is nothing to fix under the evidence
— forcing a change here would be exactly the unverified-fix risk this
program's guardrails exist to prevent.** This is a genuine but currently
DORMANT risk, not a closed one: if `ENABLE_OUTPUT_VERIFIER` is ever
changed to `enforce`/`1`/`true`/`on` in production (an owner-level
config change, not a code change), this exact discard mechanism would
become live again with no code change needed to reactivate it. Recorded
here so a future flag flip is not the moment this residual is
rediscovered from scratch — if the confirmation rate is remeasured after
such a flip and falls short, `verifierGate`'s `runVerifierLoop` call is
where to look first, and the fix already scoped by this entry (route the
fallback/rerender text through `confirmCorrectAnswer` when
`mcqGradeHoisted?.correct === true`, matching the empty-post-strip
backstop's own already-shipped fix below) is still the right shape.

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

---

## 2026-09-13 — ARCHITECTURE: authoritative teaching content now reaches the runtime

Not a `PCD-*` entry. This is the delivery layer several `PCD-*` entries
depended on without any of them naming it: authored Educational Brain
knowledge was being silently discarded between the corpus and the prompt.
Recorded here so a future session does not re-diagnose a CONTENT gap as a
runtime defect, or the reverse.

**Two independent silent-loss defects, both measured over all 1,169 EB
entries, not sampled.**

| | before | after |
|---|---|---|
| misconception candidates authored | 3,052 | 3,052 |
| misconceptions parsed | **1,220** | **3,052** |
| files parsing to ZERO | **706 (60%)** | **0** |
| files parsing partially | 1 | 0 |
| Core Understanding chars exposed | **22.7%** | **80.3%** |
| entries silently dropping governing language | **794** | **0 (188 now REPORTED)** |

Per subject, misconceptions before → after: chemistry 198 → 430, english
5 → 444, mathematics 798 → 1,528, physics 219 → 650.

**Cause 1 — the parser was stricter than the corpus in three ways**: it
required a dash where authors write a parenthetical type qualifier
(`**MC-3 (Type 2 — perceptual intuition)**:`), required a bold head where
authors write `### MC-1: TITLE`, and required a numeric id where authors
write `MC-A` or a descriptive slug. **Cause 2** — the only path from the
authored Core Understanding section to the model was the opening hook's
first paragraph cut at 400 chars, so every governing condition past that
boundary (only-if / must / never / conserved / sign convention / breaks
down) was dropped without trace.

**Fix:** `src/lib/curriculum/ebKnowledge.ts` — one grammar, one counter,
one parser, one section-aware packer, one typed
`KnowledgeExposureFailure`. Raising 400 to a bigger number was explicitly
rejected: it moves the boundary rather than removing it. Grading, mastery
and assessment authority are untouched; provenance is internal and
asserted never to reach learner-facing text; the failure type carries no
field that could hold a substitute claim.

### The content/architecture split (do not conflate these)

`chem.bond.resonance` was the calibration case. **Architecture, now
fixed:** its formal-charge formula and its three dominant-contributor
ranking rules were authored all along and never reached the model — only
the first 400 characters of the hook did. They now do (1,720 of 2,636
authored characters exposed; verified by direct assertion, not inferred).

**CONTENT, still a gap, correctly NOT invented by the runtime:** the
formal-charge *checksum* — "the formal charges of a valid resonance
structure sum to the overall charge of the species" — is absent from both
`educational-brain/concepts/chemistry/chem.bond.resonance.md` and
`docs/curriculum/blueprints/chem.bond.resonance.md` (grep confirms zero
occurrences in either). The runtime must not synthesise it. The new
CORE UNDERSTANDING prompt channel states the rule that keeps this honest:
*do NOT invent a condition, exception, limit or convention that is not
stated here*. Authoring it is Curriculum Production Pipeline work, owned
by that pipeline, not by the runtime.

**The general form of that split:** after this change, a concept the tutor
teaches thinly is a content question (the section is short or the rule was
never written) — it is no longer ambiguous with a delivery question (the
rule exists and never arrived). The 188 entries that still drop a
governing unit are the remaining delivery residue, and they are
enumerable: they emit `[learn/chat] KNOWLEDGE_EXPOSURE_FAILURE=` at
runtime rather than failing silently.

---

## 2026-09-13 — the 188 residues resolved to 44, and what the 44 are

Follow-up to the entry above. The 188 were **not** a content problem and not a
budget problem — they were an ordering defect in the packer, fixed at `7dde649`
with no EB content edited and no change to the 1,800-char budget.

**188 → 44 entries (235 → 48 units); exposure 80.3% → 80.4%; english 1 → 0.**
Plus a second, pre-existing defect fixed on the way: 21 sentences already
reached the model cut at an abbreviation ("ethanol bp 78°C vs.") → 0.

### The 44 remaining, classified — every one observable

| class | units | what it is |
|---|---|---|
| budget conflict at whole-unit granularity | 48 | one authored unit is larger than the headroom left after governing-first packing |

That is the honest single row. The finer labels used while investigating
(`A-PACKING` 11, `C-OVERLONG` 19, `D-MANY-UNITS` 3, `E-BUDGET-CONFLICT` 15) are
**size heuristics, not root causes**, and one of them is refuted by measurement:
`C-OVERLONG` implies verbose authoring, but **zero of the 48 units are
redundant** — maximum content-word overlap with already-exposed text is 53%,
median 28%. The long units are long because they carry distinct content.

By subject: chemistry 20, mathematics 19, physics 5, english 0. Residue
sections run 1.7–3.9× the budget (chemistry median 4,772 authored chars).

### CONTENT vs ARCHITECTURE, again

**Architecture: closed.** Every one of the 44 still exposes governing text to
the model AND emits `[learn/chat] KNOWLEDGE_EXPOSURE_FAILURE`. Verified live on
three of them; the production counts match the offline prediction exactly.

**Content: 0 edits warranted, and none made.** The redundancy measurement gives
no unambiguous minimal edit, so the STEP-5 condition for editing is not met.
Independently, `educational-brain/concepts/**` is owned by the Curriculum
Completion Program and the Mathematics EB campaign — reported, not edited.

**Not a content gap.** Unlike `chem.bond.resonance`'s missing formal-charge
checksum (recorded above), nothing here is *absent* from the corpus. The
knowledge exists and is authored; the prompt cannot carry all of it at once.
Those are different problems and must not be conflated: a checksum nobody wrote
cannot be packed, and a condition that will not fit was not left unwritten.

### Declined, on purpose

A lead-plus-governing sub-unit rescue clears 8 more. Not done: it admits a
discontinuous excerpt as authoritative knowledge. Re-open only with an owner
decision, and only with the excerpt marked as such.
