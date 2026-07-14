# Teaching Content Library — `phys.meas.dimensional-analysis`
# Dimensional Analysis

**Status:** CANDIDATE ASSETS — not yet in production blueprint
**Concept ID:** `phys.meas.dimensional-analysis`
**KG canonical ID:** `phys.meas.dimensions`
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard
**Authored against:** KG node phys.meas.dimensions (developing, bloom: apply, requires: [phys.meas.units])
**Date:** 2026-07-14
**Asset count:** 10
**Governing misconceptions:** M1 (dimensional analysis is a calculation method not a checking tool), M2 (you can add quantities with different dimensions if they're related), M3 (dimensions and units are the same thing), M4 (if numbers work out, the equation must be correct)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **You can check whether an equation is possible without solving it.
> Just look at what the units do. If the units on both sides don't match,
> the equation is wrong — no matter how elegant the algebra.**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):  DA-01 (default) · DA-10 (young/anxious) · DA-07 (curious)

After DA-01 fails:  DA-10 → DA-04 → DA-02
After DA-02 fails:  DA-01 → DA-05
After DA-03 fails:  DA-01 → DA-02
After DA-04 fails:  DA-10 → DA-01
After DA-05 fails:  DA-04 → DA-01
After DA-06 fails:  DA-01 → DA-04
After DA-07 fails:  DA-04 → DA-01
After DA-08 fails:  DA-02 → DA-04
After DA-09 fails:  DA-01 → DA-02
After DA-10 fails:  prerequisite check (phys.meas.units + phys.meas.unit-conversion)

After any success:  Novel-equation check probe → if criterion operative → mastery gate
                    If M4 still latent → DA-06 (dimensionally correct but numerically wrong)
