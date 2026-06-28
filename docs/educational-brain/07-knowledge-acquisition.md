# 07 · Knowledge Acquisition Engine — how new knowledge enters the Brain

> *Books, teachers, videos, research papers, curricula, and external
> AI are all inputs. Validated Knowledge Assets are the only output.
> Nothing reaches the learner that hasn't passed through the pipeline.*

---

## 1. The problem this engine solves

The Brain's quality is bounded by the quality of its Knowledge
Assets. Assets either come from:

- **Human curators** (slow, expensive, gold-standard).
- **AI authoring** (fast, cheap, must be validated).
- **External sources** (books, videos, exam-board syllabi, research
  papers, OER libraries).

This document specifies the pipeline that turns each of these inputs
into validated assets in the catalogue without losing provenance.

---

## 2. Three candidate designs

### Design A — Direct curator entry only

Every asset is hand-authored by a human curator using a web form.

- ✅ Quality is bounded only by curator skill.
- ❌ Cannot scale to 16 subjects × multiple curricula × multiple
  languages × multiple grades × multiple styles. The arithmetic is
  the catalogue needs hundreds of thousands of assets.
- ❌ External sources (e.g., publisher-licensed textbooks) bypassed.

### Design B — Open AI authoring with light review

LLM authors everything; curators occasionally spot-check.

- ✅ Scales infinitely; cheap.
- ❌ Quality control is statistical — bad assets reach learners and
  must be evidence-deprecated, slowly.
- ❌ Provenance/IP becomes opaque (which book did this come from?).
- ❌ Curriculum-specific accuracy (CBSE specifies different
  derivations than ICSE) is unreliable.

### Design C — Tiered pipeline: ingest → extract → author → review → publish

A staged pipeline where:

1. **Ingestion** brings raw content in (book chapter PDF, lecture
   video transcript, syllabus document, ...) with explicit
   provenance.
2. **Extraction** parses the raw content into atomic propositions
   tagged to concepts (deterministic where possible, LLM-assisted
   where necessary).
3. **Authoring** drafts candidate assets from extracted propositions
   (template-driven when possible; LLM-assisted otherwise).
4. **Review** routes drafts to human curators with full context.
5. **Publish** promotes reviewed assets to `ACTIVE`.

- ✅ Scales because most stages are automatable.
- ✅ Quality preserved because the human is in the loop at the
  final stage.
- ✅ Provenance preserved because every asset traces back to its
  source.
- ❌ Requires building five stages of tooling. Phase 1 only
  specifies; Phase 3+ builds.

### Choice — Design C

This is the only design that scales without sacrificing quality.
Phase 1 specifies it; Phase 3 (after the core Brain runs on
Phase-2 implementation) builds it incrementally — starting with
ingestion + LLM authoring + curator review for the curricula with
existing rights (CBSE public syllabus, OER).

---

## 3. The pipeline, stage by stage

```
   Raw source
   (book, video, syllabus, paper)
        │
        ▼
   ┌──────────────┐
   │ 1. Ingest    │ — store raw, hash, IP-classify, tag provenance
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │ 2. Extract   │ — segment, embed, tag to concepts, propose
   │              │   new concepts where graph has none
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │ 3. Author    │ — template / LLM-driven asset drafts
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │ 4. Review    │ — human curator queue with full context
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │ 5. Publish   │ — promote to ACTIVE; emit GraphChanged event
   └──────────────┘
```

---

## 4. Stage 1 — Ingestion

A source is something the Brain can cite. Five source kinds:

| Kind | Examples | Ingestion mechanism |
|------|----------|---------------------|
| `book` | NCERT textbook PDF, CBSE-licensed publisher chapter | PDF → text via PyMuPDF / OCR; chunk by section; capture page numbers |
| `video` | NPTEL lecture, Khan Academy clip | Audio → transcript via existing STT; align segments to timestamps |
| `syllabus` | CBSE 2025 Class-10 syllabus document | Structured PDF / web scrape into Curriculum / Module / LearningObjective objects |
| `research` | Cognitive-science paper on misconceptions | Abstract + structured extraction of misconceptions with citation |
| `expert_dictation` | Teacher dictating an explanation into the curator UI | Live STT + curator edit |

Every ingestion writes:

```text
KnowledgeAcquisitionTrace {
  traceId             UUID
  sourceKind          'book' | 'video' | …
  sourceTitle         'NCERT Class 10 Science (2024 edition)'
  sourceUri           where the raw bytes live
  contentHash         SHA-256 of raw content
  licenseClass        'public_domain' | 'cc_by' | 'proprietary_licensed' | 'fair_use' | 'pending'
  licenseDocument     pointer to license terms
  contributedBy       curator userId who initiated the ingest
  ingestedAt          timestamp
  segments            [Segment] — chunks of the source, addressable
                                  by (traceId, segmentIndex)
}
```

The `licenseClass` is enforced downstream: an asset derived from a
`proprietary_licensed` source can only be served to learners in
license-eligible contexts (e.g., paying subscribers); a
`pending`-license source is held in draft and cannot become
`ACTIVE` until a curator resolves the license.

---

## 5. Stage 2 — Extraction

Extraction is "what did this source teach?" — segmenting raw content
into atomic propositions and mapping each to one or more existing
concepts (or proposing new concepts where the graph has none).

### Deterministic path

A book chapter with structured headings goes through:

1. Heading detector → segments labeled by hierarchy.
2. Per-segment NLP: sentence segmentation, noun-phrase extraction.
3. Concept matcher: each segment's noun phrases looked up in the
   Concept index (symbolic match by `title` and `description`
   tokens, embedding similarity fallback). Above threshold: tag
   segment to that concept.

### LLM-assisted path

For unstructured sources (videos, research papers) or for segments
the deterministic path can't tag with confidence:

- Type-B AI call (parameter extraction) prompted with the segment
  text + the list of candidate concepts (top-K from embedding
  similarity) + a schema requiring it to pick zero, one, or
  multiple.
- The result is cached against the segment hash, so re-ingestion is
  cheap.

### New-concept proposal

If a segment can't be tagged to any existing concept AND the
extractor is confident the segment is teaching something coherent,
it proposes a new concept:

```text
ConceptProposal {
  proposedConceptId       'physics.thermo.entropy_arrow_of_time'
  title                   'Entropy and the arrow of time'
  description             [extracted summary]
  proposedPrerequisites   [conceptId]   — top-K via embedding similarity
  sourceTraceId           where the proposal came from
  proposedBy              'extractor_v1.2'
  curatorReviewNeeded     true (always — graph writes are human-only)
}
```

The proposal goes into the **graph-curator queue**, not directly into
the graph.

---

## 6. Stage 3 — Authoring

Authoring takes a `(concept, source segment(s), language, gradeBand,
style)` tuple and produces a candidate Explanation, Visual, or Probe
asset.

### Template-driven authoring (no LLM)

For a large class of assets — definitions, basic worked examples,
straightforward MCQs — the Brain has *asset templates*:

```text
Template 'definition.en.k_12' {
  output: Explanation { familyKind='definition' }
  inputs: { concept.title, concept.description, concept.canonical_formula? }
  body:   "{{title}} is {{description}}. {% if formula %}It is expressed as {{formula}}.{% endif %}"
}
```

A template is filled deterministically. No LLM call. The result is
already valid (Layer 1 + Layer 2 of validation from doc 01 § 7);
Layer 3 still runs.

### LLM-assisted authoring

For assets that don't fit a template — analogies, worked examples
of complex problems, misconception-repair explanations — a Type-A
LLM call is made with high context:

```
SYSTEM: You are writing an explanation for the My Tutor educational
brain.

CONTEXT:
- Concept: {{concept.title}} ({{concept.id}})
- Concept canonical definition: {{concept.canonical_definition}}
- Concept's prerequisites: {{prerequisites}}
- Misconceptions targeted: {{targeted_misconceptions}}
- Language: {{language}}
- Grade band: {{gradeBand}}
- Style: {{style}}
- Source segment: "{{source_segment}}"

REQUIREMENTS:
- Length: {{length_range}}
- Vocabulary: stay within the {{gradeBand}} whitelist
- Do not contradict the canonical definition
- Address the targeted misconceptions explicitly if {{style}} is 'misconception_repair'

OUTPUT: the explanation text only, no markdown headers.
```

The LLM output goes to validation (doc 01 § 7). Pass → enter Review
queue. Fail → log + retry with adjusted prompt; after 3 fails,
escalate to curator.

### Probe authoring

For MCQ probes, authoring is structured:

1. Pick the concept.
2. Look up `commonly_confused_with` neighbors (doc 02 § 4) — these
   become candidate distractors with `misconceptionId` attached.
3. Look up `targets_misconception` edges — pick 2-3 misconceptions
   the probe should detect; their wrong-belief statements become
   distractors with `misconceptionId` attached.
