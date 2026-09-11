# math.alg.logarithm-properties

## Identity
- **KG ID**: `math.alg.logarithm-properties`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.logarithm` — load-bearing part: every rule this concept teaches is derived DIRECTLY
    from that concept's own inverse-of-exponentiation definition, applied to an already-known
    exponent law — this concept invents no new machinery, it translates.
- **Unlocks**: `math.alg.logarithmic-equations`
- **Cross-links**: none declared in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (MAMR = ⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.logarithm-properties.md` (reused by
  reference throughout)
- **KG note**: the KG description states all three identities precisely — $\log(xy)=\log x+\log y$;
  $\log(x/y)=\log x-\log y$; $\log(x^r)=r\log x$ — "enabling algebraic manipulation of logarithmic
  expressions," matching the Blueprint's own LO1/LO2/LO3 split exactly. The KG's own `unlocks`
  field (`math.alg.logarithmic-equations`) names this concept's direct next step in the campaign's
  logarithm-family unblocking chain — see Curriculum Feedback below for a genuine discrepancy
  between this field and the Blueprint's own Component 7.

## Learning Objective
- The learner can derive the PRODUCT RULE $\log_a(xy)=\log_ax+\log_ay$ directly from
  `math.alg.logarithm`'s own inverse-of-exponentiation definition — recognizing it as inherited
  from the exponent LAW $a^{m+n}=a^m\cdot a^n$, not an independently memorized fact.
- The learner can derive the QUOTIENT RULE $\log_a(x/y)=\log_ax-\log_ay$ and the POWER RULE
  $\log_a(x^r)=r\log_ax$ by the SAME method — translating exponent laws into logarithm statements
  — and apply all three rules together to simplify a multi-term logarithmic expression.
- The learner can recognize, at orientation level, that these three rules let logarithmic
  expressions be manipulated ALGEBRAICALLY (expanding, combining, simplifying) much like
  polynomial expressions, previewing that a change-of-base formula exists to convert between
  different log bases.

## Core Understanding
Every logarithm rule is an EXPONENT LAW, TRANSLATED — this is the single organizing idea behind
all three rules taught here. Since $\log_a(x)$ is DEFINED as the exponent $e$ such that $a^e=x$,
any true statement about exponents translates directly into a true statement about logarithms. The
exponent law $a^{m+n}=a^m\cdot a^n$ translates, by setting $x=a^m$ and $y=a^n$ (so
$m=\log_ax$, $n=\log_ay$), into $\log_a(xy)=\log_ax+\log_ay$ — the PRODUCT RULE is not a new fact
requiring separate memorization; it is the SAME exponent law, viewed through the logarithm's
defining inverse relationship.

The quotient and power rules follow the IDENTICAL pattern: $a^{m-n}=a^m/a^n$ translates into
$\log_a(x/y)=\log_ax-\log_ay$ (the quotient rule), and $a^{rm}=(a^m)^r$ translates into
$\log_a(x^r)=r\log_ax$ (the power rule) — by the exact same substitution logic used for the
product rule. All three rules are ONE single translation principle (exponent laws $\leftrightarrow$
logarithm rules), applied to the three basic exponent laws (sum, difference, scalar multiple of
exponents) — not three unrelated facts to be separately learned.

Once all three rules are established, logarithmic expressions can be expanded, combined, and
simplified using algebra-like moves — e.g. $\log_a\left(\frac{x^2y}{z^3}\right)=2\log_ax+\log_ay-
3\log_az$ — treating logs of products/quotients/powers as "distributing" much like exponents
distribute over multiplication. A change-of-base formula (converting $\log_a$ into $\log_b$ for a
different base $b$) exists to complete this toolkit, deferred beyond this concept's core scope. A
critical boundary of these rules, easy to overstep: they apply ONLY when the logarithm's argument
is itself a product, quotient, or power — a SUM inside the logarithm has no corresponding
simplification rule at all.

## Mental Models
1. **Beginner — the product, quotient, and power rules are three separate formulas to memorize,
   with no clear connection to anything already known.** *Upgrade trigger*: being asked to derive
   the product rule starting from an already-known exponent law, rather than being given the rule
   directly — revealing whether the connection to exponent laws is available, or the rule feels
   arbitrary. *Shelf life*: brief once the exponent-law-translation derivation is demonstrated
   concretely.
