# EOS v3 · Self-Critique, the Regret Test, and Final Invariants

The architecture in files 00–05 is the *output* of the process recorded here, not its
input. Five critique rounds and four regret rounds were run; each one that found a real
weakness changed the design, and the changes are already folded into files 00–05. This
file preserves the reasoning, because an architecture whose rejected alternatives are lost
gets re-litigated forever.

Round N is only recorded if it forced a change. Rounds that found nothing are noted as
such — that is the stopping condition.

---

# Part A · Critique rounds

## Round 1 — attacking the core claims

**W1 · The cold-start inversion.** The entire design's advantage comes from accumulated
state, but the sessions where a learner decides whether to stay are the ones where the
state is empty. For the first three sessions this architecture is *worse* than a plain
chatbot: it has no belief, no calibration, no history, and its instinct will be to gather
evidence — that is, to interrogate. The system's most sophisticated machinery is
structurally guaranteed to be least useful at the moment of highest stakes.

*Change made.* The **Cold-Start Doctrine**, now binding across C-26, C-33 and C-14: the
first session is not an emergent behaviour of the runtime, it is a **designed artifact** —
asset-served, scripted to excellence per subject entry node, with placement embedded
invisibly inside genuine teaching rather than preceding it. Population priors seed the
Twin explicitly flagged as low-confidence priors. Evidence-gathering intensity ramps
*up* as the relationship establishes, not down. Stated as a design rule: **the system must
be excellent before it knows anything, and become personal afterwards.**

**W2 · Determinism buys correctness and can sell away life.** A deterministic kernel plus
a hard verifier can produce a tutor that never violates a rule and that nobody wants to
talk to. Correctness is not the same as good teaching, and a boring tutor teaches nothing
because nobody returns to it.

*Change made.* Variation is given an architectural home rather than being left to chance:
Band 3 of the kernel is explicitly the variation band; the Representation Registry
guarantees genuine difference (not paraphrase) on retry; the renderer owns voice; and the
monitoring set now includes register and liveliness distributions. Added to the C-42
regression suite: a scenario that fails if a policy produces mechanically similar sessions
across different learners.

**W3 · The verifier checks form, not teaching.** It can count questions and detect a
forbidden reveal. It cannot tell whether an explanation was any good. The strongest
guarantee in the architecture is therefore a guarantee about *compliance*, and compliance
is not quality.

*Change made.* This is accepted as a **residual limit**, stated explicitly rather than
papered over, and complemented by a second loop: pre-hoc verification is formal; *post-hoc*
verification is empirical, through the decision-consequence join (C-44) and asset
effectiveness (C-14). The architectural claim is narrowed to what it can support:
**the verifier guarantees the system never violates its own pedagogy; only outcome evidence
can establish that the pedagogy is right.** These are different guarantees and conflating
them would have been the document's biggest overclaim.

**W4 · Replay does not scale for a decade.** A2 is load-bearing and, taken literally, means
reconstructing ten years of events to answer a question about today.

*Change made.* Immutable periodic state **checkpoints**; replay reads the nearest
checkpoint plus a bounded tail. Now specified in the scaling section of file 05.

**W5 · The architecture has no answer for how learners actually arrive.** Real usage is
overwhelmingly "help me with this problem, now." A curriculum-first system meets that
request with "let's start at the beginning," and the learner leaves. This was a genuine
hole: the design assumed a learner who wants a course, and most learners want an answer.

*Change made.* New component **C-46 · Ad-hoc Intent Bridge** (specified below). This turned
out to be one of the most consequential additions in the whole process, because it is the
bridge between the product people will actually use and the system this architecture is
built to be.

---

## Round 2 — attacking the boundaries

**W6 · Learning is modelled as solitary.** Every component assumes one learner and one
tutor. But explaining to a peer is among the strongest known learning interventions;
belonging predicts persistence; and a learner's most motivating comparison is often
another person. An architecture with no social plane cannot express any of it.

*Change made.* New component **C-47 · Social Learning Plane** (below).

