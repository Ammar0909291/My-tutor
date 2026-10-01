# What is Biology — `bio.found.what-is-biology`

## Identity

- **Concept ID**: `bio.found.what-is-biology` (canonical biology KG)
- **Curriculum location**: biology / foundations — the single root of the
  entire 199-concept biology graph (`requires: []`; every other concept
  in the subject traces back to this node).
- **Prerequisites**: none — this is the KG's zero-prerequisite entry
  point, matching the same role `math.found.mathematical-thinking` and
  `eng.phonics.phonemic-awareness` play in their own subjects.
- **Unlocks** (from KG): `bio.found.characteristics-of-life` — the very
  next question ("what actually IS alive?") only makes sense once the
  learner accepts that biology studies life as a coherent, principled
  subject rather than an arbitrary list of facts; `bio.found.scientific-
  method-in-biology` — the discipline's investigative method presupposes
  the learner already sees biology as a field that discovers things
  (this session's own reasoning, not memorised facts), which is exactly
  what this concept's core misconception repair establishes.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.70 · **Est. hours**: 2

## Learning Objective

The learner can: name biology's major branches (botany, zoology,
microbiology, physiology, ecology, genetics) and state, for a given
real-world scenario, which branch or branches it draws on; explain in
their own words why the branches are not independent silos but a single
connected study of life; and reject, with a reason, the claim that
biology is fundamentally a memorisation subject. A learner who can list
the six branch names without being able to place a NEW scenario into the
right one(s) has not achieved mastery — naming the branches is
recognition, not the objective.

## Core Understanding

Biology is the scientific study of living systems — what they are built
from, how they function, how they interact with each other and their
environment, and how they change across generations. Its named branches
(botany, zoology, microbiology, physiology, ecology, genetics, and
others) are not separate subjects that happen to share a department;
they are different ENTRY ANGLES on the same underlying object — life —
and a real biological question routinely requires more than one angle at
once (a disease outbreak needs microbiology, physiology, and ecology
together). What makes biology a coherent science rather than a
collection of trivia is that its facts are consequences of discoverable
mechanisms (a heart has four chambers because of the physics of
pressure-driven circulation; species are named systematically because
biologists needed a shared, unambiguous reference system) — the names
are retrieval handles for those mechanisms, not the content itself.

## Mental Models

- **Beginner model — "biology is a list of facts to memorise"**: the
  arriving (pre-instruction) model for most learners, built from years of
  school experience where biology instruction visibly rewards recalling
  names (organs, species, cycle steps) more than explaining why those
  names exist. This model is already WRONG at arrival, not merely
  incomplete — see Why Students Fail below. Shelf-life warning delivered
  at installation of the correct model: "every name you'll learn from now
  on exists because of a reason — if you only remember the name, you're
  doing a fraction of the job."
- **Intermediate model — "biology has separate branches, each its own
  topic"**: the learner correctly distinguishes botany from zoology from
  genetics, but treats them as independent, non-interacting subjects
  (this is the direct substrate of misconception M2 below). Upgrade
  trigger: presenting one real scenario (e.g. an ecosystem's declining
  frog population) that genuinely requires two or more branches
  simultaneously and cannot be resolved by any single branch alone.
- **Advanced model — "the branches are entry angles on one connected
  study of life"**: the learner can take an unfamiliar real-world
  scenario and correctly identify which combination of branches it draws
  on, and explain why those branches must cooperate rather than compete
  for the explanation.
