# Runtime ↔ Educational Brain Contract

**Status**: Canonical interface specification. Not an ADR, not a design
document, not Brain authoring. This is the permanent boundary between
Runtime Engineering and Educational Brain Authoring. Both sides build
against this document and neither depends on the other's internals.

**Effective state**: Runtime is frozen post-Wave-0/Wave-1 (commits
8e1bec5 … 0a26098) and enters maintenance mode. Every interface named
below as LIVE exists in code today and is exercised by the test suite.
Interfaces named FUTURE are defined here as retrieval shapes only, so
that when the Brain authors them, zero runtime redesign is required.

---

## 1. Purpose

**Runtime executes. The Educational Brain teaches. AI speaks.**

- The Runtime never invents teaching. When authored knowledge exists, it
  retrieves it. When it does not, the Runtime falls back to constrained
  LLM generation and quarantines the output as a DRAFT candidate — an
  invention is never silently canonized.
- The Educational Brain never manages execution. It authors what a great
  teacher knows: actions, sequences, scripts, probes, limits. It does
  not know about routes, snapshots, prompts, or databases.
- The AI realizes natural language. It renders retrieved decisions and
  retrieved content in the learner's register. It does not choose
  strategy, action, pacing, placement, or when a session ends.

## 2. Architectural Responsibilities

| Responsibility | Owner |
|---|---|
| Retrieval, orchestration (route.ts), persistence | **Runtime** |
| Evidence writing (append-only, fire-and-forget) | **Runtime** |
| Mastery STATE (rows, scores, status transitions) | **Runtime** |
| Scheduling (reviews due, session boundaries, placement timing) | **Runtime** |
| Session lifecycle (OPENING/CORE/CLOSING machine, budgets) | **Runtime** (executing Brain-authored rules) |
| Deterministic signal parsing (SIGNAL tag, failure-state utterances) | **Runtime** |
| Teaching actions, procedures, protocols | **Educational Brain** |
| Misconceptions (taxonomy, repair sequences, per-concept libraries) | **Educational Brain** |
| Recovery scripts and their lesson-one deltas | **Educational Brain** |
| Assessments (probes, distractor maps, gate definitions, rubrics) | **Educational Brain** |
| Explanations, worked examples, analogies, anti-analogies | **Educational Brain** |
| CPA sequences, primitives (future libraries) | **Educational Brain** |
| Evidence RULES (what constitutes evidence, contracts per component) | **Educational Brain** (validation/08) |
| Mastery DEFINITIONS (thresholds, gate criteria, certification bars) | **Educational Brain** |
| Natural-language realization, register rendering, example values | **AI** |
| Curriculum (KGs) | **Curriculum Production Pipeline** (neither party; both consume) |

## 3. Runtime → Brain Retrieval Contract

Universal failure rule for every row: **if not authored → graceful
fallback to constrained LLM generation + DRAFT capture where a capture
pipeline exists. The Runtime never fabricates authored-looking content
and never blocks a turn on a retrieval miss.**

