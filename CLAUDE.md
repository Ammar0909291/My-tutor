# My Tutor — Project Memory

## Reporting preference (ALWAYS follow)
- After EVERY prompt/task — including non-coding tasks (audits, Q&A, memory updates) — ALWAYS
  produce a **detailed report** at the end of the turn.
- ALWAYS include **running instructions for the local computer** (install, env setup,
  `npx prisma db push`, `npm run dev`, `npm run build`, type-check) in that report when the task
  touched code; otherwise still close with a report summarizing what was done.
- ALWAYS deliver the report as a **single copy-able block of plain text** (a fenced code block),
  so it can be copied in one action. No exceptions. This means the ENTIRE end-of-turn report —
  not just code/commands inside it — goes inside one ``` fence. Markdown headers/tables/checklists
  outside a fence do NOT satisfy this; wrap the whole thing.

## Workflow preference (ALWAYS follow — updated 2026-07-07, supersedes the prior version below)
- On EVERY prompt: first read and understand it the way the lead developer on this project would
  — what it actually needs, what it touches, what's ambiguous or missing.
- Then decide yourself what to add or remove from the request as understood (scope corrections,
  missing pieces, unnecessary parts) — do NOT stop and ask the user via AskUserQuestion for this.
  State plainly, in one short block at the start of the reply, exactly what was redefined/applied.
- Then immediately start working (building) on the prompt as redefined — no waiting for a
  confirmation round on scope.
- This is a standing, explicit pre-authorization to proceed without a scope-confirmation pause —
  it does NOT extend to: (a) the Educational Brain G1/G2 governance gates elsewhere in this file
  (Canonical KG v1 freeze + explicit per-item approval before implementation — those still require
  real, separate user sign-off, no exceptions via this preference), or (b) genuinely risky/hard-to-
  reverse actions (force push, resets, destructive git ops, anything affecting shared/production
  state) — those still get flagged and confirmed first, per standing safety practice.
- Prior version (2026-07-07, superseded): propose additions/removals and WAIT for the user's
  answer before implementing. Replaced because it added a confirmation round-trip the user wants
  removed for ordinary scope decisions.

## Permanent Research Workflow (RETIRED 2026-07-07 — see override note, kept below for history only)
- **OVERRIDE (2026-07-07, binding, supersedes everything below):** do NOT critique, analyze,
  improve, or rewrite prompts going forward, for research/architecture/science tasks or any other
  kind. No PROMPT IMPROVEMENTS section, no FINAL PROMPT rewrite, no "improved version" substituted
  for what was actually asked. Execute every prompt exactly as given, as-is. This fully retires
  the analyze/improve/rewrite mechanism described below (Steps 1-4 in spirit); it does NOT retire
  ordinary good-faith execution quality (depth, no filler, correctness) — it only stops the
  practice of changing what was asked before doing it.
- Scope: applies to research, architecture, and science-track prompts (the Master Teaching
  Science / Decision Science / architecture-review series) — distinct from ordinary build/dev
  tasks, which follow the Workflow preference above. This does NOT touch or loosen the
  Educational Brain G1/G2 production-code governance gate elsewhere in this file — a "final
  prompt" rewrite is a text-level improvement to a research question, never authorization to
  implement production code without separate, explicit per-item sign-off.
- Role for these tasks: not a prompt executor — Chief Architect / Chief Educational Scientist /
  Chief Learning Researcher / Chief Systems Thinker. Improve both the prompt and the project's
  architecture; never blindly execute a prompt that can be improved. Discover the best truth;
  don't defend prior design decisions just because they're prior.
- Before executing: critically analyze the prompt — missing areas, weak/incorrect/hidden
  assumptions, better ordering/terminology/scope, missing research questions, redundancy,
  anything deserving deeper investigation. Challenge it as a peer Chief Architect would; don't
  agree just because it was suggested.
- Produce a PROMPT IMPROVEMENTS section (Added / Removed / Modified / Unchanged, each with
  reasoning) before executing.
- Then show the FINAL PROMPT — the rewritten version incorporating every improvement. Don't pause
  for approval on this text-level rewrite; assume approval unless an improvement would
  fundamentally change the objective (flag that explicitly rather than silently substituting a
  different objective).
- Execute ONLY the final (improved) prompt, never the original once it's been improved. No
  permission-seeking language at all for this — not "may I proceed," not a soft narrated pause,
  not even a preamble framed as asking. State the final prompt and go straight to executing it.
- Once a FINAL PROMPT has been produced and executed for a given research topic (e.g. the Master
  Teacher Decision Science taxonomy), that becomes the canonical, latest version of the work. If
  the same or a near-identical prompt is sent again later, do not restart Step 1-2 from scratch —
  recognize it's already been through this improvement cycle, and either re-present the already-
  improved version or push it further with genuinely new discoveries, never regress to re-doing
  the same analysis or re-deriving an already-superseded flat/unmerged structure.
- Continuous discovery: keep questioning conclusions while researching; apply a better
  architecture/taxonomy/framework the moment it emerges, without waiting for a new prompt.
- Whenever research changes a conclusion from an earlier phase, produce an ARCHITECTURAL
  REVISIONS section: previous assumption, new discovery, why the old idea was incomplete, why the
  new one is better, impact on previous phases, whether previous documents need updating. Truth
  over consistency with prior phases.
- Reason, where appropriate, as a multidisciplinary panel (education, cognitive science,
  neuroscience, psychology, learning science, instructional design, curriculum design, human
  tutoring, linguistics, math/science education, AI, knowledge engineering, systems architecture,
  HCI) — let the disciplines disagree, then synthesize the strongest conclusion.
- Output quality: no filler; depth over length; one profound discovery beats fifty shallow
  observations; always surface Biggest Discovery, Biggest Weakness, Biggest Risk, Biggest
  Opportunity, and Biggest Architectural Improvement.
- Ultimate objective for this track: not completing tasks — discovering and designing the world's
  greatest AI teacher. Every research phase should permanently improve My Tutor's architecture;
  write every document as permanent research-library material, worth reading years later.

## Architecture facts
- Next.js 14 App Router, NextAuth v5 (JWT), Prisma + PostgreSQL (`db push`, no migration files).
- AI: Groq primary (`openai/gpt-oss-20b`), YandexGPT fallback (Russia only, `country === 'ru'`;
  itself falls back to Groq on missing credentials or any error). Redis optional (app runs without it).
- KnowledgeNode: `{ id, domain, title, description, difficulty, prerequisites[] }`.
  Misconception data is runtime (`MistakeRecord`), NOT in the static KG type.
- Admin gated by `ADMIN_EMAILS` env var (not a DB flag).
- Canonical Knowledge Graph subjects (generic adapter platform, `src/lib/curriculum/knowledgeGraph.ts`
  + `subjectKgAdapter.ts`, one `docs/{subject}/kg/graph.json` + 2 registry lines per subject, no new
  adapter/validator/Teaching Engine code per subject):
  - mathematics → `docs/mathematics/kg/graph.json` (908 concepts, prefix `math.`)
  - physics → `docs/physics/kg/graph.json` (194 concepts, prefix `phys.`)
  - chemistry → `docs/chemistry/kg/graph.json` (187 concepts, prefix `chem.`)
  - computer_science → `docs/computer-science/kg/graph.json` (119 concepts, prefix `cs.`)
  - biology → `docs/biology/kg/graph.json` (89 concepts, prefix `bio.`) — shipped 2026-06-29,
    see `docs/biology/VALIDATION_REPORT.md` for full validator/smoke-test/regression evidence
  - english → `docs/english/kg/graph.json` (216 concepts, 12 domains, prefix `eng.`) — authored by
    the Curriculum Production Pipeline 2026-07-03/04, validator PASS 216/216 reachable, but **NOT
    yet registered** in the runtime registry (`knowledgeGraph.ts` `SUBJECT_ADAPTERS`/
    `ID_PREFIX_TO_SUBJECT` have 5 subjects; `case 'english'` still routes to the legacy static
    `ENGLISH_KNOWLEDGE_GRAPH`). Registration is the standard 2-line change but is production code
    → gated on explicit user approval (Wave 0 approval item, recorded 2026-07-04).
  - Chemistry count correction (2026-07-04): 186 concepts per validator + dashboard (was
    recorded as 187 here).
  - Canonical 10-field schema only: `id, name, requires, unlocks, cross_links, difficulty, bloom,
    mastery_threshold, estimated_hours, description` — never add `domain`/`concept_type` to the
    JSON; they're derived at runtime by `inferDomain()`/`inferConceptType()`.
  - **Curriculum Production Pipeline status (read from repo 2026-07-04, commit d622336):**
    Mathematics KG **v1.0.1 status=frozen** (first subject to reach the freeze state ADR 06's
    gate checks); Physics teaching assets 100% (194/194), English 100% (216/216), Mathematics
    41.7% (379/908, 8/24 domains), Chemistry/Biology/CS not started. Campaign overall
    `1.0.0-draft`, `subjects_complete: 0` — the full Canonical Subject Freeze has NOT been
    declared, so implementation Wave 0 remains closed (and user approval is still required
    regardless). Authoritative dashboards: `docs/CURRICULUM_PROGRESS.md` (auto-generated),
    `docs/CANONICAL_CURRICULUM_MANIFEST.json` (includes per-KG sha256 + status). Pipeline asset
    format (`docs/{subject}/teaching-assets/assets.json`: concept-keyed, carries `provenance`,
    `status`, worked-example/assessment/visual blueprints) is compatible with ADR 14's
    AssetIdentity catalogue — it is a curated *source* for ADR 14 Phase 2 population, not a
    competing asset model.

## Educational Brain — Knowledge Base (the moat, 2026-07-10)
- `educational-brain/` (repo root) is the permanent authored teaching-science knowledge tree —
  distinct from `docs/educational-brain/` (ch01-ch11 implementation blueprints) and
  `docs/architecture/` (engine ADRs/Bible). Charter: reduce AI reasoning over time by authoring
  educational knowledge once for permanent retrieval. Deliveries 1-2 (Recovery Engine, Adaptive
  Rules, Voice Model, Concept Schema, seed concepts; the ten Delivery-2 layers incl. 23 Universal
  Teaching Principles) were chat-authored and are pending transcription into this tree — the
  tree's README records this. Delivery 3 (2026-07-10, first in-repo): the **Assessment Design
  Library**, `educational-brain/assessment/` — 10 documents + index (foundations/quality metrics/
  anti-patterns; binary-search diagnosis + flowcharts; distractor science + golden probes;
  confidence & calibration; mastery gates + evidence hierarchy; oral/visual/practical modality;
  by level/age/subject/persona; per-teaching-action illusion-puncturing assessment; failed-
  assessment recovery protocol; rubrics). Knowledge only — no runtime/schema/curriculum changes.
- Delivery 5 (2026-07-10, in-repo): **Curriculum Integration Layer**, `educational-brain/concepts/`
  — binds Brain knowledge to canonical KG concept IDs (curriculum = WHAT, Brain = HOW; entries
  keyed 1:1 to `docs/{subject}/kg/graph.json` IDs, no second hierarchy, KG authoritative on any
  divergence). Contains the binding spec (README), the concept-entry template/authoring contract
  (TEMPLATE.md, reuse-by-reference law: universal engines referenced, never copied), the coverage
  manifest + expansion protocol (COVERAGE.md: placement entry points → cut-nodes → misconception
  hubs → prerequisite order; partial entries don't count as coverage), and three full-depth seed
  entries that ARE the quality bar: `math.arith.fractions`, `phys.mech.newtons-first-law`,
  `eng.phonics.letter-sound-correspondence` — each anchored to verified KG node data with mental
  models, misconception libraries (verbatim probes + characteristic phrases), explanation/analogy/
  anti-analogy/demonstration libraries, discovery lesson (or argued direct-instruction call),
  teaching-action dispatch, voice teaching, concrete assessment gate sets, concept-specific
  recovery notes, memory typing, transfer maps, and curriculum feedback. Knowledge only — no
  runtime/schema/curriculum changes.
- Delivery 6 (2026-07-10, in-repo): **First Lesson Standard**, `educational-brain/first-lesson/`
  — universal standards for teaching a complete beginner (motivated by the platform's own observed
  failure to reliably teach English lesson one). 8 docs + index: complete-beginner definition/
  detection (informal knowledge is the only attachable foundation; false/returning beginners;
  adult shame vs child fragility), never-rules + hard limits (1 concept, ≤3 new words ×3 uses,
  2-sentence bursts, ≤6 questions, failure budget 1, WM treated as 2 slots), tutor behaviour
  (wait time, redirect-never-mark-wrong, scripted 30-second close), corrected flow (anchor →
  demonstrate → explain-after → echo/supported/prompted → ONE solo → invisible confirm → close;
  completion criteria C1-C4 with C2 = next-session opening retrieval, so lesson one formally
  completes at lesson two), failure-state lesson-one deltas (+ "I'm scared"/"I'm stupid"; one
  failure state per session max), 16-entry AI anti-library (quiz-first, definition-first,
  echo-advancement, register drift, invisible restart...), subject adaptations anchored to
  verified KG entry nodes (eng.phonics.print-concepts + phonemic-awareness — English lesson one
  is ORAL, print-optional; math.found.mathematical-thinking — counting-with-meaning floor;
  phys.meas.units — need-creation before names, "SI" banned from lesson one), and the
  failure→root-cause→one-artifact-same-week feedback loop (lesson-one failures lead the entire
  authoring queue). Reuses Deliveries 1-3 + 5 by reference. Knowledge only — no runtime/schema/
  curriculum changes.
- Delivery 7 (2026-07-10, in-repo): **Teaching Decision Engine**, `educational-brain/decision-engine/`
  — the executive layer deciding WHAT TO DO NEXT every turn; the Brain retrieves DECISIONS, not
  documents. 8 docs + README (repo-audit map: what existing decision logic was found and how each
  piece is reused/extended — D1 adaptive rules → transitions/rungs, D2 §6 dispatch → selector,
  assessment/05 §4 + /09 → assessment interiors, first-lesson/04 → locked lesson-one config;
  runtime decide()/ADR 08/09/11/Bible explicitly NOT redesigned — this is the pedagogy the code
  pipeline will retrieve). Contents: teaching state machine (session wraps concept machine;
  OBSERVATION as stance; RECOVERY preempts everything, exits one step below entry; full transition
  table), student state engine (affect > cognitive > drive priority bands; voice/behaviour/learning
  detection per state; failure-spiral/boredom-slide/repair-path trajectories; detection-honesty
  rules), decision matrix (affect-band preemption rule collapses ~180 cells; concrete decisions per
  teaching-state × cognitive/drive state), seven-filter action selector (authored concept-entry
  dispatch wins outright; knowledge-type → state-legality → learner constraints → history/affinity →
  load → tie-break; 3 worked traces), escalation engine (per-failure ladders, one-dimension-per-rung
  law, six standing moves w/ triggers), conversation engine (quiz/interview/lecture/robot registers
  w/ antidotes; max-2-questions-in-a-row; react+move+invite turn skeleton; contingency+continuity),
  lesson planning engine (invariant session shape; fluency-gated triad; compaction protocol;
  summit-ending soft trigger; stuck-concept protocol), teaching loop (8-strategy closed set;
  learner-model update contract; retrieval ledger — retrieved vs still-invented residue, aligned
  with ADR 14's LLM-as-voice-renderer endgame; human-tutor audit with 5 recorded audit-forced
  changes). Knowledge only — no runtime/schema/curriculum changes.
- Delivery 8 (2026-07-10, in-repo): **Student State Model**, `educational-brain/student-state/`
  — the permanent learner representation the Decision Engine reasons over (weather vs climate:
  decision-engine/02's momentary states read priors from and write evidence into this standing
  model via 08 §3's update contract; ADR 10's six runtime stores referenced as code-side
  containers, no schemas authored). 10 docs + README (audit map). Eight dimensions under seven
  design laws (evidence-backed+dated, decaying, per-domain, descriptions-never-verdicts,
  hypothesis-not-fact, asymmetric caution, never-judges/never-leaks): 8-rung per-concept knowledge
  ladder (UNKNOWN→RECOGNIZED→IMITATES→ASSISTED→INDEPENDENT→AUTOMATIC→TRANSFER→EXPERT, each rung
  mapped to evidence + machine entry point — the structural ban on re-teaching from zero; rungs
  move down via memory modulation, high-water mark kept), misconception ledger (separate from
  knowledge; strength DOMINANT/UNDER-LOAD/RESIDUAL; verbatim phrase evidence; repair history w/
  burned-collision tracking; lifecycle has no ERASED status, DORMANT-VERIFIED keeps re-checks
  forever; birth-type regression priors, 2 regrowths → re-rate HIGH + repair-path redesign flag),
  confidence model (5 chronic patterns; build-slow/collapse-steep asymmetry → personalized affect
  budgets; calibration L0-L3 as taught skill; target = calibration not height), behaviour profile
  (rusher/overthinker w/ condition tags; affinities = min-evidence-across-concepts statistics,
  never learning-style identities; measured attention span; persistence-scaled struggle budgets),
  emotional model (triggers engineered out; recovery speed personalizes Recovery Engine pacing;
  flow protection; imported-history externalization targets; per-learner what-restores list;
  robustness licensed as explicitly as fragility flagged), memory statuses (7 statuses derived
  from Memory Engine data, never duplicating scheduling; personal forgetting rate as the key
  personalization), teaching history (append-raw/read-summaries; breakthrough verbatims + severe
  negative events never summarized; representation-family inheritance to sibling concepts),
  trajectory (velocity per effort-time; acceleration as earliest warning; plateau diagnosis tree —
  consolidation≠emergency, don't thrash; regression routing; momentum spent deliberately;
  readiness = derived three-way answer), digital twin (8 mandatory questions; decision provenance
  — unexplainable decision = invented decision; six-learner audit passes with one architecture;
  honest limits: surfaces-but-never-diagnoses disabilities). Knowledge only — no runtime/schema/
  curriculum changes.
- Delivery 9 (2026-07-10, in-repo): **Human Tutor Validation & Gap Audit**,
  `educational-brain/validation/` — comprehensive audit of Deliveries 1–8 as one integrated
  system. Six documents: (1) three complete session simulations (fearful beginner
  eng.phonics.letter-sound-correspondence / misconceiving adult math.arith.fractions / bored
  advanced phys.mech.newtons-first-law) with every decision traced turn-by-turn to its source
  file and section; (2) four failure replays (English lesson one collapse, invisible restart,
  assessment-first teaching, confidence collapse) — 3 fully preventable by in-tree knowledge,
  1 preventable only after Delivery 1 transcription; (3) full AI-dependency inventory:
  52 retrievable rule layers confirmed, 13 partially-retrieved layers each depending on
  Deliveries 1–2 pending transcription, 3 authorized residue categories (surface wording /
  voice rendering / novel utterances); the selector problem documented — the action selector
  (decision-engine/04) is a complete 7-filter procedure with empty libraries for 99.8% of
  concepts; (4) duplication audit: 5 proper-layering findings confirmed, 2 real redundancy
  issues (latency×correctness grid and Universal Principle inline restatements, both resolvable
  at Delivery 1/2 transcription time), 4 minor cross-reference gaps; (5) 10 missing human
  teaching science domains not yet authored — relationship capital (HIGH, every session), worked
  example design rules (HIGH), vocabulary pre-teaching (MEDIUM), error analysis design (MEDIUM),
  metacognitive strategy instruction (MEDIUM), interleaved practice design (MEDIUM), spaced
  retrieval practice design (MEDIUM), wait-time calibration (HIGH FREQUENCY), pre-assessment
  design (LOW), explanation construction rules (LOW); (6) highest-ROI recommendation:
  transcribing Deliveries 1–2 into `foundations/` and the nine planned libraries — the Recovery
  Engine alone has 6 file dependencies; the Universal Teaching Principles are cited in every
  file but their content is nowhere; the action selector's filters 2–6 all reference pending
  libraries. Success criteria defined: re-run the three session simulations after transcription
  and confirm the "Gaps surfaced" list shrinks to surface wording only. Knowledge only — no
  runtime/schema/curriculum changes.
- Delivery 10 (2026-07-10, in-repo): **Student Placement & Category Progression Engine**,
  `educational-brain/placement/` — the permanent rules for WHERE teaching begins; sits between
  curriculum (WHAT) and the teaching engine (HOW). Eight documents: placement foundations (the
  placement law; two placement errors and their asymmetry; the human-tutor model; scope of the
  engine); the self-report trust model (systematic under/over-reporting mechanics by age and shame;
  trust calibration table; three-bracket verification protocol; adjustment without insult;
  miscalibration-direction as a persistent learner model field); the placement protocol (category
  spine search via binary search on cut-nodes from assessment/02; per-branch frontier records;
  modes A/B/C; patchy-history flag; what placement does NOT do — no fake completions, no invented
  prerequisites); category mastery definition (gate concepts AUTOMATIC + STABLE + one transfer
  event = ANCHORED; ANCHORED/PROBABLE/UNCERTAIN/UNKNOWN confidence levels; the never-reteach law
  — mastered categories never entered as teaching targets; decay ≠ demotion; FORGOTTEN ≠ UNKNOWN
  — storage survives, cued-recovery is the treatment; asymmetry of earn vs. lose); the
  progression engine (promotion criteria; the progression guarantee; demotion triggers — all three
  must hold; regression repair targeting specific gate concepts only; just-in-time prerequisite
  repair for patchy histories; multi-subject independence); resumption protocol (decay timeline
  by gap length; warm-up protocol vs. reteaching; cascade-unlock expectation; re-placement from
  high-water mark; the returning learner's emotional state); six full student simulations traced
  (A: false-beginner, protective conservatism detected; B: false-advanced, Dunning-Kruger,
  two-failure-budget downward search; C: returns after 14 months, cascade recovery, high-water
  mark protocol; D: expert arithmetic / weak fractions, active misconception M1, never-reteach
  for ANCHORED Categories 1-3; E: strong algebra/weak geometry, per-branch asymmetric placement;
  F: adult 20-year gap, shame bias, informal-competence framing); vision + human-tutor validation
  (all seven vision questions answered; remaining gaps: cut-node lists for non-math subjects,
  just-in-time scheduling in lesson-planning engine, Expert level definition, multi-subject
  session-choice rule). Knowledge only — no runtime/schema/curriculum changes.
- **Architecture Audit** (2026-07-10, in-repo): `educational-brain/validation/
  07-architecture-audit.md` — cross-system audit reading both Deliveries 1-10 and the
  actual runtime code (route.ts, teaching-engine/index.ts, placement.ts, teachingStrategy.ts,
  curriculum/route.ts, onboarding/route.ts) to compare authored Brain vs. actual runtime
  behavior. Key finding: 0 of 52 authored retrievable layers are retrieved at runtime today —
  the Brain and the runtime are parallel universes; no runtime path reads any file in
  educational-brain/. decide() is school-mode-only in practice; all 35 strategy instructions
  are hardcoded TypeScript strings; the AssetIdentity pipeline (ADR 14) is wired but carries
  no authored content (assembleLesson() always returns null). 8 ranked AI-reasoning gaps,
  human tutor micro-decision audit for 3 concepts, orchestration analysis (route.ts IS the
  orchestrator — no new layer needed), and a 7-step priority order for closing the gaps.
- **Migration Blueprint V1** (2026-07-10, in-repo): `docs/architecture/MIGRATION_BLUEPRINT_V1.md`
  — the architectural connection plan from current runtime to full Educational Brain
  execution. Full responsibility map (14 domains, intended vs. actual owner, gap per domain);
  duplication inventory with single-owner resolution per pair; 7-phase runtime migration
  roadmap (Phase 0: activate AssetIdentity with existing 3 concept entries, zero code; Phase 1:
  first-lesson deterministic constraint block; Phase 2: sessionPhase state machine in
  contextSnapshot; Phase 3: placement verification + structured `<!--SIGNAL-->` tag from the
  LLM — the key mechanism that turns OBSERVE→CLASSIFY into code instead of AI re-inference;
  Phase 4: POLICY asset family extending AssetIdentity to carry decision-matrix instructions;
  Phase 5: unconditional decide() for Library mode; Phase 6: category progression via
  categoryConfidence map; Phase 7: transcribe Deliveries 1-2); Library Mode full architecture
  (per-step execution, LLM CAN/CANNOT boundary, School Mode dependency audit); category
  progression reusing the KG's existing difficulty-tag hierarchy (no new hierarchy invented);
  the continuous OBSERVE→THINK→ACT→WAIT loop mechanism. Every phase justified against "why
  can this NOT be solved using something already in Git" — architecture only, no code written.
  All 7 phases involving runtime/schema/route changes remain gated on the standing G1/G2
  governance rule below (per-item user approval before implementation); Phase 7 (D1/D2
  transcription) is knowledge authoring, not code, and is not G2-gated.
- **Delivery 11** (2026-07-10, in-repo): the **Foundations Library** —
  `educational-brain/foundations/`: the transcription of Delivery 1's four universal engines
  (Recovery Engine, Adaptive Teaching Rules / "the D1 grid", Voice-First Learning Model, and
  all 23 Universal Teaching Principles), cited by name and by number throughout the tree since
  Delivery 3 but never before written down — identified by the Architecture Audit and
  Migration Blueprint as the single highest-ROI remaining Brain-authoring gap (resolves the
  largest set of dangling citations in the tree in one pass). Before authoring anything,
  confirmed via reuse-first check that Delivery 1's originally-scoped "Canonical Per-Concept
  Schema" item is already fully satisfied by `concepts/TEMPLATE.md` (Delivery 5) — not
  re-authored, avoiding duplication. Contents: the Recovery Engine (base script library for
  8 stuck-learner utterances, non-verbal distress protocol, the personalization hook into the
  Emotional Model's recovery-speed/what-restores fields, and the relationship to the
  escalation engine's 3-rung recovery-failure ladder); the Adaptive Teaching Rules (the
  speed × correctness × confidence grid — fluent-mastery/FRAGILE/MISCONCEIVING/CONFUSED
  quadrants — the 3-fluent-successes advance trigger, and an explicit finding that
  teaching-engine/index.ts's `decide()` only partially and implicitly encodes this grid today,
  lacking any speed/confidence signal — exactly the gap Migration Blueprint Phase 3's
  structured signal tag is designed to close); the Voice-First Learning Model (4 detection
  instruments — latency-vs-baseline, prosody, hesitation location, self-corrections — the
  wait-time law, load-bearing-sentence rule, matched energy/mockery effect, register-never-
  drops-on-error); and all 23 Universal Teaching Principles (11 reconstructed to match every
  pre-existing numbered citation exactly — 1,2,3,5,8,9,14,17,19,22,23 — 12 authored for the
  first time — 4,6,7,10,11,12,13,15,16,18,20,21 — each formalizing a rule the tree already
  followed without a name, none invented without prior grounding). `educational-brain/README.md`
  updated: Delivery 11 registered, `foundations/` moved from "planned" to "authored," the
  planned `principles/` directory folded into `foundations/04` instead of created separately
  (avoiding a single-document directory), Delivery 1/2 provenance notes corrected to reflect
  what's now transcribed vs. still pending. Knowledge only — no runtime/schema/curriculum
  changes. Continuous autonomous architecture mode in effect per 2026-07-10 standing
  instruction: further iterations continue this loop (audit whole system → highest-ROI task →
  reuse-before-create check → deliver → repeat) until Educational Brain architecture is
  complete, an owner-only decision arises, or a genuine vision-level contradiction is found.
- **Delivery 12** (2026-07-10, in-repo, same continuous-mode iteration as Delivery 11):
  the **Teaching Action Library** — `educational-brain/teaching-actions/`: the
  transcription of Delivery 2 §6, the 27-action catalog (6 families: SHOW, TELL, DO,
  TEST-THINKING, ORGANIZE, SOCIAL) that the action selector (`decision-engine/04`'s
  seven-filter funnel) dispatches into. Named independently by validation/03,
  validation/06, and the Architecture Audit (Gap 1 of 8, ranked first) as the single
  highest-remaining-ROI authoring gap: Filters 2, 4, and 6 of the selector cannot run at
  all without this catalog, for any concept lacking a per-concept entry (currently 3 of
  ~1,800 concepts across all subjects). Reuse-first check confirmed every action was
  already referenced by name somewhere in the tree before this delivery (Demonstration,
  Worked Example, Analogy, Drawing, Matching, Error Analysis, Game, Concept Map, Thought
  Experiment, Role-Play, Prediction) — none redefined, all completed to the full 27 (5
  SHOW / 4 TELL / 5 DO / 5 TEST-THINKING / 4 ORGANIZE / 4 SOCIAL) with knowledge-type
  fit, setup-cost tier, and persona notes per action. Notable content: the chocolate-
  covered-broccoli guard on Game (mastery must be re-verified outside the game skin
  before certifying — direct citation from assessment/08); the stability guard on Error
  Analysis (only plant a flaw once the correct schema is solid, or the flaw may be
  learned); Matching's bidirectional-translation diagnostic (one-way success with
  reverse failure names exactly what to teach next); Retrieval-Schedule Prompt as the
  action populating session OPENING. Deliberately did NOT re-author the 12-persona
  table (Delivery 2 §9, still `motivation/`, planned) or the Cognitive Load Engine's
  intrinsic/extraneous/germane theory (Delivery 2 §5, still `cognitive-load/`, planned)
  — avoided duplicating ownership of libraries not yet due. `educational-brain/README.md`
  updated: Delivery 12 registered, `teaching-actions/` moved from planned to authored.
  Knowledge only — no runtime/schema/curriculum changes.
- **Chief Architect Review** (2026-07-10, in-repo, no files changed — verbal audit only):
  a brutally honest 16-category scored review of Deliveries 1-12 (0-10 per category,
  explicit "why not higher," specific delivery/file blamed per gap). Key scores: EB
  completeness 4/10, teaching quality 2/10, reduction of AI reasoning 1/10 (0 of 52
  layers retrieved), repo organization 7/10 (strongest area), overall architecture
  4/10. Percentage estimates: EB architecture ~35% complete, runtime architecture
  ~30%, runtime implementation ~12%, overall teaching system ~8-10%. Concept coverage
  (3/1800, 0.17%) named as the single most damning number. Recommended parallel-track
  next steps: Migration Blueprint Phases 0-3 implementation (G2-gated) + concept
  coverage expansion + the 3 critical remaining libraries (misconceptions, mental
  models, cognitive load), ranked above continuing to author lower-impact universal
  engines (motivation, discovery, curiosity, transfer) in isolation.
- **Delivery 13** (2026-07-10, in-repo, continuous-mode iteration): the
  **Misconception Evolution Library** — `educational-brain/misconceptions/`: the
  transcription of Delivery 2 §4. Selected via the continuous-mode protocol's single
  question ("what is the single highest-impact weakness preventing a 9/10 Educational
  Brain?") over the strongest competing candidate, raw concept-coverage expansion —
  reasoning: one new concept entry helps only that concept; generic misconception
  theory is a force multiplier for every misconception library ever written, and
  expanding coverage without it first locks in inconsistent per-entry birth-type
  logic. Reuse-first check (grepped every "birth type"/"regrowth"/"Delivery 2 §4"
  citation before writing) found the taxonomy ~80% reconstructable from scattered
  citations — birth types 1, 2, 4, 5, 6 already named with specific meaning across
  `concepts/`, `decision-engine/05`, `assessment/08`; type 3 named only in
  `student-state/03`'s regression-prior table with no explanation — the identical
  pattern that made Universal Principles low-risk to formalize in Delivery 11.
  Contents: all 6 birth types (overgeneralization, perceptual intuition, language
  contamination, notation-induced, instruction-induced, analogy overextension) each
  with generic mechanism, diagnostic signature, and new cross-subject examples beyond
  the 2 already in the tree (English irregular verbs, ice density, "theory"
  contamination, apostrophe notation, atomic indivisibility, the water-circuit
  analogy) proving the taxonomy generalizes; a 7-question diagnostic decision
  procedure for classifying a new misconception's birth type when authoring any of
  the ~1,800 uncovered concepts; the full generic 7-step repair sequence
  (elicit→commit→collide→replace→contrast→apply→re-probe) with per-birth-type
  collision-design rules; the precise two-condition operational definition of
  "burned collision"; and the metastasis-chain mechanism with a new just-in-time
  chain-check trigger extending `placement/05`'s absent-prerequisite logic to
  corrupted (ACTIVE-misconception) prerequisites. Deliberately did NOT restate
  `student-state/03`'s ledger structure, status lifecycle, or regression-prior
  table — referenced, not duplicated. `educational-brain/README.md` updated:
  Delivery 13 registered, `misconceptions/` moved from planned to authored.
  Knowledge only — no runtime/schema/curriculum changes. Continuous mode continues:
  next iteration re-abstracts the whole Brain again and re-asks the single highest-
  impact-weakness question before selecting further work.
- **Delivery 14** (2026-07-10, in-repo, continuous-mode iteration):
  `educational-brain/concepts/english/eng.phonics.phonemic-awareness.md` —
  English's true zero-prerequisite entry node (`requires: []` in the live KG).
  Re-abstraction found `concepts/COVERAGE.md`'s own expansion protocol ranks
  "placement entry points first," above cut-nodes and misconception hubs —
  yet all 3 Delivery 5 seed entries (fractions, Newton's First Law,
  letter-sound-correspondence) are cut-nodes/misconception hubs, not entry
  points. This concept is the exact node `first-lesson/07 §1` names as the
  origin of the platform's own documented English-lesson-one failure — the
  single most evidence-grounded coverage gap in the tree. Chosen over
  continuing the universal-engine track (Mental Model Library, D2 §1):
  citation check found Mental Models far thinner in scattered citations than
  Misconceptions was pre-Delivery-13 (much of its core insight already
  absorbed into Universal Principle 6), while concept coverage remained the
  most quantifiable gap and 3 major force-multiplier engines (Foundations,
  Teaching Actions, Misconceptions) had just become available to validate
  against genuinely new content. Applied the new misconception birth-
  taxonomy diagnostic procedure to a concept for the first time since it was
  authored, surfacing 3 new misconceptions (language contamination on the
  word "sound" itself — Type 3; syllable/phoneme-counting overgeneralization
  — Type 1; rhyme-only "same sound" from rhyme-first instruction — Type 5)
  as a genuine stress-test of Deliveries 11-13 against new content. Full
  entry at the seed quality bar (all TEMPLATE.md required sections).
  `concepts/COVERAGE.md` updated (english now 2/216, delivery history
  recorded); `eng.phonics.print-concepts` (the KG's other zero-prerequisite
  entry node) recorded as the immediate next coverage priority, not
  authored this delivery. Knowledge only — no runtime/schema/curriculum
  changes. Continuous mode continues.
- **Correction 1 — Voice Channel Reality** (2026-07-10, in-repo, critical-
  review iteration): `educational-brain/foundations/03-voice-first-
  learning-model.md §7` added, extending Delivery 11 rather than a new
  delivery. Critical-review mode ("assume every prior decision may be
  wrong, attempt to break it") checked whether the Voice-First Learning
  Model's four instruments (latency, prosody, hesitation location, self-
  corrections) actually reach the teaching decision layer, since this
  concept is required in every future concept entry's "Voice teaching"
  section. Verified against the live runtime
  (`src/components/learn/LessonScreen.tsx`, `src/app/api/stt/route.ts`):
  the product genuinely has voice input/output (MediaRecorder → Whisper
  STT via Groq / browser SpeechRecognition, plus TTS) — but the STT
  endpoint requests plain `json` (bare text) from Whisper and returns
  only `{ text }`, discarding every timing/prosodic signal before
  `route.ts` ever sees the turn. All four instruments are therefore
  unavailable to the decision layer today in EITHER channel — a sharper
  finding than this tree's usual "not yet retrieved" gap, since this is
  signal captured client-side and then actively discarded by one
  implementation choice. Added an honest per-instrument availability
  table, a cost-ranked recovery list (switching to Whisper's
  `verbose_json` format recovers segment timestamps at zero
  infrastructure cost) for future Migration Blueprint runtime work, and
  named the Blueprint's `<!--SIGNAL-->` tag explicitly as an LLM-self-
  report substitute for this signal, not equivalent to real
  instrumentation. `concepts/TEMPLATE.md` updated so future concept
  authors point to this section once rather than re-litigating the gap
  per entry; Delivery 14's phonemic-awareness entry named as the
  corrected example, not rewritten (same no-duplication rule).
  Knowledge-correction only — implements nothing, informs future runtime
  work. Continuous mode continues: next iteration re-abstracts and
  re-asks the single highest-impact-weakness question, per the
  standing critical-review protocol.
- **Correction 2 — Decision Matrix Silent Cells** (2026-07-10, in-repo,
  critical-review iteration): `educational-brain/decision-engine/03-
  decision-matrix.md §6, §8` extended, not a new delivery. Critical
  review found the matrix silently left 5 cells unhandled: CONFUSED
  during ASSESSMENT, and CONFUSED/GUESSING/MISCONCEIVING/FRAGILE during
  TRANSITION/CLOSING — every other cognitive/drive state is named in
  both sections; these were simply absent, a genuine missing-decision-
  path gap rather than an intentional omission. Added rules for all 5:
  CONFUSED-during-ASSESSMENT aborts the item without scoring it (mirrors
  GUESSING's existing non-decisive-item rule) and routes to the
  escalation engine before resuming; the 4 CLOSING cells each honor
  CLOSING's existing "never sacrificed to content" protection by turning
  the unresolved state into the close's open loop or next-session queue
  rather than attempting resolution or misrepresenting an unresolved
  state as settled. Knowledge-correction only — no runtime/schema/
  curriculum changes. Continuous critical-review mode continues.
- **Correction 3 — Reading-Load Signature** (2026-07-10, in-repo, red-team
  iteration): `educational-brain/student-state/05-behaviour-profile.md §7`
  added, extending Delivery 8. Red-team review ("what would make this fail
  for 100,000 real students?") found the product's primary delivery medium
  is dense text while dyslexia-like reading difficulty had only 3 passing
  mentions in the whole tree — the digital twin's "surfaces but never
  diagnoses" limit had no authored consequence after surfacing. Added a
  detection signature (cross-modal check from assessment/06 §4: performance
  splits by channel not content; trigger = errors correlating with text
  LENGTH not content difficulty, distinguished from the "skips
  instructions" habit) and 5 standing adaptations reusing existing
  machinery only (voice channel default via existing TTS/STT; burst limits
  tighten one register step while register never drops; oral assessment
  default with the accommodate-vs-measure boundary honored for English
  decoding targets; load-bearing sentence never text-only; English-subject
  collision resolved by connecting first-lesson/07's oral-first entry
  nodes to the accommodation boundary). Signature-never-diagnosis;
  no new library; knowledge-correction only. Red-team mode continues.
- **Correction 4 — Session Boundaries in an Asynchronous Medium** (2026-07-10,
  in-repo, red-team iteration): `educational-brain/decision-engine/07-lesson-
  planning-engine.md §8` added, extending Delivery 7. Red-team finding: every
  per-session budget in the tree and the protected CLOSE are defined against
  "the session" as a unit, but the product is an open-ended async chat and no
  file defined the boundary — making every budget unmeasurable and every CLOSE
  optional (learner can vanish mid-CORE right after a failure; Universal
  Principle 14 unenforceable unilaterally). Three rules added: (1) boundary =
  generous inactivity gap (~30 min default, attention-span-scaled; within =
  same session/budgets continue/no re-greet; past = new session/budgets reset/
  placement/06 §2 gap table governs 3d+); (2) an abandoned session's CLOSE is
  a debt paid first at next return (retro-close via the OPENING's existing
  continuity greeting, never an interrogation of the disappearance);
  (3) failure-then-vanish flagged with the last-event state; the return opens
  with an engineered win before anything else; flagged failure-then-vanish
  with no return = the clearest churn signature the product produces and an
  authoring flag on the concept that produced the terminal failure.
  Knowledge-correction only. Red-team mode continues.
- **First-Principles Review** (2026-07-10, verbal only, no files — treated as
  standing architectural truth unless proven wrong): answered "why would a
  student pay for My Tutor when perfect free LLMs exist?" Four structural
  moats no general assistant can have: (1) the incentive stance — assistants
  are structurally loyal to present comfort, a tutor to future competence
  (withholds answers, schedules struggle, refuses hollow advancement;
  enforcement must live in code, not prompts); (2) verified learner state —
  manufactured by deliberately scheduled instrumented probes, not recalled
  from transcripts; (3) cross-learner teaching evidence — which repairs/
  probes/actions measurably work, accumulated only by the venue where
  learning happens, in no training corpus; (4) proactive scheduling.
  Verdict: "the Educational Brain is the moat" is wrong as written — the
  Brain is the BLUEPRINT for the instrument that manufactures the moat;
  explanation/analogy prose is a depreciating asset (future-generatable);
  hand-authoring 1,800 full prose entries would race commoditization — the
  durable part of an entry is its instrument sections. Priorities reordered:
  evidence capture wiring > stance enforcement in code > proactive spine >
  probe/misconception skeletons for cut-nodes > capture-measure-rank assets;
  further prose-only universal engines PAUSED.
- **Delivery 15 — Evidence Architecture** (2026-07-10, in-repo, Phase 2):
  `educational-brain/validation/08-evidence-architecture.md` + quality-bar
  amendment in `concepts/COVERAGE.md`. The First-Principles Review applied
  to the whole tree: moat classification per library (assessment/
  misconceptions/student-state/placement/first-lesson HIGH; teaching-actions
  MIXED — catalog is prose, moat is the outcome table it enables; concepts
  SPLIT — instrument sections HIGH, prose sections LOW; conversation-engine/
  principles prose LOW-but-retained as enforcement spec); unified
  per-component evidence contracts (consolidating decision-engine/08 §3,
  student-state/06 §7, escalation law 3, first-lesson/08 — plus the one
  addition: decisions must be JOINED to next-turn consequences); 8 missing
  evidence loops (recovery aggregation, anti-analogy growth from Type-6
  births, per-concept decay norms, action outcome table, decision-consequence
  join, placement prior retuning, curriculum-feedback-as-events, voice
  forfeiture); authoring pivot — INSTRUMENTED SKELETON is now a valid
  concept-entry class (instruments at seed quality, prose deferred; labeled,
  separate coverage column; rich-prose-no-instruments still invalid);
  entries reframed as bundles of falsifiable predictions; the
  million-student answer (7 bodies of accumulable-only knowledge).
  Knowledge only — no runtime/schema/curriculum changes.

- **WAVE 0 IMPLEMENTED** (2026-07-10, commits 8e1bec5 + 131fa9e, G2 satisfied by
  explicit owner Wave-0 instruction; Brain frozen per the Final Sign-off, faithful
  implementation only — every change cites its Brain rule):
  (1) AssetIdentity activated — `src/lib/teaching/assets/brainSeedAssets.ts` (data-only
  transcription of the 4 authored concept entries: 9 EXPLANATION + 5 PROBE assets with
  distractor-mapped misconceptionIds, every item citing its educational-brain source
  section) + `scripts/brain/seed-knowledge-assets.ts` (`npm run seed:brain-assets`;
  idempotent; KG-validates conceptIds before writing; default ACTIVE as HUMAN_CURATOR
  transcriptions of the frozen audited Brain, `--draft` for the admin-review flow,
  `--dry-run` DB-free; seed canonicalSlug convention appends `:gradeBand` so each band
  is its own lineage under ADR 14 §4.1). Once seeded, assembleLesson() serves authored
  content (`provider: 'memory'`) for those concepts.
  (2) Evidence capture — `src/lib/teaching/signals.ts` (`<!--SIGNAL-->` per Blueprint
  Phase 3: correctness/confidence/confusion/phrase/probe; parsed+stripped before all
  other tag parsers; fabrication forbidden for non-answers); route.ts writes
  PROBE_OUTCOME (correctness × server-measured latency from message timestamps —
  foundations/03 §7's one genuine text-channel instrument, captured at ingress — ×
  confidence) and MISCONCEPTION_DETECTED (verbatim phrase) per validation/08 §2;
  signal rows + TeachingStrategyEvent rows make the L5 decision-consequence join
  queryable.
  (3) First-lesson protocol — `src/lib/teaching/firstLessonGuard.ts`: first-lesson/02
  §2 hard limits, 04 §1 flow, 03 behaviour, 07 subject adaptations (English ORAL/
  "phoneme" banned; math counting-with-meaning; physics "SI" banned), foundations/03
  §5 adult-register guard; fires only for Library beginners at lesson 1 with zero
  completions; injected LAST (overrides advisory blocks).
  (4) Placement verification — `src/lib/teaching/placementVerification.ts`: pure
  three-bracket machine (below→at→above, nerve-settler first per assessment/02 §2;
  affect budget 2 failures §6; DOWNWARD-only silent adjustment per placement/01 §2 +
  02 §4 — StudentProgress.currentLesson moves to levelBelow()'s entry order, no fake
  completions); pending-probe tracking separates ask-turn from answer-turn (no
  double questions); state in contextSnapshot.placementVerification. Scope:
  unverified intermediate/advanced Library learners, KG subjects, zero completions.
  (5) Decision Engine for Library — ENABLE_LIBRARY_CONCEPT_TRACKING now DEFAULTS ON
  (`=0` reverts): concept seeding + snapshot persist run for Library, so decide()
  fires and TEACHING ENGINE DECISION reaches Library prompts (Blueprint Phase 5,
  ADR 08 §4a). School Mode paths untouched throughout.
  Validation: suite 655 passed/1 skipped (25 new tests), tsc clean. No schema
  changes. No architecture defects found requiring a Brain unfreeze; one flow gap
  (ask-turn vs answer-turn) was an implementation concern, solved in implementation.

- **CTO ITERATIONS 1–3 + ENGINEERING STOP DECLARED** (2026-07-10, commits e3d46cb,
  5222e9d, 6d89ecf; continuous-CTO mode, runtime lane only — no Brain authoring):
  (1) Library mastery evidence loop — the SIGNAL is Library's conversational
  checkpoint: writes TopicProgress with school-checkpoint semantics (65/25, never
  COMPLETED/MASTERED — conversational evidence can't certify gates per assessment/05
  §3); confident-wrong writes MistakeRecord('signal_confident_wrong') routing the D1
  grid's dangerous quadrant through the ALREADY-running detectMisconceptions()→
  MISCONCEPTION_REPAIR machinery; hesitant-wrong deliberately writes none (fast=
  misconception, hedged=guess); TEACHING ENGINE DECISION block carries a deterministic
  LAST-ANSWER READ overlay (fast-wrong→elicit/commit/collide; hesitant-correct→FRAGILE
  hold) supplying the speed/confidence read the frozen decide() lacks.
  (2) Session lifecycle state machine — `src/lib/teaching/sessionLifecycle.ts`:
  boundary = 30-min inactivity gap from real message timestamps (07 §8 rule 1);
  fresh episode → OPENING block (engineered win FIRST when previous episode ended on
  failure [retroWinOwed, §8 r3] → one-breath continuity → due reviews BEFORE new
  content); OPENING→CORE on first answered signal; CORE→CLOSING at affect budget
  (2 failures; 1 lesson-one); CLOSING block = close-on-a-win script (07 §6). Episode
  rides the existing snapshot persist.
  (3) Deterministic recovery triggering — `src/lib/teaching/recoveryGuard.ts`:
  two-tier utterance detection (strong identity utterances anywhere; mild ones only
  when message ≤80 chars IS the utterance), authored scripts retrieved from
  foundations/01 §3 + first-lesson/05 deltas, injected LAST preempting everything
  (03 §0, P5, P20); suppresses placement calibration AND the asset memory path on
  recovery turns; LEARNER_FEEDBACK `recovery:<state>` evidence = L1 writer side.
  Suite 690 passed/1 skipped, tsc clean throughout. **STOP CONDITION DECLARED
  REACHED**: every remaining improvement candidate fails the no-real-data constraint
  (signal calibration, probe quality, decay curves, mastery thresholds, spacing,
  session-gap tuning, placement priors L6, evidence-loop READERS which would read
  empty tables, further decision-matrix cells — those fire on states like BORED/
  FATIGUED whose detection needs behavioral baselines) or is gated on content
  production (concept coverage, non-math cut-nodes) or owner decisions (data
  governance for minors' verbatim capture; snapshot optimistic-concurrency hygiene
  pass). Next stage of improvement must come from production learning data.

## Educational Brain — architecture (frozen 2026-06-30, read before any teaching-decision work)
- **Authoritative reference (read this FIRST)**: `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` —
  the single living master document (complete engine map, all flows, scalability/versioning/
  validation strategy, risk register, glossary, ADR index). Created 2026-06-30 as the top-level
  synthesis; every ADR from ADR 08 onward must update it. It indexes, and is backed by, the detail
  set: `EDUCATIONAL_BRAIN_V1.md`, `ENGINE_REFERENCE.md`, `DATA_FLOW.md`, `DEPENDENCY_RULES.md`,
  `EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md` — the full frozen architecture, 65-step
  chat-route data flow, per-engine contracts, and 15 permanent rules. Read the Bible first, then
  the detail doc named for whatever you're touching; extend this architecture, don't replace it.
- Canonical pipeline core (KG → Student Memory → `src/lib/teaching-engine/index.ts` `decide()` →
  Teaching Action Generator → Dynamic Lesson Composer) runs for **every** chat turn, school or
  general/Library. The `src/lib/school/adaptive/*` cluster splits in two by board/grade coupling
  (see `docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md` for the function-by-function
  evidence): the synthesized 7-type teaching strategy (`teachingStrategy.getTeachingStrategy()`,
  itself folding in mastery, misconception confidence, concept transfer, confidence calibration,
  momentum, and stalemate detection) plus spaced revision now run for **both** school and
  general/Library sessions (`route.ts:294` school branch, `route.ts:964` Library branch, ADR 02,
  implemented 2026-06-30) — board/grade params on those functions are unused plumbing, verified by
  reading bodies. `nextBestAction`/`dailyPlan`/`examReadiness` remain school-only — they genuinely
  walk a board/grade curriculum syllabus tree with no Library equivalent. `lessonPlanner.buildLessonPlan()`
  also now runs for both (`route.ts` ~1019, ADR 02 §7 follow-up #1, implemented 2026-06-30) — it only
  reads `.id`/`.title` off each node, so a `CurriculumNode` satisfies it with a trivial inline mapping.
  `prerequisiteRecovery.detectPrerequisiteGap` remains school-only and is NOT a simple shape-reconciliation
  case: it resolves prerequisite ids through a module-global `KG_BY_ID` keyed on the canonical school KG
  only, which a Library subject's node slugs can never match — wiring it needs a signature change
  (caller-supplied corpus map) that touches the live school call site too, deferred (ADR 02 §7 item 1).
- One system is **archived/dormant, never executes against live traffic** — do not extend it
  expecting production effect: `src/lib/educationalBrain/*` (Eb* pipeline, fire-and-forget, gated
  by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`, default off, carries an archive-status header comment).
  `src/lib/curriculum/teachingActionEngine.ts` (a duplicate, zero-caller "HOW to teach" decision
  engine, confusingly similar to the live `src/lib/teaching-engine/index.ts`) was confirmed
  genuinely dead and **deleted 2026-06-30** — see `docs/architecture/ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`.
  Its Teaching Assets Platform siblings (`teachingAssetSchema.ts`/`teachingAssetAdapter.ts`/
  `teachingAssets.ts`, real curriculum content for all 5 subjects) remain — still zero live
  importers, left untouched as an explicit open question, not this session's to decide.
- `src/lib/school/adaptive/nextBestAction.ts` is a split file: its namesake `getNextBestAction()`
  (5-tier engine), `nextActionHref()`, and its own `NEXT_ACTION_LABELS` export are confirmed
  zero-caller dead code (their one plausible consumer, `src/components/dashboard/SchoolDashboard.tsx`,
  is itself a confirmed-orphaned, unrendered component — the live `/dashboard` route renders
  `DashboardV2` instead, which sources recommendations via `learningOrchestrator.ts`). The file's
  fourth export, `getChapterNextStep()`, remains genuinely live (`route.ts`, the chapter workspace
  page) and must not be touched. A surgical-removal **proposal** (not executed, and per explicit
  user instruction will **stay unexecuted indefinitely** — documentation-only is the final state)
  is written up in `docs/architecture/ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md`.
- **Priority pivot (2026-06-30):** dead-code/duplication auditing (the ADR 03/04 pattern) is
  deprioritized. Current priority is forward-looking Educational Brain system design: Knowledge
  Graph consumption, Teaching Action Intelligence, Student Memory evolution, Dynamic Lesson
  Composition, Evidence Engine, Recommendation Intelligence, Mastery Engine, Visualization
  selection, Simulation architecture, Assessment architecture, Beginner→Intermediate→Expert
  progression, entrance examination framework, curriculum mapping architecture, AI independence
  strategy, long-term scalability. Don't propose/execute further cleanup unless it blocks one of
  these. First finding under this pivot: two of the canonical KG's 10 authored fields
  (`cross_links`, `mastery_threshold`) are parsed by `subjectKgAdapter.ts` but never exposed past
  it — neither `ConceptNode` nor `KnowledgeNode` carries them, and `mastery_threshold` (which
  varies 0.35–0.95 across mathematics's 908 concepts) has zero runtime effect because every
  scoring engine reads the flat `ASSESSMENT_PASS_THRESHOLD = 70` constant instead. 3-phase
  resolution **proposed, not executed** in
  `docs/architecture/ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`.
- **Second pivot / strict architecture-only mode (2026-06-30, binding):** ADR 05 accepted as
  documentation only — its Phase 1 (exposing `cross_links`/`mastery_threshold`/any other new
  Canonical KG field) must NOT be implemented until BOTH (a) the external Curriculum Production
  Pipeline freezes the Canonical Knowledge Graph v1 specification, AND (b) the user explicitly
  re-approves. Until then: no adapter functions, no runtime/route/schema/production-code changes
  of any kind without explicit per-item user approval — architecture/documentation only. The user
  specified an 8-item forward-architecture roadmap to execute in order, one full ADR (evidence +
  options comparison + trade-offs + specs + migration + scalability-to-millions + backward-compat
  with Educational Brain v1) per turn, implementation deferred for all 8:
  1. KG Consumption Pipeline — **done**, see `docs/architecture/ADR_06_KG_CONSUMPTION_PIPELINE.md`
     (proposes a 4-part load-time gate — schema major-version check, status check, runtime shape
     validation of the 8 already-consumed fields, diagnostic-only metadata surface — because today
     every `docs/{subject}/kg/graph.json`'s wrapper metadata, `{name, version, status, build_date,
     statistics, domains}`, is silently discarded by `subjectKgAdapter.ts`'s `getRaw()`, which keeps
     only `.concepts`, and zero runtime validation or CI wiring exists for the KG validator script).
  2. Mastery Intelligence Architecture — **done**, see
     `docs/architecture/ADR_07_MASTERY_INTELLIGENCE_ARCHITECTURE.md`
     (found five non-unified mastery/progression representations —
     `MasteryLevel` school-only classification, `TopicProgress.masteryPct`
     independently re-classified by `learningProfile.ts` with a hardcoded
     `70`, dormant `EbLearnerConceptMastery` float score, frozen `TrackLevel`
     T0-T4, and the placement-exam subsystem's `LevelBand` enum — none
     reconciled with another; designates `MasteryLevel` as canonical and
     proposes, without implementing, extending it to Library Mode,
     consolidating `learningProfile.ts` onto it, and a cross-vocabulary
     mapping table; new Finding 8 in `ARCHITECTURE_DECISIONS.md`).
  3. Teaching Action Intelligence — **done**, see
     `docs/architecture/ADR_08_TEACHING_ACTION_INTELLIGENCE.md`
     (found the concrete `decide()` → Teaching Action Generator → Dynamic
     Lesson Composer chain is mode-agnostic by construction but
     School-Mode-only in practice — its trigger field,
     `contextSnapshot.currentConceptNodeId`, has exactly one write site
     in `src/`, gated by `if (schoolCtx)`; formally distinguished this
     "Action" layer from `teachingStrategy.ts`'s 7-value "Posture" layer
     and proposes, without implementing, a Library-mode seed-and-persist
     extension; new Finding 9 in `ARCHITECTURE_DECISIONS.md`).
  4. Dynamic Lesson Composition — **done**, see
     `docs/architecture/ADR_09_DYNAMIC_LESSON_COMPOSITION.md`
     (found `composeLessonPlan()` recomputes the full `LessonPlan` from
     scratch every turn with zero persisted cross-turn stage continuity,
     despite `buildLessonPlanBlock()`'s own prompt text framing itself as
     a "multi-turn pacing guide"; proposes, without implementing,
     generalizing the already-proven Worked Examples tag-emit/parse/
     persist/resume pattern (`workedExamples.ts`) via a new
     `contextSnapshot.lessonStageProgress` key and a `planSignature`
     continuation/replan fingerprint computed in calling code; new
     Finding 10 in `ARCHITECTURE_DECISIONS.md`).
  Items 5-8 below are **superseded** by the 15-item v1.0 completion
  criteria in the Gap Analysis Discipline rule immediately below — kept
  here only as a historical record of the original roadmap framing.
  5. Student Memory Evolution — **DONE**, ADR 10.
  6. Recommendation Intelligence — **DONE**, ADR 11.
  7. Visualization & Simulation Architecture — **DONE**, ADR 12.
  8. AI Independence Roadmap — **DONE** (consolidation into Bible §6.9).
- **Architecture Gap Analysis Discipline (2026-06-30, binding, supersedes
  the fixed "one ADR per roadmap item" assumption above):** the objective
  is no longer to produce as many ADRs as possible — it is to finish
  Educational Brain Architecture v1.0, defined by 15 completion criteria
  (Bible §10.2: KG consumption, Mastery Intelligence, Teaching Action
  Intelligence, Dynamic Lesson Composition, Student Memory, Recommendation
  Intelligence, Visualization & Simulation Architecture, Assessment &
  Mastery Validation, Evidence Engine, AI Independence Strategy,
  Curriculum Mapping Strategy, Knowledge Asset Lifecycle, Scalability
  Strategy, Validation & Quality Assurance, Implementation Governance).
  Before every new ADR, perform an Architecture Gap Analysis: (1) is a
  major capability still required for the Educational Brain to function
  as a complete world-class teaching system, (2) is it fundamental enough
  that undocumented implementation risks a redesign, (3) is it not
  already fully covered by the Bible, an existing ADR, or any other
  architecture document in the repo. Write a new ADR **only if all three
  are YES**; otherwise update the Bible, consolidate, eliminate
  duplication, cross-reference, and strengthen guidance instead — a topic
  being discussable is never sufficient reason for a new ADR. When all 15
  items read DONE: freeze v1.0, mark remaining ADR ideas as future
  enhancements (not v1 requirements), produce the final Bible and the
  final Architecture Completion Report, then stop automatically. A
  pre-existing, previously unindexed 11-chapter proposal document set
  (`docs/educational-brain/*`) and a live scene-generation/simulation
  subsystem (`src/lib/teaching/sceneGenerators/*`) were discovered
  mid-session, overlapping several of the 15 items and absent from the
  Bible's engine map. **Reconciliation complete (2026-07-02):** both
  were audited. `docs/educational-brain/*` is a complementary Phase 2
  implementation blueprint — not superseded, not conflicting; ch03
  explicitly treats live `route.ts` as input; Knowledge Asset model is
  the content-layer refinement the live chain is designed to serve.
  `sceneGenerators/*` is live flag-gated code, now documented in Bible
  §3 as Engines 36-41. **Gap Analysis complete (2026-07-02):** 5 new
  ADRs warranted — ADR 10 (Student Memory), ADR 11 (Recommendation
  Intelligence), ADR 12 (Visualization & Simulation Architecture), ADR
  13 (Evidence Engine), ADR 14 (Knowledge Asset Lifecycle). 6 items need
  Bible consolidation only (§6.11 Assessment, §2/§6.9 AI Independence,
  §6.4 Curriculum Mapping, §6.10 Scalability, §6.12 Validation & QA,
  §10.1 Governance). Full evidence in Bible §10.2.
  **ADR 10 complete (2026-07-02):** Student Memory Architecture. Eight
  fragmented memory surfaces redesigned as six formally owned stores
  (Session/Student/Knowledge/Teaching/Brain/Long-term) with single-writer
  invariant. Key proposals: `ConceptMasteryRecord` table (mastery/decay
  split: `masteryScore` vs. `decayedScore = masteryScore × exp(-Δt/halfLife)`),
  `BrainConfig` versioned policy store (replaces hardcoded constants),
  `ActiveMisconception` table (replaces scattered MistakeRecord reads),
  `SessionMemory` typed schema (formalizes `contextSnapshot` JSONB fields).
  4-phase additive migration (add→migrate readers→migrate writers→deprecate).
  Bible updated: §3 row #6, §6.5, §7 (R9 partially resolved, R14 added), §9 ADR index.
  Full design: `docs/architecture/ADR_10_STUDENT_MEMORY_ARCHITECTURE.md`.
  **ADR 11 complete (2026-07-02):** Recommendation Intelligence. Identified
  two structurally distinct purposes conflated in the live cluster: Cross-Session
  Planner (`learningOrchestrator.ts`, 8-priority chain, Dashboard-only) vs.
  In-Session Signal Injection (`weakTopics`/`narrative`/`dailyPlan`/`examReadiness`,
  system-prompt only). Key finding: conflicting signals for the same topic (weak_topic
  vs. RAPID_IMPROVEMENT narrative) are currently resolved probabilistically by the LLM,
  not deterministically by the Brain. Library Mode has no recommendation tier.
  Proposed: Two-layer architecture — Session Recommendation Reconciler (pure function,
  deterministic signal priority table, `maxSessionSignals = 3` cap from BrainConfig)
  + `getTopLibraryRecommendation()` (subject-only, reads TeachingMemorySnapshot).
  Evidence Engine hook point (ADR 13) designed in: `assetEffectivenessSignal` gates
  "revisit" vs. "try different approach." Bible: §3 row #23, §6.7, §7 R15, §9 updated.
  Full design: `docs/architecture/ADR_11_RECOMMENDATION_INTELLIGENCE.md`.
  **ADR 12 complete (2026-07-02):** Visualization & Simulation Architecture.
  Confirmed 7 competing visual pipelines (not 6 as ch08 counted — Engine 42
  Dynamic Visualization `generateVisualizationCode.ts` was unindexed). Two live
  architectural violations: P2 violation (no concept-keyed persistent cache;
  VisualizationCache keys on text hash not conceptId), and Permanent Rule 9
  violation when ENABLE_DYNAMIC_VISUALIZATION=true (second LLM call per turn).
  Also: two uncoordinated decision points (Teaching Engine visual_type pre-LLM
  vs. visualizationDecision.ts post-hoc). Proposed: Visual Asset Model — typed
  renderers, concept-keyed cache `(conceptId, renderer, language, gradeBand)`,
  background authoring for all LLM-visual calls (zero extra LLM calls per turn
  after first-time authoring), mandatory a11yDescription, Visual Policy from
  BrainConfig. Bible: §3 Engine 42 added, §6.8, §7 R16/R17, §9 updated.
  Full design: `docs/architecture/ADR_12_VISUALIZATION_SIMULATION_ARCHITECTURE.md`.
  **ADR 13 complete (2026-07-02):** Evidence Engine. Confirmed two existing
  evidence schemas are orthogonal — `EvidenceRecord` (per-learner mastery ledger,
  Student Memory Store 2) vs. `EbEvidenceEvent`/`EbAssetScore` (per-asset cross-
  student quality log, Teaching Memory Store 4). `EbEvidenceEvent` schema already
  matches ch04's design (conceptId, category, outcome, strength, contextHash).
  Adopted `EbEvidenceEvent`/`EbAssetScore` as canonical Evidence Engine tables,
  wired directly into Teaching pipeline's persist stage (not via dormant Eb* pipeline).
  Three-tier chain: append-only log → 60s EWMA rolling-window worker → nightly
  authoritative rollup. Six evidence categories, Beta-binomial confidence, three
  bias counters (exploration budget, inverse propensity weighting, misconception-
  conditional scoring). New tables: StrategyEffectivenessScore, MisconceptionPrevalence,
  CuratorQueueEntry. Single-writer rule for all Evidence Engine output tables.
  ADR 11 integration point implemented: assetEffectivenessSignal derives from EbAssetScore.
  R9 fully resolved (confirmed orthogonal). Bible: §6.6, §7 R18, §9 updated.
  Full design: `docs/architecture/ADR_13_EVIDENCE_ENGINE.md`.
  **Educational Brain Architecture v1.0 COMPLETE (2026-07-02):** All 15
  completion criteria done. Six Bible consolidation items completed in one
  pass: (8) Assessment & Mastery Validation → Bible §6.13 added; (10) AI
  Independence Strategy → Bible §6.9 expanded with P1-P10 + Type A/B/C
  call taxonomy + ADI concept; (11) Curriculum Mapping → Bible §6.4
  expanded with board/grade→concept view layer; (13) Scalability → Bible
  §6.10 expanded with ch09 100M-learner targets + cost model; (14)
  Validation & QA → Bible §6.12 expanded with P10 + cross-cutting rule;
  (15) Governance → Bible §10.1 expanded with 9 Chief Architect rules.
  §0 TOC updated (13 §6 subsections). All 15 §10.2 criteria read DONE.
  **Final Architecture Completion Report DONE (2026-07-02):**
  `docs/architecture/ARCHITECTURE_COMPLETION_REPORT_V1.md` — durable v1.0
  completion record: criteria/ADR status tables, cross-ADR dependency
  graph, five-wave dependency-ordered implementation sequence (Wave 0
  process gates → Wave 1 additive foundations + Wave 1b P10 fixture
  harness → Wave 2 engine extensions → Wave 3 memory migration (R14) →
  Wave 4 asset-model activation (P2/ADI payoff, fixes R16) → Wave 5
  closure), implementation-gating risks, readiness assessment. Synthesis
  only; Bible primacy applies.
- **Third pivot / Integration & Validation Loop (2026-07-02, binding):**
  v1.0 is FROZEN. The Curriculum Production Pipeline runs independently
  and remains the ONLY authority for Canonical KGs. Standing mission: do
  NOT build curriculum, do NOT redesign the Brain, do NOT modify
  curriculum/KG files, production runtime, routes, schemas, or teaching
  assets, and do NOT reopen completed ADRs without strong evidence.
  Instead, loop: audit → pick ONE highest-value integration-preparation
  task (implementation specs, migration/rollout planning, validation/QA
  frameworks, testing strategy, dependency analysis, risk analysis,
  observability planning, version compatibility, developer guides,
  checklists) → verify zero curriculum overlap → complete it → validate →
  update Bible/memory only if required → commit → push → repeat. Stop
  immediately if a task would modify curriculum, redesign frozen
  architecture, require the KG v1 freeze, need a major architectural
  decision, or need user approval. Report after each completed task, then
  continue. Every task must reduce implementation risk without
  interfering with curriculum production.
  Loop iterations completed so far:
  (1) 2026-07-02 — `docs/architecture/ARCHITECTURE_COMPLETION_REPORT_V1.md`
  committed (durable v1.0 record + cross-ADR dependency graph + five-wave
  sequence).
  (2) 2026-07-02 — `docs/architecture/VALIDATION_FRAMEWORK_P10.md`
  committed (Wave 1b spec: 3 test tiers, LLM transcript seam, 4 assertion
  surfaces, 15-fixture frozen set, CI plan). Verified findings: the
  39-file vitest suite tests pure REPLICAS of LLM-adjacent logic, not the
  real modules (replica-drift risk); `.github/workflows/` doesn't exist —
  nothing runs in CI (extends R6).
  (3) 2026-07-02 — CI baseline measured, spec amended: vitest GREEN
  (506/507, ~10 s, needs no DB and no generated Prisma client);
  `tsc --noEmit` NOT clean (662 errors/98 files with ungenerated client;
  clean baseline smaller but nonzero) → CI type gate redesigned as a
  ratchet (fail only on count increase), not zero-error. Note:
  `prisma generate` fails on engine download in sandboxed envs
  (ECONNRESET) — type baselines differ by environment.
  (4) 2026-07-04 — Curriculum Pipeline sync at d622336: English KG
  authored (216 concepts, PASS) but NOT registered in runtime registry →
  R20 + Wave 0 approval item; Mathematics KG v1.0.1 FROZEN (first
  subject at ADR 06's freeze state; campaign still 1.0.0-draft → Wave 0
  gate not met); all 6 KGs re-validated PASS; pipeline asset format
  confirmed compatible with ADR 14 (curated source for Phase 2, not a
  competing model); superseded banners on SYSTEM_AUDIT.md +
  project-memory/NEXT_ACTION.md; P10 spec CI step 4 corrected to 6
  subjects with file-path CLI usage.
  (5) 2026-07-04 — CI gate BUILT (P10 §6 steps 1–4):
  `.github/workflows/validate.yml` + `scripts/ci/tsc-ratchet.sh` — npm ci
  → type-error ratchet (bootstrap mode until `scripts/ci/tsc-baseline.txt`
  is captured from the first hosted run) → vitest hard gate → 6-subject KG
  validator on every push/PR. R6 → Mitigated (CI half). Ratchet exercised
  in all 3 modes locally; 6/6 KGs PASS; vitest 506/507. Test scaffolding
  only — no production code.
  (6) 2026-07-04 — `docs/architecture/WAVE_0_APPROVAL_CHECKLIST.md`
  created: the G2 approval instrument — 21 gated items (W0-1…W5-3, plus
  W5-4 already done) from
  ADRs 05-14 + R20 + P10 GATED seams, each with stable ID, source,
  dependencies, approval checkbox. NOTHING approved; checking a box +
  committing (`governance: approve <IDs>`) is the approval act. Use these
  IDs in future implementation commits.
  (7) 2026-07-04 — **LOOP STOPPED at its designed terminal state.** After
  a fresh repo read (no pipeline movement past d622336-era commits; docs
  verified in sync), no meaningful non-implementation work remains: every
  remaining task requires production implementation (Tier 2 tests /
  transcript harness / fixtures / all 21 checklist items), the Canonical
  KG v1 freeze (G1), explicit user approval (G2), or an external event
  (first hosted CI run to capture `scripts/ci/tsc-baseline.txt`).
  Preparation readiness is 100% of what is reachable without those gates.
  Do NOT restart this loop to hunt for tasks — resume work only when one
  of these unblocks: (a) pipeline pushes new KG/asset output → re-run
  6-subject validation + doc sync; (b) owner checks boxes in
  WAVE_0_APPROVAL_CHECKLIST.md → implement approved items in dependency
  order; (c) first hosted CI run → commit the ratchet baseline; (d) a
  directive explicitly re-permits building test scaffolding → build Tier
  2 tests + transcript harness per VALIDATION_FRAMEWORK_P10.md §7.
  (8) 2026-07-07 — **G2 exception granted: ADR 14 Phase 2/3 implemented**
  ("Explanation Memory" + "Teaching Action Repository", explicit owner
  chat instruction, out of the normal G1/G2 sequence — G1 KG-freeze still
  not declared). Discovered mid-task that W1-3 (Evidence Engine Phase 1)
  and W1-4 (AssetIdentity + three family tables, empty) were ALREADY
  implemented in the codebase (`src/lib/teaching/evidence/evidenceEngine.ts`,
  `src/lib/teaching/assets/assetIdentity.ts`) despite their checklist boxes
  reading unchecked — checklist corrected to match reality rather than
  building a duplicate schema. Built on top, EXPLANATION + PROBE families
  only (VISUAL intentionally untouched — ADR 12/W4-2 territory): Student
  State builder (`studentState.ts`, grade→GradeBand mapping), a pure
  confidence matcher (`matcher.ts`, calibrated so a freshly human-approved
  ACTIVE asset with zero accumulated evidence clears the default threshold
  on concept+language+gradeBand fit alone — qualityScore/qualityConfidence
  are Evidence-Engine-owned per the schema's single-writer invariant and
  can only ever add bonus confidence, never gate a floor), capture
  (`explanationMemory.ts`/`teachingActionRepository.ts`, DRAFT after every
  LLM generation), an admin review endpoint
  (`/api/admin/knowledge-assets`, DB-role-gated, approve/reject), and
  `assembleLesson()` wired into `route.ts` immediately before the LLM
  call. Live-verified end-to-end via local Postgres + direct HTTP calls:
  DRAFT is never served; after admin approval the real chat endpoint
  returns `provider: "memory"` with the exact stored content and the LLM
  is never invoked; combined explanation+quiz assembly works; with the
  catalogue empty (today's real state — nothing was pre-populated per the
  task's own "do not populate thousands of explanations now" instruction)
  the LLM path is provably unchanged from before this build. Scope: only
  physics/mathematics/english (the three live curriculums).
  (9) 2026-07-08 — **G2 exception granted: curriculum-level placement
  implemented** (explicit owner chat instruction, out of the normal
  G1/G2 sequence — G1 KG-freeze still not declared). Root cause fixed:
  a prior investigation found six independent learner-level enums in
  the repo, of which only `Profile.currentLevel` (beginner/intermediate/
  advanced, set at onboarding) was actually reachable — but its only
  live effect was cosmetic AI-prompt text; every learner always started
  at lesson 1 regardless of selected level. Canonicalized on
  `CurriculumLevel` (`src/lib/curriculum/levels.ts`, 3 tiers, the one
  the onboarding UI actually offers) with `normalizeToCanonicalLevel()`
  mapping every legacy value onto it; deprecated (not removed, no
  migration) `mastery/levels.ts`'s unused `MASTERY_LEVELS` and
  `subjectCatalog.ts`'s 6-tier `LEVELS` (kept only for the Subject
  Library page's enrollment badge), and documented the `LevelBand`
  enum + Coach-Placement models (`CoachProfile`/`LearningGoal`/
  `PlacementAssessment`/`AssessmentAttempt`) as confirmed dead (zero
  writers anywhere) via a schema comment only, no structural change.
  Implementation: `src/lib/curriculum/placement.ts` (new) computes a
  level-appropriate entry order from each subject's own already-authored
  per-node `difficulty` tag (foundational/developing/proficient/
  advanced/expert/research — forwarded onto `KGNode` in
  `knowledgeGraph.ts`, previously computed-but-dropped after
  `difficultyHours()`); wired into `/api/curriculum`'s GET (entry-order
  default + prerequisite-unlock floor) and `getDashboardV2Data.ts`
  (same default, so dashboard/Continue Learning/Current Lesson never
  disagree with `/learn`). Explicitly does NOT write fake completions —
  `StudentProgress.completedLessons`/`TopicProgress` stay genuinely
  empty until really earned; only the *default* starting `currentLesson`
  and which nodes count as prerequisite-unlocked change, and only until
  a real progress row exists. No schema/migration changes at all — fully
  derived from data that already existed. Scope: Subject-Library/KG-backed
  subjects only (physics/mathematics/chemistry/biology/computer_science/
  english) — School Mode intentionally excluded (walks an external
  board/grade-prescribed chapter order that shouldn't be skipped on a
  self-reported level). Live-verified against the real physics KG (216
  concepts) with three real accounts: beginner→lesson 1 ("SI Units and
  Measurement"), intermediate→lesson 7 ("Dot and Cross Products"),
  advanced→lesson 32 ("Conservative and Non-Conservative Forces",
  correctly crossing into a later unit) — dashboard's Continue
  Learning/Current Lesson widget matched exactly for all three. Full
  suite 630/631, tsc clean, build succeeds.
  **ADR 14 complete (2026-07-02):** Knowledge Asset Lifecycle. Confirmed all
  generated content (worked examples, explanations, visual specs, probes) is
  discarded per-turn — a P2 violation at the content layer. `teachingAssets.ts`/
  `teachingAssetSchema.ts`/`teachingAssetAdapter.ts` confirmed ORPHANED (zero live
  importers) and formally retired by ADR 14 (NOT the implementation path for the
  Knowledge Asset model). Selected design: three-family `AssetIdentity` model
  (ExplanationAsset, VisualAsset per ADR 12, ProbeAsset) with shared identity table
  carrying `incompatibilities` field (prevents serving assets that reinforce active
  learner misconceptions). Lifecycle: DRAFT→REVIEW→ACTIVE→DEPRECATED→RETIRED; only
  ACTIVE served; at most one ACTIVE per `canonicalSlug`. Five evidence-driven
  deprecation triggers. Four-phase additive migration (schema → passive catalogue →
  active retrieval → probe assets). Phase 2 endgame: LLM becomes voice-renderer,
  not content-generator. R9 note: not applicable (ADR 14 introduces its own
  asset-identity schema, fully compatible with ADR 13 Evidence Engine). R19 added
  (orphaned Teaching Assets Platform files remain on disk post-retirement). Bible:
  §3 row #35, §6.3, §7 R19, §9 ADR 14 row added.
  Full design: `docs/architecture/ADR_14_KNOWLEDGE_ASSET_LIFECYCLE.md`.
- **Chief Educational Brain Architect mode + per-ADR discipline (2026-06-30, binding, refined
  same day):** the Curriculum Production Pipeline is the ONLY authority for Canonical Subject
  Knowledge Graphs — do not interfere with it, generate subject knowledge, generate teaching
  assets, implement runtime features, modify production code/routes/schemas, expose new Canonical
  KG fields, or redesign stable architecture without strong evidence. The job here is producing
  the complete Educational Brain Architecture as one unified design — treat every engine as part
  of one organism, never design isolated systems — that will eventually become the official
  implementation blueprint. Every ADR must answer: **"How does this make the Educational Brain
  think and teach more like a world-class human teacher?"** — if the answer is weak, redesign the
  ADR. **Before starting each ADR**: read the Educational Brain Bible
  (`docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md`), re-read every previous ADR, re-read this
  project-memory set, re-read the current master architecture documents, verify the proposed
  design doesn't conflict with existing architecture, and if it does, explain + resolve + update
  the Bible before continuing — never allow contradictory ADRs, duplicated systems, or overlapping
  responsibilities; always prefer one elegant system over multiple similar ones; if an ADR makes a
  previous one obsolete, mark the old ADR superseded in the Bible's ADR index rather than leaving
  two conflicting answers. **Every ADR uses this 14-section template** (current, as of the
  2026-06-30 refinement — ADRs 02-07 used a 13-section predecessor, not superseded by the template
  change alone, see Bible §9 template note): Problem, Evidence, Alternative designs, Selected
  design, Trade-offs, Scalability, AI independence impact, Backward compatibility, Validation
  strategy, Migration strategy, Relationship to previous ADRs, Relationship to the Canonical
  Knowledge Graph, Relationship to the Teaching Engine, Future implementation plan. Do not
  implement anything and do not request implementation approval inside an ADR — implementation
  begins only after the Curriculum Production Pipeline declares Canonical Knowledge Graph v1
  frozen AND the user explicitly approves. Don't revisit solved problems without new evidence;
  don't prioritize repository cleanup/minor refactoring/dead-code/naming over architecture unless
  it blocks the roadmap. **Every completed ADR must update the Bible** (at minimum: ADR index,
  relevant flow section, risk register if applicable) — an ADR that doesn't update the Bible isn't
  finished. Continue autonomously through the 8-item roadmap above; when all 8 ADRs are complete,
  stop and produce one final **Architecture Completion Report** (Bible summary, ADR index,
  architecture summary, complete engine dependency map, remaining implementation work, known
  risks, readiness assessment for implementation) — not due yet, only 4 of 8 roadmap items done as
  of ADR 09.
- Full evidence, governance rule, and a corrected map of what's live vs. dormant:
  `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md`. **Governance rule**: before starting any new "decide
  what to teach / what strategy / what mastery state" system, re-fetch the remote tip, read the
  architecture freeze above, grep `src/lib/teaching-engine/`, `src/lib/school/adaptive/`, and
  `src/app/api/learn/chat/route.ts`, and explain why extending the canonical pipeline in place is
  insufficient. A new parallel pipeline is not an acceptable answer to "the existing one feels
  architecturally rough" — refactor the live system instead.

## Run locally
```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), GROQ_API_KEY
                        # optional: YANDEX_API_KEY, YANDEX_FOLDER_ID (Russia-only fallback)
npm install
npx prisma db push
npm run dev            # http://localhost:3000
npm run build          # prisma generate && next build
npx tsc --noEmit       # pre-existing stripe/subscription errors are expected on feature branches
```

## Constraints
- Branch for current work (canonical): `claude/my-tutor-foundation-KDSUO`.
- Do NOT create PRs unless explicitly asked. Do NOT push to other branches.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject architecture.