- **Expert model — "unifying biological principles cut across every
  branch"**: the learner recognises that the deepest reason the branches
  connect is that a small set of principles (cellular basis of life,
  inheritance, evolution by natural selection, energy flow, homeostasis)
  recur in every branch — botany and zoology are not similar by
  coincidence, they are both instances of the same small rule set applied
  to different organisms. This model is the direct on-ramp to
  `bio.found.unifying-themes-in-biology` (currently unauthored in this
  Educational Brain, though present in the KG as a downstream node of
  both this concept's unlocks).
- **Do not upgrade early**: a learner who has not yet accepted that
  biology's names carry reasons (repairing M1) should not be pushed
  toward classifying multi-branch scenarios (the intermediate→advanced
  transition) — an unrepaired M1 will keep the learner treating even the
  multi-branch exercise as "which label do I recall," defeating its
  purpose.

## Why Students Fail

Two independent failure mechanisms operate here, and they must be
diagnosed separately because they call for different repairs. The first
(M1) is a product of how biology has typically been TAUGHT before this
lesson — years of instruction that visibly reward naming over
explaining leave a learner with no experience of biology as a reasoning
subject, so "memorise the names" is not a lazy shortcut the learner
invented; it is the accurate summary of what worked for them until now.
The second (M2) is a product of how the branches are usually
INTRODUCED — as a flat list with brief one-line definitions and no
worked example showing two branches cooperating on one question — so the
learner reasonably concludes the branches are independent, since nothing
in their experience has ever required otherwise.

## Misconceptions

No Blueprint exists yet for this concept (see Blueprint References
below), so both misconceptions below are classified directly against the
concept's own seed content in `src/lib/teaching/assets/
biologySeedAssets.ts`, using the birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Biology is a memorisation subject; there is no real reasoning
  involved" (Type 5, instruction-induced)**: born from the curriculum,
  not the individual — biology is frequently taught in a way that
  visibly rewards recalling names (organs, species, cycle steps) far
  more often than explaining why those names exist, so a learner
  reasonably generalises "recall the label" as the whole of the subject.
  Matches Type 5's diagnostic signature exactly: it appears
  near-universally across cohorts taught this way and is not a mark of
  low ability or laziness. Characteristic phrase: "biology is just
  memorising names," "there's no real reasoning in biology, you just
  have to remember stuff." Verbatim detection probe (seed corpus,
  `misconception_probe`): "A student says 'Biology is just memorising
  names — there is no real reasoning involved.' What is the best
  response?" Recovery path: name the shelf-life explicitly as a
  promotion, not a correction ("that was true of how you were taught
  before — from here, every name is going to come with its reason
  attached"), then demonstrate with one concrete case (the heart's four
  chambers existing because of double-circulation physics) that the name
  is a retrieval handle for a discoverable mechanism, never memorised in
  isolation. Verification-of-death: present a genuinely new organism
  name the learner has never seen and ask them to predict what QUESTION
  they would need answered to understand it (not to recall a fact about
  it) — a repaired learner asks a mechanism question ("what does it need
  to survive, and why is it built that way?") rather than reaching for
  recall.
- **M2 — "The branches of biology are independent, non-interacting
  topics" (Type 5, instruction-induced)**: born from how the branches are
  conventionally introduced — as a flat list with one-line definitions
  and no worked example of two branches cooperating — so a learner who
  has never been shown a genuinely multi-branch question reasonably
  assumes each branch stands alone. This shows up operationally as
  choosing a single, narrowly-matched branch (e.g. "physiology" or
  "genetics") when a scenario actually spans two or more (e.g.
  "ecology," when the correct answer requires ecology AND physiology
  together). Characteristic phrase: reaching for exactly one branch name
  when a scenario visibly names two or more kinds of evidence (hormone
  levels AND water chemistry AND population size). Verbatim detection
  probe (seed corpus depth-fix probe, `short_answer`): "A team is
  investigating why a frog population is disappearing from a wetland —
  measuring the frogs' hormone levels, the water's chemistry, and the
  population's size over ten years. Which combination of biology's
  branches is this team drawing on?" Recovery path: return to the
  concept's own worked example — "a physiologist studying the heart uses
  genetics; an ecologist studying forests needs botany" — and ask the
  learner to name which SECOND branch a familiar single-branch scenario
  secretly also depends on. Verification-of-death: the learner
  spontaneously names two or more branches, unprompted, for a new
  multi-evidence scenario, rather than defaulting to the single branch
  whose keyword most obviously matches the question.

## Analogies

- **Best analogy — a detective using multiple kinds of evidence**: no
  single branch of biology is like relying on only one type of clue
  (fingerprints alone, or witness testimony alone) to solve a case; real
  biological questions, like real investigations, typically need several
  kinds of evidence (physiological, ecological, genetic) combined.
  Breaking point: a detective's evidence types are chosen ad hoc per
  case, whereas biology's branches form a more STABLE, recurring
  division of the subject — useful for motivating multi-branch thinking,
  not for teaching the branch taxonomy itself.
- **Alternative — a single body examined by different specialists**: a
  cardiologist, a nutritionist, and a physical therapist can all examine
  the same patient and each contributes a genuinely different, valid
  piece of the picture. Stronger for showing that different branches are
  not competing explanations but complementary ones. Breaking point:
  medical specialists rarely need to combine their findings into ONE
  unified explanation the way an ecologist and a physiologist jointly
  explaining a population decline must.
- **Story analogy — the four-chambered heart**: the concept's own worked
  example (the heart has four chambers "because of the physics of double
  circulation") is itself a compact story: a fact (four chambers) traced
  back to a reason (a physical requirement of a two-loop circulatory
  system) — useful precisely because it is the shortest possible
  demonstration that names carry mechanisms.
- **ANTI-ANALOGY — do NOT say "biology's branches are like different
  rooms in a house"**: rooms in a house are physically separate and a
  person occupies one room at a time; this reinforces exactly the M2
  misconception (branches as independent, non-interacting compartments)
  it is meant to counter. If a spatial analogy is wanted at all, prefer
  "overlapping circles" language over "separate rooms," and say so
  explicitly if a learner offers the rooms analogy unprompted.

## Demonstrations

- **Physical/concrete**: none required at this concept — it is
  definitional/orientational rather than manipulable, matching the
  Standard's own allowance that not every concept earns a hands-on
  demonstration.
- **Discrimination demonstration**: present two short real-world
  scenarios side by side — one that is genuinely single-branch (e.g.
  "classifying a newly found beetle species" — taxonomy alone) and one
  that is genuinely multi-branch (the frog-population wetland scenario
  from M2's detection probe) — and ask the learner to predict, BEFORE
  being told, whether each needs one branch or several, and which.
  Prediction-first is the load-bearing move: it surfaces M2 before any
  correction is offered.
- **Teacher-demo — "trace the name back to the reason"**: pick any
  biological term the learner already knows by name only (e.g.
  "mitochondria") and walk backward from the name to the reason it
  exists (a cell needs a separate compartment for high-energy chemistry)
  — directly modelling the M1 repair's "names are handles for ideas"
  principle live, with a term the learner brings themselves.

## Discovery Questions

Direct instruction wins here, argued explicitly rather than defaulted
to: this is the KG's own root/entry-point node, Bloom level "remember,"
foundational difficulty, with zero prerequisites to build a discovery
sequence FROM. A genuine 6-step discovery design (need → playground →
invention → collision → formalization → compression) presupposes some
existing conceptual material for the learner to manipulate and collide
with; at the very first concept of the very first domain, the learner
has no prior biological content to draw the "need" from. This matches
the same argued case `eng.phonics.letter-sound-correspondence` and
`phys.mech.newtons-first-law` make for their own entry-adjacent nodes:
some concepts are genuinely orientational, not discoverable, and this is
one of them. The discrimination demonstration above (predict
single-branch vs. multi-branch, then check) is the closest this concept
comes to discovery, and it deliberately follows — not replaces — the
direct-instruction opening.

## Teaching Sequence

M1 must be addressed BEFORE M2, not the reverse and not simultaneously.
M2's repair depends on the learner already valuing biology's underlying
mechanisms enough to look for how the branches cooperate through them —
a learner who still believes biology is pure recall has no reason to
care whether physiology "connects" to ecology, since connection is not
a category memorisation rewards. Practically: open with the branch-naming
recognition item (the seed corpus's `mcq`), then run the M1 repair (the
"is biology just memorisation" misconception probe) before ever
introducing the multi-branch discrimination demonstration or M2's own
detection probe. This concept's own core explanation is written in that
order for the same reason — branches are named first, then immediately
followed by "every branch ultimately connects," with the memorisation
correction held for the dedicated misconception_repair pass.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (branch
names, delivered plainly — this is a "remember"-level node and does not
need to be discovered) → **Worked Example** (the heart/four-chambers
mechanism-behind-the-name demonstration) → **Error Analysis** (the M1
misconception probe, framed as "what's wrong with this student's
claim?") → **Classification/Sorting** (the discrimination demonstration,
sorting scenarios into single- vs. multi-branch) → **Prediction**
(attached to the discrimination demonstration, predict-before-check).
**What doesn't fit**: Discovery/guided-invention actions — argued above
under Discovery Questions; Game-family actions — the content here is
foundational orientation, not yet a skill with enough structure to
support a game's chocolate-covered-broccoli risk (per
`../../teaching-actions/README.md`'s own guard on that family).

## Voice Teaching Notes

Listen for the phrase "just memorise" or "just remember" applied
unprompted to biology as a whole — this is M1's verbal signature and a
stronger, earlier signal than any formal probe response, since a learner
who volunteers this framing before being assessed is revealing their
standing model rather than a guess. Listen also for a scenario response
that names exactly one branch when the scenario itself named two or more
kinds of evidence — the SPEED of that single-branch answer matters: a
fast, confident single-branch answer (not a hedged one) is the strongest
form of M2, since it indicates the learner did not even consider that
more than one branch might apply. The load-bearing sentence: "every name
you'll learn is a handle for a reason — memorise the handle, but always
ask for the reason too" — deliver slowly, and this is a non-audio
concept in the sense that its core evidence is verbal reasoning about
scenarios rather than pronunciation or reading fluency; channel-reality
limits for audio signal capture are owned centrally by `../foundations/
03-voice-first-learning-model.md §7`, cited, not repeated.

## Assessment Signals

Seed corpus probes (see Runtime Asset References below) are this
concept's item bank; no Blueprint exists to check against, so nothing is
being duplicated. Diagnostic interpretation this entry adds: on the
branch-naming `mcq` ("which branch studies organism-environment
interactions"), a WRONG answer of "physiology" or "genetics" (both
carry `misconceptionId: M2` in the seed corpus) at fast latency signals
the learner has not yet separated "branches interact" from "branches are
interchangeable" — route to the M2 repair path, not to re-teaching the
branch list itself (the learner likely knows the names; they are
mis-mapping a scenario, not missing vocabulary). On the M1
`misconception_probe`, a CORRECT-but-slow answer (the learner eventually
rejects the memorisation framing, but only after visible hesitation)
signals a residual, not-yet-fully-repaired M1 — appropriate for a
Type-5 misconception's expected gradual fade rather than a one-shot
repair, so a slow-correct response here should not yet be scored as full
mastery of the underlying disposition, only of that one item. On the
depth-fix `short_answer` transfer probe (the frog-wetland scenario), any
single-branch answer, correct or not on its face, is itself the M2
signal — the item is designed so that no single-branch choice is marked
correct.

## Tutor Recovery Strategy

Likeliest utterance here is not distress-shaped (this is a low-stakes,
foundational, "remember"-level concept) but rather a confident, wrong,
single-branch answer delivered without hesitation — treat this as a
recovery-adjacent moment even without an explicit "I don't know," per
the concept-specific pattern above. The concept-specific smaller
question for M1: "when you learned the word 'mitochondria,' were you
ever told WHY a cell needs one? Let's find that reason together" — a
concrete, single-term shrink rather than an abstract argument about the
nature of science. The concept-specific smaller question for M2: "you
said ecology. Does anything in the scenario also sound like it needs a
different branch — maybe how the frogs' bodies work?" — pointing at the
specific second piece of evidence already present in the scenario rather
than asking the learner to generate a second branch from nothing.
Generic recovery machinery (utterance library, non-verbal distress
protocol) is owned by `../foundations/01-recovery-engine.md`, cited, not
restated.

## Memory Hooks

**Type**: concept (a disposition toward how to think about the whole
subject), not a fact, procedure, or tool skill — so review should NOT
take the form of a speeded recall burst; it should take the form of
periodically re-presenting a NEW real-world scenario and checking
whether the learner still correctly multi-branches it, since the
disposition being built is "look for more than one branch," not "recall
the branch list." Interleaving partners: this concept should be
re-surfaced lightly whenever a new branch-specific concept is introduced
later in the curriculum (e.g. when teaching an ecology-specific concept,
briefly ask which OTHER branch that same real-world topic might also
touch) — this is the natural, low-cost way to keep M2 from regrowing
without a dedicated review session.

## Transfer Connections

- **Near**: a new real-world scenario (not the frog wetland, not the
  heart) that likewise requires two or more of the six named branches,
  checked for correct multi-branch identification.
- **Far**: recognising the SAME "one underlying system, several
  cooperating angles of study" structure in a domain outside biology
  (e.g. a car's malfunction diagnosed via mechanical, electrical, and
  software angles at once) — a structural transfer of the "no single
  narrow lens is sufficient" principle, not a biology fact.
- **Real-world**: any current-events health, environmental, or
  agricultural story the learner encounters (a disease outbreak, a
  drought's effect on crops) examined for which branches of biology it
  actually draws on.
- **Expert transfer**: on meeting any new biological claim or headline,
  the learner spontaneously asks "which branches does this actually
  need, and is anyone leaving one out?" — evidence the multi-branch
  disposition has become a standing habit rather than a one-off exercise
  answer.

## Cross-Subject Connections

KG `cross_links` for this concept is empty (`[]`) — there is no
KG-encoded cross-subject edge to cite, and none is fabricated here. A
genuinely real but KG-unencoded connection exists to `math.found.
mathematical-thinking` (both concepts are their subject's own
zero-prerequisite root node, and both establish "this is a reasoning
discipline, not a fact list" as their opening move) — recorded here as
an honest structural parallel between two Educational Brain entries,
not a claim that the KG should encode a direct edge between two
unrelated subjects' foundational concepts.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.found.what-is-biology.md` as of this entry's authoring (confirmed by
direct directory listing — the biology subject has zero Blueprint files
in total, unlike physics/mathematics/english, whose Blueprint corpora
this program routinely cites). This is itself useful signal for the
Curriculum Production Pipeline's own backlog, not a gap this program
fills — per the Standard's own instruction for exactly this case.