| Retrieval | Status | Purpose | Input | Output | Failure behavior | Versioning |
|---|---|---|---|---|---|---|
| Explanation asset | LIVE (`findBestExplanation`) | Serve authored explanation instead of generating | conceptId, language, gradeBand, learner message | ACTIVE ExplanationAsset content + confidence | null → LLM path unchanged; generation captured as DRAFT | ADR 14 lineage: one ACTIVE per canonicalSlug; approval deprecates predecessor |
| Probe asset | LIVE (`findBestProbe`) | Serve authored, distractor-mapped probe | same | ACTIVE ProbeAsset (stem, choices w/ misconceptionIds, correctValue) | null → no probe served (never invented to fill a slot) | same |
| Worked example | LIVE (EXPLANATION family, familyKind `worked_example`) | Authored worked example retrieval | same | asset content | same as explanation | same |
| Action procedure | LIVE (`buildActionProcedureBlock`) | The authored HOW for the action decide() selected | ActionType | procedure block (cited transcription of teaching-actions/, misconceptions/02) | unmapped type → empty string, decision block stands alone | source-citation versioning (§12) |
| Recovery script | LIVE (`recoveryGuard`) | Authored response to a failure-state utterance | learner message; isFirstLesson | preempting script block (foundations/01 §3 + first-lesson/05 delta) | no match → normal turn (LLM judgment, today's baseline) | source-citation versioning |
| First-lesson protocol | LIVE (`firstLessonGuard`) | Mandatory beginner limits + subject adaptation | subjectSlug, level, lesson order, completions | constraint block (first-lesson/02/03/04/07) | subject unmapped → universal limits only | source-citation versioning |
| Placement protocol | LIVE (`placementVerification`) | Three-bracket verification config + blocks | level, entry lesson, prior state | probe/await blocks + pure state machine | ineligible → difficulty-floor default stands | source-citation versioning |
| Review prompt form | LIVE (RAPID_REVIEW procedure + OPENING block) | Retrieval-practice form (cued, produce-the-answer) | due items (runtime-scheduled) | form constraints | none due → skip | source-citation versioning |
| Student-state mapping | LIVE (`studentState.ts`) | Map profile → retrieval key (gradeBand, register) | profile fields | StudentState | defaults (ADULT, beginner register) | code-versioned; field additions additive-only |
| Evidence rules | LIVE (constants in write sites) | What each turn must record | per validation/08 §2 | evidence events | never blocks turn; loss tolerated, fabrication forbidden | contract changes require validation/08 edit FIRST |
| Teaching protocol | FUTURE | Multi-turn authored sequences beyond single actions | protocol id ← decision layer | ordered step list | not authored → action-procedure layer stands | reserve: retrieve by id + version, never by prose search |
| Primitive | FUTURE | Smallest authored teaching moves | primitive id | move template | not authored → action procedure stands | same reservation |
| CPA sequence | FUTURE | Concrete→Pictorial→Abstract per concept | conceptId | ordered representation sequence | not authored → concept entry / LLM fallback | same reservation |
| Misconception library (per concept) | PARTIAL (4 concepts via probes/repair assets; ledger tables live) | Phrase→misconception match, repair selection | conceptId, verbatim phrase | misconception id + repair path | unmatched phrase → recorded as MISCONCEPTION_DETECTED with phrase only | ADR 14 + student-state/03 ledger rules |

**The FUTURE rows are binding on both sides**: the Brain may author
protocols/primitives/CPA in any internal format it likes, but must
expose them keyed by (id, concept or action linkage, version) — and the
Runtime commits to retrieving by key, never parsing Brain prose at
runtime. This single rule is what keeps both sides free.

## 4. Brain Authoring Contract

Every authored asset intended for runtime retrieval must carry:

**Minimum required fields**: stable id (KG conceptId where concept-bound);
kind/family; language; audience band; the content itself; **source
citation** (which Brain file/section it transcribes or embodies).

**Optional fields**: targeted misconception ids; incompatibilities
(never serve to a learner holding misconception X); prerequisites;
difficulty; register variants.

**Required quality gates** (from concepts/TEMPLATE.md + COVERAGE.md, restated as the interface):
1. Speakable — survives being read aloud.
2. The **AI Removal Test**: the asset must teach even if rendered by a
   much weaker model — it cannot rely on the renderer inferring missing
   steps, filling gaps, or knowing unstated context. If the asset only
   works because a strong LLM patches it, it is not authored knowledge;
   it is a prompt.
3. Probes are production-form with distractor→misconception mapping
   (a wrong answer must be diagnostic, never noise).
4. Instrumented-skeleton entries are valid; rich-prose-no-instruments
   entries are not (validation/08 §4).

**Backward compatibility**: additive only. New familyKinds, new fields,
new bands are always safe (runtime ignores unknown kinds). Renaming or
removing a kind/field the runtime keys on is a breaking change (§12).

**Deprecation**: assets are never deleted — DEPRECATED/RETIRED per
ADR 14 lifecycle; transcription-module content is superseded by editing
the cited source FIRST, then the transcription.

## 5. Evidence Contract

**Runtime writes. Brain interprets.** Single-writer per surface
(ADR 13); append-only; historical evidence is never overwritten or
deleted; loss is tolerated (fire-and-forget), fabrication is forbidden
(no signal → no event).

| Category | Written when | Owner of meaning |
|---|---|---|
| ASSET_SHOWN | any asset served (strength always 0.0) | Brain (consumed-ness ≠ effectiveness) |
| PROBE_OUTCOME | every answer attempt: correctness × server-measured latency × stated confidence (× placement bracket) | Brain (the D1 grid + calibration pair) |
| MISCONCEPTION_DETECTED | verbatim characteristic phrase captured | Brain (ledger + repair selection) |
| LEARNER_FEEDBACK (`recovery:<state>`) | failure-state utterance fired recovery | Brain (what-restores science, L1) |
| RE_ASK / SUMMATIVE_OUTCOME | reserved per ADR 13 | Brain |

The decision-consequence join (validation/08 L5) is guaranteed by
construction: strategy/decision rows and next-turn signal rows share
sessionId + ordering. Readers/aggregators are Brain-side analytics; the
Runtime never interprets evidence beyond the mechanical folds in §6.

## 6. Mastery Contract

**Brain defines; Runtime applies.**
- Brain owns: what mastery IS (gate criteria: production + new-surface +
  mixed + delayed; assessment/05 §3), threshold values, the ceiling on
  what conversational evidence may claim, decay/status semantics.
- Runtime owns: the rows. It applies Brain-defined folds mechanically:
  conversational signal → TopicProgress at school-checkpoint semantics
  (65/25), capped — **never COMPLETED/MASTERED from conversation**;
  confident-wrong → MistakeRecord; completion/certification only via the
  dedicated flows.
- Runtime never invents thresholds: every numeric bar in runtime code
  must cite the Brain rule or the pre-existing runtime constant it
  mirrors. Changing a bar is a Brain edit first, runtime sync second.
- The Brain never edits learner state: no authored content may claim,
  imply, or instruct that a specific learner's mastery be changed.

## 7. Teaching Action Contract

- **Identity**: the Brain's 27-action catalog (teaching-actions/) is the
  action namespace. Runtime's ActionType values are keys INTO it (the
  six decide() emits map to authored actions; future selector upgrades
  widen the key set without changing the namespace).
