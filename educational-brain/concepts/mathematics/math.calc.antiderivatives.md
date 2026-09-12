# math.calc.antiderivatives

## Identity
- **KG ID**: `math.calc.antiderivatives`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-rules` — load-bearing part: the reverse power rule is the EXACT algebraic inverse of the power rule ($x^n\to nx^{n-1}$ reversed gives $x^n\to x^{n+1}/(n+1)$), and the rewrite-first discipline for radicals/rationals transfers unchanged.
- **Unlocks**: `math.calc.definite-integral` (which needs the antiderivative family and $F(x)+C$ notation to state the Fundamental Theorem of Calculus).
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.calc.antiderivatives.md` (reused by reference throughout)

## Learning Objective
- The learner can state that $F$ is an antiderivative of $f$ when $F'=f$, and can identify the ENTIRE family $F(x)+C$ (any real $C$) as valid answers, explaining why the arbitrary constant is mandatory, not optional.
- The learner can fluently apply the reverse power rule $\int x^n\,dx=x^{n+1}/(n+1)+C$ ($n\ne-1$), the constant multiple rule, and the sum/difference rule, rewriting radical and rational expressions as fractional/negative powers first when needed.
- The learner can use an initial condition (e.g. $F(x_0)=y_0$) to determine the specific value of $C$ in an applied problem.

## Core Understanding
Antidifferentiation asks the question differentiation answers in reverse: "what function has THIS derivative?" The answer is never unique — $3x^2$, $3x^2+5$, and $3x^2-7$ all differentiate to $6x$, because differentiation DISCARDS additive-constant information (a vertical shift changes nothing about slope). So "the antiderivative of $6x$" does not exist as a single function — only the FAMILY $3x^2+C$ does, and the notation $\int f(x)\,dx=F(x)+C$ makes that family explicit rather than optional. The reverse power rule, $\int x^n\,dx=x^{n+1}/(n+1)+C$ ($n\ne-1$), is the precise algebraic inverse of the power rule: differentiation multiplies by the exponent and reduces it by one; antidifferentiation must undo BOTH steps in the correct order — increase the exponent by one, THEN divide by the NEW exponent (not the old one). The constant-multiple and sum/difference rules carry over unchanged from differentiation, and the same rewrite-first discipline applies: $\sqrt x$ and $1/x^2$ must become $x^{1/2}$ and $x^{-2}$ before the reverse power rule is applied to them. When an applied problem supplies an INITIAL CONDITION — a known value $F(x_0)=y_0$ — the constant $C$ can be pinned down to a single specific value, resolving the family down to one function; this is exactly how physics recovers a position function from a known velocity function plus a known starting position.

## Mental Models
1. **Beginner — antidifferentiation is differentiation in reverse, one function to one function.** Apply the reverse power rule and get an answer. *Upgrade trigger*: being asked to verify an antiderivative by differentiating it back and discovering multiple different-looking answers all check out. *Shelf life*: about one lesson.
2. **Intermediate — antidifferentiation produces a FAMILY of functions, not one.** $\int f(x)\,dx=F(x)+C$, and every value of $C$ gives an equally valid answer. *Upgrade trigger*: an applied problem supplying an initial condition, which this model has no mechanism to use yet.
3. **Advanced — the family collapses to one function given one additional piece of information.** An initial condition $F(x_0)=y_0$ solves for the specific $C$ that matches the physical or given situation — the constant represents exactly the information differentiation threw away. *Upgrade trigger*: needing to connect the family/constant framing to the definite integral, where $C$ CANCELS entirely.
4. **Expert — antidifferentiation is the (multi-valued) inverse of a many-to-one operator.** Differentiation collapses infinitely many functions (differing by a constant) onto one derivative; antidifferentiation is genuinely one-to-many, and the definite integral is the operation that sidesteps the ambiguity by taking a DIFFERENCE ($F(b)-F(a)$), where $C$ cancels regardless of its value. *Shelf life*: permanent.

