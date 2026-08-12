# math.nt.continued-fractions

## Identity
- **KG ID**: `math.nt.continued-fractions`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.euclidean-algorithm` — load-bearing part: the repeated "replace (a,b) with (b, a mod b)" division step *and* its termination guarantee. This concept is that algorithm with the quotients kept instead of discarded; a learner who runs it as a memorised GCD recipe will not recognise it here.
  - `math.seq.convergent` — load-bearing part: what it means for a sequence of *approximations* to converge to a value. Needed only for the infinite case, but load-bearing there.
- **Unlocks**: `math.nt.pells-equation`
- **Cross-links**: none in the KG
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.7 (⌈0.7×5⌉ = 4/5)
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.nt.continued-fractions.md` (reused by reference throughout)

## Learning Objective
- The learner can expand a rational number as a finite continued fraction by running the Euclidean algorithm and recording each quotient.
- The learner can state and justify the termination criterion: the expansion is finite exactly when the number is rational, because it *is* the Euclidean algorithm and that terminates exactly for rationals.
- The learner can recognise (orientation level, no proof) that quadratic irrationals have eventually periodic expansions, and that this is special to them rather than typical of irrationals.

## Core Understanding
A continued fraction expansion of a/b is not a new algorithm. It is the Euclidean algorithm, run unchanged, with the quotients written down instead of thrown away: at each step a/b = a₀ + 1/(b/r) where a₀ = ⌊a/b⌋ is the Euclidean quotient and r the remainder, and the same division is then applied to b/r. Everything else follows from that identity. Termination is inherited, not separately proven — the remainders strictly decrease and reach 0 exactly when the input is rational, so a rational's expansion is finite and an irrational's is infinite; termination and rationality are one fact wearing two names. For an infinite expansion, the object it denotes is the limit of its successive truncations (the convergents), which is where `math.seq.convergent` is genuinely needed rather than decorative. Finally, roots of integer quadratics — √2, √3, φ — have eventually *periodic* coefficient sequences, a deep and non-obvious theorem (Lagrange), and periodicity is a property of quadratic irrationals specifically, not of irrationals in general.

## Mental Models
1. **Beginner — the nested box.** a₀ + 1/(a₁ + 1/(a₂ + …)) read as boxes inside boxes, each holding the next. *Upgrade trigger*: being asked where the numbers a₀, a₁, a₂ come from. *Shelf life*: purely notational; collapses the moment computation starts.
2. **Intermediate — the Euclidean ledger.** Run the Euclidean algorithm and keep a ledger of the quotients; the ledger *is* the expansion. *Upgrade trigger*: an irrational input, where the ledger never closes. This is the model the whole concept is built to install.
3. **Advanced — best rational approximations.** The truncations (convergents) are, in a precise sense, the best rational approximations to the value for their denominator size. *Upgrade trigger*: asking why 22/7 and 355/113 keep appearing for π.
4. **Expert — periodicity as an algebraic fingerprint.** An eventually periodic coefficient sequence is a visible signature of satisfying a quadratic over ℤ. *Shelf life*: install as an orientation, not as a proof; Lagrange's theorem is deliberately out of scope.

## Why Students Fail
The dominant failure is that the concept is filed as new. It is introduced with new notation, in a new lesson, under a new name, so the learner builds a second, parallel procedure and memorises it — and then cannot answer any question about termination, because termination is a property of the algorithm they did not realise they were running. The second failure is that "terminates" and "is rational" are taught as two facts with a link between them, so the learner keeps hunting for a bridge that does not exist: they are the same fact. The third is generalising the striking √2 example — the first and often only irrational expansion a learner computes — into a belief about all irrationals.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — CONTINUED-FRACTION-ASSUMED-SEPARATE-ALGORITHM** (foundational)
  - **Birth type**: Type 5, instruction-induced. Nothing about the learner's intuition produces this; it is manufactured by presenting the expansion under its own heading with its own notation, before the identity with the Euclidean algorithm is made visible.
  - **Characteristic phrase**: "wait, do I do the GCD thing first, or the fraction thing?"
  - **Detection probe** (verbatim): "Is computing a continued fraction a different algorithm from the Euclidean algorithm, or the same one?"
  - **Repair**: Blueprint Repair Action B01 — the side-by-side computation of 67/29, Euclidean steps in the left column and coefficients in the right, written *simultaneously* rather than one after the other.
  - **Verification of death**: hand the learner a completed Euclidean algorithm trace for a new pair and ask them to read off the continued fraction without redoing any division.