- **Execution rules**: retrieved, never improvised — the action
  procedure block is the authored method; the LLM renders it, supplies
  surface wording and example values, and may not restructure it.
- **Ordering**: which action runs is the decision layer's output
  (deterministic); how it runs is the Brain's procedure; what words it
  uses is the AI's.
- **Fallback**: an action with no authored procedure runs under the
  decision block alone (today: none — all six are covered).
- **Guarantee**: no runtime code change alters teaching behavior; only
  Brain authoring (and its cited transcriptions) does. A runtime PR that
  changes what is taught, in what order, or by what method — rather than
  how it is retrieved, persisted, or scheduled — violates this contract.

## 8. Recovery Contract

- **Priority**: absolute. A detected failure-state utterance preempts
  every other instruction, block, and pipeline this turn
  (decision-engine/03 §0; Principle 5) — including placement
  calibration and the asset memory path.
- **Detection**: Runtime-owned, deterministic, conservative (strong
  utterances anywhere; mild ones only when the message is the
  utterance). The learner's stated state is ground truth (P20) — the
  Runtime never re-classifies it, and the AI is instructed never to
  argue with it.
- **Scripts**: Brain-owned (foundations/01 §3; first-lesson/05 deltas).
  Runtime retrieves by utterance key; it never composes recovery
  content.
- **Failure hierarchy**: recovery-failure escalation
  (decision-engine/05 §5 — shrink the session, never intensify) is
  Brain-owned pedagogy; the Runtime's session machine supplies the
  enforcement points (budgets, CLOSING).

## 9. Assessment Contract

- Brain authors: every question (probes, distractor maps, golden
  probes), every rubric, gate composition, and what outcomes MEAN.
- Runtime executes: serves ACTIVE probes, captures outcomes with
  latency/confidence, applies the mechanical folds of §6, schedules the
  delayed components, and enforces the process rules the Brain has
  authored (non-decisive items under confusion/guessing; affect budget
  stops; no same-session certification).
- The LLM may generate assessment items ONLY where no authored probe
  exists, as constrained fallback — and such items never certify
  anything beyond the conversational-evidence cap.

## 10. Primitive Contract (future)

When the Brain authors a Primitive Library, the Runtime will retrieve
primitives by **(primitiveId, version)**, receiving a self-contained
move template that passes the AI Removal Test. The Runtime commits to:
no parsing of primitive prose, no caching beyond version-keyed identity,
graceful fallback to the action-procedure layer when a primitive is
absent. Nothing else about primitives is constrained here — their
design is entirely the Brain's.

## 11. Protocol Contract (future)

Teaching Protocols (multi-turn authored sequences) will be retrieved by
**(protocolId, version)** as an ordered list of steps, each step
resolvable to an action/primitive key plus completion criterion the
Runtime can evaluate from signals. The Runtime supplies: step-position
persistence (contextSnapshot), advancement on criterion, abandonment
handling via the session lifecycle. The Brain supplies everything else.

## 12. Version Compatibility

- **Brain content version**: ADR 14 lineages for DB assets (one ACTIVE
  per canonicalSlug); file history for the tree.
- **Transcription version rule** (the seam that keeps cited TS modules
  honest): every transcription module (firstLessonGuard,
  actionProcedures, recoveryGuard scripts, brainSeedAssets) cites its
  source sections. **The Brain file is edited first; the transcription
  syncs second, in a commit citing the Brain change.** A transcription
  that diverges from its cited source is a bug, resolved in the
  source's favor.
