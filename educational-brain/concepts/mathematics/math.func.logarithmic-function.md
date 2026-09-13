# math.func.logarithmic-function — Logarithmic Function (Domain as Inverse Consequence, Graph by Reflection, Natural Log Preview)

## Identity
- **KG ID:** `math.func.logarithmic-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.alg.logarithm`, `math.func.inverse-functions`
- **Unlocks:** `math.calc.derivative-ln`
- **Cross-links:** `math.calc.derivative-ln` (confirmed genuinely unauthored — independence mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) recognize $\log_a(x)$ as the inverse function of $a^x$, reusing `math.func.inverse-functions`'s own machinery, with domain and range SWAPPED from the exponential — correctly explaining why $\log_a$ of a nonpositive number is undefined as a direct consequence of this swap, not an arbitrary restriction; (2) graph $\log_a(x)$ as the reflection of $a^x$ across $y=x$, correctly deriving key features (vertical asymptote at $x=0$, passing through $(1,0)$) as direct consequences of the exponential's own known features; (3) recognize, at orientation level, the natural logarithm $\ln x=\log_e(x)$ as the inverse of `math.func.exponential-function`'s natural exponential $e^x$, with derivative $1/x$, deferred fully to `math.calc.derivative-ln`.

## Core Understanding
`math.alg.logarithm` supplies the basic exponent definition; `math.func.inverse-functions` supplies the general inverse machinery. This concept specializes both to the logarithmic function specifically, deriving every feature from the already-known exponential rather than introducing a parallel set of facts to memorize.

THE DOMAIN RESTRICTION IS A CONSEQUENCE, NOT AN ARBITRARY RULE: $\log_a(x)$ is the inverse of $f(x)=a^x$. By `math.func.inverse-functions`'s own domain/range-swap principle, the inverse's DOMAIN equals the original's RANGE — since $a^x$'s range is $(0,\infty)$, $\log_a(x)$'s domain must be exactly $(0,\infty)$. This directly explains why $\log_a$ of a nonpositive number is undefined: there is simply no exponent $x$ for which $a^x$ ever produces such a value, since $a^x$'s range never reaches there.

GRAPHING BY REFLECTION, NOT MEMORIZATION: since $\log_a(x)$ is the inverse of $a^x$, its graph is obtained by reflecting $a^x$'s graph across $y=x$. The exponential's $y$-intercept $(0,1)$ reflects to $\log_a(x)$'s $x$-intercept $(1,0)$; the exponential's horizontal asymptote $y=0$ reflects to $\log_a(x)$'s VERTICAL asymptote $x=0$. Every key feature of the log graph is a direct, derivable consequence of the already-known exponential graph.

THE NATURAL LOGARITHM INHERITS $e^x$'s SPECIAL STATUS (orientation level): $\ln x$ is specifically $\log_e(x)$ — the inverse of `math.func.exponential-function`'s natural exponential $e^x$. Since $e^x$ is its own derivative, the derivative of its inverse $\ln x$ turns out (via a general inverse-derivative relationship not derived here) to be exactly $1/x$ — a remarkably clean result. Full derivation is the dedicated subject of `math.calc.derivative-ln`.

## Mental Models
1. **Rung 1 — the log function's domain is forced by the exponential's own range, via the inverse domain/range swap — never an independent rule.** No exponent of $a$ ever produces a nonpositive result, so the log of one is undefined.
2. **Rung 2 — the log function's graph is derived by reflecting the already-known exponential graph across $y=x$ — never memorized separately.** Every feature (intercept, asymptote) transfers via the reflection.
3. **Rung 3 — $\ln x$ is singled out because it is the inverse of the specifically self-derivative $e^x$, giving it a uniquely clean derivative $1/x$.** This is not an arbitrary naming choice.

