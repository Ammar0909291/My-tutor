# Educational Brain — Knowledge Base

This directory is the **permanent, authored educational knowledge** of My Tutor —
the moat. It contains teaching science, not software: the knowledge that makes
the tutor teach like the world's greatest human teacher, authored once and
reused forever.

## Charter

**The Educational Brain is the moat. AI is not the moat.**

The long-term objective is to reduce AI reasoning over time: every time
educational knowledge is discovered that can be authored once and reused
forever, it is written here. Eventually the AI should mostly *retrieve*
educational knowledge instead of *inventing* it, turn by turn, at inference
time. Invented pedagogy is inconsistent, unauditable, and lost after every
conversation; authored pedagogy compounds.

The quality bar for everything in this tree:

> If the weakest student in the world can master a concept using this
> knowledge, then almost every other student can too.

## What lives here vs. elsewhere

| Location | Contents | Nature |
|---|---|---|
| `educational-brain/` (this tree) | Teaching science: assessment design, misconception science, explanation libraries, teaching actions, memory/curiosity/transfer engines | **Knowledge** (subject-independent, implementation-independent, permanent) |
| `docs/educational-brain/` | ch01–ch11 implementation blueprints (knowledge assets, decision pipeline, evidence engine, scaling) | **Implementation design** for the runtime Brain |
| `docs/architecture/` | The Educational Brain Bible + ADRs 02–14 | **Engine architecture** (frozen v1.0) |
| `docs/{subject}/kg/` | Canonical Knowledge Graphs | **Curriculum** (owned by the Curriculum Production Pipeline — never edited here) |

Nothing in this tree modifies, or is modified by, runtime code, schemas,
curriculum, or the architecture documents. It is the content the runtime Brain
will eventually retrieve from.

## Provenance and delivery history

- **Correction 2 — Decision Matrix Silent Cells** (in-repo, 2026-07-10,
  critical-review iteration, extends Delivery 7 rather than a new
  delivery): `decision-engine/03-decision-matrix.md §6, §8` — critical
  review found the matrix silently left 5 teaching-state × student-state
  cells unhandled: CONFUSED during ASSESSMENT (§6), and CONFUSED,
  GUESSING, MISCONCEIVING, FRAGILE during TRANSITION/CLOSING (§8) — a
  genuine missing-decision-path gap, not a design choice (the file names
  every other cognitive/drive state in both sections; these four/one were
  simply absent). Added: CONFUSED-during-ASSESSMENT aborts the item
  without scoring it (an item answered from confusion decides nothing,
  same non-decisive principle as GUESSING) and routes to the escalation
  engine before resuming. CONFUSED/GUESSING/MISCONCEIVING/FRAGILE-during-
  CLOSING each honor CLOSING's existing "never sacrificed to content"
  protection (`decision-engine/01 §2`) by turning the unresolved state
  into the close's mandatory open loop or next-session queue item rather
  than attempting resolution or, worse, closing with language that
  misrepresents an unresolved state as settled. Knowledge-correction
  only — no runtime/schema/curriculum changes.