4. LLM call (Type B): given the concept + the correct answer (from
   `canonical_formula` or `canonical_definition`) + the 3 distractor
   stems, write a question stem that elicits the choice between them.
5. Validate (Layer 2: exactly one correct, every distractor has a
   `misconceptionId`). Pass → Review.

This is the structural fix for the prior MCQ-distractor bug: the
distractors are decided **before** the LLM is involved, not by it.
The LLM only writes the stem.

---

## 7. Stage 4 — Review

The Review stage is *the* quality gate. It is intentionally
expensive in human time because it's the cheapest way to keep the
catalogue good.

### Queue structure

Three review queues, by urgency:

| Queue | Source | SLA |
|-------|--------|-----|
| `urgent` | learner-flagged confusion ≥ threshold; auto-deprecation candidates | 24 h |
| `high` | LLM-authored drafts for high-traffic concepts | 7 days |
| `normal` | LLM-authored drafts for long-tail concepts | 30 days |

### Review actions

For each candidate, a curator can:

- **Approve as-is** → asset moves to `status='ACTIVE'` (
  `provenance='ai_authored_reviewed'`).
- **Edit and approve** → curator-edited version moves to `ACTIVE`;
  original is retained with `provenance='ai_authored_replaced'`.
- **Reject with reason** → asset moves to `status='RETIRED'`; the
  reason updates a `RejectionFeedback` table that goes back to the
  authoring prompt (informs the prompt-tuning queue).
- **Defer** → asset stays in queue with a note (e.g., "wait for
  curriculum update").

### Tools the curator sees

For every review item:

- The candidate asset (full content).
- The source segment(s) it derives from (the actual book passage,
  video clip, etc.).
- The concept's canonical definition + the three highest-scored
  existing assets for the same concept.
- The misconceptions targeted (with their `repairableBy` list).
- The proposed asset's predicted quality score (from a small ML
  classifier trained on prior accept/reject decisions — Phase 3+).
- A "preview as learner" rendering — the asset as the Decision
  Pipeline would compose it into a reply.

### Curator productivity

Target: 30 asset reviews per curator per day, sustainable. Achieved
by template-driven authoring (most drafts are "approve as-is" if the
template was good) + the predicted-quality classifier prioritizing
the easy reviews up front.

---

## 8. Stage 5 — Publish

A reviewed asset is published with:

- `status='ACTIVE'`.
- `provenance='ai_authored_reviewed' | 'human_authored' |
  'imported_curated'`.
- A pointer to the `KnowledgeAcquisitionTrace` (full source +
  provenance chain).
- An initial `qualityScore` from the Beta prior corresponding to its
  provenance.
- An event emitted (`AssetPublished`) consumed by the Evidence Engine
  (which starts tracking it) and by the Decision Pipeline's
  retrieval index (which refreshes its cache).

Published assets are immediately serve-ready. The learner who
triggered the authoring (via stage 5b of the Decision Pipeline) gets
the *new* asset on their turn; subsequent learners get retrieval.

---

## 9. External-AI as a source (the meta-case)

Curators may want to use an external AI as a source — "GPT-5 wrote
this explanation; let's import it." The Brain supports this via
the `expert_dictation` source kind, with the explicit caveat:

- The source kind is `external_ai` not `expert_dictation`.
- The `licenseClass` is `pending` by default — using LLM output is a
  legal area (US case law on AI-generated content rights is
  unsettled at the time of this design); the curator must specify
  the license.
- The provenance chain includes the prompt used.

The Brain treats external-AI sources as *raw material*, identical
to a book or a video. They go through extraction, authoring, and
review the same way. The LLM's name is recorded; its output is not
treated as authoritative.

---

## 10. Multilingual acquisition

Three patterns for getting an asset into multiple languages.

### 10.1 Source-language asset, then translate

A Hindi book chapter → Hindi assets. Then a separate
ingestion of the equivalent English material produces English
assets. The two co-exist; each has its own evidence.

### 10.2 Source-language asset, then LLM translation

A high-quality English asset can be translated by an LLM (Type-A
call), reviewed by a *bilingual* curator (the Review stage's
language-of-output requirement). The translation is a NEW asset,
not a versioning relationship.

### 10.3 Parallel authoring

Two curators (one English, one Hindi) author for the same concept
independently, using the same source. Resulting assets are
independent.

None of these is the default — the right choice depends on the
source (translated CBSE materials vs. original NCERT Hindi
materials are not interchangeable). Curators decide per concept.

The asset model (doc 01 § 3) treats language as a vertex of
identity, so the choice has no architectural cost.

---

