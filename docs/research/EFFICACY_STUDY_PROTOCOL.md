# My Tutor Educational Efficacy Study — Protocol

Claude Recommendation #11. This document is the complete study design:
objectives, hypotheses, success criteria, eligibility, duration, sample
size reasoning, ethics, outcome metrics, and a full audit of which
existing telemetry answers each metric. It contains **no results, no
simulated data, and no student records** — it is the protocol the study
runs against once real students are using the product. See
`EFFICACY_STUDY_READINESS_AUDIT.md` for what remains before it can launch.

---

## 1. Objectives

**Primary objective**: determine whether learners who use My Tutor show
measurable learning gains (probe performance improving over the course of
instruction on a concept) and durable retention (forgetting risk staying
low after mastery) relative to their own baseline — a within-subject,
pre/post design, not a randomized controlled trial against an external
comparison group (My Tutor has no "control condition" to assign learners
to; see §4 Limitations).

**Secondary objectives**:
- Does the misconception-repair machinery (Educational Brain's
  detect→elicit→collide→replace→re-probe loop, Student Intelligence's
  dormant/active/regrowth model) actually resolve detected misconceptions
  at a meaningful rate, or do they recur?
- Does the Recovery Engine (stuck-learner scripts) correlate with a
  learner producing a passing probe afterward?
- Does the Spaced Retrieval Scheduler's review queue correlate with lower
  forgetting risk over time for learners who receive reviews vs. those who
  don't (a natural within-product comparison, not simulated)?