**W7 · Language is treated as localization.** For an enormous share of the world's
learners, instruction happens in a language they are still acquiring. That is not a
translation concern; it is a *cognitive load* concern that changes every burst limit,
vocabulary budget, and register decision — and it means a wrong answer may be a language
failure, not a knowledge failure, which corrupts F1 at the root.

*Change made.* Instructional-language proficiency became a first-class Twin dimension
(C-18), a required input to contract composition (C-04), and a mandatory disambiguation
step in the Sensor Bank: *language-failure versus knowledge-failure* is now an explicit
sensor distinction, because scoring the former as the latter is a silent, systematic
mis-teaching of a large population.

**W8 · Kernel rules will sprawl into an unmaintainable thicket.** Band 2 accumulates
special cases forever; after three years it becomes the thing nobody dares change.

*Change made.* Policy is a **compiled, versioned artifact** with completeness checking
over the state space (an uncovered cell is a build failure, not a runtime default),
conflict detection between rules, and a full regression suite — governed under C-45, tested
under T3. The architectural stance: pedagogy is source code and gets the same discipline.

---

## Round 3 — attacking the long horizon

**W9 · Migration maps compose lossily.** Over a decade the claim graph is rebuilt several
times. Chaining ten migration maps degrades a learner's evidence into noise, and the system
quietly loses the very history that justified its existence.

*Change made — a real structural refinement of C-08.* Evidence is stored against
**immutable claim identities**, not against graph nodes. A claim identity is minted once
and never reused; graph nodes are *views* over claim identities. A node split creates new
identities with declared derivation; a reword does not change identity at all. Migration
maps therefore relate views, while evidence attaches to something permanent. This is the
difference between a learner record that survives a decade and one that survives three
curriculum revisions.

**W10 · The system has no concept of an ending.** Education completes. A learner's goals
change, and sometimes the honest answer is that they are done, or that this is no longer
what they need. A system with no exit is a system optimizing for permanence.

*Change made.* An explicit **graduation state** per goal (C-33, C-24) and a goal-revision
protocol (C-21), with completion celebrated and reported rather than converted into a new
retention hook.

**W11 · The full pipeline is overhead for a learner in flow.** A fluent learner in rapid
practice does not need nine stages, four bands, and a verifier round-trip on every turn.
The floor cost of the architecture damages exactly the experience it should protect.

*Change made.* A declared **fast path**: in a high-confidence fluent state with no active
misconception and no affect flag, the turn runs a reduced pipeline (deterministic sensors,
cached decision template, asset-served response, deterministic verification only). It is
an explicit, monitored mode with defined entry and exit conditions — not an optimization
that quietly bypasses safety.

---

## Round 4 — attacking the knowledge claims

**W12 · The substrate can be confidently wrong, and stay wrong.** Knowledge is revised;
authored content ages; a mistaken claim propagates to millions before anyone notices. The
design had no correction pathway.

*Change made — and it turned into a capability rather than a patch.* Because the Ledger
records what each learner was taught, a corrected claim yields an exact list of every
learner who received the wrong version. **Curriculum recall** is therefore possible:
identify, notify, and re-teach precisely the affected population. No other educational
system can do this, and it falls directly out of A2. Added to C-16 and C-45.

**W13 · The claim graph fits determinate knowledge and strains on interpretive domains.**
Literature, ethics, design, history, argument — domains where the goal is judgement and
there is no single right answer. Forcing them into truth-conditional claims would either
distort them or exclude them, and either would cap the platform's scope permanently.

*Change made.* A second node class alongside Fact/Concept/Procedure/Schema:
**Practice/Disposition nodes**, assessed by rubric against multiple valid responses, with
exemplar comparison, criterion-referenced feedback, and — importantly — *no mastery
percentage*, because a number there would be a lie. The Assessment Engine gains a rubric
mode; the Mastery Engine gains a non-scalar attainment vocabulary for these nodes. Stated
honestly: confidence in the architecture for interpretive domains is materially lower than
for determinate ones, and that is a research frontier rather than a solved design.

