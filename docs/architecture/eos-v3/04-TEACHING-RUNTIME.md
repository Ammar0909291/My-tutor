# EOS v3 · Planes 2 & 3 — Decision and Delivery

Plane 2 decides. Plane 3 delivers. The boundary between them is absolute and is the
mechanism by which an LLM-based system becomes trustworthy: by the time text is
generated, every consequential choice has already been made, recorded, and constrained.

---

# Plane 2 — Decision

## C-28 · Decision Kernel

**Why it exists.** Something must be the single executive. When teaching decisions are
distributed — some in a prompt, some in a rule, some emergent from a model — no one can
say why the system did what it did, two authorities eventually disagree, and the
disagreement is resolved by whichever code path ran last. The kernel is the one place
where "what happens next" is decided, and it is deterministic (A3) and explainable (A4).

**Purpose.** Produce exactly one decision per turn, in strict band order, with a complete
rationale.

**Responsibilities.** Evaluate the four bands in order and stop at the first that
resolves; assemble the decision object; record it to the Ledger *before* rendering;
guarantee that a decision is always produced (there is no null case — silence is also a
decision, and it is sometimes the right one).

**Band evaluation** (A13):

```
Band 0 · SAFETY      → harm indicators, crisis disclosure, age-inappropriate request,
                       abuse signal. May terminate the session, may summon a human,
                       may hand off to a crisis pathway. Nothing overrides it.
Band 1 · AFFECT      → distress, shame, overload, collapse, explicit "I can't".
                       Preempts to Recovery (C-31). Content never delivered over
                       an ungated affect state.
Band 2 · POLICY      → teaching-state legality (C-29), mastery gates (C-24),
                       struggle budget (C-32), spacing obligations (C-27),
                       session shape (C-33). Produces the *legal action set* and
                       every "no" the system gives.
Band 3 · TACTICS     → selection within the legal set: which action, which
                       representation, which asset, which words. The only band
                       where preference, history, and controlled exploration operate.
```

**Inputs.** Twin projection (all five sub-models), teaching state, mastery/gate verdicts,
schedule obligations, budget envelope, legal action set, asset availability.

**Outputs.** `Decision {band, ruleId, action, target, constraints, alternativesRejected[],
rationale, policyVersion, kernelVersion}`.

**Internal logic.** Bands 0–2 are rule systems, not models. Band 3 is a *selector*: a
funnel narrowing the legal set by knowledge type → learner constraints → history and
exposure → cognitive load → effectiveness evidence → tie-break. Ties are broken
deterministically (seeded by learner and turn id) so that behaviour is reproducible on
replay.

Crucially, `alternativesRejected` is mandatory. A decision record that only says what was
chosen cannot be debugged and cannot be learned from; recording what was *not* chosen and
why is what allows the Analytics plane to ask counterfactual questions later.

**Ownership.** Sole authority on the per-turn teaching decision. **Must not own** learner
state (Plane 1), rendering (C-35), or content (C-14).

**Failure modes.** Rule sprawl (mitigated by the band structure — most rules live in
Band 2 and are expressible as legality constraints rather than as branching logic);
unhandled state combinations producing an implicit default (mitigated by a completeness
requirement: the decision matrix must be *total* over the state space, and any uncovered
cell is a build-time failure, not a runtime surprise); over-determinism producing robotic
teaching (addressed at Band 3, where legitimate variation lives, and in rendering).

**Evolution.** Bands 0–2 stay rule-based permanently — that is the point. Band 3's
selector becomes a learned policy trained on the decision-consequence join, with the
legal set as a hard action mask. This is the safest possible way to introduce learned
decision-making: the model can only choose among options the rules already permitted.

---

## C-29 · Teaching State Machine

**Why it exists.** Lesson plans are fictions: the learner deviates, and then the plan is
either abandoned (chaos) or followed anyway (the classic scripted-courseware failure).
The alternative is a state machine with *legality constraints* — the system cannot enter
an illegal state regardless of what anything else wants (A14). This is how "never assess
before teaching" and "never advance on an echo" become structurally impossible rather
than usually avoided.

**Purpose.** Track where teaching is, and define what is legal from here.

**Responsibilities.** Maintain per-concept and per-session state; define legal
transitions and their evidence requirements; expose the legal action set to the kernel;
handle preemption and correct re-entry.