## Why Students Fail
Having learned the domain restriction $x>0$ for logarithms as a rule to apply mechanically, students can treat it as an arbitrary convention imposed on the function, missing that it is a direct, derivable consequence of the exponential's own range — there is genuinely no exponent that produces a nonpositive output, so no log of a nonpositive number can exist. Having been shown the logarithmic graph's key features (asymptote, intercept) as facts to memorize, students can treat them as a separate, independent set of information from the exponential graph, missing that every single feature is a direct reflection of the already-known exponential graph across $y=x$ — reducing the memorization load to zero if the connection is made. Finally, having encountered $\ln x$ as "the" natural logarithm without explanation, students can assume it is an arbitrarily named logarithm chosen purely for convenience, missing that it is specifically singled out because it is the inverse of the self-derivative exponential $e^x$, inheriting a uniquely clean calculus property as a direct consequence.

## Misconceptions

### MC-1: LOG-DOMAIN-ASSUMED-ARBITRARY
- **Birth type:** Type 1 (overgeneralization) — Blueprint designates this "Foundational," independently confirmed
- **Description:** Believing the domain restriction $(0,\infty)$ on $\log_a(x)$ is an arbitrary rule to memorize, missing that it is a direct, derivable consequence of $a^x$'s own range.
- **Why this birth type:** Overgeneralization: domain restrictions across many function types are often presented as rules to memorize without derivation, so students generalize this pattern to the logarithm's domain restriction as well, missing its specific inverse-function origin.
- **Detection probe:** "Is the restriction that $\log_a(x)$ is only defined for $x>0$ an arbitrary convention to memorize?" A student with MC-1 answers "yes."
- **Repair:** $f(x)=2^x$ has range $(0,\infty)$ (never zero or negative) — so its inverse $\log_2(x)$ must have DOMAIN $(0,\infty)$, directly by the inverse-function domain/range-swap rule. This directly explains why $\log_2(-8)$ and $\log_2(0)$ are undefined: there is no exponent $x$ such that $2^x$ produces a nonpositive result, since $2^x$'s range never includes such values.
- **Verification of death:** Given a base-$a$ exponential's range, the student correctly derives the corresponding logarithm's domain via the inverse domain/range swap, rather than citing the restriction as an unexplained rule.

### MC-2: LOG-GRAPH-ASSUMED-INDEPENDENT-FACTS
- **Birth type:** Type 5 (instruction-induced) — Blueprint rates this "High," independently confirmed
- **Description:** Believing the log function's graph must be separately memorized, missing that every key feature is a direct reflection of the already-known exponential graph across $y=x$.
- **Why this birth type:** Instruction-induced: logarithmic graphs are frequently presented and drilled as their own separate topic with their own separate feature list, obscuring the direct reflection relationship to the exponential graph that would eliminate the need for separate memorization.
- **Detection probe:** "Do you need to separately memorize the log function's graph's key features, or can they be derived from the exponential's already-known graph?" A student with MC-2 answers "separately memorize."
- **Repair:** The graph of $f(x)=2^x$ passes through $(0,1)$ with horizontal asymptote $y=0$. Reflecting across $y=x$ (swapping coordinates of every point) gives $\log_2(x)$'s graph passing through $(1,0)$ (the reflected point) with a VERTICAL asymptote at $x=0$ (the reflected horizontal asymptote). Every feature is derived directly, without independently memorizing a separate fact set.
- **Verification of death:** Given a known exponential graph, the student correctly derives the corresponding logarithm's graph features (intercept, asymptote) via the reflection-across-$y=x$ argument, without citing them as independently memorized facts.

