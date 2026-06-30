# ADR 02 — General-Learner Diagnostic Layer

> Author: Chief Educational Brain Architect (Claude session)
> Date: 2026-06-30
> Status: **IMPLEMENTED**
> Depends on: `docs/architecture/EDUCATIONAL_BRAIN_V1.md` (authoritative pipeline
> reference), `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md` §4/§6 (queued this ADR).
> Scope: orchestration wiring only, inside `src/app/api/learn/chat/route.ts`.
> No curriculum, concept, KG, or teaching-content changes.

---

## 1. Why needed

Per `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md` §4, general/Library learners
already receive the canonical pipeline core (KG context, learner intelligence
profile, Student Memory snapshot, Teaching Engine `decide()`, Teaching Action
Generator, Dynamic Lesson Composer, a basic non-school misconception check) —
but not the `school/adaptive/*` diagnostic/strategy-synthesis cluster, gated
behind a single `if (schoolCtx)` block at `route.ts:294`. That cluster
includes the single most load-bearing piece of adaptive intelligence in the
codebase: `teachingStrategy.ts`'s `getTeachingStrategy()`, which synthesizes
mastery level, misconception confidence, concept-transfer status, confidence
calibration, learning momentum, and stalemate detection into one of 7
directives the tutor follows for the turn — plus the `[HINT]` tag bias and
output-bias visual suppression it drives downstream.

General learners are not a minority population: every non-school subject
(languages, programming, science library tracks) routes through this gap.
They get a system prompt that mentions performance trends in passing
(`ADAPTIVE TUTOR CONTEXT`, line ~963) but never gets a single synthesized
"what should THIS turn do" directive grounded in actual mastery/misconception/
confidence signals the way school learners do.

## 2. Evidence the gap is closeable without a school-data dependency

Read the implementation of every function in the diagnostic cluster's
mastery→strategy chain (not just signatures) before committing to this
design, specifically checking whether `board`/`grade` are load-bearing:

| Function | `board`/`grade` param? | Used in function body? |
|---|---|---|
| `masteryIntelligence.getMasteryProfile` | Yes (positions 2,3) | **No** — zero references in the body; the four internal collectors take only `userId, subjectSlug, chapterId, kgNodeIds` |
| `misconceptionEngine.getChapterMisconceptions` | Yes, but named `_board`/`_grade` | **No** — underscore-prefixed (TS unused-param convention); delegates straight to `detectMisconceptions(userId, subjectSlug, kgNodeIds, chapterId)` |
| `confidenceCalibration.getConfidenceProfile` | **Not present in signature at all** | n/a |
| `learningMomentum.getLearningMomentum` | **Not present** (just `userId`) | n/a |
| `conceptTransfer.evaluateConceptTransfer` | **Not present** (`userId, subjectSlug, chapterId`) | n/a |
| `strategyEffectiveness.getStrategyEffectiveness` | **Not present** (`userId, topicSlug, prisma`) | n/a |
| `teachingStrategy.getTeachingStrategy` (the synthesizer) | Yes (positions 2,3) | Forwarded only into the two rows above that themselves ignore it |
| `spacedRevision.getDueRevisions` | **Not present** (`userId, subjectSlug, nodeIds`) | n/a |

Conclusion: the entire mastery → misconception → transfer → confidence →
momentum → stalemate → **synthesized strategy** chain is keyed on
`userId + subjectSlug + chapterId + kgNodeIds` (all generic strings), never
on board/grade. The two `board`/`grade` parameters that exist on
`getMasteryProfile`/`getChapterMisconceptions`/`getTeachingStrategy` are
vestigial pass-through plumbing, not load-bearing logic — confirmed by
reading bodies, not inferred from signatures alone.

A second sub-cluster genuinely *is* board/grade-coupled and stays
out of scope:

| Function | Why it needs board/grade |
|---|---|
| `nextBestAction.getNextBestAction` | Calls `getGradeSubjects(board, grade)` to enumerate the board syllabus's subject list, then walks `.order` across multiple subjects' chapter sequences |
| `dailyPlan.getDailyStudyPlan` | Same pattern — multi-subject plan built from the board/grade curriculum tree |
| `examReadiness.getExamReadinessForSubject` | Calls `getSchoolChapters(board, subjectSlug, grade)` for the board exam syllabus |

These three navigate a board-syllabus structure that has no equivalent in
the Library subject model (which uses module/node trees, not
board+grade+chapter sequences spanning multiple subjects). Wiring them for
general learners would require inventing a parallel "Library exam syllabus"
concept that doesn't exist and that this ADR does not propose. They remain
correctly school-only.

