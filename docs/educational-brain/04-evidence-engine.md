# 04 · Evidence Engine — how the Brain learns from every interaction

> *The Brain holds no opinion that cannot be defeated by data. Every
> ranking, every default, every prompt-selection heuristic has an
> evidence signal attached and a feedback loop that updates it.*

---

## 1. What this document specifies

The system that converts learner interactions into ranking updates,
asset deprecations, misconception confidence adjustments, and decision-
policy changes. It is the only part of the Brain authorized to write
`AssetIdentity.qualityScore`, `Misconception.prevalenceByGrade`, and
the per-strategy effectiveness scores.

Existing groundwork: `EvidenceRecord` table already exists with
explicit weights and types (`QUIZ | PRACTICE | PROJECT | REVIEW |
ASSESSMENT | VISUAL`). The Evidence Engine is what *consumes* it; the
table is its event log.

---

## 2. Three candidate designs for evidence aggregation

### Design A — Synchronous online updates

Every learner action immediately recomputes the affected asset's
`qualityScore`. No batch, no lag.

- ✅ Always fresh; ranking changes are visible within the same
  session.
- ❌ Hot contention on popular assets (every learner writing to the
  same row).
- ❌ A single noisy learner can swing a score that has 50 prior
  samples; no smoothing.
- ❌ Expensive: every persist stage triggers a transactional update
  on every asset shown in the turn.

### Design B — Pure batch (nightly recompute)

Append-only log; nightly job recomputes everything from scratch.

- ✅ Simple, restartable, debuggable.
- ✅ Scores are stable mid-day; no contention.
- ❌ A bad asset takes up to 24h to deprecate.
- ❌ Recompute cost grows with log size; not sustainable at 100M
  learners.

### Design C — Stream + windowed batch + sticky rollups

- **Append-only `EvidenceEvent` log** — the source of truth.
  Lock-free writes from the persist stage of the Decision Pipeline.
- **Per-asset rolling windows** — exponentially-weighted moving
  averages of asset effectiveness, updated every 1 minute by a
  worker reading the latest events. Cheap; bounded read cost.
- **Nightly sticky rollups** — full recompute over the prior 30
  days, replacing the rolling windows with the authoritative score.
- **Decision Pipeline reads the rolling window**; it never reads the
  raw event log.

- ✅ Fresh enough for hour-scale visible changes; smoothed enough to
  resist single-learner noise.
- ✅ Reproducible: rolling windows are derived from the log, never
  the source of truth.
- ✅ Cheap: the persist stage just appends; aggregation is
  background.
- ✅ Restartable: replay the log to reconstruct any window.
- ❌ Two systems instead of one. Worth it.

### Choice — Design C

This is the standard architecture for high-volume event-sourced
analytics; we adopt it. The append-only log is the audit trail; the
rolling windows are the serving cache; the nightly rollup is the
ground truth.

---

## 3. What counts as evidence

Five categories of learner signal, each emitted by the persist stage
of the Decision Pipeline as an `EvidenceEvent`.

| Category | Source | Signal direction |
|---------|--------|------------------|
| `ASSET_SHOWN` | every turn that mounted an asset | weak positive (consumed-ness, not effectiveness) |
| `PROBE_OUTCOME` | stage 9 checkpoint | strong: pass/fail/partial |
| `MISCONCEPTION_DETECTED` | stage 9 with a `targetedMisconceptions` hit | strong: confirms the asset failed to repair |
| `LEARNER_FEEDBACK` | the existing "Got it" / "Not clear" buttons | medium: explicit signal |
| `RE_ASK` | next turn re-asks the same concept | medium negative: the asset didn't land |
| `SUMMATIVE_OUTCOME` | end-of-chapter quiz, capstone assessment | very strong; delayed |

Each event carries:

```text
EvidenceEvent {
  eventId             UUID
  occurredAt          timestamp
  turnId              FK → Message (the turn the event came from)
  userId, sessionId
  conceptId, language, gradeBand   (denormalized for partitioning)
  category            (one of the above)

  // The targets of the signal — fields are non-null only when relevant
  assetId             — the asset that was shown / probed
  misconceptionId     — for MISCONCEPTION_DETECTED
  curriculumId        — for SUMMATIVE_OUTCOME

  // The signal payload
  outcome             'pass' | 'fail' | 'partial' | 'shown' | 'reused' | 'flagged'
  strength            0..1   (per-category weight × confidence)
  rawScore            optional, for numeric probes
  contextHash         hash of strategy + memory state at decision time
                      (so post-hoc analysis can group "this kind of
                      learner saw this asset in this context")
}
```

The `strength` field is the *engine's view* of how heavily this
event should influence the asset's score; the *category* is the
*event's view* of what kind of evidence it is. Keeping them separate
lets policy changes adjust strength without rewriting the event
stream.

---

