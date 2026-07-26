# math.arith.multiplication-table

## Identity
- **KG ID**: `math.arith.multiplication-table`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.multiplication`
- **Unlocks**: (none in current KG)
- **Related**: `math.arith.mental-multiplication`
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.multiplication-table.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will fluently recall single-digit multiplication facts (1×1 through 12×12, or the locally standard range) from memory, without recomputing them via repeated addition or skip-counting each time, freeing working memory for multi-step arithmetic and algebra.

## Core Understanding
The multiplication table is a memorized lookup layer built ON TOP OF the conceptual understanding of multiplication already established in `math.arith.multiplication` (equal groups, arrays, repeated addition) — it is not a separate skill to be learned by rote in isolation from that meaning. Fluent recall matters because every later arithmetic and algebraic procedure (long multiplication, division, factoring, fraction simplification) assumes single-digit products are retrieved instantly; recomputing them each time imposes a working-memory cost that crowds out the reasoning the later procedure actually requires. The path to fluency runs through meaning-based derivation first (skip-counting, arrays, known-fact-plus-a-little) and rote recall second — automaticity is the end state of a well-understood procedure practiced to speed, not a replacement for understanding it.

## Mental Models
1. **The array model**: a×b is the number of dots in an a-row-by-b-column grid; recognizing that the same grid rotated 90° gives b×a directly visualizes the commutative property and helps the "same fact, two orders" idea stick as one memory, not two.
2. **The skip-counting ladder**: each row of the table is a skip-counting sequence (3, 6, 9, 12...) — useful as a fallback derivation method for a forgotten fact, and as the bridge from repeated-addition understanding to fast recall.
3. **The known-fact-plus-a-little model**: any unfamiliar fact can be derived from a nearby well-known one (e.g., 6×7 = 6×6 + 6, or 7×7 − 7) — this is the recommended recovery strategy for a momentarily forgotten fact, rather than restarting from 1.

## Why Students Fail
Failure here is rarely about not understanding what multiplication means — by the time this concept is reached, `math.arith.multiplication` is already a prerequisite. The failure is fluency-layer: facts drilled as isolated flashcards without a fallback derivation strategy leave the student with nothing to do when a fact is forgotten under time pressure, so recall gaps compound into avoidance and anxiety around timed fact tests specifically, independent of actual multiplicative reasoning ability.

## Misconceptions
- **MC-1 — SKIP-COUNTING-SUBSTITUTED-FOR-RECALL** (FOUNDATIONAL)
  - **Statement**: For facts beyond the smallest numbers, the student always falls back to counting up from 1 (e.g., re-deriving 8×7 by counting "8, 16, 24, 32, 40, 48, 56" every single time) rather than developing direct recall, so speed never improves even though accuracy may be fine.
  - **Birth type**: Type 5, instruction-induced — skip-counting is correctly taught as the BRIDGE strategy toward fluency, but if practice never explicitly transitions the student off it (e.g., no timed practice, no explicit "try to just know it" framing), the bridge strategy becomes a permanent crutch rather than a stepping stone.
  - **Diagnostic probe**: Time the student answering a mixed set of facts; a student exhibiting MC-1 will show visibly increasing response time for larger-index facts (a specific "count-up" latency signature) rather than roughly flat response time across all facts, which is the signature of true recall.
  - **Repair approach**: Explicitly teach and practice the known-fact-plus-a-little derivation (Mental Model 3) as a FASTER alternative to full skip-counting for any forgotten fact, then layer timed practice specifically rewarding speed (not just correctness) to motivate the shift from counting to recall, being careful the timing pressure itself doesn't become a new source of anxiety (pair with low-stakes framing).

- **MC-2 — COMMUTATIVE-PAIRS-MEMORIZED-SEPARATELY**
  - **Statement**: The student treats a×b and b×a as two unrelated facts to be memorized independently (e.g., knows 4×7 instantly but hesitates on 7×4 as if encountering it for the first time), roughly doubling the effective memorization load.
  - **Birth type**: Type 1, overgeneralization from initial rote-drill practice that presented facts in a fixed row-by-row order (e.g., always "the 4 times table" listing 4×1, 4×2, 4×3...) without ever explicitly pairing each fact with its commutative partner, so the two entries never got linked into one memory.
  - **Diagnostic probe**: Ask the student for 6×9 immediately followed by 9×6; a delay or hesitation on the second despite instant recall of the first indicates MC-2.
  - **Repair approach**: Explicitly teach and drill using the array-rotation visualization (Mental Model 1) so every fact is introduced alongside its commutative partner as literally "the same picture turned sideways," and restructure practice sets to interleave a fact with its reverse rather than blocking all of one multiplier's row together.

- **MC-3 — NEAR-FACT-CONFUSION**
  - **Statement**: The student confuses a fact with a numerically adjacent one (e.g., answers 7×8 with the value of 7×7, or 6×7 with the value of 6×8), especially under time pressure, because the two facts are stored as similar-but-distinct memory traces that interfere with each other.
  - **Birth type**: Type 2, perceptual intuition — facts that are numerically close "feel" interchangeable to working memory under retrieval pressure, a well-documented general interference effect in rote memorization, not specific to any single instructional choice.
  - **Diagnostic probe**: Present a fact and its two numerically adjacent neighbors (e.g., 7×7, 7×8, 7×9) in quick succession and check whether errors cluster on the neighbor values rather than being randomly distributed across the whole table.
  - **Repair approach**: Use the known-fact-plus-a-little model (Mental Model 3) explicitly as a self-correction check — "if 7×8 feels uncertain, verify it as 7×7 + 7" — which converts an ambiguous rote-interference case into a quick, reliable derivation rather than a guess between two stored traces.

## Analogies
- **Vocabulary-fluency analogy**: knowing a multiplication fact instantly is like knowing a word's meaning without translating it in your head first — the goal is direct retrieval, with the derivation strategies serving the same role dictionary look-up serves for an unfamiliar word: a reliable fallback, not the primary route.

## Demonstrations
- Live side-by-side timing: show the same fact solved via full skip-counting versus via known-fact-plus-a-little versus via instant recall, making the speed differences directly observable to motivate the fluency progression.
- Array-grid manipulatives physically rotated 90° to make the commutative pairing (MC-2's target) visually undeniable.

## Discovery Questions
1. "If you already know 6×6, how could you get 6×7 without starting over from 6×1?"
2. "Is 4×7 the same as 7×4? How do you know, using the array picture?"
3. "Why might 7×8 and 7×7 get mixed up in your head sometimes, even though they're different facts?"

## Teaching Sequence
1. Confirm `math.arith.multiplication`'s conceptual understanding (equal groups / arrays) is solid.
2. Introduce skip-counting as the bridge strategy for each row, using the array model to ground it.
3. Explicitly pair every fact with its commutative partner from the start (never drill a row without its column-equivalents), directly preventing MC-2.
4. Introduce known-fact-plus-a-little as the recommended forgotten-fact recovery strategy, before heavy timed drilling begins.
5. Layer in timed, low-stakes practice specifically to push the transition from skip-counting to recall (targeting MC-1), interleaving near-neighbor facts deliberately to surface and repair MC-3 early rather than let it calcify.
6. Maintain mixed, spaced retrieval practice across the full table going forward (spaced retrieval practice is named as a Universal Teaching Principle-aligned high-value practice mode for rote fact fluency).

## Tutor Actions
- **DO: Drill/Practice** — timed, low-stakes recall practice, interleaved and spaced.
- **SHOW: Demonstration** — array rotation for commutative pairing.
- **TEST-THINKING: Error Analysis** — present a near-fact-confusion error (MC-3) and ask the student to verify it via known-fact-plus-a-little.
- **ORGANIZE: Matching** — match each fact to its commutative partner as a single unit, not two separate cards.

## Voice Teaching Notes
Keep the pace brisk but not punishing during recall drills — brief pauses are fine (wait-time law), but avoid long silences that signal the student is "supposed to" be counting rather than recalling; if a long pause occurs, prompt with the known-fact-plus-a-little bridge ("what's a nearby fact you DO know?") rather than simply re-asking the same question, which would reinforce MC-1's count-from-scratch habit.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (no Blueprint at this KG position for a genuine Tier-1 cross-link). Present a two-digit-by-one-digit multiplication problem (e.g., 34 × 6) and observe whether single-digit sub-facts are retrieved instantly or re-derived — a direct fluency transfer check into `math.arith.multiplication`'s more complex applications.
- **P77 (mastery gate)**: 5/5 correct on a timed mixed-fact set (including at least one commutative-pair check and one near-neighbor pair) with response latency roughly flat across fact difficulty — flat latency, not just correctness, is the actual signature of MC-1 being resolved and should be tracked as its own signal, not inferred from accuracy alone.

## Tutor Recovery Strategy
If timed practice triggers anxiety rather than motivation (a common risk when converting from untimed to timed drilling), immediately drop the timer, return to untimed known-fact-plus-a-little practice until confidence rebuilds, and reintroduce timing gradually and only with the student's buy-in, per the standing rule that register never drops on error and pressure is never used punitively.

## Memory Hooks
- "If you know it close by, don't start from the start — plus a little, minus a little."
- "Same array, turned sideways — a×b and b×a are one fact, not two."

## Transfer Connections
- Long multiplication and long division both assume instant single-digit recall as a subroutine; fluency gaps here directly slow those later procedures.
- Fraction simplification (finding common factors) is faster with fluent multiplication-fact recall for spotting factor pairs.

## Cross-Subject Connections
No direct cross-subject connections identified; this is a pure arithmetic-fluency skill whose primary transfer value is within mathematics itself (enabling faster, lower-load execution of later procedures).

## Blueprint References
None — no Blueprint exists for `math.arith.multiplication-table` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
This concept is deliberately scoped to FACT-RECALL FLUENCY specifically, distinct from `math.arith.multiplication`'s own conceptual-meaning misconceptions and from `math.arith.mental-multiplication`'s (a related-but-not-yet-authored sibling concept covering flexible mental strategies for larger products) broader strategic territory — no overlap intended or found. No KG or Blueprint file was modified in authoring this entry.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 6 part 2.