`prerequisiteRecovery.detectPrerequisiteGap` and `lessonPlanner.buildLessonPlan`
are also board/grade-free but require `KnowledgeNode[]` objects carrying a
real prerequisite graph (not just slug strings) — Library modules don't
currently expose that shape in a directly compatible way. Left out of this
increment; flagged in §6 as a follow-up, not attempted here to avoid a rushed,
under-evidenced wiring.

## 3. The decision

Wire `getTeachingStrategy()` (plus the trivial, board/grade-free
`getDueRevisions()`) into the `!schoolCtx` (Library-subject) branch of
`route.ts`, using the same substitution pattern the codebase already
established and shipped for the misconception engine
(`route.ts:939-962`, pre-existing): a Library subject's current module slug
stands in for `chapterId`, and its node slugs stand in for `kgNodeIds`.
`board`/`grade` placeholders (`''`/`0`) are passed since they're proven
unused.

### Implementation (committed this session)

`src/app/api/learn/chat/route.ts`:

1. Added `strategyTopicSlugHoisted: string | null` alongside the existing
   `strategyHoisted`/`outputBiasHoisted`/`hintBiasHoisted` hoisted vars
   (declared once, outside both branches, pre-existing pattern from the live
   school wiring). Necessary because the downstream
   `teachingStrategyEvent.create()` log write (line ~1553) must record the
   *same* `topicSlug` that was passed as `chapterId` into
   `getTeachingStrategy()`, or `strategyEffectiveness.getStrategyEffectiveness()`
   reads back zero events forever and the staleMate feedback loop never
   fires. The pre-existing log line read `schoolCtx?.chapter.id ?? subjectCode`
   — a fallback to `subjectCode` that was already forward-compatible but
   would have logged the wrong key once a non-school caller started setting
   `strategyHoisted`, silently breaking the loop for general learners from
   day one. Fixed to read `strategyTopicSlugHoisted ?? subjectCode` instead,
   and the school branch now explicitly sets
   `strategyTopicSlugHoisted = schoolCtx.chapter.id` for parity.
2. Added a new `if (!schoolCtx) { ... }` block immediately after the existing
   misconception-engine Library block, before the `ADAPTIVE TUTOR CONTEXT`
   block. It:
   - Resolves the Library subject and its current module the same way the
     existing curriculum-progression block does (`moduleProgress` lookup,
     `AVAILABLE`/`IN_PROGRESS` status, falling back to the first module).
   - Calls `getTeachingStrategy(userId, '', 0, subjectCode, currentModule.slug, moduleNodeSlugs)`
     and injects `buildTeachingStrategyBlock()` into the system prompt —
     exactly the block school learners already get.
   - Sets `strategyHoisted`/`outputBiasHoisted`/`hintBiasHoisted` via the
     same `deriveOutputBias`/`deriveHintBias` calls the school branch uses.
     These three vars are consumed **unconditionally** further down the route
     (the `[HINT]` tag parse at line ~1356, the visual output-bias suppression
     checks at lines ~1497-1535, and the strategy-effectiveness log write at
     line ~1553 are all already `schoolCtx`-agnostic) — so this single
     assignment activates real downstream behavior for general learners, not
     just prompt text. This was a design check, not an assumption: confirmed
     by grepping every consumer of the three hoisted vars before writing the
     block.
   - Injects the `[HINT]` tag instruction text identically to the school
     branch (duplicated, not extracted into a shared helper — see §5).
   - Calls `getDueRevisions(userId, subjectCode, moduleNodeSlugs)` and injects
     `buildRevisionBlock()` if any concepts are due, the same trivial
     board/grade-free addition already proven safe by its existing school use.
   - Wrapped in a single `try/catch` with a `console.warn`, matching the
     "purely additive, never blocks a turn" convention every other context
     block in this file follows.

### Why not also duplicate the standalone mastery/misconception/momentum/
### confidence blocks the school branch injects separately (lines 436-525)?

`getTeachingStrategy()` already calls all of them internally and folds their
output into the single synthesized strategy block. Injecting the standalone
blocks *as well* (as the school branch does) is accepted, working behavior
there, but for a first increment into new territory this ADR deliberately
chose the smaller, single-block surface area: one new system-prompt block,
one set of hoisted-var side effects, one new DB read (`moduleProgress`,
already read once elsewhere in the same request — see §5 for the
known minor duplication this causes). If the synthesized strategy block
proves insufficient in practice, adding the standalone blocks is a
follow-up, not a redo.

## 4. Risks

