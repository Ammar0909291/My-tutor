# math.func.monotonic-function — Monotonic Function (Strict vs. Weak, Whole-Interval Verification, Strict Monotonicity Implies Injective)

## Identity
- **KG ID:** `math.func.monotonic-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** `math.func.inverse-functions`
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define monotonic (entirely increasing or entirely decreasing across the whole domain) and correctly distinguish strict monotonicity ($f(a)<f(b)$ whenever $a<b$) from weak monotonicity ($f(a)\le f(b)$, permitting equal values); (2) determine whether a function is monotonic on a given interval by examining its behavior across the FULL interval, never by extrapolating a trend observed at only a few sample points; (3) prove that strict monotonicity implies injectivity via a direct general argument, and correctly state that the converse fails — injectivity does not imply monotonicity.

## Core Understanding
`math.func.function-concept` established function evaluation. This concept develops MONOTONICITY — a property describing whether a function's outputs consistently trend in one direction across its ENTIRE domain.

MONOTONIC MEANS THE SAME TREND EVERYWHERE, AND STRICT VERSUS WEAK ARE GENUINELY DIFFERENT: a function is monotonic increasing if $f(a)<f(b)$ (or, for the weak version, $f(a)\le f(b)$) whenever $a<b$, for EVERY pair $a,b$ in the domain — a single exception anywhere disqualifies the whole function from monotonicity on that domain. STRICT monotonicity requires the strict inequality; WEAK (non-strict) monotonicity permits equal outputs, allowing the function to stay flat over some stretch. A constant function is weakly BOTH increasing and decreasing simultaneously, yet strictly NEITHER — these are genuinely different, non-interchangeable conditions.

MONOTONICITY REQUIRES CHECKING THE FULL INTERVAL, NEVER JUST A SAMPLE: because monotonicity is a universal claim about EVERY pair of points, observing an increasing trend at a handful of sample points can never establish it — the function could reverse direction between or beyond the sampled points, invisibly to a partial check. A genuine verification requires examining the function's behavior across the ENTIRE interval of interest (algebraically, or via calculus once available), never extrapolating from a partial sample, however consistent that sample looks.

STRICT MONOTONICITY IMPLIES INJECTIVITY, BUT THE CONVERSE FAILS: if $f$ is strictly monotonic (say increasing) and $a\ne b$, then WLOG $a<b$, so strict monotonicity directly gives $f(a)<f(b)$, hence $f(a)\ne f(b)$ — proving $f$ is injective, a genuine, provable implication rather than merely an observed correlation. The CONVERSE, however, fails: a function can be injective (never repeating a value) while still REVERSING direction somewhere in its domain, as long as that reversal never causes two values to actually coincide.

## Mental Models
1. **Rung 1 — strict forbids flat stretches entirely; weak permits them.** These are two genuinely different conditions, not two names for the same idea, and a constant function reveals exactly where they diverge.
2. **Rung 2 — a trend observed at sampled points is evidence, never proof, of monotonicity across a whole interval.** A reversal can hide anywhere between or beyond the points actually checked.
3. **Rung 3 — strict monotonicity is a SUFFICIENT condition for injectivity, never a NECESSARY one.** A function can avoid repeating any value while still changing direction, as long as the direction change never causes an actual collision.

## Why Students Fail
Having learned the word "increasing" informally as meaning "generally goes up," students can treat weak and strict monotonicity as interchangeable labels for the same everyday idea, missing that a constant function genuinely satisfies the weak (non-strict) version while satisfying neither strict version at all — a distinction invisible without deliberate attention to the strict-versus-non-strict inequality. Having verified a function's increasing behavior at several sample points in a row — a habit that feels thorough — students naturally extrapolate this local evidence into a full-interval conclusion, missing that monotonicity is a claim about EVERY pair in the domain, and a reversal could be lurking just beyond the last point checked. Finally, having just proven that strict monotonicity implies injectivity — a clean, satisfying one-directional result — students readily assume the converse must also hold, missing that a function can avoid ever repeating a value while still reversing direction somewhere in its domain, since the reversal need not cause an actual output collision.

## Misconceptions

### MC-1: STRICT-WEAK-MONOTONICITY-CONFLATED
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own "Foundational" severity rating, independently confirmed
- **Description:** Believing "increasing" (weak, $f(a)\le f(b)$) and "strictly increasing" ($f(a)<f(b)$) are the same condition, missing that a constant function satisfies the weak version but neither strict version.
- **Why this birth type:** Language contamination: everyday usage of "increasing" doesn't distinguish strict from non-strict senses, and the mathematical convention's precise distinction (allowing versus forbidding equal outputs) is easy to overlook without deliberate emphasis on the inequality's strictness.
- **Detection probe:** "Does the constant function $f(x)=3$ count as strictly increasing?" A student with MC-1 answers "yes," conflating "never decreases" with "strictly increases."
- **Repair:** Contrast $f(x)=3$ (satisfying $f(a)\le f(b)$ always, since $3\le3$ — weakly both increasing and decreasing, strictly neither) directly against $g(x)=2x$ (genuinely satisfying $g(a)<g(b)$ strictly whenever $a<b$) — a fundamentally stronger condition the constant function cannot meet.
- **Verification of death:** Given a function, the student explicitly checks whether the relevant inequality is strict or weak before classifying its monotonicity, never treating the two as synonyms.

### MC-2: MONOTONICITY-EXTRAPOLATED-FROM-SAMPLE-POINTS
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Foundational" severity rating, independently confirmed
- **Description:** Believing an increasing (or decreasing) trend observed at several sample points establishes monotonicity across the whole interval, missing that a reversal could occur between or beyond the sampled points.
- **Why this birth type:** Overgeneralization from the everyday habit of trusting a consistent pattern across several checked cases, extended incorrectly to a universal claim spanning infinitely many untested points where a reversal could be hiding.
- **Detection probe:** "$f(1)=5$, $f(2)=8$, $f(3)=11$ — all increasing. Is $f$ monotonic increasing on all of $\mathbb{R}$?" A student with MC-2 answers "yes" based on the sampled trend alone.
- **Repair:** Work $f(x)=x^3-3x$ sampled at $x=-3,-2,-1$ (giving $-18,-2,2$ — apparently increasing), then compute $f(0)=0$ directly — LESS than $f(-1)=2$, revealing a genuine reversal between $x=-1$ and $x=0$ that the sampled trend gave no warning of.
- **Verification of death:** Given a sampled increasing trend, the student states that this alone is insufficient evidence, and either checks the full interval algebraically or explicitly withholds a monotonicity conclusion pending further evidence.

### MC-3: INJECTIVE-IMPLIES-MONOTONIC
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Moderate" severity rating, independently confirmed
- **Description:** Believing every injective function must also be monotonic, missing that a function can avoid repeating values while still reversing direction somewhere in its domain.
- **Why this birth type:** Overgeneralization from the correctly-proven implication "strict monotonicity $\Rightarrow$ injective" incorrectly reversed into its converse, without checking whether the reverse direction is actually justified.
- **Detection probe:** "If a function is injective (never repeats a value), must it also be monotonic?" A student with MC-3 answers "yes."
- **Repair:** Work $h(x)=1/x$ on $\mathbb{R}\setminus\{0\}$: it IS injective ($1/x=1/y\Rightarrow x=y$), yet comparing $-1<-0.5$ gives $h(-1)=-1$ to $h(-0.5)=-2$ (decreasing), while comparing $-0.5<0.5$ gives $h(-0.5)=-2$ to $h(0.5)=2$ (increasing) — the SAME function shows both a decrease and an increase across its domain, proving injectivity does not require or imply monotonicity.
- **Verification of death:** Given an injective function, the student states that monotonicity must be checked SEPARATELY, never inferred automatically from injectivity alone.

## Analogies
1. **The escalator-versus-elevator analogy (targets MC-1).** A strictly increasing function is like an escalator that is always genuinely moving upward — every step is higher than the last. A weakly increasing function is like an elevator that sometimes pauses at a floor before continuing up — it never goes DOWN, but it can hold perfectly still for a while, which a strict escalator never does.
2. **The hidden-dip-in-the-road analogy (targets MC-2).** Driving along a road and noting the elevation rises at three checkpoints in a row doesn't guarantee the road keeps rising everywhere — there could be a dip just past the last checkpoint you happened to measure. Only surveying the ENTIRE road (or having a structural guarantee about its shape) actually proves it never dips.

## Demonstrations
### Demonstration 1 — strict versus weak monotonicity (mirrors Blueprint Ex1)
The constant function $f(x)=3$ satisfies $f(a)\le f(b)$ for every $a<b$ (since $3\le3$ always) — weakly both increasing and decreasing simultaneously, yet strictly neither ($f(a)<f(b)$ never holds, since $f(a)=f(b)=3$ always). Contrast with $g(x)=2x$: $g(a)<g(b)$ genuinely holds whenever $a<b$ — a strictly stronger condition than the constant function satisfies.

### Demonstration 2 — sample points can mislead about the full interval (mirrors Blueprint Ex2)
$f(x)=x^3-3x$ sampled at $x=-3,-2,-1$ gives $-18,-2,2$ — an apparently increasing trend, inviting extrapolation. Directly computing $f(0)=0$ reveals a value LESS than $f(-1)=2$: the function has actually turned around between $x=-1$ and $x=0$. $f$ is increasing on $(-\infty,-1)$ but decreasing on $(-1,1)$ — the sampled integer points, all lying in the increasing region, gave no warning of the reversal just beyond them.

### Demonstration 3 — strict monotonicity proves injectivity, but the converse fails (mirrors Blueprint Ex3)
For $g(x)=2x+1$ (strictly increasing): if $g(a)=g(b)$ then $2a+1=2b+1\Rightarrow a=b$, confirming injectivity exactly as the general proof predicts. For $h(x)=1/x$ on $\mathbb{R}\setminus\{0\}$: genuinely injective, yet comparing $-1<-0.5$ shows a decrease ($-1\to-2$) while comparing $-0.5<0.5$ shows an increase ($-2\to2$) — the same function is not monotonic overall, despite being injective, decisively refuting the converse.

## Discovery Questions
1. "Does 'the function is non-decreasing' mean the same thing as 'the function is strictly increasing'? Check against the constant function $f(x)=3$."
2. "If a function increases across several sample points in a row, is that enough to conclude it is monotonic increasing on the whole interval?"
3. "If a function is injective (never repeats a value), must it also be monotonic?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — direct point-by-point comparison BEFORE the general definition**, matching the Blueprint's own CPA justification; grounding the strict-versus-weak distinction and the sampling pitfall in specific numerical examples makes the universal quantifier concrete before generalizing.
1. Work Demonstration 1's constant-versus-linear contrast, posing Discovery Question 1 before formalizing the strict-versus-weak distinction.
2. Work Demonstration 2's reversal-hidden-beyond-the-sample case, posing Discovery Question 2 before confirming why sampling never suffices.
3. Work Demonstration 3's proof and counterexample, posing Discovery Question 3 before confirming the converse genuinely fails.
4. Assess with the P77 problem set and the profit-function transfer probe (P76, independence mode).

## Tutor Actions
1. **On any monotonicity classification:** require the student to state explicitly whether the strict or weak inequality is being claimed, never leaving it ambiguous.
2. **On any monotonicity verification from sample points:** require either a full-interval algebraic argument or an explicit statement that the sampled evidence is insufficient.
3. **On any injectivity-implies-monotonicity claim:** require the student to check monotonicity independently, never inferring it from injectivity alone.

## Voice Teaching Notes
1. **Register:** proficient/conceptual — this concept assumes fluency with function evaluation and introduces a precise universal-quantifier property with a genuine one-directional implication to injectivity.
2. **Load-bearing sentence, spoken slowly:** "A trend at a few points is a clue, never a proof — the whole interval has to hold."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely consider whether the sampled trend proves anything before revealing the hidden reversal.

## Assessment Signals
1. **Gate concept:** correctly classifies a function's monotonicity (strict increasing, weak increasing, strict decreasing, weak decreasing, or none) by full-interval reasoning.
2. **Strict-weak discrimination:** explicitly distinguishes strict from weak monotonicity, correctly classifying a constant function as an example of the weak-but-not-strict case.
3. **Sampling-insufficiency awareness:** states explicitly that a sampled trend never proves whole-interval monotonicity, and identifies what additional evidence would be needed.
4. **Implication direction:** correctly proves strict monotonicity implies injectivity via a general argument, and correctly states (with a counterexample) that the converse fails.
5. **Transfer:** applies monotonicity reasoning to a real-world profit-function scenario (P76), correctly distinguishing sampled evidence from a proven strict-monotonicity claim, and correctly refuting an injective-implies-monotonic argument.

## Tutor Recovery Strategy
If the student conflates strict and weak monotonicity, work several constant-versus-strictly-monotonic pairs until the distinction is automatic. If the student extrapolates from sampled points, work fresh functions engineered to reverse just beyond a consistent-looking sample until withholding judgment on partial evidence becomes standard practice. If the student assumes injectivity implies monotonicity, work the $1/x$ counterexample (or a fresh equivalent) repeatedly until the converse's failure is expected rather than surprising.

## Memory Hooks
1. "Weak permits flat; strict forbids it entirely — a constant function is the line between them."
2. "A trend at a few points is a clue, never proof — the reversal could be hiding just past the last one you checked."
3. "Strictly monotonic guarantees injective — injective guarantees nothing about monotonic."

## Transfer Connections
- **`math.func.function-concept`:** the function evaluation this concept's point-by-point comparisons directly build on.
- **`math.func.injectivity`:** this concept supplies a genuine SUFFICIENT (but not necessary) condition for injectivity — strict monotonicity — extending that concept's own general definition with a concrete, checkable proof technique, without re-deriving injectivity's own theory.
- **`math.func.inverse-functions`:** strict monotonicity is exactly the condition guaranteeing a function's restriction to its range has a well-defined inverse, via the injectivity this concept proves.

## Cross-Subject Connections
- **Economics (demand and supply curves, marginal analysis):** monotonicity directly models whether a demand curve consistently decreases (or a cost function consistently increases) across an entire relevant range, a claim economists must verify rather than assume from limited data.
- **Computer Science (sorting invariants, monotonic stacks/queues):** monotonicity is the exact defining invariant of monotonic data structures (monotonic stacks, monotonic queues) used in a range of optimization algorithms.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.monotonic-function.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on a profit function, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 3, MC-2 Type 1, MC-3 Type 1.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own declaration. The Blueprint's own Component 7 additionally notes (informally, not a formal `requires`/`cross_links` entry) a direct connection to already-authored `math.func.injectivity`: this concept supplies a sufficient condition for that concept's own property, without re-deriving its general theory — confirmed and preserved here.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.func.inverse-functions`, confirmed against the live KG).

## Version History
- **Batch 29** (2026-09-12): initial authoring, part 3 of 4 this batch (with `math.func.function-operations`, `math.func.composition`, `math.func.bijection`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 3, MC-2 Type 1, MC-3 Type 1).