## 4. How success is measured

The Brain measures success at three levels.

### 4.1 Asset success — "did this asset teach effectively?"

For an Explanation asset over a 30-day window:

$$
\text{effectivenessOf}(A) = \frac{\sum_{e \in E_A} w(e) \cdot \mathbb{1}[\text{positive}(e)]}{\sum_{e \in E_A} w(e)}
$$

where:
- $E_A$ = events targeting asset $A$ in the window
- $w(e)$ = per-category weight (table below)
- $\text{positive}(e)$ = whether the event signals success

Positive = `PROBE_OUTCOME=pass`, `LEARNER_FEEDBACK=Got it`, NO
re-ask within 48h, end-of-chapter quiz pass on covered concept.

Negative = `PROBE_OUTCOME=fail`, `MISCONCEPTION_DETECTED`,
`LEARNER_FEEDBACK=Not clear`, re-ask within 48h on same concept,
end-of-chapter quiz fail.

**Per-category weights** (lives in `brain.config/evidence.json`):

| Category | Weight on Explanation | Weight on Probe | Weight on Visual |
|----------|----------------------|-----------------|------------------|
| `ASSET_SHOWN` | 0.0 | 0.0 | 0.0 |
| `PROBE_OUTCOME` (when probe immediately followed the asset) | 0.8 | 1.0 | 0.5 |
| `MISCONCEPTION_DETECTED` | 0.6 | 0.4 | 0.3 |
| `LEARNER_FEEDBACK` | 0.4 | 0.2 | 0.4 |
| `RE_ASK` | 0.5 | 0.1 | 0.3 |
| `SUMMATIVE_OUTCOME` | 0.9 | 0.5 | 0.4 |

Visual assets are intrinsically harder to attribute — a learner can
master a concept with the wrong visual or without one. Visual scores
are therefore credited mostly via direct feedback and modestly by
downstream probe outcomes.

### 4.2 Misconception success — "is this misconception getting more or less prevalent in the population?"

Updated nightly:

$$
\text{prevalence}(M) = \frac{|\{u : \text{detected}(M, u, \text{last 30d})\}|}{|\{u : \text{attempted any affected concept, last 30d}\}|}
$$

A misconception whose prevalence is *decreasing* over consecutive 30-
day windows AND whose `repairableBy` assets have high effectiveness
is the Brain's success story; the inverse is a quality-of-content
emergency.

### 4.3 Strategy success — "did this pedagogical strategy work?"

Per `(pedagogicalStrategy, conceptId, gradeBand)` tuple, the engine
tracks:

$$
\text{strategyEff}(S, C, G) = \mathbb{E}[\text{conceptMasteryDelta} \mid S \text{ applied for } C \text{ to learners in } G]
$$

`conceptMasteryDelta` = `(mastery after the turn) − (mastery before
the turn)` for the targeted concept, attributed when the turn
applied strategy $S$.

This is the input to **strategy ranking** — the Decision Pipeline's
stage 4 picks the strategy with the highest expected delta for the
current `(concept, grade, learner profile slice)`.

---

## 5. How confidence is calculated

Every score carries an uncertainty band, not just a point estimate.

The Brain uses a **Beta-binomial conjugate** for per-asset scores:

- Start with prior $\text{Beta}(2, 2)$ — gentle prior centered at 0.5,
  symbolizing "we have no strong belief yet."
- Each positive event adds 1 to the alpha; each negative event adds
  1 to the beta (both weighted by $w(e)$).
- The posterior mean is `qualityScore`.
- The 90 % credible interval width is `1 - qualityConfidence` (so
  narrow interval → high confidence).

Concretely:

```text
qualityScore        = (α + sum_positive) / (α + β + sum_positive + sum_negative)
qualityConfidence   = 1 − (P95 − P5) of Beta(α + pos, β + neg)
sampleSize          = pos + neg  (effective sample count)
```

The decision-pipeline's stage 5 (Composition) gives more weight to
`qualityScore × qualityConfidence`, so an asset with `(score=0.9,
confidence=0.3)` (insufficient data) ranks below one with
`(score=0.7, confidence=0.95)`.

The Beta prior is **stratified by author**:
- Human-curated: $\text{Beta}(5, 2)$ (we trust curators more than the
  null hypothesis).
- AI-authored, reviewed: $\text{Beta}(3, 3)$ (neutral; depends on
  evidence).
- AI-authored, unreviewed: $\text{Beta}(2, 4)$ (default-skeptical;
  must earn ranking).
- Imported (auto-extracted from a book): $\text{Beta}(3, 4)$.

---

## 6. How rankings are updated

The rolling-window worker runs every 60 seconds and:

1. Reads the new `EvidenceEvent`s since its high-water mark.
2. For each affected `(conceptId, assetId)` pair, updates the
   in-Redis exponentially-weighted moving average with $\lambda =
   0.95$ per day (decay factor; 30-day half-life).
