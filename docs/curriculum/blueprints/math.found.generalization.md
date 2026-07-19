# Teaching Blueprint: Generalization (`math.found.generalization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.generalization` |
| name | Generalization |
| domain | Foundations |
| difficulty | foundational |
| bloom | evaluate |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.pattern-recognition`, `math.found.abstraction` |
| unlocks | `math.found.proof`, `math.found.axiom` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a concrete, dramatic failed-generalization case before stating the evaluative criteria abstractly |
| description (KG) | The act of formulating a statement that holds for a broad class of cases, typically discovered by examining specific instances and identifying invariant structure. |

## Component 1 — Learning Objectives

- LO1: Distinguish generalization (asserting a claim holds for a BROAD, often infinite, class of cases beyond those examined) from `math.found.pattern-recognition` (finding a rule that fits a SPECIFIC given sequence) and `math.found.abstraction` (identifying which properties are essential across contexts) — recognizing generalization typically combines both: pattern-recognition supplies candidate structure, abstraction identifies which features are essential, and generalization is the further, distinct act of asserting the claim extends beyond the examined cases.
- LO2: Recognize that a generalization is a **conjecture**, not yet an established fact — no finite number of confirming cases, however many, can PROVE a generalization true for every case, only a genuine proof (`math.found.proof`) can.
- LO3: Distinguish a **valid** generalization (an invariant structure genuinely present across the full intended class) from an **overgeneralization** (a claim that holds for the examined cases but fails once a single sufficiently different or untested case is checked), using a concrete counterexample test.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.pattern-recognition` (the 4-step process of identifying a rule from specific instances, and that a finite sequence may admit more than one fitting rule) and `math.found.abstraction` (identifying essential shared properties across contexts while ignoring irrelevant surface details).

## Component 3 — Core Explanation

**Generalization is a distinct, further act beyond pattern-recognition and abstraction**: pattern-recognition finds a rule that fits a GIVEN, specific sequence or set of instances. Abstraction identifies WHICH properties, among those observed, are essential rather than incidental. Generalization takes a further step: it asserts that the identified structure holds not just for the examined cases, but for an entire broad CLASS of cases — most of which have never actually been checked. This is precisely why a generalization is a claim requiring justification, not a description of what was directly observed.

**A generalization is a conjecture, never proven by examples alone**: checking a generalization against 10, 100, or even a million specific cases can never logically rule out failure at case number 1,000,001 — confirming instances make a conjecture more PLAUSIBLE, but plausibility is not proof. Only a genuine proof (`math.found.proof`), establishing the claim from agreed starting principles (`math.found.axiom`) for every case in the class simultaneously, can establish a generalization as a mathematical fact.

**Valid generalization vs. overgeneralization — the counterexample test**: a generalization is only as good as the genuine invariant structure behind it. If the apparent pattern's underlying cause does not actually extend to the full intended class — often because it was only checked on a narrow or atypically similar subset of cases — a single well-chosen counterexample from OUTSIDE that subset can refute it entirely, regardless of how many confirming cases were checked first.

## Component 4 — Worked Examples

**Example 1 (LO2 — no finite number of confirming cases proves a generalization, breaking MC-1)**: Consider the claim "$n^2+n+41$ is always prime, for every non-negative integer $n$." Checking $n=0,1,2,\dots,39$ — forty consecutive values — every single one is indeed prime (a genuinely striking run of confirmations). But at $n=40$: $40^2+40+41=1600+40+41=1681=41^2$, which is composite. Forty straight confirming cases did not prove the generalization — they only made it feel more certain than it actually was. Only checking the ONE case that mattered, $n=40$, revealed the claim is false as stated for all $n$.

**Example 2 (LO3 — insufficient variation in the tested cases, breaking MC-2)**: Consider the claim "the sum of any two prime numbers is even." Testing $3+5=8$, $5+7=12$, $7+11=18$, $11+13=24$ — every sum tested is indeed even, seemingly confirming the pattern. But the tested primes were all ODD; the claim was never checked against the one EVEN prime, $2$. Testing $2+3=5$ (odd) immediately refutes the generalization. The apparent pattern held only because the tested cases shared an unexamined structural similarity (all odd primes) rather than covering the full, structurally varied class the claim was actually asserting something about (ALL primes).