## Why Students Fail
The dominant failure comes directly from how differentiation trains a learner: differentiation is a one-to-one-LOOKING operation (one function goes in, one function comes out), and that habit is carried unreflectively into antidifferentiation, where a learner writes $\int f(x)\,dx=F(x)$ and simply omits $+C$, treating the indefinite integral as though it too produces a single unique answer (MC-1, CONSTANT-OMISSION). A second failure is a partial, wrong reversal of the power rule: the learner correctly senses that antidifferentiation should "undo" the power rule's steps, but undoes them in a way that doesn't actually invert the operation — subtracting 1 from the exponent and dividing by the OLD exponent $n$ (mirroring the differentiation rule's own shape too literally) rather than genuinely reversing both steps in the correct order (add 1, divide by the NEW exponent $n+1$) (MC-2, REVERSE-POWER-RULE-WRONG). The third failure is the conceptual twin of MC-1, surfacing specifically in language: a learner speaks of "THE antiderivative" as though it names one specific function, and is confused when asked why $+C$ appears at all, missing that non-uniqueness is INTRINSIC to the operation, not a notational nicety (MC-3, ANTIDERIVATIVE-IS-UNIQUE).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 5 repair actions B-MC1–B-MC3. **The Blueprint's Misconception Registry carries no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — CONSTANT-OMISSION** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. Differentiation's genuinely one-to-one-looking behavior (one input function, one output function) is carried unreflectively into antidifferentiation, where the operation is genuinely one-to-MANY.
  - **Characteristic phrase**: $\int f(x)\,dx=F(x)$, with no $+C$ anywhere.
  - **Detection probe** (verbatim, Blueprint's A01 P49): "Find $\int6x^2\,dx$" — a PARTIAL response that gives $2x^3$ with no $+C$.
  - **Repair**: Blueprint Repair Action B-MC1 — compare $F_1(x)=x^3$ and $F_2(x)=x^3+100$: both satisfy $F'=3x^2$; writing "the" antiderivative as $x^3$ alone misses $x^3+100$, $x^3-7$, and infinitely many others.
  - **Verification of death**: given any antidifferentiation task, the learner writes $+C$ unprompted, every time, without needing to be reminded.

- **MC-2 — REVERSE-POWER-RULE-WRONG**
  - **Birth type**: Type 1, overgeneralization of the power rule's own SHAPE (subtract 1 from the exponent, involve the exponent numerically) into the reverse operation, without correctly identifying which direction each step must invert.
  - **Characteristic phrase**: $\int x^2\,dx=x^1/2=x/2$ (subtracting 1, dividing by the OLD exponent $2$, instead of adding 1 and dividing by the NEW exponent $3$).
  - **Detection probe** (verbatim, Blueprint's A01 P49 INCORRECT branch): a student computes $\int6x^2\,dx=6\cdot x^{1/2}$ style errors, applying the derivative rule "backward" in the wrong direction.
  - **Repair**: Blueprint Repair Action B-MC2 — verify by differentiating the proposed answer: $d/dx(x/2)=1/2\ne x^2$, confirming the error; the correct $x^3/3$ checks out ($d/dx(x^3/3)=3x^2/3=x^2$).
  - **Verification of death**: given a fresh power term, the learner adds 1 to the exponent and divides by the NEW exponent, and verifies the result by differentiating it back, unprompted.

- **MC-3 — ANTIDERIVATIVE-IS-UNIQUE**
  - **Birth type**: Type 1, overgeneralization — the conceptual twin of MC-1, surfacing in how the learner talks about the object ("THE antiderivative") rather than in the omitted symbol itself.
  - **Characteristic phrase**: "the antiderivative of $2x$ is $x^2$" (stated as though uniquely true), confusion when asked why $+C$ matters.
  - **Detection probe** (verbatim, Blueprint's B-MC3 P41): $d/dx(x^2+1)=2x$; $d/dx(x^2-\pi)=2x$; $d/dx(x^2+10000)=2x$ — asking which is "the" antiderivative of $2x$.
  - **Repair**: Blueprint Repair Action B-MC3 — non-uniqueness is intrinsic, since differentiation discards additive-constant information; the lost constant is recovered only from additional information (an initial condition), never from the math alone.
  - **Verification of death**: given a request for "an" antiderivative versus "the general antiderivative," the learner correctly distinguishes the two and supplies the family form when asked for the general case.

## Analogies
- **Best — reconstructing a photo's original brightness from only its edges.** Differentiation is like an edge-detection filter — it keeps the RATE of change and discards the absolute brightness level; reversing it (antidifferentiation) can recover the shape of the brightness curve but never the absolute level it started from, without an extra piece of information (one known brightness value, like an initial condition).
- **Alternative — a family portrait, all sharing the same pose.** $3x^2+C$ for different $C$ are like the same photograph taken at different exposure levels — same shape (same derivative/slope everywhere), different vertical position.
- **ANTI-ANALOGY — "the antiderivative, like the derivative, is a specific function you compute."** This licenses MC-1 and MC-3 directly: differentiation genuinely gives one specific answer, and antidifferentiation genuinely does not. Say "an antiderivative is one member of an infinite family" instead of "the antiderivative."

## Demonstrations
- **The shared-derivative triple.** Differentiate $3x^2$, $3x^2+5$, and $3x^2-7$ side by side. *Predict whether they'll match before differentiating.* All three giving $6x$ is the demonstration for MC-1 and MC-3 at once.
- **The verify-by-differentiating check on a wrong reversal.** Take the proposed (wrong) answer $x/2$ for $\int x^2\,dx$ and differentiate it, getting $1/2\ne x^2$. *Predict whether it'll check out first.* The mismatch is the demonstration for MC-2.
- **The initial-condition resolution.** Given $\int6x\,dx=3x^2+C$ and $F(1)=5$, solve for $C=2$. *Predict whether a single value of $C$ can be pinned down before solving.* Watching the family collapse to one function via one extra fact is the demonstration that ties MC-1/MC-3's family concept to something usable.

## Discovery Questions
Guided discovery is used for the necessity of $+C$ (a learner can directly observe multiple functions sharing one derivative), while the reverse power rule itself is stated directly as the precise algebraic inverse already derivable from the known power rule.
1. **Need** — "What function has derivative $6x$? Is there more than one answer?" Differentiate a few guesses and see which work.
2. **Playground** — differentiate $3x^2$, $3x^2+5$, $3x^2-100$ and notice they all give $6x$.
3. **Invention** — "What's true about all of these functions that makes them share a derivative?" Let the learner articulate "they only differ by a constant."
4. **Collision** — confront a learner who wrote "the antiderivative is $3x^2$" with the fact that $3x^2+5$ is equally valid.
5. **Formalisation** — state the family notation $F(x)+C$ and the reverse power rule explicitly.
6. **Compression** — "Differentiation forgets the vertical shift. Antidifferentiation can't remember it either — so it keeps every possibility open with $+C$."

## Teaching Sequence
The shared-derivative demonstration (targeting MC-1/MC-3) must come BEFORE the reverse power rule's mechanics are drilled — a learner who has already seen three functions share one derivative has a felt reason to write $+C$ every time, rather than experiencing it as an arbitrary rule imposed after the fact. The verify-by-differentiating habit (targeting MC-2) should be modeled as a MANDATORY step on every worked example, per the Blueprint's own Teaching Notes — it is the fastest way to catch a wrong-direction reversal immediately, before it calcifies into a habit. The indefinite-vs-definite integral contrast (A03) should come LAST, once the family concept and the mechanics are both solid, since it reveals WHY the constant matters practically (it cancels in a definite integral) — introducing this too early risks a learner concluding "$C$ doesn't matter" rather than "$C$ cancels in this ONE special later case." Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the shared-derivative triple ($3x^2$, $3x^2+5$, $3x^2-7$), differentiated by the learner themselves. First action; anchors the family concept concretely.
- **DO: Worked Example** — WE2's rewrite-first procedure ($3\sqrt x+1/x^2\to3x^{1/2}+x^{-2}$), modeled with the rewriting step made explicit.
- **TEST-THINKING: Error Analysis** — "A student wrote $\int6x^2\,dx=2x^3$ (no $+C$). What's missing, and why does it matter?" targets MC-1/MC-3 directly.
- **TEST-THINKING: Prediction** — "Will $x/2$ check out as the antiderivative of $x^2$?" asked BEFORE differentiating it back. Surfaces MC-2 in one turn.
- **Does NOT fit: introducing the definite integral's cancellation of $C$ before the indefinite family concept is solid.** `math.calc.definite-integral` owns that; introducing it early risks a learner concluding $C$ is dispensable in general.

## Voice Teaching Notes
The load-bearing sentence is "always write $+C$ — the antiderivative is a family, never one function." Say it every time an antidifferentiation task is completed, not just the first. Listen for a learner stating a computed antiderivative aloud without any mention of "plus a constant" — that silence is the tell for MC-1/MC-3. Listen for a learner who, after computing a reversed power, does NOT spontaneously offer to check it by differentiating back — the absence of that self-check habit, more than an occasional wrong answer, is the tell that MC-2's repair hasn't fully landed. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Omits $+C$ from a computed antiderivative** — MC-1. Route to the shared-derivative triple, never to a bare restatement of "don't forget $+C$."
- **Reverses the power rule in the wrong direction (subtracts, divides by the old exponent)** — MC-2. Route to the verify-by-differentiating check, on the exact term in question.
- **Speaks of "THE antiderivative" as a unique function, or is confused by why $+C$ appears** — MC-3. Route to the shared-derivative triple, framed around the language itself ("an antiderivative" vs. "the family").
- **Writes $+C$ automatically, verifies reversed-power computations by differentiating back, and correctly resolves $C$ from an initial condition** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a position-from-velocity initial-value problem) must include at least one item requiring an initial condition to resolve $C$ — a gate made only of bare antidifferentiation certifies the formula without certifying the applied skill this concept's own mastery threshold demands.

## Tutor Recovery Strategy
The likely utterance here is "why do we even need the +C, isn't $3x^2$ just correct?" — a reasonable question given how confidently differentiation always gives one answer. The concept-specific smaller question returns to the shared-derivative fact directly: **"Differentiate $3x^2+5$. What do you get? Now differentiate $3x^2-100$. What do you get?"** The learner gets $6x$ both times, on ground they already own from direct computation. Then return: "so if I ask 'what has derivative $6x$?', both of those are correct answers — and so are infinitely many others. The $+C$ just says 'all of these, at once.'" If the frustration is instead about a reversed-power-rule error recurring, shrink to the bare check: **"Differentiate your answer. Does it give back the function you started with?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with a conceptual non-uniqueness caveat** (the reverse power rule and its siblings are procedures; the family/constant idea is conceptual). Review by *requiring $+C$ explicitly on every item*, never accepting a bare function as a complete answer, since a review that accepts $F(x)$ alone lets MC-1/MC-3's shortcut pass undetected.
- Concept-specific deviation: keep at least one initial-value item permanently in the review rotation — a review that only ever asks for the general antiderivative never re-exercises the "resolve $C$ from a condition" skill this concept's own high mastery bar (0.85) singles out.
- Interleaving partners: `math.calc.derivative-rules` (the discriminating partner — reviewing a derivative and its antiderivative side by side, and verifying they invert each other, keeps MC-2's wrong-direction reversal from regrowing) and the upcoming `math.calc.definite-integral`, whose own signed-area content depends on this concept's family notation being solid.

## Transfer Connections
- **Near**: `math.calc.definite-integral` (which uses $F(x)+C$ notation directly, and where $C$ CANCELS — the concept this entry's own A03 contrast previews).
- **Far**: differential equations (met later), where "find $F$ given $F'$ plus a condition" generalizes into "find $y$ given a relationship involving $y'$ (and possibly $y$ itself) plus a condition" — the initial-value-problem structure recurs identically.
- **Real-world**: recovering a position function from a known velocity function and a known starting position (the Blueprint's own P76 transfer probe) — a genuine, everyday application of the initial-condition mechanism.
- **Expert transfer**: recognizing when an inverse operation is genuinely MULTI-VALUED and requires extra information to pin down a unique answer — the same structural pattern recurs in solving equations with multiple roots, inverse trigonometric functions' restricted ranges, and general inverse-problem settings across science.

## Cross-Subject Connections
- **Physics**, genuine and central: recovering position from velocity (or velocity from acceleration), with the initial condition supplied by a real measurement — not a metaphor, the literal computation kinematics performs.
- **Economics**, real: recovering a total-cost function from a marginal-cost function, with the initial condition supplied by a known fixed cost.
- **Engineering**, real: recovering a quantity from its rate of change plus a known starting value — the general pattern behind integrating sensor data (e.g. recovering displacement from an accelerometer's velocity readings).
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged — the physics connection, while genuine and central to this concept's own P76 transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.antiderivatives.md`. Reused by reference, not restated: the Component 1 Cognitive Map, the Component 2 Misconception Registry (MC-1..MC-3), the Component 4 teaching actions (A01 P11 the shared-derivative representation shift, A02 P07 the polynomial and radical/rational worked-example pair, A03 P06 the differentiation-vs-antidifferentiation and indefinite-vs-definite contrast, A04 P91 mastery gate at MAMR 5/5), the P77 four-item problem set, and the P76 independence-mode transfer probe (position from velocity). This entry adds independent birth-type classification for all three misconceptions (the Blueprint carries no explicit birth-type column), the mental-model ladder, the anti-analogy, the argued guided-discovery-for-the-family-concept / direct-statement-for-the-rule split, and the ordering constraint placing the shared-derivative demonstration before rule mechanics before the definite-integral preview.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.definite-integral`) and empty cross_links match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 40).
