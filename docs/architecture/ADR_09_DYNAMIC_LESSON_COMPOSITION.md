# ADR 09 — Dynamic Lesson Composition (ARCHITECTURE SPECIFICATION — NOT IMPLEMENTED)

> Author: Chief Educational Brain Architect (Claude session)
> Date: 2026-06-30
> Status: **PROPOSED ARCHITECTURE SPECIFICATION. ZERO CODE CHANGES.**
> Scope: design only. No `route.ts` change. No schema change. No new
> engine written. No existing engine's pure-function signature altered.
> This ADR names a gap in how the Dynamic Lesson Composer's output is
> carried across turns and specifies an additive extension reusing a
> pattern already proven elsewhere in this codebase; it does not build
> the extension.
> Priority: **#4** in the user's 8-item Educational Brain architecture
> roadmap — "Dynamic Lesson Composition."
> Standing constraint this ADR operates under (explicit, this session):
> do **not** implement anything, do **not** request implementation
> approval. Implementation begins only after the Curriculum Production
> Pipeline declares Canonical Knowledge Graph v1 frozen **and** the user
> explicitly approves execution. This document is allowed to design; it
> is not allowed to build.
> Pre-ADR checklist completed this turn (per the user's binding,
> refined-this-session requirement): re-read
> `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` in full, then ADR 02
> through ADR 08, `ARCHITECTURE_DECISIONS.md`, `ENGINE_REFERENCE.md`
> Engine 12 and Engine 21, and `docs/project-memory/PROJECT_STATE.md`.
> No conflict was found between this ADR's direction and any frozen rule
> or prior ADR — see §11. The Bible is updated as part of this ADR's
> deliverables (§0 governance rule: "an ADR that does not update the
> Bible is not finished").

---

## 1. Problem

**The Dynamic Lesson Composer (`lessonComposer.ts`) is presented to the
tutor every turn as a multi-turn pacing guide, but the system has no
memory of which stages already happened.**

`buildLessonPlanBlock()`'s own advisory text tells the AI: *"This is a
multi-turn pacing guide ... move through stages naturally as the
conversation progresses."* But nothing backs that instruction with
state. Every turn that the Action layer runs (`route.ts` ~1372–1383),
`getLessonPlan()` is called fresh, `composeLessonPlan()` rebuilds the
full ordered `LessonStage[]` from the current `TeachingDecision` +
`TeachingAction` + `AssessmentDecision` + misconception/review signals,
and `buildLessonPlanBlock()` renders the **entire stage sequence from
stage 1** into the system prompt — with no indication of whether stage 1
("prerequisite activation") already happened two turns ago, whether
guided practice is already underway, or whether the mastery check is
still pending. The tutor must infer continuity purely from conversational
context; the Educational Brain itself carries zero explicit signal about
it.

This is a sharper, more specific finding than ADR 08's: ADR 08 found
*who* gets a `LessonPlan` (School-only in practice). This ADR finds that
even where a `LessonPlan` **is** produced, it has no persisted
*continuity* — each turn is architecturally a fresh re-plan, never an
explicit "continue where we left off."

**The codebase already has a working answer to this exact class of
problem, just scoped narrower.** The Interactive Worked Examples
sub-system (`src/lib/school/tutoring/workedExamples.ts`, "Sprint CH")
solves precisely this — multi-turn progress through a structured,
ordered sequence — for one specific stage type (`worked_example`):

```ts
// workedExamples.ts — the proven pattern
// 1. The AI is instructed to emit a progress tag at the end of its turn:
//    [WE:concept|currentStep|totalSteps]  or  [WE:done]
// 2. parseWorkedExampleTag() extracts it server-side and strips it from
//    what the student sees.
// 3. The parsed state is persisted to contextSnapshot.currentWorkedExample.
// 4. Next turn, buildWorkedExampleBlock({ resuming: true, currentStep, totalSteps })
//    explicitly tells the AI: "This worked example is ALREADY IN
//    PROGRESS (step N of ~M). Continue from where you left off ...
//    do NOT restart from step 1."
```

The Dynamic Lesson Composer's broader `LessonPlan` — which is the
general case the worked-example mechanism is a special case of — has no
equivalent. `contextSnapshot` already persists four other pieces of
Teaching-tier continuity state (`currentConceptNodeId`,
`lastSuccessfulTeachingStyle`, `lastPrerequisiteGap`,
`currentWorkedExample`), proving the codebase already treats this JSON
field as the canonical place for "what happened last turn that this
turn needs to know" — but lesson-stage progress is conspicuously absent
from that list, even though it is architecturally the same kind of
fact.

A world-class human teacher never replans a lesson from a blank slate at
the start of every sentence — they know exactly which part of the lesson
they're in and adapt the *plan*, not regenerate a brand-new one each
time they speak. Today's Educational Brain technically *can* reproduce a
coherent plan each turn (since `decide()`/TAG/the Composer are
deterministic given the current signals — see §2), but it cannot
distinguish, and currently does not even try to distinguish, between two
very different situations that look identical in the code today:

1. **Genuine continuation** — nothing pedagogically relevant changed
   since the last turn; the plan should pick up exactly where it left
   off.
2. **Genuine replan** — a signal changed (a misconception was resolved,
   practice accuracy crossed a threshold, the assessment became due) and
   a different plan is now correct, exactly as a real teacher would
   adapt.

Both cases currently produce the same code path: a full plan, presented
from stage 1, every time.

## 2. Evidence

**`composeLessonPlan()`'s pure core has no turn-history input.** Its
signature is `(decision: TeachingDecision, action: TeachingAction,
assessment: AssessmentDecision | null, concept: ConceptNode, context:
LessonComposerContext)` (`lessonComposer.ts:293`) —
`LessonComposerContext` is `{ activeMisconceptions, reviewDueConceptIds
}` only. There is no parameter carrying "what stage was reached last
turn," "what plan was shown last turn," or any prior-turn reference at
all. Confirmed by reading the full 401-line file: zero references to
`contextSnapshot`, zero references to message history, zero references
to any prior `LessonPlan`.

**`getLessonPlan()` / `buildLessonPlanBlock()` are called fresh every
turn with no caching.** `route.ts` ~1372–1383 (inside the same
`if (snapshotCurrentConceptId)` block ADR 08 examined) calls
`getLessonPlan()` unconditionally whenever the Action layer runs, with
no check against any previously persisted plan or stage marker.

**`ENGINE_REFERENCE.md` Engine 12 confirms this is the documented,
current behavior, not an oversight in this audit.** Its "Side effects"
line reads *"None (pure); async wrapper performs a read-only Assessment
Intelligence lookup"* and its "Guarantees" section says nothing about
cross-turn state — consistent with the code, and confirming the gap is
real and previously undocumented as a gap (it was simply described as a
fact, not flagged as a limitation, until this ADR).

**The deterministic shape of `buildCoreStages()` means persisted
progress would track a stable target, not a moving one, in the common
case.** `buildCoreStages()` (`lessonComposer.ts:221`) is a pure `switch`
keyed only on `action.action_type` — a 10-value `TeachingActionType`
that TAG derives from `decision.action_type` + `subjectSlug` +
`visualType` + `assessmentType` (`teachingActionGenerator.ts`,
confirmed in ADR 08 §2). In steady state — i.e. while the student keeps
working on the same concept and no underlying signal changes — TAG
produces the same `action.action_type` turn after turn, so
`composeLessonPlan()` produces a `LessonPlan` with the **same stage
sequence** turn after turn. This means a persisted "we are at stage N of
this plan" marker is tracking something real and stable, not guessing at
a target that reshuffles on every call for no reason — the cases where
the plan *does* change shape are exactly the cases where a genuine
signal changed (mastery improved, a misconception resolved, an
assessment became due), which is precisely when a real teacher would
also replan.

**A confirming, not new, piece of evidence connects this engine to an
already-documented risk.** `masteryCheckStage()`'s `completion_criteria`
string (`lessonComposer.ts:191`) reads `` `Score at or above
${assessment.mastery_threshold}% ...` ``, and `assessment.mastery_threshold`
is sourced from the flat `ASSESSMENT_PASS_THRESHOLD` constant in every
branch of `assessmentIntelligence.ts` (confirmed by reading all six
assignment sites) — the same already-documented R3/Finding 7 issue
(`mastery_threshold`'s real per-concept variation, 0.35–0.95, has zero
runtime effect). This is not a new finding; it is evidence that R3's
effect reaches further downstream than previously traced — all the way
into a Lesson Composer stage's literal completion-criteria text. Noted
here for completeness; no new Finding is opened for it.

**The two-`LessonPlan`-types naming overlap (Finding 1 / R10) is
directly adjacent to this ADR's subject matter.** This ADR's proposal
concerns only the Dynamic Lesson Composer's `LessonPlan` (turn-level
stage sequence, `lessonComposer.ts`), never `lessonPlanner.ts`'s
chapter-roadmap `LessonPlan`. Confirmed no change to either type's name
is proposed here — this ADR does not worsen or resolve the existing,
already-documented overlap.

