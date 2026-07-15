# The Educational Brain Compiler (EBC)

**Document class:** Industrial specification — the missing layer between the
Educational Brain (authored knowledge) and the EOS Kernel (deterministic
execution).
**Status:** SPECIFICATION — design only. Implementation remains gated on
explicit owner approval (G2). `EOS_V2_ARCHITECTURE.md` and
`EOS_V2_RUNTIME_SPECIFICATION.md` are frozen and are NOT modified by this
document; the EBC emits exactly the artifacts the Runtime Specification
consumes (policy packs, §5.6/§18 there) and nothing else.
**Version:** 1.0.0.
**Normative language:** RFC 2119.

---

## Table of Contents

0. Position, thesis, and the honesty boundary
1. Compiler architecture (the pass pipeline)
2. Input formats (the source languages)
3. The Intermediate Representation (BIR-H / BIR-M / BIR-L)
4. Front end: parsing and normalization
5. Symbol resolution and dependency graph
6. Graph generation (capability, teaching, misconception, mastery)
7. Semantic compilation (how each knowledge kind becomes executable)
8. The validation pipeline (lint taxonomy, build-failing checks)
9. Conflict detection
10. Optimization passes
11. Pack generation (the backend)
12. Versioning, lockfiles, incremental compilation
13. Diagnostics and error reporting
14. Determinism guarantees
15. Performance model and complexity
16. Testing architecture
17. Comparison to LLVM, TypeScript, and Rust
18. Failure modes and recovery (compiler-level)
19. Resolved design decisions and standing critiques

---

## 0. Position, Thesis, and the Honesty Boundary

### 0.1 Position

```
                    AUTHORING TIME                      RUNTIME
┌──────────────────┐   ┌─────────────────────┐   ┌──────────────────┐
│ Educational Brain │ → │ BRAIN COMPILER (EBC)│ → │ Policy Packs      │
│ (markdown tree,   │   │ parse → IR → verify │   │ (versioned,       │
│  KG JSON, assets, │   │ → optimize → emit   │   │  signed, sharded) │
│  concept entries) │   └─────────────────────┘   └────────┬─────────┘
└──────────────────┘                                       ↓
     humans author              machines check        EOS Kernel executes
```

The kernel **never parses raw authored documents** (normative: RS-§5.6 packs
are its only pedagogy input). The EBC is the *only* path from human expertise
to machine execution. This single-path property is what makes the Brain the
moat operationally: scholarship in, deterministic behaviour out, provenance
preserved end to end.

### 0.2 Thesis

The Architecture Audit's core finding — "0 of 52 authored layers retrieved at
runtime" — is not a retrieval problem; it is a **compilation gap**. Prompt-
stuffing authored prose at inference time fails for the same reason
interpreting source code by pattern-matching comments would fail. The fix is
the same one programming languages found: a compiler with a typed IR,
semantic checks that fail the build, and a backend that emits exactly what
the executor consumes.

### 0.3 The honesty boundary (read this before anything else)

A compiler for educational knowledge can verify three things mechanically:

1. **Structure** — required sections exist, schemas hold, references resolve.
2. **Machine-checkable semantics** — graphs are acyclic, coverage is
   complete, guards don't overlap, hints are stage-arithmetically easier,
   terminology matches the canonical registry, every rule carries provenance.
3. **Behavioural consequences** — the built pack, run through the simulation
   gate (RS-§17 T-5) and golden decision tables, produces no invariant
   violations and acceptable outcome distributions.

It CANNOT verify **meaning**: whether an explanation is *true*, whether an
analogy genuinely illuminates, whether a script is warm. That is verified by
(a) human review in the asset lifecycle (ADR 14) and (b) evidence after
deployment (Teacher Memory). Every check in this document is classified
**MECH** (mechanical, build-failing), **SIM** (verified by the simulation
gate), or **HUM** (routed to human review with a generated checklist). A
compiler that pretends to lint pedagogy's *truth* with NLP heuristics would
produce false confidence — the most dangerous compiler output there is. This
spec refuses that.

---

## 1. Compiler Architecture

A classical multi-pass design. Passes are pure functions IR → IR (or IR →
diagnostics); pass order is fixed and versioned; every pass is independently
testable.

```
SOURCES ─┬─ parse (per-format front ends) ──────────→ BIR-H  (syntactic)
         │
         ├─ normalize + canonicalize ───────────────→ BIR-M  (semantic)
         ├─ resolve (symbols, references, deps)     ↘
         ├─ graph passes (capability/teaching/       BIR-M' (linked)
         │   misconception/mastery graphs)          ↗
         ├─ VERIFY (validation pipeline, §8–9) ─────→ diagnostics (may FAIL)
         ├─ optimize (§10) ─────────────────────────→ BIR-L  (runtime-shaped)
         ├─ emit (§11) ─────────────────────────────→ Policy Pack shards
         └─ self-check (conformance replay, §16) ───→ pack accepted/rejected
```

