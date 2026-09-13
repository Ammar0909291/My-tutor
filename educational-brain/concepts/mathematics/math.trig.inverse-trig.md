# math.trig.inverse-trig — Inverse Trigonometric Functions

## Identity
- **KG id**: `math.trig.inverse-trig`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.trig-functions`, `math.func.inverse-functions`
- **Unlocks**: `math.trig.trig-equations`, `math.calc.derivative-inverse-trig`
- **Cross-links**: `math.calc.derivative-inverse-trig` (unauthored — **P76_mode: independence**)
- **Difficulty**: proficient · **Bloom level**: understand
- **Mastery threshold**: 0.8 · **Estimated hours**: 8

## Learning Objective
The learner explains why sin, cos, and tan are not invertible on their full domains (periodicity violates the injectivity criterion), states the specific restricted domain and range used to define arcsin, arccos, and arctan, and correctly distinguishes the two "undoing" identities' genuine asymmetry.

## Core Understanding
`math.func.injectivity` establishes the general criterion: a function is invertible only where it passes the horizontal line test — no two distinct inputs may share an output. Sin, cos, and tan **fail this test on their full domains**, precisely because they are periodic (`math.func.periodic-function`): $\sin(0)=\sin(\pi)=0$ is a direct, concrete instance of two distinct inputs producing an identical output, so no single-valued inverse can exist over all reals.

`math.func.inverse-functions`'s own general remedy applies exactly here: **restrict the domain** to an interval on which the function IS injective, then invert only that restricted piece. The three restrictions are conventional but not arbitrary — each is chosen to be the interval nearest zero on which the function is both injective and covers its full range:
- **arcsin**: domain $[-1,1]\to$ range $[-\pi/2,\pi/2]$
- **arccos**: domain $[-1,1]\to$ range $[0,\pi]$
- **arctan**: domain $\mathbb{R}\to$ range $(-\pi/2,\pi/2)$

The concept's central subtlety is the **genuine asymmetry between the two composition directions**. $\sin(\arcsin x)=x$ holds for every $x\in[-1,1]$ without exception — arcsin's output always lands inside sin's restricted domain, so applying sin simply undoes it. But $\arcsin(\sin x)=x$ holds **only when $x$ is already inside $[-\pi/2,\pi/2]$** — outside that interval, $\sin x$ discards which "copy" of the periodic function $x$ came from, and arcsin can only ever return the one representative angle inside its own range, not the original $x$.

## Mental Models
- **Restriction is the price of invertibility, and the periodicity is why.** Sin, cos, tan repeat forever; an inverse needs a promise of uniqueness, so the domain is deliberately narrowed until that promise holds.
- **Two doors, one one-way.** Going sin-then-arcsin always returns you to where you started (arcsin's output is guaranteed to already be in sin's "home" domain). Going arcsin-then-sin can strand you somewhere else if you started outside that home domain — the same round trip is not symmetric in reliability.
- **arcsin(sin x) asks "which representative echoes x," not "give me back x."** The composed function's job is to report the *one* angle in $[-\pi/2,\pi/2]$ with the same sine — which coincides with $x$ only when $x$ was already there.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column (consistent with every math.trig Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: every function the learner has previously inverted (linear, most polynomials in a typical school sequence) was invertible on its full natural domain, so the assumption "every function I'm asked to invert works everywhere" is a reasonable but false extension of prior experience.
- **MC-2** is a **Type 1 (overgeneralization)**: the general rule "$f^{-1}(f(x))=x$ and $f(f^{-1}(x))=x$ both always hold" is true for functions that are genuinely invertible on their full domain — and sin/cos/tan are NOT such functions, so the learner is correctly applying a rule that does not apply here.
- **MC-3** is a **Type 4 (notation-induced)**: the visually near-identical composition notation $\sin(\arcsin x)$ versus $\arcsin(\sin x)$ suggests they behave identically, obscuring that one direction is domain-safe by construction and the other is not.

## Misconceptions
**MC-1 — TRIG-FUNCTIONS-ASSUMED-INVERTIBLE-ON-FULL-DOMAIN** *(Foundational, Type 1)*
- Surface form: believing sin, cos, tan have inverses defined for every real-number input, the way most previously-encountered functions did.
- Root cause: overgeneralizing from prior experience with functions that genuinely were invertible everywhere.
- Repair: the concrete injectivity-failure demonstration — $\sin(0)=0$ and $\sin(\pi)=0$ are two distinct inputs sharing one output, so "the" inverse of sin cannot exist without first restricting the domain to remove this ambiguity.

**MC-2 — INVERSE-TRIG-COMPOSITION-ASSUMED-ALWAYS-RETURNS-ORIGINAL-INPUT** *(Foundational, Type 1)*
- Surface form: computing $\arcsin(\sin(5\pi/6))$ and answering $5\pi/6$, assuming composition with an inverse always undoes the original function.
- Root cause: overgeneralizing the general inverse-function cancellation rule from contexts where it is unconditionally valid.
- Repair: $\sin(5\pi/6)=1/2$, and $\arcsin(1/2)=\pi/6$ — not $5\pi/6$ — because $5\pi/6$ lies outside arcsin's range $[-\pi/2,\pi/2]$; arcsin can only report the representative angle inside its own range.

**MC-3 — THE-TWO-COMPOSITION-DIRECTIONS-ASSUMED-EQUALLY-RELIABLE** *(Foundational, Type 4)*
- Surface form: treating $\sin(\arcsin x)$ and $\arcsin(\sin x)$ as interchangeable, both always simplifying to $x$.
- Root cause: the visually parallel notation obscures a genuine structural asymmetry between the two directions.
- Repair: direct side-by-side contrast — $\sin(\arcsin x)=x$ for all $x\in[-1,1]$ (always true, no exceptions), but $\arcsin(\sin x)=x$ only for $x\in[-\pi/2,\pi/2]$ (conditionally true) — the two expressions are genuinely not equivalent claims.

## Analogies
- **The restricted-domain-as-single-key analogy**: arcsin, arccos, arctan each act like a lock that only accepts one specific "shape" of key (its own range) — feeding sin's output back through arcsin only returns the original angle if that angle was already the shape the lock accepts.
- **Anti-analogy — inverse composition is NOT automatically symmetric.** Most students' prior inverse-function experience (e.g., $\sqrt{x^2}=|x|$ having its own well-known asymmetry, or simple algebraic inverses) may or may not have exposed this pattern explicitly; this concept makes the asymmetry a named, checkable rule rather than an intuition to rediscover per problem.

## Demonstrations
1. **Injectivity failure on the full domain**: show $\sin(0)=\sin(\pi)=0$ graphically on the sine curve, marking both points at height zero — directly instantiating `math.func.injectivity`'s horizontal-line-test failure.
2. **Restriction and inverse construction**: restrict sin's domain to $[-\pi/2,\pi/2]$, show the restricted curve passes the horizontal line test, then reflect across $y=x$ to construct arcsin's graph.
3. **The reliable direction**: compute $\sin(\arcsin(0.5))$ and $\sin(\arcsin(-0.9))$, confirming both simply return the original input — directly breaking MC-1 by establishing the domain-safe half works exactly as expected.
4. **The unreliable direction**: compute $\arcsin(\sin(5\pi/6))$ step by step, landing on $\pi/6$ rather than $5\pi/6$ — directly breaking MC-2 and MC-3 simultaneously.

## Discovery Questions
1. "Is there just one angle whose sine is $0$? List a few. What does that mean for trying to define 'the' inverse of sine?"
2. "Compute $\arcsin(\sin(5\pi/6))$ step by step. Did you get back $5\pi/6$? If not, why not — where did the periodicity 'get lost'?"
3. "Compare $\sin(\arcsin(0.5))$ to $\arcsin(\sin(5\pi/6))$. Both involve composing sin with arcsin — why does one return the original number and the other doesn't?"

## Teaching Sequence
1. **Anchor in `math.func.injectivity`**: restate the horizontal-line-test criterion, then show sin fails it via $\sin(0)=\sin(\pi)=0$ — a concrete instantiation, not an abstract restatement.
2. **Representation shift**: restrict sin's domain to $[-\pi/2,\pi/2]$, verify injectivity holds there, then construct arcsin by reflection across $y=x$; repeat briefly for arccos and arctan, naming their specific restricted ranges.
3. **Conflict evidence (breaks MC-2)**: compute $\arcsin(\sin(5\pi/6))$ and show it does NOT return $5\pi/6$ — an explicit counterexample to the "composition always undoes" assumption.
4. **Contrast pair (breaks MC-1 and MC-3)**: side-by-side, $\sin(\arcsin x)=x$ always (any $x\in[-1,1]$) versus $\arcsin(\sin x)=x$ only when $x\in[-\pi/2,\pi/2]$ — naming the asymmetry explicitly as a checkable rule.
5. **Mastery gate**: 4-item problem set (arccos injectivity explanation in the learner's own words; a same-vs-different range comparison — $\arccos(\cos(2\pi/3))$ against $\arccos(\cos(-\pi/3))$; $\tan(\arctan 1)$; explaining why $\arctan(\tan(3\pi/4))\ne3\pi/4$) plus 1 independence-mode transfer probe (surveyor angle-of-elevation problem).

## Tutor Actions
- **Representation shift**: injectivity-failure demonstration, then domain restriction and inverse construction by reflection.
- **Conflict evidence** (MC-2): the $\arcsin(\sin(5\pi/6))\ne5\pi/6$ counterexample.
- **Contrast pair** (MC-1/MC-3): the reliable-direction-versus-unreliable-direction side-by-side.
- **Mastery gate**, 4-item problem set plus 1 transfer probe.

## Voice Teaching Notes
- Open with the injectivity-failure framing before any inverse-trig notation is introduced: "sine hits zero more than once — so before we can talk about 'the' inverse, we have to decide which zero we mean."
- For MC-2/MC-3, use a consistent spoken phrase for the asymmetry: "sin-then-arcsin always comes home; arcsin-then-sin only comes home if you started in the right neighborhood" — repeating this exact framing whenever a composition problem arises.
- Deep worked-example computation is concentrated on arcsin specifically per the Blueprint's own teaching notes; the identical reasoning transfers to arccos/arctan without needing independent re-derivation each time — say this explicitly so the learner doesn't expect three separate proofs.

## Assessment Signals
- **Early warning for MC-1**: attempting to evaluate an inverse trig function at a value clearly outside its stated domain (e.g. $\arcsin(2)$) without recognizing the domain restriction.
- **Early warning for MC-2/MC-3**: answering a composition problem like $\arcsin(\sin(5\pi/6))$ with the original angle $5\pi/6$ rather than the range-restricted equivalent $\pi/6$.
- **Mastery evidence**: correctly distinguishing, on a fresh unseen pair, which composition direction is guaranteed to return the original value and which requires checking whether the input already lies in the restricted range.

## Tutor Recovery Strategy
- On MC-1: return to the concrete $\sin(0)=\sin(\pi)=0$ counterexample rather than restating the abstract injectivity definition — the misconception is about a missing concrete instance, not a missing rule.
- On MC-2/MC-3: work a fresh composition example in the unreliable direction (arcsin-then-sin is NOT the risky one; sin-is-inner NO — clarify: $\arcsin(\sin x)$ is the risky direction) with a different starting angle than already seen, always ending by explicitly checking "was $x$ inside $[-\pi/2,\pi/2]$ to begin with?"
- If a learner correctly restricts sin's domain but still fails composition problems, treat this as a distinct gap (applying the restriction to a *composed* expression) rather than re-teaching domain restriction itself.

## Memory Hooks
- "Sine hits zero more than once — pick a lane before inverting" — for the injectivity-failure motivation.
- "Sin-then-arcsin always comes home; arcsin-then-sin only comes home if you started in the right neighborhood" — for MC-2/MC-3's asymmetry.
- "$\arcsin(\sin(5\pi/6))=\pi/6$, not $5\pi/6$" — the concrete counterexample worth memorizing as a checkable fact.

## Transfer Connections
- **`math.func.inverse-functions`** (prerequisite, already authored): this concept is a direct, concrete application of the general domain-restriction remedy that concept establishes for any non-injective function.
- **`math.func.injectivity`** (prerequisite, already authored): the horizontal-line-test criterion this concept repeatedly instantiates against sin/cos/tan's periodicity.
- **`math.trig.trig-equations`** (unlocked): solving trigonometric equations for a specific solution often requires applying an inverse trig function and then correctly reasoning about which range-restricted solution was returned versus the full periodic solution family.
- **`math.calc.derivative-inverse-trig`** (unlocked, cross-linked, **unauthored — P76_mode: independence**): differentiating arcsin/arccos/arctan requires exactly this concept's restricted-domain definitions as a starting point; this cross-link is recorded in independence mode since no reciprocal EB entry exists yet to substantively incorporate.

## Cross-Subject Connections
- The Blueprint's own transfer probe uses a surveying/angle-of-elevation context as an application vehicle; the KG records no formal cross-subject `cross_links` for this concept beyond the already-listed `math.calc.derivative-inverse-trig` (a within-mathematics forward link, not cross-subject).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.inverse-trig.md` (mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted). All three worked examples (the injectivity-failure demonstration, the $\arcsin(\sin(5\pi/6))$ counterexample, the reliable-versus-unreliable-direction contrast), the complete misconception registry (MC-1/MC-2/MC-3, all Foundational, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks`, `cross_links: [math.calc.derivative-inverse-trig]`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`, since `math.calc.derivative-inverse-trig` has no EB entry yet): "A surveyor stands a known horizontal distance from the base of a tower and measures the tower's height, computing the angle of elevation as $\theta=\arctan(\text{height}/\text{distance})$. A second surveyor, working from a recorded angle value, computes $\arctan(\tan(3\pi/4))$ and gets confused when the answer isn't $3\pi/4$. Explain, using this concept's own asymmetry rule, why the second surveyor's expectation was mistaken and what the correct value actually is." *(Expected: $\tan(3\pi/4)=-1$, and $\arctan(-1)=-\pi/4$ — not $3\pi/4$ — because $3\pi/4$ lies outside arctan's range $(-\pi/2,\pi/2)$; arctan can only report the representative angle inside its own range, exactly the same asymmetry this concept establishes for arcsin.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- The Blueprint's own worked-example depth is concentrated on arcsin specifically, with arccos/arctan reasoning stated as directly analogous rather than independently re-derived — this entry follows that same division of effort, per the Blueprint's own explicit teaching-notes rationale.

## Version History
- **2026-09-12 (Batch 55)**: authored as part of the Mathematics Educational Brain completion campaign. One of two `math.trig` concepts authored this batch (companion: `math.trig.trig-identities`), both unblocked by the already-authored `math.trig.trig-functions` (Batch 54). Substantively incorporates the already-authored `math.func.inverse-functions` and `math.func.injectivity` as direct Transfer Connections. `math.trig` moves from 6/25 to 8/25 this batch. Unlocks `math.trig.trig-equations` (not yet authored) and `math.calc.derivative-inverse-trig` (not yet authored, cross-link recorded in independence mode).