**W14 · Cross-learner learning versus learner privacy.** The compounding asset requires
population statistics; the rights model restricts what leaves a learner's record.

*Change made.* A hard separation: **learner-private evidence** never leaves the learner's
partition; **pedagogical statistics** (de-identified, aggregated, minimum-cohort-gated,
differentially private on release) are what the asset and policy layers learn from. The
system learns *about teaching*, not *about people*, and the boundary is structural.

---

## Round 5 — attacking buildability

**W15 · An architecture that cannot be built incrementally is not a good architecture.**
Forty-nine components is a decade of work, and a design that only functions when complete
would be a fantasy document.

*Change made.* An explicit **load-bearing core** and extension order (Part C below). The
test applied: does the system teach measurably better than a well-prompted chatbot with
only the core built? If not, the core is wrong. It does — because the core contains the
inversion (kernel + contract + verifier), the ledger, the claim graph, and mastery gating,
which is precisely the set that a prompted chatbot structurally cannot have.

**W16 · Single points of failure.** The kernel and the Ledger are on every path.

*Change made.* Both are stateless-or-partitioned by learner id with no cross-learner
runtime dependency; the degradation ladder (C-06) defines behaviour when either is
impaired, including the rule that teaching may continue without recording while
advancement may not.

**W17 · The Human Plane and learner privacy are in irreducible tension.** No design
resolves whether a parent should see that their child cried during a maths session.

*Change resolved as governance, not architecture.* Recorded as a named, age-dependent,
jurisdiction-dependent policy decision with an owner (C-45), defaulting to
aggregate-over-incident reporting and learner-visible disclosure. Flagged explicitly as a
values decision the architecture must *support* both sides of, not silently make.

---

## Round 6 — no changes

Round 6 re-ran the same attacks against the revised design and produced only refinements
of wording, no structural change. Two known residual limits were re-confirmed rather than
solved, and are stated as limits in Part D: the verifier cannot judge teaching quality
(W3), and interpretive domains are less well served than determinate ones (W13). Stopping
condition met.

---

# Part B · The regret test

*"Someone shows me a better Educational OS. What would I regret not including?"*

**Regret 1 — deliberate practice for performance domains.** Music, sport, surgery,
programming, public speaking: skill is built by decomposition into sub-skills, targeted
repetition at the edge of ability, and immediate specific feedback on *form*, not outcome.
The design handled knowledge well and performance poorly.
→ **Folded in:** skill-decomposition structure on Procedure nodes; a coaching mode in
C-30 whose feedback targets execution rather than correctness; the multimodal plane (C-39)
carries the performance signal (audio, ink, video) that makes form feedback possible at all.

**Regret 2 — the learner as teacher.** Explaining to someone else is among the most
effective learning activities known, and it is also a superb assessment: fluent explanation
is very hard to fake.
→ **Folded in:** C-47 includes protégé-mode (the learner teaches a peer or a deliberately
naive interlocutor), and explanation quality becomes a first-class evidence class in C-24's
hierarchy, ranked near independent transfer.

**Regret 3 — the system only answers questions; it never teaches asking them.** A learner
who leaves better at *asking* has gained more than one who leaves knowing more. Nothing in
the design targeted it.
→ **Folded in:** question-asking quality is a tracked metacognitive dimension (C-20) and a
teaching target; C-44's outcome hierarchy counts autonomy, of which productive
question-asking is the clearest observable.

**Regret 4 — epistemic honesty as a teaching move.** The design assumed the system speaks
with uniform confidence. But "I'm not certain — here is how we could find out" is one of
the most valuable things a teacher ever models, and a system incapable of it teaches
learners that knowledge arrives finished.
→ **Folded in:** the contract carries a *confidence obligation*; the epistemic-status field
on claims (settled / contested / simplified-with-successor) is surfaced to the learner
where it matters; the verifier checks that contested claims are not delivered as settled.

