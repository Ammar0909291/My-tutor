# Teaching Blueprint: Riemann Hypothesis (`math.nt.riemann-hypothesis`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.riemann-hypothesis` |
| name | Riemann Hypothesis |
| domain | Number Theory |
| difficulty | research |
| bloom | evaluate |
| mastery_threshold | 0.5 → MAMR = ⌈0.5×5⌉ = 3/5 |
| estimated_hours | 100 |
| requires | `math.nt.prime-number-theorem`, `math.cx.riemann-zeta` |
| unlocks | none |
| cross_links | `math.cx.riemann-zeta` (**authored**) — verified via `ls`; see Component 7 for why P76_mode is nonetheless independence |
| CPA_entry_stage | A (Abstract) — research-tier learner already has the zeta function, its zeros, and the proven-vs-conjectured distinction from `math.cx.riemann-zeta`; this concept goes directly to the conjecture's precise status and significance |
| description (KG) | The conjecture that all non-trivial zeros of the Riemann zeta function have real part 1/2; equivalent to the best possible error term in the Prime Number Theorem. Unsolved (Clay Millennium Problem). |

## Component 1 — Learning Objectives (all three orientation level — see Component 8 for why)

- LO1 (orientation level): State the Riemann Hypothesis precisely — every nontrivial zero of $\zeta(s)$ has real part exactly $\tfrac12$ — and correctly locate it on the spectrum between the PROVEN, weaker "zero-free region" fact (`math.nt.prime-number-theorem`'s own actual proof mechanism: $\zeta(s)\ne0$ on the line $\mathrm{Re}(s)=1$) and the CONJECTURED, much stronger exact-location claim RH makes.
- LO2 (orientation level): Recognize why RH is equivalent to "the best possible error term in the Prime Number Theorem" — the closer all zeros are confirmed to sit to the critical line $\mathrm{Re}(s)=\tfrac12$, the tighter the provable bound on $|\pi(x)-\mathrm{Li}(x)|$ becomes, with RH representing the theoretically tightest such bound — directly extending `math.nt.prime-number-theorem`'s own zero-location-controls-correction-terms mechanism.
- LO3 (orientation level): Recognize RH's status as one of the seven Clay Millennium Prize Problems (unsolved, \$1 million prize), and correctly distinguish overwhelming PARTIAL evidence (numerical verification of trillions of zeros; the PROVEN fact that at least 40% of nontrivial zeros lie on the critical line) from an actual general PROOF — reinforcing intellectual honesty about the boundary between evidence and proof in mathematics.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.riemann-zeta` (the zeta function, its analytic continuation, the Euler product, the functional equation, and the honest statement that RH is unproven despite numerical support) and `math.nt.prime-number-theorem` (the actual 1896 proof of the PNT via a contour integral of $\zeta'(s)/\zeta(s)$, and the crucial fact that this proof uses only the WEAKER, already-proven zero-free region on $\mathrm{Re}(s)=1$ — not RH).

## Component 3 — Core Explanation

**Where RH sits on the proven-to-conjectured spectrum**: `math.nt.prime-number-theorem` already established that the Prime Number Theorem's actual 1896 proof requires only a zero-free region — the (already proven) fact that $\zeta(s)\ne0$ on the single line $\mathrm{Re}(s)=1$. The Riemann Hypothesis makes a VASTLY stronger claim: not just that zeros avoid one line, but that EVERY nontrivial zero sits EXACTLY on the line $\mathrm{Re}(s)=\tfrac12$. The zero-free region is a settled theorem; RH is a conjecture that remains open.

**Why RH is "the best possible error term"**: `math.nt.prime-number-theorem`'s proof mechanism showed that the correction terms in the PNT's contour-integral derivation are controlled by how close $\zeta$'s zeros sit to $\mathrm{Re}(s)=1$. The same mechanism, refined, shows that the PRECISE size of the error $|\pi(x)-\mathrm{Li}(x)|$ (where $\mathrm{Li}(x)$ is a more refined estimate than $x/\ln x$) is governed by how close ALL zeros sit to the critical line $\mathrm{Re}(s)=\tfrac12$. If RH is true, this yields the bound $|\pi(x)-\mathrm{Li}(x)|=O(\sqrt x\log x)$ — the theoretically tightest possible bound of this form. Without RH, only weaker (still deep, but less tight) bounds are currently provable.

