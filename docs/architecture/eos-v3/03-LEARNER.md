# EOS v3 · Plane 1 — The Understanding Layer

This plane answers F1 (*estimate*) and F4 (*verify*). It is the hardest plane to get
right, because its subject — what a person knows — is unobservable, changes while you
measure it, and is systematically misreported by the person themselves.

The governing stance: **the system maintains a hypothesis about a learner, never a
verdict about a person** (A11). Every field below is a description with evidence and a
confidence, and every one of them can be shown to the learner without harm. If a field
could not be shown to the learner, it is misdesigned.

---

## C-17 · Sensor Bank

**Why it exists.** In the standard architecture, "understanding the learner" is something
the model does implicitly, invisibly, and irreproducibly inside a generation call. That
makes it unmeasurable and unimprovable. Extracting sensing into an explicit bank of typed,
independently versioned, independently evaluable classifiers is what converts learner
understanding from a vibe into an instrument.

**Purpose.** Convert raw multimodal learner signal into typed, confidence-bearing
observations — and nothing else.

**Responsibilities.** Run N independent sensors in parallel over each learner turn, each
producing a typed output with a calibrated confidence and an explicit **abstention**
option. Core sensors:

| Sensor | Output | Notes |
|---|---|---|
| Correctness | correct / partial / incorrect / non-answer | non-answer is not incorrect (A10) |
| Confidence | hedged … certain | from lexical hedges, latency, self-correction |
| Misconception match | candidate misconception ids + strength | verbatim phrase retained per rights profile |
| Affect | neutral / frustrated / anxious / bored / flow / distress | never inferred from a single cue |
| Intent | answer / question / meta-request / off-task / social | "stop asking, just explain" is a first-class intent |
| Metacognitive marker | monitoring, planning, help-seeking quality | |
| Load | overload indicators (truncation, fragmentation, latency spike) | |
| Effort | engagement vs. disengagement, gaming patterns | |
| Integrity | outsourced-answer signature | see C-25 |
| Safety | harm, crisis, abuse disclosure | routes to Band 0 immediately, bypassing all queuing |

