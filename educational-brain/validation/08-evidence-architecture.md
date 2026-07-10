# Evidence Architecture — the Brain as Instrument

**The evaluation standard changed.** Under the First-Principles Review
("Why would anyone choose My Tutor?"), the Educational Brain is no
longer judged by document count, concept coverage, or explanation
quality — all of which future general LLMs replicate. It is judged by
one question:

> **Does this component generate proprietary educational evidence that
> no general AI can ever possess?**

This audit re-reads the entire tree against that question. It
classifies every library by moat density, states the **evidence
contract** every major component owes after each teaching interaction,
names the loops where the Brain currently teaches but learns nothing
(architectural defects), and answers the million-student question.

The honest headline first: the Brain is better instrumented ON PAPER
than the prior reviews credited — `decision-engine/08 §3` is already a
per-turn evidence contract, `student-state/06 §7` already mandates
recovery-event capture, `decision-engine/05` law 3 already mandates
escalation logging, `first-lesson/08` is already a full failure→
artifact loop. The defect is not that evidence thinking is absent; it
is that these contracts are scattered, stated per-learner only (almost
never aggregated cross-learner), and several major components have no
contract at all. This document unifies them and fills the holes.

---

## 1. Moat classification — every library

| Library | Primarily produces | Moat | Notes |
|---|---|---|---|
| `assessment/` | Instruments: probes, gates, calibration pairs, autopsies | **HIGH** | Probe designs manufacture verified state — the moat's raw material. The golden-probe and distractor-map patterns are evidence machines. |
| `misconceptions/` | Birth taxonomy + repair outcomes framework | **HIGH** | The flagship: birth type × repair × regrowth is the single richest proprietary dataset the platform can accumulate. |
| `student-state/` | The evidence STORE specification (ledger, twin, trajectories) | **HIGH** | This library IS the per-learner evidence schema in prose form. |
| `placement/` | Verified-frontier instruments + trust model | **HIGH** | Placement probes produce evidence; the trust tables (02 §2) are cohort-tunable priors — see missing loop L6. |
| `first-lesson/` | Hard limits + the failure→artifact loop | **HIGH** | 08 is the tree's model evidence loop. C1–C4 are measurable completion events. |
| `decision-engine/` | Decisions + the per-turn update contract | **MIXED-HIGH** | 08 §3 (learner-model update contract) and 05 law 3 (count everything) are evidence contracts. 02's state classifications are evidence IF logged with outcomes (loop L5). 06 (conversation engine) is mostly stance prose — LOW as evidence producer, and that is acceptable: enforcement content, not instrument content. |
| `teaching-actions/` | The action catalog | **MIXED** | The catalog itself is prose a future LLM could approximate. Its moat value is entirely in the action→outcome statistics it enables (filter 5's affinity data per-learner; cross-learner effectiveness per action × knowledge type × age — loop L4). |
| `foundations/` | Recovery scripts, the D1 grid, voice model, principles | **MIXED** | Recovery engine: HIGH via 06 §7's capture mandate. D1 grid: HIGH — it is the classification instrument that labels every response with the quadrant evidence depends on. Voice model: honest LOW today (§7 channel reality — the signals are discarded before capture). Principles: prose, LOW as evidence, retained as enforcement spec. |
| `concepts/` entries | Split verdict per section | **SPLIT** | Misconception libraries, golden probes, gate sets, verbatim phrases: HIGH — these are per-concept instruments. Explanation/analogy/demonstration prose: LOW per the First-Principles Review — future-generatable; their durable value is only the outcome score that attaches to them once served and measured. The authoring pivot: skeleton-first (probes + misconceptions + gates), prose-last. |
| `validation/` | Audits of the tree itself | meta | Not a teaching component. |

---

## 2. Evidence contracts — what every component owes after each interaction

Stated against the evidence schema the architecture already owns
(ADR 13's append-only event log: conceptId, category, outcome,
strength, context — referenced, not redesigned; no schema work here).
Only metrics that demonstrably improve future teaching are listed —
nothing is measured for measurement's sake.

**ASSESSMENT** — after every item:
- probe outcome: item identity × correctness × latency-vs-baseline ×
  stated confidence × behavioral confidence (the calibration pair,
  `assessment/04 §3`) × which distractor if wrong (distractor choice
  IS misconception evidence — the distractor map makes wrong answers
  informative)
- after every gate attempt: which components passed (production /
  new-surface / mixed / delayed), gate open/hold decision
- after every autopsy (`assessment/09`): the diagnosed failure cause
  (one of the six) — cause frequencies per concept are authoring flags

**DECISION ENGINE** — after every turn (this IS `decision-engine/08 §3`,
restated as the canonical contract): state estimate + confidence,
strategy chosen (the 8-set), matrix cell fired, machine position
change. Plus the one addition the contract lacked: **the next-turn
outcome joined to the previous decision** — a decision logged without
its consequence is a diary, not evidence (loop L5).

**RECOVERY** — after every recovery event (already mandated per-learner
by `student-state/06 §7`): entering state, script/move used, what
followed (resumed / shrunk / session ended), time-to-restore. Missing
half: cross-learner aggregation (loop L1).

**TEACHING ACTIONS** — after every action: action identity × concept ×
knowledge type × learner state entering × what followed (the affinity
row `decision-engine/08 §3` already requires per-learner). Missing
half: the same row aggregated across learners = the empirical
effectiveness table for all 27 actions (loop L4).

**PLACEMENT** — after every placement: self-reported level, trust
prior applied, probes run, frontier found, miscalibration direction.
Plus the deferred consequence: first-two-weeks performance vs. placed
frontier = placement accuracy evidence (loop L6).

**STUDENT STATE** — the store, not a producer; its contract is
integrity: every field evidence-backed and dated (its own LAW 1),
nothing written without a generating event.

**CONCEPT ENTRY** — every authored claim in an entry is a testable
prediction, and each owes its test: the golden probe (predicted to
detect M-n) → does it, measured; the predicted birth type → confirmed
by the diagnostic procedure's outcome; the anti-analogy list (predicted
backfires) → confirmed/refuted by type-6 birth events traced to
sources (loop L2); the dispatch order → outperformed or not by
measured action outcomes. **An entry is not just teaching content; it
is a bundle of falsifiable predictions about real learners.** This
reframe is the strongest single upgrade this audit makes to the
concepts layer.