**States** (per concept): `UNSTARTED → FRAMED → INSTRUCTED → GUIDED → RELEASED →
VERIFIED → CONSOLIDATED → TRANSFERRED`, plus the orthogonal, preemptive `RECOVERY`.

**Legality rules that make it worth having:**
- No assessment action is legal before INSTRUCTED. (Kills "quiz first".)
- Advancement out of GUIDED requires *unassisted* evidence. (Kills echo-advancement.)
- RECOVERY preempts from any state and exits **one rung below entry**, never to
  UNSTARTED. (Kills the invisible restart.)
- No more than N consecutive question-actions; after N the next action must *give*.
  (Kills the quiz register — enforced here as legality and again in the contract.)
- No new concept may be FRAMED while an ACTIVE misconception contradicts a prerequisite
  of it. (Kills teaching on corrupted foundations.)
- CLOSING is never sacrificed to content; it is reserved from the attention budget.

**Inputs.** Decision outcomes, observation evidence, mastery verdicts, affect band.

**Outputs.** Current state, legal action set, transition events.

**Ownership.** Owns teaching-process state and legality. **Must not own** what to choose
from the legal set (C-28 Band 3) or learner knowledge (C-18).

**Failure modes.** State/reality divergence when a learner jumps topics conversationally
(mitigated by treating learner-initiated topic change as a first-class transition with
its own state stack, so returning is possible); deadlock at a gate the learner cannot
pass (mitigated by the escalation ladder in C-31 and by a *stuck-concept protocol* that
routes to a prerequisite or a different representation before the learner routes
themselves out of the product).

**Evolution.** Legality rules become the executable form of the pedagogical literature —
a machine-checkable encoding of what teaching research actually established, versioned
and testable (A19).

---

## C-30 · Strategy Engine

**Why it exists.** Between "the learner is fragile on this concept" and "say these words"
lies a large, genuinely pedagogical decision: which teaching move, which representation,
which example, which difficulty. Leaving it to the renderer means it is decided by
next-token plausibility. Encoding it as fixed scripts means it cannot adapt. It needs to
be an explicit, evidence-informed selection over an enumerated action space.

**Purpose.** Choose the teaching approach — action, representation, example,
difficulty — from the legal set.

**Responsibilities.** Own the teaching action catalogue (a closed, enumerated set across
families: demonstrate, explain, worked example, analogy, contrast, elicit, probe,
error-analysis, model-the-thinking, practice, retrieval, organize, apply, connect);
select representation via C-10; select difficulty via C-32; select the concrete asset via
C-14 with effectiveness and incompatibility filters; maintain per-learner approach
history so the system does not repeat what already failed for this person.

**Internal logic — the selection funnel.** (1) An authored per-concept dispatch, if one
exists, wins outright — human expertise on this specific claim beats generic policy.
(2) Otherwise filter by knowledge type (a Procedure is not taught like a Schema).
(3) Filter by state legality. (4) Filter by learner constraints (reading load, attention,
modality, accessibility). (5) Filter by history — never repeat a failed approach; prefer
approaches with evidence for this learner. (6) Filter by cognitive load against current
capacity. (7) Tie-break by population effectiveness, with an exploration slice reserved
for C-43.

**The repetition rule is load-bearing**: re-delivering the same explanation, rephrased, is
the single most common AI-tutor failure and conveys zero new information. The engine is
structurally forbidden from selecting the same representation family twice in a row on
the same claim after a failure; it must change *something real*.

**Inputs.** Legal action set, Twin state, misconception set, asset catalogue,
effectiveness evidence, approach history.

**Outputs.** Chosen action + representation + asset references + difficulty target.

**Ownership.** Owns approach selection. **Must not own** action legality (C-29) or
delivery (Plane 3).

**Failure modes.** Empty libraries for most claims (the honest, dominant failure mode of
any such system at launch — the funnel is complete but its content is not, which is why
authoring priority is computed from graph centrality, and why generic per-knowledge-type
defaults must be good enough to stand alone); over-personalization from thin evidence
(minimum-evidence thresholds before any per-learner preference is honoured).

**Evolution.** A learned policy over the enumerated action space, trained on the
decision-consequence join, with the legal set as an action mask — the same containment
pattern as C-28 Band 3.

---

## C-31 · Recovery Engine