- **MC-2 — TERMINATION-ASSUMED-INDEPENDENT-OF-RATIONALITY** (high)
  - **Birth type**: Type 5, instruction-induced, downstream of MC-1. Once the two algorithms are separate objects, their termination properties are separate too, and the learner reasonably starts looking for a rational number whose expansion runs forever.
  - **Characteristic phrase**: "could a fraction just keep going?"
  - **Detection probe**: "Could an irrational number have a terminating expansion? Could a rational one go on forever?"
  - **Repair**: Blueprint Repair Action B02 — re-anchor on the strictly decreasing non-negative remainders. A finite descending chain of non-negative integers must stop; that single observation closes both halves at once.
  - **Verification of death**: the learner explains termination *without* mentioning continued fractions, purely as a fact about remainders.

- **MC-3 — PERIODICITY-ASSUMED-UNIVERSAL-FOR-IRRATIONALS** (moderate)
  - **Birth type**: Type 1, overgeneralisation, from a sample of one. √2 = [1; 2,2,2,…] is beautiful, memorable, and the only infinite expansion most learners ever compute by hand.
  - **Characteristic phrase**: "so every irrational eventually repeats."
  - **Detection probe**: "Does every irrational number's expansion eventually become periodic?"
  - **Repair**: Blueprint Repair Action B03 — show the opening coefficients of π's expansion ([3; 7, 15, 1, 292, 1, 1, 1, 2, 1, …]), which are conspicuously patternless, immediately beside √2's. One counterexample is enough and this one is vivid.
  - **Verification of death**: asked which of √7, π, e, φ have periodic expansions, the learner sorts by "is it a root of an integer quadratic?" rather than by "is it irrational?".

## Analogies
- **Best — long division that keeps its receipts.** The Euclidean algorithm throws away the quotients and keeps the last remainder; the continued fraction throws away nothing. *Breaking point*: it says nothing about what an *infinite* receipt means, so it must be retired before the irrational case.
- **Alternative — zooming in on a ruler.** Each coefficient says how many whole copies of the current unit fit, then the leftover becomes the new unit. *Breaking point*: implies a physical stopping point, which is exactly the intuition to avoid for irrationals.
- **Story analogy** — measuring a room with a stick: the stick fits 2 times with a bit over; that bit fits into the stick 3 times with a bit over; and so on. Ancient, correct, and genuinely how the algorithm was first understood.
- **ANTI-ANALOGY — "it's like a decimal expansion."** Superficially close and actively harmful: decimals terminate for *some* rationals only (1/3 does not), so importing the decimal termination rule predicts the wrong criterion here and manufactures MC-2. If a learner offers it, the correction is one line — "decimals terminate depending on the base; this depends on nothing but rationality."

## Demonstrations
- **The two-column trace of 67/29.** Euclidean divisions on the left, coefficients accumulating on the right. *Elicit first*: "we already know how to find gcd(67,29). Do that. Now don't erase the quotients." The demonstration is that nothing new was done.
- **Reconstruct the fraction from the coefficients.** Fold [2; 3, 4, 2] back up into a single fraction and confirm it equals the original. *Predict first*: "will we get exactly 67/29 back, or something close?" — the exactness is the point.
- **√2 by hand, three steps.** Watch the same sub-problem reappear at step 2, which *is* the periodicity, seen rather than asserted. *Predict first*: "will this ever finish?"

## Discovery Questions
Guided discovery is right for LO1 and LO2 and wrong for LO3; the sequence below reflects that split honestly rather than pretending Lagrange's theorem is discoverable in a lesson.
1. **Need**: "Write 67/29 as a whole number plus something smaller than 1. Now do the same to the something." (No new machinery has been introduced; the learner has already started.)
2. **Playground**: repeat until it stops. Record what you divided each time.
3. **Invention**: "Compare your list of divisions to the Euclidean algorithm on the same pair. What do you notice?"
4. **Collision**: "Try it on √2. When does it stop?" — the learner discovers it does not, and discovers *why* without being told.
5. **Formalisation**: name the coefficients, state the termination criterion as an iff.
6. **Compression**: "The expansion is the Euclidean algorithm's quotients. It stops exactly when the number is rational."
For LO3, **direct instruction wins and should be labelled as such**: the periodicity of quadratic irrationals is not reachable by guided questioning in this concept's scope, and pretending otherwise wastes the learner's time. State the theorem, show √2 and π side by side, and say plainly that the proof is deferred.

## Teaching Sequence
The Blueprint's Component 5 owns the turn-level scripts and is cited, not restated. The pedagogically load-bearing ordering constraint is that **the Euclidean identity must be established before the notation is introduced** — not after, and not alongside. Every downstream difficulty in this concept traces to MC-1, MC-1 is purely instruction-induced, and it is created precisely by leading with the nested-fraction glyph. Secondly, the termination criterion must be derived from the *remainder* argument, not stated as a fact about continued fractions, or MC-2 survives the lesson intact. Thirdly, the irrational case must come after both, and the periodicity claim must be immediately paired with a non-periodic counterexample in the same breath — separating them by even one turn is enough for MC-3 to set.

