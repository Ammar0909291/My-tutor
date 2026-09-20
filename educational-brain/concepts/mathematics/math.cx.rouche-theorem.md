# math.cx.rouche-theorem

## Identity
- **KG id**: `math.cx.rouche-theorem`
- **Domain**: math.cx
- **Requires**: `math.cx.argument-principle`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Recognize the domination condition $|f-g|<|g|$ as required only ON the contour — NEVER inside it;
recognize that in the FTA-via-Rouché derivation, $R$ must be LARGE ENOUGH for the leading term to
dominate — NEVER that any radius works; and recognize the conclusion as EQUAL ZERO COUNTS —
NEVER equal zero locations.

## Core Understanding
THE DOMINATION CONDITION HOLDS ONLY ON THE CONTOUR — NEVER REQUIRED INSIDE IT: for
$f(z)=z^5+3z^3+7$, $g(z)=z^5$, checked on $|z|=2$: $|f(z)-g(z)|=|3z^3+7|\le3\cdot8+7=31<32=
|z|^5=|g(z)|$ — the inequality is verified ONLY at points on the CURVE $|z|=2$, never at interior
points. By Rouché, $f$ has the SAME zero count as $g$ (5, all at $z=0$) inside $|z|=2$. Believing
the domination condition must hold for all $z$ INSIDE the contour $C$ (not just on $C$) is WRONG —
the proof uses continuity of the winding number as a function of $t\in[0,1]$ evaluated ON $C$; the
interior geometry never enters.

FTA VIA ROUCHÉ NEEDS $R$ LARGE ENOUGH FOR THE LEADING TERM TO DOMINATE — NEVER ANY RADIUS: for
$p(z)=a_nz^n+\cdots+a_0$, $g(z)=a_nz^n$: on $|z|=R$, $|p-g|\le|a_{n-1}|R^{n-1}+\cdots+|a_0|$ while
$|g|=|a_n|R^n$. For LARGE $R$, the degree-$n$ growth of $|g|$ eventually outpaces the lower-degree
sum — but for a SMALL $R$ (e.g., $R=0.01$ for $p(z)=z^5+2z^3+z-6$), the CONSTANT term $-6$
dominates instead, and the domination check with $g=a_nz^n$ FAILS. Believing any choice of circle
radius $R$ makes the domination condition hold in the FTA-via-Rouché proof is WRONG — $R$ must be
large enough specifically for the leading monomial to dominate every lower-order term; for small
$R$, a different choice of $g$ is needed entirely.

ROUCHÉ GIVES EQUAL ZERO COUNTS — NEVER EQUAL ZERO LOCATIONS: for $f(z)=z^5+3z^3+7$ and
$g(z)=z^5$ inside $|z|=2$: $f$'s 5 zeros are spread across the complex plane at genuinely
different points, while $g$'s 5 zeros are ALL located at $z=0$ — yet Rouché correctly concludes
they have the SAME COUNT (5) inside $|z|=2$, saying NOTHING about where those zeros actually sit.
Believing Rouché's theorem concludes $f$ and $g$ have the same zeros (same locations), not just
the same number of zeros, is WRONG — it is purely a COUNTING result; the zero locations of $f$ and
$g$ can be, and typically are, completely different.

## Mental Models
- **"Check the inequality only on the curve you drew — the interior never enters the domination
  check at all."**
- **"'Large enough R' isn't a formality — it's the exact condition making the leading term
  actually win against the lower-order terms on that specific circle."**
- **"Rouché counts, it doesn't locate — f and g can have their zeros scattered in totally
  different places and still tie in count."**

## Why Students Fail

### MC-1: ROUCHE-DOMINATION-MUST-HOLD-INSIDE
- **Surface form**: believes the domination condition must hold for all $z$ inside the contour
  $C$ (not just on $C$), making the theorem harder to apply than necessary.
- **Birth type**: foundational (Blueprint's own declared severity — most complex-analysis theorems
  the learner has seen make interior claims, so a boundary-only hypothesis feels incomplete).
- **Repair**: re-state the hypothesis precisely as "for all $z\in C$" and explain the
  continuity-of-winding-number mechanism that makes this sufficient.

### MC-2: FTA-VIA-ROUCHE-ANY-RADIUS-WORKS
- **Surface form**: believes any choice of circle radius $R$ makes the domination condition hold
  in the FTA-via-Rouché proof, missing that $R$ must be large enough.
- **Birth type**: moderate severity (Blueprint's own declared severity — "for large enough R" is
  an easy phrase to skim past without registering it as load-bearing).
