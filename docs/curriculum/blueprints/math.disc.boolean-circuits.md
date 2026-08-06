# Blueprint: math.disc.boolean-circuits

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.boolean-circuits |
| name | Boolean Circuits |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.disc.propositional-logic |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student represents Boolean functions as circuits composed of AND, OR, NOT, NAND, and NOR gates; converts a truth table or Boolean formula to a circuit and back; computes the output of a circuit for a given input assignment; defines and applies circuit depth (longest path from input to output) and circuit size (number of gates) as complexity measures; proves that NAND and NOR are each universal gate sets (capable of simulating AND, OR, NOT individually); reduces a circuit using Boolean algebra (De Morgan, absorption, distribution); and expresses any Boolean function as a two-level AND-OR circuit (sum of products, or DNF implementation).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a half-adder circuit: two inputs A,B; an XOR gate (realized as (A OR B) AND NOT(A AND B)) outputting Sum; an AND gate outputting Carry; label gate depth: XOR at depth 2, AND at depth 1; annotate "depth=longest path=2, size=3 gates (OR, NOT, AND, AND — wait: 4 gates total)"; then draw the same XOR using only NAND gates: NAND(A,B) as g1; NAND(A,g1) as g2; NAND(B,g1) as g3; NAND(g2,g3) as output — annotate "NAND-only: 4 gates, depth 3; proves NAND is universal")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | DEPTH-EQUALS-SIZE | Student confuses circuit depth with circuit size; uses them interchangeably; computes size (total gate count) when asked for depth (longest path) or vice versa; doesn't recognise that a deep circuit can have few gates (a chain of single-input NOT gates: size=depth=n) or a shallow circuit can have many gates (a balanced tree of ANDs: size=n−1, depth=log n) | Type 4 — notation-induced ("depth" and "size" both sound like measurements of circuit scale; the word "depth" evokes how deep/large something is; students collapse the two into a single "complexity measure," missing that they answer different questions: size measures total work (serial or parallel), depth measures parallel time) |
| MC-2 | NAND-IS-NOT-UNIVERSAL-BECAUSE-IT-NEEDS-MORE-GATES | Student accepts that NAND can simulate AND, OR, NOT but objects "it uses more gates, so it's weaker"; conflates circuit efficiency with computational universality; misses that universality means ANY Boolean function CAN BE computed, not that it's computed with minimum gates | Type 1 — overgeneralisation (in programming, "more code = more complex = harder"; students transfer this intuition to circuits; universality is a qualitative binary property — a gate set is universal if it generates all Boolean functions, regardless of the gate overhead factor) |
| MC-3 | DNF-AND-CIRCUIT-ARE-THE-SAME | Student conflates the DNF (disjunctive normal form) of a Boolean formula with its optimal circuit; any truth table has a DNF with at most 2ⁿ AND-terms, giving a two-level OR-of-ANDs circuit; but optimal circuits may be much smaller due to shared subexpressions; the DNF circuit is a VALID implementation, not the OPTIMAL one | Type 5 — instruction-induced (DNF is taught as the canonical form for Boolean functions; the two-level circuit it directly yields is presented as "the circuit for this function"; students then assume DNF = circuit without recognizing that shared subexpressions and deeper factoring can reduce gate count dramatically — e.g., computing x+y+z+w optimally uses 3 ORs in a tree, not a DNF with 15 three-literal terms) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Gates, circuits, and basic measures:**

**Logic gates:** physical or abstract units computing one Boolean operation.
- NOT gate (inverter): 1 input, output is ¬x. Depth 1, size 1.
- AND gate: 2+ inputs, output is x₁∧x₂∧⋯. Depth 1, size 1.
- OR gate: 2+ inputs, output is x₁∨x₂∨⋯. Depth 1, size 1.
- NAND gate: NOT-AND. Output = ¬(x₁∧x₂). Depth 1, size 1.
- NOR gate: NOT-OR. Output = ¬(x₁∨x₂). Depth 1, size 1.
- XOR gate: exclusive-or. Output = x₁⊕x₂. NOT a primitive — must be built from AND/OR/NOT.

**Boolean circuit:** directed acyclic graph (DAG) where source nodes are inputs (variables), internal nodes are gates, and sink node(s) are outputs.

**Circuit size:** total number of gates (internal nodes). Measures sequential computational work.

**Circuit depth:** length of the longest directed path from any input to the output. Measures parallel time (assuming each gate takes 1 unit of time and gates at the same depth can execute simultaneously).

