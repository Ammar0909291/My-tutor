# Architecture Issue Register — v1.0.0 (2026-07-15)

**Scope audited:** the EOS v2 document set (`EOS_V2_ARCHITECTURE.md`,
`EOS_V2_RUNTIME_SPECIFICATION.md`, `EDUCATIONAL_BRAIN_COMPILER.md`, CEKR,
`OUTCOME_SCIENCE_FRAMEWORK.md`), the shipped teaching-runtime work (P1–P5,
Phases A–H, WhatsApp-style history), and their interactions with the existing
v1 runtime and Educational Brain.
**Method:** adversarial re-read of every document against every other and
against the live code. Issues are numbered ISS-01…ISS-24, ordered by fix
window then severity. Classification matrix per issue:
Severity (Critical/High/Medium/Low) · Likelihood (Certain/Likely/Possible/
Unlikely) · Cost (Small <1d / Medium 1–5d / Large 1–4w / Architectural >1mo)
· Fix window (Before any implementation / Before beta / Before production /
Can wait) · Category.
**Status:** REGISTER ONLY — nothing here is fixed by this document; the
frozen documents are not modified. Spec-level corrections are filed as
spec bugs per each spec's own rule ("gaps are spec bugs — do not invent
behaviour").

---

## A. FIX BEFORE ANY IMPLEMENTATION (spec-level defects — cheap now, expensive later)

### ISS-01 — Two competing teaching-phase vocabularies (shipped machine vs specified machine)
**Matrix:** High · Certain · Medium · Before any implementation · Architecture
- **Root cause:** Phases C–G shipped `conversationState.ts` with a 6-phase
  ladder (OBSERVE→DEMONSTRATE→GUIDE→CHECK→PRACTICE→TRANSFER); the frozen RS
  §4.1 specifies a 10-state ladder (DIAGNOSE→ANCHOR→…→TRANSFER). Both are
  "the teaching state machine."
- **Why the design permits it:** the RS declared Phases A–H as milestone M0
  but never published a state-mapping table from the shipped machine to the
  specified one.
- **Smallest correction:** a one-page normative mapping appendix (spec bug
  filed against RS): OBSERVE→ANCHOR, DEMONSTRATE→DEMONSTRATE(+NAME/FORMALIZE
  unsplit), GUIDE→GUIDED, CHECK→ASSESS(inline), PRACTICE→INDEPENDENT,
  TRANSFER→TRANSFER, with migration rules for persisted
  `contextSnapshot.conversationState`.
- **Ideal correction:** M3 kernelization implements the 10-state machine and
  a snapshot migrator folds old 6-phase states forward.
- **Backward compatibility:** preservable — `readConversationState` already
  resets on unrecognizable shapes, so worst case is a phase reset per
  concept, which the high-water-mark rules make cheap.

### ISS-02 — RS "session" vs runtime "session" ambiguity breaks pack pinning
**Matrix:** High · Certain · Small · Before any implementation · Architecture
- **Root cause:** RS I-20 pins pack versions "per session"; the runtime has
  two session concepts — the `LearnSession` DB row (can span days) and the
  RS §4.2 episode (30-min inactivity boundary). Which one pins the pack is
  unspecified; a days-long LearnSession pinning one pack contradicts "pack
  activation applies at next session boundary."
- **Why permitted:** the RS reused the word "session" without binding it to
  a storage entity.
- **Smallest correction:** spec bug against RS: pinning binds to the
  **episode** (the §4.2 boundary), and the pinned version is recorded in the
  episode state.
- **Ideal correction:** rename RS "session" → "episode" throughout in the
  next RS minor version; DB row renamed conceptually to "conversation."
- **Backward compat:** yes — pure terminology + one field.

### ISS-03 — CEKR and EBC validate the same rules twice with no shared definition
**Matrix:** Medium · Likely · Medium · Before any implementation · CEKR
- **Root cause:** CEKR §11 (V-1…V-16, store-boundary) and EBC §8–9
  (E-codes, build-time) overlap (hint easier-than, analogy discipline,
  reference resolution). Two independent implementations WILL drift.