- **Correction 1 — Voice Channel Reality** (in-repo, 2026-07-10, critical-
  review iteration, extends Delivery 11 rather than a new delivery):
  `foundations/03-voice-first-learning-model.md §7` added. Critical-review
  mode ("assume every previous decision may be wrong, attempt to break
  it") found that this file and every document that cites its four
  instruments (latency, prosody, hesitation location, self-corrections)
  silently assumed voice signals reach the teaching decision layer. Verified
  against the live runtime (`src/components/learn/LessonScreen.tsx`,
  `src/app/api/stt/route.ts`) that the product DOES have real voice
  input/output (MediaRecorder → Whisper STT / browser SpeechRecognition,
  plus TTS) — the assumption of "no voice channel" would have been wrong —
  but the STT endpoint requests Whisper's `json` format (bare text only)
  and returns exactly `{ text }`, discarding every timing/prosodic signal
  before it ever reaches `route.ts`. All four instruments are therefore
  architecturally unavailable to the decision layer today, in EITHER
  channel — worse than "not yet retrieved" (this tree's usual gap), this
  is signal captured by the client and then actively discarded by one
  implementation choice, never designed to reach the Brain at all. Added:
  an honest per-instrument availability table (self-corrections fully
  available from text today; latency partially so; prosody available in
  neither channel without new infrastructure), a cost-ranked list of cheap
  recovery steps for whoever eventually works Migration Blueprint runtime
  phases (switching Whisper's response format to `verbose_json` recovers
  segment timestamps at zero infrastructure cost), and an explicit
  naming of the Migration Blueprint's `<!--SIGNAL-->` tag as an LLM-self-
  report SUBSTITUTE for this signal, not equivalent to real instrumentation.
  `concepts/TEMPLATE.md`'s Voice teaching section updated to point future
  concept authors here once, centrally, rather than re-litigating the
  channel-reality gap in every entry (Delivery 14's own phonemic-awareness
  entry is named as the corrected example, not rewritten, per that same
  no-duplication rule). Knowledge-correction only — no runtime/schema/
  curriculum changes; the finding itself will inform future Migration
  Blueprint runtime work but implements nothing.
- **Delivery 14** (in-repo, 2026-07-10): `concepts/english/
  eng.phonics.phonemic-awareness.md` — English's true zero-prerequisite
  entry node, authored ahead of file order because `concepts/
  COVERAGE.md`'s own expansion protocol ranks placement entry points
  above cut-nodes and misconception hubs, yet all 3 Delivery 5 seed
  entries are cut-nodes/hubs, not entry points. This is the exact
  concept `first-lesson/07 §1` names as the origin of the platform's
  own documented English-lesson-one failure — chosen over continuing
  the universal-engine track (Mental Model Library, D2 §1) because a
  citation check found Mental Models far thinner in scattered
  citations than Misconceptions was before Delivery 13 (much of its
  core insight already absorbed into Universal Principle 6), while
  concept coverage remained the most quantifiable, most evidence-
  grounded gap in the tree — and because 3 major force-multiplier
  engines (Foundations, Teaching Actions, Misconceptions) had just
  become available to validate against genuinely new content rather
  than further self-referential authoring. Applied the newly-authored
  misconception birth-taxonomy diagnostic procedure to a concept for
  the first time, surfacing 3 new misconceptions (language
  contamination on the word "sound" itself — Type 3; syllable/phoneme-
  counting overgeneralization — Type 1; rhyme-only "same sound" from
  rhyme-first instruction — Type 5) as a genuine stress-test of
  Deliveries 11–13. Full entry at the seed quality bar: mental models,
  misconception library, explanation/analogy/demonstration libraries,
  an argued direct-instruction call (not discovery-framework) with
  reasoning specific to attention-shift concepts, teaching-action
  dispatch from the new 27-action catalog, voice teaching applying the
  new Voice-First Learning Model, assessment explaining the KG's
  unusually high 0.85 mastery threshold, recovery notes applying the
  new Recovery Engine, memory/transfer maps. `eng.phonics.print-
  concepts` (the KG's other zero-prerequisite entry node) recorded as
  the immediate next coverage priority, not authored this delivery.
  Knowledge only — no runtime/schema/curriculum changes.
- **Delivery 13** (in-repo, 2026-07-10): the **Misconception Evolution
  Library** — `misconceptions/`: the transcription of Delivery 2 §4, the
  generic birth-type taxonomy and universal repair sequence every
  concept entry's misconception library depends on. Chosen via the
  continuous-mode protocol's single question ("what is the single
  highest-impact weakness preventing a 9/10 Educational Brain?") over
  the strongest competing candidate, raw concept-coverage expansion —
  reasoning: one new concept entry helps only that concept, while the
  generic misconception theory is a force multiplier for every
  misconception library ever written, past and future, and expanding
  coverage without it first would lock in inconsistent, improvised
  birth-type logic across a growing set of entries. Reuse-first check
  found the taxonomy already ~80% reconstructable from scattered
  citations (birth types 1, 2, 4, 5, 6 all already named with specific
  meaning across `concepts/`, `decision-engine/05`, `assessment/08`;
  type 3 named only in `student-state/03`'s regression-prior table with
  no explanation) — the same pattern that made Universal Principles
  low-risk to formalize in Delivery 11. Contents: all 6 birth types
  (overgeneralization, perceptual intuition, language contamination,
  notation-induced, instruction-induced, analogy overextension) each
  with generic mechanism, diagnostic signature, and NEW cross-subject
  examples beyond the 2 already in the tree (English irregular verbs,
  ice density, "theory" contamination, apostrophe notation, atomic
  indivisibility, the water-circuit analogy) to prove the taxonomy
  generalizes; a 7-question diagnostic decision procedure for
  identifying a new misconception's birth type when authoring any of
  the ~1,800 uncovered concepts; the full generic 7-step repair sequence
  (elicit→commit→collide→replace→contrast→apply→re-probe) with
  per-birth-type collision-design rules; the precise operational
  definition of "burned collision" (two necessary conditions, not just
  "used once"); and the metastasis-chain mechanism with a new just-in-
  time chain-check trigger extending `placement/05`'s absent-prerequisite
  logic to corrupted (ACTIVE-misconception) prerequisites. Deliberately
  did NOT restate `student-state/03`'s ledger structure, status
  lifecycle, or regression-prior table — referenced, not duplicated.
  Knowledge only — no runtime/schema/curriculum changes.
- **Delivery 12** (in-repo, 2026-07-10): the **Teaching Action Library** —
  `teaching-actions/`: the transcription of Delivery 2 §6, the 27-action
  catalog (6 families: SHOW, TELL, DO, TEST-THINKING, ORGANIZE, SOCIAL)
  the action selector (`decision-engine/04`'s seven-filter funnel)
  dispatches into. Named by three independent audits as the single
  highest-remaining-ROI gap: Filters 2, 4, and 6 of the selector cannot
  run at all without this catalog, for any concept lacking a per-concept
  entry (currently 3 of ~1,800). Every action was already referenced by
  name somewhere in the tree before this delivery (Demonstration, Worked
  Example, Analogy, Drawing, Matching, Error Analysis, Game, Concept Map,
  Thought Experiment, Role-Play, Prediction) — none redefined, all
  completed to the full 27 with knowledge-type fit, setup-cost tier, and
  persona notes per action. Notable content: the chocolate-covered-
  broccoli guard on Game (mastery must be re-verified outside the game
  skin before certifying); the stability guard on Error Analysis (only
  plant a flaw once the correct schema is solid, or the flaw may be
  learned); the Matching action's bidirectional-translation diagnostic
  (one-way success with reverse failure names exactly what to teach
  next); Retrieval-Schedule Prompt as the action that populates session
  OPENING. Deliberately did not re-author the 12-persona table (Delivery
  2 §9, still `motivation/`) or the Cognitive Load Engine's load theory
  (Delivery 2 §5, still `cognitive-load/`) — persona names used
  generically exactly as already cited elsewhere; load costs are a
  simple 3-tier tag, not a restatement of that other library. Knowledge
  only — no runtime/schema/curriculum changes.
- **Delivery 11** (in-repo, 2026-07-10): the **Foundations Library** —
  `foundations/`: the transcription of Delivery 1's four universal
  engines, cited by name and by number throughout this tree since
  Delivery 3 but never before written down. Contains the Recovery Engine
  (the base script library for every stuck-learner utterance, the
  non-verbal distress protocol, the personalization hook into the
  Emotional Model, and the relationship to the escalation engine's
  recovery-failure ladder), the Adaptive Teaching Rules ("the D1 grid" —
  the speed × correctness × confidence grid governing every advance/hold/
  step-back decision, the fluency-gate rule, and the explicit connection
  to `decide()`'s partial, undocumented encoding of the same grid found
  in the Architecture Audit), the Voice-First Learning Model (the four
  detection instruments, the wait-time law, the load-bearing-sentence
  rule, matched energy / the mockery effect, and the register-never-
  drops-on-error rule), and all 23 Universal Teaching Principles — 11
  reconstructed to match every prior citation exactly, 12 authored for
  the first time by formalizing rules the tree was already following
  without a name. Resolves the single largest set of dangling citations
  in the Brain (`../validation/06-highest-roi-recommendation.md`'s named
  highest-ROI step). Confirmed, before writing anything, that Delivery
  1's originally-scoped "Canonical Per-Concept Schema" item is already
  fully satisfied by `concepts/TEMPLATE.md` (Delivery 5) — not
  re-authored, to avoid duplicating an already-correct document.
  Knowledge only — no runtime/schema/curriculum changes.
- **Delivery 1** (originally chat-authored; Recovery Engine, Adaptive
  Teaching Rules, and Voice-First Learning Model now transcribed in-repo
  as Delivery 11 above): the Canonical Per-Concept Schema item is
  satisfied by `concepts/TEMPLATE.md` (Delivery 5). Remaining, still not
  yet authored: the seed concept for Equals Sign (Letter-Sound
  Correspondence already has a full entry under Delivery 5) — recorded
  as a `concepts/COVERAGE.md` backlog item, not a universal-engine gap.
- **Delivery 2** (chat-authored, pending transcription — Universal
  Teaching Principles moved to Delivery 11 above; remaining items below
  still pending): Mental Model Library, Discovery Framework, Curiosity
  Engine, Misconception Evolution, Cognitive Load Engine, Teaching Action
  Library (27 actions), Transfer Library, Memory Engine, Motivation
  Engine.
- **Delivery 10** (in-repo): the **Student Placement & Category Progression Engine** —
  `placement/`: the permanent rules for WHERE teaching begins, sitting between
  the curriculum (WHAT) and the teaching engine (HOW). Eight documents: the
  placement law + two placement errors + the human-tutor model (why great tutors
  never start from lesson one); the self-report trust model (systematic under- and
  over-reporting mechanics; trust calibration by age/context; three-bracket
  verification; adjustment without insult; the miscalibration-direction record);
  the full placement protocol (category spine search; per-branch frontier records;
  patchy-history flag; placement modes A/B/C; what placement does NOT do); the
  category mastery definition (gate concepts AUTOMATIC + STABLE + one transfer
  event; ANCHORED/PROBABLE/UNCERTAIN/UNKNOWN confidence levels; the never-reteach
  law — never enter a mastered category as a teaching target; decay ≠ demotion;
  FORGOTTEN ≠ UNKNOWN — storage survives); the progression engine (promotion
  criteria; the progression guarantee; demotion triggers; regression repair
  targeting only the specific gap; patchy-history just-in-time repair; cross-
  category prerequisites; multi-subject independence); resumption after absence
  (decay timeline by gap length; warm-up vs. reteach; cascade-unlock protocol;
  re-placement from high-water mark; the returning learner's emotional state);
  six student simulations fully traced (false-beginner A; false-advanced B;
  returning learner C; patchy-history D; multi-branch E; adult shame-bias F);
  vision + human-tutor validation and remaining gap inventory. Knowledge only —
  no runtime/schema/curriculum changes.
- **Delivery 9** (in-repo): the **Human Tutor Validation & Gap Audit** —
  `validation/`: a comprehensive audit of Deliveries 1–8 as one integrated
  system. Six documents: three complete session simulations (fearful
  beginner / misconceiving adult / bored advanced) with every decision
  traced turn-by-turn to its source file and section; four failure-replay
  analyses of platform-observed failures with prevention diagnosis; a
  complete AI-dependency inventory (52 retrievable layers confirmed; 13
  partially-retrieved engines pending Delivery 1–2 transcription; 3
  authorized residue categories); a duplication audit (5 proper-layering
  findings; 2 real redundancy issues with resolution protocols; 4 minor
  cross-reference gaps); 10 missing human teaching science domains (ranked
  by learner impact: relationship capital, worked example design,
  vocabulary pre-teaching, error analysis design, metacognitive instruction,
  interleaving design, retrieval practice design, wait-time calibration,
  pre-assessment design, explanation construction rules); and the
  highest-ROI recommendation: transcribing Deliveries 1–2 into the repo
  tree resolves all 13 partially-retrieved layers simultaneously and
  converts the action selector from a procedure with empty libraries to a
  fully operational dispatch engine.
- **Delivery 3** (this tree's first in-repo content): the **Assessment Design
  Library** — `assessment/`.
- **Delivery 5** (in-repo): the **Curriculum Integration Layer** —
  `concepts/`: the binding spec attaching Brain knowledge to canonical KG
  concept IDs (curriculum = WHAT, Brain = HOW, no second hierarchy), the
  concept-entry template/authoring contract, the coverage manifest with
  expansion protocol, and three full-depth seed entries (one per live
  subject) as the permanent quality bar.
- **Delivery 8** (in-repo): the **Student State Model** — `student-state/`:
  the permanent learner representation (weather vs climate: the Decision
  Engine's momentary states read their priors from, and write evidence back
  into, this standing model). Eight dimensions under seven design laws
  (evidence-backed + dated, decaying, per-domain, descriptions-never-
  verdicts, hypothesis-not-fact, asymmetric caution, never-judges): the
  8-rung per-concept knowledge ladder mapped to machine entry points (the
  structural ban on re-teaching from zero), the misconception ledger
  (separate from knowledge — competing knowledge, with strength, verbatim
  evidence, repair history, no-ERASED-status lifecycle, birth-type
  regression priors), the standing confidence/calibration profile (the
  build-slow/collapse-steep asymmetry; personalized affect budgets), the
  behaviour profile (affinities as statistics never identities), the
  emotional model (triggers, recovery speed, flow conditions, imported
  history, personalized recovery list), per-concept memory statuses as
  views over the Memory Engine (+ the personal forgetting rate), teaching
  history (breakthrough verbatims + representation-family inheritance +
  the summarization policy), trajectory (velocity/acceleration/plateau
  diagnosis tree/momentum/readiness), and the assembled digital twin
  (eight mandatory questions, decision provenance, six-learner audit —
  learner types are regions of the model space, not architectures).
  ADR 10's runtime stores referenced as the code-side containers; no
  schemas here.
- **Delivery 7** (in-repo): the **Teaching Decision Engine** —
  `decision-engine/`: the executive layer that retrieves DECISIONS, not
  documents — every teaching state and transition, every learner state with
  voice/behaviour/learning detection, the state×state decision matrix
  (affect-band preemption + compact cognitive matrix), the seven-filter
  action selector with worked traces, failure-escalation ladders, the
  conversation engine (anti-quiz/interview/lecture/robot rules + the
  react-move-invite turn skeleton), the lesson planning engine (pacing,
  compaction, summit-ending), and the per-turn teaching loop with the
  eight-strategy closed set, the learner-model update contract, and the
  retrieval ledger. Unifies Deliveries 1–6 by reference; runtime engines
  (ADR 08/09/11, the Bible) untouched — this is the pedagogy they will
  retrieve.
- **Delivery 6** (in-repo): the **First Lesson Standard** — `first-lesson/`:
  the universal standards for teaching a complete beginner, born from the
  platform's own observed failure to reliably teach the first lesson of
  English. Eight documents: the complete-beginner definition (informal
  knowledge is the only foundation), never-rules + hard limits (1 concept,
  ≤3 words, 2-slot working memory), tutor behaviour, the corrected flow
  (demonstrate before explain; echo before solo; lesson one completes at
  lesson two's opening retrieval), failure-state lesson-one deltas
  ("I'm scared" / "I'm stupid" added), the 16-entry AI anti-library,
  subject adaptations anchored to the verified KG entry nodes
  (eng.phonics.print-concepts/phonemic-awareness,
  math.found.mathematical-thinking, phys.meas.units), and the
  failure→artifact feedback loop.

Documents in this tree cite Delivery 1/2 knowledge by name (e.g. "the Recovery
Engine", "the latency × correctness grid", "Universal Principle 17") and
restate whatever they depend on, so every file remains self-contained and
permanent even before those deliveries are transcribed.

## Directory map

Authored now:

```
educational-brain/
  README.md                 ← this file
  assessment/               ← Assessment Design Library (Delivery 3)
  concepts/                 ← Curriculum Integration Layer (Delivery 5):
                              per-concept teaching moat entries keyed to
                              canonical KG concept IDs — binding spec,
                              entry template, coverage manifest, and
                              entries (math.arith.fractions,
                              phys.mech.newtons-first-law,
                              eng.phonics.letter-sound-correspondence,
                              eng.phonics.phonemic-awareness — Delivery 14,
                              English's true zero-prerequisite entry node)
  first-lesson/             ← First Lesson Standard (Delivery 6): the
                              universal standards for teaching a complete
                              beginner — beginner definition/detection,
                              never-rules + hard cognitive limits, tutor
                              behaviour, the corrected lesson flow +
                              measurable completion criteria, failure-state
                              deltas, the AI anti-library, subject
                              adaptations anchored to the real KG entry
                              nodes, and the compounding feedback loop
  decision-engine/          ← Teaching Decision Engine (Delivery 7): the
                              layer that decides WHAT TO DO NEXT every
                              turn — teaching state machine, student state
                              engine, decision matrix, seven-filter action
                              selector, escalation ladders, conversation
                              engine, lesson planning engine, and the
                              per-turn teaching loop with the retrieval
                              ledger (what is retrieved vs still invented)
  student-state/            ← Student State Model (Delivery 8): the
                              permanent learner representation the Decision
                              Engine reasons over — eight standing
                              dimensions (knowledge ladder, misconception
                              ledger, confidence profile, behaviour
                              profile, emotional model, memory statuses,
                              teaching history, trajectory) assembled into
                              the student digital twin with decision
                              provenance and the six-learner audit
  validation/               ← Human Tutor Validation & Gap Audit (Delivery
                              9): three session simulations with full
                              decision traces; four failure replays; the
                              complete retrieved-vs-invented inventory (52
                              retrievable layers, 13 partially-retrieved
                              engines, 3 authorized residue categories);
                              duplication audit; 10 missing knowledge
                              domains; highest-ROI recommendation
  placement/                ← Student Placement & Category Progression
                              Engine (Delivery 10): the permanent rules
                              for WHERE teaching begins — category mastery
                              definition (ANCHORED/PROBABLE/UNCERTAIN/
                              UNKNOWN), the never-reteach law, self-report
                              trust model, placement protocol (binary-
                              search at category level), promotion/
                              demotion/regression-repair, resumption after
                              absence, six student simulations (false-
                              beginner / false-advanced / returning /
                              patchy-history / multi-branch / shame-bias),
                              and gap validation against the vision
  foundations/              ← Foundations Library (Delivery 11): the
                              Delivery 1 transcription — the Recovery
                              Engine (base script library, non-verbal
                              distress protocol, personalization hook,
                              escalation-ladder relationship), the
                              Adaptive Teaching Rules ("the D1 grid" —
                              speed × correctness × confidence, the
                              fluency gate, the runtime connection to
                              decide()'s partial encoding), the
                              Voice-First Learning Model (the four
                              detection instruments, wait-time law,
                              load-bearing sentence, matched energy),
                              and all 23 Universal Teaching Principles
                              cited by number throughout this tree
  teaching-actions/         ← Teaching Action Library (Delivery 12): the
                              27-action dispatch catalog (SHOW/TELL/DO/
                              TEST-THINKING/ORGANIZE/SOCIAL) the action
                              selector's Filters 2, 4, and 6 dispatch
                              into — per-action knowledge-type fit, setup
                              cost, persona notes, and failure modes
  misconceptions/           ← Misconception Evolution Library (Delivery
                              13): the 6-type birth taxonomy (generic
                              mechanism, diagnostic signature, cross-
                              subject examples, and a diagnostic
                              procedure for classifying new
                              misconceptions), the full 7-step repair
                              sequence with per-birth-type collision
                              design, the precise "burned collision"
                              definition, and the metastasis-chain
                              just-in-time repair trigger
```

Planned libraries (authored in future deliveries; listed here as the intended
organization — directories are created when their content is authored, never
as empty placeholders):

```
  mental-models/      ← model stages, versioning, replacement rules (Delivery 2 §1)
  discovery/          ← the 6-step Discovery Framework + worked designs (Delivery 2 §2)
  curiosity/          ← triggers, chains, by-age/subject/personality (Delivery 2 §3)
  cognitive-load/     ← intrinsic/extraneous/germane, chunking, density rules (Delivery 2 §5)
  transfer/           ← the transfer ladder + six rules (Delivery 2 §7)
  memory/             ← spacing, retrieval, interleaving, review-by-type (Delivery 2 §8)
  motivation/         ← the 12 learner personas (Delivery 2 §9)
  explanations/       ← per-concept explanation libraries (Delivery 1 schema §3;
                        note: the schema itself is already delivered as
                        concepts/TEMPLATE.md, Delivery 5 — not re-authored)
  visual-teaching/    ← visual/diagram/animation design knowledge
  voice/              ← voice-first tutoring knowledge beyond the foundations/ model
  prerequisites/      ← prerequisite-diagnosis protocols per subject
  rubrics/            ← cross-cutting rubrics (assessment/10-rubrics.md seeds this)
```

(The Universal Teaching Principles, originally planned as a separate
`principles/` directory under Delivery 2 §10, were authored as
`foundations/04-universal-teaching-principles.md` instead — Delivery 11
judged a fourth file inside the already-created `foundations/` directory
to be less duplicative than a second single-purpose directory for what
is, in practice, one document.)

## Authoring rules for this tree

1. **Permanence over brevity.** Every document should be worth reading in ten
   years. No summaries-of-summaries, no placeholders, no TODOs.
2. **Why, not just what.** A principle whose *why* is lost gets discarded by
   the next generation of designers. Every rule carries its mechanism.
3. **Observable criteria only.** "The learner understands deeply" is not
   knowledge; "the learner explains the mechanism and survives a delayed,
   disguised re-probe" is.
4. **Self-contained files.** Cross-reference freely, but restate what a file
   depends on. A file that cannot stand alone is not permanent.
5. **Subject-independent first.** Prefer knowledge that applies to thousands
   of concepts. Per-concept entries follow the Canonical Per-Concept Schema
   (Delivery 1) and live in per-concept libraries.
6. **No implementation.** No code, no schemas, no API designs — those belong
   to `docs/educational-brain/` and `docs/architecture/`. This tree tells the
   runtime *what a great teacher knows*; how the runtime stores and serves it
   is someone else's document.