- **Blast radius**: this touches `route.ts`, which runs for every chat turn,
  school and Library alike. Mitigated by: (a) the new code only executes
  inside `if (!schoolCtx)`, so school-path behavior is provably unchanged —
  verified by diffing the school branch's `getTeachingStrategy` call site,
  which is untouched except for the one-line `strategyTopicSlugHoisted`
  addition; (b) the whole block is one `try/catch`, non-fatal on any failure,
  matching every sibling block in the file; (c) `npx vitest run` was run
  before and after this change — 39 files / 506 passing, 1 skipped, both
  times, zero regressions.
- **Type-check could not be fully verified in this environment**: `npx prisma
  generate` fails here with `ECONNRESET` (no network path to the engine
  download in this sandbox; `node_modules/.prisma/client` does not exist at
  all). `npx tsc --noEmit` against an ungenerated Prisma client produces ~650
  cascading `Property 'x' does not exist on type '{}'` errors throughout this
  file, pre-existing and unrelated to this change (confirmed via
  `git stash`/`git stash pop` — 648 errors before, 651 after, and the 3 new
  ones are the exact same error class on the 3 new lines that touch Prisma
  results, using a query (`prisma.moduleProgress.findMany`) and field access
  pattern (`.moduleSlug`, `.status`) byte-identical to existing code 30 lines
  above it in the same file, cross-checked directly against
  `model ModuleProgress` in `prisma/schema.prisma`). This should be re-verified
  with `npx prisma generate && npx tsc --noEmit` on a machine with network
  access before merge, but the evidence available here is as strong as this
  environment allows.
- **Strategy-effectiveness log correctness was nearly missed**: the original
  fallback (`schoolCtx?.chapter.id ?? subjectCode`) looked safe but would have
  silently broken the staleMate feedback loop for the very population this ADR
  targets. Caught only by tracing every consumer of `strategyHoisted` before
  writing new code that sets it — the same "read the whole call graph before
  declaring something safe to extend" discipline `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md`
  §2 already generalized from its own correction.
- **`[HINT]` instruction text duplicated** between the school and Library
  branches (~6 lines, byte-identical). Acceptable for now — extracting a
  shared helper is a pure refactor with no behavior change, deferred to avoid
  bundling a refactor into a feature commit (see §6).

## 5. Backward compatibility

Total for school sessions — the school branch's `getTeachingStrategy` call
site is unchanged except for the additive `strategyTopicSlugHoisted` line,
and the log-write fallback change (`subjectCode` instead of nothing) only
changes behavior for turns where `strategyHoisted` is set but
`strategyTopicSlugHoisted` is somehow still null, which cannot happen given
both branches now set it whenever they set `strategyHoisted`.

For Library sessions: strictly additive. A learner who previously got no
teaching-strategy block now gets one; nothing existing is removed or
overwritten. The one extra `prisma.moduleProgress.findMany` query duplicates
a read the curriculum-progression block (`route.ts:903`) already performs
earlier in the same request — both are independent, non-fatal `try` blocks
following this file's established "small additive blocks, not shared state"
convention (the same convention the pre-existing misconception block already
uses). Worth consolidating into a single shared read if more blocks need this
data, but not done here to keep this change's diff minimal and reviewable in
isolation, consistent with this role's working rule against bundling
unrelated refactors into a single proposal.

## 6. Validation strategy

- `npx vitest run` — 39/39 files, 506/506 (+1 skipped) passing, before and
  after. No new test was added because no existing test harness in
  `src/tests/` exercises `route.ts` directly (it's an integration-level
  Next.js route handler, not covered by the current unit-test layout) — this
  is a pre-existing gap in test coverage for this file, not introduced here.
- `npx tsc --noEmit` — verified the new code introduces exactly 3 new errors,
  all the same pre-existing Prisma-client-generation class as ~650 already
  present, isolated and diffed line-by-line against a `git stash` baseline.
- Schema cross-check — `model ModuleProgress` in `prisma/schema.prisma`
  confirmed to have exactly the fields (`moduleSlug`, `status`) the new code
  reads, independent of the broken `tsc` output.
- Re-run `npx prisma generate && npx tsc --noEmit` on a networked machine
  before this branch merges, to get a clean confirmation beyond what this
  sandbox can produce.
- Manual chat-turn verification (browser, live DB) was **not** performed —
  this environment has no path to `npm run dev` against a real Postgres
  instance with seeded Library-subject progress data. Recommended before
  shipping to production: open a Library subject (e.g. Python or a language
  track) as a non-school user, send a few turns, and confirm (a) a
  `ACTIVE TEACHING STRATEGY` block appears in logs/prompt, (b) no turn
  errors or latency regression, (c) a `teachingStrategyEvent` row is written
  with `topicSlug` equal to the current module's slug.

## 7. Follow-ups (not in this increment)