- **Why permitted:** the layering decision ("CEKR = element validity, EBC =
  shippability") was made after EBC froze, so EBC re-specifies element
  checks it should import.
- **Smallest correction:** declare (spec note) a single shared validation
  library as the implementation of both; EBC's overlapping E-codes become
  re-raises of CEKR V-codes with source spans.
- **Ideal correction:** at CEKR-M1, one `cekr-validate` package consumed by
  store and compiler; conformance fixtures shared.
- **Backward compat:** yes — implementation detail.

### ISS-04 — OSF's MRT randomization cells have no legal representation in the EBC rule schema
**Matrix:** High · Certain · Small · Before any implementation · Research
- **Root cause:** OSF §4.3 requires policy-pack rules whose effect is a
  seeded random choice between declared effects; EBC §5.1's rule schema
  (guard → deterministic partial effect) and RS §5 evaluation have no such
  construct. As specified, the causal-attribution engine cannot exist.
- **Why permitted:** OSF was authored after EBC/RS froze and introduced a
  new pack construct without a compatibility note.
- **Smallest correction:** spec bug against EBC/RS: add `effect: RANDOMIZE
  {cellId, arms[], probabilities, preRegistrationRef}` as a rule-effect
  variant; kernel resolves it with the RS C-7 seeded PRNG and logs
  probability (propensity) on DecisionRecorded. ~15 lines of spec.
- **Ideal correction:** the same, plus compiler checks (arms must be
  individually legal; protected-class bands may not carry RANDOMIZE).
- **Backward compat:** yes — additive enum member, minor pack semver.

### ISS-05 — BIR-M ≡ CEKR correspondence is declared but nowhere normative
**Matrix:** Medium · Certain · Small · Before any implementation · Documentation
- **Root cause:** CEKR forward-declares "EBC's BIR-M is CEKR's in-memory
  projection" but the kind-by-kind correspondence table is promised, not
  written; EBC (frozen) still defines BIR-M independently.
- **Why permitted:** freeze discipline — correct not to edit EBC, but the
  bridge artifact was deferred.
- **Smallest correction:** a one-page mapping table document (BIR-M entity ↔
  CEKR kind ↔ lowering section).
- **Ideal correction:** the table becomes a generated artifact of the shared
  validation library (ISS-03), tested.
- **Backward compat:** n/a (documentation).

### ISS-06 — Document authority sprawl: Bible (v1) + five frozen v2 specs with no index
**Matrix:** Medium · Certain · Small · Before any implementation · Documentation
- **Root cause:** the repo now carries two authoritative universes (Bible/
  ADRs for v1 runtime; EOS set for v2 target) plus CLAUDE.md memory. Nothing
  tells a newcomer which document governs which question.
- **Why permitted:** each document correctly scoped itself, but no
  meta-index was commissioned.
- **Smallest correction:** `docs/architecture/README.md` — a one-page
  authority map (question → governing document → status).
- **Ideal correction:** Bible §0 gains the same map at the next permitted
  Bible update.
- **Backward compat:** n/a.

### ISS-07 — The Brain contains zero structured blocks; the compiler's input format has no instances
**Matrix:** Critical · Certain · Architectural · Before any implementation (of EBC) · Educational Brain
- **Root cause:** EBC §2.1 compiles only `::block`-annotated content; 100%
  of `educational-brain/` is unannotated prose. The compiler, built today,
  compiles nothing. Both EBC and CEKR name this as the top risk; neither
  funds it.
- **Why permitted:** honesty boundary was chosen (correctly) over prose-NLP,
  which transfers the whole cost to authoring.
- **Smallest correction:** annotate ONE vertical slice end-to-end (the
  fractions constellation + recovery scripts + the D1 grid) as the pilot
  corpus before any compiler code — validates the block schema against
  reality and gives the compiler its first fixtures.
- **Ideal correction:** the authoring style guide + editor tooling + the
  migration lint (block-skeleton suggestions) as a funded workstream;
  progressive annotation ratchet in CI.
- **Backward compat:** yes — blocks embed in existing files; prose untouched.

---

## B. FIX BEFORE BETA

### ISS-08 — Autonomy detector fires on negated/embedded phrases and force-completes lessons
**Matrix:** High · Likely · Small · Before beta · Runtime
- **Root cause:** `AUTONOMY_RE` (now in `conversationState.ts`) matches
  "move on"/"let's continue" anywhere: *"before we move on, can you explain
  that again?"* triggers the LESSON_COMPLETE instruction — the learner asks
  for MORE help and the system advances the lesson.
- **Why permitted:** P3 shipped a substring regex without positional or
  negation guards; the Phase-H tests only cover affirmative phrasings.
- **Smallest correction:** require the match to be the message's main clause:
  message length ≤ ~60 chars OR pattern anchored near start, AND no
  question mark in the message, AND no leading "before/after/when/once".
  Add the negated fixtures to `conversationTeaching.test.ts`.
- **Ideal correction:** autonomy becomes a sensor with a confirmation
  handshake (kernel replies "want to move on? we can" and advances on the
  short affirmative), per RS provisional-advance semantics.
- **Backward compat:** yes — strictly fewer false fires.

### ISS-09 — Recovery and autonomy detection are English-only; RU/HI learners get none of P1–P5's protections
**Matrix:** High · Certain · Medium · Before beta · Educational Brain
- **Root cause:** `STRONG_PATTERNS`/`MILD_PATTERNS`/`AUTONOMY_RE` are
  English regexes; the product teaches in EN/RU/HI. A Russian child typing
  "я не понимаю" never triggers recovery, escalation, affect budgets, or
  the assessment gate driven by failure counts.
- **Why permitted:** the recovery guard was authored from English Brain
  scripts; language variants were never in its acceptance tests.
- **Smallest correction:** add RU/HI pattern sets for the 11 failure states
  + autonomy (the utterance lists exist in spirit in the Brain's scripts);
  test corpus per language.
- **Ideal correction:** per-language utterance lexicons shipped in policy
  packs (EBC S6), exactly as the verifier lexicons are specified — one
  mechanism, all languages.
- **Backward compat:** yes — additive patterns.

### ISS-10 — Three overlapping failure counters with different semantics
**Matrix:** Medium · Certain · Medium · Before beta · Runtime
- **Root cause:** `sessionFailureCount` (P1, monotone per LearnSession),
  `sessionEpisode` failure budget (lifecycle, resets at episode boundary),
  and `conversationState.consecutiveFailures` (Phase C, resets on success)
  all count "failure" from overlapping triggers. Recovery escalation reads
  #1, CLOSING reads #2, next-move reads #3 — a learner can be
  "budget-exhausted" on one counter and "fresh" on another within the same
  hour, producing incoherent turns (e.g. close-on-win block + SHOW directive
  + rung-0 recovery script simultaneously).
- **Why permitted:** three sequential additive tasks each added the counter
  it needed; no reconciliation pass was ordered.
- **Smallest correction:** derive, don't duplicate: make P2 escalation read
  the episode budget (same reset semantics as CLOSING), keep
  consecutiveFailures as the only streak counter, keep sessionFailureCount
  as telemetry only; document the mapping in code.
- **Ideal correction:** RS §3.5/§3.6/§3.8 already unify them (episode-scoped
  budget + streak); M3 adopts that shape.
- **Backward compat:** yes — snapshot fields tolerate absence by design.

### ISS-11 — Question detection proxy ('?' outside code fences) is the evidence source for the whole Phase-E machine
**Matrix:** Medium · Likely · Small · Before beta · Runtime
- **Root cause:** `repliesWithQuestion()` misses question-shaped imperatives
  ("Try computing 3×4 and tell me the result."), counts rhetorical/echo '?',
  and ignores non-Latin question punctuation. Since counters feed
  decideNextMove, systematic misses let de-facto quizzing evade the budget.
- **Why permitted:** deterministic proxy chosen deliberately (correct), but
  without a mitigation for the imperative-task loophole.
- **Smallest correction:** extend the detector with an imperative-task
  lexicon ("try/compute/calculate/solve/tell me/write") counting as asks;
  add '？' and '؟'; keep it deterministic.
- **Ideal correction:** RS's design — the MOVE is decided upstream and the
  verifier enforces conformance (V-Q2 catches TEACH-turns ending in tasks),
  making the detector a cross-check rather than the source of truth.
- **Backward compat:** yes.

### ISS-12 — No evidence spine yet: decisions are not recorded, so replay/OSF have nothing to consume
**Matrix:** High · Certain · Large · Before beta (of any EOS milestone) · Runtime
- **Root cause:** the current runtime writes evidence fragments
  (EbEvidenceEvent, TeachingStrategyEvent, signals) but no
  DecisionRecorded-equivalent with rule provenance; RS T-4 replay, OSF
  attribution, and the ADR metric are unimplementable against today's data.
- **Why permitted:** M1 (evidence spine) is correctly sequenced first in
  every roadmap — this issue exists to stop anything else being built
  before it.
- **Smallest correction:** none smaller than M1 itself; interim: start
  logging pack-equivalent version (git SHA) + prompt-block manifest per turn
  now, so today's data becomes minimally cohort-analyzable.
- **Ideal correction:** M1 as specified.
- **Backward compat:** additive.

### ISS-13 — contextSnapshot writes race under concurrent turns (lost updates)
**Matrix:** High · Possible · Medium · Before beta · Runtime
- **Root cause:** the Library persist block read-modify-writes the whole
  JSONB snapshot with `.catch(() => {})`; two in-flight turns (double-send,
  two tabs) interleave and silently drop counters/episode/conversation
  state. P1–P5 and Phases C–G all widened the blast radius by putting more
  state in the snapshot.
- **Why permitted:** the snapshot pattern predates this work; the standing
  memory explicitly parks "optimistic-concurrency hygiene" as owner-gated.
- **Smallest correction:** version field in the snapshot + conditional
  update (retry-once-from-fresh-read); or a per-session advisory lock around
  the persist stage.
- **Ideal correction:** RS M-1 (optimistic concurrency on all snapshot
  writes) at M3.
- **Backward compat:** yes.

### ISS-14 — Legacy stored messages may contain unstripped control tags; the new full-history restore now displays them
**Matrix:** Medium · Possible · Small · Before beta · Runtime
- **Root cause:** tag-stripping (SIGNAL, WE, HINT, LESSON tags) was added
  over time; messages persisted before each fix retain raw tags. The old
  30-message restore rarely surfaced them; WhatsApp-style full history now
  resurrects every legacy row into the UI.
- **Why permitted:** stripping happens at write time only; no read-time
  hygiene.
- **Smallest correction:** apply the existing strip functions defensively in
  the history endpoint's mapper (read-time, non-destructive).
- **Ideal correction:** one-off backfill script cleaning stored content
  (owner-approved, since it rewrites rows).
- **Backward compat:** yes (display-level).

### ISS-15 — First-hosted-CI baseline never captured; the type ratchet is still in bootstrap mode
**Matrix:** Medium · Certain · Small · Before beta · Testing
- **Root cause:** `scripts/ci/tsc-baseline.txt` requires one hosted CI run
  to exist (standing memory item c); until then the ratchet gates nothing.
- **Why permitted:** external-event dependency, correctly deferred, then
  forgotten across sessions.
- **Smallest correction:** trigger one hosted run; commit the baseline.
- **Ideal correction:** ratchet auto-bootstraps on first run and opens a PR
  with the baseline.
- **Backward compat:** n/a.

### ISS-16 — Capability attribution requires diagnostic items; none exist and no authoring lane produces them
**Matrix:** Medium · Certain · Large · Before beta (of capability milestones) · Educational Brain
- **Root cause:** EOS §4.2 / RS §4.11 only update capabilities strongly from
  `diagnostic: true` items; CEKR models the flag; no item bank carries it
  and the Curriculum Pipeline's asset format doesn't produce isolation
  items. Capability Memory would launch permanently UNKNOWN.
- **Why permitted:** the model was specified ahead of its instrument supply
  chain — acceptable, but the dependency was never written into the
  capability milestone's entry criteria.
- **Smallest correction:** add "≥N diagnostic items per launch capability ×
  ageBand" as an explicit gate on capability milestone M2/CEKR-M2; author
  the numeric cluster (~12 capabilities) first.
- **Ideal correction:** EBC's assessment-coverage optimizer (E-family
  checks) extended with per-capability diagnostic coverage (already
  implied by E0621's spirit).
- **Backward compat:** n/a (content).

### ISS-17 — Verifier V-STAGE/V-CAP lexicons are underspecified for non-math subjects
**Matrix:** Medium · Likely · Medium · Before beta (of M5) · Compiler
- **Root cause:** "calculation demand pattern" is well-defined for
  arithmetic; for English phonics or biology, stage-6 demands look entirely
  different, and a naive lexicon will false-REJECT legitimate PRACTICE
  content or miss violations. RS flags per-language gaps but not
  per-subject-family gaps.
- **Why permitted:** the rule codes were specified from math-flavored
  failure cases (the SI Units conversation).
- **Smallest correction:** scope V-STAGE enforcement per subject family in
  pack lexicons; LOG-only where a family's lexicon is unauthored (the same
  degradation rule RS §20 uses for languages).
- **Ideal correction:** stage lexicons authored per domain in the Brain and
  compiled (EBC S6), with false-positive corpora in T-C1.
- **Backward compat:** yes.

---

## C. FIX BEFORE PRODUCTION

### ISS-18 — Verbatim learner phrases are already persisted while the minors-privacy decision is still open
**Matrix:** High · Certain · Small · Before production · Privacy
- **Root cause:** Wave 0 + P5 write `teachingSignal.phrase` (verbatim, 200
  chars) and recovery verbatims into evidence rows today; the owner decision
  on minors' verbatim capture (flagged since 2026-07-10) remains unmade.
  Shipped behavior has outrun governance.
- **Why permitted:** each write was individually approved as implementation;
  nobody joined them to the open policy question.
- **Smallest correction:** decide the policy (owner); until then, hash-or-
  truncate phrases at ingest behind a flag defaulting to redact for
  under-16 profiles.
- **Ideal correction:** OSF §10's redaction boundary as specified (ingest-
  time PII classifier + consent tiers).
