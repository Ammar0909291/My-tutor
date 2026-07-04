# P10 Validation Framework — Specification

**Status:** Specification (integration-preparation deliverable, 2026-07-02).
Not an ADR — item 14 of the v1.0 criteria was resolved by Bible
consolidation (§6.12); this document is the concrete framework
specification the Bible names as "the primary QA implementation
milestone." It makes no architectural decisions and changes no code.
**Scope rule:** Tiers 1–2 and the Tier 3 HTTP variant require zero
production-code changes and may be built as integration-preparation work;
anything marked **GATED** touches production code and waits for the
standard two gates (KG v1 freeze + explicit user approval).

**P10 (Bible §6.9):** *the Brain is testable end-to-end without a live
LLM.* Every stage runnable with a recorded LLM transcript; CI verifies
behavior on a frozen set of real-learner-shaped fixtures; a regression is
a fixture that flips verdict, and CI rejects it before merge.

---

## 1. Current state (verified 2026-07-02)

| Fact | Evidence |
|---|---|
| A vitest suite exists: 39 files under `src/tests/`, `npm test` = `vitest run`, node environment, `@` alias configured | `vitest.config.ts`, `package.json` |
| LLM-adjacent tests use **pure replicas**, not the real modules | `src/tests/aiRouterResilience.test.ts:3-5`: "The actual routeAI/routeJSON functions make network calls, so we test the observable contracts through pure replicas of the logic" |
| The chat pipeline (65-step flow, `DATA_FLOW.md` §1) has **zero** end-to-end test coverage | no test imports the route or drives it over HTTP |
| **No CI exists at all** — `.github/workflows/` is absent | verified; even the existing suite runs only when someone remembers to run it |
| The LLM seams are `routeAI`/`routeJSON` (`src/lib/ai/router.ts`) and `generateAIResponse`/`generateJSON`/`chatWithFallback` (`src/lib/ai/client.ts`) | export inspection |
| The vitest suite is **green**: 39 files, 506 passed / 1 skipped, ~10 s, and it runs **without a database and without a generated Prisma client** | `npx vitest run`, 2026-07-02, in an environment where `prisma generate` had not succeeded |
| `npx tsc --noEmit` is **not zero-error** on this branch: 662 errors across 98 files measured with an ungenerated Prisma client (39 × TS2305 on `@prisma/client` + type-`unknown` cascades); the clean-client baseline is smaller but known-nonzero (project memory: "pre-existing stripe/subscription errors are expected on feature branches") | measured 2026-07-02; `prisma generate` fails in sandboxed environments on engine download (ECONNRESET), so the contaminated and clean baselines differ by environment |

Two named failure classes follow from this state:

1. **Replica drift** — a replica test keeps passing after the real
   function's behavior changes; the suite proves the replica, not the
   product. (Latent today; grows with every engine change.)
2. **Pipeline blindness** — nothing detects a wiring regression in the
   chat route (a signal block dropped, an engine call reordered, a
   Permanent Rule violated). All ADR implementation waves change exactly
   this surface, and Waves 1–5 exit gates
   (`ARCHITECTURE_COMPLETION_REPORT_V1.md` §5) all assume this coverage
   exists. Wave 1b builds it; this document is its spec.

## 2. Three-tier structure

**Tier 1 — pure unit tests (exists; keep).** The current 39 files stay
as-is. No deletions, no rewrites. New pure-logic tests keep landing here.

**Tier 2 — engine-contract tests (new; replaces the replica *pattern*,
not the replica *files*).** Tests that import the **real** engine
modules — `teaching-engine/index.ts` `decide()`, `teachingStrategy.ts`,
`weakTopics.ts`, `learningOrchestrator.ts`, `lessonComposer.ts`,
`subjectKgAdapter.ts` — and assert their frozen contracts on constructed
inputs. These engines are pure or read-then-pure by design (Bible §2),
so Tier 2 needs no LLM seam and, for the pure ones, no DB. Where a DB
read exists, mock the Prisma module boundary (`vi.mock('@/lib/prisma')`),
never re-implement the logic. Rule going forward: **a replica may only be
written when importing the real module is impossible, and the test file
must say why.**

**Tier 3 — pipeline fixture replay (new; the P10 harness).** Drives a
whole chat turn against recorded LLM transcripts and a seeded database,
then asserts on the four observable surfaces (§4). Two variants:

- **T3a — HTTP replay (no production-code change; build first).** Run
  `next dev` (or `next start` on a build) against a seeded test database
  with env pointed at the transcript player (§3), POST real request
  bodies to `/api/learn/chat`, assert on the response and the DB delta.
  Slower, but requires zero changes to `route.ts`.
