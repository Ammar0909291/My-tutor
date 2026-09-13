# math.seq.geometric-sequence — Geometric Sequence

## Identity
- **KG id**: `math.seq.geometric-sequence`
- **Domain**: math.seq (Sequences and Series)
- **Requires**: `math.seq.sequence`
- **Unlocks**: `math.seq.geometric-series`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.85 · **Estimated hours**: 5

## Learning Objective
The learner formalizes `math.seq.sequence`'s own informal ratio preview into the explicit formula $a_n=a_1\cdot r^{n-1}$ by unwinding the recursion, classifies a geometric sequence's long-run behavior based on the value of $r$, and applies geometric sequences to genuine compound growth/decay contexts, correctly identifying which quantity plays the role of $a_1$ and which plays the role of $r$.

## Core Understanding
`math.seq.sequence` previews the constant-RATIO pattern informally (as opposed to `math.seq.arithmetic-sequence`'s own constant-DIFFERENCE pattern); this concept formalizes it. A geometric sequence is defined by the recursion $a_n=a_{n-1}\cdot r$ for a fixed common ratio $r$. **Unwinding this recursion** — $a_2=a_1\cdot r$, $a_3=a_2\cdot r=a_1\cdot r^2$, $a_4=a_3\cdot r=a_1\cdot r^3$ — derives the closed form $a_n=a_1\cdot r^{n-1}$ directly, with the exponent $n-1$ directly traceable to counting exactly $n-1$ multiplication steps from $a_1$ to $a_n$. This unwinding technique directly parallels `math.seq.arithmetic-sequence`'s own derivation of $a_n=a_1+(n-1)d$: multiplicative accumulation here, additive there, from an otherwise identical unwinding process.

**Long-run behavior is entirely determined by $r$**, split into two INDEPENDENT questions — magnitude and sign. For $|r|<1$: $r^{n-1}\to0$, so $a_n\to0$ — DECAY. For $|r|>1$: $|a_n|\to\infty$ — GROWTH. Separately, for $r<0$: the sign of $r^{n-1}$ alternates with each step, producing OSCILLATION superimposed on whatever growth/decay magnitude behavior $|r|$ determines. This is a **structural contrast** with `math.seq.arithmetic-sequence`, which has no analogous decay-toward-a-limit case, since additive accumulation cannot asymptotically approach a value the way repeated multiplication by a proper fraction does. Boundary cases: $r=1$ gives a CONSTANT sequence; $r=0$ makes every term past $a_1$ equal to zero; $r=-1$ oscillates between $+a_1$ and $-a_1$ with neither growth nor decay.

**Geometric sequences model MULTIPLICATIVE (compound) processes**: any process repeatedly multiplied by the SAME factor each period — compound interest, radioactive decay, population growth — is exactly a geometric sequence, with $a_1$ the starting quantity and $r$ the per-period multiplicative FACTOR. Correctly identifying which real-world number plays which role is the key modeling step: for a 5% annual compound-interest scenario, $r=1.05$ (the full multiplicative factor, "keep the existing 100%, plus 5% more") — not the bare rate $0.05$, which would be the increment alone, missing the retained principal.

## Mental Models
- **Unwind the recursion, don't memorize the formula.** $a_n=a_1\cdot r^{n-1}$ falls straight out of writing $a_1\times r\times r\times\cdots$ exactly $(n-1)$ times and counting — the identical technique already used for `math.seq.arithmetic-sequence`'s own closed form.
- **Sign and magnitude are two separate questions.** Whether the sequence oscillates (sign of $r$) and whether it grows or decays (magnitude of $r$ relative to $1$) are determined independently — never conflate the two.
- **The ratio is the full multiplicative factor, never the bare rate.** For compound growth of $x\%$, $r=1+x/100$; for compound decay of $x\%$, $r=1-x/100$ — the "$1$" represents keeping the existing quantity, which the bare rate alone omits.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 4 (notation-induced)**: exactly the same mechanism already documented for `math.seq.arithmetic-sequence`'s own MC-1 — the $(n-1)$ exponent is easy to misread as $n$ when the subscript notation is skimmed rather than parsed term by term.
- **MC-2** is a **Type 1 (overgeneralization)**: a learner may reasonably but incorrectly assume a single property ($r$'s sign) determines the WHOLE behavior of the sequence, rather than recognizing that sign and magnitude answer two genuinely separate questions.
- **MC-3** is a **Type 1 (overgeneralization)**: everyday language uses "5% growth" to mean the increment alone, and this correct everyday usage is over-applied to the mathematical modeling context, where the full multiplicative factor (including the retained principal) is what the model actually requires.

## Misconceptions
**MC-1 — GEOMETRIC-EXPONENT-ASSUMED-EQUAL-TO-INDEX** *(Foundational)*
- Surface form: computing $a_n=a_1\cdot r^n$ instead of $a_1\cdot r^{n-1}$, treating the exponent as equal to the term's index rather than the number of multiplication steps.
- Root cause: the same notation-parsing gap already documented for `math.seq.arithmetic-sequence`'s own MC-1, recurring here in the multiplicative case.
- Repair: for $a_1=3,r=2$, unwind explicitly — $a_1=3$ (zero multiplications), $a_2=6$ (one), $a_3=12=3\cdot2^2$ (two), $a_4=24=3\cdot2^3$ (three) — confirming the exponent counts STEPS, always $n-1$, never $n$.

**MC-2 — SIGN-AND-MAGNITUDE-BEHAVIOR-CONFLATED** *(High)*
- Surface form: believing $r$'s sign ALONE determines whether the sequence's magnitude grows or decays.
- Root cause: overgeneralizing a single property ($r$'s sign) to control the sequence's entire behavior, rather than recognizing sign and magnitude as independent questions.
- Repair: compare four sequences directly — $r=0.5$ (decays, no oscillation), $r=3$ (grows, no oscillation), $r=-0.5$ (decays WHILE oscillating), $r=-2$ (grows WHILE oscillating) — proving sign-driven oscillation and magnitude-driven growth/decay are determined independently, not by the same property.

**MC-3 — RATIO-SET-TO-BARE-GROWTH-RATE** *(High)*
- Surface form: setting $r=0.05$ for a 5% compound growth scenario, rather than the full multiplicative factor $r=1.05$.
- Root cause: overgeneralizing the everyday "5% growth" phrasing (which refers to the increment alone) onto the mathematical model, which requires the FULL per-period multiplier.
- Repair: a \$1000 balance earning 5% annual compound interest becomes \$1000$\times1.05=\$1050$ after one year — confirming the balance is multiplied by $1.05$ (keeping the existing $100\%$, plus $5\%$ more), not by $0.05$ alone (which would replace the entire balance with just the interest earned).

## Analogies
- **The unwinding-the-recursion analogy**: exactly parallel to `math.seq.arithmetic-sequence`'s own derivation — multiplicative accumulation (repeated multiplication by $r$) instead of additive accumulation (repeated addition of $d$), from an otherwise identical step-by-step unwinding process.
- **Anti-analogy — arithmetic sequences have NO decay-to-a-limit case, but geometric sequences DO.** This is the structural contrast `math.seq.arithmetic-sequence`'s own entry names explicitly as its permanent difference from this concept — worth restating here from the geometric side: $|r|<1$ genuinely produces decay toward zero, something addition by a fixed amount structurally cannot do.

## Demonstrations
1. **Unwinding the recursion**: starting from $a_1=3,r=2$, writing out $a_2=6$, $a_3=12$, $a_4=24$, and generalizing to $a_n=3\cdot2^{n-1}$ — directly breaking MC-1 by making the step count explicit and visible.
2. **The four-way sign/magnitude comparison**: $r=0.5$ (decay only), $r=3$ (growth only), $r=-0.5$ (decay+oscillation), $r=-2$ (growth+oscillation) — directly breaking MC-2 by proving the two behaviors are independently determined across every combination.
3. **Compound interest with the correct multiplicative factor**: \$1000 at 5% annual interest, $a_1=1000$, $r=1.05$, reaching $a_4=1000\times1.05^3=1157.625$ after 3 years — directly breaking MC-3 and resolving the exact forward-reference `math.seq.arithmetic-sequence`'s own entry flagged (see Curriculum Feedback below).

## Discovery Questions
1. "Starting from $a_1$, how many times do you multiply by $r$ to reach $a_2$? To reach $a_n$? Is it $n$ times, or something else?"
2. "For $r=-3$, does the negative sign alone tell you whether the sequence's magnitude grows or shrinks? What does $|r|$ tell you separately?"
3. "For a 5% compound growth scenario, is the correct ratio $r=0.05$ or $r=1.05$? What does each number represent?"

## Teaching Sequence
1. **Anchor in `math.seq.sequence`**: restate the informal constant-ratio preview already introduced there, now as the formal object being defined.
2. **Representation shift (breaks MC-1)**: unwind the recursion $a_n=a_{n-1}\cdot r$ term by term, arriving at the closed form $a_n=a_1\cdot r^{n-1}$.
3. **Conflict evidence (breaks MC-2)**: the four-way sign/magnitude comparison, proving the two behaviors are independent across every combination of sign and magnitude.
4. **Contrast pair (breaks MC-3)**: the correctly-set-up compound-interest example, explicitly contrasted against the tempting bare-rate error.
5. **Mastery gate**: 4-item problem set (derive $a_5$ from $a_1=7,r=3$; classify long-run behavior for $r=-0.8$; a tripling-bacteria-population modeling problem; explaining why 3% compound decay uses $r=0.97$, not $0.03$ or $-0.03$) plus 1 independence-mode transfer probe (a growth-versus-decay investment comparison with an embedded "why does it never reach exactly zero" task).

## Tutor Actions
- **Representation shift**: term-by-term recursion unwinding to derive the closed form.
- **Conflict evidence** (MC-2): the four-way sign/magnitude independent comparison.
- **Contrast pair** (MC-3): the correctly-set-up compound-interest example versus the bare-rate error.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded "never reaches exactly zero" explanation task.

## Voice Teaching Notes
- When first deriving the closed form, narrate the unwinding out loud term by term — "how many times did we multiply by $r$ to get here?" — exactly paralleling `math.seq.arithmetic-sequence`'s own spoken framing, adapted to multiplication.
- For MC-2, say "two separate questions: does it oscillate, and does it grow or shrink?" as a standing checklist whenever a geometric sequence's behavior is classified.
- For MC-3, say "the ratio KEEPS the old amount and ADDS the change — never just the change alone" whenever a compound-growth or decay scenario is modeled.

## Assessment Signals
- **Early warning for MC-1**: computing $a_n=a_1\cdot r^n$ (off by one multiplication step) on a closed-form derivation task.
- **Early warning for MC-2**: predicting oscillation implies decay, or growth implies no oscillation, without checking $|r|$ and the sign of $r$ separately.
- **Early warning for MC-3**: setting $r$ equal to the bare percentage rate (e.g. $0.05$ or $-0.03$) rather than the full multiplicative factor.
- **Mastery evidence**: correctly deriving a fresh closed form without prompting, correctly classifying long-run behavior by separately checking sign and magnitude, and correctly setting up a fresh real-world modeling scenario with the correct $a_1$ and $r$.

## Tutor Recovery Strategy
- On MC-1: re-walk the term-by-term unwinding for a fresh $a_1,r$ pair — the misconception is about miscounting steps, not about not knowing the formula exists.
- On MC-2: rework the four-way comparison with fresh $r$ values, always asking "sign question first, magnitude question second" as two SEPARATE checks.
- On MC-3: rework the compound-interest setup with a fresh percentage, always asking "does the model KEEP the existing quantity, or replace it entirely?" as the diagnostic question.
- If a learner correctly derives the closed form but fails real-world modeling tasks, treat this as a distinct application gap (identifying $a_1$ and $r$ correctly from a word problem) rather than re-teaching the algebraic derivation.

## Memory Hooks
- "How many times did you multiply? Count again — it's $(n-1)$, not $n$" — for MC-1.
- "Sign question, magnitude question — always separate" — for MC-2.
- "Keep the old amount, add the change — never just the change" — for MC-3.

## Transfer Connections
- **`math.seq.sequence`** (prerequisite, already authored): the constant-ratio pattern this concept formalizes into the full closed form and behavioral classification.
- **`math.seq.arithmetic-sequence`** (sibling, already authored): **this entry resolves the exact forward-reference gap that concept's own Curriculum Feedback (Batch 55) recorded** — `arithmetic-sequence`'s Blueprint had cited this concept's own not-yet-authored Examples 2 and 3 (the decay-contrast and the identical `$1000`-at-5%-interest compound-interest comparison) as already-available parallel content. Both examples are now genuinely present here (Example 2's four-way sign/magnitude comparison; Example 3's `$1000`-at-5% compound interest, reaching `$1157.625` after 3 years) — a future revisit of `arithmetic-sequence`'s own entry could now substantively cross-reference this one back, though that update is not made in this batch (out of scope: this program edits the concept being authored, not its prior siblings, per standing practice).
- **`math.seq.geometric-series`** (unlocked, not yet authored): summing geometric sequences, building directly on this concept's explicit formula.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a financial-investment context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.geometric-sequence.md` (mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted). All three worked examples (the recursion-unwinding derivation, the four-way sign/magnitude comparison, the `$1000`-at-5% compound-interest setup), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 High, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: [math.seq.geometric-series]`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`, no cross-link target listed in the KG): "A financial analyst is comparing two investment scenarios: Scenario A grows a \$5000 initial investment by a fixed 4% each year; Scenario B starts with the SAME \$5000 but LOSES 4% of its value each year. (a) Set up BOTH scenarios as geometric sequences, correctly identifying $a_1$ and $r$ for each — being careful that Scenario B's ratio is NOT simply the negative of Scenario A's. (b) Explain why Scenario A's sequence grows without bound while Scenario B's decays toward (but never reaches) zero, citing each scenario's specific $r$ value. (c) Compute both scenarios' values after 5 years, and explain concretely why Scenario B's value, despite steadily shrinking, mathematically never reaches exactly zero." *(Expected: (a) Scenario A: $a_1=5000,r=1.04$; Scenario B: $a_1=5000,r=0.96$ (NOT $r=-1.04$ or $r=-0.04$). (b) Scenario A has $r>1$ (unbounded growth); Scenario B has $0<r<1$ (decay toward, never reaching, zero) — both without oscillation since neither $r$ is negative. (c) Scenario A: $5000\times1.04^5\approx\$6083.26$; Scenario B: $5000\times0.96^5\approx\$4074.19$; Scenario B never reaches exactly zero because repeated multiplication by a positive number less than $1$ always produces another strictly positive number, however small.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- **Resolves a genuine forward-reference gap recorded by a sibling entry**: `math.seq.arithmetic-sequence`'s own Curriculum Feedback (Batch 55) flagged that its Blueprint cited this concept's own not-yet-existing Examples 2 and 3 as parallel content, and confirmed via `ls` at the time that this concept had no EB entry yet. Both examples now genuinely exist here (the decay-versus-growth-versus-oscillation four-way comparison, and the identical `$1000`-at-5%-interest compound-interest computation reaching `$1157.625`) — closing that gap, though `arithmetic-sequence`'s own entry is not retroactively edited this batch.

## Version History
- **2026-09-12 (Batch 58)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.sequence` (Batch 52). Resolves the forward-reference gap `math.seq.arithmetic-sequence`'s own entry (Batch 55) recorded against this exact concept. `math.seq` moves from 4/21 to 5/21 this batch. Unlocks `math.seq.geometric-series` (not yet authored).