3. Writes the new `qualityScore`, `qualityConfidence`, `sampleSize`
   to `AssetIdentity` (single row, indexed write).
4. If the new score crosses a deprecation threshold (doc 01 § 11),
   enqueues a `DeprecationCandidate` for the curator queue.

Nightly, a Spark/Beam job re-derives the same fields from the full
30-day log, overwriting the Redis-derived values with the
authoritative ones. Discrepancies between rolling and nightly are
logged as a *consistency metric* — if the rolling window drifts > 5%
from the nightly truth, the rolling implementation is broken and
gets fixed.

---

## 7. Bias prevention

Three sources of bias the Brain must actively counter.

### 7.1 Exposure bias — popular assets get more evidence

An asset that already ranks high gets shown more often → accumulates
more evidence → ranks higher. The classic recommender-system
positive-feedback loop. Counters:

- **Exploration budget**: 5% of turns are required to surface a
  second-ranked alternative asset (when one exists with `sampleSize <
  300`). Identified by a flag in `ctx.policyDecisions.explorationMode`.
- **Inverse propensity weighting** in the nightly rollup: a
  not-yet-popular asset's evidence is upweighted by `1/p(shown)` so
  10 events on a rarely-shown asset count similarly to 50 events on
  a frequently-shown one.

### 7.2 Demographic bias — assets that work for one slice get treated as universal

The same asset may teach grade-10 visual learners well and grade-10
text-first learners poorly. A global score averages out the
distinction. Counters:

- **Stratified scoring**: `qualityScore` is computed per `(language,
  gradeBand, learningStyle)` cell, not globally. The Decision
  Pipeline uses the cell that matches the learner.
- **Minimum cell coverage**: a cell with `sampleSize < 30` falls
  back to the parent cell (drop `learningStyle`, then `gradeBand`).
  The fallback is logged; a chronically under-sampled cell is a
  data gap, not a quality verdict.

### 7.3 Misconception-injection bias — assets that confuse a *specific* learner population get a falsely-low score because of that population's prior misconceptions

A perfectly correct asset can score low if the only learners who
saw it carried a misconception the asset wasn't designed to repair.
Counter:

- **Misconception-conditional scoring**: per-asset score is also
  stratified by "active misconception set at decision time" (a hash
  of which misconceptions the learner had). The aggregator can
  report "this asset works at 0.92 for learners with no active
  misconceptions; 0.31 for learners with `heavier_falls_faster`" —
  the second number becomes evidence that the asset is *not
  inappropriate* but should be paired with the misconception's
  `repairableBy` asset first.

---

## 8. Experiments

Where the Brain genuinely doesn't know which of two candidates is
better, it runs an experiment. Three experiment types.

### Type 1 — A/B on asset alternatives

When two `ACTIVE` Explanation assets exist for the same
`canonicalSlug` group AND their `qualityScore` confidence intervals
overlap, the Brain serves them 50/50 until the intervals separate
(or 14 days pass). One promoted to `ACTIVE`, the other marked
`SHADOW_ACTIVE` (still served but at low frequency for ongoing
monitoring).

### Type 2 — A/B on strategy choice

When two strategies have overlapping expected mastery deltas for the
same `(concept, gradeBand)`, the Brain randomizes between them for a
sample of N learners. The losing strategy's policy is downweighted
in future stage-4 decisions for that cell.

### Type 3 — Multi-armed bandit on ranking weights

The ranking weights (doc 01 § 8) are themselves under continuous
test. Once per quarter, the Brain proposes a small perturbation to
one weight (e.g., raise `recency` from 0.05 to 0.07), runs it on 5%
of decisions for 14 days, and compares aggregate mastery delta. The
winning weight is promoted.

All three types share infrastructure:

```text
Experiment {
  id, kind, hypothesis,
  arms: [ { armId, definition, assignmentRule } ],
  population: { totalN, perArmN },
  primaryMetric: 'asset_effectiveness' | 'strategy_mastery_delta' | 'ranking_weight_yield',
  decisionRule: 'first_to_p<0.01' | 'best_at_14_days' | …,
  status: 'designing' | 'running' | 'analyzing' | 'shipped' | 'aborted',
  startedAt, endedAt, conclusion
}
```

Bias prevention in experiments:

