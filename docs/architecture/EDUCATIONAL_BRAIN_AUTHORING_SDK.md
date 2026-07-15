# Educational Brain Authoring SDK — v1.0

**Document class:** Architecture specification — the authoring ecosystem
("TypeScript + VSCode for educational knowledge") through which hundreds,
eventually thousands, of educators build the Educational Brain.
**Status:** SPECIFICATION — design only. No runtime, EOS, Compiler, or CEKR
modification. Implementation remains G2-gated.
**Version:** 1.0.0. **Normative language:** RFC 2119.

**Position in the frozen stack:**

```
Educators ──► BrainScript DSL + Brain IDE (THIS DOCUMENT)
                    ↓ (files in the Brain repo)
              CEKR store (validation V-1…V-16 at commit)
                    ↓
              Brain Compiler (EBC diagnostics, packs)
                    ↓
              EOS Kernel → learners → Evidence Spine → OSF findings
                    ↑___________________________________↓
                    the loop this SDK exists to industrialize
```

**Why this document exists:** the Issue Register's ISS-07 (Critical): the
compiler compiles only structured blocks, and zero exist. The SDK is the
supply chain. Its design law: **the DSL is the EBC §2.1 block contract grown
into a language — one format, never a second competing one.** Every DSL
construct MUST lower 1:1 into CEKR entities/edges; anything that cannot is
not a language feature.

---

## Table of Contents

