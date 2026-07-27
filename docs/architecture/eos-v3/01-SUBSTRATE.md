# EOS v3 · Plane 0 — The Substrate

Everything in the substrate exists to make the layers above it *possible to trust*. If
Plane 0 is right, the rest of the system can be deterministic, auditable, replayable,
and model-independent. If Plane 0 is wrong, no amount of pedagogical sophistication
above it can be verified.

---

## C-01 · Evidence Ledger

**Why it exists.** Every educational system eventually faces the same four questions and
cannot answer them: *Why did the system do that? What did this learner actually know on
March 3rd? Our mastery estimator was wrong for six months — can we fix the past? Does
this teaching approach work?* All four are unanswerable if learner state is stored as
mutable current values. They are all trivially answerable if state is a projection of an
immutable log. The Ledger is that log. It is the single most important structural
decision in the blueprint.

**Purpose.** Be the sole, append-only, immutable source of truth for everything that
ever happened to or was decided about a learner.

**Responsibilities.**
- Accept typed evidence records from authorized emitters; assign monotonic, causally
  ordered identity; never modify or delete.
- Record *observations* (what the learner did), *decisions* (what the system chose and
  under which policy version), *deliveries* (what the learner actually received), and
  *outcomes* (what happened next) — and maintain the joins between them.
- Serve replay: rebuild any projection at any historical point, under any policy version.
- Enforce retention, redaction, and erasure obligations without breaking replay
  (crypto-shredding of payloads, preservation of structure).

**Inputs.** Observation records (Sensor Bank), Decision records (Decision Kernel),
Delivery records (Conversation Controller), Verification records (Output Verifier),
Human records (Human Plane), Environment records (Clocks, Budget Governor).

**Outputs.** Immutable event stream; projection feeds; replay API; audit trails.

**Internal logic.**
Four record classes, each with mandatory fields:
- `Observation` — actor=learner, channel, raw-reference, typed extraction, sensor id +
  version, sensor confidence, abstention flag, timestamps (wall + session + memory).
- `Decision` — band, rule id, inputs-hash, chosen action, rejected alternatives with
  reasons, policy version, kernel version, rationale string.
- `Delivery` — contract id, asset ids used, rendered content hash, channel, verifier
  verdict, retries, degradation rung.
- `Outcome` — links a Decision to the Observations that followed it within an
  attribution window; this join is what makes causal analysis possible at all.

The **decision–consequence join** is not an analytics convenience. It is the mechanism
by which the system learns to teach. Without it, the platform accumulates transcripts;
with it, it accumulates evidence about what works.

Two hard rules: writes are additive only; and every record carries the *version* of every
component that produced it, so that history can be reinterpreted when components change.

**Ownership.** Owns: the event stream, ordering, immutability, retention policy,
replay semantics. Nothing else may write it (D3).

**Depends on.** Dual Clock Service (C-02), Identity Service (C-03).

**Must NOT own.** Interpretation. The Ledger never decides what an observation *means*
for mastery; that is C-24's job reading the ledger. The Ledger has no pedagogy in it at
all, and this is deliberate: interpretation changes, facts do not.

**Failure modes.**
- *Write amplification* — one turn produces dozens of records at 10⁸ learners. Mitigated
  by tiered storage: hot recent slice, warm compacted slice, cold archive; projections
  serve reads, never the raw log.
