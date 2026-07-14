# Session Simulations — Full Decision Trace

Three complete teaching sessions, every turn traced through the full
stack: **Student State → Decision Engine → Concept Entry → Teaching
Action → Assessment → Recovery (if fired) → Voice Rules → Tutor
Response**. For each decision the trace names exactly where the rule is
stored. Where it is stored in a pending-transcription Delivery, that is
recorded as a gap.

The three sessions were chosen to exercise the complete state space: a
fearful beginner (lesson one), a misconceiving intermediate learner, and
a bored advanced learner. Together they touch every major machine state,
every priority band, and all three seed concept entries.

---

## Session A — `eng.phonics.letter-sound-correspondence`, age 6, lesson one, FEARFUL

**Context**: The child's first ever phonics lesson. No prior teaching on
this concept. Parent is present. The child has whispered through
everything so far.

---

### Turn A-1

**Student utterance**: [tutor asks the child to try making the /m/ sound;
child whispers] "I don't know..."

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | FEARFUL — stated failure state ("I don't know") accepted instantly and overrides all other reads | `../decision-engine/02 §4` rule 4: stated failure state accepted at face value, never argued with |
| Priority | Affect band fires; cognitive and drive bands do not run | `../decision-engine/02 §2` priority ordering |
| Teaching State | RECOVERY — preempts the current state (INTRODUCTION) unconditionally | `../decision-engine/01 §4`: RECOVERY entered from ANY state on failure-state utterance |
| Decision Matrix | RECOVERY preempted; matrix does not select a teaching action | `../decision-engine/03 §0` affect-band preemption rule |
| Recovery Script | [**GAP**: the actual script is the Recovery Engine, Delivery 1, pending transcription] | `../decision-engine/01 §4` cites the Recovery Engine; first-lesson/05 §2 provides the lesson-one delta only ("I'm scared / I'm stupid" variants) |
| Lesson-one delta | "I'm scared" script applies: demonstrate more, ask less; tutor does not ask for another attempt | `../first-lesson/05 §2` |
| Teaching Action | No action funnel runs; RECOVERY preempts it entirely | `../decision-engine/04` standing rules: "RECOVERY and REVIEW are not selected — they are scheduled" |
| Assessment | None — assessment defers to recovery unconditionally | `../assessment/README`: "Assessment defers to it unconditionally" |
| Voice Rules | Wait time honored; tutor does NOT ask another question; genuinely stops after one warm statement | `../decision-engine/08` step 6; `../first-lesson/03 §4`; [**GAP**: exact wait-time calibration rules, Delivery 1 Voice Model, pending] |
| Learner Model Update | State estimate: FEARFUL, confidence high; session failure-state budget: 1 spent; recovery event logged | `../decision-engine/08 §3` |
| Tutor Response | [Warm safety script; no question; names the win if there is one] — **surface wording INVENTED** (the authorized residue, `../decision-engine/08 §4`) |

**Gaps surfaced this turn:**
- Recovery Engine scripts (Delivery 1 pending)
- Wait-time calibration by learner type (Delivery 1 Voice Model pending)

---

### Turn A-2

**Student utterance**: [after tutor models the /m/ sound twice without
asking] Child mirrors, whispers "/mm/..." — correct.

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | FRAGILE — right answer with whispered, rising-intonation delivery; hesitant-correct | `../decision-engine/02 §1`: "right answers with rising intonation, hedges" |
| Priority | Affect band: no longer firing (FEARFUL resolved by recovery). Cognitive band: FRAGILE | `../decision-engine/02 §2` |
| Teaching State | GUIDED, sub-step: echo (lowest sub-step for lesson one) | `../decision-engine/01 §3 GUIDED`; `../first-lesson/04 §1`: echo → supported → prompted |
| Decision Matrix | GUIDED + FRAGILE → HOLD (same sub-step, next rep) | `../decision-engine/03` |
| Teaching Action | **Filter 1**: concept entry dispatch — `eng.phonics.letter-sound-correspondence.md` names voice-mirror as primary action; echo sub-step maps directly; **Filter 4**: voice-required concept → oral forms only; → another voiced repetition | `../decision-engine/04` filters 1 and 4; `../concepts/english/eng.phonics.letter-sound-correspondence.md` |
| Assessment | OBSERVATION stance — silent watching while child processes; zero-cost diagnosis | `../decision-engine/01 §3 OBSERVATION`; `../assessment/02 §7` |
| Voice Rules | Tutor voices next sound and invites echo with one word — no question; wait time honored | `../first-lesson/02` (≤3 words, 2-sentence bursts); `../first-lesson/03 §4` (wait time); [**GAP**: exact wait duration, Delivery 1 pending] |
| Learner Model Update | Latency logged; calibration pair: stated/behavioral confidence (whispered) × correct | `../decision-engine/08 §3` |
| Tutor Response | [One-word invite, voiced model] — **surface wording INVENTED** |