- **Runtime version**: the retrieval interfaces in §3 are the public
  surface. Additive changes (new retrieval, new optional field) are
  compatible. Breaking changes (removing a retrieval, changing a key
  shape) require: a deprecation window, both-team sign-off, and a
  migration note in this document — this document IS the compatibility
  record.
- **Compatibility matrix**: any Brain content authored to §4 works on
  any runtime ≥ Wave 1. Runtime upgrades never require re-authoring.

## 13. Expansion Rules — new subjects

Adding subject N+1 requires, by construction:
1. Curriculum Pipeline: `docs/{subject}/kg/graph.json` + 2 registry
   lines (the proven generic-adapter pattern — no new adapter code).
2. Brain authoring: entry-node concept skeletons, first-lesson subject
   adaptation, probes/misconceptions for cut-nodes (all content).
3. Runtime: **nothing.** Placement, decide(), signals, evidence,
   session lifecycle, mastery folds, recovery, and asset retrieval are
   all keyed by conceptId/subject-generic adapters and activate
   automatically when the KG registers.
The single code-adjacent step is the first-lesson subject adaptation,
which lives in a cited transcription module — a data edit under §12's
sync rule, not a redesign.

## 14. Anti-Patterns (forbidden)

- ❌ Runtime invents teaching (content, sequence, or method) where
  authored knowledge exists.
- ❌ Runtime changes pedagogy — any numeric bar, ordering, or teaching
  rule edited runtime-side without its Brain source changing first.
- ❌ Brain changes execution — authored content that instructs the
  runtime to alter persistence, scheduling, or specific learner state.
- ❌ AI decides teaching strategy, action, placement, pacing, or
  session end — all are computed; the AI renders.
- ❌ Duplicate teaching logic — one owner per rule; a rule needed in two
  places is cited from one.
- ❌ Parallel systems — extending the live pipeline always beats
  building a sibling (standing governance rule).
- ❌ Hidden runtime rules — any behavior affecting learners that cites
  no Brain source and appears in no contract section above.
- ❌ Silent fallback canonization — LLM-generated fallback content
  entering ACTIVE status without review.

## 15. Final Architecture Diagram

```
   EDUCATIONAL BRAIN  (authored: actions, scripts, probes,
        │              misconceptions, limits, definitions)
        ▼
   RUNTIME RETRIEVAL  (assets by key · procedures by ActionType ·
        │              scripts by utterance · protocol blocks by state)
        ▼
   TEACHING EXECUTION (decide() · session machine · placement machine ·
        │              recovery preemption · AI renders the words)
        ▼
      STUDENT
        │
        ▼
     EVIDENCE         (signals · latency · phrases · outcomes —
        │              append-only, single-writer)
        ▼
      MASTERY         (mechanical folds, Brain-defined caps)
        │
        ▼
   EDUCATIONAL BRAIN IMPROVEMENT
                      (what worked, what regrew, what stalled →
                       next authoring cycle — the moat's flywheel)
```

## 16. Final Validation — 3 subjects → 300 subjects?

**Yes, for KG-backed subjects — proven by construction, with two named
soft points.**

Proof: every runtime mechanism added in Wave 0/1 is keyed by
conceptId + subject-generic adapters, none by subject-specific code.
The existing 6 subjects already exercise the pattern: registering a KG
(one JSON + 2 registry lines) activates placement (difficulty tags),
decide() (adapter-derived concept nodes), evidence (conceptId-keyed),
session lifecycle (subject-agnostic), and asset retrieval (conceptId +
language + band) with zero new runtime code. Nothing in the retrieval
contract (§3) mentions any subject.

Named soft points, honestly:
1. **First-lesson subject adaptations** live in a cited transcription
   module — each new subject's adaptation is a data edit + deploy, not
   a redesign (§13). Acceptable at 300 subjects; if cadence ever makes
   deploys the bottleneck, the adaptation text becomes an AssetIdentity
   row under the existing schema — an additive change already permitted
   by §12.
2. **Non-KG catalog subjects** (conversational subjects without a
   canonical KG) run with reduced determinism (no decide(), no
   placement) — by design, not by defect: the Brain's decision layer is
   defined over the KG. Their upgrade path is curriculum work (author
   the KG), not runtime work.

Neither limits growth to 300 subjects; both have contract-compliant
paths. **Runtime engineering enters maintenance mode. Future
competitive advantage comes from Educational Brain authoring and
production evidence — exactly as designed.**
