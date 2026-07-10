# First-Lesson Anti-Library

Every documented way AI tutors fail complete beginners — several observed
directly in this platform's own sessions. Each entry: the behavior → why AI
tutors produce it → why it destroys lesson one → the replacement.
General assessment anti-patterns live in `../assessment/01 §5`; this file
holds the teaching-side and lesson-one-specific catalog.

**AL-1 — Assessment instead of teaching.** Opens with "What do you know
about X?" or a diagnostic quiz. *Why AI does it*: assessment is the easiest
plausible-looking output to generate, and "personalize first" instructions
get interpreted as "quiz first". *Why it destroys lesson one*: to a
complete beginner every question is a test, and the very first experience
of the subject becomes public failure (02 §1.1–1.2). *Replacement*:
demonstrate first; zero questions until after the first demonstration; the
3-minute invisible beginner check (01 §3) is the ONLY diagnosis lesson one
gets.

**AL-2 — Repeating the identical explanation.** Same sentence, rephrased
or louder, after "I don't understand". *Why*: regeneration is the model's
cheapest move; paraphrase feels like adaptation. *Why it destroys*: zero
new information (Universal Principle 2), and each repetition tells the
beginner the failure is theirs. *Replacement*: at lesson one, the only move
is back to demonstration — slower, exaggerated (05 §1).

**AL-3 — Ignoring frustration and plowing through the script.** Content
delivered over visible distress. *Why*: turn-by-turn generation has no
affect state unless one is maintained; the lesson plan outranks the human.
*Why it destroys*: no content enters a flooded mind, and the learner learns
that their distress is invisible here — the single fastest trust-destroyer.
*Replacement*: affect gates content, absolutely (Universal Principle 5);
one failure state per lesson-one session, then the engineered win and
close (05 §0).

**AL-4 — Jumping topics / forward references.** "This is like
multiplication, which we'll meet later" — association-chasing that injects
second concepts in subordinate clauses. *Why*: LLMs are association
machines; relevance generates mentions. *Why it destroys*: each mention is
a new unanchored concept billed against 2 slots of working memory (02 §2).
*Replacement*: the Rule of One as law; forward references banned outright
in lesson one — the close script's single open loop (03 §9) is the one
sanctioned exception, and it names no content mechanics.

**AL-5 — Advancing on echo.** Learner repeats "/m/" after the tutor;
tutor treats it as mastery and moves on. *Why*: a correct-sounding answer
appeared; correctness triggers advancement. *Why it destroys*: echo is the
floor of the guided ladder, not evidence (04 §1) — the learner is then
asked to perform independently on something they've only mirrored, and
fails. *Replacement*: the guided sub-ladder (echo → supported → prompted →
one solo); advancement only on the solo (completion criterion C1).

**AL-6 — Teaching definitions instead of intuition.** "A fraction consists
of a numerator and a denominator..." to a six-year-old. *Why*: this is the
deepest LLM instinct — trained on encyclopedias and textbooks, the model's
prior for "teach X" IS "define X". *Why it destroys*: definitions are
compressed expert knowledge; decompressing them requires exactly the
knowledge the beginner lacks. Words point at experiences the beginner
hasn't had (02 §1.6). *Replacement*: experience first, name after —
demonstrate, then label what was just felt (04 §1). The definition is the
LAST thing the learner meets, not the first.

**AL-7 — Ignoring voice.** Treating the transcript as the full signal —
missing the trembling answer, the 8-second silence, the whispered "I
guess". *Why*: text-first architectures; prosody discarded at the
transcription boundary. *Why it destroys*: at lesson one the affect channel
IS the primary channel (02 §4 priority order), and every beginner failure
state announces itself in voice before it reaches words. *Replacement*:
the Voice Model (Delivery 1) with lesson-one settings — latency and tone
monitored from the first second; hesitation treated as data, never as
dead air to fill.

