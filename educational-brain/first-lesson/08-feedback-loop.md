# The First-Lesson Feedback Loop

Every failed beginner session must improve the Educational Brain. This is
the compounding mechanism that makes the Brain a moat rather than a
library: competitors can copy documents; they cannot copy an accumulation
of repaired failures. The loop's law comes from Universal Principle 23 —
*if they didn't learn, the path was wrong* — industrialized:

```
STUDENT INTERACTION
      │
FAILURE DETECTION          what counts as a lesson-one failure signal
      │
ROOT-CAUSE ANALYSIS        which standard was broken, or which knowledge was missing
      │
BRAIN IMPROVEMENT          exactly one authored artifact, same week
      │
FUTURE LEARNERS BENEFIT    the fix is retrieved, never re-reasoned
```

## 1. Failure detection — the lesson-one signal list

A lesson-one session is flagged for the loop when ANY of:

- **The learner never returned.** The gravest signal and the quietest:
  C4 failed after the fact. No-return after lesson one outranks every
  other failure in the whole platform (a lost beginner is a lost learner;
  a struggling advanced learner is still here).
- **A failure state fired** ("I'm scared", "I'm stupid", "I give up",
  any of 05) — logged with which one and at what flow step.
- **The session-end circuit breaker tripped** (second failure state, or
  the engineered-win ending was forced early).
- **Echo-only completion**: the session ended without one solo
  production (C1 unmet) — the lesson ran out of time or retreated and
  never re-advanced.
- **Opening-retrieval failure at session two** (C2 unmet): lesson one
  didn't survive sleep — a re-run is normal ONCE; the SAME node failing
  C2 twice for the same learner, or C2 failing for many learners, is a
  design flag.
- **Visible-distress completion**: criteria technically met under quiet
  misery (C4's distress override) — detectable in voice (flat affect,
  whispered answers, silence-lengthening across the session).
- **Abandonment mid-session** (closed the app during, not after).

## 2. Root-cause analysis — the lesson-one taxonomy

The autopsy discipline from `../assessment/09 §2` applies (design first,
affect second, knowledge third — the learner is never the root cause).
Lesson-one causes, in the order to check:

1. **An anti-library entry fired** (06): which AL-number? This is the
   most common finding and the easiest to verify from the transcript —
   was there a quiz-first open (AL-1)? a wall of text (AL-13)? a
   definition-first explanation (AL-6)? vocabulary leakage (AL-10)?
2. **A hard limit was exceeded** (02 §2): count them from the
   transcript — concepts introduced, new words used, sentences per
   burst, questions asked. Numbers, not impressions.
3. **A flow step was skipped or rushed** (04 §1): most often the
   demonstration was skipped (explain-first) or the solo was pushed
   before `prompted` succeeded (AL-5).
4. **The floor was missing** (01 §3): the "complete beginner" wasn't at
   the entry node's true floor — the oral-language / counting-words /
   object-talk check was skipped or missed something. Curriculum-level
   finding: does the entry node have a hidden prerequisite the KG
   doesn't name? (→ curriculum feedback channel, `../concepts/`
   TEMPLATE's final section — reported to the pipeline, never patched
   locally.)
5. **The representation failed for this learner** despite the standard
   being followed: the anchor didn't anchor, the analogy didn't land.
   This is the genuinely new-knowledge case — the interesting one.
6. **Imported state overwhelmed the session** (dread, shame, fear —
   05 §2): the design may have been correct and insufficient; the
   finding is a persona-level plan change (success density up,
   session length down), and possibly a new failure-state script if
   the utterance wasn't covered.

## 3. Brain improvement — the authoring rule

Every confirmed root cause produces **exactly one authored artifact, in
the same week**, in the file that owns the failure:

| Root cause | Artifact | Where |
|---|---|---|
| New AI failure mode observed | a new AL-entry (behavior → why → damage → replacement) | `06-anti-library.md` |
| Limit found wrong (too loose OR too tight) | the limit recalibrated, with the evidence noted | `02-principles-and-limits.md` |
| Flow step failing repeatedly at one point | the step redesigned or a sub-step added | `04-lesson-flow-and-completion.md` |
| Hidden prerequisite at an entry node | curriculum-feedback note (pipeline-facing) + floor-check extension | `../concepts/{subject}/{node}.md` + `01-the-complete-beginner.md` §3 |
| Representation/anchor failure | a new explanation/analogy/demonstration in the node's concept entry — or an anti-analogy if it backfired | `../concepts/{subject}/{node}.md` |
| Uncovered failure-state utterance | a new state script (lesson-one delta form) | `05-beginner-failure-states.md` |
| New misconception surfaced at first contact | a misconception entry with probe + phrases | the node's concept entry |

Discipline rules:

- **One failure, one artifact.** A vague "improve the lesson" ticket is
  not an artifact. The artifact is a diff to a named file.
- **Same week.** The value of a failure decays; the learner who paid for
  the lesson deserves the fix while their cohort is still in lesson one.
- **Falsifiable where possible**: a new analogy or script enters with
  the same standing as every other (ranked by evidence over time —
  the tree's continuous-improvement protocol); repairs that don't
  reduce the failure signal get demoted like anything else.
- **No silent fixes**: every artifact lands in git with the failure
  pattern named in the commit message — the ledger of repaired failures
  IS the moat's audit trail.

## 4. Priority — why lesson one leads the whole authoring queue

The coverage expansion protocol (`../concepts/COVERAGE.md`) already puts
placement entry points first. This loop sharpens it: **a lesson-one
failure outranks any advanced failure in authoring priority**, because
(a) every learner passes through lesson one — fixes there compound across
the entire future population; (b) lesson-one failures cost whole learners,
not lesson-grades; (c) the beginner cannot compensate — an advanced
learner routes around a bad explanation, a beginner just concludes the
subject isn't for them. The queue, permanently: first-lesson failures →
entry-node concept entries → cut-nodes → everything else.

## 5. The compounding claim, stated honestly

This loop makes the Brain better every week ONLY if all three legs hold:
signals actually logged (§1), autopsies actually run against the taxonomy
(§2), artifacts actually authored on the one-failure-one-artifact-same-week
rule (§3). Any leg skipped, and "failures improve the Brain" becomes a
poster instead of a mechanism. The test of the loop's health is git
history: weeks of beginner sessions with zero first-lesson artifacts means
either the Standard has become perfect (verify against §1's no-return
numbers) or the loop is broken — and it will be the loop.
