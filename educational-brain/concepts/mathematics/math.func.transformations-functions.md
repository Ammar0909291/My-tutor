# math.func.transformations-functions — Transformations of Functions (Canonical Form, Inside-vs-Outside, Order Non-Commutativity)

## Identity
- **KG ID:** `math.func.transformations-functions`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.graph-of-function`
- **Unlocks:** none listed in the KG
- **Cross-links:** none listed in the KG
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.80 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) given a base function $f(x)$ and a transformed form $g(x)=af(b(x-h))+k$, identify each parameter's geometric effect ($a$: vertical stretch/reflect; $b$: horizontal stretch/compress; $h$: horizontal shift; $k$: vertical shift); (2) apply transformations in the correct order to graph $g$ from the graph of $f$, correctly factoring the argument to separate shift from compression; (3) write $g(x)$ given a verbal description of transformations, and invert the process — reading transformation parameters from a given graph.

## Core Understanding
`math.func.graph-of-function` established the graph as the set of $(x,f(x))$ pairs. A transformation systematically relocates every point of that set according to a rule applied inside or outside the function.

INSIDE THE FUNCTION AFFECTS HORIZONTAL; OUTSIDE AFFECTS VERTICAL: in the canonical form $g(x)=af(b(x-h))+k$, the parameters $b$ and $h$ sit INSIDE the function's argument — they affect the $x$-direction (horizontal). The parameters $a$ and $k$ sit OUTSIDE — they affect the $y$-direction (vertical). $a$ stretches/reflects vertically, $k$ shifts vertically; $b$ compresses/stretches horizontally, $h$ shifts horizontally.

HORIZONTAL SHIFT DIRECTION IS OPPOSITE TO THE SIGN INSIDE THE ARGUMENT: for $f(x-h)$, the graph shifts RIGHT by $h$ when $h>0$ — because $x-h=0$ (the "zero" of the argument, where the transformed graph mirrors $f$'s own behavior at $x=0$) occurs at $x=h$, meaning the feature that was at $x=0$ on $f$'s graph now appears at $x=h$ on $g$'s. This is genuinely counter-intuitive: $f(x-3)$ shifts RIGHT (not left), and $f(x+3)$ shifts LEFT (not right) — the direction is opposite to what the sign inside the parentheses naively suggests.

THE ARGUMENT MUST BE FACTORED FIRST TO SEPARATE SHIFT FROM COMPRESSION: a written form like $f(bx-c)$ must be factored as $f(b(x-c/b))$ BEFORE the shift and compression can be read off separately — the true shift is $h=c/b$, NOT $c$. Skipping this factoring step and reading $c$ directly as the shift is a common and serious error.

HORIZONTAL SHIFT AND HORIZONTAL COMPRESSION DO NOT COMMUTE — ORDER MATTERS: applying "shift right 1, then compress by 2" to $f(x)=\sqrt{x}$ gives $\sqrt{2x-1}$ (zero at $x=\frac12$); applying the operations in the OPPOSITE order — "compress by 2, then shift right 1" — gives $\sqrt{2x-2}$ (zero at $x=1$). These are genuinely DIFFERENT functions. The canonical form's structure ($b(x-h)$, factoring out $b$ first) is written precisely to resolve this ambiguity: it specifies compress-then-shift as the standard reading. Vertical transformations (stretch and shift), by contrast, DO commute freely with each other.

## Mental Models
1. **Rung 1 — inside the parentheses moves $x$ (horizontal); outside the parentheses moves $y$ (vertical).** This one rule sorts every parameter into its correct axis.
2. **Rung 2 — the horizontal shift direction is opposite to the sign written inside the argument.** $f(x-h)$ shifts RIGHT; $f(x+h)$ shifts LEFT — always the reverse of intuition.
3. **Rung 3 — factor the argument first to separate the true shift from the compression, and remember that horizontal shift and horizontal compression do not commute.** The canonical form's compress-then-shift ordering exists specifically to remove this ambiguity.

## Why Students Fail
Having learned that a "$-$" sign generally suggests subtraction or leftward movement in ordinary arithmetic, students can read $f(x-h)$ as a shift to the LEFT by $h$, missing that the shift direction inside a function's argument is the OPPOSITE of the naive sign reading — $f(x-3)$ genuinely shifts right. Having noticed that "something inside the parentheses changes $x$," students can then apply $h$ (correctly inside) as a VERTICAL translation and $k$ (correctly outside) as a HORIZONTAL translation, missing that the inside/outside rule maps directly and unambiguously onto horizontal/vertical, with no exceptions. Finally, having successfully applied vertical stretch-then-shift and shift-then-stretch and noticed the results agree (since vertical operations commute), students can generalize that ALL transformations commute in any order, missing that horizontal shift and horizontal compression genuinely do NOT commute — applying them in the wrong order produces a different function entirely.

## Misconceptions

### MC-1: HORIZONTAL-SHIFT-WRONG-DIRECTION
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own classification, independently confirmed
- **Description:** Reading $f(x-h)$ as a shift LEFT by $h$ instead of RIGHT; interpreting $f(x+3)$ as shifting right by 3 instead of left.
- **Why this birth type:** Language contamination: the "$-h$" inside the argument LOOKS like subtraction, which in everyday arithmetic connotes "less" or "leftward," but the actual geometric effect is the opposite — the direction is inverted from what the visible sign suggests.
- **Detection probe:** "Does $g(x)=f(x-3)$ shift the graph of $f$ left or right?" A student with MC-1 answers "left."
- **Repair:** $f(x)=x^2$ has its vertex at $x=0$. $g(x)=(x-3)^2$ has its vertex at $x=3$ — because $x-3=0$ exactly when $x=3$, so the feature that was at $x=0$ on $f$'s graph reappears at $x=3$ on $g$'s. This is a shift RIGHT by 3. Quick rule: inside the function, the shift direction is OPPOSITE to the visible sign: $f(x-h)$ shifts RIGHT by $h$; $f(x+h)$ shifts LEFT by $h$.
- **Verification of death:** Given a transformed function $f(x-h)$ or $f(x+h)$, the student correctly states the shift direction as opposite to the visible sign, verified by finding where the argument equals zero.

### MC-2: HORIZONTAL-AFFECTS-VERTICAL
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Applying $h$ (inside the function) as a vertical translation and $k$ (outside) as a horizontal translation — swapping which parameter controls which axis.
- **Why this birth type:** Overgeneralization: students correctly notice that "something inside the parentheses changes $x$" but then generalize incorrectly about WHICH direction that effect manifests in, confusing the inside/outside rule's target axis.
- **Detection probe:** "In $g(x)=f(x-h)+k$, does $h$ control a horizontal or vertical change? Does $k$?" A student with MC-2 answers the axes backwards.
- **Repair:** The fundamental rule: INSIDE the function's argument (like $x-h$ or $bx$) affects the HORIZONTAL ($x$) direction, because it changes WHAT INPUT is being fed to $f$. OUTSIDE the function (like $+k$ or the multiplier $a$) affects the VERTICAL ($y$) direction, because it modifies the OUTPUT after $f$ has already computed it. $h$ is inside $\Rightarrow$ horizontal; $k$ is outside $\Rightarrow$ vertical — this mapping has no exceptions.
- **Verification of death:** Given any transformation parameter, the student correctly classifies it as horizontal (if inside the argument) or vertical (if outside), with no reversals.

### MC-3: ORDER-INDEPENDENT
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Applying transformations in any order, assuming the final result is the same; not recognizing that horizontal stretch and horizontal shift do not commute.
- **Why this birth type:** Overgeneralization: vertical transformations (stretch and shift) genuinely DO commute with each other, and students extend this commutativity to ALL transformation pairs, including the horizontal shift-and-compression pair, where it fails.
- **Detection probe:** "For $f(x)=\sqrt{x}$: does 'shift right 1, then compress by 2' give the same result as 'compress by 2, then shift right 1'?" A student with MC-3 answers "yes."
- **Repair:** Order A (shift then compress): $f(x-1)=\sqrt{x-1}$, then compress: $f(2x-1)=\sqrt{2x-1}$ — zero at $x=\frac12$. Order B (compress then shift): $f(2x)=\sqrt{2x}$, then shift: $f(2(x-1))=\sqrt{2x-2}$ — zero at $x=1$. These are DIFFERENT functions. The canonical form $g(x)=af(b(x-h))+k$ resolves the ambiguity by always factoring the argument first: $f(bx-c)=f(b(x-c/b))$, giving $h=c/b$ — this specifies the standard compress-then-shift reading.
- **Verification of death:** Given a description involving both a horizontal shift and a horizontal compression, the student correctly identifies that order matters, factors the argument to determine the canonical reading, and does not assume either application order gives the same result.

## Analogies
1. **The mirror-writing analogy (targets MC-1).** Text written in reverse (mirror writing) reads opposite to its visible direction — the eye's naive expectation (reading left to right) is inverted. The horizontal shift inside a function's argument is the same kind of inversion: the visible sign is the opposite of the actual movement.
2. **The steering-wheel-versus-gas-pedal analogy (targets MC-2).** The steering wheel (inside control) changes DIRECTION (horizontal); the gas pedal (outside control) changes SPEED forward/backward along the existing path (a different kind of change entirely). Inside controls one axis; outside controls the other, and they never swap roles.
3. **The put-on-socks-then-shoes analogy (targets MC-3).** Putting on socks then shoes gives a comfortable result; putting on shoes then socks does not work at all — order matters for some sequences of operations, even though other sequences (like putting on a hat then gloves) genuinely don't care about order. Horizontal shift-then-compress is a socks-then-shoes case.

## Demonstrations
### Demonstration 1 — inside/outside and the general canonical form (mirrors Blueprint A01)
For $g(x)=-2f(3(x-1))+4$ built from $f(x)=x^2$: applying transformations in the standard order (horizontal shift by $h=1$, horizontal compress by factor $b=3$, vertical stretch by $|a|=2$, reflect since $a<0$, vertical shift by $k=4$) moves the vertex from $(0,0)$ to $(1,4)$, opening downward with a combined stretch factor.

### Demonstration 2 — the counter-intuitive horizontal shift direction (mirrors Blueprint A02)
$f(x-2)$: the argument $x-2=0$ when $x=2$ — the graph's key feature moves to $x=2$, a shift RIGHT by 2. $f(x+2)$: the argument $x+2=0$ when $x=-2$ — a shift LEFT by 2. For $f(2x)$: the "width" of the graph is compressed inward by a factor of 2; for $f(x/2)$: the graph stretches outward by a factor of 2.

### Demonstration 3 — order matters for horizontal shift and compression (mirrors Blueprint A03)
For $f(x)=\sqrt{x}$: Order A (shift right 1, then compress by 2) gives $\sqrt{2x-1}$, zero at $x=\frac12$. Order B (compress by 2, then shift right 1) gives $\sqrt{2x-2}$, zero at $x=1$. Different functions — confirming that horizontal shift and horizontal compression do NOT commute, unlike vertical stretch and vertical shift, which do.

## Discovery Questions
1. "Does $g(x)=f(x-3)$ shift the graph of $f$ to the left or to the right? Check by finding where the argument $x-3$ equals zero."
2. "In $g(x)=f(x-h)+k$, which parameter — $h$ or $k$ — controls a horizontal change, and which controls a vertical change? Why?"
3. "For $f(x)=\sqrt{x}$: does 'shift right 1, then compress by 2' give the same function as 'compress by 2, then shift right 1'? Work both out and compare."

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — explicit point tracking, taking three key points of $f$ and applying each transformation to plot $g$, graphs shown side-by-side**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's canonical-form vertex tracking for $g(x)=-2f(3(x-1))+4$, posing Discovery Question 1 before confirming the shift direction is opposite to the visible sign.
2. Work Demonstration 2's inside/outside gallery, posing Discovery Question 2 before confirming inside controls horizontal and outside controls vertical, with no exceptions.
3. Work Demonstration 3's order-of-operations contrast for $f(x)=\sqrt{x}$, posing Discovery Question 3 before confirming horizontal shift and compression do not commute.
4. Assess with the P77 problem set and the sinusoidal-form transfer probe (P76, independence mode).

## Tutor Actions
1. **On any horizontal shift claim:** require the student to find where the argument equals zero and verify the shift direction from that, never from the naive sign reading.
2. **On any parameter-classification task:** require the student to state explicitly whether the parameter is inside (horizontal) or outside (vertical) the function, with no exceptions.
3. **On any combined shift-and-compression task:** require the student to factor the argument first to extract the canonical shift and compression values, and to acknowledge that the application order matters.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with the graph-of-a-function concept and develops the full canonical transformation toolkit.
2. **Load-bearing sentence, spoken slowly:** "Inside moves sideways, outside moves up and down — and the sideways direction is always the opposite of what you'd guess."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely work out both orders before confirming they differ.

## Assessment Signals
1. **Gate concept:** correctly identifies each transformation parameter's geometric effect from the canonical form $g(x)=af(b(x-h))+k$.
2. **Direction fluency:** correctly determines horizontal shift direction by finding where the argument equals zero, never by the naive sign reading.
3. **Inside/outside discrimination:** correctly classifies every parameter as horizontal (inside) or vertical (outside), with no reversals.
4. **Factoring fluency:** correctly factors a combined argument like $bx-c$ to extract the true shift $h=c/b$ before applying transformations.
5. **Transfer:** applies the full canonical transformation vocabulary to the sinusoidal form $A\sin(B(x-C))+D$ (P76), deriving the period formula and identifying amplitude, phase shift, and vertical shift.

## Tutor Recovery Strategy
If the student reads the shift direction backwards, require them to find where the argument equals zero on several fresh transformations until the direction check becomes automatic. If the student swaps inside/outside, require them to classify each parameter explicitly as inside or outside before stating its effect, on fresh examples, until no reversals occur. If the student assumes transformations commute freely, require them to work both orders explicitly on fresh shift-and-compress combinations until the non-commutativity is expected rather than surprising.

## Memory Hooks
1. "Inside is sideways, outside is up-down — the axis never changes."
2. "The shift direction is the opposite of the sign you see — always find where the argument is zero."
3. "Factor first, then shift — and remember, shift-then-squeeze isn't the same as squeeze-then-shift."

## Transfer Connections
- **`math.func.graph-of-function`:** the graph as the set of $(x,f(x))$ pairs, which transformations systematically relocate according to the canonical rule.
- **`math.func.periodic-function`:** the sinusoidal form $A\sin(B(x-C))+D$ is a direct, fully worked instance of this concept's entire transformation vocabulary applied to a periodic base function.

## Cross-Subject Connections
- **Physics and engineering (signal processing, waveforms):** amplitude, frequency, and phase-shift adjustments to a signal are directly instances of vertical stretch, horizontal compression, and horizontal shift — the exact parameter vocabulary developed here.
- **Computer graphics (scaling, translating, and reflecting shapes):** rendering pipelines apply the identical operations (translate, scale, reflect) to geometric objects, in a specific, non-commutative order — directly paralleling this concept's order-matters finding.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.transformations-functions.md` — reused by reference throughout (Learning Objectives, worked examples in A01–A03, misconception inventory MC-1–MC-3, transfer probe P76 on the sinusoidal form, mode = independence per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 3, MC-2 Type 1, MC-3 Type 1), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 31** (2026-09-12): initial authoring, part 3 of 4 this batch (with `math.func.zero-of-function`, `math.func.even-odd-functions`, `math.func.periodic-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 3, MC-2 Type 1, MC-3 Type 1).