**Example 3 (LO1/LO3 — surface similarity mistaken for genuine invariant structure, breaking MC-3)**: Checking a square, a rectangle, and a rhombus, a learner observes: in every case, the two diagonals bisect each other. Generalizing to "every quadrilateral's diagonals bisect each other" fails immediately on a kite (two pairs of adjacent equal sides): its diagonals do NOT bisect each other (only one diagonal is bisected by the other). The three checked shapes all happened to share a genuine common structural cause — being a PARALLELOGRAM — but the generalization was stated over the much broader class "quadrilateral," which includes shapes (like the kite) lacking that specific structural cause. The correct generalization is "every PARALLELOGRAM's diagonals bisect each other" — narrower, but genuinely valid, because it correctly identifies the actual invariant structure (parallelogram-ness) rather than a superficially similar but too-broad class (quadrilateral).

## Component 5 — Teaching Actions

### Teaching Action A01 — Generalization Is a New Act, Beyond Finding a Rule or Identifying Essentials (Primitive P11: Representation Shift)

State: "pattern-recognition finds a rule that fits what you've SEEN; abstraction tells you which features of what you've seen actually matter; generalization is the further claim that the rule, built from the essential features, holds far BEYOND what you've seen." Walk through how Example 1's polynomial rule ($n^2+n+41$) was pattern-matched against 40 instances, then generalized (incorrectly, as it turned out) to ALL $n$.

- **MC-1 hook** (this TA sets up, but does not itself repair): ask "if pattern-recognition already found a rule fitting every instance checked, has generalization already been achieved?" — a "yes" answer previews the gap this lesson closes, formally hooked in TA-A02.

### Teaching Action A02 — Confirming Cases Never Prove a Generalization (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: forty consecutive confirming cases for $n^2+n+41$, followed by definitive failure at $n=40$. State: "no matter how many cases confirm a pattern, the NEXT untested case could always be the one that breaks it — only an actual proof rules this out entirely."

- **MC-1 hook**: ask "if a generalization has been checked and confirmed on many specific cases, has it thereby been proven true for all cases?" — a "yes" answer reveals MC-1 (believing repeated confirmation constitutes proof).

### Teaching Action A03 — Test Structurally Varied Cases, Not Just More of the Same Kind (Primitive P06: Contrast Pair)

Contrast Example 2's odd-prime-only testing (all sums even, seemingly confirmed) against the single even-prime counterexample $2+3=5$ (odd, refuting it). Contrast Example 3's parallelogram-family testing (all diagonals bisecting) against the kite counterexample (diagonals not bisecting). State: "testing MORE cases that are all structurally similar to each other adds little confidence — a counterexample from a structurally DIFFERENT part of the intended class is what actually tests a generalization."

- **MC-2 hook**: ask "if a claim about 'all primes' has been checked and confirmed on several odd primes, is that sufficient testing?" — a "yes" answer reveals MC-2 (missing the need to test structurally atypical cases, like the even prime 2).
- **MC-3 hook**: ask "if several different-looking shapes (square, rectangle, rhombus) all share a property, is it safe to generalize that property to the entire broader category they all belong to (quadrilaterals)?" — a "yes" answer reveals MC-3 (mistaking surface similarity among tested cases for the genuine invariant structure that actually causes the property).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. The claim "$2^{2^n}+1$ is always prime" was checked and found true for $n=0,1,2,3,4$ (the Fermat primes). Explain why this does not constitute a proof, and state what a single counterexample at $n=5$ would show.
  2. A student tests "the product of two consecutive integers is always even" only on positive integers $2\times3=6$, $5\times6=30$, $9\times10=90$. Identify a structurally different case (not yet tested) that should also be checked, and evaluate whether the claim survives it.
  3. A learner observes that a square and an equilateral triangle both have "all sides equal" and generalizes "all polygons with equal side lengths are regular." Give a counterexample (a polygon with all equal side lengths that is NOT regular) and identify the genuine invariant structure the learner missed.
  4. Explain, in your own words, the difference between "this generalization is well-supported by evidence" and "this generalization is proven."
