# Duplication Audit

A systematic comparison of every place two or more files address the
same content. The question for each: is this **proper layering** (the
same underlying truth appearing in different functional roles — as
detection, as procedure, as standing state, as concept-specific
application) or **real redundancy** (the same rule in the same role in
two places, where one should cite the other)?

The distinction matters because the authoring rules require
self-containment (each file must stand alone) — which means restating
dependencies is expected and correct. What is NOT correct is when two
files each try to OWN the same rule. Proper self-containment restates
what a file DEPENDS ON; real redundancy is when two files each claim to
DEFINE the same thing.

---

## §1. Proper layering — confirmed not duplication

### 1a. Misconception knowledge across five files

Misconception content appears in: `../decision-engine/02 §1` (detection
signals), `../assessment/03` (probe design), `../student-state/03` (per-
learner ledger), `../concepts/` entries (per-concept misconception
libraries), and `../decision-engine/04` filter 2 (routing to
misconception track).

**Verdict: PROPER LAYERING.** Each file owns a different functional
role:
- 02 owns: WHAT signals indicate a misconception IS FIRING NOW (the
  moment-to-moment detector)
- 03 owns: HOW to design probes that surface misconceptions (the
  diagnostic instrument)
- student-state/03 owns: WHERE the ledger of THIS LEARNER'S
  misconceptions lives (the standing record)
- concepts/ entries own: WHICH misconceptions to expect on THESE
  CONCEPTS and HOW to repair them (the concept-specific content)
- 04 filter 2 owns: WHEN in the funnel to route to the misconception
  track (the dispatch decision)

None of these files defines what the others define. Each is indispensable;
deleting any one removes a functional layer, not a duplicate.

### 1b. Recovery across four files

Recovery content appears in: `../decision-engine/01 §4` (RECOVERY state
definition, entry/exit rules), `../decision-engine/03` (recovery
preemption in decision matrix), `../first-lesson/05` (lesson-one
recovery deltas), and `../student-state/06 §7` (personalized recovery
list in emotional model).

**Verdict: PROPER LAYERING.**
- 01 §4 owns: WHAT the recovery STATE is — definition, entry trigger,
  exit rule (one step below, after affect restored + one success)
- 03 owns: WHERE in the decision process recovery takes priority
  (affect-band preemption rule)
- first-lesson/05 owns: HOW recovery differs specifically in lesson one
  (the locked configuration + "I'm scared/I'm stupid" scripts)
- student-state/06 §7 owns: WHICH recovery actions work for THIS LEARNER
  specifically (the personalized what-restores list)

These are genuinely different layers. The exit rule "one step below
entry" is stated in 01 §4 (authoritative) and referenced by implication
in student-state/06 §7. One owns it; one uses it. That is self-
containment, not redundancy.

### 1c. Fear/affect across five files

Fear appears in: `../decision-engine/02 §1` (FEARFUL state signals),
`../decision-engine/03` (affect-band preemption), `../student-state/04`
(confidence profile — chronic correct-but-afraid), `../student-state/06`
(emotional model triggers), and `../first-lesson/01 §6` (beginner
emotional protection imperative).

**Verdict: PROPER LAYERING.**
- 02 §1 owns: the momentary read (THIS TURN, is this learner fearful?)
- 03 owns: the priority rule (fear overrides everything else)
- student-state/04 owns: the standing calibration pattern (chronic
  correct-but-afraid as a profile trait, not a moment)
- student-state/06 owns: the standing emotional model (imported history,
  triggers, recovery speed — the climate behind the weather)
- first-lesson/01 §6 owns: why the first session's emotional design
  matters — installing fear vs. installing safety is the
  beginner-session's most important output

The weather/climate distinction (`../student-state/README`) is exactly
the architectural rule that makes this layering correct, not redundant.

### 1d. "Demonstrate before explain" across three files

The demonstrate-before-explain principle appears in:
`../decision-engine/01 §3` (INTRODUCTION → DEMONSTRATION transition
rule), `../first-lesson/04 §1` (corrected flow: demonstrate before
explain — law for novices), and `../concepts/` seed entries (dispatch
orders all lead with demonstration).

**Verdict: PROPER LAYERING.**
- 01 §3 owns: the universal transition rule (for all learners at this
  concept)
- first-lesson/04 §1 owns: the locked version for novices specifically
  (with "law" emphasis and the exception for expert-frame learners)
- concepts/ entries own: the concept-specific application (what
  demonstrating THIS concept looks like)

One principle, three levels of specificity. The principle is stated in
01; the other files apply it. Self-containment requires re-stating a
dependency; none claims to define the principle uniquely.

### 1e. Burst limits / cognitive load limits across three files

Limits appear in: `../decision-engine/01 §3 EXPLANATION` (≤2 sentences
beginners, ≤4 established learners), `../first-lesson/02` (hard limits:
≤3 new words ×3 uses, 2-sentence bursts), `../assessment/01 §4`
(transience effect noted — performance degrades after the session ends).

**Verdict: PROPER LAYERING.**
- first-lesson/02 owns the lesson-one specific numbers (the locked
  configuration)