**Inputs.** Normalized multimodal observation (text, audio+prosody, ink, image, latency,
silence, edit history, tool use) from C-39, plus minimal context (the question asked, the
learner's known lexicon) — *never* the learner's mastery estimate. Sensors are blinded to
the current belief so that they cannot confirm it. This is not a detail: an unblinded
sensor plus a belief updater is a feedback loop that converges on its own prior and stops
learning about the learner.

**Outputs.** `ObservationSet` → Ledger (always) → Twin (for update).

**Internal logic.** Independence is enforced structurally (separate capability calls,
separate contexts). Disagreement between sensors is *preserved*, not resolved here —
"confident tone, incorrect answer" is the single most diagnostically valuable pattern in
teaching, and a resolver that collapsed it into one score would destroy exactly the
signal that matters most. Every sensor carries a calibration record; a sensor that cannot
be shown to be calibrated cannot be promoted to production.

**Latency.** Sensors are staged: cheap deterministic ones (latency, length, edit
patterns, keyword-level integrity flags) run first and can settle the turn alone; model
sensors run only when needed.

**Ownership.** Owns extraction. **Must NOT own** interpretation (does this mean the
learner has mastered it?), decisions, or any write to belief state.

**Failure modes.** Miscalibration (mitigated by continuous scoring against a
human-labelled stream and against future behaviour — a correctness sensor is ultimately
validated by whether its "correct" learners succeed later); sensing what does not exist
(affect from text is genuinely weak — the architecture requires *convergent* evidence
from ≥2 sensors or an explicit learner statement before an affect state can preempt
teaching, and permits abstention rather than guessing); cultural bias in affect and
hedging (locale-scoped calibration, and hedging norms treated as learner-specific
baselines, not universals).

**Evolution.** Sensors are the first components to become small, local, distilled models
trained on the platform's own labelled ledger — cheap, private, fast, and better than any
general model, because they are trained on the exact distribution they serve.

---

## C-18 · Learner Twin — Epistemic Model

**Why it exists.** A single mastery percentage per topic cannot support good teaching. It
cannot distinguish "never seen" from "seen and failed"; cannot express "could do it
yesterday"; cannot say how sure it is; cannot say what evidence produced it; and cannot
tell you *what kind* of help is needed. Every one of those distinctions changes the
teaching action, so every one must exist in the representation.

**Purpose.** Maintain the estimate of what the learner knows, at what strength, on what
evidence, with what uncertainty, decaying over memory time.

**Responsibilities.** For each claim the learner has encountered, maintain a **knowledge
ladder** position with uncertainty:

```
UNKNOWN → RECOGNIZED → IMITATES → ASSISTED → INDEPENDENT → AUTOMATIC → TRANSFER → EXPERT
```

Each rung has a defined evidence requirement and a defined *machine entry point* — the
place teaching resumes for a learner at that rung. This is the structural mechanism that
makes re-teaching from zero impossible (A12): the ladder position always names where to
re-enter.

Also maintained: posterior distribution (not a point estimate); high-water mark (never
lowered); evidence list with provenance; per-claim decay state (from C-22); and the
distinction between UNKNOWN (no evidence) and ABSENT (evidence of not knowing) — A10.

**The rungs matter more than the number.** INDEPENDENT vs. AUTOMATIC is the difference
between "can do it with full attention" and "can do it while thinking about something
else," and that difference decides whether the learner can use it as a component of a
harder skill. A percentage cannot express it; the whole edifice of prerequisite reasoning
depends on it.

**Inputs.** ObservationSets (via Ledger), memory decay (C-22), curriculum migration maps.

**Outputs.** Belief state projection; readiness signals; StateDelta with reasons.

**Internal logic.** Bayesian update per observation, with evidence weight determined by
the *quality of the evidence*, not merely its outcome: an independent transfer item under
no hints in a novel context is worth many multiples of a hinted, in-context repetition.
Downweighting rules are explicit and auditable — hinted success, echo, multiple-choice
guess probability, and post-explanation immediate recall are all weak evidence, and the
system must be structurally unable to advance on them.

Rungs are *asymmetric*: climbing requires strong evidence; slipping happens through decay
(a memory phenomenon) or contradiction (a new failure), and the high-water mark is
retained separately so the system always knows the difference between "never had it" and
"has it, needs re-cueing."

**Ownership.** Sole writer of epistemic belief (D2). **Must not own** what to teach next
(C-28), nor gate decisions (C-24 defines the criteria; this model supplies the state).

**Failure modes.** Overconfidence from correlated evidence (five items testing the same
sub-skill are not five independent observations — mitigated by evidence-diversity
requirements in the gate criteria); prior lock-in (mitigated by blinded sensors and a
floor on posterior variance so the model can always be surprised); update storms during
replay (mitigated by deterministic, order-independent-where-possible update rules).

**Evolution.** Per-learner learned update parameters; item-response-theory-style joint
estimation of item difficulty and learner ability once item volume permits; eventually,
population-informed priors for a cold-start learner that are *honest about being priors*.

---

## C-19 · Learner Twin — Affective Model

**Why it exists.** Affect gates cognition absolutely. A flooded learner absorbs nothing,
and content delivered over distress does not merely fail — it teaches the learner that
their distress is invisible here, which is the fastest way to lose them permanently. If
affect is not a modelled state with preemptive authority (A13, Band 1), the system will
plough through it, because the lesson plan is the thing the system can see.

**Purpose.** Maintain the learner's emotional and motivational condition, its triggers,
and its recovery dynamics.

**Responsibilities.** Current affect state with confidence and duration; per-learner
**affect budget** (how many failures this learner can absorb in a session before the
session must turn — an individual constant, not a global one); trigger inventory (what
reliably produces distress for this learner, so it can be engineered out); recovery
profile (what restores this learner, and how long it takes); robustness licensing
(explicitly recording that a learner tolerates struggle well, so the system does not
over-protect a resilient learner into boredom — this is as important as flagging
fragility, and almost always omitted).

**Inputs.** Affect + load + effort sensors (convergent evidence required), outcome
sequences, session history, explicit learner statements (weighted highest — a learner
saying "I'm frustrated" is not a hypothesis).

**Outputs.** Affect band for the kernel; recovery parameters; session-shape constraints.

**Internal logic.** States are hypotheses with decay; an affect state that has not been
refreshed by evidence weakens rather than persisting indefinitely. The build-slow /
collapse-fast asymmetry is modelled explicitly: confidence takes many successes to build
and one bad sequence to destroy, so the affect budget is spent conservatively and
restored slowly.

**Ownership.** Sole writer of affective state. **Must not own** the recovery *action*
(C-31) — it says the learner is in distress and how they recover; C-31 does it.

**Failure modes.** False positives (over-triggering recovery patronizes and interrupts
flow — mitigated by convergent evidence and a bias toward the learner's explicit
statements); text-only affect blindness (acknowledged limit: with text alone the system
must lean on explicit statements, behavioural patterns, and abstention rather than
pretending to read emotion from prose — and it must *say* it is uncertain rather than
act confidently on a weak signal); cultural expression differences (per-learner baselines,
not universal cues).

**Evolution.** Voice and interaction-dynamics channels raise this model from weak to
strong; this is the single largest available accuracy gain in the whole Twin.

---

## C-20 · Learner Twin — Metacognitive Model

**Why it exists.** The strongest predictor of long-run learning is not current knowledge
but the learner's ability to know what they do not know. It is also a *teachable skill*
and therefore a legitimate curriculum target in its own right. Systems that only model
domain knowledge cannot teach it, cannot measure it, and — worse — actively erode it by
supplying answers before the learner has noticed they need one.

**Purpose.** Model and support the learner's ability to monitor, plan, and regulate their
own learning.

**Responsibilities.** Calibration (the gap between stated and actual confidence,
per-domain and overall, tracked as its own developmental ladder); self-monitoring
(does the learner notice their own errors?); strategy repertoire (what study strategies
they use, and whether they use effective ones); help-seeking quality (do they ask
productive questions or request answers?); planning ability.

**Inputs.** Confidence sensor vs. correctness outcomes (the calibration join), help
requests, self-corrections, strategy choices, and — where appropriate — explicit
prediction prompts ("how sure are you?") whose value is *diagnostic and instructional at
once*.

**Outputs.** Calibration state; metacognitive teaching targets; a scaling factor on how
much self-report the rest of the system should trust — which is the field that makes
placement, help-seeking, and mastery self-assessment work at all.

**Ownership.** Sole writer of metacognitive state. **Must not own** domain knowledge.

**Failure modes.** Measuring calibration on too little data and acting on noise (minimum
evidence thresholds); teaching metacognition as a lecture (it is trained through
prediction-then-feedback cycles embedded in ordinary teaching, which is a constraint on
C-30, not a separate curriculum).

**Evolution.** Calibration becomes a reported outcome alongside mastery — arguably the
more valuable of the two for a lifetime learner, and a genuine differentiator when it is
the metric the platform is willing to be judged on.

---

## C-21 · Learner Twin — Identity & Motivation Model

**Why it exists.** "I'm not a maths person" ends more mathematical educations than any
cognitive deficit. Self-concept determines whether a learner interprets difficulty as
*evidence they are learning* or as *evidence they do not belong*. This is the highest-
leverage variable in education, and it is essentially absent from every existing system's
data model — where "motivation" appears at all, it appears as streaks and points, which
address behaviour frequency and not self-concept at all.

**Purpose.** Model the learner's relationship to the subject and to themselves as a
learner, and make it a first-class teaching target.

**Responsibilities.** Domain self-concept and its trajectory; attribution style (effort
vs. fixed ability); goal orientation (mastery vs. performance vs. avoidance); intrinsic
interest map (what this person actually cares about — the raw material for every
contextualization decision); source of motivation (self, guardian, exam, career);
declared purpose and its evolution; belonging signals.

**Inputs.** Learner statements (verbatim: "I've always been bad at this" is a
high-priority event, not small talk), attribution language after failure, topic
engagement asymmetries, choice behaviour, longitudinal persistence patterns.

**Outputs.** Identity risk flags; contextualization inputs (which examples will land for
this person); framing constraints on the Relationship Engine; long-horizon goals for the
Session Planner.

**Internal logic.** Identity change is slow, and the architecture matches that timescale:
it accumulates *evidence of competence* the learner cannot dismiss — their own past work,
their own trajectory, difficulties they have already overcome — and surfaces it at
attribution-critical moments. The design principle is that identity is repaired with
*evidence*, not encouragement; praise is cheap and the learner knows it.

**Ownership.** Sole writer of identity state. **Must not own** manipulation. Hard
constraint: this model may never be used to increase engagement against the learner's
interest. Its outputs are available to the Relationship Engine and the Human Plane, and
are explicitly out of scope for any retention-optimizing objective — a boundary that must
be architectural, because the commercial pressure to cross it is permanent.

**Failure modes.** Stereotype encoding (the model stores *this learner's* stated
self-concept and observed behaviour, never demographic inference — demographic-conditioned
priors are prohibited); over-interpretation of a bad day.

**Evolution.** Identity trajectory becomes a headline platform outcome: the fraction of
learners who arrive saying "I can't do this" and leave saying otherwise is the most
honest measure of an educational system that exists.

---

## C-22 · Memory & Forgetting Model

**Why it exists.** Knowledge decays, at a rate that depends on the learner, the material
type, the encoding strength, and the retrieval history. Without an explicit model, a
system either treats mastery as permanent (and builds on sand) or re-tests everything
(and wastes the learner's life). Both failures are avoidable with a model that is not
difficult — merely usually absent.

**Purpose.** Estimate current retrievability for every claim the learner has learned, and
maintain the parameters that make scheduling personal.

**Responsibilities.** Per-(learner, claim) retention state; per-learner forgetting-rate
estimation (the key personalization parameter — individual variation here is large);
encoding-strength tracking (how well it was learned the first time predicts how slowly it
decays); interference modelling (similar material learned nearby degrades both);
consolidation effects (sleep intervals crossed since encoding); the seven-status
distinction between FRESH, CONSOLIDATING, STABLE, DECAYING, DORMANT, FORGOTTEN-RECOVERABLE,
and LOST.

**FORGOTTEN-RECOVERABLE is the status the architecture cares most about.** A learner who
"has forgotten" fractions has not returned to zero — the storage is intact, the retrieval
route has weakened. The treatment is cueing, taking minutes. Re-teaching takes weeks and
insults them. This distinction, carried in the data model, is worth more than most
adaptive-learning features.

**Inputs.** Retrieval events (only *successful retrieval* strengthens — exposure does
not), memory time (C-02), material type from the graph, interference events.

**Outputs.** Current retrievability per claim; optimal review timing; decay-adjusted
mastery for the Mastery Engine.

**Ownership.** Sole writer of retention state. **Must not own** scheduling decisions
(C-27 consumes this) or mastery criteria (C-24).

**Failure modes.** Applying fact-decay curves to schemas (different node kinds decay
differently — the graph's node-kind field exists partly for this); cold-start with no
personal forgetting rate (population prior, explicitly flagged low-confidence, converging
within weeks); confusing "did not retrieve" with "was never encoded."

**Evolution.** Joint optimization across a learner's entire graph — scheduling that
accounts for the fact that reviewing a downstream concept also strengthens its
prerequisites, so the optimal schedule is not per-item at all. This is a genuine and
under-exploited advantage of holding a graph rather than a deck.

---

## C-23 · Misconception Engine (runtime)

**Why it exists.** Detecting that a learner is wrong is easy; detecting *which wrong model
they hold* is the difference between re-explaining (which fails, because the learner's
model already explains the world to their satisfaction) and repairing (which works).

**Purpose.** Maintain, per learner, the ledger of active wrong models, their strength, and
their repair history.

**Responsibilities.** Hypothesis lifecycle for each candidate misconception (SUSPECTED →
ACTIVE → REPAIRING → DORMANT-VERIFIED, with no ERASED state, because misconceptions
regrow); strength classification (DOMINANT / UNDER-LOAD-ONLY / RESIDUAL); verbatim
evidence retention subject to rights profile; repair attempt history including **burned
collisions**; regrowth monitoring with scheduled re-probes that never fully stop;
metastasis checking — when a misconception sits on a prerequisite, everything downstream
built on it is suspect and must be re-verified, not assumed.

**Inputs.** Misconception-match sensor, error patterns, verbatim phrases, the
misconception graph (C-09).

**Outputs.** Active misconception set (a required input to asset compatibility filtering
and to the kernel); repair targets; regrowth alerts; population prevalence contributions.

**Internal logic.** Promotion from SUSPECTED to ACTIVE requires a *pattern*, not an
instance: repeated, fast, confidently-delivered errors consistent with one model. Speed
and confidence are what separate a misconception from a slip, which is why the confidence
sensor is load-bearing. A DORMANT-VERIFIED misconception keeps a permanent low-frequency
re-probe schedule; two regrowths trigger re-rating to high-risk and a redesign flag on the
repair path itself, which routes to authoring.

**Ownership.** Sole writer of per-learner misconception state. **Must not own** the
misconception taxonomy (C-09) or the decision to repair now (C-28).

**Failure modes.** False attribution damaging trust (being told you believe something you
do not is alienating — mitigated by strict promotion thresholds and by probing rather
than asserting); combinatorial explosion of hypotheses (bounded active set, ranked by
evidence and by downstream impact).

**Evolution.** Cross-learner discovery of undocumented misconceptions from wrong-answer
clustering, feeding C-09 — the platform learns things about human learning that were not
in any book.

---

## C-24 · Mastery Engine

**Why it exists.** Somebody must own the word "mastered," and there must be exactly one
definition of it in the entire system. In practice, educational platforms accrete five or
six competing notions (a percentage, a level, a completion flag, a band, a streak) that
were each locally reasonable and are mutually inconsistent, and no one can then say what
the platform means when it says a learner has learned something.

**Purpose.** Be the single authority that converts belief state into mastery judgements
and gate decisions.

**Responsibilities.** Own the mastery vocabulary and the ladder-to-mastery mapping; own
the **evidence hierarchy** (what counts, and how much); evaluate gates; own the
never-advance-without-evidence rule; own category/unit-level aggregation (when is a whole
domain mastered?); own the ANCHORED state that makes a category permanently exempt from
re-teaching.

**The evidence hierarchy, strongest to weakest** — this ordering is the system's
scientific and ethical core, because it is where the incentive inversion is enforced:
1. Spontaneous correct transfer to a genuinely novel context, unprompted, after delay
2. Independent correct performance after a delay, no hints
3. Independent correct performance, same session, no hints
4. Correct performance with minimal hinting
5. Correct performance with scaffolding
6. Correct recognition / multiple choice
7. Correct imitation or echo
8. Self-report

Gates require a *conjunction across evidence types*, not a count of successes — because
five instances of type 6 do not sum to one instance of type 2. And crucially the criteria
are **per-claim**, drawn from the graph, not a global threshold: a safety-critical
procedure and a piece of cultural vocabulary do not deserve the same bar.

**Inputs.** Epistemic state, decayed retrievability, misconception state (an ACTIVE
contradicting misconception blocks mastery regardless of score — the single most
important veto in the system), transfer evidence, assessment results.

**Outputs.** Mastery classification per claim and per category; gate verdicts with
rationale; readiness signals; the ANCHORED set.

**Ownership.** Sole authority on mastery semantics. **Must not own** belief estimation
(C-18) or what to do about a failed gate (C-28).

**Failure modes.** Gate too strict → learners never progress and abandon; too loose →
hollow advancement and downstream collapse. Resolution: gates are *measurable
hypotheses* — the Analytics plane continuously validates each gate by checking whether
learners who passed it succeeded downstream, and mis-calibrated gates are surfaced as
defects. This makes mastery criteria empirical rather than doctrinal, which is the only
defensible position.

**Evolution.** Per-claim gate criteria learned from downstream-success data; mastery
becomes a *predictive* claim ("this learner will retain and apply this in six months with
probability p") rather than a *descriptive* one — which is what mastery always meant and
never previously said.

---

## C-25 · Assessment Engine

**Why it exists.** Assessment is the system's only sensor for F4, and it is the sensor
most easily corrupted — by teaching to it, by learner gaming, by predictability, and now
by the fact that every learner has a frontier model in an adjacent tab. Assessment must
therefore be designed as *measurement under adversarial conditions*, not as quizzing.

**Purpose.** Manufacture the evidence the Twin and the Mastery Engine need — deliberately,
efficiently, and without teaching the learner that this is a test.

**Responsibilities.** Item selection maximizing information gain for the current
hypothesis (including hypotheses about *misconceptions*, not only ability); adaptive
diagnostic search (binary search over prerequisite chains to localize a gap in few
questions); distractor-mapped items where each wrong option identifies a specific
misconception; transfer item construction using C-11 and the learner's exposure history;
invisible assessment (evidence gathered inside ordinary teaching interaction, which is
how human tutors do nearly all of their assessing); spacing-aware delayed probes; and
integrity.

**Integrity in the age of ubiquitous AI** — this is a genuinely new architectural
requirement and deserves its own answer rather than a policy footnote:
- *Process over product*: evidence from how an answer was produced (timing profile, edit
  history, intermediate steps, hesitation location) is far harder to outsource than the
  answer, and the multimodal plane exists partly to capture it.
- *Oral defence*: a short spoken or conversational follow-up on a submitted answer
  ("why did you divide there?") is cheap, fast, and near-impossible to outsource in real
  time.
- *Unpredictable, personalized items*: items generated against this learner's own exposure
  history are not searchable and not shareable.
- *Reframing rather than policing*: the system's stance is that outsourced answers
  produce a *worse learner model*, harming the learner, and this is explained plainly.
  The architecture makes honesty rational rather than making dishonesty impossible —
  because it cannot be made impossible, and pretending otherwise builds a surveillance
  system instead of a teacher.

**Inputs.** Belief state and its uncertainty, misconception hypotheses, item bank
(C-14), exposure history, memory state.

**Outputs.** Selected items with expected information gain; scored outcomes with evidence
class; diagnostic conclusions; integrity signals.

**Ownership.** Owns item selection and evidence classification. **Must not own** the
mastery decision (C-24) or the teaching response to failure (C-28/C-31).

**Failure modes.** Assessment-shaped teaching (the "quiz register" collapse, where the
system asks and asks and never gives — prevented structurally by the question budget in
the Turn Contract, not by instruction); item exposure and leakage (large banks, generated
variants, exposure tracking); anxiety induction (invisible assessment is the default,
explicit testing is announced and framed, and assessment never runs during an ungated
affect state).

**Evolution.** Item parameters (difficulty, discrimination, distractor pull) estimated
empirically at scale, making the bank a calibrated instrument; eventually, item selection
that optimizes *long-run learning* rather than measurement precision, since a probe is
also an act of retrieval practice and therefore itself an intervention.

---

## C-26 · Placement Engine

**Why it exists.** Where teaching begins determines whether a learner stays. Start too
low and a capable learner leaves bored, having concluded the system is for children.
Start too high and a fragile learner concludes they are stupid — and that error is far
more costly and far less recoverable than the first. Placement is a single high-stakes
inference from almost no evidence, under systematically distorted self-report.

**Purpose.** Determine, per subject, the correct entry point into the graph, and the
confidence in that determination.

**Responsibilities.** Trust-calibrated interpretation of self-report (systematic
under-reporting by anxious and adult learners, over-reporting by the Dunning–Kruger band,
both age- and shame-dependent); efficient search — binary search over cut-nodes in the
prerequisite lattice, not a linear placement test; per-branch frontiers, because
knowledge is patchy and a single "level" is a fiction (strong algebra, weak geometry is
the normal case, not the exception); confidence labelling (ANCHORED / PROBABLE /
UNCERTAIN / UNKNOWN) per region; resumption placement for returning learners from their
high-water mark rather than from scratch.

**Inputs.** Self-report, prior history (internal or imported), diagnostic probe results,
the curriculum lattice, metacognitive trust factor (C-20).

**Outputs.** Per-branch entry points with confidence; a patchy-history flag;
just-in-time prerequisite repair targets.

**Internal logic.** Two rules matter most. **Nerve-settler first**: the first item is
below the estimated level, always, because the first experience must be a success.
**Downward adjustment is silent, upward adjustment is celebrated**: discovering a learner
is weaker than claimed is handled by quietly changing the material, never by announcing
it. And placement **never writes fake completions** — it moves the entry point, and the
learner's record honestly says "not yet demonstrated" for everything skipped, so that any
skipped prerequisite can be repaired just-in-time when it actually bites.

**Ownership.** Owns entry-point determination. **Must not own** mastery state — placing a
learner past a concept is explicitly *not* a claim that they have mastered it, and
conflating those is the most common and most damaging shortcut in this area.

**Failure modes.** Over-testing at the door (a 40-question placement test is an attrition
machine — the budget is a handful of well-chosen items); mis-placement of returning
learners (handled by decay-aware warm-up rather than re-placement).

**Evolution.** Placement becomes nearly invisible: the first teaching session *is* the
placement, with items chosen for information gain while the learner experiences a lesson.

---

## C-27 · Review Scheduler

**Why it exists.** Everything taught is forgotten unless scheduled. Review is the highest
return-on-time activity in learning and the one learners will never do voluntarily. It
runs on memory time (A5), independently of session structure, and it is the reason the
platform must be *proactive* rather than waiting to be opened.

**Purpose.** Decide what should be retrieved, when, for every learner, across their entire
graph.

**Responsibilities.** Per-claim optimal review timing from C-22; global optimization
across the learner's whole graph under a bounded daily review budget; interleaving
(mixing claims to build discrimination, which is the difference between recall and
usable knowledge); prerequisite-aware scheduling (reviewing downstream material
implicitly strengthens upstream, so scheduling both is waste); pre-emptive scheduling
before a dependent concept is taught, so prerequisites are fresh exactly when needed —
the highest-value scheduling move available and one that only a graph-holding system can
make; and proactive outreach when a valuable review is going stale.

**Inputs.** Retention estimates, upcoming curriculum, learner availability and attention
budget, exam or deadline horizons.

**Outputs.** Prioritized review queue; session-opening review sets; proactive nudges.

**Ownership.** Owns *when* to review. **Must not own** *how* to review (C-30) or whether
mastery is retained (C-24).

**Failure modes.** Review debt spirals (a returning learner facing 400 due items quits —
mitigated by a hard bounded daily budget, prioritized by downstream importance, and an
explicit amnesty/re-consolidation protocol after long gaps); nagging (outreach governed by
the Relationship Engine's earned permission, not by a scheduler's opinion of urgency);
scheduling as busywork (review items must be *retrieval*, never re-exposure).

**Evolution.** Fully joint scheduling as a graph-level optimization with an explicit
objective (maximize expected retained, transferable mastery per learner-minute) — the
cleanest formal statement of what the platform is actually for.