**MEMORY** — after every review item: interval, outcome, latency →
per-learner forgetting rate (already specified, `student-state/07 §3`).
Missing half: per-CONCEPT decay norms across learners (loop L3).

**TRANSFER** — after every transfer-distance item: distance (near/far/
cross-subject) × outcome — feeds gate evidence per-learner; aggregated,
it reveals which concepts transfer poorly for everyone (a curriculum
finding, not a learner finding).

**CURIOSITY / MOTIVATION** — honest minimum, no invented metrics:
curiosity hook fired × engagement-signal following (drive-band state
next turns); at scale this ranks hooks per concept. Deeper motivation
telemetry is deferred until that library exists — a contract for an
unauthored component would be fiction.

---

## 3. Missing evidence loops — where the Brain teaches but learns nothing

Each is an architectural defect by this audit's standard: a teaching
event that improves the learner but not the Brain.

**L1 — Recovery efficacy never aggregates.** `student-state/06 §7`
builds the per-learner what-restores list, but no contract aggregates
across learners: which script, for which entering state, at which age,
restores fastest. A million recovery events currently would produce a
million private appendices and zero shared science. Fix (contract, not
schema): recovery events are aggregable by (state × script × age-band
× outcome) — the Recovery Engine's script SELECTION should eventually
read cohort priors the way the classifier reads personal ones.

**L2 — Anti-analogy lists don't grow from evidence.** The escalation
engine (`05 §2`) already orders: on a documented backfire, "flag the
source that used it." But the loop back into the concept entry's
anti-analogy list is a prose duty with no event. Every Type-6
misconception birth where the learner names the source analogy
(`misconceptions/01 §6` — the one type where self-diagnosis works) is
a confirmed anti-analogy observation. The entry's anti-analogy section
should be understood as a LIVING list seeded by the author and grown
by these events — the clearest case of authored-prediction-meets-
measured-outcome in the tree.

