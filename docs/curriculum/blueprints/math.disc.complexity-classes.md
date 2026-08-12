# Teaching Blueprint: Complexity Classes (`math.disc.complexity-classes`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.complexity-classes` |
| name | Complexity Classes |
| domain | Discrete Mathematics |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.disc.algorithm-complexity` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | P: solvable in polynomial time. NP: verifiable in polynomial time. NP-complete: in NP and every NP problem reduces to it. P=NP? is the most famous open problem in computer science. Examples: SAT, 3-coloring, TSP.

 |

## Component 1 — Learning Objectives

- LO1: Define the class $P$ (problems SOLVABLE in polynomial time) and the class $NP$ (problems VERIFIABLE in polynomial time given a proposed solution/certificate), correctly distinguishing "solving" from "verifying."
- LO2: Explain what it means for a problem to be **NP-complete** (in $NP$, and every problem in $NP$ reduces to it), and state why NP-complete problems are considered the "hardest" problems in $NP$.
- LO3: State the $P$ vs. $NP$ open problem precisely, and explain WHY it remains unresolved (no known polynomial-time algorithm for NP-complete problems exists, but no proof that none can exist has been found either).

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.algorithm-complexity` (Big-O analysis and worst-case complexity) — this concept classifies PROBLEMS (not individual algorithms) by the complexity of their best possible solving/verifying algorithms.

## Component 3 — Core Explanation

**$P$** is the class of DECISION problems solvable by SOME algorithm running in polynomial time (i.e. $O(n^k)$ for some constant $k$, as a function of input size $n$). **$NP$** is the class of decision problems for which a proposed YES-answer's CERTIFICATE (a candidate solution) can be VERIFIED in polynomial time — critically, this is about the EASE of CHECKING a given answer, not the ease of FINDING one from scratch. Every problem in $P$ is also in $NP$ (if you can solve it quickly, you can certainly verify a proposed solution quickly too, by just re-solving), but whether $P=NP$ (every efficiently-verifiable problem is also efficiently SOLVABLE) is the single most famous open problem in computer science.

A problem is **NP-complete** if it is in $NP$ AND every other problem in $NP$ can be REDUCED to it in polynomial time — meaning an efficient algorithm for ANY ONE NP-complete problem would immediately give an efficient algorithm for EVERY problem in $NP$ (proving $P=NP$). Classic NP-complete examples include Boolean satisfiability (SAT), graph 3-coloring, and the traveling salesman decision problem (TSP).

## Component 4 — Worked Examples

**Example 1 (LO1 — solving vs. verifying, breaking MC-1)**: For the SAT problem (does a given Boolean formula have a satisfying assignment of its variables?), FINDING a satisfying assignment from scratch is believed to require exponential time in the worst case (no known polynomial algorithm exists). But GIVEN a proposed assignment (e.g. "$x_1=$true, $x_2=$false, ..."), CHECKING whether it satisfies the formula is fast — just substitute the values and evaluate, in polynomial (in fact, linear) time. This is exactly why SAT is in $NP$: verification is easy, even though solving (from scratch) is believed hard. A common error conflates "in $NP$" with "hard to solve," when $NP$ is actually defined by the EASE of verification, not the difficulty of solving.

**Example 2 (LO2 — NP-completeness as universal reducibility)**: If SAT (a known NP-complete problem) had a polynomial-time algorithm, then EVERY problem in $NP$ — including graph 3-coloring, TSP, and every other NP problem — would ALSO have a polynomial-time algorithm, because each can be REDUCED to SAT in polynomial time (transform any instance of that problem into an equivalent SAT instance, solve the SAT instance, translate the answer back — all in polynomial time). This is why NP-complete problems are considered "hardest in $NP$": solving any single one efficiently would efficiently solve them ALL.