- Which subjects/concepts/Educational Packages are most and least
  effective, to prioritize authoring effort (this reuses the Failure
  Analytics Dashboard built under Recommendation #9 directly).

## 2. Hypotheses

| ID | Hypothesis | Direction |
|---|---|---|
| H1 | Probe pass rate on a concept improves from the learner's first exposure to their most recent attempt (within-subject learning gain). | Gain > 0 |
| H2 | A misconception's `activity` status transitions from `active` to `dormant` (a later passing probe exists) for the majority of detected misconceptions given enough subsequent evidence. | repair rate > 50% as a working threshold, revisited once real data exists — see §3 |
| H3 | Recovery events are followed by a passing probe later in the same lesson more often than chance would predict for that concept's baseline pass rate. | recoverySuccessRate > baseline pass rate |
| H4 | Concepts with at least one completed spaced review show a lower `forgettingRisk` at a later time point than concepts with no completed review, holding time-since-mastery roughly constant. | reviewed < unreviewed forgettingRisk |
| H5 | Time-to-mastery and completion rate vary meaningfully by subject and by Educational Package availability (packages outperform generated-content-only concepts). | packaged > non-packaged on completion rate |

## 3. Success criteria

This study is descriptive/observational (see Limitations), so "success"
is not a single p-value — it is a set of decision thresholds a human
reviewer (researcher + product owner) applies to the descriptive report:

- **H1 supported** if the cohort-level mean learning gain (second-half
  minus first-half probe pass rate, per concept, averaged across concepts
  with ≥ `MIN_SAMPLE` probes — see §7) is positive and the majority of
  individual concepts with adequate sample also show positive gain.
- **H2 supported** if the misconception repair rate (§7) exceeds 50% AND
  the mean regrowth count stays low (< 1 per misconception) — a high
  repair rate with high regrowth would mean "looks fixed, isn't."
- **H3 supported** if `recoverySuccessRates` (reused verbatim from
  Learning Analytics) shows the cohort-wide recovery success rate
  exceeding the cohort-wide baseline probe pass rate for the same
  concepts.
- **H4 supported** if the retention-trend comparison (§7) shows a lower
  mean `forgettingRisk` in the reviewed group than the unreviewed group at
  the follow-up window.
- **H5 supported** if `packageEffectiveness` (reused verbatim from the
  Failure Analytics Dashboard) shows higher probe pass rates and
  completion rates for concepts with a compiled Educational Package than
  concepts without one, at matched sample sizes.

No hypothesis is scored "supported/not supported" automatically by code —
the analysis pipeline (Phase 4) produces the descriptive numbers and
sample-size caveats; a human applies the thresholds above. This is a
deliberate design choice: automatically declaring statistical significance
without real inferential testing (see §12) would risk exactly the
fabrication this mission explicitly forbids.

## 4. Design and limitations

- **Design**: prospective, observational, within-subject pre/post
  comparison over real usage data. Not a randomized controlled trial —
  My Tutor has one product experience; there is no "control condition" to
  randomize learners into within this codebase. This is stated openly
  rather than manufacturing a fake control group.
- **Natural comparison groups that DO exist without simulation**: learners
  who received at least one completed spaced review vs. those who didn't
  (H4); concepts served by a compiled Educational Package vs. concepts
  without one (H5). Both are naturally-occurring splits in real usage
  data, not researcher-assigned conditions — appropriate for descriptive
  comparison, not causal claims.
- **Confound**: learners self-select what to study and when; usage
  intensity varies. The report's per-metric sample sizes and the
  engagement summary are surfaced precisely so a reader can judge whether
  a given number is trustworthy, rather than presenting every rate as
  equally solid.

## 5. Inclusion / exclusion criteria

**Inclusion** (a learner-window is eligible for the study if ALL hold):
1. Real registered account (`User.isDeleted = false`), not a test/QA/admin
   account. Operational note: this codebase has no `role` value dedicated
   to "test account" — the study operator must supply an explicit
   `participantUserIds` allowlist (real, consented users) rather than
   relying on filtering `User.role` alone. See `EFFICACY_STUDY_READINESS_AUDIT.md`
   §"Consent and cohort tracking" for why this must stay a manual,
   explicitly-approved allowlist rather than an automatic query.
2. At least `MIN_LESSONS_PER_LEARNER` (default 3) distinct lessons with
   evidence in the study window — an account that never engaged produces
   no learning-gain signal and would only dilute the sample.
3. Falls within the study's date window (`studyStart`–`studyEnd`).

**Exclusion**:
1. Accounts without explicit研究 consent (see Ethics §6 — this is an
   operator responsibility, not something the code can detect).
2. School Mode board/grade-prescribed sessions are analyzed the same way
   as Library sessions (the Evidence Loop already treats them uniformly),
   but a study scoped to one board/grade should pass `subjects`/board
   filters explicitly rather than mixing populations silently.

## 6. Ethical considerations

- **Consent**: every included learner must have given informed consent
  (or, for minors, guardian consent) to have their usage data analyzed for
  research purposes. This codebase has **no consent-tracking field today**
  (confirmed: no `consent`/`researchOptIn` column exists anywhere in
  `prisma/schema.prisma`) — the analysis pipeline therefore requires an
  explicit `participantUserIds` list as an operator-supplied input, never
  "everyone in the database." This is a hard requirement, not a
  suggestion — see the Readiness Audit for the full blocker list.
- **Minors**: the product serves school-age learners (School Mode grades
  are tracked). Any study population plausibly including minors requires
  guardian consent and should follow COPPA/GDPR-equivalent minimal-data
  practice — analysis outputs use pseudonymous internal `userId`s only,
  never name/email (verified: the analysis and report-generation code in
  Phase 4/5 reads only `LessonEvidence`/`StudentIntelligence`/evidence-loop
  fields, none of which carry name or email).
- **Data minimization**: reports never include verbatim learner text
  beyond what the Evidence Loop already stores (misconception phrases,
  bounded to 200 chars, already an existing, reviewed practice — not new
  exposure introduced by this study).
- **Risk to participants**: minimal — the "intervention" is ordinary use
  of the product's existing teaching flow; no experimental content or
  withholding of instruction is introduced by this study design.
- **Right to withdraw**: an operator must be able to remove a userId from
  `participantUserIds` at any time and re-run the pipeline; this is
  natively supported since the cohort list is a plain input parameter, not
  baked into a query.
- **Independent ethics review**: a real study should still go through an
  IRB or equivalent ethics review appropriate to the institution running
  it (school, university, or company research-ethics process) before
  launch — this protocol is necessary but not sufficient for that review.

## 7. Sample size assumptions

No prior effect-size data exists for this product (this is deliberately
not fabricated). Using conventional assumptions for a first observational
pass, adjusted for a within-subject design:

- Target: detect a medium effect (Cohen's d ≈ 0.5) in paired pre/post
  probe pass rate, α = 0.05, power = 0.8. For a paired-samples design this
  needs **n ≈ 34 learners** with adequate per-concept evidence (standard
  paired t-test sample-size table for d=0.5).
- Per-concept reliability floor: any concept-level statistic (learning
  gain, misconception repair, probe effectiveness) with fewer than
  `MIN_SAMPLE = 5` probe outcomes is flagged as a low-confidence caveat by
  the analysis pipeline (Phase 4), not silently included at full weight —
  this mirrors the existing `minSample` convention already used by
  `mostFailedConcepts`/`probeEffectiveness` in Learning Analytics (reused,
  not reinvented).
- Recommended minimum study population: **≥50 consented, actively engaged
  learners** (using the inclusion floor above) to have a reasonable chance
  of several concepts crossing the per-concept reliability floor
  simultaneously, though the pipeline runs and reports honestly at any n
  — small-n runs will simply carry more caveats.
- These are planning assumptions for power, not promises about what the
  data will show — no outcome is assumed or precomputed here.

## 8. Study duration

- **Baseline window**: first `BASELINE_WINDOW_DAYS` (default 14) of a
  learner's inclusion in the study — establishes each learner's starting
  probe performance per concept.
- **Observation window**: minimum 8 weeks of active use recommended
  before a first full report is meaningful (long enough for
  Spaced-Retrieval-Scheduler-driven reviews to actually occur — the
  scheduler's own default intervals run 1–90+ days depending on mastery
  solidity, per `spacedRetrievalScheduler.ts`).
- **Follow-up window** (for the retention-trend / H4 comparison):
  a second window at least `RETENTION_LAG_DAYS` (default 21 days,
  chosen because it exceeds the scheduler's shortest review interval)
  after a concept's mastery date, so a genuine "have they retained it"
  read is possible rather than measuring retention one day after
  mastery.
- Recommended total study length: **12 weeks minimum**, extensible; the
  analysis pipeline accepts an arbitrary `[studyStart, studyEnd]` window
  and an optional follow-up window, so re-running it at 12/24/36 weeks
  requires no code change.

---

## 9. Outcome metrics (Phase 2) — definitions and exact data sources

Every metric below maps to a **specific, already-existing** evidence
field or an already-existing computed statistic. None require new
telemetry (see §10 for the one genuine gap found).

| Metric | Definition | Data source (existing, reused) |
|---|---|---|
| **Learning gain** | Per concept: probe pass rate over the learner's second half of attempts minus the first half. Cohort learning gain = mean across concepts with ≥ `MIN_SAMPLE` probes. | `LessonEvidence.probes[].passed` (Evidence Reader) — NEW composition in Phase 4 (`computeLearningGain`), zero new telemetry. |
| **Mastery improvement** | Same underlying signal as learning gain, read per-concept via Student Intelligence's `ConceptState.masteryPct`/`mastered` flag, which itself derives from `TopicProgress`. | `StudentIntelligence.conceptStates` (reused verbatim, Recommendation #5). |
| **Misconception repair rate** | Fraction of detected misconceptions whose `activity` is `dormant` (a later passing probe exists) rather than `active`, plus mean regrowth count. | `StudentIntelligence.misconceptionHistory`/`activeMisconceptions` (reused verbatim) — NEW cohort rollup in Phase 4. |
| **Retention improvement** | Mean `forgettingRisk`/`ReviewQueueStats.avgForgettingRisk` at a follow-up window vs. a baseline window, split by whether the concept received a completed spaced review. | `spacedRetrievalScheduler.ts`'s `scheduleReviews`/`ReviewQueueStats` (Recommendation #8, reused verbatim) — NEW two-window comparison in Phase 4. |
| **Time to mastery** | Mean milliseconds from first evidence on a concept to the first mastered/progressing outcome. | `learningAnalytics.ts`'s `averageMasteryTime` (reused verbatim, Recommendation #9's Failure Analytics Dashboard already surfaces this). |
| **Recovery success** | Fraction of Recovery Engine activations followed by a passing probe later in the same lesson. | `learningAnalytics.ts`'s `recoverySuccessRates` (reused verbatim). |
| **Lesson completion** | Fraction of lessons (userId × sessionId × conceptId episodes) whose classified outcome is `mastered`/`progressing` vs. `abandoned`/`struggling`/`no_signal`. | `LessonEvidence.outcome` (Evidence Reader's `classifyLessonOutcome`, reused verbatim) — NEW rollup in Phase 4. |
| **Student engagement** | Sessions observed, lessons observed, abandoned-lesson rate, mean lesson span, longest inter-session gap, last-active date — per learner, then aggregated. | `StudentIntelligence.engagement` (`EngagementPattern`, reused verbatim) — NEW cohort aggregation in Phase 4. |
| **Package effectiveness** | Per-package probe pass rate, mastery distribution, and evidence-backed recommendations. | `packageFeedback.ts`'s `buildPackageFeedback` (reused verbatim, Recommendation #9). |
| **Subject effectiveness** | The above metrics, grouped by subject. | NEW in Phase 4: repeated composition of the SAME reused functions over subject-filtered lesson subsets — no new statistic invented. |

## 10. Data collection audit (Phase 3) — what exists, what's missing

**Fully covered by existing telemetry (zero gaps)**:
- Probe correctness, confidence, confusion, latency → `EvidenceEvent`
  (`PROBE_OUTCOME`), read via `evidenceReader.ts`.
- Misconception detection + verbatim phrase (bounded) →  `EvidenceEvent`
  (`MISCONCEPTION_DETECTED`).
- Recovery activation → `EvidenceEvent` (`LEARNER_FEEDBACK`,
  `recovery:<state>`).
- Mastery status/percent, attempts, revision count → `TopicProgress`.
- Mistake taxonomy → `MistakeRecord`.
- Teaching strategy posture per turn → `TeachingStrategyEvent`.
- Educational Package identity per concept → `brain/packages/*` via
  `PackageIndex`/`PackageInspector`.
- Voice timing signals (pause/hesitation/confidence proxy) →
  `voiceSignal.ts` (Recommendation #7), written as `LEARNER_FEEDBACK`
  `voice:*` events.
- Spaced-review scheduling state → derivable on demand from
  `StudentIntelligence` + `spacedRetrievalScheduler.ts` (no persisted
  schedule table needed; the scheduler recomputes deterministically from
  existing evidence every time it's asked, so there is nothing to audit
  for staleness).

**Genuine gaps (require an operator decision, not new code in this
mission)**:
1. **Consent / research opt-in.** No schema field exists. Required before
   any real learner's data may be analyzed. Resolution used by this
   protocol: an explicit, externally-maintained `participantUserIds`
   allowlist passed into the analysis pipeline — deliberately NOT solved
   by adding a schema column in this mission (a schema/consent-workflow
   change needs its own explicit approval and legal review, not a
   code-cleanup-style addition). See the Readiness Audit.
2. **Study-arm / cohort labeling.** No "which learners are in which
   comparison group" field exists, because this design doesn't need one —
   the two within-product comparisons used (H4 reviewed-vs-not, H5
   packaged-vs-not) are derived from existing evidence at read time, not
   assigned at signup. If a future study design needs true randomized
   arms, that would require a new field and product-level randomization —
   out of scope here.
3. **Long-horizon retention beyond the scheduler's own review cadence.**
   The Spaced Retrieval Scheduler's `ReviewQueueStats` gives an
   as-of-now snapshot; H4's before/after comparison requires the analysis
   to be **re-run at two different points in time** (baseline call, then a
   follow-up call weeks later) rather than reading two timestamps out of
   one snapshot — this is a study-operator scheduling requirement
   (documented in §8), not a missing telemetry field.

No new EvidenceEvent category, no new Prisma model, and no new writer
was added for this mission — every metric above is answerable from
telemetry that already exists after Recommendations #1–#10.

## 11. Reuse map (what Phase 4/5 code calls, verbatim, vs. composes new)

| Existing system | Reused as-is | New composition added |
|---|---|---|
| Evidence Loop (`evidenceReader.ts`, `evidenceLoad.ts`) | `readLessonEvidence`, `loadEvidenceCorpus` | Cohort filtering (`participantUserIds`, date window, `minLessonsPerLearner`) over the returned `LessonEvidence[]` |
| Learning Analytics | `averageMasteryTime`, `recoverySuccessRates`, `probeEffectiveness`, `mostFailedConcepts`, `mostCommonMisconceptions` | — |
| Student Intelligence | `buildStudentIntelligence`, `ConceptState`, `MisconceptionState`, `EngagementPattern` | Cohort-level rollups (learning gain, misconception repair rate, aggregated engagement) |
| Spaced Retrieval Scheduler | `scheduleReviews`, `ReviewQueueStats` | Two-window retention-trend comparison |
| Failure Analytics Dashboard | `buildPackageFeedback`, `aggregateReviewQueueStats`, `rankAuthoringPriorities` | — (passed through into the study report for context) |

## 12. Explicitly out of scope for this mission

- **Inferential statistics** (paired t-tests, confidence intervals,
  regression, effect-size computation beyond the planning assumptions in
  §7) — the raw metrics export (Phase 5) is designed to feed real
  statistical software (R, Python/statsmodels, SPSS) for that analysis.
  Implementing ad-hoc significance testing in this codebase risks
  producing p-values without the rigor a real stats package/reviewer
  would apply — deliberately not attempted here.
- **A schema change for consent/cohort tracking** — see §10, gap 1/2.
- **Any change to Tutor Max, the Educational Brain, EduOS, or Student
  Intelligence's own computation logic** — this mission only reads their
  existing outputs.
- **IRB/ethics board submission** — this protocol is an input to that
  process, not a substitute for it.