**L3 — No per-concept decay norms.** The memory engine personalizes
per-learner forgetting rates but nothing accumulates per-CONCEPT decay
across learners. Some concepts decay faster than any default schedule
assumes (the KG's estimated_hours has no decay analog). A
concept-level half-life table, learned from review outcomes, is
teaching science that exists nowhere — including in any training
corpus — and it directly retunes every future learner's schedule.

**L4 — The 27-action catalog has no outcome table.** Filter 5 uses
per-learner affinities; nothing specifies the cross-learner
aggregation: action × knowledge-type × age-band × entering-state →
outcome distribution. This is the empirical answer to "which teaching
action actually works" — currently a table with authored priors and no
mechanism to correct them. The catalog's persona notes and setup
costs should be read as hypotheses awaiting this data.

**L5 — Decisions are never joined to consequences.** The decision
matrix fires a cell; the update contract logs the state; but no
contract requires joining decision N to the observed state at turn
N+1. Without the join, the matrix can never be empirically corrected
— a cell that reliably produces FRUSTRATED next-turn would look
identical to one that works. The join is the difference between a
rulebook and a self-correcting instrument.

**L6 — Placement priors never retune.** `placement/02 §2`'s trust
table (adult beginner 45%, advanced 50%...) is authored intuition.
Each placement produces, two weeks later, ground truth (was the
frontier right?). Nothing feeds it back. At cohort scale, the trust
table should be the most empirically grounded table in the tree —
currently it is the least.

**L7 — Curriculum feedback is prose, not events.** Concept entries
carry a "curriculum feedback" section (missing prerequisite edges,
difficulty mislabels) — feedback to the Curriculum Production Pipeline
as text nobody queries. Every prerequisite-repair event that finds a
gap the KG didn't predict, every stall at a node whose difficulty tag
said otherwise, is a KG-validation observation. Aggregated, this is
the empirical audit of the curriculum itself — evidence the pipeline
could consume on its own authority (the KG remains theirs; the Brain
supplies observations, never edits).

**L8 — Voice evidence is structurally forfeited** (already documented,
`foundations/03 §7`): latency/prosody/hesitation are captured
client-side and discarded. Restated here only because this audit's
frame sharpens the loss: it is not a missing feature, it is evidence
of the highest diagnostic grade thrown away before capture. The
cheapest recovery (verbose_json timestamps) is already costed there.

---

## 4. The authoring pivot (consequence for all future Brain work)

From this audit forward, within the Brain's own authoring track:

1. **Concept entries are authored skeleton-first**: misconception
   library (verbatim phrases, probes, collision designs), golden
   probes, distractor maps, gate sets — the instrument parts — with
   explanation/analogy prose explicitly last-priority (future-
   generatable, evidence-rankable once served). An entry with a full
   instrument skeleton and thin prose is now a VALID entry;
   `concepts/COVERAGE.md`'s quality bar is amended by this audit to
   count instrumented skeletons — the reverse (rich prose, no
   instruments) remains invalid.
2. **No further prose-only universal engines** until the evidence
   contracts above are reflected in the Migration Blueprint's
   implementation phases (an owner/G2 decision, out of Brain scope).
3. **Every future authored claim states its test where one exists** —
   the entry-as-falsifiable-predictions reframe (§2, CONCEPT ENTRY).

---

## 5. The million-student answer

*"If one million students used My Tutor for five years, what new
educational knowledge would exist that could not exist anywhere
else?"*

1. **Misconception epidemiology** — prevalence of every documented
   misconception by age, curriculum, and birth type; regrowth curves
   per birth type measured, not assumed; which collision designs kill
   which misconceptions durably, by age band. No education-research
   corpus contains this at anything approaching this resolution —
   researchers get hundreds of subjects; the venue gets millions of
   instrumented repair events.
2. **Per-concept decay half-lives** — empirical forgetting curves for
   every concept in six subjects, the missing decay analog to the
   KG's estimated_hours.
3. **The action effectiveness table** — 27 actions × knowledge types ×
   ages × entering states, ranked by measured outcomes: the empirical
   core of a science of teaching moves that currently exists only as
   experienced teachers' intuition.
4. **Probe item science** — which items discriminate, which predict
   downstream success two nodes later, which distractors detect which
   models: a psychometric bank validated on millions of responses.
5. **Placement priors that are true** — self-report trust tables by
   age, subject, and claimed level, calibrated against measured
   frontiers.
6. **Recovery science** — what actually restores a flooded 8-year-old
   vs. a shamed adult, ranked by measured time-to-restore.
7. **The empirical curriculum audit** — every KG prerequisite edge
   confirmed or refuted by real stall patterns; the true difficulty
   map of human knowledge acquisition, as measured.

None of the seven can be generated by a model of any future quality,
because none exist in any corpus: they can only be ACCUMULATED by the
system that is present when a million people learn. That is the answer
— and every contract in §2 exists to make each teaching interaction
deposit its grain of it.