**Truth table → DNF → two-level circuit:**
1. For each row of the truth table where output = 1, write the corresponding minterm (AND of all variables, negated if the input bit is 0).
2. OR all the minterms together.
3. Implement: each minterm is one AND gate (depth 1); one OR gate over all minterms (depth 2). Total depth = 2. Total size = (rows with output 1) AND gates + 1 OR gate.

**Example — majority function on 3 inputs (x,y,z output 1 iff ≥2 inputs are 1):**
Minterms with output 1: xy¬z, x¬yz, ¬xyz, xyz. DNF: xy¬z ∨ x¬yz ∨ ¬xyz ∨ xyz. Simplifies: xy∨xz∨yz (2-gate depth 2 circuit with 3 AND gates + 1 OR gate over 3 inputs = 4 gates total, depth 2). Alternative: note xyz=xyz is subsumed. Final: xy∨yz∨xz.

**P49 checkpoint:**
- CORRECT → "Circuit: DAG of gates. Size=gate count, depth=longest path. DNF→two-level circuit (depth 2). AND/OR/NOT: functionally complete set. NAND and NOR each universal." → A02
- PARTIAL (MC-1: depth equals size) → "Depth and size measure DIFFERENT things. SIZE = total number of gates = how much 'hardware' you use (or how many operations, counted sequentially). DEPTH = longest path = how many steps in the CRITICAL PATH, assuming all independent gates run simultaneously. Example: a balanced binary tree of AND gates on 8 inputs has 7 gates (size=7) and depth=3 (log₂8=3). A chain of 7 AND gates (each feeding the next) has the same size but depth=7. The tree is 7× faster when parallelized. Depth measures PARALLEL TIME; size measures TOTAL WORK." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Build a circuit for f(x,y,z)=(x∧y)∨(¬x∧z). Truth table: (0,0,0)→0; (0,0,1)→1; (0,1,0)→0; (0,1,1)→1; (1,0,0)→0; (1,0,1)→0; (1,1,0)→1; (1,1,1)→1. Gates: NOT(x), AND(x,y), AND(NOT(x),z), OR(last two). Size=4, depth=3 (NOT→AND→OR). Is this optimal? The DNF would have 3 minterms → 3+1=4 gates, depth 2. But sharing the NOT gate gives depth 3, size 4. Same size, different depth. Trade-offs." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Universal gate sets, functional completeness, and circuit complexity:**

**Functional completeness:** A set of gates G is functionally complete (universal) if every Boolean function can be computed by a circuit using only gates from G.

**{AND, OR, NOT} is functionally complete:** by the DNF construction, every Boolean function has a circuit using only these three types.

**NAND is alone functionally complete:**
- NOT x = NAND(x,x) [self-NAND].
- x AND y = NAND(NAND(x,y), NAND(x,y)) = NOT(NAND(x,y)).
- x OR y = NAND(NAND(x,x), NAND(y,y)) = NOT(NOT(x)) AND NOT(NOT(y)) … wait: by De Morgan, NOT(NOT(x) AND NOT(y)) = x OR y. So: OR(x,y) = NAND(NOT(x), NOT(y)) = NAND(NAND(x,x), NAND(y,y)).

**NOR is alone functionally complete:** symmetric to NAND (dual). NOT x = NOR(x,x). OR(x,y) = NOR(NOR(x,y),NOR(x,y)). AND(x,y) = NOR(NOR(x,x),NOR(y,y)).

**Not universal alone:** AND, OR each alone are NOT universal (cannot compute NOT with only AND, since AND(0,0)=0 but NOT(0)=1 — the function can never output 1 from all-0 inputs using AND/OR alone). XOR alone is not universal (XOR circuits compute only affine functions over GF(2)).

**Circuit complexity lower bounds:**
- Shannon's theorem: most Boolean functions on n inputs require circuits of size Ω(2ⁿ/n). (Most functions have no compact circuit — the "hard functions" vastly outnumber the easy ones.)
- Depth lower bounds: parity on n inputs requires depth Ω(log n) with bounded fan-in gates.

