# Teaching Blueprint: Limits of Sequences (Calculus) (`math.calc.sequence-limits`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.sequence-limits` |
| name | Limits of Sequences (Calculus) |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.limits`, `math.seq.sequence` |
| unlocks | `math.seq.series-convergence` |
| cross_links | `math.seq.convergent` |
| CPA_entry_stage | A (Abstract) — the learner already has the formal ε-N definition from `math.seq.convergent`; this concept adds computational TECHNIQUE on top of that formalism |
| description (KG) | The limit of a sequence as n → ∞; computed using limit laws, l'Hôpital's rule (via continuous function), and the squeeze theorem. |

## Component 1 — Learning Objectives

- LO1: Compute a sequence limit by applying limit laws (sum, difference, product, quotient of convergent sequences) after algebraically resolving an indeterminate $\infty/\infty$ or $\infty-\infty$ form — dividing through by the highest power present — rather than treating the raw "shape" of the expression as an answer in itself.
- LO2: Apply l'Hôpital's rule to a sequence limit $a_n=f(n)$ by treating $n$ as a CONTINUOUS variable $x$, computing $\lim_{x\to\infty}f(x)$ via SEPARATE differentiation of the numerator and denominator (never the quotient rule on the whole fraction), and justifying why this continuous-variable substitution is valid for a sequence defined only on the integers.
- LO3: Apply the squeeze (sandwich) theorem to a sequence limit that resists direct algebraic manipulation — bounding the sequence between two simpler sequences that BOTH converge to the same limit, recognizing that a bound alone (without both sides converging to a common value) is insufficient.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.limits` (the $\varepsilon$-$\delta$ limit concept, limit laws for functions, l'Hôpital's rule for $0/0$ and $\infty/\infty$ forms) and `math.seq.sequence` (sequence notation $a_n$, explicit vs. recursive definitions).

## Component 3 — Core Explanation

**Indeterminate forms must be resolved algebraically before applying limit laws**: limit laws (the limit of a sum/product/quotient equals the sum/product/quotient of the limits) apply only once each piece individually has a KNOWN finite limit. An expression like $\dfrac{2n^2+3n}{5n^2-1}$ has the superficial "shape" $\infty/\infty$ as $n\to\infty$, but that shape is not itself an answer — dividing numerator and denominator by the highest power of $n$ present ($n^2$) converts it to $\dfrac{2+3/n}{5-1/n^2}$, where every individual piece now has a known limit ($3/n\to0$, $1/n^2\to0$), and the limit laws apply cleanly to give $2/5$.

**l'Hôpital's rule requires differentiating numerator and denominator separately, treating $n$ as continuous**: for a sequence $a_n=f(n)$ where $f$ extends to a differentiable function of a real variable $x$, if $\lim_{x\to\infty}f(x)$ has the $0/0$ or $\infty/\infty$ form, then $\lim_{x\to\infty}f(x)=\lim_{x\to\infty}\dfrac{f'(x)}{g'(x)}$ (numerator's derivative over denominator's derivative — NOT the derivative of the whole quotient via the quotient rule). Because $\lim_{x\to\infty}f(x)=L$ for the continuous extension guarantees $\lim_{n\to\infty}f(n)=L$ along the integer subsequence, the technique transfers validly from continuous $x$ back to discrete $n$.

**The squeeze theorem needs both bounds to converge to the SAME limit**: if $b_n\le a_n\le c_n$ for all sufficiently large $n$, and $\lim b_n=\lim c_n=L$, then $\lim a_n=L$ too. A bound alone is not enough — e.g., $-1\le\sin n\le1$ is a valid bound but $-1$ and $1$ do not converge to a common value, so it certifies nothing about $\sin n$ itself; the bound must be SCALED (e.g., dividing by $n$) until both sides genuinely converge to the same number.

## Component 4 — Worked Examples

**Example 1 (LO1 — resolving $\infty/\infty$ by dividing through, breaking MC-1)**: Compute $\lim_{n\to\infty}\dfrac{2n^2+3n}{5n^2-1}$. The raw form is $\infty/\infty$ — NOT itself equal to $1$ or any other number just from that shape. Dividing numerator and denominator by $n^2$: $\dfrac{2+3/n}{5-1/n^2}$. As $n\to\infty$: $3/n\to0$ and $1/n^2\to0$, so by the limit laws the expression $\to\dfrac{2+0}{5-0}=\dfrac25$. Contrast with the naive answer "$\infty/\infty=1$" (or "cancel the $n^2$'s to get $2/5$ by luck without justification") — the correct answer $2/5$ requires the algebraic division step, not direct substitution of $\infty$.

