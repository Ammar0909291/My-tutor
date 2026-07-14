# AI Dependency Audit — Retrieved vs. Invented

The Brain's purpose is to reduce AI improvisation over time. This file
measures how far that has come after Deliveries 1–8. Every teaching
decision layer is classified as one of three states:

- **RETRIEVED** — the rule is in-tree, the AI reads it, no improvisation
  occurs
- **PARTIALLY RETRIEVED** — the structure or procedure is in-tree but
  depends on a pending-transcription engine for its content
- **STILL INVENTED** — the AI generates this from scratch each turn

"Still invented" is not automatically a failure. Three categories of
improvisation are **authorized** (see §4) because they are inherently
dynamic: the Brain's goal is to reduce invented content to only those
three. Every entry outside those three categories is an authoring gap.

---

## §1. RETRIEVED — AI reads, does not invent

These are the rules the AI can retrieve today. No inference needed.

| Layer | What is retrieved | Source |
|---|---|---|
| Teaching state | Which of 10 named states is active | `../decision-engine/01` |
| State transitions | Every trigger and destination | `../decision-engine/01 §6` transition table |
| Lesson-one configuration | All locked settings: demonstrate-first, echo entry, one solo, invisible assessment, failure budget 1 | `../first-lesson/02`, `../first-lesson/04`, `../decision-engine/01 §5` |
| Learner state names | All 14 named states across three bands | `../decision-engine/02 §1` |
| State detection signals | Voice, behaviour, learning signals for all 14 states | `../decision-engine/02 §1` |
| Priority ordering | Affect > Cognitive > Drive — and the full ranking within each band | `../decision-engine/02 §2` |
| Transition trajectories | Failure spiral, boredom slide, repair path, learning heartbeat | `../decision-engine/02 §3` |
| Detection honesty rules | 4 rules: infer with confidence, cheaper-to-treat first, trends beat snapshots, stated state wins | `../decision-engine/02 §4` |
| Decision matrix | Teaching state × student-state band → concrete decision, including affect-band preemption | `../decision-engine/03` |
| Eight teaching strategies | HOLD, ADVANCE, RETREAT, ESCALATE, RECOVER, REVIEW-INJECT, STRETCH-OFFER, CLOSE | `../decision-engine/08 §2` |
| Action selector procedure | All 7 filters in order, standing rules (one action per turn, prediction wraps everything, RECOVERY not selected) | `../decision-engine/04` |
| Escalation ladders | Per-failure-type ladders and exit conditions | `../decision-engine/05` |
| Turn skeleton | REACT + one MOVE + INVITE structure; question ceiling (max 2 in a row); burst limits | `../decision-engine/06` |
| Register rules | Anti-quiz, anti-interview, anti-lecture, anti-robot registers with detection signals and antidotes | `../decision-engine/06 §1` |
| Session shape | OPENING invariants, fluency-gated triad, compaction protocol, summit-ending soft trigger, stuck-concept protocol | `../decision-engine/07` |
| Per-turn loop | All 7 steps in order; invariants; update contract fields | `../decision-engine/08` |
| Learner-model update fields | All 9 fields and their write triggers | `../decision-engine/08 §3` |
| Knowledge ladder | All 8 rungs with evidence definitions and machine entry points | `../student-state/02` |
| Knowledge ladder rules | 4 laws (evidence moves up, memory modulates down, high-water mark preserved, forward-only gate evidence) | `../student-state/02 §2` |
| Misconception ledger structure | Entry format, strength categories, status lifecycle, no-ERASED rule, regrowth trigger | `../student-state/03` |
| Confidence model | 5 chronic patterns, build-slow/collapse-steep asymmetry, calibration levels L0–L3 | `../student-state/04` |
| Behaviour profile | Pace style, affinities as statistics, attention span, persistence | `../student-state/05` |
| Emotional model | Triggers, recovery speed, flow conditions, imported history, personalized budgets, what-restores list | `../student-state/06` |
| Memory statuses | All 7 statuses with derivation rules and what each changes | `../student-state/07` |
| Teaching history structure | What is recorded, breakthrough logging, summarization policy | `../student-state/08` |
| Trajectory dimensions | Velocity, acceleration, plateau diagnosis tree, regression routing, momentum, readiness | `../student-state/09` |
| Digital twin questions | 8 mandatory questions + decision provenance rule | `../student-state/10` |
| Assessment foundations | 5 purposes, evidence model, quality metrics, anti-pattern catalog | `../assessment/01` |
| Diagnostic assessment | Binary-search placement, prerequisite diagnosis, decision trees | `../assessment/02` |
| Misconception detection | Probe design, distractor science, golden probes, commit-before-collision rule | `../assessment/03` |
| Confidence assessment | 4-quadrant model, calibration measurement protocol | `../assessment/04` |
| Mastery gates | Evidence hierarchy, gate components, circuit breaker rule | `../assessment/05 §3–4` |
| Modality assessment | Oral, visual, practical — when and how | `../assessment/06` |
| Assessment by learner | Age, level, subject, persona adaptations | `../assessment/07` |
| Post-teaching-action assessment | Which illusion each action creates, what punctures it | `../assessment/08` |
| Failed-assessment recovery | Failure taxonomy, autopsy protocol, recovery flowchart, circuit breaker | `../assessment/09` |
| Complete-beginner definition | Informal knowledge as the only foundation; false/returning beginner detection | `../first-lesson/01` |
| Never-rules | Full list with mechanisms; hard cognitive limits (1 concept, ≤3 new words, 2-sentence bursts) | `../first-lesson/02` |
| First-lesson tutor behavior | Wait time, redirect-never-mark-wrong, scripted close | `../first-lesson/03` |
| Corrected lesson flow | anchor→demonstrate→explain-after→echo→supported→prompted→ONE solo→invisible confirm→close | `../first-lesson/04` |
| Lesson-one completion criteria | C1–C4 with C2 = next-session opening retrieval | `../first-lesson/04 §3` |
| Failure-state deltas | "I'm scared" / "I'm stupid" scripts; one failure state per session max | `../first-lesson/05` |
| AI anti-library | All 16 entries with exact failure modes | `../first-lesson/06` |
| Subject adaptations | Entry node anchors for English, math, physics lesson one | `../first-lesson/07` |
| Feedback loop | Failure→root-cause→one-artifact-same-week cycle | `../first-lesson/08` |
| Per-concept dispatch (3 concepts) | Teaching action order, poor-fits excluded, analogies, misconceptions, gates | `../concepts/` (3 seed entries) |
| Concept entry format | Binding spec, template, authoring contract | `../concepts/README.md`, `../concepts/TEMPLATE.md` |
| Coverage manifest | Expansion protocol, priority order | `../concepts/COVERAGE.md` |

