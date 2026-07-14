# The Voice-First Learning Model

The instrument set that reads a learner without asking them a question —
cited throughout the tree as "Delivery 1's instruments" and "the voice
channel." A great human tutor diagnoses continuously from HOW something
is said, not only from whether it is right. This is the cheapest
diagnostic channel that exists (`../assessment/02 §7`) because it costs
zero extra questions and runs underneath everything else the learner does.

**Read §7 before applying §1's instruments to any real session.** This
document was authored describing what a tutor CAN read from voice in
principle. §7, added under critical-review, states plainly what the
actual runtime today does and does not deliver of that signal — the gap
is real, verified against the live code, and larger than "not yet wired."

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

## 7. Channel reality — what actually reaches the teaching layer today

Added under critical review (`../validation/07-architecture-audit.md`'s
method applied to this file specifically): §§1–6 above describe what a
tutor CAN read from voice. This section verifies, against the live
runtime code, what the product actually captures and delivers to the
teaching decision layer — because a document that quietly assumes signal
availability it doesn't have is worse than one that names the gap, and
every concept entry's required "Voice teaching" section (`../concepts/
TEMPLATE.md`) inherits whatever this file gets wrong here.

**The product has real voice input — this is not a cosmetic label.**
`src/components/learn/LessonScreen.tsx` implements an actual microphone
pipeline: `MediaRecorder` captures audio, which is sent to
`src/app/api/stt/route.ts` and transcribed by Groq's `whisper-large-v3`;
a faster path uses the browser's native `SpeechRecognition` API where
available (Chrome/Edge, English only today). Text-to-speech exists for
output. Voice is a genuine, live input/output channel in this product —
the earlier working assumption in this file that voice signals are
simply absent was wrong, and is corrected here.

**But every instrument in §1 is discarded before the teaching layer ever
sees a turn.** The STT endpoint requests `response_format: 'json'` from
Whisper — which returns bare transcribed text only — and returns exactly
`{ text: transcription.text }` to the client. No segment-level
timestamps, no per-word confidence, no pause locations, no pitch or
energy data survive the transcription step. The client then sends that
plain text string to the chat endpoint exactly as if the learner had
typed it. By the time `route.ts` (or any Brain-adjacent code) sees the
turn, it is indistinguishable from a typed message — **latency,
prosody, hesitation location, and self-corrections-mid-utterance are all
architecturally unavailable to the decision layer today, regardless of
whether the learner used voice or text to answer.** This is not "not yet
wired" in the sense the rest of this tree uses that phrase (content that
exists but isn't retrieved) — it is signal that is captured by the
client, actively discarded by a specific implementation choice in one
API route, and was never designed to reach the Brain at all.

**What this means for every instrument in §1, honestly:**

| Instrument | Available today? | Why |
|---|---|---|
| Latency vs. baseline | NO from voice; PARTIALLY from text | Recording start/stop timestamps exist client-side (`mediaRecorderRef`) but are never sent to the backend. Text-channel message send-time IS available server-side today (ordinary timestamps on `Message` rows) and could support a real latency-vs-baseline read with no new capture work — the gap is voice-specific, not universal. |
| Prosody | NO | Requires audio-feature analysis (pitch, energy contour) that no part of the current pipeline performs. Whisper transcribes words; it does not analyze how they were said. This instrument has no current data source in either channel. |
| Hesitation location | NO from voice; WEAK proxy from text | A pause mid-recording is invisible after transcription to plain text (no timestamps kept). In text, a learner's typing pattern (an edited message, an ellipsis, "wait...") is a weak but real proxy — visible in the final text sent, not requiring new capture. |
| Self-corrections | NO from voice; YES from text | If a learner types "6... wait, no, 8," this is fully visible in the plain text and requires no additional capture — this is the one instrument the text channel already delivers as well as voice could, given the current STT format. |

**What would be cheap to recover, if this gap is ever closed** (ranked by
implementation cost, for whoever eventually works the Migration
Blueprint's runtime phases — this is a note for that future work, not a
design authored here):
1. Switch the STT request to Whisper's `verbose_json` format instead of
   `json` — this alone recovers per-segment timestamps (start/end of each
   spoken phrase) at zero additional infrastructure cost, enabling a real
   pause-location read from voice turns.
2. Send the client's already-captured recording start/stop timestamps
   alongside the transcript — recovers total response latency for voice
   turns with no new capture, only a payload addition.
3. True prosody/pitch analysis would require a dedicated audio-features
   step beyond Whisper (Whisper transcribes; it does not classify tone) —
   this is the one instrument with no cheap path and would need new
   infrastructure, not a request-parameter change.

**Relationship to the Migration Blueprint's structured signal tag**
(`docs/architecture/MIGRATION_BLUEPRINT_V1.md` Phase 3): that mechanism
has the LLM self-report its own read of the learner's state via a
`<!--SIGNAL-->` tag embedded in its response. This is worth naming
explicitly as what it actually is: a substitute for the instruments in
this file, generated by the same model that is also trying to teach the
concept, not an independent measurement. It is a reasonable interim
mechanism given the channel reality above, but it is not equivalent to
real voice instrumentation, and should not be described as satisfying
this file's requirements — it is a different, weaker, self-reported
signal filling the gap this section names.

**The correction this section makes to every concept entry authored so
far**: `../concepts/english/eng.phonics.phonemic-awareness.md`'s Voice
Teaching section (Delivery 14) states "every success and every failure
is audible" without this caveat — that statement is true of what a human
tutor hearing the learner live would perceive, and is false as a
description of what reaches the teaching decision layer in the product
today, for exactly the reasons in this section. Concept authors should
write Voice Teaching sections describing the ideal tutor's perception
(§§1–6's model), while this section is the standing, single place that
states what's actually deliverable — concept entries should not each
re-litigate the channel-reality gap individually.
