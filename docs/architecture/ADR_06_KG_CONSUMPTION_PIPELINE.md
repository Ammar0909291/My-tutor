# ADR 06 — Educational Brain Knowledge Graph Consumption Pipeline (ARCHITECTURE SPECIFICATION — NOT IMPLEMENTED)

> Author: Chief Systems Architect for the Educational Brain (Claude session)
> Date: 2026-06-30
> Status: **PROPOSED ARCHITECTURE SPECIFICATION. ZERO CODE CHANGES.**
> Scope: design only. No `route.ts` change. No schema change. No adapter
> code written. No new field exposed (this ADR does not re-propose ADR
> 05's deferred `cross_links`/`mastery_threshold` accessors — it
> specifies the *gate* that would eventually have to exist before any
> such accessor is safe to ship, and explicitly leaves the decision to
> ship one for a separate, later, explicitly-approved ADR).
> Priority: **#1** in the user's revised Educational Brain architecture
> roadmap (2026-06-30) — "Educational Brain Knowledge Graph Consumption
> Pipeline: end-to-end lifecycle from Canonical Knowledge Graph → Teaching
> Engine; interface contracts; data flow; version compatibility; failure
> handling; future extensibility."
> Standing constraint this ADR operates under (explicit, this session):
> do **not** implement anything here, do **not** expose any new KG field,
> until the Canonical Knowledge Graph v1 specification is frozen by the
> Curriculum Production Pipeline **and** the user explicitly approves
> execution. This document is allowed to design the gate; it is not
> allowed to build it.

---

## 1. Problem

There is no formal contract today between "the Curriculum Production
Pipeline produces `docs/{subject}/kg/graph.json`" and "the Educational
Brain consumes it." The adapter that bridges them
(`src/lib/curriculum/subjectKgAdapter.ts`) was built to read one
already-correct, hand-authored file per subject and has no defenses
against an upstream producer that is still actively iterating — which is
exactly the situation the user has just flagged: the Curriculum Pipeline
has not yet frozen its v1 contract, and the Educational Brain must not
get ahead of it.

Four concrete gaps, found by direct inspection this session:

1. **No version gate.** Every `graph.json` already carries a `version`
   field (`"1.0.0"`/`"1.0.1"`) — but `subjectKgAdapter.ts`'s `getRaw()`
   destructures only `raw.concepts` and discards `version` along with
   everything else in the wrapper. Nothing anywhere checks it.