- **Repair**: re-compute the domination check at a small $R$ and show it fails.

### MC-3: ROUCHE-GIVES-SAME-ZERO-LOCATIONS
- **Surface form**: believes Rouché's theorem concludes $f$ and $g$ have the same zeros (same
  locations), missing that the theorem is a counting result.
- **Birth type**: moderate severity (Blueprint's own declared severity — "same number of zeros" is
  easy to round up to "the same zeros").
- **Repair**: re-walk the $z^5+3z^3+7$-versus-$z^5$ scattered-versus-concentrated zero-location
  contrast.

## Misconceptions

### MC-1: ROUCHE-DOMINATION-MUST-HOLD-INSIDE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: FTA-VIA-ROUCHE-ANY-RADIUS-WORKS
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

### MC-3: ROUCHE-GIVES-SAME-ZERO-LOCATIONS
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Rouché is like counting how many people are in two rooms by checking only the doorway traffic
  — you never need to look inside the room itself, and you learn nothing about where in the room
  each person is standing."**
- **Anti-analogy**: "large enough R" isn't decorative caution — pick R too small and the whole
  domination argument can flip to favor a different term entirely.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $z^5+3z^3+7$-versus-$z^5$ boundary-only domination check
  on $|z|=2$.
- **Demonstration 2 (targets MC-2)**: the small-$R$ domination-failure computation for
  $z^5+2z^3+z-6$.
- **Demonstration 3 (targets MC-3)**: the scattered-versus-concentrated zero-location contrast for
  $z^5+3z^3+7$ and $z^5$.

## Discovery Questions
1. "Does the domination condition |f(z)−g(z)| < |g(z)| need to hold for all z inside the contour,
   or only on the contour itself?"
2. "In the FTA proof via Rouché, why is the large-R choice of circle important — what goes wrong
   for small R?"
3. "Does Rouché's theorem conclude that f and g have the same zeros (same locations), or just the
   same number of zeros?"

## Teaching Sequence
1. **Representation shift**: work the boundary-only domination check, isolating MC-1.
2. **Deductive**: work the two-circle annulus-locating technique and the FTA large-$R$ requirement,
   isolating MC-2.
3. **Classify**: work the FTA-as-corollary derivation contrasted with location-versus-count,
   isolating MC-3.
4. **Mastery gate**: require a correct precise statement of the theorem's hypotheses and
   conclusion, a correct zero count via an explicit domination verification, a correct
   single-zero-location proof via Rouché, and a correct application to a parameterized function
   family, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the domination condition checked or required at interior points.
- Never accept "any radius R works" in the FTA-via-Rouché derivation.
- Never accept Rouché's conclusion described as matching zero locations rather than zero counts.

## Voice Teaching Notes
- Say "where exactly do you need to check that inequality — inside, or just on the curve?"
  whenever Rouché's hypothesis is being verified.
- Ask "does that R actually make the leading term win?" whenever the FTA-via-Rouché derivation is
  discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states Rouché's theorem with the boundary-only
  domination hypothesis.
- **Rung 2 (application)**: learner correctly counts a polynomial's zeros inside a given circle by
  choosing a dominant term and verifying domination.
- **Rung 3 (transfer)**: learner correctly locates zeros within an annulus using two different
  circles and dominant-term choices, and explains a robustness guarantee for a perturbed control
  system via Rouché.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the boundary-only hypothesis and its continuity-based justification.
- If MC-2 recurs, re-compute the domination check at a small $R$.
- If MC-3 recurs, re-walk the scattered-versus-concentrated zero-location contrast.

## Memory Hooks
- "Check the inequality only on the curve — never inside."
- "Large enough R makes the leading term win — never any radius."
- "Rouché counts zeros, never locates them."

## Transfer Connections
- `math.cx.argument-principle` (prerequisite, already authored, this campaign): supplies the
  winding-number zero-counting machinery Rouché's continuity-in-$t$ proof directly builds on.

## Cross-Subject Connections
- Control theory: the Nyquist stability criterion's winding-number argument and Rouché-based
  robustness guarantees for perturbed transfer functions directly apply this concept's
  domination-condition technique.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.rouche-theorem.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on the Nyquist stability criterion
  and a robustness guarantee for a perturbed control system via Rouché.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.argument-principle`, unlocks none, cross_links none, expert/apply, mastery_threshold
  0.8, estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 248): authored. First entry this batch. Companion batch concept:
  `math.cx.real-integral-residues`.