**Per-stage contract (applies to every pass in this document):**
- *Purpose / Inputs / Outputs* — stated in its section.
- *Validation* — every pass validates its own input shape (defensive: a pass
  receiving ill-formed IR is a compiler bug, reported as ICE — internal
  compiler error — never as an authoring error).
- *Failure mode* — a pass either succeeds, emits diagnostics and continues
  (error-recovery mode, §13.4), or ICEs. Passes MUST NOT silently drop
  entities.
- *Determinism* — every pass is deterministic (§14); no pass may consult the
  network, the clock (except the signed manifest, excluded from content
  hash), or any LLM. **The compiler contains zero LLM calls.** (Authoring
  *assistants* may use LLMs; they run before the compiler and their output is
  ordinary source.)
- *Complexity* — stated per pass; the global budget is §15.

**Critique.** Why a batch compiler rather than a live interpreting service?
Because the runtime spec demands session-pinned, immutable, semver'd packs
(RS I-20) and byte-reproducible replay. A service that "reads the Brain live"
reintroduces the exact non-determinism the EOS was designed to kill. Batch +
incremental (§12) gives authoring latency without runtime coupling.

---

## 2. Input Formats (the source languages)

The EBC compiles what actually exists in this repository today, plus one new
authored format. Each source kind has a front end (§4).

| # | Source | Location (today) | Format | Front end |
|---|---|---|---|---|
| S1 | Canonical Knowledge Graphs | `docs/{subject}/kg/graph.json` | JSON, 10-field canonical schema | KG reader |
| S2 | Concept entries | `educational-brain/concepts/**` | Structured markdown per `TEMPLATE.md` | Concept reader |
| S3 | Universal engine documents | `educational-brain/{foundations,decision-engine,assessment,misconceptions,teaching-actions,placement,first-lesson,student-state,validation}/` | Markdown with **structured blocks** (§2.1) | Doc reader |
| S4 | Teaching assets | `docs/{subject}/teaching-assets/assets.json`, AssetIdentity DB exports | JSON | Asset reader |
| S5 | Config & thresholds | BrainConfig source file | typed key/value | Config reader |
| S6 | Lexicons | per-language term/pattern files (verifier vocab, praise/mockery, utterances) | structured lists | Lexicon reader |
| S7 | Item banks | assessment items with distractor→misconception maps | JSON/structured md | Item reader |
| S8 | Pack overlays | subject/ageBand/cohort overlay declarations | manifest | Overlay reader |

### 2.1 The structured-block contract (the key authoring change)

Prose markdown cannot be compiled; *annotated* markdown can. The EBC defines
a small set of fenced, machine-readable blocks that authors embed in
otherwise-free prose. Prose remains for humans; blocks are for the compiler.
**Only blocks compile.** Un-annotated prose is carried as documentation
payload (source spans preserved) but produces nothing executable — and the
coverage lints (§8) will name what's missing, which is how existing documents
get progressively annotated rather than rewritten.

Block kinds (closed set, versioned):

```
::rule        — a policy rule (band, guard, effect, mandatory?, cites)
::script      — an authored script (recovery, opening, close…) with slots
::probe       — an assessment item (stem, stage, capabilityRefs, distractor map)
::misconception — id, birth type, characteristic phrases, collision cases
::analogy     — mapping table (carries / does-NOT-carry), retirement boundary
::hint        — ladder type, target, stage, requiresCapabilities
::action      — action definition (family, fit, cost tier, persona notes)
::capability  — capability definition (id, cluster, prereqs, decay class)
::requires    — concept → capability/prereq requirement annotations
::visual      — representation-need annotation (class, phase fit)
::dispatch    — per-concept situation → action dispatch row
::term        — canonical terminology registration (term, register, aliases)
::config      — BrainConfig key contribution
```

Every block MUST carry: a stable `id`, and inherits an automatic **citation**
(file + heading path + line span). Blocks MAY carry `todo: true` (a declared
hole — allowed in dev builds, fatal in release builds; this is how
instrumented-skeleton authoring per D15 coexists with strict builds).

**Critique.** Isn't demanding annotation a tax on authors? Yes — a deliberate
one. The alternative (compiler guesses at prose) violates the honesty
boundary. The tax is minimized by: blocks embedded *in* the existing docs
(no parallel corpus), a migration lint mode that suggests block skeletons
from recognizable headings (suggestions only, human confirms), and the D15
skeleton doctrine already pointing this direction (instruments first, prose
around them).

---

## 3. The Intermediate Representation

Three levels, mirroring proven compiler design. All levels are typed,
serializable, and diffable.

### 3.1 BIR-H (High: syntactic)
Faithful typed AST of each source file: blocks with raw fields, prose spans,
heading hierarchy, source locations. No cross-file knowledge. Purpose:
error reporting with exact spans; format-independence for everything after.
One BIR-H unit per source file; content-hashed (the incremental unit, §12).

### 3.2 BIR-M (Mid: semantic entities)
The heart of the IR. Normalized, deduplicated entity records with symbolic
references (not yet resolved indices):

