# math.seq.arithmetic-sequence — Arithmetic Sequences

## Identity
- **KG id**: `math.seq.arithmetic-sequence`
- **Domain**: math.seq (Sequences and Series)
- **Requires**: `math.seq.sequence`
- **Unlocks**: `math.seq.arithmetic-series`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.85 · **Estimated hours**: 5

## Learning Objective
The learner derives the closed-form formula $a_n=a_1+(n-1)d$ by unwinding the constant-difference recursion, classifies a sequence's long-run behavior from the sign of $d$ alone, and correctly models genuine additive (non-compounding) real-world accumulation.

## Core Understanding
`math.seq.sequence` previews the constant-difference pattern informally; this concept formalizes it. An arithmetic sequence is defined by the recursion $a_n=a_{n-1}+d$ for a fixed common difference $d$. **Unwinding this recursion** — writing $a_2=a_1+d$, $a_3=a_2+d=a_1+2d$, $a_4=a_1+3d$, and recognizing the pattern — derives the closed form $a_n=a_1+(n-1)d$ directly from the recursive definition, rather than presenting it as a fact to memorize. This unwinding technique directly parallels `math.seq.geometric-sequence`'s own derivation of $a_n=a_1\cdot r^{n-1}$: additive accumulation in one case, multiplicative in the other, from an otherwise identical unwinding process.

**Long-run behavior is classified entirely by the sign of $d$**: positive $d$ produces unbounded increase, negative $d$ produces unbounded decrease, and $d=0$ produces a constant sequence. Critically, there is **no decay-toward-a-limit case** for arithmetic sequences — this is a structural consequence of addition rather than multiplication: adding a fixed nonzero amount every step can never asymptotically approach a finite value the way repeated multiplication by a fraction between 0 and 1 does. This is a genuine, permanent contrast with `math.seq.geometric-sequence`'s richer three-way classification (which does include decay-to-zero for $|r|<1$).

The concept's real-world payoff is correctly modeling **linear, additive, non-compounding accumulation** — most directly, simple interest, where a fixed dollar amount is added each period rather than a fixed percentage of a growing balance.