- *Semantic drift* — a record type's meaning changes without a version bump, silently
  corrupting replay. Mitigated by treating record schemas as versioned public contracts
  with a compatibility test suite (the schemas are the system's API to its own past).
- *Privacy conflict* — erasure obligations vs. immutability. Resolved by separating
  structure (retained) from payload (encrypted, key-destroyable).
- *Emitter trust* — a buggy sensor writes garbage forever. Mitigated by sensor-version
  tagging plus the ability to *re-derive* projections while excluding a sensor version.

**Evolution.** Cross-learner ledger (with consent and aggregation) becomes the training
corpus for the system's own sensors and policies — the asset no competitor has, because
it can only be produced by the venue where learning actually happens. Later: learner-owned
ledger portability (A22), and differentially-private aggregate release for research.

---

## C-02 · Dual Clock Service

**Why it exists.** Nearly every tutoring system has one clock, and it is wall-clock time
used for session bookkeeping. But the two most important temporal phenomena in learning
run on different clocks: cognitive load and affect evolve in *session time* (turns,
minutes-since-start, consecutive failures), while retention and consolidation evolve in
*memory time* (elapsed days weighted by sleep cycles, retrieval events, and interference).
Collapsing them produces two classic failures: treating a 40-minute gap and a 40-day gap
identically for scheduling, and treating a returning learner's session as continuous.

**Purpose.** Provide the authoritative temporal frame for every other component.

**Responsibilities.** Define and stamp: wall time; session time (with session boundary
detection); memory time per concept (elapsed since last successful retrieval, adjusted
for sleep-interval count and interference events); and *schedule time* (the horizon over
which the Review Scheduler plans).

**Inputs.** Wall clock, learner activity timestamps, timezone/locale, sleep-window
inference (never sensed intrusively — derived from usage patterns and declared schedule).

**Outputs.** A stamped temporal context on every ledger record; session boundary events;
per-concept memory-time values.

**Internal logic.** Session boundary = inactivity gap exceeding a learner-calibrated
threshold (defaulting generously, scaled by measured attention span). Crossing a boundary
resets session-time budgets and triggers the continuity obligations of the Relationship
Engine (C-40) — including any unpaid close from an abandoned session. Memory time is a
per-(learner, concept) monotonic quantity reset by successful retrieval, not by exposure.
*Exposure is not retrieval*; only the Assessment Engine may reset memory time.

**Ownership.** Owns all time semantics. **Must not own** any decision about what to do
with time — no scheduling, no pacing.

**Failure modes.** Timezone/DST corruption of spacing intervals (mitigate: store UTC
instants plus locale, never local wall times); device clock skew (mitigate: server-
authoritative stamps); learners who study across many devices/sessions concurrently
(mitigate: session identity is per-continuity-thread, not per-device).

**Evolution.** Chronotype-aware scheduling; explicit sleep-consolidation modelling;
circadian-aware difficulty placement, once evidence supports it.

---

## C-03 · Identity & Continuity Service

**Why it exists.** The OS must carry a person from age six to sixty across devices,
schools, languages, names, and legal guardianship changes, while a *learner* is
simultaneously: an authenticated account, a legal subject with an age-dependent rights
profile, a pedagogical entity, and a relationship. Conflating these is the source of
most privacy failures in educational software.

**Purpose.** Maintain the stable identity to which all learning history attaches, and the
rights profile that gates what may be done with it.

**Responsibilities.** Stable learner id independent of credentials; guardianship and
consent graph; age band and its derived rights profile; multi-profile households and
shared devices; institution affiliation with scoped visibility; identity merge/split;
portability and erasure execution.

**Inputs.** Authentication events, guardian consent, institutional enrolment, self-report.

**Outputs.** Learner id; rights profile (what may be stored, sensed, shown, shared, and
for how long); visibility scopes for the Human Plane.

**Internal logic.** The rights profile is a *first-class input to teaching*, not a
compliance wrapper: it determines whether verbatim utterances may be retained (a
misconception ledger needs verbatim phrases — for a minor this requires guardian consent
and shorter retention), whether voice may be captured, whether cross-learner evidence may
include this learner, and what a teacher or parent may see. The Sensor Bank and Ledger
both consult it before writing.

**Ownership.** Owns identity, consent, rights. **Must not own** learner knowledge state,
progress, or any pedagogy.

**Failure modes.** Silent identity merge corrupting two learners' histories (mitigate:
merges are ledger events, reversible by replay); household account sharing polluting one
Twin with two people's evidence (mitigate: continuity-thread anomaly detection — a sudden
distributional break in performance and style is a *profile-confusion* hypothesis before
it is a *learning* hypothesis; this single check prevents a large class of nonsense
inference); guardianship transitions at majority age.

**Evolution.** Learner-held portable credentials; cross-institution transcript with
learner-controlled disclosure; the learner's model as an owned, exportable artifact (A22).

---

## C-04 · Turn Contract Registry

**Why it exists.** The gap between "the system decided to demonstrate, not question" and
"the learner received a demonstration, not a question" is where LLM tutors fail. Closing
it requires the intent to exist as a *machine-checkable object* between the decision and
the output. Prose instructions cannot be verified; contracts can.

**Purpose.** Define, version, and serve the typed contract that governs every turn.

**Responsibilities.** Hold the contract schema and the library of contract templates
(one per teaching action type); compose the concrete contract for a turn; expose the
*success predicate* the Output Verifier will evaluate.

**Inputs.** Decision (C-28), learner constraints (C-18..C-22), asset availability (C-14),
budget envelope (C-07).

**Outputs.** A `TurnContract` — the central object of the runtime:

| Field | Meaning | Verified by |
|---|---|---|
| `mustDo` | the required move (demonstrate / state / probe / repair / close) | verifier: move classifier |
| `mustNotDo` | forbidden moves for this turn (e.g. *no new question*) | verifier: negative check |
| `questionBudget` | integer, often 0 or 1 | verifier: count |
| `vocabularyBudget` | permitted new terms, each requiring a gloss | verifier: term diff vs. learner's known-lexicon |
| `forbiddenReveals` | facts this turn must not disclose (the answer being probed) | verifier: containment check |
| `register` | complexity/formality band | verifier: readability + address-form checks |
| `lengthBound` | max sentences/tokens per burst | verifier: count |
| `requiredArtifacts` | visual, worked example, probe id | verifier: presence |
| `openLoop` | what must be left unresolved for continuity | verifier: presence |
| `successPredicate` | the conjunction of the above | verifier: gate |
| `provenance` | decision id, policy version, contract template version | audit |

**Internal logic.** Contracts compose: a base template per action type, narrowed by
learner constraints (reading load, attention span, affect state), narrowed again by
safety, narrowed again by budget. Narrowing is monotone — a later stage may only tighten,
never loosen. This ordering is what guarantees safety constraints survive to the output.

**Ownership.** Owns contract schema, templates, composition. **Must not own** the choice
of action (C-28) or the rendering (C-35) or the enforcement (C-36).

**Failure modes.** Over-constrained contracts that no renderer can satisfy → the verifier
loops. Mitigated by a satisfiability pre-check and a declared relaxation order (which
constraint yields first — always a stylistic one, never a safety or pedagogical one).
Contract sprawl (hundreds of near-duplicate templates) → mitigated by composition instead
of enumeration.

**Evolution.** Contracts become the training targets for distilled small models: a model
fine-tuned to satisfy contracts is cheaper, faster, and more compliant than a large model
prompted to. The contract library is therefore a durable asset, not scaffolding.

---

## C-05 · Capability Plane (model abstraction & routing)

**Why it exists.** Three separable concerns get fused in typical systems: *which model*,
*what role*, and *what quality bar*. Fusing them makes the system unable to survive model
change, unable to control cost, and unable to reason about quality. The Capability Plane
separates them by making everything above it request a **capability**, never a model.

**Purpose.** Be the sole boundary between the OS and any inference provider.

**Responsibilities.** Expose capability contracts (e.g. `classify.affect`,
`classify.correctness`, `render.explanation`, `render.socratic-probe`, `author.draft`,
`verify.claim`); route each request to a provider/tier satisfying the contract's quality,
latency, cost, locale, and residency requirements; enforce role separation (D4);
failover, retry classification, quota and outage handling; capture every call for the
Ledger and for distillation corpora.

**Inputs.** Capability request + typed payload + budget envelope + rights profile.

**Outputs.** Typed response + provenance (provider, model version, tier, cost, latency,
cache status) + quality signals.

**Internal logic.** A routing table keyed by (capability, quality tier, constraints).
Three tiers as an architectural constant: **T0 deterministic** (no model — rules,
templates, retrieved assets), **T1 small/local** (fast classifiers and constrained
renderers), **T2 frontier** (hard reasoning, authoring, ambiguous sensing). The router's
default is the *lowest tier that satisfies the contract*, and the escalation rule is
explicit and logged. Roles are enforced structurally: a `render.*` capability physically
cannot return a decision object; a `classify.*` capability physically cannot return
learner-facing prose.