**Example 3 (LO3 — the open status of P vs. NP, breaking MC-2)**: Despite decades of research, no polynomial-time algorithm for SAT (or any NP-complete problem) has EVER been found, strongly suggesting $P\ne NP$ — but this widespread BELIEF is not the same as a PROOF; no one has proven that NO such polynomial algorithm could possibly exist. A common error treats "$P\ne NP$" as an established mathematical fact (since it's so widely believed and heavily suspected) rather than recognizing it remains a genuinely OPEN problem — the correct statement is "most researchers believe $P\ne NP$, but this has neither been proven nor disproven."

## Component 5 — Teaching Actions

### Teaching Action A01 — Verification Is Easy Even When Solving Is Hard (Primitive P64: Conceptual Shift)

Work Example 1 in full, contrasting the difficulty of FINDING a satisfying SAT assignment against the ease of CHECKING a given one, emphasizing this asymmetry is the entire definitional basis of $NP$.

- **MC-1 hook**: ask whether "a problem is in $NP$" means "the problem is hard" and check the reasoning given (revealing MC-1: conflating NP-membership with inherent difficulty, rather than recognizing it specifically concerns verification ease).

### Teaching Action A02 — NP-Completeness Means "Reduces From Everything in NP" (Primitive P11: Representation Shift)

Work Example 2's reduction logic explicitly, using a diagram showing SAT as a "universal hub" that every other NP problem can be transformed into, grounding why solving the hub efficiently would cascade to solving everything.

### Teaching Action A03 — Widely Believed ≠ Proven (Primitive P06: Contrast Pair)

Work Example 3, explicitly distinguishing the STRONG, near-universal belief that $P\ne NP$ from the fact that this remains formally UNPROVEN, directly echoing (and applying) the theorem-vs-conjecture distinction from `math.found.conjecture`. State the rule: "even overwhelming expert consensus is not a substitute for proof — $P$ vs. $NP$ is a genuinely open mathematical question, not a settled fact dressed up as an unsolved curiosity."

- **MC-2 hook**: this directly targets MC-2 (treating $P\ne NP$ as an established, proven fact).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Explain, in your own words, the difference between "solving" and "verifying" a problem, using the SAT example.
  2. State whether every problem in $P$ is also in $NP$, and justify your answer.
  3. Explain what it would mean, practically, if someone discovered a polynomial-time algorithm for the graph 3-coloring problem (a known NP-complete problem).
  4. State the current formal status of the $P$ vs. $NP$ question (proven true, proven false, or open), and briefly justify.
- **P76 (Transfer Probe, mode = independence)**: "A cybersecurity system relies on the assumption that certain cryptographic problems (related to factoring large numbers) are computationally HARD to solve but easy to VERIFY, similar in spirit to NP-complete problems. (a) Explain, using this lesson's solving-vs-verifying distinction, why a cryptographic system could remain SECURE even if verifying a proposed solution (e.g. checking a digital signature) is fast, as long as FINDING that solution from scratch remains hard. (b) A junior engineer claims 'since experts believe $P\ne NP$, our system's security is mathematically guaranteed forever' — explain, using this lesson's belief-vs-proof distinction, why this claim overstates what is actually known, and what it would mean for such cryptographic assumptions if $P=NP$ were ever proven true."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NP-MEMBERSHIP-CONFLATED-WITH-INHERENT-DIFFICULTY | Believing "a problem is in $NP$" means the problem is necessarily hard to solve, rather than recognizing $NP$ is defined by verification ease | Foundational |
| MC-2 | P-NOT-EQUAL-NP-TREATED-AS-PROVEN-FACT | Treating the widely-believed but formally unproven statement "$P\ne NP$" as an established mathematical fact | Foundational |
| MC-3 | NP-COMPLETE-CONFUSED-WITH-NP-HARD-OR-WITH-ALL-OF-NP | Using "NP-complete" loosely to mean any hard problem in $NP$, rather than the precise definition requiring universal polynomial-time reducibility from every NP problem | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("NP Membership Conflated with Inherent Difficulty") → P41 (detect: ask what "in $NP$" means; check for an answer centered on difficulty rather than verification) → P64 (conceptual shift: re-walk Example 1's solving-vs-verifying contrast, emphasizing $NP$'s definition rests entirely on the verification side).
- **B02 (targets MC-2)**: P27 ("P≠NP Treated as Proven Fact") → P41 (detect: ask for the current formal status of $P$ vs. $NP$; check for "proven false"/"proven $P\ne NP$" as an answer) → P64 (conceptual shift: re-state the precise status — "believed but unproven" — connecting explicitly to `math.found.conjecture`'s theorem-vs-conjecture distinction).
- **B03 (targets MC-3)**: P27 ("NP-Complete Confused with NP-Hard or All of NP") → P41 (detect: ask the student to define "NP-complete" precisely; check for a vague "a hard NP problem" answer missing the universal-reduction requirement) → P64 (conceptual shift: re-walk Example 2's reduction-hub explanation, re-stating the precise two-part definition: in $NP$, AND every NP problem reduces to it).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.algorithm-complexity`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.conjecture` (the theorem-vs-conjecture/belief-vs-proof distinction this concept's Teaching Action A03 directly reuses and applies to $P$ vs. $NP$).

## Component 8 — Teaching Notes

- estimated_hours = 7 and difficulty = expert (the highest workload in this entire batch) reflect that this concept sits at the frontier of theoretical computer science, requiring genuine conceptual sophistication (LO1's solving/verifying distinction, LO2's reduction logic, LO3's epistemic humility about open problems) rather than computational fluency alone.
- MC-1 was ranked most severe because it represents a fundamental misreading of $NP$'s actual definition — a surprisingly common error given that "NP" is colloquially used (incorrectly) as a synonym for "very hard" in casual discourse, actively working against correct understanding.
- This concept deliberately closes the loop back to `math.found.conjecture`'s evidence-vs-proof theme (introduced early in the Foundations domain), demonstrating that the same epistemic discipline — distinguishing strong belief from established proof — applies at the very frontier of active mathematical/computer-science research, not just in elementary contexts.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.algorithm-complexity`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
