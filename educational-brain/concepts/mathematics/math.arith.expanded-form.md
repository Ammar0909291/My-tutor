# Expanded Form — `math.arith.expanded-form`

## Identity

- **Concept ID**: `math.arith.expanded-form` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.place-value` (no children in KG)
- **Prerequisites**: `math.arith.place-value` (the positional system
  this concept's notation makes explicit).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.ones-tens-hundreds`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.9 · **Est. hours**: 2
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.expanded-form.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "expanded notation".

## Learning Objective

The learner can: write any whole number as the sum of the values of
each of its digits multiplied by the corresponding power of 10 (e.g.,
345 = 300 + 40 + 5); correctly include a term for every position, even
when a digit is zero; and correctly distinguish the SUM structure of
expanded form (digit × place value, added together) from a
multiplication of the raw digits themselves.

## Core Understanding

Expanded form is the explicit written notation for `math.arith.
place-value`'s own positional-value computation: a number
d_k…d_1d_0 (digits d_i, place value 10^i) is written as the SUM
d_k×10^k + … + d_1×10^1 + d_0×10^0 — each TERM is itself a
multiplication (digit × place value), but the terms themselves are
ADDED. For 345: 3×100 + 4×10 + 5×1 = 300+40+5 = 345. Every position's
term must be written EXPLICITLY, including when a digit is zero — for
508, the correct expanded form is 5×100 + 0×10 + 8×1, not simply
5×100+8×1 with the zero term silently dropped, since omitting it
obscures which position the remaining digits actually occupy.

## Mental Models

- **Beginner model — "expanded form means writing the digits out in
  some spread-apart way"**: the learner has an intuition that
  "expanded" means "spread out" but has not yet connected this to the
  specific digit×place-value SUM structure, sometimes producing a
  multiplication of the raw digits (3×4×5) or simply writing the
  digits with plus signs between them without the place-value
  multiplier (3+4+5). Shelf-life warning: this model can coexist with
  correctly reading a number aloud, since verbal fluency doesn't
  require correctly decomposing it into positional terms.
- **Intermediate model — "expanded form is a sum of digit×place-value
  terms, and I can write it correctly, but I sometimes drop a
  zero-valued term to make the expression look shorter"**: the learner
  correctly constructs the sum structure but treats a zero term as
  safely omittable, missing that its presence confirms every other
  digit's column assignment. Upgrade trigger: being asked to write
  expanded form for a number with an internal zero and explain why the
  zero term must appear.
- **Advanced model — "expanded form is the SUM of digit × 10^position
  for every position without exception, and this is exactly what
  distinguishes it from a product of digits or an incomplete sum"**:
  the learner reliably writes complete expanded form for any number,
  including those with multiple internal zeros or decimal extensions,
  and can explain why the structure must be additive, not
  multiplicative. Upgrade trigger: being asked to extend expanded form
  to a decimal number, using negative powers of 10 for digits right of
  the decimal point.
- **Do not upgrade early**: a learner who still writes expanded form as
  a product of digits (beginner model, MC-1) should not be pushed
  toward the zero-term completeness rule (intermediate/advanced
  models) before the SUM structure itself is fully secure — MC-1 is
  FOUNDATIONAL, since every other skill in this concept depends on
  correctly recognizing expanded form as additive.

## Why Students Fail

The dominant, FOUNDATIONAL failure writes expanded form as a
multiplication of the raw digits (345 written as 3×4×5, or the visibly
adjacent digit string parsed as a product) rather than a SUM of
digit×place-value terms — the word "expanded" and the visual adjacency
of digits in a numeral both invite a multiplicative reading before the
additive structure is made explicit. A second failure omits a
zero-valued term when writing expanded form (508 written as 5×100+8×1,
dropping the 0×10 term), not recognizing that the zero term's presence
confirms which position the remaining digits occupy, exactly the same
zero-omission error `math.arith.place-value` itself documents. A third
failure writes the DIGIT itself as the term rather than digit × place
value (345 written as 3+4+5=12, a digit-sum rather than expanded
form), conflating expanded form with an unrelated digit-sum procedure
(such as a divisibility check) that also happens to add the digits of
a number together.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: EXPANDED-FORM-AS-DIGIT-PRODUCT (Foundational; Type 4 — notation-induced)
**Description**: Learner writes expanded form as a multiplication of
the raw digits (345 → 3×4×5) rather than a sum of digit×place-value
terms — the visually adjacent digit string in a written numeral,
combined with the unfamiliar word "expanded," invites a
multiplicative reading of the notation itself.
**Trigger condition**: asked to write expanded form for any multi-digit
number, before the additive template has been explicitly demonstrated.
**Repair target**: state and demonstrate the template explicitly —
[digit]×[power of 10] + [digit]×[power of 10] + … — a SUM, never a
product, with each term itself containing one multiplication.