**Evidence is not proof**: RH is one of the seven Clay Millennium Prize Problems (a \$1,000,000 prize for a valid proof or disproof; to date only the Poincaré Conjecture, among the seven, has been resolved). The first ten trillion nontrivial zeros have been numerically verified to lie exactly on the critical line, and it has been PROVEN (a genuine partial theorem) that at least 40% of all nontrivial zeros lie on the critical line. None of this — however overwhelming — constitutes a general proof that ALL nontrivial zeros do; mathematics requires an argument covering every case, not an arbitrarily large but still finite/partial fraction of them.

## Component 4 — Worked Examples

**Example 1 (LO1 — the proven-weaker vs. conjectured-stronger spectrum, breaking MC-1)**: place three claims on a spectrum of strength: (a) "$\zeta(s)$ has no zeros with $\mathrm{Re}(s)>1$" — trivially true (the Euler product shows $\zeta(s)\ne0$ there); (b) "$\zeta(s)\ne0$ on the line $\mathrm{Re}(s)=1$ specifically" — the zero-free region, PROVEN, and exactly what `math.nt.prime-number-theorem`'s 1896 proof actually uses; (c) "every nontrivial zero has $\mathrm{Re}(s)=\tfrac12$ EXACTLY" — the Riemann Hypothesis, CONJECTURED, a vastly stronger and still-unresolved claim. Claims (a) and (b) are settled mathematics; claim (c) is not — conflating (b) and (c) is exactly the gap between "what the Prime Number Theorem's actual proof needs" and "what the Riemann Hypothesis claims."

