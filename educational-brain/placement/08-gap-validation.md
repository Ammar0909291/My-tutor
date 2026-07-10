# Gap Validation — Against the Project Vision

The vision states seven requirements (from the Delivery 10 prompt).
Each is answered here: can this learner now enter anywhere? Can the
tutor avoid wasting time? Can mastered knowledge be skipped?

---

## 1. Vision validation

### "Can a learner enter anywhere inside the curriculum?"

**Yes — with high confidence.** The placement protocol (03) locates the
category-level frontier using binary search on cut-nodes, regardless of
where in the curriculum that frontier falls. A learner who is mid-way
through the curriculum can be placed accurately without running through
all prior content. The per-branch placement (03 §7) handles asymmetric
learners (strong in one branch, weak in another) without forcing a single
scalar placement.

**Remaining gap**: For subjects where the KG's cut-node list has not
been explicitly authored (currently all subjects except mathematics with
its `learner_tracks.json`), the placement engine uses the derivable proxy
(>15% downstream-disconnection threshold, 03 §3). This works but is less
precise than an authored cut-node list. Authoring the cut-node list for
each subject is a Curriculum Production Pipeline task, not a Brain
authoring task.

### "Can the tutor avoid wasting time?"

**Yes — as long as the placement is accurate.** ANCHORED categories are
never entered as content (04 §1, never-reteach law). PROBABLE categories
get a single warm-up item before being used as prerequisite foundations.
The session plan reads the progression engine's category confidence levels
and constructs a session with only the frontier category as CORE content.

**Remaining gap**: The initial placement is a probabilistic estimate
backed by 3–6 probes. The confidence levels (ANCHORED/PROBABLE/UNCERTAIN/
UNKNOWN) are starting estimates, not verified mastery. As teaching
accumulates evidence, the estimates refine. The first 2–3 sessions after
placement may have some inefficiency as the estimate is calibrated.
This is normal and acceptable: the alternative (an exhaustive placement
test covering every concept) would take hours and violates the affect
budget (`../assessment/02 §6`).

### "Can the tutor skip mastered knowledge?"

**Yes — for ANCHORED categories.** Gate concepts at AUTOMATIC + STABLE,
with transfer evidence: the category is never entered as content. The
compaction protocol (`../decision-engine/07 §3`) handles in-session
skipping when the placement proves to be too conservative.

**Remaining gap**: PROBABLE categories are not fully skipped — they get
a warm-up item. The warm-up is designed to be minimal (one retrieval
item, 30 seconds) but it is not zero. A system that could certify
PROBABLE as ANCHORED faster would be more efficient. Faster certification
requires more evidence — which requires more teaching interactions.
There is no shortcut that doesn't require either an extensive placement
test or accumulated evidence from sessions. The current protocol makes
the right trade-off.

### "Can the tutor repair only missing knowledge?"

**Yes — the regression repair protocol targets specific gate concepts**
(05 §4). When demotion fires, the repair identifies the specific
concepts that failed and addresses only those. Adjacent mastered concepts
in the same category are never retaught; they are used as repair
anchors. The misconception repair track (`../student-state/03`,
`../decision-engine/01 §5`) similarly targets specific misconceptions,
not the whole category.

**Remaining gap**: the patchy-history flag (03 §6) requires "just-in-time
repair" of prerequisite gaps that are not currently blocking but will
become blocking later (05 §5). The current engine identifies that such
gaps exist and records them; the schedule for addressing them is
determined by the lesson-planning engine (`../decision-engine/07`).
The planning engine currently has the compaction and review-injection
protocols but does not have explicit "just-in-time prerequisite repair"
scheduling rules authored. This is a cross-engine gap.

### "Can the tutor continue naturally?"

**Yes — for learners whose progress is uninterrupted.** The PROBABLE
category protocol (one warm-up item, then resume) is invisible to the
learner. The promotion announcement (05 §1) is brief and plain. The
session shape (`../decision-engine/07 §1`) is invariant.