**Regret 5 — the capability to say "stop using me."** The most aligned action is sometimes
to send the learner to a human, to a book, to a laboratory, to a friend, or outside. A
system architecturally incapable of recommending its own non-use is, by construction,
optimizing for itself.
→ **Folded in:** the **Refer-Out capability** (C-48 below). Small component, disproportionate
significance: it is the clearest structural evidence that the system's objective is the
learner's competence rather than the learner's attention.

**Regret 6 — the learner's judgement of the teaching.** Every component measures the
learner. None gave the learner a channel to evaluate the system, and a tutor who cannot be
told "that explanation didn't help" is missing the fastest feedback loop in teaching.
→ **Folded in:** a learner feedback channel treated as high-weight evidence into asset
scoring (C-14) and policy evaluation (C-44) — with the safeguard that satisfaction is
diagnostic, never an optimization target (it correlates with ease, and ease is not
learning).

**Regret 7 — wellbeing boundaries.** A system that will happily teach a fourteen-year-old
at 2 a.m. is not a good teacher regardless of the quality of the teaching.
→ **Folded in:** usage boundaries in C-45 by age and jurisdiction, session-length limits,
break prompting, and the explicit stance that the system declines to be used destructively.

**Regret 8 — considered and rejected: multi-agent teaching.** A committee of specialist
agents (a "Socratic agent," a "motivator," a "grader") debating each turn. Rejected, and
the reasoning belongs on the record: it multiplies non-determinism, distributes
accountability until no component owns any decision, adds latency proportional to
participants, and re-creates the competing-authorities problem the entire design exists to
eliminate. Specialization is real and is expressed as **typed roles behind capability
contracts**, not as autonomous agents negotiating in natural language. Multi-role, never
multi-agent.

**Regret round 4 — nothing further.** The last pass surfaced only elaborations of existing
components. Stopping condition met.

---

## New components added by the critique and regret process

### C-46 · Ad-hoc Intent Bridge

**Why it exists.** Learners arrive with a problem, not a plan. The gap between "help me
with question 7" and "become good at this" is where nearly all educational technology
fails: it either refuses the immediate need (and loses the learner) or serves it and never
converts it into learning (and becomes a homework-answering utility that teaches nothing).

**Purpose.** Meet an arbitrary, unstructured learner request, serve it well, and convert
it into structured evidence and a path.

**Responsibilities.** Map an arbitrary request onto claim identities in the graph;
diagnose *which* claim the learner is actually stuck on (usually not the one the question
is about, and frequently a prerequisite); serve the immediate need in a way that teaches
rather than transfers an answer (which the Struggle Controller governs); harvest genuine
evidence into the Twin from an unplanned interaction; and offer — never impose — the path
that this stuck point implies.

**Inputs.** Free-form request, attached artifact (photo of homework, code, essay, audio),
Twin state.
**Outputs.** Mapped claims, diagnosis, teaching decision, evidence, an offered path.

**Ownership.** Owns the unstructured-entry pathway. **Must not own** the teaching decision
itself — once mapped, the ordinary kernel runs. That is the point: ad-hoc entry is a
*front door*, not a second teaching system.

**Failure modes.** Degenerating into an answer service (prevented by C-32's authority over
withholding, which applies identically here); mis-mapping a request and teaching the wrong
thing (mapping confidence is explicit, and low confidence produces a clarifying move
rather than a confident wrong lesson); path-pushing that feels like upselling (offered
once, contextually, never repeated).

**Evolution.** The dominant acquisition and re-engagement surface: every homework question
becomes a diagnostic probe, and the graph makes it possible to say something no
answer-service can — *why* the learner got stuck, and what to do about it.

### C-47 · Social Learning Plane

**Why it exists.** Explaining to others, belonging, and productive comparison are among
the strongest known learning mechanisms, and none of them exist in a one-learner
architecture.

**Purpose.** Make peers a teaching resource without importing the failure modes of social
software.