**Count: 52 retrievable rule layers.**

---

## §2. PARTIALLY RETRIEVED — structure in-tree, content pending

These layers have an authored frame, but their content depends on
Deliveries 1–2 which are pending transcription into the repo tree. The
AI currently improvises the CONTENT while the STRUCTURE is retrieved.

| Layer | What is retrieved | What is still invented | Missing source |
|---|---|---|---|
| Recovery Engine | When to trigger (state machine), what class of behavior follows (demonstrate more, ask less), exit rule (one step below entry, after affect restored + one success) | The actual scripts: what the tutor SAYS, the sequence of moves, the script variants by failure-state type | Delivery 1 Recovery Engine → `foundations/` (planned, not yet transcribed) |
| Wait-time calibration | That wait time must be honored; genuinely stop after INVITE | Exact duration by learner type, question type, session position | Delivery 1 Voice Model → `voice/` (planned, not yet transcribed) |
| Prosody rules | That load-bearing sentences are slowed; voice matches the register | Which words get emphasis, what "slower" means in ms, what vocal register sounds like for each teaching state | Delivery 1 Voice Model → `voice/` (planned, not yet transcribed) |
| Action catalog (for uncovered concepts) | The 7-filter selection PROCEDURE; Filter 2's knowledge-type rows (concept/procedure/causal/fact/misconception) | The 27 specific actions in their 6 families; which action is which by family; persona vetoes by action; cognitive-load costs per action format | Delivery 2 §6 Teaching Action Library → `teaching-actions/` (planned) |
| Universal Teaching Principles | The principle numbers and their functional names (cited as UP-1, UP-5, UP-17, UP-22 throughout all files) | The actual content of all 23 principles | Delivery 2 §10 → `principles/` (planned) |
| Misconception repair (universal) | That the 7-step sequence runs (elicit→commit→collide→replace→contrast→apply→re-probe); per-concept sequences in the 3 seed entries | Regrowth rates by birth type; what "burned collision" means precisely; the re-rating rules at 2+ regrowths | Delivery 2 §4 Misconception Evolution → `misconceptions/` (planned) |
| Curiosity engine | That curiosity hooks exist per concept (in the 3 seed entries); that CURIOUS state requires feeding now | The universal trigger taxonomy; curiosity chains; by-age/subject/personality variation rules | Delivery 2 §3 Curiosity Engine → `curiosity/` (planned) |
| Cognitive load rules | Filters 5 and 6 reference load; Filter 6 has the direction rules (low-load → low-germane end; full headroom → high-germane end) | The intrinsic/extraneous/germane decomposition rules; chunking principles; density computation | Delivery 2 §5 Cognitive Load Engine → `cognitive-load/` (planned) |
| Memory engine (scheduling) | That spacing exists; that the flat schedule is the default; per-concept memory statuses are views over the engine | The engine's actual scheduling rules: interval computation, review-by-type distinctions, interleaving triggers, retrieval practice design | Delivery 2 §8 Memory Engine → `memory/` (planned) |
| Motivation personas | That personas are evidence-backed profile regions; BORED vs avoidant disambiguation; fearful persona safety rules | All 12 persona definitions; their distinct demands; the persona detection rules beyond the generic affect signals | Delivery 2 §9 Motivation Engine → `motivation/` (planned) |
| Mental models (universal) | Per-concept models in the 3 seed entries | The 4-model stage structure; versioning rules; replacement vs. refinement conditions | Delivery 2 §1 Mental Model Library → `mental-models/` (planned) |
| Transfer rules (universal) | Transfer targets in the 3 seed entries; TRANSFERABLE memory status defined | The transfer ladder; the 6 transfer rules; by-distance application | Delivery 2 §7 Transfer Library → `transfer/` (planned) |
| Discovery Framework | That discovery lessons are designed (3 seed entries have discovery lesson sections) | The 6-step framework; when direct instruction wins; how to construct a discovery lesson | Delivery 2 §2 Discovery Framework → `discovery/` (planned) |