- Random assignment is **per-learner**, not per-turn (so a learner
  doesn't see arm A then arm B mid-session — it would confound).
- New learners are not enrolled in experiments for their first 5
  turns (cold-start protection).
- An experiment that detects a `severity=high` harm signal (e.g.,
  significantly lower probe pass rate on its arm) auto-aborts.

---

## 9. Discovering better explanations

The Brain has an explicit mechanism for finding asset improvements.
Three triggers, each producing a curator-queue entry or an
autonomous test.

### Trigger 1 — Low-score concept with high traffic

If a concept's best-asset `qualityScore < 0.5` AND that concept has
> 1,000 attempts in the prior 30 days, the curator queue receives:

- The concept summary.
- The current best asset and its evidence breakdown.
- The top 3 misconceptions most-detected during attempts.
- The next-best alternative assets (if any).

The curator can: author a new asset, edit an existing one (creating
a new version), or commission an AI-authored draft for their review.

### Trigger 2 — Misconception with no repair

If `Misconception.repairableBy` is empty AND `prevalence > 0.05` in
any cell, the curator queue receives the misconception plus the top
3 concepts where it is detected, asking for a targeted repair asset.

### Trigger 3 — Generation-burst signal

When the asset-hit rate for a concept drops below 50% over 24h (i.e.,
half the learners triggered stage-5b generation rather than
retrieval), it indicates a coverage gap — the concept needs more
asset variants. The Brain enqueues an autonomous diversification:
LLM-author N stylistic variants of the highest-quality existing
asset; queue them for review.

---

## 10. The control loop, in one diagram

```
   Decision Pipeline
   (stage 10 Persist)
        │
        ▼
   EvidenceEvent log  ─────────────►   Nightly Rollup
        │                                     │
        ▼                                     ▼
   60s Worker                          Authoritative Stratified
        │                              Scores per (asset × cell)
        ▼                                     │
   Rolling Windows                            │
   (per (asset × cell))                       │
        │                                     │
        ▼ on threshold cross                  ▼
   AssetIdentity updates ◄────────  Curator Queue Entries
        │
        ▼
   Decision Pipeline (next turn)
```

Two loops: the **fast loop** (events → rolling windows → next-turn
decision, minutes) and the **slow loop** (events → nightly rollup →
curator queue → asset version, days to weeks). Both are essential;
neither replaces the other.

---

## 11. Honesty about what evidence cannot do

The Evidence Engine is *not* a magic ranking machine. Five things
it can't do alone:

1. **It cannot author content.** A concept with zero existing assets
   has no evidence to rank; new content must come from human curators
   or AI authoring (with a human-review path for AI authoring).
2. **It cannot judge correctness.** A subtly-wrong asset that
   learners *like* will score well. Correctness is validated by doc
   01's three validation layers; evidence ranks among
   already-validated assets.
3. **It cannot fix root causes.** If an entire concept's assets score
   poorly, that signals "this concept is poorly understood by our
   asset catalogue," which is a *content strategy* problem, not an
   evidence-engine problem.
4. **It cannot eliminate cold-start.** The first N learners to see a
   new asset bear extra uncertainty; their evidence is upweighted
   (exploration budget) but their experience is intrinsically the
   experiment.
5. **It cannot replace curators.** Curators set the validation
   schemas, the misconception taxonomy, the ranking-weight bounds,
   the deprecation policies. Evidence executes those policies; it
   doesn't author them.

---

## 12. Anti-patterns explicitly rejected

- ❌ **Net Promoter Score / "rate this lesson out of 5"**. Learners
  are bad judges of their own learning (the Dunning-Kruger effect is
  real). Evidence is *behavioral* (did they get it right later), not
  *attitudinal* (did they like it).
- ❌ **A single global "Lesson Quality Score"**. Stratified by
  language, grade, style, active misconceptions.
- ❌ **Real-time rank recomputation on the read path**. The pipeline
  reads pre-computed scores; the engine writes them.
- ❌ **Treating AI-authored evidence (e.g., "the LLM also says this
  is correct") as a vote**. Only human and learner signals enter the
  ranker. AI verdicts are only for *validation* (doc 01 § 7), never
  for *ranking*.
- ❌ **Ignoring the misconception-conditional dimension**. An asset
  that helps unblocked learners but cements an existing misconception
  is *worse* than no asset, not better. The engine must surface this.
- ❌ **Deprecation by single bad week**. Decay is exponential, not
  recency-only; a 30-day window dominates.

---

## 13. Why this design is right for the next 5 years

The append-only log + rolling-window + nightly-rollup architecture
is the only one that survives all three of:

- **Throughput**: 100M learners × 10 turns/day → ~12 K events/sec
  peak. Append-only writes are easy; recomputing on every event
  would not survive.
- **Honesty**: every score has confidence; the system never claims
  certainty it doesn't have.
- **Reproducibility**: the source-of-truth is the log; every score
  can be re-derived from scratch; bugs in the engine are diagnosable.

The decisive property is **the bridge to curators**. The Evidence
Engine is what makes a single curator's effort scale: it tells them
*which concept's content most needs improvement next*, instead of
forcing them to guess. Without that bridge, the asset catalogue
stagnates at whatever the initial seed authored; with it, the
catalogue gets better every week, driven by signal from the actual
learner population.
