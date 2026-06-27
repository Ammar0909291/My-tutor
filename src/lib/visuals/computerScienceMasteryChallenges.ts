/**
 * Computer Science Visual Mastery — challenge bank (Computer Science Subject
 * Library sprint). Static, hand-authored multiple-choice challenges paired
 * with the 5 existing CS VisualCard types (three_computer_architecture,
 * three_memory_storage, three_network_packet_flow, three_data_structure,
 * three_algorithm_visualization). Purely additive data — no new challenge
 * framework; reuses the existing VisualMasterySignal / EvidenceRecord
 * pipeline via createMasteryEmitter (visualType:
 * 'computer_science_interactive'). Mirrors classicalMechanicsMasteryChallenges.ts.
 */
import type { VisualType } from '@/lib/school/visuals/visualTypes'

export interface ComputerScienceMasteryChallenge {
  id: string
  /** Which existing CS VisualCard renders the diagram for this challenge. */
  visual: VisualType
  /** revealStep to pin the diagram at (Infinity = fully revealed, the default teaching end-state). */
  revealStep?: number
  concept: string
  question: string
  options: string[]
  correctIndex: number
  /** The registered misconception theme this challenge targets (misconceptionEngine.ts RULES). */
  misconceptionType: string
}

export const COMPUTER_SCIENCE_MASTERY_CHALLENGES: ComputerScienceMasteryChallenge[] = [
  {
    id: 'architecture_binary_negative',
    visual: 'three_computer_architecture',
    concept: 'binary_representation',
    question: 'How does a computer actually represent a negative integer in binary?',
    options: ['As the positive binary value with a minus sign character stored alongside it', "Using two's complement, not a plain sign-prefixed positive value", 'Computers cannot represent negative numbers at all'],
    correctIndex: 1,
    misconceptionType: 'cs_binary_representation',
  },
  {
    id: 'architecture_binary_same_quantity',
    visual: 'three_computer_architecture',
    concept: 'binary_vs_decimal',
    question: 'The CPU shown processes data in binary. Is binary a different kind of arithmetic than decimal?',
    options: ['Yes, binary follows entirely different math rules', 'No — it is the same quantity, just written in base 2 instead of base 10', 'Only for negative numbers'],
    correctIndex: 1,
    misconceptionType: 'cs_binary_representation',
  },
  {
    id: 'algorithm_complexity_lines',
    visual: 'three_algorithm_visualization',
    concept: 'big_o_vs_lines',
    question: 'One sorting algorithm has more lines of code than another. Does that mean it has worse time complexity?',
    options: ['Yes, more lines always means worse Big-O', 'Not necessarily — line count and Big-O complexity are different things', 'Yes, but only for sorting algorithms'],
    correctIndex: 1,
    misconceptionType: 'cs_complexity_misconception',
  },
  {
    id: 'algorithm_complexity_practice',
    visual: 'three_algorithm_visualization',
    concept: 'big_o_vs_real_runtime',
    question: 'An algorithm with smaller Big-O complexity is being compared to one with larger Big-O. Is the smaller-Big-O algorithm always faster in practice?',
    options: ['Yes, smaller Big-O always wins for any input size', 'Not always — for small inputs, constant factors can make the larger-Big-O algorithm faster', 'Big-O has nothing to do with runtime'],
    correctIndex: 1,
    misconceptionType: 'cs_complexity_misconception',
  },
  {
    id: 'data_structure_linked_list_access',
    visual: 'three_data_structure',
    concept: 'linked_list_access_cost',
    question: 'To reach the 5th element of the linked list shown, what must happen?',
    options: ['Jump directly to index 5, just like an array — O(1)', 'Traverse from the head, one node at a time, until reaching it — O(n)', 'It is always faster than an array for this'],
    correctIndex: 1,
    misconceptionType: 'cs_data_structure_access',
  },
  {
    id: 'data_structure_stack_queue_order',
    visual: 'three_data_structure',
    concept: 'stack_vs_queue_order',
    question: 'In the stack and queue shown, which end does each structure remove its next element from?',
    options: ['A stack removes from the front (FIFO), a queue removes from the top (LIFO)', 'A stack removes from the top — the most recently added (LIFO); a queue removes from the front — the earliest added (FIFO)', 'Both always remove from the same end'],
    correctIndex: 1,
    misconceptionType: 'cs_data_structure_access',
  },
  {
    id: 'memory_hierarchy_ram_vs_storage',
    visual: 'three_memory_storage',
    concept: 'ram_vs_storage',
    question: 'If the computer loses power, what happens to data in RAM versus data on storage (disk/SSD)?',
    options: ['Both are lost, since they are both just "memory"', 'RAM is lost (volatile); storage persists', 'Storage is lost; RAM persists'],
    correctIndex: 1,
    misconceptionType: 'cs_memory_hierarchy',
  },
  {
    id: 'memory_hierarchy_cache_purpose',
    visual: 'three_memory_storage',
    concept: 'cache_purpose',
    question: 'What is the purpose of the cache layer shown between the CPU and RAM?',
    options: ['It is just extra storage capacity, like a small second disk', 'It is a small, fast layer that reduces the average time the CPU waits for data', 'It permanently stores data that RAM cannot hold'],
    correctIndex: 1,
    misconceptionType: 'cs_memory_hierarchy',
  },
  {
    id: 'network_internet_vs_web',
    visual: 'three_network_packet_flow',
    concept: 'internet_vs_web',
    question: 'Are "the Internet" and "the World Wide Web" the same thing?',
    options: ['Yes, they are interchangeable terms for the same thing', 'No — the Internet is the underlying network infrastructure; the Web is one service (pages/hyperlinks) that runs on top of it', 'The Web is the hardware and the Internet is the software'],
    correctIndex: 1,
    misconceptionType: 'cs_networking_misconception',
  },
  {
    id: 'network_packet_routing',
    visual: 'three_network_packet_flow',
    concept: 'packet_routing',
    question: 'In the packet flow shown, does the message travel from sender to receiver as one intact piece along one fixed path?',
    options: ['Yes, it travels as a single intact unit on a fixed path', 'No — it is split into packets that may each take a different route and are reassembled at the destination', 'It only splits into packets for very large files'],
    correctIndex: 1,
    misconceptionType: 'cs_networking_misconception',
  },
]
