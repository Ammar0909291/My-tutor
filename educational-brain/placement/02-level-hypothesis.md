# The Level Hypothesis

When a learner selects Beginner, Intermediate, or Advanced at signup,
that selection is not truth. It is a hypothesis — the learner's best
self-estimate, formed without knowing what the system's levels actually
mean, what the curriculum actually contains, or what their own
performance on this subject's material would look like today.

The placement engine treats the self-report as a STARTING POINT for
search, not as a verdict. The first job is to calibrate trust in the
report; the second is to adjust the search direction accordingly.

---

## 1. Why self-reports are systematically miscalibrated

Four mechanisms produce systematic error, each in a predictable direction:

**Under-reporting (claiming lower than actual):**

- **Academic shame** — particularly in adult returners. A learner who
  hasn't studied mathematics in 20 years says "beginner" because they
  feel like a beginner, not because their informal arithmetic and
  proportional reasoning is at beginner level. The shame is real; the
  placement is wrong. (`../first-lesson/01 §4` documents this for
  complete beginners; it applies with greater force at any level when
  there has been a long absence.)
- **Protective conservatism** — "I don't want to start somewhere too
  hard." This produces deliberate under-reporting as a safety strategy.
  The learner is not deceiving the system; they are managing their risk.
- **Domain-specific modesty** — experts in one field who are genuinely
  novices in another carry imposter syndrome into new domains. A
  professional physicist might say "beginner" in mathematics, undervaluing
  the transferable mathematical reasoning they actually hold.

**Over-reporting (claiming higher than actual):**

- **Dunning-Kruger miscalibration** — learners who have seen but not
  mastered material may report confidently at a higher level because
  they have no clear internal signal for the difference between
  recognizing and producing. A student who passed a course by
  memorizing procedures may claim "intermediate" in algebra while
  being unable to transfer those procedures to a new surface.
- **Social comparison error** — learners who are strong WITHIN their
  educational context may over-report relative to an external
  curriculum. "I got top marks in school" is not the same as "I am
  advanced in this subject's complete KG."
- **Recency bias** — a learner who recently studied something feels
  more competent than their durable retention warrants. A topic
  studied last month is not necessarily a topic whose AUTOMATIC
  rung is established.

**The net result**: for any given self-report, the true level is
approximately uniformly distributed across the range [one level below,
one level above] the reported level, with a systematic adult bias toward
under-reporting. The self-report eliminates most of the range; it does
not eliminate the adjacent levels.

---

## 2. The trust model at entry

| Self-report | Age / context | Initial trust | Search direction |
|---|---|---|---|
| Beginner | Child, no history known | MEDIUM (60%) | Nerve-settler below report; probe at report; one level above |
| Beginner | Adult, returning | LOW (45%) — strong under-report prior | Start one level above report immediately; assume false-beginner (`../first-lesson/01 §4`) |
| Beginner | Adult, no-prior confirmed | HIGH (75%) | Standard binary search from report |
| Intermediate | Any | MEDIUM (55%) | Three-bracket probe: one below, at, one above |
| Advanced | Any | LOW (50%) — over-report risk | Include a foundational concept probe early; do not assume prerequisites are solid |

**Trust is a prior, not a verdict.** Three probes update it decisively
(§3 below). The initial trust only sets the search direction and the
affect posture for the opening — it never assigns the placement.

---

## 3. The three-bracket verification protocol

Run immediately after collecting the self-report, before any teaching.
Uses the binary-search placement protocol (`../assessment/02 §2`) but
constrained to three items spanning the reported level.

```
THREE-BRACKET PROTOCOL

Item 1 (the nerve-settler):
  One production item just BELOW the reported level.
  Purpose: calibrate nerves, not the estimate.
  Expected result: success.
  If fail → placement is more than one level off; binary-search DOWN
             with affect care ("let's find your fast lane").

Item 2 (the anchor probe):
  One production item AT the reported level.
  Purpose: test the report directly.
  Result: fluent → report understates; step UP.
           slow-correct → report is roughly right; stay.
           wrong → report overstates; binary-search DOWN.

Item 3 (the ceiling probe):
  One production item just ABOVE the reported level.
  Purpose: find the actual ceiling.
  Fluent → advance one more level; repeat.
  Slow-correct → the level just above report is the frontier.
  Wrong → confirm: report was roughly right (or a slight over-report).
```

