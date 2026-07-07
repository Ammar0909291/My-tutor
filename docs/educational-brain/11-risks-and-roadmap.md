# 11 · Risks and Roadmap

> *Every architecture lies. This document is where Phase 1 tells the
> truth about what could go wrong and what should happen next.*

---

## 1. The risks, ordered by severity

### R1 — The asset-catalogue bet doesn't pay off (severity: critical)

**Hypothesis**: most learner turns can be served by retrieval of a
finite catalogue of assets, with LLM authoring filling the long
tail. Asset-hit rate trends toward 99 %+ over years.

**Failure mode**: learner asks are so varied that the catalogue
never densifies; ADI plateaus at 0.3-0.5 forever; the AI cost is
permanent; the architecture's economic argument fails.

**Why it could happen**:
- Learners ask far more variations than expected ("explain Newton's
  second law" vs "explain Newton's second law using cricket" vs
  "explain Newton's second law to my 5-year-old"); each combination
  is a separate cell.
- Curators can't keep up with the demand for stylistic variants.
- The Evidence Engine can't distinguish a long-tail asset's "low
  evidence" from "low quality"; ranking degrades.

**Mitigations**:
- **Style canonicalization**: cluster learner-request phrasings into
  a small number of canonical styles before retrieval (5-10 per
  language × grade). Cells are coarser; catalogue density is higher.
- **Cold-start priors**: AI-authored assets with no evidence get
  a confidence-weighted prior from siblings (other assets on the
  same concept). A new variant inherits siblings' average rank
  until evidence accumulates.
- **Coverage triggers** (doc 04 § 9, trigger 3): generation-burst
  detection auto-commissions diversification. The Brain authors
  toward coverage gaps, not on random demand.

**Recovery path**: if catalogue density doesn't grow as designed,
the Brain reverts to a hybrid model — retrieval where possible,
generation with cost limits otherwise. ADI stays elevated but the
catalogue continues to grow; year-3 has more retrieval than year-1
even under the pessimistic case. The architecture survives; the
economic numbers shift.

### R2 — Curator capacity is the actual bottleneck (severity: critical)

**Hypothesis**: a small team of curators (10-50) can maintain a
catalogue of 10 M assets, supported by AI authoring + a review
queue.

**Failure mode**: review queues back up; AI-authored content sits
in `status='REVIEW'` for months; the catalogue doesn't grow at the
rate the Brain needs; gaps proliferate.

**Why it could happen**:
- Review of an asset is harder than expected (curator needs to
  verify against source, check for misconceptions, evaluate for
  grade-appropriate language, etc. — taking 10+ minutes per asset).
- Diversifying for 50 cells per concept × 1M concepts = 50M
  candidate assets requiring review.

**Mitigations**:
- **Tier the review burden**: `urgent` queue (learner-flagged
  content; SLA 24h) gets ~80 % of curator attention. `high` queue
  for high-traffic concepts. `normal` for long tail (may be many
  weeks in queue without harm).
- **Predicted-quality classifier** (doc 07 § 7): trained on prior
  curator accept/reject decisions; prioritizes easy reviews first.
  A curator may approve-as-is 60 % of items in 10 seconds each.
- **Template-driven authoring** (doc 07 § 6) eliminates LLM-author-
  then-review for the ~40 % of assets a template can produce.
- **Selective auto-publish for low-stakes content**: long-tail-
  language definitions can ship with `provenance='ai_authored'`
  and low confidence prior; the Evidence Engine deprecates the bad
  ones over time. Curators only review high-traffic content.

**Recovery path**: if curator capacity is truly insufficient at
launch, the Brain restricts auto-publish to a smaller asset
universe (only definitions, only high-confidence template outputs)
and accepts a longer cold-start period per language.

### R3 — Misconception taxonomy is incomplete or wrong (severity: high)

**Hypothesis**: a finite, curated taxonomy of misconceptions (~5,000
at maturity) covers the population's actual wrong beliefs.

**Failure mode**: real misconceptions aren't in the taxonomy; the
Brain can't detect or repair them. Learner mistakes look "novel" to
the system; the asset-improvement loop stalls.

**Why it could happen**:
- Misconception research is patchy outside Western STEM curricula.
- Cultural / linguistic / curriculum-specific misconceptions are
  unrepresented in the academic literature.
- New misconceptions emerge over time (a new exam-board emphasis
  creates a new student-error pattern).

**Mitigations**:
- **Learner-data clustering** (doc 07 § 11): the Evidence Engine
  surfaces "candidate misconception clusters" from real student
  wrong answers; curators name them and add them to the taxonomy.
- **Per-curriculum extensions**: misconceptions can carry a
  curriculum tag, so a CBSE-specific misconception lives in the
  graph without forcing other curricula to adopt it.
