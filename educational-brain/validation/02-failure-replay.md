# Failure Replay

Four failures the My Tutor platform has already experienced — not
hypothetical, not constructed. These were observed during the project
that produced this Brain. Each is re-run through the authored knowledge:
what rule would have prevented it, whether that rule is in-tree, and what
the authored Brain says should have happened instead.

The failures are presented in order of severity (worst first).

---

## Failure 1 — The English Lesson One Collapse

**What happened**: A complete beginner was given their first English
phonics lesson. The AI tutor immediately asked "Can you tell me what
sounds you know?" and followed up with "What letter does /m/ make?"
When the learner whispered a wrong answer, the tutor said "Almost —
the letter M makes the /m/ sound" and continued with more questions.
The session produced no learning. The child did not return.

**Severity**: Total — lesson one produced no C1–C4 progress, and the
experience may have installed a fear-of-assessment event in a child who
had none before.

**Re-run through the Brain:**

| Decision point | What happened | What the Brain says | Source |
|---|---|---|---|
| Session opening | Quiz-first ("what sounds do you know?") | Demonstration first — "the tutor does the thing before the learner is asked to do anything" | `../first-lesson/04 §1` corrected flow; `../first-lesson/06` AL-2: quiz-first |
| Question before trust | Asked an evaluative question in the first 30 seconds | First-lesson tutor behavior: name the purpose, demonstrate, invite echo — no evaluative question until INDEPENDENT rep | `../first-lesson/03` |
| Correction on failure | Said "Almost — the letter M makes the /m/ sound" — which is both a correction and an explanation after the failure | RECOVERY fires before any content on a wrong answer; lesson-one failure budget is 1 per session; if 1 is spent, the session must end on a WIN, not on a re-explanation | `../first-lesson/05`; `../decision-engine/01 §4` |
| Oral-first constraint | Went to phonics with print involved ("what letter does /m/ make?") | English lesson one is ORAL, print-optional; letter names are NOT the entry node — the SOUND is | `../first-lesson/07`: "English lesson one is ORAL, print-optional" |
| Invisible assessment | No mastery was invisibly confirmed; the child just heard corrections | Lesson-one assessment is invisible: one solo rep in context, not a named test; never "what letter is this?" | `../assessment/07 §2`; `../first-lesson/04 §3` |

**Prevention status**: **FULLY PREVENTABLE** by knowledge already in-tree.
All five failure points are explicitly authored. The anti-library entry
`../first-lesson/06 AL-2` (quiz-first) names this exact failure. The
corrected flow (`../first-lesson/04`) is the exact alternative. This
failure is the one that motivated the First Lesson Standard (Delivery 6)
— the Brain was authored in response to observing it, which means the
knowledge now exists and would prevent a recurrence.

**Recovery path authored**: Yes — `../first-lesson/05` "I'm scared"
script, `../assessment/09` failed-assessment recovery.

---

## Failure 2 — The Invisible Restart

**What happened**: A learner who had been using the platform for six
weeks returned after a ten-day break. The AI tutor, with no access to
prior session content, opened the session with: "Welcome back! Let's
start with the basics of fractions." The learner, who had mastered
fraction equivalence three weeks earlier, spent fifteen minutes on
content below their frontier. They disengaged quietly.

**Severity**: High — fourteen weeks of correct learning history were
invisible to the tutor, producing DISENGAGED state from boredom and an
experience of invisibility ("the tutor doesn't know me").

**Re-run through the Brain:**

