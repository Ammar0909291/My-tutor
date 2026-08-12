# math.nt.prime-number-theorem

## Identity
- **KG ID**: `math.nt.prime-number-theorem`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.prime-distribution` — load-bearing part: the *statement* π(x) ∼ x/log x, already established. This concept does not restate it; it explains the proof mechanism, and a learner who has not secured the statement has nothing for the mechanism to attach to.
  - `math.cx.complex-integration` — load-bearing part: contour integration and the residue theorem — specifically that integrating a function around a closed contour extracts information about the poles inside. That extraction is the whole proof strategy.
- **Unlocks**: `math.nt.riemann-hypothesis`
- **Cross-links**: `math.cx.riemann-zeta` (not yet authored in this corpus)
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6 (⌈0.6×5⌉ = 3/5)
- **Estimated hours**: 20
- **Blueprint**: `docs/curriculum/blueprints/math.nt.prime-number-theorem.md` (reused by reference throughout)

## Learning Objective
- The learner can name this concept's distinct territory: not the statement of the PNT and not a general survey of analytic number theory, but the specific role complex *integration* plays in the proof.
- The learner can explain, at orientation level, why ζ′(s)/ζ(s) is the object to contour-integrate — it has poles exactly at ζ's zeros and at s = 1.
- The learner can explain why a zero-free region on Re(s) = 1 is what the proof requires, and can state precisely how that differs in strength from the Riemann Hypothesis.

## Core Understanding
This concept owns the *mechanism*, and its content is one chain of reasoning. The logarithmic derivative ζ′(s)/ζ(s) has poles precisely where ζ has zeros, plus one at s = 1 where ζ itself has its pole — this is a general fact about logarithmic derivatives, not a special property of zeta, and the residue at each pole counts multiplicity. That makes ζ′/ζ the natural object to integrate around a large contour: by the residue theorem, the integral is a sum over exactly the zeros enclosed, and by a further technical step (Perron's formula, cited by name only) that sum can be converted into a statement about π(x). The result is a main term plus correction terms, and the correction terms are governed by how close the zeros sit to the line Re(s) = 1. Proving ζ(s) ≠ 0 on that line is therefore exactly what forces the corrections to be small relative to x/log x, which is exactly the PNT's asymptotic conclusion. The Riemann Hypothesis is a strictly stronger claim about the *same* zeros — that they all sit on Re(s) = ½ — and the 1896 proof neither used nor needed it.

## Mental Models
1. **Beginner — the proof needs machinery the statement doesn't.** The theorem can be stated, checked numerically, and believed using only real-variable ideas; proving it cannot. *Upgrade trigger*: asking what the machinery actually does. *Shelf life*: correct, and a necessary first placement, but it explains nothing.
2. **Intermediate — the pole detector.** ζ′/ζ is a device that turns ζ's *zeros* into *poles*, and poles are the things contour integration can count. *Upgrade trigger*: asking what counting the zeros buys. This is the concept's central model and the one worth the most installation effort.
3. **Advanced — main term plus error, with the error owned by the zeros.** The contour integral hands back x/log x plus a sum of contributions, one per zero, each sized by that zero's distance from Re(s) = 1. *Upgrade trigger*: asking how close the zeros are known to be — which is the RH question, and the door to the next concept.
4. **Expert — the explicit formula as a duality.** Primes and zeta zeros are two descriptions of one object; each is computable from the other. *Shelf life*: install as orientation only, and only if the learner reaches for it.

## Why Students Fail
Two distinct failures, and they are not the same learner. The first is redundancy: a learner arriving from `math.nt.prime-distribution` and `math.nt.analytic-number-theory` has already been told about ζ, about zeros, and about RH, and reasonably concludes this concept is a third pass over the same ground. They then stop attending, and miss that the *mechanism* has never actually been described. This is a real curriculum-shaped hazard, not a learner deficiency, and the Blueprint's own MC-3 exists to track it. The second failure is that "the proof needs a zero-free region" and "the proof needs the Riemann Hypothesis" sound like the same sentence to anyone who does not yet hold a mental picture of where in the complex plane those two claims live. Without the geometry, they are two indistinguishable technical phrases, and the stronger, more famous one wins.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — PNT-PROOF-ASSUMED-TO-REQUIRE-RIEMANN-HYPOTHESIS** (foundational)
  - **Birth type**: Type 3, language contamination — the same external, popular-writing source as `math.nt.analytic-number-theory`'s MC-1, resurfacing at a more technical level. It is not a new misconception; it is the same one, and it must be re-treated rather than assumed dead because the earlier concept addressed it. A misconception with a continuously refreshed external source regrows.
  - **Characteristic phrase**: "so the 1896 proof was conditional."
  - **Detection probe** (verbatim): "Did the people who proved the Prime Number Theorem in 1896 have to establish the Riemann Hypothesis first?"
  - **Repair**: Blueprint Repair Action B01 — draw the two claims *geometrically*, not verbally: the line Re(s) = 1 with a "no zeros here — proven" label, and the line Re(s) = ½ with "all zeros here — conjectured". Two different vertical lines on one picture. The verbal version of this correction has already failed once by the time a learner reaches this concept.
  - **Verification of death**: "Suppose someone found a nontrivial zero at Re(s) = 0.7. Which of these breaks: the PNT, or RH?" Only a learner who holds the geometry answers correctly.

- **MC-2 — LOGARITHMIC-DERIVATIVE-POLE-LOCATION-MISUNDERSTOOD** (moderate)
  - **Birth type**: Type 4, notation-induced. The expression ζ′/ζ *looks* like a quotient whose interesting behaviour comes from the numerator, since that is what a derivative usually contributes. The pole structure comes from the denominator vanishing, which the notation does not foreground.
  - **Characteristic phrase**: "the poles come from the derivative."
  - **Detection probe**: give a toy polynomial q(s) = (s − 2)(s − 5)² and ask where q′(s)/q(s) has poles, *before* computing.
  - **Repair**: Blueprint Repair Action B02 — carry out that logarithmic differentiation explicitly. q′/q = 1/(s−2) + 2/(s−5); each pole sits at a root, each residue equals the multiplicity. The fact is fully visible in one line of algebra with no zeta function anywhere.
  - **Verification of death**: the learner predicts pole locations and residues for a new toy function without computing the derivative.

- **MC-3 — THIS-CONCEPT-TREATED-AS-DUPLICATING-PRIME-DISTRIBUTION-CONTENT** (minor)
  - **Birth type**: Type 5, instruction-induced — by the curriculum's own node structure, which places three closely named concepts in sequence. Uniquely in this corpus, the misconception is about the *lesson* rather than the mathematics, and it is nonetheless worth tracking because it silently suppresses attention.
  - **Characteristic phrase**: "we did this already."
  - **Detection probe**: "What does this concept add that `math.nt.prime-distribution` didn't cover?"
  - **Repair**: Blueprint Repair Action B03 — state the division of labour explicitly in the opening turn: the earlier concept owns the statement and its meaning; this one owns the contour-integration mechanism. Naming the boundary up front is cheaper than recovering attention later.
  - **Verification of death**: the learner names "contour integration of ζ′/ζ" as this concept's distinctive content.

## Analogies
- **Best — the metal detector.** ζ′/ζ converts invisible zeros into loud poles, and contour integration is sweeping the detector around a region and counting the beeps. *Breaking point*: a detector tells you *that* something is there; the residue theorem tells you *how much*, weighted by multiplicity — so the analogy under-delivers on residues and should be extended rather than left as-is.
- **Alternative — the fence and the survey.** You cannot examine every point in an infinite region, so you walk its boundary once and infer what is inside. This is the honest intuition for why a *contour* integral is informative at all, which the metal detector omits.
- **Story analogy** — Hadamard and de la Vallée Poussin proving it independently in the same year, 1896, thirty-seven years after Riemann's paper suggested the route: this places the zero-free region historically as a hard-won result in its own right, not a technicality.
- **ANTI-ANALOGY — "RH is the engine of the proof."** Directly installs MC-1, and it is a common informal phrasing. The engine is the zero-free region; RH is a proposed upgrade to a part that already works.
- **ANTI-ANALOGY — "ζ′/ζ is just a normalised derivative."** Suggests the operation is cosmetic. It is the entire mechanism, and the phrasing invites MC-2.

## Demonstrations
- **The toy logarithmic derivative.** q(s) = (s − 2)(s − 5)², differentiate logarithmically, read off poles at 2 and 5 with residues 1 and 2. *Elicit the prediction first* — where will the poles be, before any calculation. This is the concept's one fully hands-on demonstration and it requires no complex analysis at all.
- **The labelled critical strip.** One diagram, three annotations: Re(s) = 1 marked *proven zero-free*, Re(s) = ½ marked *conjectured*, the strip between marked *where nontrivial zeros live*. *Predict first*: "which line does the 1896 proof need?"
- **The contour sketch.** A large rectangle in the complex plane with a few poles marked inside; the integral around the boundary equals the sum of what is inside. No computation — the point is that a boundary walk reports on an interior.

## Discovery Questions
**Direct instruction wins for the analytic content, with one genuine discovery embedded — and the split should be stated aloud to the learner.** Nobody derives the PNT proof from questioning, and staging a pretence would misrepresent what the learner accomplished. But MC-2's underlying fact *is* discoverable in ninety seconds:
1. **Genuine discovery (LO2's foundation)**: "Here is q(s) = (s − 2)(s − 5)². Compute q′(s)/q(s) and simplify. Where does it blow up? Why exactly there? What do the numerators tell you?" The learner derives the pole-at-every-zero rule themselves, on an object they fully control.
2. Then **direct instruction, labelled**: "Now I'm going to tell you how that one fact becomes a proof about primes. You won't derive this — I want you to be able to say what each step is for."
3. The chain, stated: ζ′/ζ has poles at ζ's zeros → contour-integrate → residue theorem sums over enclosed zeros → Perron converts to π(x) → the corrections are sized by zero locations → proving no zeros on Re(s) = 1 makes them negligible.
Embedding the one derivable step matters: it is what stops the chain being received as an incantation, and it is the step MC-2 attacks.

## Teaching Sequence
The Blueprint's Component 5 owns the turn-level scripts. Two ordering constraints are load-bearing. First, **the division of labour must be stated in the opening turn**, before any content — MC-3 is instruction-induced by node adjacency and it costs one sentence to prevent and an entire session to recover from, because the learner disengages silently rather than objecting. Second, **the toy logarithmic derivative must precede any mention of ζ.** The pole-at-every-zero fact is general, elementary, and derivable; met first on a polynomial it becomes a tool the learner owns, met first on ζ it becomes another unexplained property of an already-mysterious function, and MC-2 follows. RH comes last and comes with the geometric picture already drawn, so that when the stronger claim is finally named there is a *place* to put it rather than an adjacent phrase to fuse with.

## Tutor Actions
- **DO: Worked Example** — the toy logarithmic derivative. First choice, and the only genuinely hands-on action available here.
- **TEST-THINKING: Prediction** — pole locations predicted before differentiating.
- **SHOW: Diagram** — the two labelled vertical lines, carrying epistemic status as well as position.
- **ORGANIZE: Concept Map** — the proof chain as a sequence of boxes, each labelled with what it is *for*. This is the artefact that survives the session.
- **TEST-THINKING: Error Analysis** — "a nontrivial zero is found at Re(s) = 0.7: what breaks?"
- **Does NOT fit: Demonstration of the actual proof.** Perron's formula and the contour-shifting estimates are genuinely out of scope; attempting them converts an orientation into a failed lecture.
- **Does NOT fit: Drill.** No procedure to automate.

## Voice Teaching Notes
The load-bearing sentence is "the poles of ζ′ over ζ sit exactly at the zeros of ζ." Slow down through *exactly at the zeros*; the sentence is short, it is the hinge of the whole concept, and it is easy to deliver as throat-clearing. Listen for the learner saying "zeta prime over zeta" fluently versus stumbling on it — fluency in *pronouncing* the object is a genuine prerequisite for reasoning about it, and a learner who cannot say it aloud will not hold it in working memory through a three-step chain. Also listen for the flat, disengaged register that signals MC-3 ("mm-hm, yeah, we covered this") — that is the earliest and often the only signal, and it appears in prosody rather than in any answer. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong on the 1896 probe** — MC-1, and note it may be *recurring* rather than new; check whether it was previously repaired in `math.nt.analytic-number-theory` and if so treat the regrowth as evidence the verbal repair does not hold, going straight to the geometric one.
- **Correct pole locations, wrong residues** — MC-2 partially repaired: the learner has the location rule and not the multiplicity rule. A narrow gap, repaired with one more toy example, not a re-teach.
- **Fluent restatement of PNT with nothing to say about mechanism** — MC-3. The learner is answering from the previous concept. This is invisible to any probe that asks about the theorem rather than about the proof.
- **Slow-correct on the whole chain** — expected and healthy at this difficulty; the chain has five links and reconstructing it is the mastery behaviour, not a fluency deficit. Do not treat latency as fragility here.
- **Mastery trigger**: the Blueprint's gate at MAMR 3/5, with the added requirement that the "which line does the proof need" item be correct. A pass without it certifies vocabulary over placement.

## Tutor Recovery Strategy
The likely utterance is "I can't follow the chain" — accurate, and usually a working-memory failure across five linked steps rather than a failure at any one. The concept-specific smaller question drops to the single derivable link: **"Just this: q(s) = (s − 2)(s − 5). Where does q′(s)/q(s) blow up?"** No zeta, no contour, no primes, and the answer is available by inspection. Rebuild one link at a time, writing each down so the chain is on paper rather than in the learner's head — this concept's load is almost entirely the chain length, and externalising it is the intervention. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept**, with one embedded **procedure** (logarithmic differentiation of a factored polynomial). Review both: the procedure speeded, the chain as explanation-on-demand.
- Concept-specific deviation: the chain decays link-by-link rather than as a whole, and a learner who has lost link 3 will still recite links 1, 2, 4, 5 convincingly. Review must ask for the chain *in order and complete*, not for a summary.
- Interleaving partners: `math.nt.prime-distribution` and `math.nt.analytic-number-theory` — deliberate three-way discrimination is worth more than review of any one, because MC-3 is precisely a discrimination failure. `math.nt.riemann-hypothesis` joins the set once reached.

## Transfer Connections
- **Near**: `math.nt.riemann-hypothesis`, which is this concept's zero-location mechanism pushed to its strongest form.
- **Far**: the general technique of studying a function's zeros by studying its logarithmic derivative's poles — reusable anywhere in complex analysis, and independent of number theory.
- **Real-world**: none honest at this level. The mechanism has no application outside mathematics that can be stated without distortion.
- **Expert transfer**: the recognition that a *statement* and its *proof* can have entirely different prerequisite structures — PNT can be understood with real-variable ideas and proven only with complex ones. That distinction reshapes how a learner reads every subsequent theorem.

## Cross-Subject Connections
- The KG lists `math.cx.riemann-zeta` as a cross-link; unauthored in this corpus, so no probe can be built against it yet.
- No genuine cross-subject connection exists for this concept, and the honest answer is to say so. The `math.cx.complex-integration` dependency is intra-subject.

## Blueprint References
`docs/curriculum/blueprints/math.nt.prime-number-theorem.md`. Reused by reference, not restated: the Misconception Registry and repair actions B01–B03 (Component 6), the worked examples including the toy polynomial logarithmic derivative (Component 4), the teaching-action scripts (Component 5), and the mastery gate item set. This entry adds birth types (including the finding that MC-1 is a *regrowth* of an earlier concept's misconception with an external source, not a fresh one), the mental-model ladder, the two anti-analogies, the embedded-discovery split, the chain-length diagnosis behind the recovery question, and the prosodic detection signal for MC-3.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Reinforces the finding recorded in `math.nt.analytic-number-theory`'s entry: this is the third of three research-level nodes on adjacent ground, and its own Blueprint had to invent a misconception (MC-3) purely to defend the node's distinctness. That a Blueprint must argue for its concept's right to exist is a signal worth passing to the Curriculum Production Pipeline — the mathematics is genuinely distinct, but the KG's three descriptions do not make the boundaries visible without reading all three Blueprints in full. Recorded, not fixed.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1).