### MC-2: ZERO-TERM-OMITTED (High; Type 1 — overgeneralization)
**Description**: Learner drops a zero-valued term when writing
expanded form (508 → 5×100+8×1, omitting 0×10) — over-generalizes from
everyday number sense where a zero often "contributes nothing worth
writing," to the specific written notation task, where the zero term's
PRESENCE (not its numeric value) confirms every other digit's
position.
**Trigger condition**: any expanded-form task involving a number with
an internal zero digit.
**Repair target**: demonstrate that 5×100+8×1=508 by arithmetic is
correct as a SUM (5×100+8×1 does equal 508 numerically), but the
WRITTEN FORM without the zero term fails to show which position each
digit occupies — compare against 58 (a genuinely different number) to
show the ambiguity the zero term resolves.

### MC-3: DIGIT-ITSELF-AS-TERM (Moderate; Type 6 — analogy overextension)
**Description**: Learner writes the bare digit as each term rather than
digit × place value (345 → 3+4+5=12), overextending a digit-sum
procedure encountered in a different context (e.g., a divisibility-by-3
check, which does add raw digits) onto expanded form, where each term
must be multiplied by its positional power of 10.
**Trigger condition**: asked to write expanded form shortly after
practicing a digit-sum procedure (such as a divisibility rule) in a
different lesson.
**Repair target**: contrast the two procedures directly — a digit-sum
check adds raw digits (3+4+5=12, used only to test divisibility);
expanded form adds digit×place-value TERMS (300+40+5=345, reconstructing
the original number exactly) — the two produce different results and
serve different purposes.

## Analogies