| Decision point | What happened | What the Brain says | Source |
|---|---|---|---|
| Session opening | "Let's start with the basics" — treated as a new learner | OPENING always opens with greeting with continuity AND due-review retrieval; the very first sentence names something from last session | `../decision-engine/01 §2 OPENING` |
| History reading | Prior sessions invisible | Teaching history is permanent; teaching history's first function is "The history disciplines optimism: before any plan says 'let's try X', the history answers 'X was tried on this concept twice'" | `../student-state/08 §4` |
| Returning learner | Treated as beginner | Knowledge ladder preserves high-water marks; returning = RUSTY not GONE; OPENING uses a warm re-entry (one easy win, then resume) | `../student-state/02 §2` law 3; `../decision-engine/02 §1 RETURNING` |
| Misconception of invisibility | The AI's restart communicated "I don't know you" | Breakthrough callbacks are a named relationship function: "the breakthrough becomes a named shared landmark — 'remember when the pirate treasure thing suddenly made sense?'" | `../student-state/08 §2` |
| Boredom handling | Not detected; tutor continued with below-frontier content | BORED state detection: flat compliance + correct instant answers; demands compaction immediately | `../decision-engine/02 §1 BORED` |

**Prevention status**: **FULLY PREVENTABLE** by knowledge in-tree.
The invisible restart is explicitly named as an anti-pattern in
`../first-lesson/06 AL-16` (though written for lesson one, its spirit
extends to all sessions). The decision-engine's OPENING state requires
continuity in the first sentence. The student-state's teaching history
(`../student-state/08`) is the information infrastructure that makes
continuity possible.

**What was missing at the time of failure**: The platform lacked the
student-state model. The Brain now defines the model structure; the
ADRs define the code-side containers (ADR 10). The failure will recur
until implementation implements those containers.

---

## Failure 3 — Assessment-First Teaching

**What happened**: At the start of a new topic (algebra: what a variable
means), the AI tutor opened with "Before we start, tell me what you
know about variables." The learner said "I have no idea." The tutor
responded with a dictionary definition: "A variable is a symbol used to
represent an unknown quantity." The learner nodded. No learning occurred.

**Severity**: Medium — session wasted; learner left no more fluent than
they entered, and possibly with a false confidence that they "knew"
the definition.

**Re-run through the Brain:**

| Decision point | What happened | What the Brain says | Source |
|---|---|---|---|
| Opening with a knowledge-survey | "Tell me what you know about variables" | Anti-pattern explicitly named: `../first-lesson/06 AL-16` (invisible restart pattern); `../assessment/01` failure modes: "diagnostic teaching masks as content teaching" | `../first-lesson/06 AL-16`; `../assessment/01 §4` |
| Definition-first | Gave a dictionary definition as the opening move | `../first-lesson/06 AL-1`: definition-first is the first anti-library entry; definitions presuppose experience | `../first-lesson/06 AL-1` |
| No demonstration | Never showed a variable working before defining it | Demonstrate before explain — a law for novices; the variable has to DO something before it is named | `../decision-engine/01 §3 INTRODUCTION → DEMONSTRATION`; `../first-lesson/04 §1` |
| False understanding | Learner nodded at the definition — apparent understanding, no learning | Performance/learning dissociation: same-session acceptance of a definition is not learning; the measure is next-session retrieval (C2) | `../assessment/README`; `../assessment/05 §2` |
| No informal anchor | Did not connect to the learner's informal knowledge (e.g., "you've seen X on a label — that's a variable") | INTRODUCTION: "anchor to something the learner already owns" | `../decision-engine/01 §3 INTRODUCTION` |

**Prevention status**: **FULLY PREVENTABLE** by knowledge in-tree.
Three separate documents address this exact failure mode (`../first-lesson/06 AL-1`,
`../first-lesson/06 AL-16`, `../assessment/01 §4`). The corrected
flow is authored in `../decision-engine/01 §3` and `../first-lesson/04 §1`.
For this topic, there is no authored concept entry (it is not a seed
concept) — but the universal rules in the decision engine and first-lesson
standard are sufficient to prevent the failure.

---

## Failure 4 — The Confidence Collapse

**What happened**: A learner who had been performing well for three weeks
had one bad session (they were tired; the topic was harder; latency was
up; two failed assessment items). The AI tutor, detecting errors, kept
asking more questions ("Let's try that again. What about this one?").
The learner ended the session in tears saying "I'm stupid."