2. **Intermediate — correctly applies all three rules to simplify expressions, but treats each as
   an independently memorized technique rather than recognizing the SAME underlying translation
   principle applied three times.** This model handles standard practice problems correctly but
   cannot generalize the DERIVATION method to a novel exponent law. *Upgrade trigger*: being asked
   to derive a FOURTH rule (e.g. from a less commonly stated exponent law) using the same method
   — revealing whether the general principle, or three separately memorized results, is what's
   actually held. *Shelf life*: persists until directly confronted with this generalization
   demand, since ordinary practice sets rarely require re-deriving a known rule.
3. **Advanced — reliably applies all three rules correctly, recognizes them as one translation
   principle applied three times, and correctly refuses to apply any rule to a SUM inside a
   logarithm.** *Upgrade trigger*: the Blueprint's own P76 transfer probe (the Richter scale
   formula, requiring the quotient rule applied to a real formula, and a diagnosis of the false
   claim that doubling intensity roughly doubles magnitude) — testing whether the rules and their
   BOUNDARIES both transfer to a genuinely applied, non-textbook context. *Shelf life*: durable
   once the translation principle, not three separate memorized rules, governs application.
4. **Expert — recognizes that the product/quotient/power rules exhaust exactly the arithmetic
   operations exponents obey (addition, subtraction, scalar multiplication of exponents), and
   anticipates that NO comparable rule exists for logarithms of sums, because exponents have no
   simple law for $a^m+a^n$ in the first place — the absence of a sum rule is not an oversight but
   a direct consequence of there being no corresponding exponent law to translate.** *Shelf life*:
   permanent, and this framing makes MC-3's boundary a logical NECESSITY rather than an arbitrary
   restriction to memorize.

## Why Students Fail
The single most frequent failure, ranked foundational per the Blueprint's own registry, is MC-1:
believing the product rule is an independent fact requiring separate memorization, missing that it
is the exponent law $a^m\cdot a^n=a^{m+n}$, translated via the logarithm's own inverse
relationship — a learner with this misconception can apply the rule correctly while treating it as
an arbitrary formula rather than a derived consequence. The second failure, ranked high, is MC-2:
believing the product, quotient, and power rules are three genuinely different techniques, each
requiring its own separate derivation method, missing that all three follow from the SAME
exponent-law-translation principle — this misconception survives even correct application of all
three rules, since the connection between them is invisible unless explicitly sought. The third
failure, MC-3 (moderate), is believing $\log_a(x+y)=\log_ax+\log_ay$ the same way the product rule
splits $\log_a(xy)$ — a natural but incorrect extension of the product rule's PATTERN (splitting a
logarithm into two) applied to the wrong structural case (a sum instead of a product).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — PRODUCT-RULE-ASSUMED-INDEPENDENT-FACT** (foundational)
  - **Birth type**: Type 5, instruction-induced — the product rule is frequently STATED and
    practiced as a standalone formula, with the derivation from exponent laws often omitted or
    treated as optional, so the rule is absorbed as an arbitrary fact rather than a derived
    consequence.
  - **Characteristic phrase**: correctly applying $\log_a(xy)=\log_ax+\log_ay$ but describing it
    as "just a rule you have to memorize," with no connection to exponent laws.
  - **Detection probe** (verbatim, Blueprint): ask whether the product rule requires its own
    separate memorization, unconnected to exponent laws — a "yes" answer confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-walk Example 1's exponent-to-logarithm
    translation, re-anchoring on "the product rule IS the exponent law $a^m\cdot a^n=a^{m+n}$,
    translated."
  - **Verification of death**: asked to derive the product rule from scratch, the learner performs
    the exponent-law substitution unprompted, rather than reciting the rule as a given fact.

