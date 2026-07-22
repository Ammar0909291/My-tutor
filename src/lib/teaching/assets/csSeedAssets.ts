/**
 * Computer Science Explanation Memory — all 119 canonical CS KG concepts.
 * 4 assets per concept: core_explanation + misconception_repair + mcq + misconception_probe.
 * Seeded via scripts/brain/seed-knowledge-assets.ts.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

// ─── cs.found.intro-computers ────────────────────────────────────────────────
const CSFOUND = 'cs.found.intro-computers'
const CSFOUND_SRC = 'docs/computer-science/kg/graph.json — cs.found.intro-computers'
const CSFOUND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CSFOUND, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A computer is a machine that accepts input, processes it according to a stored program, and produces output. ' +
      'The key word is STORED: unlike a washing machine whose steps are fixed in hardware, a computer\'s program lives in memory and can be replaced — ' +
      'the same physical machine becomes a word processor, a calculator, or a game by loading different software. ' +
      'Every computer, from a phone to a supercomputer, follows this stored-program architecture: ' +
      'input devices (keyboard, camera, microphone) feed data to a processor (CPU) that executes instructions one at a time, using memory to hold data and programs, ' +
      'then sends results to output devices (screen, speaker, printer). ' +
      'Networks allow computers to send and receive data between each other, extending input/output beyond the physical machine.',
    targetedMisconceptions: [],
    source: CSFOUND_SRC,
  },
  {
    conceptId: CSFOUND, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A common assumption: computers understand what you mean. ' +
      'They do not — computers execute instructions literally and exactly, with no interpretation. ' +
      '"Sort by date" means exactly the operation you coded, not what you intended if your code was wrong. ' +
      'Every bug is evidence that the computer did exactly what it was told; the program\'s intent and its instructions diverged. ' +
      'This is why precision matters in programming: natural language tolerates ambiguity; instruction sets do not.',
    targetedMisconceptions: [`${CSFOUND}:M1`],
    source: CSFOUND_SRC,
  },
]
const CSFOUND_PROBES: SeedProbe[] = [
  {
    conceptId: CSFOUND, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What distinguishes a stored-program computer from a special-purpose machine like a calculator with fixed functions?',
    choices: [
      { text: 'The program is stored in memory and can be changed, allowing the same hardware to perform different tasks by loading different software', isCorrect: true },
      { text: 'A stored-program computer is faster because it uses special high-speed chips unavailable in calculators', isCorrect: false, misconceptionId: `${CSFOUND}:M2` },
      { text: 'A stored-program computer always connects to the internet, whereas special-purpose machines operate offline', isCorrect: false },
    ],
    correctValue: 'Program in memory — hardware is reprogrammable by loading different software',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CSFOUND}:M2`],
    source: CSFOUND_SRC,
  },
  {
    conceptId: CSFOUND, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student writes a sorting program that produces wrong results. They say "the computer misunderstood my instructions." What is the more accurate explanation?',
    choices: [
      { text: 'The computer executed the instructions exactly as written; the error is in the instructions themselves, not the computer\'s interpretation', isCorrect: true },
      { text: 'The computer misinterpreted the intent of the code; modern CPUs sometimes make educated guesses that override the programmer\'s instructions', isCorrect: false, misconceptionId: `${CSFOUND}:M1` },
    ],
    correctValue: 'Computers execute literally — the bug is in the code, not the CPU\'s interpretation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CSFOUND}:M1`],
    source: CSFOUND_SRC,
  },
]

// ─── cs.found.computer-organisation ──────────────────────────────────────────
const COMPORG = 'cs.found.computer-organisation'
const COMPORG_SRC = 'docs/computer-science/kg/graph.json — cs.found.computer-organisation'
const COMPORG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPORG, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Computer organisation describes how the physical components of a computer are connected and work together. ' +
      'The CPU (central processing unit) is the processor — it contains the ALU (arithmetic logic unit, which does calculations and comparisons) ' +
      'and the control unit (which fetches instructions from memory, decodes them, and coordinates execution). ' +
      'Primary memory (RAM) holds currently running programs and their data; it is fast but volatile (lost on power-off). ' +
      'Secondary storage (SSD, HDD) holds programs and files persistently but is slower; the OS loads programs from storage into RAM before the CPU can execute them. ' +
      'The system bus is the set of wires carrying data, addresses, and control signals between CPU, RAM, and I/O devices. ' +
      'The fetch-decode-execute cycle is the CPU\'s heartbeat: fetch the next instruction from RAM, decode what it means, execute it, repeat.',
    targetedMisconceptions: [],
    source: COMPORG_SRC,
  },
  {
    conceptId: COMPORG, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'RAM (memory) and storage (hard drive/SSD) are routinely confused. ' +
      'RAM holds what the computer is USING right now — open programs, the document you\'re editing. ' +
      'Storage holds what you\'ve SAVED — files, installed applications. ' +
      'The distinction matters: installing more RAM speeds up multitasking (more programs in RAM at once); ' +
      'buying more SSD storage gives more space to save files, not faster performance on what is already running. ' +
      'A computer with 8 GB RAM and 1 TB SSD has 8 GB of active workspace and 1 TB of filing cabinet.',
    targetedMisconceptions: [`${COMPORG}:M1`],
    source: COMPORG_SRC,
  },
]
const COMPORG_PROBES: SeedProbe[] = [
  {
    conceptId: COMPORG, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A computer has 16 GB RAM and a 512 GB SSD. You open a video-editing program and notice it runs slowly. Adding which component would most directly speed up the running program?',
    choices: [
      { text: 'More RAM — the program and its data need to fit in RAM while running; insufficient RAM forces slow swapping to disk', isCorrect: true },
      { text: 'A larger SSD — more storage space means the program has more room to save temporary files', isCorrect: false, misconceptionId: `${COMPORG}:M1` },
      { text: 'A faster network card — video editing requires high-bandwidth data transfer between program components', isCorrect: false },
    ],
    correctValue: 'More RAM — running programs live in RAM, not storage',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COMPORG}:M1`],
    source: COMPORG_SRC,
  },
  {
    conceptId: COMPORG, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'When you save a document, where does it go, and what happens to the copy in RAM when you turn off the computer?',
    choices: [
      { text: 'The saved copy goes to secondary storage (SSD/HDD) and persists; the RAM copy is lost when power is removed because RAM is volatile', isCorrect: true },
      { text: 'Both copies are preserved — RAM keeps its contents even without power, which is why programs reopen where you left them', isCorrect: false, misconceptionId: `${COMPORG}:M1` },
    ],
    correctValue: 'Storage = persistent; RAM = volatile (lost on power-off)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COMPORG}:M1`],
    source: COMPORG_SRC,
  },
]

// ─── cs.found.number-systems ──────────────────────────────────────────────────
const NUMSYS = 'cs.found.number-systems'
const NUMSYS_SRC = 'docs/computer-science/kg/graph.json — cs.found.number-systems'
const NUMSYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUMSYS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Computers store everything — numbers, text, images, code — as binary: sequences of 0s and 1s. ' +
      'This is because digital circuits have two reliable states (low voltage / high voltage), not ten. ' +
      'Binary (base 2) works exactly like decimal (base 10) but with only two digits: ' +
      'each position is a power of 2 instead of a power of 10. ' +
      '1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀. ' +
      'Hexadecimal (base 16) is a compact human-readable shorthand for binary: one hex digit (0-9, A-F) represents exactly 4 bits. ' +
      '0xFF = 1111 1111₂ = 255₁₀. ' +
      'Octal (base 8) was historically used for older systems. ' +
      'All number systems are different representations of the same underlying quantity — the number does not change, only how we write it.',
    targetedMisconceptions: [],
    source: NUMSYS_SRC,
  },
  {
    conceptId: NUMSYS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often believe binary numbers are somehow different from "real" numbers. ' +
      '1011₂ and 11₁₀ are the same quantity; only the notation differs. ' +
      'A related error: thinking that larger binary numbers (more digits) are always "bigger." ' +
      '10₂ = 2₁₀ but 11₁₀ = 1011₂ — the 2-digit decimal is larger than the 2-digit binary. ' +
      'Always convert to the same base before comparing magnitude. ' +
      'Also: hexadecimal ≠ "computer numbers" — it is merely shorthand. ' +
      'The computer stores everything in binary; hex is for human convenience when reading memory dumps or colour codes.',
    targetedMisconceptions: [`${NUMSYS}:M1`],
    source: NUMSYS_SRC,
  },
]
const NUMSYS_PROBES: SeedProbe[] = [
  {
    conceptId: NUMSYS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Convert 1101₂ to decimal. Show your working.',
    choices: [
      { text: '13 — (1×8) + (1×4) + (0×2) + (1×1) = 13', isCorrect: true },
      { text: '1101 — binary numbers with no zeros represent the same value in decimal', isCorrect: false, misconceptionId: `${NUMSYS}:M1` },
      { text: '7 — adding the four digit values 1+1+0+1 = 3, then multiplied by number of bits 4 ÷ some factor', isCorrect: false },
    ],
    correctValue: '13',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${NUMSYS}:M1`],
    source: NUMSYS_SRC,
  },
  {
    conceptId: NUMSYS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does a computer "think" in binary, or is binary just a way humans describe what the computer does at the circuit level?',
    choices: [
      { text: 'Binary describes the physical circuit states (low/high voltage); the computer itself doesn\'t "think" in any number base — it just switches transistors', isCorrect: true },
      { text: 'The computer thinks in binary — all CPU arithmetic is fundamentally different from decimal arithmetic and produces different results', isCorrect: false, misconceptionId: `${NUMSYS}:M2` },
    ],
    correctValue: 'Binary is a human description of physical switch states, not a distinct kind of arithmetic',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NUMSYS}:M2`],
    source: NUMSYS_SRC,
  },
]

// ─── cs.found.boolean-logic ───────────────────────────────────────────────────
const BOOLLOG = 'cs.found.boolean-logic'
const BOOLLOG_SRC = 'docs/computer-science/kg/graph.json — cs.found.boolean-logic'
const BOOLLOG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BOOLLOG, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Boolean logic operates on two values — TRUE and FALSE (or 1 and 0) — and three fundamental operations: ' +
      'AND (both inputs must be true for the output to be true), ' +
      'OR (at least one input must be true), ' +
      'and NOT (inverts: NOT true = false). ' +
      'These three gates, combined, can implement any logical function and therefore any computation — that is why every CPU is built from billions of transistors acting as logic gates. ' +
      'DeMorgan\'s Laws are essential: NOT(A AND B) = (NOT A) OR (NOT B); NOT(A OR B) = (NOT A) AND (NOT B). ' +
      'In programming, boolean expressions control if-statements and loops: `if age >= 18 AND has_ticket` combines two conditions. ' +
      'Short-circuit evaluation means Python/Java/C stop evaluating as soon as the result is determined: in `A and B`, if A is False, B is never evaluated.',
    targetedMisconceptions: [],
    source: BOOLLOG_SRC,
  },
  {
    conceptId: BOOLLOG, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A pervasive bug: confusing `and` with `or` in boundary conditions. ' +
      '"Reject if age is below 13 OR above 99" translates to `if age < 13 or age > 99: reject` — correct. ' +
      'Writing `age < 13 and age > 99` is never True (no number is simultaneously below 13 AND above 99) — a logical impossibility. ' +
      'Another trap: `not A and B` means `(not A) and B` — NOT binds tightly. ' +
      'To negate a compound condition, use DeMorgan: `not (A and B)` = `not A or not B`. ' +
      'These errors compile and run silently; only careful logical analysis or test cases with boundary inputs reveal them.',
    targetedMisconceptions: [`${BOOLLOG}:M1`],
    source: BOOLLOG_SRC,
  },
]
const BOOLLOG_PROBES: SeedProbe[] = [
  {
    conceptId: BOOLLOG, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Apply DeMorgan\'s Law: what is the equivalent of `NOT (sunny AND warm)`?',
    choices: [
      { text: '(NOT sunny) OR (NOT warm) — DeMorgan: NOT(A AND B) = (NOT A) OR (NOT B)', isCorrect: true },
      { text: '(NOT sunny) AND (NOT warm) — NOT distributes inside brackets keeping the same operator', isCorrect: false, misconceptionId: `${BOOLLOG}:M1` },
      { text: 'sunny OR warm — two NOTs cancel and the operator flips', isCorrect: false },
    ],
    correctValue: '(NOT sunny) OR (NOT warm)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BOOLLOG}:M1`],
    source: BOOLLOG_SRC,
  },
  {
    conceptId: BOOLLOG, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A program rejects users if their score is below 40 AND above 90. A student scores 20. Are they rejected?',
    choices: [
      { text: 'No — 20 < 40 is True but 20 > 90 is False, so (True AND False) = False; the condition is never satisfied for any real score', isCorrect: true },
      { text: 'Yes — 20 is below 40, satisfying the first condition, so they are rejected', isCorrect: false, misconceptionId: `${BOOLLOG}:M1` },
    ],
    correctValue: 'No — AND requires BOTH conditions true; no number can be < 40 AND > 90',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BOOLLOG}:M1`],
    source: BOOLLOG_SRC,
  },
]

// ─── cs.found.memory-storage ──────────────────────────────────────────────────
const MEMSTG = 'cs.found.memory-storage'
const MEMSTG_SRC = 'docs/computer-science/kg/graph.json — cs.found.memory-storage'
const MEMSTG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEMSTG, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Memory in a computer exists in a hierarchy trading off speed, capacity, and cost: ' +
      'CPU registers (bytes, sub-nanosecond access, most expensive per byte) → ' +
      'cache (L1/L2/L3, kilobytes to megabytes, nanoseconds) → ' +
      'RAM (gigabytes, tens of nanoseconds) → ' +
      'SSD (terabytes, microseconds) → ' +
      'HDD (terabytes, milliseconds for a physical seek). ' +
      'The CPU always operates on data in registers; to access RAM, it issues a load instruction. ' +
      'Cache is automatic hardware that keeps recently used data close to the CPU — a cache hit avoids the slow RAM access. ' +
      'A byte is 8 bits; a kilobyte (KB) is 1,024 bytes; a megabyte (MB) is 1,024 KB; a gigabyte (GB) is 1,024 MB. ' +
      'All storage is measured in units of bits and bytes, regardless of whether it is RAM, SSD, or a network packet.',
    targetedMisconceptions: [],
    source: MEMSTG_SRC,
  },
  {
    conceptId: MEMSTG, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often think "memory" and "storage" are the same thing or interchangeable. ' +
      'They are two separate hardware components with different roles and properties. ' +
      'RAM (memory): fast, volatile, small, used for currently running programs. ' +
      'SSD/HDD (storage): slow, persistent, large, used for files and installed software. ' +
      'A computer with "no storage left" has a full SSD — deleting files frees space. ' +
      'A computer that is "running out of memory" has too little RAM for current tasks — it may swap to disk, slowing to a crawl. ' +
      'These two problems have different solutions: more RAM vs. more SSD, respectively.',
    targetedMisconceptions: [`${MEMSTG}:M1`],
    source: MEMSTG_SRC,
  },
]
const MEMSTG_PROBES: SeedProbe[] = [
  {
    conceptId: MEMSTG, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In the memory hierarchy, why is cache faster than RAM even though both are semiconductor memory?',
    choices: [
      { text: 'Cache is physically closer to the CPU, uses faster (SRAM) cells, and is much smaller — all reducing access latency', isCorrect: true },
      { text: 'Cache runs at a higher voltage, giving transistors more energy to switch faster', isCorrect: false, misconceptionId: `${MEMSTG}:M2` },
      { text: 'Cache is larger than RAM so the CPU has a better chance of finding what it needs without waiting', isCorrect: false },
    ],
    correctValue: 'Cache: closer + SRAM technology + smaller size → lower latency',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MEMSTG}:M2`],
    source: MEMSTG_SRC,
  },
  {
    conceptId: MEMSTG, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A laptop shows "Low disk space" and the user also notices programs running slowly. Are these the same problem?',
    choices: [
      { text: 'No — low disk space means the SSD/HDD is nearly full (a storage problem); slow programs may indicate low RAM causing swapping; these are distinct issues with different fixes', isCorrect: true },
      { text: 'Yes — disk space and RAM are the same resource; when disk fills up, programs slow down because they share the same memory pool', isCorrect: false, misconceptionId: `${MEMSTG}:M1` },
    ],
    correctValue: 'Different problems: disk space = storage; slow programs = likely RAM / swapping',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MEMSTG}:M1`],
    source: MEMSTG_SRC,
  },
]

// ─── cs.found.cpu-architecture ────────────────────────────────────────────────
const CPUARCH = 'cs.found.cpu-architecture'
const CPUARCH_SRC = 'docs/computer-science/kg/graph.json — cs.found.cpu-architecture'
const CPUARCH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CPUARCH, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CPU architecture defines the instruction set and internal organisation of a processor. ' +
      'The Von Neumann architecture stores programs and data in the same memory — the bottleneck between CPU and memory is the "Von Neumann bottleneck." ' +
      'The instruction set architecture (ISA) is the contract between hardware and software: x86-64 (Intel/AMD) and ARM are the dominant ISAs today. ' +
      'Inside the CPU: the ALU executes arithmetic and logic; registers are ultra-fast scratchpads (rax, rbx on x86); ' +
      'the program counter (PC) holds the address of the next instruction; ' +
      'the instruction register (IR) holds the current instruction being decoded. ' +
      'RISC (Reduced Instruction Set Computing) uses simple, fast, uniform instructions (ARM, RISC-V); ' +
      'CISC (Complex Instruction Set Computing) uses fewer, more powerful instructions that each do more work (x86). ' +
      'Modern CPUs achieve performance through pipelining, superscalar execution (multiple pipelines), out-of-order execution, and branch prediction.',
    targetedMisconceptions: [],
    source: CPUARCH_SRC,
  },
  {
    conceptId: CPUARCH, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Clock speed (GHz) is not the same as performance. ' +
      'A 3 GHz CPU executes 3 billion clock cycles per second; how much WORK happens per cycle depends on IPC (instructions per clock). ' +
      'A modern CPU at 3 GHz with IPC = 4 completes more work per second than a 4 GHz CPU with IPC = 1. ' +
      'Furthermore, memory-bound workloads spend most time waiting for RAM, not executing instructions — ' +
      'doubling the clock speed of a memory-bound program gives almost no speedup. ' +
      'This is why measuring performance requires benchmarks on realistic workloads, not just comparing spec-sheet GHz numbers.',
    targetedMisconceptions: [`${CPUARCH}:M1`],
    source: CPUARCH_SRC,
  },
]
const CPUARCH_PROBES: SeedProbe[] = [
  {
    conceptId: CPUARCH, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The program counter (PC) register holds what information, and why is it updated after every instruction?',
    choices: [
      { text: 'The memory address of the NEXT instruction to execute; it is automatically incremented (or set by branch instructions) so the CPU knows where to fetch from next', isCorrect: true },
      { text: 'The count of instructions executed so far in the current program; it helps the OS measure CPU usage', isCorrect: false, misconceptionId: `${CPUARCH}:M2` },
      { text: 'The current result of the last arithmetic operation; it is updated after each ALU instruction', isCorrect: false },
    ],
    correctValue: 'PC = address of the next instruction — drives the fetch phase of the fetch-decode-execute cycle',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CPUARCH}:M2`],
    source: CPUARCH_SRC,
  },
  {
    conceptId: CPUARCH, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Laptop A has a 4.5 GHz CPU; Laptop B has a 3.2 GHz CPU. A student concludes Laptop A is always faster. What is missing from this analysis?',
    choices: [
      { text: 'IPC (instructions per clock), core count, cache sizes, and memory bandwidth all affect real-world performance; GHz alone is insufficient for comparison, especially across different architectures', isCorrect: true },
      { text: 'Nothing — clock speed in GHz is the definitive performance metric; higher GHz always means more instructions executed per second', isCorrect: false, misconceptionId: `${CPUARCH}:M1` },
    ],
    correctValue: 'GHz × IPC × cores + memory bandwidth = actual performance; GHz alone is insufficient',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CPUARCH}:M1`],
    source: CPUARCH_SRC,
  },
]

// ─── cs.found.pipelining-cache ────────────────────────────────────────────────
const PIPELCACHE = 'cs.found.pipelining-cache'
const PIPELCACHE_SRC = 'docs/computer-science/kg/graph.json — cs.found.pipelining-cache'
const PIPELCACHE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PIPELCACHE, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Pipelining overlaps the fetch-decode-execute stages of multiple instructions, like an assembly line: ' +
      'while instruction N is being executed, instruction N+1 is being decoded, and N+2 is being fetched. ' +
      'A 5-stage pipeline (IF-ID-EX-MEM-WB) can theoretically produce one instruction result per cycle instead of one per 5 cycles — a 5× throughput gain. ' +
      'Pipeline hazards reduce this gain: data hazards (instruction N+1 needs the result of N not yet written), ' +
      'control hazards (a branch instruction changes the PC; instructions fetched speculatively may be wrong), ' +
      'and structural hazards (two instructions need the same hardware unit simultaneously). ' +
      'Solutions: forwarding (route results directly between pipeline stages), stalling (insert NOP "bubbles"), and branch prediction (guess the branch outcome and flush on mis-prediction). ' +
      'Cache exploits locality: spatial locality (nearby addresses are accessed together — load entire cache lines) and temporal locality (recently accessed data is likely accessed again — keep it in cache).',
    targetedMisconceptions: [],
    source: PIPELCACHE_SRC,
  },
  {
    conceptId: PIPELCACHE, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A pipeline does not make individual instructions faster — it increases THROUGHPUT (instructions completed per second), not latency (time for one instruction to complete). ' +
      'A single instruction in a 5-stage pipeline still takes 5 cycles to complete, versus 5 cycles without pipelining — no speedup for that instruction. ' +
      'The benefit appears only when many instructions run sequentially: the pipeline stays full, and the average throughput approaches one instruction per cycle. ' +
      'Similarly, a cache hit does not make the CPU calculate faster — it reduces the time the CPU WAITS for data, allowing it to stay busy rather than stalling.',
    targetedMisconceptions: [`${PIPELCACHE}:M1`],
    source: PIPELCACHE_SRC,
  },
]
const PIPELCACHE_PROBES: SeedProbe[] = [
  {
    conceptId: PIPELCACHE, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A branch instruction in a pipeline causes a control hazard. What technique attempts to resolve this without always stalling?',
    choices: [
      { text: 'Branch prediction — the CPU guesses the branch outcome, continues fetching along the predicted path, and flushes the pipeline if the guess is wrong', isCorrect: true },
      { text: 'Data forwarding — the result of the branch is computed before the instruction enters the pipeline using a pre-calculation unit', isCorrect: false, misconceptionId: `${PIPELCACHE}:M2` },
      { text: 'Out-of-order execution — branch instructions are reordered to always execute last, after all other instructions have cleared the pipeline', isCorrect: false },
    ],
    correctValue: 'Branch prediction — speculative execution, flush on mis-predict',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PIPELCACHE}:M2`],
    source: PIPELCACHE_SRC,
  },
  {
    conceptId: PIPELCACHE, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A 4-stage pipeline processes one instruction. Does the pipeline make this instruction complete in fewer cycles than a non-pipelined CPU?',
    choices: [
      { text: 'No — the single instruction still passes through all 4 stages and takes 4 cycles; pipelining improves throughput for many instructions, not latency for one', isCorrect: true },
      { text: 'Yes — pipelining allows each stage to work simultaneously, reducing the total cycles needed for each instruction', isCorrect: false, misconceptionId: `${PIPELCACHE}:M1` },
    ],
    correctValue: 'Pipelining improves throughput, not single-instruction latency',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PIPELCACHE}:M1`],
    source: PIPELCACHE_SRC,
  },
]

// ─── cs.found.software-concepts ───────────────────────────────────────────────
const SWCONCEPT = 'cs.found.software-concepts'
const SWCONCEPT_SRC = 'docs/computer-science/kg/graph.json — cs.found.software-concepts'
const SWCONCEPT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SWCONCEPT, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Software is the set of instructions that tells hardware what to do. ' +
      'System software manages the hardware and provides a platform for other programs: the operating system (OS) is the core system software, ' +
      'managing processes, memory, file systems, and device drivers. ' +
      'Application software performs specific user tasks — word processors, browsers, games. ' +
      'Programming languages exist at different levels of abstraction: machine code (raw binary, directly executed by the CPU) → assembly (mnemonic shorthand for machine code, one assembler step away) → ' +
      'high-level languages (Python, Java, C++ — human-readable, require compilation or interpretation). ' +
      'A compiler translates the entire high-level program to machine code before execution; an interpreter translates and executes line by line at runtime. ' +
      'Open-source software distributes its source code publicly; proprietary software does not.',
    targetedMisconceptions: [],
    source: SWCONCEPT_SRC,
  },
  {
    conceptId: SWCONCEPT, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Compiled languages are not inherently "faster" than interpreted ones — it depends on implementation. ' +
      'Python is interpreted but numpy operations run at C speed because the inner loops are compiled C extensions. ' +
      'Java compiles to bytecode, then the JIT (just-in-time) compiler compiles hotspot bytecode to native machine code at runtime — often as fast as C for long-running programs. ' +
      'JavaScript V8 is aggressively JIT-compiled. ' +
      'The compile/interpret distinction is about the translation strategy, not a guarantee about runtime speed. ' +
      'For most students\' programs the bottleneck is the algorithm, not the language.',
    targetedMisconceptions: [`${SWCONCEPT}:M1`],
    source: SWCONCEPT_SRC,
  },
]
const SWCONCEPT_PROBES: SeedProbe[] = [
  {
    conceptId: SWCONCEPT, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the key difference between a compiler and an interpreter?',
    choices: [
      { text: 'A compiler translates the whole program to machine code before execution; an interpreter translates and executes line by line at runtime', isCorrect: true },
      { text: 'A compiler runs the program immediately; an interpreter first saves a translated file, then runs it later', isCorrect: false, misconceptionId: `${SWCONCEPT}:M2` },
      { text: 'Compilers are used only for low-level languages; interpreters work only with high-level languages', isCorrect: false },
    ],
    correctValue: 'Compiler = full translation before run; interpreter = line-by-line at runtime',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SWCONCEPT}:M2`],
    source: SWCONCEPT_SRC,
  },
  {
    conceptId: SWCONCEPT, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is Python always slower than C for a given task, because C is compiled and Python is interpreted?',
    choices: [
      { text: 'Not always — Python with optimised compiled libraries (numpy, scipy) can match C for numeric tasks; the bottleneck is usually the algorithm, not the language', isCorrect: true },
      { text: 'Yes — compiled languages always produce faster code; an interpreted language can never match compiled performance for any task', isCorrect: false, misconceptionId: `${SWCONCEPT}:M1` },
    ],
    correctValue: 'Language speed depends on implementation and libraries, not compile/interpret alone',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SWCONCEPT}:M1`],
    source: SWCONCEPT_SRC,
  },
]

// ─── cs.found.os-concepts ─────────────────────────────────────────────────────
const OSCONCEPT = 'cs.found.os-concepts'
const OSCONCEPT_SRC = 'docs/computer-science/kg/graph.json — cs.found.os-concepts'
const OSCONCEPT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OSCONCEPT, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The operating system (OS) is the software layer between hardware and user applications. ' +
      'Its core jobs: process management (creating, scheduling, and terminating programs), ' +
      'memory management (allocating RAM to processes, preventing one process from reading another\'s memory), ' +
      'file system management (organising data on storage into files and directories), ' +
      'device management (communicating with hardware through drivers), ' +
      'and providing a user interface (CLI or GUI). ' +
      'The kernel is the OS\'s core — it runs with full hardware access (privileged/kernel mode). ' +
      'User programs run in user mode with restricted access and make system calls when they need OS services (e.g., writing to a file). ' +
      'This separation protects the system: a buggy application cannot corrupt the OS or other processes.',
    targetedMisconceptions: [],
    source: OSCONCEPT_SRC,
  },
  {
    conceptId: OSCONCEPT, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The OS is not a program you run — it is what allows programs to run. ' +
      'Every application makes hundreds of OS calls per second: reading a file, drawing a pixel, receiving a network packet — all go through the OS. ' +
      'A related misconception: antivirus software "protects the OS." ' +
      'Antivirus runs as a user-mode application and scans files; it can detect malware but cannot protect against kernel-level rootkits that have already compromised the OS. ' +
      'Security at the OS level requires kernel integrity mechanisms (Secure Boot, integrity measurement) that are enforced before any user-space software loads.',
    targetedMisconceptions: [`${OSCONCEPT}:M1`],
    source: OSCONCEPT_SRC,
  },
]
const OSCONCEPT_PROBES: SeedProbe[] = [
  {
    conceptId: OSCONCEPT, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A user program wants to write data to a file. It cannot directly write to the disk. What mechanism does it use, and why?',
    choices: [
      { text: 'A system call — the program asks the OS kernel to perform the disk write on its behalf; this keeps disk access controlled and prevents programs from corrupting each other\'s files', isCorrect: true },
      { text: 'It writes directly to the disk using its own disk driver — high-level programs have direct hardware access for performance', isCorrect: false, misconceptionId: `${OSCONCEPT}:M1` },
      { text: 'It sends a request to the antivirus, which checks the data before forwarding it to the OS', isCorrect: false },
    ],
    correctValue: 'System call — kernel mediates all hardware access',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${OSCONCEPT}:M1`],
    source: OSCONCEPT_SRC,
  },
  {
    conceptId: OSCONCEPT, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can you run a computer without an operating system, running your program directly on the hardware?',
    choices: [
      { text: 'Yes — embedded systems (microcontrollers, bare-metal firmware) run code directly without an OS; an OS is not physically required, but provides services that make writing programs far easier', isCorrect: true },
      { text: 'No — hardware physically requires an OS to initialise and cannot execute any code without one first loading', isCorrect: false, misconceptionId: `${OSCONCEPT}:M2` },
    ],
    correctValue: 'Yes — bare-metal programming is real; OS is a convenience layer, not a hardware requirement',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${OSCONCEPT}:M2`],
    source: OSCONCEPT_SRC,
  },
]

// ─── cs.algo.problem-solving ──────────────────────────────────────────────────
const PROBSOLV = 'cs.algo.problem-solving'
const PROBSOLV_SRC = 'docs/computer-science/kg/graph.json — cs.algo.problem-solving'
const PROBSOLV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROBSOLV, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Computational problem-solving is the process of moving from a precisely defined problem to a working algorithm. ' +
      'Step 1: Understand the problem — identify inputs, expected outputs, and constraints. ' +
      'Step 2: Explore examples — trace the expected behaviour on several concrete cases including edge cases (empty input, single element, maximum size). ' +
      'Step 3: Design a plan — identify a pattern or known algorithm template (search, sort, recursion, dynamic programming). ' +
      'Step 4: Implement — translate the plan into code. ' +
      'Step 5: Test and debug — run the examples from step 2; if any fail, diagnose with print statements or a debugger. ' +
      'Step 6: Analyse — is the algorithm correct for all valid inputs? Is it efficient enough given the constraints? ' +
      'Beginning programmers often skip step 1 and code immediately — they write fast, but spend more time debugging than they saved.',
    targetedMisconceptions: [],
    source: PROBSOLV_SRC,
  },
  {
    conceptId: PROBSOLV, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The most common problem-solving mistake is starting to code before understanding the problem. ' +
      'This feels productive — you are writing code — but produces wrong answers and hard-to-fix bugs because the mental model was incomplete. ' +
      'Professional programmers spend 20-40% of problem time in steps 1-3 before writing a line of code. ' +
      'A related error: assuming the first solution is the right one. ' +
      'Good problem-solving revisits the design when implementation reveals the plan was flawed — changing the approach mid-implementation is a sign of learning, not failure.',
    targetedMisconceptions: [`${PROBSOLV}:M1`],
    source: PROBSOLV_SRC,
  },
]
const PROBSOLV_PROBES: SeedProbe[] = [
  {
    conceptId: PROBSOLV, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Before coding a solution, why is it important to trace through concrete examples of the problem — including edge cases?',
    choices: [
      { text: 'Examples reveal the expected behaviour and surface edge cases where a naive algorithm fails, leading to a more correct design before any code is written', isCorrect: true },
      { text: 'Examples are not necessary — a well-designed algorithm will automatically handle all cases, including edge cases, without prior manual tracing', isCorrect: false, misconceptionId: `${PROBSOLV}:M2` },
      { text: 'Examples are only needed for debugging after the code is written; working through them beforehand is a waste of time', isCorrect: false },
    ],
    correctValue: 'Examples surface edge cases and validate the design before coding',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PROBSOLV}:M2`],
    source: PROBSOLV_SRC,
  },
  {
    conceptId: PROBSOLV, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student starts writing code immediately after reading a problem statement, without examples or a plan. What is the likely outcome?',
    choices: [
      { text: 'The code will likely have logical errors from a misunderstood problem, and debugging will take longer than a planning phase would have', isCorrect: true },
      { text: 'Starting immediately is the most efficient approach — planning wastes time that could be spent coding the solution', isCorrect: false, misconceptionId: `${PROBSOLV}:M1` },
    ],
    correctValue: 'Rushing to code without planning produces harder-to-fix bugs from incomplete understanding',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PROBSOLV}:M1`],
    source: PROBSOLV_SRC,
  },
]

// ─── cs.algo.algorithms ───────────────────────────────────────────────────────
const ALGO = 'cs.algo.algorithms'
const ALGO_SRC = 'docs/computer-science/kg/graph.json — cs.algo.algorithms'
const ALGO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALGO, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'An algorithm is a finite, unambiguous sequence of well-defined steps that solves a problem for any valid input and always terminates. ' +
      'Four properties every algorithm must have: ' +
      '(1) Input — zero or more values provided externally. ' +
      '(2) Output — at least one result produced. ' +
      '(3) Definiteness — every step is precisely defined with no ambiguity. ' +
      '(4) Finiteness — the algorithm terminates after a finite number of steps for any valid input. ' +
      'An algorithm is language-independent — it describes WHAT to do, not HOW in a specific language. ' +
      'The same algorithm can be implemented in Python, Java, or C. ' +
      'Algorithms are evaluated on correctness (does it produce the right output for all inputs?), efficiency (how does runtime and memory scale with input size?), and readability.',
    targetedMisconceptions: [],
    source: ALGO_SRC,
  },
  {
    conceptId: ALGO, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'An algorithm is not the same as a program. ' +
      'An algorithm is a language-independent description of a computation; a program is an algorithm expressed in a specific programming language running on a specific machine. ' +
      'Also: a correct algorithm does not guarantee a correct program — translation errors (off-by-one, wrong variable) can break a correct algorithm at the implementation stage. ' +
      'And: an algorithm that works on a small input may fail on a large one due to integer overflow, stack overflow (for deep recursion), or running out of time — these are implementation concerns, not algorithmic errors, but they matter in practice.',
    targetedMisconceptions: [`${ALGO}:M1`],
    source: ALGO_SRC,
  },
]
const ALGO_PROBES: SeedProbe[] = [
  {
    conceptId: ALGO, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which of the following is NOT a required property of an algorithm?',
    choices: [
      { text: 'It must be written in a specific programming language (definiteness requires a concrete implementation)', isCorrect: true },
      { text: 'It must terminate after a finite number of steps for any valid input (finiteness)', isCorrect: false },
      { text: 'Every step must be precisely and unambiguously defined (definiteness)', isCorrect: false },
    ],
    correctValue: 'Algorithms are language-independent; a specific language is NOT required',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ALGO}:M1`],
    source: ALGO_SRC,
  },
  {
    conceptId: ALGO, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: '"I implemented the algorithm correctly in Python, so the program must be correct." Is this reasoning sound?',
    choices: [
      { text: 'No — translation from algorithm to code introduces new error opportunities (off-by-one, wrong variable names, edge cases missed); the program must be tested independently', isCorrect: true },
      { text: 'Yes — if the algorithm is correct and the implementation exactly matches it, the program is guaranteed to be correct', isCorrect: false, misconceptionId: `${ALGO}:M1` },
    ],
    correctValue: 'Correct algorithm ≠ correct program — implementation can introduce new bugs',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ALGO}:M1`],
    source: ALGO_SRC,
  },
]

// ─── cs.algo.flowcharts ───────────────────────────────────────────────────────
const FLOWCHRT = 'cs.algo.flowcharts'
const FLOWCHRT_SRC = 'docs/computer-science/kg/graph.json — cs.algo.flowcharts'
const FLOWCHRT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FLOWCHRT, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A flowchart is a visual representation of an algorithm using standardised shapes and arrows to show the sequence of steps and decisions. ' +
      'Standard symbols: oval/rounded rectangle = start/end (terminator); rectangle = process (an action or computation); ' +
      'parallelogram = input/output; diamond = decision (a yes/no question with two branches); arrows = flow of control. ' +
      'Flowcharts make control flow visible — you can follow the path a program takes for any input by tracing the arrows. ' +
      'They are particularly useful for communicating algorithms to non-programmers, for designing logic before coding, and for identifying missing branches (decision diamonds with only one exit path). ' +
      'Pseudocode is an alternative: more text-like, using programming-like structure (IF, WHILE, FOR) without language-specific syntax.',
    targetedMisconceptions: [],
    source: FLOWCHRT_SRC,
  },
  {
    conceptId: FLOWCHRT, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often draw flowcharts with unlabelled decision branches, or place a diamond with only one arrow out. ' +
      'Every decision diamond must have exactly TWO clearly labelled exit arrows (Yes/True and No/False). ' +
      'An unlabelled branch makes the flowchart unambiguous — a reader cannot trace the algorithm. ' +
      'Also: flowcharts are NOT programs — they can describe an algorithm that would take forever to implement naively, or one that has subtle logical errors not visible in the diagram. ' +
      'Drawing a correct flowchart is not the same as writing a working program; it is a DESIGN tool.',
    targetedMisconceptions: [`${FLOWCHRT}:M1`],
    source: FLOWCHRT_SRC,
  },
]
const FLOWCHRT_PROBES: SeedProbe[] = [
  {
    conceptId: FLOWCHRT, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a standard flowchart, what shape represents a decision point (e.g., "Is x > 10?")?',
    choices: [
      { text: 'A diamond — with two labelled exit arrows for the True (Yes) and False (No) outcomes', isCorrect: true },
      { text: 'A rectangle — the same shape used for all processing steps, including conditionals', isCorrect: false, misconceptionId: `${FLOWCHRT}:M1` },
      { text: 'A parallelogram — used whenever data must be checked before being output', isCorrect: false },
    ],
    correctValue: 'Diamond with two labelled exits = decision',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FLOWCHRT}:M1`],
    source: FLOWCHRT_SRC,
  },
  {
    conceptId: FLOWCHRT, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student draws a flowchart for their algorithm and is satisfied it is correct. Should they skip testing the code because the flowchart was reviewed?',
    choices: [
      { text: 'No — a flowchart is a design description; translating it to code introduces new opportunities for error; the code must be tested independently', isCorrect: true },
      { text: 'Yes — if the flowchart logic is verified, any correct implementation of it will automatically produce correct code', isCorrect: false, misconceptionId: `${FLOWCHRT}:M2` },
    ],
    correctValue: 'Flowchart review ≠ code correctness; implementation must be tested separately',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FLOWCHRT}:M2`],
    source: FLOWCHRT_SRC,
  },
]

// ─── cs.algo.asymptotic-notation ─────────────────────────────────────────────
const ASYMP = 'cs.algo.asymptotic-notation'
const ASYMP_SRC = 'docs/computer-science/kg/graph.json — cs.algo.asymptotic-notation'
const ASYMP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ASYMP, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Asymptotic notation describes how an algorithm\'s resource use (time or space) grows as input size n approaches infinity, ignoring constant factors and lower-order terms. ' +
      'Big-O (O) gives an upper bound on worst-case growth: if T(n) = 3n² + 5n + 2, we say T(n) = O(n²) — the quadratic term dominates as n grows. ' +
      'Omega (Ω) gives a lower bound on best-case: Ω(n²) means the algorithm takes at least quadratic time on some input. ' +
      'Theta (Θ) gives a tight bound: Θ(n²) means the algorithm is both O(n²) and Ω(n²) — quadratic growth exactly. ' +
      'Common complexities in order: O(1) constant → O(log n) logarithmic → O(n) linear → O(n log n) linearithmic → O(n²) quadratic → O(2ⁿ) exponential. ' +
      'Why constant factors are dropped: they depend on hardware and implementation details, not the algorithm\'s inherent scaling behaviour.',
    targetedMisconceptions: [],
    source: ASYMP_SRC,
  },
  {
    conceptId: ASYMP, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'O(n²) does not mean "slow" and O(n) does not mean "fast" — asymptotic notation ignores constant factors. ' +
      'An O(n) algorithm with constant 10,000 is slower than an O(n²) algorithm with constant 1 for all n < 10,000. ' +
      'The notation tells you how performance SCALES, not the wall-clock time for a specific n. ' +
      'Also: O(n²) is an UPPER BOUND — saying an algorithm is O(n²) allows it to be O(n) or O(1) as well (all are valid upper bounds). ' +
      'Θ(n²) is the precise statement: quadratic in both best and worst case. ' +
      'Many students misuse O when they mean Θ.',
    targetedMisconceptions: [`${ASYMP}:M1`],
    source: ASYMP_SRC,
  },
]
const ASYMP_PROBES: SeedProbe[] = [
  {
    conceptId: ASYMP, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An algorithm has T(n) = 5n³ + 2n² + 100. What is its Big-O complexity?',
    choices: [
      { text: 'O(n³) — the highest-degree term dominates; constant coefficients and lower-order terms are dropped', isCorrect: true },
      { text: 'O(5n³ + 2n² + 100) — Big-O keeps the exact expression to be precise', isCorrect: false, misconceptionId: `${ASYMP}:M1` },
      { text: 'O(n²) — the middle term 2n² is the most "representative" of typical performance', isCorrect: false },
    ],
    correctValue: 'O(n³) — dominant term only, coefficient dropped',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ASYMP}:M1`],
    source: ASYMP_SRC,
  },
  {
    conceptId: ASYMP, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Algorithm A is O(n²) and Algorithm B is O(n). For n = 5, A runs in 3 steps and B runs in 10,000 steps. Which is faster for n = 5?',
    choices: [
      { text: 'A — for small n, the constant factor dominates; O(n) does not guarantee fewer steps than O(n²) for all n', isCorrect: true },
      { text: 'B — O(n) is always faster than O(n²) regardless of the input size', isCorrect: false, misconceptionId: `${ASYMP}:M2` },
    ],
    correctValue: 'A is faster here — asymptotic notation describes scaling, not absolute speed for small n',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ASYMP}:M2`],
    source: ASYMP_SRC,
  },
]

// ─── cs.algo.time-space-complexity ────────────────────────────────────────────
const TIMECPLX = 'cs.algo.time-space-complexity'
const TIMECPLX_SRC = 'docs/computer-science/kg/graph.json — cs.algo.time-space-complexity'
const TIMECPLX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TIMECPLX, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Time complexity measures how the number of elementary operations grows with input size n. ' +
      'To calculate it: count the operations that depend on n (ignore constants), identify the dominant term. ' +
      'A single loop running n times → O(n). ' +
      'Two nested loops each running n times → O(n²). ' +
      'A loop halving the search space each iteration → O(log n). ' +
      'Space complexity measures additional memory used beyond the input: an algorithm that allocates an n-element auxiliary array has O(n) space; ' +
      'in-place sorting has O(1) space (ignoring the input array itself). ' +
      'There is often a time-space trade-off: a faster algorithm may use more memory (memoisation, hash tables); ' +
      'a space-efficient algorithm may be slower (recomputing instead of caching). ' +
      'Worst-case, average-case, and best-case complexities can differ: linear search is O(n) worst case, O(1) best case (element found first).',
    targetedMisconceptions: [],
    source: TIMECPLX_SRC,
  },
  {
    conceptId: TIMECPLX, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A nested loop does NOT always mean O(n²). ' +
      'The complexity depends on how many times the inner loop actually runs as a function of n. ' +
      'Example: outer loop runs n times, inner loop runs a fixed 10 times → O(10n) = O(n). ' +
      'Example: outer loop runs n times, inner loop runs i times where i is the outer index → ∑i from 1 to n = n(n+1)/2 = O(n²). ' +
      'Example: outer loop runs n times, inner loop runs log n times → O(n log n). ' +
      'Count carefully; the shape "loop inside a loop" is a pattern to be suspicious of, not a guaranteed O(n²).',
    targetedMisconceptions: [`${TIMECPLX}:M1`],
    source: TIMECPLX_SRC,
  },
]
const TIMECPLX_PROBES: SeedProbe[] = [
  {
    conceptId: TIMECPLX, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the time complexity of this loop?\n\nfor i in range(n):\n    for j in range(i):\n        print(i, j)',
    choices: [
      { text: 'O(n²) — the inner loop runs 0 + 1 + 2 + … + (n-1) = n(n-1)/2 times total, which is Θ(n²)', isCorrect: true },
      { text: 'O(n) — the outer loop runs n times; the inner loop should not affect the total because it is nested', isCorrect: false, misconceptionId: `${TIMECPLX}:M1` },
      { text: 'O(n³) — two nested loops with a print statement inside each counts as three levels', isCorrect: false },
    ],
    correctValue: 'O(n²) — triangular sum n(n-1)/2',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TIMECPLX}:M1`],
    source: TIMECPLX_SRC,
  },
  {
    conceptId: TIMECPLX, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An algorithm uses O(n) extra memory and runs in O(n log n) time. A student proposes a version that uses O(1) extra memory. What might they have to give up?',
    choices: [
      { text: 'Likely a worse time complexity — the O(n) memory may enable a faster algorithm (e.g., merge sort vs. heap sort); the in-place version might be O(n²) or harder to implement correctly', isCorrect: true },
      { text: 'Nothing — reducing memory usage never affects time complexity; both algorithms can achieve the same Big-O time', isCorrect: false, misconceptionId: `${TIMECPLX}:M2` },
    ],
    correctValue: 'Time-space trade-off — reducing memory often costs time complexity',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TIMECPLX}:M2`],
    source: TIMECPLX_SRC,
  },
]

// ─── cs.algo.divide-and-conquer ───────────────────────────────────────────────
const DIVCONQ = 'cs.algo.divide-and-conquer'
const DIVCONQ_SRC = 'docs/computer-science/kg/graph.json — cs.algo.divide-and-conquer'
const DIVCONQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DIVCONQ, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Divide-and-conquer is an algorithm design paradigm with three steps: ' +
      '(1) Divide — split the problem into smaller subproblems of the same type. ' +
      '(2) Conquer — solve each subproblem recursively (base case: problem small enough to solve directly). ' +
      '(3) Combine — merge the subproblem solutions into the answer for the original problem. ' +
      'Merge sort divides the array in half, sorts each half recursively, then merges — O(n log n). ' +
      'Binary search divides the search space in half each time, discards the wrong half — O(log n). ' +
      'Strassen\'s matrix multiplication divides matrices into submatrices, reducing multiplications from 8 to 7 per level — O(n^2.81). ' +
      'The Master Theorem gives the recurrence solution for T(n) = aT(n/b) + f(n): many D&C recurrences have closed-form O() from just three cases.',
    targetedMisconceptions: [],
    source: DIVCONQ_SRC,
  },
  {
    conceptId: DIVCONQ, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Divide-and-conquer and dynamic programming both use overlapping structure, but they differ crucially: ' +
      'D&C splits the problem into INDEPENDENT subproblems — merge sort\'s left half and right half do not share elements. ' +
      'Dynamic programming handles OVERLAPPING subproblems — computing Fibonacci(5) without memoisation recomputes Fibonacci(3) repeatedly. ' +
      'Applying D&C to overlapping subproblems (naïve Fibonacci recursion) produces exponential time; ' +
      'applying DP to independent subproblems is unnecessary overhead. ' +
      'Identify which structure you have before choosing the paradigm.',
    targetedMisconceptions: [`${DIVCONQ}:M1`],
    source: DIVCONQ_SRC,
  },
]
const DIVCONQ_PROBES: SeedProbe[] = [
  {
    conceptId: DIVCONQ, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Merge sort splits an n-element array into two halves, sorts each, then merges in O(n). Which recurrence describes its time complexity?',
    choices: [
      { text: 'T(n) = 2T(n/2) + O(n) — two subproblems of size n/2, combined in linear time → O(n log n) by Master Theorem Case 2', isCorrect: true },
      { text: 'T(n) = T(n-1) + O(n) — one subproblem of size n-1, with O(n) merge → O(n²)', isCorrect: false, misconceptionId: `${DIVCONQ}:M2` },
      { text: 'T(n) = 2T(n/2) + O(1) — two subproblems of size n/2, merged in constant time → O(n)', isCorrect: false },
    ],
    correctValue: 'T(n) = 2T(n/2) + O(n) → O(n log n)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DIVCONQ}:M2`],
    source: DIVCONQ_SRC,
  },
  {
    conceptId: DIVCONQ, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Naïve recursive Fibonacci (fib(n) = fib(n-1) + fib(n-2)) is divide-and-conquer. Why does it run in O(2ⁿ) instead of efficiently?',
    choices: [
      { text: 'The subproblems OVERLAP — fib(n-2) is recomputed independently by both fib(n-1) and the top call; exponential redundancy accumulates; memoisation (DP) collapses it to O(n)', isCorrect: true },
      { text: 'Recursive functions always have exponential overhead because each call adds a stack frame; the exponential time is unavoidable for Fibonacci', isCorrect: false, misconceptionId: `${DIVCONQ}:M1` },
    ],
    correctValue: 'Overlapping subproblems cause repeated computation — DP (memoisation) fixes this',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DIVCONQ}:M1`],
    source: DIVCONQ_SRC,
  },
]

// ─── cs.algo.greedy-algorithms ────────────────────────────────────────────────
const GREEDY = 'cs.algo.greedy-algorithms'
const GREEDY_SRC = 'docs/computer-science/kg/graph.json — cs.algo.greedy-algorithms'
const GREEDY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GREEDY, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A greedy algorithm makes the locally optimal choice at each step, never reconsidering past decisions, hoping this leads to a globally optimal solution. ' +
      'Greedy works when the problem has two properties: greedy choice property (a locally optimal choice leads to a globally optimal solution) and optimal substructure (an optimal solution contains optimal solutions to its subproblems). ' +
      'Examples where greedy is optimal: Dijkstra\'s shortest path (always extend the cheapest unvisited node), Prim\'s/Kruskal\'s MST, Huffman coding (greedily merge the two least-frequent symbols), interval scheduling (always pick the activity finishing earliest). ' +
      'Activity selection problem: given intervals, pick the maximum number of non-overlapping intervals. ' +
      'Greedy choice: always select the interval with the earliest finish time. ' +
      'Proof: an exchange argument shows that replacing any chosen interval with the greedy choice never reduces the count.',
    targetedMisconceptions: [],
    source: GREEDY_SRC,
  },
  {
    conceptId: GREEDY, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Greedy algorithms do NOT always produce optimal results — they can fail badly on problems without the greedy choice property. ' +
      'Classic counterexample: fractional knapsack is solved optimally by greedy (take highest value/weight ratio first). ' +
      '0/1 knapsack (items must be taken whole) is NOT solved optimally by greedy — a small cheap item can block a large valuable one from fitting. ' +
      'Before applying greedy, prove the greedy choice property or provide a counterexample proving it fails. ' +
      '"It worked on my examples" is not a proof — greedy algorithms look plausible and often give near-optimal results even when they are wrong.',
    targetedMisconceptions: [`${GREEDY}:M1`],
    source: GREEDY_SRC,
  },
]
const GREEDY_PROBES: SeedProbe[] = [
  {
    conceptId: GREEDY, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The interval scheduling problem asks for the maximum number of non-overlapping intervals. The greedy strategy is to always select the interval with the earliest finish time. Why does this work optimally?',
    choices: [
      { text: 'Choosing the earliest-finishing interval leaves the most remaining time for future intervals; an exchange argument shows any other first choice cannot improve the count', isCorrect: true },
      { text: 'It works because greedy algorithms always produce optimal solutions for scheduling problems; greedy is the correct paradigm for all time-based optimisation', isCorrect: false, misconceptionId: `${GREEDY}:M1` },
      { text: 'Choosing earliest-start (not earliest-finish) would actually be optimal; earliest-finish is a common mistake', isCorrect: false },
    ],
    correctValue: 'Earliest-finish leaves maximum remaining time; exchange argument proves optimality',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GREEDY}:M1`],
    source: GREEDY_SRC,
  },
  {
    conceptId: GREEDY, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Items: A (weight 3, value 5), B (weight 4, value 6), C (weight 5, value 7). Knapsack capacity = 7. Greedy picks by value density: B (1.5/kg) then A (1.67/kg). What is the greedy solution\'s total value, and is it optimal?',
    choices: [
      { text: 'Greedy picks A then B (weights 3+4=7, values 5+6=11); optimal is also A+B=11 here — but the greedy value-density order matters and fails on other instances (e.g., fractional greedy fails on 0/1 with certain inputs)', isCorrect: true },
      { text: 'Greedy always gives the optimal 0/1 knapsack solution — it is provably correct for this problem type', isCorrect: false, misconceptionId: `${GREEDY}:M1` },
    ],
    correctValue: 'Greedy can find optimal on some instances but is NOT provably correct for 0/1 knapsack',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GREEDY}:M1`],
    source: GREEDY_SRC,
  },
]

// ─── cs.algo.dynamic-programming ─────────────────────────────────────────────
const DYNPROG = 'cs.algo.dynamic-programming'
const DYNPROG_SRC = 'docs/computer-science/kg/graph.json — cs.algo.dynamic-programming'
const DYNPROG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DYNPROG, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Dynamic programming (DP) solves problems with OVERLAPPING subproblems and OPTIMAL SUBSTRUCTURE by solving each subproblem once and storing the result. ' +
      'Two implementation styles: ' +
      'Top-down (memoisation): write the natural recursion, add a cache (dictionary); on each call, return the cached result if available. ' +
      'Bottom-up (tabulation): fill a table from the smallest subproblems up to the answer, eliminating recursion and call-stack overhead. ' +
      'DP identification checklist: (1) Can the problem be expressed as a recurrence over smaller instances? (2) Do the same smaller instances recur in different branches? (3) Does an optimal solution use optimal solutions to subproblems? ' +
      'Classic DP problems: 0/1 knapsack (dp[i][w] = max value using items 1..i with capacity w), longest common subsequence (dp[i][j] = LCS length of first i and first j characters), coin change, edit distance.',
    targetedMisconceptions: [],
    source: DYNPROG_SRC,
  },
  {
    conceptId: DYNPROG, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DP is not just "memoisation" — memoisation is the implementation technique; DP is the paradigm. ' +
      'The conceptual step is identifying the recurrence and verifying optimal substructure; the implementation (top-down vs. bottom-up) is secondary. ' +
      'A common error: applying DP to problems without optimal substructure. ' +
      'Longest simple path in a general graph does NOT have optimal substructure — the longest path from A to C via B need not use the longest path from A to B (because B may appear on the return path, violating the "simple" constraint). ' +
      'Verify optimal substructure formally before trusting a DP solution.',
    targetedMisconceptions: [`${DYNPROG}:M1`],
    source: DYNPROG_SRC,
  },
]
const DYNPROG_PROBES: SeedProbe[] = [
  {
    conceptId: DYNPROG, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The coin change problem: given coins [1, 5, 10, 25] and target T, find the minimum number of coins. The recurrence is dp[0]=0, dp[t] = 1 + min(dp[t-c] for c in coins if t >= c). Which property of this problem justifies DP?',
    choices: [
      { text: 'Both overlapping subproblems (dp[t-c] is needed by many different values of t) and optimal substructure (minimum coins for t uses the minimum coins for t-c)', isCorrect: true },
      { text: 'The greedy choice property — always use the largest coin that fits, which is why DP is equivalent to greedy here', isCorrect: false, misconceptionId: `${DYNPROG}:M1` },
      { text: 'Independent subproblems — each dp[t] is computed from a fresh starting state, so results need not be stored', isCorrect: false },
    ],
    correctValue: 'Overlapping subproblems + optimal substructure → DP',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${DYNPROG}:M1`],
    source: DYNPROG_SRC,
  },
  {
    conceptId: DYNPROG, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student adds memoisation to a recursive function and calls it "dynamic programming." Is memoisation alone sufficient to qualify as DP?',
    choices: [
      { text: 'Memoisation is a DP implementation technique, but DP requires the problem to have overlapping subproblems AND optimal substructure — adding a cache to any recursion is not automatically DP', isCorrect: true },
      { text: 'Yes — memoisation IS dynamic programming; any memoised recursion qualifies as a DP algorithm', isCorrect: false, misconceptionId: `${DYNPROG}:M1` },
    ],
    correctValue: 'DP requires overlapping subproblems + optimal substructure; memoisation is the implementation mechanism',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${DYNPROG}:M1`],
    source: DYNPROG_SRC,
  },
]

// ─── cs.algo.backtracking ─────────────────────────────────────────────────────
const BKTRACK = 'cs.algo.backtracking'
const BKTRACK_SRC = 'docs/computer-science/kg/graph.json — cs.algo.backtracking'
const BKTRACK_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BKTRACK, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Backtracking is a systematic recursive search through a solution space that abandons ("backtracks") a partial solution as soon as it detects the partial solution cannot lead to a valid complete solution. ' +
      'Template: try each choice → if invalid, skip; if valid, recurse → if recursion fails, undo the choice and try the next. ' +
      'Classic problems: N-Queens (place N queens on an N×N board with no conflicts — prune whenever two queens attack each other), ' +
      'Sudoku solver (fill a digit, check constraints, recurse, backtrack if stuck), ' +
      'subset sum, graph colouring. ' +
      'Backtracking is exponential in the worst case but far faster in practice because pruning eliminates most branches. ' +
      'The constraint being checked before recursing is the "pruning condition" — better pruning = exponentially less work.',
    targetedMisconceptions: [],
    source: BKTRACK_SRC,
  },
  {
    conceptId: BKTRACK, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Backtracking is not the same as brute force. ' +
      'Brute force enumerates ALL possible candidates regardless of validity; backtracking prunes invalid candidates EARLY, before generating the entire candidate. ' +
      'For N-Queens, brute force tries all N^N board placements; backtracking with constraint checking on each row prunes entire subtrees and solves N=25 in milliseconds vs. years for brute force. ' +
      'Also: backtracking is not inherently exponential in the number of solutions — the complexity depends on how effectively the pruning reduces the search space. ' +
      'A well-designed backtracking algorithm with good pruning can be polynomial in practice even if worst-case is exponential.',
    targetedMisconceptions: [`${BKTRACK}:M1`],
    source: BKTRACK_SRC,
  },
]
const BKTRACK_PROBES: SeedProbe[] = [
  {
    conceptId: BKTRACK, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a backtracking solution for Sudoku, when is it safe to "backtrack" (undo the last digit placed)?',
    choices: [
      { text: 'When no valid digit can be placed in the current empty cell (violating row, column, or box constraints) — the current partial solution cannot be extended to a valid solution', isCorrect: true },
      { text: 'After placing every digit, at the end of each row, to verify the row sums correctly before moving on', isCorrect: false, misconceptionId: `${BKTRACK}:M2` },
      { text: 'Never — once a valid digit is placed it should remain; only invalid placements trigger backtracking', isCorrect: false },
    ],
    correctValue: 'Backtrack when no valid choice exists for the current position — the partial solution is dead',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BKTRACK}:M2`],
    source: BKTRACK_SRC,
  },
  {
    conceptId: BKTRACK, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student says "backtracking is just brute force with extra steps — it always has the same worst-case complexity." Is this correct?',
    choices: [
      { text: 'No — effective pruning eliminates entire subtrees; backtracking with good constraints can be orders of magnitude faster than brute force, even if worst-case complexity is the same', isCorrect: true },
      { text: 'Yes — backtracking and brute force always explore the same number of candidates; pruning only affects the order, not the total count', isCorrect: false, misconceptionId: `${BKTRACK}:M1` },
    ],
    correctValue: 'Pruning eliminates subtrees early — practical performance is vastly better than brute force',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BKTRACK}:M1`],
    source: BKTRACK_SRC,
  },
]

// ─── cs.algo.np-completeness ──────────────────────────────────────────────────
const NPCOMP = 'cs.algo.np-completeness'
const NPCOMP_SRC = 'docs/computer-science/kg/graph.json — cs.algo.np-completeness'
const NPCOMP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NPCOMP, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'P is the class of decision problems solvable in polynomial time; NP is the class solvable in polynomial time on a nondeterministic machine (equivalently, problems where a given solution can be VERIFIED in polynomial time). ' +
      'NP-hard: a problem is at least as hard as every problem in NP (by polynomial reduction). ' +
      'NP-complete: NP-hard AND in NP — the "hardest" problems in NP. ' +
      'The P vs. NP question asks whether every problem whose solution can be quickly verified can also be quickly solved. ' +
      'If P = NP, cryptography as currently practised would be broken; most believe P ≠ NP but it is not proved. ' +
      'NP-complete examples: 3-SAT (satisfiability), Travelling Salesman (decision version), graph colouring, 0/1 knapsack. ' +
      'Practical responses to NP-completeness: approximation algorithms (polynomial, provably near-optimal), heuristics (fast, no quality guarantee), or exact algorithms for small n.',
    targetedMisconceptions: [],
    source: NPCOMP_SRC,
  },
  {
    conceptId: NPCOMP, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"NP" does not stand for "Non-Polynomial." It stands for "Nondeterministic Polynomial-time." ' +
      'NP includes all of P — polynomial-time problems have polynomial-time verifiers. ' +
      'The claim "NP problems are unsolvable" is wrong: NP-complete problems can be solved exactly but only (as far as we know) in exponential time for general inputs — for small inputs this is perfectly feasible. ' +
      'Also: "NP-hard" is not the same as "NP-complete" — NP-hard problems are at least as hard as NP-complete problems but may not themselves be in NP (some are harder, e.g., PSPACE-hard problems). ' +
      'A problem being NP-complete is a statement about worst-case instances; specific instances may be easy.',
    targetedMisconceptions: [`${NPCOMP}:M1`],
    source: NPCOMP_SRC,
  },
]
const NPCOMP_PROBES: SeedProbe[] = [
  {
    conceptId: NPCOMP, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'To prove problem X is NP-complete, what two things must you demonstrate?',
    choices: [
      { text: 'X is in NP (a given solution can be verified in polynomial time) AND X is NP-hard (a known NP-complete problem reduces to X in polynomial time)', isCorrect: true },
      { text: 'X cannot be solved in polynomial time AND every other NP problem can be reduced to X', isCorrect: false, misconceptionId: `${NPCOMP}:M2` },
      { text: 'X requires exponential time in the worst case AND has no known approximation algorithm within a constant factor', isCorrect: false },
    ],
    correctValue: 'X ∈ NP AND X is NP-hard (via reduction from a known NP-complete problem)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${NPCOMP}:M2`],
    source: NPCOMP_SRC,
  },
  {
    conceptId: NPCOMP, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student reads "3-SAT is NP-complete" and concludes that no 3-SAT instance can be solved quickly. Is this correct?',
    choices: [
      { text: 'No — NP-completeness is a worst-case statement; many specific instances (small formulas, structured inputs) are solved quickly by SAT solvers in practice; only the general worst-case has no known polynomial algorithm', isCorrect: true },
      { text: 'Yes — NP-complete means provably no polynomial-time algorithm exists for ANY instance of the problem', isCorrect: false, misconceptionId: `${NPCOMP}:M1` },
    ],
    correctValue: 'NP-completeness = worst-case hardness; specific instances can still be easy',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${NPCOMP}:M1`],
    source: NPCOMP_SRC,
  },
]

// ─── cs.prog.intro-programming ────────────────────────────────────────────────
const INTROPROG = 'cs.prog.intro-programming'
const INTROPROG_SRC = 'docs/computer-science/kg/graph.json — cs.prog.intro-programming'
const INTROPROG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INTROPROG, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Programming is writing instructions in a language a computer can execute. ' +
      'Every program is built from the same four elements regardless of language: ' +
      'variables (named containers that hold data), ' +
      'operators (symbols that compute new values — +, -, *, /), ' +
      'control structures (if/else, loops — decide which instructions run and how many times), ' +
      'and functions (named, reusable blocks of instructions). ' +
      'The computer executes your program top-to-bottom, one statement at a time, unless a control structure redirects it. ' +
      'A syntax error is a grammar mistake — the language cannot parse the instruction (misspelled keyword, missing colon). ' +
      'A runtime error occurs during execution (division by zero, accessing a list beyond its end). ' +
      'A logic error produces wrong output but no crash — the hardest to find, because the computer did exactly what you said.',
    targetedMisconceptions: [],
    source: INTROPROG_SRC,
  },
  {
    conceptId: INTROPROG, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"The computer understood my code but disagreed with me" is not a real category of error. ' +
      'If the code ran and produced wrong output, it is a logic error — the instructions were valid but expressed the wrong logic. ' +
      'A related misconception: "I\'ve been programming for a week and I still make errors; I\'m not cut out for this." ' +
      'Professional programmers make syntax, runtime, and logic errors daily. ' +
      'Programming skill is measured by how quickly you recognise and fix errors, not by how rarely you make them.',
    targetedMisconceptions: [`${INTROPROG}:M1`],
    source: INTROPROG_SRC,
  },
]
const INTROPROG_PROBES: SeedProbe[] = [
  {
    conceptId: INTROPROG, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A Python program prints the wrong answer but does not crash. What type of error is this?',
    choices: [
      { text: 'A logic error — the syntax and runtime are valid, but the instructions express the wrong computation', isCorrect: true },
      { text: 'A syntax error — the program ran incorrectly because Python misread the code structure', isCorrect: false, misconceptionId: `${INTROPROG}:M2` },
      { text: 'A runtime error — wrong output always indicates an exception that was silently caught', isCorrect: false },
    ],
    correctValue: 'Logic error — wrong output without a crash',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INTROPROG}:M2`],
    source: INTROPROG_SRC,
  },
  {
    conceptId: INTROPROG, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "real programmers don\'t make syntax errors." Is this true?',
    choices: [
      { text: 'False — even experienced programmers make syntax, runtime, and logic errors routinely; expertise is in diagnosing and fixing them quickly, not in never making them', isCorrect: true },
      { text: 'True — syntax errors are beginner mistakes; experienced programmers memorise the full syntax and make only logic errors', isCorrect: false, misconceptionId: `${INTROPROG}:M1` },
    ],
    correctValue: 'All programmers make all error types; skill is in rapid diagnosis, not error-free writing',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INTROPROG}:M1`],
    source: INTROPROG_SRC,
  },
]

// ─── cs.prog.python-basics ────────────────────────────────────────────────────
const PYBASIC = 'cs.prog.python-basics'
const PYBASIC_SRC = 'docs/computer-science/kg/graph.json — cs.prog.python-basics'
const PYBASIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PYBASIC, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Python is a high-level, interpreted, dynamically typed language designed for readability. ' +
      'Key syntax facts: indentation is syntax (not style) — a block is defined by consistent indentation, not braces; wrong indentation causes IndentationError. ' +
      'Variables are created by assignment (x = 5) — no declaration needed. ' +
      'Python is dynamically typed: x = 5 makes x an integer; x = "hello" makes x a string — the type can change at runtime. ' +
      'print() outputs to the console; input() reads a line from the user as a string. ' +
      'Comments begin with # and are ignored by the interpreter. ' +
      'Python uses snake_case for variable and function names by convention. ' +
      'The standard library is extensive; import math, import random give access to additional functions.',
    targetedMisconceptions: [],
    source: PYBASIC_SRC,
  },
  {
    conceptId: PYBASIC, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Python\'s indentation requirement is not arbitrary — the interpreter uses it as the block delimiter. ' +
      'Mixing tabs and spaces causes a TabError even if the code looks aligned in your editor. ' +
      'Use spaces only (PEP 8 recommends 4 spaces per level) and configure your editor to insert spaces for Tab. ' +
      'A related trap: `if x = 5` is a syntax error (assignment, not comparison); `if x == 5` is the equality test. ' +
      '`=` assigns; `==` compares. ' +
      'This swap is valid in many other languages (C assigns in conditions without error) but Python raises SyntaxError on assignment inside an if condition — a helpful safeguard.',
    targetedMisconceptions: [`${PYBASIC}:M1`],
    source: PYBASIC_SRC,
  },
]
const PYBASIC_PROBES: SeedProbe[] = [
  {
    conceptId: PYBASIC, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the output of: x = 3; x = x + 1; print(x)?',
    choices: [
      { text: '4 — x is assigned 3, then reassigned to 3+1=4, then printed', isCorrect: true },
      { text: 'x + 1 — Python prints the expression, not the evaluated value', isCorrect: false, misconceptionId: `${PYBASIC}:M2` },
      { text: 'Error — you cannot reassign a variable to a different value once set', isCorrect: false },
    ],
    correctValue: '4',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PYBASIC}:M2`],
    source: PYBASIC_SRC,
  },
  {
    conceptId: PYBASIC, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does `if x = 5:` cause a SyntaxError in Python, when the same pattern is valid in C?',
    choices: [
      { text: 'In Python, = is always assignment and == is always comparison; Python disallows assignment inside conditions to prevent the common C bug of writing = when == was intended', isCorrect: true },
      { text: 'Python requires parentheses around conditions: `if (x = 5):` would work without error', isCorrect: false, misconceptionId: `${PYBASIC}:M1` },
    ],
    correctValue: 'Python disallows = in conditions by design; use == for comparison',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PYBASIC}:M1`],
    source: PYBASIC_SRC,
  },
]

// ─── cs.prog.data-types-variables ─────────────────────────────────────────────
const DTYPES = 'cs.prog.data-types-variables'
const DTYPES_SRC = 'docs/computer-science/kg/graph.json — cs.prog.data-types-variables'
const DTYPES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DTYPES, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A variable is a named location in memory that stores a value. In Python, variables are created by assignment: `age = 17`. ' +
      'The type of a variable determines what operations are valid and how the value is stored: ' +
      'int — whole numbers (17, -3, 0); float — decimal numbers (3.14, -0.5); str — text ("hello", \'world\'); bool — True or False. ' +
      'Python is dynamically typed: `x = 5` (int) then `x = "five"` (str) — the same name can hold different types. ' +
      'type(x) returns the current type. ' +
      'Constants (values that should not change) are named in ALL_CAPS by convention (not enforced by Python). ' +
      'A variable name must start with a letter or underscore, contain only letters/digits/underscores, and not be a Python keyword (if, for, while, etc.).',
    targetedMisconceptions: [],
    source: DTYPES_SRC,
  },
  {
    conceptId: DTYPES, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Variables do not store the expression you wrote — they store the VALUE. ' +
      '`x = 3 + 4` stores 7 in x; if you later change the 3 and 4 in your code, x is still 7 until reassigned. ' +
      'Integers and floats look similar but behave differently: `7 / 2 = 3.5` (float division in Python 3); `7 // 2 = 3` (floor division, integer result). ' +
      'String "7" and integer 7 are different types: `"7" + "3" = "73"` (concatenation); `7 + 3 = 10` (addition). ' +
      '`int("7") + 3 = 10` — type conversion is explicit.',
    targetedMisconceptions: [`${DTYPES}:M1`],
    source: DTYPES_SRC,
  },
]
const DTYPES_PROBES: SeedProbe[] = [
  {
    conceptId: DTYPES, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the output of: `print("3" + "4")` in Python?',
    choices: [
      { text: '"34" — string concatenation joins the two strings; no arithmetic is performed', isCorrect: true },
      { text: '7 — Python converts "3" and "4" to integers and adds them', isCorrect: false, misconceptionId: `${DTYPES}:M1` },
      { text: 'Error — you cannot use + with strings', isCorrect: false },
    ],
    correctValue: '"34" — string + string = concatenation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${DTYPES}:M1`],
    source: DTYPES_SRC,
  },
  {
    conceptId: DTYPES, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A user enters their age with input(). The code then tries age + 1. What happens and why?',
    choices: [
      { text: 'TypeError — input() always returns a string; "17" + 1 tries to add a string and an int; int(age) is needed first', isCorrect: true },
      { text: 'Works fine — Python automatically converts the string input to int when arithmetic is performed', isCorrect: false, misconceptionId: `${DTYPES}:M1` },
    ],
    correctValue: 'input() returns str; must use int() to convert before arithmetic',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DTYPES}:M1`],
    source: DTYPES_SRC,
  },
]

// ─── cs.prog.operators-expressions ────────────────────────────────────────────
const OPEXPR = 'cs.prog.operators-expressions'
const OPEXPR_SRC = 'docs/computer-science/kg/graph.json — cs.prog.operators-expressions'
const OPEXPR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OPEXPR, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'An expression is any combination of values, variables, and operators that evaluates to a single value. ' +
      'Arithmetic operators: + (add), - (subtract), * (multiply), / (float division), // (floor division), % (modulo — remainder), ** (exponentiation). ' +
      '`17 % 5 = 2` (17 ÷ 5 = 3 remainder 2). Modulo is useful for checking divisibility (`n % 2 == 0` means n is even) and wrapping around (clock arithmetic). ' +
      'Comparison operators return bool: == (equal), != (not equal), <, >, <=, >=. ' +
      'Assignment operators: = (assign), += (add and assign — `x += 1` is `x = x + 1`). ' +
      'Operator precedence (high to low): ** → unary - → *, /, //, % → +, - → comparisons → not → and → or. ' +
      'Use parentheses to override or clarify precedence.',
    targetedMisconceptions: [],
    source: OPEXPR_SRC,
  },
  {
    conceptId: OPEXPR, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '`=` and `==` are completely different operators that are easy to confuse in code and in speech. ' +
      '`x = 5` is an assignment statement — it sets the value of x. ' +
      '`x == 5` is a comparison expression — it evaluates to True or False without changing x. ' +
      'Writing `if x = 5:` is a SyntaxError in Python (intentionally). ' +
      'Modulo `%` is commonly misread as "percent" and its result misunderstood: ' +
      '`-7 % 3` in Python is 2 (not -1), because Python\'s modulo follows the sign of the DIVISOR. ' +
      'This differs from C/Java where `-7 % 3 = -1` — be careful when porting code.',
    targetedMisconceptions: [`${OPEXPR}:M1`],
    source: OPEXPR_SRC,
  },
]
const OPEXPR_PROBES: SeedProbe[] = [
  {
    conceptId: OPEXPR, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the value of `2 + 3 * 4`?',
    choices: [
      { text: '14 — multiplication has higher precedence than addition; 3*4=12, then 2+12=14', isCorrect: true },
      { text: '20 — operations are evaluated left to right; 2+3=5, then 5*4=20', isCorrect: false, misconceptionId: `${OPEXPR}:M1` },
      { text: '24 — parentheses are implied around the whole expression', isCorrect: false },
    ],
    correctValue: '14 — * before +',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${OPEXPR}:M1`],
    source: OPEXPR_SRC,
  },
  {
    conceptId: OPEXPR, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What does `n % 2` evaluate to when n is even, and why is it useful for checking parity?',
    choices: [
      { text: '0 — modulo returns the remainder of division; dividing an even number by 2 leaves no remainder; `n % 2 == 0` is the standard even-number test', isCorrect: true },
      { text: '2 — modulo always returns the divisor when the division is exact', isCorrect: false, misconceptionId: `${OPEXPR}:M2` },
    ],
    correctValue: '0 — even number ÷ 2 has remainder 0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${OPEXPR}:M2`],
    source: OPEXPR_SRC,
  },
]

// ─── cs.prog.type-conversion ──────────────────────────────────────────────────
const TYPECONV = 'cs.prog.type-conversion'
const TYPECONV_SRC = 'docs/computer-science/kg/graph.json — cs.prog.type-conversion'
const TYPECONV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TYPECONV, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Type conversion (casting) changes a value from one type to another. ' +
      'Explicit conversion functions: int(), float(), str(), bool(). ' +
      '`int("42")` → 42; `int(3.9)` → 3 (truncates, does not round); `float(5)` → 5.0; `str(100)` → "100". ' +
      'Implicit conversion (coercion) happens automatically in some languages (5 + 2.0 → 7.0 in Python — int promoted to float). ' +
      'Lossy conversions lose information: `int(3.9)` loses the decimal part; `int("3.9")` raises ValueError (int() cannot parse "3.9" — use float() first: `int(float("3.9"))` → 3). ' +
      'bool() follows truthiness rules: 0, 0.0, "", [], None → False; everything else → True.',
    targetedMisconceptions: [],
    source: TYPECONV_SRC,
  },
  {
    conceptId: TYPECONV, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'int() does not ROUND — it TRUNCATES toward zero: `int(3.9) = 3`, `int(-3.9) = -3`. ' +
      'To round to the nearest integer, use `round(3.9) = 4`. ' +
      'Also: type conversion does not change the original variable unless you reassign: ' +
      '`x = 3.7; int(x)` still leaves x as 3.7; you need `x = int(x)` to update it. ' +
      'String-to-int conversion fails unless the string is a valid integer representation — `int("3.14")` raises ValueError even though `float("3.14")` works.',
    targetedMisconceptions: [`${TYPECONV}:M1`],
    source: TYPECONV_SRC,
  },
]
const TYPECONV_PROBES: SeedProbe[] = [
  {
    conceptId: TYPECONV, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the result of `int(7.9)`?',
    choices: [
      { text: '7 — int() truncates toward zero, discarding the decimal part without rounding', isCorrect: true },
      { text: '8 — int() rounds to the nearest integer', isCorrect: false, misconceptionId: `${TYPECONV}:M1` },
      { text: 'Error — float values cannot be converted to int if they have a non-zero decimal part', isCorrect: false },
    ],
    correctValue: '7 — truncation, not rounding',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TYPECONV}:M1`],
    source: TYPECONV_SRC,
  },
  {
    conceptId: TYPECONV, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'After `x = 3.7; int(x); print(x)`, what is printed?',
    choices: [
      { text: '3.7 — int(x) returns a new value but does not modify x; x is still 3.7', isCorrect: true },
      { text: '3 — int(x) converts x in-place; x is now an integer', isCorrect: false, misconceptionId: `${TYPECONV}:M2` },
    ],
    correctValue: '3.7 — conversion returns a new value; x is unchanged without reassignment',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TYPECONV}:M2`],
    source: TYPECONV_SRC,
  },
]

// ─── cs.prog.input-output ─────────────────────────────────────────────────────
const CSIO = 'cs.prog.input-output'
const CSIO_SRC = 'docs/computer-science/kg/graph.json — cs.prog.input-output'
const CSIO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CSIO, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Programs communicate with the outside world through input and output (I/O). ' +
      'Console I/O in Python: `input(prompt)` displays a prompt, waits for the user to type a line and press Enter, returns that line as a string. ' +
      '`print(value1, value2, ...)` converts its arguments to strings and outputs them to the console separated by spaces (default), followed by a newline. ' +
      '`print(a, b, sep=",", end="")` customises separator and line ending. ' +
      'f-strings format output inline: `f"Hello {name}, you are {age} years old"` — expressions inside {} are evaluated and embedded. ' +
      'Standard streams: stdin (keyboard input), stdout (print output), stderr (error messages). ' +
      'In terminal/script mode, input() blocks until Enter; in IDLE or interactive mode, the prompt appears in the shell.',
    targetedMisconceptions: [],
    source: CSIO_SRC,
  },
  {
    conceptId: CSIO, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'input() always returns a string — even if the user types a number. ' +
      '`age = input("Age: ")` when the user types 17 gives age = "17", not 17. ' +
      'Forgetting this causes TypeErrors in arithmetic. Always convert: `age = int(input("Age: "))`. ' +
      'A second trap: print() does not return the value it prints. ' +
      '`x = print("hello")` sets x to None — print() is called for its side effect, not for a return value. ' +
      'Students who write `x = print(5) + 3` get TypeError (None + 3) because they conflate printing with returning.',
    targetedMisconceptions: [`${CSIO}:M1`],
    source: CSIO_SRC,
  },
]
const CSIO_PROBES: SeedProbe[] = [
  {
    conceptId: CSIO, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The user types "25" when prompted by `age = input("Enter your age: ")`. What is the type and value of age?',
    choices: [
      { text: 'str, "25" — input() always returns a string regardless of what was typed', isCorrect: true },
      { text: 'int, 25 — Python detects that the input looks like a number and converts it automatically', isCorrect: false, misconceptionId: `${CSIO}:M1` },
      { text: 'float, 25.0 — Python defaults to floating-point for all numeric input', isCorrect: false },
    ],
    correctValue: 'str "25" — input() never auto-converts; explicit int() is required',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSIO}:M1`],
    source: CSIO_SRC,
  },
  {
    conceptId: CSIO, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the value of x after `x = print("hello")`?',
    choices: [
      { text: 'None — print() outputs to the console and returns None; it has no meaningful return value', isCorrect: true },
      { text: '"hello" — print() returns the string it printed so it can be used in expressions', isCorrect: false, misconceptionId: `${CSIO}:M2` },
    ],
    correctValue: 'None — print() is for side effects only; its return value is None',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSIO}:M2`],
    source: CSIO_SRC,
  },
]

// ─── cs.prog.exception-handling ───────────────────────────────────────────────
const EXCHAND = 'cs.prog.exception-handling'
const EXCHAND_SRC = 'docs/computer-science/kg/graph.json — cs.prog.exception-handling'
const EXCHAND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXCHAND, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'An exception is an event that disrupts normal program flow — division by zero, file not found, invalid type operation. ' +
      'Python\'s try/except structure: ' +
      '```\ntry:\n    risky_code\nexcept ExceptionType as e:\n    handle_it\nelse:\n    runs_if_no_exception\nfinally:\n    always_runs\n```\n' +
      'Common exceptions: ValueError (wrong value type — int("abc")), TypeError (wrong type in operation — "a" + 1), ZeroDivisionError, FileNotFoundError, IndexError (list index out of range), KeyError (dict key missing). ' +
      'Raise exceptions deliberately: `raise ValueError("age must be positive")`. ' +
      'Custom exceptions: subclass Exception. ' +
      'except without a type catches ALL exceptions — generally a bad practice because it silences bugs.',
    targetedMisconceptions: [],
    source: EXCHAND_SRC,
  },
  {
    conceptId: EXCHAND, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"Wrap everything in try/except to be safe" makes programs less safe, not more. ' +
      'A bare `except:` that silences errors produces programs that appear to work while hiding bugs. ' +
      'Best practice: catch SPECIFIC exceptions for SPECIFIC anticipated failure modes (invalid user input → ValueError; file missing → FileNotFoundError); ' +
      'let unexpected exceptions propagate so they are visible during development. ' +
      'Exception handling is for EXPECTED failure cases at system boundaries (user input, file I/O, network), not for hiding logic errors in internal code.',
    targetedMisconceptions: [`${EXCHAND}:M1`],
    source: EXCHAND_SRC,
  },
]
const EXCHAND_PROBES: SeedProbe[] = [
  {
    conceptId: EXCHAND, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the output of:\n\ntry:\n    x = int("abc")\nexcept ValueError:\n    print("bad input")\nprint("done")',
    choices: [
      { text: '"bad input" then "done" — int("abc") raises ValueError which is caught; execution continues after the except block', isCorrect: true },
      { text: '"bad input" only — a caught exception stops further execution after the except block', isCorrect: false, misconceptionId: `${EXCHAND}:M2` },
      { text: 'Error — the program crashes because ValueError cannot be caught', isCorrect: false },
    ],
    correctValue: '"bad input" then "done" — execution continues after the except block',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EXCHAND}:M2`],
    source: EXCHAND_SRC,
  },
  {
    conceptId: EXCHAND, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student writes `try: ... except: pass` around their entire program "to prevent crashes." What problem does this create?',
    choices: [
      { text: 'Logic errors and unexpected exceptions are silently swallowed — the program appears to work while hiding bugs that need to be found and fixed', isCorrect: true },
      { text: 'Nothing — catching all exceptions is the safest defensive programming practice; it ensures the program never terminates unexpectedly', isCorrect: false, misconceptionId: `${EXCHAND}:M1` },
    ],
    correctValue: 'Bare except silences bugs — catch only specific, anticipated exceptions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EXCHAND}:M1`],
    source: EXCHAND_SRC,
  },
]

// ─── cs.control.conditionals ──────────────────────────────────────────────────
const COND = 'cs.control.conditionals'
const COND_SRC = 'docs/computer-science/kg/graph.json — cs.control.conditionals'
const COND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COND, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Conditionals allow a program to make decisions: execute different code depending on whether a condition is True or False. ' +
      'Python syntax: `if condition:` (required) → `elif other_condition:` (optional, zero or more) → `else:` (optional, at most one). ' +
      'Only the FIRST branch whose condition is True executes; the rest are skipped. ' +
      'If no condition is True and there is an else, the else executes. ' +
      'The condition can be any expression that evaluates to True or False — including comparison expressions, boolean expressions, and variables. ' +
      'Nested if: an if-statement inside another if-statement. ' +
      'Guard clause pattern: use `if not condition: return early` to handle error cases at the top of a function before the main logic.',
    targetedMisconceptions: [],
    source: COND_SRC,
  },
  {
    conceptId: COND, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Multiple if-statements are NOT the same as if/elif/else. ' +
      '```\nif x > 0: print("positive")\nif x == 0: print("zero")\n```\n' +
      'evaluates BOTH conditions regardless — if x is 1, only "positive" prints, but the second condition still runs. ' +
      '```\nif x > 0: print("positive")\nelif x == 0: print("zero")\n```\n' +
      'skips the elif once the if is True. ' +
      'Use separate if-statements when conditions are independent; use elif when only one branch should fire.',
    targetedMisconceptions: [`${COND}:M1`],
    source: COND_SRC,
  },
]
const COND_PROBES: SeedProbe[] = [
  {
    conceptId: COND, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'x = 5. How many print statements execute?\n\nif x > 3: print("a")\nif x > 4: print("b")\nif x > 5: print("c")',
    choices: [
      { text: '2 — "a" and "b"; each if is evaluated independently; x > 3 and x > 4 are both True, x > 5 is False', isCorrect: true },
      { text: '1 — only "a"; once the first if is True, the remaining ifs are skipped', isCorrect: false, misconceptionId: `${COND}:M1` },
      { text: '3 — all three if-statements always evaluate and execute', isCorrect: false },
    ],
    correctValue: '2 — "a" and "b" (separate ifs, not elif)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${COND}:M1`],
    source: COND_SRC,
  },
  {
    conceptId: COND, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why would you use elif instead of a second if statement after the first if?',
    choices: [
      { text: 'elif skips remaining conditions once an earlier condition is True — ensuring mutually exclusive branches and avoiding evaluating redundant conditions', isCorrect: true },
      { text: 'elif and if are interchangeable after the first if; the choice is only stylistic', isCorrect: false, misconceptionId: `${COND}:M1` },
    ],
    correctValue: 'elif = short-circuit: skip remaining branches once one fires; if = always evaluate independently',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${COND}:M1`],
    source: COND_SRC,
  },
]

// ─── cs.control.loops ─────────────────────────────────────────────────────────
const LOOPS = 'cs.control.loops'
const LOOPS_SRC = 'docs/computer-science/kg/graph.json — cs.control.loops'
const LOOPS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOOPS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Loops repeat a block of code. Python has two loop types: ' +
      '`for item in iterable:` — iterates over each element of a sequence (list, range, string, tuple). ' +
      '`for i in range(5):` gives i = 0, 1, 2, 3, 4. `range(start, stop, step)` is flexible. ' +
      '`while condition:` — repeats as long as the condition is True; if the condition never becomes False, the loop runs forever (infinite loop). ' +
      'Loop control: `break` exits the loop immediately; `continue` skips to the next iteration. ' +
      'for-else / while-else: the else clause runs only if the loop completed normally (no break). ' +
      'Use for when you know the number of iterations or are iterating over a collection; use while for indefinite repetition (user input, retry logic).',
    targetedMisconceptions: [],
    source: LOOPS_SRC,
  },
  {
    conceptId: LOOPS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '`range(n)` produces 0 to n-1, NOT 0 to n. `range(5)` = 0,1,2,3,4 — five items starting at 0. ' +
      'A common off-by-one error: `for i in range(len(lst)):` iterates indices 0 to len-1, but `lst[len(lst)]` is IndexError. ' +
      'Modifying a list while iterating over it with for produces unpredictable results — iterate over a copy or use a while loop with careful index management. ' +
      'An infinite while loop usually means the loop variable is never updated inside the loop body: ' +
      '`while x < 10:` where x never increases inside will run forever.',
    targetedMisconceptions: [`${LOOPS}:M1`],
    source: LOOPS_SRC,
  },
]
const LOOPS_PROBES: SeedProbe[] = [
  {
    conceptId: LOOPS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'How many times does the loop body execute?\n\nfor i in range(3, 8, 2):\n    print(i)',
    choices: [
      { text: '3 — i takes values 3, 5, 7 (start=3, stop=8 exclusive, step=2)', isCorrect: true },
      { text: '5 — range(3, 8, 2) produces 5 values from 3 to 8', isCorrect: false, misconceptionId: `${LOOPS}:M1` },
      { text: '2 — the step of 2 halves the count of a range(3,8) which would be 5', isCorrect: false },
    ],
    correctValue: '3 iterations: i = 3, 5, 7',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LOOPS}:M1`],
    source: LOOPS_SRC,
  },
  {
    conceptId: LOOPS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'x = 1; while x < 5: print(x). What happens?',
    choices: [
      { text: 'Infinite loop — x is never updated inside the loop body; the condition x < 5 is always True', isCorrect: true },
      { text: 'Prints 1, 2, 3, 4 — while loops automatically increment the loop variable by 1 each iteration', isCorrect: false, misconceptionId: `${LOOPS}:M2` },
    ],
    correctValue: 'Infinite loop — x never changes; while does NOT auto-increment',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LOOPS}:M2`],
    source: LOOPS_SRC,
  },
]

// ─── cs.control.nested-control-patterns ──────────────────────────────────────
const NESTED = 'cs.control.nested-control-patterns'
const NESTED_SRC = 'docs/computer-science/kg/graph.json — cs.control.nested-control-patterns'
const NESTED_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NESTED, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Nested control structures are loops or conditionals inside other loops or conditionals. ' +
      'Nested loops are common for 2D structures (matrices, grid searches): outer loop iterates rows, inner loop iterates columns. ' +
      'Key insight: the inner loop completes all its iterations for EACH iteration of the outer loop. ' +
      'A break inside a nested loop breaks only the INNERMOST loop, not all outer loops. ' +
      'To break multiple levels, use a flag variable or extract the inner structure into a function (then `return` exits the whole function). ' +
      'Common patterns: search all pairs (double loop over i, j), accumulate results (sum_row[i] += grid[i][j]), build output row by row. ' +
      'Deep nesting (3+ levels) is a design smell — refactor by extracting inner loops into named functions.',
    targetedMisconceptions: [],
    source: NESTED_SRC,
  },
  {
    conceptId: NESTED, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'break in a nested loop breaks ONLY the loop it directly belongs to — not all enclosing loops. ' +
      '```\nfor i in range(3):\n    for j in range(3):\n        if j == 1: break\n    print(i)\n```\n' +
      'The break exits the inner j-loop but the outer i-loop continues, printing 0, 1, 2. ' +
      'Students expecting the break to exit "the loop" in general are surprised. ' +
      'Also: indentation errors in nested structures move code into the wrong level — a `print` that should be inside the inner loop ends up outside it if indented one level too few.',
    targetedMisconceptions: [`${NESTED}:M1`],
    source: NESTED_SRC,
  },
]
const NESTED_PROBES: SeedProbe[] = [
  {
    conceptId: NESTED, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'How many total times does `count += 1` execute?\n\ncount = 0\nfor i in range(4):\n    for j in range(3):\n        count += 1',
    choices: [
      { text: '12 — the outer loop runs 4 times; for each, the inner runs 3 times; 4 × 3 = 12', isCorrect: true },
      { text: '7 — 4 outer iterations + 3 inner iterations', isCorrect: false, misconceptionId: `${NESTED}:M2` },
      { text: '3 — only the inner loop increments count; the outer loop just controls which pass of the inner loop runs', isCorrect: false },
    ],
    correctValue: '12 — nested loops multiply: 4 × 3',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NESTED}:M2`],
    source: NESTED_SRC,
  },
  {
    conceptId: NESTED, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a double loop, a `break` inside the inner loop fires. Does it exit both loops or just the inner one?',
    choices: [
      { text: 'Just the inner loop — break exits the loop it is directly inside; the outer loop continues its next iteration', isCorrect: true },
      { text: 'Both loops — break terminates all enclosing loops until the function returns', isCorrect: false, misconceptionId: `${NESTED}:M1` },
    ],
    correctValue: 'break exits only the innermost loop',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NESTED}:M1`],
    source: NESTED_SRC,
  },
]

// ─── cs.data.strings ──────────────────────────────────────────────────────────
const CSSTRS = 'cs.data.strings'
const CSSTRS_SRC = 'docs/computer-science/kg/graph.json — cs.data.strings'
const CSSTRS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CSSTRS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A string is an immutable sequence of characters. ' +
      'Strings are indexed from 0: `s = "hello"`; `s[0] = "h"`, `s[-1] = "o"` (negative index counts from the end). ' +
      'Slicing: `s[1:4]` → "ell" (from index 1 up to but not including 4). ' +
      'Concatenation: `"hello" + " world"` = "hello world". ' +
      'Key string methods: `.upper()`, `.lower()`, `.strip()` (remove leading/trailing whitespace), ' +
      '`.split(sep)` (split into list), `sep.join(list)` (join list into string), ' +
      '`.replace(old, new)`, `.find(sub)` (returns index or -1), `.startswith(prefix)`, `len(s)`. ' +
      'Strings are immutable — methods return NEW strings; they never modify the original. ' +
      'f-strings: `f"My name is {name}"` — the cleanest formatting for most cases.',
    targetedMisconceptions: [],
    source: CSSTRS_SRC,
  },
  {
    conceptId: CSSTRS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Strings are immutable in Python — you cannot change a character in place. ' +
      '`s = "hello"; s[0] = "H"` raises TypeError. ' +
      'To "modify" a string, build a new one: `s = "H" + s[1:]`. ' +
      'Methods like `.upper()` do NOT change s — they return a new string. ' +
      '`s.upper()` without reassigning does nothing useful: `s = s.upper()` is needed to keep the result. ' +
      'This surprises students coming from C where strings are char arrays that can be modified in place.',
    targetedMisconceptions: [`${CSSTRS}:M1`],
    source: CSSTRS_SRC,
  },
]
const CSSTRS_PROBES: SeedProbe[] = [
  {
    conceptId: CSSTRS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 's = "python". What is `s[2:5]`?',
    choices: [
      { text: '"tho" — slicing from index 2 (inclusive) to 5 (exclusive): p(0)y(1)t(2)h(3)o(4)n(5)', isCorrect: true },
      { text: '"yth" — slicing from index 2 to 5 inclusive', isCorrect: false, misconceptionId: `${CSSTRS}:M1` },
      { text: '"pyt" — slicing takes the first 5 characters then removes the first 2', isCorrect: false },
    ],
    correctValue: '"tho" — s[2] to s[4] (stop index excluded)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSSTRS}:M1`],
    source: CSSTRS_SRC,
  },
  {
    conceptId: CSSTRS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'After `s = "hello"; s.upper()`, what is the value of s?',
    choices: [
      { text: '"hello" — .upper() returns a new string; s is unchanged; you need `s = s.upper()` to update it', isCorrect: true },
      { text: '"HELLO" — .upper() modifies the string in place', isCorrect: false, misconceptionId: `${CSSTRS}:M1` },
    ],
    correctValue: '"hello" — strings are immutable; methods return new strings',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSSTRS}:M1`],
    source: CSSTRS_SRC,
  },
]

// ─── cs.data.lists ────────────────────────────────────────────────────────────
const CSLISTS = 'cs.data.lists'
const CSLISTS_SRC = 'docs/computer-science/kg/graph.json — cs.data.lists'
const CSLISTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CSLISTS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A list is a mutable, ordered sequence of values of any type. ' +
      'Creation: `lst = [1, "a", 3.0]`. Indexing: `lst[0]` = 1; `lst[-1]` = 3.0. Slicing: `lst[1:3]` = ["a", 3.0]. ' +
      'Mutation: `lst[0] = 99` changes the first element in place. ' +
      'Key methods: `.append(x)` adds x to the end; `.insert(i, x)` inserts at index i; ' +
      '`.pop(i)` removes and returns element at i (default last); `.remove(x)` removes first occurrence of x; ' +
      '`.sort()` sorts in place; `sorted(lst)` returns a new sorted list. ' +
      '`len(lst)` returns the count. `x in lst` tests membership in O(n). ' +
      'Lists can be nested: `matrix = [[1,2],[3,4]]`; `matrix[1][0]` = 3.',
    targetedMisconceptions: [],
    source: CSLISTS_SRC,
  },
  {
    conceptId: CSLISTS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Lists are mutable and assignment copies the reference, not the list. ' +
      '`a = [1,2,3]; b = a; b.append(4)` — now a = [1,2,3,4] too, because a and b point to the SAME list. ' +
      'To get an independent copy: `b = a.copy()` or `b = a[:]`. ' +
      'This surprises students because integers work differently: `x = 5; y = x; y = 6` leaves x = 5 (integers are immutable; y was rebound to a new int, not a shared reference). ' +
      'Lists passed to functions are also passed by reference — the function can modify the original list.',
    targetedMisconceptions: [`${CSLISTS}:M1`],
    source: CSLISTS_SRC,
  },
]
const CSLISTS_PROBES: SeedProbe[] = [
  {
    conceptId: CSLISTS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'a = [1,2,3]; b = a; b.append(4). What is the value of a?',
    choices: [
      { text: '[1,2,3,4] — b is a reference to the same list; appending to b modifies the list that a also points to', isCorrect: true },
      { text: '[1,2,3] — b = a copies the list; a is unaffected by changes to b', isCorrect: false, misconceptionId: `${CSLISTS}:M1` },
      { text: '[1,2,3,4,4] — appending to a reference appends twice (once to b, once propagated back to a)', isCorrect: false },
    ],
    correctValue: '[1,2,3,4] — a and b are aliases for the same list object',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSLISTS}:M1`],
    source: CSLISTS_SRC,
  },
  {
    conceptId: CSLISTS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'How do you create an independent copy of a list `a` so that modifying the copy does not change `a`?',
    choices: [
      { text: '`b = a.copy()` or `b = a[:]` — both create a shallow copy; modifying b\'s top-level elements does not affect a', isCorrect: true },
      { text: '`b = a` — this creates a copy that is independent of a', isCorrect: false, misconceptionId: `${CSLISTS}:M1` },
    ],
    correctValue: 'a.copy() or a[:] for a shallow copy; `b = a` is just another reference',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSLISTS}:M1`],
    source: CSLISTS_SRC,
  },
]

// ─── cs.data.tuples ───────────────────────────────────────────────────────────
const TUPLES = 'cs.data.tuples'
const TUPLES_SRC = 'docs/computer-science/kg/graph.json — cs.data.tuples'
const TUPLES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TUPLES, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A tuple is an immutable, ordered sequence — like a list that cannot be changed after creation. ' +
      'Syntax: `t = (1, "hello", 3.0)` or `t = 1, "hello", 3.0` (parentheses optional). ' +
      'Indexing and slicing work identically to lists. ' +
      'Use tuples for: fixed data that should not be modified (coordinates, RGB colours, database records), ' +
      'function return values (return x, y returns a tuple), ' +
      'dictionary keys (lists cannot be keys; tuples can because they are hashable). ' +
      'Tuple unpacking: `x, y = (3, 4)` assigns 3 to x and 4 to y — convenient for multi-value assignment. ' +
      'Single-element tuple requires a trailing comma: `(5,)` — `(5)` is just the integer 5 in parentheses.',
    targetedMisconceptions: [],
    source: TUPLES_SRC,
  },
  {
    conceptId: TUPLES, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A single-element tuple REQUIRES a trailing comma: `t = (5,)`. Without it, `t = (5)` is just the integer 5 in parentheses — not a tuple at all. ' +
      '`type((5)) = int`; `type((5,)) = tuple`. ' +
      'This matters when you build tuples programmatically and expect them to have a specific length. ' +
      'Also: tuples are immutable at the top level, but mutable objects inside them (like lists) can still be changed: ' +
      '`t = ([1,2], 3); t[0].append(99)` works and changes the list inside t.',
    targetedMisconceptions: [`${TUPLES}:M1`],
    source: TUPLES_SRC,
  },
]
const TUPLES_PROBES: SeedProbe[] = [
  {
    conceptId: TUPLES, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the type of `(7)`?',
    choices: [
      { text: 'int — parentheses here are grouping notation, not a tuple; a single-element tuple requires `(7,)`', isCorrect: true },
      { text: 'tuple — any value inside parentheses is a tuple in Python', isCorrect: false, misconceptionId: `${TUPLES}:M1` },
      { text: 'float — Python defaults to float for any single-value container', isCorrect: false },
    ],
    correctValue: 'int — use (7,) for a single-element tuple',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TUPLES}:M1`],
    source: TUPLES_SRC,
  },
  {
    conceptId: TUPLES, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why can a tuple be used as a dictionary key, but a list cannot?',
    choices: [
      { text: 'Tuples are immutable (hashable), so their hash value is fixed; lists are mutable and their hash could change — Python requires hashable (immutable) keys', isCorrect: true },
      { text: 'Dictionary keys must be shorter than 255 characters; lists are too long for keys in most cases', isCorrect: false, misconceptionId: `${TUPLES}:M2` },
    ],
    correctValue: 'Tuples are immutable → hashable → valid as dict keys; lists are mutable → unhashable',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TUPLES}:M2`],
    source: TUPLES_SRC,
  },
]

// ─── cs.data.dictionaries ─────────────────────────────────────────────────────
const DICTS = 'cs.data.dictionaries'
const DICTS_SRC = 'docs/computer-science/kg/graph.json — cs.data.dictionaries'
const DICTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DICTS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A dictionary (dict) is a mutable, unordered (Python 3.7+ insertion-ordered) collection of key-value pairs. ' +
      'Creation: `d = {"name": "Alice", "age": 30}`. ' +
      'Access: `d["name"]` → "Alice"; `d.get("age", 0)` → 30 (0 if missing — avoids KeyError). ' +
      'Mutation: `d["age"] = 31` updates; `d["city"] = "London"` adds a new key. ' +
      'Deletion: `del d["city"]`; `d.pop("city")` removes and returns. ' +
      'Iteration: `d.keys()`, `d.values()`, `d.items()` (key-value tuples). ' +
      'Membership test: `"name" in d` checks for the key (not value) — O(1) average. ' +
      'Keys must be hashable (strings, numbers, tuples); values can be anything.',
    targetedMisconceptions: [],
    source: DICTS_SRC,
  },
  {
    conceptId: DICTS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '`d["missing_key"]` raises KeyError — dictionaries do not return None for absent keys. ' +
      'Use `d.get("key")` for a None-safe lookup, or `d.get("key", default)` for a custom default. ' +
      'Also: `"value" in d` checks KEYS, not values. ' +
      'To check if a value is in the dict: `"value" in d.values()` — but this is O(n), not O(1). ' +
      'Iterating `for k in d:` iterates over KEYS, not values — `d[k]` inside the loop gives the value.',
    targetedMisconceptions: [`${DICTS}:M1`],
    source: DICTS_SRC,
  },
]
const DICTS_PROBES: SeedProbe[] = [
  {
    conceptId: DICTS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'd = {"x": 10, "y": 20}. What does `"x" in d` return?',
    choices: [
      { text: 'True — `in` checks dictionary KEYS; "x" is a key', isCorrect: true },
      { text: 'False — `in` checks dictionary VALUES; "x" is not a value', isCorrect: false, misconceptionId: `${DICTS}:M1` },
      { text: '10 — `in` returns the value associated with the key', isCorrect: false },
    ],
    correctValue: 'True — `in` tests for key membership in O(1)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DICTS}:M1`],
    source: DICTS_SRC,
  },
  {
    conceptId: DICTS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'd = {"a": 1}. What happens with `d["b"]`?',
    choices: [
      { text: 'KeyError — accessing a missing key raises an exception; use d.get("b") for a safe lookup', isCorrect: true },
      { text: 'Returns None — Python dictionaries return None for any missing key', isCorrect: false, misconceptionId: `${DICTS}:M1` },
    ],
    correctValue: 'KeyError — missing keys raise an exception; d.get() avoids this',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DICTS}:M1`],
    source: DICTS_SRC,
  },
]

// ─── cs.data.sets ─────────────────────────────────────────────────────────────
const CSSETS = 'cs.data.sets'
const CSSETS_SRC = 'docs/computer-science/kg/graph.json — cs.data.sets'
const CSSETS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CSSETS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A set is an unordered collection of UNIQUE, HASHABLE elements. ' +
      'Creation: `s = {1, 2, 3}` or `s = set([1, 2, 2, 3])` → {1, 2, 3} (duplicates removed). ' +
      'Empty set: `set()` (not `{}` — that creates an empty dict). ' +
      'Key operations: `.add(x)`, `.remove(x)` (KeyError if missing), `.discard(x)` (no error if missing). ' +
      'Set algebra: `A | B` (union), `A & B` (intersection), `A - B` (difference), `A ^ B` (symmetric difference). ' +
      'Membership: `x in s` is O(1) — the main reason to prefer sets over lists for large containment tests. ' +
      'Sets are unordered — you cannot index a set; convert to a sorted list if order matters.',
    targetedMisconceptions: [],
    source: CSSETS_SRC,
  },
  {
    conceptId: CSSETS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '`{}` creates an empty DICT, not an empty set. `set()` is needed for an empty set. ' +
      'This is a frequent Python gotcha: `d = {}; type(d)` = dict; `s = set(); type(s)` = set. ' +
      'Sets are unordered — the iteration order is not guaranteed and not the insertion order. ' +
      'Two sets {1,2,3} and {3,1,2} are identical — there is no concept of "first element" in a set. ' +
      'A set can only contain hashable elements — you cannot put a list into a set (use frozenset for a hashable set-within-a-set).',
    targetedMisconceptions: [`${CSSETS}:M1`],
    source: CSSETS_SRC,
  },
]
const CSSETS_PROBES: SeedProbe[] = [
  {
    conceptId: CSSETS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 's = set([1, 2, 2, 3, 3, 3]). What is len(s)?',
    choices: [
      { text: '3 — sets store only unique elements; duplicates are removed', isCorrect: true },
      { text: '6 — set() counts all elements including duplicates', isCorrect: false, misconceptionId: `${CSSETS}:M2` },
      { text: 'Error — sets cannot be created from lists containing duplicates', isCorrect: false },
    ],
    correctValue: '3 — {1, 2, 3} after deduplication',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSSETS}:M2`],
    source: CSSETS_SRC,
  },
  {
    conceptId: CSSETS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the type of `{}`?',
    choices: [
      { text: 'dict — `{}` creates an empty dictionary; use `set()` to create an empty set', isCorrect: true },
      { text: 'set — curly braces always create a set in Python', isCorrect: false, misconceptionId: `${CSSETS}:M1` },
    ],
    correctValue: 'dict — `{}` is an empty dict; `set()` is an empty set',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CSSETS}:M1`],
    source: CSSETS_SRC,
  },
]

// ─── cs.data.comprehensions-iterators ────────────────────────────────────────
const COMPITER = 'cs.data.comprehensions-iterators'
const COMPITER_SRC = 'docs/computer-science/kg/graph.json — cs.data.comprehensions-iterators'
const COMPITER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPITER, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'List comprehensions provide a concise syntax for building lists by transforming or filtering an iterable: ' +
      '`[expr for item in iterable if condition]`. ' +
      '`squares = [x**2 for x in range(10)]` — clearer and often faster than a loop + append. ' +
      'Dict comprehensions: `{k: v for k, v in pairs}`. Set comprehensions: `{x for x in lst}`. ' +
      'Generator expressions: `(x**2 for x in range(10))` — like a list comprehension but lazy (yields one value at a time), O(1) memory instead of O(n). ' +
      'An iterator is any object implementing `__next__()`; iterables implement `__iter__()` (return an iterator). ' +
      '`iter(lst)` returns an iterator; `next(it)` gets the next element; StopIteration when exhausted. ' +
      'for-loops work by calling `iter()` then repeatedly calling `next()` until StopIteration.',
    targetedMisconceptions: [],
    source: COMPITER_SRC,
  },
  {
    conceptId: COMPITER, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Generator expressions and list comprehensions are syntactically similar but produce different objects. ' +
      '`[x**2 for x in range(1000000)]` builds a list of 1M values in memory. ' +
      '`(x**2 for x in range(1000000))` builds a generator that computes each value on demand — O(1) memory. ' +
      'If you iterate the generator once, you can\'t restart it: a generator is one-way and one-time. ' +
      'Also: nested comprehensions execute the rightmost for-clause first (like nested loops): ' +
      '`[f(x,y) for x in A for y in B]` is the same as `for x in A: for y in B: result.append(f(x,y))`.',
    targetedMisconceptions: [`${COMPITER}:M1`],
    source: COMPITER_SRC,
  },
]
const COMPITER_PROBES: SeedProbe[] = [
  {
    conceptId: COMPITER, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does `[x*2 for x in range(5) if x % 2 == 0]` produce?',
    choices: [
      { text: '[0, 4, 8] — x takes values 0,1,2,3,4; the filter keeps 0,2,4; doubling gives 0,4,8', isCorrect: true },
      { text: '[0, 2, 4, 6, 8] — if condition filters nothing; all doubled values are included', isCorrect: false, misconceptionId: `${COMPITER}:M2` },
      { text: '[2, 4] — even numbers from range(5) with no doubling', isCorrect: false },
    ],
    correctValue: '[0, 4, 8] — filter evens (0,2,4) then double',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COMPITER}:M2`],
    source: COMPITER_SRC,
  },
  {
    conceptId: COMPITER, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You iterate a generator expression and print all values. You then iterate it again. What happens on the second pass?',
    choices: [
      { text: 'Nothing is printed — generators are one-time iterators; once exhausted, they do not reset', isCorrect: true },
      { text: 'The same values print again — generators reset to the start after being fully consumed', isCorrect: false, misconceptionId: `${COMPITER}:M1` },
    ],
    correctValue: 'Generators are exhausted after one pass; create a new one to re-iterate',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COMPITER}:M1`],
    source: COMPITER_SRC,
  },
]

// ─── cs.func.functions ────────────────────────────────────────────────────────
const FUNCS = 'cs.func.functions'
const FUNCS_SRC = 'docs/computer-science/kg/graph.json — cs.func.functions'
const FUNCS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FUNCS, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A function is a named, reusable block of code that takes parameters, executes, and optionally returns a value. ' +
      'Definition: `def function_name(param1, param2=default):`. ' +
      'Arguments can be positional or keyword: `f(3, 4)` or `f(x=3, y=4)`. ' +
      'Default parameters: `def greet(name, greeting="Hello")` — `greeting` is optional in the call. ' +
      'Return: `return value` exits the function and passes value to the caller. A function with no return statement returns None. ' +
      'Functions are first-class objects in Python — they can be assigned to variables, passed as arguments, and returned from other functions. ' +
      'Why use functions? Avoid repetition (DRY — Don\'t Repeat Yourself), name a concept, isolate and test a unit of logic, hide implementation details (abstraction).',
    targetedMisconceptions: [],
    source: FUNCS_SRC,
  },
  {
    conceptId: FUNCS, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Calling a function and defining a function are different. ' +
      '`def square(x): return x**2` defines it — no code runs yet. ' +
      '`square(4)` calls it — code runs and returns 16. ' +
      'Forgetting `return` is a common bug: a function that computes a result but forgets to return it gives None to the caller silently. ' +
      'Parameters are LOCAL copies — modifying a parameter inside a function does not change the variable in the caller (for immutable types). ' +
      'But mutable objects (lists, dicts) passed as arguments ARE modified in place — the parameter and caller share the same object.',
    targetedMisconceptions: [`${FUNCS}:M1`],
    source: FUNCS_SRC,
  },
]
const FUNCS_PROBES: SeedProbe[] = [
  {
    conceptId: FUNCS, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'def add(a, b): a + b. What does add(3, 4) return?',
    choices: [
      { text: 'None — there is no `return` statement; Python functions without return implicitly return None', isCorrect: true },
      { text: '7 — the expression a + b is computed and returned as the function\'s last expression', isCorrect: false, misconceptionId: `${FUNCS}:M1` },
      { text: 'Error — functions must have a return statement to be valid', isCorrect: false },
    ],
    correctValue: 'None — missing return statement; `return a + b` is needed',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FUNCS}:M1`],
    source: FUNCS_SRC,
  },
  {
    conceptId: FUNCS, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'def f(x): x = x + 1. After calling f(5), what is the value of x in the calling scope?',
    choices: [
      { text: 'Unchanged — x inside f is a local parameter; reassigning it does not affect any variable named x in the caller', isCorrect: true },
      { text: '6 — modifying x inside the function updates the caller\'s variable because Python passes by reference', isCorrect: false, misconceptionId: `${FUNCS}:M2` },
    ],
    correctValue: 'Unchanged — parameters are local; integer reassignment does not propagate back',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FUNCS}:M2`],
    source: FUNCS_SRC,
  },
]

// ─── cs.func.scope-namespaces ─────────────────────────────────────────────────
const SCOPE = 'cs.func.scope-namespaces'
const SCOPE_SRC = 'docs/computer-science/kg/graph.json — cs.func.scope-namespaces'
const SCOPE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SCOPE, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Scope determines which variables are visible at a given point in a program. ' +
      'Python uses LEGB scope resolution: Local → Enclosing → Global → Built-in. ' +
      'Local: variables defined inside the current function. ' +
      'Enclosing: variables from the outer function in nested functions. ' +
      'Global: variables at the module (top) level. ' +
      'Built-in: Python\'s built-in names (print, len, range). ' +
      'A variable is looked up in this order — the first match wins. ' +
      'To assign to a global variable inside a function: declare `global x` first. ' +
      'To assign to an enclosing variable: declare `nonlocal x`. ' +
      'Without these declarations, assigning x inside a function creates a NEW local x, shadowing the outer one.',
    targetedMisconceptions: [],
    source: SCOPE_SRC,
  },
  {
    conceptId: SCOPE, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'You can READ a global variable from inside a function without `global`, but you cannot ASSIGN to it. ' +
      '```\nx = 10\ndef f(): print(x)  # reads global x — works\ndef g(): x = 20  # creates local x, global x unchanged\ndef h(): global x; x = 20  # modifies global x\n```\n' +
      'Attempting to read a global x AND assign to x in the same function (without `global`) causes UnboundLocalError: ' +
      'Python sees the assignment and marks x as local for the whole function; the read-before-assign fails.',
    targetedMisconceptions: [`${SCOPE}:M1`],
    source: SCOPE_SRC,
  },
]
const SCOPE_PROBES: SeedProbe[] = [
  {
    conceptId: SCOPE, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'x = 5. def f(): x = 10; print(x). f(); print(x). What is printed?',
    choices: [
      { text: '10 then 5 — f creates a local x = 10; the global x is unchanged at 5', isCorrect: true },
      { text: '10 then 10 — assigning inside f modifies the global x', isCorrect: false, misconceptionId: `${SCOPE}:M1` },
      { text: '5 then 5 — f reads the global x and printing it inside f shows 5', isCorrect: false },
    ],
    correctValue: '10 (local x) then 5 (global x unchanged)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SCOPE}:M1`],
    source: SCOPE_SRC,
  },
  {
    conceptId: SCOPE, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why does `x = 5; def f(): print(x); x = 10` raise UnboundLocalError when f() is called?',
    choices: [
      { text: 'Python sees `x = 10` in f and marks x as local for the entire function; `print(x)` then tries to read local x before it is assigned — UnboundLocalError', isCorrect: true },
      { text: 'print(x) runs before x = 10 because Python executes all print statements first; the order does not matter for UnboundLocalError', isCorrect: false, misconceptionId: `${SCOPE}:M2` },
    ],
    correctValue: 'Assignment anywhere in the function makes x local for the whole function — reading before assignment fails',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SCOPE}:M2`],
    source: SCOPE_SRC,
  },
]

// ─── cs.func.recursion ────────────────────────────────────────────────────────
const RECUR = 'cs.func.recursion'
const RECUR_SRC = 'docs/computer-science/kg/graph.json — cs.func.recursion'
const RECUR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RECUR, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A recursive function calls itself with a simpler version of the problem, building toward a base case where the answer is known directly without further recursion. ' +
      'Every recursive function needs: (1) a base case (returns a value directly — terminates the recursion), ' +
      '(2) a recursive case (calls itself on a smaller input). ' +
      'factorial(n) = 1 if n==0 else n * factorial(n-1): base case n==0, recursive case n * factorial(n-1). ' +
      'The call stack stores each call\'s local variables and return address; deep recursion fills the stack → RecursionError (stack overflow). ' +
      'Python\'s default recursion limit is 1000. ' +
      'Tail recursion (the recursive call is the last operation) can theoretically be optimised to constant stack space, but Python does not perform tail-call optimisation.',
    targetedMisconceptions: [],
    source: RECUR_SRC,
  },
  {
    conceptId: RECUR, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Recursion is not inherently inefficient — naïve recursion on overlapping subproblems is (re-computing the same call many times). ' +
      'Recursive merge sort is O(n log n); recursive binary search is O(log n). ' +
      'Naïve recursive Fibonacci is O(2ⁿ) because of redundant recomputation — memoisation fixes it to O(n). ' +
      'Missing or wrong base cases cause infinite recursion → RecursionError. ' +
      'The recursive case MUST reduce the input toward the base case; ' +
      '`def bad(n): return bad(n)` recurses forever because n never changes.',
    targetedMisconceptions: [`${RECUR}:M1`],
    source: RECUR_SRC,
  },
]
const RECUR_PROBES: SeedProbe[] = [
  {
    conceptId: RECUR, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'def count(n): if n == 0: return; print(n); count(n-1). What is the output of count(3)?',
    choices: [
      { text: '3, 2, 1 — prints n=3, recurses with n=2, prints 2, recurses with n=1, prints 1, recurses with n=0 which returns', isCorrect: true },
      { text: '1, 2, 3 — recursive calls complete before printing; the output is bottom-up', isCorrect: false, misconceptionId: `${RECUR}:M2` },
      { text: 'RecursionError — the base case is wrong; n==0 should recurse to n=-1 to terminate', isCorrect: false },
    ],
    correctValue: '3, 2, 1 — print happens before recursive call',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RECUR}:M2`],
    source: RECUR_SRC,
  },
  {
    conceptId: RECUR, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'def f(n): return f(n). What error does this cause, and why?',
    choices: [
      { text: 'RecursionError — the recursive case never reduces n toward a base case; the call stack fills and Python terminates the call', isCorrect: true },
      { text: 'SyntaxError — a function cannot call itself without using a different variable name', isCorrect: false, misconceptionId: `${RECUR}:M3` },
    ],
    correctValue: 'RecursionError — infinite recursion with no base case or progress toward one',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RECUR}:M3`],
    source: RECUR_SRC,
  },
]

// ─── cs.func.lambda-functional ────────────────────────────────────────────────
const LAMBDA = 'cs.func.lambda-functional'
const LAMBDA_SRC = 'docs/computer-science/kg/graph.json — cs.func.lambda-functional'
const LAMBDA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LAMBDA, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Lambda functions are anonymous, single-expression functions: `lambda x, y: x + y`. ' +
      'They are equivalent to a def with a single return statement, useful inline where a function object is expected. ' +
      '`sorted(students, key=lambda s: s["grade"])` — sorts using the grade field without defining a named function. ' +
      'Functional programming uses functions as first-class values: ' +
      '`map(func, iterable)` applies func to every element; ' +
      '`filter(func, iterable)` keeps elements where func returns True; ' +
      '`functools.reduce(func, iterable)` combines elements left to right. ' +
      'These are mostly replaced by list comprehensions in modern Python, but remain important for understanding higher-order functions and for use with pandas/numpy APIs that expect callable arguments.',
    targetedMisconceptions: [],
    source: LAMBDA_SRC,
  },
  {
    conceptId: LAMBDA, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Lambda functions cannot contain statements (if/for/while/return) — only a single expression. ' +
      'For anything more than a simple one-liner, use a named def — it is more readable and debuggable. ' +
      'A common anti-pattern: `f = lambda x: x**2; f(5)` — there is no benefit over `def f(x): return x**2`. ' +
      'Lambdas are for when you need a throwaway function inline and naming it would be more verbose. ' +
      'Also: `map()` and `filter()` return iterators in Python 3, not lists — wrap with `list()` to get a list.',
    targetedMisconceptions: [`${LAMBDA}:M1`],
    source: LAMBDA_SRC,
  },
]
const LAMBDA_PROBES: SeedProbe[] = [
  {
    conceptId: LAMBDA, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does `list(map(lambda x: x**2, [1,2,3]))` produce?',
    choices: [
      { text: '[1, 4, 9] — map applies the lambda to each element; list() materialises the iterator', isCorrect: true },
      { text: '(1, 4, 9) — map returns a tuple in Python 3', isCorrect: false, misconceptionId: `${LAMBDA}:M2` },
      { text: '[1, 2, 3] — lambda x: x**2 returns x, not x squared (the ** operator has low precedence)', isCorrect: false },
    ],
    correctValue: '[1, 4, 9] — map applies lambda; list() converts the iterator',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LAMBDA}:M2`],
    source: LAMBDA_SRC,
  },
  {
    conceptId: LAMBDA, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student writes `lambda x: if x > 0: return x else: return -x`. What is wrong?',
    choices: [
      { text: 'Lambda bodies cannot contain statements like if/return; only expressions are allowed: `lambda x: x if x > 0 else -x`', isCorrect: true },
      { text: 'The syntax is correct but lambda functions require parentheses around the body', isCorrect: false, misconceptionId: `${LAMBDA}:M1` },
    ],
    correctValue: 'Lambda allows only a single expression, not statements like if/return',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LAMBDA}:M1`],
    source: LAMBDA_SRC,
  },
]

// ─── cs.func.modules-packages ─────────────────────────────────────────────────
const MODPKG = 'cs.func.modules-packages'
const MODPKG_SRC = 'docs/computer-science/kg/graph.json — cs.func.modules-packages'
const MODPKG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MODPKG, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A module is a .py file containing Python definitions and statements — functions, classes, and variables. ' +
      '`import math` makes the math module available; `math.sqrt(16)` calls its sqrt function. ' +
      '`from math import sqrt` imports sqrt directly into the current namespace. ' +
      '`import math as m` creates an alias. ' +
      'A package is a directory containing modules and a `__init__.py` file. ' +
      'The Python standard library includes batteries-included modules: math, random, os, sys, json, re, datetime, pathlib, collections, itertools, functools. ' +
      'Third-party packages are installed via pip: `pip install requests`. ' +
      'Virtual environments (`python -m venv env`) isolate package versions per project. ' +
      '`if __name__ == "__main__":` guard: code under this runs only when the file is executed directly, not when imported as a module.',
    targetedMisconceptions: [],
    source: MODPKG_SRC,
  },
  {
    conceptId: MODPKG, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '`from module import *` (star import) is tempting but dangerous — it imports all public names into the current namespace, risking silent name collisions. ' +
      'If two modules both define a function `process()`, `from mod1 import *; from mod2 import *` will silently keep only mod2\'s version. ' +
      'Best practice: import the module and use qualified names (`mod1.process()`) or import only specific names (`from mod1 import process as process_mod1`). ' +
      'Also: naming your own file the same as a standard library module (e.g., `math.py`) shadows the stdlib module and causes confusing ImportErrors.',
    targetedMisconceptions: [`${MODPKG}:M1`],
    source: MODPKG_SRC,
  },
]
const MODPKG_PROBES: SeedProbe[] = [
  {
    conceptId: MODPKG, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does the `if __name__ == "__main__":` guard do in a Python module?',
    choices: [
      { text: 'Code under it runs only when the file is executed directly (not when imported); it prevents test/startup code from running when the module is used as a library', isCorrect: true },
      { text: 'It defines the entry point for a class named Main; it is required for any Python script that uses classes', isCorrect: false, misconceptionId: `${MODPKG}:M2` },
      { text: 'It checks that the __name__ variable has been correctly set before running any code', isCorrect: false },
    ],
    correctValue: '__name__ == "__main__" is True only when run directly, not when imported',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MODPKG}:M2`],
    source: MODPKG_SRC,
  },
  {
    conceptId: MODPKG, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student names their file `random.py` and then tries `import random` at the top. They get unexpected errors. Why?',
    choices: [
      { text: 'Python finds the local `random.py` first, shadowing the standard library `random` module; the file imports itself instead of the stdlib module', isCorrect: true },
      { text: 'Python prohibits naming files the same as stdlib modules and raises an ImportError at the time of file creation', isCorrect: false, misconceptionId: `${MODPKG}:M1` },
    ],
    correctValue: 'Local file shadows stdlib — never name your file the same as an stdlib module',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MODPKG}:M1`],
    source: MODPKG_SRC,
  },
]

// ─── cs.func.decorators ───────────────────────────────────────────────────────
const DECOR = 'cs.func.decorators'
const DECOR_SRC = 'docs/computer-science/kg/graph.json — cs.func.decorators'
const DECOR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DECOR, subjectSlug: 'computer_science', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A decorator is a function that takes another function as input and returns a modified (wrapped) function. ' +
      '`@decorator` syntax is sugar for `func = decorator(func)`. ' +
      'Example: a timing decorator wraps a function to measure and log its execution time without modifying its source. ' +
      '`functools.wraps(func)` should be applied to the wrapper to preserve the original function\'s name and docstring. ' +
      'Common use cases: logging, timing, caching (`functools.lru_cache`), access control, retry logic, input validation. ' +
      'Decorators with arguments use three layers: the outermost function takes arguments and returns the actual decorator. ' +
      'Class decorators and decorating methods follow the same pattern; `@staticmethod` and `@classmethod` are built-in decorators.',
    targetedMisconceptions: [],
    source: DECOR_SRC,
  },
  {
    conceptId: DECOR, subjectSlug: 'computer_science', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A decorator REPLACES the original function with a new one — this matters for debugging. ' +
      'Without `@functools.wraps(func)`, the wrapped function\'s `__name__` and `__doc__` become those of the wrapper, breaking tools that rely on introspection (logging, documentation generators, unit test reporters). ' +
      'Always include `@functools.wraps(func)` inside the wrapper to forward the original metadata. ' +
      'Also: `@decorator` at definition time IMMEDIATELY calls `decorator(func)` — the decorator runs once at class/module load, not every time the function is called. ' +
      'The INNER wrapper function is what runs at call time.',
    targetedMisconceptions: [`${DECOR}:M1`],
    source: DECOR_SRC,
  },
]
const DECOR_PROBES: SeedProbe[] = [
  {
    conceptId: DECOR, subjectSlug: 'computer_science', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does `@my_decorator` above a function definition actually do in Python?',
    choices: [
      { text: 'It is syntactic sugar for `func = my_decorator(func)` — the decorator is called immediately at definition time with the function as its argument', isCorrect: true },
      { text: 'It marks the function to be called through my_decorator at each invocation, without running my_decorator at definition time', isCorrect: false, misconceptionId: `${DECOR}:M1` },
      { text: 'It subclasses the function with my_decorator as the base class', isCorrect: false },
    ],
    correctValue: '@decorator = func = decorator(func) at definition time',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${DECOR}:M1`],
    source: DECOR_SRC,
  },
  {
    conceptId: DECOR, subjectSlug: 'computer_science', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A decorator is applied to `def process()`. Without `@functools.wraps`, what unintended consequence occurs?',
    choices: [
      { text: 'process.__name__ becomes the wrapper\'s name (e.g., "wrapper"), breaking introspection-based tools like test runners and documentation generators', isCorrect: true },
      { text: 'The function raises a RuntimeError because decorators must always include @functools.wraps to be valid', isCorrect: false, misconceptionId: `${DECOR}:M2` },
    ],
    correctValue: 'Without wraps, __name__/__doc__ are lost — always include @functools.wraps(func) in wrappers',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${DECOR}:M2`],
    source: DECOR_SRC,
  },
]

// ─── Batch export ──────────────────────────────────────────────────────────────
export const CS_EXPLANATIONS: SeedExplanation[] = [
  ...CSFOUND_EXPLANATIONS,
  ...COMPORG_EXPLANATIONS,
  ...NUMSYS_EXPLANATIONS,
  ...BOOLLOG_EXPLANATIONS,
  ...MEMSTG_EXPLANATIONS,
  ...CPUARCH_EXPLANATIONS,
  ...PIPELCACHE_EXPLANATIONS,
  ...SWCONCEPT_EXPLANATIONS,
  ...OSCONCEPT_EXPLANATIONS,
  ...PROBSOLV_EXPLANATIONS,
  ...ALGO_EXPLANATIONS,
  ...FLOWCHRT_EXPLANATIONS,
  ...ASYMP_EXPLANATIONS,
  ...TIMECPLX_EXPLANATIONS,
  ...DIVCONQ_EXPLANATIONS,
  ...GREEDY_EXPLANATIONS,
  ...DYNPROG_EXPLANATIONS,
  ...BKTRACK_EXPLANATIONS,
  ...NPCOMP_EXPLANATIONS,
]
export const CS_PROBES: SeedProbe[] = [
  ...CSFOUND_PROBES,
  ...COMPORG_PROBES,
  ...NUMSYS_PROBES,
  ...BOOLLOG_PROBES,
  ...MEMSTG_PROBES,
  ...CPUARCH_PROBES,
  ...PIPELCACHE_PROBES,
  ...SWCONCEPT_PROBES,
  ...OSCONCEPT_PROBES,
  ...PROBSOLV_PROBES,
  ...ALGO_PROBES,
  ...FLOWCHRT_PROBES,
  ...ASYMP_PROBES,
  ...TIMECPLX_PROBES,
  ...DIVCONQ_PROBES,
  ...GREEDY_PROBES,
  ...DYNPROG_PROBES,
  ...BKTRACK_PROBES,
  ...NPCOMP_PROBES,
]
