# The Teaching Action Selector

Given a concept, a learner, a student state, the failure history, the
voice channel, and the session history — which teaching action runs next?
The action catalog itself lives in Delivery 2 §6 (27 actions in six
families: SHOW / DO / TELL / TEST-THINKING / ORGANIZE / SOCIAL). This file
is the **selection procedure**: seven ordered filters that narrow the
catalog to one choice. Filters run in order; earlier filters are never
overridden by later ones.

## The seven-filter funnel

**FILTER 1 — Authored override (the concept entry wins).**
If the concept's `../concepts/` entry names a dispatch order ("in order:
guided discovery → demonstration → worked examples → game..."), that order
IS the selection for teaching passes, and its named poor-fits are excluded
outright. Authored beats derived, always — the entry was written against
this exact concept's failure modes. The funnel below fully runs only for
uncovered concepts (and its outputs are exactly what the entry's author
should record — every funnel run on an uncovered concept is a draft of
that concept's future dispatch section).

**FILTER 2 — Knowledge-type match** (from Delivery 2 §6's dispatch):
- concept → analogy, contrasting cases, classification, drawing
- procedure → worked example → completion → faded practice; fluency game
- causal system → prediction + demonstration/simulation; thought experiment
- fact/convention → story, direct telling, retrieval schedule
- live misconception → prediction + collision + error analysis
- physical procedure → practical/enactment (no substitute)
Actions outside the concept's knowledge-type row are cut here.

**FILTER 3 — Teaching-state legality** (01): DEMONSTRATION admits the
SHOW/DO families; EXPLANATION admits TELL; GUIDED/INDEPENDENT admit
practice forms + drawing + game; ASSESSMENT admits only
`../assessment/`-sanctioned item forms; REVIEW admits retrieval forms
(re-doing, re-explaining, classification runs). An action arriving in the
wrong state is cut regardless of its fit otherwise (a story mid-assessment
is a lovely derailment).

**FILTER 4 — Learner constraints**:
- *Age/register*: thought experiments, concept maps, and paper error
  analysis require meta-language young children don't have (cut below
  ~10); silent written forms are cut for pre-readers; enactment and
  puppet forms fade for adolescents in favor of private variants.
- *Persona vetoes* (Delivery 2 §9): no public role-play for the fearful;
  no unstructured puzzles for the anxious; no chocolate-broccoli games
  for anyone; competitive learners get self-record framings; burned-out
  learners get minimum-ceremony forms.
- *Modality requirements*: voice-required concepts (decoding,
  pronunciation) force oral forms; motor procedures force practical.
- *Accessibility constraints of the channel* (a voice-only session cuts
  visually-dependent forms unless a screen is confirmed).

**FILTER 5 — History (the anti-repetition and affinity filter)**:
- *Failed-family exclusion*: a family that already failed on this concept
  for this learner is excluded this pass — rotate FAMILIES, not cousins
  (a failed verbal explanation is not answered by a differently-worded
  verbal explanation; Delivery 1's representation rule at family scale).
- *The three-representation rule*: if two families have already failed on
  this concept, the third move is NOT a third family — it is a
  prerequisite check (05 §1). The funnel exits to the escalation engine.
- *Personal affinity*: what has worked for THIS learner before, recorded
  in the learner model (08 §3) — the child who lights up at stories gets
  the story form when the filter leaves a tie; the engineer who hates
  analogies gets the mechanism directly. Affinity biases; it never
  overrides filters 1–4.
- *Novelty budget*: an action format the learner has never met costs one
  working-memory slot to learn (the format is content too —
  `../assessment/01 §4`); late in a session or under any load, cut
  never-seen formats.

**FILTER 6 — Load fit** (Delivery 2 §5): the action's setup cost must fit
the learner's current headroom. Under any load signal: no simulations
(parameter spaces are load), no multi-step games, no model-building; the
low-load end of the surviving families wins (demonstration over
simulation, worked example over problem, echo over production). With full
headroom and a drive-band state: the high-germane end wins (production
over reception — Universal Principle 19 biases every tie toward the
learner DOING).

**FILTER 7 — Tie-break, in order**: (a) prediction-first compatible beats
not (the highest leverage-to-cost action wraps almost anything —
Delivery 2 §6); (b) more production beats more reception; (c) cheaper
setup beats richer; (d) the form that doubles as evidence beats the form
that doesn't (a drawing is teaching AND a model X-ray).

## Standing rules that sit outside the funnel

- **RECOVERY and REVIEW are not selected — they are scheduled.** Recovery
  preempts on state (03 §0); review arrives on due-dates (07 §4). The
  funnel picks teaching actions within an already-chosen teaching state.
- **Prediction wraps everything**: whatever survives the funnel, if a
  reveal is coming, a committed prediction precedes it. This is a
  decoration rule, not a selection outcome.
- **One action per turn.** The funnel yields one action; queuing two
  ("let's watch this and then map it") splits attention and doubles
  setup cost. The second-best action is the next turn's candidate, not
  this turn's rider.

## Worked traces (the funnel running)

**Trace 1 — `phys.mech.newtons-first-law`, age 14, state CONFUSED, one
verbal explanation already failed, voice session with screen.**
F1: entry exists — dispatch says prediction → demonstration → discovery →
thought experiment...; explanation family already used and failed.
F2–F3: DEMONSTRATION state; SHOW/DO legal. F4: no vetoes. F5: TELL family
excluded (failed); demonstration is the entry's next listed. F6: CONFUSED
= moderate load → demonstration over simulation. F7: prediction-first
wraps it. **Decision: the friction-dial demonstration, prediction
committed before each surface.** (Exactly what the entry's author
intended — filter 1 and the funnel agree, which is the design working.)

**Trace 2 — `math.arith.fractions`, adult returning learner, state BORED
(comparison items too easy), history: worked examples fluent.**
F1: entry lists error analysis for intermediate+. F2: concept knowledge —
contrasting/classification/error-analysis rows live. F3: GUIDED state.
F4: adult — error analysis fine. F5: worked examples excluded (done,
fluent — redundancy); affinity: this learner enjoyed "find the flaw"
before. F6: no load. F7: error analysis is production-heavy and doubles
as evidence. **Decision: the M2 error-analysis item ("a student wrote
1/2 + 1/3 = 2/5 — what were they thinking, where does it break?").**

**Trace 3 — `eng.phonics.letter-sound-correspondence`, age 6, lesson
one, state FEARFUL (whispered answers).**
No funnel run: affect band → RECOVERY preempts (03 §0), lesson-one delta
applies ("I'm scared" script, `../first-lesson/05 §2` — demonstrate more,
ask less). When teaching resumes one step down, filter 1 gives the
entry's voice-mirror demonstration; filters would anyway cut everything
but oral forms (voice-required concept) and low-load forms (fear = load).
**Decision: tutor voice-models the stretched blend, learner invited to
echo — nothing else — and the session shortens.**
