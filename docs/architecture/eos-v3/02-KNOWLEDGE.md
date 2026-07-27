# EOS v3 · The Knowledge Substrate and the Content Economy

Two questions decide whether a teaching system can be excellent for decades:
*what is the atomic unit of knowledge?* and *what happens to teaching content after it is
generated?* Most systems answer "a topic" and "it is discarded" — and inherit a ceiling
they cannot raise later. This file answers "a verifiable claim" and "it enters an economy
with a lifecycle."

---

## C-08 · Epistemic Substrate (the claim graph)

**Why it exists.** The unit of knowledge determines what can be measured, and what can be
measured determines what can be taught well. "Photosynthesis" is a topic: a learner is
never simply right or wrong about it, so mastery of it cannot be estimated, only
asserted. "Light energy is converted to chemical energy stored in glucose bonds" is a
claim: a learner either holds it correctly, holds a specific wrong version of it, or does
not hold it — and that is estimable. Topic-graphs make progress trackable but mastery
unknowable. Claim-graphs make mastery knowable and topics derivable. Only one direction
of that trade is recoverable.

**Purpose.** Be the canonical, versioned, subject-agnostic representation of everything
the system can teach and everything it can be right or wrong about.

**Responsibilities.**
- Hold **claim nodes**: independently teachable, independently assessable, independently
  masterable units, each with a truth-conditional statement, not a title.
- Hold typed edges: `requires` (prerequisite), `refines` (specialization), `contradicts`
  (mutual exclusion — the edge that binds to misconceptions), `instantiates`
  (concept↔skill), `analogous-to` (cross-domain structural mapping), `composes-into`
  (part–whole).
- Distinguish four node kinds, because they are taught, assessed, and forgotten
  differently: **Fact** (arbitrary, memorized, decays fast), **Concept** (a category with
  boundary conditions, fails by overgeneralization), **Procedure** (an ordered operation,
  fails by step-omission and by misapplication), **Schema** (a relational structure, the
  only kind that transfers). A single node kind is the reason systems apply spaced
  repetition to conceptual understanding and get nothing.
- Carry per-node metadata: difficulty, cognitive load estimate, expected mastery
  criterion, canonical misconceptions, representation affinities, transfer targets,
  estimated instructional time, and *epistemic status* (settled / contested / simplified
  model with a known replacement).

**The "simplified model" field deserves emphasis.** Education is a sequence of
deliberate, useful lies: Bohr's atom, "you can't subtract a bigger number," the water
analogy for current. Each will later be contradicted. If the graph does not record that a
node is a scaffold with a designated successor, the system will one day teach the
successor without dismantling the scaffold, and manufacture a misconception it authored
itself. This field is how a curriculum stops poisoning its own future.

**Inputs.** Authoring System (C-15); curriculum expert review; evidence-driven revision
proposals from Analytics (C-44).

**Outputs.** Versioned, immutable graph releases; per-node views for every consumer.

**Internal logic.** The graph is a *build artifact*: authored in source form, validated,
compiled, versioned, and released. Validation is mandatory and includes: acyclicity of
`requires`, full reachability from declared entry nodes, granularity conformance (every
node independently masterable), no orphan nodes, no node that is a topic in disguise
(detected by "can a single probe falsify holding it?"), and referential integrity of all
cross-domain edges.

**Ownership.** Owns knowledge structure and node semantics. **Must not own** learner
state, sequences (that is C-12), teaching content (C-14), or assessment items (C-25).
The graph says *what is true and what depends on what* — never *what to do about it*.

**Failure modes.**
- *Granularity drift* — nodes authored at inconsistent grain, making mastery
  incomparable across domains. Mitigated by a machine-checked granularity standard.
- *Graph churn breaking learners mid-journey* — the hardest real problem here, addressed
  in C-12 below.
- *Western/monocultural encoding of "prerequisite"* — prerequisite structure is partly
  cultural and partly curricular convention. Mitigated by allowing locale-scoped edge
  overlays over a shared node set, and by treating contested edges as measurable
  hypotheses (C-44 can falsify a prerequisite claim from data).

