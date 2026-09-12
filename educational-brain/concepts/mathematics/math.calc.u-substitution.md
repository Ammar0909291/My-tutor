# math.calc.u-substitution

## Identity
- **KG ID**: `math.calc.u-substitution`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.ftc-part2` — load-bearing part: the Evaluation Theorem and definite-vs-indefinite integral mechanics are assumed fluent; the limit-conversion technique for definite substitution extends FTC Part 2 directly.
  - `math.calc.chain-rule` — load-bearing part: substitution is literally the Chain Rule run in reverse — the pattern $f'(g(x))\cdot g'(x)$ must be recognized in an integrand before substitution can apply.
- **Unlocks**: `math.calc.integration-by-parts` (the next systematic integration technique, requiring fluent substitution as a sub-step).
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 10 (the second-highest in the domain so far, after `volume-revolution`'s 10 — reflecting genuine breadth: the verification discipline, the constant-adjustment technique, and the definite-integral limit-conversion procedure are each substantial)
- **Blueprint**: `docs/curriculum/blueprints/math.calc.u-substitution.md` (reused by reference throughout)

## Learning Objective
- The learner can identify $u=g(x)$ (the inner function) in an integrand, compute $du=g'(x)\,dx$, and VERIFY that $g'(x)$ (up to a constant) actually appears in the integrand before proceeding — recognizing that the method cannot proceed when this differential is entirely absent.
- The learner can correctly handle a constant mismatch between $du$ and the integrand's factor (e.g. $x^2\,dx=\frac{1}{3}du$ when $du=3x^2\,dx$), never altering $du$'s own computed value to force a match.
- The learner can convert a definite integral's bounds from $x$-limits to $u$-limits at the moment of substitution, never evaluating a $u$-integrand at the original $x$-limits.

## Core Understanding
Integration by substitution is the DIRECT REVERSE of the Chain Rule: since $\frac{d}{dx}\bigl[F(g(x))\bigr]=F'(g(x))\cdot g'(x)$, any integrand that MATCHES this pattern — an outer-function derivative $f(g(x))$ multiplied by the inner function's own derivative $g'(x)$ — can be integrated by "undoing" the Chain Rule: set $u=g(x)$, so $du=g'(x)\,dx$, rewrite the integral entirely in terms of $u$ (which becomes $\int f(u)\,du$, a simpler integral), evaluate, and back-substitute $u=g(x)$ to return to $x$. The single most consequential step in this procedure — and the one most often skipped — is VERIFICATION: before rewriting anything, the learner must confirm that $g'(x)$ (possibly scaled by a constant) genuinely appears as a factor in the integrand; if it does not, substitution CANNOT proceed, no matter how natural the choice of $u$ seems, because the integral cannot be expressed purely in terms of $u$ without a leftover, unconvertible $x$. When a constant mismatch exists between $du$ and the integrand's actual factor (e.g. the integrand has $x^2\,dx$ but $du=3x^2\,dx$), the correct response is to ADJUST the relationship algebraically ($x^2\,dx=\frac{1}{3}du$), never to alter what $du$ itself equals. For DEFINITE integrals, the bounds must be converted from $x$-values to their corresponding $u$-values ($x=a\mapsto u=g(a)$, $x=b\mapsto u=g(b)$) at the SAME moment the variable itself is substituted — converting limits is not an optional final step but part of the substitution itself, and doing so avoids the extra work of back-substituting before evaluating.

## Mental Models
1. **Beginner — "pick something to call $u$, differentiate it, and rewrite the integral."** No verification step yet — $u$ is chosen by pattern-matching the "most complicated-looking" piece, without checking whether the substitution will actually work. *Upgrade trigger*: attempting a substitution on an integral where the chosen $u$'s derivative simply does not appear, and getting stuck with leftover $x$'s.
2. **Intermediate — "choose $u=g(x)$, compute $du=g'(x)dx$, and CHECK that $g'(x)$ (maybe times a constant) is actually in the integrand before rewriting anything."** The verification step is now explicit and deliberate. *Upgrade trigger*: encountering a DEFINITE integral, where the bounds also need converting, not just the integrand.
3. **Advanced — "for definite integrals, convert the bounds to $u$-values at the SAME time as substituting the variable — this avoids back-substituting later."** The full procedure (verify, substitute, convert bounds if definite) is now fluent as one connected sequence. *Upgrade trigger*: needing to recognize substitution as the Chain Rule run backward, rather than a separately memorized integration technique.
4. **Expert — substitution is recognized explicitly as "undoing" the Chain Rule: any integrand of the exact form $f(g(x))\cdot g'(x)$ is, by construction, the derivative of $F(g(x))$, so integrating it is simply reversing that differentiation.** The learner can predict, before attempting a substitution, whether an integrand has this structure at all. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a scope-overextension of the substitution PATTERN itself: a learner who has practiced substitution on integrands where the required derivative factor genuinely appears attempts the SAME technique on an integrand where $g'(x)$ is simply absent — proceeding to substitute anyway, without first checking the validity condition that makes the technique applicable at all, treating a technique's existence as a guarantee of its applicability (MC-1, DU-WITHOUT-VERIFICATION). A second, distinct failure is a genuinely new requirement in a genuinely new setting: DEFINITE integrals' bounds are numbers written in terms of the ORIGINAL variable $x$, and nothing about the bound notation itself visually signals that these numbers must be re-expressed once the variable changes to $u$ — a learner who has become comfortable with indefinite substitution (which has no bounds to convert) simply carries the original $x$-limits over unchanged, producing a numerically wrong definite answer (MC-2, LIMITS-UNCHANGED). A third failure is a straightforward computational slip in applying the derivative rule itself when computing $du$: omitting a coefficient factor when differentiating $u=g(x)$ (writing $du=x\,dx$ instead of $du=2x\,dx$ for $u=x^2$) — the identical mechanism already documented for `math.calc.derivative-rules`' own MC-2 (COEFFICIENT-MULTIPLICATION-OMITTED), here recurring in the specific context of computing a differential (MC-3, DU-ALGEBRA-ERROR).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1, MC-2, MC-3) and its own Protocol B repair actions B01–B03. **The Blueprint's Misconception Registry carries a Trigger column but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — DU-WITHOUT-VERIFICATION** (the Blueprint's own declared "Foundational Misconception" — proceeding without checking that $du$ is present creates a method-application without a valid foundation, producing structurally invalid work that cannot be rescued by arithmetic correction)
  - **Birth type**: Type 1, overgeneralization of the substitution PATTERN's applicability beyond its actual validity condition (the differential $g'(x)\,dx$ must genuinely be present, up to a constant) — a scope-overextension error in the same shape already documented for `math.calc.volume-revolution`'s own MC-1 (a formula applied beyond its valid boundary condition).
  - **Characteristic phrase**: setting $u=g(x)$ and proceeding to write $\int f(u)\,du$ even though the integrand contains no factor matching $g'(x)$, leaving an un-convertible $x$ in the result.
  - **Detection probe** (Blueprint's B01 P41): "Set up u-substitution for $\int\cos(x^2)\,dx$." A learner who writes $u=x^2$, $du=2x\,dx$, and proceeds to $\int\cos(u)\,du$ (forgetting that the $2x$ factor is simply absent from the integrand) demonstrates MC-1.
  - **Repair**: Blueprint Repair Action B01 — after computing $du$, ALWAYS ask "is $du$ (or a constant multiple of $du$) present in the original integrand as a factor?" as a mandatory, non-negotiable check before rewriting anything, with the explicit distinction that an entirely-missing variable factor (not merely a missing constant) means the method fails outright.
  - **Verification of death**: given a fresh integrand, the learner states explicitly whether $g'(x)$ is present BEFORE attempting to rewrite the integral in terms of $u$, and correctly identifies at least one integral where substitution genuinely fails.

- **MC-2 — LIMITS-UNCHANGED** (the Blueprint's own second registered misconception)
  - **Birth type**: Type 4, notation-induced. A definite integral's bound VALUES (the numbers) carry no visible marker of which variable they belong to — the notation $\int_0^1$ looks identical whether the integral will ultimately be expressed in $x$ or in $u$, inviting the numbers to be carried over unchanged even though they specifically denote $x$-values.
  - **Characteristic phrase**: converting $\int_a^b f(g(x))g'(x)\,dx$ to $\int_a^b f(u)\,du$, keeping the ORIGINAL numeric bounds $a$ and $b$ rather than converting to $g(a)$ and $g(b)$.
  - **Detection probe** (Blueprint's B02 P41): set up $\int_0^1 2x(x^2+1)^3\,dx$ with $u=x^2+1$; a learner who writes $\int_0^1u^3\,du$ (keeping the $x$-bounds $0$ and $1$) rather than $\int_1^2u^3\,du$ (the correctly converted $u$-bounds) demonstrates MC-2.
  - **Repair**: Blueprint Repair Action B02 — treat bound conversion as an EXPLICIT, mandatory step performed at the exact moment of substitution, computing $u=g(a)$ and $u=g(b)$ before evaluating anything, with a checklist: "after substituting, immediately compute the new limits before evaluating."
  - **Verification of death**: given a fresh definite integral requiring substitution, the learner computes and states the new $u$-bounds explicitly, as a separate written step, before evaluating the substituted integral.

- **MC-3 — DU-ALGEBRA-ERROR** (the Blueprint's own third registered misconception)
  - **Birth type**: Type 1, overgeneralization/computational slip — the identical mechanism already documented for `math.calc.derivative-rules`' own MC-2, COEFFICIENT-MULTIPLICATION-OMITTED, recurring here specifically in the context of computing a differential rather than a general derivative.
  - **Characteristic phrase**: writing $du=x\,dx$ for $u=x^2$ (omitting the coefficient $2$ that the power rule genuinely produces).
  - **Detection probe** (Blueprint's B03 P41): "For $u=x^2$, what is $du$?" A learner who answers $du=x\,dx$ (rather than the correct $du=2x\,dx$) demonstrates MC-3.
  - **Repair**: Blueprint Repair Action B03 — apply the derivative rule explicitly and completely before writing $du$, with a fast cross-check technique (differentiating a related composite function to see the coefficient appear naturally), plus repeated practice drills across a range of $u$-choices.
  - **Verification of death**: given a fresh choice of $u$, the learner computes $du$ correctly, including any coefficient, on the first attempt.

## Analogies
- **Best — trying to translate a sentence into a language that has no word for one of the concepts.** If the sentence (integrand) doesn't actually contain the concept (the factor $g'(x)$) the target language (in terms of $u$) needs, no amount of rearranging will produce a valid translation — the translation genuinely fails, it isn't merely awkward.
- **Alternative — a border crossing where your paperwork (the bounds) must be re-issued in the new country's currency (the new variable), not carried over in the old currency.** Crossing from "$x$-land" to "$u$-land" means the bound VALUES must be re-issued in $u$-terms, not merely re-labeled with the same numbers.
- **ANTI-ANALOGY — "just pick the 'inside' part as $u$ and it'll work out."** This vague phrasing licenses MC-1 directly, since it never mentions checking whether the derivative of that "inside" part is actually present. Say "pick $u$, compute $du$, and CHECK it's really there — 'inside-looking' alone doesn't guarantee the substitution works" instead.

## Demonstrations
- **The works-versus-fails contrast.** Attempt substitution on $\int2x\cos(x^2)\,dx$ (works, $2x\,dx$ present) side by side with $\int\cos(x^2)\,dx$ (fails, no $x$ factor at all). *Predict whether both will succeed before attempting either.* Getting a genuine dead end on the second is the demonstration for MC-1.
- **The bound-conversion side-by-side.** Evaluate $\int_0^1 2x(x^2+1)^3\,dx$ by (a) converting the bounds correctly to $u$-limits $[1,2]$ and (b) incorrectly keeping the $x$-limits $[0,1]$ on the $u$-integrand. *Predict whether the two approaches will give the same numeric answer before computing both.* Getting two DIFFERENT numbers ($15/4$ versus $1/4$) is the demonstration for MC-2.
- **The coefficient cross-check.** Compute $du$ for $u=x^2$ two ways — directly via the power rule, and by differentiating a related composite $x\cdot\sin(x^2)$ to see the $2x$ factor emerge naturally from the Chain Rule. *Predict whether the coefficient will be the same both ways before computing.* Confirming the coefficient $2$ appears in both derivations is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the substitution theorem's statement itself (it is a specific algebraic consequence of reversing the Chain Rule, not independently rediscoverable at this level), but the verification requirement (MC-1) and the bound-conversion necessity (MC-2) are both genuinely discoverable by direct comparison.
1. **Need** — "Try to rewrite $\int\cos(x^2)\,dx$ entirely in terms of $u=x^2$. What's left over that you can't express in $u$?" The learner discovers an un-convertible $x$ remains, since no $x$-factor exists to absorb into $du$.
2. **Playground** — try the same rewrite-attempt check on a couple more integrals, some where it works and some where it doesn't.
3. **Invention** — "What's the difference between the integrals where this rewriting worked and the ones where it didn't?" Let the learner connect it to whether $g'(x)$ is genuinely present as a factor.
4. **Collision** — confront a learner who substituted without checking with the direct "leftover $x$" evidence from the rewrite attempt.
5. **Formalisation** — state the three-step verification protocol explicitly: choose $u$, compute $du$, CHECK whether $du$ (up to a constant) is present.
6. **Compression** — "No leftover $x$ allowed — check $du$ is really there before you rewrite anything."

## Teaching Sequence
The verification discipline (MC-1) must be established FIRST, per the Blueprint's own A01, since it is the precondition on which the entire technique's validity depends — a learner who has not internalized "check before rewriting" will treat every subsequent worked example as "the formula always applies," undermining the very distinction the technique requires. The constant-adjustment technique (folded into MC-1's own detection and demonstrated in WE2) follows directly, since a mismatched-by-a-constant integrand is a DIFFERENT outcome from a genuinely-absent factor, and conflating the two is itself a source of confusion if not explicitly distinguished. The definite-integral bound-conversion discipline (MC-2) is introduced LAST, per the Blueprint's own A03, once the core indefinite-integral procedure is fluent, since bound conversion is an ADDITIONAL step layered on top of an already-mastered substitution, not a replacement for it. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the works-versus-fails contrast ($\int2x\cos(x^2)dx$ versus $\int\cos(x^2)dx$), with the learner predicting whether both will succeed BEFORE attempting either. First action; anchors the verification requirement concretely.
- **TEST-THINKING: Prediction** — "Is the factor $du$ actually present in this integrand, or only 'sort of' present?" asked on a fresh integrand, BEFORE any substitution is attempted. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the bound-conversion side-by-side (correct $u$-limits versus incorrectly-kept $x$-limits on the same definite integral), run with the learner comparing the two numeric answers directly.
- **TEST-THINKING: Error Analysis** — "A student substituted $u=x^2+1$ into $\int_0^1 2x(x^2+1)^3dx$ and evaluated $\int_0^1u^3du$. What's wrong?" targets MC-2 directly.
- **Does NOT fit: introducing integration by parts or trigonometric substitution here.** Substitution's own failure cases (where $g'(x)$ is genuinely absent) are precisely the motivation for these OTHER techniques, which are separate, later concepts.

## Voice Teaching Notes
The load-bearing sentence is "check that $du$ is really there before you rewrite anything — 'looks like the inside' isn't enough." Say it every time a new substitution is attempted, not just the first. Listen for a learner who names a $u$ and immediately starts rewriting, with no mention of checking whether the derivative is present — that skipped-verification confidence is the tell for MC-1. Listen for a learner who, on a definite integral, evaluates $[u\text{-expression}]$ using the SAME numbers that appeared as the original $x$-bounds without recomputing them — that unconverted-number habit is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Proceeds with a substitution without verifying $g'(x)$ is present in the integrand** — MC-1. Route to the works-versus-fails contrast, on the exact integrand in question.
- **Evaluates a $u$-substituted definite integral using the original $x$-bounds** — MC-2. Route to the bound-conversion side-by-side, on the exact integral in question.
- **Computes $du$ with a missing or incorrect coefficient** — MC-3. Route to the coefficient cross-check, on the exact choice of $u$ in question.
- **Verifies before substituting, handles constant adjustments correctly, and converts bounds immediately for definite integrals** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (an indefinite integral requiring recognition of $u=\sin x$ as a non-obvious but valid substitution, followed by the SAME integral evaluated as a definite integral via limit conversion, not back-substitution) must include at least one item requiring the learner to perform bound conversion explicitly on a genuinely non-trivial substitution, not merely apply the indefinite procedure — a gate made only of indefinite-integral items risks certifying half the technique without certifying the definite-integral discipline against MC-2.

## Tutor Recovery Strategy
The likely utterance here is "I picked $u$ and found $du$, but the integral still has an $x$ in it — what do I do?" — a reasonable moment of being stuck that signals exactly the verification check this concept teaches. The concept-specific smaller question returns to a direct check: **"Look at what's left over — is it a NUMBER multiplying your $du$-expression, or is it still an $x$ or a function of $x$?"** The learner examines the leftover piece themselves. Then return: "if it's just a number, you can adjust — divide or multiply to absorb it into the integral. But if it's still an $x$, the substitution genuinely doesn't work here, and that's a real, useful finding, not a mistake to fix." If the frustration is instead about a definite integral's numeric answer looking wrong, shrink to the bare check: **"What are your CURRENT limits — are they still the original $x$-numbers, or have you converted them to $u$-numbers yet?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded validity-check gate** (the verification step is a genuine go/no-go decision point, not merely a precision point, since the technique is simply inapplicable when it fails — distinct from the constant-adjustment and bound-conversion steps, which ARE precision points once the technique is known to apply). Review by *requiring the learner to state, out loud, whether $du$ is present BEFORE writing any rewritten integral* — never accepting a substitution attempt that jumps straight to $\int f(u)\,du$ without a stated verification, since skipping the visible check lets MC-1 pass undetected on integrands where a plausible-looking (but invalid) substitution happens not to be caught by the final answer alone.
- Concept-specific deviation: keep at least one integral in the review rotation that DELIBERATELY fails substitution (like $\int\sqrt{1+x^2}\,dx$, requiring trig substitution instead), so the verification habit doesn't atrophy into "substitution always eventually works if you try hard enough."
- Interleaving partners: `math.calc.chain-rule` (the discriminating partner — reviewing the Chain Rule's own forward direction alongside this concept's reverse-direction application keeps the underlying mechanism connection alive) and `math.calc.ftc-part2` (the discriminating partner for the bound-conversion discipline, since definite-integral evaluation is this concept's own direct extension of that already-mastered theorem).

## Transfer Connections
- **Near**: `math.calc.integration-by-parts` (the next systematic integration technique, which this concept directly unlocks and which requires fluent substitution as a frequent sub-step within its own procedure).
- **Far**: trigonometric substitution and partial fractions, both alternative integration techniques introduced specifically for integrands where ordinary substitution's own verification check fails.
- **Real-world**: the Blueprint's own transfer probe — evaluating $\int\sin^3(x)\cos(x)\,dx$ both indefinitely and as a definite integral via limit conversion — is a direct application of the full technique combining both the substitution discipline and the definite-integral bound-conversion discipline.
- **Expert transfer**: recognizing that many mathematical techniques are literally the REVERSE of an already-known forward operation (substitution reverses the Chain Rule; integration by parts reverses the Product Rule) — the same "invert a known forward rule" strategy recurs across differential equations and other inverse-problem contexts.

## Cross-Subject Connections
- **Physics**, real: computing work done by a variable force, or displacement from a velocity function expressed as a composite function, frequently requires substitution to evaluate the resulting integral.
- **Engineering**, real: signal-processing and control-theory integrals involving composite functions (exponential decay combined with oscillation, for instance) are routinely evaluated via substitution.
- **Statistics/probability**, real: probability density function integrals, especially those involving transformed random variables, use substitution as a standard evaluation technique.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — these connections, while genuine, are applications rather than structural KG dependencies for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.u-substitution.md`. Reused by reference, not restated: the Component 1 Cognitive Map, the Component 4 Teaching Actions (A01 P11 representation shift deriving substitution by reversing the Chain Rule, A02 P07 worked example pair with the constant-adjustment technique, A03 P06 contrast pair on works-vs-fails and the definite-integral limit-conversion procedure, A04 P91 mastery gate at MAMR 5/5), the Component 2 Misconception Registry (MC-1, MC-2, MC-3) and Component 5 repair actions (B01, B02, B03), the four-item P77 problem set, and the P76 independence-mode transfer probe (the $\sin^3(x)\cos(x)$ indefinite-and-definite problem). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks triggers but assigns no birth type), the mental-model ladder, the anti-analogy, and explicitly cross-references MC-1 to `math.calc.volume-revolution`'s own MC-1 (the identical scope-overextension mechanism) and MC-3 to `math.calc.derivative-rules`' own MC-2 (the identical coefficient-omission mechanism).

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (Tier-1: `math.calc.ftc-part2`, `math.calc.chain-rule`), unlocks (`math.calc.integration-by-parts`), cross_links (none), difficulty, bloom, mastery_threshold (0.85), and estimated_hours (10) all match the live KG's own fields exactly, confirmed by direct query. This is the fourth and final zero-discrepancy concept in this batch — all 4 of Batch 43's concepts matched the live KG exactly.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 43).