**Count: 13 partially-retrieved layers. Every one depends on Deliveries 1–2.**

---

## §3. STILL INVENTED — authorized residue

These three categories remain as deliberate AI improvisation. They are
not gaps to be closed — they are the irreducible dynamic layer that
makes each interaction feel human. The Brain's goal is not to eliminate
them but to keep them here and nowhere else.

| Category | What the AI invents | Why this is the authorized residue |
|---|---|---|
| Surface wording | The exact phrasing of each turn — the words, the metaphor chosen from an authored list, the specific numbers in a worked example | Wording must be responsive to THIS turn's context: the learner's last utterance, the tone in the moment, the session's emotional weather. Authored wording becomes a script; live wording becomes a relationship. The REGISTER, STRUCTURE, and LIMITS are retrieved; only the exact words are invented. |
| Voice rendering | Prosody execution: where to pause, how to slow a load-bearing sentence, the warmth gradient | Even with authored prosody RULES (pending Delivery 1), execution is dynamic. A rule that says "slow the key term" still requires the tutor to decide which exact millisecond and how many dB of warmth. This is irreducibly performance. |
| Responses to novel utterances | When the learner says something that matches no authored rule, the turn is improvised and logged | The feedback loop (`../first-lesson/08`) exists precisely to convert novel utterances into authored rules over time. The AI invents once; the Brain authors it permanently. Each novel utterance is next week's authoring opportunity, not a flaw in the system. |

---

## §4. The moat's current depth — measured

A rough estimate of the proportion of decisions made by each class:

**Session with a seed concept (one of the 3 authored entries)**:
- Teaching state, transitions, learner state, decision matrix, action
  selector procedure, turn skeleton, assessment → RETRIEVED (~70%)
- Recovery scripts, wait-time, prosody, action catalog → PARTIALLY
  RETRIEVED via structure (~15%)
- Surface wording, voice rendering → INVENTED (~15%)

**Session with an uncovered concept (the other ~1,500 concepts)**:
- Teaching state, transitions, learner state, decision matrix, action
  selector procedure, turn skeleton, assessment → RETRIEVED (~50%)
- Action catalog (the content Filters 2–7 select from) → INVENTED (~30%)
- Surface wording, voice rendering, recovery scripts → INVENTED (~20%)

**After Deliveries 1–2 are transcribed (no new concept entries needed)**:
- Session with any concept: RETRIEVED + STRUCTURE-RETRIEVED reaches ~70%
- Session with a seed concept: reaches ~85%

**After the full concept coverage campaign (~1,500 entries)**:
- Session with any concept: RETRIEVED reaches ~85%
- The authorized residue is the remaining ~15% (surface wording, voice,
  novel utterances)

This is the moat's depth over time. The gap between "today's session
with an uncovered concept" (~50% retrieved) and "the endgame" (~85%)
is closed almost entirely by two steps: Deliveries 1–2 transcription
(+20%) and concept entry authoring (+15%).

---

## §5. The selector problem — the most consequential single gap

The action selector (`../decision-engine/04`) is the Brain's central
dispatch: it runs on EVERY teaching turn for EVERY concept. Its 7-filter
procedure is fully authored. But:

- **Filter 1** (authored concept entry wins outright) only fires for the
  3 seed concepts. For ~1,500 others: falls through.
- **Filter 2** (knowledge-type match) requires the 27-action catalog
  (Delivery 2 §6 pending). Without the catalog, the filter has no rows
  to match against.
- **Filter 4** (persona vetoes) requires the 12-persona table (Delivery 2
  §9 pending). Without the table, vetoes don't fire.
- **Filter 6** (load fit) requires the per-action cost estimates (Delivery
  2 §5 pending). Without them, load cannot be assessed.

The selector is a complete PROCEDURE with empty LIBRARIES. For 99.8% of
concepts, it falls through all filters and the AI invents. Transcribing
Deliveries 1–2 fills those libraries without writing a single additional
concept entry — it converts the selector from a procedure with empty
libraries to a procedure with a full catalog, instantly.

This is the single highest-leverage gap in the Brain's current design.