- **Open feedback channel**: teachers can submit misconceptions
  through the curator-queue path with a "this is how my students
  mess this up" form.

**Recovery path**: the taxonomy grows over time; year-1 misses
matter less if year-3 covers the gap. The Brain functions without
a complete taxonomy (it just doesn't *repair* the missing-from-
taxonomy mistakes as well).

### R4 — Evidence is noisy enough that rankings are unstable (severity: high)

**Hypothesis**: the Evidence Engine's per-asset scores converge to
stable rankings within ~500 evidence events per asset.

**Failure mode**: rankings flap; the same asset is top-rank one day
and demoted the next; learners see inconsistent experiences.

**Why it could happen**:
- Evidence weights are wrong (a weight overweights re-asks).
- Stratification cells are too small (10 events split across 50
  cells = 0.2 events per cell — noise dominates).
- Demographic distributions shift over time (new schools onboard;
  evidence aggregations drift).

**Mitigations**:
- **Smoothing**: exponentially-weighted with 30-day half-life
  (doc 04 § 6) damps noise.
- **Coarsening on under-sampled cells**: fall back to parent cell
  when sample size < 30 (doc 04 § 7.2). Prevents stratification
  noise from harming new cells.
- **Promote-only-when-confident**: ranking changes that move an
  asset across the `status='ACTIVE'` boundary require
  `qualityConfidence > 0.7` AND `sampleSize > 500`. Most evidence
  shifts the score, not the active set.

**Recovery path**: weights and stratification are configurable
(`brain.config/evidence.json`); a noisy week triggers an experiment
to retune.

### R5 — The Decision Pipeline's 10 stages become 20 (severity: medium)

**Hypothesis**: 10 stages are sufficient.

**Failure mode**: real-world requirements force stages to multiply
(per-curriculum stage, per-language stage, per-device stage); the
pipeline becomes the very mess it was meant to replace.

**Why it could happen**:
- Cross-cutting concerns (telemetry, A/B routing, accessibility) get
  added as new stages instead of orthogonally.
- Branches multiply ('school' / 'personal_tutor' / 'recovery' /
  'placement' / 'cohort' / 'practice_only' / ...).
- Stage budgets are violated; a stage becomes two to fit budget.

**Mitigations**:
- **Cross-cutting middleware**: orthogonal concerns are wrappers
  around stages, not new stages. Observability, A/B routing,
  authentication, rate-limiting — all middleware.
- **Branch budget**: hard cap on the number of named branches (5);
  beyond that, branches collapse into orthogonal flags on
  TurnContext.
- **Architectural review for any new stage**: changing the stage
  count requires updating this doc set; not a casual PR.

### R6 — Multi-language scaling exposes structural assumptions (severity: medium)

**Hypothesis**: the schema's per-asset `language` field scales to
hundreds of languages.

**Failure mode**: some languages need things the schema doesn't
support (right-to-left layout for `recharts` visuals; sandhi rules
for Sanskrit probes; multi-script content with mixed Devanagari +
IPA + English).

**Why it could happen**:
- Phase 1 was written by a Latin-script-language speaker. Bias is
  inevitable.
- The 'gradeBand' enum is K-12-centric; international K-12 grade
  systems differ.

**Mitigations**:
- **Linguistically diverse review of Phase 1 docs** before Phase 2
  commits to the schema. (Action item: get a Hindi linguist and a
  Sanskrit linguist to review docs 01 + 02 + 07 + 10.)
- **Extensibility**: family tables (Explanation / Visual / Probe)
  can grow new columns for new language needs; the `AssetIdentity`
  hub stays stable.
- **Pilot in 2-3 languages before claiming N-language support**:
  English, Hindi, and one of (Sanskrit, Tamil, Arabic) — diverse
  enough to surface most assumption breakages.

### R7 — The schema rewrite is rejected because the existing system "works" (severity: medium)

**Hypothesis**: stakeholders see the value in Phase 1 and approve
Phase 2.

**Failure mode**: "we already have a chat tutor that ships; don't
break it"; Phase 2 is incrementally absorbed into the existing
codebase without the structural changes, defeating the design.

**Why it could happen**:
- The current system has real users.
- The chat route works "well enough" for the current learner volume.
- Phase 2's value (lower ADI, better assets, evidence engine) is
  realized over years, not weeks; near-term pressure favors features
  over restructure.

**Mitigations**:
- **Non-destructive migration** (doc 10 § 9): the new schema lives
  alongside the old; the new chat route is feature-flagged. No
  user-visible breaking change.
- **Quantified-ROI argument**: doc 09 § 7 gives the AI-cost
  comparison ($430M/year vs $2M/year at Year-5). Numbers, not vibes.
- **Phase 2 ships an observable win in the first 30 days**: even
  partial Phase 2 (just the asset catalogue for one subject, just
  the Decision Pipeline for school mode) produces measurable
  improvements in the rate of "no scene rendered" / "wrong scene"
  bugs. Demonstrate the win early.

