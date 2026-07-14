# Runtime Maintenance Transition

**Status**: Final planned runtime-architecture document. Not an ADR, not
a redesign, not code. This document officially hands ownership of
innovation from Runtime Engineering to Educational Brain Authoring.

**Predecessor documents (accepted)**: Migration Blueprint V1 → Wave 0
implementation → Wave 1 (Runtime Guardian) → Runtime ↔ Educational Brain
Contract. This is their closure.

---

## 1. Executive Summary

Runtime Engineering is entering maintenance mode because it has finished
the job it existed to do: build a deterministic execution engine that
retrieves and runs authored teaching instead of improvising it. Every
teaching decision the runtime makes each turn — placement, first-lesson
constraints, which action runs, how that action executes, when to
recover, when a session opens and closes, what mastery evidence to
record — is now computed or retrieved from the Educational Brain, not
invented by the LLM at inference time.

There is no longer meaningful competitive advantage to be found in
runtime code. The advantage now lives entirely in two places: the depth
of authored Educational Brain knowledge flowing into the retrieval
pipes, and the production evidence flowing back out of them. Both are
outside the runtime's control surface.

**The Educational Brain is now the primary product.** The runtime is the
operating system it runs on — and a good operating system, once stable,
gets out of the way.

## 2. What Runtime Now Guarantees

Every capability below exists in code on `claude/my-tutor-foundation-KDSUO`,
is exercised by the test suite (697 passing / 1 skipped, tsc clean), and
executes authored Brain rules rather than LLM judgment:

- **Placement** — self-report treated as a hypothesis; three-bracket
  verification (below/at/above, nerve-settler first); affect budget
  stops probing at two failures; downward-only, silent adjustment;
  never-reveal framing; no fake completions; verification inherited
  across sessions.
- **Lesson One** — deterministic first-lesson protocol (one concept,
  ≤3 new words, demonstrate-before-explain, ≤6 questions, failure
  budget 1, mandatory close) with per-subject adaptations; the memory
  path is suppressed so lesson one is never served as a static quiz.
- **Decision Engine** — `decide()` fires on every KG-backed Library
  turn (and school turns), emitting mode/action/difficulty/goal
  deterministically; the fast-wrong and hesitant-correct quadrants of
  the D1 grid drive an explicit last-answer read.
- **Evidence writing** — per-turn PROBE_OUTCOME (correctness × server-
  measured latency × confidence), MISCONCEPTION_DETECTED (verbatim
  phrase), ASSET_SHOWN, LEARNER_FEEDBACK (recovery events); append-only,
  single-writer, fire-and-forget, the decision-consequence join live.
- **Mastery accumulation** — every Library answer folds into
  TopicProgress at conversational-checkpoint semantics; confident-wrong
  routes to the misconception machinery; conversation never certifies a
  gate.
- **Session lifecycle** — 30-minute inactivity boundary from real
  timestamps; OPENING/CORE/CLOSING machine; engineered win owed after
  failure-then-vanish; affect-budget close.
- **Recovery** — deterministic failure-state utterance detection
  preempting everything (calibration, assessment, memory path);
  authored scripts retrieved with lesson-one deltas.
- **Review-first** — due reviews retrieved and ordered before new
  content at every genuine session open, as produce-the-answer
  retrieval.
- **Library execution** and **School execution** — symmetric evidence
  and decision paths; school-specific pipelines (board/grade/chapter)
  preserved untouched.
- **Teaching Action execution** — the authored HOW for each of the six
  ActionTypes decide() emits (demonstration, worked-example→completion
  with self-explanation, questioning with the two-question ceiling,
  faded practice on the fluency gate, the ordered 7-step repair,
  retrieval practice).
- **Brain retrieval** — ACTIVE explanation/probe assets served before
  the LLM is called (`assembleLesson` → `provider: 'memory'`), with the
  seed pipeline for authored concept entries.
- **Runtime ↔ Brain contract** — the permanent interface specification
  both sides build against.

## 3. What Runtime Will Continue To Do

Maintenance responsibilities only:

- Bug fixes and correctness regressions.
- Security (authn/authz, input bounds, data protection, dependency
  patching).
- Performance and cost (latency, token budgets, query efficiency) —
  only where it does not alter teaching behavior.
- Scalability and reliability (the 100M-learner targets, connection
  pooling, caching that respects the contract).
- Production monitoring, observability, deployment support.
- **Evidence Engine readers — when, and only when, production data
  exists.** The writers are all live; the readers (recovery efficacy
  aggregation, action-outcome tables, per-concept decay norms,
  placement-prior retuning) would read empty tables today and are
  therefore deferred until real learners fill them.
- Snapshot optimistic-concurrency hygiene (a known, bounded, pre-
  existing risk — engineering hygiene, not teaching behavior).
- Wiring newly-authored FUTURE retrievals (protocols, primitives, CPA)
  to the contract's already-specified retrieval shapes when the Brain
  authors them — additive, not redesign.

## 4. What Runtime Will NEVER Do

- ❌ Invent pedagogy, teaching strategies, or teaching methods.
- ❌ Create, modify, or delete misconceptions, their probes, or their
  repair sequences.
- ❌ Write protocols, primitives, CPA sequences, or explanations.
- ❌ Decide teaching strategy, action, pacing, placement level, or when
  a session ends — all are computed or retrieved; the AI renders words.
- ❌ Invent or edit mastery thresholds, gate criteria, or spacing
  intervals (Brain-defined; runtime cites, never authors).
- ❌ Duplicate Educational Brain logic or build a parallel system where
  the live pipeline can be extended.
