# The Recovery Engine

The universal response library for a learner in distress — the interior
scripts that `../decision-engine/01 §4` names as the preempting state and
that every other file in the tree assumes exist. RECOVERY is entered from
ANY state, immediately, on any failure-state utterance or affect signal
crossing threshold (`../decision-engine/03 §0`'s preemption rule). This
file is what actually happens once it fires.

## 1. The one law under every script

**Never argue with distress; shrink around it.** Every script below does
the same three things in the same order — validate (without agreeing that
the situation is as bad as the learner thinks), shrink the ask to
something that cannot fail, and bank one small win before anything else
resumes. No script tries to talk the learner out of the feeling first;
feelings don't take instructions, and attempting to argue them away
teaches the learner to hide the next one instead of voicing it.

## 2. Recognizing the trigger (utterance and non-utterance forms)

Recovery fires on two channels:

- **Explicit utterances** — the learner says something in the failure-
  state vocabulary ("I don't know", "I don't understand", "I'm confused",
  "I forgot", "I'm guessing", "this is too hard", "I give up", "I hate
  [subject]"). Per `../decision-engine/02 §4`'s detection honesty rule 4,
  any stated failure state is accepted at face value instantly — never
  argued with, never re-classified by inference.
- **Affect signals without words** — the voice and behaviour instruments
  (`03-voice-first-learning-model.md`) crossing threshold: flat or
  strained tone, a lengthening-silence trend, sighing, clipped answers,
  abandoned mid-attempt work. These fire RECOVERY exactly as an explicit
  utterance would (`../decision-engine/03 §0`) — the learner does not have
  to name the state for the engine to act on it.

## 3. The base script library

Each entry is the general-population script. `../first-lesson/05` names
the lesson-one-specific modification to each of these — read that file
for the beginner delta; this file is the response for every learner past
lesson one, and the baseline the delta modifies.

**"I don't know."**
- Validate: "fair enough — let's make it smaller." No apology invited, no
  "come on, think" pressure.
- Shrink: convert the open question into a two-choice question ("is it
  bigger or smaller than the one before?"). A learner who cannot answer
  an open question can often answer a forced choice — the shrink
  preserves engagement without preserving difficulty.
- Exit: any answer, right or wrong, to the two-choice form. Bank it
  ("there you go") and resume one step below where the block occurred.
- Why it works: "I don't know" is frequently not "I have no idea" but "the
  space of possible answers is too large to search under pressure."
  Shrinking the search space is the treatment; more encouragement to
  search harder is not.

**"I don't understand."**
- Validate: "okay — let's come at it differently," said without a trace
  of surprise or disappointment.
- Shrink: change REPRESENTATION, never repeat the same explanation
  (Universal Principle 2, `04-universal-teaching-principles.md`). A
  second pass in the same frame teaches only that the tutor has one
  explanation and is now saying it louder.
- Exit: recognition or an attempted echo of the new representation.
- Why it works: understanding failures are almost never volume problems;
  they are frame problems. The learner's model of "explanation" is
  usually verbal — the fastest working alternative is a different
  channel entirely (demonstration, physical object, story), not a
  cleverer sentence.

**"I'm confused."**
- Validate: normalize ("that's the normal feeling right before this
  clicks — happens to everyone here").
- Shrink: localize with ONE boundary question ("is it the first part or
  the second part that's fuzzy?") — never a diagnostic interrogation.
- Exit: a located part, however vague ("the second one, I think").
  Re-teach only that part.
- Why it works: "confused" is a global-feeling word describing a local
  problem almost every time. One boundary question converts an
  unactionable feeling into an actionable target without turning the
  moment into an assessment.

**"I forgot."**
- Validate: "totally normal — it comes back fast." Said as fact, not
  reassurance.
- Shrink: cued retrieval — never re-teach from zero. Give the encoding
  context back ("remember the picture with the pizza slices?") and let
  the learner retrieve, don't supply the answer.
- Exit: the retrieval succeeds (even slowly) — expect a cascade (adjacent
  forgotten material often surfaces unprompted once retrieval starts;
  `../placement/06 §3`). If retrieval fails twice with different cues,
  this is not forgetting — it was never solid; switch to teaching.
- Why it works: storage and retrieval are different systems. Forgetting
  usually means retrieval access has weakened, not that the storage trace
  is gone (`../placement/06 §1`). Re-teaching a concept that is merely
  hard to access wastes the one thing the learner already has —
  structural memory — and replaces fast cued recovery with slow first-
  time learning.

**"I'm guessing."**
- Validate: **reward the disclosure loudly** (Universal Principle 8) —
  "thank you for telling me that — that's exactly the useful thing to
  say." The confession of uncertainty is treated as more valuable than
  an accidentally-correct guess would have been, because it is honest
  data instead of noise.
- Shrink: after the reward, treat this as a gap, not a personality trait —
  the question outran the teaching. Step the machine back one level and
  log that the pacing or item was wrong, not the learner.
- Exit: a successful attempt at the shrunk level.
- Why it works: guessing is punished by silence in most classrooms,
  which teaches learners to guess quietly and never disclose it — losing
  the tutor's best low-cost diagnostic signal. Loudly rewarding disclosure
  changes the incentive: honesty about not-knowing becomes more
  reinforced than confident-sounding luck.

**"This is too hard."**
- Validate: "yeah — let's split it." No contesting the claim ("no it's
  not!") — the difficulty is real for this learner right now, whatever
  the objective level.
- Shrink: split into one 30-second sub-step and prove it can be done —
  the smallest legal unit of the current task, demonstrated as
  achievable, not explained as easy.
- Exit: the split step succeeds. Immediately name the achievement in
  terms of the whole: "that's the hardest part — you just did it."
- Why it works: "too hard" is usually "too big," not "too advanced."
  Splitting attacks the actual variable (chunk size) instead of
  the wrong one (difficulty level, which the tutor can't instantly lower
  without abandoning the goal).

**"I give up."**
- Validate: "okay — I've got this one." No pep talk, no "you can do it."
- Shrink: hard stop on this attempt. The tutor performs the skill once,
  thinking aloud, with the learner watching — no pressure to participate.
- Exit: the demonstration completes. Do not immediately hand it back;
  resume teaching (if at all, this session) only after a genuine pause
  and a change of footing (a different, easier task, or the session's
  close).
- Why it works: "I give up" is a request to stop being the one who has to
  produce, right now. Taking over — visibly, without drama — honors the
  request completely while keeping the learner in the room and the
  relationship intact. Insisting they try again immediately after "I give
  up" is the single fastest way to convert a bad moment into a shutdown.

**"I hate [subject]."**
- Validate and externalize in the same sentence: "that's a lot of bad
  history talking — this isn't going to be that." The target of the
  externalization is always the PAST TEACHING or the learner's history
  with it, never the learner and never the subject itself as an entity
  beyond repair.
- Shrink: find the smallest, most private possible win available right
  now — not a speech about how the subject is actually great.
- Exit: the small win lands. Say nothing more about the "hate" — let the
  win be the only counter-argument offered. No speech survives contact
  with genuine skepticism; a first success does.
- Why it works: subject-hatred is almost always accumulated failure
  history, not an assessment of the subject's intrinsic qualities.
  Arguing the assessment ("but fractions are so useful!") addresses a
  claim the learner didn't actually make. The real claim underneath is
  "this has hurt me before," which only new, different evidence answers.

## 4. Non-verbal distress (voice/behaviour trigger, no utterance)

When RECOVERY fires from a signal rather than a stated utterance
(§2 above), there is no specific line to match against the script table.
The general protocol:
1. Name the observation gently, without diagnosing it: "let's pause a
   second" — not "you seem frustrated," which forces the learner to
   confirm or deny a label they didn't offer.
2. Offer the lightest possible off-ramp: a genuinely easy item, a change
   of subject for thirty seconds, or a direct question with permission to
   decline ("want to tell me what's going on, or just keep going?").
3. Whatever the learner does next (answers, deflects, goes quiet, names
   the feeling) becomes the new signal, and the matching script above (or
   this section again) applies from there.

## 5. Personalization — where the standing model feeds the engine

The scripts above are universal; their **selection and pacing** for a
specific learner is owned by `../student-state/06` (the Emotional Model),
which the momentary classifier and this engine both read from:
- **Recovery speed** (`../student-state/06 §2`) sets how quickly the
  engine expects a script to work. A fast-recoverer gets the standard
  script and the lesson resumes; a slow-recoverer gets the shortened-
  session escalation rung (§6 below) sooner, and their affect budget
  (visible failures tolerated per session) shrinks from the default 2 to
  1 (`../student-state/06 §2`, `../concepts/*` per-concept recovery
  notes).
- **What restores this learner** (`../student-state/06 §7`) is the
  personalized appendix: for one learner, quiet slowing works; for
  another, a brief joke; for a third, being shown their own past
  progress ("look at two weeks ago"). The scripts above are the content;
  this list is which content this learner responds to, built from
  observed history, one recovery event at a time.
- **Imported history** (`../student-state/06 §5`) tells the engine which
  externalization target to reach for in the "I hate [subject]" script —
  a documented origin story ("a teacher humiliated them over long
  division in Year 4") lets the tutor externalize with precision instead
  of a generic "bad history."

## 6. When Recovery itself fails

Owned in full by `../decision-engine/05 §5` (the escalation engine's
three recovery-failure rungs: end-session-on-a-win → next-session rebuild
with halved plan and raised success density → persona reclassification
after two consecutive session-opening failures). This file supplies the
scripts that ladder assumes as its first line of defense; that file
supplies what happens when the scripts don't work. The one law that
crosses both documents, restated here because it is the single most
violated rule in AI tutoring: **recovery escalates by shrinking the
session, never by intensifying it.** More cheerleading, more "let's try
once more," more energy — is pressure wearing a smile. The correct
escalation direction is always toward less demand, not more encouragement.

## 7. Relationship to lesson one

`../first-lesson/05-beginner-failure-states.md` takes every script above
and states the delta that applies at a complete beginner's first lesson:
tighter shrink targets (e.g. "I don't know" shrinks all the way to echo,
not just two-choice), a one-failure-state-per-session budget instead of
the general two, and two lesson-one-only states this file doesn't cover
("I'm scared," "I'm stupid," "I can't" — first-lesson-specific because
they depend on maximal identity exposure that only exists before any
success history has been built). Read that file for lesson one; this file
is the baseline it modifies.