Two properties are non-negotiable: **role isolation** (a sensor call and a render call
never share a context window, so a model cannot decide what it then justifies) and
**capability versioning** (upgrading a provider is a versioned change that must pass the
capability's own regression suite before it can serve traffic).

**Ownership.** Owns provider relationships, routing, failover, model provenance. **Must
not own** any pedagogical judgement; it never inspects teaching semantics.

**Depends on.** Budget Governor (C-07), Degradation Controller (C-06), Identity (C-03,
for residency and rights).

**Failure modes.** Provider outage (→ C-06 rungs); quota exhaustion misclassified as
retryable, wasting a doomed second call per turn (an observed real failure class:
classify quota errors as non-retryable at the boundary); silent provider quality
regression (mitigate: continuous shadow evaluation against frozen capability suites —
the system must detect that a provider got *worse* without an announcement); prompt
injection carried in learner text reaching a privileged role (mitigate: learner content
is never placed in a role that can emit decisions, and sensors run on quoted, untrusted-
tagged input).

**Evolution.** The end state is that most turns cost nothing: T0 asset retrieval serves
the common cases, T1 distilled models handle sensing and standard rendering, and T2 is
reserved for genuine novelty and offline authoring. The architecture is designed so that
this migration changes routing-table entries only.

---

## C-06 · Degradation Controller

**Why it exists.** A tutor that fails is worse than a tutor that is temporarily simpler.
Educational sessions are emotionally load-bearing; an error message at the moment of a
learner's confusion does specific, measurable damage to trust. Degradation must therefore
be designed, ranked, and rehearsed — not improvised at incident time.

**Purpose.** Guarantee that the system always teaches *something correct and safe*, at a
declared, monotonically decreasing level of sophistication, under any dependency failure.

**Responsibilities.** Own the degradation ladder; detect rung-triggering conditions;
declare the current rung to every component; ensure each rung is independently testable.

**The ladder** (each rung fully functional, not an error state):

| Rung | Trigger | What still works | What is suspended |
|---|---|---|---|
| R0 | nominal | everything | — |
| R1 | frontier model degraded/slow | sensing, rendering via T1; assets preferred | novel authoring, rare-case reasoning |
| R2 | all models unavailable | asset-served teaching, deterministic probes, review sessions, worked examples | free-form dialogue, novel explanation |
| R3 | ledger write-path degraded | teaching continues from cached projections; evidence buffered locally | mastery advancement, gate crossings (never advance on unrecorded evidence) |
| R4 | projection store unavailable | last-known-good session continues; safe close | new sessions, placement |
| R5 | catastrophic | honest, warm, human-authored unavailability message + offline pack | everything |

Rung R3 encodes a genuine pedagogical rule: **the system may teach without recording, but
must never advance without recording.** Hollow advancement is worse than a paused gate.

**Inputs.** Health signals from every dependency; Budget Governor pressure; error rates.

**Outputs.** Current rung (global and per-capability); rung-change events to the Ledger;
constraints injected into contract composition.

**Failure modes.** Flapping between rungs (hysteresis + minimum dwell time); silent
permanent degradation (rung state is a first-class monitored metric with alerting, and
appears in the Human Plane so a teacher knows the learner had a degraded week).

**Evolution.** Edge-resident R2: a device-local pack (assets + deterministic kernel +
small sensor) so the learners with the worst connectivity — who need the system most —
get a genuinely useful offline tutor rather than a spinner.

---

## C-07 · Budget Governor (cost, latency, attention)

**Why it exists.** Three budgets constrain every turn, and only one is usually modelled.
Money and milliseconds are obvious. The third — **the learner's attention and time** — is
the scarcest and is almost never represented architecturally, which is why software
tutors happily spend ten minutes on an observation phase that deserved thirty seconds.
Making attention a governed budget turns "the tutor rambled" from a style complaint into
a detectable budget breach.

**Purpose.** Represent, allocate, and enforce the three budgets as first-class runtime
constraints that shape teaching decisions.

**Responsibilities.**
- *Cost*: per-turn, per-session, per-learner, per-cohort envelopes; tier selection input.
- *Latency*: per-stage deadlines; deadline-aware routing; pre-emptive degradation.
- *Attention*: the session's declared time budget and its allocation across phases
  (opening, core, verification, close), with the close **protected** — never sacrificed
  to content, because the last event determines the return.

**Inputs.** Plan and tier prices, live latency, session plan (C-33), measured attention
span (C-19), learner-declared available time.

**Outputs.** Budget envelope per turn (a required input to contract composition);
breach events; pressure signals to C-05/C-06.

**Internal logic.** Budgets are enforced by *narrowing contracts*, not by truncating
output. A tight latency budget yields a contract requiring a shorter move and permitting
an asset-only turn; a tight attention budget yields a session plan with fewer concepts
and an earlier close. This is the crucial distinction: budget pressure changes *what is
taught*, deliberately and legibly, rather than degrading *how well* it is taught.

**Ownership.** Owns budget definitions, allocation, enforcement. **Must not own** the
teaching decision — it constrains the option set; C-28 chooses within it.

**Failure modes.** Cost optimization silently eroding pedagogy (mitigate: every
budget-forced narrowing is a ledger event, and the Analytics plane monitors learning
outcomes *stratified by budget pressure* — if cheap turns teach worse, that must be
visible, not hidden in a margin); attention budget overrun (the "one more thing" failure)
prevented by the protected close.

**Evolution.** Per-learner value-aware allocation (a struggling learner at a critical gate
warrants more compute than a fluent learner in review) — an explicit, auditable equity
policy rather than an emergent accident of caching.