| Entity | Key fields (abridged) |
|---|---|
| `Concept` | id, subject, kg fields (10), requiresCapabilities[], formalizable, termRefs[], entryClass: full\|skeleton\|generic |
| `CapabilityDef` | id, cluster, prereqIds[], decayClass, acquisitionBand |
| `Misconception` | id, conceptIds[], birthType 1–6, phrases[], collisionCases[], repairPathRef, incompatibilityRefs[] |
| `Analogy` | id, conceptId, mapping: {carries[], doesNotCarry[]}, retirementBoundary, interestTags[], antiFor[] (misconceptions it can breed) |
| `ProbeItem` | id, conceptId, stage 1–7, capabilityRefs[], diagnostic: bool, distractorMap: choice→misconceptionId, modality, kind: placement\|inline\|gate\|retention\|calibration |
| `HintDef` | id, targetRef, ladderType, stage, requiresCapabilities[] |
| `Script` | id, family (recovery/opening/close/lesson-one…), stateKey, escalationRung, slots[], register constraints |
| `ActionDef` | id (27-catalog), family, knowledgeTypeFit[], stateFit[], costTier, personaNotes, guards (e.g. game re-verify) |
| `PolicyRule` | ruleId, band 0–6, guard (typed predicate conjunction), effect (partial PolicyDecision per RS-§3.10), mandatory, reads[], cites |
| `VisualAnnotation` | conceptId, representationNeeds[], classFit (RS-§6.3 classes), phaseFit[] |
| `DispatchRow` | conceptId, situation guard, actionRef, contentSlots |
| `Term` | canonical, register floor, aliases[], banned-before-state |
| `ConfigEntry` | key, value, safeRange, owner pack layer |
| `OverlayDecl` | layer, target (subject/ageBand/cohort), adds[], overrides[] |

Every entity carries `cites: SourceSpan[]` (≥1, mandatory — RS provenance law
L3 starts here) and `todo` flags.

### 3.3 BIR-L (Low: runtime-shaped)
Resolved, indexed, optimized structures in exactly the shapes the kernel
loads (RS-§5.1 rule schema and friends):

- flat, totally-ordered rule lists per (subject, ageBand, cohort) with
  computed specificity and stable ordinal;
- adjacency-indexed graphs (capability DAG, prerequisite graph, misconception
  links, mastery paths) with precomputed topological orders, SCC certificates,
  cut-node (dominator) sets for placement;
- compiled lexicon automata (Aho–Corasick tries per language for verifier
  V-VOC/V-TERMS/V-PRAISE; regex sets for utterance sensors);
- item banks indexed by (concept, stage, kind, diagnostic);
- content slot tables (concept → asset/template/script references with
  resolution-ladder ordering);
- capability requirement bitsets (§10.5);
- string table (deduplicated), shard map, and the signed manifest.

**BIR stability rule:** BIR-M is the compatibility surface — front ends and
back ends may evolve independently against it. BIR-M has its own semver;
a BIR-M major bump requires a compiler major bump.

---

## 4. Front End: Parsing and Normalization

- **Purpose:** sources → BIR-H → BIR-M entities.
- **Algorithms:** per-format parsers; block extraction (fenced blocks with
  YAML-ish bodies, schema-validated per block kind version); markdown heading
  path computation for citations; canonicalization (Unicode NFC, whitespace,
  sorted keys, lowercase ids); alias folding via the Term registry.
- **Validation:** schema per block kind; unknown block kinds are errors
  (closed set); unknown *fields* are errors (no silent extension — C-5
  discipline inherited from the RS); duplicate ids within a file are errors.
- **Failure modes:** malformed block → diagnostic with span, entity skipped,
  compilation continues (error recovery §13.4); file unreadable → unit error.
- **Complexity:** O(bytes); embarrassingly parallel per file.

---

## 5. Symbol Resolution and Dependency Graph

- **Purpose:** turn symbolic references into checked links; build the global
  dependency graph that powers incremental builds and impact analysis.
- **Inputs:** all BIR-M entities. **Outputs:** linked BIR-M′ + `DepGraph`.
- **Algorithm:** two-phase — (1) build the global symbol table (id → entity,
  with kind); collisions across files are errors (E0201 duplicate id);
  (2) resolve every reference field; record every edge (referrer → referee)
  in DepGraph with edge kind (requires, cites-asset, dispatches-to,
  repairs, collides-with, banned-with…).
- **Resolution rules:** references are exact-id; there is no fuzzy matching
  (a near-miss produces E0202 unresolved reference *with* a did-you-mean
  suggestion computed by edit distance — suggestion in the diagnostic, never
  auto-applied).
- **Overlay resolution:** overlays (S8) resolve last; an override MUST name
  an existing ruleId (E0210 override-of-nothing); deletes are forbidden for
  mandatory rules (E0211, per RS-§5.5).
- **Failure modes:** unresolved references are errors; the pass completes the
  whole graph before failing (maximal diagnostics per run).
- **Complexity:** O(entities + references) with hash tables.

---

## 6. Graph Generation