- **Backward compat:** forward-only; existing rows need a one-off review.

### ISS-19 — `/api/sessions/history` is unbounded, unindexed, and unthrottled
**Matrix:** Medium · Possible · Medium · Before production · Performance
- **Root cause:** the endpoint intentionally returns everything (task
  requirement); at 5,000+ messages that is a multi-MB JSON on every lesson
  open, the join (session.userId + subject.slug) has no covering composite
  index, and there is no rate limit on an expensive authenticated route.
- **Why permitted:** "never limit restored messages" was implemented as
  "one response," which the task's spirit (UI completeness) doesn't require.
- **Smallest correction:** cursor pagination that the client walks
  automatically until exhausted (UI still shows everything; transport is
  chunked); simple per-user rate limit.
- **Ideal correction:** + composite index on Message(sessionId,createdAt)
  path / LearnSession(userId,subjectId) (additive migration —
  owner-approved since schema changes are gated), and ETag caching since
  history is append-only.
- **Backward compat:** yes — client-internal.

### ISS-20 — No-streaming-before-verification will regress perceived latency to ~6–14 s worst case
**Matrix:** High · Likely · Large · Before production (of M5) · Performance
- **Root cause:** RS §16 forbids token streaming until the full draft
  verifies; today's UX streams-ish immediately. Correctness-over-latency is
  the right default, but nothing in the roadmap funds the compensations
  (typing indicators, early-commit REACT beat, incremental verification).