**P49 checkpoint:**
- CORRECT → "Functional completeness: every Boolean function computable. {AND,OR,NOT} complete. NAND alone: NOT via self-NAND; OR via NAND of self-NANDs. NOR alone: symmetric. AND alone / OR alone: NOT complete. Shannon: most functions need 2ⁿ/n size." → Gate (P91)
- PARTIAL (MC-2: more gates = weaker) → "Universality is BINARY — a gate set either can or cannot compute every Boolean function. The fact that NAND uses more gates than AND/OR/NOT to simulate the same function is a CONSTANT FACTOR OVERHEAD, not a fundamental limitation. A circuit using only NAND gates of size s computes the same function as the AND/OR/NOT circuit of size s/c for some small constant c. The key question is: can EVERY Boolean function (infinitely many, one for each truth table) be computed? YES, because NOT, AND, OR can each be simulated by a bounded number of NAND gates — so any AND/OR/NOT circuit can be converted." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Prove NOR is universal. First, NOT(x)=NOR(x,x) [since NOR(x,x)=NOT(x∨x)=NOT(x)]. Then OR(x,y)=NOT(NOR(x,y))=NOR(NOR(x,y),NOR(x,y)) [self-NOR of the NOR gate]. Then AND(x,y)=NOT(OR(NOT(x),NOT(y)))=NOT(OR(NOR(x,x),NOR(y,y)))=NOR(OR(NOR(x,x),NOR(y,y)), OR(NOR(x,x),NOR(y,y))). Every gate in {AND,OR,NOT} is simulated → NOR is complete." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Depth vs. size analogy: imagine a factory assembly line. Size = total number of workers. Depth = the number of stages in the line (each stage can work in parallel). A factory with 1,000 workers all at the same stage (depth 1) is very parallel but uses many workers. A factory with 10 workers in a chain (depth 10) is sequential. In circuit design: VLSI chips care about size (power, cost); parallel computer architectures care about depth (latency)."
Step 2 — "DNF circuit vs. optimal circuit: the two-level AND-OR circuit from a truth table is a valid but not necessarily optimal implementation. For parity of n bits: the DNF needs 2^{n−1} AND gates (half the truth table rows have output 1) + 1 OR gate = exponential size. But XOR is parity — building a tree of XOR gates gives size O(n) and depth O(log n). Optimal circuits exploit SHARED SUBEXPRESSIONS that appear multiple times in the function — the DNF misses this."
Step 3 — "Worked depth calculation: for f=AB∨CD, the circuit is: AND₁(A,B) at depth 1; AND₂(C,D) at depth 1; OR(AND₁,AND₂) at depth 2. Depth=2, size=3. For f=((AB)C)D (chained ANDs): AND₁(A,B) depth 1; AND₂(AND₁,C) depth 2; AND₃(AND₂,D) depth 3. Depth=3, size=3. Same function f=ABCD, but different factoring gives different depth — balanced tree would have depth 2."

**TB-R02 (MC-2 UNIVERSALITY):**
Step 1 — "Universality proof structure for NAND: (1) Show NOT can be simulated: NOT(x) = NAND(x,x). Verify truth table: NAND(0,0)=NOT(0∧0)=NOT(0)=1=NOT(0). ✓. NAND(1,1)=NOT(1)=0. ✓. (2) Show AND can be simulated: AND(x,y)=NOT(NAND(x,y))=NAND(NAND(x,y),NAND(x,y)). (3) Show OR can be simulated via De Morgan: OR(x,y)=NOT(NOT(x)∧NOT(y))=NAND(NOT(x),NOT(y))=NAND(NAND(x,x),NAND(y,y)). Since {AND,OR,NOT} is complete and each is simulated by NAND: NAND is complete."
Step 2 — "What is NOT universal: AND-only and OR-only circuits have monotone output — adding more 1's to the input can only keep or increase the output. NOT is anti-monotone. So any circuit without NOT cannot compute NOT, and thus cannot compute all Boolean functions. XOR-only circuits compute affine functions over GF(2) — they output 0 on all-zero input and satisfy f(x⊕y)=f(x)⊕f(y). Most Boolean functions are neither monotone nor affine."
Step 3 — "Why hardware uses NAND/NOR: in CMOS technology, NAND and NOR gates are physically simpler (fewer transistors with better characteristics) than AND and OR — so real chips use NAND/NOR as primitives. The universality of NAND means no function is unimplementable, and the engineering convenience means NAND is the cheapest gate. This is a direct practical consequence of the mathematical property of functional completeness."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Build a circuit for the majority function on 3 inputs (output 1 iff at least 2 of 3 inputs are 1) using: (a) AND, OR, NOT gates with minimum size; (b) NAND gates only. Compute size and depth for each implementation.
2. Show that {AND, NOT} is functionally complete by simulating OR from AND and NOT. Then show {AND} alone is NOT complete by characterising the functions that AND-only circuits can compute and identifying a function outside this class.
3. A circuit C has three levels: level 1 has 4 AND gates each taking 2 inputs; level 2 has 2 OR gates each taking 2 inputs from level 1; level 3 has 1 NOT gate. What is the circuit's depth? What is its size? If the two level-2 OR gates share two AND gates from level 1 as inputs, does this affect depth or size?
4. Construct a full adder (outputs Sum and Carry for 3-bit addition A+B+Cin): (a) derive the truth table; (b) find the DNF for each output; (c) draw the gate-level circuit and compute depth and size. (Hint: Sum=A⊕B⊕Cin; Carry=AB∨BCin∨ACin.)
5. Shannon's theorem: there are 2^{2ⁿ} Boolean functions on n inputs. How many of them can be computed by AND/OR/NOT circuits of size at most s(n)? Give a counting argument showing that for s(n)=2ⁿ/(2n), only a 2^{-Ω(2ⁿ/n)} fraction of functions can be computed → most functions require Ω(2ⁿ/n) gates.

