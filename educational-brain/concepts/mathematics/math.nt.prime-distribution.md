# math.nt.prime-distribution

## Identity
- **KG ID**: `math.nt.prime-distribution`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.prime-number` — load-bearing part: the divisor-count definition of primality, and the ability to *list and count* primes below a bound by hand. This concept counts what that concept defines; a learner who is still testing primality by last digit will produce wrong π(x) values and blame the theorem.
  - `math.calc.limits` — load-bearing part: the formal meaning of a limit as x → ∞, specifically that a limit statement constrains a *ratio's* long-run behaviour and says nothing directly about any finite x. Without this, the ∼ symbol is unreadable.
- **Unlocks**: `math.nt.analytic-number-theory`
- **Cross-links**: `math.cx.riemann-zeta` (not yet authored in this corpus — the Blueprint's P76 runs in independence mode for the same reason; re-verified at authoring time)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.65 (⌈0.65×5⌉ = 4/5)
- **Estimated hours**: 15
- **Blueprint**: `docs/curriculum/blueprints/math.nt.prime-distribution.md` (reused by reference throughout)

## Learning Objective
- The learner can compute π(x) directly for small x by listing primes, and state the Prime Number Theorem as π(x) ∼ x/ln x.
- The learner can say precisely what the ∼ symbol claims (the *ratio* tends to 1) and precisely what it does not claim (that the *difference* tends to 0).
- The learner can produce a numerical case in which the ratio moves toward 1 while the absolute difference simultaneously grows.
- The learner can use the 1/ln x local-density heuristic to reason about prime scarcity at a given order of magnitude, and can explain why increasing scarcity does not imply a last prime.

## Core Understanding
π(x) counts primes ≤ x. The Prime Number Theorem asserts π(x) ∼ x/ln x, and the whole content of the concept lives in that symbol: f ∼ g means lim f/g = 1, a statement about a *quotient*, not a gap. The quotient converging to 1 is fully compatible with — and here actually accompanies — a difference that grows without bound; at x = 100 the gap is about 3, at x = 10⁶ it is about 6,100, while the ratio has moved from ≈1.15 to ≈1.08. Because ln x grows, x/ln x grows strictly slower than x, so the *local density* of primes near x behaves like 1/ln x and decays — very slowly, and never to a halt. Density tending to zero and the supply being infinite are compatible facts, and the infinitude of primes is a separate, older, entirely elementary theorem that PNT neither supplies nor threatens.

## Mental Models
1. **Beginner — the staircase and the smooth curve.** π(x) is a step function that climbs by 1 at each prime; x/ln x is a smooth curve drawn underneath it. The theorem says the staircase and the curve stay in the same *proportion* out at large x. *Upgrade trigger*: the learner asks "how close do they get?" — that question cannot be answered inside this model. *Shelf life*: says nothing quantitative; will not survive the first ratio-vs-difference probe.
2. **Intermediate — the ratio dial.** Hold a dial reading π(x) ÷ (x/ln x). The theorem is the claim that the dial settles on 1.00 as you walk x outward. *Upgrade trigger*: the learner notices the dial can settle while the two quantities being divided both run away. *Shelf life*: correct and durable; it is the model MC-1 attacks.
3. **Advanced — density 1/ln x.** Near a large x, roughly one number in ln x is prime. This converts the theorem from a statement about a total count to a statement about a local rate, which is the form actually used in applications. *Upgrade trigger*: asking how *accurate* that rate is — i.e. wanting an error term.
4. **Expert — main term plus error term.** π(x) = (main term) + (error), where the main term is well understood and the entire remaining difficulty of the subject is the size of the error. The zeros of a certain complex function control that error. *Shelf life*: this is the doorway to `math.nt.analytic-number-theory` and should be installed as a door, not a room.

The arriving pre-instruction model is usually neither of these: most learners arrive believing primes "thin out and probably stop", which is a wrong model to be dislodged (MC-3), not a stage to be built on.

## Why Students Fail
The failure is almost never arithmetic; it is that ∼ is read as ≈ and ≈ is read as "the gap is small". Every earlier approximation the learner has met — rounding, linear approximation, significant figures — was a claim about *absolute* closeness, so the natural transfer is to read an asymptotic statement the same way. The theorem then appears to be numerically false the first time it is checked (π(100) = 25 against an estimate of 21.7 looks like a 13% miss), and the learner either distrusts it or, worse, patches it by believing the difference must shrink later. The second failure is affective-conceptual: "primes get rarer" is heard as a story with an ending, because every physical scarcity the learner has experienced does eventually run out.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — ASYMPTOTIC-RATIO-CONFLATED-WITH-VANISHING-DIFFERENCE** (foundational)
  - **Birth type**: Type 4, notation-induced. The glyph ∼ sits in the same visual slot as ≈ and =, all of which the learner has previously read as "these two are close in value". The notation itself teaches the wrong reading; nothing about the symbol's shape signals "quotient".
  - **Characteristic phrase**: "so eventually x/ln x just *is* π(x)".
  - **Detection probe** (verbatim): "Since π(x) ∼ x/ln x, does π(x) − x/ln x get closer and closer to 0 as x grows?" A yes — or a confident "must do" — is the misconception.
  - **Repair**: Blueprint Repair Action B01. The collision is numerical and takes one minute: compute both the ratio and the difference at x = 100 and at x = 10⁶, and let the learner watch the ratio improve while the difference grows twentyfold.
  - **Verification of death**: give a *new* asymptotic pair the learner has never seen (e.g. n! ∼ (n/e)ⁿ√(2πn)) and ask what it does and does not claim. Re-probing with π(x) alone risks a memorised answer.

- **MC-2 — PNT-TREATED-AS-EXACT-FORMULA** (moderate)
  - **Birth type**: Type 1, overgeneralisation. Every formula the learner has previously been handed *was* usable at any specific value; the class "formula" has never before contained a member that is only meaningful in a limit.
  - **Characteristic phrase**: "so π(1000) = 1000/ln 1000".
  - **Detection probe**: "Use the theorem to tell me exactly how many primes there are below 100." Watch for the estimate delivered as *the* answer with no hedge.
  - **Repair**: Blueprint Repair Action B02 — re-anchor on "asymptotic statements are promises about the far end of the number line, not about any address on it."
  - **Verification of death**: the learner spontaneously qualifies an estimate ("about 21.7, though the true count is larger at this size") without being prompted.

- **MC-3 — PRIME-SPARSITY-MISTAKEN-FOR-PRIME-FINITENESS** (foundational)
  - **Birth type**: Type 6, analogy overextension. Scarcity is imported from physical resources, where decreasing density always eventually means exhaustion. The analogy is the learner's own, not the tutor's, which is why it survives explanations that never name it.
  - **Characteristic phrase**: "so somewhere out there is the last prime".
  - **Detection probe**: "The density of primes keeps shrinking. Does that mean primes eventually stop?"
  - **Repair**: Blueprint Repair Action B03 — separate the two claims explicitly, and note that infinitude is a *different, already-proven, much older* theorem that PNT does not touch. If the learner has met Euclid's proof, recall it here by name; the contradiction between "I proved there is no largest prime" and "there must be a last one" is the strongest available collision.
  - **Verification of death**: the learner can state both facts in one sentence without treating them as in tension.

## Analogies
- **Best — the thinning forest.** Walk outward from a city: trees per hectare drop steadily, and the drop never stops, but you never reach the last tree. *Breaking point*: the analogy gives no rate, and a real forest does end at the treeline — which is exactly MC-3's trap, so this analogy must be delivered *with* its ending disclaimed out loud.
- **Alternative — the ratio dial vs. the gap.** Two runners: the faster one's *lead* grows every lap, yet the ratio of their distances approaches 1 because both distances are exploding. This is the cleanest available carrier of the ratio/difference split, and unlike the forest it cannot induce MC-3.
- **Visual** — the step function overlaid on the smooth curve, viewed twice at different zoom levels: jagged and clearly separated up close, indistinguishable in shape when zoomed out. This makes "relative" visible as a viewing distance.
- **ANTI-ANALOGY — "the estimate homes in on the true value, like a converging measurement."** This installs MC-1 directly and is the single most common informal gloss of PNT. Do not use it, and if a learner offers it, name it rather than letting it pass: measurements converge in absolute error; this does not.
- **ANTI-ANALOGY — "primes are running out."** Installs MC-3 in four words.

## Demonstrations
- **Hand computation of π(30).** Learner lists 2,3,5,7,11,13,17,19,23,29 → 10. *Elicit the prediction first*: "before you list them, guess π(30)." The usual guess is far too low, which sets up genuine interest in a counting law.
- **The two-column table.** Columns: x, π(x), x/ln x, ratio, difference — filled at x = 100, 10⁴, 10⁶ from known values. *Prediction first*: ask which column will approach 1 and which will grow, and record the answer before filling anything in. This is the MC-1 collision in table form.
- **Density comparison.** 25% of the first hundred integers are prime; near 10⁶ the local density is about 1/13.8 ≈ 7.2%. *Prediction first*: "what fraction of the numbers between one million and one million one hundred do you expect to be prime?"

## Discovery Questions
Full guided discovery is appropriate here — the counting law is discoverable in the sense that a learner *can* be led to want it, even though nobody discovers PNT itself.
1. **Need**: "Roughly how many primes are there below one million? Not exactly — roughly. What would you even multiply or divide to get there?" (The learner has no instrument. That absence is the need.)
2. **Playground**: hand over π(x) for x = 10, 100, 1000, 10⁴ and ask what is happening to the *proportion* of primes.
3. **Invention**: "Invent a rule that predicts π(x) from x. Try it against the table."
4. **Collision**: whatever they invent (usually a fixed fraction), test it two orders of magnitude out. Fixed fractions fail; the failure has a *direction* — always too many — which points at a shrinking density.
5. **Formalisation**: introduce x/ln x, and only now the ∼ symbol, defining it as a ratio statement *before* any numbers are compared, so MC-1 has no gap to enter through.
6. **Compression**: "About one in ln x numbers near x is prime."

## Teaching Sequence
The Blueprint's Component 5 (A01 → A02 → A03) owns the turn-level sequence; it is cited, not restated. The pedagogical reason for that order is the point worth recording here: the ∼ symbol must be *defined as a ratio* before any numerical comparison is shown, because a learner who has already seen "25 vs 21.7" has silently formed an absolute-error reading, and MC-1 is far cheaper to prevent than to repair. Correspondingly, the sparsity implication (A02's second contrast) must come *after* the ratio/difference split, not before — presented first, "primes get rarer" reliably triggers MC-3 while the learner still has no quantitative handle to argue themselves out of it. The infinitude of primes should be recalled explicitly at the moment sparsity is introduced, in the same breath, rather than being held back as a correction after the misconception forms.

## Tutor Actions
- **ORGANIZE: Representation Table** — the x / π(x) / estimate / ratio / difference grid. First-choice action; it is the only one that makes MC-1 visible rather than merely stated.
- **TEST-THINKING: Prediction** — take the ratio and difference predictions *before* filling the table. Without this the table is a lecture.
- **SHOW: Analogy** — the two-runners image for ratio-vs-gap.
- **TEST-THINKING: Error Analysis** — hand the learner the false claim "the difference shrinks" and ask them to disprove it with the table they just built.
- **Does NOT fit: Game.** Prime-hunting games are abundant and fun and teach the *prerequisite*, not this concept; the chocolate-covered-broccoli guard applies with force here, because the game skin (finding primes) is a different skill from the target (reasoning about a counting law).
- **Does NOT fit: Worked Example alone.** A worked computation of π(30) does not touch the concept's actual difficulty, which is symbolic interpretation.

## Voice Teaching Notes
The load-bearing sentence is "the ratio tends to one — not the difference." Slow down through it and do not compress it into "they get close", which is precisely the ambiguity being fought. Listen for the learner reading ∼ aloud as "equals" or "is about" — the mis-*reading* is audible before the mis-*belief* is, and correcting the pronunciation ("say: is asymptotic to") is a cheap early intervention. Hesitation placed immediately before a number ("so π of a million is… uh…") usually signals arithmetic load, not conceptual trouble, and should be met with the number supplied rather than a re-explanation. Hesitation placed before the *symbol* signals the real thing. Channel reality for what the runtime actually captures is owned by `../foundations/03-voice-first-learning-model.md §7`, cited not repeated.

## Assessment Signals
- **Fast-wrong on the MC-1 probe** ("does the difference go to zero?" → immediate "yes") — the ratio dial model was never installed; treat as MISCONCEIVING, not as a gap, and go to B01's numerical collision rather than re-explaining.
- **Slow-correct on the same probe** — the learner is deriving the answer from the definition of a limit each time rather than holding the distinction. FRAGILE: correct, but it will not survive being asked about a different ∼ statement. Interleave with a second asymptotic pair before advancing.
- **Fast-correct with a spontaneous numerical justification** — mastery signal on LO2.
- **Correct π(x) computation with a wrong ratio interpretation** — the commonest split; it means the prerequisite is solid and the concept is not. Do not let the correct arithmetic certify the gate.
- **Mastery trigger**: the Blueprint's P77 four-problem set at MAMR 4/5, with the additional requirement that item 3 (the "can the difference be larger at 10⁹?" item) is among the correct ones — a pass that misses item 3 is a pass on computation with MC-1 intact, and should not certify.
- Full item banks live in the Blueprint's Component 5; they are not restated here.

## Tutor Recovery Strategy
The likely Recovery Engine utterance here is "I don't get what that squiggle means" or the resigned variant, "this is just too abstract for me." The concept-specific smaller question to shrink to is arithmetic and immediate: **"Two numbers: 100 and 103. What's their ratio? What's their difference? Now: 1,000,000 and 1,000,300 — ratio, and difference?"** This runs the entire ratio/difference distinction on numbers the learner cannot fail at, with no primes and no limits present, and it can be answered in ten seconds. Rebuild upward from there. Everything generic — pacing, register, the utterance library itself — is owned by `../foundations/01-recovery-engine.md` and is not restated.

## Memory Hooks
- Concept type: **concept** (not a procedure — there is nothing to execute). Review form is therefore *explanation-on-demand*, not speeded drill: "state what ∼ claims and what it doesn't."
- Concept-specific deviation: MC-1 warrants an extended re-probe tail well past the initial gate, because the notational pull that created it never goes away — the learner will meet ∼ again in analysis and the misconception can regrow there. Schedule a re-probe against a *different* asymptotic statement at the 30-day interval.
- Interleaving partners: `math.nt.prime-number` (to keep π(x) computable) and any later ∼ statement the learner meets, for discrimination. Interleave *against* `math.calc.limits`' ε-N material, since that is where the ratio reading is properly grounded.

## Transfer Connections
- **Near**: reading any other ∼ statement correctly — Stirling's approximation is the next one most learners meet.
- **Far**: distinguishing relative from absolute error anywhere in numerical work; the same split governs whether a 6,000-unit error is large (it is not, against 78,000).
- **Real-world**: estimating how many candidate numbers must be tested to find a large prime — the operational fact behind RSA key generation, which is the Blueprint's own P76 setting.
- **Expert transfer**: the recognition that the *error term*, not the main term, is where the mathematics lives. That reflex is what `math.nt.analytic-number-theory` is built on.

## Cross-Subject Connections
- **Computer science** — `cs.*` cryptography: prime density is the reason key generation is feasible at all (about 1 in 691 of the 300-digit numbers is prime, so a few hundred candidates suffice). This is a genuine, load-bearing connection and it is the Blueprint's chosen transfer setting.
- The KG's own `cross_links` field lists `math.cx.riemann-zeta`, which is not yet authored in this corpus; the connection is real (zeta's zeros control PNT's error term) but cannot be probed against an existing entry yet.
- No genuine connection to the other four subjects; asserting one would be fabrication.

## Blueprint References
`docs/curriculum/blueprints/math.nt.prime-distribution.md`. Reused by reference, not restated: the Misconception Registry (Component 6, MC-1..MC-3 and repair actions B01..B03), the three worked examples (Component 4), the full teaching-action scripts A01–A03 (Component 5), and the P77 problem set and P76 cryptography transfer probe (Component 5). This entry adds birth-type classification, the four-stage mental-model ladder, the anti-analogies, the response-pattern diagnostics, and the recovery shrink-question — none of which the Blueprint carries.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. Nothing was created as part of authoring this entry; seeding is a separate Wave-0-gated step.

## Curriculum Feedback
The KG lists `math.cx.riemann-zeta` as a cross-link, but that concept sits in a domain with no Educational Brain coverage yet, so the link is currently unusable by the Teaching Engine in both directions. Recorded, not fixed. Separately: `estimated_hours: 15` against `mastery_threshold: 0.65` is internally coherent (deep material, deliberately lenient gate) and is not being flagged.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1).