### MC-3: LN-X-ASSUMED-ARBITRARILY-CHOSEN
- **Birth type:** Type 1 (overgeneralization) — Blueprint rates this "Moderate," independently confirmed
- **Description:** Believing $\ln x$ is an arbitrarily named logarithm with no special calculus significance, missing that it is specifically singled out as the inverse of the self-derivative exponential $e^x$.
- **Why this birth type:** Overgeneralization: students who have encountered many named mathematical objects presented without explained significance generalize that $\ln x$ is similarly just a convenient label, missing its specific derivation from $e^x$'s unique self-derivative property.
- **Detection probe:** "Is $\ln x$ just an arbitrarily named logarithm with no special calculus significance beyond convenience?" A student with MC-3 answers "yes."
- **Repair:** $\ln x=\log_e(x)$, specifically the inverse of `math.func.exponential-function`'s $e^x$. Because $e^x$'s defining property is being its own derivative, the derivative of its inverse $\ln x$ works out to exactly $\frac1x$ — a clean, special result tied directly to $e$'s own special status, not an arbitrary naming convenience.
- **Verification of death:** Given the question of why $\ln x$ is singled out, the student correctly connects it to $e^x$'s self-derivative property rather than treating the choice as arbitrary.

## Analogies
1. **The one-way-door-and-its-key analogy (targets MC-1).** A key that only opens doors leading to positive-numbered rooms (the exponential's range) cannot possibly open a door to a nonpositive-numbered room — the restriction isn't imposed separately, it's a direct consequence of which rooms the original door ever led to.
2. **The photograph-and-its-mirror-image analogy (targets MC-2).** A mirror image doesn't need to be independently photographed and studied — every feature of the reflection is fully determined by the original photograph and the mirror's position. The log graph's features are fully determined by the exponential graph and the $y=x$ mirror line.
3. **The one-key-that-fits-perfectly analogy (targets MC-3, echoing `math.func.exponential-function`'s own analogy for the same underlying fact).** Just as $e^x$'s derivative "turns smoothly" with no extra twist, its inverse $\ln x$ inherits that same smooth-turning property as $1/x$ — a direct consequence, not an independent coincidence.

## Demonstrations
### Demonstration 1 — domain as an inverse consequence (mirrors Blueprint Example 1)
$f(x)=2^x$ has range $(0,\infty)$, so its inverse $f^{-1}(x)=\log_2(x)$ must have DOMAIN $(0,\infty)$ — directly by the inverse-function domain/range-swap rule. $\log_2(-8)$ and $\log_2(0)$ are undefined because no exponent of $2$ ever produces a nonpositive result.

### Demonstration 2 — graphing by reflection (mirrors Blueprint Example 2)
$f(x)=2^x$ passes through $(0,1)$ with horizontal asymptote $y=0$. Reflecting across $y=x$: $\log_2(x)$'s graph passes through $(1,0)$ (the reflected point) with a VERTICAL asymptote at $x=0$ (the reflected horizontal asymptote) — every feature derived directly from the exponential's own graph.

### Demonstration 3 — natural log as inverse of $e^x$, derivative preview (mirrors Blueprint Example 3)
$\ln x=\log_e(x)$, the inverse of $e^x$. Because $e^x$'s defining property is being its own derivative, the derivative of its inverse $\ln x$ works out to exactly $\frac1x$ — a clean, special result tied directly to $e$'s own special status, fully derived in `math.calc.derivative-ln`.

## Discovery Questions
1. "Is the restriction that $\log_a(x)$ is only defined for $x>0$ an arbitrary convention, or can you derive it from $a^x$'s own range?"
2. "Do you need to separately memorize the log function's graph's key features, or can they be derived by reflecting the already-known exponential graph?"
3. "Is $\ln x$ just an arbitrarily named logarithm, or is there a specific reason it's singled out for calculus?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — the already-known exponential graph before the inverse reflection**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's range-to-domain derivation for $2^x$, posing Discovery Question 1 before confirming the domain restriction is forced, not arbitrary.
2. Work Demonstration 2's graph-by-reflection derivation, posing Discovery Question 2 before confirming every log-graph feature transfers from the exponential.
3. Work Demonstration 3's connection between $\ln x$ and $e^x$'s self-derivative property, posing Discovery Question 3 before confirming $\ln x$'s special status is derived, not arbitrary.
4. Assess with the P77 problem set and the decibel-formula transfer probe (P76, independence mode).

## Tutor Actions
1. **On any log-domain question:** require the student to derive the domain from the corresponding exponential's range via the inverse swap, never citing it as an unexplained rule.
2. **On any log-graphing task:** require the student to derive each feature by reflecting the known exponential graph across $y=x$, never memorizing the log graph independently.
3. **On any question about $\ln x$'s significance:** require the student to connect it to $e^x$'s self-derivative property, never treating the naming as arbitrary.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with the basic logarithm definition and inverse-function machinery, and applies both concretely.
2. **Load-bearing sentence, spoken slowly:** "Every feature of the log graph is the exponential graph, reflected — nothing new to memorize."
3. **Wait time:** pause after Discovery Question 1, letting the student genuinely work out the domain from the exponential's range before confirming it.

## Assessment Signals
1. **Gate concept:** correctly derives a logarithm's domain from the corresponding exponential's range via the inverse swap.
2. **Reflection fluency:** correctly derives the log graph's key features (asymptote, intercept) by reflecting the known exponential graph.
3. **Natural-log significance:** correctly explains why $\ln x$ is specifically singled out, connecting it to $e^x$'s self-derivative property.
4. **Domain-restriction reasoning:** correctly explains why a specific nonpositive input is undefined for a logarithm, citing the exponential's range.
5. **Transfer:** applies the domain-derivation and reflection techniques to the decibel formula's $\log_{10}$ (P76), correctly explaining why scientists and mathematicians prefer different bases for different purposes.

## Tutor Recovery Strategy
If the student treats the log domain as arbitrary, require them to derive it from a fresh exponential's range on several examples until the derivation is automatic. If the student memorizes the log graph independently, require them to derive each feature by reflection on fresh bases until the connection is automatic. If the student treats $\ln x$ as arbitrarily chosen, require them to restate its connection to $e^x$'s self-derivative property on fresh prompts until the reasoning is fluent.

## Memory Hooks
1. "The log's domain is forced by the exponential's range — no exponent ever gives a nonpositive result."
2. "Reflect the exponential graph across $y=x$ — the log graph's features fall out for free."
3. "$\ln x$ is special because $e^x$ is special — its derivative $1/x$ is a direct inheritance, not a coincidence."

## Transfer Connections
- **`math.alg.logarithm`:** the basic exponent definition of $\log_a(x)$ this concept extends to full function treatment.
- **`math.func.inverse-functions`:** the domain/range-swap and reflection-across-$y=x$ machinery this concept applies directly and concretely.
- **`math.func.exponential-function`:** the natural exponential $e^x$ whose self-derivative property is inherited by its inverse, $\ln x$, established here at orientation level.
- **`math.calc.derivative-ln`** (not yet authored): the full derivation of $\frac{d}{dx}[\ln x]=\frac1x$, previewed here.

## Cross-Subject Connections
- **Physics and engineering (decibel and pH scales):** logarithmic scales like decibels ($\log_{10}$) and pH directly apply this concept's domain and graphing reasoning to real measured quantities.
- **Computer science (algorithmic complexity):** logarithmic time complexity ($O(\log n)$) directly uses the logarithm's growth-rate properties, ultimately traceable to the inverse relationship with exponential growth established here.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.logarithmic-function.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on the decibel formula, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 1, MC-2 Type 5, MC-3 Type 1), independently confirmed rather than re-derived.
- Cross-link: `math.calc.derivative-ln` re-verified genuinely unauthored (Blueprint exists, no Educational Brain entry, `math.calc` domain unstarted) — confirmed matching the Blueprint's own independence-mode declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both `math.calc.derivative-ln`, confirmed against the live KG).

## Version History
- **Batch 32** (2026-09-12): initial authoring, part 3 of 4 this batch (with `math.func.quadratic-function`, `math.func.exponential-function`, `math.func.piecewise-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 1, MC-2 Type 5, MC-3 Type 1).
