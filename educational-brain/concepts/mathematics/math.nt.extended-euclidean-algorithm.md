# math.nt.extended-euclidean-algorithm

## Identity
- **KG ID**: `math.nt.extended-euclidean-algorithm`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.euclidean-algorithm`
- **Unlocks**: `math.nt.modular-inverse`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.extended-euclidean-algorithm.md` (reused by reference throughout this entry).

## Learning Objective
The student will state that the Extended Euclidean Algorithm answers a strictly harder question than the ordinary algorithm — finding integers x,y with ax+by=gcd(a,b), not just the gcd value — execute the backward-substitution procedure through an already-computed sequence of division steps to find such x,y, and recognize that the resulting (x,y) pair is one valid solution among infinitely many, not a uniquely determined answer.

## Core Understanding
Per the Blueprint's Component 3: the ordinary Euclidean Algorithm answers "what is gcd(a,b)?" — the Extended version answers the strictly harder question "what is gcd(a,b), AND what specific integers x,y satisfy ax+by=gcd(a,b)?" (Bézout's identity). The gcd value itself is unchanged; the extension adds genuinely new information (the coefficients) on top of what the ordinary algorithm already computes. The method: take the SAME sequence of division equations the ordinary algorithm already produced, then work backward — starting from the second-to-last equation (which expresses gcd(a,b) as a combination of the two previous remainders), substituting the previous equation's remainder back in, repeating until only the original a and b remain, at which point their coefficients are exactly x and y. Critically, this (x,y) pair is NOT unique — given one solution (x0,y0), every pair (x0+k·b/gcd(a,b), y0−k·a/gcd(a,b)) for any integer k is also valid — the back-substitution process happens to produce one specific such pair among infinitely many.

## Mental Models
1. **The strictly-more-information model** (Blueprint TA-A01): the extended algorithm doesn't recompute the gcd differently — it computes the SAME gcd, plus genuinely new coefficient information layered on top.
2. **The reverse-playback model** (Blueprint TA-A02): the backward substitution is literally the forward division sequence played in reverse, each step substituting the immediately-preceding equation's remainder back into the current expression.
3. **The one-of-infinitely-many model** (Blueprint TA-A03): the (x,y) pair produced is A solution, analogous to picking one point on an infinite line of solutions — not THE solution.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is assuming the (x,y) pair the algorithm outputs is uniquely determined, missing that infinitely many other valid pairs satisfy the same equation. A second failure is substituting the division equations in the wrong order or substituting the wrong remainder at a given step, producing an incorrect final coefficient pair — this stems from the backward pass reversing the natural forward-reading direction of the original division steps. A third failure is running only the ordinary algorithm (finding just the gcd) when asked for the extended version, missing that the coefficients are the entire additional point of doing the extension at all.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — EXTENDED-ALGORITHM-OUTPUT-ASSUMED-UNIQUE** (FOUNDATIONAL)
  - **Blueprint description**: believing the specific (x,y) pair produced is the unique solution to ax+by=gcd(a,b), missing that infinitely many other valid pairs exist.
  - **Birth type**: Type 1, overgeneralization — from the ordinary Euclidean Algorithm's own experience, where the gcd output IS unique, students carry that same uniqueness expectation onto the extended algorithm's coefficient output, where it no longer holds.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking Example 3's direct construction of a second, genuinely different valid pair for the same equation, re-anchoring on "the algorithm finds A solution, not THE solution."

- **MC-2 — BACKWARD-SUBSTITUTION-DIRECTION-CONFUSED** (see Blueprint Component 6)
  - **Blueprint description**: substituting the division equations in the wrong order (forward instead of backward), or substituting the wrong remainder at a given step, producing an incorrect coefficient pair.
  - **Birth type**: Type 4, notation-induced — the division equations are naturally read and written forward (top to bottom), and no visual cue distinguishes "read this sequence in reverse" from the default forward-reading habit.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking Examples 1/2's explicit step-by-step narration, re-anchoring on "start from the second-to-last division equation, then work toward the first — never the other direction."

- **MC-3 — EXTENDED-ALGORITHM-CONFLATED-WITH-JUST-FINDING-GCD** (see Blueprint Component 6)
  - **Blueprint description**: running only the ordinary Euclidean Algorithm when asked for the extended version, missing that the coefficients x,y are the entire additional point of the extension.
  - **Birth type**: Type 3, language contamination — the name "Extended Euclidean Algorithm" contains "Euclidean Algorithm" as a substring, inviting the shortcut of treating it as the same task with a longer name rather than a genuinely additional deliverable.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on "the word EXTENDED means: do everything the ordinary algorithm does, THEN also do the backward pass to get x,y."

## Analogies
- **The strictly-more-information framing** (Blueprint TA-A01): "you already know how to find gcd(a,b); now we ask a bigger question — can you also write that gcd as ax+by for some specific whole numbers x,y?"

## Demonstrations
- The full backward substitution for gcd(252,105) (Blueprint Example 1), reusing the ordinary algorithm's own forward-pass numbers verbatim, ending at 21 = 252(−2) + 105(5).
- The explicit reverse-order narration of which equation is substituted at each backward step (Blueprint Example 2), targeting MC-2.
- The construction of a second, different valid solution pair (3,−7) for the same equation 252x+105y=21 (Blueprint Example 3), directly refuting MC-1.

## Discovery Questions
1. "You already know gcd(252,105)=21 — can you also find whole numbers x,y so that 252x+105y=21 exactly?"
2. "If you found one pair (x,y) that works, is it the ONLY pair that works?"
3. "When working backward through the division steps, which equation do you start from — the first one, or the last one before the zero remainder?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (the extended goal — gcd plus coefficients) → TA-A02 (working backward through the division steps, using Examples 1/2) → TA-A03 (non-uniqueness of the solution, via Example 3, MC-1 hook) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — the extended goal framing: same gcd, plus new coefficient information (Blueprint TA-A01).
- **DO: Worked Example** — the full backward substitution for gcd(252,105) (Blueprint Example 1).
- **SHOW: Demonstration** — the explicit reverse-order narration of which equation feeds into which (Blueprint Example 2), targeting MC-2.
- **TEST-THINKING: Error Analysis** — constructing a second valid (x,y) pair for the same equation (Blueprint Example 3), targeting MC-1.

## Voice Teaching Notes
Before accepting a final (x,y) answer, ask "is that the only pair that works, or just one of many?" as a standing verbal check — directly targeting MC-1's uniqueness assumption before it can calcify.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A04 — the cryptography modular-inverse scenario connecting 17x+43y=1 to the congruence 17x≡1(mod 43).
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to explicitly generate a second distinct (x,y) pair from any first pair they find, using the general non-uniqueness formula, before accepting any single answer as final — repeat until producing a second valid pair becomes routine.

## Memory Hooks
- "Extended means: find the gcd, AND find x,y with ax+by=gcd — two deliverables, not one."
- "Work backward through the SAME division steps that found the gcd."
- "Your (x,y) is A solution, not THE solution — infinitely many others exist."

## Transfer Connections
- `math.nt.modular-inverse` (unlocks) computes the modular inverse of a modulo n directly via the x coefficient of ax+ny=1, exactly this concept's output.
- `math.nt.bezout-identity` is the named equation (ax+by=gcd(a,b)) this concept's backward pass solves.

## Cross-Subject Connections
- Computer science / cryptography: the Extended Euclidean Algorithm is the standard method for computing modular inverses, a core primitive in RSA and other public-key cryptosystems.

## Blueprint References
`docs/curriculum/blueprints/math.nt.extended-euclidean-algorithm.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 4.
