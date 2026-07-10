# Student State Model

The permanent learner representation — WHO the student currently is. A
world-class tutor never thinks "the learner is confused"; they hold a
multidimensional mental model: *this learner understands place value,
still believes multiplication makes things bigger, hesitates before
fractions, tenses up when anything looks like a test, lights up at
stories, and lost confidence two weeks ago and is still rebuilding it.*
This library is that mental model, made explicit, so the runtime AI
**retrieves an authored student state instead of inventing assumptions
about the learner**.

## Weather vs climate — the relationship to the Decision Engine

`../decision-engine/02` classifies the learner's state **this moment**
(weather: FRUSTRATED now, CURIOUS now). This library is the learner's
standing model **across time** (climate: fear-prone under timers, strong
on stories, misconception M1 inhibited but regrowing). The two feed each
other every turn: the momentary classifier reads its *priors* from this
model (a high-fear-trait learner is classified FEARFUL on weaker
evidence), and the Decision Engine's update contract
(`../decision-engine/08 §3`) is the pipe that writes evidence back into
this model. That contract lists the fields; THIS library defines the
structures those fields land in.

## Repository audit — what already exists, and how it is used

| Existing learner information | Where | Treatment here |
|---|---|---|
| Momentary state classification (bands, detection, priorities) | `../decision-engine/02` | **Read/written, not restated** — this model stores the standing traits that tune that classifier |
| The learner-model update contract (9 fields, per-turn) | `../decision-engine/08 §3` | **The writer.** This library is what it writes INTO |
| Confidence quadrants, calibration measurement/training | `../assessment/04` | **Extended** in 04 here: from per-item reads to a standing per-domain profile |
| Evidence hierarchy, personal baselines | `../assessment/05 §2, §5` | **Reused**: the knowledge ladder's rungs are defined by that evidence; baselines live here as profile data |
| Misconception science (birth types, repair, regrowth, verification-of-death) | Delivery 2 §4; `../concepts/` per-concept libraries | **Reused**: 03 here is the per-LEARNER ledger those libraries' per-CONCEPT entries are tracked against |
| Memory engine (retrieval/storage strength, intervals, review-by-type) | Delivery 2 §8 | **Viewed, not duplicated**: 07 here defines per-concept memory *statuses* derived from that engine's data |
| Motivation personas | Delivery 2 §9 | **Refined**: personas become evidence-backed profile regions, not labels |
| False/returning beginners, miscalibration direction at placement | `../first-lesson/01`, `../assessment/02 §5` | **Reused** as initialization rules |
| Runtime memory stores (six stores, ConceptMasteryRecord, ActiveMisconception, single-writer) | `docs/architecture/ADR_10` (frozen v1.0) | **Not touched, not redesigned.** ADR 10 owns the code-side containers; this library is the pedagogy-side CONTENT those containers will hold. No schemas here, deliberately. |

## Reading order

| File | Contents |
|---|---|
| [01-architecture.md](01-architecture.md) | The eight dimensions and the design laws (evidence-backed, decaying, per-domain, descriptions-never-verdicts) |
| [02-knowledge-state.md](02-knowledge-state.md) | The 8-rung per-concept knowledge ladder, its evidence, and what each rung tells the state machine |
| [03-misconception-ledger.md](03-misconception-ledger.md) | The per-learner misconception record: strength, evidence, repair history, status lifecycle, regression risk |
| [04-confidence-model.md](04-confidence-model.md) | The standing calibration profile and how confidence evolves, collapses, and rebuilds |
| [05-behaviour-profile.md](05-behaviour-profile.md) | Pace style, modality affinities, attention, persistence, curiosity — as evidence-backed statistics, never identities |
| [06-emotional-model.md](06-emotional-model.md) | Triggers, recovery speed, flow conditions, imported history, personalized budgets |
| [07-memory-state.md](07-memory-state.md) | Per-concept memory statuses as a view over the Memory Engine, plus the personal forgetting rate |
| [08-teaching-history.md](08-teaching-history.md) | What the tutor permanently remembers: what worked, what failed, breakthroughs — and the summarization policy |
| [09-trajectory.md](09-trajectory.md) | Velocity, acceleration, plateaus, regression, momentum, readiness |
| [10-digital-twin.md](10-digital-twin.md) | The assembled twin: the eight questions it must answer, decision provenance, and the six-learner audit |

## The retrieval claim

After this delivery, when the runtime asks "who is this learner?", the
answer is retrieved structure — rungs, ledger entries, profiles,
statuses, trajectory — with evidence and dates attached. What the AI may
no longer do is assume: no invented "the student probably knows X", no
guessed fear, no imagined learning style. If the twin doesn't contain
it, the honest state is "unknown — probe cheaply", and that too is a
retrievable decision.