## 11. Misconception acquisition

Misconceptions are first-class graph vertices (doc 02 § 3.3). Their
acquisition is a different pipeline from concept-content acquisition.

Sources:

- **Cognitive-science research papers** (e.g., "Common
  misconceptions about Newtonian mechanics" — published reviews).
  Extraction produces `Misconception` proposals citing the paper.
- **Learner data** (Evidence Engine): when many learners give the
  same wrong answer that isn't yet tagged to a known misconception,
  the system surfaces a "candidate misconception cluster" for
  curator review.
- **Curator authoring** directly — teachers know their students'
  misconceptions.

All three feed the same graph-curator queue. A new misconception
requires curator approval; cannot enter the graph autonomously.

---

## 12. Curriculum acquisition

A new curriculum is acquired by:

1. Ingest the syllabus document (PDF / web).
2. Extract `Module` + `LearningObjective` definitions.
3. Match each objective to existing `Concept` vertices (curators
   resolve ambiguities and unknowns).
4. Specify ordering (curators sequence the modules).
5. Publish as a new `Curriculum` view (doc 02 § 6).

Once published, the curriculum is queryable in the Decision
Pipeline's school-mode branch.

---

## 13. Provenance forever

Every asset's `sourceTraceId` is permanent. A learner can be shown,
on request:

- "This explanation is adapted from NCERT Class 10 Science (2024
  edition), page 87, by author Priya Sharma (reviewed 2026-03-15)."
- "This MCQ was authored by the My Tutor educational brain on
  2026-04-02, reviewed by Anita Verma."

Provenance is searchable: a content owner asking "what assets in
your catalogue derive from our 2024 NCERT chapter on optics?" gets
an immediate answer.

---

## 14. Anti-patterns explicitly rejected

- ❌ **Authoring without source attribution**. Every asset has a
  `sourceTraceId`, even if it's `internal:curator_dictation`. No
  anonymous content.
- ❌ **LLM-authored content reaching learners without curator
  review** *for high-traffic concepts*. (Long-tail concepts may
  ship `ai_authored` unreviewed initially with low quality prior —
  evidence raises or lowers their rank; curator queue catches the
  truly bad ones.)
- ❌ **Pretending external AI is a primary source**. It's raw
  material, like a book.
- ❌ **One curriculum = one set of assets**. Assets are concept-
  scoped; curricula are views. A CBSE-authored asset is reusable by
  ICSE if it matches the latter's pedagogical needs.
- ❌ **Skipping the misconception attachment**. Every MCQ probe's
  distractors are misconceptions (doc 01 § 3.3), not "things that
  sound wrong."
- ❌ **Mutating an asset to fix a bug**. Always version (doc 01 §
  6); the old version stays for evidence continuity.

---

## 15. Phase plan

Knowledge Acquisition is a multi-phase build:

- **Phase 2 (initial)**: implement the four core pipeline stages
  with manual ingestion (curators upload sources via a basic web
  form). Template-driven authoring for definitions. LLM authoring
  for explanations and probes. Review tooling minimal but
  functional.
- **Phase 3**: invest in extraction quality (better PDF segmentation,
  video transcription alignment, embedding-based concept matching).
  Predicted-quality classifier for the review queue.
- **Phase 4**: invest in curator productivity tools (drag-to-link,
  preview-as-learner, batched review). Multi-language editorial
  workflows.
- **Phase 5+**: streaming ingestion — a publisher uploads a textbook
  and the Brain produces a first-draft asset set within hours.

---

## 16. Why this design is right for the next 5 years

Knowledge Acquisition is the bottleneck for catalogue growth. Phase
1's design is right because:

1. **Provenance is preserved end-to-end** — every asset traces back
   to its source forever.
2. **Curator effort scales sub-linearly** — most assets are
   template-driven or LLM-authored with curator approve-only review.
3. **Misconceptions are acquired as first-class artifacts** — the
   research literature and the learner data feed the graph
   directly, not implicitly through asset content.
4. **Curricula are configuration** — a new curriculum is a
   selection and ordering, not a new asset set; the catalogue's
   value compounds across curricula.
5. **External AI is a tool, not the source** — the system can
   leverage GPT-N for drafts without making the catalogue depend on
   GPT-N's continued availability or output.

The decisive property is **the asset = source + content split**.
The current chat route loses the source link entirely (the model
"knows" Newton's second law from training; there's no citation).
Phase 1's catalogue can answer "where did this content come from"
for every assertion, which is foundational for the educational
standards bar (accreditation, content licensing, parental trust).
