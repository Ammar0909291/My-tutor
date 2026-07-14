# The Misconception Repair Sequence

The full seven-step universal procedure — elicit → commit → collide →
replace → contrast → apply → re-probe — named in the concept entries and
`../student-state/03-misconception-ledger.md` since Delivery 5, but only
ever shown instantiated for two specific misconceptions (fractions' M1/M2,
`../concepts/mathematics/math.arith.fractions.md`). This file is the
generic procedure those instantiations are examples of.

## 1. The seven steps

**1. ELICIT** — surface the misconception's actual working model, in the
learner's own words where possible, using a probe designed to make the
WRONG model produce its specific, characteristic answer — not a vague
"is this right?" but a question the flawed model will confidently answer
incorrectly. Never accusatory framing; the goal is a clean read of the
model currently running, not a test the learner can sense they're
failing.

**2. COMMIT** — get the learner to explicitly stake a claim on the
answer before anything is shown to contradict it: say it aloud, write it
down, or otherwise commit in a way that can't be quietly revised after
the fact. Without a genuine commitment, the next step has nothing to
collide WITH — a prediction never staked cannot be experienced as wrong,
only as "information received." This is prediction-first
(`../foundations/04-universal-teaching-principles.md`, the SHOW family's
prediction rule) applied specifically to a misconception's own answer.

**3. COLLIDE** — present evidence that directly contradicts the
committed answer. This is the step where design must match the
misconception's birth type (`01-birth-taxonomy.md`) — a mismatched
collision fails or, worse, appears to succeed while leaving the model
intact underneath:

| Birth type | Collision design |
|---|---|
| Type 1 (overgeneralization) | Extend the OLD rule one step further, using a method the learner already trusts, until it visibly breaks — the break must come from their own trusted method, not from the tutor's assertion. |
| Type 2 (perceptual intuition) | Must be physical or directly observed — a real object, a real demonstration. Verbal argument does not collide against a model that was never built from words. |
| Type 3 (language contamination) | Present the identical content with the contaminating word removed or replaced, and let the learner notice their own answer changes — the collision is with their own inconsistency, not an external fact. |
| Type 4 (notation-induced) | Translate to a non-symbolic representation (physical, oral) and show the correct behavior there — the collision is between what the notation seems to say and what the un-notated version obviously shows. |
| Type 5 (instruction-induced) | Present a case just past the original narrow teaching example, framed as the next stage, not a contradiction of the earlier one. |
| Type 6 (analogy overextension) | Push the SAME analogy to its own edge — don't abandon it, show precisely where the source domain and the target concept diverge. |

The moment the mismatch lands, let it sit in silence for a full beat
before anyone speaks (`../decision-engine/03 §2`'s MISCONCEIVING-during-
DEMONSTRATION cell) — the silence is doing teaching work; filling it
immediately with an explanation wastes the collision's own impact.

**4. REPLACE** — install the correct model immediately, in the same
breath the collision just created room for. State it once, plainly, as
the load-bearing sentence (`../foundations/03-voice-first-learning-model.md
§3`) — this is not the moment for a lecture; the collision did the work
of opening the door, and the replacement should be a single clear
sentence walking through it.

**5. CONTRAST** — hold the old and new models side by side explicitly,
and name WHY the old one felt right and WHERE exactly it stops working.
This step is what prevents the old model from merely going underground
rather than genuinely updating, and it is where the birth-type diagnosis
pays for itself directly: name the old rule's actual home domain (type
1), name the specific unmapped analogy feature (type 6), name the word
doing double duty (type 3). A repair that skips this step and moves
straight from replace to practice frequently produces REPAIRED-FRAGILE
status that regrows at the first opportunity, because the learner never
learned WHY the old model was wrong, only that it was.

**6. APPLY** — the learner uses the new model on a fresh instance, in a
DIFFERENT surface form than the collision case — never the identical
problem, which only tests memory of the collision rather than
generalization of the new model.

**7. RE-PROBE** — the delayed, disguised, speeded verification that
actually distinguishes genuine repair from surface compliance. Never
same-session (Universal Principle 17,
`../foundations/04-universal-teaching-principles.md`) — a correct
application minutes after the collision proves only that the collision
was memorable, not that the model has replaced the old one under load.
This step feeds directly into the ledger's own status lifecycle
(`../student-state/03 §2`: ACTIVE → REPAIRED-FRAGILE → INHIBITED →
DORMANT-VERIFIED) — that lifecycle is fully owned by the ledger file and
is not restated here; this step is simply the ACT of running the probes
the lifecycle's transitions depend on.