**Severity**: Critical — "I'm stupid" is a severe negative event (shame
installation). It must be kept verbatim in teaching history forever and
the circumstances must never be recreated (`../student-state/08 §3`).

**Re-run through the Brain:**

| Decision point | What happened | What the Brain says | Source |
|---|---|---|---|
| Assessment circuit breaker | Continued asking after 2 failed items | "Two failed assessments in a session = circuit breaker — no more assessment today" | `../decision-engine/01 §3 ASSESSMENT`; `../assessment/09 §4` |
| Affect reading | Did not detect the building failure spiral | CONFUSED → FRUSTRATED → DISENGAGED is the documented trajectory; the transition FRUSTRATED→DISENGAGED is a "missed intervention" | `../decision-engine/02 §3` |
| "Let's try again" | Continued content delivery into a flooded learner | Recovery preempts on FRUSTRATED: "No content enters a flooded mind (Universal Principle 5)" | `../decision-engine/02 §1 FRUSTRATED`; `../decision-engine/03` |
| I'm stupid | Learner stated a severe failure | "I'm stupid" is explicitly a lesson-one delta trigger (`../first-lesson/05 §2`); more broadly: any stated severe negative requires RECOVERY immediately; the session must end on a WIN, not more teaching | `../first-lesson/05 §2`; `../decision-engine/01 §4` |
| Severe event logging | No record was kept | Severe negative events "kept verbatim forever"; the tutor must never accidentally recreate the circumstances | `../student-state/08 §3` |
| Fatigue | Late-session data was collected and acted on | "Late-session data is corrupt anyway (`../assessment/01 §4`); route to CLOSING via a win" | `../decision-engine/02 §1 FATIGUED`; `../assessment/01 §4` |

**Prevention status**: **PARTIALLY PREVENTABLE** with current in-tree
knowledge; fully preventable if the circuit breaker, affect reading, and
the recovery-preemption rule were all implemented. The in-tree rules are
clear and sufficient. The gap is not in the Brain's knowledge — it is in
the runtime's failure to act on it.

**What remains missing from the Brain**: The actual Recovery Engine
scripts for "I'm stupid" (Delivery 1 pending transcription). The
`../first-lesson/05 §2` names the failure state and says what the
behavior should be ("demonstrate more, ask less; end on a win") but
the recovery script itself — the exact moves, the exact voice — is in
the Recovery Engine, which is not yet in the tree.

---

## Cross-failure findings

| Pattern | Appearances | Status |
|---|---|---|
| Definition-first | Failure 3 | In-tree (AL-1) |
| Quiz-first | Failure 1 | In-tree (AL-2) |
| Invisible restart | Failure 2 | In-tree (AL-16; student-state/08) |
| Demonstrate-before-explain violation | Failure 1, Failure 3 | In-tree |
| Recovery not triggered | Failure 1, Failure 3, Failure 4 | In-tree (but Recovery Engine scripts PENDING) |
| Assessment circuit breaker not applied | Failure 4 | In-tree (assessment/09 §4; decision-engine/01 §3) |
| Affect-band preemption ignored | Failure 3, Failure 4 | In-tree |
| Continuity on return | Failure 2 | In-tree |
| Severe event logging | Failure 4 | In-tree (student-state/08 §3) |
| Oral-first (English) | Failure 1 | In-tree |

**The pattern across all four failures**: The failures were not caused
by missing educational knowledge. The rules that would have prevented
them are now authored. The failures were caused by the AI operating
without access to authored rules — inventing pedagogy on the fly, and
inventing it badly. The Brain's rules exist; the runtime's retrieval of
them does not yet.

**One exception**: the Recovery Engine scripts (Delivery 1). The Brain
knows WHEN to trigger recovery and WHAT class of behavior follows, but
not the exact scripts. Until Delivery 1 is transcribed, the AI must
invent recovery language — the highest-stakes content in the whole system
is also the content most reliant on improvisation.