**Evolution.** Evidence-revised edges: with enough learners, `requires` edges become
empirically testable ("learners who skipped X did not fail Y") and the graph shifts from
authored belief to measured structure. This is the point at which the curriculum becomes
a scientific instrument rather than a document.

---

## C-09 · Misconception Graph

**Why it exists.** A learner who knows nothing and a learner who confidently holds a
wrong model look similar on a score and require opposite treatment: the first needs
instruction, the second needs their existing model *destroyed* before instruction can
land. Systems that model only correct knowledge cannot tell them apart, and so re-explain
at a learner whose problem is not absence but occupancy.

**Purpose.** Represent wrong knowledge as first-class, structured, teachable-against
entities (A7).

**Responsibilities.** Hold misconception nodes with: the wrong claim stated positively
(as the learner would state it); the `contradicts` edge to the correct claim; **birth
type** (overgeneralization, perceptual intuition, language contamination,
notation-induced, instruction-induced, analogy-overextension); characteristic learner
phrasings; diagnostic signature (the item pattern that reveals it, including the items it
gets *right*, which is what makes it hard to detect); repair path (elicit → commit →
collide → replace → contrast → apply → re-probe) with a birth-type-appropriate collision
design; regrowth prior; and prevalence statistics by population.

**Two structural insights encoded here.**
*Instruction-induced misconceptions* are the system's own defects: a misconception with
this birth type is a bug report against a teaching asset or against a `simplified-model`
node whose successor was never dismantled. It must route to the Authoring System, not
just to the learner's repair queue.
*A burned collision* — a contradiction the learner has already survived without changing
their model — is permanently spent for that learner. Re-using it does not just fail; it
teaches the learner that the system's contradictions are survivable. Collision usage is
therefore tracked per learner, and repair paths must supply alternatives.

**Inputs.** Authoring; verbatim learner evidence via the Misconception Engine (C-23);
cross-learner prevalence from Analytics.

**Outputs.** Misconception definitions; per-concept diagnostic sets; repair sequences;
`incompatibilities` metadata that prevents serving an asset which reinforces a
misconception the learner currently holds.

**Ownership.** Owns wrong-knowledge structure. **Must not own** whether a given learner
holds one (C-23), nor the decision to repair now (C-28).

**Failure modes.** Over-diagnosis (labelling a slip as a misconception — mitigated by
requiring *repeated, fast, confident* error patterns before a hypothesis is promoted);
under-representation for new subjects (mitigated by a birth-type diagnostic procedure
that lets an author derive misconceptions systematically rather than recall them);
cultural specificity of language-contamination types (mitigated by locale scoping).

**Evolution.** Automated discovery: clustering of wrong answers across millions of
learners surfaces misconceptions no human catalogued. This is one of the few genuinely
non-replicable assets the platform can build, and it is only accessible to a system that
stored wrong answers structurally instead of scoring them.

---

## C-10 · Representation Registry

**Why it exists.** The same claim can be delivered as a diagram, a story, a manipulation,
an equation, a physical analogy, or a counterexample. Which one works is a property of
the *pair* (claim, learner-history) — not of the learner ("visual learner" is not a real
construct) and not of the claim alone. To choose well, the system needs representations
to be enumerable, comparable, and attributable — which means they must be entities.

**Purpose.** Enumerate the representational forms available for each claim and carry the
evidence about which ones work for whom, under what conditions.

**Responsibilities.** Catalogue representation families (symbolic, diagrammatic,
narrative, enactive, tabular, analogical, counterexample-driven, physical-simulation);
record per-claim fit and known distortions; record per-learner *history* of exposure and
outcome; hold **anti-analogies** — the explicit boundary statement of where each analogy
breaks, authored alongside every analogy.

**The anti-analogy requirement is a hard rule.** Every analogy shipped without its
breaking point is a scheduled future misconception of birth-type
analogy-overextension. The registry refuses to serve an analogy that has no boundary
statement.

**Inputs.** Authoring; asset effectiveness evidence; learner exposure history.

**Outputs.** Ranked representation candidates for (claim, learner, context) — a *ranking*,
not a choice; the choice belongs to C-30.

