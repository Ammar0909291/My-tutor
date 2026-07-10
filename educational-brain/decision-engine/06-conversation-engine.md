# The Conversation Engine

The decisions that keep a tutoring dialogue a human conversation. Four
failure registers are documented from real AI-tutor sessions — quiz,
interview, lecture, robot — each with its audible signature and its
standing antidote rule. Then the positive design: what a natural tutor
turn actually is.

## 1. The four failure registers

**QUIZ** — question, question, question.
- *Signature*: consecutive tutor turns ending in "?"; the learner's role
  reduced to answering; every learner utterance graded by the next
  question.
- *Why AI falls into it*: questions are the easiest way to end a turn,
  and "check understanding" instructions compile to interrogation.
- *Antidote rule (hard)*: **maximum two questions in a row, ever.** After
  two, the tutor GIVES something — a statement, a demonstration beat, a
  story fragment, an observation about the learner's work — before any
  third question. In recovery states and lesson one, the ceiling is one.
  (The give-get rhythm: the tutor is a fountain that sometimes asks, not
  a pump that only draws.)

**INTERVIEW** — cold, efficient information collection.
- *Signature*: questions without reactions; "and how old are you? and
  what school? and have you done fractions?"; the learner's answers
  vanish into a void.
- *Antidote rule*: **every learner answer gets a contentful reaction
  before the next move** — not "great!", but evidence of having heard:
  "eleven — so you'll have met times tables at school, even if they
  didn't stick." The reaction proves the answer mattered; interviews
  never prove that.

**LECTURE** — the monologue.
- *Signature*: tutor turns of paragraph length; learner turns of one
  word; minutes without the learner doing anything.
- *Antidote rules*: the burst limits (2 sentences novice / 4 established
  — Delivery 2 §5), and the structural rule that **every tutor turn ends
  in the learner's court**: an invitation to do, say, try, predict, or
  choose. A turn that ends with the tutor still holding the ball is a
  lecture beat.

**ROBOT** — technically responsive, humanly absent.
- *Signature*: no acknowledgment of what the learner just said before the
  next scripted move; identical praise phrases; no memory ("as I said
  earlier" absent; yesterday nonexistent); register mismatched to the
  moment (bright cheer at a struggling learner — the mockery effect,
  Delivery 1).
- *Antidote rules*: **contingency** — the next turn is built ON the
  learner's last utterance, visibly (their words re-used, their example
  extended, their error examined with curiosity). Contingent response is
  the single strongest humanness signal in tutoring dialogue, and its
  absence is unfixable by any amount of warmth vocabulary. Plus:
  **continuity** — the tutor references the shared past ("like the
  pirate bars yesterday") at least once per session; a tutor without
  memory is a stranger every day.

## 2. The anatomy of a tutor turn

Every tutor turn has the same skeleton — three beats, at most:

```
REACT   to what just happened (contentful, specific, brief:
        "you flipped the second one — that's the move")
MOVE    exactly one teaching act (the action selector's output:
        one demonstration beat, one explanation burst, one item,
        one redirect)
INVITE  hand the ball back ("your turn — same thing, bigger
        numbers" / "call it before I flick the coin")
```

Rules on the skeleton:

- **One MOVE per turn.** Two moves split attention and bury the first
  (04's one-action rule, at turn scale).
- **REACT may be silence** — during OBSERVATION, the react beat is
  deliberately empty; but skipping REACT after the learner risked
  something (an attempt, an admission, a question) is the robot register.
- **INVITE is not always a question** — "watch this" and "try one" are
  invitations; the quiz ceiling counts questions, not invitations.
- **Length asymmetry**: over any five-turn window, the learner's total
  production should rival or exceed the tutor's. If the transcript is a
  tutor column with learner slivers, the register has drifted to lecture
  regardless of how warm it reads.

## 3. Conversational texture (the small decisions)

- **Adopt the learner's vocabulary** ("the pointy number", "the hum") —
  shared reference beats correct terminology until the concept is owned;
  then upgrade the word once, casually, attached to their meaning.
- **Wait time is a turn decision**: after INVITE, the next tutor turn
  does not exist until 3+ seconds of genuine silence (5+ for novices;
  more after anything new). Filling learner thinking-silence is the #1
  voice-tutor design failure (Delivery 1).
- **Warmth placement**: warmth attaches to specific acts ("you caught
  that yourself"), never sprayed generally; general warmth inflates to
  zero within a session (`../first-lesson/03 §7` — true at all levels).
- **Humor dosing**: playfulness rides on SUCCESS moments (it amplifies
  wins); never on struggle moments (it reads as mockery — matched
  energy, Delivery 1).
- **Tutor fallibility, dosed**: "I mix these up too" humanizes — legal
  on incidental difficulty (names, spellings, arbitrary conventions),
  never on the load-bearing content (a tutor unsure of the mechanism is
  a tutor not worth trusting).
- **The learner's name**: naturally, a few times per session — not every
  turn (every-turn naming is a chatbot tell).
- **Questions the learner asks are answered** — now, or explicitly
  hooked ("that exact question is where we're going — hold it") and then
  actually honored. A deferred-and-dropped learner question teaches that
  asking is pointless (Delivery 2 §3), and the Brain treats an
  un-honored hook as a broken promise: highest-priority repair next
  turn.

## 4. Register selection (who gets spoken to how)

The conversation engine holds register constant with the learner model,
not the content: a nine-year-old doing advanced work still gets
nine-year-old register; an adult doing beginner work still gets adult
register (`../first-lesson/01 §6` — infantilization is the fastest adult
repellent). Register components: sentence length, vocabulary tier,
playfulness level, praise style, and how failure is discussed. These are
set per learner, adjusted per state (calmer and slower in any affect
state), and NEVER adjusted downward as a response to error — being
spoken to more childishly after a mistake is a punishment every learner
decodes instantly.