**Primary — unpacking a shipping label (extending `math.arith.
place-value`'s house-address analogy)**: a shipping label reading
"3 boxes of 100, 4 boxes of 10, 5 single items" unpacks directly into
3×100+4×10+5×1=345 — writing out each box-type's contribution
separately and adding them is exactly what expanded form does for a
written numeral's digits.

**Anti-analogy to retire**: "Expanding a number means spreading its
digits out with operation signs between them." This is too vague to
distinguish MC-1 (product), MC-2 (incomplete sum), and MC-3 (bare
digit sum) from the correct digit×place-value sum — it names no
specific structure at all.

## Demonstrations

**Product-vs-sum contrast (targets MC-1)**: 345 as a product
(3×4×5=60, an unrelated small number) versus 345 as expanded form
(3×100+4×10+5×1=300+40+5=345, correctly reconstructing the original
number) — only the sum form recovers 345 itself.

**Zero-term contrast (targets MC-2)**: 508 written correctly as
5×100+0×10+8×1=508 versus incorrectly omitting the zero term as
5×100+8×1, which — while arithmetically still summing to 508 — fails
to show the digit 8's actual ones-place position the way the complete
form does; compare directly against 58=5×10+8×1, a genuinely different
number, to show why the zero term matters for position-tracking.

**Digit-sum-vs-expanded-form contrast (targets MC-3)**: 345's
digit-sum (3+4+5=12, used for a divisibility check) versus 345's
expanded form (3×100+4×10+5×1=345) — the two procedures share the
surface feature of "adding the digits" but produce entirely different
results for entirely different purposes.

## Discovery Questions

Present the reconstruction check "does 3×4×5 equal 345?" alongside
"does 3×100+4×10+5×1 equal 345?" and ask the learner to compute both —
the learner discovers only the second form reconstructs the original
number, motivating the sum-of-terms structure directly from a
self-checkable arithmetic fact. Recommendation: guided discovery for
the product-vs-sum distinction (directly experiential from computing
both and comparing to 345); direct instruction for the zero-term
completeness rule (MC-2's repair), since the position-ambiguity
argument is not independently rediscoverable without the 508-vs-58
contrast being shown.

## Teaching Sequence

MC-1 (expanded form as digit product) is addressed first, since
recognizing the additive SUM structure is the foundation the
zero-term rule (MC-2) and the digit-sum distinction (MC-3) both
depend on. MC-2 (zero term omitted) is addressed second, via the
508-vs-58 contrast. MC-3 (digit itself as term) is addressed last, as
a narrower confusion with an unrelated procedure rather than a
structural misunderstanding of expanded form itself.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (expanded form as digit product) | WORKED EXAMPLE: product-vs-sum reconstruction contrast (345) | Teaching Actions: SHOW §1 |
| MC-2 active (zero term omitted) | DEMONSTRATION: 508-vs-58 zero-term contrast | Teaching Actions: SHOW §3 |
| MC-3 active (digit itself as term) | WORKED EXAMPLE: digit-sum-vs-expanded-form side-by-side contrast | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: extend expanded form to a decimal number using negative powers of 10 | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "each term is digit TIMES place value, and the terms
are ADDED" explicitly rather than just "expand this number" — naming
both the multiplication within a term and the addition between terms
is load-bearing and directly guards against MC-1 and MC-3.

**Wait-time**: After presenting the 508-vs-58 contrast, give extended
wait-time before revealing why they differ — let the learner locate,
via the place-value chart, exactly which digit shifted position.

**Load-bearing sentences**:
- "Expanded form is a sum — never a product — of digit-times-place-value
  terms."
- "Every position gets a term, even a position with zero in it."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Write 672 in expanded form. Pass: 6×100+7×10+2×1 (=600+70+2), not
6×7×2.

### Gate 2 (MC-2 check)
Write 4,006 in expanded form, ensuring no position is skipped. Pass:
4×1000+0×100+0×10+6×1, all four terms present.

### Gate 3 (MC-3 check)
Given a claim that "345's expanded form is 3+4+5," identify the error
and give the correct expanded form. Pass: correctly identifies the
digit-sum confusion; gives 3×100+4×10+5×1.

### Gate 4 (reconstruction application)
Given the expanded form 7×1000+0×100+2×10+9×1, reconstruct the
original number. Pass: 7,029.

### Transfer probe (independence mode — no cross_links)
Extend expanded form to write 12.34, using negative powers of 10 for
the digits after the decimal point. Pass: 1×10+2×1+3×10⁻¹+4×10⁻²
(=10+2+0.3+0.04), correctly extending the sum structure past the
decimal point.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.9.

## Tutor Recovery Strategy

Likeliest utterance: "I wrote 508 as 5 hundred plus 8 ones, but you're
saying I'm missing something?" — the concept-specific smaller
question: "what happened to the tens position?" directly surfaces MC-2
by pointing the learner at the specific omitted term, converting a
seemingly-complete-looking answer into a locatable gap the learner can
identify and fill themselves.

## Memory Hooks

**Type**: procedural (constructing complete digit×place-value sums,
including zero terms) + declarative (the sum-not-product structure;
the distinction from an unrelated digit-sum procedure). Review form:
fresh expanded-form-writing prompts periodically including a number
with an internal zero, paired with an occasional "is this a product or
a sum?" spot-check to keep MC-1's guard-rail active. Interleaving
partner: `math.arith.place-value` (the positional system this
concept's notation makes explicit).

## Transfer Connections

**Near transfer**:
- `math.arith.ones-tens-hundreds` (per KG `related`; the same
  digit×place-value decomposition applied at the first three
  positions)

**Far transfer**:
- Decimal expanded form (extending the sum structure to negative
  powers of 10, per this entry's own transfer probe)
- Scientific notation (a related but distinct notation also expressing
  a number via powers of 10, useful as a future contrast point)

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.expanded-form.md`
(verified via directory listing before authoring this entry). All
misconceptions, demonstrations, and assessment items above are
authored directly for this Educational Brain entry, not sourced from a
Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.place-value`) and empty `unlocks`/`cross_links` are
consistent with its narrow, notation-focused, terminal-leaf role in
the domain. Its `related` link to `math.arith.ones-tens-hundreds` is a
genuine conceptual connection (both concepts decompose numbers into
positional parts) though not a formal KG prerequisite relationship.
Noted honestly: this concept's misconceptions substantially overlap in
spirit with `math.arith.place-value`'s own MC-2 (expanded-form-as-
multiplication) and MC-3 (zero-placeholder-invisible) — an expected
consequence of `expanded-form` being the dedicated WRITING-TASK
concept for exactly the notation `place-value` first introduces
conceptually; this entry's misconceptions are scoped specifically to
the production task (writing the notation correctly), not
re-derivations of `place-value`'s own conceptual-understanding
misconceptions.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