## 2. What "the next natural seam" means for step 1

The Decision Matrix (`../decision-engine/03 §1-§4`) already establishes
that a misconception surfacing mid-lesson is never spot-corrected — it
is routed to "the next natural seam," meaning the repair sequence above
runs as its own dedicated pass, not squeezed into whatever activity was
already underway. Steps 1–2 (elicit, commit) can happen at the moment of
discovery, since eliciting the model and getting the learner to commit
is low-cost and often IS the discovery. Steps 3–7 (collide onward)
require the dedicated CORE slot the lesson-planning engine reserves for
misconception repair (`../decision-engine/07 §4`: "misconception repairs
get their own CORE slot — never appended to the end of another lesson").

## 3. Burned collision — precise definition

A collision case is **burned**, for a specific learner and a specific
misconception, when both of these are true:
1. It was used in an actual COLLIDE step (not merely mentioned or
   referenced afterward — invoking a past collision as an anchor, "remember
   the ice cube?", is not a repeat attempt and does not burn it further).
2. The subsequent re-probe (step 7) showed regrowth — the misconception
   fired again after this collision was used.

A collision is **not** burned merely by being used once successfully — a
collision that produced a lasting repair remains available to reference
as an anchor indefinitely, and referencing it is in fact good practice
(it invokes evidence the learner already owns).

**Why a burned collision must never be reused for a second repair
attempt**: the mechanism that makes COLLIDE work is surprise against a
genuine commitment — a mismatch the learner did not see coming. A second
attempt with the identical case removes the surprise entirely; the
learner has already seen this exact trick fail to change their mind once,
and repeating it signals "I've seen this and it didn't stick" rather than
producing a fresh mismatch. This is `../assessment/09 §4`'s isomorph rule
(no identical-item repetition after a failed assessment) applied
specifically to collision case design — a second repair attempt requires
a genuinely different collision case, not a rephrased version of the same
one, and ideally a different sensory modality or example domain entirely
(if the first attempt was verbal-analogical, the second should be
physical; if the first was symbolic, the second should be enacted).

## 4. Metastasis chains — how a corrupted floor propagates

`../student-state/03 §4` already states the consequence: "a prerequisite
with an ACTIVE entry is a corrupted floor, treated as more urgent than an
absent one." This section explains the mechanism and gives the missing
operational trigger.

**The mechanism**: an ACTIVE misconception in a prerequisite concept does
not stay contained to that concept. Every downstream concept that is
taught assuming the prerequisite is soundly understood builds new
instruction directly on top of the flawed model, without re-verifying it
— because ordinary teaching has no reason to re-check a concept that was
supposedly mastered already. A learner with an active add-across
misconception in basic fraction addition doesn't just get fraction-
addition problems wrong; the same flawed model silently corrupts every
later concept that assumes correct fraction addition — ratio problems,
algebraic fractions, probability calculations that sum fractional
likelihoods — because each of those was taught as if the floor beneath
them were solid.

**Why this is worse than an absent prerequisite**: an absent prerequisite
produces a visible failure at the point the gap is first needed — the
tutor sees it and can repair it immediately. A corrupted prerequisite
produces PLAUSIBLE-LOOKING WORK downstream that is actually being
computed through the wrong model, often for several concepts, before a
failure pattern becomes visible — by which point the propagation has
already reached multiple downstream concepts, each of which now needs its
own correctness re-checked once the floor is repaired.

**The chain-check trigger** (the operational protocol this section adds):
whenever a new concept is about to be taught, and ANY concept in its
prerequisite chain has an ACTIVE (unrepaired) misconception ledger entry,
the repair sequence for that prerequisite's misconception runs BEFORE
teaching the new concept begins — not after a downstream failure surfaces
it. This extends the just-in-time prerequisite-repair logic
`../placement/05 §5` already established for ABSENT prerequisite gaps
("the gap is on the schedule — it just runs when it matters") explicitly
to ACTIVE misconceptions: a corrupted floor is scheduled for repair at
the same just-in-time trigger point an absent floor would be, except a
corrupted floor's repair cannot be deferred as casually, because every
session taught on top of it before the repair adds one more downstream
concept that will need re-verification once the repair finally runs.