**Example 2 (LO2 — RH and the error term, breaking MC-2)**: the Prime Number Theorem is ALREADY a fully proven theorem (via the weaker zero-free region alone, established in 1896, long before RH's status was resolved either way). RH would NOT be needed to establish the PNT's basic truth; if RH were proven true tomorrow, the CONSEQUENCE would be a sharper, provably-tightest error bound $|\pi(x)-\mathrm{Li}(x)|=O(\sqrt x\log x)$ replacing today's weaker (but still rigorously proven) bounds — a refinement of PRECISION, not a rescue of the theorem's truth. If RH were instead disproven tomorrow (a single zero found off the critical line), the Prime Number Theorem itself would remain exactly as true and exactly as proven as it is today.

**Example 3 (LO3, orientation level — evidence vs. proof, breaking MC-3)**: the numerical verification of the first ten trillion zeros, combined with the PROVEN fact that at least 40% of all nontrivial zeros lie on the critical line, represents an enormous, genuinely earned body of partial evidence — yet neither, nor both together, constitutes a proof covering the remaining (infinitely many) unverified or unproven cases. Historically, other mathematical conjectures with strong numerical support for very large ranges have later been found false at astronomically larger values (a general cautionary pattern in number theory) — underscoring why "checked extensively" and "proven" remain fundamentally different epistemic categories.

## Component 5 — Teaching Actions

### Teaching Action A01 — Locating RH on the Proven-to-Conjectured Spectrum (Primitive P11: Representation Shift)

State: "there's a whole spectrum of claims about where $\zeta(s)$'s zeros can and can't be — some settled long ago, one still completely open. RH is the strongest, still-unresolved end of that spectrum, not a restatement of what's already proven." Work Example 1's three-claim spectrum, being explicit about which claims are settled and which is RH itself.

- **MC-1 hook**: ask "is the 'zero-free region' used in the actual 1896 proof of the Prime Number Theorem the same claim as the Riemann Hypothesis?" — a "yes" answer reveals MC-1 (conflating the proven weaker zero-free region with the still-open, much stronger RH).

### Teaching Action A02 — The Prime Number Theorem's Truth Does Not Depend on RH (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the PNT was fully proven in 1896, decades before RH's status was resolved either way, using only the already-established zero-free region. State: "RH would sharpen the error bound if proven — it would not rescue or threaten the Prime Number Theorem's basic truth, which is already fully settled."

- **MC-2 hook**: ask "if the Riemann Hypothesis were disproven tomorrow, would the Prime Number Theorem itself become false or unproven?" — a "yes" answer reveals MC-2 (believing the PNT's truth is contingent on RH, rather than recognizing PNT as independently and already fully proven).

### Teaching Action A03 — Overwhelming Evidence Is Not the Same as Proof (Primitive P06: Contrast Pair)

Contrast the PROVEN "at least 40% of zeros lie on the critical line" theorem against the CONJECTURED "100% of zeros lie on the critical line" (RH itself) — a genuine, quantified proven partial result sitting right next to the still-unresolved full claim. State: "40% proven plus trillions of numerical checks is an enormous body of evidence — but mathematics requires a general argument covering every case, and no finite amount of checking, however large, supplies that."

- **MC-3 hook**: ask "given that trillions of zeros have been checked and at least 40% are proven to lie on the critical line, is the Riemann Hypothesis essentially proven at this point?" — a "yes" answer reveals MC-3 (mistaking overwhelming partial evidence for a general proof).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Riemann Hypothesis precisely, and identify which part of the statement (the "$\tfrac12$") makes it a conjecture rather than an already-established fact.
  2. Explain the difference between the "zero-free region" fact (used in the actual 1896 proof of the Prime Number Theorem) and the Riemann Hypothesis itself, in terms of which is proven and which is still open.
  3. A classmate argues the Prime Number Theorem is "not really proven" because the Riemann Hypothesis (which is related to primes) is still unsolved. Explain what is wrong with this reasoning, using this lesson's proven-vs-conjectured distinction.
  4. Explain why numerically verifying ten trillion zeros all lying on the critical line does not constitute a proof of the Riemann Hypothesis.
- **P76 (Transfer Probe, mode = independence)**: "A science journalist writes: 'Mathematicians have now proven that at least 40% of the zeros of the zeta function lie on the critical line, so the Riemann Hypothesis is nearly proven — only 60% left to go, and computers have already checked trillions more.' (a) Identify what is factually accurate in this statement and what is a misleading framing of mathematical proof. (b) Explain why '40% proven plus billions of numerical checks' does not add up to 'nearly proven' in the sense mathematicians require. (c) If the Riemann Hypothesis were proven false tomorrow (a single nontrivial zero found off the critical line), would this threaten the Prime Number Theorem itself? Explain your answer using this lesson's distinction between PNT's proof (already complete) and RH's role (a further refinement of the error term)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-FREE-REGION-CONFLATED-WITH-RH | Conflating the proven, weaker "zero-free region on $\mathrm{Re}(s)=1$" fact (the actual mechanism of the 1896 PNT proof) with the still-open, much stronger Riemann Hypothesis (all nontrivial zeros exactly on $\mathrm{Re}(s)=\tfrac12$) | Foundational |
| MC-2 | PNT-TRUTH-MADE-CONTINGENT-ON-RH | Believing the Prime Number Theorem's own truth depends on the Riemann Hypothesis, missing that PNT is already fully proven independently (1896, via the weaker zero-free region) and RH would only sharpen the error bound | High |
| MC-3 | PARTIAL-EVIDENCE-MISTAKEN-FOR-PROOF | Believing overwhelming partial evidence (trillions of verified zeros, a proven 40%-on-the-line result) amounts to a proof of the full Riemann Hypothesis, rather than recognizing the categorical gap between extensive evidence and a general proof | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Zero-Free Region Conflated with RH") → P41 (detect: ask whether the zero-free region used in the 1896 PNT proof is the same claim as RH) → P64 (conceptual shift: re-walk Example 1's three-claim spectrum, re-anchoring on "the zero-free region is proven and weak; RH is conjectured and vastly stronger — they are not the same claim").
- **B02 (targets MC-2)**: P27 (name it: "PNT Truth Made Contingent on RH") → P41 (detect: ask whether disproving RH would make the Prime Number Theorem itself false or unproven) → P64 (conceptual shift: re-walk Example 2's timeline, re-anchoring on "PNT was fully proven in 1896, independent of RH's still-unresolved status — RH only affects the error bound's tightness").
- **B03 (targets MC-3)**: P27 (name it: "Partial Evidence Mistaken for Proof") → P41 (detect: ask whether trillions of numerical checks plus a proven 40% result means RH is essentially proven) → P64 (conceptual shift: re-walk Example 3's evidence-vs-proof distinction, re-anchoring on "mathematics requires a general argument covering every case, not an arbitrarily large finite sample").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.prime-number-theorem` (the actual 1896 proof mechanism via the weaker zero-free region, which this concept's LO1/LO2 directly contrast against RH's stronger claim) and `math.cx.riemann-zeta` (the zeta function, its zeros, and that concept's own honest "RH is unproven" statement, which this concept extends with much greater precision and context).
- **Unlocks**: none listed in the KG for this concept — a genuine terminal node, appropriate for an unsolved capstone problem.
- **Cross-link**: KG lists `math.cx.riemann-zeta`, confirmed authored via `ls docs/curriculum/blueprints/`. However, this cross-link target is already this concept's own direct PREREQUISITE (not a separate lateral connection) — the KG lists it in both `requires` and `cross_links` for the same underlying relationship. Since the prerequisite relationship already fully accounts for the connection (reused throughout LO1–LO3 and every worked example), a distinct cross-link PROBE would be redundant with the prerequisite-reuse already present in this blueprint. $P76_{mode}=$ **independence**, with the transfer probe instead synthesizing across BOTH prerequisites at once (the zeta function's zeros and the PNT's actual proof mechanism).

## Component 8 — Teaching Notes

- **Why all three LOs are orientation level**: this concept carries the most extreme metadata signals in the entire corpus — `estimated_hours=100` (roughly 10× the corpus median, the single largest hour budget of any authored concept), `bloom=evaluate` (one level below the maximum, "create"), and `mastery_threshold=0.5` (MAMR = 3/5, among the lowest in the corpus). Combined with the concept's real-world status as a literally UNSOLVED Millennium Prize Problem — no human, including professional mathematicians, can be brought to full "mastery" of resolving it — these signals point unambiguously to a capstone AWARENESS treatment: the goal is accurate understanding of the conjecture's precise status, its relationship to already-proven results, and honest epistemic humility about the evidence/proof boundary, not skill mastery of a technique. This is a stronger, more literal justification for all-orientation treatment than even `math.cat.higher-category`'s precedent, since RH's "not yet masterable" status is not merely pedagogical but a plain fact about the state of mathematics itself.
- **Division of labor**: `math.cx.riemann-zeta` owns the zeta function itself and first introduces RH as an unproven statement (its own MC-3); `math.nt.prime-number-theorem` owns the ACTUAL proof mechanism of the PNT and the zero-free-region distinction. This concept owns the full CONTEXTUALIZATION of RH — its precise strength relative to what's already proven, its equivalence to the best-possible error term, and its real-world status as a Millennium Problem — deliberately synthesizing both prerequisites rather than introducing new proof machinery neither established.
- This concept is the natural capstone of the `math.cx`/`math.nt` analytic-number-theory arc traced across this corpus (`math.cx.power-series-cx` → `math.cx.identity-theorem` → `math.cx.analytic-continuation` → `math.cx.riemann-zeta` → `math.nt.prime-number-theorem` → this concept), and is treated as such: every worked example reuses established results from that arc rather than introducing independent new content.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.riemann-zeta` authored but is already a direct prerequisite — independence, with rationale in Component 7) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.5×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner already has zeta/zeros/proven-vs-conjectured; RH's precise status introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS (explicit all-orientation justification) |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