**Gaps surfaced this turn:**
- Wait-time calibration
- Universal Teaching Principle 17 (cited as "never certify same-session mastery") — named but not in tree (Delivery 2 §10 pending)

---

### Turn A-3

**Student utterance**: Child echoes the same sound, louder, with a
self-correction mid-echo (starts hesitant, settles into the right place).

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | FRAGILE still (one success; fluent requires fast + flat + correct; self-correction counts as processing load) | `../decision-engine/02 §1 FRAGILE`; `../decision-engine/02 §1 CONFIDENT` (threshold: three fluent successes) |
| Teaching State | GUIDED, sub-step: echo → supported (self-correction is evidence of emerging control; advance sub-step silently) | `../decision-engine/01 §3`: "sub-step up on each success" |
| Decision Matrix | GUIDED + FRAGILE → HOLD (stay in GUIDED, advance sub-step) | `../decision-engine/03` |
| Teaching Action | **Filter 1**: entry dispatch for supported sub-step; **Filter 4**: oral only; → supported attempt (tutor begins the sound with the child, then fades) | `../decision-engine/04` filter 1; `../first-lesson/04 §1` supported sub-step definition |
| Assessment | OBSERVATION; still invisible (lesson-one rule: never test-shaped) | `../assessment/07 §2` age rule; `../first-lesson/02` |
| Learner Model Update | Sub-step position updated; self-correction logged as positive metacognitive event | `../decision-engine/08 §3`; `../student-state/05` behaviour profile |
| Tutor Response | [Supported invitation] — **surface wording INVENTED** |

---

### Turn A-4 (reaching INDEPENDENT)

**Student utterance**: [supported attempt] Correct, faster, flat tone —
the whisper is gone.

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | Edge of FRAGILE→CONFIDENT; not yet (two fluent successes, not three) | `../decision-engine/02 §1` |
| Teaching State | GUIDED → advance to prompted (not yet INDEPENDENT; one more sub-step) | `../decision-engine/01 §3` sub-step ladder |
| Decision Matrix | GUIDED + FRAGILE-trending → ADVANCE (sub-step only; not machine advance) | `../decision-engine/03` |
| Teaching Action | Filter 1: prompted sub-step → tutor asks "your turn" without modeling | `../first-lesson/04 §1` prompted definition |
| Assessment | Still OBSERVATION; one result is weather, not climate | `../decision-engine/02 §4` rule 3: trends beat snapshots |
| Tutor Response | [Single-word invitation to solo] — **surface INVENTED** |

---

### Turn A-5 (INDEPENDENT rep)

**Student utterance**: [solo] "/mmm/" — correct, confident, unprompted.

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | CONFIDENT (fast + flat + correct; three reps total including the supported ones) | `../decision-engine/02 §1 CONFIDENT` |
| Teaching State | GUIDED → INDEPENDENT (fluent success at top sub-step) | `../decision-engine/01 §3`: "→ INDEPENDENT on fluent success at top sub-step" |
| Decision | Beginners: exactly ONE solo, then bank the win | `../decision-engine/01 §3 INDEPENDENT`: "Beginners: exactly one solo, then bank the win" |
| Teaching State | After one solo → ASSESSMENT (gate components: C1 of the lesson-one completion criteria) | `../decision-engine/01 §3 INDEPENDENT → ASSESSMENT` |
| Assessment | **Invisible** — no "let me test you" framing; tutor registers the success as the assessment | `../assessment/07 §2`; `../first-lesson/04 §3` C1: independent production of the target sound |
| Lesson-one completion | C1 met (in-session solo); C2 (next-session retrieval) cannot be met today — lesson one formally completes at lesson two's opening | `../first-lesson/04 §3` |
| Teaching State | ASSESSMENT → TRANSITION → CLOSING (lesson is done — exactly one rep, bank the win) | `../decision-engine/01 §3 ASSESSMENT → TRANSITION`; `../decision-engine/01 §2 CLOSING` |
| Close script | 30-second scripted close: name what was done, forecast next, one open loop | `../first-lesson/03 §9`; `../decision-engine/01 §2 CLOSING` |
| Learner Model Update | Knowledge ladder: rung 3–4 (produced in context); memory status: RECENTLY-LEARNED (C2 not yet run) | `../student-state/02`; `../student-state/07 §1` |
| Tutor Response | [Close script] — **surface wording INVENTED** |