- **T3b — in-process orchestrator replay (GATED).** Importing the
  route's orchestration directly requires extracting it from the 1688-line
  handler into an importable function — a production-code refactor.
  Deferred to Wave 1b implementation under the standard two gates. T3a is
  the pre-approval workhorse; T3b is the fast path CI eventually runs
  per-commit.

## 3. The LLM transcript seam

**Record format** — one JSON file per fixture turn,
`src/tests/fixtures/transcripts/<fixtureId>.json`:

```jsonc
{
  "version": 1,
  "entries": [
    {
      "kind": "routeAI",                  // or "routeJSON"
      "requestKey": "sha256:…",           // hash of canonicalized request
      "systemPromptDigest": "sha256:…",   // separate digest: prompt-drift diagnostics
      "response": { "text": "…", "provider": "groq" }
    }
  ]
}
```

**Canonicalized request** = JSON of `{ messages, temperature, maxTokens }`
plus the system prompt **with volatile substrings normalized** (dates,
session ids, learner names) via a small list of named normalizers. The
system prompt participates through its own digest so that an intentional
prompt change shows up as a transcript-key miss naming the digest that
changed, not as a silent pass.

**Player behavior:** exact-key hit → return recorded response. Miss →
**fail the test immediately** with both digests printed. No live-LLM
fallback in CI, ever (P10). A `RECORD=1` mode runs against the live
provider once, writes the transcript, and a human reviews the diff before
committing it — transcripts are code-reviewed artifacts.

**Seam placement:** mock at `@/lib/ai/router` (`routeAI`/`routeJSON`) for
T3b; for T3a, the same player runs as a tiny local HTTP stub and
`GROQ_BASE_URL`-style env override points the real client at it — this
exercises the client's parsing/fallback code too. (If the client hardcodes
provider URLs, adding an env override is a one-line **GATED** change;
until then T3a mocks at module level via a test-only Next.js
instrumentation hook, which is test scaffolding, not production code.)

## 4. Fixture format and assertion surfaces

One fixture = one file, `src/tests/fixtures/turns/<fixtureId>.ts`:

```ts
interface TurnFixture {
  id: string                      // e.g. "school-misconception-active"
  description: string             // the learner story this freezes
  seed: DbSeedSpec                // learner profile, TopicProgress rows,
                                  // MistakeRecords, session + contextSnapshot
  request: ChatRequestBody        // the actual POST body
  transcript: string              // transcripts/<id>.json
  expect: TurnExpectation
}
```

`TurnExpectation` asserts on the four observable surfaces of a turn —
**never on free prose** (the LLM's words are the one legitimately
variable output; asserting on them would freeze style, not behavior):

1. **Decision surface** — deterministic engine outputs where observable:
   `TeachingDecision` fields, chosen strategy, chosen recommendation.
   Under T3a these are observed indirectly (see surface 2 and 4); under
   T3b directly.
2. **Prompt-composition surface** — which intelligence blocks are present
   in the system prompt, in what order, with which concept ids (via the
   recorded `systemPromptDigest` + named block markers). This is where
   R15-class bugs (conflicting signals both injected) become assertable.
3. **Persistence surface** — the DB delta: which rows were written
   (session, message, retention/review, and post-Wave-1 `EbEvidenceEvent`),
   with single-writer invariants checked (Permanent Rule 14, ADR 10/13).
4. **Invariant surface** — cross-cutting rules independent of the
   scenario: **exactly one `routeAI` entry consumed per turn** (Permanent
   Rule 9 — this single assertion makes the R16 violation class
   structurally undeployable once Tier 3 gates CI), response shape parses,
   no unexpected transcript entries left unconsumed.

**Regression policy (P10, verbatim into CI):** a fixture that flips any
assertion is a regression; CI rejects the merge. Changing a fixture's
expectation requires a PR that explains, in the fixture file, which
approved change altered the contract.

## 5. Frozen fixture set v1 (15 fixtures)

The "real-learner-shaped" set P10 requires. School unless noted.

