# Topic/Meaning Loss Fix & Physics Teacher Migration Architecture V2 (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Topic/meaning loss — the extractor's default was YES (2026-09-13)

**Read `LEADING_MODIFIER_HEADS` in `src/lib/teaching/visual/requestedTopic.ts`
and `src/tests/topicModifierShape.test.ts` before adding another word to
`DISCOURSE_NOUNS`.** The next incident probably does not need one.

### What was actually wrong
`extractRequestedTopic` accepted ANY surviving word sequence as a topic NAME.
The only thing between a learner's ordinary prose and a lesson-pausing excursion
was `DISCOURSE_NOUNS` — a blocklist extended **twelve times, once per production
incident** (`point`, `line`, `slowly`, `slow`, `practice`, `check`, `main`,
`please`, `today`, `beginner`, …). Its own comments are a run of post-mortems.
This is the exclusion-list trap CLAUDE.md already named for
`genuineUnmappedAttempt`: the default answer was YES, and the space of non-topic
prose is not finite.

### Measured, not reasoned
31 discourse-shaped utterances transcribed from the defect registers and the
`DISCOURSE_NOUNS` comments (which quote real transcripts), plus 14 genuine topic
requests, run through the REAL `namedTopicUnknownTo`. **5 of 31 named a false
topic**, and all five were the same shape — a manner adverbial, not a noun
phrase:

    "please teach from start"                 -> "from start"          (PCD-018)
    "hi sir, ...please teach from start"       -> "from start"          (PCD-020)
    "can you teach me in an easier manner"     -> "in an easier manner"
    "explain like i am five years old"         -> "like i am five years old"
    "explain it in a simple manner sir"        -> "in a simple manner sir"

**PCD-018/PCD-020 still reproduced** — the master backlog recorded them FIXED by
Principle 13 (2026-09-11). That prompt fix is real but covers only the MODEL's
half; the deterministic layer went on opening an excursion, pausing the lesson
and blocking the authored-probe gate underneath it. **A prompt cannot out-argue a
paused lesson.** Both registers corrected.

### The fix — a shape test, not more vocabulary
A phrase still headed by a preposition/subordinator after every existing trim is
the request's MODIFIER, not its object. **Rejected, never trimmed** — trimming
the head exposes `start` and names a topic by that word instead, the same defect
one step along. 5/31 -> **0/31**, genuine set unchanged (14/14, the two
non-matches are pre-existing and unrelated).

It does NOT refuse the question. It only stops the lesson being PAUSED: the
tutor still answers, anchored, and Principle 13 supplies the restatement. The two
halves compose — that is the point.

### The list is three words, and that is a decision
`from`, `in`, `like`. A first draft carried fifteen "obvious" siblings and a
**pre-existing guard caught it**: `crossSubjectTemporalConnective.test.ts` asserts
"teach me while loops" names `while loops`, and it does — `while`/`for` are real
control-flow constructs (`Iteration — while and for Loops` is a live CS concept).
`by` (Proof by Contradiction), `with` (Version Control with Git), `at` (Limits at
Infinity), `onto`, `via`, `without` are all live subject vocabulary too. The
head-position scan that cleared the three did not catch it, **because a learner
names that topic by a word the TITLE does not begin with** — head-position in the
KG is the wrong safety test for learner phrasing. Removing the fifteen cost
nothing: still 0/31.

### Why this is safe for the curriculum
Exactly two of 1,775 concept titles are headed by one of the three — "Like Terms"
and "From Print to Meaning". Neither is reachable: `route.ts` consults the
unresolved-title path only when `resolveRequestedConceptId` returned nothing
(`if (requestedConceptIdThisTurn) return null`), and both resolve —
verified against the live KG, not assumed, and pinned by test.

### NOT done, reported
PCD-015/016/017/021 (meta-commentary literalism, off-domain analogy substitution)
remain prompt-governed and advisory. They are not mechanically checkable the way
this was — "did the tutor interpret an open instruction correctly" has no
deterministic test — and no speculative patch was made. PCD-018's second thread,
the figure/text mismatch (correct diagram attached while the text drifted), is
also untouched: the repair would have to rewrite generated text, not withhold it.
**No production verification** — offline measurement against the real modules.
Suite 647 files / 13,474 passed / 9 skipped; tsc clean; build clean.


## Physics Teacher Migration Architecture V2 — AUDITED, NOT ADOPTED (2026-09-12)

**File renamed this turn.** `docs/architecture/PHYSICS_TUTOR_ZERO_TO_RESEARCH_ARCHITECTURE.md` →
**`docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md`** (`git mv`, history preserved).
V1 was a from-scratch design; V2 is the same document rewritten after a full evidence-based audit
against `main`, and it is now a **migration architecture** rather than a replacement. Still NOT an
ADR, still changes nothing, still does not supersede or reopen `EDUCATIONAL_BRAIN_BIBLE.md` or any
ADR; everything in it that would become code stays G1/G2-gated.