**P55 — Reflect & Consolidate:** "Circuit: DAG of gates. Size=gate count, depth=longest path. DNF→depth-2 AND-OR circuit (may be exponential size). {AND,OR,NOT}: complete. NAND alone: complete (NOT=self-NAND; AND=double-NAND; OR=NAND of self-NANDs). NOR alone: complete (dual). AND/OR alone: NOT complete (no NOT function). Circuit depth measures parallel time; size measures total work."

**P76 — Transfer Probe (Independence mode):**
(a) P vs. NC: the complexity class NC (Nick's Class) consists of problems computable by circuits of polylogarithmic depth (depth O(log^k n)) and polynomial size. NC ⊆ P (poly-size poly-depth circuits can be simulated in polynomial time), but the NC=P? question is open. Explain why circuit depth is the right measure for PARALLEL time, and why NC ≠ P would mean some polynomial-time problem is inherently sequential. (b) Monotone circuits: a circuit is monotone if it uses only AND and OR gates (no NOT). The monotone circuit complexity of a function f is the minimum size of a monotone circuit for f. Razborov (1985) proved that the matching function on a bipartite graph (does G have a perfect matching?) requires superpolynomial monotone circuit size, despite having polynomial-size circuits (with NOT). This is the first proven super-polynomial lower bound for a function in P. Explain intuitively why removing NOT is so costly for this specific function. (c) Boolean circuits and NP: for every language L∈NP, there is a polynomial-size circuit family {Cₙ} that decides L∩{0,1}ⁿ. This is because NP problems have polynomial-size witnesses, and checking a witness is polynomial — so the circuit simulates the poly-time verifier with the witness hardwired. Discuss whether this circuit lower bound approach could separate P from NP: why proving exponential lower bounds for SAT circuits is believed harder than the problem itself.

**P75 — Mastery Assessment:**
"(a) Construct a NAND-only circuit for XOR(x,y). Show all intermediate gates and verify the truth table for all 4 inputs. Count gates (size) and depth. (b) Prove that {NOR} is functionally complete by explicitly showing NOT, OR, and AND as NOR circuits. (c) A circuit computes f(x₁,x₂,x₃)=x₁x₂∨x₂x₃∨x₁x₃ (majority). Is the DNF implementation with 3 AND gates + 1 OR gate (4 gates, depth 2) optimal in size? Or can you achieve size 3? Try. (d) For the function f with truth table: 0000→1, 0001→0, 0010→1, 0011→0, 0100→0, 0101→1, 0110→0, 0111→1, 1000→1, 1001→0, 1010→1, 1011→0, 1100→0, 1101→1, 1110→0, 1111→1 — write the DNF and compute the resulting circuit's size. Can you identify a simpler formula?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the universality proof structure and the depth/size distinction
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.propositional-logic; reassign

**P78 — Completion:** Boolean Circuits certified. Student constructs gate-level circuits from truth tables and Boolean formulas; computes circuit size and depth; converts between AND/OR/NOT and NAND/NOR implementations; proves functional completeness of NAND and NOR; builds DNF-based two-level circuits; and distinguishes depth (parallel time) from size (total work).

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: NC complexity class and parallel circuits; monotone circuit lower bounds (Razborov); circuit families and NP separation
Skill tested: Connect Boolean circuit depth to parallel computation, understand monotone restrictions as a lower-bound technique, and see why circuit complexity relates to the P vs. NP question

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