- **MC-2 — THREE-RULES-ASSUMED-UNRELATED-TECHNIQUES** (high)
  - **Birth type**: Type 1, overgeneralization — each rule is first encountered and practiced as
    its own labeled technique ("the product rule," "the quotient rule," "the power rule"),
    reinforcing a mental filing system of three separate tools rather than one principle applied
    three times.
  - **Characteristic phrase**: describing the product, quotient, and power rules as "three
    different techniques, each with its own logic."
  - **Detection probe** (verbatim, Blueprint): ask whether the product, quotient, and power rules
    are three genuinely different techniques, each requiring its own separate derivation method —
    a "yes" answer confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-walk Example 2's parallel derivations,
    re-anchoring on "one translation principle, applied to three different exponent laws."
  - **Verification of death**: asked to derive a novel logarithm identity from an unfamiliar
    exponent law, the learner applies the SAME translation method used for the three known rules,
    unprompted.

- **MC-3 — LOG-OF-SUM-ASSUMED-TO-SPLIT-LIKE-PRODUCT** (moderate)
  - **Birth type**: Type 1, overgeneralization — the product rule's PATTERN (a logarithm of a
    combined quantity splits into a sum of two logarithms) over-generalizes from products
    specifically to sums generally, since both "look like" combining two quantities inside the
    logarithm.
  - **Characteristic phrase**: writing $\log_a(x+y)=\log_ax+\log_ay$.
  - **Detection probe** (verbatim, Blueprint): ask whether $\log_a(x+y)=\log_ax+\log_ay$, the same
    way $\log_a(xy)$ does — a "yes" answer confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-walk Example 3's numeric counterexample,
    re-anchoring on "the product/quotient/power rules apply only to products/quotients/powers
    inside the log, never to sums."
  - **Verification of death**: given a logarithm of a sum, the learner states unprompted that no
    simplification rule applies, without attempting to split it.

## Analogies
- **A universal translator, not three separate phrasebooks.** The exponent-law-to-logarithm-rule
  translation is like a single universal translator that can convert ANY statement from "exponent
  language" into "logarithm language" — the product, quotient, and power rules are just three
  SENTENCES it has already translated (sum, difference, and scalar-multiple exponent statements),
  not three separately programmed phrasebooks. *Where it holds*: the "one general tool, applied to
  three specific inputs" structure, directly targeting MC-2. *Where it breaks*: a translator
  metaphor doesn't itself convey WHY no translation exists for "logarithm of a sum" — that absence
  must be taught via the Expert mental model's structural argument (no corresponding exponent
  law exists), not inferred from the translator picture.
