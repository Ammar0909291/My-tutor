# Physics & Chemistry — Real-Student Simulation Defect Log

**Compiled:** 2026-09-11 · **Updated:** 2026-09-12 (Chemistry audit completed to 186/186)
**Scope:** Every defect discovered while simulating a real student going through the Physics
and Chemistry curricula on the deployed app (`my-tutor-flame.vercel.app`), drawn from:

1. The **Physics Full-Curriculum Audit** (238/238 concepts, sequential real-account
   simulation, weak/intermediate-English + expert-teacher dual-persona methodology).
2. The **Chemistry Full-Curriculum Audit** (**186/186 concepts — COMPLETE**, same
   methodology, extended per explicit instruction to hunt every defect type, not only
   stale-completion/ungradeable-MCQ/diagram-quality). Diagram quality summary: **94 clean /
   19 weak / 2 misleading / 3 wrong / 4 unverified, 122 diagrams inspected** across both
   curricula combined (physics + chemistry). Verified complete: 186/186 concept orders
   covered, 0 gaps, 60 `lessonComplete` events recorded with 60 unique keys (0 duplicates —
   Defect 1 never reproduced in chemistry across the full curriculum).
3. Prior real-account QA / engineering sessions documented in `CLAUDE.md`, where a Physics
   or Chemistry lesson was driven live against production to find and (in most cases,
   separately from this task) fix a defect.

**This is a read-only audit deliverable.** No production code, prompts, content, or
configuration was changed while compiling this file. Where a defect below is marked
**FIXED**, that fix was made in an *earlier, separate* session (cited by commit) — recorded
here for accuracy, not performed as part of this task.

**Numbering:** `PCD-NNN` = confirmed defect. `OBS-N` = observation / ruled-out false positive
(listed separately at the end, per instruction).

---

## How to read each entry

- **Subject/Concept** — the KG concept(s) or subsystem affected.
- **Evidence** — what was actually observed, with the concept ID / commit / session it came from.
- **Root cause** — as far as it is known; stated as "not fully isolated" where it isn't.
- **Classification** — NEW (first seen in this compilation), KNOWN (already named/tracked
  somewhere in the record), or RECURRING (the same failure mode has surfaced more than once,
  sometimes across both subjects).
- **Severity** — P0 (breaks the core teaching loop / total outage for the affected surface),
  P1 (a real lesson can fail or a learner can be actively misled), P2 (degrades quality but
  the lesson still functions), P3 (cosmetic / rare / low-impact).
