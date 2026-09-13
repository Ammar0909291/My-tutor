# math.func.real-valued-function — Real-Valued Function (Natural Domain, Domain vs. Range, Single-Output Rule)

## Identity
- **KG ID:** `math.func.real-valued-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`, `math.found.real-numbers`
- **Unlocks:** `math.calc.limits`
- **Cross-links:** `math.calc.limits` (confirmed genuinely unauthored — independence mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 2

## Learning Objective
By the end of this concept, the student can: (1) define a real-valued function as $f: D \to \mathbb{R}$ with $D \subseteq \mathbb{R}$, so both inputs and outputs are real numbers; (2) determine the NATURAL DOMAIN of a given formula by identifying every operation that can fail on $\mathbb{R}$ (division by zero, even roots of negatives, logarithms of non-positives) and excluding those inputs; (3) correctly distinguish domain (the set of valid inputs) from range (the set of actual outputs) for a given function, and correctly apply the single-output rule to reject a multi-valued correspondence like $\pm\sqrt{x}$ as not a function.

## Core Understanding
`math.func.function-concept` supplies the general rule ("exactly one output per input"); `math.found.real-numbers` supplies $\mathbb{R}$ itself. This concept specializes both to functions whose inputs and outputs are real numbers, and develops the practical skill of finding a formula's natural domain.

DOMAIN AND RANGE ARE DIFFERENT SETS, IN DIFFERENT ROLES: the domain is the set of valid INPUTS a function accepts; the range is the set of actual OUTPUTS it produces. For $f(x)=x^2$ with domain $\mathbb{R}$: any real number is a valid input (domain $=\mathbb{R}$), but the outputs are never negative (range $=[0,\infty)$) — domain and range are genuinely different sets here, and confusing which is which reverses every subsequent statement about the function.

THE NATURAL DOMAIN EXCLUDES WHEREVER THE FORMULA FAILS: not every real number is automatically a valid input for every formula. Three operations can fail on $\mathbb{R}$: a denominator equal to zero (division undefined), an even root of a negative number (not a real number), and a logarithm of a non-positive number (undefined). The natural domain is $\mathbb{R}$ minus every value that triggers one of these failures — found by testing each operation in the formula, not assumed to be all of $\mathbb{R}$ by default.

THE SINGLE-OUTPUT RULE IS NECESSARY, NOT A CONVENTION: for every $x$ in the domain there is EXACTLY ONE $f(x) \in \mathbb{R}$. The correspondence $\pm\sqrt{x}$ (giving both $+\sqrt{x}$ and $-\sqrt{x}$ for any $x>0$) is NOT a function, because it assigns two outputs to one input — this is a genuine violation of the definition, not a stylistic choice to avoid. The single-valued PRINCIPAL square root $\sqrt{x}$ (non-negative by convention) IS a function.

## Mental Models
1. **Rung 1 — domain is what goes IN (the $x$-axis side); range is what comes OUT (the $y$-axis side).** These are never interchangeable, and mixing them up reverses every subsequent claim.
2. **Rung 2 — test every operation in a formula for where it can fail, then exclude those inputs; never assume the domain is automatically all of $\mathbb{R}$.** Denominators, even roots, and logarithms are the three checkpoints.
3. **Rung 3 — one input, one output, always; a rule giving two outputs for one input is not a function, no matter how natural the formula looks.** $\pm\sqrt{x}$ fails this test structurally, not by convention.

## Why Students Fail
Having practiced domain and range as a pair of terms introduced together, students can swap which set is which — calling the output set "the domain" or the input set "the range" — missing that domain is strictly about inputs (horizontal, $x$-axis) and range is strictly about outputs (vertical, $y$-axis), a distinction that, once reversed, invalidates every subsequent statement about the function. Having mostly encountered polynomial functions with no domain restrictions in earlier work, students can default to assuming every formula's domain is simply "all real numbers," missing that division, even roots, and logarithms each impose genuine restrictions that must be checked explicitly by testing the formula's own operations. Finally, having learned that $\sqrt{x}$ "undoes" squaring, and that both $+\sqrt x$ and $-\sqrt x$ square back to $x$, students can conclude that "$x$ maps to $\pm\sqrt{x}$" is itself a legitimate function since it comes from one consistent formula, missing that assigning TWO outputs to one input directly violates the single-output rule regardless of how naturally the two outputs arise.

## Misconceptions

### MC-1: DOMAIN-RANGE-CONFUSED
- **Birth type:** Type 3 (language contamination) — Blueprint designates this the FOUNDATIONAL misconception, independently confirmed
- **Description:** Swapping domain and range — saying "the range is the set of $x$-values" or "the domain is what $f$ outputs" — reversing input and output roles.
- **Why this birth type:** Language contamination: "domain" and "range" are learned as a fixed vocabulary pair with no inherent directional cue in their everyday sound, so the two terms are easily interchanged in speech and writing even when the underlying input/output distinction is understood computationally.
- **Detection probe:** "For $f(x)=x+1$: is 5 in the domain? What is the range if the domain is $\{1,2,3\}$?" A student with MC-1 answers "yes, 5 is in the range" or states the range as $\{1,2,3\}$ (the domain values themselves).
- **Repair:** Use the input/output machine model directly: for $f(x)=x^2$, input $3$ produces output $9$ — $3$ is in the domain (an input), $9$ is in the range (an output). Domain is always about the $x$-axis (horizontal, what you plug in); range is always about the $y$-axis (vertical, what comes out). For $f(x)=x^2$ with domain $\mathbb{R}$: domain $=\mathbb{R}$, range $=[0,\infty)$ — genuinely different sets.
- **Verification of death:** Given a function and a specific number, the student correctly identifies whether that number belongs to the domain (an input) or the range (an output), without reversing the roles.

### MC-2: DOMAIN-IS-ALWAYS-ALL-REALS
- **Birth type:** Type 1 (overgeneralization) — Blueprint rates this "High," independently confirmed
- **Description:** Stating "domain $=\mathbb{R}$" for any formula without checking where it is undefined, missing division-by-zero or square-root-of-negative restrictions.
- **Why this birth type:** Overgeneralization from extensive prior experience with polynomial functions (which genuinely have domain $\mathbb{R}$) to formulas involving division or roots, where the pattern "the domain is always everything" no longer holds and must be checked explicitly.
- **Detection probe:** "What is the natural domain of $f(x)=1/(x-2)$?" A student with MC-2 answers "$\mathbb{R}$" or "all real numbers," without excluding $x=2$.
- **Repair:** Test every operation in the formula for failure points. For $f(x)=1/(x-2)$: the denominator $x-2$ is zero exactly when $x=2$, so $x=2$ must be excluded — natural domain $\mathbb{R}\setminus\{2\}$. For $g(x)=\sqrt{x-3}$: the radicand $x-3$ is negative exactly when $x<3$, so those values must be excluded — natural domain $[3,\infty)$. The domain is all of $\mathbb{R}$ only when NO operation in the formula can ever fail (e.g. $f(x)=x^2+1$).
- **Verification of death:** Given an unfamiliar formula involving division or a root, the student explicitly tests each risky operation and states the resulting restricted domain, rather than defaulting to $\mathbb{R}$.

### MC-3: MULTI-VALUED-IS-A-FUNCTION
- **Birth type:** Type 5 (instruction-induced) — Blueprint rates this "Moderate," independently confirmed
- **Description:** Believing $\pm\sqrt{x}$ is a function because "it comes from the same formula $x$," failing to apply the single-output rule.
- **Why this birth type:** Instruction-induced: square roots are frequently introduced as "$x$ has two square roots, $+\sqrt x$ and $-\sqrt x$" without immediately clarifying that a FUNCTION named $\sqrt{\cdot}$ must pick exactly one of these (the principal, non-negative root) — the two-roots framing, taught correctly for its own purpose, is later misapplied to functions.
- **Detection probe:** "Is the rule 'x maps to $\pm\sqrt{x}$' a real-valued function from $(0,\infty)$ to $\mathbb{R}$?" A student with MC-3 answers "yes."
- **Repair:** Test the single-output rule directly on input $x=4$: $\pm\sqrt{4}$ gives BOTH $+2$ and $-2$ — two different outputs from one input, which violates the rule outright, regardless of how naturally both values arise from the same formula. Compare $f(x)=\sqrt{x}$ (the principal, non-negative root only): $f(4)=+2$ only — exactly one output — so $f$ IS a function. The graphical test confirms it: the vertical line test would find $x=4$ hit twice on the $\pm\sqrt x$ curve.
- **Verification of death:** Given a candidate multi-valued correspondence, the student tests a specific input, identifies that it produces more than one output, and correctly concludes it is not a function — while confirming the single-valued principal version IS one.

## Analogies
1. **The ticket-window-in-versus-out analogy (targets MC-1).** At a ticket window, the money handed IN is one pile (the domain) and the ticket handed OUT is a different, separate item (the range) — no one confuses which direction the transaction goes, and the same directional discipline applies to domain and range.
2. **The border-crossing-checkpoint analogy (targets MC-2).** Not every traveler is automatically allowed to cross a border — certain conditions (missing documents, restricted categories) turn some travelers away at specific checkpoints. A formula's domain works the same way: certain inputs are turned away at specific operations (division, roots), and assuming everyone gets through by default misses the checkpoints entirely.
3. **The two-envelopes-one-name analogy (targets MC-3).** If a single addressee's name is written on two different envelopes containing two different letters, that is not "one flexible piece of mail" — it's a genuine ambiguity about which letter belongs to that name. $\pm\sqrt{x}$ assigning two outputs to one input is the same structural problem, however naturally the two values arise.

## Demonstrations
### Demonstration 1 — domain, range, and the single-output rule together (mirrors Blueprint TA-A01)
For $f(x)=x^2$ with domain $\mathbb{R}$: is $x=-3$ in the domain? Yes (any real number is a valid input). What is $f(-3)$? $9$. Is $-9$ in the range? No — $x^2\ge0$ for every real $x$, so no negative number is ever an output; the range is $[0,\infty)$, genuinely smaller than the domain $\mathbb{R}$.

### Demonstration 2 — natural domain determination procedure (mirrors Blueprint TA-A02)
For $f(x)=1/(x-2)$: the denominator is zero when $x=2$, so the natural domain is $\mathbb{R}\setminus\{2\}$, i.e. $(-\infty,2)\cup(2,\infty)$. For $g(x)=\sqrt{x-3}$: the radicand must be non-negative, $x-3\ge0$, so $x\ge3$ — natural domain $[3,\infty)$. For $h(x)=x^2$: no operation can fail — natural domain $\mathbb{R}$.

### Demonstration 3 — the single-output rule rules out $\pm\sqrt{x}$ (mirrors Blueprint TA-B03)
Testing "$x$ maps to $\pm\sqrt{x}$" at $x=4$: this gives BOTH $+2$ and $-2$ — two outputs for one input, directly violating the single-output rule, so this is NOT a function. Compare $f(x)=\sqrt{x}$ (principal root only): $f(4)=+2$ only — exactly one output — so this IS a function. Contrast with $g(x)=x^2$: $g(3)=g(-3)=9$ — the SAME output for two DIFFERENT inputs is perfectly fine (many-to-one is allowed); it is only one-input-to-many-outputs that the rule forbids.

## Discovery Questions
1. "For $f(x)=x^2$: is $-3$ in the domain? Is $-9$ in the range? What does this tell you about whether domain and range are always the same set?"
2. "What is the natural domain of $f(x)=1/(x-2)$? What specific value must be excluded, and why?"
3. "Is the rule 'x maps to $\pm\sqrt{x}$' a real-valued function? Test it directly on a specific input to find out."

## Teaching Sequence
Best taught by the **Pictorial CPA entry stage — the input-output machine diagram (numbers feed in from the domain, exactly one number emerges as output) before the formal natural-domain procedure**, matching the Blueprint's own CPA justification for proficient-level learners already fluent with the general function concept and the real numbers.
1. Work Demonstration 1's domain/range/single-output triad for $f(x)=x^2$, posing Discovery Question 1 before confirming domain and range are genuinely different sets here.
2. Work Demonstration 2's natural-domain procedure across three formulas, posing Discovery Question 2 before confirming the exclusion of $x=2$.
3. Work Demonstration 3's single-output test on $\pm\sqrt{x}$ versus $\sqrt{x}$, posing Discovery Question 3 before confirming $\pm\sqrt x$ is not a function while $\sqrt x$ is.
4. Assess with the P77 problem set and the limits-bridge transfer probe (P76, cross-link probe against `math.calc.limits`).

## Tutor Actions
1. **On any domain/range statement:** require the student to specify explicitly which set (inputs or outputs) each named value belongs to, never accepting an unqualified answer.
2. **On any domain-determination task:** require the student to test the formula's own operations (division, even roots, logarithms) explicitly, never accepting "$\mathbb{R}$" without justification.
3. **On any multi-valued-correspondence question:** require the student to test a specific numerical input and count the outputs directly, never accepting "it comes from one formula" as sufficient justification for function status.

## Voice Teaching Notes
1. **Register:** proficient/understand — this concept assumes fluency with the general function concept and the real number system, adding domain-restriction reasoning as the new skill.
2. **Load-bearing sentence, spoken slowly:** "Domain is what goes in; range is what comes out — and not every input is allowed in every formula."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely test $\pm\sqrt{4}$ numerically before confirming it produces two outputs.

## Assessment Signals
1. **Gate concept:** correctly determines the natural domain of a formula involving division, an even root, or a logarithm.
2. **Domain-range discrimination:** correctly identifies whether a specific value belongs to the domain or the range, without reversing the roles.
3. **Single-output test fluency:** correctly applies the single-output rule to a candidate correspondence, testing a specific input rather than reasoning only from the formula's appearance.
4. **Many-to-one versus one-to-many discrimination:** explicitly distinguishes "same output, different inputs" (allowed) from "same input, different outputs" (forbidden).
5. **Transfer:** bridges to limits (P76) by finding the natural domain of $f(x)=(x^2-1)/(x-1)$, numerically approaching $x=1$, and algebraically simplifying to recognize the limiting value even though $f(1)$ itself is undefined.

## Tutor Recovery Strategy
If the student swaps domain and range, require them to state explicitly, for several fresh functions, which axis (horizontal input or vertical output) each named value belongs to, until the direction becomes automatic. If the student defaults to "domain $=\mathbb{R}$" without checking, require them to test each operation in a fresh formula explicitly (denominator, root, logarithm) before accepting any domain statement. If the student accepts a multi-valued correspondence as a function, require them to test a specific numerical input and count the resulting outputs on several fresh examples until the single-output rule is applied automatically.

## Memory Hooks
1. "Domain is IN, range is OUT — never swap the direction."
2. "Check every denominator, every root, every log — the domain isn't automatically everything."
3. "One input, one output, always — $\pm\sqrt{x}$ breaks that rule, no matter how natural it looks."

## Transfer Connections
- **`math.func.function-concept`:** the general single-output rule this concept specializes to real-number inputs and outputs, and applies concretely to reject $\pm\sqrt{x}$.
- **`math.found.real-numbers`:** the real line $\mathbb{R}$ whose structure (division, roots, logarithms) determines exactly where natural domain restrictions arise.
- **`math.calc.limits`** (cross-link, currently unauthored): the natural domain's exclusions (like $x=1$ for $(x^2-1)/(x-1)$) are precisely the points where a limit question becomes meaningful — asking what a function approaches at a point where it is itself undefined.

## Cross-Subject Connections
- **Physics and engineering (measurement constraints):** a physical formula's domain often has a real-world analogue (e.g. a length or time cannot be negative), directly paralleling the mathematical natural-domain restriction from division or roots.
- **Computer science (defined behavior of functions/procedures):** a well-defined software function must specify precisely which inputs are valid (its domain) and reject or handle the rest — directly mirroring the natural-domain determination discipline this concept develops.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.real-valued-function.md` — reused by reference throughout (Learning Objectives, worked examples in TA-A01/TA-A02/TA-B03, misconception inventory MC-1–MC-3, transfer probe P76 bridging to limits via $f(x)=(x^2-1)/(x-1)$, mode = Tier 1 cross-link probe per that Blueprint's own Component 0/7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 3, MC-2 Type 1, MC-3 Type 5 (independently classified — the Blueprint names trigger signatures and error patterns but not formal birth types).
- Cross-link: `math.calc.limits` re-verified genuinely unauthored (neither Blueprint nor Educational Brain entry exists, `math.calc` domain unstarted) — confirmed matching the Blueprint's own Tier-1-cross-link-probe declaration, which previews limits self-containedly within the P76 probe itself rather than assuming prior calculus knowledge, the same pattern `math.func.composition` used for its own unauthored `math.calc.chain-rule` cross-link (Batch 29).

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both `math.calc.limits`, confirmed against the live KG).

## Version History
- **Batch 30** (2026-09-12): initial authoring, part 3 of 4 this batch (with `math.func.inverse-functions`, `math.func.graph-of-function`, `math.func.linear-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 3, MC-2 Type 1, MC-3 Type 5).