**Responsibilities.** Protégé mode (the learner explains to a peer or a deliberately naive
interlocutor, with explanation quality captured as evidence); complementary-pairing (match
learners whose strengths and gaps are reciprocal, using the graph); cohort-level
belonging signals; collaborative problem contexts; and moderation with the same safety
authority as Band 0.

**Must NOT own.** Leaderboards, public streaks, or any visible ranking by ability. These
raise performance-goal orientation and damage exactly the identity variable C-21 exists to
protect. Comparison, where used at all, is to the learner's own past.

**Failure modes.** Social pressure and shame (visibility is opt-in and ability-blind by
default); safety in peer interaction (moderated, age-gated, Band 0 authority); the
cold-start problem of having no peers (protégé mode works against a synthetic
interlocutor, so the mechanism does not require a population).

**Evolution.** Cross-learner explanation corpora become a rich, uniquely-owned source of
misconception discovery — learners explaining to each other reveal their models far more
completely than answering ever does.

### C-48 · Refer-Out

**Why it exists.** Alignment made structural. A system that cannot recommend its own
non-use is optimizing for itself.

**Purpose.** Recognize when the best next step is outside the system, and take it.

**Responsibilities.** Detect conditions warranting external referral: the need for a
human's judgement or care; suspected learning difficulty requiring professional assessment
(surfaced as a signature, never a diagnosis); domains requiring physical practice or
supervision; a wellbeing or safety concern; a learner who has outgrown the system's
material; and the plain case where a book, a laboratory, a person, or a walk is better
than another session. Deliver the referral warmly and concretely, and record it as a
successful outcome.

**Must not own** anything else. It is deliberately small and deliberately unavoidable.

**Failure modes.** Over-referral (thresholded); institutional pressure to disable it —
which is precisely why it is a component with an owner under C-45 and a monitored rate,
rather than an instruction in a prompt.

---

# Part C · Ownership matrix and the load-bearing core

## Ownership matrix (writers)

| State | Sole writer | Read by |
|---|---|---|
| Event stream | C-01 Ledger | everything |
| Time semantics | C-02 Clocks | everything |
| Identity, consent, rights | C-03 Identity | Ledger, Sensors, Human Plane |
| Claim graph & claim identities | C-08 Substrate | everything |
| Misconception taxonomy | C-09 | C-23, C-25, C-14 |
| Curriculum builds | C-12 Compiler | C-26, C-33, C-13 |
| Asset lifecycle & scores | C-14 Asset Economy | C-30, C-34, C-38 |
| Observations | C-17 Sensor Bank | Ledger only (then Twin) |
| Epistemic belief | C-18 | C-24, C-26, C-28, C-30 |
| Affect state | C-19 | C-28 Band 1, C-31, C-32 |
| Metacognitive state | C-20 | C-24, C-26, C-30 |
| Identity & motivation | C-21 | C-40, C-30, C-41 |
| Retention state | C-22 | C-24, C-27 |
| Per-learner misconceptions | C-23 | C-24, C-28, C-30, C-14 |
| Mastery & gates | C-24 | C-28, C-29, C-41 |
| Teaching-process state | C-29 | C-28, C-33 |
| The turn decision | C-28 Kernel | C-04, C-34, Ledger |
| Turn contracts | C-04 | C-34, C-36 |
| Rendered candidate | C-35 | C-36 only |
| Emitted turn | C-37 | learner, Ledger |
| Experiment assignments | C-43 | C-44, Ledger |
| Causal claims & outcomes | C-44 | C-15, C-45, C-12 |
| Policy versions & boundaries | C-45 | everything |

No field appears twice in the writer column. That is the mechanical statement of A17, and
it is checkable.

## Load-bearing core (build order)

**Core — the system does not exist without these.**
C-01 Ledger · C-02 Clocks · C-08 Substrate (with claim identities) · C-17 Sensor Bank ·
C-18 Epistemic Model · C-24 Mastery Engine · C-28 Decision Kernel · C-29 State Machine ·
C-04 Turn Contracts · C-34 Prompt Compiler · C-35 Renderer · C-36 Output Verifier ·
C-05 Capability Plane.

