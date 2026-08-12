# math.nt.riemann-hypothesis

## Identity
- **KG ID**: `math.nt.riemann-hypothesis`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.prime-number-theorem` — load-bearing part: the mechanism by which zero *locations* control the size of the PNT's correction terms. Without it, RH is an unmotivated claim about a function; with it, RH is the statement that the corrections are as small as they could possibly be.
  - `math.cx.riemann-zeta` — load-bearing part: ζ as an actual function with trivial zeros at the negative even integers and nontrivial zeros in the critical strip. RH is a claim about *which* zeros; the taxonomy must already exist.
- **Unlocks**: none in the KG
- **Cross-links**: `math.cx.riemann-zeta`
- **Difficulty**: research
- **Bloom level**: evaluate
- **Mastery threshold**: 0.5 (⌈0.5×5⌉ = 3/5)
- **Estimated hours**: 100
- **Blueprint**: `docs/curriculum/blueprints/math.nt.riemann-hypothesis.md` (reused by reference throughout)

## Learning Objective
- The learner can state RH precisely — every nontrivial zero of ζ has real part exactly ½ — and locate it on the spectrum between the proven zero-free region and the unproven exact-location claim.
- The learner can explain why RH is equivalent to the best possible error term in the Prime Number Theorem, extending the zero-location mechanism already established.
- The learner can distinguish overwhelming partial evidence (trillions of verified zeros; a proven 40%-on-the-line result) from a proof, and can say why the distinction is not pedantry.

## Core Understanding
Three claims about the same objects, at three different epistemic statuses, and the entire concept is keeping them apart. (1) *Proven*: ζ(s) ≠ 0 on the line Re(s) = 1 — established 1896, and it is exactly what the PNT's proof consumes. (2) *Proven, partial*: at least 40% of nontrivial zeros lie on Re(s) = ½, and the first ten trillion have been verified there numerically. (3) *Conjectured, open since 1859*: **every** nontrivial zero lies on Re(s) = ½. Claim 3 is the Riemann Hypothesis. Its consequence is quantitative and precise: the PNT's error, |π(x) − Li(x)|, is bounded by how close the zeros sit to the critical line, and RH would give O(√x log x) — the tightest bound of this form obtainable. Bloom level `evaluate` is the correct tag and not an inflation: the learner's real task here is not to compute anything but to *judge* what a given body of evidence does and does not establish, and (2) is designed to be tempting.

## Mental Models
1. **Beginner — the million-dollar unsolved problem.** RH is famous, open, and worth a Clay prize. *Upgrade trigger*: asking what it actually says. *Shelf life*: this is the model the learner arrives with, it is not wrong, and it is nearly contentless — treat it as a starting address, not a foundation.
2. **Intermediate — the three-claim spectrum.** Proven-weak, proven-partial, conjectured-strong, as three marks on one line. *Upgrade trigger*: asking why anyone cares which is which. This is the model the concept exists to install, and it is the one MC-1 and MC-2 both attack.
3. **Advanced — the error-term dial.** Zero locations set the size of the PNT's error; the closer to the critical line they all are, the tighter the bound; RH is the setting where the dial is as far as it goes. *Upgrade trigger*: asking whether any bound is known unconditionally — the answer is yes, weaker ones, which is what makes RH an *improvement* rather than a *foundation*.
4. **Expert — RH as a hub.** Hundreds of theorems are stated "assuming RH", and a proof would settle them at once. *Shelf life*: install only if the learner asks why it is famous rather than merely hard; otherwise it invites the "everything depends on it" reading that is MC-2.

## Why Students Fail
The failure here is epistemological, not mathematical, and it is unusual in this corpus for being *culturally* supplied. Every popular treatment of RH the learner has encountered compresses three claims into one dramatic sentence, and drama is what makes the compression durable: "we don't understand the primes and this is why" is a better story than "we have a proven theorem and are seeking a sharper error bound." The second failure is the evidence trap, and it is deliberately baited by the facts themselves. Ten trillion verified zeros is not a small sample by any standard the learner has ever applied to anything, and 40% is a *proven theorem*, not a survey. A learner reasoning as they would in any empirical subject reaches "essentially settled" by entirely sound domain-general reasoning — which is precisely why it must be addressed as a claim about *what mathematics requires*, not as a failure of care.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — ZERO-FREE-REGION-CONFLATED-WITH-RH** (foundational)
  - **Birth type**: Type 3, language contamination. Both claims are sentences of the form "zeros of zeta are/aren't somewhere", both involve a vertical line, and the technical vocabulary is identical. Nothing in the *language* distinguishes a proven claim about one line from a conjectured claim about another.
  - **Characteristic phrase**: "the zero thing — the one that's unproven."
  - **Detection probe** (verbatim): "The 1896 proof of the Prime Number Theorem used a fact about ζ's zeros. Is that fact the Riemann Hypothesis?"
  - **Repair**: Blueprint Repair Action B01 — the three-claim spectrum drawn as a single picture with status labels attached to positions. This misconception is defeated geometrically or not at all; it has already survived verbal correction in the two prerequisite concepts.
  - **Verification of death**: "A nontrivial zero is found at Re(s) = 0.9. Which claims survive?" (Answer: the zero-free region survives — 0.9 ≠ 1; RH is dead.) Only the spatial model produces this.

- **MC-2 — PNT-TRUTH-MADE-CONTINGENT-ON-RH** (high)
  - **Birth type**: Type 3, language contamination, from the same external source, downstream of MC-1. Once the two claims are one claim, the theorem that depends on the proven one appears to depend on the open one.
  - **Characteristic phrase**: "so we don't really know the Prime Number Theorem yet."
  - **Detection probe**: "If RH were disproved tomorrow, would the Prime Number Theorem still be true?"
  - **Repair**: Blueprint Repair Action B02 — the timeline. RH conjectured 1859, PNT proven 1896, RH still open in the present. A theorem proven thirty-seven years *after* a conjecture was stated, and still standing more than a century after, plainly does not wait on it.
  - **Verification of death**: the learner states what RH would and would not change — error bound yes, theorem's truth no — without prompting on either half.

- **MC-3 — PARTIAL-EVIDENCE-MISTAKEN-FOR-PROOF** (moderate)
  - **Birth type**: Type 6, analogy overextension — importing empirical standards of evidence from every other domain the learner knows. Ten trillion confirmations would settle any question in physics, medicine, or engineering. The overextension is reasonable, which is why scolding fails and explaining the domain's standard works.
  - **Characteristic phrase**: "it's basically proven at this point."
  - **Detection probe**: "Ten trillion zeros checked, all on the line, plus a proven result that at least 40% are. Is RH proven?"
  - **Repair**: Blueprint Repair Action B03 — and the strongest available collision is a *counterexample from history*, not an appeal to rigour: conjectures that held for astronomically many cases and then failed (Pólya's conjecture, first counterexample around 9 × 10⁸; Skewes-type crossovers in π(x) − Li(x), where the numerical evidence points the wrong way for an unimaginably long stretch). The second is especially apt here because it is about *this very function*.
  - **Verification of death**: the learner spontaneously distinguishes "verified for every case checked" from "verified for every case" when discussing an unrelated conjecture.

## Analogies
- **Best — three claims on one shelf, labelled.** Proven / proven-partial / open, physically separated. Deliberately mundane: the concept's difficulty is filing, and an exciting analogy competes with the thing being filed.
- **Alternative — the survey and the census.** Checking ten trillion zeros is a survey, however large; a proof is a census that covers everyone including those not yet born. *Breaking point*: real censuses are also finite, so the analogy must be pushed to "a census of an infinite population, which is only possible by argument."
- **Story analogy** — Riemann's 1859 memoir, in which the hypothesis appears as an aside he set aside as unnecessary for his immediate purpose. Genuinely useful: it makes vivid that RH was never load-bearing for PNT even in its author's hands.
- **ANTI-ANALOGY — "RH is the key that unlocks the primes."** Installs MC-2 in one phrase, and it is the single most common popular framing. The primes are not locked; the error bound is not optimal.
- **ANTI-ANALOGY — "it's been tested and it works."** Installs MC-3 by importing the vocabulary of empirical confirmation into a domain that does not accept it.

## Demonstrations
- **The labelled spectrum.** One line, three marks: Re(s) = 1 (proven zero-free, 1896), "≥40% on the line" (proven, partial), Re(s) = ½ for *all* zeros (conjectured, open). *Elicit first*: "which of these do you think the Prime Number Theorem's proof used?" Record the answer before revealing.
- **The failed-conjecture table.** Two or three conjectures with their first counterexample's size, alongside "RH: 10¹³ checked, no counterexample." *Predict first*: "how many confirmations would make you certain?" — then show a conjecture that survived more than the learner's number and still failed. This is MC-3's collision and it lands because the learner named their own threshold first.
- **The disproof thought experiment.** "A zero is found off the critical line. Write down what changes." *Predict first, in writing* — the written answer is the diagnostic, because MC-2 is invisible in a nod.

## Discovery Questions
**Direct instruction wins for the mathematical content — with a genuine, and unusually valuable, discovery available for the epistemology.** No question sequence produces RH or its consequences. But MC-3's correction is fully discoverable and far more durable when the learner reaches it themselves:
1. **Genuine discovery (LO3)**: "How many confirming cases would convince you a mathematical claim is certainly true? Write down a number." → "Here is a conjecture that held for more cases than that, and then failed." → "So what would it take?" The learner derives the necessity of proof from their own answer, which is the only version of this correction that survives contact with the next popular article they read.
2. Then **direct instruction, labelled as such**: the precise statement, the three-claim spectrum, the O(√x log x) bound, the Clay problem status.
3. LO2's mechanism is not re-derived here — it is `math.nt.prime-number-theorem`'s, cited and extended, not repeated.

## Teaching Sequence
The Blueprint's Component 5 owns the turn-level scripts. Two constraints matter pedagogically. First, **the three-claim spectrum must be drawn before RH is stated in full.** A learner who hears the statement first has nowhere to put it except on top of whatever they already believed, and what they already believed is MC-1. Second, **MC-3's discovery step should run before the numerical evidence is presented, not after.** Present ten trillion verified zeros first and the learner forms the "essentially settled" judgement immediately; ask them to name their own threshold first, and the same evidence arrives as a test they have already agreed the rules of. This ordering is the difference between a correction the learner accepts and one they own. RH's fame — the prize, the century — belongs at the very end: introduced early it supplies drama that crowds out the filing task, which is the whole concept.

## Tutor Actions
- **ORGANIZE: Concept Map** — the three-claim spectrum with epistemic status attached. First choice, and the artefact that should stay visible for the entire session.
- **TEST-THINKING: Prediction** — the learner's own evidence threshold, named before any numbers are shown.
- **TEST-THINKING: Error Analysis** — "a zero is found at Re(s) = 0.9: what breaks?"
- **SHOW: Story** — the 1859/1896 timeline, delivered as history rather than as correction.
- **Does NOT fit: Computation of any kind.** There is nothing to compute at this level, and offering a numerical exercise would signal that the concept's content is technical when it is judgemental.
- **Does NOT fit: Game.** The chocolate-covered-broccoli guard applies unusually strongly: zero-hunting visualisations are engaging and teach nothing about the proven/conjectured distinction, which is the entire concept.

## Voice Teaching Notes
The load-bearing sentence is "the Prime Number Theorem is proven; the Riemann Hypothesis is open; the first has never depended on the second." It is the same sentence as in the two prerequisite concepts, and it is repeated deliberately — this is the third and last place to say it, and by now the learner should be able to finish it. Ask them to. Listen for hedging language attached to the *wrong* claim: "the Prime Number Theorem, which they think is true" versus "the Riemann Hypothesis, which is still open" — the placement of the hedge is a direct, conversational read on MC-2 that no probe elicits faster. Also listen for the enthusiasm register around the million-dollar prize; sustained excitement with no accompanying statement of what RH *says* indicates the beginner model has not been upgraded, however engaged the learner sounds. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong on "did the 1896 proof use RH?"** — MC-1, and this is its third appearance across three concepts. Third-time regrowth means the verbal repair is confirmed ineffective for this learner; go to the geometric picture and record the burned collision so it is not retried.
- **Correct RH statement, wrong consequence** ("we'd finally understand the primes") — MC-2 surviving a correct recitation. A probe that asks only for the statement cannot detect this, and this concept's gate must not consist of such probes.
- **"Basically proven"** — MC-3, and note that this is often delivered *confidently and quickly*, which in the D1 grid is the dangerous quadrant: fast and wrong. Do not soften it as a matter of opinion; it is a claim about what constitutes proof and it is incorrect.
- **Slow-correct across all three** — the learner is reconstructing the spectrum each time rather than holding it. Expected at first exposure and genuinely healthy at this difficulty; consolidate rather than advance.
- **Mastery trigger**: the Blueprint's gate at MAMR 3/5, with the added requirement that the disproof thought experiment ("a zero is found at 0.9 — what breaks?") be answered correctly. It is the only item that cannot be passed by recitation.

## Tutor Recovery Strategy
The likely utterance here is not confusion but deflation — "I'm never going to understand this" — because the concept carries a hundred estimated hours, a research tag, and a famous unsolved problem, and the learner reads all three as a verdict on themselves. That is an affect state, and per `../foundations/01-recovery-engine.md` it preempts content. The concept-specific move is to reframe the target honestly and immediately: **"Nobody understands this — that's the actual situation, and it's the point. Here's the only thing I want you to be able to do: given three claims, tell me which are proven. Try these three."** The task is genuinely achievable, it is genuinely the learning objective, and it converts the concept's intimidating surface into the reason the task is easy. Do not shrink to mathematics; shrink to sorting.

## Memory Hooks
- Concept type: **concept**, and specifically a *judgement* skill. Review form is a sorting task — three or four claims, status each — not recall of the statement.
- Concept-specific deviation: all three misconceptions here have an external, continuously refreshed source (popular science writing the learner will keep encountering), so none should ever be marked resolved. Per `../student-state/03`, treat them as DORMANT-VERIFIED permanently, with re-probes continuing indefinitely at long intervals.
- Interleaving partners: `math.nt.prime-distribution`, `math.nt.analytic-number-theory`, `math.nt.prime-number-theorem`. This is the fourth member of a set that must be discriminated, not merely reviewed; mixed status-sorting items drawn across all four are the highest-value review this concept has.

## Transfer Connections
- **Near**: reading any "assuming RH, …" result correctly — recognising it as conditional, and knowing what it would cost to make it unconditional.
- **Far**: the general skill of holding a claim's epistemic status as separate data from its content. This applies to every conjecture, every preprint, and every result the learner will ever read.
- **Real-world**: evaluating claims supported by large but finite evidence — the same reasoning that separates "no failures in ten million trials" from "cannot fail". This is the concept's genuine, and substantial, real-world content.
- **Expert transfer**: comfort operating inside a subject with a known open centre, without either dismissing the settled results around it or overstating what is settled.

## Cross-Subject Connections
- **Computer science** — genuine and load-bearing: the verification of ten trillion zeros is exhaustive testing, and the gap between it and a proof is exactly the gap between testing and formal verification. A learner who holds this concept holds the argument for why a test suite is not a correctness proof, and the transfer is worth making explicit.
- **Science methodology generally**: the contrast is instructive precisely because it runs the *other* way — empirical sciences accept accumulated confirmation, mathematics does not, and understanding why each standard fits its domain is more valuable than treating one as stricter.
- The KG lists `math.cx.riemann-zeta` as a cross-link; it is a `requires` edge as well, so the connection is already load-bearing rather than lateral.

## Blueprint References
`docs/curriculum/blueprints/math.nt.riemann-hypothesis.md`. Reused by reference, not restated: the Misconception Registry and repair actions B01–B03 (Component 6), the worked examples including the three-claim spectrum and the evidence-versus-proof treatment (Component 4), the teaching-action scripts (Component 5), and the mastery gate item set. This entry adds birth types, the mental-model ladder, the two anti-analogies, the failed-conjecture collision (Pólya, Skewes) as MC-3's concrete instrument, the ordering finding that the learner's evidence threshold must be elicited *before* the evidence is shown, the deflation-not-confusion recovery diagnosis, and the permanent DORMANT-VERIFIED ruling on all three misconceptions.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
`estimated_hours: 100` is by a wide margin the largest value in the mathematics KG, and it is not obviously coherent with `mastery_threshold: 0.5` and an orientation-level scope in which the learner computes nothing. The hours figure appears to price *the subject RH sits in* rather than the achievable learning objective, which is a status-sorting skill reachable in a fraction of that time. This is worth the Curriculum Production Pipeline's attention: a learner-facing time estimate of 100 hours attached to a concept whose gate is three sorting items will read as either a warning or a joke, and neither serves. Recorded, not fixed. Separately, this closes the `math.nt` domain at 36/36; the three-node adjacency finding recorded in the two prerequisite entries stands.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1).