**Example 2 (LO2 — l'Hôpital via separate derivatives, breaking MC-2)**: Compute $\lim_{n\to\infty}\dfrac{\ln n}{n}$. Treating $n$ as continuous, $f(x)=\dfrac{\ln x}{x}$ has form $\infty/\infty$ as $x\to\infty$. l'Hôpital: differentiate numerator and denominator SEPARATELY: $\dfrac{d}{dx}\ln x=\dfrac1x$, $\dfrac{d}{dx}x=1$, giving $\lim_{x\to\infty}\dfrac{1/x}{1}=\lim_{x\to\infty}\dfrac1x=0$. Contrast with the WRONG approach of applying the quotient rule to the whole fraction first — $\dfrac{d}{dx}\left[\dfrac{\ln x}{x}\right]=\dfrac{(1/x)\cdot x-\ln x\cdot1}{x^2}=\dfrac{1-\ln x}{x^2}$ — an entirely different (and irrelevant) expression that is not what l'Hôpital's rule calls for. The correct limit is $0$.

**Example 3 (LO3 — squeeze theorem needs a tight, convergent bound, breaking MC-3)**: Compute $\lim_{n\to\infty}\dfrac{\sin n}{n}$. The trivial bound $-1\le\sin n\le1$ does NOT by itself determine the limit, since $-1$ and $1$ are constants that do not converge to a common value. Instead, divide through by $n$ (valid for $n>0$): $-\dfrac1n\le\dfrac{\sin n}{n}\le\dfrac1n$. Now BOTH bounds converge to $0$ as $n\to\infty$, so by the squeeze theorem $\lim_{n\to\infty}\dfrac{\sin n}{n}=0$ — despite $\sin n$ itself oscillating forever with no limit of its own.

## Component 5 — Teaching Actions

### Teaching Action A01 — Indeterminate Shapes Are Not Answers (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the raw $\infty/\infty$ shape gives no information on its own — the actual limit, $2/5$, only emerges after dividing through by $n^2$. State: "$\infty/\infty$, $0/0$, and $\infty-\infty$ are LABELS for 'more work needed,' never answers by themselves."

- **MC-1 hook**: ask "if a sequence limit has the form $\infty/\infty$, does that tell you the limit equals $1$ (or any specific number) directly?" — a "yes" answer reveals MC-1 (treating an indeterminate form's shape as if it were itself the numeric answer).

### Teaching Action A02 — l'Hôpital Differentiates Two Pieces Separately, Never the Whole Quotient (Primitive P06: Contrast Pair)

Contrast Example 2's correct separate-derivative computation ($1/x$ over $1$, giving limit $0$) against the wrong quotient-rule computation ($\dfrac{1-\ln x}{x^2}$, an unrelated expression). State: "l'Hôpital's rule differentiates the numerator and denominator as two SEPARATE functions — it is not the quotient rule, and applying the quotient rule here answers a different question entirely."

- **MC-2 hook**: ask "when applying l'Hôpital's rule to a fraction, should you differentiate the whole fraction using the quotient rule?" — a "yes" answer reveals MC-2 (confusing l'Hôpital's rule with the quotient rule).

### Teaching Action A03 — Squeeze Theorem Requires Both Bounds to Converge to the Same Value (Primitive P11: Representation Shift)

State: "knowing $-1\le\sin n\le1$ tells you $\sin n/n$ is trapped — but trapped between WHAT? Only once both bounding sequences themselves converge to the same number does the trap pin down the actual limit." Work Example 3's full progression from the trivial (insufficient) bound to the scaled (sufficient) bound.

- **MC-3 hook**: ask "is a bound like $-1\le\sin n\le1$ enough by itself to determine $\lim_{n\to\infty}\sin n/n$?" — a "yes" answer reveals MC-3 (missing that squeeze requires both bounding sequences to converge to a common limit).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\lim_{n\to\infty}\dfrac{3n^3-n}{2n^3+7}$ by dividing through by the highest power, showing why the raw $\infty/\infty$ shape alone gives no answer.
  2. Compute $\lim_{n\to\infty}\dfrac{n}{e^n}$ using l'Hôpital's rule, explicitly differentiating numerator and denominator SEPARATELY.
  3. Explain, using a specific pair of constants, why the bound $2\le a_n\le5$ alone is insufficient to conclude $\lim a_n$ exists.
  4. Compute $\lim_{n\to\infty}\dfrac{(-1)^n}{n^2}$ using the squeeze theorem, stating the two bounding sequences you use and confirming both converge to the same limit.
- **P76 (Transfer Probe, mode = cross-link probe against `math.seq.convergent`)**: "You just showed, via the squeeze theorem, that $\lim_{n\to\infty}\dfrac{\sin n}{n}=0$. (a) Using the formal $\varepsilon$-$N$ definition of convergence from `math.seq.convergent` ($\forall\varepsilon>0\ \exists N: n>N\Rightarrow|a_n-L|<\varepsilon$), find a specific $N$ (in terms of $\varepsilon$) such that $\left|\dfrac{\sin n}{n}-0\right|<\varepsilon$ for all $n>N$ — using the fact that $|\sin n|\le1$ for every $n$, regardless of its oscillation. (b) Explain why this $N$ works even though $\sin n$ itself never settles down or 'converges' in any sense on its own. (c) A colleague claims 'since $\sin n$ oscillates forever, no ε-N argument can possibly work for $\sin n/n$.' Explain specifically why this claim is wrong, referencing both this lesson's squeeze-theorem result and the formal definition."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INDETERMINATE-FORM-AS-DIRECT-ANSWER | Believing an indeterminate form like $\infty/\infty$ or $0/0$ is itself a numeric answer (e.g., "$\infty/\infty=1$"), rather than a signal that algebraic manipulation is required first | Foundational |
| MC-2 | LHOPITAL-CONFLATED-WITH-QUOTIENT-RULE | Believing l'Hôpital's rule means differentiating the whole fraction with the quotient rule, rather than differentiating numerator and denominator separately | Foundational |
| MC-3 | SQUEEZE-BOUND-WITHOUT-COMMON-LIMIT | Believing any valid bound (e.g., the trivial range of $\sin n$) is sufficient for the squeeze theorem, missing that both bounding sequences must converge to the SAME limit | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Indeterminate Form as Direct Answer") → P41 (detect: ask a student what $\lim_{n\to\infty}\frac{n}{n^2}$ "equals" purely from its $\infty/\infty$ shape, and check for a nonsense numeric guess like "1") → P64 (conceptual shift: re-walk Example 1's divide-through step, re-anchoring on "an indeterminate shape means 'more algebra needed,' never 'here is the answer'").
- **B02 (targets MC-2)**: P27 (name it: "l'Hôpital Conflated with Quotient Rule") → P41 (detect: ask a student to apply l'Hôpital to $\ln x/x$ and check whether they produce the quotient-rule expression $(1-\ln x)/x^2$ instead of $1/x$) → P64 (conceptual shift: re-walk Example 2's explicit side-by-side contrast, re-anchoring on "l'Hôpital differentiates TWO separate pieces, never the fraction as a whole").
- **B03 (targets MC-3)**: P27 (name it: "Squeeze Bound Without Common Limit") → P41 (detect: present the trivial bound $-1\le\sin n\le1$ and ask whether it alone proves $\sin n/n$ converges, checking for "yes") → P64 (conceptual shift: re-walk Example 3's progression from the insufficient trivial bound to the scaled bound where both sides genuinely converge to $0$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.limits` (the $\varepsilon$-$\delta$ limit concept and l'Hôpital's rule for continuous functions, both transferred here to sequences), `math.seq.sequence` (sequence notation and definitions).
- **Unlocks**: `math.seq.series-convergence` (uses sequence-limit computation directly to determine whether a series' partial sums converge).
- **Cross-link**: KG lists `math.seq.convergent` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**, engaging directly with `math.seq.convergent`'s formal $\varepsilon$-$N$ definition (its own TA-A01, using the $\sin n/n$-style oscillation-vs-formal-definition distinction) to confirm this concept's COMPUTATIONAL result ($\lim\sin n/n=0$, found via the squeeze theorem) satisfies that concept's FORMAL definition of convergence.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/apply tag places this at a "3 TAs + gate" tier appropriately sized for three genuinely distinct computational techniques (limit laws with algebraic resolution, l'Hôpital via continuous extension, squeeze theorem), each requiring its own worked example and misconception.
- **Division of labor**: `math.seq.convergent` owns the FORMAL definition of convergence (the $\varepsilon$-$N$ definition, the bounded-vs-convergent theorem, the oscillation-vs-divergence-to-infinity taxonomy) — it is a theory-of-convergence concept. This concept, `math.calc.sequence-limits`, deliberately does not re-teach that formalism; it owns COMPUTATIONAL TECHNIQUE for evaluating sequence limits (limit laws, l'Hôpital, squeeze theorem) — the "how to compute" companion to `math.seq.convergent`'s "what convergence means," reunited explicitly via the P76 cross-link probe.
- Example 2's contrast between the correct separate-derivative computation and the wrong quotient-rule computation was deliberately worked out in full (both giving explicit final expressions) so a learner can see they are not just different notations for the same thing, but genuinely different mathematical objects.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.seq.convergent authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.seq.convergent) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: formal ε-N definition already known; this concept adds computational technique) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