**Ownership.** Owns representational taxonomy and evidence. **Must not own** style
preferences dressed as learner traits — the registry explicitly refuses to store learning
styles, and stores *measured outcomes for this learner on this claim family* instead.

**Failure modes.** Reinventing learning styles under a new name (mitigated by requiring
that any representational preference be backed by minimum evidence across multiple
concepts, and be stated as a statistic with confidence, never as an identity).

**Evolution.** Representation selection becomes a learned policy trained on outcome data,
with the registry as its action space.

---

## C-11 · Transfer Graph

**Why it exists.** The purpose of education is transfer — using knowledge in a context
that does not resemble the one where it was learned. Almost no system models it, so
almost every system optimizes for the thing that is easy to measure (performance in the
training context) and calls it mastery. A learner who can solve every fraction problem in
the fraction chapter and cannot recognize a fraction problem in a chemistry lab has not
learned fractions; the architecture must be able to say so.

**Purpose.** Represent structural similarity across claims and domains, so transfer can
be deliberately taught and independently verified.

**Responsibilities.** Hold `analogous-to` edges with an explicit *mapping* (which
elements correspond) and a *distance* (near / moderate / far); designate per-claim
transfer targets and the contexts that count as genuinely novel for that learner; supply
the Assessment Engine with transfer items whose surface features are deliberately
unrelated to the training context.

**Internal logic.** Transfer distance is defined relative to *this learner's exposure
history*, not absolutely: a context is novel if the learner has not encountered its
surface features attached to this claim. This makes transfer verification personal and
non-gameable, and it is the reason the graph must be read together with the Twin.

**Ownership.** Owns cross-context structural mapping. **Must not own** mastery decisions
(C-24) — it supplies the evidence class that the highest mastery rungs require.

**Failure modes.** Spurious analogies (a mapping that is superficial teaches a
misconception); mitigated by requiring an explicit element-wise mapping plus an
anti-analogy, both reviewable.

**Evolution.** Transfer becomes the primary success metric of the platform, replacing
completion and even in-context accuracy. The architecture is built so that this metric
shift requires no re-instrumentation.

---

## C-12 · Curriculum Compiler

**Why it exists.** A curriculum is not a thing to author; it is a *function* of the
graph, a goal, a learner, and a policy. Authoring sequences directly produces a second
hierarchy that immediately diverges from the graph, and then two authorities disagree
about what comes next. Compiling them eliminates the second authority (A8).

**Purpose.** Produce versioned, validated learning sequences from the claim graph plus a
declared policy, for any goal and any constraint set.

**Responsibilities.** Topological sequencing with policy-driven tie-breaking (interleave
vs. block, depth-first vs. breadth-first, spiral revisit points); goal-scoped subgraph
extraction (exam syllabus, professional certification, personal interest); constraint
satisfaction (time available, target date, prerequisite repair insertion); emission of a
versioned **Curriculum Build** with a manifest, a hash, and a diff against its
predecessor.

**The problem this component exists to solve well: graph change under live learners.**
When the graph is revised — a node split, an edge added, a claim reworded — thousands of
learners are mid-journey. The architecture's answer has four parts:
1. Learners are **pinned** to a curriculum build; they are never silently re-based.
2. Every build ships a **migration map** from the previous build's nodes to its own
   (identity, split, merge, retire, reword).
3. Migration is **evidence-preserving**: a split node inherits the parent's evidence with
   *reduced* confidence on each child, never full confidence on both — because the
   original evidence could not distinguish them. This one rule prevents the most damaging
   silent corruption a curriculum update can cause.
4. Re-pinning happens at a **safe boundary** (a completed unit or a session start), with
   a visible-to-teacher record, never mid-concept.

**Inputs.** Claim graph release, goal spec, policy, learner constraints, standards
mapping.

**Outputs.** Curriculum Build (sequence + manifest + migration map + validation report).

**Ownership.** Owns sequencing. **Must not own** graph truth (C-08) or per-turn ordering
(C-33 handles within-session ordering; the compiler handles across-session structure).

**Failure modes.** Over-linear sequences that ignore that learners arrive with partial,
patchy knowledge (mitigated because the compiler emits a *partial order*, and the
Placement Engine consumes it as a lattice, not a list); combinatorial explosion of builds
(mitigated by build caching keyed on policy+goal+graph-version).

