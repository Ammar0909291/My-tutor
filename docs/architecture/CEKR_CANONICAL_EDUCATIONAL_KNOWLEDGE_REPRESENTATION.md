# CEKR — Canonical Educational Knowledge Representation

**Document class:** Architectural specification — the internal knowledge model
of the Educational Brain. The educational equivalent of an Abstract Syntax
Tree: every authored educational asset eventually compiles into CEKR, and
everything downstream (Brain Compiler → policy packs → EOS kernel) consumes
projections of it.
**Status:** SPECIFICATION — design only. No runtime code; no modification to
the frozen documents (`EOS_V2_ARCHITECTURE.md`, `EOS_V2_RUNTIME_SPECIFICATION.md`,
`EDUCATIONAL_BRAIN_COMPILER.md`). Implementation remains G2-gated.
**Version:** 1.0.0. **Normative language:** RFC 2119.

**Position in the frozen stack:**

```
Educational Brain (human expertise)
        ↓  structured authoring (EBC §2 blocks, KG JSON, assets)
      CEKR   ← THIS DOCUMENT: the canonical model everything becomes
        ↓  Brain Compiler front end (EBC): loads CEKR; EBC's "BIR-M"
        ↓  is hereby declared to be CEKR's in-memory projection —
        ↓  a forward alignment note, not an edit to the frozen EBC spec
   Policy Packs (BIR-L)
        ↓
    EOS Kernel
```

**The one-sentence thesis:** authored teaching knowledge is a *typed,
versioned, provenance-carrying property graph* whose nodes are educational
entities, whose edges are educational claims, and whose every element can be
validated, diffed, compiled, and evidenced — with zero dependence on any AI
system to be read, checked, or executed.

---

## Table of Contents