**After the three-bracket:**

| Pattern | Verdict | Adjustment |
|---|---|---|
| All three fluent | Report was an underestimate | Binary-search UP from item 3 |
| Items 1–2 fluent, item 3 struggle | Report was approximately right | Place at or just above the report |
| Item 1 fluent, item 2 struggle | Slight over-report | Place at one level below report |
| Item 1 struggle | Significant over-report | Binary-search DOWN with extra affect care |

**Record the miscalibration direction**: whether this learner under- or
over-reports is persistent information. An under-reporter at entry will
tend to under-report their confidence throughout the session (feeding
the calibration model, `../student-state/04`); an over-reporter tends
to advance too eagerly and resist prerequisite repair. Both patterns
inform the decision matrix's posture for the rest of the relationship.

---

## 4. Adjustment without insult

The placement engine never communicates that the self-report was wrong.
The adjustment is made silently in the item selection — the learner
experiences the correct placement without hearing "actually, you're not
advanced." Specific rules:

1. **Never name the discrepancy.** "You said Intermediate, but let's
   try something at the Beginner level" is a humiliation. Instead:
   "let's find exactly where the interesting stuff starts for you."

2. **Frame all downward adjustments as precision, not correction.** "I
   want to make sure we hit the spot where you're actually challenged"
   — which is literally true, regardless of which direction the
   adjustment went.

3. **Frame all upward adjustments as discovery.** "You've clearly got
   a strong handle on this — let's move ahead" — which requires no
   mention of the original report at all.

4. **Never re-probe items after revealing the adjustment.** If the
   placement went lower than reported, do not re-administer the item
   that revealed the gap. Move forward from the found level.

5. **Affect budget applies**: the bracket protocol surfaces at most
   two visible failures (`../assessment/02 §6`). The binary search
   stops there. If placement is not confident after two failures,
   the rule is: **place lower than uncertain, teach forward, and let
   performance sharpen the estimate** (because teaching is itself
   diagnostic — `../assessment/02 §7`).

---

## 5. Ongoing level calibration

The level hypothesis is updated throughout the learning relationship —
not just at initial placement. The signals that revise it:

| Signal | Revision |
|---|---|
| Consistent BORED state + high performance across a category | Under-report confirmed; advance to next category, record upward correction |
| Compaction test-out passed at multiple levels above placement | Report was significantly below actual; revise placement upward |
| Consistent failures at the placed level despite sound teaching | Possible over-report at placement; binary-search downward for the floor |
| Long pause before every answer, rising intonation on known items | Chronic low calibration; the calibration training protocol applies (`../student-state/04`) |
| Clear CONFIDENT + fast performance on items placed as "frontier" | The frontier has advanced; placement needs to move |

**Placement confidence levels** (the standing label for how much the
system trusts the current placement):

| Level | Meaning | Evidence required | Implication |
|---|---|---|---|
| ANCHORED | The category below the frontier is solidly mastered; evidence spans sessions | Gate evidence + STABLE memory status + transfer logged | Never reteach; use freely as prerequisite |
| PROBABLE | The category is likely mastered; evidence is recent and single-session | INDEPENDENT rung on gate concepts; no FRAGILE status | Brief warm-up at session open; then proceed |
| UNCERTAIN | The category may be mastered; evidence is thin or old | One or two successful probes; or recalling without fresh evidence | Verify with one probe before building on this |
| UNKNOWN | The category has not been assessed for this learner | No interaction with this category ever logged | Placement probe required before using as a prerequisite |

These levels are per-category, per-learner, and live in the student
state model alongside the knowledge ladder.