**Session A summary — gaps found:**
1. Recovery Engine scripts (every recovery turn)
2. Wait-time calibration rules per learner type
3. Universal Teaching Principle contents (named throughout; not in tree)

---

## Session B — `math.arith.fractions`, adult returning learner, MISCONCEIVING

**Context**: Adult learner returning after years away. Last session
established that fractions existed; this session, while working on
fraction addition, the learner confidently produces the additive error.

---

### Turn B-1

**Student utterance**: "The answer's 2/5. You add the tops and the
bottoms. It's simple."

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | MISCONCEIVING — fast wrong answer, flat confident delivery, characteristic phrase from misconception library ("add the tops and the bottoms" = M1 signature) | `../decision-engine/02 §1 MISCONCEIVING`; `../concepts/mathematics/math.arith.fractions.md` misconception library M1 |
| Priority | Cognitive band: MISCONCEIVING selected; no affect-band fires | `../decision-engine/02 §2` |
| Decision Matrix | GUIDED state + MISCONCEIVING → route to misconception track **at the next natural seam**, NOT an immediate correction | `../decision-engine/02 §1 MISCONCEIVING`: "never spot-correct — route to the misconception track at the next natural seam" |
| Misconception track | elicit → commit → collide → replace → contrast → apply → re-probe (7-step sequence) | [**GAP**: full sequence belongs to Delivery 2 §4 misconception evolution science, pending transcription; referenced but not authored in tree — concepts/ entry has the repair track for this concept only] |
| Teaching Action | At current seam: COMMIT step — get the learner to apply their rule to a case that will collide visually | `../decision-engine/04` filter 1: entry dispatch for MISCONCEIVING state; filter 2: misconception → prediction + collision |
| Concept Entry | math.arith.fractions.md commit move: "So with 1/4 + 1/4, using your rule — what do you get?" | `../concepts/mathematics/math.arith.fractions.md` |
| Assessment | Probe designed to commit — NOT to test comprehension; no right/wrong framing yet | `../assessment/03`: commit before collision; never correct immediately |
| Voice Rules | Flat, neutral delivery; no rising intonation that signals "trick question" | [**GAP**: prosody rules for misconception commit are not authored in tree; Delivery 1 Voice Model pending] |
| Learner Model Update | Misconception M1 recorded: strength ACTIVE; verbatim phrase logged ("add the tops and the bottoms"); first occurrence this session | `../student-state/03` misconception ledger |
| Tutor Response | [Commit question — exact phrase from concept entry] — **wording is RETRIEVED from concept entry for this exact misconception**; delivery prosody INVENTED |

**Retrieved/invented status**: The question itself is retrieved (concept
entry); the prosody is invented (pending Voice Model).

---

### Turn B-2

**Student utterance**: "Uh... 2/8? Wait, that doesn't seem right with
your rule either."

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | CONFUSED (productive) — "wait" + partial revision = engaging hesitation, thread still held | `../decision-engine/02 §1 CONFUSED`: "effortful hmm, self-talk, partial attempts revised mid-flight"; explicitly distinguished from overload ("confusion still holds the thread") |
| Priority | Cognitive: CONFUSED selected | `../decision-engine/02 §2` |
| Decision Matrix | GUIDED + CONFUSED → resolve by changed representation | `../decision-engine/03` |
| Misconception track | The collision is working; do NOT interrupt — the learner is already beginning to doubt | [Delivery 2 §4 pending: the collision step requires NOT resolving too fast] |
| Teaching Action | **Filter 1**: entry dispatch: area model (for visual learners); fair-share story (for narrative learners); select based on history | `../decision-engine/04` filter 1 and filter 5 (personal affinity from `../student-state/08`) |
| Concept Entry | Area model or fair-share pizza — both in math.arith.fractions.md concrete referents | `../concepts/mathematics/math.arith.fractions.md` |
| Assessment | OBSERVATION stance only — watch the productive confusion; do not close it with a question | `../decision-engine/01 §3 OBSERVATION` |
| Voice Rules | Slower, quieter; let the silence breathe | `../decision-engine/08` step 6; [exact calibration: Delivery 1 pending] |
| Learner Model Update | CONFUSED state logged; misconception M1 strength: "wobbling" (not WEAKENED yet — one doubt, not a sustained pattern) | `../student-state/03` misconception ledger lifecycle |
| Tutor Response | [Concrete referent introduction — partially scripted from concept entry; phrasing INVENTED] |

