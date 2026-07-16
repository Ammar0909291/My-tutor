# Efficacy Study Readiness Audit (Phase 6)

Claude Recommendation #11. Written after the analysis pipeline and report
generators were built and tested (see `EFFICACY_STUDY_PROTOCOL.md` for the
design). This audit lists, honestly, what still blocks running a real
study — nothing here is downplayed to make the system look more ready than
it is.

## What is ready today

- **Telemetry**: every outcome metric in the protocol (§9) maps to
  existing, already-collected evidence (`EvidenceEvent`, `TopicProgress`,
  `MistakeRecord`, `TeachingStrategyEvent`, `brain/packages/*`). No new
  telemetry was added or is required — confirmed by the audit in
  protocol §10.
- **Analysis pipeline**: `src/lib/research/efficacyAnalysis.ts` computes
  learning gain, misconception repair rate, lesson completion rate,
  cohort engagement, retention trend (given two time windows), and
  per-subject effectiveness — all as pure, deterministic, tested
  functions over real evidence. 26 tests pass, covering empty-cohort
  handling, determinism, and low-sample flagging.
- **Report generation**: `src/lib/research/reportGeneration.ts` produces
  a researcher report, an educator report, an executive summary, and a
  raw CSV/JSON export — all pure renderers over the same report object.
  17 tests pass.
- **Runnable entry point**: `scripts/generate-efficacy-report.ts` takes a
  config file (participant allowlist + date window(s)) and writes all
  four reports to disk. It refuses to run without an explicit,
  non-empty `participantUserIds` list — it will never silently treat
  "everyone in the database" as the study cohort.
- **Ethics-by-construction**: reports never surface name/email/any PII —
  every field flows from `LessonEvidence`/`StudentIntelligence`, which
  carry only pseudonymous `userId`s and pedagogical signals.

## Remaining blockers before a real study can launch

These are genuine gaps — none can be closed by more code in this
repository alone; each needs an explicit human/process decision.

1. **Informed consent process.** No schema field, no UI flow, and no
   legal/ethics review exists for asking real learners (or their
   guardians, for minors) to consent to research analysis of their usage
   data. This is the single hard blocker: without it, no `participantUserIds`
   list can be ethically populated, regardless of how ready the code is.
   **Owner**: product/legal, not engineering.
2. **IRB or equivalent ethics review.** The protocol document is an input
   to that review, not a substitute for it. **Owner**: whichever
   institution (school, university, or company research-ethics process)
   is sponsoring the study.
3. **A real, sufficiently large, consented cohort.** The pipeline runs at
   any n, but the protocol's own planning assumptions (§7) recommend
   ≥34 participants for a first meaningful pass, and ≥50 to comfortably
   clear per-concept sample floors on several concepts at once. Today
   there is no consented research cohort — this requires recruitment,
   not code.
4. **A decision on inferential statistics.** This codebase deliberately
   stops at descriptive statistics (rates, means, deltas) and exports raw
   data for external analysis. Before publishing any "significant"
   finding, a qualified analyst (or the study's statistician) needs to run
   the CSV/JSON export through real statistical software and apply
   appropriate tests — this was explicitly left undone here, not
   forgotten.
5. **Operational decision on study window(s).** The protocol recommends a
   12-week minimum with a follow-up window at least 21 days after
   mastery for the retention-trend comparison (H4). Someone must actually
   schedule and run `generate-efficacy-report.ts` twice — once for
   baseline, once for follow-up — no code change is needed to do this,
   but it hasn't happened yet because no study has started.
6. **Verification against live production data.** All 43 new tests run
   against hand-built fixtures (as they must — this mission explicitly
   forbids simulating students or inventing data). The pipeline has
   **not** been run against a real production evidence corpus yet,
   because no consented cohort exists to run it against. The first real
   invocation should be treated as a dry run: sanity-check the cohort
   counts and caveats before trusting the report content.
7. **Board/grade population-mixing decision.** School Mode and Library
   Mode evidence are both readable by this pipeline (the Evidence Loop
   already treats them uniformly), but a study scoped to a specific
   board/grade should pass an explicit `subjects` filter and a matching
   `participantUserIds` list rather than mixing populations — this is a
   study-design choice for the operator to make per protocol §5, not
   something the code enforces automatically (deliberately: enforcing it
   in code would require a schema-level cohort/consent field, which is
   blocker #1, not a smaller technical add-on).

## What would make blocker resolution easier (not required to start)

- A lightweight, explicitly-approved schema addition for consent tracking
  (e.g., a `researchConsent` timestamp on `Profile`) would let the
  `participantUserIds` allowlist be derived from real consent records
  instead of manually maintained — but this is a schema/product decision
  requiring its own approval, intentionally not made in this mission.
- If the study eventually needs true randomized comparison arms (rather
  than the two naturally-occurring within-product splits used here —
  reviewed vs. not-reviewed, packaged vs. not-packaged concepts), that
  would need a new cohort-assignment mechanism at signup — a larger
  product change, out of scope here.

## Bottom line

The **code and analysis infrastructure are ready**. The **study itself
cannot start** until consent (#1) and ethics review (#2) are in place and
a real cohort (#3) exists — those are process/legal blockers, not
engineering ones, and this mission correctly stopped at the boundary
between "build the instrument" and "run the study."