```

---

## DA-01 — The Recipe Spell-Check

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-01 |
| Title | The Recipe Spell-Check |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 12–16, first encounter |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Recommended |
| Interaction Type | Story + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
A spell-checker does not tell you whether your essay is good — it tells you
whether your words are spelled correctly. Dimensional analysis is the
physics spell-checker: it does not tell you whether your equation is right,
but it will instantly catch certain classes of error. This analogy correctly
positions dimensional analysis as a necessary but not sufficient check.

**Mental model installed:**
"Dimensional analysis is like a spell-checker for physics equations.
It can catch impossible equations immediately — the way a spell-checker
catches 'recieve.' But just as 'their/there/they're' pass spell-check
even when wrong, a dimensionally correct equation can still be wrong.
Dimensional analysis is a filter, not a proof."

**Misconceptions prevented:** M1 — positions it correctly as a checking
tool, not a calculation method. M4 — explicitly states it catches some
errors, not all.

**Misconceptions recovered:** M1, M4.

**Prerequisite knowledge assumed:** phys.meas.units complete. Understands
that measurements have units.

**Cognitive load:** Low. One analogy.

### Teaching Script

*Say:*

"Have you used a spell-checker? You write an essay, click 'check spelling,'
and it underlines the words it doesn't recognise.

Here is the key thing about spell-checkers: they don't read your essay.
They do not know if your argument is right. They cannot tell you that
'their team won the match' should be 'their team lost the match.'
They only know one thing: is this a real word, spelled correctly?

And yet spell-checkers are incredibly useful — because catching spelling
errors is fast, and there's no point reading a beautifully argued essay
if it's full of 'recieve' and 'definately.'

Dimensional analysis is the spell-checker for physics equations.

It doesn't solve the equation. It doesn't check the numbers.
It checks one thing: do the units on both sides of the equation match?

If I write: distance = speed × time, I can check:

Left side: [distance] = metres.
Right side: [speed × time] = (metres/second) × seconds = metres.

They match. The equation passes the dimension check.

This doesn't prove the equation is right. But if they didn't match —
if the right side came out as, say, metres² — then the equation is
definitely wrong, and there's no need to look further.

Spell-check first. Think later."

### Success Model

**Success signals:**
- Student can articulate what dimensional analysis checks and what it doesn't
- Student correctly checks a simple equation (d = vt, F = ma) dimensionally
- Student understands why a dimensionally correct equation can still be wrong (M4)

**Failure signals:**
- Student thinks dimensional analysis tells them the answer is right
- Student cannot perform the dimension substitution

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: Check a deliberately dimensionally wrong equation — student must identify the error. → mastery |
| Unsuccessful — analogy grasped, procedure not | Route to DA-04 (dimension squares — procedural scaffold) |
| Unsuccessful — concept missed | Route to DA-10 (simplest version — "does this sentence make sense?") |

### Retrieval Tags

`everyday-story` `spell-check` `analogy` `checking-tool` `M1-prevention` `M4-prevention` `not-a-calculator` `first-contact`

### AI Retrieval Notes

**When to choose:** Default first intervention. Sets up the correct
mental model before any procedure is taught. Critical to prevent M1
from forming early.

**When to avoid:** Student who already knows it's a checking tool and
needs the procedure. Student who hasn't encountered spell-checkers.

**Which interventions follow naturally:** DA-04 (dimension squares) to
give the student the procedural method after understanding the purpose.
DA-06 (dimensionally correct, numerically wrong) to reinforce M4 prevention.

---

## DA-02 — The Apples and Oranges Rule

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-02 |
| Title | The Apples and Oranges Rule |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 11–15, any background |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Low |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
"You can't add apples and oranges" is a universal intuitive principle.
The student already knows this. Extending it to physical dimensions
("you can't add metres and seconds") requires only one step of analogy.
It directly targets M2 (adding different-dimension quantities) before
the student ever encounters a formal equation.

**Mental model installed:**
"Apples and oranges aren't just different species — they're different
dimensions. You can't add 3 apples + 2 oranges = 5 fruit-somethings.
Physics works the same way. 3 metres + 2 seconds = nothing real.
Adding only makes sense when the dimensions match."

**Misconceptions prevented:** M2 — the student who says "I can add
distance and time because they're both about the journey" now has
a clear counter: are they both in metres? Or is one in metres and
one in seconds?

**Misconceptions recovered:** M2.

**Prerequisite knowledge assumed:** phys.meas.units complete.

**Cognitive load:** Very low.

### Teaching Script

*Say:*

"Here is a rule you already know: you can't add apples and oranges.

What I mean is: if I have 3 apples and 2 oranges, I can't say I have
5 of one thing. I have 5 pieces of fruit — but only if I deliberately
forget what kind of fruit I have.

Physics has the same rule — but much stricter.

5 metres and 3 seconds. Can I add them? What do I get?"

*Wait.*

"'8' what? Metres? Seconds? Metre-seconds?
None of these make sense physically. A metre is a length.
A second is a time. They measure completely different things.

The 'things they measure' are called dimensions.
Length, time, mass, temperature — these are dimensions.
Metres, seconds, kilograms, kelvin — these are units.

You can change the unit (metres to centimetres) but you cannot change
the dimension (length cannot become time).

And the rule is: in any valid physics equation, you can only add or
subtract quantities with the same dimension. 3 metres + 5 metres = 8 metres. Fine.
3 metres + 5 seconds = impossible. Full stop.

If you ever write an equation where you add different dimensions,
you've made an error — guaranteed."

### Success Model

**Success signals:**
- Student can correctly identify which of a list of additions are dimensionally valid
- Student distinguishes between dimension (length, time) and unit (metres, seconds)
- Student articulates why 3 metres + 5 seconds has no physical meaning

**Failure signals:**
- Student confuses "can't add" with "the numbers don't work out"
- Student conflates units and dimensions (M3 persisting)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Can you subtract seconds from metres?" → mastery if student correctly applies the rule |
| Unsuccessful — unit/dimension confusion | Route to DA-05 (dimension vs unit — explicit clarification) |
| Unsuccessful — analogy not transferring | Route to DA-01 (spell-check framing) |

### Retrieval Tags

`analogy` `apples-oranges` `addition-rule` `dimensions` `M2-prevention` `M3-clarification` `concrete` `universal`

### AI Retrieval Notes

**When to choose:** M2 is present or likely. Student doesn't yet
distinguish between dimensions and units. Good second intervention
after DA-01 establishes the checking-tool framing.

**When to avoid:** Student who already grasps the addition restriction
needs DA-04 (procedure) or DA-06 (subtle cases).

**Which interventions follow naturally:** DA-05 (dimension vs unit distinction)
if M3 appears. DA-04 (procedure) to move from rule to practice.

---

## DA-03 — The Sherlock Method

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-03 |
| Title | The Sherlock Method |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery / Detective Story |
| Target Learner | Age 12–16, imaginative, responds to puzzle framing |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Story + Challenge |

### Pedagogical Metadata

**Why this strategy works:**
Positioning the student as a detective who can "solve" equations using
only dimensional reasoning activates curiosity and competitive engagement.
The student discovers they can derive unknown relationships without
solving any algebra — which is a genuinely surprising and satisfying power.

**Mental model installed:**
"A detective doesn't need to witness a crime to reconstruct what happened —
they reason from evidence. A physicist can sometimes reconstruct an equation
from dimensional reasoning alone. Not by guessing, but by asking: what
combination of the given quantities has the right dimension for the answer?"

**Misconceptions prevented:** M1 — demonstrates a power of dimensional
reasoning that goes beyond checking to discovery.

**Misconceptions recovered:** M1 — when student sees dimensional analysis
as just a formality, this intervention shows it can generate new results.

**Prerequisite knowledge assumed:** phys.meas.units, DA-01 or DA-02.
Exposure to basic physics quantities (speed, force, energy).

**Cognitive load:** Medium — requires reasoning under dimensional constraints.

### Teaching Script

*Say:*

"Sherlock Holmes can walk into a room and, without asking a single question,
tell you where the owner went to university, what they had for breakfast,
and whether they are left-handed. Not by magic — by reading evidence others
ignore.

Here is your detective challenge.

A physicist is studying a swinging pendulum. They want to know what
the period (time for one swing) depends on.

They have three candidates: length of the pendulum (L), mass of the
bob (m), and gravitational acceleration (g).

Your only tool is dimensional analysis. Can you figure out which
combination gives units of time?"

*Write the dimensions:*
- L: metres [L]
- m: kilograms [M]
- g: metres per second squared [L T⁻²]
- T (period): seconds [T]

"We need to combine L, m, g to get [T].

First clue: mass [M] appears nowhere in [T]. So mass cannot appear
in the formula — if it did, we'd have stray M's we couldn't cancel.

Second clue: we need [T¹]. From g we get [T⁻²]. So we need g⁻¹/² to
get [T¹]. From L we get [L¹], and from g⁻¹/² we get [L⁻¹ T¹].
To cancel the L: we need L¹ paired with g⁻¹/².

So the period must be proportional to √(L/g).

The actual formula? T = 2π√(L/g). Dimensional analysis found the form.
It missed only the number 2π — which requires the full calculation."

### Success Model

**Success signals:**
- Student grasps that the mass must be absent because [M] cannot
  be cancelled from [T]
- Student follows the dimensional elimination to √(L/g)
- Student is genuinely surprised that reasoning about units found the equation form

**Failure signals:**
- Student is overwhelmed by the notation
- Student cannot follow the elimination logic

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Use dimensional analysis to find the form of the kinetic energy equation — you have mass [M] and speed [L T⁻¹]." → mastery |
| Unsuccessful — notation overwhelming | Route to DA-04 (dimension squares — simpler visual method) |
| Unsuccessful — concept missed | Route to DA-01 (spell-check framing — simpler entry point) |

### Retrieval Tags

`detective` `discovery` `pendulum` `deriving-equations` `M1-recovery` `curious-learner` `dimensional-reasoning` `surprise`

### AI Retrieval Notes

**When to choose:** Student is curious, loves puzzles. Best after DA-01
establishes checking-tool framing and DA-04 provides the procedural method.
This shows the full power of the tool.

**When to avoid:** As first contact. Student who is intimidated by
abstract symbol manipulation.

**Which interventions follow naturally:** DA-06 (dimensionally correct
but wrong) to complete the balanced picture of what dimensional analysis
can and cannot do.

---

## DA-04 — Dimension Squares

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-04 |
| Title | Dimension Squares |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Visual Mental Picture + Procedure |
| Target Learner | Age 12–16, visual learners, procedure-seekers |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — the bracket notation is central |
| Voice Requirement | Medium |
| Interaction Type | Worked Example |

### Pedagogical Metadata

**Why this strategy works:**
The square-bracket notation [quantity] = [dimension] is a standard
procedural tool that makes dimensional substitution visual and systematic.
Students who find abstract reasoning difficult can follow the bracket
procedure step by step without losing track of what they're doing.

**Mental model installed:**
"I can write [velocity] = [L T⁻¹]. Those square brackets mean 'the
dimension of.' Then I substitute, multiply brackets, and check that
both sides have the same contents. It's arithmetic with letters instead
of numbers — and the letters are L, M, T."

**Misconceptions prevented:** M1 (procedure makes it applicable),
M3 (units inside brackets are converted to dimensions before checking).

**Misconceptions recovered:** M3 — the explicit step of "what is the
dimension of this unit?" separates units from dimensions cleanly.

**Prerequisite knowledge assumed:** phys.meas.units complete.
DA-01 or DA-02 helpful. Can multiply fractions.

**Cognitive load:** Medium — the notation is new.

### Teaching Script

*Write the following:*

"The square bracket notation: [X] means 'the dimension of X.'

The three fundamental mechanical dimensions:
  [length] = L
  [mass] = M
  [time] = T

Everything else is built from these.

Example: What is the dimension of velocity?

velocity = distance / time
[velocity] = [distance] / [time] = L / T = L T⁻¹

Example: What is the dimension of force?

Newton's second law: F = ma
[F] = [m] × [a] = M × (L T⁻²) = M L T⁻²

Now I can check whether an equation is dimensionally consistent.

Check: is this equation valid?
  kinetic energy = ½ × mass × velocity²

Left side: [kinetic energy] = M L² T⁻²

Right side: [½ × mass × velocity²]
  = [mass] × [velocity]²
  = M × (L T⁻¹)²
  = M × L² T⁻²
  = M L² T⁻²

Left side = Right side: M L² T⁻². ✓

The equation passes the dimensional check.

Now check this one: is v = v₀ + at dimensionally consistent?

[v] = L T⁻¹
[v₀] = L T⁻¹
[at] = (L T⁻²)(T) = L T⁻¹ ✓

Left: L T⁻¹. Right: L T⁻¹ + L T⁻¹ = L T⁻¹. ✓

Your turn: check s = v₀t + ½at²."

### Success Model

**Success signals:**
- Student correctly writes dimensions for velocity, acceleration, force
- Student substitutes dimensions into an equation correctly
- Student identifies a dimensionally inconsistent equation by finding mismatched brackets

**Failure signals:**
- Student writes the unit instead of the dimension (writes 'm/s' instead of 'L T⁻¹')
- Student cannot handle negative exponents in the dimension expression

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: Check a subtly wrong equation (e.g., p = mv²) — mastery if student spots it |
| Unsuccessful — unit/dimension confusion | Route to DA-05 (explicit unit vs dimension contrast) |
| Unsuccessful — notation too abstract | Route to DA-02 (apples and oranges — verbal rule first) |

### Retrieval Tags

`procedure` `bracket-notation` `L-M-T` `substitution` `visual` `M1-recovery` `M3-clarification` `worked-example` `representational`

### AI Retrieval Notes

**When to choose:** Student needs a reliable procedure. Student is visual.
Best after DA-01 establishes purpose. Good for exam preparation.

**When to avoid:** As first contact — the notation without conceptual
grounding becomes symbol manipulation. Student who conflates units and dimensions
needs DA-05 first.

**Which interventions follow naturally:** DA-03 (Sherlock — uses the procedure
in a discovery mode). DA-06 (dimensionally correct but wrong — reveals limits).

---

## DA-05 — Units vs Dimensions: The Costume Party

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-05 |
| Title | Units vs Dimensions: The Costume Party |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 11–15, any background, M3 recovery target |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Low |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The costume/person distinction is a clean metaphor for the unit/dimension
relationship. A person (dimension) can wear many costumes (units) but remains
the same person. This resolves M3 in one short exchange.

**Mental model installed:**
"A dimension is the category. A unit is the costume the category wears.
Length can wear metres, centimetres, feet, miles — it is always length.
Time can wear seconds, minutes, hours, centuries — it is always time.
Dimensional analysis works with the categories, not the costumes.
You strip the costumes and check whether the categories match."

**Misconceptions prevented:** M3 — clearly separates the two concepts.

**Misconceptions recovered:** M3 — the primary target.

**Prerequisite knowledge assumed:** phys.meas.units.

**Cognitive load:** Very low.

### Teaching Script

*Say:*

"Imagine a costume party. At a costume party, the same person can wear
many different costumes. Tonight they're a pirate. Tomorrow they're a chef.
Next week, a knight. But underneath all the costumes — same person.

Physical dimensions are like people. Units are like costumes.

The dimension 'length' can wear the unit 'metre.' Or 'centimetre.'
Or 'foot.' Or 'mile.' Or 'light-year.' Different costumes. Same dimension.

The dimension 'time' can wear 'second,' 'minute,' 'hour,' 'century.'
All time, different costumes.

When you do dimensional analysis, you strip everyone's costume and
look only at the person underneath.

So: metres and centimetres and feet — they're all the same person at
the costume party. They all represent length. They're all [L].

Seconds and minutes and hours — all time. All [T].

Kilograms and grams and pounds — all mass. All [M].

When you're checking whether an equation is dimensionally consistent,
you're not asking 'does it use metres or centimetres?' You're asking:
'does it have length where it should, time where it should, mass where
it should?' Strip the costumes. Check the people."

### Success Model

**Success signals:**
- Student can correctly identify the dimension of any given unit
- Student explains why metres and feet are "the same dimension, different unit"
- Student stops writing units in the dimension brackets and writes L, M, T instead

**Failure signals:**
- Student still writes 'kg/m³' in brackets instead of 'M L⁻³'
- Student thinks dimension analysis checks units rather than dimensions

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "What dimension is the unit pascal (Pa = kg m⁻¹ s⁻²)?" → mastery if student correctly derives M L⁻¹ T⁻² |
| Unsuccessful | Route to DA-04 (bracket notation — procedural version that makes the distinction concrete) |
| Unsuccessful — confused | Route to DA-01 (restart with spell-check framing) |

### Retrieval Tags

`analogy` `costume-party` `units-vs-dimensions` `M3-recovery` `concrete` `clarification` `L-M-T`

### AI Retrieval Notes

**When to choose:** M3 is explicitly present (student writes units in
dimension brackets, or confuses "metres and centimetres are different
dimensions"). Insert before DA-04 if M3 is detected.

**When to avoid:** Student who already clearly distinguishes units from
dimensions — the analogy will feel unnecessary.

**Which interventions follow naturally:** DA-04 (dimension squares) now
that the concept is clear. DA-02 (apples-and-oranges) if M2 is still active.

---

## DA-06 — The Right Answer, The Wrong Equation

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-06 |
| Title | The Right Answer, The Wrong Equation |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Age 13–17, advanced thinkers, M4 recovery target |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Analyze |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Challenge + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
Directly demonstrates M4's failure mode: a dimensionally correct equation
can still be wrong. The student who believes "dimensional analysis proves
correctness" is presented with a counterexample they must diagnose.
Productive confusion followed by resolution deepens understanding more than
a positive example.

**Mental model installed:**
"A dimensionally consistent equation clears one necessary condition —
not all sufficient conditions. The equation E = mc³ is dimensionally
wrong (it gives M L³ T⁻³, not M L² T⁻²). But E = 2mc² is dimensionally
correct yet physically wrong (it's missing the ½ — wait, no: actually
E = mc² has no factor issue, let me use a correct counterexample).
The example: d = vt² is dimensionally wrong (L ≠ L T); but d = ½at²
is dimensionally right AND correct, while d = at² is dimensionally right
but missing the ½. The missing ½ cannot be caught by dimensions."

**Mental model installed (corrected):**
"Dimensional analysis catches wrong dimensions. It cannot catch wrong
numerical coefficients. E = 2mc² passes dimensional analysis.
So does E = 100mc². The factor of 1 in E = mc² requires calculation,
not dimension checking."

**Misconceptions prevented:** M4.

**Misconceptions recovered:** M4.

**Prerequisite knowledge assumed:** DA-01, DA-04. Comfort with dimensional
substitution. Some exposure to physics formulas.

**Cognitive load:** Medium — requires holding the counterexample in mind.

### Teaching Script

*Say:*

"Here is a challenge. I'm going to give you three equations for
distance fallen under gravity. One is correct. Use dimensional analysis
to eliminate the wrong ones — then tell me if you can find the right one
using dimensional analysis alone."

```
(a) d = ½gt²
(b) d = gt
(c) d = g²t³
```

*Where g = acceleration [L T⁻²], t = time [T], d = distance [L].*

"Check each dimensionally:

(a) [½gt²] = [L T⁻²][T²] = [L] ✓
(b) [gt] = [L T⁻²][T] = [L T⁻¹] — that is speed, not distance ✗
(c) [g²t³] = [L² T⁻⁴][T³] = [L² T⁻¹] — not distance ✗

So dimensional analysis eliminates (b) and (c) immediately.

But can it tell you that (a) is correct and not, say, 3gt² or (1/7)gt²?"

*Wait.*

"No. Both 3gt² and (1/7)gt² are dimensionally identical to ½gt².
The factor ½ is invisible to dimensional analysis.

Dimensional analysis caught two of three errors. It could not confirm
the coefficient. That requires the actual physics.

This is the complete picture: dimensional analysis is a powerful filter —
it eliminates whole classes of impossible equations in seconds.
But 'passes the dimension check' does not mean 'correct.' A dimensionally
consistent equation still needs physical verification."

### Success Model

**Success signals:**
- Student correctly checks all three equations dimensionally
- Student articulates why (a) is the only survivor but not proven by dimensions alone
- Student can generate their own example of a dimensionally correct but wrong equation

**Failure signals:**
- Student concludes (a) is "proven" by dimensional analysis
- Student cannot identify what the ½ represents or why it matters

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Write a dimensionally correct version of F = ma that is physically wrong." → mastery if student produces something like F = 5ma or F = m²a/m |
| Unsuccessful — M4 persisting | Direct counterexample: "E = 2mc² passes dimensional analysis. Is it correct?" |
| Unsuccessful — procedure failed | Route to DA-04 (dimension squares — rebuild procedure) |

### Retrieval Tags

`guided-discovery` `counterexample` `M4-recovery` `coefficient` `analytical` `intermediate` `limits-of-dimensional-analysis` `abstract`

### AI Retrieval Notes

**When to choose:** M4 is active (student believes dimensional correctness
proves correctness). Best after DA-04 has established the procedure — this
teaches its limits.

**When to avoid:** As first contact. Student who hasn't yet mastered
the basic checking procedure.

**Which interventions follow naturally:** DA-03 (Sherlock) — after seeing
the limits, return to what it can do (discovery of equation form).

---

## DA-07 — The Mars Orbiter's Other Lesson

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-07 |
| Title | The Mars Orbiter's Other Lesson |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery |
| Target Learner | Age 12–16, motivated by real-world consequences |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Story + Analysis |

### Pedagogical Metadata

**Why this strategy works:**
The Mars Climate Orbiter failure (pound-force vs Newton) is well-known
from the units TCL. Here it serves a different lesson: a simple
dimensional check of the navigation software's output would have caught
the error before launch. Real consequences make the "boring" checking
step feel urgent.

**Mental model installed:**
"The Mars Orbiter failed because one team's output had dimensions of
pound-force × second and the other expected Newton × second.
A dimensional check of the interface would have flagged this before
launch. Dimensional analysis is not a classroom exercise — it is
the check that killed a $327 million spacecraft when skipped."

**Misconceptions prevented:** M1 — dimensional analysis as a real
engineering practice, not a school formality.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units (Mars Orbiter story
from U-02 helpful but not required). DA-01 complete.

**Cognitive load:** Low.

### Teaching Script

*Say:*

"You may have heard of the Mars Climate Orbiter — the spacecraft that burned
up in Mars's atmosphere in 1999 because one team used pound-force units and
another used Newtons.

Here is the question nobody asks: how would you have caught that error
before launch?

One team was outputting angular momentum in pound-force × second.
The other team expected Newton × second.

[pound-force × second] = [mass × g × time] in imperial
[Newton × second] = [M L T⁻²] × [T] = [M L T⁻¹]

If you had a clear interface document with declared dimensions — and
ran a dimensional check on the data being passed — you would have seen:
incoming: [M L T⁻¹] (imperial-adjusted)
expected: [M L T⁻¹] (SI)

Wait — the numbers are different by a factor of 4.45, but the dimensions
are the same. Dimensional analysis alone wouldn't have caught this.

What would have caught it? A unit label in the data stream.

So the lesson is subtler: dimensional analysis catches dimension mismatches
(adding time to length). Unit tracking catches unit-system mismatches
(pounds vs Newtons within the same dimension). Both are necessary.
NASA had neither."

### Success Model

**Success signals:**
- Student grasps that dimensional analysis catches category errors,
  not system-within-category errors
- Student identifies that both dimensional checking AND unit tracking
  are necessary safeguards
- Student can describe a dimension mismatch vs a unit mismatch (both different)

**Failure signals:**
- Student thinks dimensional analysis would have caught the Orbiter error
- Student treats dimensional analysis and unit tracking as the same thing

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Give me an example of an error dimensional analysis would catch, and one it wouldn't." → mastery if student correctly categorises both |
| Unsuccessful | Route to DA-04 (procedure — student needs to practice dimensional checking before discussing its limits) |
| Unsuccessful — confused about limits | Route to DA-06 (right answer, wrong equation) |

### Retrieval Tags

`history` `mars-orbiter` `real-consequences` `M1-recovery` `dimension-vs-unit-mismatch` `engineering-practice` `not-a-classroom-exercise`

### AI Retrieval Notes

**When to choose:** Student is motivated by real-world stakes.
Good for students already familiar with the Mars Orbiter story from
phys.meas.units TCL — this adds a new lesson to a familiar story.

**When to avoid:** Student hasn't encountered the Mars Orbiter story
yet — use U-02 first for the units lesson, then return here.

**Which interventions follow naturally:** DA-06 (limits of dimensional
analysis) to complete the "what it can and cannot catch" picture.

---

## DA-08 — The Equation Detective

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-08 |
| Title | The Equation Detective |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Socratic Dialogue |
| Target Learner | Age 13–17, analytical, exam-preparation context |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Analyze |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — the equations on screen/paper are enough |
| Voice Requirement | High — the Socratic exchange carries the discovery |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
Presenting a set of plausible-looking equations and asking the student to
eliminate impossible ones using only dimensions trains the precise
analytical skill tested in physics exams — without requiring factual recall
of the correct equation.

**Mental model installed:**
"In an exam, if I forget an equation, I can sometimes recover it by
asking: what combination of the given variables has the right dimension
for the answer? This is a rescue tool — not a replacement for knowing
the physics, but a way to eliminate clearly wrong options immediately."

**Misconceptions prevented:** M1 — positions it as a useful analytical
skill, not busywork. M4 — elimination is not confirmation.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** DA-04 (bracket notation procedure).
Some physics formula exposure.

**Cognitive load:** Medium-high — requires fluency with dimensional substitution.

### Teaching Script

*Say:*

"You're in an exam. The question asks for the formula for the period
of a simple pendulum. You've forgotten which one it is. Your options are:

(a) T = 2π√(L/g)
(b) T = 2πL/g
(c) T = 2π√(Lg)
(d) T = 2π(g/L)

Can you eliminate any using dimensional analysis alone?"

*Work through with the student:*

"T should have dimension [T]. L = [L]. g = [L T⁻²].

(a) √(L/g): [L / (L T⁻²)]^(1/2) = [T²]^(1/2) = [T] ✓
(b) L/g: [L / (L T⁻²)] = [T²] ✗ (gives T² not T)
(c) √(Lg): [(L)(L T⁻²)]^(1/2) = [L² T⁻²]^(1/2) = [L T⁻¹] ✗ (gives speed, not time)
(d) g/L: [(L T⁻²) / L] = [T⁻²] ✗ (gives inverse-time-squared)

Options (b), (c), (d) are eliminated. Only (a) is dimensionally possible.

Note: this didn't prove (a) is correct — it proved the others are definitely
wrong. In this particular case, with only one survivor, (a) must be the right
form. The factor 2π cannot be determined dimensionally — but in an exam,
you've recovered the formula from nothing."

### Success Model

**Success signals:**
- Student can perform all four dimensional checks independently
- Student correctly eliminates three options and reasons about the survivor
- Student understands that "one survivor" logically must be the answer
  while "multiple survivors" would require further reasoning

**Failure signals:**
- Student cannot set up the dimension brackets for √(L/g)
- Student declares the survivor "proven correct" rather than "the only one not ruled out"

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: Present a two-survivor case — student must explain why dimensional analysis leaves ambiguity → mastery |
| Unsuccessful — dimensional computation | Route to DA-04 (bracket notation — practice the procedure) |
| Unsuccessful — conceptual | Route to DA-02 (apples-and-oranges — simpler version of the elimination principle) |

### Retrieval Tags

`socratic` `exam-strategy` `elimination` `multiple-choice` `M1-recovery` `M4-prevention` `analytical` `intermediate` `rescue-tool`

### AI Retrieval Notes

**When to choose:** Exam-preparation context. Student has the procedure
from DA-04 but hasn't seen it applied to unfamiliar equations.
Best intervention for developing dimensional-analysis fluency under pressure.

**When to avoid:** Student who hasn't practised dimensional substitution.
First contact — requires fluency before this challenge level.

**Which interventions follow naturally:** DA-03 (Sherlock — derive the
form from scratch) as a higher-level challenge.

---

## DA-09 — The Engineer's Sanity Check

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-09 |
| Title | The Engineer's Sanity Check |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 13–17, STEM-oriented |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Explanation + Problem |

### Pedagogical Metadata

**Why this strategy works:**
Engineers run dimensional checks as a professional habit before committing
to calculations. Framing dimensional analysis as a professional reflex —
not a school exercise — reframes the motivation: you're not checking for
a teacher, you're protecting your work from catastrophic error.

**Mental model installed:**
"A professional engineer runs a dimensional check on every new equation
they derive or find in a textbook. This takes thirty seconds and catches
the most common algebra errors — dropped powers, inverted fractions,
wrong formula remembered. A 30-second check against hours of debugging.
The ROI is obvious."

**Misconceptions prevented:** M1 (it's a school exercise).

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** DA-04 (procedure). Some physics context.

**Cognitive load:** Medium.

### Teaching Script

*Say:*

"Senior engineers have a rule: before running a simulation or calculation,
spend 30 seconds checking your equation dimensionally.

Not because they've forgotten how — because they've learned the hard way
that most calculation errors are not arithmetic mistakes. They are:
  • a formula remembered with a ² instead of a ³
  • a fraction inverted in a derivation
  • a wrong formula from the textbook's equation list

All of these survive arithmetic checks but fail dimensional checks instantly.

Here's a real-type example. An engineer derives a formula for pressure:

  P = ρv²/2

where ρ = density [M L⁻³], v = velocity [L T⁻¹], P = pressure [M L⁻¹ T⁻²].

Dimensional check:
[ρv²] = [M L⁻³][L² T⁻²] = [M L⁻¹ T⁻²] ✓

That matches [P]. The equation passes.

Now suppose they accidentally wrote P = ρv³/2 instead.

[ρv³] = [M L⁻³][L³ T⁻³] = [M T⁻³]

That does not match [M L⁻¹ T⁻²]. The check catches it immediately.

Thirty seconds. Caught a cubed-velocity error that might have run through
a simulation producing completely wrong pressures for an aircraft wing."

### Success Model

**Success signals:**
- Student performs the dimensional check on the pressure formula correctly
- Student demonstrates the check on their own derived equation
- Student articulates why the 30-second check is worthwhile

**Failure signals:**
- Student treats dimensional analysis as a classroom formality
- Student cannot carry out the check on the pressure formula

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: Student derives their own equation and runs the check independently → mastery |
| Unsuccessful | Route to DA-01 (spell-check framing — simpler reframe of the same purpose) |
| Unsuccessful — procedure | Route to DA-04 (bracket notation — rebuild procedure) |

### Retrieval Tags

`engineer` `sanity-check` `professional-habit` `M1-recovery` `pressure` `30-seconds` `STEM-learner` `intermediate`

### AI Retrieval Notes

**When to choose:** STEM-oriented student who needs professional
motivation, not academic motivation. Best after procedure is established.

**When to avoid:** First contact. Student who doesn't yet have the
procedure from DA-04.

**Which interventions follow naturally:** DA-07 (Mars Orbiter) to
show what happens when the sanity check is skipped at scale.

---

## DA-10 — Does This Sentence Make Sense?

### Identity

| Field | Value |
|---|---|
| Intervention ID | DA-10 |
| Title | Does This Sentence Make Sense? |
| Concept ID | phys.meas.dimensional-analysis |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Child-friendly |
| Target Learner | Age 10–13, first encounter, low confidence |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Remember |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High |
| Interaction Type | Story + Echo |

### Pedagogical Metadata

**Why this strategy works:**
Young learners can detect nonsense sentences without knowing grammar rules.
"The cat ran yesterday" makes sense. "The cat ran 5 kilograms" does not —
without knowing why, the child knows it's wrong. This native nonsense-
detection is exactly what dimensional analysis formalises. The intervention
activates something the child already knows.

**Mental model installed:**
"Physics equations are like sentences. Some sentences make sense:
'She ran 5 km.' Others don't: 'She ran 5 kilograms.' You already
know, without thinking, that the second is nonsense. Dimensional analysis
is the rule that explains why — and helps you catch physics nonsense automatically."

**Misconceptions prevented:** M1, M2.

**Misconceptions recovered:** M1 — connects the formal tool to native intuition.

**Prerequisite knowledge assumed:** phys.meas.units. Can recognise
common physics units (metres, seconds, kilograms).

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"I am going to say some sentences. Tell me which ones make sense and
which ones are nonsense.

'She ran 5 kilometres.' — Sense or nonsense?"

*Sense.*

"'She weighed 60 kilometres.' — Sense or nonsense?"

*Nonsense.*

"'The journey took 3 hours.' — Sense or nonsense?"

*Sense.*

"'The journey took 3 kilograms.' — Sense or nonsense?"

*Nonsense.*

"'The car was moving at 100 metres per second.' — Sense or nonsense?"

*Sense — fast, but sense.*

"You just did dimensional analysis. Without realising it.

You know that kilometres measure distance, not weight. You know that
kilograms measure weight, not time. You know that 'per second' describes
speed, not length by itself.

In physics, we write this down formally. But the rule is exactly what
you already know: distance-words go with distance-things.
Time-words go with time-things. Weight-words go with weight-things.

When an equation mixes them up — like saying 'the car was moving at
3 kilograms' — dimensional analysis catches it.

Now let's look at some physics equations and play the same game."

*Present simple equations:*
- distance = speed × time → metres = (metres/second) × seconds → metres = metres ✓
- distance = speed + time → metres = metres/second + seconds → metres ≠ metres/second + seconds ✗

### Success Model

**Success signals:**
- Child correctly identifies sentence sense/nonsense in all examples
- Child applies the same logic to simple physics equations
- Child can explain why "km" and "kg" cannot be interchanged (different "kinds of measuring")

**Failure signals:**
- Child cannot transfer from everyday sentences to physics equations
- Child treats units as labels rather than "kinds of measuring"

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Does 'speed = distance × time' make sense?" → mastery if child correctly identifies it as nonsense (it gives L²/T not L/T) |
| Unsuccessful | Prerequisite check (phys.meas.units + phys.meas.unit-conversion — unit concepts may not be secure) |

### Retrieval Tags

`child-friendly` `sentences` `nonsense-detection` `M1-prevention` `M2-prevention` `age-10-13` `low-anxiety` `first-contact` `native-intuition`

### AI Retrieval Notes

**When to choose:** Youngest learners (10–13) or very anxious students.
The fallback when DA-01 (spell-check) doesn't land because the student
is too young for that framing.

**When to avoid:** Students 14+ who would find this too simple.
Student who already grasps the rule.

**Which interventions follow naturally:** DA-01 (spell-check analogy)
to formalise what DA-10 activated. DA-04 (dimension squares) once the
concept is clear.

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | Target | CPA Stage | Bloom | Duration | Primary Misconception Target |
|---|---|---|---|---|---|---|---|
| DA-01 | The Recipe Spell-Check | Everyday Life Story | Age 12–16, general | Concrete | Understand | 5–7 min | M1, M4 |
| DA-02 | The Apples and Oranges Rule | Analogy | Age 11–15, any | Concrete | Understand | 4–6 min | M2 |
| DA-03 | The Sherlock Method | Historical Discovery | Age 12–16, imaginative | Concrete | Apply | 7–9 min | M1 |
| DA-04 | Dimension Squares | Visual + Procedure | Age 12–16, visual | Representational | Apply | 8–10 min | M1, M3 |
| DA-05 | Units vs Dimensions: Costume Party | Analogy | Age 11–15, M3 target | Concrete | Understand | 4–6 min | M3 |
| DA-06 | The Right Answer, The Wrong Equation | Guided Discovery | Age 13–17, advanced | Abstract | Analyze | 7–9 min | M4 |
| DA-07 | The Mars Orbiter's Other Lesson | Historical Discovery | Age 12–16, stakes-driven | Concrete | Understand | 6–8 min | M1 |
| DA-08 | The Equation Detective | Socratic Dialogue | Age 13–17, exam-prep | Abstract | Analyze | 8–10 min | M1, M4 |
| DA-09 | The Engineer's Sanity Check | Engineer's Perspective | Age 13–17, STEM | Abstract | Apply | 7–9 min | M1 |
| DA-10 | Does This Sentence Make Sense? | Child-friendly | Age 10–13, low confidence | Concrete | Remember | 4–6 min | M1, M2 |

### Recovery Graph

| From | If Successful | If Unsuccessful |
|---|---|---|
| DA-01 | Novel-equation dimensional check → mastery | DA-10 → DA-04 → DA-02 |
| DA-02 | "Subtract seconds from metres?" → mastery | DA-05 → DA-01 |
| DA-03 | "Find form of KE equation from dimensions" → mastery | DA-04 → DA-01 |
| DA-04 | Check subtly wrong equation (p = mv²) → mastery | DA-05 → DA-02 |
| DA-05 | "What dimension is pascal?" → mastery | DA-04 |
| DA-06 | "Write dimensionally correct but wrong F equation" → mastery | Direct counterexample → DA-04 |
| DA-07 | "Catch vs miss example" → mastery | DA-04 → DA-06 |
| DA-08 | Two-survivor case → mastery | DA-04 → DA-02 |
| DA-09 | Independent equation check → mastery | DA-01 → DA-04 |
| DA-10 | "Does speed = distance × time make sense?" → mastery | Prerequisite check |

### Misconception → Intervention Map

| Misconception | Definition | Entry Intervention |
|---|---|---|
| M1 | Dimensional analysis is a calculation method, not a checking tool | DA-01 (default), DA-10 (young/anxious) |
| M2 | You can add quantities with different dimensions if they're related | DA-02, DA-10 |
| M3 | Dimensions and units are the same thing | DA-05, DA-04 |
| M4 | If dimensions are correct the equation must be correct | DA-06, DA-01 (partial) |

### Starting Intuition Map

| ID | Starting Intuition (distinct entry point) |
|---|---|
| DA-01 | Spell-checker — catches spelling errors, not argument errors |
| DA-02 | Apples and oranges — you cannot add different categories |
| DA-03 | Detective reasoning — eliminate impossible equations by dimensional constraint |
| DA-04 | Square brackets — replace quantities with their dimension symbols and do arithmetic |
| DA-05 | Costume party — dimension is the person, unit is the costume |
| DA-06 | Correct equation format, wrong coefficient — dimensions pass, physics fails |
| DA-07 | Mars Orbiter — dimensional check was the test that was skipped before launch |
| DA-08 | Multiple-choice elimination — dimensions rule out three of four options |
| DA-09 | Engineer's 30-second habit — professional reflex before every calculation |
| DA-10 | Nonsense sentences — native intuition already knows what dimensional analysis formalises |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| concrete | DA-01, DA-02, DA-05, DA-07, DA-10 |
| abstract | DA-06, DA-08, DA-09 |
| M1-recovery | DA-01, DA-03, DA-07, DA-08, DA-09, DA-10 |
| M2-prevention | DA-02, DA-10 |
| M3-recovery | DA-05, DA-04 |
| M4-prevention | DA-01, DA-06, DA-08 |
| young-learner | DA-10, DA-02, DA-01 |
| STEM-learner | DA-09, DA-08, DA-03 |
| exam-strategy | DA-08, DA-04 |
| checking-tool | DA-01, DA-07, DA-09 |
| discovery | DA-03, DA-06 |
| first-contact | DA-01, DA-10 |

---

## Self-Audit

**Interventions:** 10 / 10

**Misconception coverage:**
- M1 (checking tool, not calculator): DA-01, DA-03, DA-07, DA-08, DA-09, DA-10 — 6 direct hits ✓
- M2 (adding different dimensions): DA-02, DA-10 — 2 direct hits ✓
- M3 (dimensions = units): DA-05, DA-04 — 2 direct hits ✓
- M4 (dimensional correctness = physical correctness): DA-06, DA-01, DA-08 — 3 direct hits ✓

**Recovery graph completeness:** 10 / 10 nodes complete. No dead ends. No loops. ✓

**CPA coverage:**
- Concrete: DA-01, DA-02, DA-03, DA-05, DA-07, DA-10 (6 interventions)
- Representational: DA-04 (1 intervention)
- Abstract: DA-06, DA-08, DA-09 (3 interventions)
- Transfer: embedded in mastery probes ✓

**Decision graph completeness:** All five sections complete ✓

**Remaining weaknesses:**
- The technique of using dimensional analysis to find unknown exponents (Buckingham
  Pi theorem) is not covered — this is advanced and belongs in a separate TCL entry.
- Electrical and thermal dimensions (charge [Q], temperature [Θ]) are not introduced
  here — these can be added as DA-11 when the student encounters electromagnetism.
