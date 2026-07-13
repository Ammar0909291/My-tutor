# The Student State Engine

The tutor's read of the learner, formalized. Every turn, the Brain holds a
best-estimate learner state, inferred — never directly observed — from
three signal families: **voice** (Delivery 1's instruments), **behaviour**,
and **learning** (correctness patterns). The state drives the decision
matrix (03); mis-reading the state mis-drives everything, so detection is
specified as concretely as the decisions.

## 1. The states

### Affect states (highest priority — they gate everything)

**FEARFUL / ANXIOUS**
- *Voice*: whispered or trailing answers; long pre-attempt silences on
  EVERY item (not just hard ones); rising intonation on things they know;
  "will this be on a test?"
- *Behaviour*: asks for confirmation before committing; un-does answers;
  over-apologizes.
- *Learning*: performance collapses under anything test-shaped but
  survives in casual talk (`../assessment/01 §4` false failure).
- *Demands*: safety before content — stakes named as zero, no timers, no
  visible checks, success density ~90%+ (Delivery 2 §9 fearful persona).

**FRUSTRATED**
- *Voice*: louder or clipped; flat; sighs; dropping sentence endings.
- *Behaviour*: faster, sloppier attempts; abandoning mid-answer; "whatever."
- *Learning*: error rate rising WITH effort still present (distinguishes
  from disengaged).
- *Demands*: RECOVERY now. No content enters a flooded mind (Universal
  Principle 5).

**OVERLOADED**
- *Voice*: mid-sentence restarts; losing the thread of their own answer;
  "wait, what was the question?"
- *Behaviour*: doing only the last thing said; dropping earlier
  constraints of a task.
- *Learning*: fails multi-step versions of things whose single steps all
  pass (`../assessment/01 §4` — load masquerading as ignorance).
- *Demands*: shrink NOW — smaller step, one element, persistent visual
  anchor; never more words (more words are more load).

**DISENGAGED / AVOIDANT**
- *Voice*: minimal answers ("yeah", "dunno"); long latency WITHOUT
  effortful prosody; monotone.
- *Behaviour*: off-task turns; "how much longer?"
- *Learning*: random errors on things recently solid (not trying ≠ not
  knowing).
- *Demands*: do not teach into it and do not interrogate it — diagnose
  underneath (usually FEARFUL, repeatedly-failed, or BORED wearing armor;
  Delivery 2 §9 unmotivated).

**FATIGUED**
- *Voice*: slowing across the session (trend, not level); yawns.
- *Behaviour*: quality decaying with time-in-session independent of topic.
- *Learning*: late-session errors on early-session successes.
- *Demands*: end well soon — late-session data is corrupt anyway
  (`../assessment/01 §4`); route to CLOSING via a win.

### Cognitive states (the teaching-active band)

**CONFUSED (productive window)**
- *Voice*: engaged hesitation — effortful "hmm", self-talk, partial
  attempts revised mid-flight (distinguish from overload: confusion still
  holds the thread; overload has dropped it).
- *Learning*: errors that are near-misses.
- *Demands*: normalize, resolve by changed representation — and
  time-boxed: two exchange cycles, then treat as OVERLOADED-risk and
  shrink (Delivery 2 §3 vicious-cycle guard).

**GUESSING**
- *Voice*: rising intonation + speed without structure; "is it... 7?";
  admitted ("I'm guessing").
- *Learning*: answers uncorrelated with difficulty.
- *Demands*: reward disclosure loudly (Universal Principle 8), then treat
  as a gap: the question outran the teaching — step the machine back, and
  log it (the item or pacing was wrong, not the learner).

**MISCONCEIVING (confident-wrong)**
- *Voice*: FAST wrong answers, flat confident delivery — the D1 grid's
  dangerous quadrant.
- *Learning*: systematic errors; the same wrong move across surfaces;
  characteristic phrases from the concept's misconception library.
- *Demands*: never spot-correct — route to the misconception track
  (elicit→commit→collide, Delivery 2 §4) at the next natural seam.

**FRAGILE (hesitant-correct)**
- *Voice*: right answers with rising intonation, hedges ("I think...?").
- *Learning*: correct but slow; accuracy that vanishes under mixing.
- *Demands*: consolidate, never advance — one more same-type success now,
  review interval held (Universal Principle 22; `../assessment/04 §5`).

### Drive states

**CONFIDENT (calibrated)**
- *Voice*: fast, flat-toned correct answers; finishing the tutor's
  sentences correctly.
- *Learning*: fluent successes, accurate self-predictions.
- *Demands*: raise difficulty NOW — three fluent successes is the trigger
  (D1 rule); confidence unfed curdles into boredom.

**CURIOUS**
- *Voice*: unprompted questions; "wait, what if...?"; energy up after
  reveals.
- *Demands*: feed the chain — answer now or hook the question into the
  lesson ("that's exactly where we're going"); NEVER defer with
  "later" (Delivery 2 §3: each deferral teaches that curiosity is
  off-schedule).

**BORED**
- *Voice*: flat compliance; instant correct answers delivered without
  interest; theatrical sighs.
- *Learning*: perfect performance on current material (real boredom) OR
  disguised avoidance (check: one stretch item disambiguates — the bored
  eat it, the avoidant deflect).
- *Demands*: compaction — pretest out, jump ahead (Delivery 2 §9 gifted);
  boredom is the frustration of the fast.

### Knowledge-trajectory states (per concept, from the ledger)

**MASTERED** — gate open (`../assessment/05 §3`): fast, confident,
transferable, delayed-verified. *Demands*: interval growth + use as an
anchor for new concepts.

**FORGOTTEN / RUSTY** — previously gated, now failing retrieval. *Voice*:
"I used to know this..." *Demands*: cued retrieval, never re-teaching
(storage survives; Delivery 1) — expect cascade unlocks.

**RETURNING** — back after days/weeks away. *Demands*: OPENING runs a
warm compressed re-entry: one easy win from the old material before
anything new; interval schedule resumes shrunk one step.

## 2. Priority ordering (when multiple states fire)

```
FEARFUL > FRUSTRATED > OVERLOADED > DISENGAGED > FATIGUED   (affect band)
  > CONFUSED > GUESSING > MISCONCEIVING > FRAGILE           (cognitive band)
  > BORED > CURIOUS > CONFIDENT                             (drive band)
```

The affect band always wins: a fearful-and-curious learner is treated as
fearful (safety first, curiosity second). Within the cognitive band, treat
the state that BLOCKS the others. Knowledge-trajectory states are not
competing moods — they coexist with any of the above and inform the plan
(07), not the immediate move.

## 3. Transition trajectories (the paths states actually take)

- **The failure spiral**: CONFUSED → (unresolved 2+ cycles) → FRUSTRATED →
  (ignored) → DISENGAGED. Every arrow is a missed intervention; the
  matrix's whole purpose is breaking the first arrow.
- **The boredom slide**: BORED → (unfed) → DISENGAGED. Same terminal
  state, opposite cause — treatment must diagnose which slide it was
  (stretch item disambiguates; treating a bored learner with easier
  material accelerates the slide).
- **The repair path**: FEARFUL → (safety + tiny wins) → FRAGILE →
  (consolidation) → CONFIDENT. Weeks, not minutes; the plan (07) carries
  it across sessions.
- **The learning heartbeat** (the healthy loop): CONFIDENT → (new
  challenge) → CONFUSED → (resolution) → CONFIDENT — one beat per
  concept-step. A session with no confusion at all was too easy; a
  session where confusion outlasted two cycles was mishandled.

## 4. Detection honesty rules

1. **States are inferences with confidence attached.** Act tentatively on
   weak reads: a probe move first (one lighter question, a beat more wait
   time) before a big intervention on an uncertain classification.
2. **When torn between two states, act on the cheaper-to-treat one first**:
   CONFUSED vs OVERLOADED → shrink (treats both); BORED vs DISENGAGED →
   one stretch item (disambiguates in one move); GUESSING vs
   MISCONCEIVING → latency decides (fast = misconception, hedged =
   guess).
3. **Trends beat snapshots**: silence-lengthening across ten minutes
   outweighs one long pause; a single sigh is weather, three are climate.
4. **The learner's own words outrank all inference** — any stated failure
   state ("I'm scared", "I'm confused") is accepted at face value
   instantly, never argued with, never second-guessed by the classifier.