## Runtime Asset References

Seeded in the seed corpus (not yet independently verified as ACTIVE in
the production DB from this session — that verification is Wave 5's
job, not this entry's): `src/lib/teaching/assets/biologySeedAssets.ts`
carries `core_explanation` and `misconception_repair` explanations plus
`mcq` and `misconception_probe` probes, all at gradeBand HIGH
(canonicalSlug pattern `bio.found.what-is-biology:{familyKind}:en:high`);
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 1, this same
program) adds one further `short_answer` probe at gradeBand HIGH,
PROFICIENT difficulty, closing this concept to the 3-probe asset
contract floor (`correctAtCheck >= 1` plus `correctAtPractice >= 2`).
No new asset was created as part of authoring this Educational Brain
entry — all four items above already existed in the repository before
this entry was written; this section only names them.

## Curriculum Feedback

One genuine observation, recorded as feedback rather than fixed locally:
this concept's second KG-listed unlock, `bio.found.scientific-method-in-
biology`, has zero seed content of any kind (0 explanations, 0 probes)
— it is one of the 91 concepts added by the 2026-09-14 KG extension that
have not yet received any authored teaching content, distinct from the
108 originally-authored concepts this program's probe-depth campaign is
closing one domain at a time. This does not block certifying THIS
concept, but a learner who reaches that specific unlock next will find
no served content there yet.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, first entry, anchored to the KG root node). No Blueprint
  exists for this concept; both misconceptions classified directly
  against the concept's own seed content in `biologySeedAssets.ts` using
  the birth-taxonomy diagnostic procedure. Authored in the same session
  as probe-depth Batch 2 (bio.cell); the two workstreams are tracked
  with separate counters per the program's own reporting discipline
  (Original probe depth vs. Formal EB) and must never be conflated.