1. Design laws
2. The canonical entity model (envelope + 31 kinds in 6 families)
3. The relationship model (typed edges as first-class claims)
4. Graph structure and constraints
5. The type system
6. Educational semantics (what the structures MEAN operationally)
7. Worked representation: one concept, end to end
8. Ranking, variants, inheritance, and paths
9. Serialization model
10. Versioning and revision model
11. Validation rules and invariants
12. Compilation interfaces (CEKR → EBC)
13. Runtime lookup and evidence join model
14. Evolution strategy (schema growth without breakage)
15. Migration strategy (today's sources → CEKR)
16. Failure cases
17. Testing strategy
18. Implementation roadmap, risks, unresolved questions, milestones

---

## 1. Design Laws

- **K1 — Graph, not documents.** Knowledge is nodes and typed edges. Prose is
  payload *on* nodes, never structure. (A markdown file is an authoring
  surface; CEKR is what it means.)
- **K2 — Claims are first-class.** An edge ("X requires Y", "this analogy
  breeds that misconception") is itself an entity with provenance, status,
  and evidence. Educational knowledge is mostly *relations*; relations
  therefore get the same rigor as things.
- **K3 — Neutral core, localized skin.** Every entity has exactly one
  language-/board-/curriculum-independent core; languages, registers, boards,
  and curricula attach as variant/overlay entities. Nothing in a core may
  mention a language, board, grade label, or product surface.
- **K4 — Immutable revisions, mutable heads.** Content is content-addressed
  and immutable; identity is a stable id whose *head* moves. History is never
  rewritten.
- **K5 — Provenance is mandatory.** Every entity and edge carries who/what
  authored it, from which source span, on what basis. An unsourced claim is
  invalid CEKR (this is EOS law L3 pushed to the data layer).
- **K6 — Descriptions, not verdicts.** CEKR describes teachable reality
  (difficulty estimates, load estimates, effectiveness *evidence*); it never
  stores judgments about learners (learner state lives in EOS Evidence/Model
  memory, keyed BY CEKR ids, never IN CEKR).
- **K7 — AI-independent.** CEKR MUST be authorable, validatable, and
  executable (via compilation) with zero LLM involvement. LLMs may help
  *produce* candidate CEKR upstream; nothing in the format assumes they
  exist. If LLMs disappear, the Brain still compiles and the kernel still
  teaches from packs.
- **K8 — Deterministic and diffable.** Canonical serialization; two authors
  producing the same knowledge produce byte-identical entities; every change
  is a reviewable diff.

---

## 2. The Canonical Entity Model

### 2.1 The envelope (every entity, no exceptions)

| Field | Type | Meaning |
|---|---|---|
| id | EntityId (stable, namespaced: `cekr:<kind>/<slug-or-ulid>`) | permanent identity |
| kind | Kind enum (§2.2) | closed set |
| rev | RevisionHash (content hash of canonical body) | immutable revision identity |
| schemaVersion | int per kind | decode pinning |
| status | DRAFT \| REVIEW \| ACTIVE \| DEPRECATED \| RETIRED | lifecycle (aligned with ADR 14) |
| provenance | {authorType: HUMAN\|HUMAN_CURATOR\|AI_ASSISTED\|IMPORTED, authorRef, createdAt, basis[] } | K5 |
| citations | SourceSpan[] (≥1) | file/heading/line of authored origin |
| tags | string[] (from a registered vocabulary) | discovery only, never semantics |
| body | kind-specific typed record (§2.3) | the content |

Notes: `AI_ASSISTED` provenance is legal (K7 concerns *dependence*, not
assistance) but such entities MUST pass HUMAN review before ACTIVE — this is
the existing asset-lifecycle rule, inherited.

### 2.2 The kind registry — 31 kinds, 6 families

**Family S — Structural (what exists to be learned)**
1. `Concept` — a teachable unit of subject knowledge (KG-aligned).
2. `Skill` — a performable procedure within a subject (distinct from Concept:
   skills are *done*, concepts are *understood*; a Skill usually REALIZES one
   or more Concepts).
3. `Capability` — subject-agnostic operation (the EOS capability vocabulary
   lives here as data).
4. `LearningObjective` — an observable outcome statement bound to
   Concepts/Skills with a Bloom mapping.
5. `MasteryCondition` — the machine-checkable certification recipe for a
   Concept/Skill (which proof kinds, what delay, what transfer distance).
6. `TransferCondition` — a named novel-context family for transfer evidence.

**Family E — Explanatory (how it is conveyed)**
7. `Explanation` — one explanatory approach (strategy-typed: concrete-first,
   narrative, mechanism, contrast…).
8. `Analogy` — mapping structure: source domain, carries[], doesNotCarry[],
   retirementBoundary.
9. `MentalModel` — the target internal model a learner should hold
   (statements + boundary cases + the naive models it replaces).
10. `Intuition` — a pre-formal grounding (the "feel" stage; ANCHOR-phase
    payload).
11. `WorkedExample` — stepped solution with per-step reasons and
    self-explanation anchors.
12. `Definition` — formal definition with staged phrasings (plain → formal).
13. `Term` — terminology entry: canonical lemma, register floor, aliases.
14. `FormulaIntroduction` — a formula plus its meaning-anchoring sequence
    (plain-words reading, variable grounding, boundary of validity).
15. `ProofOrDerivation` — stepped formal argument with per-step justification
    and audience gating.
16. `Counterexample` — a case that breaks a stated rule/naive model (the
    collision payload).

**Family D — Diagnostic (how understanding is observed)**
17. `Misconception` — wrong model: birth type 1–6, characteristic phrases,
    strength taxonomy.
18. `CommonMistake` — performance slip (distinct from Misconception: a slip
    is execution noise, a misconception is a wrong model; conflating them is
    a classic tutoring error, so CEKR refuses to).
19. `AssessmentItem` — probe: stem, stage 1–7, kind (placement/inline/gate/
    retention/calibration/transfer), modality, distractor map, diagnostic
    flag, scoring rule.
20. `MasteryProofSpec` — an item-set + conditions instantiating a
    MasteryCondition.

**Family I — Interventional (what the tutor does)**
21. `TeachingAction` — the 27-catalog action definitions (function, fit,
    guards, cost).
22. `RecoveryScript` — authored script for a failure state × escalation rung
    × register.
23. `HintSpec` — ladder-typed hint content with easier-than metadata.
24. `ReviewRule` — spacing/retrieval policy fragment (thresholds, cue forms).
25. `DispatchRule` — per-concept situation → action binding (Band-3 source).

**Family X — Experiential (what the learner interacts with)**
26. `VisualSpec` — typed visual (class per RS §6.3, parametric spec,
    mandatory a11y description).
27. `Simulation` — interactive parameterized system (model spec, controls,
    observable outcomes, prediction hooks).
28. `Experiment` — real-world/hands-on protocol (materials, steps, safety,
    expected observation, failure readings).

**Family M — Meta (knowledge about the knowledge)**
29. `EvidenceSummary` — aggregated effectiveness statistics for any entity
    (write-once snapshots produced from Teacher Memory; CEKR stores the
    snapshot, the live counters live in EOS memory).
30. `Conflict` — a registered contradiction between entities/edges, with
    state (OPEN/RESOLVED/ACCEPTED-TENSION) and resolution notes.
31. `Revision` — a recorded change: what changed, why, supersedes what
    (see §10).

**Cross-cutting annotations (attachable to any Family S/E/D/I/X entity, as
typed fields, not separate kinds):** `CognitiveLoadAnnotation` {intrinsicElements,
modalityOverhead}, `BloomMapping` {level, verb}, `DifficultyEstimate` {band,
basis}, `AgeBandFit`, `RegisterFit`, `StageFit` (question-stage range),
`PhaseFit` (TSM states where usable).

**Critique.** 31 kinds risks taxonomy sprawl. Two containment rules:
(a) the **kind admission rule** — a kind exists only if the compiler lowers
it differently from every existing kind (same test as capability admission);
(b) near-kinds are unified deliberately: "intuitions" vs "mental models" stay
separate ONLY because they compile to different TSM phases (ANCHOR vs NAME
payloads); "common mistakes" vs "misconceptions" stay separate ONLY because
they route to different interventions (re-practice vs repair sequence).
Every separation above passes that test; future proposals must too.

---

## 3. The Relationship Model

Edges are first-class (K2): every edge carries the full envelope (id, rev,
status, provenance, citations) plus `{from: EntityId, to: EntityId, kind:
EdgeKind, attrs}`. The EdgeKind registry (closed set, 24):

**Structural claims**
- `REQUIRES` (Concept|Skill → Concept|Skill) — hard prerequisite. attrs:
  {strength: HARD|SOFT, rationale}.
- `REQUIRES_CAPABILITY` (Concept|Skill|AssessmentItem|HintSpec →
  Capability) — operational demand.
- `UNLOCKS` — derived inverse of REQUIRES (stored materialized for authoring
  ergonomics; validator enforces symmetry).
- `REFINES` (Concept → Concept) — specialization ("fractions on a number
  line" REFINES "fractions"). The inheritance mechanism (§8.3).
- `REALIZES` (Skill → Concept) — the skill enacts the concept.
- `PART_OF` (Concept → Concept) — composition without prerequisite meaning.
- `CROSS_LINK` (Concept ↔ Concept) — non-prerequisite relatedness (KG
  cross_links land here). attrs: {linkType}.

**Explanatory attachments**
- `EXPLAINS` (Explanation|Analogy|MentalModel|Intuition|WorkedExample|
  Definition|FormulaIntroduction|ProofOrDerivation → Concept|Skill). attrs:
  {phaseFit[], registerFit[], orderingHint}.
- `GROUNDS` (Intuition|Analogy → MentalModel) — what builds the model.
- `CONTRASTS` (Counterexample → MentalModel|Misconception|Analogy) — what it
  breaks. attrs: {collisionQuality: AUTHORED_PRIMARY|ALTERNATE}.
- `USES_TERM` (any E-family → Term) — terminology binding (drives NAME-gate
  vocabulary bans).

**Diagnostic attachments**
- `TARGETS` (Misconception|CommonMistake → Concept|Skill) — where it lives.
- `SIGNALS` (AssessmentItem.distractor → Misconception) — the distractor map
  as edges (one per distractor), enabling graph queries like "which items can
  detect M?".
- `ASSESSES` (AssessmentItem → Concept|Skill|Capability) with attrs {stage,
  diagnostic}.
- `CERTIFIES` (MasteryProofSpec → MasteryCondition).
- `BREEDS` (Analogy → Misconception) — the anti-analogy claim (Type-6 birth).
- `REPAIRS` (sequence of Counterexample/Explanation/AssessmentItem →
  Misconception) — attrs: {step: 1–7 of the repair sequence}.

**Interventional bindings**
- `DISPATCHES` (DispatchRule → TeachingAction) and `SCOPES` (DispatchRule →
  Concept).
- `RECOVERS` (RecoveryScript → failure-state key) — key is a registered
  enum value, modeled as attrs (failure states are a vocabulary, not
  entities).
- `HINTS_FOR` (HintSpec → AssessmentItem|Skill|Concept).

**Meta**
- `VARIANT_OF` (any → same-kind entity) — language/register/ageBand variant
  (§8.2). attrs: {language?, register?, ageBand?}.
- `MAPS_TO_BOARD` (Concept|LearningObjective → external curriculum locator)
  — board/curriculum overlays; attrs carry the external taxonomy reference.
  Board-dependence lives ONLY here (K3).
- `EVIDENCED_BY` (any → EvidenceSummary).
- `CONFLICTS_WITH` (any ↔ any, via a Conflict node) and `SUPERSEDES`
  (Revision bookkeeping, §10).

**Critique.** Materializing UNLOCKS invites drift; kept anyway because
authors think bidirectionally and the validator makes drift impossible
(symmetry is a hard invariant, V-8). The alternative (derive-only) was
rejected for authoring ergonomics — the same trade today's KG makes.

---

## 4. Graph Structure and Constraints

- One global graph per Brain, logically partitioned by subject for Concepts/
  Skills; Capabilities, TeachingActions, RecoveryScripts, ReviewRules, Terms
  are **global partitions** (subject-independent by construction).
- Acyclicity is per-edge-kind: `REQUIRES`, `REQUIRES_CAPABILITY` (through
  capability prereqs), `REFINES`, `PART_OF` MUST be acyclic. `CROSS_LINK`
  MAY cycle (it is symmetric relatedness).
- Cardinality constraints (enforced, per kind): a Misconception TARGETS ≥1;
  an AssessmentItem ASSESSES ≥1; a MasteryProofSpec CERTIFIES exactly 1;
  a DispatchRule SCOPES exactly 1; a Counterexample CONTRASTS ≥1.
- Dangling references are impossible by construction in serialized form
  (edges name ids; the validator resolves all; unresolved = invalid graph,
  not a warning).
- The graph is **open-world for content, closed-world for structure**: the
  absence of an EXPLAINS edge means "no explanation authored yet" (coverage
  lint territory), but the absence of a REQUIRES edge is a positive claim
  ("no prerequisite") that authors make by marking the concept's
  `prereqsComplete: true` attestation — silence and completeness are
  distinguishable (this resolves the classic KG ambiguity: is this node
  prerequisite-free or just not yet annotated?).

---

## 5. The Type System

- **Closed kinds, closed edge kinds, versioned schemas per kind** (§2, §3).
- **Typed references:** every reference field declares its target kind(s);
  `EXPLAINS.from` cannot point at a Misconception. Checked at decode.
- **Refinement types:** Stage ∈ 1..7; EscalationRung ∈ 0..2; BirthType ∈
  1..6; RepairStep ∈ 1..7; probability-like fields ∈ [0,1]; all enumerations
  are registered vocabularies (failure states, visual classes, action ids,
  Bloom levels, register bands, age bands).
- **Sum types for bodies:** e.g. `VisualSpec.body` is a tagged union over
  visual classes, each with its own parameter record; `AssessmentItem.scoring`
  is a tagged union (exactMatch | numericTolerance | choiceKey | rubricRef |
  deterministicValidatorRef).
- **No nulls:** optionality is explicit (`option<T>`), and *why-absent* is
  encodable where pedagogically meaningful (e.g. `formalizable: NO |
  YES{formulaRef} | NOT_YET_AUTHORED`) — absence of knowledge ≠ knowledge of
  absence, in the type system itself.
- **Units and quantities:** numeric pedagogical estimates carry basis enums
  (`estimatedMinutes {value, basis: AUTHORED|POPULATION_FIT}`) so fitted
  values never masquerade as authored ones.
- **Language:** all human-readable strings in cores are `NeutralText`
  (concept-language: English-as-notation, flagged non-renderable);
  renderable strings live only in `VARIANT_OF` localization entities. The
  type system makes "accidentally serving core text to a learner"
  ill-typed.

---

## 6. Educational Semantics

What the structures MEAN when compiled and executed (each maps to frozen
RS/EBC machinery — cited, not re-specified):

| CEKR structure | Operational meaning downstream |
|---|---|
| REQUIRES (HARD) | kernel legality: target concept not schedulable before source certified/placed (RS Band 2 / Scheduler) |
| REQUIRES (SOFT) | ordering preference: Scheduler priority, never a gate |
| REQUIRES_CAPABILITY | Band-2 capability gate; UNKNOWN triggers micro-probe (RS §4.11) |
| MasteryCondition | Mastery machine recipe (RS §4.7): proof kinds, min delay, transfer distance |
| TransferCondition | defines "novel surface" families for transfer evidence — surfaceDistance becomes checkable |
| Misconception.phrases | compiled into detector automata (EBC §7.4) |
| SIGNALS edges | distractor→evidence routing tables (EBC §7.5) |
| REPAIRS sequence | the steppable repair program (EBC §7.4) |
| BREEDS | analogy legality guard (EBC §9 E0612) |
| Analogy.retirementBoundary | a scheduled FORMALIZE-entry content beat (EBC §7.7) |
| StageFit/PhaseFit | selection legality per TSM state |
| CognitiveLoadAnnotation | element counts feeding the load filter (EOS §4.9) |
| ReviewRule | Forgetting/Scheduler parameters (RS §4.8) |
| Term (register floor, banned-before) | verifier lexicons V-VOC (RS §9.2) |
| EvidenceSummary | Band-5/6 priors; explanation ranking input (§8.1) |
| LearningObjective + BloomMapping | goal text + assessment focus; never a gate by itself (objectives describe, MasteryConditions certify) |

**The semantic golden rule:** CEKR encodes *claims with operational
consequences*. A field with no downstream consumer is dead weight and fails
the kind/field admission rule — this keeps CEKR an executable model, not a
knowledge-management fantasy.

---

## 7. Worked Representation: One Concept, End to End

`cekr:concept/math.arith.fractions` (illustrative shape, not code):

- **Concept core:** neutral description, formalizable: YES{…},
  prereqsComplete: true, DifficultyEstimate{band: foundational, basis:
  AUTHORED}, CognitiveLoad{intrinsicElements: 3}.
- **Structural edges:** REQUIRES→ `concept/math.found.division-intuition`
  (HARD); REQUIRES_CAPABILITY→ `capability/divide` , `capability/compare`;
  UNLOCKS→ decimals, ratio; MAPS_TO_BOARD→ {CBSE grade 4 ch7} (overlay).
- **Explanatory constellation:** Intuition "fair sharing" (PhaseFit: ANCHOR);
  Analogy "pizza slices" with carries/doesNotCarry + retirementBoundary
  ("negative fractions don't fit pizzas") + BREEDS→
  `misconception/frac.bigger-denominator-bigger`; MentalModel "a fraction is
  one number (a point on a line), not two"; two Explanations
  (concrete-first; number-line-first) each EXPLAINS with registerFit;
  Definition (plain→formal staged); FormulaIntroduction (notation a/b with
  variable grounding); WorkedExamples ×2; Counterexample "1/2 vs 1/3 with
  identical pizzas" CONTRASTS the bigger-denominator misconception.
- **Diagnostic constellation:** Misconception `frac.bigger-denominator-bigger`
  {birthType: 1, phrases: […]}, TARGETS this concept; AssessmentItems: 2
  diagnostic (SIGNALS edges from distractors), 2 gate, 1 transfer (bound to
  TransferCondition "sharing outside food contexts"), 1 retention;
  MasteryCondition {proofs: gate+retention(≥7d)+transfer, hintDebt: 0} with
  MasteryProofSpec CERTIFIES it.
- **Interventional:** DispatchRule (situation: MISCONCEIVING × GUIDED →
  action/error-analysis with this concept's counterexample slot); HintSpecs
  (conceptual + strategic, easier-than metadata); ReviewRule (decayClass:
  conceptual-procedural).
- **Experiential:** VisualSpec (number_line, parametric); Simulation
  (fraction-bar comparator with prediction hook).
- **Meta:** EvidenceSummary snapshots per explanation; every node/edge with
  citations into `educational-brain/concepts/math.arith.fractions.md`.

This is exactly the existing D5 seed entry, factored from one markdown file
into ~30 typed graph elements — nothing invented, everything now queryable,
validatable, and compilable. That factorization IS the migration (§15).

---

## 8. Ranking, Variants, Inheritance, and Paths

### 8.1 How multiple explanations are ranked
Three layers, deliberately separated:
1. **Intrinsic fit (CEKR, authored):** registerFit, ageBandFit, phaseFit,
   load annotation, modality — legality and static ordering hints.
2. **Population effectiveness (CEKR EvidenceSummary snapshots, computed):**
   periodic write-once aggregates from Teacher Memory (n, outcome deltas,
   confidence) attached via EVIDENCED_BY.
3. **Per-learner affinity (NOT in CEKR):** lives in learner memory (K6).
The compiler emits selection orders from (1)+(2); the kernel personalizes
with (3) at Band 5. CEKR never stores a bare "rank: 1" — ranking is always
derived, dated, and evidenced.

### 8.2 Language/register variants
A core entity + `VARIANT_OF` localization entities carrying renderable text.
Selection key: (language, register, ageBand) with fallback chain (exact →
language+register → language → authored-neutral render refusal). A variant
MUST NOT change semantics (validator compares structural fields; only
NeutralText→LocalizedText fields may differ) — translation drift becomes a
validation error, not a discovery in production.

### 8.3 Concept inheritance
`REFINES` gives asset inheritance without OO traps: retrieval for concept C
considers assets attached to C, then (flagged as inherited) assets of what C
REFINES, transitively, with depth-decaying preference. Overriding = attaching
a more specific asset; blocking = an explicit `EXCLUDES_INHERITED` attr on
the concept naming the ancestor asset (rare, loud, cited). Diagnostic
entities do NOT inherit (a misconception about fractions is not automatically
a misconception about fractions-on-number-lines — it must be claimed via its
own TARGETS edge; wrong models don't specialize for free).

### 8.4 Multiple teaching paths
A path is not a stored sequence — it is *derivable*: the TSM ladder ×
per-phase attached assets × dispatch rules. Where a genuinely distinct
sequencing exists (discovery-first vs direct-instruction for one concept),
it is modeled as two DispatchRule sets tagged `pathId`, with the pack
carrying both and Band-4/5 policy choosing. Paths as first-class stored
curricula were considered and rejected: they duplicate the graph, rot
instantly, and re-introduce the board-coupling K3 forbids. (Unresolved
residue in §18.)

---

## 9. Serialization Model

- **Canonical form:** JSON, UTF-8 NFC, sorted keys, no insignificant
  whitespace, RFC 8785-style canonicalization → `rev = sha256(canonicalBody)`.
- **Storage layout:** one file per entity is NOT required; authoring surfaces
  (markdown blocks per EBC §2.1) compile INTO CEKR; the CEKR store itself is
  a content-addressed object store + an id→head index (git-like; git itself
  is an acceptable v1 backend).
- **Interchange:** newline-delimited canonical JSON bundles per partition,
  with a manifest (ids, revs, counts, hash) — the unit the EBC front end
  loads.
- **Human-diffability:** because serialization is canonical and entities are
  small, a revision diff is a meaningful review artifact (K8).

---

## 10. Versioning and Revision Model

- Entity identity = `id`; content identity = `rev`. The **head index** maps
  id → current ACTIVE rev per release channel (draft/stable).
- Every head move creates a `Revision` entity: {entityId, fromRev, toRev,
  reason: taxonomy (correction | improvement | evidence-driven-update |
  deprecation | terminology | restructure), authoredBy, discussionRef} and a
  `SUPERSEDES` edge. Educational revisions are thus first-class history —
  "why did we stop using the water-circuit analogy" is a query, not
  archaeology.
- **Deprecation ≠ deletion:** RETIRED entities remain resolvable forever
  (packs built against old snapshots must replay; learner evidence references
  old revs). Deletion does not exist.
- **Conflicts:** a `Conflict` node links contradicting entities/edges with
  state OPEN/RESOLVED{revisionRef}/ACCEPTED_TENSION{rationale} — because real
  pedagogy contains legitimate disagreements (two valid mental models), and
  representing the tension honestly beats forcing false consensus. OPEN
  conflicts on ACTIVE entities are release-blocking for the affected subject
  (V-14) — tensions must be triaged to ACCEPTED or resolved before shipping.
- **Graph snapshot:** a `BrainSnapshot` = {snapshot id, head index hash,
  partition manifests} — the exact input the EBC lockfile (`brain.lock`)
  records.

---

## 11. Validation Rules and Invariants

Enforced at CEKR commit time (pre-compiler — the compiler re-verifies, but
invalid CEKR never enters the store):

- **V-1** Envelope completeness (provenance, ≥1 citation, valid status).
- **V-2** Schema validity per kind/edge kind and schemaVersion.
- **V-3** Reference resolution + target-kind typing.
- **V-4** Per-edge-kind acyclicity (§4).
- **V-5** Cardinality constraints (§4).
- **V-6** Refinement-type ranges; registered-vocabulary membership.
- **V-7** Variant semantic-equality (§8.2).
- **V-8** REQUIRES/UNLOCKS symmetry.
- **V-9** Hint easier-than metadata consistency (stage ≤ target−1;
  capability subset) — the data-level half of EBC's proof.
- **V-10** MasteryCondition completeness (≥ gate+retention+transfer proof
  kinds unless explicitly attested lighter with rationale).
- **V-11** Analogy discipline: carries ∩ doesNotCarry = ∅; retirementBoundary
  present; BREEDS declared or attested-none.
- **V-12** Distractor discipline: every AssessmentItem distractor either
  SIGNALS a misconception or carries `distractorBasis: PLAUSIBLE_SLIP` —
  no meaningless wrong answers.
- **V-13** NeutralText purity in cores (no renderable-language leakage).
- **V-14** No OPEN Conflict on ACTIVE entities at release.
- **V-15** Status monotonicity (RETIRED never reactivates; a new rev starts a
  new lifecycle).
- **V-16** prereqsComplete attestation present on every ACTIVE Concept
  (closed-world declaration, §4).

Coverage rules (concept has explanation/misconception/assessment) remain the
**compiler's** release-mode checks (EBC §8) — CEKR permits incomplete
constellations (skeleton authoring, D15) but never *invalid* elements. The
division of labor: CEKR validation = "is this element well-formed and
honestly claimed"; EBC validation = "is this subject shippable".

---

## 12. Compilation Interfaces (CEKR → EBC)

- The EBC front end consumes BrainSnapshot bundles; its BIR-M is declared the
  in-memory projection of CEKR (kind-per-kind correspondence table to be
  maintained in the EBC repo docs; today's mapping is 1:1 by construction —
  BIR-M entities in EBC §3.2 are a strict subset of §2.2 plus lowering
  metadata).
- CEKR guarantees to the compiler: resolved references, canonical ordering,
  validated envelopes — so EBC front-end diagnostics focus on *semantic*
  authoring errors, not syntax.
- The compiler MUST NOT write CEKR (one-way flow); capture-on-miss generated
  content (RS §6 A-2) enters CEKR through the normal authoring lifecycle
  (DRAFT + review), not through a compiler back-channel.
- Stability contract: pack ids embed CEKR ids (`conceptId`, `assetId`,
  `misconceptionId` in packs ARE CEKR EntityIds), which is what makes the
  runtime evidence join (§13) possible.

## 13. Runtime Lookup and Evidence Join Model

- The kernel never reads CEKR (frozen rule: packs only). But every pack
  element carries its CEKR id+rev, so:
  - learner evidence events (RS §2.3) reference CEKR ids — a learner's
    misconception ledger row points at `cekr:misconception/…@rev`;
  - Teacher Memory aggregates per CEKR id; EvidenceSummary snapshots close
    the loop back into CEKR (the only inbound data flow, and it is
    write-once snapshots, never live counters);
  - "which explanation revision was this learner shown" is answerable
    forever (rev-level provenance in ASSET_SHOWN events).
- Rev-skew rule: evidence recorded against rev R remains attributed to R;
  EvidenceSummary aggregation MAY pool revs only when a Revision is marked
  `evidenceCompatible: true` (wording-only change) — pedagogical changes
  reset the evidence pool by default (honest measurement beats big n).

---

## 14. Evolution Strategy

- Adding a kind/edge kind/field: minor schemaVersion bump + decode adapters;
  readers MUST support all past versions of kinds they consume (same rule as
  RS events). Removing/retyping: major bump + migration script + re-validated
  snapshot.
- Vocabularies (failure states, visual classes, action ids…) evolve by
  registry append; removal only via deprecation aliasing.
- The **field admission rule** (§6) prevents speculative schema growth: no
  field without a downstream consumer.
- Escape hatch for research: `x-` extension namespaces on tags/attrs, ignored
  by the compiler, never load-bearing — experiments live there until they
  earn a schema change.

## 15. Migration Strategy (today's sources → CEKR)

| Today | CEKR landing |
|---|---|
| `docs/{subject}/kg/graph.json` (10-field canonical schema, ~1,720 concepts) | `Concept` cores + REQUIRES/UNLOCKS/CROSS_LINK edges + DifficultyEstimate/Bloom annotations — a mechanical importer; the KG remains the authoring source of record for Family-S until the Curriculum Pipeline adopts CEKR natively |
| `educational-brain/concepts/*` (4 full entries) | factored constellations per §7 — the quality bar and the parser test corpus |
| `educational-brain/` engine docs (D1–D15) | RecoveryScripts, TeachingActions, DispatchRules, ReviewRules, policy-adjacent content via EBC structured blocks (EBC §2.1) — blocks compile into CEKR entities |
| `docs/{subject}/teaching-assets/assets.json` (789 authored assets) | Explanation/WorkedExample/AssessmentItem entities with IMPORTED provenance + review status mapping |
| AssetIdentity DB catalog (ADR 14) | id-aligned: canonicalSlug ↔ CEKR EntityId; lifecycle statuses map 1:1 |
| MistakeRecord taxonomy / misconception engine seeds | Misconception + CommonMistake entities |

Order: importers are read-only producers of DRAFT CEKR; nothing existing is
modified or deleted; human review promotes to ACTIVE per subject.

## 16. Failure Cases

| Failure | Handling |
|---|---|
| Invalid entity at commit | rejected at the store boundary (V-rules); never enters |
| Orphaned edges after a retirement | retirement requires an impact query first; edges to RETIRED entities become W-level in EBC and excluded from packs |
| Head-index corruption | rebuild from Revision chain (append-only history is authoritative) |
| Divergent concurrent edits | content-addressing makes conflicts explicit merge events; head moves are serialized per entity |
| Semantic drift between variant and core | V-7 blocks at commit |
| Evidence attributed to wrong rev | impossible by construction (rev recorded at serving time); pooling only via evidenceCompatible |
| Taxonomy sprawl | kind/field admission rules + registry review |
| Importer misclassification (migration) | IMPORTED provenance + DRAFT status quarantines everything until human promotion |

## 17. Testing Strategy

- **Schema tests:** every kind/edge kind: valid fixture + one fixture per
  V-rule violation.
- **Property tests:** canonical-serialization round-trip; rev stability under
  key reordering; acyclicity checkers; symmetry materialization.
- **The D5 corpus test:** the four full concept entries factor into CEKR and
  re-render losslessly (structure-wise) — the migration fidelity gate.
- **Cross-spec conformance:** every CEKR structure with declared operational
  semantics (§6) has a matching EBC lowering test and appears in at least one
  golden decision (RS T-3) — no dead semantics.
- **Snapshot determinism:** same source tree → identical BrainSnapshot hash,
  double-built.
- **Evolution tests:** decode of all historical schemaVersions kept green
  forever (fixture museum).

---

## 18. Roadmap, Risks, Unresolved Questions, Milestones

**Implementation roadmap (all G2-gated):**
- **CEKR-M0** Ratify this spec; freeze kind/edge registries v1.
- **CEKR-M1** Store + validator (content-addressed, head index, V-1…V-16);
  fixture corpus.
- **CEKR-M2** Importers (KG, assets.json, AssetIdentity) → DRAFT graph;
  coverage dashboard over real data.
- **CEKR-M3** Concept-entry factoring pipeline (EBC structured blocks →
  CEKR); the 4 seed entries as the fidelity gate.
- **CEKR-M4** EBC front end consumes BrainSnapshots (BIR-M = CEKR projection
  formalized); end-to-end: markdown → CEKR → pack → kernel replay.
- **CEKR-M5** EvidenceSummary snapshot loop from Teacher Memory.

**Risks:**
1. *Authoring friction* — the graph model is only as alive as its authoring
   surfaces; without good tooling (block templates, factoring assistants,
   diff viewers) CEKR becomes a beautiful empty warehouse. Same top risk as
   EBC's, compounding it.
2. *Dual sources of truth during migration* — KG JSON and CEKR coexisting
   invites drift; mitigated by one-way importers + declared source-of-record
   per family per phase, but the window is real.
3. *Over-modeling* — the admission rules are the guard; they require
   governance discipline to enforce against enthusiasm.
4. *Evidence-pool resets* (rev-skew rule) trade statistical power for
   honesty; small-n subjects will feel it.

**Unresolved questions (owner/next-iteration decisions):**
- Whether teaching *paths* deserve first-class representation after all, once
  discovery-vs-direct evidence accumulates (§8.4 residue).
- Skill vs Concept boundary in mathematics (is "adding fractions" a Skill
  REALIZING the Concept, or a Concept? proposed default: procedures learners
  *perform under fluency gates* are Skills — needs piloting on one domain).
- Whether EvidenceSummary belongs inside CEKR at all vs purely in Teacher
  Memory with CEKR storing nothing derived (current design: snapshots yes,
  live data no — revisit at CEKR-M5).
- Localization governance: who owns variant review per language.
- Storage backend at scale (git-backed v1 vs object store) — deferred, the
  format is backend-neutral by design.

**Recommended future milestones beyond M5:** cross-subject capability
transfer studies over the unified graph; Conflict-node-driven "living
disagreements" review ritual; CEKR as the substrate for the Curriculum
Production Pipeline's next generation (KG authored natively as Family S).

---

*End of specification v1.0.0. Design only; adoption and every implementation
milestone remain owner decisions under the standing G1/G2 governance rules.
Gaps found later are spec bugs — file them against this document; do not
invent representation.*