Four graphs, each a pass over linked BIR-M′. All graphs are emitted into
BIR-L with certificates (proof artifacts the validators produced — SCC
decomposition, topological order, dominator tree) so the kernel never
recomputes graph theory at runtime.

### 6.1 Capability graph
- Nodes: CapabilityDefs; edges: capability prerequisites.
- **MECH checks:** acyclicity (Tarjan SCC — any SCC >1 node = E0301 circular
  capability prerequisites, members listed); orphan clusters (W0302);
  every capability referenced by ≥1 rule/probe/hint (the admission rule,
  W0303 unused capability — warning in dev, error in release).
- Emits: topological order, ancestor bitsets (§10.5).

### 6.2 Teaching graph (prerequisite/unlock graph per subject)
- Nodes: Concepts; edges: KG `requires`/`unlocks` + cross_links (typed).
- **MECH checks:** acyclicity (E0311 circular prerequisites); requires/unlocks
  symmetry (E0312); **unreachable concepts** — no path from any entry node
  (`requires: []`) → E0313; **dead concepts** — unlock nothing AND are
  terminal AND uncited by any dispatch/probe/asset → W0314 (dead ≠ wrong, but
  it's unreferenced inventory); entry-node existence per subject (E0315).
- Emits: entry orders per level (compiling the placement entry-order logic),
  **cut-node sets via dominator analysis** (the placement binary-search
  spine, `placement/03`, computed instead of hand-listed — closing D10's
  "cut-node lists for non-math subjects" gap mechanically), depth/difficulty
  strata.

### 6.3 Misconception graph
- Nodes: Misconceptions; edges: concept bindings, metastasis links (a
  misconception on prerequisite P corrupts dependents), repair paths,
  analogy-birth links (Analogy.antiFor).
- **MECH checks:** every misconception binds ≥1 existing concept (E0321);
  birth type ∈ 1–6 (E0322); ≥1 collision case per misconception (E0323
  missing collision — a repair sequence cannot run without one); repair path
  references resolve (E0324); metastasis chain closure — if concept C requires
  P and P has misconception M with metastasis, C's entry must acknowledge the
  chain-check (W0325, HUM checklist).
- Emits: per-concept misconception indices; incompatibility closure (asset ×
  misconception ban matrix for RS I-10).

### 6.4 Mastery-path graph
- For every concept: DIAGNOSE→…→TRANSFER instantiated against available
  items and assets.
- **MECH checks:** **broken mastery path** — every concept MUST have: ≥1 gate
  probe at its level, ≥1 retention-capable probe, ≥1 transfer-distance probe
  (E0331 mastery path does not terminate — the concept can be taught but
  never certified, which the RS forbids serving); every recovery state used
  by scripts has an exit rung (E0332); lesson-graph integrity — each session-
  shape obligation (opening retrieval, close scripts) has pack content
  (E0333 broken lesson graph).

---

## 7. Semantic Compilation (how each knowledge kind becomes executable)

This section answers "how does a blueprint become executable?" — the concrete
lowering from authored form to kernel form, kind by kind.

| # | Authored (BIR-M) | Lowered to (BIR-L, consumed per RS section) |
|---|---|---|
| 7.1 | `PolicyRule` blocks (e.g. the D1 grid rows, decision-matrix cells) | flat rules with computed specificity (= bound-predicate count), band ordinals, reads[] checked against the band field-ownership map (RS-§5.1); mandatory set verified complete (RS-§5.4) |
| 7.2 | `DispatchRow` (concept entries' teaching-action dispatch) | Band-3 dispatch index keyed (conceptId, situation-guard hash) |
| 7.3 | `ActionDef` (27-catalog) | action tables: state×knowledge-type fit matrices, cost tiers, guard hooks (game re-verify becomes a mandatory follow-up probe requirement attached to the action) |
| 7.4 | `Misconception` | (a) detector support: phrases[] compiled into per-language matcher automata for the misconception sensor; (b) repair program: the 7-step sequence instantiated with this misconception's collision cases as an ordered script+probe chain (a small deterministic program the kernel steps through via MisconceptionRepairStep events); (c) incompatibility rows |
| 7.5 | `ProbeItem` | item bank rows; distractorMap becomes the wrong-answer→evidence routing table (an incorrect choice deterministically emits MisconceptionDetected candidates); stage + capabilityRefs feed legality checks at selection time |
| 7.6 | `HintDef` | hint ladder tables per concept/item; **compile-time proof** of the easier-than law: hint.stage ≤ target.stage − 1 (E0401) AND hint.requiresCapabilities ⊆ target.requiresCapabilities (E0402) — the RS hint invariant becomes unviolatable because violating hints never reach the pack |
| 7.7 | `Analogy` | analogy selection rows: interest tags, LRU keys, and two compiled guards — antiFor misconceptions (analogy banned while those are ACTIVE) and a mandatory retirement beat (the boundary case becomes a scheduled content slot at FORMALIZE entry) |
| 7.8 | `Script` | script tables keyed (family, stateKey, escalationRung, register); slot schemas checked against the planner's slot types |
| 7.9 | `Capability` + `::requires` | capability registry + per-concept requirement bitsets; the Band-2 legality filter's data |
| 7.10 | `VisualAnnotation` | visual decision rows: (representationNeed × TSM phase) → allowed classes with cost tiers (RS-§6.3) |
| 7.11 | `Term` | canonical terminology registry → verifier lexicons (V-VOC-NAME banned-term lists per concept until NAME; register floors); **inconsistent terminology detection** (§9) |
| 7.12 | `ConfigEntry` | BrainConfig table with safe ranges (a patch-level pack change may move a value only within its declared safeRange — E0410 otherwise, forcing a minor/major bump per RS-§5.6) |

**Assessment compilation note.** Placement compiles from three sources:
cut-node sets (computed, §6.2), bracket protocol config (S5), and placement
probes (S7) — the compiler verifies every cut-node has bracket-appropriate
probes (E0332-family), which is precisely the check that would have caught
"non-math subjects have no cut-node coverage" as a build failure.

---

## 8. The Validation Pipeline

Runs after linking and graph passes; the build FAILS (release mode) on any
**E**-code. Complete educational-correctness check list (all MECH unless
tagged):

| Code | Check |
|---|---|
| E0501 | every concept has ≥1 explanation content source (asset, template, or generic-policy eligibility declared) — *no concept without a voice* |
| E0502 | every concept has misconception coverage: ≥1 bound misconception OR an explicit `::requires {misconceptionCoverage: none-known}` attestation (HUM-reviewed) — silence is not coverage |
| E0503 | every concept has assessment coverage per §6.4 (gate/retention/transfer) |
| E0504 | every prerequisite (concept and capability) exists and resolves |
| E0505 | every mastery path terminates (§6.4) |
| E0506 | every recovery state × escalation rung has a script AND an exit |
| E0507 | every hint passes the easier-than proofs (§7.6) |
| E0508 | every rule/dispatch/script carries resolvable citations (provenance completeness — L3 at build time) |
| E0509 | policy completeness: no silent cells — the mandatory decision-table dimensions (TSM-state × quadrant × drive band) are fully covered by rules or explicit defaults (the Correction-2 bug class, now a compile error) |
| E0510 | every TSM state has ≥1 zero-requirement fallback action (RS I-19's precondition) |
| E0511 | lesson-one lockdown config present and complete per subject |
| E0512 | every ::todo hole is absent (release mode) or inventoried (dev mode report) |
| E0513 | overlay legality (no mandatory deletions, overrides resolve) |
| E0514 | lexicon presence per shipped language; missing language → V-VOC rules marked LOG-only exactly as RS-§20 prescribes, with W-level notice |
| E0515 | config keys: unknown keys, missing mandatory keys, out-of-safe-range values |

Dev builds demote E0501–E0503 to warnings for `entryClass: skeleton|generic`
concepts (the D15 instrumented-skeleton doctrine); release builds for a
subject declared "fully authored" enforce them absolutely.

---

## 9. Conflict Detection

The checks the task names, with algorithms:

| Detection | Algorithm | Code |
|---|---|---|
| Contradictory teaching (rules) | within each band, pairwise over guard-key buckets: satisfiable-guard intersection (predicates are typed conjunctions over finite domains — intersection is decidable) with conflicting effect fields at equal specificity → error; at different specificity → intended shadowing, W-level note | E0601 / W0602 |
| Contradictory teaching (content) | *honesty boundary:* free-prose contradiction is HUM. MECH subset: structured claims that collide — a `::dispatch` demanding questions in a state whose scripts ban questions; an action's stateFit excluding every state its dispatch targets | E0603 |
| Circular prerequisites | SCC (§6.1/6.2) | E0301/E0311 |
| Missing misconceptions / assessments / recovery / hints | coverage lints (§8) | E0502/03/06/07 |
| Dead / unreachable concepts | graph passes (§6.2) | W0314 / E0313 |
| Conflicting analogies | (a) two analogies for one concept whose `carries` sets contradict on a mapped feature → E0611; (b) an analogy whose overextension (`doesNotCarry` violated) matches a registered misconception without declaring `antiFor` → E0612 (the Type-6 birth guard, mechanized) |
| Capability gaps | a concept requires capability X, and X is neither teachable (no teaching path/action provides it) nor assumed-by-ageBand → E0621 |
| Broken lesson/mastery graphs | §6.4 | E0331–E0333 |
| Duplicate educational knowledge | content-hash exact duplicates → W0631 (merge suggestion); *near*-duplicate detection (shingled similarity over normalized text) is **HUM**: emits a review queue, never auto-merges — two similar analogies may differ in the one sentence that matters |
| Inconsistent terminology | every content span is scanned against the Term registry: unregistered technical terms (per-language technical-term lexicon) → W0641; use of a non-canonical alias in executable blocks → E0642; register-floor violations (expert-only term in beginner content) → E0643 |

---

## 10. Optimization Passes

All optimizations MUST be semantics-preserving over the kernel-observable
behaviour (same decisions for same inputs); each is verified by the
differential harness (§16.4). Order fixed as listed.

1. **10.1 Policy simplification.** Guard subsumption within bands (a rule
   whose guard is implied by a higher-specificity rule with identical effect
   is redundant → removed, W-note); unreachable-rule elimination (guard
   unsatisfiable given domain constraints — e.g. band-2-filtered values);
   decision-table factoring by the affect-band preemption rule (the ~180→~40
   row compression D7 did by hand, performed mechanically and provably).
2. **10.2 Dead asset elimination.** Assets/scripts/items unreachable from any
   rule, dispatch, slot, or ladder — stripped from the pack (they remain in
   the source and the catalog; packs carry only reachable content). W-report
   for authors.
3. **10.3 Duplicate merging.** Exact-hash duplicates merged with citation
   union. Near-duplicates: report only (§9, honesty boundary).
4. **10.4 Graph optimization.** Transitive reduction (edge count ↓ for
   traversals), precomputed topological orders, dominator/cut-node sets,
   depth strata, ancestor closures.
5. **10.5 Capability compression.** Capability sets as fixed-width bitsets
   over the topological order; requirement checks become O(words) AND
   operations; ancestor closure precomputed so "requires X implies requires
   X's prereqs" is one mask.
6. **10.6 Teaching-path optimization.** Per concept, precompute the legal
   action shortlists per (TSM state × quadrant) — the Band-4 candidate sets —
   so runtime selection is index lookup + Band-2 filtering, not scanning.
7. **10.7 Assessment coverage optimization.** Greedy set-cover selecting
   minimal item subsets that cover each concept's misconception distractor
   space per stage (flags over-tested concepts and single-point-of-failure
   items: an item that is the *only* gate for a concept → W0721 fragile
   coverage).
8. **10.8 Recovery coverage optimization.** Script table completeness matrix
   compacted; shared-slot fragments deduplicated via the string table.
9. **10.9 Lexicon automata.** Aho–Corasick construction per language for all
   verifier scans; utterance regexes compiled and cross-checked against the
   corpus tests (§16).
10. **10.10 Pack layout.** String interning, shard splitting (subject ×
    ageBand × language), lazy-loadable segments (item banks, lexicons),
    stable field ordering for byte reproducibility.

**Critique.** Optimizations that alter *tie-break inputs* (e.g. rule
reordering) could silently change behaviour through the lexical-ruleId
tiebreak. Therefore: ordinals assigned to rules BEFORE optimization and
carried through; any pass that would perturb observable ordering is a
compiler bug caught by the differential harness.

---

## 11. Pack Generation (the backend)

- **Output:** the artifact set RS-§5.6/§19 consumes:
  - `pack.manifest` — semver, compiler version, BIR-M version, source
    lockfile hash, shard index, content hash (of everything except the
    signature/timestamp), signature;
  - shards: rules, graphs+certificates, action tables, script tables, item
    banks, lexicon automata, slot tables, config, terminology, incompat
    matrix;
  - `pack.report` — human-readable build report: coverage dashboards, W-level
    inventory, HUM review queue, diff vs previous version (§13.3).
- **Rules:** packs are immutable; the kernel loads by (version, hash);
  a pack that fails its embedded self-check header (shard hashes) is refused
  (RS P-4 pins last-good).
- **The kernel never parses sources** — enforced by an architecture test on
  the kernel side (no source-format reader is importable there) and by the
  pack being sufficient (the conformance replay, §16.5, runs the kernel
  against golden inputs using ONLY the pack).

---

## 12. Versioning, Lockfiles, Incremental Compilation

- **12.1 Source lockfile.** Every build records the content hash of every
  input file (`brain.lock`). A pack is reproducible from (lockfile, compiler
  version) alone. CI verifies this by rebuilding.
- **12.2 Semver derivation.** The compiler *proposes* the version bump by
  diffing BIR-L against the previous pack: mandatory-rule or enum changes →
  major; new optional rules/content → minor; config-within-safeRange and
  content-text-only changes → patch. Humans may raise, never lower, the
  proposed bump (E0801).
- **12.3 Incremental compilation.** Memoized pass results keyed by
  (unit content hash, pass version) — the salsa/Bazel model. DepGraph (§5)
  computes the dirty set: an edited file invalidates its BIR-H unit, its
  entities, and transitively dependent derived artifacts only. Whole-graph
  passes (SCC, dominators) recompute per affected subject-graph only.
  Targets: see §15.
- **12.4 Impact analysis (authoring tooling).** For any source diff, the
  compiler answers: which concepts/rules/packs change, which golden decisions
  change (via §16.4 differential run) — the author sees behavioural blast
  radius before merging. This is the compiler's largest gift to authoring
  safety.

---

## 13. Diagnostics and Error Reporting

- **13.1 Taxonomy.** `E` (build-failing in release), `W` (report;
  fail-on-warn flag for CI strictness), `I` (informational), `HUM` (review-
  queue items), `ICE` (compiler bugs — always fail, always ask for a bug
  report). Codes are stable and documented; this spec reserves ranges:
  02xx symbols, 03xx graphs, 04xx lowering, 05xx coverage, 06xx conflicts,
  07xx optimization notes, 08xx versioning.
- **13.2 Anatomy of a diagnostic.** code · severity · message (plain
  language, education-domain wording — "this hint requires dividing, which
  the concept itself doesn't require: a hint must be easier than its
  problem") · primary span (file:line) · related spans · fix-it suggestion
  where computable (never auto-applied) · citation of the violated law
  (Brain path or RS invariant id).
- **13.3 Build report.** Per-pack: coverage percentages per subject (the
  CURRICULUM_PROGRESS dashboard pattern, generated here), W/HUM inventories,
  behavioural diff summary vs last pack, TODO-hole census.
- **13.4 Error recovery.** After an error the compiler continues with the
  entity poisoned (excluded from downstream passes but present in symbol
  tables so one root cause doesn't cascade into fifty phantom "unresolved
  reference" errors — poisoned symbols resolve but taint, and taints are
  reported once).

---

## 14. Determinism Guarantees

- **D-1.** Byte-reproducible: same lockfile + same compiler build → identical
  pack content hash, cross-machine. Enforced by: sorted iteration everywhere,
  stable hashing (no address-based identity), no clocks/locale/network in any
  pass, parallelism restricted to map-then-deterministic-reduce shapes.
- **D-2.** No LLM anywhere in the compiler (§1). Authoring assistants are
  upstream tools producing ordinary reviewed source.
- **D-3.** Proposed-semver computation, diagnostics ordering, and report
  content are also deterministic (reports are diffable artifacts).
- **D-4.** CI re-builds every release pack twice on different runners and
  byte-compares (T-C6).

---

## 15. Performance Model and Complexity

Assumption: millions of assets at maturity (task premise); today ~10³.

| Pass | Complexity | Budget @ 10⁶ entities (16 cores) |
|---|---|---|
| Parse/normalize | O(bytes), parallel | ≤ 3 min |
| Symbols + linking | O(entities+refs) | ≤ 1 min |
| Graph passes (SCC, dominators, closures) | O(V+E) per subject graph; dominators O(E·α) | ≤ 1 min |
| Validation + conflicts | bucketed pairwise within bands: O(Σ bucket²), buckets small by guard-key design; coverage O(entities) | ≤ 2 min |
| Optimization | set-cover greedy O(items·covered); automata O(pattern chars) | ≤ 2 min |
| Emit + hash | O(pack bytes) | ≤ 1 min |
| **Full build** | | **≤ 10 min** |
| **Incremental (single concept entry edit)** | dirty-set ∝ dependents | **≤ 5 s** |
| **Authoring watch mode (single file, diagnostics only)** | | **≤ 1 s** |

Memory: BIR-M streamed per shard where possible; whole-subject graphs held
in RAM (worst subject today: 908 concepts — trivial; at 10⁶ scale graphs
remain per-subject, so bounded).

---

## 16. Testing Architecture (the compiler's own)

1. **T-C1 Unit:** every parser, pass, lint, and lowering has direct tests;
   every diagnostic code has at least one triggering fixture and one
   near-miss non-triggering fixture.
2. **T-C2 Property:** parse∘print round-trips BIR-H; fold-style invariants
   (linking is idempotent; poisoning is monotone); graph certificates verify
   (the emitted topological order IS a valid order — certificates re-checked
   cheaply, trust-but-verify).
3. **T-C3 Golden packs:** canonical source fixtures → byte-exact expected
   packs; the *real repository Brain* compiles in CI on every commit
   (dev mode), and its W/HUM inventory is tracked as a ratchet (never grows
   without an annotated allowance — the tsc-ratchet pattern this repo already
   uses).
4. **T-C4 Differential/behavioural:** optimization passes verified by running
   the golden decision tables (RS T-3) against optimized vs unoptimized
   packs — decisions MUST be identical; compiler version N vs N−1 diffs
   reviewed on real sources.
5. **T-C5 Conformance replay:** every release pack is loaded by the real
   kernel in a sandbox and driven through the simulation personas (RS T-5)
   before activation — the compiler's final gate is behavioural, not
   structural (SIM tier of the honesty boundary).
6. **T-C6 Determinism:** double-build byte comparison (D-4); shuffled-input-
   order builds must produce identical packs (metamorphic).
7. **T-C7 Fuzzing:** block parsers and overlay resolution fuzzed; the
   compiler MUST never ICE on malformed *input* (malformed input is always a
   diagnostic; ICE is reserved for compiler bugs).
8. **T-C8 Fixture corpus from history:** every authored-content bug class
   already documented in this repo (silent decision cells, missing cut-nodes,
   dangling Universal-Principle citations, chemistry count drift 187→186)
   becomes a permanent fixture proving the compiler would have caught it.

---

## 17. Comparison to LLVM, TypeScript, and Rust

| Dimension | LLVM | TypeScript | Rust | **Brain Compiler** |
|---|---|---|---|---|
| Source | many languages | JS+types, gradual | one language, strict | prose + structured blocks, gradual (dev) → strict (release) |
| IR | multi-level (AST→LLVM IR→MC) | AST + checker types | HIR→MIR→LLVM | BIR-H → BIR-M → BIR-L (§3) |
| Type system's job | well-formedness | *gradualness*: adopt incrementally, `any` = escape hatch | *ownership*: who may mutate what | **coverage + provenance**: every executable claim cited, every teachable concept certifiable |
| Signature analysis | optimization legality | structural typing | borrow checker | **exhaustiveness of teaching**: no silent decision cells (≈ non-exhaustive `match` = error), single-writer field effects per band (≈ borrow rules on PolicyDecision fields: two rules may not "mutably borrow" one field at equal specificity) |
| UB stance | UB exists, optimizers exploit it | permissive | UB is a bug in safe code | **no UB**: an unspecified teaching situation is a compile error (E0509), never a runtime improvisation — this is the single deepest difference from prompt-based systems, where *everything unspecified is UB filled by a model* |
| Incremental | ThinLTO etc. | tsserver watch | salsa/incremental | §12.3 memoized passes + DepGraph |
| Package model | — | npm | cargo + lockfile | packs + `brain.lock` (§12.1) |
| Backend | machine code | JS | machine code | **policy packs**: the "machine" is the EOS kernel; its "ISA" is the Runtime Specification (§3.10 PolicyDecision et al.) |
| What cannot be checked | semantics of the program's *purpose* | runtime values | logic bugs | **pedagogical truth** — delegated to HUM review + SIM gates (§0.3), exactly as software correctness is delegated to tests, not the type checker |

**The synthesis:** educational knowledge compiles the same way programs do
because both are *behavioural specifications with structure*: the structure
(graphs, coverage, ordering, budgets, provenance) is machine-verifiable and
becomes deterministic executable form; the meaning is human-verified and
machine-*measured* (evidence). The Brain Compiler is to teaching what the
Rust compiler is to memory safety: it cannot make an author wise, but it can
make an entire class of teaching failures — the unspecified cell, the
uncertifiable concept, the hint harder than its problem, the circular
prerequisite, the analogy that breeds the misconception it never declared —
**impossible to ship**.

---

## 18. Failure Modes and Recovery (compiler-level)

| Failure | Behaviour |
|---|---|
| Malformed source | diagnostic + poisoned entity; build continues; release fails |
| ICE (pass invariant broken) | build fails with compiler-bug report bundle (inputs hash, pass, IR snapshot); NEVER emits a pack |
| Lockfile drift (source changed mid-build) | build aborts (E0810); builds run on immutable snapshots |
| Certificate re-check failure | ICE (an optimizer corrupted a graph) |
| Pack self-check failure at kernel load | kernel refuses; last-good pinned (RS P-4); compiler side: release process re-verifies hashes before publish |
| Ratchet regression (W/HUM inventory grows) | CI fails unless an annotated allowance accompanies the change |
| Conformance replay failure (T-C5) | pack rejected before activation; bisect via impact analysis (§12.4) |

---

## 19. Resolved Design Decisions and Standing Critiques

Decisions made here that the frozen documents left open:

1. **Only structured blocks compile; prose is payload.** The alternative —
   NLP over prose — violates §0.3. Consequence accepted: existing Brain
   documents need progressive annotation; the migration lint + skeleton
   suggestions + coverage ratchet make this incremental, and D15 already
   pointed authoring this way.
2. **The compiler proposes semver; humans may only raise it.** Automated
   behavioural diffing beats human guessing at blast radius.
3. **Near-duplicate and prose-contradiction detection is HUM, not MECH.**
   False mechanical confidence is worse than a review queue.
4. **Cut-nodes are computed (dominators), not hand-authored** — hand lists
   remain as overrides with W-diff when they disagree with computation.
5. **No fuzzy reference resolution.** Did-you-mean is a suggestion in the
   diagnostic; silent fuzzy linking is how wrong content reaches learners.
6. **Zero LLM calls inside the compiler.** LLMs assist *authors* upstream;
   determinism of the build is non-negotiable (D-2).
7. **Dev/release duality** (todo-holes and skeleton concepts legal in dev,
   fatal in release-declared subjects) — reconciles million-asset ambition
   with 3-full-entries reality without lying in either direction.

Standing critiques (unresolved by design; revisit with evidence):
- The structured-block schema is the *real* authoring language and will need
  its own style guide and editor tooling; underinvestment there starves the
  compiler of input (the highest program risk, named plainly).
- Guard-predicate expressiveness: too weak → authors can't express real
  pedagogy; too strong → satisfiability checks stop being decidable. v1
  fixes conjunctions-over-finite-domains and accepts the expressiveness
  ceiling; extension requires a spec revision, not a workaround.
- Set-cover and dominator outputs are only as good as item/graph metadata;
  garbage-in remains possible — which is why T-C5's behavioural gate, not
  any structural check, is the final authority on a pack.

---

*End of specification v1.0.0. Implementation requires owner approval (G2).
Gaps found during implementation are spec bugs — file them against this
document; do not invent behaviour.*
