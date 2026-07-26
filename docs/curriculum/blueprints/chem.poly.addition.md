# chem.poly.addition — Addition Polymerization

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.poly.addition` |
| Domain | Polymers |
| Requires | `chem.hyd.alkenes`, `chem.org.reactive-intermediates` |
| Unlocks | `chem.poly.properties` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Addition and condensation polymerization are distinguished by MECHANISM (whether a small molecule is ejected per monomer-monomer bond), never by chain length — condensation polymers (e.g., nylon) eject H₂O or HCl at every amide/ester bond, so the repeat unit has FEWER atoms than the sum of its monomers, while addition polymers' repeat unit formula exactly equals the monomer formula, with no atom lost; a radical initiator does NOT react with just one monomer and terminate — the propagating radical adds thousands to hundreds of thousands of monomer units (degree of polymerization DP~10³–10⁵) before a rare bimolecular termination event, since two propagating radicals meeting in dilute solution is statistically uncommon; and polyethylene's physical properties depend critically on synthesis METHOD, not just monomer identity — free-radical polymerization gives LDPE (branched chains from backbiting, poor packing, low density, flexible), while Ziegler-Natta catalysis gives HDPE (linear chains, tight packing, high density, rigid) — "same monomer" does not mean "same material."

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing nylon's amide-bond formation (explicitly ejecting H₂O per bond, repeat unit smaller than monomer sum) against polyethylene's addition mechanism (no atom lost, repeat unit = monomer formula exactly).

**Representational**: A chain-growth cascade diagram showing one initiator radical propagating through thousands of monomer additions before a rare termination event, visually contrasting the tiny initiation step against the vast propagation phase.

**Abstract**: The general mechanistic (not size-based) distinction between addition and condensation polymerization; the general principle that propagation dominates the polymer-formation timeline, with termination being comparatively rare; the general principle that synthesis method (not monomer identity alone) determines polymer microstructure and hence bulk properties.

**Transfer**: Given an unfamiliar polymer, correctly classifying it as addition or condensation from whether a byproduct is ejected per bond, correctly estimating the propagation-dominated chain-growth process, and correctly predicting differing physical properties from differing synthesis methods for the same monomer.

## 3. Why Beginners Fail

Students conflate all polymer formation as fundamentally similar, perhaps having heard that condensation produces "smaller" polymers or a byproduct, but conflating this with molecular mass rather than mechanism, missing that the actual distinguishing feature is whether a small molecule (H₂O, HCl) is EJECTED at each monomer-monomer bond — condensation polymers lose atoms per bond (repeat unit smaller than the sum of monomers), addition polymers lose none; students know radicals are highly reactive and assume they instantly react with the nearest available bond and stop, missing that the propagating radical actually "rides" the growing chain end through a cascade of typically 1,000–100,000 monomer additions before a comparatively rare bimolecular termination event; and students taught only "ethene polymerises to polyethylene" without distinguishing synthesis methods assume all polyethylene is materially identical, missing that free-radical polymerization (branched, LDPE) and Ziegler-Natta catalysis (linear, HDPE) produce profoundly different materials from the identical monomer, purely due to differing chain microstructure from differing mechanisms.

## 4. Misconception Library

### MC-1: Addition polymerisation and condensation polymerisation are distinguished only by the size of the polymer chain
- **Probe**: "Nylon is formed from hexanedioic acid and hexane-1,6-diamine. Is this addition or condensation polymerisation? What is lost in each monomer-monomer reaction?"
- **Characteristic phrase**: "both types make long chains so it's the same" / "addition if the chain is long enough."
- **Trigger (Type 1, overgeneralization)**: Students conflate all polymer formation; they may have heard that condensation produces "smaller" polymers or produces a byproduct, but conflate this with molecular mass rather than mechanism.
- **Conflict evidence [P28]**: Nylon is condensation — each amide bond formation ejects H₂O (or HCl if an acyl chloride is used); the repeat unit has FEWER atoms than the sum of its two monomers. Addition polymers: repeat unit=monomer formula, no atom lost. Chemical test: burn the polymer — if water is released only from combustion (not from the polymerisation step), it's addition.
- **Bridge [P30]**: The addition-vs-condensation classification is a statement about the MECHANISM of bond formation (whether a byproduct is ejected), not about the eventual size of the resulting polymer chain — a very long addition polymer and a very short condensation oligomer are both classified correctly by checking for an ejected byproduct at each bond, never by comparing chain lengths.
- **Replacement [P31]**: Always classify polymerization by checking whether a small molecule is ejected at each monomer-monomer bond (condensation: yes; addition: no) — never by chain length or polymer size.
- **Discrimination pairs [P33]**: Nylon (condensation, H₂O ejected per amide bond, repeat unit < monomer sum) vs. polyethylene (addition, no atom lost, repeat unit = monomer formula).
- **S6 repair path**: Present the explicit atom-accounting comparison for nylon's amide-bond formation vs. polyethylene's addition mechanism, deriving the classification from atoms gained/lost, not chain length.

### MC-2: The radical in addition polymerisation is immediately destroyed after initiator decomposition
- **Probe**: "In radical polymerisation, how many monomer units does each initiator radical typically add to the chain before termination?"
- **Characteristic phrase**: "the radical reacts with just one monomer then it's gone."
- **Trigger (Type 2, perceptual intuition)**: Students know radicals are reactive and assume they instantly react with the nearest available bond; they don't picture the chain-growth cascade where the radical "rides" the propagating end for thousands of steps before being destroyed.
- **Conflict evidence [P28]**: The initiator radical adds to a monomer → new radical; this new radical adds to another monomer → new radical; and so on, typically 1,000–100,000 times per initiation event. The average degree of polymerisation (DP) is 10³–10⁵. Termination is a bimolecular event that requires two chain radicals to meet — statistically rare in the dilute propagating solution.
- **Bridge [P30]**: A radical's high REACTIVITY (its tendency to react rapidly with an available bond) does not mean it is quickly CONSUMED entirely — each reaction with a monomer regenerates a new radical at the chain's growing end, so the radical character persists and propagates through the chain rather than being extinguished after a single reaction; only a chance encounter between two such propagating radicals (a comparatively rare bimolecular event in dilute solution) actually terminates the chain.
- **Replacement [P31]**: A propagating radical adds thousands to hundreds of thousands of monomer units before termination — never assume a radical is consumed after reacting with just one monomer.
- **Discrimination pairs [P33]**: Single initiation event (→ one radical, persists through DP~10³–10⁵ monomer additions) vs. a naive "one radical, one reaction" model (would predict DP=1, contradicted by observed polymer chain lengths).
- **S6 repair path**: Present the explicit chain-growth cascade diagram, tracking the radical's identity persisting through many successive monomer additions before termination.

### MC-3: All polyethylene is the same regardless of how it is made
- **Probe**: "Why is HDPE suitable for pipes and water containers but LDPE is used for plastic bags?"
- **Characteristic phrase**: "they're all the same since the monomer is just ethene."
- **Trigger (Type 5, instruction-induced)**: Introductory courses teach "ethene polymerises to polyethylene" without distinguishing LDPE from HDPE, or radical from Ziegler-Natta processes; students do not connect synthesis method to physical properties.
- **Conflict evidence [P28]**: Radical polymerisation (free radical at moderate pressure) produces LDPE — branched chains (short-chain branching from backbiting) → chains cannot pack closely → lower crystallinity → lower density → flexible, soft. Ziegler-Natta (TiCl₄/AlEt₃ catalyst) produces HDPE — linear chains, no branching → tight packing → higher crystallinity → higher density → rigid, stronger. Same monomer, different mechanism, profoundly different material.
- **Bridge [P30]**: A polymer's bulk physical properties (flexibility, density, strength) are determined by its CHAIN MICROSTRUCTURE (branched vs. linear, and the resulting packing/crystallinity), which is itself determined by the specific polymerization MECHANISM used — identical monomer identity does not guarantee identical microstructure, since different mechanisms (free-radical vs. coordination catalysis) produce structurally distinct chains from the same starting material.
- **Replacement [P31]**: Polyethylene's properties depend on synthesis method (radical→LDPE, branched, flexible; Ziegler-Natta→HDPE, linear, rigid), never assume monomer identity alone determines material properties.
- **Discrimination pairs [P33]**: LDPE (radical, branched, low density, flexible, used for bags) vs. HDPE (Ziegler-Natta, linear, high density, rigid, used for pipes) — identical monomer, opposite property profile.
- **S6 repair path**: Present the explicit branched-vs-linear chain-packing diagram, connecting microstructure to the observed density/rigidity difference.

## 5. Explanation Library

**Primary explanation**: Addition and condensation polymerization are distinguished by mechanism — whether a small byproduct molecule is ejected at each monomer-monomer bond (condensation: yes, e.g., nylon ejecting H₂O; addition: no, e.g., polyethylene) — never by the resulting chain's length or size. In radical addition polymerization, a single initiator radical propagates through a long cascade of monomer additions (DP~10³–10⁵) before a comparatively rare bimolecular termination event; it is not consumed after a single reaction.

**Secondary explanation (synthesis method determines material properties)**: Identical monomers can yield materially different polymers depending on the synthesis mechanism used — free-radical polymerization of ethene produces branched LDPE (poor chain packing, low density, flexible), while Ziegler-Natta catalysis produces linear HDPE (tight packing, high density, rigid), demonstrating that monomer identity alone does not determine bulk polymer properties.

## 6. Analogy Library

- **Primary analogy**: A relay race baton (the radical) passed from runner to runner (successive monomer additions) for thousands of legs before the race finally ends (termination) — the baton doesn't disappear after the first handoff; it keeps moving.
- **Breaking point**: The relay-race analogy conveys the persistent-radical propagation concept well but doesn't naturally capture the addition-vs-condensation byproduct distinction (MC-1) or the branched-vs-linear microstructure-property link (MC-3) — those need the explicit atom-accounting comparison and the chain-packing diagram.
- **Anti-analogy**: Do NOT say "a radical reacts once and is used up, like a match that burns out" — this directly reinforces MC-2 by implying single-use radical reactivity.

## 7. Demonstration Library

- **Demonstration 1 (atom-accounting addition-vs-condensation comparison)**: Compare nylon's amide-bond formation (H₂O ejected) against polyethylene's addition mechanism (no atom lost) explicitly.
- **Demonstration 2 (chain-growth cascade diagram)**: Draw the explicit radical-propagation cascade, tracking DP through thousands of successive monomer additions before termination.
- **Demonstration 3 (branched-vs-linear polyethylene packing diagram)**: Present LDPE's branched-chain packing against HDPE's linear-chain packing, connecting microstructure to density and rigidity.

## 8. Discovery Lesson

**Opening**: "Nylon and polyethylene are both long-chain polymers. Are they made the same way?"

**Exploration**: Students compare atom accounting for nylon's amide-bond formation against polyethylene's addition mechanism, discovering the byproduct-ejection distinction.

**Synthesis**: Guide toward: addition vs. condensation is a mechanistic classification (byproduct ejected or not), never a size-based one.

**Closure**: "Are LDPE and HDPE the same material, since both come from ethene?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit atom-accounting comparison for nylon vs. polyethylene.
- **TA-2 (TELL)**: State the persistent-radical propagation cascade explicitly, anchored to the DP~10³–10⁵ range.
- **TA-3 (DO)**: Student classifies an unfamiliar polymer as addition or condensation from its monomer-bond-formation mechanism.
- **TA-4 (TEST-THINKING)**: Present the LDPE-vs-HDPE probe and ask the student to justify the property difference from synthesis-method microstructure.

## 10. Voice Teaching

Whenever polymer type is classified, narrate "check for an ejected byproduct at each bond — never judge by chain length." Whenever radical polymerization is discussed, state "the radical persists through thousands of additions, not just one" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly classify a polymer as addition or condensation from mechanism, (b) correctly explain the persistent, long-cascade nature of radical propagation, (c) correctly attribute differing polyethylene properties to differing synthesis methods.

- **FA-1**: "Is nylon formation addition or condensation polymerisation? What is lost in each bond formation?" — targets MC-1.
- **FA-2**: "How many monomer units does each initiator radical typically add before termination?" — targets MC-2.
- **FA-3**: "Why is HDPE suitable for pipes but LDPE is used for plastic bags?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only seen "long polymer chain" as a shared visual feature of both mechanism types.

**Delayed retrieval**: Re-probe MC-1's mechanistic classification and MC-3's synthesis-method-property link before `chem.poly.properties` requires fluent reasoning about how polymer microstructure determines bulk material behavior.

## 12. Recovery Notes

- **S3 (stuck)**: For the classification confusion, have the student explicitly check for an ejected byproduct at each bond before classifying, never judging by chain length.
- **S4 (frustrated)**: Normalize — conflating addition and condensation by chain-length appearance is genuinely common on first exposure to polymer chemistry.
- **S6 (collision)**: Use the explicit chain-growth cascade diagram for MC-2; use the branched-vs-linear packing diagram for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why LDPE and HDPE have different properties despite sharing the same monomer.

## 13. Memory & Review

Tag as two conceptual-correction memories (mechanistic addition/condensation classification; synthesis-method-determines-properties principle) plus one procedural memory (persistent-radical chain-growth cascade). Schedule a spaced check at ~1 week and again before `chem.poly.properties`.

## 14. Transfer Map

Feeds directly into `chem.poly.properties` (polymer bulk properties directly require the microstructure-property reasoning established here for LDPE vs. HDPE).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