**Why it exists.** Every learner will, repeatedly, reach a state where teaching cannot
proceed: confusion, frustration, shame, exhaustion, or simply "I don't know" for the third
time. What the system does in those moments determines whether the learner returns
tomorrow. It is the most consequential and most neglected subsystem in educational
software, and it must be *preemptive* — it cannot be a branch in the teaching logic,
because by the time teaching logic runs, teaching has already been decided.

**Purpose.** Detect stuck and distressed states and execute the appropriate repair before
any teaching resumes.

**Responsibilities.** Detect failure states (from C-19 and explicit learner utterances —
"I don't know", "this is too hard", "just tell me", "I'm stupid", silence, "?");
select and execute the matching recovery protocol; manage the escalation ladder when
recovery itself fails; enforce the exit rule (resume one rung below entry, never at zero);
record the recovery event as evidence, including *what caused it*.

**Internal logic.** Every protocol follows the same three-move shape: **validate**
(the learner's state is normal and named without drama), **shrink** (reduce to something
they can certainly do — smaller numbers, one step, a recognition instead of a
production), **bank a win** (get a success on the record before anything else happens).
Then, and only then, teaching resumes one rung lower.

Two rules distinguish a real recovery engine from a sympathetic phrase:
- **"I don't know" before any demonstration is tutor feedback, not learner data** — it
  means a question outran the teaching. The correct response is to *give* something, and
  the event is logged against the decision that caused it (a premature-question defect),
  not against the learner.
- **Shrinking must not mean another question.** If there is nothing yet for the learner to
  answer from, another question — however gentle — is the same failure again.

**Escalation ladder**, one dimension changed per rung: same concept simpler → different
representation → drop to prerequisite → change modality → change activity type → end the
session on a deliberate win. Reaching the last rung twice on the same concept is a defect
report against the concept's teaching assets, routed to authoring.

**Inputs.** Affect state, failure-state detection, recovery scripts (C-14), learner
recovery profile (C-19).

**Outputs.** Recovery action (preemptive, overrides the turn), recovery evidence,
authoring defect reports.

**Ownership.** Owns recovery execution and the escalation ladder. **Must not own** affect
estimation (C-19) or long-run strategy (C-30).

**Failure modes.** Over-triggering (interrupts flow, patronizes — mitigated by
thresholds and by the robustness licensing in C-19); scripted sameness (a learner who
hears the identical reassurance five times stops believing it — the script library is
varied and per-learner-rotated); recovery becoming avoidance (a system that flees every
difficulty teaches nothing — which is precisely why C-32 exists as its counterweight).

**Evolution.** Per-learner recovery personalization (what restores *this* person, learned
from their own history) is one of the clearest wins available, and it is exactly the kind
of knowledge only the venue where learning happens can accumulate.

---

## C-32 · Struggle Controller

**Why it exists.** This component is the architectural expression of the platform's
central commitment, and the clearest structural difference between a tutor and an
assistant. An assistant is aligned with the learner's present comfort: asked for an
answer, it gives one; struggle is friction to be removed. A teacher is aligned with the
learner's future competence: difficulty is the *mechanism* of learning, and the answer is
often deliberately withheld. Left to a model's disposition, the assistant behaviour wins
every time, because it is what the training distribution rewards. So it must be
controlled explicitly — and, being explicit, it must also be bounded, because uncontrolled
struggle is just cruelty.

**Purpose.** Maintain the learner in the productive-difficulty band: hard enough that
learning occurs, not so hard that affect collapses.