**Evolution.** Personalized compilation: the policy itself is learned per learner
(some benefit from interleaving earlier than others), with the compiler unchanged.

---

## C-13 · Standards & Institution Projection

**Why it exists.** The world's education systems will not adopt this system's ontology.
Schools have boards, syllabi, terms, grade levels, report cards, and exams, and a system
that cannot speak that language is confined to the supplementary market forever. But
encoding board structure into the substrate would corrupt the substrate (a "Grade 8
Chapter 3" is not a claim). The resolution is projection: the substrate stays pure, and
institutional structure is a *view* mapped onto it.

**Purpose.** Map claims to external curricular frameworks, exam specifications, and
credentials without contaminating the graph.

**Responsibilities.** Maintain (framework, version) → claim-set mappings with coverage
and gap reports; translate internal mastery into external grading vocabularies with the
loss made explicit; generate exam-blueprint-conformant assessment plans; produce
institution-facing progress artifacts.

**Ownership.** Owns external mappings. **Must NOT own** any influence on the graph's
structure. If a board's syllabus disagrees with the graph's prerequisite structure, the
graph wins pedagogically and the projection records the divergence — the system may teach
in the board's order when required, but it will *know* it is doing something suboptimal
and can say so to a teacher.

**Failure modes.** Mapping rot as frameworks revise annually (mitigated by versioned
mappings with expiry and coverage tests); "teaching to the projection" (mitigated by
keeping the mastery definition in C-24, never in the projection).

**Evolution.** Bidirectional: aggregate outcome evidence becomes a credible input to
curriculum standards bodies — the platform earns a voice in what gets taught.

---

## C-14 · Asset Economy

**Why it exists.** Two observations, together, determine the platform's long-run value.
First: content generated per-turn and discarded means the system's marginal cost never
falls and its quality never compounds — every learner pays for the same explanation to be
invented again, badly, in a new way. Second, and less obvious: **not all content
appreciates.** Explanatory prose depreciates, because next year's model writes better
prose for free. What appreciates is everything that encodes *measured knowledge about
learners*: probes with validated discrimination, distractors mapped to specific
misconceptions, collision designs that actually change minds, the effectiveness ranking
of representations. An architecture that invests in prose is racing commoditization; one
that invests in instruments accumulates something no model can synthesize.

**Purpose.** Hold every reusable teaching artifact as a versioned, evidence-scored,
lifecycle-managed entity.

**Responsibilities.**
- **Asset families**: Explanation, Worked Example, Probe, Distractor Set, Visual,
  Simulation, Analogy (+ its anti-analogy), Collision, Recovery Script, Practice Item,
  Transfer Item, Policy Fragment.
- **Identity**: every asset keyed by (claim, family, locale, register band, variant) so
  variants are comparable rather than duplicative.
- **Lifecycle**: DRAFT → REVIEW → ACTIVE → DEPRECATED → RETIRED, with at most one ACTIVE
  per identity slot and *evidence-driven* transitions.
- **Scoring**: per-asset effectiveness, with the crucial refinement that effectiveness is
  **conditional** — an asset that works well for learners without misconception M and
  harms learners with it must be scored on both populations separately, or its average
  hides the harm.
- **Incompatibilities**: assets declare misconceptions they would reinforce; the runtime
  refuses to serve them to learners holding those.
- **Deduplication and provenance**: capture paths must not accumulate hundreds of
  near-identical variants of the same slot; identity is enforced at write time.

**Inputs.** Authoring, Content Generation Pipeline, runtime capture, evidence rollups.

**Outputs.** Retrieval sets for the Prompt Compiler; effectiveness signals for C-30;
curator queues; deprecation events.

**Ownership.** Owns asset identity, lifecycle, and scoring. **Must not own** what to show
now (C-30/C-34) or how to judge a learner (C-24).

**Failure modes.**
- *Unreviewed capture pollution* — auto-capturing every generated utterance produces
  volume without quality, and duplicate slots at scale. Mitigated by identity enforcement,
  a review gate before ACTIVE, and a hard rule that draft assets are never served.
- *Rich-get-richer* — a mediocre early asset accumulates evidence and never gets
  displaced. Mitigated by a mandatory exploration budget (C-43) reserving a slice of
  traffic for challengers, and by inverse-propensity weighting in scoring.
- *Score contamination by confounding* — an asset used mostly on strong learners looks
  excellent. Mitigated by learner-state-conditioned scoring, which is only possible
  because the Twin state at delivery time is in the Ledger.

**Evolution.** The endgame is inversion of the default: the model becomes the *fallback*
for the rare uncovered case, and the common case is served by validated assets at zero
inference cost and single-digit-millisecond latency. Quality, cost, and speed improve
together — the only place in the design where that is true.

---

## C-15 · Authoring System

**Why it exists.** The scarce input is not compute; it is expert pedagogical judgement.
The authoring system's job is to make that judgement go as far as possible: authored once,
reused across every learner, and never spent on something a machine could have derived.

**Purpose.** Let human experts author, review, and govern the appreciating half of the
content economy at scale.

**Responsibilities.** Structured authoring against schemas (never free-form documents);
reuse-by-reference enforcement (a universal repair procedure is referenced, never copied
into a hundred concept entries); review workflows with reviewer competence tracking;
provenance on every field; conflict resolution when evidence contradicts an author;
authoring queues *ordered by measured need* rather than by convenience.

**Internal logic — the priority rule.** Authoring effort is allocated by expected impact:
placement entry points first (every learner passes through them), then cut-nodes (high
betweenness in the graph — failures here block the most downstream content), then
misconception hubs (concepts with high measured error rates), then the long tail. This
ordering is computed from the graph and the evidence, not chosen.

**Ownership.** Owns authored knowledge and its review. **Must not own** runtime behaviour.

**Failure modes.** Authoring bottleneck (mitigated by the generation pipeline drafting and
humans reviewing — review is ~5–10× faster than authoring); reviewer fatigue producing
rubber-stamping (mitigated by seeded gold items measuring reviewer accuracy);
authored-content rot as the graph evolves (mitigated by referential integrity checks that
flag assets whose claim was reworded).

**Evolution.** Author-in-the-loop-of-evidence: authors are shown where their assets
succeeded and failed on real learners, which is the fastest known way to make a human
teacher better — and it makes the platform a place experts want to work.

---

## C-16 · Content Generation Pipeline

**Why it exists.** Coverage. There are millions of (claim × locale × register × variant)
slots and no realistic number of experts to author them. Generation fills the space;
review and evidence make it trustworthy. This is the only place in the architecture where
a model may originate teaching content — and it is offline, gated, and attributable.

**Purpose.** Produce reviewable candidate assets at scale, safely.

**Responsibilities.** Prioritized generation against measured coverage gaps; generation
under the same schemas humans author against; automated pre-review (factuality checks,
reading-level checks, vocabulary-budget checks, misconception-reinforcement checks,
anti-analogy presence); adversarial self-critique passes; routing survivors to human
review; never writing directly to ACTIVE.

**Internal logic.** Generation is a *pipeline with gates*, not a call: generate → verify
against claim (a separate capability, separate context, no self-grading) → check against
the misconception graph → check readability and register → check novelty against existing
slot occupants → rank → queue. Anything that fails a gate is discarded with its reason
logged, and those reasons become the generator's improvement signal.

**Ownership.** Owns candidate production. **Must NOT own** promotion to ACTIVE (C-15) or
any runtime path (D7).

**Failure modes.** Plausible-but-wrong content passing review at volume (mitigated by
independent verification capability, gold-item reviewer calibration, and — decisively —
by the fact that assets carry outcome evidence, so a wrong asset degrades and is
deprecated by data even if it survived review); homogenization (every explanation sounds
the same, and the variant space collapses) mitigated by explicit diversity constraints in
the slot definition; training-data feedback loops if generated content is later used to
train (mitigated by provenance tagging).

**Evolution.** Generation targets shift over time from prose (which becomes free) to
*instrument drafts* — candidate probes, distractor sets, collisions — which are then
validated statistically on real learners. That is the point at which content production
becomes a measurement science rather than a writing task.