*Why this exact set:* it contains the inversion (kernel decides, model renders, verifier
gates), the accumulation (ledger), the unit of knowledge (claims), and the refusal to
advance without evidence (mastery). Those four are the things a prompted chatbot cannot
have at any level of prompt sophistication. Everything else improves the system; these
define it.

**Tier 2 — the difference between correct and good.**
C-09/C-23 Misconceptions · C-19 Affect · C-31 Recovery · C-22 Memory · C-27 Review ·
C-26 Placement · C-14 Asset Economy · C-32 Struggle Controller · C-46 Intent Bridge.

**Tier 3 — the difference between good and compounding.**
C-42 Simulator · C-43 Experiments · C-44 Analytics · C-15/C-16 Authoring & Generation ·
C-25 Assessment Engine (full) · C-41 Human Plane.

**Tier 4 — the difference between a product and an institution.**
C-11 Transfer · C-20 Metacognition · C-21 Identity · C-38 Visualization · C-39 Multimodal ·
C-40 Relationship · C-47 Social · C-13 Standards · C-48 Refer-Out · C-33 Session Planner ·
C-07 Budget Governor · C-06 Degradation · C-45 full governance.

C-45's safety subset and C-03 belong in the core for any deployment involving minors,
regardless of tiering.

---

# Part D · Final invariants, residual limits, and prohibitions

## The twelve invariants

1. No model output determines learner state, progression, or the next teaching action.
2. All state is a projection of an immutable, replayable ledger.
3. Every decision cites its rule, evidence, policy version, and rejected alternatives.
4. Exactly one component writes each piece of state.
5. Safety preempts affect preempts pedagogy preempts tactics — always, without exception.
6. No utterance reaches a learner without passing its turn contract.
7. No advancement occurs without recorded evidence of the required class.
8. No learner is ever re-taught from zero what they once demonstrated.
9. Every dependency failure has a declared, tested degradation rung that still teaches.
10. No pedagogical change reaches a learner before passing the simulator gate.
11. Engagement, retention, and satisfaction are diagnostic signals and never optimization
    targets.
12. Every autonomous decision has a human channel that can inspect, veto, and correct it.

## Residual limits — stated, not hidden

- **The verifier guarantees compliance, not quality.** Whether the pedagogy itself is
  right is established only by outcome evidence, over time, and imperfectly.
- **Interpretive domains are less well served** than determinate ones. Practice/Disposition
  nodes are a credible design, not a proven one.
- **Affect sensing from text is weak.** The architecture compensates by requiring
  convergent evidence and permitting abstention, and it improves substantially with voice —
  but a text-only deployment should not claim emotional understanding it does not have.
- **The cold-start learner is served by design, not by personalization.** Genuine
  adaptation takes sessions to earn.
- **Human review capacity, not compute, is the binding scale constraint** on the
  appreciating half of the content economy.

## Prohibitions — what must never be built

- A second decision authority anywhere, in any form, including "just a small heuristic in
  the route."
- Teaching content that exists only inside a prompt.
- A mastery vocabulary that is not C-24's.
- A learner state write from outside Plane 1.
- A learning-styles model, or any demographic-conditioned prior about ability.
- An engagement objective attached to the Identity, Relationship, or Struggle components.
- A leaderboard, or any public ranking of learners by ability.
- A hidden model of a learner that could not be shown to that learner.
- Advancement on self-report, echo, or unrecorded evidence.
- Any capability to teach that cannot be turned off by a human.

---

**Closing note on the objective.** The architecture is not organized around producing
better responses. It is organized around a single asymmetry: a language model is optimized
for the learner's present satisfaction, and a teacher must be optimized for the learner's
future competence. Every structural decision in this blueprint — the kernel, the contract,
the verifier, the evidence hierarchy, the struggle controller, the anti-metrics, the
refer-out capability — exists to hold that line under commercial and technical pressure
that will push against it for as long as the system exists. An architecture that does not
hold that line will produce a delightful product that teaches nothing, and it will do so
while every dashboard reads green.