- **Why permitted:** RS §20 explicitly parks incremental verification as
  unresolved — parked ≠ scheduled.
- **Smallest correction:** implement the RS's own hint: verify-and-stream
  the REACT beat first (it is content-free by skeleton rule), then the
  MOVE; plus honest typing indicators.
- **Ideal correction:** incremental verification spec (verifier rules that
  are prefix-stable — question count and banned vocab are — can stream;
  length budget finalizes at end).
- **Backward compat:** yes.

### ISS-21 — Degraded deterministic mode (P-3/F9) has no content to degrade TO
**Matrix:** Medium · Certain · Large · Before production (of M6) · Educational Brain
- **Root cause:** LLM-down mode serves "templates + assets + scripted
  moves"; the asset catalog covers 4 concepts' worth of authored content and
  templates don't exist yet. Today the degraded mode would be an empty
  room — the panic handler works, the library is bare.
- **Why permitted:** the spec correctly separates mechanism from content;
  the content dependency was never sized.
- **Smallest correction:** per-action generic templates (27 of them) is a
  bounded authoring task — enough for a warm, teaching-shaped degraded
  session on any concept.
- **Ideal correction:** capture-on-miss flywheel (already specified) fills
  concept-specific fallbacks over time; degraded-mode drills in CI (RS
  chaos tests) verify non-emptiness per subject.