## 3. Alternative designs

**Option A — Leave the Composer fully stateless (current).** Rejected.
Fails the world-class-teacher test directly (a real teacher always knows
where they are in a lesson), and structurally blocks future Evidence
Engine work (roadmap item #5/§6.6) from ever answering "was the planned
lesson actually followed" — there is no signal to check that against.

**Option B — Persist lesson-stage progress using the same proven
AI-emitted-tag pattern the Interactive Worked Examples sub-system
already uses, extended from one stage type to the general `LessonPlan`.**
A new `contextSnapshot.lessonStageProgress` key tracks `{ conceptId,
planSignature, stageIndex, totalStages }`, where `planSignature` is a
cheap deterministic fingerprint of what determines plan *shape*
(`concept.id` + `action.action_type` + whether an assessment stage is
present + stage count) — not the full plan content. The AI emits a
lightweight progress tag, parsed server-side exactly like
`parseWorkedExampleTag()`, and `buildLessonPlanBlock()` gains an optional
"resuming" framing exactly like `buildWorkedExampleBlock()` already has.
When a freshly recomputed plan's signature matches the persisted one,
the prompt says "stages 1–N already covered, continue from stage N+1."
When it doesn't match, persisted progress is discarded and the new plan
is presented as a fresh plan — an explicit, named "replan" event rather
than a silent inconsistency. **Selected.** Reasoning in §4–§5.

**Option C — A fully normalized `LessonStageProgress` Prisma model with
per-stage timestamps, queryable independently of `contextSnapshot`.**
Rejected for this ADR, not permanently. This would be the right shape
*if* the near-term goal were stage-level analytics (e.g. "average time
spent per stage type across all learners") — but that goal belongs to
the Evidence flow, which `EDUCATIONAL_BRAIN_BIBLE.md` §6.6 already
explicitly defers to ADR 10 (Student Memory Evolution) as a dedicated,
not-yet-audited topic. Building a normalized table now, before ADR 10
specifies the unified evidence model, risks the same "redesign once the
next roadmap item lands" trap ADR 07 §3 and ADR 08 §3 already rejected
for their own Option-D-style alternatives. Flagged explicitly in §14 as
an input ADR 10 should consider, not solved here.

**Option D — Make the Composer "diff-aware" by heuristically inferring
completed stages from the conversation's message history instead of an
explicit signal.** Rejected. This would require either re-running an LLM
classification over the transcript (violating the governing rule that
only the AI Router is probabilistic and that it never makes a
*decision* — Permanent Rules 9–10) or a brittle keyword-heuristic
parallel to the one explicit-tag pattern the codebase has already
chosen and proven for this exact problem class. Introducing a second,
different mechanism for "track multi-turn progress through a structured
sequence" — one explicit-tag-based (worked examples), one
heuristic-based (lesson stages) — directly violates this session's core
principle to avoid duplicate systems for the same responsibility.

## 4. Selected design

**Persisted lesson-stage progress, extending the Interactive Worked
Examples pattern from one stage type to the Dynamic Lesson Composer's
full `LessonPlan`.** Three additive pieces, none implemented:

### (a) `contextSnapshot.lessonStageProgress`

A new optional key, structurally parallel to the existing
`currentWorkedExample` key:

```ts
lessonStageProgress: {
  conceptId: string        // matches LessonPlan.concept_id
  planSignature: string    // fingerprint of plan SHAPE, not content
  stageIndex: number        // 0-based index of the next stage to start
  totalStages: number
} | null
```

`planSignature` is computed from inputs that already determine
`buildCoreStages()`'s output deterministically — `concept.id` +
`action.action_type` + a boolean for whether the assessment/practice/
review/transition optional stages are present this turn (the same
booleans `composeLessonPlan()` already evaluates at lines 306–328). It
is **not** a hash of the rendered plan text, and it requires no new
field on `LessonPlan` itself — it can be derived by the calling code in
`route.ts` from the already-returned `LessonPlan.stages` array (e.g.
`stages.map(s => s.stage_type).join('|')`), keeping `composeLessonPlan()`
itself unchanged (see §13).

### (b) AI-emitted progress tag + server-side parse, mirroring `workedExamples.ts` exactly

A new, narrowly-scoped tag (e.g. `[LESSON:<stageIndex>]`), appended only
when a `LessonPlan` block was rendered this turn, parsed by a new
function with the same shape and the same exact-match stripping
discipline `parseWorkedExampleTag()` already documents as
correctness-critical (*"Strip the EXACT tag we parsed ... A separate
strip regex could remove a different, earlier malformed bracket and
leave the real progress tag visible to the student"*). A model that
fails to emit the tag must degrade silently to "no progress signal this
turn" — never a thrown error, never a blocked turn, consistent with
Permanent Rule 11.

### (c) `buildLessonPlanBlock()` gains an optional resume parameter

Mirroring `buildWorkedExampleBlock()`'s existing `resuming` /
`currentStep` / `totalSteps` parameters exactly:

```ts
buildLessonPlanBlock(plan: LessonPlan, progress?: {
  stageIndex: number
  totalStages: number
}): string
```

When `progress` is supplied (because the caller matched a persisted
`planSignature` against this turn's freshly computed one), the rendered
block explicitly states which stages are already covered and instructs
the tutor to continue from `stageIndex` — never to re-present completed
stages as new. When `progress` is omitted (no match, or no prior
progress), the block renders exactly as it does today: the full
sequence from stage 1, framed as the current behavior already frames it.
This keeps `buildLessonPlanBlock()`'s existing call signature backward
compatible (the new parameter is optional) and keeps `composeLessonPlan()`
itself completely unchanged — the matching/persistence logic lives in
the calling code in `route.ts`, the same architectural location ADR 08
already established for the Library-mode `currentConceptNodeId` seed.

**A signature mismatch is an explicit, intentional replan, not an
error.** If this turn's freshly computed `planSignature` doesn't match
the persisted one, the calling code discards the stale
`lessonStageProgress` entry and presents the new plan from stage 1 —
the same code path as "no progress" today. This gives the system, for
the first time, an explicit name for the difference between "continuing
a lesson" and "replanning a lesson," where today both are
indistinguishable.

## 5. Trade-offs

**Option B vs. A:** B closes a real continuity gap — the tutor can now
be told explicitly what's already covered instead of inferring it from
conversational context alone — at the cost of one new `contextSnapshot`
key, one new tag-parse function (a close structural copy of an
already-shipped, already-tested one), and one new optional parameter on
an existing render function. A's only advantage is zero work, which does
not survive the world-class-teacher test any more than ADR 08's
equivalent comparison did.

**Option B vs. C:** B is lighter weight, requires no Prisma schema
change (consistent with this whole roadmap phase's "no schema changes"
constraint, §8), and can ship independently of ADR 10. C would give
richer queryable analytics later but is explicitly premature before
ADR 10 specifies the unified Evidence model — building it now risks
designing the wrong shape and redoing it. B's cost is that
`lessonStageProgress` lives in an unstructured JSON blob alongside three
other unrelated keys, the same trade-off `currentWorkedExample` already
accepted and that has run in production without issue.

**Option B vs. D:** B reuses a mechanism already proven safe, observable,
and cheap (a regex-parsed tag) instead of inventing a second, heuristic
mechanism for the same class of problem. D's only theoretical advantage
— no extra token cost from the tag — is outweighed by introducing
exactly the kind of duplicate-system risk this session's governing
directive explicitly warns against.

## 6. Scalability

`composeLessonPlan()` remains pure and zero-I/O — this proposal adds no
new query inside it. The new `planSignature` computation is a cheap
string join over an already-in-memory array (`O(stages.length)`,
typically ≤ 7 stages per `lessonComposer.ts`'s own stage-count
constants). The new persisted write is one more conditional field inside
the same `prisma.learnSession.update()` call that already writes
`currentConceptNodeId`/`currentWorkedExample`/`lastSuccessfulTeachingStyle`
at `route.ts` ~1716–1729 — no new table, no new query, no new round
trip; it rides the existing write. The new tag-parse function is the
same O(1) regex match `parseWorkedExampleTag()` already performs in
production on every turn where a worked example might be active.

## 7. AI independence impact

Zero new probabilistic component. The progress tag is a fixed-format
token the model is instructed to emit, parsed by a deterministic regex
server-side — structurally identical to the already-shipped `[WE:...]`
mechanism, and squarely within the governing rule that the AI Router
never makes a *decision*, only renders text (`EDUCATIONAL_BRAIN_BIBLE.md`
§2). The long-term AI-independence benefit is direct: a future
deterministic or cached lesson-delivery layer (roadmap item #8) needs to
know not just *what plan was proposed* but *whether it was actually
followed* — this ADR's persisted stage-progress signal is the first
piece of that evidence trail for the Dynamic Lesson Composer
specifically, and a structural precedent for the same question across
the rest of the Teaching tier.

## 8. Backward compatibility

Fully additive. `composeLessonPlan()`'s signature is unchanged.
`getLessonPlan()`'s signature is unchanged. `buildLessonPlanBlock()`
gains one optional parameter with a safe default (omitted = today's
exact behavior, byte-identical). No Prisma schema change — `contextSnapshot`
is already a `Json?` field gaining one more optional key, the same kind
of additive population ADR 02 performed for
`lastSuccessfulTeachingStyle` and Sprint CH already performed for
`currentWorkedExample`. A model that never emits the new tag degrades
to "no progress signal" — every turn renders the full plan from stage 1,
which is exactly today's behavior — so this proposal cannot make
behavior worse than the current baseline even if the new mechanism is
never exercised.

## 9. Validation strategy

For the future implementation (none of this runs now):
- **Continuation smoke test:** a multi-turn School Mode session on one
  concept with no underlying signal change; confirm the second and
  subsequent turns' `LESSON PLAN` block frames stages already covered as
  "already covered" rather than re-listing the full plan as new.
- **Replan smoke test:** a multi-turn session where a signal genuinely
  changes mid-concept (e.g. a misconception gets resolved, shifting
  `action.action_type`); confirm the `planSignature` mismatch is
  detected, stale progress is discarded, and the new plan renders from
  stage 1 with no incorrect "resuming" framing carried over.
- **Tag-leak regression test**, mirroring the exact concern
  `parseWorkedExampleTag()`'s own code comment already flags: confirm
  the new `[LESSON:...]` tag is never visible in the text the student
  receives, using the same exact-match-strip discipline, not a "first
  bracket" heuristic.
- **Standard regression gate**, matching every prior ADR this session:
  `npx tsc --noEmit` diffed against a pre-change baseline, `npx vitest
  run` at identical pass count to baseline, manual smoke of a School
  Mode chat turn with the new mechanism flagged off (regression check —
  must render byte-identically to today).

## 10. Migration strategy

Staged, and explicitly sequenced after ADR 08's own Phase 1 (since this
mechanism only has observable effect wherever the Action layer already
runs — School Mode today, School + Library after ADR 08's proposed
extension lands):

1. **Phase 1 — `lessonStageProgress` persistence + resume framing,
   flagged off by default.** Ship the new tag-parse function, the new
   `contextSnapshot` key, and the new optional `buildLessonPlanBlock()`
   parameter behind a feature flag; observe for one full deploy cycle
   for tag-leak or mismatched-resume regressions before flipping default
   on. Lowest-risk phase — fully additive, the existing render path is
   the untouched default.
2. **Phase 2 — flip Phase 1's flag on by default** once confirmed clean.
3. **Independent of Phases 1–2:** no doc-only phase is needed here (the
   `mastery_threshold` connection noted in §2 is already tracked under
   ADR 05/R3, not a new fix this ADR introduces).

Each phase is independently revocable and independently approvable, and
Phase 1 itself is independently approvable from — though logically
downstream of — ADR 08's own Phase 1.

## 11. Relationship to previous ADRs

- **ADR 08** (`ADR_08_TEACHING_ACTION_INTELLIGENCE.md`) — direct
  dependency. ADR 08 §14 explicitly predicted this ADR would "design the
  next evolution of `LessonPlan`/`LessonStageType` against a single,
  mode-uniform Action layer" — this ADR does exactly that, and does not
  redesign or duplicate ADR 08's Library-mode `currentConceptNodeId`
  seeding proposal; it sits strictly downstream of it (this mechanism
  only ever has an effect wherever ADR 08's Action layer already
  executes). No conflict: ADR 08 governs *whether* a `LessonPlan` exists
  this turn; this ADR governs *whether the tutor knows it's a
  continuation*.
- **ADR 02** (`ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md`) — the
  general pattern this ADR's §4(a) reuses (additive `contextSnapshot`
  keys for cross-turn continuity, first established for
  `lastSuccessfulTeachingStyle`) is named here as the now-recurring
  architecture for "what does this turn need to remember from the last
  one," with Sprint CH's `currentWorkedExample` and this ADR's proposed
  `lessonStageProgress` as the second and third instances of the same
  pattern.
- **ADR 05 / R3** (`mastery_threshold` flat-constant issue) — confirmed,
  not reopened, to reach into `masteryCheckStage()`'s completion-criteria
  text (§2). No new Finding opened; this ADR does not propose fixing R3,
  only notes the connection for completeness.
- **Finding 1 / R10** (`LessonPlan` naming overlap) — confirmed this
  ADR's proposal concerns only the Composer's `LessonPlan`, never
  `lessonPlanner.ts`'s chapter-roadmap type; the existing overlap is
  neither worsened nor resolved by this ADR.
- **`ARCHITECTURE_DECISIONS.md` Permanent Rule 4** ("Teaching Action
  Generator never modifies Teaching Decisions") and its implicit
  analogue for the Lesson Composer — fully preserved: `composeLessonPlan()`
  remains a pure function of its existing inputs; this ADR's persistence
  and resume-framing logic lives entirely in the calling code, never
  inside the Composer.
- **Permanent Rules 9–10** (AI Router is the only probabilistic
  component; never makes a pedagogical decision) — preserved; see §7.

No conflict was found with any frozen rule in `EDUCATIONAL_BRAIN_V1.md`,
`ENGINE_REFERENCE.md`, `DEPENDENCY_RULES.md`, or `EXTENSION_GUIDE.md`.

## 12. Relationship to the Canonical Knowledge Graph

No Canonical KG field is touched, read differently, or newly exposed.
This ADR operates entirely on already-computed Action-layer outputs
(`LessonPlan`) and session state (`contextSnapshot`); it never reads
`graph.json` or the Generic Subject Adapter directly. `ConceptNode` is
referenced only via `plan.concept_id` (already part of `LessonPlan`'s
existing output shape) to key the persisted progress entry — no new KG
read path is introduced.

## 13. Relationship to the Teaching Engine

The Teaching Engine's `decide()` and its types remain completely
untouched. TAG and `composeLessonPlan()`'s pure cores are also
completely untouched — this ADR deliberately keeps `planSignature`
computation in the calling code (`route.ts`) rather than adding it as a
new field on `LessonPlan` itself, specifically so the Composer's
existing guarantee (pure, deterministic, no awareness of session
history) is not compromised. The Teaching Engine's frozen role — sole
authority over `TeachingMode`/`TrackLevel`/the base decision — is
unaffected; this ADR only changes what the calling code does with the
Composer's already-existing output before it reaches the prompt.

## 14. Future implementation plan

Not executed in this or any session until both gating conditions are
met: (1) the Curriculum Production Pipeline declares Canonical Knowledge
Graph v1 frozen, and (2) the user explicitly approves execution. When
both are satisfied, implementation proceeds in the phases specified in
§10, sequenced after ADR 08's own Phase 1, each independently validated
per §9.

This ADR directly feeds roadmap item **#5 — Student Memory Evolution**
(the next item): the persisted `lessonStageProgress` signal proposed
here is a small, concrete instance of exactly the kind of "did the plan
actually happen" evidence that item #5's deferred Evidence-flow audit
(`EDUCATIONAL_BRAIN_BIBLE.md` §6.6) needs to reconcile against
`EvidenceRecord`/`EbEvidenceEvent`. It also names Option C (a normalized
`LessonStageProgress` table) as a candidate input to that same audit,
explicitly not built here. It may also feed roadmap item **#6 —
Recommendation Intelligence**, since a concept whose
`lessonStageProgress` never advances across many turns is itself a
candidate signal for a stuck-or-struggling learner — named here as a
forward link only, not designed.