- **Distributing over multiplication, never over addition.** Just as $2(x+y)=2x+2y$ (multiplication
  DOES distribute over addition) but there's no comparable rule for, say, $2^{(x+y)}$ splitting
  into $2^x+2^y$ (it doesn't — exponentiation doesn't distribute over addition inside the
  exponent), logarithm rules apply to products/quotients/powers INSIDE the log, never to sums.
  *Where it holds*: a directly parallel "this operation distributes over THIS structure, not
  THAT one" caution, targeting MC-3. *Where it breaks*: this analogy risks conflating two
  DIFFERENT distribution failures (multiplication over addition works; exponentiation over
  addition doesn't) — it must be paired with the concrete numeric counterexample (Example 3), not
  left as a bare structural warning.

## Demonstrations
1. **Deriving the product rule via exponent laws, directly confronting MC-1.** Derive
   $\log_2(4\cdot8)=\log_24+\log_28$: let $m=\log_24=2$ (since $2^2=4$) and $n=\log_28=3$ (since
   $2^3=8$). Then $4\cdot8=2^2\cdot2^3=2^{2+3}=2^5=32$, so $\log_2(4\cdot8)=\log_2(32)=5=2+3=
   \log_24+\log_28$ ✓ — the product rule fell directly out of the exponent law, applied to this
   specific case.
2. **Quotient and power rules by the SAME method, directly confronting MC-2.** Derive
   $\log_2(16/2)=\log_216-\log_22$: $16/2=2^4/2^1=2^{4-1}=2^3=8$, so
   $\log_2(16/2)=\log_2(8)=3=4-1=\log_216-\log_22$ ✓ (quotient rule). Derive
   $\log_2(4^3)=3\log_24$: $4^3=(2^2)^3=2^6=64$, so $\log_2(4^3)=\log_2(64)=6=3\times2=3\log_24$ ✓
   (power rule). Combining all three: $\log_2\left(\frac{16\cdot4^3}{8}\right)=\log_216+
   3\log_24-\log_28=4+3(2)-3=7$ — check directly: $\frac{16\cdot64}{8}=128=2^7$ ✓.
3. **The boundary — sums do NOT split, directly confronting MC-3.** Contrast Example 2's genuine
   product/quotient/power structure (which DOES expand) against the false claim
   $\log_a(x+y)=\log_ax+\log_ay$: checking numerically, $\log_2(4+4)=\log_2(8)=3$, while
   $\log_24+\log_24=2+2=4\ne3$ — a genuine mismatch, proving no such rule exists for sums.

## Discovery Questions
- "You know $a^m\cdot a^n=a^{m+n}$. If $m=\log_ax$ and $n=\log_ay$, what does that already-known
  exponent law tell you about $\log_a(xy)$?" — surfaces LO1 as a genuine derivation, not a stated
  fact.
- "You derived the product rule one way. Can you derive the quotient rule using the exact same
  method, starting from $a^{m-n}=a^m/a^n$?" — surfaces MC-2 by testing whether the method
  generalizes in the learner's own hands.
- "Compute $\log_2(4+4)$ directly. Now compute $\log_24+\log_24$. Do they match?" — surfaces MC-3
  by inviting a direct numeric confrontation with the boundary.

## Teaching Sequence
1. **Anchor**: connect explicitly to `math.alg.logarithm`'s already-secured inverse-of-
   exponentiation definition — state plainly that every rule taught here is a TRANSLATION of an
   already-known exponent law, not new machinery.
2. **Derive the product rule concretely** (Demonstration 1), directly pre-empting MC-1, using the
   Blueprint's own CPA entry (numeric verification on a specific base/argument pair before naming
   the general rule).
3. **Derive the quotient and power rules by the identical method** (Demonstration 2), directly
   pre-empting MC-2, explicitly naming the shared translation principle at each step rather than
   presenting three separate derivations.
4. **Confront the sum boundary directly** (Demonstration 3), directly pre-empting MC-3, using the
   Blueprint's own deliberate choice of a concrete numeric counterexample (chosen because this
   misconception is "persistent, evidence-resistant" per the Blueprint's own Teaching Notes).
5. **Practice mixed problems** deliberately requiring all three rules combined, a novel-rule
   derivation, and correct refusal to simplify a logarithm of a sum, without prompting which is
   needed.
6. **Bridge forward**: name explicitly that `math.alg.logarithmic-equations` (this concept's
   KG-declared unlock) builds directly on these three rules to solve equations involving
   logarithms, and that a change-of-base formula (previewed at orientation level, LO3) will
   complete the algebraic toolkit.

## Tutor Actions
- Before accepting any of the three rules as a stated fact, ask "which exponent law does this come
  from?" — targeting MC-1 directly.
- Before accepting a derivation of an unfamiliar logarithm identity, ask "can you use the same
  method you used for the product rule?" — targeting MC-2 directly.
- Before accepting a simplification of a logarithm's argument, ask "is that argument a product,
  quotient, or power — or is it a SUM?" — targeting MC-3 directly, as the first check on any new
  expression.
- Never let $\log_a(x+y)$ be simplified as if it were $\log_a(xy)$ — this is the single most
  consequential boundary this concept exists to establish.

## Voice Teaching Notes
- When stating any rule aloud, immediately follow it with its exponent-law source: "product rule —
  because $a^m$ times $a^n$ adds the exponents" — targeting MC-1.
- When moving between rules aloud, name the shared method explicitly: "same trick again — just a
  different exponent law this time" — targeting MC-2.
- When encountering a logarithm's argument aloud, always classify it first: "product, quotient,
  power... or none of those?" — targeting MC-3.

## Assessment Signals
- **Correct + fast + derives any of the three rules from exponent laws unprompted, applies all
  three fluently in combination, correctly refuses to simplify a logarithm of a sum** → MASTERED.
- **States a rule correctly but cannot derive it from an exponent law** → MC-1 active; needs the
  translation-derivation repair.