| # | Fixture id | What it freezes |
|---|---|---|
| 1 | `school-cold-start` | first turn ever: onboarding path, no memory rows |
| 2 | `school-happy-path` | mid-chapter turn, DEVELOPING mastery, no signals |
| 3 | `school-misconception-active` | active MistakeRecord → misconception block injected |
| 4 | `school-spaced-revision-due` | ReviewSchedule due → revision posture |
| 5 | `school-weak-topic` | weak-topic severity over threshold → signal present |
| 6 | `school-signal-conflict` | weak_topic + RAPID_IMPROVEMENT on same concept — freezes today's behavior; flips by design when ADR 11 Reconciler lands (the R15 fixture) |
| 7 | `school-stalemate` | stalemate detection → strategy switch |
| 8 | `school-assessment-trigger` | assessment intelligence fires a probe turn |
| 9 | `school-exam-window` | examReadiness active → dailyPlan/exam blocks |
| 10 | `library-cold-start` | Library mode, no schoolCtx: which engines run (ADR 02 set) and which must NOT |
| 11 | `library-returning` | Library with history: strategy + spaced revision parity |
| 12 | `library-no-concept-seed` | freezes the ADR 08 gap: `currentConceptNodeId` unseeded → Action layer silent; flips when ADR 08 lands |
| 13 | `ru-fallback` | `country === 'ru'` provider selection with and without Yandex creds in transcript |
| 14 | `llm-timeout` | transcript returns timeout error → graceful degradation text, turn persists (P5) |
| 15 | `kg-subject-swap` | same learner, physics vs chemistry subject → adapter-driven differences only |

Fixtures 6 and 12 are deliberate **behavior-pinning fixtures**: they
freeze known-imperfect current behavior so the ADR that fixes it produces
a visible, reviewed fixture flip instead of a silent change.

## 6. CI wiring plan

`.github/workflows/validate.yml` (new file — test scaffolding, not
production runtime; buildable as integration-prep):

1. `npm ci` (postinstall runs `prisma generate`; CI must have network to
   the Prisma engine CDN or a cached engine — sandboxed environments
   without it cannot reproduce the clean type baseline, see §1)
2. **Type-error ratchet** — NOT a zero-error gate. Measured 2026-07-02:
   the branch has hundreds of pre-existing type errors, so
   `npx tsc --noEmit` as a hard gate would be red on day one and would
   either block all merges or (worse) train people to ignore CI. Instead:
   count errors (`tsc --noEmit | grep -cE "error TS"`), compare against
   `tsc-baseline.txt` committed in-repo; **fail only if the count
   increases**; any PR may lower the baseline, none may raise it. The
   baseline number is captured by the first CI run (clean generated
   client), not from sandbox measurements.
3. `npx vitest run` (Tiers 1–2) — hard gate; verified green (506/507,
   ~10 s) and independent of DB and generated client, so this gate is
   deployable immediately with zero flake risk from infrastructure.
4. KG validator for every shipped subject (6 as of 2026-07-04 — English
   joined; the CLI takes a file path and defaults to mathematics):
   `for s in mathematics physics chemistry biology computer-science english; do
   npx tsx scripts/validate-knowledge-graph.ts docs/$s/kg/graph.json; done`
   (**closes R6** — the validator currently has zero CI wiring; read-only
   over `docs/*/kg/graph.json`, so it cannot interfere with the Curriculum
   Production Pipeline). All 6 graphs verified PASS on 2026-07-04.
5. Tier 3a job: Postgres service container → `prisma db push` → seed →
   `next build && next start` → fixture replay

Steps 1–4 are immediately buildable. Step 5 lands with the first T3a
fixtures. Per-wave exit gates then reference named fixture subsets
(e.g., Wave 2 exit = fixtures 6, 10, 11, 12 flipped-and-reviewed + rest
green). Long-term, the ratchet in step 2 trends the baseline to zero and
then converts to a hard gate.

## 7. Build order (all pre-gate except where marked)

1. Transcript player + recorder utilities under `src/tests/harness/`.
2. Tier 2 contract tests for the five pure engines (no DB mocking
   needed): `decide()`, strategy, composer, weak topics, KG adapter.
3. CI workflow steps 1–4.
4. Fixture seed/assert utilities + fixtures 2, 3, 10 as the T3a pilot.
5. Remaining fixtures; CI step 5.
6. **GATED:** T3b orchestrator extraction; client env-override seam if
   needed.

## 8. Relationship to existing documents

- Bible §6.12 names the gap this spec fills; §6.12 now points here.
- `ARCHITECTURE_COMPLETION_REPORT_V1.md` §5 Wave 1b is this framework;
  its per-wave exit gates consume §5's fixture subsets.
- ADR 07 §9's equivalence-validation report will run as a Tier 2 + Tier 3
  fixture pair (old vs. new classification on identical seeds).
- ADR 13 §9 validation (evidence append correctness) adds persistence-
  surface assertions to existing fixtures rather than new machinery.
- `TEST_RESULTS.md`'s offline assertion suite is unchanged and remains
  the Tier 1 record.
