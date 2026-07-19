# Teaching Blueprint: Logarithmic Function (`math.func.logarithmic-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.logarithmic-function` |
| name | Logarithmic Function |
| domain | Functions |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.alg.logarithm`, `math.func.inverse-functions` |
| unlocks | `math.calc.derivative-ln` |
| cross_links | `math.calc.derivative-ln` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — the already-known exponential graph before the inverse reflection |
| description (KG) | The inverse of the exponential function; f(x) = logₐ(x); domain (0, ∞); ln x is the natural logarithm; derivative is 1/x. |

## Component 1 — Learning Objectives

- LO1: Recognize $\log_a(x)$ as the **inverse function** of $a^x$ (reusing `math.func.inverse-functions`'s own inverse machinery) with domain and range SWAPPED from the exponential — since $a^x$ has range $(0,\infty)$, $\log_a(x)$ has DOMAIN $(0,\infty)$, correctly explaining why the log of a nonpositive number is undefined as a direct consequence of this swap, not an arbitrary restriction.
- LO2: **Graph** $\log_a(x)$ as the reflection of $a^x$ across the line $y=x$ (reusing `math.func.inverse-functions`'s own reflection technique), correctly deriving the resulting key features (vertical asymptote at $x=0$, passing through $(1,0)$) as direct consequences of the exponential's own already-known features (horizontal asymptote $y=0$, $y$-intercept $(0,1)$), not as independently memorized facts.
- LO3 (orientation level — full derivation deferred to the unlocked child): recognize the **natural logarithm** $\ln x$ specifically as $\log_e(x)$, the inverse of `math.func.exponential-function`'s natural exponential $e^x$, and recognize, without deriving, that its derivative is exactly $1/x$ — deferred to `math.calc.derivative-ln`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.logarithm` ($\log_a(x)$ as the exponent to which $a$ must be raised to give $x$) and `math.func.inverse-functions` (the domain/range swap and graph-reflection-across-$y=x$ techniques for constructing an inverse function).

## Component 3 — Core Explanation

**The domain restriction as a consequence, not an arbitrary rule**: $\log_a(x)$ is the INVERSE function of $f(x)=a^x$. By `math.func.inverse-functions`'s own domain/range-swap principle, the inverse's DOMAIN equals the original function's RANGE — and since $a^x$'s range is $(0,\infty)$ (per `math.alg.exponential-function`, $a^x$ is never zero or negative), $\log_a(x)$'s domain must be exactly $(0,\infty)$. This directly explains why $\log_a$ of a nonpositive number is undefined: there is simply no exponent $x$ for which $a^x$ produces such a value in the first place, since $a^x$'s range never reaches there.

**Graphing by reflection, not by memorization**: since $\log_a(x)$ is the inverse of $a^x$, its graph is obtained by reflecting $a^x$'s graph across the line $y=x$ (swapping the $x$- and $y$-coordinates of every point). The exponential's $y$-intercept $(0,1)$ reflects to $\log_a(x)$'s $x$-intercept $(1,0)$; the exponential's horizontal asymptote $y=0$ reflects to $\log_a(x)$'s VERTICAL asymptote $x=0$. Every key feature of the logarithmic graph is therefore a direct, derivable consequence of the already-known exponential graph, not a separate fact to memorize independently.

**The natural logarithm and its derivative (orientation level)**: $\ln x$ is specifically $\log_e(x)$ — the inverse of `math.func.exponential-function`'s natural exponential $e^x$. Since $e^x$ is its own derivative (that concept's own defining property), the derivative of its inverse $\ln x$ turns out, via a general inverse-function derivative relationship not derived here, to be exactly $1/x$ — a remarkably clean result. Full derivation is the dedicated subject of `math.calc.derivative-ln`.

## Component 4 — Worked Examples