2. **No status gate.** Every `graph.json` already carries a `status`
   field (`"frozen"` for mathematics, `"production"` for the other
   four) — also discarded at the same line, never read. There is
   currently **no system property** that would stop the runtime from
   consuming a `graph.json` the instant a Curriculum Pipeline run saves
   it mid-revision with `status: "draft"` or similar. The "don't consume
   until frozen" rule exists today only as a documented human practice
   (this session's ADR 05 deferral), not as something the code enforces.
3. **No runtime shape validation.** `getRaw()` trusts the parsed JSON via
   TypeScript `as` casts only (`c.difficulty as KnowledgeNode['difficulty']`,
   etc.) — these are compile-time-only and vanish at runtime. A
   malformed or partially-authored file would not be caught at the
   adapter boundary; bad values flow straight into `KnowledgeNode`/
   `ConceptNode` and from there into the Teaching Engine.
4. **No automated pipeline gate at all.** `scripts/validate-knowledge-graph.ts`
   (9 structural checks: duplicate IDs, broken edges, cycles,
   reachability, required-field completeness, etc.) is a manual CLI
   script. Confirmed this session: it is **not** referenced in
   `package.json` (no `prebuild`/`prepush`/`pretest` hook) and there is
   no `.github/workflows` entry that runs it. A graph.json change can
   reach the running app with zero automated check in between.

**Why this matters right now, specifically:** the failure mode these four
gaps produce is *silent degradation*, not loud failure. Per
`ARCHITECTURE_DECISIONS.md` Rule 11, every dynamically-imported block in
`route.ts` (including the KG lookups) is wrapped in `try`/`catch` and
degrades to `null` on error — correct for runtime resilience, but it
means a corrupted or prematurely-edited `graph.json` wouldn't crash
anything or even log distinctly; it would just quietly serve degraded
chat turns in production with no signal that the cause was a bad KG file
rather than an ordinary advisory-engine miss. That is the opposite of
what "don't lock in before v1 freeze" needs: it needs a *loud, structural*
boundary, not a *silent, best-effort* one.

## 2. Evidence

**Wrapper metadata, authored but 100% discarded today** (read directly
from each subject's live `graph.json`):

| Subject | `name` | `version` | `status` | `build_date` |
|---|---|---|---|---|
| mathematics | Canonical Mathematics Knowledge Graph | `1.0.1` | `frozen` | 2026-06-29 |
| physics | Physics Knowledge Graph | `1.0.0` | `production` | 2026-06-29 |
| chemistry | Chemistry Knowledge Graph | `1.0.0` | `production` | 2026-06-29 |
| computer_science | Computer Science Knowledge Graph | `1.0.0` | `production` | 2026-06-29 |
| biology | Biology Knowledge Graph | `1.0.0` | `production` | 2026-06-29 |

Note the inconsistency even at this descriptive level: mathematics says
`"frozen"`, the other four say `"production"` — two different vocabulary
choices for what reads like the same maturity claim, authored by
(evidently) different Curriculum Pipeline runs, with no schema enforcing
which values `status` may take. This alone is evidence the Curriculum
Pipeline's own status vocabulary is not yet standardized — reinforcing
why the Educational Brain side must not hard-couple to today's specific
strings.

**The discard point, exact code** (`subjectKgAdapter.ts:86-92`):

```ts
function getRaw(): RawKGConcept[] {
  if (cache) return cache
  const filePath = path.join(process.cwd(), `docs/${subject}/kg/graph.json`)
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as { concepts: RawKGConcept[] }
  cache = raw.concepts          // ← name/version/status/build_date/statistics/domains all dropped here
  return cache
}
```

**Zero runtime validation, exact code** (`subjectKgAdapter.ts:107-121`,
`getConceptNode()`): every field is assigned via a bare `as` cast, no
`if`/Zod/manual check anywhere in the function. Confirmed identical
pattern in `getNodes()`.

**Zero automated pipeline gate** — confirmed by direct inspection:
`grep -n "validate-knowledge-graph" package.json` → no matches;
`find .github -iname '*.yml'` → no workflow files reference it. The
validator only ever runs when a human types
`npx tsx scripts/validate-knowledge-graph.ts` by hand.

**The validator itself doesn't enforce version compatibility either** —
confirmed by reading it: `graph.version` is read once, purely for display
(`console.log(`subject: ${graph.name} v${graph.version ?? '?'}`)`); there
is no comparison against a supported-version constant anywhere in the
script.

## 3. Root Cause

`subjectKgAdapter.ts` was designed under an implicit assumption that no
longer holds: "there is exactly one author, editing one file by hand,
who will not commit it until it's correct." That assumption was
reasonable when the KG was authored directly. It stops being safe the
moment Knowledge Graph production becomes its own pipeline with its own
version/status lifecycle — and the evidence that this has already
happened is sitting in the JSON files themselves: they now carry
`version`/`status`/`build_date`/`statistics` fields that a single-author,
hand-edited file would have no reason to need. **The producer side has
already outgrown the "trust blindly" consumer side; the consumer side has
not caught up.** This ADR is that catch-up, specified in advance of the
Curriculum Pipeline's v1 freeze so implementation can start immediately
once it happens, per the user's explicit goal.

## 4. Proposed Architecture — comparing approaches

**Option A — Leave as-is.** Rejected. Directly contradicts the user's
stated concern ("premature implementation risks locking the Educational
Brain to assumptions that may change") — today there is zero structural
protection against exactly that risk; protection exists only as
documented discipline (this session's ADRs), which is necessary but not
sufficient.

**Option B — Build a full versioned-schema migration framework now**
(generic JSON-Schema validation, automatic upgrade transforms between
schema major versions, a multi-version adapter dispatcher). Rejected as
premature over-engineering: there is no v2 schema to migrate *from* yet
— the Curriculum Pipeline hasn't even frozen v1. Designing a generic
N-version migration engine against a single known version is speculative
complexity with no second real data point to validate the design against.
This would also risk exactly the "locking to assumptions that may change"
failure mode the user is warning against, just at one layer removed
(locking the *migration framework's* shape instead of the *fields*).

**Option C — A four-part Knowledge Graph Consumption Contract, specified
now, implemented only after v1 freeze + explicit approval.** Selected.
Minimal, composable, and — critically — every part of it is satisfiable
without knowing anything about what v2 will look like, because each part
operates on the wrapper metadata and structural invariants that already
exist today, not on hypothetical future fields.

The four parts:

### (a) Schema Version Gate
Declares a single constant, `SUPPORTED_KG_SCHEMA_MAJOR = 1`, against
which `graph.version`'s major component is checked at adapter load.
Mismatch → load refused with a descriptive error (which version was
found, which is supported). This makes a future breaking schema change
(field renamed/removed/retyped) a **loud, immediate, load-time failure**
instead of a silent shape mismatch discovered three layers downstream in
the Teaching Engine.

### (b) Status Gate
Declares which `status` values the live runtime is permitted to consume
(today: `"frozen"`, `"production"` — both observed in the wild, both
clearly meaning "ready"). Anything else (`"draft"`, `"in_progress"`, or
any value not on the allow-list) is refused in the same way as a version
mismatch. This is the piece that turns "don't consume an unfrozen KG"
from a human-followed instruction into a structural guarantee — even if
a future session forgets the rule, the gate enforces it.

### (c) Runtime Shape Validation
A boundary check — **not** a new field exposure — that validates the
*currently consumed* 8 fields (`id`, `name`, `description`, `difficulty`,
`requires`, `unlocks`, `estimated_hours`, `bloom`) actually have the
expected types/non-null-ness before `getNodes()`/`getConceptNode()` trust
them, replacing today's compile-time-only `as` casts with an actual
runtime check. This closes gap #3 without touching what's exposed
downstream at all.

### (d) Metadata Surface (diagnostic only, zero teaching-decision influence)
A new read-only accessor, conceptually `getMetadata(): { name, version,
status, buildDate }`, for logging/observability/debugging — explicitly
**not** wired into any Teaching Engine, Mastery, or Assessment decision.
Lets an engineer (or a future automated alert) answer "which KG version
is this production instance actually running?" without grepping a file
on disk.

None of the four touch `ConceptNode`, `KnowledgeNode`, or the existing
`getNodes()`/`getConceptNode()` signatures. None of them expose
`cross_links` or `mastery_threshold` — that remains exactly where ADR 05
left it, deferred pending the v1 freeze and separate approval. This ADR
is the gate that makes executing ADR 05's Phase 1 *safe* later; it does
not itself execute ADR 05.

## 5. Interface Contracts (formalized)

**Producer contract** — what "Canonical KG v1, frozen" will mean once the
Curriculum Production Pipeline declares it (this ADR assumes, does not
define, that declaration):
- Wrapper: `{ name: string, version: string (semver), status: "frozen" | "production", build_date: string (ISO date), statistics: {...}, domains: [...], concepts: RawKGConcept[] }`.
- Each `RawKGConcept` satisfies the existing canonical 10-field schema
  (`id, name, requires, unlocks, cross_links, difficulty, bloom,
  mastery_threshold, estimated_hours, description`) and the 9 structural
  checks already enforced by `validate-knowledge-graph.ts` (no
  duplicates, no broken edges, DAG, reachability, etc.).

**Consumer contract** — what the Educational Brain promises never to
assume beyond, until a separate ADR says otherwise:
- Only the 8 fields currently mapped into `KnowledgeNode`/`ConceptNode`
  are read. `cross_links` and `mastery_threshold` remain unread by
  contract, not by oversight — this is the explicit, intentional
  boundary this ADR draws around ADR 05's deferred scope.
- The Gate (parts a–c above) sits structurally *between* producer and
  consumer as a new, separate architectural layer — not a modification
  of either existing side, and not a new responsibility bolted onto
  `getNodes()`/`getConceptNode()` themselves (keeps each function
  single-purpose, consistent with the codebase's existing per-engine
  ownership rules).

## 6. Data Flow (extends `DATA_FLOW.md` §3)

```
docs/{subject}/kg/graph.json   (producer: Curriculum Production Pipeline)
        │
        ▼
┌───────────────────────────────────────────────┐
│  PROPOSED: Knowledge Graph Consumption Gate     │   ← NEW layer, this ADR
│  (a) Schema Version Gate  — major-version check │
│  (b) Status Gate          — frozen/production   │
│  (c) Runtime Shape Validation — 8-field check   │
│  (d) Metadata Surface     — diagnostic only      │
└───────────────────────────────────────────────┘
        │  (pass)                       │ (fail → loud error, load refused)
        ▼
subjectKgAdapter.ts  (unchanged: getNodes(), getConceptNode())
        │
        ▼
knowledgeGraph.ts (SUBJECT_ADAPTERS registry → KGNode / KnowledgeGraph)
        │
        ├──▶ Teaching Engine (ConceptNode input)
        ├──▶ TAG / Lesson Composer (ConceptNode input)
        ├──▶ Recommendation cluster (prerequisite walks, weak-topic mapping)
        └──▶ AI-prompt context strings (buildKnowledgeGraphContext)

scripts/validate-knowledge-graph.ts — PROPOSED: wire into CI on any
docs/**/kg/graph.json diff, so producer-side mistakes are caught before
merge, not at consumer load time at all (defense in depth — the Gate
above is the runtime backstop, CI is the first line).
```

## 7. Version Compatibility Design

Semver interpretation proposed for the Schema Version Gate:
- **MAJOR** — a breaking schema change (field renamed, removed, or
  retyped on `RawKGConcept`, or the wrapper shape itself changes). Hard
  fail at load: refuse to start serving that subject, descriptive error.
- **MINOR** — an additive field (e.g., a hypothetical new authored field
  alongside `cross_links`). Loads fine — `RawKGConcept`'s existing
  `[key: string]: unknown` catch-all already tolerates unknown fields
  without a code change. The new field simply sits unconsumed until a
  dedicated future ADR (mirroring ADR 05) proposes an accessor for it.
  This is, concretely, the exact situation `cross_links` and
  `mastery_threshold` are in *today* — this section formalizes that as a
  designed property of the system rather than an accident of nobody
  having wired them up yet.
- **PATCH** — content-only edits (more concepts, corrected descriptions,
  fixed typos). Always compatible by definition.

**Explicit non-conflation, important for this session's directive:** the
JSON's own `status: "frozen"`/`"production"` field is the *Curriculum
Pipeline's* claim about its own output. This ADR does **not** treat that
claim as sufficient signal for the Educational Brain to start consuming
*new* fields from it. Whether to expose any additional field (starting
with `cross_links`/`mastery_threshold`, per ADR 05) remains gated by a
separate, explicit user approval — independent of whatever label the
Curriculum Pipeline puts on its own file. The Status Gate in §4(b)
controls whether the runtime consumes the file *at all*; it does not
control which *fields within* an already-consumable file get exposed
downstream. Those are two different decisions, deliberately kept
separate so freezing the KG's structural maturity and approving a new
field's exposure remain independently revocable.

## 8. Failure Handling Design

| Layer | Today | Proposed |
|---|---|---|
| CI / pre-merge | None — confirmed no workflow runs the validator | Wire `validate-knowledge-graph.ts` into a CI check on any `docs/**/kg/graph.json` diff; PR blocked on FAIL status |
| Adapter load time | None — bare `as` casts, no version/status check | Schema Version Gate + Status Gate + Runtime Shape Validation (§4 a–c); throws a descriptive error outside production; in production, logs a structured, distinctly-tagged error (not a generic catch) and degrades to the existing `null`-context behavior so Rule 11 ("never block a turn") is preserved |
| Request time | Generic `try`/`catch` around the dynamic import in `route.ts`, degrades silently to `null` | **Unchanged** — this ADR does not touch `route.ts`. It only makes the failure *upstream* of this layer observable, so a bad-KG-load is distinguishable in logs/monitoring from an ordinary advisory-engine miss, instead of both looking identical from `route.ts`'s perspective |

The key design principle: **fail loud where a human can see it (CI, dev,
structured production logs), fail soft where a student is waiting on a
response (the chat turn itself).** Today the system only does the second
half; this ADR adds the first half without weakening the second.

## 9. Future Extensibility

This ADR formalizes, as a repeatable procedure, the exact discipline
already being followed manually for `cross_links`/`mastery_threshold` in
ADR 05:

1. Curriculum Production Pipeline authors and freezes a field at some KG
   version (MINOR bump under §7's scheme).
2. The Consumption Gate accepts the file as loadable — no consumer code
   change required, because unknown fields are already tolerated
   (`RawKGConcept`'s catch-all) and the Gate only checks the *existing*
   8-field contract plus wrapper metadata, not an exhaustive field list.
3. A dedicated ADR (the ADR 05 pattern) proposes a specific, scoped
   accessor and names its consumer.
4. Explicit user approval, per the standing 4-condition gate.
5. Implementation, with the validation/migration discipline in §11/§12
   below.

This ADR is the missing step that makes ADR 05's eventual Phase 1 safe to
execute later: ADR 05 proposed *what* to expose; this ADR specifies the
*gate* that should exist before exposing anything is safe to greenlight,
given that the producer side (Curriculum Pipeline) is still actively
iterating.

## 10. Implementation Specification (FOR THE FUTURE — NOT EXECUTED NOW)

Proposed new module (not created this session):
`src/lib/curriculum/kgConsumptionGate.ts`

```ts
// SPECIFICATION ONLY — not implemented.

export const SUPPORTED_KG_SCHEMA_MAJOR = 1
export const ACCEPTED_KG_STATUSES = ['frozen', 'production'] as const

export interface KgWrapperMetadata {
  name: string
  version: string
  status: string
  buildDate: string
}

export interface KgGateResult {
  ok: boolean
  metadata: KgWrapperMetadata
  errors: string[]   // empty when ok === true
}

// Called once per subject, inside subjectKgAdapter.ts's getRaw(),
// BEFORE `cache = raw.concepts` — gates the load, does not replace it.
export function gateKnowledgeGraph(raw: unknown): KgGateResult { /* ... */ }
```

Proposed `SubjectAdapter` extension (additive only, mirrors ADR 05's own
additive-only constraint):

```ts
export interface SubjectAdapter {
  getNodes(): KnowledgeNode[]              // unchanged
  getConceptNode(id: string): ConceptNode | undefined   // unchanged
  getMetadata(): KgWrapperMetadata         // NEW, diagnostic only
}
```

**This code is not written. It is a specification for what implementation
would look like once (a) the Curriculum Pipeline declares v1 frozen and
(b) the user explicitly approves execution**, exactly as instructed this
session.

## 11. Validation Specification (for the future implementation)

- Unit tests for `gateKnowledgeGraph()` against synthetic fixtures:
  valid wrapper, wrong major version, disallowed status, missing
  wrapper field, missing/malformed concept field. Each must produce the
  expected `ok`/`errors` result deterministically.
- Regression baseline: re-run `validate-knowledge-graph.ts` against all 5
  live `graph.json` files — must still PASS (proves the Gate doesn't
  reject real, already-shipped data).
- `npx tsc --noEmit`, diffed against a pre-change baseline via `git
  stash`/`git stash pop` — zero new errors (same standard as ADR 03/04/05).
- `npx vitest run` — full suite, identical pass count to baseline.
- New CI workflow step (proposed, not created): run the validator on any
  PR touching `docs/**/kg/graph.json`; fail the PR on validator FAIL.

## 12. Migration Strategy (for the future implementation)

Because no consumer-facing behavior changes (the Gate sits below
`getNodes()`/`getConceptNode()`, which keep their exact current
signatures and outputs for all 5 currently-shipped, currently-passing
graphs), rollout is pure addition with a staged-trust pattern, mirroring
how `ENABLE_EDUCATIONAL_BRAIN_PIPELINE` was rolled out elsewhere in this
codebase:
1. Ship the Gate in **observe-only mode** — logs a warning on any
   version/status/shape mismatch but never refuses to load. Run for one
   full deploy cycle against the 5 live subjects to confirm zero false
   positives (i.e., confirm the Gate doesn't reject data it should
   accept).
2. Flip to **enforcing mode** once confirmed clean — refuse-to-load
   becomes real.
3. Wire the CI check (§11) at the same time or slightly before step 2,
   so producer-side mistakes are caught pre-merge rather than only at
   runtime load.

## 13. Scalability to Millions of Learners

The Gate runs **once per subject, per process lifetime** — it executes
inside `getRaw()`'s existing lazy-load-and-cache closure, so its cost is
`O(subjects)` (5 today, bounded by how many subjects ever exist), never
`O(requests)` or `O(learners)`. This is identical to the existing
adapter's own scaling property (`ENGINE_REFERENCE.md` §4: "caches in a
closure for the process lifetime"). At any learner volume — thousands or
millions of concurrent chat turns — the Gate adds zero marginal per-
request cost, because by the time the first request for a subject
arrives, that subject's gate check already ran once and is cached.
**Constraint to preserve in implementation:** the Gate must stay inside
the existing lazy-cache boundary, never move into the per-request hot
path (`route.ts`'s dynamic-import call sites) — this is the one hard
requirement carried into §10's eventual implementation.

## 14. Backward Compatibility with Educational Brain v1

Full. Zero changes to `ConceptNode`, `KnowledgeNode`,
`SubjectAdapter.getNodes()`, `SubjectAdapter.getConceptNode()`, the
Teaching Engine, TAG, Lesson Composer, or the Recommendation cluster.
`getMetadata()` is a pure addition. All 5 currently-shipped graphs
already satisfy every check this ADR proposes (confirmed: all 5 carry
valid wrapper metadata, all 5 already pass the existing 9-check
validator), so when this is eventually implemented, none of the 5
subjects requires any data change to keep working.

## 15. Status Under This Session's Directive

Per the user's explicit instruction this turn: this ADR is a
specification only. No implementation is proposed for execution in this
session, and — unlike ADR 04/05 — this document does not close with a
request to approve any part of §10 for execution now. Implementation
remains blocked on two independent conditions, both required: (1) the
Curriculum Production Pipeline declaring the Canonical Knowledge Graph
v1 specification frozen, and (2) explicit user approval to implement.
Neither has occurred.

## 16. Future Impact

This ADR is the foundation contract that ADR 05's deferred field-exposure
phases — and every future "consume a new KG field/subject/version"
decision — will reference instead of re-deriving consumption discipline
from scratch each time. It directly enables the next item in the user's
priority roadmap: **Mastery Intelligence Architecture**, which itself
depends on knowing *how* `mastery_threshold` would eventually reach a
consumer (this ADR's §9 procedure) even while *whether* it's exposed yet
remains correctly deferred (ADR 05, still un-executed by design).
