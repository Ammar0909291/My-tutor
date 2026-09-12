# math.func.inverse-functions — Inverse Functions (Bijectivity First, General Verification, Reflection Over y=x)

## Identity
- **KG ID:** `math.func.inverse-functions`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.bijection`
- **Unlocks:** `math.trig.inverse-trig`, `math.alg.logarithm`
- **Cross-links:** `math.trig.inverse-trig` (confirmed genuinely unauthored — independence mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) define the inverse function $f^{-1}$ of a bijective function $f$ as satisfying both $f^{-1}(f(x))=x$ and $f(f^{-1}(y))=y$, building directly on `math.func.bijection`'s "exactly one preimage" construction; (2) find $f^{-1}$ algebraically for a specific bijective function and verify the result via a GENERAL algebraic argument valid for arbitrary $x$, never by checking a single sampled numerical value; (3) recognize that a function must FIRST be bijective (restricting the domain if necessary) before a genuine inverse exists, and correctly identify that the graph of $f^{-1}$ is the reflection of $f$'s graph over the line $y=x$, not over either coordinate axis.

## Core Understanding
`math.func.bijection` established that a bijective function's "arrow-swap" produces a genuine, well-defined function — the inverse. This concept develops the FULL working theory: the two defining identities, how to construct and verify an inverse algebraically, and the geometric meaning of inversion.

TWO "UNDOING" IDENTITIES, GUARANTEED BY BIJECTIVITY: for a bijective $f$, `math.func.bijection` already showed that swapping domain and codomain roles produces a genuine function $f^{-1}$ (thanks to the "exactly one preimage" guarantee). This $f^{-1}$ satisfies TWO identities: $f^{-1}(f(x))=x$ for every $x$ in $f$'s domain (apply $f$, then undo it, and land back at the original input), and $f(f^{-1}(y))=y$ for every $y$ in $f$'s codomain (apply the inverse, then $f$ itself, and land back at the original output).

FINDING $f^{-1}$ ALGEBRAICALLY, AND VERIFYING IT GENERALLY: to find $f^{-1}$, write $y=f(x)$, solve algebraically for $x$ in terms of $y$, then swap the variable names to express the result as a function of $x$. Verifying correctness means substituting back into $f^{-1}(f(x))=x$ and confirming the identity holds for an ARBITRARY $x$ — a general algebraic simplification, never a single plugged-in number, since a candidate could happen to work for one convenient value while genuinely failing elsewhere.

BIJECTIVITY IS A GENUINE PREREQUISITE FOR EXISTENCE — CHECK IT FIRST: a function must be bijective BEFORE attempting to construct $f^{-1}$ at all. If it isn't (failing injectivity, as `math.func.bijection`'s own counterexamples showed), restricting the domain may be necessary to make it genuinely invertible — never force a formula through regardless of whether the gatekeeping condition holds.

THE GRAPH REFLECTS OVER $y=x$, NOT EITHER AXIS: since $f^{-1}$ swaps every $(x,y)$ pair on $f$'s graph into $(y,x)$, the graph of $f^{-1}$ is exactly the reflection of $f$'s graph over the line $y=x$ (the line where coordinates are literally interchanged) — never over the $x$-axis (which would negate $y$) or the $y$-axis (which would negate $x$).

## Mental Models
1. **Rung 1 — an inverse candidate must be verified generally, symbolically, for arbitrary $x$ — never confirmed by a single plugged-in number.** A single successful numerical check proves nothing about every other input.
2. **Rung 2 — bijectivity is checked FIRST, always, before attempting to invert.** If it fails, the fix is restricting the domain until it holds, never forcing a formula through regardless.
3. **Rung 3 — inversion is a coordinate SWAP, and reflection over $y=x$ is the precise geometric expression of that swap.** Neither axis reflection matches this operation.

## Why Students Fail
Having just learned the mechanical procedure of solving $y=f(x)$ for $x$ and swapping variable names, students can treat plugging one convenient number into the resulting candidate as sufficient confirmation, missing that the two defining identities are universal claims over the ENTIRE domain and codomain, and a candidate could pass one numerical spot-check while genuinely failing at other inputs. Having successfully solved $y=f(x)$ for $x$ using ordinary algebra, students can proceed as though this algebraic solvability alone guarantees a valid inverse function, missing that `math.func.bijection`'s own gatekeeping requirement must be checked FIRST — a function failing injectivity (like $x^2$ on all of $\mathbb{R}$) produces an algebraically "solvable" equation ($x=\pm\sqrt{y}$) that is not a genuine single-valued inverse at all. Finally, having a strong, well-practiced intuition that "flipping" or "reflecting" a graph typically means flipping it over the $x$-axis (as in reflecting a shape vertically), students naturally guess the same axis for the inverse-function reflection, missing that inversion specifically swaps $x$ and $y$ COORDINATES, which geometrically corresponds to reflecting over the diagonal line $y=x$, not either coordinate axis.

## Misconceptions

### MC-1: INVERSE-VERIFIED-BY-SAMPLING
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Foundational" severity rating, independently confirmed
- **Description:** Believing checking $f^{-1}(f(x))=x$ for one specific numerical value proves the candidate inverse is correct, rather than requiring a general algebraic argument valid for all $x$.
- **Why this birth type:** Overgeneralization from the everyday habit of "checking your work" with a single number, extended incorrectly to a universal identity spanning every possible input, where a candidate could pass one check while genuinely failing at others.
- **Detection probe:** "If I plug in one number and confirm $f^{-1}(f(x))=x$ holds for it, have I verified the inverse is correct?" A student with MC-1 answers "yes."
- **Repair:** Verify $f(x)=3x+2$'s candidate inverse $f^{-1}(x)=(x-2)/3$ GENERALLY: $f^{-1}(f(x))=f^{-1}(3x+2)=\frac{(3x+2)-2}{3}=\frac{3x}{3}=x$ — this simplification holds for EVERY $x$, since the algebra reduces identically regardless of which number $x$ represents, unlike a single-number check (e.g. $x=1$: $f^{-1}(f(1))=f^{-1}(5)=1$ ✓) which is correct but proves nothing about $x=2,3,\ldots$ on its own.
- **Verification of death:** Given a candidate inverse, the student produces a general symbolic simplification demonstrating the identity holds for arbitrary $x$, never accepting a single numerical check as sufficient.

### MC-2: INVERSE-ASSUMED-TO-EXIST-WITHOUT-BIJECTIVITY-CHECK
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Foundational" severity rating, independently confirmed
- **Description:** Believing an inverse function can be found for any function as long as $y=f(x)$ can somehow be solved for $x$, missing that bijectivity (per `math.func.bijection`) must hold first, or the domain must be restricted.
- **Why this birth type:** Overgeneralization from the mechanical algebraic solvability of $y=f(x)$ (which often succeeds even for non-bijective functions, producing a multi-branched or otherwise invalid "solution") to a mistaken belief that solvability alone guarantees a genuine, single-valued inverse function.
- **Detection probe:** "Can I find an inverse function for ANY function, as long as I can solve $y=f(x)$ for $x$ somehow?" A student with MC-2 answers "yes."
- **Repair:** Attempt to invert $f(x)=x^2$ on all of $\mathbb{R}$: it is NOT injective there ($f(2)=f(-2)=4$), so it has NO genuine inverse function on that domain, despite $y=x^2$ being algebraically "solvable" as $x=\pm\sqrt{y}$ (a two-valued, not single-valued, result). Restricting the domain to $x\ge0$ restores bijectivity and produces the genuine single-valued inverse $f^{-1}(x)=\sqrt{x}$.
- **Verification of death:** Given a function, the student checks bijectivity explicitly BEFORE attempting to construct an inverse, restricting the domain if needed rather than forcing an algebraic "solution" through regardless.

### MC-3: INVERSE-GRAPH-REFLECTED-OVER-WRONG-AXIS
- **Birth type:** Type 6 (analogy overextension) — per this Blueprint's own "Moderate" severity rating, independently confirmed
- **Description:** Believing the graph of $f^{-1}$ is obtained by reflecting $f$'s graph over the $x$-axis (or $y$-axis), rather than over the line $y=x$.
- **Why this birth type:** Analogy overextension: everyday geometric "flipping" or "reflecting" intuitions (flipping a shape vertically or horizontally) are extended to the inverse-function reflection without recognizing that inversion specifically swaps $x$-$y$ coordinates, which corresponds geometrically to the diagonal line $y=x$, not either axis.
- **Detection probe:** "Is the graph of $f^{-1}$ obtained by flipping $f$'s graph over the $x$-axis?" A student with MC-3 answers "yes."
- **Repair:** For $f(x)=3x+2$: $f(0)=2$, so $(0,2)$ is on $f$'s graph. Reflecting over $y=x$ (swapping coordinates) gives $(2,0)$: check $f^{-1}(2)=(2-2)/3=0$ ✓, confirming the match. Reflecting over the $x$-axis instead (negating $y$) would give $(0,-2)$: check $f^{-1}(0)=(0-2)/3=-2/3\ne-2$ — this does NOT match $f^{-1}$'s graph at all, decisively ruling out the axis reflection.
- **Verification of death:** Given a point on $f$'s graph, the student correctly computes the corresponding point on $f^{-1}$'s graph via coordinate swap (equivalent to reflection over $y=x$), never guessing an axis reflection.

## Analogies
1. **The recorded-versus-live-checked identity analogy (targets MC-1).** Confirming a single receipt matches a single purchase doesn't prove your entire accounting system is error-free for every transaction — only a systematic, general audit (checking the RULE that generates every receipt) genuinely proves correctness across all cases, exactly as a general algebraic simplification (not one plugged-in number) proves an inverse identity.
2. **The two-way-door-versus-locked-door analogy (targets MC-2).** A function that is genuinely bijective is like a two-way door — you can walk through in either direction and always land somewhere sensible and unique. A non-injective function is like a door that, walked through backward, could lead to two different rooms at once — you can't reliably "invert" the walk without first restricting which room you're allowed to come from.
3. **The mirror-on-the-diagonal analogy (targets MC-3).** Ordinary mirrors reflect left-right or up-down (the two axes). The inverse-function "mirror" is tilted at 45 degrees, along the line $y=x$ — it swaps horizontal and vertical positions entirely, a genuinely different kind of reflection than either familiar axis-flip.

## Demonstrations
### Demonstration 1 — algebraic construction and general verification (mirrors Blueprint Ex1)
For $f(x)=3x+2$ (bijective on $\mathbb{R}$): solving $y=3x+2$ for $x$ gives $x=(y-2)/3$; swapping names gives $f^{-1}(x)=(x-2)/3$. Verifying GENERALLY: $f^{-1}(f(x))=\frac{(3x+2)-2}{3}=x$ for every $x$ — a complete symbolic proof, contrasted explicitly with a single-number check that would prove nothing about other inputs.

### Demonstration 2 — domain restriction is required first (mirrors Blueprint Ex2)
$f(x)=x^2$ is NOT injective on all of $\mathbb{R}$ (`math.func.injectivity`'s own counterexample: $f(2)=f(-2)=4$), so it has NO genuine inverse there. Restricting to $x\ge0$ makes $f$ genuinely bijective onto $[0,\infty)$, with inverse $f^{-1}(x)=\sqrt{x}$: verify $f^{-1}(f(x))=\sqrt{x^2}=x$ for $x\ge0$ (this specifically needs $x\ge0$, since $\sqrt{x^2}=|x|$ in general) and $f(f^{-1}(x))=(\sqrt{x})^2=x$ for $x\ge0$.

### Demonstration 3 — the graph reflects over y=x, not the x-axis (mirrors Blueprint Ex3)
For $f(x)=3x+2$: $(0,2)$ is on $f$'s graph, so $(2,0)$ (coordinates swapped) should be on $f^{-1}$'s graph — checking $f^{-1}(2)=0$ ✓ confirms this. Checking whether reflecting over the $x$-axis (giving $(0,-2)$) would instead work: $f^{-1}(0)=-2/3\ne-2$ — a decisive mismatch, ruling out the axis-reflection guess and confirming $y=x$ as the correct reflection line.

## Discovery Questions
1. "If I plug in one number and confirm $f^{-1}(f(x))=x$ holds for it, have I verified the inverse is correct for every input?"
2. "Can I find an inverse function for ANY function, as long as I can somehow solve $y=f(x)$ for $x$?"
3. "Is the graph of $f^{-1}$ obtained by flipping $f$'s graph over the $x$-axis? Check a specific point to find out."

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — algebraically constructing and generally verifying one specific function's inverse BEFORE the abstract two-identity definition**, matching the Blueprint's own CPA justification; grounding the general-verification discipline in one worked case makes the universal identity concrete before generalizing.
1. Work Demonstration 1's construction and general verification directly, posing Discovery Question 1 before confirming why sampling never suffices.
2. Work Demonstration 2's bijectivity-first requirement, posing Discovery Question 2 before confirming the domain-restriction fix.
3. Work Demonstration 3's reflection check, posing Discovery Question 3 before confirming $y=x$ as the correct line via the falsified axis-reflection guess.
4. Assess with the P77 problem set and the currency-conversion transfer probe (P76, independence mode).

## Tutor Actions
1. **On any inverse-verification claim:** require a general symbolic simplification for arbitrary $x$, never accepting a single numerical check as sufficient proof.
2. **On any inverse-construction attempt:** require the student to confirm bijectivity FIRST, restricting the domain if necessary, before proceeding to solve for $x$.
3. **On any inverse-graph question:** require the student to verify via an explicit point-by-point coordinate swap, never assuming an axis reflection.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes fluency with bijectivity from the prerequisite and develops a concrete, computable inversion skill.
2. **Load-bearing sentence, spoken slowly:** "Solve for x, swap the names, then prove it works for every input — not just the one you happened to check."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely test the axis-reflection guess against a specific point before revealing it fails.

## Assessment Signals
1. **Gate concept:** correctly constructs an inverse function algebraically and verifies it via a general symbolic argument.
2. **Bijectivity-first discipline:** checks bijectivity before attempting inversion, correctly restricting the domain when necessary.
3. **Reflection fluency:** correctly identifies and verifies the $y=x$ reflection relationship between a function's graph and its inverse's graph.
4. **General-versus-sample discrimination:** explicitly distinguishes a general algebraic verification from a single numerical spot-check.
5. **Transfer:** applies inverse-function reasoning to a real-world currency-conversion scenario (P76), correctly constructing and verifying the inverse, and correctly refuting an overgeneralized claim that bijectivity never needs checking.

## Tutor Recovery Strategy
If the student accepts a single-number check as proof, require a full symbolic simplification on every fresh inverse-verification task until it becomes standard practice. If the student attempts to invert a non-bijective function directly, work the $x^2$-restricted-to-$x\ge0$ example (or a fresh equivalent) repeatedly until checking bijectivity first is automatic. If the student guesses an axis reflection, work several fresh point-by-point coordinate-swap checks until the $y=x$ relationship is expected rather than surprising.

## Memory Hooks
1. "One number checked proves nothing — the identity has to hold for every input, shown symbolically."
2. "Bijective first, inverse second — restrict the domain if it doesn't hold."
3. "Swap the coordinates, not the axis — the inverse's mirror line is $y=x$."

## Transfer Connections
- **`math.func.bijection`:** the injective-plus-surjective combination this concept's existence claim depends on entirely, and the "exactly one preimage" construction of $f^{-1}$ as a genuine function.
- **`math.trig.inverse-trig`** (cross-link, currently unauthored): the trigonometric functions' own domain-restricted inverses (e.g. $\arcsin$) directly instantiate this concept's domain-restriction requirement for functions that are not naturally bijective on their full domain.
- **`math.alg.logarithm`:** the logarithm is defined as the inverse of the exponential function — a direct, concrete instantiation of this concept's entire theory.

## Cross-Subject Connections
- **Physics and Engineering (unit conversion, reversible processes):** inverse functions directly model reversible physical relationships (converting between units, undoing a transformation) where the "undo" operation must be well-defined and unique.
- **Cryptography (encryption and decryption):** a valid decryption function is precisely the inverse of the encryption function, requiring the encryption function to be genuinely bijective for decryption to be reliably well-defined.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.inverse-functions.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on currency conversion, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 1, MC-2 Type 1, MC-3 Type 6 (independently classified — the Blueprint assigns severity but not a formal birth type).
- Cross-link: `math.trig.inverse-trig` re-verified genuinely unauthored (neither Blueprint nor Educational Brain entry exists, `math.trig` domain 0/25) — confirmed matching the Blueprint's own independence-mode declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.trig.inverse-trig` and `math.alg.logarithm`, both confirmed against the live KG).

## Version History
- **Batch 30** (2026-09-12): initial authoring, part 1 of 4 this batch (with `math.func.graph-of-function`, `math.func.real-valued-function`, `math.func.linear-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1, MC-2 Type 1, MC-3 Type 6).