---

### Turn B-3

**Student utterance**: "Oh — because if I eat a quarter of a pizza and
then another quarter I've eaten HALF. Not one eighth. Okay, I see it."

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | CURIOUS (energy up after a reveal; "oh" + unprompted re-derivation) | `../decision-engine/02 §1 CURIOUS` |
| Decision Matrix | GUIDED + CURIOUS → feed the chain — give the contrast step now, not later | `../decision-engine/03`; `../decision-engine/02 §1 CURIOUS`: "feed the chain — answer now or hook the question into the lesson" |
| Misconception track | Contrast step: show the valid method directly adjacent to the failed method | [Delivery 2 §4 step 4 pending; concept entry carries the contrast script for this concept] |
| Teaching Action | Filter 1: entry dispatch = contrast after collision; → valid method demonstration | `../concepts/mathematics/math.arith.fractions.md` |
| Assessment | One insight is weather; run the re-probe after teaching (assessment/03: never assess same-session misconception repair) | `../assessment/03`; `../assessment/05 §2 law`: "never certify same-session mastery" |
| Learner Model Update | CURIOUS state logged; misconception M1 strength: WEAKENED (collision delivered, contrast shown) | `../student-state/03` |
| Tutor Response | [Contrast delivery from concept entry script; specific wording INVENTED] |

**Session B summary — gaps found:**
1. Full 7-step misconception repair sequence (Delivery 2 §4 pending — concept entry has the concept-specific track but not the universal engine rules)
2. Misconception regrowth and regression rates (Delivery 2 §4 pending)
3. Prosody rules for misconception handling (Delivery 1 pending)

---

## Session C — `phys.mech.newtons-first-law`, age 14, BORED

**Context**: Established learner, this concept was taught last week.
Opening retrieval confirmed fluency. The learner is now coasting.

---

### Turn C-1

**Student utterance**: [instant correct, flat voice] "Yeah. Objects in
motion stay in motion. Unless something stops them. F=ma. Can we do
something harder?"

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | BORED or DISENGAGED masking a gap — the two are clinically identical on surface behavior; one stretch item disambiguates | `../decision-engine/02 §1 BORED`: "one stretch item disambiguates — the bored eat it, the avoidant deflect" |
| Priority | Drive band (BORED) or affect (DISENGAGED); must disambiguate before treating | `../decision-engine/02 §2`; `../decision-engine/02 §4` rule 1: probe before big intervention |
| Decision Matrix | GUIDED (review) + BORED → stretch item to diagnose | `../decision-engine/03`; `../decision-engine/07` compaction protocol |
| Teaching Action | One unusual application — not in the lesson plan; off the beaten conceptual path | `../decision-engine/04` filter 7: prediction-first compatible; filter 6: full headroom → high-germane end |
| Concept Entry | phys.mech.newtons-first-law.md: transfer targets include orbital mechanics — why do astronauts float? | `../concepts/physics/phys.mech.newtons-first-law.md` |
| Assessment | Formative within the stretch — the stretch IS the diagnostic probe | `../assessment/05 §4` adaptive stop rule |
| Tutor Response | [Orbital question — frame from concept entry; specific wording INVENTED] |

---

### Turn C-2