- 01 §3 owns the general burst-limit rule (applicable outside lesson one)
- assessment/01 §4 notes the transience effect as a consequence of
  exceeding limits (a downstream result, not a definition of the limit)

The first-lesson/02 numbers ARE the decision-engine/01 §3 limits
applied to lesson one — a special case of a general rule. The numbers
are consistent, not redundant.

---

## §2. Real redundancy — confirmed and resolved

### 2a. The latency × correctness grid restated from memory

**What it is**: The 2×2 grid (fast+correct=fluent; slow+correct=
consolidating; fast+wrong=misconception; slow+wrong=gap) is the single
most-used diagnostic instrument in the Brain (`../assessment/README`).
It is cited in: `../assessment/README` ("the single most-used diagnostic
instrument"), `../decision-engine/02 §1` (the MISCONCEIVING detection
signal uses fast wrong as its anchor), `../student-state/04 §3`
(calibration pair scoring reads from it), and `../first-lesson/`
implicitly.

**The problem**: The grid is described as "Delivery 1, Voice Model" —
pending transcription. All four citing files restate it from memory in
slightly different words. When `foundations/` is authored and the grid is
formally transcribed, those in-text restatements will become redundant
duplication: each one is now DEFINING the grid from memory rather than
citing a canonical source.

**Resolution when it arises**: When the grid is transcribed to
`foundations/voice-model.md` (or equivalent), each citing file should
replace its restatement with a one-line cite: *"(Delivery 1 latency ×
correctness grid — `../foundations/voice-model.md`)"* and drop the
content. The content belongs in one place.

**Current status**: Not a problem yet — no canonical source exists to
cite. It becomes a problem the moment Delivery 1 is transcribed. This
resolution protocol should be applied as part of the Delivery 1
transcription work, not after.

### 2b. Universal Teaching Principle restatements

**What it is**: The 23 Universal Teaching Principles are cited as
UP-1, UP-3, UP-5, UP-7, UP-8, UP-17, UP-19, UP-22, and others
throughout the Brain. In many places, the principle's content is
partially restated inline: "Universal Principle 17 (never certify
same-session mastery)", "Universal Principle 5 (no content enters a
flooded mind)", "Universal Principle 22 (fast-wrong ≠ slip; slow-right
≠ mastery)".

**The problem**: The parenthetical restatements are currently the only
authored form of these principles' content. When `principles/` is
transcribed (Delivery 2 §10), the canonical content will exist
separately — and the parenthetical restatements will become partially-
redundant inline copies with no authority guarantee (the parenthetical
may have been paraphrased from memory; the transcribed version is
authoritative).

**Resolution when it arises**: Same protocol as 2a. When `principles/`
is authored, every cite-with-restatement should become cite-only. The
principle number and file reference are sufficient; the content belongs
in `principles/`. This is the transcription team's task, not an error
to fix today.

**Current status**: The inline content is a useful stand-in while the
canonical source is missing. It becomes redundant the moment the
canonical source exists.

---

## §3. Minor cross-reference gaps (not duplication; structural)

These are cases where one file SHOULD cite another but the cross-
reference is missing or implicit. They are not redundancy problems — they
are navigation problems.

| Gap | Description | Resolution |
|---|---|---|
| RECOVERY exit rule stated twice | `../decision-engine/01 §4` (authoritative) and `../student-state/06 §7` (restated as if defining) | student-state/06 §7 should cite 01 §4 as the authority on exit mechanics; it should only own the personalized recovery-list content |
| 8-strategy set implicit in 07 | `../decision-engine/08 §2` names all 8 strategies authoritatively; `../decision-engine/07` describes the same set through the lesson-planning decisions without naming the set | 07 should open its planning logic with "the planning engine maps its decisions to the 8-strategy set (08 §2)" |
| Assessment stop rule in two files | `../assessment/05 §4` (adaptive stop rule) and `../decision-engine/07` (session planning engine references the stop rule) | 07 should cite 05 §4 explicitly rather than restating |
| "One action per turn" | Stated in `../decision-engine/04` standing rules and implied again in `../decision-engine/06 §1` (quiz register detection: "ten takes in a row with no give") | Not a true conflict; one is a rule, the other is the symptom of violating it. No change needed. |

These gaps are low priority. They don't cause incorrect teaching
behavior; they make the Brain slightly harder to navigate. Resolve
during the next pass over each file.

---

## §4. Structural summary

| Category | Count | Action required |
|---|---|---|
| Proper layering — confirmed | 5 | None — these are the architecture working correctly |
| Real redundancy — latency × correctness grid | 1 | Apply resolution protocol at Delivery 1 transcription time |
| Real redundancy — Universal Principles inline restatements | 1 | Apply resolution protocol at Delivery 2 §10 transcription time |
| Minor cross-reference gaps | 4 | Resolve during next editorial pass |

The Brain is structurally clean. Both real redundancy issues are
predictable and resolve naturally at Delivery 1/2 transcription time
— they are a design pattern that should be understood in advance, not
a maintenance crisis. The five proper layering findings confirm that the
Brain's architecture of nested scopes (universal rule → locked
configuration → concept-specific application → per-learner state) is
working as designed.
