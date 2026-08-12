# Teaching Blueprint: Type I and Type II Errors (`math.stats.type-errors`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.type-errors` |
| name | Type I and Type II Errors |
| domain | Statistics |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.hypothesis-testing` |
| unlocks | `math.stats.power` |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — 2×2 decision table before formal definitions |
| description (KG) | Type I error: reject H₀ when true (false positive); rate α (significance level). Type II error: fail to reject H₀ when false (false negative); rate β. Tradeoff: decreasing α increases β for fixed n.

 |

## Component 1 — Learning Objectives

- LO1: Define TYPE I ERROR — rejecting $H_0$ when it is ACTUALLY TRUE (a FALSE POSITIVE), occurring at rate $\alpha$ (the significance level) — and TYPE II ERROR — FAILING to reject $H_0$ when it is ACTUALLY FALSE (a FALSE NEGATIVE), occurring at rate $\beta$.
- LO2: Correctly match each error type to its corresponding TRUTH-vs-DECISION combination in the 2×2 outcome table — recognizing Type I error occurs specifically when $H_0$ is TRUE but the decision REJECTS it, while Type II error occurs specifically when $H_0$ is FALSE but the decision FAILS TO REJECT it (these are NOT symmetric or interchangeable labels).
- LO3: Recognize the fundamental TRADEOFF — for a FIXED sample size $n$, DECREASING $\alpha$ (making it harder to reject $H_0$, reducing false positives) INCREASES $\beta$ (making Type II errors, false negatives, MORE likely) — you cannot reduce BOTH error rates simultaneously without increasing the sample size.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` — Type I/II errors describe the two ways a hypothesis test's decision can go wrong.

## Component 3 — Core Explanation

In hypothesis testing, two distinct kinds of ERRORS can occur. A **Type I error** occurs when $H_0$ is rejected but it was ACTUALLY TRUE — a FALSE POSITIVE, occurring at rate $\alpha$ (the SIGNIFICANCE LEVEL, chosen in advance, e.g. 0.05). A **Type II error** occurs when $H_0$ is FAILED to be rejected (i.e., NOT rejected) but it was ACTUALLY FALSE — a FALSE NEGATIVE, occurring at rate $\beta$.

These correspond to specific cells in a 2×2 outcome table: (TRUE $H_0$, REJECT) $=$ Type I error; (FALSE $H_0$, FAIL TO REJECT) $=$ Type II error; the other two combinations (TRUE $H_0$/fail to reject; FALSE $H_0$/reject) are CORRECT decisions. Getting the specific truth-vs-decision pairing right for each error type — not just remembering "there are two kinds of errors" — is essential.

A fundamental TRADEOFF exists: for a FIXED sample size, DECREASING $\alpha$ (setting a stricter significance threshold, making $H_0$ harder to reject, reducing false positives) INCREASES $\beta$ (making false negatives more likely, since it's now also harder to correctly reject a truly false $H_0$). The ONLY way to reduce BOTH error rates SIMULTANEOUSLY is to increase the sample size $n$ — with a fixed $n$, it's a genuine zero-sum tradeoff between the two error types.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — matching error type to truth/decision combination, breaking MC-1)**: A medical test rejects the null hypothesis "patient does NOT have the disease" (concluding the patient DOES have it), but the patient actually does NOT have the disease. Identify the error type. This is a Type I error — $H_0$ ("no disease") was TRUE, but the test's decision REJECTED it (a false positive diagnosis). A common error swaps the two error types (e.g. calling this scenario "Type II" instead of "Type I") — the SPECIFIC combination (true $H_0$ + reject) defines Type I, while (false $H_0$ + fail to reject) defines Type II; these must be matched carefully to the exact truth/decision combination, not guessed or memorized as an arbitrary pair of labels.

**Example 2 (LO1, LO2 — the opposite scenario)**: The same medical test FAILS to reject $H_0$ ("no disease," concluding the patient does not have it), but the patient ACTUALLY DOES have the disease. Identify the error type. This is a Type II error — $H_0$ was FALSE (the patient really does have the disease), but the test FAILED to reject it (a false negative, a missed diagnosis).

