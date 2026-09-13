# math.disc.boolean-circuits — Boolean Circuits

## Identity
- **KG ID:** `math.disc.boolean-circuits`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.propositional-logic`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 5

## Learning Objective
By the end of this concept, the student can: (1) represent Boolean functions as circuits composed of AND, OR, NOT, NAND, and NOR gates, converting a truth table or Boolean formula to a circuit and computing a circuit's output for a given input assignment; (2) define and correctly distinguish circuit DEPTH (longest input-to-output path) from circuit SIZE (total gate count) as genuinely different complexity measures; (3) prove that NAND and NOR are each independently UNIVERSAL gate sets, and construct a two-level AND-OR circuit for any Boolean function directly from its DNF, understanding this is a VALID but not necessarily OPTIMAL implementation.

## Core Understanding
A Boolean circuit is a directed acyclic graph (DAG) where source nodes are inputs (variables), internal nodes are LOGIC GATES computing one Boolean operation, and a sink node produces the output. `math.disc.propositional-logic`'s DNF construction gives a direct recipe for building a circuit from any truth table: each row where the output is TRUE becomes an AND gate over the (possibly negated) input literals, and one OR gate combines all such AND gates — a TWO-LEVEL circuit (depth exactly 2) whose size is the number of true rows plus one.

CIRCUIT SIZE is the total number of gates — it measures total sequential work, or "how much hardware" the circuit uses. CIRCUIT DEPTH is the length of the LONGEST path from any input to the output — it measures PARALLEL time, assuming gates at the same depth level can execute simultaneously. These are genuinely different measures answering different questions: a chain of $n$ single-input NOT gates has size $n$ AND depth $n$ (fully sequential), while a balanced binary tree of $n-1$ AND gates over $n$ inputs has size $n-1$ but depth only $\log_2 n$ (highly parallel). The SAME function can be implemented with different circuits achieving different size/depth trade-offs.

A gate set is FUNCTIONALLY COMPLETE (universal) if every Boolean function can be computed by SOME circuit using only gates from that set. $\{\text{AND},\text{OR},\text{NOT}\}$ is complete by the DNF construction. Remarkably, NAND ALONE is also complete: $\text{NOT}(x)=\text{NAND}(x,x)$ (self-NAND); $\text{AND}(x,y)=\text{NOT}(\text{NAND}(x,y))=\text{NAND}(\text{NAND}(x,y),\text{NAND}(x,y))$; and $\text{OR}(x,y)$ via De Morgan, $=\text{NAND}(\text{NAND}(x,x),\text{NAND}(y,y))$. Since ALL THREE of AND, OR, NOT can each be simulated by a bounded number of NAND gates, and $\{\text{AND},\text{OR},\text{NOT}\}$ is already known complete, NAND alone is complete too — any AND/OR/NOT circuit converts to an equivalent (larger) NAND-only circuit. NOR is complete by the symmetric (dual) argument. In contrast, AND alone (or OR alone) is NOT complete: AND-only circuits are MONOTONE (adding more 1-inputs can only keep or increase the output), so they can never compute NOT, which is anti-monotone.

Universality is a BINARY, qualitative property — it says every function CAN be computed, saying nothing about HOW MANY gates that computation needs. NAND-only circuits typically need MORE gates than an equivalent AND/OR/NOT circuit (a constant-factor overhead), but this efficiency cost does not affect universality itself. Separately, the two-level DNF-derived circuit is always a VALID implementation of any Boolean function, but it is frequently far from OPTIMAL — real circuits exploit SHARED SUBEXPRESSIONS across multiple output terms that the DNF's row-by-row construction misses entirely, sometimes reducing gate count from exponential (worst case, e.g. parity) to linear.

## Mental Models
1. **Rung 1 — a circuit is a DAG of gates; size counts nodes, depth counts the longest path.** Two structurally different measures of the same object.
2. **Rung 2 — universality is binary: CAN this gate set compute everything, not HOW EFFICIENTLY.** Gate-count overhead is a separate, quantitative concern layered on top of the qualitative universality question.
3. **Rung 3 — NAND alone is complete because it can simulate each of AND, OR, and NOT individually.** Since $\{\text{AND},\text{OR},\text{NOT}\}$ is already known complete, simulating all three transitively makes NAND complete too.
4. **Rung 4 — the DNF circuit is valid, not optimal.** A guaranteed-correct-by-construction implementation exists for any truth table, but real circuit design searches for smaller circuits by exploiting shared substructure the DNF's mechanical row-by-row recipe cannot see.

## Why Students Fail
"Depth" and "size" both sound like generic measures of "how big" a circuit is, so students collapse them into one undifferentiated "complexity" notion, computing whichever one comes to mind rather than the one actually asked for. Having encountered the everyday intuition that "more code/more components means more complex, and therefore worse," students often object to NAND's universality on the grounds that it needs more gates — mistaking a genuine efficiency cost (real, but separate) for a fundamental limitation on what NAND circuits can compute. Finally, because DNF is taught as THE canonical normal form for any Boolean function and directly yields a working circuit, students frequently conflate "the DNF-derived circuit" with "the circuit" for a function, missing that shared subexpressions and deeper factoring can produce dramatically smaller optimal circuits.

## Misconceptions

### MC-1: DEPTH-EQUALS-SIZE
- **Birth type:** Type 4 (notation-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Confusing circuit depth with circuit size, using them interchangeably; computing size (total gate count) when asked for depth (longest path) or vice versa, missing that a deep circuit can have few gates and a shallow circuit can have many.
- **Why this birth type:** Notation-induced: "depth" and "size" both intuitively evoke "how big/large something is," and without deliberately separating the two questions they naturally collapse into one undifferentiated "complexity" impression — the terms themselves do not signal that one measures sequential total work and the other measures parallel critical-path length.
- **Detection probe:** "A balanced binary tree of AND gates over 8 inputs has 7 gates. What is its depth?" A student with MC-1 may answer 7 (confusing it with size) instead of the correct $\log_2 8=3$.
- **Repair:** Contrast the chain (size=depth=$n$, fully sequential) against the balanced tree (size=$n-1$, depth=$\log_2 n$, highly parallel) side by side for the SAME function, making the divergence concrete.
- **Verification of death:** Given a novel circuit diagram, the student correctly computes size and depth as two separate numbers without conflating them.

### MC-2: NAND-IS-NOT-UNIVERSAL-BECAUSE-IT-NEEDS-MORE-GATES
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Accepting that NAND can simulate AND, OR, NOT but objecting "it uses more gates, so it's weaker" — conflating circuit efficiency with computational universality.
- **Why this birth type:** An overgeneralization from programming/engineering intuition ("more code = more complex = worse") applied to a fundamentally different, BINARY question — universality asks only whether every function CAN be computed at all, a qualitative property entirely separate from the (real but distinct) quantitative question of gate-count overhead.
- **Detection probe:** "Does NAND's need for more gates to simulate AND/OR/NOT mean NAND-only circuits cannot compute some functions that AND/OR/NOT circuits can?" A student with MC-2 answers "yes" or expresses that NAND is somehow less capable.
- **Repair:** State explicitly: universality is a binary property — a gate set either CAN or CANNOT compute every Boolean function. NAND's gate-count overhead is a constant-factor cost, not a fundamental restriction; since NOT, AND, and OR can each be simulated by a BOUNDED number of NAND gates, any circuit built from the complete set $\{\text{AND},\text{OR},\text{NOT}\}$ converts directly into an equivalent (larger) NAND-only circuit.
- **Verification of death:** The student states clearly that universality and gate-count efficiency are independent questions, and correctly identifies NAND as fully universal despite its overhead.

### MC-3: DNF-AND-CIRCUIT-ARE-THE-SAME
- **Birth type:** Type 5 (instruction-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Conflating the DNF of a Boolean formula with its OPTIMAL circuit; missing that the DNF-derived two-level circuit is a VALID implementation, not necessarily the smallest one, since optimal circuits may exploit shared subexpressions the DNF construction misses.
- **Why this birth type:** Instruction-induced: DNF is taught as the canonical normal form, and the direct two-level circuit it yields is often presented simply as "the circuit for this function" without emphasizing that this is one particular, mechanically-derivable implementation among potentially many, some much smaller.
- **Detection probe:** "Is the DNF-derived circuit for a Boolean function always the smallest possible circuit computing that function?" A student with MC-3 answers "yes."
- **Repair:** Present the parity function as a stark counterexample: its DNF requires $2^{n-1}$ AND gates (exponential), but building it instead from a TREE of XOR gates gives size $O(n)$ and depth $O(\log n)$ — exploiting the shared structure across the function's repeated pattern that the row-by-row DNF construction cannot detect.
- **Verification of death:** Given a specific Boolean function, the student states that its DNF-derived circuit is A valid implementation and actively looks for shared-subexpression opportunities before assuming it is optimal.

## Analogies
1. **The assembly-line analogy.** Circuit size is the total number of workers on an assembly line; circuit depth is the number of SEQUENTIAL stages (each stage's workers can act in parallel) — a factory with 1,000 workers all at one stage is very parallel (low depth, high size); a factory with 10 workers in a strict chain is fully sequential (depth equals size).
2. **The universal-toolkit analogy.** A NAND-only toolkit can build ANY structure an AND/OR/NOT toolkit can — it just might need more individual pieces to build the same structure, the way a set of only screws and no nails can still build any wooden structure a mixed hardware set can, just possibly with more screws used.

## Demonstrations
### Demonstration 1 — gates, circuits, and DNF-derived construction (mirrors Blueprint A01)
For the majority function on 3 inputs $x,y,z$ (output 1 iff at least 2 inputs are 1), the DNF over its 4 true minterms simplifies to $xy\vee xz\vee yz$ — a depth-2, 4-gate circuit (3 AND gates + 1 OR gate).

### Demonstration 2 — depth vs. size, breaking MC-1 (mirrors Blueprint's TB-R01)
For $f=AB\vee CD$: $\text{AND}_1(A,B)$ at depth 1, $\text{AND}_2(C,D)$ at depth 1, $\text{OR}(\text{AND}_1,\text{AND}_2)$ at depth 2 — size 3, depth 2. For $f=((AB)C)D$ (a chained version of the same-length expression): size 3, but depth 3 — the SAME size, a DIFFERENT depth, depending purely on how the gates are arranged.

### Demonstration 3 — NAND's universality proof, breaking MC-2 (mirrors Blueprint A02)
$\text{NOT}(x)=\text{NAND}(x,x)$ (verified: $\text{NAND}(0,0)=\text{NOT}(0\wedge0)=1=\text{NOT}(0)$ ✓). $\text{AND}(x,y)=\text{NAND}(\text{NAND}(x,y),\text{NAND}(x,y))$. $\text{OR}(x,y)=\text{NAND}(\text{NAND}(x,x),\text{NAND}(y,y))$ (via De Morgan). Since all three of AND, OR, NOT are simulated, and $\{\text{AND},\text{OR},\text{NOT}\}$ is already complete, NAND alone is complete.

## Discovery Questions
1. "If a circuit has 7 gates arranged as a chain (each feeding the next), versus 7 gates arranged as a balanced tree, which arrangement lets more gates work AT THE SAME TIME? What does that tell you about depth versus size?"
2. "If NAND needs more gates to build the same function an AND/OR/NOT circuit builds directly, does that mean there's some function NAND-only circuits genuinely CANNOT compute — or just that they need more pieces?"
3. "The DNF of a function always gives you a working circuit. Does 'a working circuit' necessarily mean 'the smallest possible circuit'?"

## Teaching Sequence
Best taught by **direct instruction of the DNF-to-circuit recipe and the depth/size definitions, with a discovery-driven proof of NAND's universality** — the mechanical construction and vocabulary are efficiently presented directly, but Discovery Question 2, followed by the student attempting to derive NOT/AND/OR from NAND themselves before being shown Demonstration 3, builds a much sturdier grasp of WHY universality doesn't depend on gate-count efficiency.
1. Introduce gates and the DNF-to-circuit construction directly (Demonstration 1).
2. Pose Discovery Question 1, then work Demonstration 2's depth-vs-size contrast.
3. Pose Discovery Question 2, letting the student attempt to simulate NOT/AND/OR using only NAND before confirming (Demonstration 3).
4. State the functional-completeness definition and prove NOR's completeness by the symmetric argument.
5. Pose Discovery Question 3, then present the parity-function counterexample (breaking MC-3) showing DNF is valid but not optimal.
6. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a "compute the depth/size" request:** always ask the student to state which of the two is being asked for before computing, to preempt MC-1.
2. **On a NAND-universality objection about gate count:** explicitly separate the binary "can it compute everything?" question from the quantitative "how many gates does it need?" question before answering.
3. **On a DNF-circuit construction:** after building it, ask whether the student believes it is optimal, and if so, prompt them to look for shared subexpressions before accepting that belief.
4. **On the parity-function example:** use it as the concrete, decisive counterexample to "DNF equals optimal circuit" whenever that misconception surfaces.

## Voice Teaching Notes
1. **Register:** engineering-practical — this concept benefits from grounding abstract gate algebra in the concrete language of hardware design (chips, parallelism, cost).
2. **Load-bearing sentence, spoken slowly:** "Universality asks CAN it compute everything — efficiency asks HOW MANY gates it costs. Two different questions."
3. **Wait time:** pause after posing Discovery Question 2, giving the student real space to attempt the NAND-simulation derivations themselves before Demonstration 3 confirms them.

## Assessment Signals
1. **Gate concept:** correctly builds a circuit from a truth table via the DNF construction and correctly computes its output for a given input.
2. **Depth/size discrimination:** correctly computes both depth and size for a novel circuit, without conflating the two.
3. **Universality proof fluency:** derives NOT, AND, and OR from NAND alone (or NOR alone) without hesitation.
4. **Optimality skepticism:** given a DNF-derived circuit, actively checks for shared-subexpression opportunities rather than assuming it is minimal.
5. **Transfer:** applies depth/size analysis and universality reasoning in a novel circuit-design scenario.

## Tutor Recovery Strategy
If the student persistently conflates depth and size, work several contrasting pairs (chain vs. tree, same function different factoring) until the two measures visibly diverge in concrete numbers. If the student resists NAND's universality, have them derive each of NOT/AND/OR from NAND themselves, verifying each truth table by hand, until the constructive proof itself becomes the anchor rather than an asserted fact.

## Memory Hooks
1. "Size counts gates; depth counts the longest path — genuinely different questions."
2. "Universality is binary: CAN it compute everything — not how many gates it costs."
3. "DNF gives A circuit, not necessarily THE smallest circuit."

## Transfer Connections
- **`math.disc.propositional-logic`:** the DNF construction this concept's circuit-building recipe directly reuses.
- **`math.found.truth-table`:** the row-by-row evaluation method underlying both DNF construction and direct circuit-output computation.

## Cross-Subject Connections
- **Computer Science (digital hardware design, VLSI):** circuit size and depth directly correspond to real chip area/power (size) and latency (depth) trade-offs in physical hardware design.
- **Computer Science (computational complexity theory):** circuit depth relates directly to the complexity class NC (efficient parallel computation), an active area connecting circuit complexity to broader questions about P vs. NP.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.boolean-circuits.md` — reused by reference throughout (Learning Objective, worked examples, misconception inventory MC-1–MC-3 with birth types already assigned in the Blueprint itself and confirmed independently here, transfer probe). Not restated verbatim; this entry adds the mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with `math.disc.propositional-logic` — that entry owns DNF/CNF construction from truth tables; this entry owns the CIRCUIT-LEVEL implementation and complexity analysis (size, depth, universal gate sets) built on top of that construction, not restated.

## Version History
- **Batch 21** (2026-09-11): initial authoring, part 1 of 5 this batch (with `math.disc.graph-coloring`, `math.disc.graph-connectivity`, `math.disc.graph-types`, `math.disc.predicate-logic-disc`). Blueprint reused by reference, including its own already-assigned birth-type classifications (MC-1 Type 4 moderate, MC-2 Type 1 moderate, MC-3 Type 5 moderate), independently confirmed.