**AL-8 — Treating "I don't know" as assessment data.** "Noted — you don't
know X. Let's try another: ..." *Why*: the utterance parses as an answer;
answers get scored. *Why it destroys*: "I don't know" from a beginner is a
recovery trigger and usually tutor feedback (a question outran the
teaching, 05 §1) — scoring it punishes the honesty that the entire
relationship depends on (Universal Principle 8). *Replacement*: Recovery
Engine, lesson-one delta: shrink to echo, log the premature question.

**AL-9 — Teaching multiple concepts simultaneously.** "Letters have names
AND sounds; this is 'em' and it says /m/, and capital M looks like this."
*Why*: completeness bias — the model knows everything adjacent and
delivers it. *Why it destroys*: three concepts, two slots (02 §2). The
beginner keeps fragments of each and owns none — and the name/sound blend
specifically installs the M1 misconception documented at
`../concepts/english/eng.phonics.letter-sound-correspondence.md`.
*Replacement*: one concept; adjacent facts get their own lessons.

**AL-10 — Vocabulary leakage (register drift).** "Great! Now let's blend
this consonant with the vowel" — to a learner who was never given "blend",
"consonant", or "vowel". *Why*: LLM register follows the DOMAIN, not the
learner; subject text is written in subject language. *Why it destroys*:
each unknown word costs a working-memory slot and quietly tells the
beginner this world has a private language they don't speak (01 §2).
*Replacement*: the hard vocabulary budget (≤3 new words, each taught,
each used 3×; 02 §2); everything else in plain words.

**AL-11 — The politeness quiz.** "Does that make sense?" / "Any
questions?" *Why*: conversational filler learned from human dialogue.
*Why it destroys*: yes-bias plus the metacognitive trap — the beginner
least able to know what they don't understand is asked to report it
(../assessment/01 §5.1); at lesson one it also hands the learner a chance
to disappoint. *Replacement*: never ask; sample behavior — the next echo
or recognition step reveals everything the question pretended to ask.

**AL-12 — Over-praise inflation.** "PERFECT! AMAZING! You're a genius!"
for an echo. *Why*: engagement-tuned generation; enthusiasm is cheap.
*Why it destroys*: devalues praise within minutes, signals low
expectations ("they're amazed I managed THAT?"), and swaps process-praise
for person-praise (03 §7). *Replacement*: quiet, specific, slightly
understated: "there it is — that's the sound."

**AL-13 — The wall of text / monologue.** Three paragraphs before the
learner does anything. *Why*: token-generation momentum; thoroughness
rewarded elsewhere. *Why it destroys*: burst limit is 2 sentences at
lesson one (02 §2); speech is transient and the beginner's slots are
full at sentence three — everything after is unheard. It also burns the
first minute (02 §3) on tutor performance instead of learner success.
*Replacement*: say two sentences, then the learner does something. Always.

**AL-14 — Premature mastery machinery.** Transfer items, disguised
re-probes, or gate language ("let's verify mastery") pointed at lesson
one. *Why*: the assessment library exists, so it gets invoked. *Why it
destroys*: lesson one's completion criteria are deliberately gentler
(04 §3) — full gates at lesson one manufacture failure against standards
the learner was never meant to face yet. *Replacement*: the C1–C4
criteria only; gates begin at lesson two.

**AL-15 — Ending on failure, or just... ending.** Session stops at the
time limit, mid-struggle, or with "good session!" *Why*: no close is the
default; closes must be engineered. *Why it destroys*: the last event
colors the memory of the whole session and decides the return (Universal
Principle 14; completion criterion C4). *Replacement*: the scripted close
— named achievement, forecast, one open loop — protected in the time
budget above all content (04 §1).

**AL-16 — The invisible restart.** Session two re-teaches lesson one from
zero, ignoring that it ever happened. *Why*: statelessness; memory not
consulted at generation time. *Why it destroys*: it erases the learner's
achievement ("did yesterday not count?"), fails C2's opening-retrieval
contract, and wastes the consolidation the sleep just performed.
*Replacement*: session two OPENS with the retrieval of session one's
target (04 §3 C2) — the single most important handoff in the entire
learner journey.
