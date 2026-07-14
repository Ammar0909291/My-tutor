# Resumption — Returning After an Absence

How the placement engine handles a learner who returns after days,
weeks, months, or years. The central insight: **storage survives
absence; retrieval strength does not.** The difference between a
returning learner and a new learner is not how much they know —
it is how quickly they recover what was laid down.

---

## 1. The returning learner's fundamental difference

A new learner has no storage. Their knowledge ladder starts at UNKNOWN
across the board. Every rung must be built from scratch.

A returning learner has storage — the structural memory traces laid down
by prior learning. Their storage strength (Delivery 2 §8: how durable
the storage is) does not decay at the same rate as their retrieval
strength (how easily the concept comes to mind). This is the key
distinction the placement engine must honor:

- A new learner who cannot answer a question: knowledge is absent.
  Response: teach it.
- A returning learner who cannot answer a question: retrieval is
  impaired; storage may be intact. Response: probe for storage first
  (cued-recovery), then teach only if storage is genuinely gone.

Treating a returning learner as a new learner is the invisible-restart
anti-pattern (`../first-lesson/06 AL-16` extended to all sessions).
It wastes the most valuable asset in long-term learning: the stored
representations built during earlier sessions.

---

## 2. Decay timeline — what to expect by gap length

These are approximate expectations, not precise measurements. The
learner's personal forgetting rate (`../student-state/07 §3`) refines
them.

| Gap length | Expected status of frontier-category gate concepts | Resumption protocol |
|---|---|---|
| < 3 days | STABLE or RECENTLY-LEARNED | Continue from where the session left off; no warm-up needed beyond OPENING retrieval |
| 3–14 days | STABLE or beginning FRAGILE | Normal OPENING retrieval (due reviews per the memory engine); one retrieval item for the frontier gate concept |
| 2–8 weeks | FRAGILE to FORGOTTEN for some gate concepts; STABLE for older ones | Warm-up protocol (§3); expect most to recover in 5–10 minutes |
| 2–6 months | FORGOTTEN for recent frontier work; STABLE for well-consolidated earlier categories | Extended warm-up (§3); binary-search from the last STABLE category upward |
| 6–24 months | FORGOTTEN broadly; deep storage may still be intact for the oldest, most-practiced concepts | Re-placement starting from the high-water mark (§4); expect cascade unlocks |
| > 2 years | Storage likely intact for heavily-practiced concepts; inaccessible without cues for others | Full re-placement, but starting from the high-water mark — NOT from Beginner unless the learner was a Beginner |

---

## 3. The warm-up protocol (not reteaching)

The warm-up is the returning learner's session-open before any new
content. It is NOT reteaching; it is cued retrieval — activating stored
knowledge that has become less accessible due to time.

```
WARM-UP PROTOCOL

Duration: 5–10 minutes, no more. If it runs longer, the gaps
are larger than warm-up can address → switch to re-placement (§4).

Form: retrieval items from the frontier's gate concepts, in order
from most recently taught (weakest storage) to earlier (strongest
storage). Retrieval is CUED — not "what is the formula for X?"
but a context-rich trigger: "remember how we worked out the unit
rate problem last session? What did you do first?"

Cue design matters:
  Bad cue: "what is fraction equivalence?" (pure recall — hard)
  Good cue: "remember the pizza-sharing approach — if you're
  splitting 2 pizzas between 3 friends, what fraction does each
  person get? And how would you show that's the same as 4/6?"
  (context-rich, activates the encoding context)

Expected cascade: FORGOTTEN items that retrieve on a cued prompt
  are RECOVERED (student-state/07 §1). Recovery typically cascades:
  one retrieved item activates related items in the same context.
  When cascade is happening (the learner starts filling in details
  unprompted), do NOT interrupt — let the cascade run; it is the
  fastest recovery mechanism that exists.

End trigger: two consecutive items retrieved fluently → warm-up is
  done; move to the session's CORE content.
  OR: two consecutive failed retrievals despite cues → warm-up cannot
  do the work; switch to re-placement protocol (§4).

What NOT to do:
  - Do not re-introduce the concept ("today we're going to go over
    fractions again") — the framing activates "learning new" rather
    than "recovering known"
  - Do not spend more than 10 minutes on warm-up — it is not the
    session's job; the session's job is advancing the frontier
  - Do not ask "do you remember X?" — memory questions produce
    binary yes/no rather than retrieval activation; produce-the-
    answer items activate storage, yes/no questions test meta-memory
```

