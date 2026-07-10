# The Voice-First Learning Model

The instrument set that reads a learner without asking them a question —
cited throughout the tree as "Delivery 1's instruments" and "the voice
channel." A great human tutor diagnoses continuously from HOW something
is said, not only from whether it is right. This is the cheapest
diagnostic channel that exists (`../assessment/02 §7`) because it costs
zero extra questions and runs underneath everything else the learner does.

## 1. The instruments

Four independent signals, read together, feeding the student state
classifier (`../decision-engine/02`) and the OBSERVE step of the teaching
loop (`../decision-engine/08 §1`):

- **Latency vs. this learner's own baseline.** Not absolute speed —
  relative to how fast THIS learner typically answers THIS kind of item.
  A learner who normally answers in two seconds taking eight is a strong
  signal; a naturally slow, deliberate learner taking eight seconds on
  everything is not. The baseline must be personal and must drift as the
  relationship develops — a fixed universal latency threshold
  misclassifies both fast-naturally-slow and slow-naturally-fast
  learners.
- **Prosody** — tone, pacing, and pitch contour. Rising intonation on a
  stated answer reads as hedging even when the words are correct ("it's...
  four?"). Flat, clipped delivery reads as frustration even on a correct
  answer. Whispered or trailing delivery reads as fear regardless of
  content. Prosody is read independently of content — the SAME words
  ("I think so") carry opposite diagnostic weight depending on whether
  they arrive fast-flat (confident, possibly MISCONCEIVING if wrong) or
  slow-rising (GUESSING or FRAGILE).
- **Hesitation location.** Not just whether a pause happened, but WHERE
  in the response it happened — a pause before starting is different from
  a pause mid-sentence, which is different from a pause right before the
  final answer. A learner who starts fluently and stalls only at the
  final step has a different gap (often the last operation) than one who
  stalls before starting at all (often the whole approach).
- **Self-corrections.** A learner who says something and revises it
  mid-utterance is demonstrating active monitoring — a healthy sign even
  when the final answer is wrong, and diagnostically different from a
  learner who commits flatly to a wrong answer with no revision (the
  MISCONCEIVING signature — confident delivery of a systematic error,
  `../decision-engine/02`).

## 2. Wait time — the rule most often violated

**After any invitation, the next tutor turn does not exist until genuine
silence has passed: 3+ seconds for established learners, 5+ for novices,
more after anything genuinely new.** This is stated as the single most
common voice-tutor design failure: filling the learner's thinking-silence
before they have finished thinking.

Why this matters more than it sounds: silence after a question is not
dead air to be minimized — it is where retrieval, construction, and
self-correction actually happen. An AI (or a nervous human tutor)
uncomfortable with pauses tends to fill them with hints, rephrasing, or a
second question — each of which interrupts a process that was working
and replaces it with either a recognition-mode shortcut (which produces
an answer without producing learning) or a compounded cognitive load
(now the learner must process the original question AND the new
interruption). The tutor's own discomfort with silence is never a valid
reason to end it early (Universal Principle 12,
`04-universal-teaching-principles.md`).

The wait-time rule interacts with the OBSERVATION stance
(`../decision-engine/01 §3`): during GUIDED, INDEPENDENT, and ASSESSMENT,
the tutor deliberately holds silence and watches, and only three things
legitimately break it — the learner finishing, a failure-state signal
firing (`01-recovery-engine.md §2`), or the wait-time ceiling for this
specific learner's baseline being reached. Nothing else, including the
tutor's own sense that "enough time has passed," authorizes speaking
first.

## 3. The load-bearing sentence

Every explanation has exactly one sentence that carries the actual
mechanism — the rest is framing, context, or transition. The voice model
requires that sentence be marked vocally: slowed, given a beat of space
before and after it, and never buried mid-paragraph. A tutor who delivers
the load-bearing sentence at the same pace as the framing around it is
asking the learner to guess which words mattered. This is a delivery
discipline independent of WHAT is being explained — it applies whether
the explanation is an analogy, a worked step, or a definition, and it is
the mechanism behind the burst-limit rule (`../decision-engine/01 §3`
EXPLANATION state): a burst that respects the sentence limit but buries
the one sentence that matters has technically followed the rule and
still failed the learner.

## 4. Matched energy — the mockery effect

**Playfulness and humor ride on success moments; they never appear on
struggle moments.** A joke, a light tone, or celebratory energy delivered
while the learner is failing or flooded does not read as encouragement —
it reads as mockery, because the tutor's affect is visibly mismatched to
the learner's actual state. This is the mockery effect: energy that would
be warm and appropriate after a win becomes an insult when the learner is
struggling, regardless of the tutor's actual intent.

The corollary that follows directly: register calms and slows in any
affect state (fearful, frustrated, overloaded) and NEVER becomes MORE
energetic as an attempt to cheer the learner up mid-struggle. Matched
energy means the tutor's tone tracks the learner's actual state, not the
tutor's desired state for the learner.

## 5. Register is a property of the learner and the moment, never a
consequence of error

Register — sentence length, vocabulary tier, playfulness level, praise
style, how failure is discussed — is set by who the learner is (age,
register per `../first-lesson/01 §6`: a nine-year-old doing advanced
material still gets nine-year-old register; an adult doing beginner
material still gets adult register) and adjusted only by the learner's
CURRENT state (calmer, slower in any affect state). It is never adjusted
downward as a consequence of a mistake — speaking more simply or more
cautiously immediately after an error reads to every learner, instantly,
as a demotion in how they're being treated, regardless of the tutor's
intent to be gentle (Universal Principle 10).

## 6. Confidence as a directly-read signal, not only an inferred one

Voice provides two independent readings of confidence that
`../assessment/04` (confidence and calibration) formalizes into a
calibration pair: the STATED confidence (if the learner says "I think" or
"I'm sure") and the BEHAVIORAL confidence (read from these instruments —
speed, prosody, hesitation, independent of what was said). The two
readings frequently diverge — a learner can say "I'm not sure" in a fast,
flat, correct-and-confident tone (genuine underconfidence, the hedge is
verbal habit, not epistemic doubt) or say "I'm sure!" while every
instrument reads GUESSING (overconfidence). The voice model's job is to
supply the behavioral half of that pair; `../assessment/04` owns what the
tutor does with the resulting calibration profile.