- **P76 (Transfer Probe, mode = independence)**: "A researcher studying a new numerical sequence finds that the first 15 terms all satisfy a proposed formula $a_n=n^2-n+11$. (a) Explain what checking these 15 terms does and does NOT establish about the formula holding for every $n$. (b) The researcher wants to test the generalization more rigorously before attempting a proof. Describe what KIND of additional test case(s) would be most informative to check next, and why 'checking 15 more terms in the same range' would add little value. (c) A colleague claims 'since the formula has held for 15 straight terms, it is now essentially proven, and a formal proof would just be a formality.' Using this lesson's distinction between a well-supported conjecture and a proof, explain specifically why this claim is incorrect."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONFIRMING-CASES-CONSTITUTE-PROOF | Believing that checking a generalization against many specific cases proves it true for all cases, missing that no finite number of confirmations can rule out a future counterexample | Foundational |
| MC-2 | INSUFFICIENT-VARIATION-IN-TESTED-CASES | Believing testing multiple cases that are all structurally similar to each other (e.g., all odd primes) sufficiently tests a generalization about a broader class (e.g., all primes), missing the need for structurally atypical test cases | Foundational |
| MC-3 | SURFACE-SIMILARITY-MISTAKEN-FOR-INVARIANT-STRUCTURE | Generalizing a property observed across several similar-looking cases to a much broader class, without identifying whether the genuine underlying structural cause actually extends to that broader class | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Confirming Cases Constitute Proof") → P41 (detect: ask a student whether 40 consecutive confirming cases proves a generalization, checking for "yes") → P64 (conceptual shift: re-walk Example 1's $n^2+n+41$ failure at $n=40$ after 40 straight successes, re-anchoring on "confirmation increases plausibility, never proves").
- **B02 (targets MC-2)**: P27 (name it: "Insufficient Variation in Tested Cases") → P41 (detect: present the odd-primes-only sum test and ask whether it sufficiently tests "all primes," checking for "yes") → P64 (conceptual shift: re-walk Example 2's even-prime counterexample $2+3=5$, re-anchoring on "test structurally atypical cases, not just more of the same kind").
- **B03 (targets MC-3)**: P27 (name it: "Surface Similarity Mistaken for Invariant Structure") → P41 (detect: present the square/rectangle/rhombus diagonal-bisection observation and ask whether it generalizes to all quadrilaterals, checking for "yes") → P64 (conceptual shift: re-walk Example 3's kite counterexample, re-anchoring on "identify the genuine structural cause — here, being a parallelogram — before generalizing to a broader class").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.pattern-recognition` (supplies the rule-finding process this concept extends into a broader claim), `math.found.abstraction` (supplies the essential-property identification this concept relies on to distinguish genuine invariant structure from surface similarity, as in Example 3).
- **Unlocks**: `math.found.proof` (the only way to actually ESTABLISH a generalization as a mathematical fact, per LO2), `math.found.axiom` (the starting principles any proof of a generalization must ultimately rest on).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a foundational/evaluate tag places this at a "3 TAs + gate" tier; the evaluate-level bloom (judging whether a generalization is valid, not just producing one) is reflected in every worked example ending with an explicit validity judgment rather than merely stating a formula.
- **Division of labor**: `math.found.pattern-recognition` owns finding a rule for a GIVEN specific sequence (including that multiple rules may fit finite data); `math.found.abstraction` owns identifying which observed features are essential vs. incidental. This concept, `math.found.generalization`, deliberately does not re-teach either of those processes; it owns the further, distinct act of asserting a claim extends beyond the examined cases, and the evaluative criteria (proof-not-confirmation, sufficient variation, genuine invariant structure) for judging whether that extension is justified.
- Example 1's $n^2+n+41$ (Euler's famous prime-generating polynomial, failing precisely at $n=40=41-1$) was deliberately chosen over a smaller/less dramatic counterexample because forty consecutive confirming cases is a genuinely striking amount of evidence to then see refuted — maximizing the conceptual impact of "confirmation is not proof."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: dramatic failed-generalization case presented before abstract evaluative criteria) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