1. The BrainScript DSL
2. The Brain IDE
3. Author workflow (draft → review → publish → rollback)
4. Multi-author collaboration
5. Brain QA (dashboards and gates)
6. AI-assisted authoring (with hard rails)
7. Repository organization (packages)
8. Migration (today's markdown → authored packages)
9. Testing authored content
10. Long-term vision: a thousand educators, one Brain
11. Risks, unresolved questions, milestones

---

## 1. The BrainScript DSL

### 1.1 Design laws

- **D1 — Prose-first, blocks-for-meaning.** A BrainScript file IS a markdown
  document a teacher can read aloud. Executable meaning lives only in fenced
  blocks (EBC §2.1's 13 kinds, extended below). The compiler ignores prose;
  humans ignore nothing.
- **D2 — Everything lowers to CEKR.** Each block kind maps to exactly one
  CEKR entity or edge kind. No block without a lowering; no CEKR kind
  without a block. (The bijection is the conformance test.)
- **D3 — Gradual strictness.** Like TypeScript's gradual typing: `todo:`
  holes and `entryClass: skeleton` are legal in draft/dev builds, fatal in
  release-declared subjects. Authors adopt rigor incrementally; the ratchet
  (§5) makes progress monotone.
- **D4 — No Turing completeness.** BrainScript is declarative data. Macros
  are hygienic textual templates expanded at parse time with visible output;
  there are no loops, conditionals-over-data, or runtime evaluation. A
  knowledge language that can compute can hide; this one cannot.

### 1.2 Syntax

A block is a fenced region with a kind, an id, and a YAML-shaped body:

```brainscript
::misconception frac.bigger-denominator-bigger v1
targets: [concept/math.arith.fractions]
birthType: 1            # overgeneralization ("bigger number = bigger")
phrases:
  - "1/8 is bigger than 1/4 because 8 is bigger"
  - "the bottom number tells you how big it is"
collision:
  case: "two identical pizzas, one cut into 4, one into 8 — which slice is bigger?"
  quality: AUTHORED_PRIMARY
repair: sequence/frac.bdb.repair-v2
cites: educational-brain/concepts/mathematics/math.arith.fractions.md#misconceptions
notes:
  author: "Kids hold this HARD when they meet it via notation before pizza."
  reviewer: ""
::end
```

Rules: `::<kind> <id> v<n>` opens; `::end` closes; ids are CEKR EntityIds
minus the namespace prefix (derived from kind); `v<n>` is the authored
revision marker (the store computes the real content hash). `#` comments are
legal anywhere in a body and are preserved as author annotation. `cites:` is
MANDATORY on every block (CEKR K5); the IDE auto-fills it with the enclosing
file+heading, authors may add external scholarship references.

### 1.3 Block kinds

The EBC §2.1 thirteen (`rule, script, probe, misconception, analogy, hint,
action, capability, requires, visual, dispatch, term, config`) plus the CEKR
completion set: `concept, skill, objective, mastery, transfer, explanation,
mentalmodel, intuition, workedexample, definition, formula, proof,
counterexample, mistake, simulation, experiment, review, evidence-note`.
One block kind per CEKR kind (D2). Edge-only claims use compact edge blocks:

```brainscript
::requires concept/phys.mech.newtons-first-law
capabilities: [compare, identify-direction]
concepts:
  - { id: concept/phys.meas.units, strength: HARD }
prereqsComplete: true
::end
```

### 1.4 Inheritance, reuse, templates, imports, references

- **Inheritance** = CEKR `REFINES` surfaced as `refines:` on a concept block;
  the IDE shows inherited assets grayed-in (never copied — the
  reuse-by-reference law from `concepts/TEMPLATE.md` becomes syntax).
- **Reuse** = references. Any field expecting an entity takes an id
  (`repair: sequence/...`). Copy-paste of another entity's body is a lint
  (W: duplicate-content, suggests a reference).
- **Templates** = `::template` blocks: named partial bodies with typed holes
  (`{{slot:analogySource}}`), instantiated with `uses:`. Expansion is
  parse-time, hygienic, and the IDE shows the expanded result inline. The
  four seed concept entries become the shipped `concept-full` and
  `concept-skeleton` templates (D15's instrumented-skeleton doctrine as a
  template, not a convention).
- **Imports**: a file declares `@package physics/mechanics` and MAY
  `@import shared/capabilities`, `@import shared/terms.en`. Imports scope
  reference resolution and drive the dependency graph; there is no wildcard
  import.
- **Metadata**: file-level frontmatter — package, subject, ageBands,
  language of authoring, owners (§4), status.
- **Localization**: variant blocks `::variant <of-id> lang=ru register=child`
  carrying only renderable-text fields (CEKR §8.2 semantic-equality is
  enforced: a variant that changes structure fails validation). Neutral core
  stays in the base block.
- **Versioning & deprecation**: `v<n>` markers + `deprecated: {by: <id>,
  reason}` fields; deprecation never deletes (CEKR §10); the IDE strikes
  through deprecated entities and shows what supersedes them.
- **Author/reviewer notes**: first-class `notes:` fields (never compiled
  into packs, always preserved in CEKR provenance) — the margin comments of
  the discipline.

### 1.5 Validation (three rings, all in the editor)

Ring 1 — syntax/schema (instant, per keystroke): block well-formed, fields
typed, enums valid. Ring 2 — CEKR V-1…V-16 (sub-second, per save): refs
resolve, acyclicity, cardinality, variant equality, hint easier-than.
Ring 3 — EBC project diagnostics (seconds, on demand/CI): coverage E-codes,
conflicts, dead/unreachable, terminology. Same engines as the store and
compiler (ISS-03's shared-validation-library requirement is a hard SDK
dependency) — the editor never reimplements a check.

### 1.6 A complete worked example (one file, teachable)

```brainscript
@package physics/measurement
# Units — first contact. ORAL-FIRST for beginners; "SI" is banned in
# lesson one (first-lesson/07). Prose here is for YOU, the teacher.

::concept phys.meas.units v3
name: Units and Measurement
formalizable: YES
difficulty: foundational
load: { intrinsicElements: 2 }
prereqsComplete: true
cites: docs/physics/kg/graph.json#phys.meas.units
::end

::intuition units.need-for-shared-measure v1
for: concept/phys.meas.units
anchor: "two kids argue whose paper plane flew farther — no ruler, whose feet do we trust?"
phaseFit: [ANCHOR]
cites: educational-brain/first-lesson/07-subject-adaptations.md#physics
::end

::probe units.compare-feet v2
for: concept/phys.meas.units
stage: 2
kind: inline
stem: "If we measure the throw in YOUR steps and in MY steps, will we get the same number?"
scoring: { kind: choiceKey, correct: no }
distractors:
  - { choice: yes, signals: misconception/units.number-is-the-thing }
diagnostic: true
capabilities: [compare]
cites: educational-brain/assessment/02-diagnosis.md#entry-probes
::end
```

**Critique.** The competing design — a GUI form-builder with no text format —
was rejected: text diffs, merges, greps, and cites are the collaboration
substrate (§4), and educators who can write a lesson plan can write fenced
YAML with an IDE holding their hand. The GUI exists (§2) but it reads/writes
BrainScript; the file is always the truth.

---

## 2. The Brain IDE

A workbench (VSCode extension first — LSP + webviews; a hosted web IDE later
reusing the same LSP) with these surfaces:

1. **Language service:** autocomplete (ids by kind, enum values, capability
   vocabulary, term registry), go-to-definition/find-references across the
   whole Brain, hover cards (an id shows its entity card + status +
   evidence summary), rename-with-references, cite auto-fill.
2. **Live validation:** the three rings (§1.5) as squiggles with fix-its
   (never auto-applied — EBC discipline).
3. **Preview panes:**
   - *Learner preview* — how this explanation/probe renders at a chosen
     (language, register, ageBand), via the same render path templates use.
   - *Hint preview* — the ladder for an item, with the easier-than proof
     shown (stage arithmetic + capability sets, green/red).
   - *Visual preview* — parametric visual specs rendered live.
   - *Policy preview* — for a dispatch/rule: which band, what it shadows,
     which situations it fires in (from the compiled decision tables).
4. **Graph views (read-only lenses over CEKR):** knowledge graph (prereq/
   unlock neighborhood of the open concept, coverage-colored),
   misconception map (targets/collisions/repairs, regrowth stats overlaid),
   capability graph (DAG with the open entity's requirements highlighted),
   dependency graph (what breaks if I change this — EBC §12.4 impact
   analysis surfaced as a panel).
5. **Replay theater — the killer feature:** run the simulation personas
   (RS T-5) against a draft locally: *teaching replay* (watch the fragile-
   beginner persona traverse the authored concept turn by turn, each
   decision showing its rule path), *recovery replay* (inject "I don't
   know" ×3, watch escalation), *question-stage replay* (verify no stage
   jumps with this content). Authors SEE their knowledge teach before any
   human ever meets it. Backed by the kernel-in-a-sandbox + pack-compile of
   the working tree (fast incremental builds, EBC §12.3, ≤5 s edit loop).
6. **Author dashboard:** my drafts, my review queue, my entities'
   post-publish evidence (OSF EvidenceClaims filtered to my content — the
   feedback that makes authoring a craft with consequences).

---

## 3. Author Workflow

Statuses are CEKR lifecycle statuses; the workflow is who may move them.

```
DRAFT ──author──► REVIEW ──two-gate──► ACTIVE(publish) ──evidence/decision──► DEPRECATED → RETIRED
  ▲                  │
  └──changes requested┘
```

- **Draft:** anything goes; todo-holes legal; visible to author + package
  collaborators; replay theater available.
- **Review — two mandatory gates, different questions:**
  - *Educational review* (subject lead or delegated expert): is this how we
    teach — voice, sequencing, register, age fit?
  - *Scientific review* (content expert): is it TRUE — domain correctness,
    misconception accuracy, citation validity?
  One person MAY hold both hats for low-risk kinds (terms, variants);
  protected-class content (recovery scripts, lesson-one, young-learner
  material) always requires two distinct humans (mirrors OSF's protected
  class).
- **Approval → publish:** publishing = CEKR head move + Revision entity +
  the package's next build picks it up. Publishing NEVER auto-deploys
  teaching behavior: packs still pass EBC release checks + simulation gate
  + (for policy-bearing content) the OSF rollout protocol. Content
  publishing and pack activation are separate acts by design.
- **Rollback:** head move back + Revision(reason: rollback); one action,
  no deletion, learners' evidence keeps pointing at the rev they saw.
- **Audit history:** every status move, review comment, and diff is a
  queryable Revision chain — "who approved this analogy and what did the
  scientific reviewer say" is a lookup, forever.

---

## 4. Multi-author Collaboration

- **Substrate: git.** BrainScript is text; branches, PRs, and merges are
  inherited rather than reinvented. The SDK adds semantic tooling on top:
- **Semantic merge:** conflicts are resolved at block granularity (two
  edits to different fields of one entity auto-merge; same-field conflicts
  show entity-aware diff: "you both changed the collision case"). Merge
  output MUST re-validate (Ring 2) before commit.
- **Ownership:** every package declares owners (subject leads) and
  maintainers in its manifest; CODEOWNERS-style routing sends review
  requests automatically. Cross-package edits (a physics author touching
  shared/capabilities) require the owning lead's review — the capability
  vocabulary and term registries are the most protected files in the repo
  (they are everyone's dependencies).
- **Branching model:** trunk-based with short-lived author branches;
  release channels per subject (`draft` continuously, `stable` on cadence).
  Long-running forks are structurally discouraged: the coverage ratchet and
  evidence dashboards only track trunk.
- **Review requests:** the IDE files them with the replay-theater results
  attached (a reviewer watches the same persona run the author watched —
  reviews argue about observed teaching, not imagined teaching).
- **Expert reviewers & subject leads:** roles in the package manifest;
  leads own release declarations ("mathematics is now release-strict"),
  arbitrate ACCEPTED_TENSION conflicts (CEKR Conflict nodes), and hold the
  merge veto on protected classes.

---

## 5. Brain QA

All generated from CEKR + EBC diagnostics + OSF claims (no bespoke
analytics):

- **Coverage dashboards** per subject × ageBand × language: concepts with
  full/skeleton/no entries; the ratchet — coverage percentages and W/HUM
  inventories may only improve on trunk (annotated allowances required to
  regress; same pattern as the repo's tsc ratchet).
- **Gap boards (each an EBC E/W-code query):** missing misconceptions
  (E0502 attestation absences), missing prerequisites (E0504), dead
  concepts (W0314), unreachable (E0313), unused assets (dead-asset pass
  report), broken references (E0202), policy conflicts (E0601/W0602 +
  runtime PolicyConflictDetected events fed back), capability gaps (E0621),
  assessment coverage incl. per-capability diagnostic items (E0331-family +
  the ISS-16 gate), fragile coverage (W0721 single-point-of-failure items).
- **Evidence boards:** post-publish effectiveness per entity (OSF), regrowth
  alarms per analogy, item psychometrics — routed to the owning package's
  queue so QA findings become assigned work, not wall decoration.

---

## 6. AI-Assisted Authoring (with hard rails)

AI is upstream of the compiler and upstream of humans — never beside either.

- **What AI does:** draft block skeletons from prose ("blockify this
  document" — the EBC migration lint, powered); propose misconception
  phrasings and distractors from evidence-spine patterns; suggest analogy
  candidates WITH doesNotCarry lists; translate variants (flagged
  MACHINE_DRAFT); summarize review diffs; answer "does an entity like this
  already exist?" (dedup search).
- **The five rails:**
  1. **Provenance rail:** AI output lands as `authorType: AI_ASSISTED`,
     status DRAFT, always. CEKR makes this unforgeable (envelope-level).
  2. **Citation rail:** AI-drafted blocks with empty or non-resolving
     `cites:` fail Ring 2 — an AI cannot cite what doesn't exist, so
     hallucinated scholarship dies at the first save. Claims needing new
     citations require the human to supply them.
  3. **Human-approval rail:** DRAFT→REVIEW requires a human author to adopt
     the draft (edit-and-claim); REVIEW→ACTIVE requires the two gates (§3).
     **Never automatic publishing** — there is no API path from AI output
     to ACTIVE, by construction, not by policy.
  4. **Lint rail:** all three validation rings run on AI output identically;
     plus AI-specific lints (verbatim-similarity to training-set-style
     boilerplate; distractors that signal no misconception; analogies
     missing retirement boundaries — the fields hallucination most often
     fakes are exactly the mandatory ones).
  5. **Review-suggestion rail:** AI MAY annotate review diffs ("this
     collision case resembles the one that burned in frac.bdb.repair-v1")
     — suggestions carry no authority and are visually distinct.
- **Honest limit:** rails guarantee provenance and structure, not truth —
  scientific review remains the truth gate (the honesty boundary, again).

---

## 7. Repository Organization

```
brain/
  brain.toml                 # workspace manifest, channels, ratchet config
  shared/
    capabilities/            # THE capability vocabulary (most protected)
    terms/                   # canonical terminology, per language
    templates/               # concept-full, concept-skeleton, probe sets
    actions/                 # the 27-action catalog
    policies/                # universal rules (D1 grid, decision matrix)
    recovery/                # universal recovery scripts + deltas
  subjects/
    physics/
      package.toml           # owners, status (draft|release), ageBands
      mechanics/             # module = KG domain
        newtons-first-law.bs # one file per concept (constellation inside)
      measurement/
    mathematics/…
  overlays/
    age/early-child/         # ageBand packs: deltas only, never copies
    boards/cbse/             # curriculum mappings (MAPS_TO_BOARD edges only)
  l10n/
    ru/ hi/                  # variant packs per language, mirroring paths
  experiments/               # x- namespace content, never release-built
```

Naming: files/ids kebab-case, id = path-derived where possible
(`subjects/physics/measurement/units.bs` hosts `concept phys.meas.units` —
checked, not assumed). A **package** is the unit of ownership, review
routing, release status, and pack sharding; packages map 1:1 onto EBC's
compilation partitions.

---

## 8. Migration (today's markdown → authored packages)

Phase 0 — the existing `educational-brain/` tree is mounted read-only as
`legacy/`; nothing is moved or rewritten wholesale.
Phase 1 — **the pilot slice (ISS-07's smallest correction):** the fractions
constellation, the recovery script library, and the D1 grid are authored in
BrainScript by hand — validating the DSL against the hardest real content
and producing the compiler's first fixtures.
Phase 2 — **blockify assist:** the migration lint proposes block skeletons
inside legacy files (headings → candidate blocks); humans confirm/correct;
confirmed blocks are extracted into packages with `cites:` pointing back at
their legacy origin (provenance chain unbroken).
Phase 3 — the coverage ratchet drives order: entry-point concepts and
misconception hubs first (the COVERAGE.md protocol, now enforced by
dashboards), evidence-flagged content (lesson-one failures) jumping the
queue (first-lesson/08's feedback law).
Phase 4 — legacy files whose executable content is fully extracted get a
banner + pointer; they remain as scholarship (prose was never the problem).
Invariant throughout: at every phase, the ONLY compiled truth is
blocks-in-packages — there is never a moment with two executable sources.

---

## 9. Testing Authored Content

Layered, mostly inherited from the frozen stack:

1. **Ring validation** (§1.5) — structural correctness, pre-commit.
2. **Constellation tests** — per-concept generated checks: every probe's
   distractors signal registered misconceptions; hints prove easier-than;
   mastery path terminates (EBC E-codes scoped to the package diff).
3. **Replay theater as test** — persona runs against the draft pack are
   recordable as **golden teaching transcripts** checked into the package;
   CI replays them on every change to shared policies (a policy edit that
   changes how fractions teaches the fragile-beginner persona shows up as
   a transcript diff in review).
4. **Simulation gate** — full RS T-5 battery on release builds (inherited).
5. **Canary cohort** — OSF rollout protocol for pack activation (inherited);
   authors see their content's canary metrics in the dashboard (§2.6).
6. **Post-publish evidence** — OSF claims flow back as QA items (§5);
   "tested" is never final — it degrades into "measured."

---

## 10. Long-Term Vision: a Thousand Educators, One Brain

- **The contribution funnel:** open-source-style — anyone drafts in a fork;
  packages have owners; review gates protect quality; the evidence loop
  ranks what actually teaches. Authority is earned per package (maintainer
  ladders), not global.
- **Why educators come:** the replay theater (watch your teaching idea run
  against six learner personas within minutes), the evidence dashboard
  (YOUR analogy's measured effect — feedback no classroom can give at this
  resolution), and attribution (CEKR provenance is permanent authorship
  credit; an educator's contribution graph is citable).
- **Why the Brain stays coherent at 1,000 authors:** one canonical model
  (CEKR) + compile-time conflict detection + protected shared vocabularies
  + subject-lead arbitration + the ratchet. Disagreement is representable
  (Conflict nodes, ACCEPTED_TENSION) instead of forked.
- **Localization at scale:** language packs owned by native-speaker teams;
  variant semantic-equality validation keeps 40 languages structurally in
  lock-step with one pedagogical core.
- **The end state:** the Brain becomes the field's shared, versioned,
  evidence-ranked repository of operational teaching knowledge — authored
  like software, reviewed like science, measured like medicine. The SDK is
  how "the moat" acquires its workforce.

---

## 11. Risks, Unresolved Questions, Milestones

**Risks:** (1) DSL ergonomics — if teachers bounce off fenced YAML, nothing
downstream matters; mitigation: the GUI form layer writes BrainScript, and
the pilot slice (§8 Phase 1) is the usability test before any tooling scale-
up. (2) Review bottleneck — two-gate review with few experts throttles
throughput; mitigation: risk-tiered gating (low-risk kinds single-gate) and
maintainer ladders. (3) Building the IDE before the shared validation
library (ISS-03) exists would triple-implement the checks — hard sequencing
dependency. (4) Replay theater depends on kernel milestones (M3+) — until
then it degrades to compile-preview + golden-decision-table checks, which
must be stated honestly in the tool.

**Unresolved questions:** hosted-IDE tenancy and identity for external
educators (owner/business decision); contributor licensing/IP terms for a
community Brain; whether age overlays may override protected-class scripts
or only add (proposed: add-only); compensation/recognition economics for
external authors.

**Milestones:** SDK-M0 ratify + DSL grammar freeze (with the CEKR/EBC block
bijection table) → SDK-M1 parser + Ring 1/2 validation + CLI (`brain check`,
`brain fmt`) → SDK-M2 the pilot slice authored end-to-end (joint with
CEKR-M3/ISS-07) → SDK-M3 VSCode extension (LSP: completion, refs,
diagnostics) → SDK-M4 graph lenses + previews → SDK-M5 replay theater
(joint with kernel M3 + simulation personas) → SDK-M6 hosted multi-tenant
IDE + external-educator onboarding.

---

*End of specification v1.0.0. Design only; adoption and every milestone
remain owner decisions under the standing G1/G2 governance rules.*