- **Four of V1's load-bearing novelty claims were FALSE and are corrected in place.** Verified by
  reading the modules and their call sites, not the docs:
  (1) "only verified grading may score" is **already enforced** — `conversationState.ts:1136`
  `const verified = evidence.serverGraded === true`, plus `unauthoredKeyGrades` (`:1079`) counting
  a model-invented key without ever crediting it, with the invariant proved over **49,152 states**
  (`masteryCounterInvariant.test.ts`). It is BETTER than V1's own nine-facet replacement, which V2
  now rejects. (2) Artifact-first probes are **already true on the authored path** — the probe
  object exists at `route.ts:4664`, the provider call is at `:5531`, and the gate path serves a
  complete assessed turn with **zero provider calls** (`provider='gate'`, `:5480`).
  (3) The "operation-typed Math Graph" is **~70% already built** — `capabilityModel.ts` has 34
  capabilities in 7 clusters, a `CAPABILITY_REQUIRES` prerequisite DAG, a 5-state ladder,
  cross-session persistence via `replayCapabilityProjection` (`route.ts:3152`), and it DRIVES a
  decision (`classifyFailure` → `capability_missing`, `:3592`). (4) Turn arbitration and the
  liveness invariant are **both implemented and wired** (`turnArbitration.ts`, `turnProgress.ts`).
- **V1's composed 11-check verifier is REFUTED by this repo's own experiment** and is dropped, not
  deferred: `kernel/verifier/rules.ts` holds 22 rules and a real 2-attempt rerender loop and is
  **OFF by default** (`route.ts:6635`), for the reason recorded at `route.ts:6780` — `V-Q2` rejects
  any TEACH/SHOW/RECOVER/CLOSE draft ending in a question, so "a 'permissive' context is not
  actually reachable". V2 adds only TOTAL DETERMINISTIC checks and keeps the one content-grounded
  floor (`vAffirm`, `route.ts:6792`). **Do not re-enable K5 on the strength of V2.**
- **The §4 ordering question, answered by tracing rather than assuming:** the turn is a HYBRID.
  Mastery/state is DECIDE-only; the authored assessment path is DECIDE→ARTIFACT→RENDER→VERIFY; the
  visual path is DECIDE→CONTRACT→RENDER→REPAIR-RESIDUAL; and exactly two surfaces remain
  GENERATE→DETECT→REPAIR — the `mcqHoisted = gateMcqHoisted ?? mcqParse.mcq` fallback
  (`route.ts:5707`, parsed from prose at `:5642`, plus four post-model overrides) and all prose
  teaching content. Those two are what V2 closes.
- **What V2 actually proposes — four primitives, nothing else:** (1) the **Turn Contract** as a
  typed object compiled before the model call and asserted after (today the contract is ~40
  `…Hoisted` locals plus ~20 post-hoc overrides, four of which are consecutive `mcqHoisted = null`
  statements within 45 lines); (2) a **deterministic Physics Verifier** — dimensions first, then
  limiting cases/signs/magnitude (there is NO physics correctness checking anywhere in `src/`, and
  `mathjs` sits in `package.json:46` imported by zero files); (3) a **closed-taxonomy learner-move
  interpreter** with a confidence gate and a first-class `UNINTERPRETABLE` class, replacing
  `readTurnIntent`'s six-detector aggregation (measured surface: 63 detector-shaped exported
  predicates, 60 regex constants); (4) **durable per-concept learner state** — `ConceptMasteryRecord`
  and `ActiveMisconception` exist in schema with **0 writers each**, and `EvidenceRecord`'s only 2
  writers are the visual path at weight 0. Plus two long-horizon additions: the **rung** dimension
  (`KGNode` exposes only id/slug/title/description/prerequisites/estimatedHours/difficulty — a
  concept appears exactly once, so "understands energy at 11" and "at 21" are not distinguishable)
  and **retention** (Library `spacedRevision` call sites were removed).
- **Explicitly DEFERRED with the evidence against each**, so a future session does not revive them:
  the composed verifier, expected-information-gain probe selection, a CRDT rewrite of the snapshot
  store (the proven defect was ONE field set in ONE rederiver — refactor those fields monotone
  instead), the nine-facet mastery predicate as a REPLACEMENT, the Approximation Ledger, physics
  spines, the five-role LLM split, and full 6-rung authoring.
- **A documentation/implementation conflict found and recorded (not fixed):** `figureReference.ts`'s
  header states "whether a figure is attached is decided AFTER the text is generated" — FALSE on
  `main`; `resolveVisualForTurn` runs at `route.ts:3352` and injects its contract block at `:3439`,
  1,179 lines before the provider call. `visualContract.ts`'s header is the correct one. The
  stripper still has a real residual job (a figure decided pre-model can fail to FIRE), but its
  stated rationale describes a pre-V2-resolver world.
- **Verdict recorded in the document:** keep My Tutor and migrate four layers — Turn Contract →
  Physics Verifier (dimensional) → interpreter → durable learner model, then rung + retention.
  Not a rewrite: the repo has already introduced five deterministic authorities into a running
  system without one (`conversationState` 2026-07-14, `masteryGate` 07-15, `gateAssessment` 08-12,
  `turnArbitration` 08-23, `turnProgress` 09-07).
- **Audit method and its limits** (§12 of the doc): `git fetch --unshallow` is REQUIRED — the clone
  grafts at 2026-08-23 and makes every mechanism look three weeks old; full history is 3,542
  commits from 2026-05-31, `route.ts` grew 120 → 10,513 lines across 434 commits, and August ran
  256 fixes against 139 features. No production DB was reachable (`scripts/physics/state.ts` reports
  `serving: UNAVAILABLE`), so **no DB row count in the document is claimed as verified**; no live
  learner session was driven; the full 640-file suite was not run (6 core architectural files were,
  120/120 pass). Physics content layer measured complete: KG 238 / Blueprints 238/238 / Educational
  Brain 238/238, visual bindings exact 77 / none 161.


