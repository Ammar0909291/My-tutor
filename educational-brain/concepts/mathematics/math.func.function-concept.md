# math.func.function-concept

## Identity
- **KG ID**: `math.func.function-concept`
- **Domain**: math.func (Functions) — the FIRST entry authored in this domain by this program,
  reached via a deliberately bounded cross-domain excursion out of `math.alg` (see Curriculum
  Feedback below for the full rationale; also known by KG aliases "mapping," "map," "f: A → B").
- **Requires**:
  - `math.found.function-set-theoretic` — load-bearing part: this concept's own core definition
    ("a rule assigning to each element of a domain set exactly one element of a codomain set") IS
    the informal restatement of that concept's already-secured set-theoretic definition of a
    function as a special kind of relation; this entry's job is building the INFORMAL, multi-
    representation fluency (mapping diagrams, tables, graphs, verbal rules) on top of that already-
    secured formal foundation, not re-deriving the definition itself.
  - `math.found.variable` — load-bearing part: function NOTATION ($f(x)$) requires substituting a
    specific value for the input variable $x$ and evaluating the resulting expression — directly
    reusing variable-substitution machinery already secured there.
- **Unlocks**: `math.func.linear-function`, `math.func.quadratic-function` (both not yet authored)
- **Cross-links**: `math.found.function-set-theoretic` (also listed as a prerequisite — the KG
  records this concept's formal set-theoretic grounding as BOTH a required prerequisite and an
  explicit cross-link, underscoring how central that connection is)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (MAMR = ⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 8 — the highest hour estimate encountered so far in this campaign's
  `math.alg`-adjacent work, reflecting the genuine breadth this concept must cover: multiple
  representations (mapping diagrams, tables, ordered pairs, graphs, verbal rules, formulas), three
  vocabulary distinctions (domain/codomain/range), and four persistent misconceptions.
- **Blueprint**: `docs/curriculum/blueprints/math.func.function-concept.md` (reused by reference
  throughout; a substantially larger, more elaborated document — 1,286 lines, with a full
  diagnostic battery, six student-state protocols, and a five-probe mastery gate — than most
  Blueprints referenced by this program so far, reflecting this concept's own unusually broad
  scope; only the content load-bearing for this entry's sections is reused here, per the Standard's
  ownership boundary, not the Blueprint's full protocol-routing machinery)
- **KG note**: the KG's own description states the definition precisely — "a rule assigning to
  each element of a domain set exactly one element of a codomain set; the central object of modern
  mathematics" — and the Blueprint's own Concept Profile names the three critical properties this
  entry organizes around: (1) every input has an output, (2) each input has exactly one output,
  (3) different inputs MAY share the same output (many-to-one is valid). Property (3) is precisely
  what MC-4 below gets wrong.

## Learning Objective
- The learner can correctly determine whether a relation is a function, given ANY of its common
  representations (mapping diagram, table of values, set of ordered pairs, graph, or verbal rule),
  without privileging one representation over another.
- The learner can correctly identify and distinguish the domain, codomain, and range of a function
  as three genuinely different sets — not treating "codomain" and "range" as synonyms.
- The learner can correctly evaluate $f(a)$ for specific input values using function notation,
  interpreting $f(x)$ as "the output of rule $f$ applied to input $x$," never as $f$ multiplied by
  $x$.
- The learner can correctly distinguish a general function (many-to-one is allowed) from a
  one-to-one function (a strictly stronger, additional requirement), recognizing that "one-to-one"
  names a special CATEGORY of function, not the definition of "function" itself.

## Core Understanding
A **function** is a rule that assigns to each element of a domain set exactly one element of a
codomain set. Three properties define this precisely, and all three matter: (1) EVERY input in the
domain must have SOME output — nothing is left unassigned; (2) each input has EXACTLY ONE output —
no input may produce two different outputs (this is the property a relation like the circle
$x^2+y^2=25$ VIOLATES, since $x=0$ produces both $y=5$ and $y=-5$, making it a relation but not a
function); (3) DIFFERENT inputs MAY share the SAME output — this is explicitly ALLOWED, and a
function where it never happens (every output traces back to a unique input) is given its own
special name, "one-to-one," rather than being the ordinary case.

Because a function is fundamentally a RULE connecting inputs to outputs — not a formula — it can be
expressed through many different representations with equal validity: a mapping diagram (arrows
from domain to codomain elements), a table of input-output pairs, a set of ordered pairs, a graph
(where the vertical line test operationalizes property (2): no vertical line may cross the graph
more than once), a verbal description of the rule, or an algebraic formula. No single representation
is privileged — a function described only in words ("assign each package its correct delivery
address") is exactly as much a function as one given by a formula.

The DOMAIN is the full set of valid inputs. The CODOMAIN is the declared set the outputs are drawn
from (the space of POSSIBLE outputs). The RANGE is the set of outputs the function ACTUALLY
produces (a subset of the codomain, possibly a PROPER subset). These three sets are genuinely
distinct — for $f(x)=x^2$ with codomain $\mathbb{R}$, the range is only $[0,\infty)$, a proper
subset of the codomain, since negative numbers are declared as POSSIBLE outputs but never actually
occur.

## Mental Models
1. **Beginner — a function is essentially a formula you plug numbers into; other representations
   (diagrams, tables, verbal rules) are either not "real" functions or are somehow secondary.**
   *Upgrade trigger*: being presented with a genuine real-world mapping (e.g. "each student is
   assigned exactly one form group") with no formula at all and asked whether it counts —
   revealing whether the definition (a rule assigning one output per input) or the surface form
   (an equation) is what the learner is actually applying. *Shelf life*: brief once a genuine
   non-formula function example is worked through concretely.
2. **Intermediate — correctly recognizes functions across multiple representations, and can
   evaluate function notation correctly, but has not yet cleanly separated the domain/codomain/
   range distinction or the function-versus-one-to-one distinction.** This model handles most
   ordinary classroom problems (where codomain often happens to equal range, and one-to-one-ness
   is rarely tested directly) correctly by coincidence, without the underlying distinctions being
   secure. *Upgrade trigger*: a function whose codomain is genuinely LARGER than its range (like
   $f(x)=x^2$ with codomain $\mathbb{R}$), or a many-to-one function directly challenged as "is
   this really a function, since two inputs share an output?" — revealing whether MC-1 or MC-4 is
   still active beneath surface-level fluency. *Shelf life*: persists until directly confronted
   with exactly these two edge cases, since ordinary practice problems rarely force the
   distinction.
3. **Advanced — reliably distinguishes domain, codomain, and range as three separate sets;
   correctly applies function notation as rule-application, not multiplication; and correctly
   treats many-to-one as a valid, ordinary case rather than a violation.** *Upgrade trigger*: the
   Blueprint's own P76 transfer probe (student → form group) or AB-5 transfer item (book → ISBN),
   requiring the definition to be applied to a genuinely unfamiliar, non-mathematical mapping
   scenario rather than a textbook-formula context. *Shelf life*: durable once the three
   distinctions and the many-to-one allowance are each independently secured rather than inferred
   from typical (coincidentally range-equals-codomain, coincidentally one-to-one) classroom
   examples.
4. **Expert — recognizes a function as a special kind of RELATION (a subset of ordered pairs from
   domain × codomain satisfying the exactly-one-output property), connecting this concept
   seamlessly to `math.found.function-set-theoretic`'s own formal grounding, and can immediately
   classify any given relation — formula, diagram, or otherwise — by checking this single
   set-theoretic property directly, rather than relying on representation-specific heuristics like
   the vertical line test as a memorized procedure.** *Shelf life*: permanent, and this framing is
   the direct foundation `math.func.linear-function` and `math.func.quadratic-function` (this
   concept's KG-declared unlocks) both build on when introducing specific function families.

## Why Students Fail
The Blueprint's own diagnostic battery and repair-chain ordering (MC-3 explicitly gated as
FOUNDATIONAL FOR MC-4 — MC-4's repair requires correctly evaluating $f(2)=4$ and $f(-2)=4$ as a
demonstration, which a learner still confusing $f(x)$ with multiplication cannot execute) establish
a clear dependency among the four failures. The most structurally consequential is MC-3
(f(x)-means-f-times-x): algebra's general convention that juxtaposition means multiplication
($2x=2\times x$) pattern-matches directly onto $f(x)$'s appearance, and function notation departs
from that convention without the departure being explicitly taught, so this error must be resolved
BEFORE MC-4 can even be demonstrated. MC-1 (range and codomain conflated) is reinforced structurally
by ordinary classroom practice: most simple, well-behaved school functions happen to have
range = codomain, so the distinction is rarely forced until a genuinely restrictive codomain (like
$x^2$'s inability to produce negative outputs) is presented. MC-2 (functions must have formulas) is
reinforced by classroom exposure being dominated by algebraic-expression functions, forming the
implicit (and false) rule "function = formula." MC-4 (one-to-one is the definition) arises from the
genuinely symmetric-SOUNDING phrasing of "each input has one output" being misread bidirectionally
as "each output has one input" — an error the very term "one-to-one function" inadvertently
reinforces, since it invites the assumption that "one-to-one" IS what makes something a function,
rather than naming an additional, optional property.

## Misconceptions
Reused by reference from the Blueprint's Section 6 Misconception Engine (MC-1..MC-4), with
birth-type classification added.

- **MC-1 — RANGE-AND-CODOMAIN-CONFLATED** (the Blueprint's registry does not assign a formal
  severity label to this concept's four misconceptions the way `math.alg` Blueprints typically do;
  this entry treats all four as at least moderate, given the Blueprint's own detailed, multi-step
  repair chains for each)
  - **Birth type**: Type 5, instruction-induced — per the Blueprint's own stated root cause,
    school instruction rarely distinguishes "outputs you could get" (codomain) from "outputs you
    actually get" (range), and most simple school functions happen to have range = codomain,
    structurally reinforcing the conflation through repeated (mis)confirming examples.
  - **Characteristic phrase**: stating "range = codomain = $\{2,4,6\}$" or "range = codomain =
    $\mathbb{R}$" when the codomain is declared more broadly than the actual outputs produced.
  - **Detection probe** (verbatim, Blueprint DB-4): given $f:\{1,2,3\}\to\mathbb{N}$ defined by
    $f(x)=2x$, asked for the range, the codomain, and whether they're the same — answering
    "the same" when they genuinely differ confirms MC-1.
  - **Repair**: Blueprint repair chain — present the conflict directly (codomain $\mathbb{R}$,
    range $[0,\infty)$ for $f(x)=x^2$; $-4$ is in the codomain but never in the range), then
    install "Range ⊆ Codomain; Range = Codomain only when every codomain element is actually hit."
  - **Verification of death**: given a function with a genuinely restrictive range, the learner
    states both sets correctly and unprompted, without needing the distinction re-explained.

- **MC-2 — FUNCTIONS-MUST-HAVE-ALGEBRAIC-FORMULAS**
  - **Birth type**: Type 5, instruction-induced — per the Blueprint's own stated root cause,
    classroom exposure is dominated by $f(x)=$ [algebraic expression], forming the implicit rule
    "function = formula" through sheer frequency of exposure to one representation.
  - **Characteristic phrase**: rejecting a mapping diagram, table, or verbal rule as "not a proper
    function" specifically because "there's no equation."
  - **Detection probe** (verbatim, Blueprint DB-2): presented with the verbal rule "I take a
    number, I add 3 — no formula, just the rule," and asked whether that counts as a function,
    answering "only if I can write it as $f(x)=x+3$" confirms MC-2.
  - **Repair**: Blueprint repair chain — present a genuine real-world mapping with no formula at
    all (the delivery-address sorting-machine scenario below), establish that it satisfies the
    definition despite having no formula, then have the learner generate three original non-formula
    functions themselves.
  - **Verification of death**: given a genuinely non-formula scenario, the learner correctly
    identifies it as a function unprompted, citing the "each input, exactly one output" definition
    rather than searching for an equation.

- **MC-3 — F(X)-MEANS-F-MULTIPLIED-BY-X** (FOUNDATIONAL for MC-4 per the Blueprint's own explicit
  MAMR ordering — must be cleared before MC-4 repair can even be demonstrated)
  - **Birth type**: Type 4, notation-induced — per the Blueprint's own stated root cause, algebra's
    general convention that juxtaposition means multiplication ($2x=2\times x$, $3a=3\times a$)
    pattern-matches directly onto the visual form of $f(x)$, and function notation's departure from
    that convention is rarely made explicit.
  - **Characteristic phrase**: writing $f(3)=3f$, or attempting to "solve for $f$" as if it were an
    unknown number, when evaluating function notation.
  - **Detection probe** (verbatim, Blueprint DB-3): given $f(x)=2x+1$ and asked what $f(3)$ equals,
    answering "$f(3)=f\times3=3f$" or "I need to know what $f$ equals" confirms MC-3.
  - **Repair**: Blueprint repair chain — present the direct conflict (if $f(3)=3f$ were true,
    computing $f$ from the actual rule $f(x)=x+2$ leads to a contradiction), then install "$f$ is a
    RULE NAME, not a number; $f(x)$ means 'the output of rule $f$ at input $x$.'"
  - **Verification of death**: given any function-notation expression, the learner evaluates it
    correctly by substitution, with no attempt to "solve for $f$" as an unknown quantity.

- **MC-4 — ONE-TO-ONE-IS-THE-DEFINITION-OF-A-FUNCTION** (MC-3 must be cleared first, per the
  Blueprint's own explicit prerequisite ordering)
  - **Birth type**: Type 3, language contamination — per the Blueprint's own stated root cause, the
    definition "each input has one output" is linguistically symmetric, and students interpret it
    BIDIRECTIONALLY as "each output has one input" as well; the term "one-to-one function" itself
    reinforces the confusion, inviting the assumption that "one-to-one" names what makes something
    a function, rather than an additional, optional property.
  - **Characteristic phrase**: claiming $f(x)=x^2$ is not a function because "the same output
    appears twice" or "$f(2)=f(-2)=4$, so it's not allowed."
  - **Detection probe** (verbatim, Blueprint DB-1/AB-1 item vi): given a table where
    $x=\{1,2,3,4\}$ all map to the same output $f(x)=5$, and asked whether this is a function,
    answering "no" (because outputs repeat) confirms MC-4.
  - **Repair**: Blueprint repair chain — present the direct conflict ($f(3)=9$: does 3 have exactly
    one output? Yes. $f(-3)=9$: does $-3$ have exactly one output? Yes. BOTH inputs individually
    satisfy the definition), then install "function = each INPUT → one output; one-to-one = each
    OUTPUT ← one input; these are ORTHOGONAL requirements," followed by discrimination practice
    sorting examples into a function/not-function × one-to-one/not-one-to-one grid.
  - **Verification of death**: given a genuinely many-to-one function, the learner correctly
    identifies it as a valid function (not one-to-one, but still a function) without hesitation.

## Analogies
- **A post office sorting machine, directly grounding the core definition.** Every package
  (input) that enters the machine is routed to exactly one destination (output), determined by a
  fixed rule (e.g. the address written on it) — the same package, run through the machine again,
  always goes to the same destination. But MULTIPLE different packages can legitimately be routed
  to the SAME destination (many packages, one mailbox) — this is allowed and ordinary, directly
  modeling property (3) and pre-empting MC-4. *Where it holds*: the "fixed rule, one output per
  input, but shared outputs are fine" structure, directly targeting the core definition and MC-4.
  *Where it breaks*: a real sorting machine's rule could, in principle, be inconsistent or broken
  (misrouting the same package differently on different days) — the analogy's power comes
  specifically from stipulating the rule is FIXED, which must be stated explicitly, not assumed
  from the physical scenario alone.
- **A broken machine that assigns a DIFFERENT output to the same input on different days.**
  Contrast the post-office analogy directly: imagine a machine with the rule "pick any number
  bigger than the input" — input 1 produces output 4 on Monday, but output 7 on Tuesday. This is
  NOT a function, because the SAME input (1) produced two DIFFERENT outputs — directly violating
  property (2). *Where it holds*: isolates property (2) precisely by holding property (3) constant
  (this broken machine doesn't even reach the many-to-one question) — a clean, single-variable
  contrast. *Where it breaks*: real machines don't typically behave this unpredictably; the
  analogy's value is specifically in being an obviously invalid, contrived counter-example, not a
  realistic scenario.

## Demonstrations
1. **The function machine, directly grounding the core definition and property (2).** Input cards
   numbered 1, 2, 3; machine rule "add 3"; matching output cards 4, 5, 6. Physically pairing each
   input to its output makes concrete that the SAME rule, applied to the SAME input, always
   produces the SAME output — the rule "leaves no room for choice."
2. **The broken machine, directly confronting property (2) and setting up the not-a-function
   contrast.** Machine rule "pick any number bigger than the input": input 1 gives output 4 on
   Monday, output 7 on Tuesday. Same input, different outputs on different occasions — this
   violates the definition and is explicitly NOT a function, regardless of how reasonable the rule
   "sounds."
3. **Arrow diagrams side by side, directly supporting representation fluency (LO1).** Diagram A:
   domain $\{1,2,3\}$, arrows $1\to4$, $2\to6$, $3\to4$ — a valid function (3 sharing an output
   with 1 is ALLOWED). Diagram B: domain $\{1,2,3\}$, arrows $1\to4$, $1\to7$, $2\to6$, $3\to8$ —
   NOT a function, since input 1 has TWO arrows leaving it, violating property (2). The visual
   test: "does every input node have EXACTLY ONE arrow leaving it?"
4. **Function notation evaluation, directly confronting MC-3.** Given $f(x)=4x-3$: $f(0)=-3$,
   $f(2)=5$, $f(-1)=-7$, $f(1/2)=-1$ — each computed by SUBSTITUTING the input value for $x$ in the
   rule and evaluating, never by treating $f$ as a factor to solve for.
5. **The range-versus-codomain gap, directly confronting MC-1.** $f(x)=x^2$ with declared codomain
   $\mathbb{R}$: the codomain includes every real number, including negatives, but the ACTUAL range
   is only $[0,\infty)$, since $x^2$ never produces a negative value for any real input — the
   codomain is the space of POSSIBLE outputs; the range is what's ACTUALLY produced, and here they
   genuinely differ.

## Discovery Questions
- "Here's a rule with no equation at all: 'I take a number, I add 3.' Is that a function? What
  would you need to call it one?" — surfaces MC-2 by testing whether the definition or the
  presence of a formula is what the learner is actually applying.
- "In this table, four different inputs all give the SAME output. Is that allowed for a function?"
  — surfaces MC-4 directly by confronting the many-to-one case head-on.
- "If $f(x)=2x+1$, what does $f(3)$ mean — is it $f$ times 3, or something else?" — surfaces MC-3
  by inviting the juxtaposition-as-multiplication misreading and requiring the learner to justify
  their interpretation.
- "For $f(x)=x^2$ with codomain the real numbers — can the output ever be $-4$? Is $-4$ still 'in'
  the codomain?" — surfaces MC-1 by forcing the possible-versus-actual distinction into the open.

## Teaching Sequence
1. **Anchor**: connect to `math.found.function-set-theoretic`'s already-secured formal definition
   and `math.found.variable`'s substitution machinery — state plainly that this concept builds
   representational and notational fluency on top of an already-secure formal foundation.
2. **Establish the core definition concretely via the function machine** (Demonstration 1), then
   immediately contrast against the broken machine (Demonstration 2) to make property (2) vivid
   before any formal vocabulary is introduced.
3. **Build representation fluency across mapping diagrams, notation, and graphs** (Demonstration 3
   for diagrams, Demonstration 4 for notation), directly pre-empting MC-2 (by treating non-formula
   representations as equally valid from the start) and MC-3 (by establishing correct evaluation
   before any misconception can take root).
4. **Introduce domain/codomain/range as three distinct sets** (Demonstration 5), directly
   pre-empting MC-1, deliberately using an example where range is a PROPER subset of the codomain
   rather than a coincidentally-matching example.
5. **Confront the many-to-one allowance directly, last** (per the Blueprint's own MAMR ordering,
   since this repair requires correct function-notation evaluation as a prerequisite step),
   directly pre-empting MC-4.
6. **Practice mixed problems** deliberately spanning all four representations, requiring correct
   domain/codomain/range identification, correct notation evaluation, and correct many-to-one
   recognition to each be produced without prompting which is needed.
7. **Bridge forward**: state explicitly that `math.func.linear-function` and
   `math.func.quadratic-function` (this concept's KG-declared unlocks) are the first concrete
   function FAMILIES this general definition and vocabulary will be applied to.

## Tutor Actions
- Before accepting a "not a function" verdict on a table or diagram with repeated outputs, ask
  "does any SINGLE input have more than one output, or is it just that two DIFFERENT inputs share
  an output?" — targeting MC-4 directly.
- Before accepting a rejection of a non-formula scenario as "not a real function," ask "does every
  input get exactly one output under this rule?" — targeting MC-2 directly, regardless of whether
  a formula is present.
- Before accepting any function-notation evaluation, confirm the learner substituted the input
  value INTO the rule, rather than treating $f$ as a number to solve for — targeting MC-3 directly.
- Before accepting "range" and "codomain" used interchangeably, ask "are you describing what COULD
  come out, or what ACTUALLY comes out?" — targeting MC-1 directly.

## Voice Teaching Notes
- When introducing the core definition aloud, emphasize the asymmetry explicitly: "every input —
  ONE output. But an output can come from MORE than one input, and that's just fine" — the audible
  contrast pre-empts MC-4 before it can form.
- When evaluating function notation aloud, narrate the substitution mechanically: "$f$ of 3 means:
  take the rule for $f$, and put 3 in wherever $x$ was" — the audible substitution-not-multiplication
  framing directly targets MC-3.
- When distinguishing range from codomain aloud, use deliberately different words for each every
  single time: "the codomain is what's ALLOWED; the range is what ACTUALLY shows up" — consistent
  wording repetition targets MC-1 by never letting the two terms sound interchangeable.

## Assessment Signals
- **Correct + fast + classifies functions across all representations unprompted, correctly
  distinguishes domain/codomain/range, evaluates notation by substitution, correctly accepts
  many-to-one as valid** → MASTERED.
- **Conflates range and codomain, or states them as always equal** → MC-1 active; needs the
  possible-versus-actual repair.
- **Rejects a valid non-formula function as "not a real function"** → MC-2 active; needs the
  non-formula-example repair.
- **Attempts to treat $f(x)$ as $f$ multiplied by $x$** → MC-3 active; needs the substitution
  repair (must be cleared before any MC-4 repair attempt).
- **Rejects a valid many-to-one function as "not a function"** → MC-4 active; needs the
  orthogonal-requirements repair (only after MC-3 is cleared).
- **Cannot substitute a value for a variable at all, or cannot describe what a set is** →
  prerequisite gap in `math.found.variable` or `math.found.function-set-theoretic` respectively,
  not specific to this concept's own representational/notational content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-4 pointed out and reacts with "but I thought that's what one-to-one
MEANT" — validate this directly: the confusion is entirely reasonable given how the term
"one-to-one function" is phrased, and the correction is not that their reading of the WORDS was
unreasonable, but that "one-to-one" names an EXTRA property some functions have and others don't,
not the baseline definition itself. Frame the correction as "you found the right idea — one-to-one
IS about inputs and outputs matching up uniquely — it's just describing a SPECIAL kind of function,
not every function," not as a correction of careless reading. If MC-3 persists after one
correction, avoid simply re-stating "f is a rule name" abstractly — instead have the learner
evaluate the SAME function notation on several different inputs in a row (e.g. $f(1)$, $f(2)$,
$f(3)$ for the same rule), so the substitution pattern becomes a practiced motion rather than a
rule to recall.

## Memory Hooks
- "What COULD come out (codomain) is not always what DOES come out (range)." — directly targeting
  MC-1.
- "No equation? Still a function, if every input gets exactly one output." — directly targeting
  MC-2.
- "$f(x)$ is never $f$ times $x$ — it's the output of rule $f$ at input $x$." — directly targeting
  MC-3.
- "Sharing an output is fine. Having two outputs from one input is not." — directly targeting MC-4.

## Transfer Connections
- **`math.found.function-set-theoretic`** (prerequisite and cross-link, reused): supplies the
  formal set-theoretic definition this concept's informal, multi-representation treatment builds
  directly on top of.
- **`math.found.variable`** (prerequisite, reused): supplies the substitution machinery function
  notation evaluation directly reuses.
- **`math.func.linear-function`**, **`math.func.quadratic-function`** (KG-declared unlocks, not
  yet authored): the first concrete function FAMILIES this concept's general definition,
  vocabulary, and notation fluency will be applied to.
- **`math.found.relation`** (KG-declared "related" concept, not yet authored): a function is
  formally a special kind of relation (satisfying the exactly-one-output property); this concept's
  Expert mental model previews that connection explicitly.

## Cross-Subject Connections
- **Computer science**: the function concept is the direct mathematical ancestor of a programming
  function/procedure (a fixed, deterministic mapping from inputs to outputs) — the "same input,
  same output, every time" property this entry establishes via the function-machine analogy is
  exactly the determinism property expected of a pure function in programming.
- **Real-world data modeling** (the Blueprint's own AB-5 transfer item: book → ISBN): recognizing
  everyday one-input-one-output assignments (student → form group, book → ISBN, employee → payroll
  ID) as functions, and correctly reasoning about their domain and whether many-to-one sharing is
  permitted, is a direct, non-mathematical application of this concept's core definition.

## Blueprint References
- `docs/curriculum/blueprints/math.func.function-concept.md` — Component 0/Concept Profile
  (metadata: difficulty proficient, bloom understand, mastery_threshold 0.85, estimated_hours 8,
  requires [math.found.variable, math.found.set-theory] per the Blueprint's own text — reconciled
  against the live KG's actual `requires: [math.found.function-set-theoretic, math.found.variable]`
  and `cross_links: [math.found.function-set-theoretic]`, per Curriculum Feedback below); Section 6
  Misconception Engine (MC-1..MC-4, reused above with birth-type classification added); Sections
  5's Protocol A worked demonstrations (the function machine, the broken machine, the arrow-diagram
  pair, reused directly in the Demonstrations above) and Section 7's Assessment Battery (AB-2
  function evaluation, AB-5 book/ISBN transfer item); Section 8's five-probe Mastery Gate (P77
  generation probe, P76 transfer probe — student/form-group scenario, P75 boundary probe, P74
  classification probe, P78 explanation probe) — held in the Blueprint's own mastery-gate item
  bank, not restated in full here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **This is the first `math.func` (Functions) entry authored by this program**, reached via the
  same deliberately bounded cross-domain excursion described in `math.disc.counting-principles`'s
  own Curriculum Feedback section: this concept alone unblocks 7 of the 9 remaining `math.alg`
  concepts (the entire exponential/logarithm family — `exponential-function`, `logarithm`,
  `natural-logarithm`, `logarithm-properties`, `change-of-base`, `logarithmic-equations`,
  `exponential-equations`), making it the single highest-leverage concept remaining for `math.alg`
  domain certification. Verified programmatically ready (both KG-declared prerequisites already
  authored) before selection.
- **Genuine Blueprint/KG metadata discrepancy found and resolved toward the KG, per established
  convention**: the Blueprint's own Component 0 Concept Profile states
  `requires: [math.found.variable, math.found.set-theory]`, `unlocks:
  [math.func.linear-function, math.func.quadratic-function, math.func.composite-function,
  math.func.inverse-function]`, and `cross_links: [math.found.set-theory]`. The live KG instead
  records `requires: [math.found.function-set-theoretic, math.found.variable]`,
  `unlocks: [math.func.linear-function, math.func.quadratic-function]` (2 concepts, not 4 —
  `math.func.composite-function` and `math.func.inverse-function` are NOT KG-declared unlocks of
  this concept), and `cross_links: [math.found.function-set-theoretic]`. This entry follows the
  KG as authoritative throughout (per this program's established convention on any Blueprint/KG
  divergence) — the Identity section above states the KG's actual values, and Blueprint content
  referencing `math.found.set-theory` specifically has been reinterpreted as referring to the more
  specific `math.found.function-set-theoretic` node, which is the genuinely load-bearing
  prerequisite for this concept's set-theoretic grounding.
- No genuine content-overlap was found between this Blueprint and any already-authored mathematics
  sibling entry (this is the domain's first entry, so no sibling comparison was possible beyond
  the shared-prerequisite check above).

## Version History
- 2026-09-11 — Initial authoring (Batch 14 / math.alg-unblocking cross-domain excursion, part 2 of
  2, of the Mathematics Educational Brain completion campaign). Blueprint reused by reference in
  full. No KG or Blueprint file modified.