- **Backward compat:** n/a (content).

### ISS-22 — OSF gate governance is unowned
**Matrix:** Medium · Certain · Small · Before production (of any experiment) · Research
- **Root cause:** OSF defines evidence bars and protected classes but its
  own §12 leaves "who owns gate decisions" open. An experimentation program
  without a named decision authority defaults to whoever ships.
- **Why permitted:** correctly flagged as an owner decision; still a launch
  blocker for OSF-M3.
- **Smallest correction:** owner names a gate owner + a two-person rule for
  protected-class changes; recorded in the pre-registration registry spec.
- **Ideal correction:** OSF-M0 ratification includes the governance charter.
- **Backward compat:** n/a.

---

## D. CAN WAIT (tracked, not urgent)

### ISS-23 — LessonScreen.tsx is a ~3,300-line monolith carrying kernel-adjacent logic
**Matrix:** Medium · Certain · Large · Can wait · Developer Experience
- **Root cause:** years of additive sprints in one client component; it now
  contains restore, windowing, voice, vision, practice, curriculum, and
  session lifecycle concerns. Every teaching-runtime task pays a
  comprehension tax and risks UI regressions (several past incidents).
- **Why permitted:** each task was scoped "minimal and additive," which
  compounds into a monolith by policy.
- **Smallest correction:** extract the three pure clusters that already have
  clean seams (history restore + windowing; voice; practice panel) into
  hooks/components, no behavior change, snapshot-tested.