## Mental Models
- **Unwind the recursion, don't memorize the formula.** $a_n=a_1+(n-1)d$ is not an arbitrary rule — it falls straight out of writing $a_1+d+d+d+\ldots$ exactly $(n-1)$ times and counting.
- **The sign of $d$ is the whole classification.** No other information about the sequence matters for long-run behavior beyond whether $d$ is positive, negative, or zero.
- **Addition never bends toward a limit.** Unlike geometric sequences, where repeated multiplication by a proper fraction squeezes values ever closer to zero, repeated addition marches steadily away from (or exactly holds) its starting value — there is structurally no arithmetic analogue of geometric decay.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column (consistent with every math.seq Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 4 (notation-induced)**: the formula's $(n-1)$ factor is easy to misread as $n$ itself when the subscript notation is skimmed rather than parsed term by term, especially since $a_1$ is the *first* term but corresponds to $(n-1)=0$ additional steps of $d$.
- **MC-2** is a **Type 6 (analogy overextension)**: having just learned (or being about to learn) that geometric sequences with $|r|<1$ decay toward a limit, the learner overextends that decay concept onto arithmetic sequences, assuming any "decreasing" sequence must be approaching some finite value rather than decreasing without bound.
- **MC-3** is a **Type 3 (language contamination)**: "interest" is used colloquially as a single undifferentiated concept in everyday language, and the specific arithmetic-versus-geometric structural distinction between simple and compound interest is easily lost unless explicitly named as two structurally different sequence types.

## Misconceptions
**MC-1 — ARITHMETIC-COEFFICIENT-ASSUMED-EQUAL-TO-INDEX** *(Foundational, Type 4)*
- Surface form: computing $a_n=a_1+nd$ instead of $a_1+(n-1)d$, treating the exponent-like position $n$ as the number of $d$-steps taken.
- Root cause: the notation's $(n-1)$ factor is easy to misparse, especially since $a_1$ itself already represents zero additional steps of $d$.
- Repair: the explicit unwinding demonstration — $a_1$ has $0$ added $d$'s, $a_2$ has $1$, $a_3$ has $2$ — so $a_n$ has exactly $(n-1)$ added $d$'s, never $n$.

**MC-2 — ARITHMETIC-SEQUENCE-ASSUMED-CAN-DECAY-TO-LIMIT** *(High, Type 6)*
- Surface form: believing a decreasing arithmetic sequence (negative $d$) will eventually level off or approach some finite value, the way a geometric sequence with $|r|<1$ does.
- Root cause: overextending the geometric-decay concept onto the structurally different arithmetic case.
- Repair: a direct numerical contrast — $a_1=10,d=-2$ produces $10,8,6,4,2,0,-2,-4,\ldots$, continuing past zero without bound in the negative direction, never leveling off — versus a geometric sequence with $r=0.5$ genuinely approaching (but never reaching) zero.

**MC-3 — SIMPLE-AND-COMPOUND-INTEREST-CONFLATED** *(High, Type 3)*
- Surface form: modeling a compound-interest scenario using the arithmetic (simple-interest) formula, or vice versa, because "interest" is treated as one undifferentiated idea.
- Root cause: everyday language does not distinguish simple from compound interest as structurally different sequence types (additive versus multiplicative).
- Repair: work the identical numerical scenario ($1000$ at $5\%$) both ways side by side — simple interest arithmetic sequence reaching $\$1150$ after 3 years, compound interest geometric sequence reaching $\$1157.625$ — the small but real numerical gap makes the structural distinction concrete.

## Analogies
- **The unwinding-the-recursion analogy**: exactly parallel to `math.seq.geometric-sequence`'s own derivation — additive accumulation (repeated addition of $d$) instead of multiplicative accumulation (repeated multiplication by $r$), from an otherwise identical step-by-step unwinding process.
- **Anti-analogy — decay-to-a-limit is NOT available to arithmetic sequences.** This is MC-2's exact error, worth naming explicitly: the geometric-decay mental model must NOT be imported here, since addition by a fixed nonzero amount structurally cannot approach a finite limit the way multiplication by a proper fraction does.

## Demonstrations
1. **Unwinding the recursion**: starting from $a_1=5,d=3$, write out $a_2=5+3$, $a_3=5+3+3$, $a_4=5+3+3+3$, and generalize to $a_n=5+(n-1)\times3$ — directly breaking MC-1 by making the $(n-1)$ count explicit and visible.
2. **Unbounded decrease past zero**: starting from $a_1=10,d=-2$, list terms through several negative values, contrasting explicitly against a geometric sequence with $r=0.5$ that approaches zero but never crosses it — directly breaking MC-2.
3. **Simple-versus-compound interest side by side**: compute $\$1000$ at $5\%$ for 3 years both ways (simple: $a_1=1000,d=50$, reaching $\$1150$; compound: geometric with $r=1.05$, reaching $\$1157.625$) — directly breaking MC-3.

## Discovery Questions
1. "Starting from $a_1$, how many times do you add $d$ to reach $a_2$? To reach $a_3$? To reach $a_n$? Is it $n$ times, or something else?"
2. "If $a_1=10$ and $d=-2$, does this sequence ever level off, or does it keep decreasing forever? Compare this to a geometric sequence with $r=0.5$ — does that one level off?"
3. "A bank pays you a flat $\$50$ every year on your $\$1000$ deposit, versus another bank that pays $5\%$ of your current balance every year. After a few years, are these the same amount of money? Which sequence type models each bank?"

## Teaching Sequence
1. **Anchor in `math.seq.sequence`**: restate the informal constant-difference preview already introduced there, now as the formal object being defined.
2. **Representation shift**: unwind the recursion $a_n=a_{n-1}+d$ term by term from a concrete $a_1,d$ pair, arriving at the closed form $a_n=a_1+(n-1)d$ — directly countering MC-1 by making the step count visible from the start.
3. **Conflict evidence (breaks MC-2)**: the unbounded-decrease-past-zero demonstration, contrasted explicitly against geometric decay.
4. **Contrast pair (breaks MC-3)**: the simple-versus-compound interest side-by-side on identical starting numbers.
5. **Mastery gate**: 4-item problem set (derive a closed form from a given $a_1,d$; classify long-run behavior from the sign of $d$; model a genuine simple-interest scenario; identify and correct a simple/compound conflation error) plus 1 independence-mode transfer probe (phone-plan-versus-savings-account contrast).

## Tutor Actions
- **Representation shift**: term-by-term recursion unwinding to derive the closed form.
- **Conflict evidence** (MC-2): the unbounded-decrease-versus-geometric-decay contrast.
- **Contrast pair** (MC-3): the simple-versus-compound interest side-by-side on identical numbers.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded "mistakenly modeled as arithmetic" error-explanation task.

## Voice Teaching Notes
- When first deriving the closed form, narrate the unwinding out loud term by term — "$a_2$ is $a_1$ plus $d$ once; $a_3$ is $a_1$ plus $d$ twice; so $a_n$ is $a_1$ plus $d$ how many times?" — before writing the general formula, so the $(n-1)$ count is heard as a counted quantity, not read as a symbol.
- For MC-2, say explicitly "arithmetic sequences never level off — that's a geometric-sequence idea, not an arithmetic one" whenever a decreasing arithmetic sequence is discussed, to pre-empt the overextension before it forms.
- For MC-3, use consistent spoken labels — "flat-amount interest" for simple, "percentage-of-balance interest" for compound — rather than the bare word "interest," to keep the structural distinction audible.

## Assessment Signals
- **Early warning for MC-1**: computing $a_n=a_1+nd$ (off by one $d$-step) on a closed-form derivation task.
- **Early warning for MC-2**: predicting that a decreasing arithmetic sequence will "level off" or "approach zero" rather than continuing to decrease without bound.
- **Early warning for MC-3**: applying the arithmetic closed-form formula to a stated percentage-based (compound) growth scenario, or vice versa.
- **Mastery evidence**: correctly deriving a closed form from a fresh $a_1,d$ pair without prompting, correctly classifying long-run behavior purely from the sign of $d$, and correctly choosing arithmetic versus geometric modeling for a fresh real-world scenario based on whether the accumulation is a fixed amount or a fixed percentage.

## Tutor Recovery Strategy
- On MC-1: re-walk the term-by-term unwinding for a fresh $a_1,d$ pair rather than restating the formula abstractly — the misconception is about miscounting steps, not about not knowing the formula exists.
- On MC-2: return to the explicit numerical contrast (arithmetic continuing past zero versus geometric approaching but never reaching zero) with fresh numbers, since the misconception is a specific false import from geometric sequences and needs a fresh geometric counterexample alongside it to unstick.
- On MC-3: rework the simple-versus-compound side-by-side with a different starting balance and rate, always asking explicitly "is a fixed dollar amount added, or a fixed percentage of the current balance?" as the diagnostic question.
- If a learner correctly derives the closed form but fails real-world modeling tasks, treat this as a distinct application gap (recognizing which real-world scenario is additive versus multiplicative) rather than re-teaching the algebraic derivation.

## Memory Hooks
- "How many times did you add $d$? Count again — it's $(n-1)$, not $n$" — for MC-1.
- "Arithmetic sequences never level off — that's a geometric idea" — for MC-2.
- "Flat amount = arithmetic; percentage of balance = geometric" — for MC-3.

## Transfer Connections
- **`math.seq.geometric-sequence`** (sibling concept, **not yet authored** — see Curriculum Feedback below): the Blueprint for this concept repeatedly cites geometric-sequence's own Examples 2 and 3 (the decay contrast and the compound-interest comparison) as parallel already-available content; this entry reconstructs the needed contrast content independently rather than citing an EB entry that does not yet exist.
- **`math.seq.arithmetic-series`** (unlocked): summing the terms of an arithmetic sequence is this concept's direct next step, requiring the closed form derived here as its starting ingredient.
- **`math.seq.sequence`** (prerequisite, already authored): this concept formalizes the constant-difference pattern that concept previews only informally.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a phone-plan-versus-savings-account financial context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.arithmetic-sequence.md` (mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted). All three worked examples (the recursion-unwinding derivation, the unbounded-decrease-versus-geometric-decay contrast, the simple-versus-compound interest side-by-side), the complete misconception registry (MC-1 Foundational, MC-2/MC-3 both High, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, no cross-link target listed): "A phone company offers a plan with a flat monthly fee plus a fixed per-minute charge (arithmetic accumulation). A bank offers a savings account earning a fixed annual percentage on the current balance (geometric accumulation). A customer mistakenly models their savings account balance using the arithmetic formula $a_n=a_1+(n-1)d$. Explain what is wrong with this model and describe how the correct model would differ." *(Expected: the savings account grows by a percentage of the CURRENT balance each year, not a fixed dollar amount — so it requires the geometric formula $a_n=a_1\cdot r^{n-1}$, not the arithmetic one; using the arithmetic formula would understate the true balance since it misses growth compounding on previously-earned interest.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- **A genuine forward-reference gap, found and recorded, not fixed**: this Blueprint repeatedly cites `math.seq.geometric-sequence`'s own Examples 2 (decay contrast) and 3 (compound-interest comparison on the identical $\$1000$-at-$5\%$ numbers) as already-available parallel content to draw the arithmetic-versus-geometric contrast against. Confirmed via directory listing that `math.seq.geometric-sequence` has **no Educational Brain entry yet** — this is a different class of finding from this campaign's prior "Blueprint declares a cross-link unauthored, EB entry now exists" staleness pattern; here the Blueprint assumes sibling content that genuinely does not exist yet on either side (Blueprint or EB). This entry reconstructs the needed contrast numbers independently (the unbounded-decrease-versus-geometric-decay demonstration and the simple-versus-compound interest side-by-side) rather than citing unavailable content. When `math.seq.geometric-sequence` is eventually authored, its own entry should cross-reference this one, and this concept's Transfer Connections section should be revisited to substantively incorporate it rather than stand alone.

## Version History
- **2026-09-12 (Batch 55)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.sequence` (Batch 54). `math.seq` moves from 3/21 to 4/21 this batch. Unlocks `math.seq.arithmetic-series` (not yet authored). Genuine forward-reference gap recorded against the not-yet-authored `math.seq.geometric-sequence` — see Curriculum Feedback above.
