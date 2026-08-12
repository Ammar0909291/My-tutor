# Teaching Blueprint: Existence Proof (`math.found.existence-proof`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.existence-proof` |
| name | Existence Proof |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.proof`, `math.found.quantifiers` |
| unlocks | `math.found.uniqueness-proof` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A proof that at least one object satisfying a given property exists, either by explicitly constructing it or by showing non-existence of its negation leads to contradiction. |
| related | `math.found.uniqueness-proof` |

## Component 1 — Learning Objectives

- LO1: Write a **constructive** existence proof — explicitly exhibit an object satisfying the claimed property and verify it works.
- LO2: Write a **non-constructive** existence proof — show that assuming NO object satisfies the property leads to a contradiction, without ever exhibiting a specific one.
- LO3: State what a non-constructive existence proof does and does NOT tell you (it guarantees an object exists, but gives no method to find or identify it).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` and `math.found.quantifiers` ($\exists$ — an existence proof establishes exactly a claim of the form "$\exists x, P(x)$").

## Component 3 — Core Explanation

An **existence proof** establishes "$\exists x, P(x)$" — that at least one object with property $P$ exists — via one of two routes: **(1) Constructive**: explicitly produce a specific $x_0$ and verify $P(x_0)$ directly. **(2) Non-constructive**: show that assuming no such $x$ exists (i.e. $\neg\exists x, P(x)$, equivalently $\forall x,\neg P(x)$) leads to a contradiction, thereby forcing existence — WITHOUT ever identifying a specific witness.

Constructive proofs are generally preferred when available (they give a usable example), but some existence claims are only provable non-constructively, or a non-constructive route is significantly shorter.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructive)**: Prove "there exists an even prime number." Construct $x_0=2$: it is prime (only divisors 1 and 2) and even (divisible by 2). $\blacksquare$ — the witness $x_0=2$ is given explicitly.

**Example 2 (LO2, LO3 — the classical non-constructive case, breaking MC-1)**: Prove "there exist irrational numbers $a,b$ such that $a^b$ is rational." Consider $\sqrt2^{\sqrt2}$. Either it is rational — done, take $a=b=\sqrt2$ — or it is irrational, in which case take $a=\sqrt2^{\sqrt2}$ (irrational, by this case) and $b=\sqrt2$: then $a^b=(\sqrt2^{\sqrt2})^{\sqrt2}=\sqrt2^2=2$, rational. Either way, SOME choice of $a,b$ works — but the proof **never determines which of the two cases actually holds** (it is a genuinely hard separate question whether $\sqrt2^{\sqrt2}$ itself is rational). The proof establishes existence without identifying, with certainty, the specific witness pair.

**Example 3 (LO1 — a second constructive case)**: Prove "there exists a positive integer that is both a perfect square and a perfect cube." Construct $x_0=64$: $64=8^2$ (perfect square) and $64=4^3$ (perfect cube). $\blacksquare$

## Component 5 — Teaching Actions

### Teaching Action A01 — Constructive: Exhibit and Verify (Primitive P64: Conceptual Shift)

Work Examples 1 and 3, emphasizing the two-part structure every constructive proof needs: EXHIBIT a specific candidate, then VERIFY it genuinely satisfies the property — exhibiting alone (without verification) is incomplete.

- **MC-1 hook**: present Example 2 and ask the student to state which specific pair $(a,b)$ is the "real" answer (revealing MC-1: assuming every existence proof must — or does — pin down a specific witness, missing that the non-constructive route deliberately leaves this undetermined).

### Teaching Action A02 — Non-Constructive: Existence Without Identification (Primitive P06: Contrast Pair)

Contrast Example 1 (witness $x_0=2$ known with certainty) against Example 2 (witness pair genuinely UNKNOWN — one of the two cases holds, but which one remains a separate open question). State the rule: "a non-constructive proof gives a logical GUARANTEE that something exists, not a RECIPE for finding it — these are different kinds of knowledge, both valid, but not interchangeable."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Give a constructive proof: "there exists a positive integer divisible by both 4 and 6."
  2. Give a constructive proof: "there exists a real number strictly between $1/3$ and $2/5$."
  3. Given the non-constructive proof-by-cases template used in Example 2, explain in your own words why the proof is valid despite never determining whether $\sqrt2^{\sqrt2}$ is rational.
  4. State whether "there exists a prime number greater than 1{,}000{,}000" is more naturally proved constructively or non-constructively, and justify (constructively — Euclid-style arguments or explicit primality checks can exhibit one).
- **P76 (Transfer Probe, mode = independence)**: "Two students are debating a claim: 'there exist two irrational numbers whose product is rational.' Student A says, 'I can't accept this until you tell me the exact two numbers.' Student B replies, 'That's not how existence proofs always work.' (a) Give a valid response to Student A — either a constructive example, or an explanation of why a non-constructive argument (structured like Example 2) would also be acceptable. (b) Explain, in general terms, what kind of mathematical claim is Student B correctly defending, and what Student A is missing about the nature of existence."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXISTENCE-ASSUMED-TO-REQUIRE-IDENTIFICATION | Believing every valid existence proof must pin down a specific, identified witness, rejecting non-constructive proofs as incomplete | Foundational |
| MC-2 | EXHIBITED-CANDIDATE-NOT-VERIFIED | Naming a specific candidate object but skipping the verification step that it actually satisfies the required property | Moderate |
| MC-3 | CASE-SPLIT-EXISTENCE-PROOF-MISREAD-AS-INDECISIVE | Believing a proof-by-cases-style existence argument (like Example 2) is "incomplete" or "unfinished" because it doesn't resolve which case holds | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Existence Assumed to Require Identification") → P41 (detect: present Example 2 and ask if the proof is valid; check for objections that it "doesn't really prove anything" without a named witness) → P64 (conceptual shift: re-state the logical structure — "either case A or case B holds, and in EITHER case something with the property exists" — as a fully sufficient argument for $\exists$).
- **B02 (targets MC-2)**: P27 ("Exhibited Candidate Not Verified") → P41 (detect: present a student's own constructive attempt and check whether they stop after naming a candidate, without confirming the property holds) → P64 (re-walk Example 3, explicitly separating "exhibit $x_0=64$" from "verify $64=8^2$ and $64=4^3$" as two distinct required steps).
- **B03 (targets MC-3)**: P27 ("Case-Split Existence Misread as Indecisive") → P41 (detect: ask whether Example 2's proof is "finished" or still needs to determine which case is true) → P64 (conceptual shift: clarify that determining WHICH case holds is a separate (and here, genuinely open/hard) question from whether the EXISTENCE claim itself is proved — the existence claim is fully settled either way).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof`, `math.found.quantifiers`.
- **Unlocks**: `math.found.uniqueness-proof` (proving something exists is the first half of proving it exists and is unique).
- **Related**: `math.found.uniqueness-proof`.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that constructive proofs (LO1) reuse direct-proof machinery closely, with the genuinely novel content concentrated in LO2/LO3's non-constructive route.
- MC-1 was ranked most severe because it represents a fundamental misunderstanding of what mathematical existence claims assert — insisting on identification conflates a LOGICAL guarantee with a CONSTRUCTIVE recipe, two legitimately different (and both rigorous) forms of proof.
- The $\sqrt2^{\sqrt2}$ example was deliberately retained as the canonical non-constructive case (rather than a simpler pigeonhole-style argument) specifically because its unresolved case-ambiguity is real and well-known, making Teaching Action A02's "existence without identification" point unmistakably concrete rather than a contrived teaching device.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.proof`, `math.found.quantifiers`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.uniqueness-proof`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