- **Fix priority** — Critical / High / Medium / Low, independent of whether it has already
  been fixed (an already-fixed P0 is still recorded at its original severity for the historical
  record, with status noting it's closed).
- **Fix type** — code / content / visual / prompt / architecture / QA (harness).
- **Status** — OPEN, FIXED (commit), PARTIALLY FIXED, or MONITORING (fix shipped, effect not
  yet re-measured live).

---

## A. Infrastructure & Provider Reliability

### PCD-001 — Cross-cutting AI-provider outage served the degraded template
- **Subject/Concept:** All subjects; measured across all 238 physics concepts and the first
  100 chemistry concepts.
- **Evidence:** `provider: "degraded"` turns serving the fixed template ("Let's take one small
  step together... We can continue from here whenever you're ready.") at a stable rate of
  ~1.9–2.1% of turns in both curricula, with no worsening trend across either full sweep.
  Example instances this session: chemistry batch 9 (concepts 85, 86, 89), turns T10–T13.
- **Root cause:** Upstream Gemini/Groq rate-limiting and capacity outages in the AI provider
  failover chain (`src/lib/ai/router.ts`). Not this app's bug per se, but its effect on the
  learner is a full-turn content failure.
- **Classification:** RECURRING (present throughout both audits, stable rate, cross-cutting).
- **Severity:** P0 (learner gets no teaching content on the affected turn).
- **Fix priority:** Medium (rate is low and stable; already mitigated by the Groq-primary /
  Gemini-fallback / OpenRouter chain — see CLAUDE.md "AI PROVIDER — GEMINI-ONLY REVERSED").
- **Fix type:** Architecture / infra (provider capacity, not app code).
- **Status:** MONITORING — chain reorder already shipped; residual ~2% rate is provider-side
  and not further reducible from this app alone.

### PCD-002 — `FUNCTION_INVOCATION_TIMEOUT` (504) on `/api/learn/chat` kills the session outright
- **Subject/Concept:** Chemistry — `chem.redox.activity-series` (#72), `chem.solid.properties`
  (#94), `chem.surface.emulsions` (#98).
- **Evidence:** Three separate sessions in the chemistry audit ended with a raw Vercel error
  body (`"/api/learn/chat -> 504: ... FUNCTION_INVOCATION_TIMEOUT ..."`) as the *last* turn
  recorded — no further turns were served in any of the three, and no graceful fallback
  message was shown (unlike PCD-001's `degraded` template, which still returns 200 with
  teaching-shaped text). Rate: 3/100 concepts audited so far (~3%).
- **Root cause:** Not fully isolated. Likely cumulative latency across the multi-provider
  failover chain (Groq → Gemini → OpenRouter, each attempted in sequence on failure) exceeding
  the serverless function's execution-time limit under provider stress — consistent with
  PCD-001's outage windows.
- **Classification:** RECURRING (3 independent occurrences, all fatal, all in chemistry).
- **Severity:** P0 — worse than PCD-001: the learner gets a raw error page and the session is
  unrecoverable, versus a graceful degraded message.
- **Fix priority:** Critical.
- **Fix type:** Architecture (function timeout budget / provider-chain latency budget) + code
  (a graceful fallback path for a hard timeout, not just a caught provider error).
- **2026-09-12 — FIXED (commit `6326c91`). Root cause PROVEN by arithmetic over this
  repository's own constants, not inferred.** `vercel.json` gives `/api/learn/chat`
  `maxDuration: 60`. Provider timeouts are gemini 20s, yandex 15s, groq 8s, openrouter
  8s, and the primary tier gets one same-provider retry after a 500 ms backoff:
  - default chain: groq 8 + 0.5 + groq 8 + gemini 20 + openrouter 8 = **44.5s**
  - russian chain: yandex 15 + 0.5 + yandex 15 + gemini 20 + openrouter 8 + groq 8 = **66.5s**
  The Russian chain **exceeds the entire function budget on its own**, before a single
  database read; the default chain leaves 15.5s for session load, snapshot CAS, asset
  assembly, evidence writes, message persistence, and a visual pipeline carrying its own
  9s deadline. **No try/catch could have helped**: the route already prepares a degraded
  template and `router.ts` deliberately does not swallow a timeout so the caller can serve
  it, but none of that runs when the PLATFORM kills the invocation — there is no exception
  and the lambda is gone. That is the raw 504 this entry recorded.
  The chain now carries one wall clock (`AI_CHAIN_DEADLINE_MS`, 45s, leaving 15s to
  persist and respond) and stops when it cannot afford another attempt. Critically, each
  attempt is RACED against the remaining budget: checking the clock only between tiers
  still lets the attempt already started overshoot by its own full timeout, which is
  precisely the overshoot that kills the invocation. The same-provider retry is budgeted
  too. It is the CHAIN that is bounded, never a provider's own timeout, so the deadline
  can only fire on a turn that was already going to fail — a healthy fast path is
  unaffected, and a genuine outage is still reported as itself rather than relabelled as
  slowness (both pinned as negative controls).
  Guard: `src/tests/pcd002ChainDeadline.test.ts`. **Three of its cases initially passed
  VACUOUSLY** — the deadlines were below `MIN_ATTEMPT_MS`, so the chain short-circuited
  before starting any attempt and never exercised the race; they now assert a lower bound
  on elapsed time as well as an upper one, so they fail if no attempt ran.
- **SECOND CONTRIBUTOR, reported NOT fixed:** `/api/learn/chat` wraps **none** of its DB
  calls in `withTimeout`, unlike `/api/sessions`' proven `dbCall` pattern
  (`SESSION_DB_TIMEOUT_MS` + `withRetry`). During a database outage (**PCD-043**) an
  unbounded Prisma call can still hang to the platform limit and reproduce this same 504
  by a different route. Real, and deliberately not patched in the same change: applying
  that pattern across the hottest path in the product is not a speculative edit to make
  alongside a provider-layer fix. Named here as the precise next step, with the pattern
  to copy.
- **Status:** **FIXED** for the provider-chain cause (2026-09-12, commit `6326c91`),
  code-verified. **PRODUCTION VERIFICATION PENDING** — reproducing the original 504
  requires a genuine provider stall, which cannot be induced on demand; the fix is proven
  by the constants above and by tests that bound a real chain in milliseconds. The DB-call
  contributor above remains OPEN.

### PCD-003 — Transient `/api/sessions` 500 errors
- **Subject/Concept:** Chemistry — `chem.elect.galvanic-cell` (#74), `chem.elect.nernst` (#76).
- **Evidence:** Both concepts failed with a 500 on session creation on first attempt; both
  succeeded cleanly on an isolated single-concept retry.
- **Root cause:** Not isolated; confirmed non-reproducible on retry, consistent with transient
  infra load rather than a deterministic bug.
- **Classification:** KNOWN (documented at the time, retried and downgraded).
- **Severity:** P3.
- **Fix priority:** Low.
- **Fix type:** QA / monitoring only — no reproducible defect to fix.
- **2026-09-12 — DIAGNOSABLE NOW; the failure could not previously be classified at all.**
  `/api/sessions` POST collapsed every non-Zod failure into one opaque
  `"Internal server error"`, so neither this entry nor PCD-043 could say WHICH failure a
  500 was, and a `/api/health` poll after the fact measures a different moment. The catch
  now separates `db_unavailable` / `db_timeout` / `unknown` using `withRetry`'s own
  connection predicate (lifted and shared, not re-authored), logs it structurally, and
  returns `kind` additively so an audit driver can record it without polling
  (commit `1926839`). Retry behaviour is byte-for-byte unchanged — this is observability,
  not a fix for whatever the transient 500s were. The events already recorded stay
  unclassifiable; the next one will name itself.
- **Status:** OPEN (not a bug to close — non-reproducible; now instrumented so a
  recurrence is self-classifying).

---

## B. Session, Progress & Concurrency Integrity

### PCD-004 — Concurrent same-account sessions cross-contaminate `activeLessonSlug`/`currentLesson`
- **Subject/Concept:** Physics — architecture-level, reproduced across ~20 concepts (batches
  12–13, concepts 111–130).
- **Evidence:** Two audit batches were (accidentally) run against the same account at the same
  time. Exact `lessonOrder` swap was observed: a request for lesson 111 got back
  `lessonOrder: 121`, and a request for lesson 121 got back `lessonOrder: 112`. 16/20 concepts
  in the overlapping window showed `lessonDrift: true`. Re-running both batches sequentially
  eliminated the drift entirely (0/20).
- **Root cause:** `StudentProgress.activeLessonSlug` and `currentLesson` are **per-user**
  fields, not per-session — so two concurrent lesson sessions on the same account (e.g. a real
  learner open in two browser tabs, or on phone + laptop simultaneously) will race and
  overwrite each other's "current lesson" pointer.
- **Classification:** KNOWN (caught and disclosed during the physics audit itself).
- **Severity:** P1 — a real learner with two open tabs/devices could have their lesson pointer
  silently swapped to the wrong lesson.
- **Fix priority:** High.
- **Fix type:** Architecture (per-session lesson-pointer scoping, or session-level locking on
  the write).
- **2026-09-12 — ALREADY FIXED ON `main`; this entry was STALE when written.** The repo is
  the source of truth and it disagrees: `6e94a3c` ("Merge PCD-004: session-scoped lesson
  pointer, per-tab sessions, attempt concurrency"), built from `6ffbcd5` (scope the lesson
  pointer to the session), `b8e0990` (one conversation per tab; close the LessonAttempt
  lost update) and `57b3023` (mount-time history scope). The lesson a session is teaching
  now lives at the SESSION grain in `LearnSession.contextSnapshot` through the existing
  CAS writer, with `StudentProgress.activeLessonSlug` kept only as the session-less
  fallback, so single-session progress semantics are unchanged. No schema change.
  Re-verified this session rather than taken on trust: 79 assertions across
  `sessionLessonPointer.test.ts`, `sessionIdentityMultiTab.test.ts`,
  `sessionTabIdentity.test.ts` and `lessonHistoryScope.test.ts` all pass, and the
  two-simultaneous-sessions isolation the audit asks for is explicitly covered
  (`sessionIdentityMultiTab.test.ts`: "whereas two SESSIONS keep two pointers"), alongside
  CAS-conflict and clear-pointer cases.
- **Status (superseded):** OPEN — this is a genuine architectural finding from the audit; no fix has been
  made to `StudentProgress`'s per-user field design as of this compilation.

### PCD-005 — Chemistry Defect-1 pattern (stale/duplicate `lessonComplete` across sessions)
- **Subject/Concept:** Chemistry, checked at every 10-concept checkpoint across the full audit.
- **Evidence:** **60 `lessonComplete` events recorded across all 186 concepts (audit complete);
  60 unique `lessonCompleteKey` values, zero duplicates**, for the entire curriculum.
- **Root cause:** N/A — pattern never reproduced, across the complete 186-concept curriculum.
- **Classification:** KNOWN pattern from the physics audit, explicitly re-checked in chemistry
  per the audit's own methodology, at every 10-concept checkpoint through completion.
- **Severity:** N/A (not observed).
- **Fix priority:** N/A.
- **Fix type:** N/A.
- **Status:** NOT REPRODUCED in chemistry across the complete 186/186-concept audit. Listed here
  (rather than omitted) because the task instructions require flagging any recurrence
  explicitly — this is the explicit final record that it did **not** recur, anywhere in the
  chemistry curriculum.

### PCD-006 — Abandoned lesson attempt silently inherited by a fresh `restart`
- **Subject/Concept:** Physics — `phys.mech.normal-force`, found during the Physics
  Teachability Program's 60-concept certification run.
- **Evidence:** A session closed on turn 3 having taught and graded nothing, with a completion
  payload carrying `durationSeconds: 928967` (≈10.7 days).
- **Root cause:** `lesson-init`'s attempt-start decision handled `latest === null` and
  `COMPLETED && isReteach`, but fell through to null for an **IN_PROGRESS** (abandoned) prior
  attempt on `mode: 'restart'`. The fresh lesson inherited the old attempt's ladder phase (first
  turn arrived at PRACTICE) and its already-spent concept budget, silently ending the "new"
  lesson almost immediately.
- **Classification:** NEW (root-caused and fixed in the Physics Teachability Program, not
  previously logged in a defect list of this shape).
- **Severity:** P1 — a returning learner (the common case: walking away mid-lesson leaves an
  IN_PROGRESS row nothing ever completes) would silently get a near-instant "lesson closed"
  instead of a real restart.
- **Fix priority:** Critical (was).
- **Fix type:** Code (`lessonAttemptStartDecision` pure-function fix, plus `resetStartedAt`).
- **Status:** **FIXED** (Physics Teachability Program session, commit not individually cited in
  the source record beyond "extracted to a pure function... pinned by test").

---

## C. Assessment / MCQ Gating ("Defect 4" family — never/rarely attaches a gradeable question)

### PCD-007 — Chemistry Defect-4 recurrence: OBSERVE/GUIDE phase stall, no gradeable MCQ attached
- **Subject/Concept:** Chemistry — `chem.redox.activity-series` (#72). (A first recurrence was
  flagged in an earlier checkpoint of this same audit, concepts 1–70; its exact concept ID was
  not preserved through this session's context compaction and is **not** re-asserted here to
  avoid fabricating a citation — see the note in the Appendix.)
- **Evidence:** Session stayed in OBSERVE/GUIDE with a model-authored, unkeyed prose question
  rather than an authored MCQ attaching; paired with a second, distinct defect (see PCD-008).
- **Root cause:** Same class as the physics audit's original Defect 4 — the phase-transition
  logic that decides when a gradeable probe is eligible to attach did not fire for this
  session.
- **Classification:** RECURRING — explicitly the same pattern named in the physics audit,
  reappearing in chemistry, indicating a shared backend mechanism rather than a
  physics-content-specific issue (exactly per the audit's own stated trigger for flagging this
  as a recurrence rather than a new finding).
- **Severity:** P1 — blocks the concept from ever reaching a certifiable mastery signal within
  the session.
- **Fix priority:** High.
- **Fix type:** Code (probe-attachment gating logic).
- **Status:** OPEN as an isolated finding in this audit; **note:** the general "GUIDE-phase
  stall" failure mode was separately investigated end-to-end in the I4/Physics-Teachability-
  Program sessions (see PCD-017 and PCD-025) and partially mitigated there (`mcqToServe` fix +
  `D4b` scoping). Whether that fix fully covers this specific chemistry instance is
  **unverified** — flagged for re-check once the chemistry audit's remaining batches are
  reviewed against the post-fix build.

### PCD-008 — Ungradeable prose-formatted MCQ (second instance)
- **Subject/Concept:** Chemistry — `chem.redox.activity-series` (#72).
- **Evidence:** The model authored a comprehension question in prose rather than emitting a
  structured, gradeable MCQ — the second occurrence of this specific sub-pattern in the
  chemistry audit.
- **Root cause:** Model deviates from the structured-MCQ prompt contract under some condition
  not yet isolated (possibly correlated with the same phase-stall trigger as PCD-007).
- **Classification:** RECURRING (2nd instance within this audit).
- **Severity:** P1 (co-occurs with, and compounds, PCD-007's inability to grade progress).
- **Fix priority:** High.
- **Fix type:** Prompt (tighten the structured-MCQ instruction) + code (a server-side backstop
  that withholds/reformats an ungradeable prose question, as later built for the general case —
  see `withholdUngradedGateQuestion` in the Liveness Programme, PCD-017/PCD-025).
- **Status:** OPEN as an isolated finding; general-purpose backstop exists elsewhere in the
  codebase (see cross-reference above) — unverified whether it covers this exact case.

### PCD-009 — MCQ silently re-offered forever for an ungradeable typed answer ("I1")
- **Subject/Concept:** Physics — `phys.particle.gauge-bosons`, `phys.qm.angular-momentum-addition`.
- **Evidence:** The chat textarea is not disabled while a keyed MCQ is on screen. A learner who
  *types* an answer instead of tapping an option, when that text doesn't confidently map to a
  choice, gets `resolveMcqChoice() === null` (a deliberate no-guess design to avoid writing a
  false grade) — but the identical MCQ then silently re-offers with no acknowledgement the
  attempt was seen. Reproduced live at gauge-bosons T3→T4 and angular-momentum T2→T3.
- **Root cause:** No non-silent path existed for "your answer didn't map to an option" — the
  UI/server just repeated the question.
- **Classification:** KNOWN (documented and fixed as "I1" in a prior session).
- **Severity:** P0 (as originally classified in that session — "two chemistry P0s" framing for
  the sibling liveness issue applies here too: a learner using natural typed language could be
  stuck indefinitely).
- **Fix priority:** Critical (was).
- **Fix type:** Code (`MCQ_REOFFER_DISAMBIGUATION` lead-in text, gated to genuine-answer-attempt
  turns only).
- **Status:** **FIXED** (commit `00e53ac1`), live-verified on the deployed app.

### PCD-010 — Confusion/distress turns falsely triggered the "couldn't tell your answer" disambiguation ("I4 regression")
- **Subject/Concept:** Physics — `phys.particle.gauge-bosons`, `phys.qm.angular-momentum-addition`.
- **Evidence:** A confusion/distress phrase ("sorry i dont understand this at all", "i am lost",
  "explain differently") carries no `?` and isn't a bare acknowledgement, so it slipped through
  PCD-009's fix's genuine-answer-attempt guard and incorrectly told a confused learner "tap the
  choice you mean" while the tutor was re-teaching — a false claim that they'd made an answer
  attempt.
- **Root cause:** The genuine-attempt guard didn't exclude distress/help-request turns.
- **Classification:** KNOWN (found stress-testing PCD-009's own fix; fixed the same session).
- **Severity:** P2.
- **Fix priority:** High (was).
- **Fix type:** Code (added `turnIntent.failureState === null && turnIntent.learnerRequest ===
  null` to the guard).
- **Status:** **FIXED** (commit `3940daa9`), live-verified.

### PCD-011 — GUIDE-phase stall: help-request turns suppress probe attachment (`D4b-ANSWER-STUDENT-FIRST`)
- **Subject/Concept:** Physics — measured across the Physics Teachability Program's 60-concept
  certification cohort; **5/58 measured sessions stalled entirely at GUIDE** with nothing
  graded.
- **Evidence:** Production `[gate-eligibility]` logs showed the only blocker recorded at GUIDE
  was `phaseAllowsProbe:false` on `show`/`teach` moves; every GUIDE turn whose move was `ask`
  was eligible. The CUE rule `D4b-ANSWER-STUDENT-FIRST` ("never drill past a question") sets the
  move away from `ask` when the learner asks a help question. Measured: a help-request turn gets
  a keyed probe 21% of the time vs 43% otherwise; stalled sessions carry a median help-request
  fraction of 0.50 vs 0.31 for sessions that mastered.
- **Root cause:** Partially isolated — D4b is a contributing mechanism, not the whole cause
  (stalled sessions were also suppressed on their *non*-help turns, 19% vs 43%).
- **Classification:** RECURRING — same failure shape as PCD-007/PCD-008 in chemistry, and the
  underlying seam later implicated in the Liveness Programme's L2 finding (see PCD-025).
- **Severity:** P1.
- **Fix priority:** High.
- **Fix type:** Code (CUE decision-layer tuning) — explicitly **not attempted** in the source
  session because "adding a ceiling to D4b is the plausible next step but would be hot-path
  surgery justified by a partial explanation."
- **Status:** OPEN / PARTIAL. A separate, deterministic root cause for a large slice of the same
  symptom (the client silently dropping a probe the server believed was still displayed) was
  found and fixed the same program — see PCD-024 below — but the D4b contribution itself remains
  unresolved.

### PCD-012 — CLOSING triggered by confusion signals alone, denying probes for the rest of the session
- **Subject/Concept:** Physics — `phys.mech.collisions-inelastic`.
- **Evidence:** Production `[gate-eligibility]` logs: every GUIDE 'ask' turn was blocked by
  `arbitrationAllowsProbe`/`notClosingTurn`. The session episode was in CLOSING purely because
  the server's recovery block synthesizes `{correctness:false}` on every recovery turn — so two
  "I don't understand" utterances alone spent the 2-strike affect budget and moved
  CORE→CLOSING, after which CLOSING denies `AUTHORED_PROBE` outright.
- **Root cause:** Confusion/distress was being counted as a graded failure for affect-budget
  purposes, identically to an actual wrong answer.
- **Classification:** KNOWN (this is the mechanism underlying the human-scored "Physics
  Inelastic Collisions 3/10" reference-lesson failure).
- **Severity:** P0 — the entire assessment→mastery path became unreachable for a confused-but-
  engaged learner, not just one turn.
- **Fix priority:** Critical (was).
- **Fix type:** Code (`applySignalToEpisode` now treats a tagged `confusion:true` signal as not
  a graded failure for affect-budget purposes; a real graded wrong answer still spends the
  budget as before).
- **Status:** **FIXED** (commit `c98ea7b`), live-verified: structured probes attached on
  T8/T9/T10/T11 post-fix (previously only T1), lesson reached CHECK phase (previously stuck at
  GUIDE).

### PCD-013 — Asset contract violation blocked ALL chemistry lessons from reaching mastery
- **Subject/Concept:** Chemistry — all 186 concepts.
- **Evidence:** Chemistry held exactly 2 ACTIVE closed-choice probes per concept against a
  contract requirement of 3 (`correctAtCheck>=1` + `correctAtPractice>=2`, and a spent probe is
  never re-asked). **0 of 186 chemistry concepts were at contract — no chemistry lesson could
  reach mastery**, full stop, regardless of learner performance.
- **Root cause:** The 314 additional authored probes existed in git
  (`chemistrySeedAssets.ts`) but the only writer that could seed them
  (`scripts/brain/seed-knowledge-assets.ts`) needs a `DATABASE_URL` no engineering session in
  this environment has ever had.
- **Classification:** KNOWN (documented and fixed as "Chemistry made servable").
- **Severity:** P0 — total blocker for an entire subject's core promise (reaching mastery).
- **Fix priority:** Critical (was).
- **Fix type:** Architecture + code (joined `chem.%` to the cold-start bootstrap's seed corpus,
  the one writer with real DB access) + 4 real defects found and fixed en route (completeness
  guard measuring the wrong set; seed corpora leaking into the Edge bundle and blowing the
  middleware size budget; bootstrap never awaited so it raced serverless freeze; batched writes
  needed instead of 40 sequential nested creates).
- **Status:** **FIXED** — chemistry now holds 687/687 ACTIVE probes over 186/186 concepts at
  ≥3, plus 372 explanations over 186 concepts, verified against production.

### PCD-014 — Probe depth of only 3 made the required success rate 1.00 (mastery unreachable after a single wrong answer)
- **Subject/Concept:** Physics (all 261 concept/band pairs) and Chemistry (all 186 pairs).
- **Evidence:** Mastery needs three graded-correct answers and a spent probe is never re-asked.
  With exactly 3 probes supplied, one wrong answer made mastery permanently unreachable for that
  session. Measured: 53/60 sessions served exactly 3 keyed probes; 45/46 mastered sessions
  answered every probe correctly; all 8 failing sessions got exactly one wrong.
- **Root cause:** Asset contract's minimum (3) exactly equalled the number of chances a learner
  gets — no margin for a single mistake.
- **Classification:** KNOWN (root-caused and fixed in "Physics + Chemistry ceiling broken —
  79% → 95%").
- **Severity:** P0 — this was **the** dominant cause of the measured mastery ceiling; the
  session's own analysis states measured verified mastery went 44/56 → 53/56 (79% → 95%) after
  this and 5 co-shipped fixes (attribution between them is not separable).
- **Fix priority:** Critical (was).
- **Fix type:** Content (probe depth 3 → 5 for all 261 physics and 186 chemistry pairs).
- **Status:** **FIXED**, measured effect confirmed (79%→95%, though not separable from 5
  concurrently-shipped fixes in the same batch).

---

## D. Content Quality — Topic Drift, Literalism, Derailment

### PCD-015 — Meta-commentary literalism (physics)
- **Subject/Concept:** Physics, multiple concepts across the audit; confirmed probabilistic via
  control cases (`phys.opt.brewsters-law`, `phys.em.magnetic-dipole` — same trigger phrase, zero
  effect).
- **Evidence:** The tutor explains the *literal meaning of an instruction phrase itself* rather
  than following the instruction (e.g., explaining what "in other words" means rather than
  rephrasing).
- **Root cause:** Model-level instruction-following failure, not deterministic on any single
  trigger phrase.
- **Classification:** RECURRING (same class reproduced in chemistry as PCD-018/PCD-019 below).
- **Severity:** P2.
- **Fix priority:** Medium.
- **Fix type:** Prompt.
- **Status:** OPEN.

### PCD-016 — Off-domain analogy substitution (physics)
- **Subject/Concept:** Physics, multiple concepts.
- **Evidence:** A generic transfer/"change one thing" question answered with a canned, unrelated
  example (a pendulum, a recipe) instead of a domain-appropriate one.
- **Root cause:** Model falls back to a generic stock analogy rather than grounding the transfer
  question in the actual taught concept.
- **Classification:** RECURRING (same class reproduced repeatedly in chemistry, e.g. concepts
  91, 92, 95, 96, 100 in this session's own trigger-phrase sweep — bicycle/car/recipe/knob
  analogies substituted for chemistry-specific ones; most were judged acceptable but the pattern
  itself is the same substitution mechanism).
- **Severity:** P2.
- **Fix priority:** Medium.
- **Fix type:** Prompt.
- **Status:** OPEN.

### PCD-017 — Full derailment cascade: buffer topic (#64, physics)
- **Subject/Concept:** Physics buffer-related concept (#64 in curriculum order).
- **Evidence:** Four consecutive turns spanning three unrelated domains before self-correcting —
  the single most severe topic-drift instance found in the physics audit.
- **Root cause:** Same literalism/substitution family as PCD-015/PCD-016, compounding across
  multiple turns without self-correction until turn 4.
- **Classification:** KNOWN (flagged at the time as the worst physics topic-drift instance).
- **Severity:** P1.
- **Fix priority:** High.
- **Fix type:** Prompt / architecture (a turn-level "did we leave the lesson topic" check would
  catch this faster than relying on eventual model self-correction).
- **Status:** OPEN.

### PCD-018 — 5-turn derailment cascade + diagram/text mismatch: `chem.kinet.rate-law` (#84)
- **Subject/Concept:** Chemistry — `chem.kinet.rate-law` (#84).
- **Evidence:** T1's beginner-opener ("please teach from start") caused the tutor to regress
  past the assigned concept entirely into prerequisite basics (matter → atoms → elements →
  compounds), then T2–T5 got stuck explaining water-molecule structure — none of it Rate Law
  content. Compounding defect: T2 and T4 displayed the correct "Rate Law and Order" (initial-rate
  method) diagram while the accompanying *text* discussed water molecules — a genuine
  text/diagram mismatch. The model became self-aware at T4 ("I'm sorry for the mix-up
  earlier... it doesn't show a water molecule") but still didn't redirect to rate law until T6.
  Recovered fully by T11–13.
- **Root cause:** Literal interpretation of "teach from start" causing full prerequisite
  regression rather than a simple-language restatement of the *current* concept; a secondary,
  apparently independent bug caused the diagram to keep displaying while the text drifted away
  from it.
- **Classification:** RECURRING — same literalism trigger phrase as PCD-020 below (chemistry
  #93), different failure shape (content substitution vs. topic-abandonment); this is chemistry's
  worst derailment cascade found in the audit (5 turns vs. physics's 4 at #64, PCD-017).
- **Severity:** P1 — likely contributed to this concept never reaching mastery within the
  session (ended at GUIDE, `checkCorrect: 0`).
- **Fix priority:** High.
- **Fix type:** Prompt (interpretation of beginner-opener phrases) + code (diagram-serving
  should track what the text is actually discussing, not just what topic the lesson nominally
  is).
- **Status:** OPEN — first documented here.

### PCD-019 — Verbatim question repeat in response to an acknowledgement: `chem.kinet.rate-law` (#84) T9
- **Subject/Concept:** Chemistry — `chem.kinet.rate-law` (#84).
- **Evidence:** T9's reply is an exact repeat of T8's closing question, in response to a vague
  "ok i think i understand a bit better now" — a genuine content repeat, not a benign
  template-phrase false positive (verified by comparing the actual text, not just the
  `NEAR_VERBATIM_REPEAT` flag).
- **Root cause:** Not isolated in this session; consistent with the broader repetition defect
  described in PCD-022.
- **Classification:** RECURRING (instance of PCD-022's broader pattern).
- **Severity:** P3.
- **Fix priority:** Low.
- **Fix type:** Prompt / code (teaching-memory "do not repeat" tracking — see PCD-022/PCD-024).
- **Status:** OPEN.

### PCD-020 — Topic-deflection failure on "teach from start": `chem.solid.defects` (#93)
- **Subject/Concept:** Chemistry — `chem.solid.defects` (#93).
- **Evidence:** T1, in response to "hi sir, i only know little bit, please teach from start,"
  the tutor abandoned the lesson-init's already-established topic (Crystal Defects) and instead
  asked the learner to pick a topic from an unrelated menu ("crystal lattices, ionic bonding, or
  something else?"). It self-corrected on the very next turn only because the persona's scripted
  reply was a generic acknowledgement rather than an actual answer to that menu — a real learner
  would likely have been derailed into choosing an unrelated topic, or been confused about what
  to answer.
- **Root cause:** Same literalism family as PCD-018 — "teach from start" interpreted as "let's
  restart topic selection" rather than "explain the current concept from its basics."
- **Classification:** RECURRING (same trigger phrase, different failure shape, as PCD-018).
- **Severity:** P2.
- **Fix priority:** Medium.
- **Fix type:** Prompt.
- **Status:** OPEN — first documented here.

### PCD-021 — Retroactive sweep findings: mo-theory literalism + Bohr-model off-domain drift (chemistry concepts 1–30)
- **Subject/Concept:** Chemistry — a molecular-orbital-theory concept and a Bohr-model-related
  concept, both within concepts 1–30 of the chemistry audit.
- **Evidence:** Found during a retroactive full-transcript sweep of the first 30 chemistry
  concepts (triggered by the user's explicit correction that the audit must check *every*
  concept for *all* defect types, not just the two originally named). Two confirmed instances:
  a literalism failure on molecular-orbital-theory content, and an off-domain drift instance on
  a Bohr-model concept.
- **Root cause:** Same literalism/substitution family as PCD-015/016/018/020.
- **Classification:** RECURRING.
- **Severity:** P2.
- **Fix priority:** Medium.
- **Fix type:** Prompt.
- **Status:** OPEN. (Note: the exact concept IDs for these two instances were not preserved
  through this session's context compaction beyond their thematic description — "mo-theory" and
  "bohr-model." This entry is intentionally conservative about specificity rather than
  fabricating an exact concept ID; see the Appendix note.)

### PCD-022 — Verbatim explanation repetition, measured at 65% of sessions
- **Subject/Concept:** Physics, measured across the Physics Teachability Program's 60-concept
  cohort (also present in chemistry per PCD-019).
- **Evidence:** The authored explanation was reproduced word-for-word by a later model turn in
  37 of 57 sessions (65%), 56 of 584 model turns — landing worst as the reply to "can you show
  the picture again" and as the reply to a *correct* answer (reading as not having been heard).
- **Root cause:** `buildTeachingMemoryBlock` gave every other already-used artefact (analogies,
  demonstrations, visuals, probes, strategies) an explicit "do NOT repeat" instruction but never
  mentioned `explanationsServed`, despite recording it all along.
- **Classification:** KNOWN, first fix attempt documented ("Physics + Chemistry ceiling"), later
  found to only partially work (see PCD-023).
- **Severity:** P2.
- **Fix priority:** High.
- **Fix type:** Prompt (added the missing "do NOT repeat" line for `explanationsServed`).
- **Status:** PARTIALLY FIXED — the prompt-line fix reduced sessions containing a verbatim
  repeat from 65% → 31% (same seed, first 20 concepts; Fisher exact p=0.084, suggestive not
  conclusive), but per-turn repeat rate barely moved (8.1% → 7.1%) — fewer *sessions* affected,
  not much less repetition where it still occurs. A structurally different, deterministic root
  cause for a further slice of the same symptom was later found and fixed — see PCD-024.

### PCD-023 — `historyCompaction` fix for the C7 repetition metric did not work
- **Subject/Concept:** Physics — general.
- **Evidence:** The session's own record states plainly: "**DID NOT WORK.**" A follow-up
  interim measurement suggested improvement (50% vs 14%, p=0.11); at full sample that vanished
  (50% vs 46%, **p=0.80**).
- **Root cause:** Instrumentation showed the retrieval cache is enriched among repeats (8 of 19
  repeat turns vs a 25% base rate) but this **cannot be the whole mechanism** — 11 of 19 repeats
  occur with the explanation absent from the prompt AND compaction active. A third channel
  causing repetition was identified as existing but not identified as to *what* it is, at the
  time.
- **Classification:** KNOWN — explicitly reported as a failed fix, not silently dropped.
- **Severity:** P2.
- **Fix priority:** Medium (superseded — see PCD-024, which closes a real deterministic
  mechanism, though the session that made this finding did not know that fix was coming).
- **Fix type:** Code (attempted, failed as measured).
- **Status:** OPEN as measured at the time this fix shipped; see PCD-024 for the fix that did
  work on a related but distinct mechanism.

### PCD-024 — C7 verbatim explanation re-serve: deterministic memory re-serve on snapshot version conflict
- **Subject/Concept:** Physics — `phys.mech.newtons-first-law`.
- **Evidence:** Reproduced live: the authored explanation asset `c9d6427a` was served
  byte-identically on three turns of one session, all `provider=memory`. Intermittent — ~1 in 8
  runs on that concept, 0 repeats across 9 other concepts and 7 later diagnostic runs of the same
  concept.
- **Root cause:** **Proven at the code level.** The `ISS-13` teachingHistory rederiver in
  `route.ts` re-applied only 5 of 7 accumulative history fields after a snapshot optimistic-
  concurrency conflict — it dropped the just-served explanation's id, the just-asked MCQ id, and
  a confidence reading. On a concurrent write conflict, the next turn's "have I served this
  before" guard saw an empty ledger and re-served the same explanation verbatim (and could have
  re-asked an already-spent probe, though that specific consequence wasn't separately measured
  live).
- **Classification:** KNOWN — this closes "the third channel the C5/C7 residue note could not
  identify" (PCD-023's open question).
- **Severity:** P2.
- **Fix priority:** High (was).
- **Fix type:** Code (rederiver now re-applies `recordExplanationServed`, `recordMcqAsked`, and
  `recordConfidence` onto the concurrently-updated base).
- **Status:** **FIXED** (commit `d0e94074`) at the code/root-cause level, with a regression test
  reproducing the buggy-vs-fixed rederiver behavior. **Not separately live-re-verified** — the
  defect only fires on a genuine snapshot version conflict, which is impractical to force
  reliably, and the base repeat rate (~1/8) makes a short "0 repeats" run inconclusive either
  way. This is recorded as fixed at the source-code level, not as a live-confirmed-eliminated
  rate.

### PCD-025 — GUIDE-phase probe silently dropped by the client while the server believed it was still displayed
- **Subject/Concept:** Physics — `phys.opt.mirrors` and others in the same cohort.
- **Evidence:** Splitting sessions at their first wrong answer: 53/58 non-stalled sessions went
  17%→55% probe attachment after a wrong answer (a wrong answer normally starts the assessment
  loop); the 5 stalled sessions went 14%→**0%**, zero across 21 turns. `phys.opt.mirrors`'s
  tutor was observed asking "What led you to pick option B?" on a turn whose payload carried no
  `mcq` at all.
  the server suppresses the mastery gate while a probe is pending and ungraded (assuming "the
  widget keeps rendering it from `pendingMcq`"), but the client (`LessonScreen.tsx`) only sets
  `activeMcq` from `data.mcq` with a bare `else setActiveMcq(null)` — so a probe attached on an
  *earlier* turn (not this one) silently vanished from the learner's screen. The learner could
  not answer a question they could not see, so they never produced the grade that would release
  the gate — the exact same class of dead-end as PCD-009/PCD-011.
- **Root cause:** Two independently-reasonable behaviors (server withholds a new probe while one
  is pending; client only shows `mcq` from *this* turn's payload) composed into a real deadlock.
- **Classification:** RECURRING — this is a large slice of PCD-011's "GUIDE stall" symptom,
  isolated to a specific mechanism.
- **Severity:** P1.
- **Fix priority:** Critical (was).
- **Fix type:** Code (shared `mcqToServe()` used by both the response and the persisted
  snapshot, so a probe graded this turn is deliberately not carried forward, but one still
  pending is never silently dropped).
- **Status:** **FIXED**, per the source session's own record. **Not yet separately
  live-re-measured against production** at the time that fix shipped (a planned re-measurement
  run was stopped and discarded rather than reported incomplete).

### PCD-026 — Wrong-domain diagram: `chem.kinet.arrhenius` (#86) served a "Closed System" thermodynamics diagram
- **Subject/Concept:** Chemistry — `chem.kinet.arrhenius` (#86).
- **Evidence:** At T4 (mid-session, no diagram request from the learner), the tutor served
  `chem-system-closed` ("Closed System" — a generic thermodynamics system/surroundings boundary
  diagram) while discussing the Arrhenius equation and reading `Ea` off a `ln k` vs `1/T` plot.
  Zero topical connection to activation energy or rate-temperature dependence.
- **Root cause:** Likely a domain-default registry binding misfire — same defect class as the
  chemistry audit's earlier phase-diagram/calculus keyword collision (PCD-027), a different
  keyword collision (probably "system").
- **Classification:** RECURRING (same class as PCD-027).
- **Severity:** P2 — actively confusing rather than blocking, since it doesn't touch grading.
- **Fix priority:** Medium.
- **Fix type:** Content / architecture (visual-registry default binding correction).
- **2026-09-12 — FIXED, verified against the real resolver.** Two independent changes
  close it. (1) `sceneRouter.ts`'s calculus rule no longer claims the bare phrases
  "critical point"/"critical points" (removed 2026-09-11 citing PCD-026/PCD-027) — that
  was the latent keyword collision, and the same commit records that this router is not
  currently reachable from the path that serves a learner a figure, so it was never the
  whole story. (2) Measured this session through `resolveVisual` with the real concept
  id: **`chem.kinet.arrhenius` now returns `graphical:false, source:'none'`** — no
  figure at all rather than a substitute. That is the product's documented honest
  no-figure fallback and the correct behaviour for an unbound concept; a wrong-domain
  diagram can no longer be selected for it.
- **Status:** **FIXED** (router fix `2026-09-11`; serving behaviour verified 2026-09-12).

### PCD-027 — Wrong-domain diagram: `chem.state.phase-diagram` (#42) served a calculus "critical points" plot
- **Subject/Concept:** Chemistry — `chem.state.phase-diagram` (#42).
- **Evidence:** Served a CALCULUS "polynomial critical points" plot (derivative = 0) instead of
  a chemistry phase-diagram visual (liquid-gas coexistence endpoint). Traced to a genuine
  keyword collision: "critical point(s)" means something different in calculus vs. chemistry
  phase diagrams. Confirmed by reading the surrounding conversation turns, which legitimately
  used the phrase "critical point" right before the wrong visual was served.
- **Root cause:** Keyword-collision in whatever visual-selection logic maps discussion text to a
  registry entry.
- **Classification:** KNOWN — flagged at the time as the single worst diagram defect found in
  either curriculum audit.
- **Severity:** P1 — this is a **factually wrong** visual, not merely off-topic: a learner could
  come away believing a calculus concept applies to chemical phase behavior.
- **Fix priority:** High.
- **Fix type:** Content / architecture (disambiguate "critical point" by subject domain in the
  visual-selection logic).
- **2026-09-12 — FIXED, verified against the real resolver.** Same two changes as
  PCD-026: the bare "critical point(s)" keywords were removed from the calculus route
  rule (2026-09-11, citing this defect by number), and **`chem.state.phase-diagram` now
  returns `graphical:false, source:'none'`** through the real `resolveVisual` — the
  calculus plot is not reachable for this concept by any path, and nothing is substituted
  in its place.
  **Honest residual, content-owned not runtime:** the concept still has no chemistry
  phase-diagram figure of its own, so a learner asking for one is told there is none. That
  is honest rather than wrong — the P1 here was a FACTUALLY WRONG visual, and that is
  gone — but authoring a real phase-diagram binding remains open visual-authoring work.
- **Status:** **FIXED** for the factually-wrong-visual defect (2026-09-12). Authoring a
  correct phase-diagram figure is separate content work, not this defect.

### PCD-028 — Learner-name-shaped false alarm ruled out; general finding on "teach from start" literalism affecting a beginner-opener's *tone*, not content
- *(Withdrawn — this ID intentionally left as a cross-reference stub; see OBS-2 in the
  Observations section. It is listed here only so a reader searching "PCD" sequentially does not
  wonder where the ID went.)*

### PCD-040 — Analogy-induced conceptual error + matching wrong diagram: `chem.coord.stability` (#106)
- **Subject/Concept:** Chemistry — `chem.coord.stability` ("Stability Constants").
- **Evidence:** T1's beginner-opener response built a flawed statistics analogy: "imagine a bar
  chart... the taller bar is called the mode" to explain which metal complex is more
  thermodynamically stable — conflating a statistical "mode" (most frequent value in a dataset)
  with chemical stability (a formation-constant magnitude). The served diagram matched this
  error exactly: a "Frequency Distribution: log Kf" chart with explicit "mean and mode" framing —
  genuinely wrong-domain for a stability-constants concept.
- **Root cause:** Not isolated to a keyword collision this time — the tutor's own explanation was
  scientifically confused first, and the diagram-selection logic then faithfully rendered that
  confused framing rather than the actual chemistry concept.
- **Classification:** NEW — worse than a simple visual mismatch (PCD-026/027 class): here the
  *prose itself* is conceptually wrong, and the diagram compounds rather than corrects it.
- **Severity:** P1 — risks teaching a genuine misconception (statistical "mode" ≠ chemical
  stability) rather than merely showing an off-topic picture.
- **Fix priority:** High.
- **Fix type:** Prompt (the model's own analogy-construction step needs a check against the
  actual quantity being taught) + content/architecture (diagram selection should not blindly
  render whatever framing the model's prose used).
- **2026-09-12 — FIXED (commit `3d9fab8`). THE CAUSALITY WAS BACKWARDS, and the fix
  is on the generator, not the concept.** This entry reads the defect as prose-first: a
  confused analogy, with diagram selection faithfully rendering the confusion. Traced to
  source, it is the other way round. The binding is STATIC —
  `conceptSceneParams.ts` has always resolved `chem.coord.stability` to the
  `statistics_bar_chart` generator, whose chrome is hardcoded: it titles the figure
  `Frequency Distribution:`, narrates "is the mode — the most frequently occurring
  category", and reports a mean "found by Σ(index×frequency) / Σfrequency over all 31.8
  observations". The DATA was correct chemistry all along (log Kf 13.0 monodentate vs
  18.8 chelate is the real chelate effect); the semantics wrapped around it were not. A
  log Kf is a magnitude — there are no observations and it has no mode. **The tutor read
  the figure's own narration and taught from it**, which is why the prose and the diagram
  agreed: they had the same source.
  Fixed on the GENERATOR because a second chemistry concept had the identical defect —
  `chem.thermo.heat-capacities` reported "82.15 observations" of J/mol·K. An optional
  `quantity` descriptor switches the chrome to comparison semantics (largest rather than
  mode; the mean-of-category-index step dropped rather than reworded). Absent, behaviour
  is byte-identical, so every genuine statistics caller is untouched — pinned as a
  negative control. Numbers unchanged. Guard: `src/tests/pcd040MagnitudeChart.test.ts`.
- **Status:** **FIXED** (2026-09-12, commit `3d9fab8`), code-verified against the real
  builder and the real production bindings.

### PCD-041 — Self-contradictory quantitative graph within one session: `chem.dblock.lanthanides` (#122)
- **Subject/Concept:** Chemistry — `chem.dblock.lanthanides` ("Lanthanide Contraction").
- **Evidence:** Two different linear equations were served for "Lanthanide Contraction" within
  the SAME session: T2/T4 used `-2.857x+342.849` (implying ~40pm radius drop across the
  14-element series), T10 used `y=-0.5x+200` (implying ~7pm drop) — directly contradicting each
  other. Neither closely matches the real magnitude (~15-20pm total, ~1-1.3pm/element).
- **Root cause:** Not isolated — likely each graph-serving turn independently generated a fresh
  approximate equation rather than reusing/deriving from a single consistent model of the trend.
- **Classification:** NEW.
- **Severity:** P2 — the underlying concept (radius decreases across the series) is correctly
  conveyed; the specific numbers are wrong and inconsistent with each other.
- **Fix priority:** Medium.
- **Fix type:** Content/architecture (graph-generation should either reuse a cached equation
  within a session or ground the slope in a real reference dataset).
- **2026-09-12 — FIXED (commit `3d9fab8`). Root cause CONFIRMED, and it is an ABSENCE.**
  `chem.dblock.lanthanides` had **no curated binding at all**, so every figure request
  fell through to GENERATION, which runs independently per turn — hence two different
  equations in one session. Neither string exists anywhere in this repository: both were
  invented at the turn, which is also why neither matches the real ~17 pm contraction.
  A curated binding outranks generation, so authoring one IS the fix: Shannon ionic radii
  (CN = 6, Ln³⁺), La³⁺ 103.2 → Lu³⁺ 86.1 pm, a published reference series rather than a
  slope fitted at runtime. Verified deterministic (identical across builds), monotonic
  across the six elements, structurally valid by the product's own `validateSceneSpec`,
  and confirmed to REACH the learner through the real resolver at `source:'registry'`.
  Magnitude mode per PCD-040, since a radius is not a count.
- **Status:** **FIXED** (2026-09-12, commit `3d9fab8`), code-verified end to end through
  the real resolver.

### PCD-042 — False-closure via a phrasing variant the existing strip regex does not cover: `chem.org.mechanisms` (#129)
- **Subject/Concept:** Chemistry — `chem.org.mechanisms` ("Reaction Mechanisms" / organic).
- **Evidence:** In response to a plain "ok that makes sense, thank you," the model produced a
  full mastery-recap message: "🎉 Excellent work! ✓ What you mastered – you can now: [3 specific
  skills]... ✓ What's coming – The next lesson unlocks 'Nature of Matter'..." — while the actual
  gate state was `mastery.verified:false`, `practiceCorrect:0/2`, **`completionSuppressed:true`,
  `gatePending:true`**. The deterministic gate correctly refused to close the lesson; the model's
  own prose independently claimed mastery and previewed the next lesson anyway.
- **Root cause:** Same defect class as the previously-fixed "I3" premature-next-lesson-preview
  issue (`stanceEnforcement.ts`'s `COMPLETION_CLAIM_RE`, commit `768dfe3c`), but via a phrasing
  ("What's coming – The next lesson unlocks...") that regex family (targeting "next we
  explore/cover/study/...") does not match — a concrete instance of exactly the gap that fix's
  own documentation flagged as untested ("no evidence of [other phrasings], broadening risks...").
  This is now that evidence.
- **Classification:** RECURRING — same underlying bug class as PCD-030/I3, new uncaught
  phrasing.
- **Severity:** P1 — a learner reading this would reasonably believe the lesson is complete and
  they are being moved on, when neither is true.
- **Fix priority:** High.
- **Fix type:** Prompt/code (extend `COMPLETION_CLAIM_RE`'s phrasing family to cover "what's
  coming – the next lesson unlocks..." and likely siblings, gated the same way: strip only when
  `!masteryVerifiedStrict(state)`).
- **2026-09-12 — FIXED (commit `3d9fab8`), and NOT by extending the regex.** The
  authoritative predicate was never wrong: `gateLessonCompletion` refused the close and
  recorded nothing, exactly as the evidence shows (`completionSuppressed:true`,
  `gatePending:true`). The harm was learner-facing prose only, and every bookkeeping rule
  missed it because this turn contains no bookkeeping sentence at all — no lesson count,
  no "next up is", no "next we explore".
  Adding "the next lesson unlocks" would close that one sentence and invite the next
  phrasing — the enumeration trap this rule has already fallen into four times (each
  recorded in `stanceEnforcement.ts`). The fix keys on STRUCTURE: `client.ts` defines the
  LESSON CLOSING FORMAT and authorises it exactly once, "when evidence is secured and you
  are ready to append [LESSON_COMPLETE]". Rendering that format while the gate refuses is
  an unauthorised close whatever words fill it. `rendersLessonClosingFormat` requires TWO
  distinct sections of a template this repository owns, so it cannot drift with phrasing.
  This resolved a question the module had left open against itself: it had declined to
  touch these bullets as "a change of policy, not a bug fix" while recording that they are
  "a genuine claim about unearned mastery and a real candidate", and asked for the question
  to stay visible. PCD-042 is that evidence. The old policy's protected case survives — a
  LONE motivational recap line is not the template and is pinned as a negative control —
  and two superseded policy assertions keep their original text verbatim in dated
  comments. Guard: `src/tests/pcd042ClosingFormat.test.ts` (11 cases incl. a physics
  cross-subject case, since the runtime is shared).
- **Status:** **FIXED** (2026-09-12, commit `3d9fab8`), code-verified against the real
  `enforceStance`. Mastery/closure AUTHORITY untouched — this strengthens the
  learner-facing half only.

### PCD-043 — Sustained production database outage blocked session creation and login entirely (distinct from PCD-002's isolated per-concept timeouts)
- **Subject/Concept:** Chemistry audit infrastructure, concepts #147-150 (all subjects/all
  learners would have been affected — this is not audit-specific).
- **Evidence:** 4 consecutive concepts failed with `/api/sessions -> 500`. A retry attempt on a
  single concept instead hit a **login failure (HTTP 302)**, twice in a row 15 seconds apart. A
  direct `GET /api/health` check returned `HTTP 503 {"status":"degraded","db":false}` — confirmed
  as a genuine database-connectivity outage, not an account-specific or audit-specific issue.
  Recovery was confirmed the same way (`db:true`) roughly 10-15 minutes later, and all 4 concepts
  succeeded cleanly on retry with zero code changes.
- **Root cause:** Not investigated as part of this read-only audit (would require production
  infra/connection-pool investigation, out of scope). Recorded as a confirmed occurrence, with a
  working, cheap diagnostic (`GET /api/health`) for any future session to check before assuming a
  batch of `/api/sessions` 500s is content-related.
- **Classification:** RECURRING — same failure family as PCD-002 (both are `/api/sessions` 500s
  traced to database/infra issues), but this occurrence was a *sustained, total* outage
  (blocking login itself) rather than isolated per-request timeouts. Worth tracking separately
  since the diagnostic and the blast radius differ.
- **Severity:** P0 — for the duration of the outage, the entire app was unusable for any learner
  (not just this audit), evidenced by login itself failing.
- **Fix priority:** Critical (would need production monitoring/alerting review — not something
  this audit can fix).
- **Fix type:** Architecture/QA (production database reliability monitoring; consider `/api/health`
  as a standard first check for any future investigation of a `/api/sessions` failure cluster).
- **2026-09-12 — NO ROOT-CAUSE FIX; two things done, both stated precisely.**
  (1) The diagnostic half is now built rather than manual: `/api/sessions` classifies its
  own failures as `db_unavailable` / `db_timeout` / `unknown` and returns `kind`
  (commit `1926839`), so a future cluster of 500s identifies itself without the
  `GET /api/health` race this entry recommends. The six events already recorded remain
  historical and cannot be reclassified retroactively.
  (2) Checked against the invariants this task requires and found already honest: during
  the outage the app **refused** — it did not fabricate session state, did not serve a
  learner a session that did not exist, and performed no automatic retry that could
  duplicate state. `/api/health` reported `db:false` truthfully with HTTP 503. Recovery
  was clean with zero code changes, which is the behaviour a DB outage should produce.
  **Related and NOT fixed:** `/api/learn/chat` bounds none of its DB calls (see PCD-002's
  second contributor), so during an outage a chat turn can hang to the platform limit
  rather than failing fast.
- **Status:** OPEN — infrastructure/monitoring, owner-owned. The database reliability
  itself is not fixable from this repository; the diagnosis and the honest-refusal
  behaviour are verified.

---

## E. False-Closure / Premature Completion Claims

### PCD-029 — Confirmation-rate gap: server-graded-correct answers not acknowledged
- **Subject/Concept:** Physics + Chemistry, general.
- **Evidence:** Measured live: only 39% of server-graded-correct answers were acknowledged by
  the tutor's text (a learner gets no "that's right" even though the *system* correctly
  recorded the correct grade).
- **Root cause:** No code-level enforcement existed forcing an acknowledgement to accompany a
  server-confirmed-correct grade; it depended on the model choosing to mention it.
- **Classification:** KNOWN, partially fixed.
- **Severity:** P1 — a correct answer with no acknowledgement reads to a learner as if their
  answer was ignored or wrong.
- **Fix priority:** High.
- **Fix type:** Code (`answerConfirmation.confirmCorrectAnswer`, prepends a confirmation
  sentence keyed off the server's grade, never the model's self-report).
- **Status:** PARTIALLY FIXED — measured live improvement 39% → 65%, but this remains **below
  the 90% gate this program set for itself**. Still OPEN against that target. Note: a later
  measurement effort to recompute this rate found the "65%" figure itself partly a scorer
  artifact after an unrelated payload change (`correctIndex` stripped from the client payload)
  broke the transcript-scorer's own denominator — the *enforcer*'s underlying behavior was
  separately re-confirmed correct via code trace + live capture, but a clean live re-measurement
  of the true rate has not been completed. See OBS-5.

### PCD-030 — Premature next-lesson preview served before mastery was earned ("I3")
- **Subject/Concept:** Physics — quantum-mechanics concept (referred to as "QM_PREMATURE_CLOSE"
  in the source).
- **Evidence:** The tutor's prose included forward-looking language ("Next we explore... Wigner")
  before mastery was actually verified for the current concept — a false-closure-adjacent
  pattern (implying more progress than earned, from the other direction: implying the *current*
  concept is done when it prompts moving on).
- **Root cause:** No stripping was applied to premature "next lesson" preview phrasing when
  mastery was unearned.
- **Classification:** KNOWN — investigated as a fresh report ("I3"), found to have **already
  been fixed** by an earlier, unrelated commit before this specific investigation began.
- **Severity:** P2.
- **Fix priority:** N/A (already closed).
- **Fix type:** Prompt/code (`stanceEnforcement.ts`'s `COMPLETION_CLAIM_RE` strips the pattern
  when `!masteryVerifiedStrict(state)`).
- **Status:** **FIXED** (commit `768dfe3c`), re-verified in the investigating session (offline,
  against the real `enforceStance` function) rather than re-fixed.

### PCD-031 — Phantom figure reference: tutor narrated a diagram that was never rendered
- **Subject/Concept:** Chemistry — Resonance Structures (human-scored 7/10 reference lesson).
- **Evidence:** "The diagram shows nitrogen in the center…" and "Here you see a central nitrogen
  atom…" — but resonance has no faithful figure binding (the binding was retired) and generation
  couldn't produce one, so "draw it" carried no figure at all. The tutor described a diagram
  that was not on screen.
- **Root cause:** No guard stripped figure-referencing language from the tutor's text when no
  figure was actually attached.
- **Classification:** KNOWN, fixed.
- **Severity:** P1 — this actively misleads a learner into believing they're looking at
  something that isn't there.
- **Fix priority:** Critical (was).
- **Fix type:** Code (`stripUnbackedFigureReferences` gained `FIGURE_SUBJECT_CLAIM_RE` and
  `VISIBILITY_DEIXIS_RE` patterns, both no-figure-only, both measured safe against
  graphs/plots/idioms).
- **Status:** **FIXED** (commit `2847db0`). **Open residual, reported not fixed:** chemistry
  still cannot show an *actual* resonance diagram in production (no reviewed/promoted VISUAL
  asset, generation owner-env-gated) — the fix makes the tutor decline honestly instead of
  narrating a phantom, but doesn't give the learner the real diagram they asked for.

---

## F. Session Abandonment / Affect Budget

### PCD-032 — Concept abandoned (marked needsReview) after 3 confusion signals, even with correct reasoning pending
- **Subject/Concept:** Physics — Inelastic Collisions reference lesson.
- **Evidence:** Three confusion signals drove `consecutiveFailures` to the cap; the concept was
  folded `needsReview`, the lesson finalized (`LESSON_COMPLETE` with `check=0/practice=0`), and
  every later turn — including one containing genuinely correct reasoning — served "on pause —
  you haven't mastered it."
- **Root cause:** `evaluateConceptBudget`'s early-exit fired on confusion signals even when the
  learner had zero correct assessed answers and turns remained; confusion was being treated
  identically to a graded wrong answer for budget purposes (same root mechanism as PCD-012).
- **Classification:** KNOWN, fixed.
- **Severity:** P0 — the lesson became permanently unrecoverable mid-session for a learner who
  was still engaged and, moments later, correct.
- **Fix priority:** Critical (was).
- **Fix type:** Code (the `attempts`/`failures` early exits no longer fire while the learner has
  zero correct assessed answers and turns remain; the turn-count backstop still guarantees
  termination).
- **Status:** **FIXED** (commit `5448ad9`), live-verified: the lesson stayed alive across all
  turns, gave genuinely different remediation, met a diagram request, and acknowledged the
  eventual correct reasoning.

### PCD-033 — Content-free filler served beside an attachable, tappable MCQ
- **Subject/Concept:** Physics + (cross-subject) English reference lessons.
- **Evidence:** When the model's whole turn was an ungradeable question that got stripped
  alongside an authored MCQ, the fallback text was "Let's stay with this idea for a moment." even
  when a real tappable MCQ was sitting right beside it.
- **Root cause:** The fallback text didn't know a real MCQ was about to be shown.
- **Classification:** KNOWN, fixed.
- **Severity:** P2.
- **Fix priority:** Medium (was).
- **Fix type:** Code (fallback now hands off to the MCQ: "Let me check your thinking with
  this.").
- **Status:** **FIXED** (commit `5448ad9`/`2847db0`).

### PCD-034 — Filler-repair could loop the identical canned sentence forever ("Case D")
- **Subject/Concept:** Physics/Chemistry, general (Phase 5 audit).
- **Evidence:** A filler-shaped model turn triggered a canned repair sentence; on a model that
  kept producing filler, the same repair sentence could recur indefinitely.
- **Root cause:** No cap existed on consecutive filler-shaped repairs.
- **Classification:** KNOWN, fixed.
- **Severity:** P2.
- **Fix priority:** Medium (was).
- **Fix type:** Code (`fillerRepairStreak` counter caps the repair at 2 consecutive filler-shaped
  turns, then lets the model's own text stand).
- **Status:** **FIXED** (Phase 5, "Architecture hardening — Series B").

### PCD-035 — `recoveryGuard` missed "I still don't know" (missing optional intensifier)
- **Subject/Concept:** Physics/Chemistry, general (Phase 5 audit; specifically named as the
  chemistry knowledge-gap phrase "I still don't know enough about the mole concept").
- **Evidence:** The bare `dont_know` pattern in `recoveryGuard.ts` was the one negated-verb
  pattern with no optional intensifier group, while ten sibling patterns already had one — so
  "I still don't know enough about the mole concept" matched nothing.
- **Root cause:** A single missing regex alternative on one pattern among many similar ones.
- **Classification:** KNOWN, fixed.
- **Severity:** P2.
- **Fix priority:** Medium (was).
- **Fix type:** Code (added `(really|still|just)?` to the one outlier pattern).
- **Status:** **FIXED** (Phase 5).

---

## G. Excursion / Off-Topic Detour Handling

### PCD-036 — An active excursion silently disabled assessment for the whole detour
- **Subject/Concept:** Physics — `phys.mech.newtons-second-law`; Chemistry —
  `chem.atomic.bohr-model`.
- **Evidence:** While an excursion (a learner-initiated detour to a different topic) is active,
  `gateTerms.notExcursion` blocked every authored probe AND the lesson ladder froze. Two lessons
  died on it in one sitting: Newton's Second Law (detour opened turn 5, ran to the end, three
  content-free holds) and Bohr Model (detour opened on an **unresolved title** — `'emission
  lines work'` — which is the lesson's *own* subject matter; blocked all 5 authored probes for 7
  turns; every question served was model-authored and uncertifying, so correct answers banked
  nothing).
- **Root cause:** The excursion-close conditions were too narrow (didn't close on the learner
  naming the lesson's own concept from any sentence shape; didn't close on a request to be
  assessed if the excursion had been opened as a knowledge-gap detour); no bound existed on how
  long an excursion could run (40 turns); a self-excursion (naming the concept already being
  taught) could open at all; the ungraded-question-withholding function stripped questions even
  when the *cause* was the excursion gate, not genuine probe starvation.
- **Classification:** KNOWN, fixed. This is the **variance explanation** the session identified
  for why chemistry lessons scored anywhere from 8/10 to 3/10 depending only on whether the
  learner happened to name an off-topic subject — "not model variance."
- **Severity:** P0 — two lessons, one in each subject, were fully broken by this in a single
  observed sitting.
- **Fix priority:** Critical (was).
- **Fix type:** Code (four behavior changes: R1.1 close-on-lesson hoisted above other checks and
  no longer request-shaped-only; R1.2 close-on-wants-practice un-scoped from
  knowledge-gap-only opens; R2 `MAX_EXCURSION_TURNS` 40→6; R3 exact-identity self-excursion
  block; R4 `withholdUngradedGateQuestion` gained a `gateBlockedByExcursion` flag so a
  gate-blocked-by-excursion turn isn't misdiagnosed as pool starvation).
- **Status:** **FIXED** (commit `98939a0`), production-verified: no detour on a self-named
  lesson concept; genuine excursions still open normally; the previously-unfinishable Newton's
  Second Law lesson reached full verified mastery; zero content-free holds in the verification
  run.
- **Note — explicitly withdrawn design, do not revive:** a "retarget" design (attaching a probe
  from the excursion target's own pool while paused) was proposed and rejected — it would destroy
  a reviewed probe for zero evidence banked, since detour-turn answers don't fold into any
  mastery counter while paused.

---

## H. UI / Navigation

### PCD-037 — Previous/Next lesson buttons navigated backward or did nothing (chemistry reproduction)
- **Subject/Concept:** Chemistry — reproduced using the real account's own
  `GET /api/curriculum?subject=chemistry` payload (`currentLesson=1`, `activeLessonSlug`
  pointing at order-3 lesson `chem.found.pure-substances`). Shared logic — not chemistry-specific
  in cause, but chemistry is the reproduction case on record.
- **Evidence:** With that real payload, `findNextLesson` answered "next → order 2 (BEHIND the
  open lesson)" and `findPreviousLesson` answered "prev → null" (renders the button disabled).
  "Previous" did nothing; "Next" went backward.
- **Root cause:** Both functions anchored on `progress.currentLesson` (a completion counter that
  only advances on a recorded complete/skip), not on the lesson actually open
  (`resolveActiveLesson()`, which honors `activeLessonSlug`) — they diverge the instant a
  learner opens a lesson ahead of their recorded progress, the ordinary case. A second bug meant
  nothing wrote `activeLessonSlug` back to client state on lesson-init, so a second tap of "Next"
  could re-open the same lesson.
- **Classification:** KNOWN, fixed.
- **Severity:** P1 — core lesson navigation broken for any learner who ever opens a lesson ahead
  of their recorded completion count (i.e., almost everyone).
- **Fix priority:** Critical (was).
- **Fix type:** Code (`findNextLesson`/`findPreviousLesson` resolve their anchor via
  `resolveActiveLesson`; client writes the target slug back to local progress on a successful
  lesson-init).
- **Status:** **FIXED** (commits `94f8c1b`, `7ca5d4b`), re-confirmed against the live payload
  post-deploy (`next → 4`, `prev → 2`).

### PCD-038 — Dropped-qualifier concept resolution: "thermal conductivity" resolved to the wrong physics concept
- **Subject/Concept:** Physics — `phys.em.resistivity` (electrical conductivity) served for a
  learner asking about heat.
- **Evidence:** "What is thermal conductivity?" resolved to "Resistivity and Conductivity" —
  electrical, not thermal.
- **Root cause:** A one-word conjunct of a compound title ("conductivity") was admitted as a
  match whenever it occurred in exactly one title across all 1,775 concepts, which is a claim
  about the KG's *completeness*, not about the world — the corpus genuinely has no
  thermal-conductivity concept, so "conductivity" alone matched the only concept that has the
  word at all.
- **Classification:** KNOWN, fixed.
- **Severity:** P1 — actively misled a learner into content about the wrong physical quantity.
- **Fix priority:** Critical (was).
- **Fix type:** Code (a one-word title-component match is dropped when the qualifier
  immediately preceding it belongs, unambiguously, to a different domain than the matched
  concept).
- **Status:** **FIXED** (commits `348b1f6`/`1e8bcff`). Honest residual: "thermal conductivity"
  now correctly resolves to *nothing* rather than the wrong thing, because the physics KG
  genuinely has no such concept — adding it is curriculum-pipeline work, not this fix's job.

### PCD-039 — Requested visual form mismatch: asking for a graph served an unrelated curated diagram, presented as if it satisfied the request
- **Subject/Concept:** Physics — Ohm's Law lesson.
- **Evidence:** "Can you graph this?", "show me a graph of this," and "can you draw a diagram"
  all attached the identical curated `electric_circuit` scene — the right curated figure for the
  *lesson*, but not a graph, and the tutor didn't say so.
- **Root cause:** No mismatch was declared between the requested visual *form* (graph/plot/
  animation) and what was actually served.
- **Classification:** KNOWN, fixed.
- **Severity:** P2 — not factually wrong, but silently non-responsive to the specific request.
- **Fix priority:** Medium (was).
- **Fix type:** Code (`requestedVisualForm()` detects unmistakable form requests;
  `buildVisualContractBlock` declares the mismatch instead of silently resolving it).
- **Status:** **FIXED**, production-verified: "Can you graph this?" now answers "I don't have a
  graph of this, but here is the circuit it describes…"

---

## Appendix — Notes on Sourcing and Honesty Constraints

- The Chemistry Full-Curriculum Audit that produced most of Section D/section-specific chemistry
  entries above is now **COMPLETE — 186/186 concepts audited**, verified 0 coverage gaps
  (all concept orders 1-186 present) and 0 duplicate `lessonComplete` keys across the full
  curriculum (PCD-005). This document reflects the complete chemistry defect record as of
  2026-09-12.
- Two items (PCD-007's "first recurrence" concept ID, and PCD-021's exact concept IDs) are
  deliberately reported with less specificity than the rest of this file. An earlier
  context-compaction event in the authoring session lost the exact concept IDs for these
  findings; rather than fabricate a plausible-looking ID, this file states the finding at the
  level of detail actually verifiable from the surviving record (theme + severity + evidence
  category) and flags the gap explicitly.
- No defect in this file was fixed, modified, or otherwise altered as part of producing this
  document. Every "FIXED" status reflects a fix made and shipped in a genuinely separate,
  earlier session, cited by commit where a commit hash was available in the source record.

---

## Observations / Ruled-Out False Positives

### OBS-1 — `chem.equil.acids-bases` (#62) BF3/NH3 example: NOT cross-contamination
Looked like content bleeding in from `chem.bond.coordinate-bond` (#36), but BF3–NH3 is the
standard textbook Lewis acid-base example, and Acid-Base Theories legitimately covers Lewis
theory. Confirmed on-topic; not a defect. Important negative result — demonstrates the audit is
not over-flagging superficial keyword overlaps.

### OBS-2 — "Hello test2" in `chem.solid.properties` (#94): NOT an artifact leak
Looked like a raw internal test-account placeholder leaking into the tutor's reply. Confirmed
"test2" is this account's actual stored profile display name — it appears consistently across 8+
other concepts throughout the audit. Legitimate personalization, not a defect.

### OBS-3 — "I2" (identical MCQ re-offered before advancing): not a distinct defect
Investigated as a separately-reported symptom. Found to be the same seam as PCD-009/PCD-025 and,
where the *same* probe is genuinely still pending and ungraded, intentional behavior
(`mcqToServe` deliberately carries forward a probe that hasn't been graded yet, so the client
can't blank an on-screen probe). The one case this would *not* cover — a spent probe being
re-served — is independently guarded elsewhere (`excludeProbeStem` in
`teachingActionRepository.ts`). No code change was made under this investigation.

### OBS-4 — "I3" (premature next-lesson preview prose): already fixed before this investigation
Investigated as a separately-reported symptom; found to already be fixed by an earlier commit
(`768dfe3c`) already in the deployed history. Re-verified via a targeted offline test rather than
re-fixed. See PCD-030 for the full record.

### OBS-5 — The "65% confirmation rate" figure is partly a measurement/scorer artifact
A follow-up attempt to re-measure PCD-029's confirmation rate found the transcript scorer's own
denominator computation had been broken by an *unrelated* payload change (`correctIndex` was
deliberately stripped from the client-facing MCQ payload as a separate P0 security fix), which
made the offline scorer's `answeredOption()` helper return null on every turn post-fix — so a
transcript-based recomputation of "65%" is not meaningful post-fix. The *enforcer's* own
behavior (does it fire correctly on a server-graded-correct turn?) was independently re-confirmed
via code trace and live capture and is not in question — only the specific numeric rate figure
computed by replaying old transcripts is unreliable going forward. PCD-029 remains open against
the live enforcer's true rate, which needs a fresh live measurement (not a transcript replay) to
pin down.

### OBS-6 — Missing confirmation specifically on the lesson-completion turn: intentional, not a defect
On the turn a lesson completes, the reply is deterministically replaced with a stronger,
complete closing message (`buildLessonCloseText`, e.g. "That's Newton's First Law finished —
nice work.") which runs *after* the confirmation enforcer and discards its shorter
"That's right." sentence. This is a deliberate design choice (a tappable follow-up question
would re-open a finished lesson) — a transcript-based scorer counts it as a "miss" because the
close text doesn't match the confirmation regex, but this is a detector limitation, not a
learner-facing problem. No code change made.

### OBS-7 — Chemistry Defect-1 pattern (stale/duplicate `lessonComplete`): checked, not reproduced
See PCD-005 above — listed both as a "defect" entry (to satisfy the explicit instruction to
report every recurrence check) and cross-referenced here since its actual finding is a *negative*
result: zero duplicates across all 60 completions through the complete 186/186 chemistry curriculum.

---

## Summary Counts (confirmed defects only, i.e. `PCD-*` entries; excludes Observations)

| Severity | Count |
|---|---|
| P0 | 9 |
| P1 | 15 |
| P2 | 15 |
| P3 | 2 |
| **Total confirmed defects** | **41** |

Status breakdown — **UPDATED 2026-09-12 after the remediation pass** (commits `3d9fab8`,
`6326c91`; `1926839` for the session-failure classifier). Superseded line, kept for history:
*"18 FIXED, 2 PARTIALLY FIXED, 1 MONITORING, 20 OPEN."*

Current: **25 FIXED**, **2 PARTIALLY FIXED** (open against their stated target),
**1 MONITORING**, **13 OPEN**. (`PCD-005` and `PCD-028` remain excluded from all counts —
a "checked, not reproduced" record and a withdrawn cross-reference stub, not confirmed
defects.)

Seven entries changed status this pass, each on its own evidence rather than by association:

| PCD | Why it moved |
|---|---|
| **002** | P0. Root cause proven by arithmetic over the repo's own constants — the provider chain's worst case (44.5s default, **66.5s Russian**) against a 60s `maxDuration`, so the PLATFORM killed the lambda and no catch could run. Chain now bounded by one wall clock, each attempt raced against the remaining budget. Second contributor (unbounded DB calls in `/api/learn/chat`) named, not patched. |
| **004** | P1. **Was already fixed on `main` when this entry was written** (`6e94a3c`): the lesson pointer is session-scoped in `contextSnapshot`. Re-verified, not assumed — 79 assertions, including the two-simultaneous-sessions isolation case. |
| **026** | P2. Keyword collision removed from the calculus route rule; `chem.kinet.arrhenius` measured through the real resolver now returns `source:'none'` — no substitute figure. |
| **027** | P1. Same; `chem.state.phase-diagram` returns `source:'none'`, so the factually-wrong calculus plot is unreachable. Authoring a real phase-diagram figure remains separate content work. |
| **040** | P1. **Causality was backwards.** The binding is static: the statistics generator's hardcoded "Frequency Distribution"/"is the mode"/"31.8 observations" chrome taught the misconception, and the tutor read it. Fixed on the generator — a second concept had it too. |
| **041** | P2. Root cause is an ABSENCE: no curated binding, so every turn generated independently. Authored one from Shannon radii; verified deterministic and serving at `source:'registry'`. |
| **042** | P1. Closure AUTHORITY was never wrong — the gate refused correctly. Fixed the learner-facing half STRUCTURALLY (the closing FORMAT, which `client.ts` authorises only at `[LESSON_COMPLETE]`) rather than by adding another phrasing to a regex that has already missed four times. |

**PCD-003** and **PCD-043** stay OPEN and are unchanged in substance: the database
reliability itself is not fixable from this repository. What changed is that a recurrence
is now self-classifying (`db_unavailable` / `db_timeout` / `unknown`) instead of an opaque
500, and the outage behaviour was checked against this task's invariants and found honest
— nothing fabricated, nothing auto-retried into duplicate state.

## Diagram Quality — Full Chemistry Curriculum (186/186)

Every diagram/visual actually served during the chemistry audit was rated **clean / weak /
misleading / wrong**, per concept, with a one-line reason — not just a binary "visual present or
not." Final tally across the complete 186-concept curriculum:

| Rating | Count | Meaning |
|---|---|---|
| Clean | 94 | Accurate, relevant, legible — genuinely helps understanding |
| Weak | 19 | Correct content but generic/decorative, ASCII-art fallback, or otherwise low-value |
| Misleading | 2 | Partially correct but could lead to a wrong conclusion |
| Wrong | 3 | Factually incorrect or wrong-domain for the concept being taught |
| Unverified | 4 | Flagged for inspection but not fully verified (from the physics audit's carry-forward tally) |
| **Total inspected** | **122** | |

**The 3 "wrong" diagrams** (the most severe diagram-quality findings across both curricula):
1. `chem.state.phase-diagram` (#42) — served a calculus "critical points" plot instead of a
   chemistry phase diagram (PCD-027).
2. `chem.kinet.arrhenius` (#86) — served a generic thermodynamics "Closed System" diagram for
   the Arrhenius equation (PCD-026).
3. `chem.coord.stability` (#106) — served a "Frequency Distribution" statistics chart, matching
   a conceptually confused analogy the tutor itself constructed (PCD-040) — the single worst
   diagram+content pairing found in either audit, because the *prose* was wrong, not just the
   picture.

**The 2 "misleading" diagrams** were found earlier in the audit (concepts 1-80, before this
file's per-entry PCD numbering reached that range in detail) and are carried forward from the
running tally established during the live checkpoints; see the audit's checkpoint history for
their specific identification if needed for a future pass.