### R8 — Curators write low-quality assets, but the Evidence Engine ranks them high because they're popular (severity: medium)

**Hypothesis**: popularity correlates with quality.

**Failure mode**: a curator-written asset that's wrong-but-engaging
ranks higher than a correct-but-dry alternative; the Brain serves
the engaging-wrong asset; learners learn wrong things.

**Why it could happen**:
- Engagement signals correlate weakly with learning outcomes.
- Probe outcomes can be gamed (a probe with easy distractors makes
  any preceding explanation look effective).

**Mitigations**:
- **Probes are also validated** for difficulty (doc 01 § 7 Layer 2);
  easy-distractor probes are rejected. Probes that don't
  discriminate (everyone passes / everyone fails) lose ranking via
  the Evidence Engine's discriminationScore.
- **Layer-3 consistency validation** (doc 01 § 7): asset content is
  checked against the canonical definition; a wrong-engaging asset
  that contradicts the canonical definition fails to publish.
- **Summative outcomes are the highest-weighted signal** (doc 04
  § 4): end-of-chapter quizzes and assessments dominate over
  in-the-moment engagement. Learners who *liked* an asset but
  failed the summative move the asset's score down.

### R9 — Privacy regulations evolve faster than the schema (severity: medium)

**Hypothesis**: per-learner data can be retained at the granularity
the Brain needs; aggregate data can be retained longer for the
Evidence Engine.

**Failure mode**: a future regulation (GDPR-strengthening,
COPPA-equivalent rollout, jurisdiction-specific child-data rules)
requires schema changes the Brain can't easily accommodate.

**Why it could happen**:
- Different jurisdictions, different rules.
- Right-to-be-forgotten cascades across many tables.
- Long-term Memory snapshots may need PII removal retroactively.

**Mitigations**:
- **Hash-redact-on-deletion**: doc 05 § 13.3; the Brain replaces
  `userId` with a hash on account deletion. Aggregate evidence
  survives without identifiability.
- **PII centralization**: only `Profile` and `LearnerConceptMastery`
  carry PII; everything else uses `userIdHash`. A jurisdiction-
  specific cap on PII retention only affects two tables.
- **Per-jurisdiction config**: `BrainConfig` can carry per-
  jurisdiction policies (retention windows, anonymization
  thresholds, opt-in defaults). New jurisdiction = new config
  entry.

### R10 — A breakthrough LLM model invalidates the asset-catalogue argument (severity: low)

**Hypothesis**: LLM call costs and quality remain in a regime where
caching authored assets is economically better than always-
generating.

**Failure mode**: a 100× cheaper / 100× faster LLM becomes available;
generating fresh per turn is suddenly cheap enough that the asset
catalogue's investment is wasted.

**Why it could happen**:
- Model costs have dropped ~10×/year for some classes.
- Distilled local models might run on-device for free.

**Mitigations**:
- **The catalogue still has value beyond cost**: assets carry
  provenance, validation, evidence. A generated reply has none of
  those. The catalogue is the auditable record of *what the Brain
  teaches*, not just an optimization.