**For returning learners**: Yes — the resumption protocol (06) is
designed to feel natural. The warm-up framing ("let's see what comes
back") is not pedagogically different from a normal session OPENING.
The cascade-unlock is experienced as natural recall, not as a formal
assessment.

---

## 2. The human tutor check

**Would the world's best human tutor restart from lesson one?**

Never. A great human tutor:
1. Asks a few targeted questions within the first 5 minutes
2. Forms an estimate of the frontier
3. Begins teaching at that estimate
4. Adjusts in real time if the estimate was wrong

The placement engine does exactly this: three-bracket verification (3
items in the first few minutes), binary-search spine probing (8–10 items
to locate the frontier in a 1,000-concept subject), first-session start
at the identified frontier, real-time adjustment via the compaction
protocol and prerequisite micro-diagnosis.

**What the human tutor does that is not yet fully authored:**

The experienced human tutor reads social/contextual signals to calibrate
the placement before running any probe: the learner's vocabulary as they
describe their history, their confidence in making claims, the specificity
of their descriptions ("I got to quadratics" vs. "I did some algebra").
These are additional trust-calibration signals that narrow the initial
hypothesis before the first probe. They are not authored in `02-level-
hypothesis.md` — that file focuses on the formal trust model. A richer
vocabulary-and-confidence-signal detection protocol would reduce the
number of probes needed. This belongs in a future revision of 02.

---

## 3. Remaining gaps — recorded

| Gap | Impact | Location for future authoring |
|---|---|---|
| Subject cut-node lists not yet authored | Placement is less precise for non-mathematics subjects | Curriculum Production Pipeline task; per-subject concept entries |
| Just-in-time prerequisite repair scheduling | Prerequisite gaps identified but not yet integrated into the lesson-planning schedule | `../decision-engine/07` — needs a scheduled-prerequisite-probe rule |
| Informal vocabulary/confidence signal detection during self-report | Reduces probe count needed; not yet authored | `02-level-hypothesis.md` §1 revision |
| Placement for complete beginners | First-lesson protocol (`../first-lesson/`) covers this; but the placement engine currently defers to that document without explicit integration rules | A note in `01-foundations.md` that first-lesson = placement at Category 0 (before the curriculum's first concept) |
| Multi-subject session planning | When a learner studies 2+ subjects, the session plan must choose which subject's frontier to work on each session; the current planning engine (`../decision-engine/07`) does not author this choice rule | `../decision-engine/07` needs a multi-subject scheduling rule |
| The "Expert" level from the prompt | The prompt specifies four levels (Beginner/Intermediate/Advanced/Expert) but the platform offers three (Beginner/Intermediate/Advanced). Expert is mapped to Advanced in the current runtime. The Brain should author what an Expert placement looks like: heavy emphasis on transfer and generative evidence; compaction from the entry point; misconception detection on assumed-solid prerequisites. | `02-level-hypothesis.md` §2 trust table — add Expert row |

---

## 4. Integration with existing Brain systems — confirmed clean

| System | Integration point | Status |
|---|---|---|
| `../assessment/02` | Placement protocol uses binary-search (§2–8) | Fully referenced; not duplicated |
| `../student-state/02` | Knowledge ladder provides concept-level rungs that category mastery aggregates | Fully referenced; category confidence is a derived view over concept rungs |
| `../student-state/07` | Memory statuses drive category confidence decay | Fully referenced; warm-up/cued-recovery flows from memory statuses |
| `../decision-engine/07 §3` | Compaction protocol handles in-session misplacement correction | Fully referenced; no new logic needed |
| `../first-lesson/01 §4–5` | False-beginner detection rules used in `02 §1` | Reused; not duplicated |
| `src/lib/curriculum/placement.ts` | Runtime implementation uses difficulty-floor as proxy | The Brain authors the fuller pedagogical model; the runtime will eventually retrieve category confidence levels from the student state store |

---

## 5. What the runtime must implement to use this engine

**Educational Brain knowledge is authored; runtime implementation is
governed by the G1/G2 governance gate** (`CLAUDE.md`). These are the
implementation requirements the Brain has designed for, without
implementing:

1. **Category confidence levels in the student state store** (ADR 10's
   `ConceptMasteryRecord` is concept-level; category confidence is a
   derived aggregation view that the runtime must compute and cache)
2. **The per-branch frontier record** in the student model
3. **Miscalibration direction** as a persistent learner model field
4. **The patchy-history flag** and its just-in-time repair schedule
5. **High-water mark per concept** (ADR 10 notes this; needs to be
   surfaced as a queryable field)

None of these require new curriculum or KG changes. All are student-
state extensions within the architecture ADR 10 already defined.
