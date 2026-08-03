# Teaching Blueprint: Conjecture (`math.found.conjecture`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.conjecture` |
| name | Conjecture |
| domain | Foundations |
| difficulty | developing |
| bloom | evaluate |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 2 |
| requires | `math.found.mathematical-thinking`, `math.found.proof` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A mathematical statement believed to be true on the basis of evidence or intuition but not yet proven or disproven. |
| related | `math.found.theorem`, `math.found.proof` |

## Component 1 — Learning Objectives

- LO1: Define "conjecture" as a statement believed true on the basis of evidence or intuition but not yet proven or disproven, and correctly classify a given statement as conjecture, theorem, or disproved claim.
- LO2: Evaluate the STRENGTH of the evidence behind a conjecture (pattern from small cases, computational verification, partial proofs of special cases) without conflating that strength with proof.
- LO3: State what resolving a conjecture means — either finding a valid proof (promoting it to theorem) or finding a counterexample (disproving it) — and recognize a conjecture can also remain permanently open.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.mathematical-thinking` (the general practice of forming and testing mathematical ideas) and `math.found.proof` (the standard a conjecture has NOT yet met, distinguishing it from a theorem).

## Component 3 — Core Explanation

A **conjecture** is a statement proposed as likely true, based on observed patterns, computational evidence, or mathematical intuition, but for which no valid proof (nor disproof) yet exists. A conjecture has exactly three possible eventual fates: **(1) proved** — becomes a theorem; **(2) disproved** — a single counterexample suffices to refute it entirely; **(3) remains open** — neither proved nor disproved, possibly for centuries (or, in principle, forever, if it turns out to be formally undecidable within a given axiom system).

Conjectures play a central role in mathematical practice: they organize research, and the process of trying (and failing) to prove them often produces valuable partial results and new techniques even before resolution.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — evidence without proof)**: The Twin Prime Conjecture ("there are infinitely many pairs of primes differing by 2, like (11,13) or (17,19)") is supported by extensive computational search finding twin primes far beyond any range yet fully verified, and by heuristic density arguments — strong evidence, but genuinely no proof exists as of this writing; it remains a conjecture regardless of how compelling the evidence looks.

**Example 2 (LO3 — disproof by a single counterexample, breaking MC-1)**: Euler's conjecture that "at least $n$ $n$th powers are required to sum to another $n$th power" (a generalization of Fermat's Last Theorem) stood as a plausible, believed statement for nearly 200 years until 1966, when a SINGLE counterexample was found: $27^5+84^5+110^5+133^5=144^5$, just four 5th powers summing to a 5th power. One valid counterexample instantly and permanently disproved the entire general conjecture — no amount of prior supporting evidence protects a conjecture once a genuine counterexample is found.

**Example 3 (LO2 — partial evidence via special cases, not full proof)**: The (now-proved) Four Color Theorem was, before its 1976 proof, supported by verification that many SPECIFIC map configurations required only four colors — genuine evidence, but categorically different from the eventual proof, which had to rule out every possible configuration (using, controversially at the time, extensive computer-assisted case-checking) rather than rely on the accumulated pattern from checked cases alone.

## Component 5 — Teaching Actions

### Teaching Action A01 — Three Possible Fates: Proved, Disproved, Open (Primitive P11: Representation Shift)

Present the three-fate classification as a simple diagram, then walk Example 1 (open, strong evidence) and Example 2's HISTORICAL arc (believed for 200 years, then disproved) to show a conjecture's fate is not fixed by how long it has stood or how much evidence supports it.

- **MC-1 hook**: ask the student whether Euler's 200-year-old, evidence-supported conjecture "should have been treated as basically true" before 1966 (revealing MC-1: believing sustained evidence and long-standing acceptance make a conjecture progressively "more proved," rather than recognizing it remains fully open to a single decisive counterexample at any time).

### Teaching Action A02 — One Counterexample Disproves; No Amount of Confirming Evidence Proves (Primitive P06: Contrast Pair)

Contrast the asymmetry directly: confirming Example 1's Twin Prime Conjecture for a trillion more cases would NOT prove it, while a single counterexample (as in Example 2) instantly and completely disproves a universal conjecture. State the rule: "universal claims ('for all $n$...') can be disproved by one counterexample but never proved by any finite amount of checking — this asymmetry is fundamental, not a matter of degree."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Classify each of three given statements (one proved theorem, one disproved former-conjecture, one currently-open conjecture) correctly, citing what evidence exists for each.
  2. Explain why finding a single counterexample to "every odd prime greater than 2 can be written as a sum of three primes" (a specific instance, hypothetically) would instantly refute the general claim, regardless of how many prior cases were verified.
  3. Describe the difference between the KIND of confidence a mathematician has in a well-evidenced open conjecture versus a proved theorem, even when both are subjectively "believed."
  4. Given a pattern observed for $n=1$ through $n=20$, state what would be needed to promote the pattern from "observed regularity" to "proved theorem."
- **P76 (Transfer Probe, mode = independence)**: "A researcher has verified a certain conjecture computationally for all values up to $10^{18}$ and reports this in a paper as strong supporting evidence. (a) Explain precisely what this verification does and does NOT establish about the conjecture's truth for ALL values, using the counterexample-asymmetry rule from this lesson. (b) Describe, in general terms, what kind of additional argument would be needed to either fully prove or fully disprove the conjecture, and explain why finding value $10^{18}+1$ to also satisfy it would not change the conjecture's formal status."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LONGSTANDING-EVIDENCE-TREATED-AS-INCREASING-PROOF | Believing a conjecture becomes progressively "more proved" or safer to assume the longer it stands unrefuted with supporting evidence | Foundational |
| MC-2 | COUNTEREXAMPLE-STRENGTH-CONFUSED-WITH-CONFIRMING-EVIDENCE | Failing to recognize the fundamental asymmetry that one counterexample fully disproves a universal claim, while no finite amount of confirming evidence fully proves one | Foundational |
| MC-3 | CONJECTURE-ASSUMED-ALWAYS-EVENTUALLY-RESOLVABLE | Assuming every conjecture must eventually be either proved or disproved, missing that some statements can remain permanently open or even be formally undecidable | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Longstanding Evidence Treated as Increasing Proof") → P41 (detect: ask whether Euler's conjecture was "safer to assume" in year 199 than in year 1) → P64 (conceptual shift: re-walk Example 2's disproof, showing the 200-year track record provided zero protection against the single counterexample found in 1966).
- **B02 (targets MC-2)**: P27 ("Counterexample/Evidence Asymmetry Missed") → P41 (detect: ask whether verifying a claim for a trillion cases is "close to" proving it) → P64 (conceptual shift: contrast the confirming-evidence case (Example 1) against the counterexample case (Example 2) side by side, naming the asymmetry explicitly).
- **B03 (targets MC-3)**: P27 ("Conjecture Assumed Always Resolvable") → P41 (detect: ask whether every open conjecture will eventually be settled) → P64 (conceptual shift: introduce, at a conceptual level, that some statements can remain permanently open or be shown formally undecidable within a given axiom system — no exhaustive derivation required at this level, just the honest acknowledgment that "always eventually resolved" is not guaranteed).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.mathematical-thinking`, `math.found.proof`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.theorem` (a conjecture's proved fate), `math.found.proof` (the standard that resolves a conjecture one way or the other).

## Component 8 — Teaching Notes

- estimated_hours = 2 and bloom = evaluate reflect that this concept is primarily about JUDGING evidence and status correctly, not constructing new proofs — the construction skill lives in the surrounding proof-technique concepts this one contrasts against.
- MC-1 and MC-2 are both ranked foundational because they represent the same core error from two angles: treating mathematical certainty as a matter of accumulating degree (more evidence = more proved) rather than a binary threshold crossed only by a valid proof.
- Euler's sum-of-powers conjecture (Example 2) was deliberately chosen over a purely hypothetical illustration because its 200-year historical arc and definite, checkable counterexample make the disproof concrete and memorable, directly reinforcing Teaching Action A02's asymmetry point with a real, dramatic case.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.mathematical-thinking`, `math.found.proof`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