**Example 3 (LO3 — the α/β tradeoff, breaking MC-2)**: A researcher wants to reduce Type I errors by setting $\alpha=0.01$ instead of the usual $0.05$ (a stricter threshold), keeping the sample size $n$ FIXED. Explain the consequence for Type II errors. Since $\alpha$ has DECREASED (stricter rejection criterion), $\beta$ INCREASES (it becomes HARDER to reject $H_0$ even when it's genuinely false, making Type II errors MORE likely) — for FIXED $n$, you cannot simultaneously make BOTH error types rarer. A common error assumes reducing $\alpha$ is an unambiguous improvement with NO cost, without recognizing the corresponding increase in $\beta$ — lowering $\alpha$ reduces false POSITIVES specifically at the cost of MORE false NEGATIVES, a genuine tradeoff, not a free improvement, UNLESS the sample size is also increased.

## Component 5 — Teaching Actions

### Teaching Action A01 — Matching Error Type to the Exact Truth/Decision Combination (Primitive P64: Conceptual Shift)

Work Examples 1 and 2 side by side, explicitly identifying the truth status and decision for each, then matching to the correct error type.

- **MC-1 hook**: this directly targets MC-1 (swapping or confusing which truth/decision combination defines each error type).

### Teaching Action A02 — Decreasing α Increases β for Fixed n (Primitive P06: Contrast Pair)

Work Example 3, explicitly deriving the consequence of a stricter $\alpha$ threshold on $\beta$.

- **MC-2 hook**: this directly targets MC-2 (assuming reducing $\alpha$ is a cost-free improvement without recognizing the corresponding increase in $\beta$).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. A quality-control test rejects $H_0$ ("product meets spec") when the product actually DOES meet spec. Identify the error type.
  2. A quality-control test fails to reject $H_0$ ("product meets spec") when the product actually does NOT meet spec. Identify the error type.
  3. Explain, in one sentence, why decreasing α for a fixed sample size increases β.
  4. Explain what action (besides adjusting α) could reduce BOTH Type I and Type II error rates simultaneously.
- **P76 (Transfer Probe, mode = independence)**: "A spam email filter tests each incoming email against the null hypothesis $H_0$ = 'this email is legitimate (not spam).' (a) Describe what a Type I error would mean in this context (a legitimate email getting flagged as spam), and what a Type II error would mean (an actual spam email getting through to the inbox). (b) If the filter's designer makes the spam-detection threshold MUCH stricter (reducing the chance of flagging legitimate emails as spam), explain what happens to the rate of actual spam getting through, connecting to the α/β tradeoff."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TYPE-I-AND-TYPE-II-ERROR-TRUTH-DECISION-COMBINATIONS-SWAPPED-OR-CONFUSED | Confusing or swapping which specific truth/decision combination (true H0 + reject, vs. false H0 + fail to reject) defines Type I versus Type II error | Foundational |
| MC-2 | REDUCING-ALPHA-ASSUMED-TO-BE-A-COST-FREE-IMPROVEMENT-WITHOUT-INCREASING-BETA | Assuming that decreasing the significance level α is an unambiguous improvement, without recognizing the corresponding increase in β for a fixed sample size | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Type I and Type II Error Truth-Decision Combinations Swapped or Confused") → P41 (detect: present Examples 1/2 and check whether the error types are correctly matched to their truth/decision combinations) → P64 (conceptual shift: re-build the 2×2 outcome table explicitly, labeling each cell before naming the error types).
- **B02 (targets MC-2)**: P27 ("Reducing Alpha Assumed to Be a Cost-Free Improvement Without Increasing Beta") → P41 (detect: present Example 3 and check whether the β increase is missed) → P64 (conceptual shift: re-derive the tradeoff explicitly, confirming that for fixed $n$, stricter rejection criteria make false negatives more likely).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing`.
- **Unlocks**: `math.stats.power`.
- **Related**: `math.stats.p-value`.
- **Parent**: `math.stats.hypothesis-testing`.

## Component 8 — Teaching Notes

- bloom = analyze reflects that this concept requires genuine comparative reasoning about tradeoffs, not just definitional recall.
- Both misconceptions were ranked Foundational because each reflects a fundamental misunderstanding — either of the basic error-type definitions themselves, or of the core tradeoff governing hypothesis testing design.
- The spam-filter transfer probe was deliberately chosen because it's an intuitive, everyday scenario where both error types have immediately understandable real consequences (legitimate email lost vs. spam getting through), motivating why the tradeoff genuinely matters in practical system design.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.hypothesis-testing`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.stats.power`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: 2×2 decision table before formal definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1/LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
