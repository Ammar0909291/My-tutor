# Missing Human Teaching Knowledge

Human teaching science that is absent from the Brain — not pending
transcription, but never yet authored in any delivery. These are domains
where the world's greatest human tutors have knowledge the Brain
currently cannot retrieve, so the AI invents on every occasion it is
needed.

The distinction from §2 of the AI dependency audit is important:
**pending transcription** means the knowledge was authored (in chat,
during Deliveries 1–2) and needs to be written into the tree.
**Missing** means it has not been authored at all — not even in draft.

Entries are ranked by estimated learner impact: how many learners are
affected per session, and how large the damage of getting it wrong.

---

## 1. Relationship capital (HIGH IMPACT — every session)

**What is missing**: The tutor-learner relationship as a teachable,
manageable asset. Research basis: Bloom's 2-sigma effect is only
partially accounted for by pedagogy — the other part is the relationship
that makes a learner push through difficulty for a specific tutor.
Cooper and Rosenthal's expectation studies: tutors who communicate
genuine, evidence-based belief in a learner produce measurable gains
independent of instructional quality. Great tutors manage:

- Relationship deposits: specific behaviors that build trust credit
  (remembering a win from three weeks ago, asking about the thing the
  learner mentioned last session, naming the learner's growth)
- Relationship withdrawals: specific behaviors that spend credit
  (correction without acknowledgment, skipping the close, treating a
  session as a transaction)
- Recovery after damage: what to do when a session ended in tears, or
  when the tutor said something that landed wrong
- Learner-specific currencies: some learners are bought by being taken
  seriously as thinkers; others by warmth; others by humor; others by
  explicit challenge. The right currency is learner-specific and
  discoverable.

**Why it is not in the Brain**: The Brain manages affect (student-state/06),
recovery (decision-engine/01 §4, first-lesson/05), and continuity
(teaching history callbacks). But these address the learner's state in
the session — not the cumulative relationship account across sessions.
Relationship capital is not a mood state; it is a structural resource
that changes what pedagogy is available. A learner who trusts the tutor
deeply will attempt things they would refuse from a stranger. The Brain
has no model of this.

**Authoring note**: This belongs in a future `relationships/` library
with: a deposit/withdrawal taxonomy, learner-specific currency
identification (as a profile dimension in student-state/05), and the
multi-session arc of trust-building for different learner types.

---

## 2. Worked example design rules (HIGH IMPACT — daily)

**What is missing**: The conditions under which worked examples should be
used vs. completion problems vs. full problem-solving, and how the
optimal mix changes with expertise. The relevant research (Sweller,
van Gog, Kalyuga):

- **Expertise reversal effect**: worked examples help novices but HARM
  experts — the expert spends cognitive resources understanding the
  example's decisions rather than making their own. The crossover point
  is estimable from the knowledge ladder (student-state/02) but the
  rule is not authored.
- **Completion problems** (partially-worked examples with a key step
  missing) outperform both extremes at intermediate levels — fading
  is the mechanism, not worked examples vs. problems as a binary.
- **Self-explanation effect**: learners who explain each step of a worked
  example to themselves outperform those who read. "Self-explain as you
  go" is the cheapest worked-example enhancement. Not authored.
- **Variability benefit**: varied worked examples produce more transfer
  than identical ones, but only when the learner can identify what is
  structural vs. surface across examples.

**Why it matters**: The action selector (decision-engine/04) has "worked
example" in its catalog (Delivery 2 §6, pending). But without design
rules, the runtime invents its worked examples — often too late for
expertise, or without the self-explanation prompt.

**Authoring note**: Belongs in `cognitive-load/` or a dedicated
`worked-examples/` library with the expertise-level crossover rule
(keyed to knowledge ladder rungs), fading protocol, and the self-
explanation prompt as a standard wrap.

---

## 3. Vocabulary pre-teaching (MEDIUM IMPACT — concept introductions)

**What is missing**: The protocol for introducing key vocabulary BEFORE
the concept it encodes, not after. Research (Beck, McKeown, Marzano):
new vocabulary at the moment of concept introduction competes with the
concept for working memory. Pre-teaching the words removes this
competition. But pre-teaching has its own requirements:

- Words must be pre-taught in an engaging, non-definitional way
  (definition-first even for vocabulary instruction is a failure mode)
- Timing: 1–2 sessions before the concept, not immediately before
- Volume: maximum 3 words per pre-teaching episode (first-lesson/02's
  limit applies here too, but for vocabulary specifically)
- The pre-teaching encounter must produce a memory trace strong enough
  to survive until the concept arrives — so it requires a hook, not a
  drill

**What the Brain has**: first-lesson/02 has the ≤3 new words limit and
the ×3-uses rule. But the PRE-TEACHING protocol — how to introduce the
words before the concept — is absent. The limit is there; the method
is not.

**Authoring note**: Belongs in a vocabulary section of `foundations/`
or as an extension to `first-lesson/02`. Low complexity to author;
high frequency of use in practice.

---

## 4. Error analysis design (MEDIUM IMPACT — intermediate learners)

**What is missing**: Universal design rules for using errors as teaching
tools (not just misconception collision, which is authored). Research
(Borasi, 1994; Tippett, 2010):

- Error analysis — examining why a wrong approach is wrong, and what
  it reveals about the underlying concept — produces deeper encoding
  than correct-example study in several studies
- Effective error-analysis items: the error must be plausible (students
  recognize it as the kind of thing they might do), the error must be
  productive (the analysis reveals something the learner didn't know,
  not just "that's wrong"), and the error must target a specific
  conceptual gap (not a calculation mistake — those don't generalize)
- Generating error-analysis items requires knowing the misconception
  landscape (concepts/ entries have this for 3 concepts; the design
  rules for other concepts are missing)
- The self-explanation effect applies here too: asking the learner
  "what did this student think?" before "what should they have done?"
  is more powerful than asking only the latter

**What the Brain has**: The action selector (decision-engine/04, filter 2)
includes "error analysis" in the misconception knowledge-type row. The
assessment library (assessment/08) names it as a teaching-action
assessment. But neither authors the DESIGN RULES for creating or
selecting effective error-analysis items.

**Authoring note**: Belongs in `teaching-actions/` as a subsection of
the error-analysis action family, and as a design rule in the
misconception library when Delivery 2 §4 is transcribed.

---

## 5. Metacognitive strategy instruction (MEDIUM IMPACT — all learners)

**What is missing**: Explicit instruction in HOW to learn. Research
(Dunlosky, Kornell, Bjork): learners taught to use self-testing,
elaborative interrogation ("why would this be true?"), and spaced
practice significantly outperform those who are not — even on
assessments they were not prepared for. But most tutors teach the
content and assume the learning strategies are the learner's problem.

Great tutors do not assume. They teach metacognitive strategies
explicitly, embedded in content sessions: "While you're doing this
practice, try to predict whether each answer is correct BEFORE you
compute it — that kind of prediction strengthens memory better than
checking after." The instruction is a sentence, not a lecture.

**What the Brain has**: The Memory Engine (Delivery 2 §8, pending) will
cover spacing and retrieval practice from the TUTOR'S SCHEDULING
perspective. But teaching the LEARNER to be their own metacognitive
manager — to self-test, to use elaborative questions, to notice their
own confusion early — is not covered anywhere.

**Why it matters**: At scale, the platform's learners can't always return
to it for every study session. Metacognitive strategy instruction makes
the platform's teaching compound between sessions.

**Authoring note**: Belongs in a `metacognition/` library or as a
standing dimension in student-state/05 (behaviour profile — the learner's
current metacognitive strategy repertoire) with tutor-delivered
instruction scripts.

---

## 6. Interleaved practice design (MEDIUM IMPACT — intermediate learners)

**What is missing**: Rules for constructing interleaved practice
sessions — when to switch from blocked (concept A, concept A, concept A)
to interleaved (concept A, concept B, concept A, concept C), and HOW to
construct the interleaved set. Research (Rohrer, Taylor):

- Blocked practice feels productive (fast improvement during the
  session) but produces shallow retention
- Interleaved practice feels harder (slower in-session performance) but
  produces dramatically stronger long-term retention and transfer
- The crossover benefit emerges only after the learner can do each
  concept at all — interleaving before basic competence produces
  confusion, not transfer
- The "interleaving induction problem": learners and tutors both resist
  interleaving because in-session performance drops — explicit framing
  is required ("this is supposed to feel harder")

**What the Brain has**: The Memory Engine (Delivery 2 §8) covers spacing.
The decision-engine/07 covers review injection. But the rules for
CONSTRUCTING an interleaved practice set — which concepts to interleave,
in what ratio, at what competence threshold — are not authored.

**Authoring note**: Belongs in `memory/` as a subsection on interleaving,
distinct from spacing. The "interleaving induction problem" framing is
important: it should be in first-lesson/03-style tutor behavior rules
("when scheduling interleaved sessions, name the difficulty explicitly").

---

## 7. Spaced retrieval practice design (MEDIUM IMPACT — all review)

**What is missing**: The design rules for retrieval practice as distinct
from spacing. The Memory Engine (Delivery 2 §8) covers WHEN to review
(spacing). Retrieval practice science covers HOW to design the retrieval
event itself:

- **Testing effect**: retrieval practice strengthens memory more than
  restudying. But the retrieval must be effortful to be effective —
  recognition items (multiple choice) produce weaker benefits than
  free-recall items
- **Retrieval-format matching**: retrieval items should match the format
  of the eventual use (not of the original learning). If the concept
  will be used in calculation, test in calculation; if it will be used
  in recognition, test in recognition
- **Feedback timing**: immediate feedback on retrieval practice is almost
  always better than delayed, EXCEPT when the learner answered correctly
  — delayed feedback for correct answers may strengthen the memory trace
  further
- **Number of retrievals**: 3 spaced retrievals produces ~90% retention
  at one month in many studies; 5 reaches ~95%; diminishing returns
  beyond

**What the Brain has**: Memory status derivations (student-state/07) and
the session-opening retrieval-first rule (decision-engine/01 §2). Not
the DESIGN of the retrieval events themselves.

**Authoring note**: Belongs in `memory/` alongside spacing. Interact
with assessment/05 (mastery gates should use free-recall items, not
recognition items, at the gate-verification stage).

---

## 8. Wait-time calibration rules (LOW IMPACT per turn, HIGH FREQUENCY)

**What is missing**: Precise wait-time rules by context. Research (Rowe,
Stahl): extending wait time after a question from under 1 second to 3–5
seconds produces measurable gains in answer quality, student-initiated
discourse, and speculative thinking. But the rule is not uniform:

- **Recall questions** (what is the formula?) need shorter wait than
  **production questions** (explain why this works)
- **Younger learners** need longer wait than adults — their processing
  speed is lower and they read longer pauses as "wrong" faster
- **Fearful learners** need shorter wait than confident learners —
  silence under fear extends the fear, not the thinking
- **After a correct answer**: silence here is not "wait for more" — it
  is ambiguous and produces confusion; the correct response is
  acknowledgment, not more wait

**What the Brain has**: First-lesson/03 §4 names wait time and the
principle of holding it. The decision-engine/08 step 6 says "then
genuinely stop." But the calibration rules — how long, by whom, for
which question type — are pending Delivery 1 transcription. This is in
the "partially retrieved" category (§2 of 03) rather than "missing"
strictly, but it is worth re-stating here: the wait-time gap is real and
high-frequency, appearing in every session. Even if Delivery 1 has the
rule, it should be authored precisely enough to be executed.

**Authoring note**: Belongs in `voice/` (the Voice Model's delivery rules)
and should be cross-referenced from `../first-lesson/03 §4` with
calibration specifics by learner type.

---

## 9. Pre-assessment design (LOW IMPACT — enrollment, pacing)

**What is missing**: Using pre-assessments to establish learning goals
AND to give the learner a baseline they can see themselves grow from. The
Brain has diagnostic assessment (assessment/02) for placement. But
pre-assessment as a MOTIVATIONAL tool — explicitly making the gap visible
to the learner, so that future progress is felt as achievement — is not
authored. Research (Hattie): making learning goals explicit and visible
has large effect sizes on motivation and persistence.

**What the Brain has**: assessment/02 (placement/diagnostic); student-
state/09 §6 (readiness — forward-looking). Neither addresses the
motivational function of baseline-setting.

**Authoring note**: Belongs in `assessment/` as a section on pre-
assessment, or in a `motivation/` library. Lower priority than items 1–7.

---

## 10. Explanation quality criteria (LOW IMPACT — authoring quality)

**What is missing**: Universal design rules for CONSTRUCTING a great
explanation — not evaluating one (assessment/10 rubric covers evaluation)
but building one from scratch. Research (Chi, Bassok, Lewis): the best
explanations share structural features: they name the mechanism not just
the procedure, they use concrete before abstract, they are self-
monitoring (they check understanding mid-explanation rather than at the
end), and they anticipate the learner's next question.

**What the Brain has**: assessment/10 rubric (evaluation of
explanations); concepts/ entries (per-concept explanation libraries).
But no universal construction rules for producing an explanation on a
new concept.

**Authoring note**: Low priority — the concept entry template
(concepts/TEMPLATE.md) implicitly handles this for authored entries.
The gap is felt only when the runtime is teaching an uncovered concept
and must construct an explanation without an entry. After Deliveries 1–2
and the concept coverage campaign, this becomes less urgent.

---

## Summary table

| Domain | Impact | Status | Suggested home |
|---|---|---|---|
| Relationship capital | HIGH | Absent entirely | `relationships/` library |
| Worked example design rules | HIGH | Absent — only the action name is present | `cognitive-load/` or `worked-examples/` |
| Vocabulary pre-teaching | MEDIUM | Partially (limit authored, method missing) | `foundations/` vocabulary section |
| Error analysis design | MEDIUM | Partially (action named, design rules missing) | `teaching-actions/` |
| Metacognitive strategy instruction | MEDIUM | Absent entirely | `metacognition/` or `student-state/05` |
| Interleaved practice design | MEDIUM | Absent — spacing is covered, interleaving design is not | `memory/` |
| Spaced retrieval practice design | MEDIUM | Absent — scheduling covered, retrieval event design missing | `memory/` |
| Wait-time calibration | HIGH FREQUENCY | Partially (principle authored, calibration rules pending) | `voice/` (Delivery 1 transcription) |
| Pre-assessment design | LOW | Absent | `assessment/` section 11 |
| Explanation construction rules | LOW | Absent — evaluation rubric exists, construction rules don't | `teaching-actions/` or `concepts/` section |

The top two (relationship capital and worked example design rules)
represent the highest-impact genuine authoring gaps — knowledge that
no delivery has addressed and that affects every session. The four
medium-impact gaps (metacognition, interleaving, vocabulary pre-teaching,
error analysis) are the next tier. The bottom four are low-priority gaps
that close naturally as other deliveries are authored.