**Example 1 (LO1 — domain as an inverse consequence, breaking MC-1)**: since $f(x)=2^x$ has range $(0,\infty)$ (never zero or negative), its inverse $f^{-1}(x)=\log_2(x)$ must have DOMAIN $(0,\infty)$, directly by the inverse-function domain/range-swap rule. This explains directly why $\log_2(-8)$ and $\log_2(0)$ are undefined: there is no exponent $x$ such that $2^x$ produces a nonpositive result, since $2^x$'s range never includes such values at all.

**Example 2 (LO2 — graphing by reflection, breaking MC-2)**: the graph of $f(x)=2^x$ passes through $(0,1)$ with horizontal asymptote $y=0$. Reflecting across $y=x$ (swapping coordinates of every point) gives $\log_2(x)$'s graph passing through $(1,0)$ (the reflected point) with a VERTICAL asymptote at $x=0$ (the reflected horizontal asymptote). Every one of these features was derived directly from the already-known exponential graph, without independently memorizing a separate set of facts about logarithms.

**Example 3 (LO3, orientation level — natural log as inverse of $e^x$, derivative preview)**: $\ln x=\log_e(x)$, specifically the inverse of `math.func.exponential-function`'s $e^x$. Because $e^x$'s defining property is being its own derivative, the derivative of its inverse $\ln x$ works out to exactly $\dfrac1x$ — a clean, special result tied directly to $e$'s own special status, fully derived in `math.calc.derivative-ln`.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Domain Restriction Is Derived, Not Arbitrary (Primitive P11: Representation Shift)

State: "$\log_a(x)$'s domain isn't a rule someone imposed — it's forced by the fact that $a^x$'s own RANGE never reaches zero or negative values, and an inverse's domain always matches the original's range." Work Example 1's direct domain-derivation from $2^x$'s known range.