- **Ideal correction:** M3's PERCEIVE/DECIDE/RENDER split naturally thins
  the client to rendering + transport.
- **Backward compat:** yes.

### ISS-24 — The five-document set has no cross-spec conformance test making the seams executable
**Matrix:** Low · Likely · Medium · Can wait (until first implementation PR) · Testing
- **Root cause:** each spec defines its own tests; the seams (CEKR→EBC
  §12, EBC→RS packs, RS→OSF events) are specified prose with no shared
  fixture contract, so the first implementations will interpret seams
  independently.
- **Why permitted:** documents froze sequentially; a joint conformance
  fixture set was nobody's deliverable.
- **Smallest correction:** one "golden thread" fixture: a single concept
  authored as blocks → CEKR entities → pack shards → kernel decisions →
  evidence events → an EvidenceClaim — checked into the repo as data the
  moment any two adjacent layers exist.
- **Ideal correction:** the golden thread as the permanent cross-layer CI
  gate (extends RS T-3 / EBC T-C5).
- **Backward compat:** n/a.

---

## Summary matrix

| ID | Sev | Likelihood | Cost | Window | Category |
|---|---|---|---|---|---|
| ISS-07 | Critical | Certain | Architectural | Before impl (EBC) | Educational Brain |
| ISS-01 | High | Certain | Medium | Before impl | Architecture |
| ISS-02 | High | Certain | Small | Before impl | Architecture |
| ISS-04 | High | Certain | Small | Before impl | Research |
| ISS-08 | High | Likely | Small | Before beta | Runtime |
| ISS-09 | High | Certain | Medium | Before beta | Educational Brain |
| ISS-12 | High | Certain | Large | Before beta | Runtime |
| ISS-13 | High | Possible | Medium | Before beta | Runtime |
| ISS-18 | High | Certain | Small | Before production | Privacy |
| ISS-20 | High | Likely | Large | Before production | Performance |
| ISS-03 | Medium | Likely | Medium | Before impl | CEKR |
| ISS-05 | Medium | Certain | Small | Before impl | Documentation |
| ISS-06 | Medium | Certain | Small | Before impl | Documentation |
| ISS-10 | Medium | Certain | Medium | Before beta | Runtime |
| ISS-11 | Medium | Likely | Small | Before beta | Runtime |
| ISS-14 | Medium | Possible | Small | Before beta | Runtime |
| ISS-15 | Medium | Certain | Small | Before beta | Testing |
| ISS-16 | Medium | Certain | Large | Before beta | Educational Brain |
| ISS-17 | Medium | Likely | Medium | Before beta | Compiler |
| ISS-19 | Medium | Possible | Medium | Before production | Performance |
| ISS-21 | Medium | Certain | Large | Before production | Educational Brain |
| ISS-22 | Medium | Certain | Small | Before production | Research |
| ISS-23 | Medium | Certain | Large | Can wait | Developer Experience |
| ISS-24 | Low | Likely | Medium | Can wait | Testing |

**Highest-leverage immediate actions (owner decisions):** ISS-18 (privacy —
shipped behavior vs open policy), ISS-08 + ISS-09 (small fixes protecting
real learners today), ISS-07 pilot slice (unblocks the entire compiler
program), ISS-01/02/04 spec bugs (an afternoon of spec work that prevents
months of divergence).

*End of register v1.0.0. This document audits; it changes nothing. Each fix
remains individually gated per standing governance.*