## Tutor Actions
- **ORGANIZE: Representation Table** — the two-column Euclidean/coefficient trace. First choice; it is the whole concept in one artefact.
- **DO: Worked Example** — folding the coefficients back up to recover the original fraction.
- **TEST-THINKING: Prediction** — "will √2 terminate?" asked before it is run.
- **TEST-THINKING: Error Analysis** — the false claim "all irrationals eventually repeat", disproved with π's coefficients.
- **Does NOT fit: Analogy-first.** Unusually for this corpus, analogy should *follow* computation here rather than precede it: the concept's difficulty is recognitional (seeing an old algorithm in new clothes), and an analogy delivered first supplies a third object to relate rather than collapsing two into one.

## Voice Teaching Notes
The load-bearing sentence is "this is the Euclidean algorithm — we are just keeping the quotients." Say it while the learner is mid-computation, not before and not after. Listen for the learner narrating the divisions in Euclidean-algorithm language ("so 67 divided by 29 is 2 remainder 9") versus continued-fraction language ("so a-nought is 2") — the first indicates the identity has landed, the second that a parallel procedure is being maintained, and the switch in vocabulary is audible before any answer is wrong. Reading the notation aloud is itself a stumbling point: model "two, then one over three, then one over four" rather than letting the learner silently parse the nested glyph. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Correct expansion, wrong termination answer** — the commonest split and the diagnostic one: the procedure is fluent and the identity is absent. This is MC-1 with a working procedure on top, and it must not be allowed to certify the gate.
- **Fast-wrong on "could a rational go forever?"** — MC-2, dominant strength. Go to B02's remainder argument, not to another example.
- **Slow-correct on termination** — the learner is re-deriving from the remainder chain each time. FRAGILE but healthy; this is the right thing to be slow at, and it consolidates with one or two more instances.
- **Fast-correct on periodicity for √2, wrong for π** — MC-3, and note it is invisible if only √2 is ever probed. The probe set must contain a non-quadratic irrational or the misconception passes the gate undetected.
- **Mastery trigger**: the Blueprint's Component 5 gate at MAMR 4/5, with the added requirement that the termination item be justified by the remainder argument rather than by assertion.

## Tutor Recovery Strategy
The likely utterance is "I've lost track of what I'm dividing" — this concept's recursion is genuinely easy to lose one's place in, and that is a working-memory failure, not a conceptual one. The concept-specific smaller question is **"Just this one step: 29 goes into 67 how many times, and what's left over?"** — one division, no nesting, no notation. Then write it down for the learner and hand the next single step back. Do not re-explain the concept; the concept is not what failed. Generic recovery machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure** (LO1) fused with **concept** (LO2/LO3). Review must cover both forms: a speeded expansion of a small rational, *and* an explanation-on-demand of the termination criterion. Drilling only the procedure will show fluency while the concept has decayed.
- Concept-specific deviation: the termination criterion decays faster than the procedure and should be re-probed on a schedule of its own.
- Interleaving partners: `math.nt.euclidean-algorithm` (the discrimination that matters most — mix them until the learner stops treating them as different), and `math.nt.pells-equation` once reached, since the convergents are the machinery there.

## Transfer Connections
- **Near**: `math.nt.pells-equation`, where the convergents of √D supply the solutions directly.
- **Far**: best-rational-approximation problems generally — why 355/113 is an extraordinarily good π approximation and 22/7 merely a good one.
- **Real-world**: gear-ratio and calendar design, where a rational approximation with a small denominator is required and the convergents are exactly the candidates worth considering.
- **Expert transfer**: the habit of recognising a known algorithm inside unfamiliar notation — the single most reusable thing this concept teaches, and worth naming to the learner explicitly.

## Cross-Subject Connections
- **Computer science**: the Stern–Brocot / mediant structure and rational-approximation routines in exact-arithmetic libraries are continued fractions under another name. Genuine, though the KG records no edge.
- The KG lists no `cross_links` for this concept. That is an honest reflection of a fairly self-contained node; the CS connection above is recorded as feedback below rather than asserted as a KG fact.

## Blueprint References
`docs/curriculum/blueprints/math.nt.continued-fractions.md`. Reused by reference, not restated: the Misconception Registry and repair actions B01–B03 (Component 6), the worked examples including the 67/29 trace and the √2 expansion (Component 4), the teaching-action scripts (Component 5), and the mastery gate item set. This entry adds birth types, the mental-model ladder, the decimal-expansion anti-analogy, the recognitional diagnosis of why MC-1 dominates, and the recovery shrink-question.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
The KG records no cross-link between this concept and `math.nt.euclidean-algorithm` beyond the `requires` edge, but the relationship is far stronger than an ordinary prerequisite — this concept *is* that algorithm re-read. A `cross_links` entry would carry information the `requires` edge does not. Recorded for the Curriculum Production Pipeline; not fixed here. Separately, the Blueprint's Component 8 states `estimated_hours = 6` while the KG states 10; per the standing rule the KG value is authoritative and is what this entry's Identity records.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1).