**Responsibilities.** Estimate current success rate over a rolling window; hold the target
band (a productive failure rate, personalized — a resilient learner's band sits higher);
adjust difficulty, hint availability, and scaffolding to steer toward it; enforce hint
discipline (hints escalate in specificity slowly; the answer is the last resort, not the
first); own the **answer-withholding policy** and the honest explanation of it; hard-stop
on affect signals from C-19 — the band is abandoned instantly when a learner is
distressed, because desirable difficulty is only desirable to a learner who is
psychologically safe.

**Inputs.** Rolling outcomes, affect state, persistence profile, concept difficulty,
learner goals (an exam in three days legitimately shifts the band toward consolidation).

**Outputs.** Difficulty target, hint policy, scaffolding level, withholding decisions.

**Ownership.** Owns the difficulty control loop. **Must not own** affect (C-19 has veto)
or content difficulty definitions (C-08).

**Failure modes.** Confusing struggle with suffering (the affect veto is absolute);
optimizing engagement instead of learning (this component must never be given an
engagement objective — a structural prohibition, since a struggle controller tuned for
engagement inverts into the exact assistant behaviour it exists to prevent);
learner resentment at withheld answers (mitigated by explaining the reason plainly, once,
in the learner's terms, and by always providing a path forward rather than a refusal).

**Evolution.** Per-learner, per-domain optimal difficulty learned from long-run retention
outcomes rather than from session-level success — the correct objective, and one that only
becomes measurable after years of longitudinal data.

---

## C-33 · Session Planner

**Why it exists.** A session is not a queue of turns; it has a shape, and the shape
determines what the learner remembers and whether they return. Opening, core, verification,
and close each do different work, and the close does the most — the last event colours the
memory of the entire session.

**Purpose.** Own the macro structure of a learning session under the attention budget.

**Responsibilities.** Compose the session shape (opening retrieval → new content → guided
practice → verification → close); allocate the attention budget across phases with the
close **reserved and protected**; decide session content (due reviews vs. new concepts vs.
repair) under goals and schedule pressure; detect and honour session boundaries; own the
compaction protocol when time runs short (what gets dropped — always content, never the
close); handle the abandoned-session debt (a session that ended mid-struggle owes a close,
paid at the start of the next one, as an engineered win before anything else).

**Inputs.** Review queue, curriculum position, repair queue, attention budget, learner
availability, affect and momentum state.

**Outputs.** Session plan, phase transitions, close trigger, continuity obligations.

**Ownership.** Owns session shape and time allocation. **Must not own** per-turn decisions
(C-28) or content (C-30).

**Failure modes.** Plan rigidity (the plan is a *budget allocation*, not a script — the
kernel may deviate freely within it); the "one more thing" overrun that eats the close
(prevented by reservation); sessions that end because the learner left rather than because
they finished (detected, flagged, and treated as the churn signal it is — a
failure-then-vanish event is the most actionable datum the product produces).

**Evolution.** Multi-session arcs — a planner that reasons over weeks and months rather
than one sitting, coordinating with the Review Scheduler and long-horizon goals.

---

# Plane 3 — Delivery

## C-34 · Prompt Compiler

**Why it exists.** "Prompt engineering" is what a system does when it has no compiler.
Hand-written prompt text is unversioned, untestable, unattributable, and mixes twelve
concerns in one string. Treating the model-facing instruction as a *compiled artifact*
from typed inputs makes it versioned, diffable, testable, and — most importantly —
verifiable against the same contract that produced it.

**Purpose.** Compile a Decision plus a TurnContract into the concrete instruction set and
context for the renderer.

**Responsibilities.** Assemble from typed fragments (never free text): the role and voice
specification, the contract's must/must-not clauses, retrieved assets, the minimum
necessary learner context, the required artifacts, and the output structure. Enforce
context minimality — the renderer receives *only* what it needs to voice this turn, never
the learner's full model, because everything supplied is something the renderer can leak
or reason from. Emit the compiled artifact with a hash for reproducibility.

**Internal logic.** Compilation is monotone narrowing, in a fixed order, matching contract
composition: base voice → action template → asset injection → constraint clauses → safety
clauses last (so nothing can be narrowed away after them). Every fragment is versioned and
independently testable, and the compiler emits the fragment manifest into the Ledger, so
any output can be traced to the exact instruction set that produced it.

**Ownership.** Owns instruction assembly. **Must not own** the decision (C-28), the
contract's content (C-04), or verification (C-36).

**Failure modes.** Context bloat degrading both cost and compliance (minimality is
enforced as a budget, and measured); fragment interaction bugs where two independently
correct fragments contradict each other (mitigated by a fragment-pair compatibility
matrix in the test suite); leakage of the answer into context on a probing turn
(structurally prevented: on a probe turn, the answer is simply not compiled in).

**Evolution.** Contracts become the fine-tuning target and the compiler shrinks: a model
trained to satisfy contracts needs far less instruction, and eventually the compiled
artifact is a compact structured object rather than prose.

---

## C-35 · Renderer

**Why it exists.** Something must turn a decision into human language that a specific
person, in a specific emotional state, at a specific age, in a specific language, will
actually absorb. This is genuinely hard, genuinely valuable, and exactly what large
language models are extraordinarily good at. This is the model's home.

**Purpose.** Voice a decision that has already been made.

**Responsibilities.** Produce the learner-facing utterance satisfying the contract;
maintain voice consistency (the tutor is one recognizable person, not a new personality
each turn); adapt register to the learner without ever *dropping* register on error;
prefer retrieved assets and voice around them rather than regenerating what already
exists.

**Inputs.** Compiled instruction set, retrieved assets, contract.
**Outputs.** Candidate utterance + structured side-channel (any observations it noticed,
offered as *sensor input for the next turn*, never as a decision).

**Ownership.** Owns wording, tone, and flow. **Must NOT own** — and this is the whole
point — what to teach, whether to advance, whether to reveal an answer, whether the
learner is right, or what the learner knows. Structurally: the renderer receives no
mastery state, cannot write to the Ledger, and its output passes a gate before reaching
anyone.

**Failure modes.** Contract violation (caught by C-36 — the expected, designed-for case,
not an exception); persona drift across a long relationship (mitigated by a versioned
voice specification and periodic consistency evaluation); hallucinated content beyond the
assets (mitigated by asset-grounding and by factual verification on any generative claim);
sycophancy — praising a wrong answer because agreement is the trained default (caught by
the verifier's correctness-consistency check against the sensor's verdict, which is one of
the most valuable checks in the gate).

**Evolution.** Distilled small models fine-tuned on the platform's own contract-satisfying
outputs: cheaper, faster, more compliant, and private. Rendering is the component most
likely to become fully local.

---

## C-36 · Output Verifier

**Why it exists.** This is the component that makes an LLM-based tutor safe to deploy at
scale. Everything upstream can be perfect and still fail if the last step is a
probabilistic text generator with no gate. The verifier converts "the model usually obeys"
into "the learner never receives a violation."

**Purpose.** Enforce the TurnContract on every utterance before it reaches a learner (D5).

**Responsibilities.** Evaluate the contract's success predicate — move classification
(did it do what it was told to do?), question count, forbidden-reveal containment,
vocabulary budget against the learner's known lexicon, register and readability bounds,
length bounds, required artifact presence, safety screens, and **correctness consistency**
(the utterance must not treat a wrong answer as right, or vice versa, relative to the
sensor's verdict). Then: pass, repair, or degrade.

**Internal logic — the three outcomes.**
- *Pass* → emit.
- *Repairable* → constrained regeneration with the specific violation named, bounded
  retries, escalating constraint tightness.
- *Fail* → degrade one rung: serve a validated asset, then a deterministic template, then
  a shorter contract. **The learner always receives something correct**, and never
  receives an error.

Every rejection is logged with its violation class. That log is one of the most valuable
datasets the system produces: it is a continuous, automatic measurement of where the
renderer and the contracts disagree, and it drives both fine-tuning and contract redesign.

**Cost.** Verification must be cheap or it doubles inference cost. Most checks are
deterministic (counting, containment, readability, lexicon diff) and run in single-digit
milliseconds. Only move-classification and correctness-consistency may need a model, and
both are small, fast classifiers.

**Ownership.** Owns the final gate. **Must not own** content authorship or decisions.

**Failure modes.** Verifier as a bottleneck (deterministic-first design); false rejections
frustrating a correct renderer (measured as its own metric — a verifier with a high false
rejection rate is itself a defect); a contract no output can satisfy (satisfiability
pre-check plus the declared relaxation order in C-04); verifier blind spots giving false
assurance (mitigated by adversarial red-team suites and by treating verifier coverage as a
tracked, reported quantity rather than an assumption).

**Evolution.** Verification signals become the reward model for renderer training; the
long-run trajectory is that violations become rare and the verifier's role shifts from
gate to monitor — but it never leaves the path.

---

## C-37 · Conversation Controller

**Why it exists.** Even with the decision and the words settled, delivery has its own
craft: turn-taking, timing, silence, interruption, multi-part messages, and the
maintenance of a conversation that feels like one continuous relationship rather than a
sequence of independent responses.

**Purpose.** Manage the mechanics and continuity of the interaction.

**Responsibilities.** Turn-taking and wait-time (the single most under-used tutoring
technique — silence after a question is *instructional*, and the system must be capable of
deliberately not filling it); burst segmentation (two sentences, then let the learner
act — never a wall of text); interruption handling; multi-part delivery pacing; open-loop
management across turn boundaries; conversation repair when the thread breaks; and
delivering the *close* as a distinct, protected act.

**Inputs.** Verified utterance, contract pacing constraints, channel state, learner
responsiveness patterns.
**Outputs.** Delivered turn, timing events, the response window, delivery records.

**Ownership.** Owns delivery mechanics and conversational continuity. **Must not own**
content or decisions.

**Failure modes.** Filling silence (a real, damaging default — wait time is an explicit
policy here, not an accident); losing thread across a session boundary (continuity
obligations from C-02 and C-40); channel-specific breakage (voice interaction has entirely
different turn-taking physics than text, and the controller must be channel-aware rather
than channel-agnostic).

**Evolution.** Real-time duplex voice with genuine interruption handling, which changes
turn-taking from a discrete to a continuous problem — the architecture isolates that
change inside this component.

---

## C-38 · Visualization & Simulation Engine

**Why it exists.** Some claims cannot be taught in words at any level of eloquence.
A learner who cannot see the vectors will not understand the forces. Beyond static
diagrams, *manipulable* simulations are how conceptual understanding of dynamic systems
is actually built — and they double as instruments, because how a learner manipulates a
simulation is a far richer signal about their mental model than any answer they type.

**Purpose.** Produce and serve visual and interactive representations as first-class
teaching artifacts.

**Responsibilities.** Select the renderer type (diagram, plot, animation, interactive
simulation, manipulative, annotation of learner work); serve concept-keyed cached visuals
rather than regenerating; generate new visuals through the offline authoring pipeline,
never in the learner's turn latency budget; enforce accessibility (every visual carries a
description that conveys the same *instructional content*, not a caption); capture
interaction telemetry from simulations as observations.

**Internal logic.** Visuals are assets (C-14) with identity, lifecycle, and effectiveness
evidence like any other. First encounter with an uncovered slot triggers background
authoring and serves the best available fallback; the second learner gets the cached
asset. This is the same economics as C-14 generally, and it is what makes rich visuals
affordable at scale.

**Ownership.** Owns visual production and selection. **Must not own** whether a visual is
pedagogically appropriate now (C-30).

**Failure modes.** Decorative visuals that add extraneous load and reduce learning (every
visual must justify itself against a stated instructional function); inaccessible content
(descriptions are mandatory, and an asset without one cannot go ACTIVE);
generation-in-the-loop latency (structurally prevented by the offline-authoring rule).

**Evolution.** Simulation-as-assessment: learner manipulation of a simulation becomes a
primary evidence channel, particularly for science and mathematics, where it exposes
mental models that language conceals.

---

## C-39 · Multimodal I/O Plane

**Why it exists.** Text is a lossy channel that discards most of the diagnostic signal a
human tutor uses. A tutor watching a student write sees the hesitation before the
denominator, the erased attempt, the pencil hovering — and hears the rising intonation
that turns an answer into a question. Text-only architectures do not lose a little
signal; they lose the majority of it, and then compensate by asking more questions, which
is exactly the failure mode this whole design is built to prevent. Moreover, in several
domains the modality *is* the subject: pronunciation, handwriting, and hand-worked
derivations cannot be assessed in typed text at all.

**Purpose.** Capture and deliver across every channel, preserving diagnostic signal that
text discards.

**Responsibilities.**
- *Input*: text with edit history; audio with prosody, latency, and hesitation location
  preserved; digital ink with stroke order and timing; camera capture of handwritten work;
  simulation interaction traces; explicit silence.
- *Output*: text, speech with prosodic control, visuals, interactive elements, haptics
  where available.
- Normalize all of it into a single MultimodalObservation for the Sensor Bank.

**The preservation rule.** The plane must not discard timing and prosodic information at
the transcription boundary. Transcribing speech to bare text and dropping the rest is a
one-line implementation choice that silently destroys the four strongest affect and
fluency instruments the system has. This is stated as an architectural requirement because
it is invisible as an implementation detail and irreversible as a data loss.

**Inputs.** Raw device signal, channel capabilities, accessibility profile.
**Outputs.** Normalized observations; channel-appropriate delivery.

**Ownership.** Owns capture, normalization, and rendering across channels. **Must not
own** interpretation (C-17).

**Failure modes.** Modality mismatch with the learner's context (a learner on a bus cannot
speak — capability negotiation per session, not per account); privacy of always-on capture
(explicit, revocable, per-session consent, with rights-profile gating; nothing is captured
by default that is not required); accessibility as an afterthought (the accessibility
profile is an *input* to contract composition, so an alternative channel is a first-class
path rather than a fallback).

**Evolution.** Camera-based work capture makes the entire universe of hand-worked
mathematics and science available for step-level diagnosis, which is where the real errors
live and where text-based tutors are effectively blind.

---

## C-40 · Relationship Engine

**Why it exists.** A great teacher's effectiveness rests substantially on the
relationship: a learner who trusts a teacher reports confusion honestly, and honest
confusion reports are the highest-quality input F1 can receive. So the relationship is not
sentimentality bolted onto a teaching system — it is the mechanism that determines the
signal-to-noise ratio of everything in Plane 1. It is also what makes a learner return,
which is the precondition for all long-term learning.

**Purpose.** Build and maintain the continuity, trust, and interpersonal history that make
honest interaction possible.

**Responsibilities.** Remember the *person*, not just the learner (interests, context,
what they said last week, what they were nervous about); maintain continuity across
sessions and long gaps ("how did the exam go?"); keep promises the system made; maintain
a consistent identity and voice; calibrate warmth to the individual and to age; manage
the return after a long absence without guilt-tripping; own the tone of proactive contact.

**Inputs.** Interaction history, identity/motivation model, session boundary events,
promises ledger, absence duration.
**Outputs.** Continuity elements for contract composition; proactive-contact permissions
and framing; relationship health signals.

**Ownership.** Owns relational continuity and earned-permission for outreach. **Must not
own** manipulation. Hard constraint, mirroring C-21: the relationship may never be
instrumented for engagement or retention metrics. A relationship optimized for retention
is not a relationship; it is a dark pattern, and the boundary must be architectural
because the pressure to cross it is permanent and commercial.

**Failure modes.** Uncanny over-familiarity (calibrated, and asymmetric by age — a
warmth level appropriate for a nine-year-old is unsettling to an adult professional);
false intimacy claims (the system is honest about what it is; it does not claim feelings
it does not have, and does not need to in order to be trusted); broken promises (a
promises ledger exists precisely so "we'll come back to that tomorrow" is kept, which is
a small thing that carries disproportionate trust weight).

**Evolution.** Decade-scale relationships: a system that taught someone to read and later
helps them with a professional certification holds a form of continuity no human teacher
can, and that is a legitimate, non-manipulative form of value.

---

## C-41 · Human Plane (teacher / parent / institution)

**Why it exists.** A tutor that cannot talk to the child's actual teacher is a silo, and
silos are how educational technology has repeatedly failed to matter. Beyond integration,
there is an accountability argument: A24 requires that every autonomous decision have a
human channel that can inspect and veto it, and A4's explainability is worthless without
someone to explain to. And there is a capability argument: humans can do things the system
cannot — notice a home situation, advocate, care in a way that counts because it costs
something.

**Purpose.** Make the system legible, correctable, and useful to the humans responsible
for the learner.

**Responsibilities.** Rights-scoped views of learner state (C-03 governs what each role
may see — and a learner's private struggles are not automatically a parent's business,
which is a design decision requiring explicit, age-dependent policy rather than a default);
teacher tooling (class-level views, misconception heat maps across a cohort, "who needs me
today", suggested small-group compositions); parent communication that is honest rather
than flattering; escalation channels both ways (system → human when something needs a
person; human → system to correct a misjudgement, and such corrections are *high-weight
evidence*); co-teaching mode where the system supports a human teacher's lesson rather
than replacing it; and safety escalation with a named responsible human.

**Inputs.** Learner state projections, rights profiles, institution structure, human
corrections and annotations.
**Outputs.** Role-scoped dashboards and reports; alerts; corrections into the Ledger as
first-class evidence.

**Ownership.** Owns human-facing views and the correction channel. **Must not own**
teaching decisions — though a teacher's explicit override is honoured and recorded, and
recurrent overrides in one direction are a defect signal against the policy that produced
them.

**Failure modes.** Surveillance dynamics (a parent dashboard showing every struggle turns
the tutor into an informant and destroys the honesty the whole Plane 1 depends on — hence
age-dependent, learner-visible disclosure policy, and aggregate-over-incident reporting by
default); dashboard overload for a teacher with 150 students (views are ranked by
actionability, not completeness — "these four students need you today, here is why");
correction channels that are ignored (human corrections carry high evidence weight and
their effect is visible to the person who made them, or they will stop making them).

**Evolution.** The system as institutional infrastructure: cohort-level curriculum
diagnosis, evidence for what a school's teaching is actually achieving, and a genuine
feedback loop between classroom practice and measured learning outcomes.