**Student utterance**: "Because they're falling — they're just falling
fast enough that the Earth curves away at the same rate. So they're
weightless because there's no reaction force from a surface. Newton's
third law applies to the orbit geometry." [unprompted extension to N3]

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | BORED confirmed (ate the stretch); unprompted extension to adjacent concept = CURIOUS + CONFIDENT | `../decision-engine/02 §1 BORED`: "the bored eat it" |
| Knowledge state | This concept: gated. Transfer target activated. | `../student-state/02` (knowledge ladder position); `../student-state/09 §1` (velocity high) |
| Decision Matrix | CONFIDENT + CURIOUS, core complete → offer STRETCH; compaction of remaining plan; advance to next concept | `../decision-engine/03`; `../decision-engine/07 §5` compaction protocol |
| Compaction | Offer the next concept or a test-out; do not drill a mastered concept | `../decision-engine/07 §5`; [**GAP**: Delivery 2 §9 gifted-learner persona handling pending — the specific compaction offers for this persona type] |
| Assessment | Gate-level evidence review: is the delayed component satisfied? Was the probe accepted outside home context (spontaneous extension = transfer evidence)? | `../assessment/05 §2 level 10`: spontaneous-use event; `../assessment/05 §3` gate review |
| Memory status | STABLE → TRANSFERABLE (spontaneous application beyond home context) | `../student-state/07 §1` TRANSFERABLE definition |
| Learner Model Update | Memory status upgraded; knowledge ladder: TRANSFERABLE evidence logged; trajectory: high velocity, high acceleration | `../student-state/07`; `../student-state/09 §1–2` |
| STRETCH | Offered-not-assigned ("here's a weird one — what happens if you fire a bullet exactly horizontally at the exact moment you drop an identical one — which hits the ground first?") | `../decision-engine/01 §2 STRETCH`; `../decision-engine/08 §2 STRETCH-OFFER` |
| Tutor Response | [Stretch offer framing — concept entry's transfer map provides targets; phrasing INVENTED] |

---

### Turn C-3

**Student utterance**: "Same time! Both in free fall — horizontal
velocity doesn't affect vertical acceleration. Wait, is that the
Monkey Hunter problem?"

**TRACE:**

| Layer | Decision | Source |
|---|---|---|
| Student State | CURIOUS (naming prior knowledge, connecting — "wait, is that...?") | `../decision-engine/02 §1 CURIOUS` |
| Decision | Named a breakthrough-in-progress — log it NOW as a potential breakthrough entry | `../student-state/08 §2` breakthrough moments: "the exact representation, moment, and phrasing that caused a genuine click, recorded verbatim" |
| Teaching State | STRETCH → CLOSING (session end path regardless of stretch outcome; "a missed stretch is a preview, never a failure") | `../decision-engine/01 §2 STRETCH` exit rule |
| Close script | The breakthrough framing is the close's opening — "you just hit on something that trips up university physics students..." | `../decision-engine/01 §2 CLOSING`; breakthrough as a named shared landmark |
| Learner Model Update | Breakthrough logged; representation family that unlocked it noted for sibling concepts | `../student-state/08 §2` — the representation-family inheritance rule |
| Tutor Response | [Close script with breakthrough callback planted for next session — wording INVENTED] |

**Session C summary — gaps found:**
1. Gifted-learner persona handling (Delivery 2 §9 PENDING)
2. Compaction protocol specifics for fast learners
3. Universal Teaching Principle contents (named in decision matrix rules, not in tree)

---

## Cross-session findings

| Decision type | Retrievable? | Source |
|---|---|---|
| Teaching state transitions | YES | `../decision-engine/01` |
| Learner state classification (text signals) | YES | `../decision-engine/02` |
| Priority ordering | YES | `../decision-engine/02 §2` |
| Decision matrix (state × state → action) | YES | `../decision-engine/03` |
| Action selection (7-filter funnel) | YES — procedure retrieved; **catalog** pending | `../decision-engine/04`; Delivery 2 §6 catalog PENDING |
| Recovery preemption rule | YES | `../decision-engine/01 §4`, `../decision-engine/03` |
| Recovery scripts | NO — Delivery 1 pending | Recovery Engine PENDING |
| Lesson-one constraints | YES | `../first-lesson/02`, `../first-lesson/04` |
| Lesson-one completion criteria (C1–C4) | YES | `../first-lesson/04 §3` |
| Misconception collision sequence | PARTIAL — concept entry has it; universal engine rules pending | `../concepts/` entries; Delivery 2 §4 PENDING |
| Wait-time calibration | NO | Delivery 1 Voice Model PENDING |
| Prosody rules | NO | Delivery 1 Voice Model PENDING |
| Per-concept dispatch order | YES (for 3 seed concepts) | `../concepts/` entries |
| Per-concept dispatch (uncovered concepts) | NO — filter 2–7 rely on pending catalogs | Delivery 2 §§5, 6, 9 PENDING |
| Universal Teaching Principles (by name) | YES — rule names cited | Content: Delivery 2 §10 PENDING |
| Close script structure | YES | `../decision-engine/01 §2`, `../first-lesson/03 §9` |
| Breakthrough logging | YES | `../student-state/08 §2` |
| Memory status updates | YES | `../student-state/07`, `../decision-engine/08 §3` |
| Knowledge ladder position | YES | `../student-state/02` |
| Misconception ledger entry | YES | `../student-state/03` |