- **Cannot generalize the derivation method to an unfamiliar rule** → MC-2 active; needs the
  shared-principle repair.
- **Attempts to split a logarithm of a sum** → MC-3 active; needs the numeric-counterexample
  repair.
- **Cannot evaluate the logarithm function itself, or cannot state its inverse-of-exponentiation
  definition** → prerequisite gap in `math.alg.logarithm`, not specific to this concept's own
  content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 corrected and reacts with "but I already knew the rule, why does it
matter where it comes from?" — validate this directly: knowing and correctly applying the rule is
genuinely useful and not wrong. Frame the correction as "you already have the tool — this just
shows you WHY it works, so you can trust it in situations you haven't memorized yet, like deriving
a rule you've never seen before," not as a correction of a working skill. If MC-3 persists after
one correction, avoid re-stating the boundary abstractly again — instead have the learner compute
BOTH sides of a NEW sum-inside-log case themselves (not the one already worked), so the mismatch
becomes something they discovered, not an assertion to accept on authority.

## Memory Hooks
- "Every log rule is an exponent law in disguise — find the exponent law first." — directly
  targeting MC-1.
- "One translation trick, three exponent laws — not three separate rules." — directly targeting
  MC-2.
- "Products, quotients, powers split. Sums never do." — directly targeting MC-3.

## Transfer Connections
- **`math.alg.logarithm`** (prerequisite, reused): supplies the inverse-of-exponentiation
  definition every rule in this concept is directly derived from.
- **`math.alg.logarithmic-equations`** (KG-declared unlock): builds directly on these three rules
  to solve equations where the unknown appears inside a logarithm.
- **`math.alg.natural-logarithm`** (sibling concept, both requiring `math.alg.logarithm` directly):
  will confirm that these same three rules transfer unchanged to the specific base $e$, since $e$
  is simply one valid choice of base among the general case these rules were derived for.
- **`math.alg.change-of-base`** (a further sibling, previewed at orientation level in LO3): will
  complete the algebraic toolkit begun here, converting between different log bases.

## Cross-Subject Connections
- **Acoustics/seismology** (the Blueprint's own P76 transfer probe): the Richter scale
  ($M=\log_{10}(I/I_0)$) and analogous logarithmic scales (decibels) rely directly on the quotient
  rule to relate ratio-based physical quantities to their logarithmic magnitude representations,
  and the probe's deliberate "doubling intensity roughly doubles magnitude" false claim gives
  MC-3's boundary genuine applied stakes.
- **Computer science**: algorithmic complexity analysis frequently uses logarithm rules to
  simplify expressions involving products of input sizes (e.g. $\log(n\cdot m)=\log n+\log m$),
  directly reusing the product rule established here.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.logarithm-properties.md` — Component 0 (metadata:
  difficulty proficient, bloom apply, mastery_threshold 0.85, estimated_hours 5, requires
  [math.alg.logarithm]); Component 6 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for the product-rule derivation,
  the quotient/power-rule derivations, and the sum-boundary numeric counterexample, reused
  directly in the Demonstrations above); the P76 transfer probe (a Richter-scale scenario
  requiring the quotient rule applied to a real formula and diagnosis of a false doubling claim,
  independence mode) — held in the Blueprint's own mastery-gate item bank, not restated here per
  the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Genuine Blueprint/KG `unlocks` discrepancy found and resolved toward the KG, per established
  convention**: the Blueprint's own Component 7 states "Unlocks: none listed in the KG for this
  concept," but the live KG's `unlocks` field actually lists `math.alg.logarithmic-equations`.
  This entry follows the KG throughout (Identity section above states the KG's actual value) — the
  Blueprint's Component 0 metadata table itself does not list an `unlocks` row at all, consistent
  with the Component 7 omission, suggesting this was a genuine authoring gap in the Blueprint
  rather than a considered "no unlocks" determination. Not fixed (no Blueprint file modified by
  this program), recorded as a standing note.
- No genuine content-overlap was found between this Blueprint and any already-authored mathematics
  sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 17 / math.alg-unblocking cross-domain excursion, final
  math.disc-dependent concept, part 2 of 3, of the Mathematics Educational Brain completion
  campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