1. ~~Wire `detectPrerequisiteGap`/`buildLessonPlan` for Library subjects once
   their `KnowledgeNode[]` shape requirement is reconciled with
   `CurriculumModule.nodes`.~~ **Resolved 2026-06-30, split in two:**
   - `buildLessonPlan()` (`src/lib/school/adaptive/lessonPlanner.ts`) — **wired.**
     Reading its full body showed it only ever reads `.id`/`.title` off each
     `KnowledgeNode` (never `.domain`/`.description`/`.estimated_hours`), so a
     `CurriculumNode` (`slug`→`id`, `title`→`title`, optional
     `difficulty`/`prerequisites` with safe defaults) satisfies it with a
     trivial inline object-literal mapping — no adapter module needed. Wired
     into the same `if (!schoolCtx)` region in `route.ts` (~line 1019),
     immediately after the teaching-strategy block, reusing the established
     current-module substitution pattern. Prompt-injection only — the
     `currentConceptNodeId`/`nextConceptNodeId` snapshot-persistence write at
     `route.ts` ~line 1640 stays `schoolCtx`-gated (it also depends on
     `workedExampleUpdate`/`learnerProfHoisted`, both school-only signals);
     extending it is a separate, larger change than this increment's
     single-block scope, so it's left as a still-open follow-up below (item 5).
     Two of the three data sources `buildLessonPlan` reads degrade to empty
     for Library turns rather than truly working: `learningCheckpoint` rows
     are never written outside the `schoolCtx` branch (the table's `board`/
     `grade` columns are required, not nullable), and `practiceSession.chapterId`
     is never set by the generic `/api/practice/submit` route. Both failure
     modes are silent and safe — the function's existing zero-rows fallbacks
     (`recommendedCheckpoint`/`recommendedPractice` default to `true`) were
     designed for exactly this "no data yet" case, not introduced by this
     wiring. `topicProgress` reads work correctly (that table's `topicSlug`
     keying is already proven `schoolCtx`-agnostic by the pre-existing
     conversational-checkpoint upsert in the same route file).
   - `detectPrerequisiteGap()` (`src/lib/school/adaptive/prerequisiteRecovery.ts`)
     — **investigated, NOT wired, deferred.** Reading its full body surfaced a
     blocker deeper than a type-shape mismatch: it resolves each prerequisite
     id through a module-scope-global `KG_BY_ID = new Map(ALL_KG_NODES.map(n
     => [n.id, n]))` (line 40) — not scoped to the `kgNodes` parameter the
     caller passes in. For school callers this is necessary, not incidental:
     `kgNodes` is only the *current chapter's* nodes, but a node's
     prerequisites routinely point at nodes from *earlier* chapters/grades, so
     the lookup must reach the full corpus or genuine cross-chapter gaps would
     be missed — confirmed by checking how `route.ts` calls it (chapter-scoped
     `kgNodes`, not subject-wide). Library prerequisite slugs (`CurriculumNode.
     prerequisites`) live in a completely different namespace from
     `ALL_KG_NODES`'s canonical school KG ids, so every `KG_BY_ID.get(prereqId)`
     lookup would return `undefined` and the function would silently return
     `null` on every call — not a crash, but a permanently dead block costing
     3 DB reads per turn for zero value. Fixing this correctly needs a
     signature change (accept a caller-supplied corpus map instead of always
     reading the module-level global) that touches the live, school-critical
     call site too — exactly the kind of redesign the standing role's working
     rule ("do not redesign stable architecture without strong evidence") and
     ADR 02's own original scoping ("not attempted here to avoid a rushed,
     under-evidenced wiring") both caution against bundling into an additive
     increment. Left for a dedicated future proposal if Library-subject
     prerequisite-gap detection turns out to be high-value enough to justify
     the signature change and the school-path re-verification it would require.
2. Extract the duplicated `[HINT]` tag instruction text (school + Library
   branches) into a shared helper — pure refactor, separate PR.
3. Consider whether the standalone mastery/misconception/confidence/momentum
   blocks (school-only today) should also be duplicated for Library subjects,
   or whether the single synthesized strategy block is sufficient — needs
   real usage data from this increment first.
4. Consolidate the now-three independent `prisma.moduleProgress.findMany`
   reads in the Library path (curriculum-progression block, this block, and
   any future one) into a single shared read if a fourth consumer appears.
5. Extend the `currentConceptNodeId`/`nextConceptNodeId` snapshot-persistence
   write (`route.ts` ~line 1640) to also run for Library sessions, so a
   Library learner's "current concept" survives across turns the way a school
   learner's does. Deferred because the write is currently entangled with two
   other school-only signals (`workedExampleUpdate`, `learnerProfHoisted`) in
   the same conditional block — untangling those cleanly is a slightly larger
   change than this increment's single-block-at-a-time scope.