- ❌ Introduce any learner-affecting behavior that cites no Brain source
  and appears in no contract section (no hidden runtime rules).
- ❌ Canonize LLM fallback output as ACTIVE without human review.

## 5. Ownership Matrix

| Domain | Owner |
|---|---|
| Retrieval, orchestration, persistence, scheduling | **Runtime Engineering** |
| Evidence writing, mastery state (rows/folds), session lifecycle execution | **Runtime Engineering** |
| Security, performance, scalability, reliability, monitoring | **Runtime Engineering** |
| Teaching actions, protocols, primitives, CPA sequences | **Educational Brain** |
| Misconceptions, recovery scripts, explanations, worked examples | **Educational Brain** |
| Assessments (probes, distractor maps, rubrics, gate definitions) | **Educational Brain** |
| Mastery definitions, thresholds, evidence rules, spacing policy | **Educational Brain** |
| Natural-language realization, register rendering, example values | **AI** |
| Curriculum / Knowledge Graphs | **Curriculum Production Pipeline** |
| Roadmap, prioritization, data governance, launch decisions | **Product** |

## 6. Future Runtime Evolution Rules

The runtime may change only when one of these is proven:

1. **Production evidence demonstrates a need** — a measured failure,
   inefficiency, or opportunity backed by real learner data (§7).
2. **The retrieval contract cannot express a new capability** — the
   Brain authors something the §3 retrieval shapes genuinely cannot
   carry, requiring an additive contract extension (both-team sign-off,
   recorded in the contract's compatibility section).

Everything else — new teaching intelligence of any kind — belongs to the
Educational Brain and requires zero runtime change by construction. A
runtime pull request that adds, reorders, or alters what is taught,
rather than how it is retrieved/persisted/scheduled, is rejected on
sight as a contract violation.

## 7. Evidence Required Before Any Runtime Redesign

No runtime redesign is justified without production data of the
following kinds. Each is a number the Educational Brain says must be
measured, not intuited — engineering them from guesswork is forbidden:

- **Mastery statistics** — real gate-pass rates, false-mastery
  frequencies, the true predictive value of the conversational 65/25
  checkpoint.
- **Recovery effectiveness** — which authored script, for which entering
  state and age, actually restores a learner, by measured time-to-
  restore.
- **Review retention** — real forgetting curves per concept; whether the
  spacing schedule holds against measured decay.
- **Protocol / action success rates** — the empirical action-
  effectiveness table (action × knowledge type × age × outcome).
- **Misconception frequencies** — real prevalence and regrowth curves by
  birth type; which collision designs durably work.
- **Signal validity** — whether the LLM's self-reported SIGNAL agrees
  with ground truth often enough to trust, or whether real
  instrumentation (voice timestamps) must replace it.
- **Placement accuracy** — measured frontier vs. placed frontier, to
  retune the trust priors.

Until these exist: **no runtime redesign.** The Evidence Engine writers
are live precisely so this data begins accumulating from the first real
session.

## 8. Official Runtime Stop Declaration

**Runtime has reached feature completeness for the current Educational
Brain vision.**

This is stated explicitly and without hedging. Every deterministic
connection the Educational Brain currently authors and that can be
executed without real student data has been built, tested, and frozen
behind the Runtime ↔ Educational Brain Contract. The Runtime Guardian
audit swept every search area and found exactly one remaining
connectable gap (action-procedure retrieval), which Wave 1 closed;
every other candidate failed the five-proof test — because it needs
production evidence, needs Brain authoring that does not yet exist, or
is out of the runtime's lane.

No additional runtime feature work is required or justified at this
time. Further runtime change awaits the evidence in §7 or an additive
contract extension per §6.

## 9. Final Recommendations (maintenance guidance)

- **Keep the pipes clean, not clever.** The runtime's value is now
  reliability and faithfulness, not innovation. Resist "small
  improvements" to teaching behavior — they are contract violations
  wearing a helpful face.
- **Enforce the transcription-sync rule.** The cited TS modules
  (firstLessonGuard, actionProcedures, recoveryGuard, brainSeedAssets)
  are the one place teaching text lives in runtime. Any change to them
  must edit the Brain source first and cite it. A reviewer who sees a
  teaching-text diff without a Brain-source citation rejects it.
- **Turn on the Evidence readers the day real data exists — not before.**
  Building them against empty tables produces dead code and false
  confidence.
- **Run the local verification before any deploy.** Seed the Brain
  assets, then confirm: memory-serve on a seeded concept; a failure-
  state utterance preempting into recovery; a return after >30 min
  opening with reviews first.
- **Resolve the two owner-gated items before public launch:** data
  governance for minors' verbatim capture, and the snapshot
  optimistic-concurrency pass. Neither is a teaching-behavior change;
  both are operational prerequisites.
- **Treat every new subject as content, not code.** A KG-backed subject
  is 1 JSON + 2 registry lines + Brain authoring; the runtime activates
  automatically. If a new subject ever seems to need runtime code, stop
  and check the contract — it almost certainly does not.

## 10. Closing Statement

The Runtime is no longer the competitive advantage.

The Educational Brain is the competitive advantage.

The Runtime is now a stable operating system for the Educational Brain —
finished, frozen, and faithful. It executes what the Brain authors,
records what the student does, and gets out of the way. It will not
invent teaching, and it no longer needs to.

Future value comes from two things only: authoring the Educational Brain
deeper and wider, and letting a million real students turn its writers
into the evidence no competitor can copy. Both flow through pipes that
are now built, verified, and closed behind a permanent contract.

Runtime Engineering, having built the machine that executes the world's
best teacher, now steps back so that teacher can be written.