---

## 4. Re-placement for long gaps (6+ months)

When the warm-up protocol cannot recover the frontier-adjacent concepts
(two consecutive failed retrievals), the system runs a re-placement.
Re-placement differs from initial placement in one critical way:

**Re-placement starts from the high-water mark, not from the curriculum's
beginning.**

The high-water mark (`../student-state/02 §2 law 3`) is the highest
rung the learner has ever reached on each concept — the un-modulated
peak. A learner whose high-water mark is rung 5 (AUTOMATIC) on fraction
equivalence has not forgotten that fraction equivalence exists; they
have lost the retrieval access to it. Re-placement starts its binary
search near the high-water mark, not at the curriculum's beginning.

```
RE-PLACEMENT PROTOCOL (long gap)

1. Locate the high-water category — the last category whose gate
   concepts have high-water marks at rung 4 or above.
2. Run the warm-up protocol on that category's gate concepts.
3. If warm-up passes → the learner has recovered to the high-water
   mark. Set the frontier there and resume normally.
4. If warm-up fails → move one category below the high-water mark
   and repeat from step 2. Continue binary search downward until
   the warm-up passes.
5. The new effective frontier is one category above the deepest
   category that fully recovered. Note: this is almost always
   ABOVE the learner's initial placement level — storage from
   prior learning is not erased by absence; only retrieval access
   is impaired.
6. Record: this is a RECOVERY event, not a regression demotion.
   Category confidence levels update to PROBABLE (not UNCERTAIN)
   for recovered categories — the high-water mark evidence is
   still there; this is RECOVERED status, not new evidence.
```

**The cascade-unlock expectation**: when a learner who has been away for
months begins to retrieve frontier-adjacent content, they often recover
3–5 categories in a single session — far faster than they were originally
learned. This is the relearning advantage (`../student-state/07 §1
RECOVERED`): storage traces left by prior learning make re-acquisition
dramatically faster than first acquisition. The tutor should expect this
and build the session plan around it (do not pre-plan only one category
for a long-gap return session — leave headroom for the cascade).

---

## 5. The returning learner's emotional state

The technical protocol above must run inside the returning learner's
emotional reality:

- Returning after a long absence often produces shame about the gap.
  The tutor's first job is to name the return as welcome without
  calling attention to the length of the absence. "Good to continue
  — let's find where we are" is correct. "Wow, it's been a while"
  is not.
- First recovery successes are emotionally significant — the learner
  is discovering that they have NOT lost everything. This is a relief
  that deserves naming once: "it's still there — the break didn't
  erase it." After that, move on.
- The returning learner's self-estimate is often bleaker than reality.
  They expect to have forgotten everything. The cascade-unlock that
  follows is often more surprising to them than to the tutor. The
  tutor should predict this without promising it ("let's see how much
  comes back — often more than you expect").
- If the warm-up fails unexpectedly — if the returning learner truly
  cannot recover content that should have been durable — this is NOT
  a reason to restart from scratch silently. It is a reason to ask
  (once, gently) about contextual factors: health, stress, a major
  life event. External factors can suppress retrieval that is still
  structurally intact. If retrieval normalizes in the next session,
  this was weather, not climate.

---

## 6. Switching subjects after a gap

When a learner returns to one subject after focusing on another (or
after studying nothing for a while), the placement engines for each
subject are independent. The resumption protocol runs per subject.
A learner who has been away from mathematics but has been using English
every day will have very different warm-up needs for each subject —
the emotional return may also be asymmetric (returning to a subject
they struggle with vs. one they are confident in).

The session shape for a multi-subject return session:
- OPENING: warm-up for the subject being resumed (not a review of
  both subjects simultaneously — one job per session)
- CORE: the frontier of the resumed subject
- No second subject in the same session as a re-placement (too much
  cognitive and emotional load)
