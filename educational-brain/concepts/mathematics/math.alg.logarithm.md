# math.alg.logarithm

## Identity
- **KG ID**: `math.alg.logarithm`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.exponential-function` — load-bearing part: the logarithm is defined AS the
    exponential function's inverse ($\log_a(x)=y \iff a^y=x$), and the domain restriction $x>0$ is
    a direct, derived consequence of the exponential function's own always-positive range, already
    secured there — this concept does not introduce a new domain fact, it REUSES one.
- **Unlocks**: `math.alg.logarithmic-equations`
- **Cross-links**: `math.calc.derivative-ln` (verified NOT yet authored via directory listing this
  batch; P76 uses independence mode per the Blueprint's own verification)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 10 — the highest hour estimate encountered so far in this campaign,
  reflecting the extensive notation-conversion fluency practice every downstream
  logarithm-related concept depends on.
- **Blueprint**: `docs/curriculum/blueprints/math.alg.logarithm.md` (reused by reference
  throughout)
- **KG note**: the KG description states the definition precisely — "the inverse of the
  exponential function: $\log_a(x)$ is the exponent to which $a$ must be raised to give $x$;
  defined for $x>0, a>0, a\ne1$" — matching the Blueprint's own LO1/LO2 split exactly. The KG's
  `children` field additionally lists `math.alg.logarithm-properties`, `math.alg.natural-logarithm`,
  and `math.alg.change-of-base` as direct descendants — the remaining three concepts in this
  program's logarithm-family unblocking chain, all still requiring this entry.

## Learning Objective
- The learner can define $\log_a(x)$ as THE EXPONENT to which $a$ must be raised to give $x$ —
  i.e. $\log_a(x)=y \iff a^y=x$ — and convert fluently between logarithmic and exponential
  notation for the same underlying fact.
- The learner can state and apply the logarithm's domain restriction ($x>0$) and explain WHY,
  connecting directly to the already-known fact that $a^y>0$ for every real $y$ — so no exponent
  could ever produce $a^y=x$ for a non-positive $x$.
- The learner can evaluate $\log_a(x)$ directly for values where $x$ is a recognizable power of
  $a$, and correctly distinguish the logarithm (a function taking an exponent as OUTPUT) from the
  exponential function (which takes an exponent as INPUT) — recognizing the two as inverses that
  undo each other.

## Core Understanding
The **logarithm** $\log_a(x)$ is defined as THE EXPONENT to which $a$ must be raised to produce
$x$: formally, $\log_a(x)=y \iff a^y=x$. This is exactly the statement that $\log_a$ is the
INVERSE FUNCTION of $f(x)=a^x$ — where the exponential function takes an exponent as INPUT and
produces a positive number as output, the logarithm takes a positive number as INPUT and produces
the corresponding exponent as output. The two functions are structurally mirror images of each
other, not independently-defined objects that merely happen to relate.

The domain restriction $x>0$ is not an arbitrary convention — it is FORCED by the exponential
function's own already-established range. Since $a^y>0$ for EVERY real exponent $y$ (a direct
consequence of the exponential function's always-positive output, already secured), there is
simply no exponent $y$ that could ever satisfy $a^y=x$ for $x\le0$ — so $\log_a(x)$ is genuinely
undefined for $x\le0$, because no valid answer could possibly exist, not because a rule forbids it.

Evaluating directly asks the question "$a$ to WHAT power gives $x$?" — when $x$ is a recognizable
power of $a$, this is a direct read-off: $\log_2(8)=3$ (since $2^3=8$); $\log_{10}(0.01)=-2$ (since
$10^{-2}=0.01$); $\log_5(1)=0$ (since $5^0=1$, for ANY valid base — a universal fact directly
inherited from the exponential function's own universal $y$-intercept). Because the logarithm and
exponential function are genuine inverses, composing them in either order returns the original
input: $\log_a(a^n)=n$ and $a^{\log_a(n)}=n$ are not two separate facts to memorize, but a single
"inverse functions undo each other" principle applied in two directions.

## Mental Models
1. **Beginner — "$\log_a(x)$" is an unfamiliar symbol representing an operation to be performed
   mechanically (via a calculator button or a memorized procedure), without a clear sense that it
   answers a specific, meaningful QUESTION ("what power gives this?").** *Upgrade trigger*: being
   asked to evaluate a simple case ($\log_2(8)$) by direct reasoning rather than a calculator —
   revealing whether the "what power gives this?" framing has taken hold, or the symbol remains
   an opaque instruction. *Shelf life*: brief once the concrete question-and-answer framing (per
   the Blueprint's own CPA entry) is introduced.
2. **Intermediate — correctly converts between logarithmic and exponential notation and evaluates
   straightforward cases, but treats the domain restriction ($x>0$) as a memorized rule rather
   than a derived consequence, and may attempt to compute a numeric value for $\log_a(x)$ when
   $x\le0$.** *Upgrade trigger*: being asked WHY $\log_2(-8)$ is undefined, rather than simply
   told it is — revealing whether MC-1 is active. *Shelf life*: persists until directly confronted
   with the "is there ANY real $y$ with $a^y=x$?" question for a non-positive $x$.
3. **Advanced — reliably applies the domain restriction with correct reasoning, and recognizes
   $\log_a(a^n)=n$ and $a^{\log_a(n)}=n$ as instances of a single inverse-function principle,
   rather than two separate rules.** *Upgrade trigger*: the Blueprint's own P76 transfer probe (the
   decibel formula, requiring both the domain-restriction reasoning applied to a physical quantity
   and identification of the inverse operation needed to "undo" the formula) — testing whether the
   inverse-function framing genuinely transfers to a novel context. *Shelf life*: durable once the
   inverse-function connection, not two memorized identities, is the basis for these evaluations.
4. **Expert — recognizes the logarithm/exponential pair as one instance of the general
   inverse-function principle already familiar from function composition ($f^{-1}(f(x))=x$), and
   anticipates that EVERY property the logarithm will later be shown to have (the product rule,
   power rule, etc., in `math.alg.logarithm-properties`) is ultimately derivable from this single
   defining inverse relationship rather than a list of independently memorized laws.** *Shelf
   life*: permanent, and this framing is the direct conceptual foundation `math.alg.logarithm-
   properties` and `math.alg.change-of-base` (both KG-declared children of this concept) build on.

## Why Students Fail
The single most consequential failure, ranked foundational per the Blueprint's own registry and
given the most extensive dedicated treatment, is MC-1: believing $\log_a(x)$ for $x\le0$ produces
some (perhaps unusual or negative) numeric answer, rather than recognizing it as genuinely
undefined — the domain restriction is frequently presented as an arbitrary rule to memorize
("logs are only defined for positive numbers") rather than a DERIVED consequence of the exponential
function's own range, which is exactly why this Blueprint deliberately derives it explicitly rather
than stating it as a bare fact. The second failure, MC-2, is treating $\log_a(a^n)=n$ and
$a^{\log_a(n)}=n$ as two unrelated memorized rules, rather than recognizing both as instances of the
single general "inverse functions undo each other" principle — a learner with this misconception
can apply both correctly in familiar contexts but cannot generalize when a novel composition
appears. The third failure, MC-3 (moderate), is misplacing which quantity is the base, which is the
exponent, and which is the argument/result when converting between $\log_a(x)=y$ and $a^y=x$ forms
— a notation-tracking error rather than a conceptual one.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — LOGARITHM-OF-NONPOSITIVE-NUMBER-ASSUMED-COMPUTABLE** (foundational)
  - **Birth type**: Type 5, instruction-induced — the domain restriction "$x>0$" is frequently
    STATED as a rule alongside the logarithm's definition without the specific derivation (from
    the exponential function's always-positive range) being made explicit at the point of first
    introduction, so the restriction is absorbed as an arbitrary fact rather than a forced
    consequence.
  - **Characteristic phrase**: attempting to compute a specific numeric answer for $\log_2(-8)$ or
    $\log_5(0)$, rather than recognizing no real answer exists.
  - **Detection probe** (verbatim, Blueprint): ask a student to evaluate $\log_2(-8)$ or
    $\log_5(0)$ and check whether they attempt a specific numeric answer.
  - **Repair**: Blueprint Repair Action B01 — re-derive from "is there ANY real $y$ with
    $a^y=x$?" — since $a^y>0$ always, checking this directly shows no such $y$ can exist for
    non-positive $x$.
  - **Verification of death**: given a new non-positive argument, the learner immediately
    identifies the logarithm as undefined and explains why using the exponential function's range,
    without attempting a numeric computation.

- **MC-2 — LOGARITHM-EXPONENTIAL-INVERSE-RELATIONSHIP-NOT-RECOGNIZED** (moderate)
  - **Birth type**: Type 1, overgeneralization — $\log_a(a^n)=n$ and $a^{\log_a(n)}=n$ are each
    first encountered and practiced as SEPARATE worked-example patterns, and without an explicit
    connection to the general inverse-function principle, they are memorized as two independent
    facts rather than recognized as a single idea applied in two directions.
  - **Characteristic phrase**: correctly computing $\log_5(5^3)=3$ and $5^{\log_5(9)}=9$ when
    directly prompted with the familiar pattern, but unable to explain WHY both simplify so
    directly, or failing on an unfamiliar variant of the same underlying structure.
  - **Detection probe** (verbatim, Blueprint): ask a student to explain why $\log_a(a^n)=n$,
    checking for a genuine inverse-function explanation versus rote recall.
  - **Repair**: Blueprint Repair Action B02 — connect explicitly to the general inverse-function
    principle already familiar from function composition — $f^{-1}(f(x))=x$ and $f(f^{-1}(x))=x$,
    with $\log_a$ and $a^{(\cdot)}$ as a specific instance.
  - **Verification of death**: given a novel composition of $\log_a$ and $a^{(\cdot)}$, the
    learner simplifies it correctly by invoking the inverse-function principle explicitly, rather
    than searching for a matching memorized pattern.

- **MC-3 — BASE-OF-LOGARITHM-CONFUSED-WITH-BASE-OF-EXPONENTIAL-DEFINITION** (moderate)
  - **Birth type**: Type 4, notation-induced — the notational conversion between $\log_a(x)=y$ and
    $a^y=x$ requires tracking three distinct roles (base, exponent, argument/result) across two
    visually different forms, and the base's position shifts (subscript in log form, main term in
    exponential form) in a way that invites misplacement without a consistent procedure.
  - **Characteristic phrase**: when converting notation, placing the wrong quantity in the base,
    exponent, or argument position.
  - **Detection probe** (verbatim, Blueprint): check a student's notation conversions for
    correctly-placed base, exponent, and argument.
  - **Repair**: Blueprint Repair Action B03 — re-derive using the "what power gives this?"
    question form explicitly for each conversion, rather than applying a memorized template
    mechanically.
  - **Verification of death**: given a new logarithmic or exponential statement, the learner
    converts to the other form correctly and can identify, by name, which quantity plays each of
    the three roles.

## Analogies
- **A cipher and its decoder.** The exponential function $a^x$ is like a cipher machine: feed in
  an exponent (the input), and it outputs an encoded positive number. The logarithm $\log_a(x)$ is
  the DECODER for that exact cipher: feed in the encoded number, and it outputs the original
  exponent. Running a message through the cipher and then its decoder (or vice versa) always
  returns the original message unchanged — exactly the inverse-function relationship. *Where it
  holds*: the "encode then decode returns the original" structure, directly targeting MC-2.
  *Where it breaks*: a cipher's decoder can typically decode ANY encoded message; the logarithm's
  "decoder" only accepts POSITIVE inputs, because the cipher itself (the exponential function)
  only ever PRODUCES positive outputs — the analogy's power is precisely in this restriction
  mirroring the exponential function's range, which must be taught via the explicit domain
  argument, not assumed from the cipher picture alone.
- **A "what power" detective question.** $\log_a(x)$ is literally the answer to the detective
  question "$a$ raised to WHAT power gives $x$?" Some cases have an obvious answer found by
  inspection ($\log_2(8)=3$, since $2^3=8$ is recognizable); others require more work. But the
  QUESTION itself never changes — it's always "what power?" *Where it holds*: grounds the core
  definition concretely and directly supports LO3's direct-evaluation skill. *Where it breaks*:
  the detective-question framing doesn't itself explain WHY some questions ($x\le0$) have no
  answer at all — that requires the separate, explicit domain-restriction argument.

## Demonstrations
1. **Converting between logarithmic and exponential notation, directly supporting LO1.**
   $\log_3(81)=4$ is exactly the same fact as $3^4=81$ — verify: $3^4=3\times3\times3\times3=81$.
   Converting the other direction: $2^5=32$ becomes $\log_2(32)=5$.
2. **The domain restriction, derived rather than stated, directly confronting MC-1.** Is
   $\log_2(-8)$ defined? Ask: "is there ANY real exponent $y$ with $2^y=-8$?" Since $2^y>0$ for
   every real $y$ (already known from the exponential function's range), NO such $y$ exists —
   $\log_2(-8)$ is UNDEFINED, not by an arbitrary rule, but because the equation $2^y=-8$ genuinely
   has no real solution.
3. **The logarithm and exponential function as true inverses, directly confronting MC-2.**
   Compute $\log_5(5^3)$: this asks "5 to what power gives $5^3$?" — obviously 3, so
   $\log_5(5^3)=3$. Compute $5^{\log_5(9)}$: this asks for 5 raised to (the power that gives 9 when
   5 is raised to it) — by definition, that's exactly 9: $5^{\log_5(9)}=9$. Both illustrate the
   same "undoing" relationship, applying $\log_a$ then $a^{(\cdot)}$ (or vice versa) returns the
   original input, exactly as any function composed with its own inverse does.

## Discovery Questions
- "Is $\log_5(-25)$ a large number, a small number, a negative number, or something else
  entirely? Try to find ANY exponent $y$ with $5^y=-25$." — surfaces MC-1 by inviting a search
  that comes up empty, rather than stating the restriction as a rule.
- "You know $\log_2(2^7)=7$ and $2^{\log_2(15)}=15$. Are these two separate facts, or the same
  idea used twice?" — surfaces MC-2 by requiring the learner to articulate the unifying principle.
- "Convert $\log_a(x)=y$ into exponential form. Which letter ends up as the base? Which as the
  exponent?" — surfaces MC-3 by forcing an explicit role-by-role conversion.

## Teaching Sequence
1. **Anchor**: connect explicitly to `math.alg.exponential-function`'s already-secured definition
   and always-positive range — state plainly that the logarithm is defined AS that function's
   inverse, not as an independent new object.
2. **Establish the "what power gives this?" question concretely** (per the Blueprint's own CPA
   entry stage), then formalize into notation and work Demonstration 1's conversion fluency,
   directly supporting LO1.
3. **Pose the domain-restriction question directly and let it go unanswered before revealing why**
   (Demonstration 2), directly pre-empting MC-1 — deliberately letting the learner search
   fruitlessly first, matching the Blueprint's own A01 sequencing.
4. **Establish the inverse-function relationship explicitly** (Demonstration 3), directly
   pre-empting MC-2, connecting BOTH compositions to the single general principle rather than
   teaching them as separate facts.
5. **Practice mixed problems** deliberately requiring notation conversion, domain-restriction
   justification, and inverse-composition simplification to each be produced without prompting
   which is needed, directly building MC-3 fluency through repeated correct role-tracking.
6. **Bridge forward**: name explicitly that `math.alg.logarithmic-equations` (this concept's
   KG-declared unlock) builds directly on this definition and domain awareness to solve equations
   involving logarithms.

## Tutor Actions
- Before accepting a numeric answer for $\log_a(x)$ where $x\le0$, ask "is there ANY exponent
  that could make this true?" — targeting MC-1 directly.
- Before accepting a simplification of $\log_a(a^n)$ or $a^{\log_a(n)}$ as a memorized pattern,
  ask "why does this simplify — what general principle is at work?" — targeting MC-2 directly.
- Before accepting a notation conversion, ask the learner to name, explicitly, which quantity is
  the base, which is the exponent, and which is the argument — targeting MC-3 directly.
- Never let "the domain is $x>0$" stand as an unexplained rule — always connect it back to the
  exponential function's own range.

## Voice Teaching Notes
- When introducing a new logarithm aloud, always phrase it as a question first: "what power gives
  this?" — before touching any formal notation — reinforcing the core definition and pre-empting
  the "opaque symbol" beginner model.
- When discussing the domain restriction aloud, narrate the search-and-fail explicitly: "is there
  ANY power... no, because positive to any power stays positive" — targeting MC-1.
- When simplifying an inverse composition aloud, name the principle before computing: "this is
  just undo-then-redo — same idea, either direction" — targeting MC-2.

## Assessment Signals
- **Correct + fast + converts notation fluently unprompted, justifies the domain restriction from
  the exponential function's range, simplifies inverse compositions via the general principle** →
  MASTERED.
- **Attempts a numeric answer for a non-positive argument** → MC-1 active; needs the
  domain-derivation repair.
- **Cannot explain why an inverse composition simplifies, beyond pattern-matching** → MC-2 active;
  needs the inverse-function-principle repair.
- **Misplaces base/exponent/argument when converting notation** → MC-3 active; needs the
  "what power gives this?" role-tracking repair.
- **Cannot evaluate the exponential function itself, or cannot state its range** → prerequisite
  gap in `math.alg.exponential-function`, not specific to this concept's own content; route back
  accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 corrected and reacts with "but calculators sometimes show an error,
so I thought it might just be a weird kind of number" — validate this directly: the confusion is
reasonable, since many mathematical operations DO have unusual-but-defined extensions (like
negative or fractional exponents). Frame the correction as "this one is genuinely different — it's
not that the answer is unusual, it's that no answer can exist, because of what the exponential
function can and can't produce," not as a correction of a reasonable guess. If MC-2 persists after
one correction, avoid re-stating the inverse-function principle abstractly again — instead have the
learner work through several DIFFERENT bases and exponents in both composition directions
themselves, so the pattern's generality (not just its two specific instances) becomes something
they observe directly.

## Memory Hooks
- "Is there ANY power that works? If not, it's undefined — not unusual, impossible." — directly
  targeting MC-1.
- "Undo then redo, or redo then undo — same idea, either way." — directly targeting MC-2.
- "What power gives this? — say it every time you convert." — directly targeting MC-3.

## Transfer Connections
- **`math.alg.exponential-function`** (prerequisite, reused): supplies the definition this
  concept is the inverse of, and the always-positive range this concept's domain restriction is
  directly derived from.
- **`math.alg.logarithmic-equations`** (KG-declared unlock): builds directly on this concept's
  definition and domain awareness to solve equations where the unknown appears inside a logarithm.
- **`math.alg.logarithm-properties`**, **`math.alg.natural-logarithm`**, **`math.alg.change-of-
  base`** (KG-declared children, not yet authored): the remaining concepts in this program's
  logarithm-family unblocking chain, all requiring this entry's definition and domain-restriction
  reasoning as their own foundation.
- **`math.calc.derivative-ln`** (KG-declared cross-link, not yet authored): a likely future
  derivation of $\frac{d}{dx}\ln(x)=\frac1x$ via implicit differentiation of the inverse
  relationship $e^{\ln x}=x$ — verified absent this batch, P76 independence mode used per the
  Blueprint's own established convention.

## Cross-Subject Connections
- **Acoustics/engineering** (the Blueprint's own P76 transfer probe): the decibel formula
  $L=10\log_{10}(I/I_0)$ requires $I>0$, directly grounding the abstract domain restriction in a
  physical quantity (sound intensity) that genuinely cannot be zero or negative for the formula to
  make sense.
- **Chemistry/earth science**: logarithmic scales (pH, the Richter scale) are among the most
  immediately recognizable real-world applications of the logarithm, each relying on the same
  domain-restriction reasoning this concept establishes.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.logarithm.md` — Component 0 (metadata: difficulty
  proficient, bloom understand, mastery_threshold 0.8, estimated_hours 10, requires
  [math.alg.exponential-function], unlocks [math.alg.logarithmic-equations], cross_links
  [math.calc.derivative-ln]); Component 6 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for notation conversion, the
  domain-restriction derivation, and the inverse-composition simplifications, reused directly in
  the Demonstrations above); the P76 transfer probe (a decibel-formula scenario requiring
  domain-restriction reasoning applied to a physical quantity and identification of the inverse
  operation needed to recover the original intensity, independence mode) — held in the Blueprint's
  own mastery-gate item bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Fulfills a forward-work note**: `math.alg.exponential-function`'s own already-authored entry
  (Batch 15) named this concept as the next topologically-ready `math.alg` candidate it would
  unblock via the KG's own `unlocks` field. This entry confirms that unblocking and, in turn,
  unblocks `math.alg.logarithmic-equations` per this concept's own `unlocks` field.
- **Genuine requires/unlocks asymmetry found, recorded not fixed**: `math.alg.exponential-
  equations`'s own KG `unlocks` field lists `math.alg.logarithm` (as if exponential-equations were
  a prerequisite this concept builds on), yet this concept's own KG `requires` field lists ONLY
  `math.alg.exponential-function` — NOT `math.alg.exponential-equations`. This is a one-directional
  mirror gap in the graph (an `unlocks` claim with no corresponding `requires` entry on the other
  side) — noted here since it directly involves this concept, but not fixed, per this program's
  standing rule against modifying KG files; it does not affect this entry's own authored content,
  since this concept's actual prerequisite (exponential-function) is unaffected either way.
- No genuine content-overlap was found between this Blueprint and any already-authored mathematics
  sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 16 / math.alg-unblocking cross-domain excursion continued,
  part 1 of 3, of the Mathematics Educational Brain completion campaign). Blueprint reused by
  reference in full. No KG or Blueprint file modified.