- **Schema-compatible with on-device authoring**: if a learner
  has a capable local model, the Brain can offload authoring to it
  (Type D offline call running on the user's device). The asset
  format stays the same; the source is "learner_local_model_v1"
  instead of "groq_oss_20b".
- **The principle holds at any cost**: "every AI call shrinks the
  LLM's role" still produces a more determinable, auditable, and
  reproducible system, even if cost stops mattering.

**Verdict**: low-severity because the architecture survives the
breakthrough; just one of its arguments weakens.

---

## 2. The recommended Phase 2

Phase 2 is the implementation of Phase 1's design. It is NOT "build
everything at once"; it is "build the spine, slot existing engines
into it, measure."

Suggested structure:

### Phase 2 milestone 1 — Spine + asset catalogue for ONE subject (8 weeks)

- Build the new schema tables (additive; doc 10 step 1).
- Seed `Concept` from the existing physics knowledge graph.
- Seed `Misconception` from the existing 20+ misconception rules.
- Implement Decision Pipeline stages 0-2 (Frame, Intent, Retrieval)
  + minimal Composition + Persist.
- Build the curator UI for Explanation authoring (high-quality
  starting catalogue for physics).
- Feature-flag the new route for 1 % of physics-mode users.

**Success criterion**: the new pipeline serves a real physics
question end-to-end, with a retrieved Explanation asset, with
Evidence emitted, in less than 600 ms p99.

### Phase 2 milestone 2 — Evidence Engine on (4 weeks)

- Implement the EvidenceEvent append-only log.
- Implement 60-second rolling-window aggregator.
- Wire `AssetIdentity.qualityScore` to be updated by the aggregator.
- Build the observability dashboard.

**Success criterion**: ranking is responsive to learner outcomes
within 1 hour of evidence accumulation.

### Phase 2 milestone 3 — Visual + Probe families (6 weeks)

- Schema for Visual and Probe families (doc 10 § 4).
- Refactor existing visual engines into authoring backends (doc 08
  § 15).
- Migrate parametric scene generator outputs to Visual asset cache.
- Migrate generateVisualizationCode (3D engine) outputs to Visual
  asset cache (the in-progress 3D upgrade in commit 7a0017c becomes
  the dynamic-LLM authoring backend).
- Implement Probe authoring + InlinePractice integration.

**Success criterion**: a learner asking the same visual concept
twice gets the same visual (retrieval-second-time), with evidence
attached to the visual asset.

### Phase 2 milestone 4 — Memory rationalization (4 weeks)

- Migrate `TopicProgress` → `LearnerConceptMastery` with decay.
- Migrate `MistakeRecord` history → `LearnerActiveMisconception`.
- Implement Session Memory in Redis.
- Implement the read-only/write-only credential separation.

**Success criterion**: the persist stage is the only writer of
Student Memory; PRs adding direct writes elsewhere are rejected.

### Phase 2 milestone 5 — Two more subjects + multilingual (8 weeks)

- Onboard two more subjects (math + biology, say).
- Onboard Hindi as a second language (translations + native
  authoring).
- Begin Knowledge Acquisition pipeline minimal viable build.

**Success criterion**: 50 % of physics+math+biology+English+Hindi
turns served by retrieval; ADI < 0.5 for those subjects.

### Phase 2 total: ~30 weeks (~7 months) for the spine + 4 subjects + 2 languages

After Phase 2, the Brain is operating per Phase 1's specification
for a meaningful slice of the platform. Phase 3 expands subjects,
languages, and curator capacity; Phase 4 adds advanced authoring
backends (animation, interactive widgets); Phase 5+ pursues the
AI-independence roadmap (doc 06 § 11).

---

## 3. What Phase 1 deliberately did NOT design

Honest scoping. Things that will eventually need design docs of
their own:

- **Curator UI** (the editor, the queue dashboard, the
  preview-as-learner tool). Phase 3.
- **The asset-bundle concept** (an Explanation + its matching
  Visual + its matching Probe as a "lesson"). Likely Phase 2 §5
  derives this.
- **Real-time co-teaching / classroom mode** (broadcast a lesson to
  many learners simultaneously). Phase 5.
- **On-device deployment** of the Brain (necessary precondition for
  ADI → 0 in offline contexts). Phase 6+.
- **Voice mode end-to-end** (the Brain's design works for voice
  with no change beyond TTS/STT plumbing; specification of voice-
  specific assets is a future doc).
- **Curriculum recommendation engine** (which curriculum should a
  new learner choose?). Likely Phase 3.
- **Career roadmap integration** (linking concepts mastered to
  job-relevant skills — partially present in existing
  `CareerProfile` model). Phase 4.

---

## 4. The decision the Phase 1 review must make

Three possible verdicts on this document set:

### Verdict A — Approve and start Phase 2 milestone 1

The architecture is sound. Begin building the spine for one subject.
Expected commitment: 8 weeks of engineering for milestone 1, then
re-evaluate.

### Verdict B — Approve with named revisions

Specific docs require changes before Phase 2 begins (e.g., "the
asset model needs an `interactive_widget` family upgrade before
schema commits"). Phase 1 returns with revisions; Phase 2 begins
after re-approval.

### Verdict C — Reject and restart

The Phase 1 design is judged structurally wrong. A new architect
restarts from a different first-principle. (Unlikely; flagged for
completeness.)

The author of this document recommends **Verdict A**, with a
specific request to subject docs 02 (graph) and 10 (schema) to a
linguistically-diverse review before Phase 2's schema migration is
written.

---

## 5. The single most important thing this document set commits to

> **The Brain is an asset catalogue, not an LLM pipeline.**

Every architectural argument in docs 01-10 flows from that
commitment. Decision Pipeline retrieves assets. Memory tracks which
assets a learner saw. Evidence ranks assets. Acquisition produces
assets. Visualization is an asset family. AI is the rare-but-
necessary tool for *authoring* an asset, not for *deciding* one.

If Phase 2's implementation honors that commitment, the Brain will
become what the constitution asks for: a system that can eventually
teach without depending on external AI, because it owns its
knowledge as data.

If Phase 2's implementation drifts from that commitment — if it
ends up calling LLMs on the read path "just in case" or
"because it's flexible" — the architecture collapses into the same
shape as the current chat route, more elaborate, no better.

The discipline to hold the line on "assets, not generations" is
the project's single most important success factor.