- **MC-1 hook**: ask "is the restriction that $\log_a(x)$ is only defined for $x>0$ an arbitrary convention to memorize?" — a "yes" answer reveals MC-1 (missing that the domain restriction is a direct, derivable consequence of the exponential's own range).

### Teaching Action A02 — The Graph Is Reflected, Not Independently Memorized (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: every key feature of $\log_2(x)$'s graph (the $x$-intercept, the vertical asymptote) is produced directly by reflecting the already-known features of $2^x$'s graph across $y=x$. State: "you don't need to separately memorize the log function's graph — reflect the exponential's graph you already know, and every feature falls out automatically."

- **MC-2 hook**: ask "do you need to separately memorize the log function's graph's key features (asymptote location, intercept), or can they be derived from the exponential's already-known graph?" — a "separately memorize" answer reveals MC-2 (missing the direct reflection relationship).

### Teaching Action A03 — $\ln x$ Is Singled Out Because $e^x$ Is Special (Primitive P06: Contrast Pair)

Contrast treating $\ln x$ as an arbitrary "named" logarithm chosen for convenience against Example 3's evidence that it is specifically the inverse of the SELF-DERIVATIVE exponential $e^x$, giving it the remarkably clean derivative $1/x$. State: "$\ln x$ isn't singled out arbitrarily — it inherits its special calculus properties directly from $e^x$'s own defining self-derivative property."

- **MC-3 hook**: ask "is $\ln x$ just an arbitrarily named logarithm with no special calculus significance beyond convenience?" — a "yes" answer reveals MC-3 (missing that $\ln x$'s special status comes directly from being the inverse of the specifically self-derivative $e^x$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Since $f(x)=5^x$ has range $(0,\infty)$, state the domain of its inverse $\log_5(x)$, and explain why $\log_5(-3)$ is undefined using the inverse-domain-range-swap reasoning.
  2. Given that $3^x$ passes through $(0,1)$ with horizontal asymptote $y=0$, state the corresponding point and asymptote for $\log_3(x)$'s graph, using the reflection-across-$y=x$ argument.
  3. Explain why $\ln x$ is specifically defined as $\log_e(x)$ rather than a log to some other base, referencing this lesson's connection to $e^x$.
  4. A student says "the derivative of $\ln x$ is complicated because logarithms are complicated functions." Using this lesson's preview, explain why this intuition is actually backwards.
- **P76 (Transfer Probe, mode = independence)**: "A scientist models sound intensity using the decibel formula, which involves $\log_{10}(x)$. (a) Explain, using the inverse-function domain/range-swap reasoning from this lesson, why $\log_{10}$ of a negative sound-intensity value would be mathematically undefined (not merely 'a weird edge case'). (b) If $10^x$ has a $y$-intercept at $(0,1)$ and horizontal asymptote $y=0$, state the corresponding features of $\log_{10}(x)$'s graph. (c) Explain why scientists might prefer using $\log_{10}$ specifically (rather than $\ln$) for a decibel-style formula, while mathematicians studying calculus overwhelmingly prefer $\ln$ — referencing this lesson's discussion of what makes $e$ special."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LOG-DOMAIN-ASSUMED-ARBITRARY | Believing the domain restriction $(0,\infty)$ on $\log_a(x)$ is an arbitrary rule to memorize, missing that it is a direct, derivable consequence of $a^x$'s own range | Foundational |
| MC-2 | LOG-GRAPH-ASSUMED-INDEPENDENT-FACTS | Believing the log function's graph must be separately memorized, missing that every key feature is a direct reflection of the already-known exponential graph across $y=x$ | High |
| MC-3 | LN-X-ASSUMED-ARBITRARILY-CHOSEN | Believing $\ln x$ is an arbitrarily named logarithm with no special calculus significance, missing that it is specifically singled out as the inverse of the self-derivative exponential $e^x$ | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Log Domain Assumed Arbitrary") → P41 (detect: ask whether the domain restriction on $\log_a(x)$ is an arbitrary convention) → P64 (conceptual shift: re-walk Example 1's range-to-domain derivation, re-anchoring on "the restriction is forced by the exponential's own range").
- **B02 (targets MC-2)**: P27 (name it: "Log Graph Assumed Independent Facts") → P41 (detect: ask whether the log function's graph must be separately memorized) → P64 (conceptual shift: re-walk Example 2's reflection derivation, re-anchoring on "every feature falls out of reflecting the exponential's already-known graph").
- **B03 (targets MC-3)**: P27 (name it: "$\ln x$ Assumed Arbitrarily Chosen") → P41 (detect: ask whether $\ln x$'s special status is just a naming convenience) → P64 (conceptual shift: re-walk Example 3's connection to $e^x$'s self-derivative property, re-anchoring on "$\ln x$'s special status comes directly from $e$'s own special property").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.logarithm` (the basic definition of $\log_a(x)$ as an exponent) and `math.func.inverse-functions` (the domain/range-swap and reflection-across-$y=x$ techniques this concept applies directly).
- **Unlocks**: `math.calc.derivative-ln` (will fully derive $\dfrac d{dx}[\ln x]=\dfrac1x$, previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists `math.calc.derivative-ln`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the domain-swap derivation and the graph-reflection technique) and LO3 kept orientation-level, appropriately deferring the derivative derivation to this concept's own unlocked child.
- **Division of labor**: `math.alg.logarithm` owns the basic definition of $\log_a(x)$ as an exponent; `math.func.inverse-functions` owns the general inverse-function machinery (domain/range swap, graph reflection). This concept owns the SPECIALIZATION of both to the logarithmic function specifically, deliberately deriving every graphical and domain feature from already-established exponential facts rather than introducing a separate, parallel set of logarithm-specific facts to memorize.
- Example 3's connection to `math.func.exponential-function`'s own self-derivative property was included deliberately, since it directly ties this concept's forward-looking LO3 to a fact already established in that sibling concept, rather than presenting $\ln x$'s special status as an unexplained given.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.derivative-ln` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: the already-known exponential graph before the inverse reflection) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
